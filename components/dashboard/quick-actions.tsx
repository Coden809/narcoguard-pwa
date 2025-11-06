"use client"

import { HolographicCard } from "@/components/effects/holographic-card"
import { GlowButton } from "@/components/effects/glow-button"
import { Phone, MapPin, Users, BookOpen, Calendar, Settings } from "lucide-react"

export function QuickActions() {
  return (
    <HolographicCard className="p-6">
      <h3 className="text-lg font-semibold mb-4 font-[family-name:var(--font-orbitron)]">QUICK ACTIONS</h3>

      <div className="grid grid-cols-2 gap-3">
        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4">
          <Phone className="w-6 h-6" />
          <span className="text-xs">Call Support</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4">
          <MapPin className="w-6 h-6" />
          <span className="text-xs">Find Resources</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4">
          <Users className="w-6 h-6" />
          <span className="text-xs">Hero Network</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4">
          <BookOpen className="w-6 h-6" />
          <span className="text-xs">Training</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4">
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Events</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4">
          <Settings className="w-6 h-6" />
          <span className="text-xs">Settings</span>
        </GlowButton>
      </div>
    </HolographicCard>
  )
}
