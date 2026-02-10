const CACHE_NAME = 'ahad-amna-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/manifest.json'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Push Notifications
self.addEventListener('push', (event) => {
  const title = 'Ahad & Amna 💑';
  const options = {
    body: event.data.text(),
    icon: '💑',
    badge: '💑',
    vibrate: [100, 50, 100],
    tag: 'hamara-connection'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
