const staticCache = 'Static-v25'
const dynamicCache = 'Dynamic-v25'

const assets = [
    "/",
    "/index.html",
    "/pages/tasks.html",
    "/pages/supplies.html",
    "/pages/projects.html",
    "/pages/contractors.html",
    "/pages/fallback.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/style.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
]

const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
        cache.keys().then((keys) => {
            if (keys.length > size) {
                cache.delete(keys[0]).then((limitCacheSize(name, size)))
            }
        })
    })
}

self.addEventListener('install', function(event) {
    console.log(`SW: Event fired: ${event.type}`)
    event.waitUntil(caches.open(staticCache).then(function (cache) {
        console.log("SW: Precaching App shell")
        cache.addAll(assets)
    })) 
})

self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then((keys) => {
        return Promise.all(keys.filter((key) => key !== staticCache && key !== dynamicCache).map((key) => caches.delete(key)))
    }))
})

self.addEventListener('fetch', function(event) {
    if(event.request.url.indexOf("firestore.googleapis.com") === -1) {
    event.respondWith(caches.match(event.request).then((response) => {
        return (response || fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
                cache.put(event.request.url, fetchRes.clone())
                limitCacheSize(dynamicCache, 15)
                return fetchRes
            })
        }))
    }).catch(() => caches.match('/pages/fallback.html')))
}
})