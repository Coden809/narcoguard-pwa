"use client"

import { HolographicCard } from "@/components/effects/holographic-card"
import { GlowButton } from "@/components/effects/glow-button"
import { Phone, MapPin, Users, BookOpen, Calendar, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  const callSupport = () => {
    window.location.href = "tel:1-800-662-4357" // SAMHSA National Helpline
  }

  const findResources = async () => {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    }).catch(() => null)

    if (position) {
      const { latitude, longitude } = position.coords
      window.open(`https://www.google.com/maps/search/naloxone+near+me/@${latitude},${longitude},13z`, "_blank")
    } else {
      window.open("https://www.samhsa.gov/find-help/national-helpline", "_blank")
    }
  }

  const openHeroNetwork = () => {
    router.push("#hero-network")
    setTimeout(() => {
      document.getElementById("hero-network")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const openTraining = () => {
    router.push("/ar")
  }

  const openEvents = () => {
    window.open("https://www.narcan.com/patients/how-to-use-narcan", "_blank")
  }

  const openSettings = () => {
    alert("Settings coming soon! You can manage preferences in your profile.")
  }

  return (
    <HolographicCard className="p-6">
      <h3 className="text-lg font-semibold mb-4 font-[family-name:var(--font-orbitron)]">QUICK ACTIONS</h3>

      <div className="grid grid-cols-2 gap-3">
        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4" onClick={callSupport}>
          <Phone className="w-6 h-6" />
          <span className="text-xs">Call Support</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4" onClick={findResources}>
          <MapPin className="w-6 h-6" />
          <span className="text-xs">Find Resources</span>
        </GlowButton>

        <GlowButton
          variant="default"
          className="flex flex-col items-center gap-2 h-auto py-4"
          onClick={openHeroNetwork}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs">Hero Network</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4" onClick={openTraining}>
          <BookOpen className="w-6 h-6" />
          <span className="text-xs">Training</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4" onClick={openEvents}>
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Events</span>
        </GlowButton>

        <GlowButton variant="default" className="flex flex-col items-center gap-2 h-auto py-4" onClick={openSettings}>
          <Settings className="w-6 h-6" />
          <span className="text-xs">Settings</span>
        </GlowButton>
      </div>
    </HolographicCard>
  )
}
