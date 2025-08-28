const CACHE_VERSION = "v3"; // altere sempre que mudar algum arquivo
const CACHE_NAME = `felps-plinko-${CACHE_VERSION}`;

const FILES_TO_CACHE = [
  "/", 
  "/index.html",
  "/share.php",
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

  // SW auxiliar
  "/sw.js",
  "/workbox-config.js",

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
  "/assets/sounds/item_ball_bonus.png",
  "/assets/sounds/item_droparrow.png",
  "/assets/sounds/item_droparrow_bonus.png",
  "/assets/sounds/loader.png",
  "/assets/sounds/logo.png",
  "/assets/sounds/rotate.png"
];

// Instala nova versão do cache
self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
        } catch (err) {
          console.warn("Falhou ao adicionar ao cache:", file, err);
        }
      }
    })()
  );
  self.skipWaiting(); // força ativação imediata
});

// Ativa e limpa caches antigos automaticamente
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // aplica imediatamente aos clients abertos
});

// Busca primeiro no cache, senão vai na rede
/* self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
}); */


// Busca primeiro no cache, depois rede, e se falhar => carrega index.html offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // se já tem no cache, devolve
      if (response) return response;

      // tenta pegar da rede
      return fetch(event.request).catch(() => {
        // se falhar (offline), sempre abre o jogo
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      });
    })
  );
});