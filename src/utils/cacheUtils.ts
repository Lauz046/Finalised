// Cache utility functions for persistent storage and automatic refresh

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheConfig {
  maxAge: number; // milliseconds
  maxSize: number; // number of items
}

class PersistentCache {
  private storage: Storage | null = null;
  private config: CacheConfig;

  constructor(storage: 'localStorage' | 'sessionStorage', config: CacheConfig) {
    this.config = config;
    // Only initialize storage on client side
    if (typeof window !== 'undefined') {
      this.storage = storage === 'localStorage' ? window.localStorage : window.sessionStorage;
    }
  }

  // Set cache item with expiration
  set<T>(key: string, data: T): void {
    if (!this.storage) return; // SSR safe
    
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + this.config.maxAge
      };

      // Check cache size and evict oldest if needed
      this.evictOldestIfNeeded();

      this.storage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  // Get cache item if not expired
  get<T>(key: string): T | null {
    if (!this.storage) return null; // SSR safe
    
    try {
      const itemStr = this.storage.getItem(key);
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);
      
      // Check if expired
      if (Date.now() > item.expiresAt) {
        this.storage.removeItem(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  }

  // Check if cache item exists and is valid
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  // Remove specific cache item
  remove(key: string): void {
    if (!this.storage) return; // SSR safe
    
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.warn('Cache removal failed:', error);
    }
  }

  // Clear all cache
  clear(): void {
    if (!this.storage) return; // SSR safe
    
    try {
      this.storage.clear();
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }

  // Get cache statistics
  getStats(): { size: number; keys: string[] } {
    if (!this.storage) return { size: 0, keys: [] }; // SSR safe
    
    try {
      const keys = Object.keys(this.storage);
      return {
        size: keys.length,
        keys
      };
    } catch {
      return { size: 0, keys: [] };
    }
  }

  // Evict oldest items if cache is full
  private evictOldestIfNeeded(): void {
    if (!this.storage) return; // SSR safe
    
    try {
      const keys = Object.keys(this.storage);
      if (keys.length < this.config.maxSize) return;

      // Get all items with timestamps
      const items = keys.map(key => {
        try {
          const itemStr = this.storage!.getItem(key);
          if (!itemStr) return null;
          const item = JSON.parse(itemStr);
          return { key, timestamp: item.timestamp };
        } catch {
          return null;
        }
      }).filter(Boolean);

      // Sort by timestamp (oldest first)
      items.sort((a, b) => a!.timestamp - b!.timestamp);

      // Remove oldest items
      const toRemove = items.length - this.config.maxSize;
      for (let i = 0; i < toRemove; i++) {
        this.storage!.removeItem(items[i]!.key);
      }
    } catch (error) {
      console.warn('Cache eviction failed:', error);
    }
  }

  // Clean expired items
  cleanup(): void {
    if (!this.storage) return; // SSR safe
    
    try {
      const keys = Object.keys(this.storage);
      keys.forEach(key => {
        const itemStr = this.storage!.getItem(key);
        if (itemStr) {
          try {
            const item = JSON.parse(itemStr);
            if (Date.now() > item.expiresAt) {
              this.storage!.removeItem(key);
            }
          } catch {
            this.storage!.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.warn('Cache cleanup failed:', error);
    }
  }
}

// Cache configurations
export const CACHE_CONFIGS = {
  // Short-term cache for search results (5 minutes)
  SEARCH: {
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxSize: 50
  },
  // Medium-term cache for menu data (30 minutes)
  MENU: {
    maxAge: 30 * 60 * 1000, // 30 minutes
    maxSize: 20
  },
  // Long-term cache for category data (2 hours)
  CATEGORY: {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    maxSize: 30
  },
  // Product cache (1 hour)
  PRODUCT: {
    maxAge: 60 * 60 * 1000, // 1 hour
    maxSize: 100
  }
};

// Cache instances
export const searchCache = new PersistentCache('localStorage', CACHE_CONFIGS.SEARCH);
export const menuCache = new PersistentCache('localStorage', CACHE_CONFIGS.MENU);
export const categoryCache = new PersistentCache('localStorage', CACHE_CONFIGS.CATEGORY);
export const productCache = new PersistentCache('localStorage', CACHE_CONFIGS.PRODUCT);

// Auto-refresh utilities
export class AutoRefreshManager {
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private callbacks: Map<string, () => Promise<void>> = new Map();

  // Register auto-refresh for a cache key
  register(key: string, refreshCallback: () => Promise<any>, intervalMs: number): void {
    // Clear existing interval if any
    this.unregister(key);

    // Store callback
    this.callbacks.set(key, refreshCallback);

    // Set up interval
    const interval = setInterval(async () => {
      try {
        await refreshCallback();
        console.log(`🔄 Auto-refreshed cache for: ${key}`);
      } catch (error) {
        console.error(`❌ Auto-refresh failed for ${key}:`, error);
      }
    }, intervalMs);

    this.intervals.set(key, interval);
  }

  // Unregister auto-refresh
  unregister(key: string): void {
    const interval = this.intervals.get(key);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(key);
      this.callbacks.delete(key);
    }
  }

  // Clear all auto-refresh intervals
  clearAll(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    this.callbacks.clear();
  }

  // Get active refresh intervals
  getActiveKeys(): string[] {
    return Array.from(this.intervals.keys());
  }
}

export const autoRefreshManager = new AutoRefreshManager();

// Utility functions
export const cacheUtils = {
  // Set cache with auto-refresh
  setWithRefresh<T>(
    cache: PersistentCache,
    key: string,
    data: T,
    refreshCallback: () => Promise<void>,
    refreshIntervalMs: number
  ): void {
    cache.set(key, data);
    autoRefreshManager.register(key, refreshCallback, refreshIntervalMs);
  },

  // Get cache with fallback
  async getWithFallback<T>(
    cache: PersistentCache,
    key: string,
    fallback: () => Promise<T>,
    refreshIntervalMs?: number
  ): Promise<T> {
    // Try cache first
    const cached = cache.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Fallback to fresh data
    const fresh = await fallback();
    cache.set(key, fresh);

    // Set up auto-refresh if interval provided
    if (refreshIntervalMs) {
      autoRefreshManager.register(key, fallback, refreshIntervalMs);
    }

    return fresh;
  },

  // Clean up all caches
  cleanup(): void {
    searchCache.cleanup();
    menuCache.cleanup();
    categoryCache.cleanup();
    productCache.cleanup();
  },

  // Get cache statistics
  getStats(): Record<string, { size: number; keys: string[] }> {
    return {
      search: searchCache.getStats(),
      menu: menuCache.getStats(),
      category: categoryCache.getStats(),
      product: productCache.getStats()
    };
  }
};

// Initialize cleanup on page load (SSR safe)
if (typeof window !== 'undefined') {
  // Clean up expired items on page load
  cacheUtils.cleanup();

  // Set up periodic cleanup (every 5 minutes)
  setInterval(() => {
    cacheUtils.cleanup();
  }, 5 * 60 * 1000);

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    autoRefreshManager.clearAll();
  });
} 