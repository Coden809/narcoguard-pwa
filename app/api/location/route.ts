import { NextResponse } from "next/server"
import { updateUserLocation, logActivity } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { latitude, longitude, accuracy, userId } = await request.json()

    // Store location in database
    try {
      await updateUserLocation({ userId, latitude, longitude, accuracy })
      await logActivity({ userId, action: "location_updated", details: { latitude, longitude } })
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      message: "Location updated",
      timestamp: Date.now(),
    })
  } catch {
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    nearbyHeroes: [
      { id: "H1", lat: 42.0987, lon: -75.9180, distance: 0.3, name: "Hero Alpha" },
      { id: "H2", lat: 42.0970, lon: -75.9170, distance: 0.5, name: "Hero Beta" },
      { id: "H3", lat: 42.1001, lon: -75.9195, distance: 0.8, name: "Hero Gamma" },
    ],
    naloxoneLocations: [
      { name: "CVS Pharmacy - Binghamton", lat: 42.0980, lon: -75.9175, distance: 0.2 },
      { name: "Walgreens - Johnson City", lat: 42.1150, lon: -75.9560, distance: 2.1 },
      { name: "Lourdes Hospital Pharmacy", lat: 42.0890, lon: -75.9690, distance: 3.4 },
    ],
    hospitals: [
      { name: "UHS Wilson Medical Center", lat: 42.1150, lon: -75.9560, distance: 2.1 },
      { name: "Lourdes Hospital", lat: 42.0890, lon: -75.9690, distance: 3.4 },
      { name: "Binghamton General Hospital", lat: 42.1010, lon: -75.9110, distance: 0.9 },
    ],
  })
}
