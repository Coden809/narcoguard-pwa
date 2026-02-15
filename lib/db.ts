import { neon } from "@neondatabase/serverless"

function getSQL() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set")
  }
  return neon(process.env.DATABASE_URL)
}

// ============ USERS ============
export async function createUser(data: {
  email: string
  name: string
  phone?: string
  role?: string
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO users (email, name, phone, role)
    VALUES (${data.email}, ${data.name}, ${data.phone || null}, ${data.role || "user"})
    RETURNING *
  `
  return result[0]
}

export async function getUserByEmail(email: string) {
  const sql = getSQL()
  const result = await sql`SELECT * FROM users WHERE email = ${email}`
  return result[0] || null
}

export async function getUserById(id: string) {
  const sql = getSQL()
  const result = await sql`SELECT * FROM users WHERE id = ${id}`
  return result[0] || null
}

// ============ VITALS ============
export async function recordVitals(data: {
  userId?: string
  heartRate: number
  spo2: number
  respiratoryRate: number
  temperature?: number
  riskLevel: string
  overdoseDetected?: boolean
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO vitals_readings (user_id, heart_rate, spo2, respiratory_rate, temperature, risk_level, overdose_detected)
    VALUES (${data.userId || null}, ${data.heartRate}, ${data.spo2}, ${data.respiratoryRate}, ${data.temperature || null}, ${data.riskLevel}, ${data.overdoseDetected || false})
    RETURNING *
  `
  return result[0]
}

export async function getRecentVitals(userId: string, limit = 50) {
  const sql = getSQL()
  return await sql`
    SELECT * FROM vitals_readings 
    WHERE user_id = ${userId} 
    ORDER BY recorded_at DESC 
    LIMIT ${limit}
  `
}

export async function getLatestVitals(userId: string) {
  const sql = getSQL()
  const result = await sql`
    SELECT * FROM vitals_readings 
    WHERE user_id = ${userId} 
    ORDER BY recorded_at DESC 
    LIMIT 1
  `
  return result[0] || null
}

// ============ EMERGENCIES ============
export async function createEmergency(data: {
  userId?: string
  latitude: number
  longitude: number
  emergencyType?: string
  vitalsSnapshot?: object
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO emergencies (user_id, latitude, longitude, emergency_type, vitals_snapshot)
    VALUES (${data.userId || null}, ${data.latitude}, ${data.longitude}, ${data.emergencyType || "overdose"}, ${JSON.stringify(data.vitalsSnapshot || {})})
    RETURNING *
  `
  return result[0]
}

export async function updateEmergencyStatus(id: string, status: string, resolvedBy?: string) {
  const sql = getSQL()
  const result = await sql`
    UPDATE emergencies 
    SET status = ${status}, 
        resolved_by = ${resolvedBy || null},
        resolved_at = ${status === "resolved" ? new Date().toISOString() : null}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function getActiveEmergencies() {
  const sql = getSQL()
  return await sql`
    SELECT * FROM emergencies 
    WHERE status IN ('active', 'responding') 
    ORDER BY created_at DESC
  `
}

// ============ HEROES ============
export async function registerHero(data: {
  userId?: string
  name: string
  email: string
  phone?: string
  latitude?: number
  longitude?: number
  certifications?: string[]
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO heroes (user_id, name, email, phone, latitude, longitude, certifications)
    VALUES (${data.userId || null}, ${data.name}, ${data.email}, ${data.phone || null}, ${data.latitude || null}, ${data.longitude || null}, ${JSON.stringify(data.certifications || [])})
    RETURNING *
  `
  return result[0]
}

export async function getNearbyHeroes(lat: number, lon: number, radiusMiles = 5) {
  const sql = getSQL()
  return await sql`
    SELECT *, 
      (3959 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lon})) + sin(radians(${lat})) * sin(radians(latitude)))) AS distance
    FROM heroes 
    WHERE is_active = true AND is_available = true
      AND latitude IS NOT NULL AND longitude IS NOT NULL
    HAVING distance < ${radiusMiles}
    ORDER BY distance
    LIMIT 20
  `
}

export async function updateHeroLocation(heroId: string, lat: number, lon: number) {
  const sql = getSQL()
  return await sql`
    UPDATE heroes SET latitude = ${lat}, longitude = ${lon}, last_active = NOW()
    WHERE id = ${heroId}
    RETURNING *
  `
}

// ============ EMERGENCY RESPONSES ============
export async function createEmergencyResponse(data: {
  emergencyId: string
  heroId: string
  eta?: number
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO emergency_responses (emergency_id, hero_id, eta_minutes)
    VALUES (${data.emergencyId}, ${data.heroId}, ${data.eta || null})
    RETURNING *
  `
  return result[0]
}

