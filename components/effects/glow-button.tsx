"use client"

import { Button } from "@/components/ui/button"
import { RippleEffect } from "./ripple-effect"
import type { ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "default" | "emergency" | "success"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
}

export function GlowButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
}: GlowButtonProps) {
  const variantClasses = {
    default: "pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground",
    emergency: "emergency-pulse bg-destructive hover:bg-destructive/90 text-destructive-foreground",
    success: "pulse-glow bg-green-600 hover:bg-green-700 text-white",
  }

  return (
    <RippleEffect>
      <Button
        onClick={onClick}
        size={size}
        disabled={disabled}
        className={`${variantClasses[variant]} transition-all duration-300 transform hover:scale-105 ${className}`}
      >
        {children}
      </Button>
    </RippleEffect>
  )
}
