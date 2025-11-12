import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { latitude, longitude, accuracy } = await request.json()

    console.log("[v0] Location updated:", {
      latitude,
      longitude,
      accuracy,
      timestamp: new Date().toISOString(),
    })

    // In production, store location in database for emergency response

    return NextResponse.json({
      success: true,
      message: "Location updated",
      timestamp: Date.now(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 })
  }
}

export async function GET() {
  // Return nearby resources (heroes, naloxone locations, hospitals)
  return NextResponse.json({
    nearbyHeroes: [
      { id: "H1", lat: 40.7589, lon: -73.9851, distance: 0.3 },
      { id: "H2", lat: 40.758, lon: -73.9855, distance: 0.5 },
      { id: "H3", lat: 40.7595, lon: -73.9845, distance: 0.8 },
    ],
    naloxoneLocations: [
      { name: "CVS Pharmacy", lat: 40.7585, lon: -73.985, distance: 0.2 },
      { name: "Walgreens", lat: 40.7592, lon: -73.9848, distance: 0.4 },
    ],
    hospitals: [{ name: "St. Vincent Hospital", lat: 40.761, lon: -73.984, distance: 1.2 }],
  })
}
