// Service Worker Registration
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New content is available
                    console.log('New content is available; please refresh.');
                    showUpdateNotification();
                  } else {
                    // Content is cached for offline use
                    console.log('Content is cached for offline use.');
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error);
        });
    });
  }
}

// Show update notification
function showUpdateNotification() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
             registration.showNotification('Update Available', {
         body: 'A new version is available. Click to update.',
         icon: '/logo192.png',
         badge: '/logo192.png',
         tag: 'update-notification',
         requireInteraction: true
       });
    });
  }
}

// Handle service worker updates
export function handleServiceWorkerUpdate() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker updated, reloading page...');
      window.location.reload();
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }
}

// Unregister service worker (for development)
export function unregisterServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Check if service worker is supported
export function isServiceWorkerSupported(): boolean {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator;
}

// Get service worker registration
export async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (isServiceWorkerSupported()) {
    try {
      return await navigator.serviceWorker.ready;
    } catch (error) {
      console.error('Error getting service worker registration:', error);
      return null;
    }
  }
  return null;
}

// Send message to service worker
export async function sendMessageToServiceWorker(message: any): Promise<void> {
  const registration = await getServiceWorkerRegistration();
  if (registration?.active) {
    registration.active.postMessage(message);
  }
}

// Cache API responses
export async function cacheApiResponse(url: string, response: Response): Promise<void> {
  if (isServiceWorkerSupported()) {
    const registration = await getServiceWorkerRegistration();
    if (registration) {
      const cache = await caches.open('plutus-api-v1');
      await cache.put(url, response.clone());
    }
  }
}

// Get cached response
export async function getCachedResponse(url: string): Promise<Response | null> {
  if (isServiceWorkerSupported()) {
    const registration = await getServiceWorkerRegistration();
    if (registration) {
      const cache = await caches.open('plutus-api-v1');
      return await cache.match(url) || null;
    }
  }
  return null;
}

// Clear all caches
export async function clearAllCaches(): Promise<void> {
  if (isServiceWorkerSupported()) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  }
}

// Get cache statistics
export async function getCacheStats(): Promise<Record<string, number>> {
  if (isServiceWorkerSupported()) {
    const cacheNames = await caches.keys();
    const stats: Record<string, number> = {};
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      stats[cacheName] = keys.length;
    }
    
    return stats;
  }
  return {};
} 