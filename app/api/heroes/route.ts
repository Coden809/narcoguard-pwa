import { NextResponse } from "next/server"
import { registerHero, logActivity } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const hero = await registerHero({
      name: data.name,
      email: data.email,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
      certifications: data.certifications || [],
    })

    await logActivity({
      action: "hero_registered",
      details: { heroId: hero.id, name: data.name },
    })

    return NextResponse.json({ success: true, hero })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to register hero"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
