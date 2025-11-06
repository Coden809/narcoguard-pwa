"use client"

import { HolographicCard } from "@/components/effects/holographic-card"
import { Brain, TrendingUp, AlertCircle, CheckCircle, Lightbulb } from "lucide-react"

export function AIInsights() {
  const insights = [
    {
      type: "positive",
      icon: CheckCircle,
      title: "Healthy Pattern Detected",
      description: "Your vitals have been stable for 7 consecutive days",
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Daily Tip",
      description: "Consider adding a trusted friend to your emergency contacts",
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Reminder",
      description: "Your naloxone kit expires in 45 days",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
    },
    {
      type: "trend",
      icon: TrendingUp,
      title: "Progress Update",
      description: "You've maintained a 30-day check-in streak",
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
    },
  ]

  return (
    <HolographicCard className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/20 pulse-glow">
            <Brain className="w-6 h-6 text-primary rotate-3d" />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-[family-name:var(--font-orbitron)]">AI INSIGHTS</h3>
            <p className="text-xs text-muted-foreground">Personalized recommendations</p>
          </div>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div
                key={index}
                className="p-4 rounded-lg glass neon-border hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${insight.bgColor} group-hover:pulse-glow transition-all`}>
                    <Icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* AI Learning indicator */}
        <div className="mt-4 p-3 rounded-lg glass text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-primary pulse-glow" />
            <span className="text-sm font-medium">AI Learning Active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            GuardiAIn is continuously learning your patterns to provide better support
          </p>
        </div>
      </div>
    </HolographicCard>
  )
}
