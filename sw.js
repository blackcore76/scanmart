const CACHE = 'scanmart-v2';
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
  // API·폰트는 서비스 워커 완전 제외 (기존과 동일)
  if (
    e.request.url.includes('api.anthropic.com') ||
    e.request.url.includes('fonts.googleapis.com') ||
    e.request.url.includes('firestore.googleapis.com') ||
    e.request.url.includes('firebase')
  ) return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        // 네트워크 성공 → 캐시 업데이트 후 반환
        const clone = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request)) // 오프라인이면 캐시 사용
  );
});
