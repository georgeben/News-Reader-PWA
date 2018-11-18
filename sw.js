const staticAssets = [
    './',
    './style.css',
    './app.js',
    './fallback.json',
    './images/icons/icon1.png'
]

self.addEventListener('install', event =>{
    console.log("Installed");
    caches.open("news-static")
    .then((cache) =>{
        cache.addAll(staticAssets);
    })
});

self.addEventListener('fetch', event =>{
    console.log("Fetching")
    let req = event.request;
    console.log("Fetch request",req)
    let url = new URL(req.url);
    console.log("URL for fetching", url);
    if(url.origin === location.origin){
        event.respondWith(cacheFirst(req));
    }else{
        event.respondWith(networkFirst(req))
    }
    
    
})

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
    
}

async function networkFirst(req){
    const cache = await caches.open("news-content");
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedResult =  await cache.match(req);
        return cachedResult || await caches.match('fallback.json')
    }
}