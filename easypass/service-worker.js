const CACHE_NAME = 'easypass-cache-v1';
const ASSETS_TO_CACHE = [
    '/easypass/',
    '/easypass/index.html',
    '/easypass/manifest.json',
    '/easypass/favicon.png',
    '/easypass/bitcoin-pattern-bg.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
