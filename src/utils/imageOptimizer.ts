// Image optimization utilities for better performance

export interface ImageOptimizationConfig {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  blur?: number;
}

export class ImageOptimizer {
  private static instance: ImageOptimizer;
  private preloadedImages: Map<string, HTMLImageElement> = new Map();
  private loadingQueue: Set<string> = new Set();

  static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer();
    }
    return ImageOptimizer.instance;
  }

  // Preload images with priority
  async preloadImages(urls: string[], priority: 'high' | 'medium' | 'low' = 'medium'): Promise<void> {
    const priorityUrls = priority === 'high' ? urls.slice(0, 5) : urls;
    const remainingUrls = priority === 'high' ? urls.slice(5) : [];

    // Load priority images immediately
    await Promise.all(
      priorityUrls.map(url => this.preloadSingleImage(url))
    );

    // Load remaining images in background
    if (remainingUrls.length > 0) {
      setTimeout(() => {
        remainingUrls.forEach(url => this.preloadSingleImage(url));
      }, 100);
    }
  }

  private async preloadSingleImage(url: string): Promise<void> {
    if (this.preloadedImages.has(url) || this.loadingQueue.has(url)) {
      return;
    }

    this.loadingQueue.add(url);

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.preloadedImages.set(url, img);
        this.loadingQueue.delete(url);
        resolve();
      };

      img.onerror = () => {
        this.loadingQueue.delete(url);
        reject(new Error(`Failed to load image: ${url}`));
      };

      img.src = url;
    });
  }

  // Get optimized image URL
  getOptimizedImageUrl(url: string, config: ImageOptimizationConfig = {}): string {
    const { quality = 85, format = 'webp', width, height, blur } = config;
    
    // For local images, we can't optimize them dynamically
    // This would require a server-side image optimization service
    return url;
  }

  // Check if image is preloaded
  isImagePreloaded(url: string): boolean {
    return this.preloadedImages.has(url);
  }

  // Get preloaded image element
  getPreloadedImage(url: string): HTMLImageElement | undefined {
    return this.preloadedImages.get(url);
  }

  // Clear preloaded images to free memory
  clearPreloadedImages(): void {
    this.preloadedImages.clear();
    this.loadingQueue.clear();
  }

  // Get loading progress
  getLoadingProgress(): number {
    const total = this.preloadedImages.size + this.loadingQueue.size;
    return total > 0 ? (this.preloadedImages.size / total) * 100 : 0;
  }
}

// Hook for image optimization
export const useImageOptimizer = () => {
  const optimizer = ImageOptimizer.getInstance();

  const preloadImages = (urls: string[], priority: 'high' | 'medium' | 'low' = 'medium') => {
    return optimizer.preloadImages(urls, priority);
  };

  const isImagePreloaded = (url: string) => {
    return optimizer.isImagePreloaded(url);
  };

  const clearPreloadedImages = () => {
    optimizer.clearPreloadedImages();
  };

  const getLoadingProgress = () => {
    return optimizer.getLoadingProgress();
  };

  return {
    preloadImages,
    isImagePreloaded,
    clearPreloadedImages,
    getLoadingProgress,
  };
};

// Utility function for lazy loading
export const createLazyImageLoader = (threshold: number = 0.1) => {
  return (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  };
};

// Utility for responsive images
export const getResponsiveImageSrc = (
  baseUrl: string,
  sizes: { width: number; height?: number }[],
  format: 'webp' | 'jpeg' = 'webp'
): string => {
  // For now, return the base URL
  // In production, this would generate different sized images
  return baseUrl;
};

// Utility for blur placeholder
export const createBlurPlaceholder = (base64: string): string => {
  return `data:image/svg+xml;base64,${base64}`;
}; 