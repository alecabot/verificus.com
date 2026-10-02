const C = "verificus-v5";
const F = ["./", "index.html", "news.json", "manifest.webmanifest", "icon-192.png", "icon-512.png", "img/n1.svg", "img/n2.svg", "img/n3.svg", "img/n4.svg", "img/n5.svg", "img/n6.svg", "img/n7.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(F))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request)));
});
