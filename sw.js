/* Service worker: офлайн-кэш каркаса приложения (cache-first + фоновое обновление) */
const CACHE = 'designer-refs-v2';
const APP_SHELL = [
  './',
  './index.html',
  './references.css',
  './references.js',
  './references.data.js',
  './icon.svg',
  './manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Сначала сеть (всегда свежее для превью), при оффлайне — кэш.
  event.respondWith(
    fetch(req).then((resp) => {
      if (resp && (resp.ok || resp.type === 'opaque')) {
        const copy = resp.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
      }
      return resp;
    }).catch(() => caches.match(req))
  );
});
