import { NextResponse } from "next/server"
import { VitalsProcessor } from "@/lib/vitals-processor"
import { recordVitals, logActivity } from "@/lib/db"

const vitalsProcessor = new VitalsProcessor()

export async function GET() {
  const sensorReadings = vitalsProcessor.simulateSensorData()
  const vitals = vitalsProcessor.processSensorReadings(sensorReadings)
  const overdoseCheck = vitalsProcessor.detectOverdoseIndicators()

  // Persist to database
  try {
    await recordVitals({
      heartRate: vitals.heartRate,
      spo2: vitals.spo2,
      respiratoryRate: vitals.respiratoryRate,
      temperature: vitals.temperature,
      riskLevel: overdoseCheck.riskLevel,
      overdoseDetected: overdoseCheck.isOverdose,
    })
  } catch {
    // DB write is non-blocking - continue even if DB is unavailable
  }

  return NextResponse.json({
    vitals,
    overdoseCheck,
    timestamp: Date.now(),
  })
}

export async function POST(request: Request) {
  try {
    const { readings, userId } = await request.json()

    const vitals = vitalsProcessor.processSensorReadings(readings)
    const overdoseCheck = vitalsProcessor.detectOverdoseIndicators()

    // Persist to database
    try {
      await recordVitals({
        userId,
        heartRate: vitals.heartRate,
        spo2: vitals.spo2,
        respiratoryRate: vitals.respiratoryRate,
        temperature: vitals.temperature,
        riskLevel: overdoseCheck.riskLevel,
        overdoseDetected: overdoseCheck.isOverdose,
      })
      await logActivity({ userId, action: "vitals_recorded", details: { riskLevel: overdoseCheck.riskLevel } })
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      vitals,
      overdoseCheck,
    })
  } catch {
    return NextResponse.json({ error: "Failed to process vitals" }, { status: 500 })
  }
}
