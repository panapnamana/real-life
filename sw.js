// Service Worker: macht die App offline nutzbar.
// Online wird immer die neueste Version geladen, offline die gespeicherte.
// Bei neuen Dateien die Liste ergänzen und VERSION erhöhen.
const VERSION = 'reallife-v2';
const FILES = [
  './',
  'index.html',
  'css/style.css',
  'js/app.js',
  'js/character.js',
  'js/body.js',
  'js/hair.js',
  'js/clothes.js',
  'js/svg.js',
  'manifest.webmanifest',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })),
  );
});
