import { NextResponse } from "next/server"
import { VitalsProcessor } from "@/lib/vitals-processor"

// Global vitals processor instance (in production, use proper state management)
const vitalsProcessor = new VitalsProcessor()

export async function GET() {
  // Simulate sensor readings (in production, get from actual sensors)
  const sensorReadings = vitalsProcessor.simulateSensorData()

  // Process readings through Kalman filter
  const vitals = vitalsProcessor.processSensorReadings(sensorReadings)

  // Check for overdose indicators
  const overdoseCheck = vitalsProcessor.detectOverdoseIndicators()

  return NextResponse.json({
    vitals,
    overdoseCheck,
    timestamp: Date.now(),
  })
}

export async function POST(request: Request) {
  try {
    const { readings } = await request.json()

    // Process real sensor readings
    const vitals = vitalsProcessor.processSensorReadings(readings)
    const overdoseCheck = vitalsProcessor.detectOverdoseIndicators()

    return NextResponse.json({
      success: true,
      vitals,
      overdoseCheck,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process vitals" }, { status: 500 })
  }
}
