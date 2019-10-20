const cacheName = 'cache-v1';

const cachedResources = [
  '/',
  'index.html',
  'style/main.css',
  'images/still_life_medium.jpg'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(cachedResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(foundInCache => foundInCache || fetch(event.request))
  );
});