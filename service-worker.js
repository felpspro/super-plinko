const CACHE_NAME = "jogo-cache-v1";

const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "assets/style.css",
  "assets/script.js",
  "assets/img1.png",
  "assets/img2.png",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/icons/192x192.png",
  "assets/icons/512x512.png",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/favicon-16x16.png",
  "assets/icons/favicon-32x32.png",
  "assets/icons/favicon.ico",
  "assets/icons/favicon.ico",
  // adicione aqui todos os arquivos do jogo
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
