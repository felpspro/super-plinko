const CACHE_NAME = "felps-plinko-v1";

// Coloque aqui TODOS os arquivos que precisam estar disponíveis offline
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/share.php",

  // CSS
  "/css/main.css",
  "/css/normalize.css",

  // JS principais
  "/js/main.js",
  "/js/init.js",
  "/js/game.js",
  "/js/loader.js",
  "/js/sound.js",
  "/js/mobile.js",
  "/js/plugins.js",

  // Vendor
  "/js/vendor/jquery.min.js",
  "/js/vendor/createjs.min.js",
  "/js/vendor/TweenMax.min.js",
  "/js/vendor/mobile-detect.js",
  "/js/vendor/p2.min.js",
  "/js/vendor/canvas.js",

  // Fonts
  "/css/fonts/azonix-webfont.woff",
  "/css/fonts/azonix-webfont.woff2",

  // Ícones do PWA
  "/assets/icons/apple-touch-icon.png",
  "/assets/icons/favicon-96x96.png",
  "/assets/icons/favicon.ico",
  "/assets/icons/favicon.svg",
  "/assets/icons/web-app-manifest-192x192.png",
  "/assets/icons/web-app-manifest-512x512.png",

  // Assets do jogo (imagens)
  "/assets/social/button_facebook.png",
  "/assets/social/button_twitter.png",
  "/assets/social/button_whatsapp.png",

  "/assets/sounds/background.png",
  "/assets/sounds/button_cancel.png",
  "/assets/sounds/button_confirm.png",
  "/assets/sounds/button_continue.png",
  "/assets/sounds/button_exit.png",
  "/assets/sounds/button_facebook.png",
  "/assets/sounds/button_fullscreen.png",
  "/assets/sounds/button_minus.png",
  "/assets/sounds/button_plus.png",
  "/assets/sounds/button_save.png",
  "/assets/sounds/button_settings.png",
  "/assets/sounds/button_share.png",
  "/assets/sounds/button_sound_off.png",
  "/assets/sounds/button_sound_on.png",
  "/assets/sounds/button_start.png",
  "/assets/sounds/button_twitter.png",
  "/assets/sounds/button_whatsapp.png",

  "/assets/sounds/item_ball.png",
  "/assets/sounds/item_bet.png",
  "/assets/sounds/item_bonus.png",
  "/assets/sounds/item_coin.png",
  "/assets/sounds/item_dollar.png",
  "/assets/sounds/item_exit.png",
  "/assets/sounds/item_plinko.png",
  "/assets/sounds/item_result.png",
  "/assets/sounds/item_prize_bonus.png",
  "/assets/sounds/loader.png",
  "/assets/sounds/logo.png",
  "/assets/sounds/rotate.png"
];

// Instala e adiciona os arquivos ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa e remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepta fetch e responde do cache ou da rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
