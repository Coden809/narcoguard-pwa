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
      console.log("[v0] Skipping invalid location update")
      return
    }

    setLocation(loc)
    console.log("[v0] Location updated:", {
      lat: loc.latitude.toFixed(6),
      lng: loc.longitude.toFixed(6),
      accuracy: loc.accuracy.toFixed(2),
    })

    // Send location to backend
    try {
      await fetch("/api/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loc),
      })
    } catch (err) {
      console.error("[v0] Failed to sync location:", err)
    }
  }, [])

  const getCurrentLocation = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const loc = await locationService.getCurrentLocation()
      await updateLocation(loc)
      setPermissionState("granted")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Location access denied"
      setError(errorMessage)
      console.error("[v0] Location error:", errorMessage)

      if (errorMessage.includes("denied") || errorMessage.includes("permission")) {
        setPermissionState("denied")
      }
    } finally {
      setIsLoading(false)
    }
  }, [updateLocation])

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionState(result.state as "granted" | "denied" | "prompt")
        console.log("[v0] Initial permission state:", result.state)

        // Listen for permission changes
        result.addEventListener("change", () => {
          setPermissionState(result.state as "granted" | "denied" | "prompt")
          console.log("[v0] Permission state changed:", result.state)
        })
      })
    }

    getCurrentLocation()

    if (trackContinuously) {
      console.log("[v0] Starting continuous location tracking")
      locationService.startTracking(updateLocation)
      return () => {
        console.log("[v0] Stopping continuous location tracking")
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
