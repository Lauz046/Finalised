"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import styles from "./HeroCarousel.module.css"

// Video configurations - only MP4 files
const VIDEO_CONFIGS = {
  optimized: [
    "/herosection/optimized/hero-video-1.mp4",
    "/herosection/optimized/hero-video-2.mp4", 
    "/herosection/optimized/hero-video-3.mp4",
    "/herosection/optimized/hero-video-4.mp4",
    "/herosection/optimized/hero-video-5.mp4",
  ]
}

interface VideoState {
  element: HTMLVideoElement | null
  loaded: boolean
  error: boolean
  loading: boolean
  lastUsed: number
  size: number
}

interface PerformanceMetrics {
  loadTime: number
  memoryUsage: number
  errorCount: number
  cacheHits: number
}

const UltraOptimizedHeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying] = useState(true)
  const [videosLoaded, setVideosLoaded] = useState(false)
  const [currentVideos, setCurrentVideos] = useState<string[]>([])
  const [videoStates, setVideoStates] = useState<VideoState[]>([])
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    memoryUsage: 0,
    errorCount: 0,
    cacheHits: 0
  })
  
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const initialized = useRef(false)
  const currentVideoRef = useRef<HTMLVideoElement | null>(null)
  const nextVideoRef = useRef<HTMLVideoElement | null>(null)
  const loadStartTime = useRef<number>(0)
  const errorCount = useRef<number>(0)
  const cacheHits = useRef<number>(0)

  // Device detection with multiple methods
  const deviceInfo = useMemo(() => {
    if (typeof window === 'undefined') return { isIOS: false, isMobile: false, isLowEnd: false }
    
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isMobile = window.innerWidth <= 768
    const isLowEnd = isMobile || isIOS || navigator.hardwareConcurrency <= 4
    
    return { isIOS, isMobile, isLowEnd }
  }, [])

  // Titles corresponding to each video
  const titles = [
    "SCENT SYNDICATE",
    "LUXE KICKS", 
    "DRIP KNOTS",
    "FUSION OF FORM",
    "BOUNDLESS IMAGINATION",
  ]

  const carouselLength = currentVideos.length || 5

  // Enhanced video loading with error recovery
  const loadVideo = useCallback(async (index: number): Promise<boolean> => {
    if (!currentVideos[index]) return false
    
    const currentState = videoStates[index]
    if (currentState?.loaded && currentState.element) {
      cacheHits.current++
      setPerformanceMetrics(prev => ({ ...prev, cacheHits: cacheHits.current }))
      return true
    }

    console.log(`🎬 Loading video ${index + 1}`)
    
    return new Promise<boolean>((resolve) => {
      const video = document.createElement('video')
      
      // Enhanced iOS optimizations
      if (deviceInfo.isIOS) {
        video.setAttribute('playsinline', 'true')
        video.setAttribute('webkit-playsinline', 'true')
        video.setAttribute('x-webkit-airplay', 'allow')
        video.setAttribute('webkit-video-playable-inline', 'true')
        // Reduce quality for iOS
        video.setAttribute('webkit-playsinline', 'true')
      }
      
      // Performance optimizations
      video.muted = true
      video.playsInline = true
      video.preload = 'metadata'
      video.loop = true
      
      // Force hardware acceleration
      video.style.transform = 'translateZ(0)'
      video.style.webkitTransform = 'translateZ(0)'
      video.style.backfaceVisibility = 'hidden'
      video.style.webkitBackfaceVisibility = 'hidden'
      
      // Update state to loading
      setVideoStates(prev => {
        const newStates = [...prev]
        newStates[index] = { ...newStates[index], loading: true, error: false }
        return newStates
      })

      const timeout = setTimeout(() => {
        console.warn(`⏰ Timeout loading video ${index + 1}`)
        errorCount.current++
        setVideoStates(prev => {
          const newStates = [...prev]
          newStates[index] = { ...newStates[index], loading: false, error: true }
          return newStates
        })
        setPerformanceMetrics(prev => ({ ...prev, errorCount: errorCount.current }))
        resolve(false)
      }, deviceInfo.isLowEnd ? 15000 : 10000)

      const onLoad = () => {
        clearTimeout(timeout)
        console.log(`✅ Video ${index + 1} loaded successfully`)
        
        // Estimate video size
        const estimatedSize = video.videoWidth * video.videoHeight * 4 // Rough estimate
        
        setVideoStates(prev => {
          const newStates = [...prev]
          newStates[index] = {
            element: video,
            loaded: true,
            error: false,
            loading: false,
            lastUsed: Date.now(),
            size: estimatedSize
          }
          return newStates
        })
        
        resolve(true)
      }

      const onError = () => {
        clearTimeout(timeout)
        console.warn(`❌ Failed to load video ${index + 1}`)
        errorCount.current++
        
        setVideoStates(prev => {
          const newStates = [...prev]
          newStates[index] = { ...newStates[index], loading: false, error: true }
          return newStates
        })
        
        setPerformanceMetrics(prev => ({ ...prev, errorCount: errorCount.current }))
        resolve(false)
      }

      video.addEventListener('loadedmetadata', onLoad, { once: true })
      video.addEventListener('error', onError, { once: true })
      
      video.src = currentVideos[index]
    })
  }, [currentVideos, videoStates, deviceInfo])

  // Initialize videos with performance tracking
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    loadStartTime.current = performance.now()

    const initializeVideos = async () => {
      // Test optimized videos first
      let videosToUse = VIDEO_CONFIGS.optimized
      
      try {
        const testResponse = await fetch(VIDEO_CONFIGS.optimized[0], { 
          method: 'HEAD',
          cache: 'no-cache' // Force fresh check
        })
        if (!testResponse.ok) {
          console.log('📹 Using fallback videos (optimized not found)')
          videosToUse = VIDEO_CONFIGS.fallback
        } else {
          console.log('📹 Using optimized 10-second videos')
        }
      } catch (error) {
        console.log('📹 Using fallback videos (optimized not accessible)')
        videosToUse = VIDEO_CONFIGS.fallback
      }
      
      setCurrentVideos(videosToUse)
      
      // Initialize video states
      setVideoStates(videosToUse.map(() => ({
        element: null,
        loaded: false,
        error: false,
        loading: false,
        lastUsed: 0,
        size: 0
      })))
      
      setVideosLoaded(true)
    }

    initializeVideos()
  }, [])

  // Load initial videos with parallel loading
  useEffect(() => {
    if (!videosLoaded) return

    const loadInitialVideos = async () => {
      console.log('🚀 Loading initial videos...')
      
      // Load current and next video in parallel
      const currentIndex = activeIndex
      const nextIndex = (activeIndex + 1) % carouselLength
      
      const results = await Promise.allSettled([
        loadVideo(currentIndex),
        loadVideo(nextIndex)
      ])
      
      const loadTime = performance.now() - loadStartTime.current
      setPerformanceMetrics(prev => ({ ...prev, loadTime }))
      
      console.log('✅ Initial videos loaded', results)
    }

    loadInitialVideos()
  }, [videosLoaded, activeIndex, carouselLength, loadVideo])

  // Enhanced memory management
  useEffect(() => {
    if (!videosLoaded) return

    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      const maxAge = deviceInfo.isLowEnd ? 2 * 60 * 1000 : 5 * 60 * 1000 // 2-5 minutes
      
      setVideoStates(prev => {
        const newStates = [...prev]
        let totalSize = 0
        
        newStates.forEach((state, index) => {
          if (state.loaded && state.element) {
            totalSize += state.size
            
            // Unload videos that are old or far from current
            const isOld = now - state.lastUsed > maxAge
            const isFar = Math.abs(index - activeIndex) > 2
            
            if (isOld || isFar) {
              console.log(`🗑️ Unloading video ${index + 1} (${isOld ? 'old' : 'far'})`)
              
              // Properly clean up video element
              if (state.element) {
                state.element.pause()
                state.element.src = ''
                state.element.load()
                state.element.remove()
              }
              
              newStates[index] = {
                element: null,
                loaded: false,
                error: false,
                loading: false,
                lastUsed: 0,
                size: 0
              }
            }
          }
        })
        
        // Update memory usage
        setPerformanceMetrics(prev => ({ ...prev, memoryUsage: totalSize }))
        
        return newStates
      })
    }, 30000) // Cleanup every 30 seconds

    return () => clearInterval(cleanupInterval)
  }, [videosLoaded, activeIndex, deviceInfo])

  // Preload next video when progress reaches threshold
  useEffect(() => {
    if (!videosLoaded || videoStates.length === 0) return

    const preloadThreshold = deviceInfo.isLowEnd ? 60 : 70 // Lower threshold for low-end devices
    
    if (progress > preloadThreshold) {
      const nextIndex = (activeIndex + 1) % carouselLength
      const nextNextIndex = (activeIndex + 2) % carouselLength
      
      // Preload next videos if not loaded
      if (!videoStates[nextIndex]?.loaded) {
        loadVideo(nextIndex)
      }
      
      if (!videoStates[nextNextIndex]?.loaded) {
        setTimeout(() => loadVideo(nextNextIndex), 2000)
      }
    }
  }, [progress, activeIndex, carouselLength, videoStates, videosLoaded, loadVideo, deviceInfo])

  // Progress management
  const startProgress = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    
    setProgress(0)
    
    const progressIncrement = 100 / (10 * 10) // 10 seconds per video
    
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressIncrement
        if (newProgress >= 100) {
          handleNext()
          return 0
        }
        return newProgress
      })
    }, 100)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % carouselLength)
    setProgress(0)
  }, [carouselLength])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + carouselLength) % carouselLength)
    setProgress(0)
  }, [carouselLength])

  // Start progress when videos are loaded
  useEffect(() => {
    if (videosLoaded && isPlaying && videoStates[activeIndex]?.loaded) {
      console.log('🚀 Starting progress bar')
      startProgress()
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
    }
  }, [isPlaying, videosLoaded, startProgress, activeIndex, videoStates])

  // Reset progress when activeIndex changes
  useEffect(() => {
    setProgress(0)
  }, [activeIndex])

  // Enhanced video playback
  useEffect(() => {
    if (!videosLoaded || !videoStates[activeIndex]?.loaded) return

    const safePlay = (video: HTMLVideoElement | null) => {
      if (!video) return
      
      video.currentTime = 0
      
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video play failed:', error)
        })
      }
    }

    // Play current video
    safePlay(currentVideoRef.current)
    safePlay(nextVideoRef.current)
    
    // Update last used time
    setVideoStates(prev => {
      const newStates = [...prev]
      if (newStates[activeIndex]) {
        newStates[activeIndex].lastUsed = Date.now()
      }
      return newStates
    })
  }, [activeIndex, videosLoaded, videoStates])

  // Performance monitoring
  useEffect(() => {
    const logPerformance = () => {
      console.log('📊 Performance Metrics:', {
        loadTime: `${performanceMetrics.loadTime.toFixed(2)}ms`,
        memoryUsage: `${(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`,
        errorCount: performanceMetrics.errorCount,
        cacheHits: performanceMetrics.cacheHits,
        device: deviceInfo
      })
    }

    // Log performance every 30 seconds
    const interval = setInterval(logPerformance, 30000)
    return () => clearInterval(interval)
  }, [performanceMetrics, deviceInfo])

  // Loading state
  if (!videosLoaded) {
    return (
      <section className={styles.heroWrapper}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading experience...</p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroCarousel}>
        {/* Background Videos */}
        <div className={styles.bgCarousel}>
          {currentVideos.map((videoSrc, index) => (
            <div
              key={`bg-${index}`}
              className={`${styles.videoContainer} ${index === activeIndex ? styles.active : ""}`}
            >
              {videoStates[index]?.loaded && videoStates[index]?.element ? (
                <video
                  ref={index === activeIndex ? currentVideoRef : null}
                  className={styles.video}
                  src={videoSrc}
                  playsInline
                  muted
                  loop
                  preload="metadata"
                />
              ) : (
                <div className={styles.videoPlaceholder}>
                  <div className={styles.loadingSpinner}></div>
                  <p>
                    {videoStates[index]?.error ? 'Error loading video' : 
                     videoStates[index]?.loading ? 'Loading video...' : 'Loading video...'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Foreground Videos */}
        <div className={styles.fgCarousel}>
          {currentVideos.map((videoSrc, index) => {
            const previewIndex = (index + 1) % carouselLength
            return (
              <div
                key={`fg-${index}`}
                className={`${styles.fgVideoContainer} ${index === activeIndex ? styles.active : ""}`}
              >
                {videoStates[previewIndex]?.loaded && videoStates[previewIndex]?.element ? (
                  <video
                    ref={index === activeIndex ? nextVideoRef : null}
                    className={styles.fgVideo}
                    src={currentVideos[previewIndex]}
                    playsInline
                    muted
                    loop
                    preload="metadata"
                  />
                ) : (
                  <div className={styles.videoPlaceholder}>
                    <div className={styles.loadingSpinner}></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Text Content */}
        <div className={styles.textContent}>
          <h1 className={styles.title}>{titles[activeIndex]}</h1>
        </div>

        {/* Right Controls */}
        <div className={styles.rightControls}>
          <div className={styles.nextUp}>
            <div className={styles.nextUpText + ' ' + styles.hideOnMobile}>NEXT UP</div>
            <div className={styles.nextTitle + ' ' + styles.hideOnMobile}>
              {titles[(activeIndex + 1) % carouselLength]}
            </div>
          </div>
          <div className={styles.progressBarRow}>
            <div className={styles.progressBarOuter}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className={styles.navArrows}>
              <button className={styles.prev} onClick={handlePrev}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div className={styles.arrowDivider}></div>
              <button className={styles.next} onClick={handleNext}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slide Indicator Bar */}
      <div className={styles.slideIndicatorBar}>
        {currentVideos.map((_, idx) => (
          <span
            key={idx}
            className={`${idx === activeIndex ? styles.slideIndicatorActive : styles.slideIndicator} ${
              videoStates[idx]?.loaded ? styles.loaded : 
              videoStates[idx]?.error ? styles.error : styles.loading
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default UltraOptimizedHeroCarousel 