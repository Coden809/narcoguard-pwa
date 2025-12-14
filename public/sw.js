// NarcoGuard Service Worker v2.0
// Enhanced caching strategy for offline-first PWA

const CACHE_VERSION = "narcoguard-v2.0.0"
const STATIC_CACHE = `${CACHE_VERSION}-static`
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`
const API_CACHE = `${CACHE_VERSION}-api`

// Critical assets to cache immediately
const STATIC_ASSETS = ["/", "/manifest.json", "/images/narcoguard-icon.jpeg", "/offline.html"]

// Cache strategies
const CACHE_STRATEGIES = {
  static: "cache-first",
  api: "network-first",
  images: "cache-first",
  dynamic: "network-first",
}

// Install event - cache critical assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...")

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("[SW] Caching static assets")
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName.startsWith("narcoguard-") &&
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== API_CACHE
            ) {
              console.log("[SW] Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // API requests - network first, cache fallback
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      caches.open(API_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              cache.put(request, response.clone())
            }
            return response
          })
          .catch(() => {
            // Fallback to cache
            return cache.match(request)
          })
      }),
    )
    return
  }

  // Static assets - cache first
  if (STATIC_ASSETS.some((asset) => url.pathname === asset)) {
    event.respondWith(caches.match(request).then((response) => response || fetch(request)))
    return
  }

  // Images - cache first
  if (request.destination === "image") {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return (
            response ||
            fetch(request).then((fetchResponse) => {
              cache.put(request, fetchResponse.clone())
              return fetchResponse
            })
          )
        })
      }),
    )
    return
  }

  // Default - network first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, responseClone))
        }
        return response
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request).then((response) => {
          return response || caches.match("/offline.html")
        })
      }),
  )
})

// Background sync for emergency requests
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync:", event.tag)

  if (event.tag === "sync-emergency") {
    event.waitUntil(syncEmergencyData())
  }
})

// Push notifications for emergency alerts
self.addEventListener("push", (event) => {
  console.log("[SW] Push notification received")

  const data = event.data ? event.data.json() : {}

  const options = {
    body: data.body || "Emergency alert from NarcoGuard",
    icon: "/images/narcoguard-icon.jpeg",
    badge: "/images/narcoguard-icon.jpeg",
    vibrate: [200, 100, 200, 100, 200],
    tag: "narcoguard-emergency",
    requireInteraction: true,
    actions: [
      { action: "view", title: "View Details" },
      { action: "dismiss", title: "Dismiss" },
    ],
  }

  event.waitUntil(self.registration.showNotification(data.title || "NarcoGuard Alert", options))
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked:", event.action)

  event.notification.close()

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/?emergency=true"))
  }
})

// Helper function for background sync
async function syncEmergencyData() {
  try {
    // Sync any pending emergency data
    console.log("[SW] Syncing emergency data...")
    // Implementation would sync queued emergency requests
  } catch (error) {
    console.error("[SW] Sync failed:", error)
  }
}
