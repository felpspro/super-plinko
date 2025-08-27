self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};

  const title = data.title || 'Notificação';
  const options = {
    body: data.body || 'Grrupo Felps Professional',
    // icon: data.icon || '/favicon.png',       // Ícone principal (pequeno)
    // badge: data.badge || '/badge-icon.png', // Ícone para badge (ex: no Android)
    image: data.image || undefined,        // Imagem maior dentro da notificação (opcional)
    vibrate: data.vibrate || [100, 50, 100], // Padrão de vibração (exemplo)
    actions: data.actions || [],
    data: {
      url: data.url || '/' // para usar no clique
    },
    requireInteraction: data.requireInteraction || false, // Se true, notificação fica até o usuário interagir
    silent: data.silent || false // Se true, notificação não faz som
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const url = event.notification.data.url;
  if (event.action === 'open_url') {
    // Caso usuário clique no botão de ação
    event.waitUntil(clients.openWindow(url));
  } else {
    // Caso clique no corpo da notificação
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});
