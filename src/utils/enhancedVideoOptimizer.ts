// Enhanced video optimization utilities with performance monitoring and adaptive quality

interface VideoCache {
  [key: string]: {
    element: HTMLVideoElement
    loaded: boolean
    lastUsed: number
    size: number
    quality: 'high' | 'medium' | 'low'
    loadTime: number
  }
}

interface VideoLoadOptions {
  muted?: boolean
  playsInline?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  loop?: boolean
  autoplay?: boolean
  quality?: 'high' | 'medium' | 'low'
  onLoad?: () => void
  onError?: (error: any) => void
  onTimeout?: () => void
  timeout?: number
}

interface PerformanceMetrics {
  totalLoadTime: number
  averageLoadTime: number
  memoryUsage: number
  errorCount: number
  cacheHits: number
  cacheMisses: number
  devicePerformance: 'high' | 'medium' | 'low'
}

class EnhancedVideoOptimizer {
  private cache: VideoCache = {}
  private maxCacheSize = 50 * 1024 * 1024 // 50MB cache limit
  private currentCacheSize = 0
  private performanceMetrics: PerformanceMetrics = {
    totalLoadTime: 0,
    averageLoadTime: 0,
    memoryUsage: 0,
    errorCount: 0,
    cacheHits: 0,
    cacheMisses: 0,
    devicePerformance: 'medium'
  }
  private loadTimes: number[] = []
  private deviceInfo: {
    isIOS: boolean
    isMobile: boolean
    isLowEnd: boolean
    hardwareConcurrency: number
    memoryLimit: number
  }

  constructor() {
    this.detectDevice()
    this.startPerformanceMonitoring()
  }

  private detectDevice() {
    if (typeof window === 'undefined') {
      this.deviceInfo = {
        isIOS: false,
        isMobile: false,
        isLowEnd: false,
        hardwareConcurrency: 4,
        memoryLimit: 50 * 1024 * 1024
      }
      return
    }

    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isMobile = window.innerWidth <= 768
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const isLowEnd = isMobile || isIOS || hardwareConcurrency <= 4

    // Estimate memory limit based on device
    let memoryLimit = 50 * 1024 * 1024 // 50MB default
    if (isLowEnd) {
      memoryLimit = 25 * 1024 * 1024 // 25MB for low-end devices
    } else if (isIOS) {
      memoryLimit = 35 * 1024 * 1024 // 35MB for iOS
    }

    this.deviceInfo = {
      isIOS,
      isMobile,
      isLowEnd,
      hardwareConcurrency,
      memoryLimit
    }

    this.maxCacheSize = memoryLimit
    this.performanceMetrics.devicePerformance = isLowEnd ? 'low' : isMobile ? 'medium' : 'high'

    console.log(`📱 EnhancedVideoOptimizer: Device detected`, {
      isIOS,
      isMobile,
      isLowEnd,
      hardwareConcurrency,
      memoryLimit: `${memoryLimit / 1024 / 1024}MB`
    })
  }

