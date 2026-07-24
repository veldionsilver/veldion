// ============================================================
// 📁 sw.js - Service Worker Veldion Silver
// VERSION: 2.0 (data.js TIDAK di-cache)
// ============================================================

const CACHE_NAME = 'veldion-v2';

// STATIC_ASSETS - TANPA data.js (biar selalu update)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/images/logo.webp',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

// ============================================================
// INSTALL
// ============================================================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ============================================================
// ACTIVATE
// ============================================================
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ============================================================
// FETCH
// ============================================================
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (fonts, CDN, etc.)
  if (url.origin !== self.location.origin) return;

  // ============================================================
  // 🔥 KHUSUS data.js: SELALU AMBIL DARI JARINGAN
  // ============================================================
  if (request.url.includes('/assets/js/data.js')) {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(response => {
          return response;
        })
        .catch(() => {
          // Fallback ke cache kalau offline
          return caches.match(request);
        })
    );
    return;
  }

  // ============================================================
  // Cache-first untuk static assets (selain data.js)
  // ============================================================
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'image' ||
      request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // ============================================================
  // Stale-while-revalidate untuk HTML
  // ============================================================
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(request, response.clone());
          return response;
        });
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
