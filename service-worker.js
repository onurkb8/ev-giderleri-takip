
self.addEventListener("push", function (event) {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (error) {
      data = {
        title: "Ev Giderlerim",
        body: event.data.text()
      };
    }
  }

  const title = data.title || "Ev Giderlerim";
  const options = {
    body: data.body || "Ödeme tarihini kontrol etmeyi unutma.",
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    data: {
      url: "./index.html"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function (windowClients) {
      for (const client of windowClients) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow("./index.html");
      }
    })
  );
});
