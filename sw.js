const CACHE = 'scanmart-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // GET 요청만 캐시 처리 (POST 등 제외)
  if (e.request.method !== 'GET') return;

  // 외부 API 전부 제외
  if (
    e.request.url.includes('api.anthropic.com') ||
    e.request.url.includes('fonts.googleapis.com') ||
    e.request.url.includes('firestore.googleapis.com') ||
    e.request.url.includes('firebase') ||
    e.request.url.includes('workers.dev') ||
    e.request.url.includes('gstatic.com') ||
    e.request.url.includes('googleapis.com')
  ) return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
