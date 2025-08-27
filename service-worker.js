const CACHE_NAME = "jogo-cache-v1";

const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "assets/style.css",
  "assets/script.js",
  "assets/img1.png",
  "assets/img2.png",
  "assets/icon-192.png",
  "assets/icon-512.png"
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
