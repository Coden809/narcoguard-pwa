"use client"

import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface HolographicCardProps {
  children: ReactNode
  className?: string
  glowIntensity?: "low" | "medium" | "high"
}

export function HolographicCard({ children, className = "", glowIntensity = "medium" }: HolographicCardProps) {
  const glowClasses = {
    low: "pulse-glow opacity-50",
    medium: "pulse-glow",
    high: "pulse-glow opacity-100",
  }

  return (
    <Card className={`glass neon-border relative overflow-hidden ${glowClasses[glowIntensity]} ${className}`}>
      <div className="absolute inset-0 holographic opacity-10 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </Card>
  )
}
