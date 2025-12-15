# NarcoGuard Marketing Automation

## Overview
Automated marketing system for NarcoGuard PWA and GoFundMe campaign.

## Campaign Details
- **GoFundMe URL**: https://gofund.me/ac8905cca
- **Live App**: https://narcoguard.app
- **Demo URL**: https://v0-narcoguard-pwa-build-4zfrgsdwj-coden809s-projects.vercel.app/
- **GitHub Repo**: https://github.com/coden809/narcoguard-pwa

## Goal
Raise $50,000 to fund 80 NarcoGuard 2 watches for Broome County, NY

## Automated Workflows

### 1. GoFundMe Marketing (3x daily)
- Posts campaign updates
- Tracks fundraising progress
- Generates progress reports
- Runs at: 9 AM, 1 PM, 6 PM EST

### 2. Social Media Campaign (1x daily)
- Posts daily campaign messages (7-day cycle)
- Generates shareable graphics
- Tracks engagement metrics
- Runs at: 9 AM EST

### 3. Content Creation (2x daily)
- Fetches GoFundMe statistics
- Generates new graphics
- Creates update posts
- Runs at: 5 AM, 3 PM EST

## 7-Day Campaign Messages

### Day 1: Launch Announcement
Focus: App is live, demo available
Hashtags: #OpioidCrisis #Binghamton #NarcoGuard

### Day 2: Hero Network
Focus: Volunteer response system
Hashtags: #HeroNetwork #BroomeCounty

### Day 3: Recovery Resources
Focus: Rat Park inspiration, community support
Hashtags: #RecoverySupport #RatPark

### Day 4: Share Request
Focus: Community engagement
Hashtags: #ShareToSaveLives

### Day 5: Technology Showcase
Focus: eSIM alerts, auto-injection
Hashtags: #MedicalTechnology #Innovation

### Day 6: Local Community
Focus: Binghamton/Broome County
Hashtags: #Binghamton #LocalSupport

### Day 7: Weekly Recap
Focus: Gratitude, progress update
Hashtags: #WeekOneDown #Grateful

## Setup Instructions

### Required Secrets (Optional)
Add these to GitHub repository secrets for social media posting:
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`
- `FACEBOOK_ACCESS_TOKEN`
- `LINKEDIN_ACCESS_TOKEN`

Without API keys, the workflows will still:
- Generate marketing content
- Save posts to /marketing/posts
- Track campaign progress
- Create graphics metadata

## Manual Posting
If social media APIs aren't configured, find generated content in:
- `/marketing/posts/` - Daily campaign messages
- `/marketing/graphics/` - Graphics metadata
- `/marketing/stats/` - Campaign statistics

## Engagement Tips
1. Post consistently at optimal times (9 AM, 1 PM, 6 PM)
2. Use all relevant hashtags
3. Include both demo and GoFundMe links
4. Share progress updates with specific dollar amounts
5. Tag local Binghamton/Broome County accounts
6. Engage with comments and shares
7. Cross-post to personal accounts

## Key Messages
- **80 watches = 80 lives protected**
- **Auto-naloxone injection saves seconds**
- **Hero Network connects volunteers**
- **Recovery resources transform lives**
- **Broome County's solution to opioid crisis**

## Target Audience
1. Binghamton/Broome County residents
2. Harm reduction advocates
3. Healthcare professionals
4. Recovery community members
5. Tech enthusiasts
6. Social impact investors

## Success Metrics
- GoFundMe donations
- App demo visits
- Social media engagement
- Share/repost rate
- Community volunteer signups
- Media coverage

## Contact
For questions about the campaign: Stephen Blanford
GitHub: @Coden809
