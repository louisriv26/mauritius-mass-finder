const CACHE='mmf-v13-6-shell';
const SHELL=['./','index.html','app.js','config.js','fallback-data.js','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url); if(url.pathname.endsWith('/data/masses.json')||url.pathname.endsWith('/data/masses.csv')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request))); return;} e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).catch(()=>caches.match('index.html'))));});
