/* Mauritius Mass Finder v20.8 legacy service-worker migration bridge.
   Purpose: replace old v17.x sw.js registrations, clear stale caches, and force a network reload. */
const MIGRATION_CACHE = 'mauritius-mass-finder-v20.8-swjs-migration';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(Promise.resolve());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then(clients => Promise.all(clients.map(client => {
        try {
          const url = new URL(client.url);
          url.searchParams.set('mmf_migrated', Date.now());
          return client.navigate(url.toString());
        } catch (e) {
          return Promise.resolve();
        }
      })))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(response => response)
      .catch(() => caches.match(event.request).then(cached => cached || caches.match('index.html')))
  );
});
