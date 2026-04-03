const CACHE_NAME = 'darul-aman-offline-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Tahap Install: Menyimpan file inti ke dalam cache memori perangkat
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Tahap Fetch: Mengambil dari cache saat tidak ada internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, gunakan itu. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      }).catch(() => {
        // JIKA GAGAL KEDUANYA (TIDAK ADA INTERNET):
        // Kembalikan file index.html yang sudah dicache. 
        // Ini yang mencegah Dino muncul!
        if (event.request.mode === 'navigate' || event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});
