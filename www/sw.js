// Solo se usa en la versión web (navegador). Sube VERSION cuando cambies archivos de www/.
const VERSION = 'sim-enfermeria-v4';
const ARCHIVOS = ['./', './index.html', './manifest.webmanifest', './js/env.js', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    const copia = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copia)); return res;
  }).catch(() => caches.match('./index.html'))));
});
