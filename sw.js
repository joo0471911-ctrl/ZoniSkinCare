// Bump VERSION whenever you change prices or products, so customers get the new files.
var VERSION = 'zoni-v3';
var FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "img/banner.jpg", "img/l-apple.png", "img/l-bank.png", "img/l-bkash.png", "img/l-card.png", "img/l-nagad.png", "img/l-play.png", "img/l-rocket.png", "img/logo.jpg", "img/logo.png", "img/p1.jpg", "img/p10.jpg", "img/p12.jpg", "img/p17.jpg", "img/p2.jpg", "img/p3.jpg", "img/p4.jpg", "img/p5.jpg", "img/p6.jpg", "img/p7.jpg", "img/t1.jpg", "img/t10.jpg", "img/t11.jpg", "img/t12.jpg", "img/t13.jpg", "img/t14.jpg", "img/t15.jpg", "img/t16.jpg", "img/t17.jpg", "img/t18.jpg", "img/t2.jpg", "img/t3.jpg", "img/t4.jpg", "img/t5.jpg", "img/t6.jpg", "img/t7.jpg", "img/t8.jpg", "img/t9.jpg", "img/t9b.jpg"];
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
