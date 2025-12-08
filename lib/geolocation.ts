export interface Location {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

export interface LocationWithAddress extends Location {
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export class LocationService {
  private watchId: number | null = null
  private currentLocation: Location | null = null
  private onLocationUpdate?: (location: Location) => void
  private retryCount = 0
  private maxRetries = 3
  private useHighAccuracy = true
  private lastSuccessfulUpdate = 0
  private timeoutHandle: NodeJS.Timeout | null = null

  // Get current location
  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"))
        return
      }

      if (this.currentLocation && Date.now() - this.lastSuccessfulUpdate < 60000) {
        console.log("[v0] Using recent cached location")
        resolve(this.currentLocation)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          }
          this.currentLocation = location
          this.lastSuccessfulUpdate = Date.now()
          console.log("[v0] Location obtained:", { accuracy: location.accuracy })
          resolve(location)
        },
        (error) => {
          console.error("[v0] Location error:", error.message, "Code:", error.code)

          if (this.currentLocation) {
            console.log("[v0] Using cached location due to error")
            resolve(this.currentLocation)
          } else {
            reject(error)
          }
        },
        {
          enableHighAccuracy: false, // Start with low accuracy for speed
          timeout: 10000,
          maximumAge: 60000, // Accept positions up to 1 minute old
        },
      )
    })
  }

  // Start continuous location tracking
  startTracking(callback: (location: Location) => void) {
    if (!navigator.geolocation) {
      throw new Error("Geolocation not supported")
      return
    }

    this.onLocationUpdate = callback

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        }
        this.currentLocation = location
        this.lastSuccessfulUpdate = Date.now()
        this.retryCount = 0

        console.log("[v0] Location update:", {
          lat: location.latitude.toFixed(6),
          lng: location.longitude.toFixed(6),
          accuracy: Math.round(location.accuracy),
        })

        callback(location)
      },
      (error) => {
        console.log("[v0] Location watch error:", error.message, "Code:", error.code)

        if (error.code === error.TIMEOUT || error.code === error.POSITION_UNAVAILABLE) {
          if (this.currentLocation && Date.now() - this.lastSuccessfulUpdate < 300000) {
            console.log("[v0] Using cached location during error")
            callback(this.currentLocation)
          }
        } else if (error.code === error.PERMISSION_DENIED) {
          console.log("[v0] Location permission denied by user")
          // Stop trying if permission denied
          this.stopTracking()
        }
      },
      {
        enableHighAccuracy: false, // Use low accuracy to avoid timeouts
        timeout: 30000, // Long timeout
        maximumAge: 120000, // Accept positions up to 2 minutes old
      },
    )
  }

  // Stop tracking
  stopTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
    }
  }

  // Get last known location
  getLastLocation(): Location | null {
    return this.currentLocation
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(loc1: Location, loc2: Location): number {
    const R = 6371 // Earth's radius in km
    const dLat = this.toRad(loc2.latitude - loc1.latitude)
    const dLon = this.toRad(loc2.longitude - loc1.longitude)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(loc1.latitude)) *
        Math.cos(this.toRad(loc2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in km
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  // Get human-readable address (using reverse geocoding)
  async getAddress(location: Location): Promise<LocationWithAddress> {
    try {
      // Using OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}&zoom=18&addressdetails=1`,
      )

      const data = await response.json()

      return {
        ...location,
        address: data.display_name,
        city: data.address?.city || data.address?.town || data.address?.village,
        state: data.address?.state,
        zipCode: data.address?.postcode,
      }
    } catch (error) {
      console.error("[v0] Reverse geocoding error:", error)
      return location
    }
  }
}
