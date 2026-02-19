import { NextResponse } from "next/server"
import { getDashboardStats, getDonationStats } from "@/lib/db"

export async function GET() {
  try {
    const [dashboard, donations] = await Promise.all([
      getDashboardStats(),
      getDonationStats(),
    ])

    return NextResponse.json({
      ...dashboard,
      donations: {
        total: Number(donations.total_raised || 0),
        count: Number(donations.total_donations || 0),
        average: Number(donations.avg_donation || 0),
      },
      goal: 56000,
      watchesTarget: 80,
      costPerWatch: 700,
    })
  } catch {
    return NextResponse.json({
      totalUsers: 0,
      activeHeroes: 0,
      totalEmergencies: 0,
      totalDonations: 0,
      donations: { total: 0, count: 0, average: 0 },
      goal: 56000,
      watchesTarget: 80,
      costPerWatch: 700,
    })
  }
}
