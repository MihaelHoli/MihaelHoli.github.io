
const CACHE_NAME = 'object-detection-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/components/object-detection.js',
  // Add other files that need to be cached
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});