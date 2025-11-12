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

  // Get current location
  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"))
        return
      }

      const attemptLocation = (highAccuracy: boolean) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: Location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp,
            }
            this.currentLocation = location
            console.log("[v0] Location obtained:", { accuracy: location.accuracy, highAccuracy })
            resolve(location)
          },
          (error) => {
            if (highAccuracy && error.code === error.TIMEOUT) {
              console.log("[v0] High accuracy timeout, falling back to low accuracy")
              attemptLocation(false)
            } else {
              console.error("[v0] Location error:", error.message)
              reject(error)
            }
          },
          {
            enableHighAccuracy: highAccuracy,
            timeout: highAccuracy ? 15000 : 30000, // Increased timeouts
            maximumAge: highAccuracy ? 0 : 30000, // Allow cached location for low accuracy
          },
        )
      }

      attemptLocation(true)
    })
  }

  // Start continuous location tracking
  startTracking(callback: (location: Location) => void) {
    if (!navigator.geolocation) {
      throw new Error("Geolocation not supported")
    }

    this.onLocationUpdate = callback

    const startWatch = (highAccuracy: boolean) => {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          }
          this.currentLocation = location
          this.retryCount = 0 // Reset retry count on success

          if (!this.useHighAccuracy && location.accuracy < 100) {
            console.log("[v0] Got good fix, upgrading to high accuracy")
            this.stopTracking()
            this.useHighAccuracy = true
            startWatch(true)
            return
          }

          callback(location)
        },
        (error) => {
          console.error("[v0] Location tracking error:", error.message, "Code:", error.code)

          if (error.code === error.TIMEOUT) {
            this.retryCount++

            if (this.retryCount >= this.maxRetries && this.useHighAccuracy) {
              console.log("[v0] Max retries reached, switching to low accuracy mode")
              this.stopTracking()
              this.useHighAccuracy = false
              this.retryCount = 0
              startWatch(false)
            } else if (this.currentLocation) {
              console.log("[v0] Using last known location during timeout")
              callback(this.currentLocation)
            }
          } else if (error.code === error.PERMISSION_DENIED) {
            console.error("[v0] Location permission denied")
            callback({
              latitude: 0,
              longitude: 0,
              accuracy: 0,
              timestamp: Date.now(),
            })
          }
        },
        {
          enableHighAccuracy: highAccuracy,
          timeout: highAccuracy ? 20000 : 30000, // Longer timeouts for continuous tracking
          maximumAge: highAccuracy ? 5000 : 30000, // Accept slightly older positions
        },
      )
    }

    startWatch(this.useHighAccuracy)
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
