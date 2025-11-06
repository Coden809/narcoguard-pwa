"use client"

import { useState } from "react"
import { AlertTriangle, Phone, MapPin, Users } from "lucide-react"
import { EmergencyModal } from "./emergency-modal"

export function EmergencyButton() {
  const [isEmergency, setIsEmergency] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleEmergencyPress = () => {
    setShowModal(true)
  }

  const activateEmergency = () => {
    setIsEmergency(true)
    // Trigger emergency protocols
    console.log("[v0] Emergency activated - notifying heroes and guardians")
  }

  return (
    <>
      <div className="relative">
        {/* Main Emergency Button */}
        <button onClick={handleEmergencyPress} className="w-full relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 emergency-pulse" />

          <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 emergency-pulse transform transition-all duration-300 group-hover:scale-[1.02] group-active:scale-95">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            </div>

            <div className="relative flex items-center justify-center gap-6">
              <div className="relative">
                <AlertTriangle className="w-16 h-16 text-white animate-bounce" />
                <div className="absolute inset-0 blur-xl bg-white/50 animate-pulse" />
              </div>

              <div className="text-left">
                <h2 className="text-4xl font-bold text-white glow-text font-[family-name:var(--font-orbitron)]">
                  EMERGENCY SOS
                </h2>
                <p className="text-white/90 text-lg mt-1">Press for immediate help</p>
              </div>
            </div>

            {/* Pulse indicators */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white emergency-pulse" />
              <div className="w-3 h-3 rounded-full bg-white emergency-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-3 h-3 rounded-full bg-white emergency-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </button>

        {/* Quick action buttons below */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button className="glass neon-border p-4 rounded-xl hover:bg-primary/10 transition-all group">
            <Phone className="w-6 h-6 mx-auto mb-2 text-primary group-hover:pulse-glow" />
            <p className="text-xs text-center">Call 911</p>
          </button>

          <button className="glass neon-border p-4 rounded-xl hover:bg-primary/10 transition-all group">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-primary group-hover:pulse-glow" />
            <p className="text-xs text-center">Share Location</p>
          </button>

          <button className="glass neon-border p-4 rounded-xl hover:bg-primary/10 transition-all group">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary group-hover:pulse-glow" />
            <p className="text-xs text-center">Alert Heroes</p>
          </button>
        </div>
      </div>

      <EmergencyModal open={showModal} onClose={() => setShowModal(false)} onActivate={activateEmergency} />
    </>
  )
}
