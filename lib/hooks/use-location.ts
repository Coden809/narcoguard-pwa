"use client"

import { useState, useEffect, useCallback } from "react"
import { LocationService, type Location } from "@/lib/geolocation"

const locationService = new LocationService()

export function useLocation(trackContinuously = false) {
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [permissionState, setPermissionState] = useState<"granted" | "denied" | "prompt">("prompt")

  const updateLocation = useCallback(async (loc: Location) => {
    if (loc.latitude === 0 && loc.longitude === 0) {
      return
    }

    setLocation(loc)
    setError(null) // Clear error on successful update

    // Send location to backend
    try {
      await fetch("/api/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loc),
      })
    } catch (err) {
      // Silent fail for backend sync
    }
  }, [])

  const getCurrentLocation = useCallback(async () => {
    try {
      setIsLoading(true)
      const loc = await locationService.getCurrentLocation()
      await updateLocation(loc)
      setPermissionState("granted")
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Location unavailable"

      if (errorMessage.includes("denied") || errorMessage.includes("permission")) {
        setError("Location access denied. Please enable location services.")
        setPermissionState("denied")
      } else {
        // Don't show timeout errors to user, just log them
        console.log("[v0] Location temporarily unavailable:", errorMessage)
        setError(null)
      }
    } finally {
      setIsLoading(false)
    }
  }, [updateLocation])

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionState(result.state as "granted" | "denied" | "prompt")

        result.addEventListener("change", () => {
          setPermissionState(result.state as "granted" | "denied" | "prompt")
        })
      })
    }

    getCurrentLocation()

    if (trackContinuously) {
      const startDelay = setTimeout(() => {
        locationService.startTracking(updateLocation)
      }, 2000)

      return () => {
        clearTimeout(startDelay)
        locationService.stopTracking()
      }
    }
  }, [trackContinuously, getCurrentLocation, updateLocation])

  return {
    location,
    isLoading,
    error,
    permissionState,
    refresh: getCurrentLocation,
    locationService,
  }
}
