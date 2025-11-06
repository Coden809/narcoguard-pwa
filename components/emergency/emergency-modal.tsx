"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GlowButton } from "@/components/effects/glow-button"
import { AlertTriangle, X, Phone, Users, MapPin, Siren } from "lucide-react"
import { ParticleField } from "@/components/effects/particle-field"

interface EmergencyModalProps {
  open: boolean
  onClose: () => void
  onActivate: () => void
}

export function EmergencyModal({ open, onClose, onActivate }: EmergencyModalProps) {
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    if (countdown === null || countdown <= 0) return

    const timer = setTimeout(() => {
      if (countdown === 1) {
        onActivate()
        setIsActivated(true)
      }
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, onActivate])

  const startEmergency = () => {
    setCountdown(3)
  }

  const cancelEmergency = () => {
    setCountdown(null)
    setIsActivated(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass neon-border emergency-pulse">
        <ParticleField count={30} color="var(--glow-emergency)" />

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-[family-name:var(--font-orbitron)]">
            <AlertTriangle className="w-6 h-6 text-destructive animate-bounce" />
            Emergency Response
          </DialogTitle>
        </DialogHeader>

        {!isActivated && countdown === null && (
          <div className="space-y-6 py-4">
            <p className="text-center text-muted-foreground">Activating emergency mode will:</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg glass">
                <div className="p-2 rounded-full bg-destructive/20">
                  <Siren className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm">Alert nearby Heroes</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg glass">
                <div className="p-2 rounded-full bg-destructive/20">
                  <Phone className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm">Notify emergency contacts</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg glass">
                <div className="p-2 rounded-full bg-destructive/20">
                  <MapPin className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm">Share your location</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg glass">
                <div className="p-2 rounded-full bg-destructive/20">
                  <Users className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm">Display naloxone location</p>
              </div>
            </div>

            <div className="flex gap-3">
              <GlowButton variant="emergency" className="flex-1" onClick={startEmergency}>
                Activate Emergency
              </GlowButton>
              <GlowButton variant="default" onClick={cancelEmergency}>
                <X className="w-4 h-4" />
              </GlowButton>
            </div>
          </div>
        )}

        {countdown !== null && countdown > 0 && (
          <div className="space-y-6 py-8">
            <div className="relative">
              <div className="text-center">
                <div className="text-8xl font-bold text-destructive glow-text emergency-pulse font-[family-name:var(--font-orbitron)]">
                  {countdown}
                </div>
                <p className="text-muted-foreground mt-4">Activating emergency protocols...</p>
              </div>

              {/* Circular progress */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-64 h-64 -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-muted opacity-20"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (countdown / 3)}`}
                    className="text-destructive emergency-pulse"
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
              </div>
            </div>

            <GlowButton variant="default" className="w-full" onClick={cancelEmergency}>
              Cancel
            </GlowButton>
          </div>
        )}

        {isActivated && (
          <div className="space-y-6 py-8 text-center">
            <div className="relative">
              <Siren className="w-24 h-24 mx-auto text-destructive emergency-pulse" />
              <div className="absolute inset-0 blur-2xl bg-destructive/50 animate-pulse" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-destructive glow-text font-[family-name:var(--font-orbitron)]">
                EMERGENCY ACTIVATED
              </h3>
              <p className="text-muted-foreground mt-2">Help is on the way</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg glass">
                <span className="text-sm">Heroes notified</span>
                <div className="w-2 h-2 rounded-full bg-green-500 pulse-glow" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg glass">
                <span className="text-sm">Location shared</span>
                <div className="w-2 h-2 rounded-full bg-green-500 pulse-glow" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg glass">
                <span className="text-sm">Contacts alerted</span>
                <div className="w-2 h-2 rounded-full bg-green-500 pulse-glow" />
              </div>
            </div>

            <GlowButton variant="success" className="w-full" onClick={cancelEmergency}>
              I'm Safe - Deactivate
            </GlowButton>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
