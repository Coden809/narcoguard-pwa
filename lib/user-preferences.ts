export interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  notifyMethod: "call" | "text" | "both"
}

export interface NaloxoneLocation {
  id: string
  description: string
  location: string
  instructions?: string
}

export interface UserPreferences {
  name: string
  hasCompletedOnboarding: boolean
  skippedSetup?: boolean
  emergencyContacts: EmergencyContact[]
  naloxoneLocations: NaloxoneLocation[]
  emergencyPreferences: {
    soundAlarm: boolean
    call911: boolean
    notifyContacts: boolean
    shareLocation: boolean
  }
  privacy: {
    incognitoMode: boolean
    shareWithHeroes: boolean
    anonymousMode: boolean
  }
  features: {
    neverUseAlone: boolean
    autoDetection: boolean
    voiceActivation: boolean
  }
  legal: {
    acceptedTerms: boolean
    acceptedPrivacy: boolean
    acceptedHIPAA: boolean
    acknowledgedGoodSamaritan: boolean
    state?: string
  }
  heroStatus?: {
    isHero: boolean
    completedTraining: boolean
    certifications: string[]
  }
}

const DEFAULT_PREFERENCES: UserPreferences = {
  name: "",
  hasCompletedOnboarding: false,
  skippedSetup: false,
  emergencyContacts: [],
  naloxoneLocations: [],
  emergencyPreferences: {
    soundAlarm: true,
    call911: true,
    notifyContacts: true,
    shareLocation: true,
  },
  privacy: {
    incognitoMode: false,
    shareWithHeroes: true,
    anonymousMode: false,
  },
  features: {
    neverUseAlone: true,
    autoDetection: true,
    voiceActivation: true,
  },
  legal: {
    acceptedTerms: false,
    acceptedPrivacy: false,
    acceptedHIPAA: false,
    acknowledgedGoodSamaritan: false,
  },
}

export function getUserPreferences(): UserPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES

  const stored = localStorage.getItem("narcoguard_preferences")
  if (!stored) return DEFAULT_PREFERENCES

  try {
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) }
  } catch {
    return DEFAULT_PREFERENCES
  }
}

export function saveUserPreferences(preferences: Partial<UserPreferences>) {
  if (typeof window === "undefined") return

  const current = getUserPreferences()
  const updated = { ...current, ...preferences }
  localStorage.setItem("narcoguard_preferences", JSON.stringify(updated))
}

export function resetUserPreferences() {
  if (typeof window === "undefined") return
  localStorage.removeItem("narcoguard_preferences")
}
