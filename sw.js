// Bump VERSION whenever you change prices or products, so customers get the new files.
var VERSION = 'zoni-v4';
var FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "banner.jpg", "l-apple.png", "l-bank.png", "l-bkash.png", "l-card.png", "l-nagad.png", "l-play.png", "l-rocket.png", "logo.jpg", "logo.png", "p1.jpg", "p10.jpg", "p12.jpg", "p17.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg", "p6.jpg", "p7.jpg", "t1.jpg", "t10.jpg", "t11.jpg", "t12.jpg", "t13.jpg", "t14.jpg", "t15.jpg", "t16.jpg", "t17.jpg", "t18.jpg", "t2.jpg", "t3.jpg", "t4.jpg", "t5.jpg", "t6.jpg", "t7.jpg", "t8.jpg", "t9.jpg", "t9b.jpg"];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;   // WhatsApp, Facebook and fonts always go to the network
  e.respondWith(
    fetch(e.request).then(function (r) {
      var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copy); }); return r;
    }).catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match('index.html'); }); })
  );
});
