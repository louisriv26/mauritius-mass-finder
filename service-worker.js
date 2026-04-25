const CACHE='mmf-v16.2-release-hardening';
const SHELL=['./','index.html','app.js','config.js','fallback-data.js','manifest.json','manifest.webmanifest','service-worker.js','icon.svg','version.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING') self.skipWaiting();});
self.addEventListener('fetch',e=>{const url=new URL(e.request.url); if(url.pathname.endsWith('/version.json')||url.pathname.endsWith('/data/masses.json')||url.pathname.endsWith('/data/masses.csv')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request))); return;} e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).catch(()=>caches.match('index.html'))));});