// ============ LOCATIONS ============
export async function updateUserLocation(data: {
  userId?: string
  latitude: number
  longitude: number
  accuracy?: number
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO locations (user_id, latitude, longitude, accuracy)
    VALUES (${data.userId || null}, ${data.latitude}, ${data.longitude}, ${data.accuracy || null})
    RETURNING *
  `
  return result[0]
}

// ============ WATCHES ============
export async function registerWatch(data: {
  userId?: string
  serialNumber: string
  model?: string
  firmwareVersion?: string
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO watches (user_id, serial_number, model, firmware_version)
    VALUES (${data.userId || null}, ${data.serialNumber}, ${data.model || "NG2-Pro"}, ${data.firmwareVersion || "1.0.0"})
    RETURNING *
  `
  return result[0]
}

export async function getWatchBySerial(serial: string) {
  const sql = getSQL()
  const result = await sql`SELECT * FROM watches WHERE serial_number = ${serial}`
  return result[0] || null
}

// ============ DONATIONS ============
export async function recordDonation(data: {
  donorName?: string
  donorEmail?: string
  amount: number
  source?: string
  message?: string
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO donations (donor_name, donor_email, amount, source, message)
    VALUES (${data.donorName || "Anonymous"}, ${data.donorEmail || null}, ${data.amount}, ${data.source || "gofundme"}, ${data.message || null})
    RETURNING *
  `
  return result[0]
}

export async function getDonationStats() {
  const sql = getSQL()
  const result = await sql`
    SELECT 
      COUNT(*) as total_donations,
      COALESCE(SUM(amount), 0) as total_raised,
      COALESCE(AVG(amount), 0) as avg_donation
    FROM donations
  `
  return result[0]
}

// ============ ACTIVITY LOG ============
export async function logActivity(data: {
  userId?: string
  action: string
  details?: object
}) {
  const sql = getSQL()
  return await sql`
    INSERT INTO activity_log (user_id, action, details)
    VALUES (${data.userId || null}, ${data.action}, ${JSON.stringify(data.details || {})})
  `
}

// ============ LEGAL AGREEMENTS ============
export async function recordAgreement(data: {
  userId?: string
  agreementType: string
  version?: string
  ipAddress?: string
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO legal_agreements (user_id, agreement_type, agreement_version, ip_address)
    VALUES (${data.userId || null}, ${data.agreementType}, ${data.version || "1.0"}, ${data.ipAddress || null})
    RETURNING *
  `
  return result[0]
}

// ============ EMERGENCY CONTACTS ============
export async function addEmergencyContact(data: {
  userId: string
  name: string
  phone: string
  relationship?: string
}) {
  const sql = getSQL()
  const result = await sql`
    INSERT INTO emergency_contacts (user_id, name, phone, relationship)
    VALUES (${data.userId}, ${data.name}, ${data.phone}, ${data.relationship || null})
    RETURNING *
  `
  return result[0]
}

export async function getEmergencyContacts(userId: string) {
  const sql = getSQL()
  return await sql`
    SELECT * FROM emergency_contacts WHERE user_id = ${userId} ORDER BY is_primary DESC
  `
}

// ============ DASHBOARD STATS ============
export async function getDashboardStats() {
  const sql = getSQL()
  const [users, heroes, emergencies, donations] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM users`,
    sql`SELECT COUNT(*) as count FROM heroes WHERE is_active = true`,
    sql`SELECT COUNT(*) as count FROM emergencies`,
    sql`SELECT COALESCE(SUM(amount), 0) as total FROM donations`,
  ])
  return {
    totalUsers: Number(users[0]?.count || 0),
    activeHeroes: Number(heroes[0]?.count || 0),
    totalEmergencies: Number(emergencies[0]?.count || 0),
    totalDonations: Number(donations[0]?.total || 0),
  }
}
