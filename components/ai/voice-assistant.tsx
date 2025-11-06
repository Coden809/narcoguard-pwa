"use client"

import { useState, useEffect } from "react"
import { Mic, Volume2, Radio } from "lucide-react"
import { GlowButton } from "@/components/effects/glow-button"

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")

  useEffect(() => {
    if (isListening) {
      // Simulate voice recognition
      const timer = setTimeout(() => {
        setTranscript("How can I help you today?")
        setIsListening(false)
        setIsSpeaking(true)

        setTimeout(() => {
          setIsSpeaking(false)
          setTranscript("")
        }, 3000)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isListening])

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative">
        {/* Voice waves animation */}
        {(isListening || isSpeaking) && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-20 h-20 rounded-full border-2 border-primary animate-ping"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        )}

        {/* Main button */}
        <GlowButton
          onClick={() => setIsListening(!isListening)}
          size="lg"
          className="relative w-16 h-16 rounded-full"
          variant={isListening ? "emergency" : "default"}
        >
          {isListening ? (
            <Radio className="w-6 h-6 animate-pulse" />
          ) : isSpeaking ? (
            <Volume2 className="w-6 h-6 animate-pulse" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </GlowButton>

        {/* Transcript bubble */}
        {transcript && (
          <div className="absolute bottom-20 right-0 w-64 p-4 rounded-lg glass neon-border pulse-glow">
            <p className="text-sm">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  )
}
