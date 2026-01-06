#!/usr/bin/env node

/**
 * NarcoGuard Production Validation Script
 * Runs comprehensive checks before deployment
 */

const fs = require("fs")
const path = require("path")

console.log("🔍 NarcoGuard Production Validation\n")

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0,
}

// Check 1: Package.json exists and valid
console.log("✓ Checking package.json...")
try {
  const pkg = require("../package.json")
  if (pkg.name === "narcoguard-pwa" && pkg.version) {
    console.log(`  ✓ Package: ${pkg.name} v${pkg.version}`)
    checks.passed++
  }
} catch (e) {
  console.error("  ✗ Package.json error:", e.message)
  checks.failed++
}

// Check 2: Essential files exist
console.log("\n✓ Checking essential files...")
const essentialFiles = [
  "next.config.ts",
  "vercel.json",
  "public/manifest.json",
  "public/sw.js",
  ".env.local",
  "app/page.tsx",
  "app/layout.tsx",
]

essentialFiles.forEach((file) => {
  const filePath = path.join(__dirname, "..", file)
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ ${file}`)
    checks.passed++
  } else {
    console.error(`  ✗ Missing: ${file}`)
    checks.failed++
  }
})

// Check 3: Environment variables
console.log("\n✓ Checking environment configuration...")
try {
  const envContent = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8")
  const requiredVars = ["NEXT_PUBLIC_APP_NAME", "NEXT_PUBLIC_APP_URL", "NEXT_PUBLIC_GOFUNDME_URL"]

  requiredVars.forEach((varName) => {
    if (envContent.includes(varName)) {
      console.log(`  ✓ ${varName}`)
      checks.passed++
    } else {
      console.warn(`  ⚠ Missing: ${varName}`)
      checks.warnings++
    }
  })
} catch (e) {
  console.error("  ✗ Error reading .env.local:", e.message)
  checks.failed++
}

// Check 4: Vercel configuration
console.log("\n✓ Checking Vercel configuration...")
try {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "vercel.json"), "utf8"))

  if (vercelConfig.env && vercelConfig.env.NEXT_PUBLIC_APP_URL === "https://narcoguard.app") {
    console.log("  ✓ Production URL configured: narcoguard.app")
    checks.passed++
  } else {
    console.warn("  ⚠ Production URL may not be configured")
    checks.warnings++
  }
} catch (e) {
  console.error("  ✗ Vercel config error:", e.message)
  checks.failed++
}

// Check 5: PWA Manifest
console.log("\n✓ Checking PWA manifest...")
try {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "manifest.json"), "utf8"))

  if (manifest.name && manifest.start_url && manifest.icons.length > 0) {
    console.log(`  ✓ Manifest: ${manifest.short_name}`)
    console.log(`  ✓ Icons: ${manifest.icons.length} configured`)
    console.log(`  ✓ Shortcuts: ${manifest.shortcuts?.length || 0} configured`)
    checks.passed += 3
  }
} catch (e) {
  console.error("  ✗ Manifest error:", e.message)
  checks.failed++
}

// Check 6: GitHub Actions workflows
console.log("\n✓ Checking automation workflows...")
const workflowDir = path.join(__dirname, "..", ".github", "workflows")
if (fs.existsSync(workflowDir)) {
  const workflows = fs.readdirSync(workflowDir).filter((f) => f.endsWith(".yml"))
  console.log(`  ✓ Found ${workflows.length} workflow(s)`)
  workflows.forEach((w) => console.log(`    - ${w}`))
  checks.passed++
} else {
  console.warn("  ⚠ No workflows directory found")
  checks.warnings++
}

// Summary
console.log("\n" + "=".repeat(50))
console.log("📊 Validation Summary")
console.log("=".repeat(50))
console.log(`✓ Passed: ${checks.passed}`)
console.log(`✗ Failed: ${checks.failed}`)
console.log(`⚠ Warnings: ${checks.warnings}`)

if (checks.failed === 0) {
  console.log("\n✅ All critical checks passed!")
  console.log("\n🚀 Ready for production deployment to narcoguard.app")
  console.log("\nNext steps:")
  console.log('1. Click "Publish" button in v0')
  console.log("2. Configure domain: narcoguard.app in Vercel")
  console.log("3. Push to GitHub: github.com/coden809/narcoguard-pwa")
  process.exit(0)
} else {
  console.log("\n❌ Some checks failed. Please fix before deploying.")
  process.exit(1)
}
