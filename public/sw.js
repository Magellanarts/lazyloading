/* eslint-disable func-names */
const CACHE_NAME = 'lazy-loading-cache-v1';
const urlsToCache = [
  '/',
  '/app.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }),
  );
});

/*
self.addEventListener('fetch', (event) => {
  // console.log(event.request);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('getting cached');
          console.log(response);
          return response;
        }
        console.log('no match');
        return fetch(event.request);
      }),
  );
});

*/

self.addEventListener('fetch', (e) => {
  e.respondWith((async function () {
    const cachedResponse = await caches.match(e.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(e.request);

    const hosts = [
      'https://fonts.googleapis.com',
      'https://maxcdn.bootstrapcdn.com',
      'https://use.fontawesome.com',
      'https://fonts.gstatic.com',
      'https://firebasestorage.googleapis.com',
    ];

    if (hosts.some(host => e.request.url.startsWith(host))) {
      // This clone() happens before `return networkResponse`
      const clonedResponse = networkResponse.clone();
      console.log(clonedResponse);
      e.waitUntil((async function () {
        const cache = await caches.open(CACHE_NAME);
        // This will be called after `return networkResponse`
        // so make sure you already have the clone!
        await cache.put(e.request, clonedResponse);
      })());
    }
    return networkResponse;
  })());
});
