const staticCache = 'Static-v1'
const dynamicCache = 'Dynamic-v1'

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

self.addEventListener('install', function(event) {
    console.log(`SW: Event fired: ${event.type}`)
    event.waitUntil(caches.open(staticCache).then(function (cache) {
        console.log("SW: Precaching App shell")
        cache.addAll(assets)
    })) 
})

self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then((keys) => {
        return Promise.all(keys.filter((key) => key !== staticCache).map((key) => caches.delete(key)))
    }))
})

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then((response) => {
        return (response || fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
                cache.put(event.request.url, fetchRes.clone())
                return fetchRes
            })
        }))
    }).catch(() => caches.match('/pages/fallback.html')))
})