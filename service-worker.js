const CACHE_NAME = "Felps Super Plinko";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "assets/style.css",
  "assets/script.js",
  "assets/img1.png",
  "assets/img2.png"
  // adicione aqui TODOS os arquivos do jogo que precisam estar offline
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
