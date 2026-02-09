const CACHE = "murcia-incidencias-v1";
const ASSETS = ["./","./index.html","./config.js","./data/incidents.json","./data/stats.json","./data/sources.json"];
self.addEventListener("install", (e)=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS);self.skipWaiting();})());});
self.addEventListener("activate",(e)=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)));self.clients.claim();})());});
self.addEventListener("fetch",(e)=>{
  const u=new URL(e.request.url);
  if(u.pathname.includes("/data/")){
    e.respondWith((async()=>{
      try{const r=await fetch(e.request,{cache:"no-store"});(await caches.open(CACHE)).put(e.request,r.clone());return r;}
      catch{ return (await caches.match(e.request)) || new Response("{}",{status:200,headers:{"Content-Type":"application/json"}}); }
    })());
    return;
  }
  e.respondWith((async()=> (await caches.match(e.request)) || fetch(e.request))());
});
