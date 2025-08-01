// Video caching utility for better performance
class VideoCache {
  private cache = new Map<string, HTMLVideoElement>()
  private loadingPromises = new Map<string, Promise<HTMLVideoElement>>()
  private maxCacheSize = 5 // Reduced from 10 to 5

  // Preload a video and cache it
  async preloadVideo(src: string): Promise<HTMLVideoElement> {
    // Return cached video if available
    if (this.cache.has(src)) {
      return this.cache.get(src)!
    }

    // Return existing loading promise if already loading
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!
    }

    // Create new loading promise
    const loadingPromise = this.createVideoElement(src)
    this.loadingPromises.set(src, loadingPromise)

    try {
      const video = await loadingPromise
      this.cache.set(src, video)
      this.loadingPromises.delete(src)
      
      // Manage cache size
      if (this.cache.size > this.maxCacheSize) {
        const firstKey = this.cache.keys().next().value
        if (firstKey) {
          this.cache.delete(firstKey)
        }
      }
      
      return video
    } catch (error) {
      this.loadingPromises.delete(src)
      throw error
    }
  }

  // Create a video element and load the video
  private createVideoElement(src: string): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      
      video.muted = true
      video.playsInline = true
      video.loop = true
      video.preload = 'metadata' // Changed from 'auto' to 'metadata' for faster loading
      video.style.display = 'none'
      
      const handleCanPlay = () => {
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
        resolve(video)
      }
      
      const handleError = () => {
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
        reject(new Error(`Failed to load video: ${src}`))
      }
      
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('error', handleError)
      
      video.src = src
      video.load()
    })
  }

  // Get cached video or return null
  getCachedVideo(src: string): HTMLVideoElement | null {
    return this.cache.get(src) || null
  }

  // Check if video is cached
  isCached(src: string): boolean {
    return this.cache.has(src)
  }

  // Check if video is loading
  isLoading(src: string): boolean {
    return this.loadingPromises.has(src)
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear()
    this.loadingPromises.clear()
  }

  // Get cache stats
  getCacheStats() {
    return {
      cachedVideos: this.cache.size,
      loadingVideos: this.loadingPromises.size,
      maxCacheSize: this.maxCacheSize
    }
  }
}

// Create singleton instance
const videoCache = new VideoCache()

export default videoCache 