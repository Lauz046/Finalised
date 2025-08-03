import { useState, useEffect } from 'react';

// Cache utility for storing component data and preventing unnecessary re-fetching

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class ComponentCache {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.cache.has(key) && !this.isExpired(key);
  }

  private isExpired(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return true;
    return Date.now() - item.timestamp > item.ttl;
  }

  clear(): void {
    this.cache.clear();
  }

  clearExpired(): void {
    for (const [key] of this.cache) {
      if (this.isExpired(key)) {
        this.cache.delete(key);
      }
    }
  }
}

// Global cache instance
export const componentCache = new ComponentCache();

// Hook for using cached data
export const useCachedData = <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(componentCache.get(key));
  const [loading, setLoading] = useState(!componentCache.has(key));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (componentCache.has(key)) {
      setData(componentCache.get(key));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        componentCache.set(key, result, ttl);
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [key, ttl]);

  return { data, loading, error };
};

// Image preloader utility
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    })
  );
};

// Component state persistence
export const persistComponentState = <T>(key: string, state: T): void => {
  try {
    sessionStorage.setItem(`component_state_${key}`, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to persist component state:', error);
  }
};

export const getPersistedState = <T>(key: string): T | null => {
  try {
    const stored = sessionStorage.getItem(`component_state_${key}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to get persisted state:', error);
    return null;
  }
}; 