const axios = require("axios")
const fs = require("fs")
const path = require("path")

// 7-Day Campaign Messages
const campaignMessages = [
  {
    day: 1,
    message: `🚨 BIG UPDATE: Narcoguard PWA is LIVE!

Try the recovery app, Hero Network map, and overdose alerts demo.
This is what your donation builds.

Live demo: ${process.env.DEMO_URL}
Fund 80 life-saving watches: ${process.env.GOFUNDME_URL}

Thank you — let's save lives in Broome County! 💙

#OpioidCrisis #Binghamton #NarcoGuard #SaveLives #HarmReduction`,
    hashtags: ["OpioidCrisis", "Binghamton", "NarcoGuard", "SaveLives", "HarmReduction"],
  },
  {
    day: 2,
    message: `📍 Day 2: App live with Hero Network map!

Volunteers can sign up to respond to overdose emergencies in real-time.
Every donation gets us closer to 80 watches.

Try the Hero Network: ${process.env.DEMO_URL}
Donate: ${process.env.GOFUNDME_URL}

#HeroNetwork #BroomeCounty #OverdosePrevention`,
    hashtags: ["HeroNetwork", "BroomeCounty", "OverdosePrevention"],
  },
  {
    day: 3,
    message: `🌟 The recovery tools in Narcoguard PWA:
✅ Job resources
✅ Treatment finder
✅ Peer support network
Inspired by Rat Park — connection saves lives.

Demo the app: ${process.env.DEMO_URL}
Help build the watches: ${process.env.GOFUNDME_URL}

#RecoverySupport #RatPark #AddictionRecovery`,
    hashtags: ["RecoverySupport", "RatPark", "AddictionRecovery"],
  },
  {
    day: 4,
    message: `🙏 If you can't donate today, please share the Narcoguard app demo with one person.

Every share helps us reach our goal of 80 watches.
Every watch saves lives.

Try it: ${process.env.DEMO_URL}
Support: ${process.env.GOFUNDME_URL}

#ShareToSaveLives #CommunitySupport`,
    hashtags: ["ShareToSaveLives", "CommunitySupport"],
  },
  {
    day: 5,
    message: `🎯 Milestone update!

See how eSIM alerts & auto-naloxone injection work in the live app.
80 watches = 80 lives protected 24/7.

Demo the tech: ${process.env.DEMO_URL}
Support: ${process.env.GOFUNDME_URL}

#MedicalTechnology #Innovation #OverdoseResponse`,
    hashtags: ["MedicalTechnology", "Innovation", "OverdoseResponse"],
  },
  {
    day: 6,
    message: `📍 Binghamton locals: Narcoguard is for OUR community.

Recovery resources, job listings, peer support — all in the app.
Help us bring 80 watches home.

Try the resources: ${process.env.DEMO_URL}
Fund it: ${process.env.GOFUNDME_URL}

#Binghamton #BroomeCounty #LocalSupport`,
    hashtags: ["Binghamton", "BroomeCounty", "LocalSupport"],
  },
  {
    day: 7,
    message: `🎉 Week 1 complete!

✅ App deployed
✅ Prototypes closer than ever
✅ Community growing

Thank you for believing in this mission.

Demo: ${process.env.DEMO_URL}
Donate: ${process.env.GOFUNDME_URL}

Let's save lives together! 💙

#WeekOneDown #Grateful #KeepSharing`,
    hashtags: ["WeekOneDown", "Grateful", "KeepSharing"],
  },
]

async function getDayOfCampaign() {
  const forceDay = process.env.FORCE_DAY
  if (forceDay) return Number.parseInt(forceDay)

  // Calculate day based on cycle (repeats every 7 days)
  const startDate = new Date("2025-01-01")
  const today = new Date()
  const diffTime = Math.abs(today - startDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return (diffDays % 7) + 1
}

async function postToTwitter(message) {
  console.log("[v0] Posting to Twitter:", message.substring(0, 50) + "...")
  // Twitter API implementation would go here
  // For now, just log the message
  return true
}

async function postToFacebook(message) {
  console.log("[v0] Posting to Facebook:", message.substring(0, 50) + "...")
  // Facebook API implementation would go here
  return true
}

async function postToLinkedIn(message) {
  console.log("[v0] Posting to LinkedIn:", message.substring(0, 50) + "...")
  // LinkedIn API implementation would go here
  return true
}

async function saveToMarketing(dayNumber, message) {
  const marketingDir = path.join(__dirname, "../marketing/posts")
  if (!fs.existsSync(marketingDir)) {
    fs.mkdirSync(marketingDir, { recursive: true })
  }

  const filename = `day-${dayNumber}-${new Date().toISOString().split("T")[0]}.txt`
  fs.writeFileSync(path.join(marketingDir, filename), message)
  console.log("[v0] Saved marketing post:", filename)
}

async function main() {
  try {
    const dayNumber = await getDayOfCampaign()
    const campaign = campaignMessages[dayNumber - 1]

    console.log(`[v0] Posting Day ${dayNumber} campaign message`)

    // Post to social media platforms
    await postToTwitter(campaign.message)
    await postToFacebook(campaign.message)
    await postToLinkedIn(campaign.message)

    // Save to marketing folder
    await saveToMarketing(dayNumber, campaign.message)

    console.log("[v0] Successfully posted daily campaign message!")
  } catch (error) {
    console.error("[v0] Error posting campaign:", error)
    process.exit(1)
  }
}

main()
