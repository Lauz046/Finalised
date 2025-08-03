
// Service Worker for caching components and assets
const CACHE_NAME = 'plutus-cache-v2';
const STATIC_CACHE = 'plutus-static-v2';
const DYNAMIC_CACHE = 'plutus-dynamic-v2';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/image1.jpeg',
  '/image2.jpeg',
  '/image3.jpeg',
  '/image4.jpeg',
  '/image5.jpeg',
  '/image7.jpeg',
  '/nav/Plutus logo blue.svg',
  '/hornloader/1 HORN.svg',
  '/hornloader/2 HORN.svg',
  '/hornloader/3 HORN.svg',
  '/hornloader/4 HORN.svg',
  '/hornloader/5 HORN.svg',
  '/hornloader/Complete horn6.svg'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/api/')) {
    // Next.js internal requests - network first
    event.respondWith(networkFirst(request));
  } else if (isImageRequest(request)) {
    // Images - cache first
    event.respondWith(cacheFirst(request));
  } else if (isComponentRequest(request)) {
    // Component requests - stale while revalidate
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Other requests - network first
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy for images
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('❌ Network request failed:', error);
    return new Response('Image not available', { status: 404 });
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🌐 Network failed, trying cache...');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale while revalidate strategy for components
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Return cached response immediately if available
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Helper functions
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
}

function isComponentRequest(request) {
  return request.url.includes('/_next/static/chunks/') ||
         request.url.includes('/components/');
}

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Perform background tasks like updating cache
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.addAll(STATIC_FILES);
    console.log('✅ Background sync completed');
  } catch (error) {
    console.error('❌ Background sync failed:', error);
  }
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

console.log('🛠️ Service Worker loaded');
