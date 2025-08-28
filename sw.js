const CACHE_VERSION = "v7";
const CACHE_NAME = `felps-plinko-${CACHE_VERSION}`;

const FILES_TO_CACHE = [
  "/", 
  "/index.html",
  "/icon.ico",
  "/share.jpg",

  // CSS
  "/css/main.css",
  "/css/normalize.css",
  "/css/fonts/azonix-webfont.woff",
  "/css/fonts/azonix-webfont.woff2",

  // JS principais
  "/js/main.js",
  "/js/init.js",
  "/js/game.js",
  "/js/loader.js",
  "/js/sound.js",
  "/js/mobile.js",
  "/js/p2.js",
  "/js/plugins.js",
  "/js/canvas.js",

  // Vendor
  "/js/vendor/jquery.min.js",
  "/js/vendor/createjs.min.js",
  "/js/vendor/TweenMax.min.js",
  "/js/vendor/mobile-detect.js",
  "/js/vendor/p2.min.js",

  // Ícones
  "/assets/icons/apple-touch-icon.png",
  "/assets/icons/favicon-96x96.png",
  "/assets/icons/favicon.ico",
  "/assets/icons/favicon.svg",
  "/assets/icons/web-app-manifest-192x192.png",
  "/assets/icons/web-app-manifest-512x512.png",
  "/assets/icons/site.webmanifest",

  // Social
  "/assets/social/button_facebook.png",
  "/assets/social/button_twitter.png",
  "/assets/social/button_whatsapp.png",

  // Sons/imagens
  "/assets/sounds/sound_bonus.mp3",
  "/assets/sounds/sound_bonus.ogg",
  "/assets/sounds/sound_button.mp3",
  "/assets/sounds/sound_button.ogg",
  "/assets/sounds/sound_chips.mp3",
  "/assets/sounds/sound_chips.ogg",
  "/assets/sounds/sound_coin.mp3",
  "/assets/sounds/sound_coin.ogg",
  "/assets/sounds/sound_hit1.mp3",
  "/assets/sounds/sound_hit1.ogg",
  "/assets/sounds/sound_hit2.mp3",
  "/assets/sounds/sound_hit2.ogg",
  "/assets/sounds/sound_hit3.mp3",
  "/assets/sounds/sound_hit3.ogg",
  "/assets/sounds/sound_nowin.mp3",
  "/assets/sounds/sound_nowin.ogg",
  "/assets/sounds/sound_result.mp3",
  "/assets/sounds/sound_result.ogg",
  "/assets/sounds/sound_score.mp3",
  "/assets/sounds/sound_score.ogg",
  "/assets/sounds/sound_start.mp3",
  "/assets/sounds/sound_start.ogg",

  "/assets/background.png",
  "/assets/button_cancel.png",
  "/assets/button_confirm.png",
  "/assets/button_continue.png",
  "/assets/button_exit.png",
  "/assets/button_facebook.png",
  "/assets/button_fullscreen.png",
  "/assets/button_minus.png",
  "/assets/button_plus.png",
  "/assets/button_save.png",
  "/assets/button_settings.png",
  "/assets/button_share.png",
  "/assets/button_sound_off.png",
  "/assets/button_sound_on.png",
  "/assets/button_start.png",
  "/assets/button_twitter.png",
  "/assets/button_whatsapp.png",
  "/assets/item_ball.png",
  "/assets/item_bet.png",
  "/assets/item_bonus.png",
  "/assets/item_coin.png",
  "/assets/item_dollar.png",
  "/assets/item_exit.png",
  "/assets/item_plinko.png",
  "/assets/item_result.png",
  "/assets/item_prize_bonus.png",
  "/assets/item_ball_bonus.png",
  "/assets/item_droparrow.png",
  "/assets/item_droparrow_bonus.png",
  "/assets/loader.png",
  "/assets/logo.png",
  "/assets/rotate.png"
];

// Instala cache
self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        await cache.addAll(FILES_TO_CACHE);
        console.log("[SW] Cache completo instalado");
      } catch (err) {
        console.warn("[SW] Erro ao cachear arquivos:", err);
      }
    })()
  );
  self.skipWaiting();
});

// Ativa e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache primeiro, rede depois, fallback index.html
self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      try {
        // Tenta cache
        const cached = await caches.match(event.request);
        if (cached) return cached;

        // Tenta rede
        const response = await fetch(event.request);
        return response;
      } catch (err) {
        // Fallback para navegação offline
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      }
    })()
  );
});
