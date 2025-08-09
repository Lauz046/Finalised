// Video optimization utilities for memory management and performance

interface VideoCache {
  [key: string]: {
    element: HTMLVideoElement
    loaded: boolean
    lastUsed: number
    size: number
  }
}

interface VideoLoadOptions {
  muted?: boolean
  playsInline?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  loop?: boolean
  autoplay?: boolean
  onLoad?: () => void
  onError?: (error: any) => void
  onTimeout?: () => void
  timeout?: number
}

class VideoOptimizer {
  private cache: VideoCache = {}
  private maxCacheSize = 50 * 1024 * 1024 // 50MB cache limit
  private currentCacheSize = 0
  private isIOS = false

  constructor() {
    this.detectDevice()
  }

  private detectDevice() {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase()
      this.isIOS = /iphone|ipad|ipod/.test(userAgent)
      console.log(`📱 VideoOptimizer: Device detected as ${this.isIOS ? 'iOS' : 'Other'}`)
    }
  }

  /**
   * Load a video with optimization
   */
  async loadVideo(src: string, options: VideoLoadOptions = {}): Promise<HTMLVideoElement> {
    const cacheKey = this.getCacheKey(src, options)
    
    // Check if video is already cached
    if (this.cache[cacheKey] && this.cache[cacheKey].loaded) {
      console.log(`🎬 VideoOptimizer: Using cached video for ${src}`)
      this.cache[cacheKey].lastUsed = Date.now()
      return this.cache[cacheKey].element
    }

    console.log(`🎬 VideoOptimizer: Loading video ${src}`)
    
    const video = document.createElement('video')
    
    // Apply options
    video.src = src
    video.muted = options.muted ?? true
    video.playsInline = options.playsInline ?? true
    video.preload = options.preload ?? 'metadata'
    video.loop = options.loop ?? false
    video.autoplay = options.autoplay ?? false

    // iOS-specific optimizations
    if (this.isIOS) {
      video.setAttribute('playsinline', 'true')
      video.setAttribute('webkit-playsinline', 'true')
      video.setAttribute('x-webkit-airplay', 'allow')
      // Reduce quality for iOS to prevent memory issues
      video.setAttribute('webkit-video-playable-inline', 'true')
    }

    return new Promise<HTMLVideoElement>((resolve, reject) => {
      const timeout = options.timeout ?? 10000
      let timeoutId: NodeJS.Timeout

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId)
        video.removeEventListener('loadedmetadata', onLoad)
        video.removeEventListener('error', onError)
      }

      const onLoad = () => {
        cleanup()
        console.log(`✅ VideoOptimizer: Video loaded successfully ${src}`)
        
        // Cache the video
        this.cacheVideo(cacheKey, video)
        
        options.onLoad?.()
        resolve(video)
      }

      const onError = (error: any) => {
        cleanup()
        console.warn(`❌ VideoOptimizer: Failed to load video ${src}`, error)
        options.onError?.(error)
        reject(error)
      }

      const onTimeout = () => {
        cleanup()
        console.warn(`⏰ VideoOptimizer: Timeout loading video ${src}`)
        options.onTimeout?.()
        reject(new Error('Video load timeout'))
      }

      video.addEventListener('loadedmetadata', onLoad, { once: true })
      video.addEventListener('error', onError, { once: true })
      
      timeoutId = setTimeout(onTimeout, timeout)
    })
  }

  /**
   * Preload multiple videos with memory management
   */
  async preloadVideos(videos: Array<{ src: string; options?: VideoLoadOptions }>): Promise<void> {
    console.log(`🚀 VideoOptimizer: Preloading ${videos.length} videos`)
    
    const promises = videos.map(({ src, options }) => 
      this.loadVideo(src, options).catch(error => {
        console.warn(`⚠️ VideoOptimizer: Failed to preload ${src}`, error)
      })
    )

    await Promise.all(promises)
    console.log(`✅ VideoOptimizer: Preloading complete`)
  }

  /**
   * Unload videos that are not needed
   */
  unloadVideo(src: string, options: VideoLoadOptions = {}): void {
    const cacheKey = this.getCacheKey(src, options)
    
    if (this.cache[cacheKey]) {
      console.log(`🗑️ VideoOptimizer: Unloading video ${src}`)
      
      const video = this.cache[cacheKey].element
      video.pause()
      video.src = ''
      video.load()
      
      this.currentCacheSize -= this.cache[cacheKey].size
      delete this.cache[cacheKey]
    }
  }

  /**
   * Clean up old videos from cache
   */
  cleanupCache(maxAge: number = 5 * 60 * 1000): void { // 5 minutes
    const now = Date.now()
    const keysToRemove: string[] = []

    Object.entries(this.cache).forEach(([key, video]) => {
      if (now - video.lastUsed > maxAge) {
        keysToRemove.push(key)
      }
    })

    keysToRemove.forEach(key => {
      const video = this.cache[key].element
      video.pause()
      video.src = ''
      video.load()
      
      this.currentCacheSize -= this.cache[key].size
      delete this.cache[key]
    })

    if (keysToRemove.length > 0) {
      console.log(`🧹 VideoOptimizer: Cleaned up ${keysToRemove.length} old videos`)
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.currentCacheSize,
      maxSize: this.maxCacheSize,
      videoCount: Object.keys(this.cache).length,
      isIOS: this.isIOS
    }
  }

  /**
   * Clear all cached videos
   */
  clearCache(): void {
    Object.values(this.cache).forEach(video => {
      video.element.pause()
      video.element.src = ''
      video.element.load()
    })
    
    this.cache = {}
    this.currentCacheSize = 0
    console.log(`🗑️ VideoOptimizer: Cache cleared`)
  }

  private getCacheKey(src: string, options: VideoLoadOptions): string {
    return `${src}-${JSON.stringify(options)}`
  }

  private cacheVideo(key: string, video: HTMLVideoElement): void {
    // Estimate video size (rough approximation)
    const estimatedSize = 1024 * 1024 // 1MB per video as estimate
    
    // Check if we need to make space
    if (this.currentCacheSize + estimatedSize > this.maxCacheSize) {
      this.cleanupCache(2 * 60 * 1000) // Clean up videos older than 2 minutes
    }
    
    this.cache[key] = {
      element: video,
      loaded: true,
      lastUsed: Date.now(),
      size: estimatedSize
    }
    
    this.currentCacheSize += estimatedSize
  }

  /**
   * Optimize video element for performance
   */
  optimizeVideoElement(video: HTMLVideoElement): void {
    // Force hardware acceleration
    video.style.transform = 'translateZ(0)'
    video.style.webkitTransform = 'translateZ(0)'
    
    // Prevent blur on high DPI displays
    video.style.imageRendering = 'crisp-edges'
    video.style.webkitImageRendering = 'crisp-edges'
    
    // Improve scaling quality
    video.style.backfaceVisibility = 'hidden'
    video.style.webkitBackfaceVisibility = 'hidden'
    
    // iOS specific optimizations
    if (this.isIOS) {
      video.setAttribute('webkit-playsinline', 'true')
      video.setAttribute('playsinline', 'true')
    }
  }

  /**
   * Create a video placeholder while loading
   */
  createVideoPlaceholder(container: HTMLElement, onLoad?: () => void): HTMLDivElement {
    const placeholder = document.createElement('div')
    placeholder.className = 'video-placeholder'
    placeholder.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.1);
      color: #666;
      z-index: 5;
    `

    const spinner = document.createElement('div')
    spinner.style.cssText = `
      width: 30px;
      height: 30px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-top: 2px solid #051f2d;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 0.5rem;
    `

    const text = document.createElement('p')
    text.textContent = 'Loading video...'
    text.style.cssText = `
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8rem;
      margin: 0;
      opacity: 0.7;
      font-weight: 500;
    `

    placeholder.appendChild(spinner)
    placeholder.appendChild(text)
    container.appendChild(placeholder)

    return placeholder
  }
}

// Create singleton instance
const videoOptimizer = new VideoOptimizer()

export default videoOptimizer
export type { VideoLoadOptions } 