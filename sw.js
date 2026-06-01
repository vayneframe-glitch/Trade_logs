// TradeLog Service Worker v3 - Auto clear cache
const CACHE_NAME = 'tradelog-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network only - ไม่ cache อะไรเลย
self.addEventListener('fetch', e => {
  // ไม่ intercept request ใดๆ ทั้งสิ้น
  return;
});
