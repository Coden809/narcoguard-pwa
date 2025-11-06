"use client"

import { useState, useEffect } from "react"
import { ParticleField } from "@/components/effects/particle-field"
import { HolographicCard } from "@/components/effects/holographic-card"
import { VitalsMonitor } from "@/components/dashboard/vitals-monitor"
import { EmergencyButton } from "@/components/emergency/emergency-button"
import { HeroNetworkStatus } from "@/components/hero/hero-network-status"
import { GuardianAI } from "@/components/ai/guardian-ai"
import { NG2WatchStatus } from "@/components/watch/ng2-watch-status"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { Heart, Shield, Users, Zap } from "lucide-react"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background particle field */}
      <ParticleField count={100} />

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-6 space-y-6">
        {/* Header with logo and title */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 float-animation">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/narcoguard-icon-Tz9KqfxC9OByY4lzx4tRtKQkr9gAcJ.jpeg"
                alt="Narcoguard"
                className="w-full h-full rounded-full pulse-glow"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold glow-text font-[family-name:var(--font-orbitron)]">NARCOGUARD</h1>
              <p className="text-muted-foreground text-sm">Life-Saving Technology</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full neon-border">
              <div className="w-3 h-3 rounded-full bg-green-500 pulse-glow" />
              <span className="text-sm font-medium">System Active</span>
            </div>
          </div>
        </header>

        {/* Emergency Button - Always visible and prominent */}
        <EmergencyButton />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Vitals & Watch */}
          <div className="space-y-6">
            <VitalsMonitor />
            <NG2WatchStatus />
          </div>

          {/* Center Column - Guardian AI & Quick Actions */}
          <div className="space-y-6">
            <GuardianAI />
            <QuickActions />
          </div>

          {/* Right Column - Hero Network & Activity */}
          <div className="space-y-6">
            <HeroNetworkStatus />
            <ActivityFeed />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <HolographicCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20 pulse-glow">
                <Heart className="w-6 h-6 text-primary heartbeat" />
              </div>
              <div>
                <p className="text-2xl font-bold">98</p>
                <p className="text-sm text-muted-foreground">BPM</p>
              </div>
            </div>
          </HolographicCard>

          <HolographicCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/20 pulse-glow">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Protected</p>
              </div>
            </div>
          </HolographicCard>

          <HolographicCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-secondary/20 pulse-glow">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Heroes Nearby</p>
              </div>
            </div>
          </HolographicCard>

          <HolographicCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/20 pulse-glow">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Watch Battery</p>
              </div>
            </div>
          </HolographicCard>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            Created by <span className="text-primary font-semibold">Stephen Blanford</span>
          </p>
          <p className="text-xs mt-2">Inspired by family and friends. Saving lives, one guardian at a time.</p>
        </footer>
      </div>
    </div>
  )
}
