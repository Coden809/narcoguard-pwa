"use client"

import { useState, useEffect } from "react"
import { HolographicCard } from "@/components/effects/holographic-card"
import { Heart, Activity, Droplet } from "lucide-react"

export function VitalsMonitor() {
  const [heartRate, setHeartRate] = useState(72)
  const [spO2, setSpO2] = useState(98)
  const [temperature, setTemperature] = useState(98.6)

  // Simulate real-time vitals updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => prev + (Math.random() - 0.5) * 2)
      setSpO2((prev) => Math.min(100, Math.max(95, prev + (Math.random() - 0.5))))
      setTemperature((prev) => prev + (Math.random() - 0.5) * 0.1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <HolographicCard className="p-6" glowIntensity="high">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-[family-name:var(--font-orbitron)]">VITAL SIGNS</h3>
          <div className="w-2 h-2 rounded-full bg-green-500 pulse-glow" />
        </div>

        {/* Heart Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 heartbeat" />
              <span className="text-sm text-muted-foreground">Heart Rate</span>
            </div>
            <span className="text-2xl font-bold glow-text">{Math.round(heartRate)}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-pink-500 pulse-glow transition-all duration-500"
              style={{ width: `${(heartRate / 120) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">BPM - Normal Range</p>
        </div>

        {/* SpO2 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">Blood Oxygen</span>
            </div>
            <span className="text-2xl font-bold glow-text">{Math.round(spO2)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 pulse-glow transition-all duration-500"
              style={{ width: `${spO2}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">SpO2 - Optimal</p>
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-muted-foreground">Temperature</span>
            </div>
            <span className="text-2xl font-bold glow-text">{temperature.toFixed(1)}°F</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 pulse-glow transition-all duration-500"
              style={{ width: `${((temperature - 96) / 6) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Body Temp - Normal</p>
        </div>

        {/* Waveform visualization */}
        <div className="relative h-20 bg-muted/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 50">
              <path
                d="M0,25 Q10,25 20,15 T40,25 Q50,25 60,35 T80,25 Q90,25 100,15 T120,25 Q130,25 140,35 T160,25 Q170,25 180,15 T200,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary pulse-glow"
              />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
        </div>
      </div>
    </HolographicCard>
  )
}