  /**
   * Load a video with enhanced optimization
   */
  async loadVideo(src: string, options: VideoLoadOptions = {}): Promise<HTMLVideoElement> {
    const cacheKey = this.getCacheKey(src, options)
    const startTime = performance.now()
    
    // Check if video is already cached
    if (this.cache[cacheKey] && this.cache[cacheKey].loaded) {
      this.performanceMetrics.cacheHits++
      this.cache[cacheKey].lastUsed = Date.now()
      console.log(`🎬 EnhancedVideoOptimizer: Cache hit for ${src}`)
      return this.cache[cacheKey].element
    }

    this.performanceMetrics.cacheMisses++
    console.log(`🎬 EnhancedVideoOptimizer: Loading video ${src}`)
    
    const video = document.createElement('video')
    
    // Apply options with device-specific optimizations
    video.src = src
    video.muted = options.muted ?? true
    video.playsInline = options.playsInline ?? true
    video.preload = this.getOptimalPreload(options.preload)
    video.loop = options.loop ?? false
    video.autoplay = options.autoplay ?? false

    // Enhanced iOS optimizations
    if (this.deviceInfo.isIOS) {
      video.setAttribute('playsinline', 'true')
      video.setAttribute('webkit-playsinline', 'true')
      video.setAttribute('x-webkit-airplay', 'allow')
      video.setAttribute('webkit-video-playable-inline', 'true')
      video.setAttribute('webkit-playsinline', 'true')
      
      // Reduce quality for iOS
      if (this.deviceInfo.isLowEnd) {
        video.setAttribute('webkit-playsinline', 'true')
      }
    }

    // Performance optimizations
    this.optimizeVideoElement(video)

    return new Promise<HTMLVideoElement>((resolve, reject) => {
      const timeout = this.getOptimalTimeout(options.timeout)
      let timeoutId: NodeJS.Timeout

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId)
        video.removeEventListener('loadedmetadata', onLoad)
        video.removeEventListener('error', onError)
      }

      const onLoad = () => {
        cleanup()
        const loadTime = performance.now() - startTime
        this.loadTimes.push(loadTime)
        this.updatePerformanceMetrics(loadTime)
        
        console.log(`✅ EnhancedVideoOptimizer: Video loaded successfully ${src} in ${loadTime.toFixed(2)}ms`)
        
        // Cache the video with quality assessment
        const quality = this.assessVideoQuality(video)
        this.cacheVideo(cacheKey, video, quality, loadTime)
        
        options.onLoad?.()
        resolve(video)
      }

      const onError = (error: any) => {
        cleanup()
        this.performanceMetrics.errorCount++
        console.warn(`❌ EnhancedVideoOptimizer: Failed to load video ${src}`, error)
        options.onError?.(error)
        reject(error)
      }

      const onTimeout = () => {
        cleanup()
        this.performanceMetrics.errorCount++
        console.warn(`⏰ EnhancedVideoOptimizer: Timeout loading video ${src}`)
        options.onTimeout?.()
        reject(new Error('Video load timeout'))
      }

      video.addEventListener('loadedmetadata', onLoad, { once: true })
      video.addEventListener('error', onError, { once: true })
      
      timeoutId = setTimeout(onTimeout, timeout)
    })
  }

  /**
   * Preload multiple videos with intelligent prioritization
   */
  async preloadVideos(videos: Array<{ src: string; options?: VideoLoadOptions; priority?: number }>): Promise<void> {
    console.log(`🚀 EnhancedVideoOptimizer: Preloading ${videos.length} videos`)
    
    // Sort by priority (higher priority first)
    const sortedVideos = videos.sort((a, b) => (b.priority || 0) - (a.priority || 0))
    
    // Load videos in batches for better performance
    const batchSize = this.deviceInfo.isLowEnd ? 1 : 2
    const batches = this.chunkArray(sortedVideos, batchSize)
    
    for (const batch of batches) {
      const promises = batch.map(({ src, options }) => 
        this.loadVideo(src, options).catch(error => {
          console.warn(`⚠️ EnhancedVideoOptimizer: Failed to preload ${src}`, error)
        })
      )

      await Promise.all(promises)
      
      // Small delay between batches for low-end devices
      if (this.deviceInfo.isLowEnd && batches.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ EnhancedVideoOptimizer: Preloading complete`)
  }

  /**
   * Intelligent cache management
   */
  cleanupCache(maxAge: number = 5 * 60 * 1000): void {
    const now = Date.now()
    const keysToRemove: string[] = []

    Object.entries(this.cache).forEach(([key, video]) => {
      if (now - video.lastUsed > maxAge) {
        keysToRemove.push(key)
      }
    })

    keysToRemove.forEach(key => {
      const video = this.cache[key].element
      this.cleanupVideoElement(video)
      this.currentCacheSize -= this.cache[key].size
      delete this.cache[key]
    })

    if (keysToRemove.length > 0) {
      console.log(`🧹 EnhancedVideoOptimizer: Cleaned up ${keysToRemove.length} old videos`)
    }
  }

  /**
   * Get comprehensive performance metrics
   */
  getPerformanceMetrics(): PerformanceMetrics {
    return {
      ...this.performanceMetrics,
      averageLoadTime: this.loadTimes.length > 0 
        ? this.loadTimes.reduce((a, b) => a + b, 0) / this.loadTimes.length 
        : 0
    }
  }

  /**
   * Adaptive quality adjustment based on performance
   */
  adjustQualityForPerformance(): void {
    const metrics = this.getPerformanceMetrics()
    
    if (metrics.errorCount > 5 || metrics.averageLoadTime > 8000) {
      console.log('🔄 EnhancedVideoOptimizer: Adjusting quality for better performance')
      this.performanceMetrics.devicePerformance = 'low'
    } else if (metrics.averageLoadTime < 3000 && metrics.errorCount < 2) {
      this.performanceMetrics.devicePerformance = 'high'
    }
  }

  /**
   * Clear all cached videos
   */
  clearCache(): void {
    Object.values(this.cache).forEach(video => {
      this.cleanupVideoElement(video.element)
    })
    
    this.cache = {}
    this.currentCacheSize = 0
    console.log(`🗑️ EnhancedVideoOptimizer: Cache cleared`)
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.currentCacheSize,
      maxSize: this.maxCacheSize,
      videoCount: Object.keys(this.cache).length,
      deviceInfo: this.deviceInfo,
      performanceMetrics: this.getPerformanceMetrics()
    }
  }

  private getCacheKey(src: string, options: VideoLoadOptions): string {
    return `${src}-${JSON.stringify(options)}`
  }

  private getOptimalPreload(preload?: string): string {
    if (this.deviceInfo.isLowEnd) return 'none'
    if (this.deviceInfo.isMobile) return 'metadata'
    return preload || 'metadata'
  }

  private getOptimalTimeout(timeout?: number): number {
    if (this.deviceInfo.isLowEnd) return timeout || 15000
    if (this.deviceInfo.isMobile) return timeout || 12000
    return timeout || 10000
  }

  private assessVideoQuality(video: HTMLVideoElement): 'high' | 'medium' | 'low' {
    const width = video.videoWidth
    const height = video.videoHeight
    
    if (width >= 1920 || height >= 1080) return 'high'
    if (width >= 1280 || height >= 720) return 'medium'
    return 'low'
  }

  private cacheVideo(key: string, video: HTMLVideoElement, quality: 'high' | 'medium' | 'low', loadTime: number): void {
    // Estimate video size based on quality
    const estimatedSize = this.estimateVideoSize(video, quality)
    
    // Check if we need to make space
    if (this.currentCacheSize + estimatedSize > this.maxCacheSize) {
      this.cleanupCache(2 * 60 * 1000) // Clean up videos older than 2 minutes
    }
    
    this.cache[key] = {
      element: video,
      loaded: true,
      lastUsed: Date.now(),
      size: estimatedSize,
      quality,
      loadTime
    }
    
    this.currentCacheSize += estimatedSize
  }

  private estimateVideoSize(video: HTMLVideoElement, quality: 'high' | 'medium' | 'low'): number {
    const width = video.videoWidth || 1920
    const height = video.videoHeight || 1080
    const baseSize = width * height * 4 // 4 bytes per pixel
    
    switch (quality) {
      case 'high': return baseSize
      case 'medium': return baseSize * 0.7
      case 'low': return baseSize * 0.4
      default: return baseSize * 0.7
    }
  }

  private optimizeVideoElement(video: HTMLVideoElement): void {
    // Force hardware acceleration
    video.style.transform = 'translateZ(0)'
    video.style.webkitTransform = 'translateZ(0)'
    
    // Prevent blur on high DPI displays
    video.style.imageRendering = 'crisp-edges'
    video.style.webkitImageRendering = 'crisp-edges'
    
    // Improve scaling quality
    video.style.backfaceVisibility = 'hidden'
    video.style.webkitBackfaceVisibility = 'hidden'
    
    // Additional optimizations for low-end devices
    if (this.deviceInfo.isLowEnd) {
      video.style.willChange = 'auto'
    }
  }

  private cleanupVideoElement(video: HTMLVideoElement): void {
    try {
      video.pause()
      video.src = ''
      video.load()
      video.remove()
    } catch (error) {
      console.warn('Failed to cleanup video element:', error)
    }
  }

  private updatePerformanceMetrics(loadTime: number): void {
    this.performanceMetrics.totalLoadTime += loadTime
    this.performanceMetrics.memoryUsage = this.currentCacheSize
    
    // Keep only last 10 load times for average calculation
    if (this.loadTimes.length > 10) {
      this.loadTimes.shift()
    }
  }

  private startPerformanceMonitoring(): void {
    // Monitor performance every 30 seconds
    setInterval(() => {
      this.adjustQualityForPerformance()
      this.cleanupCache()
      
      const metrics = this.getPerformanceMetrics()
      console.log('📊 EnhancedVideoOptimizer Performance:', {
        loadTime: `${metrics.averageLoadTime.toFixed(2)}ms`,
        memoryUsage: `${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`,
        errorCount: metrics.errorCount,
        cacheHits: metrics.cacheHits,
        devicePerformance: metrics.devicePerformance
      })
    }, 30000)
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }
}

// Create singleton instance
const enhancedVideoOptimizer = new EnhancedVideoOptimizer()

export default enhancedVideoOptimizer
export type { VideoLoadOptions, PerformanceMetrics } 