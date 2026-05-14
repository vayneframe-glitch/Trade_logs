// TradeLog Service Worker v2
const CACHE_NAME = 'tradelog-v2';

// Install — skip waiting
self.addEventListener('install', e => {
  self.skipWaiting();
});

// Activate — clear ALL old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network FIRST, never intercept Apps Script
self.addEventListener('fetch', e => {
  const url = e.request.url;
  
  // ไม่แตะ Apps Script เด็ดขาด
  if (url.includes('script.google.com')) return;
  
  // ไม่แตะ non-GET
  if (e.request.method !== 'GET') return;
  
  // Network first เสมอ ไม่ cache HTML
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
