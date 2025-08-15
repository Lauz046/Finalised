"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import styles from "./HeroCarousel.module.css"

// Optimized video URLs - only MP4 files
const VIDEOS = [
  "/herosection/optimized/hero-video-1.mp4",
  "/herosection/optimized/hero-video-2.mp4", 
  "/herosection/optimized/hero-video-3.mp4",
  "/herosection/optimized/hero-video-4.mp4",
  "/herosection/optimized/hero-video-5.mp4",
]

const TITLES = [
  "SCENT SYNDICATE",
  "LUXE KICKS", 
  "DRIP KNOTS",
  "FUSION OF FORM",
  "BOUNDLESS IMAGINATION",
]

// Global cache to prevent multiple requests
const globalVideoCache = new Map<string, HTMLVideoElement>()
const globalLoadedVideos = new Set<string>()
const globalLoadingVideos = new Set<string>()

const OptimizedHeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentVideos, setCurrentVideos] = useState<string[]>([])
  const [userInteracted, setUserInteracted] = useState(false)
  const [loadedVideoCount, setLoadedVideoCount] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)
  
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const fgVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const initialized = useRef(false)
  const loadStartTime = useRef<number>(0)
  const preloadQueue = useRef<number[]>([])
  const isPreloading = useRef(false)

  // Device detection
  const deviceInfo = useMemo(() => {
    if (typeof window === 'undefined') return { isIOS: false, isMobile: false }
    
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isMobile = window.innerWidth <= 768
    
    return { isIOS, isMobile }
  }, [])

  // Helper function to get valid video index
  const getValidVideoIndex = useCallback((index: number, totalVideos: number): number => {
    if (totalVideos === 0) return 0
    return ((index % totalVideos) + totalVideos) % totalVideos
  }, [])

  // Initialize videos - ONLY ONCE
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    
    loadStartTime.current = performance.now()
    console.log('🚀 Initializing hero carousel...')
    
    const initializeVideos = async () => {
      // Use MP4 videos for all devices
      let videosToUse = VIDEOS
      
      try {
        console.log('📹 Using MP4 videos for all devices')
        const testResponse = await fetch(videosToUse[0], { method: 'HEAD' })
        if (!testResponse.ok) {
          console.log('❌ Optimized videos not found')
          setIsLoading(false)
          return
        }
      } catch (error) {
        console.log('❌ Optimized videos not accessible:', error)
        setIsLoading(false)
        return
      }
      
      setCurrentVideos(videosToUse)
      setIsLoading(false)
      console.log(`✅ Initialized with ${videosToUse.length} MP4 videos`)
    }

    initializeVideos()
  }, [])

  // Load initial 2 videos
  const loadInitialVideos = async (videos: string[]) => {
    console.log('🔄 Loading initial 2 videos...')
    
    // Load first video
    const firstLoaded = await loadVideo(videos[0], 0)
    if (firstLoaded) {
      setLoadedVideoCount(1)
      console.log('✅ First video loaded')
    }
    
    // Load second video in background
    setTimeout(() => {
      loadVideo(videos[1], 1)
    }, 100)
    
    setIsLoading(false)
  }

  // Professional video loading with caching
  const loadVideo = async (videoSrc: string, index: number): Promise<boolean> => {
    // Validate inputs
    if (!videoSrc || videoSrc === 'undefined' || index < 0 || isNaN(index)) {
      console.warn(`❌ Invalid video request: src=${videoSrc}, index=${index}`)
      return false
    }

    // Check if already loaded
    if (globalLoadedVideos.has(videoSrc)) {
      console.log(`📦 Video ${index + 1} already cached`)
      return true
    }

    // Check if currently loading
    if (globalLoadingVideos.has(videoSrc)) {
      console.log(`⏳ Video ${index + 1} already loading...`)
      return false
    }

    // Check cache first
    if (globalVideoCache.has(videoSrc)) {
      console.log(`📦 Video ${index + 1} loaded from cache`)
      globalLoadedVideos.add(videoSrc)
      return true
    }

    console.log(`🔄 Loading video ${index + 1} from network`)
    globalLoadingVideos.add(videoSrc)

    return new Promise<boolean>((resolve) => {
      const video = document.createElement('video')
      
      // Set video attributes for iOS compatibility
      video.muted = true
      video.playsInline = true
      video.preload = 'metadata'
      video.loop = true
      video.volume = 0
      
      // iOS optimizations
      if (deviceInfo.isIOS) {
        video.setAttribute('playsinline', 'true')
        video.setAttribute('webkit-playsinline', 'true')
        video.setAttribute('x-webkit-airplay', 'allow')
        video.setAttribute('webkit-video-playable-inline', 'true')
        video.setAttribute('autoplay', 'false') // Disable autoplay for iOS
        video.setAttribute('muted', 'true')
        video.setAttribute('loop', 'true')
        
        // iOS-specific styles
        video.style.transform = 'translateZ(0)'
        video.style.webkitTransform = 'translateZ(0)'
        video.style.backfaceVisibility = 'hidden'
        video.style.webkitBackfaceVisibility = 'hidden'
        video.style.objectFit = 'cover'
        video.style.width = '100%'
        video.style.height = '100%'
      } else {
        // Non-iOS optimizations
        video.style.transform = 'translateZ(0)'
        video.style.webkitTransform = 'translateZ(0)'
        video.style.backfaceVisibility = 'hidden'
        video.style.webkitBackfaceVisibility = 'hidden'
      }
      
      const timeoutId = setTimeout(() => {
        console.warn(`⏰ Video ${index + 1} load timeout`)
        globalLoadingVideos.delete(videoSrc)
        resolve(false)
      }, 15000) // 15 second timeout

      const onLoad = () => {
        clearTimeout(timeoutId)
        console.log(`✅ Video ${index + 1} loaded successfully`)
        
        // Cache the video
        globalVideoCache.set(videoSrc, video)
        globalLoadedVideos.add(videoSrc)
        globalLoadingVideos.delete(videoSrc)
        
        setLoadedVideoCount(prev => prev + 1)
        
        const loadTime = performance.now() - loadStartTime.current
        console.log(`✅ Video ${index + 1} loaded in ${loadTime.toFixed(2)}ms`)
        
        resolve(true)
      }

      const onError = () => {
        clearTimeout(timeoutId)
        console.warn(`❌ Video ${index + 1} load failed`)
        globalLoadingVideos.delete(videoSrc)
        resolve(false)
      }

      video.addEventListener('loadedmetadata', onLoad, { once: true })
      video.addEventListener('error', onError, { once: true })
      
      video.src = videoSrc
    })
  }

  // Progressive preloading - load next video when current is at 50%
  useEffect(() => {
    if (progress > 50 && !isPreloading.current && currentVideos.length > 0) {
      const nextIndex = getValidVideoIndex(activeIndex + 1, currentVideos.length)
      const nextVideoSrc = currentVideos[nextIndex]
      
      if (nextVideoSrc && !globalLoadedVideos.has(nextVideoSrc) && !globalLoadingVideos.has(nextVideoSrc)) {
        console.log(`🔄 Preloading video ${nextIndex + 1}...`)
        isPreloading.current = true
        
        loadVideo(nextVideoSrc, nextIndex).then(() => {
          isPreloading.current = false
          console.log(`✅ Video ${nextIndex + 1} preloaded successfully`)
        })
      }
    }
  }, [progress, activeIndex, currentVideos, getValidVideoIndex])

  // Preload third video when second is loaded
  useEffect(() => {
    if (loadedVideoCount >= 2 && currentVideos.length > 0) {
      const thirdIndex = getValidVideoIndex(activeIndex + 2, currentVideos.length)
      const thirdVideoSrc = currentVideos[thirdIndex]
      
      if (thirdVideoSrc && !globalLoadedVideos.has(thirdVideoSrc) && !globalLoadingVideos.has(thirdVideoSrc)) {
        console.log(`🔄 Preloading third video ${thirdIndex + 1}...`)
        loadVideo(thirdVideoSrc, thirdIndex)
      }
    }
  }, [loadedVideoCount, activeIndex, currentVideos, getValidVideoIndex])

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
    setActiveIndex((prev) => getValidVideoIndex(prev + 1, currentVideos.length))
    setProgress(0)
  }, [currentVideos.length, getValidVideoIndex])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => getValidVideoIndex(prev - 1, currentVideos.length))
    setProgress(0)
  }, [currentVideos.length, getValidVideoIndex])

  // Start progress when not loading
  useEffect(() => {
    if (!isLoading) {
      console.log('🚀 Starting progress bar')
      startProgress()
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
    }
  }, [isLoading, startProgress])

  // Reset progress when activeIndex changes
  useEffect(() => {
    setProgress(0)
  }, [activeIndex])

  // Handle video playback with iOS compatibility
  useEffect(() => {
    if (isLoading || !currentVideos.length) return

    const playCurrentVideo = async () => {
      const validIndex = getValidVideoIndex(activeIndex, currentVideos.length)
      const currentVideo = videoRefs.current[validIndex]
      const currentFgVideo = fgVideoRefs.current[validIndex]
      
      if (currentVideo) {
        try {
          currentVideo.currentTime = 0
          
          // iOS autoplay compatibility
          if (deviceInfo.isIOS) {
            // For iOS, we need user interaction for autoplay
            if (!userInteracted) {
              console.log('📱 iOS device detected - waiting for user interaction')
              // Set up a one-time click handler for iOS
              const handleIOSInteraction = () => {
                console.log('📱 iOS user interaction detected - starting video')
                currentVideo.play().then(() => {
                  console.log('✅ iOS video started after interaction')
                  setVideoPlaying(true)
                }).catch((error) => {
                  console.warn('iOS video play failed after interaction:', error)
                })
                document.removeEventListener('touchstart', handleIOSInteraction)
                document.removeEventListener('click', handleIOSInteraction)
              }
              
              document.addEventListener('touchstart', handleIOSInteraction, { once: true })
              document.addEventListener('click', handleIOSInteraction, { once: true })
              return
            }
          }
          
          const playPromise = currentVideo.play()
          if (playPromise !== undefined) {
            await playPromise
            console.log('✅ Current video playing')
            setVideoPlaying(true)
          }
        } catch (error) {
          console.warn('Video play failed:', error)
          if (deviceInfo.isIOS) {
            console.log('📱 iOS autoplay blocked - waiting for user interaction')
          }
        }
      }
      
      if (currentFgVideo) {
        try {
          currentFgVideo.currentTime = 0
          const playPromise = currentFgVideo.play()
          if (playPromise !== undefined) {
            await playPromise
          }
        } catch (error) {
          console.warn('Foreground video play failed:', error)
        }
      }
    }

    playCurrentVideo()
  }, [activeIndex, isLoading, currentVideos, deviceInfo, userInteracted, getValidVideoIndex])

  // Handle user interaction
  const handleUserInteraction = useCallback(() => {
    if (!userInteracted) {
      console.log('👆 User interaction detected')
      setUserInteracted(true)
      
      // Try to play current video after user interaction
      const validIndex = getValidVideoIndex(activeIndex, currentVideos.length)
      const currentVideo = videoRefs.current[validIndex]
      if (currentVideo) {
        currentVideo.play().then(() => {
          console.log('✅ Video started after user interaction')
          setVideoPlaying(true)
        }).catch((error) => {
          console.warn('Play failed after interaction:', error)
        })
      }
    }
  }, [userInteracted, activeIndex, currentVideos, getValidVideoIndex])

  // Add video event listeners to detect when video starts playing
  useEffect(() => {
    const currentVideo = videoRefs.current[activeIndex]
    if (currentVideo) {
      const handlePlay = () => {
        console.log('🎬 Video started playing')
        setVideoPlaying(true)
      }
      
      const handlePause = () => {
        console.log('⏸️ Video paused')
        setVideoPlaying(false)
      }
      
      const handleEnded = () => {
        console.log('🔚 Video ended')
        setVideoPlaying(false)
      }
      
      currentVideo.addEventListener('play', handlePlay)
      currentVideo.addEventListener('pause', handlePause)
      currentVideo.addEventListener('ended', handleEnded)
      
      return () => {
        currentVideo.removeEventListener('play', handlePlay)
        currentVideo.removeEventListener('pause', handlePause)
        currentVideo.removeEventListener('ended', handleEnded)
      }
    }
  }, [activeIndex])

  // Memory cleanup
  useEffect(() => {
    return () => {
      // Clear progress interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
      
      // Pause all videos
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause()
          video.src = ''
          video.load()
        }
      })
      
      fgVideoRefs.current.forEach(video => {
        if (video) {
          video.pause()
          video.src = ''
          video.load()
        }
      })
    }
  }, [])

  // Performance monitoring
  useEffect(() => {
    const logPerformance = () => {
      console.log('📊 Performance Stats:', {
        loadedVideos: globalLoadedVideos.size,
        cachedVideos: globalVideoCache.size,
        loadingVideos: globalLoadingVideos.size,
        activeIndex,
        progress: `${progress.toFixed(1)}%`,
        userInteracted,
        device: deviceInfo
      })
    }

    const interval = setInterval(logPerformance, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [progress, activeIndex, deviceInfo, userInteracted])

  // Loading state
  if (isLoading) {
    return (
      <section className={styles.heroWrapper} onClick={handleUserInteraction}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>{deviceInfo.isIOS ? 'Loading experience... (Tap to start on iOS)' : 'Loading experience...'}</p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.heroWrapper} onClick={handleUserInteraction}>
      <div className={styles.heroCarousel}>
        {/* Background Videos */}
        <div className={styles.bgCarousel}>
          {currentVideos.map((videoSrc, index) => (
            <div
              key={`bg-${index}`}
              className={`${styles.videoContainer} ${index === activeIndex ? styles.active : ""}`}
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                className={styles.video}
                src={videoSrc}
                playsInline
                muted
                loop
                preload="metadata"
                {...(deviceInfo.isIOS && {
                  'webkit-playsinline': 'true',
                  'x-webkit-airplay': 'allow',
                  'webkit-video-playable-inline': 'true',
                  'autoplay': 'false'
                })}
              />
            </div>
          ))}
        </div>

        {/* Video Placeholder - shows until video starts playing */}
        {!videoPlaying && !isLoading && (
          <div className={styles.videoPlaceholder}>
            <img 
              src={deviceInfo.isMobile ? "/hero-placeholder-mobile.png" : "/hero-placeholder.png"}
              alt="House of Plutus - Loading Premium Experience"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            <div className={styles.placeholderOverlay}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading premium experience...</p>
            </div>
          </div>
        )}

        {/* Foreground Videos */}
        <div className={styles.fgCarousel}>
          {currentVideos.map((videoSrc, index) => {
            const previewIndex = getValidVideoIndex(index + 1, currentVideos.length)
            return (
              <div
                key={`fg-${index}`}
                className={`${styles.fgVideoContainer} ${index === activeIndex ? styles.active : ""}`}
              >
                <video
                  ref={(el) => { fgVideoRefs.current[index] = el; }}
                  className={styles.fgVideo}
                  src={currentVideos[previewIndex]}
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  {...(deviceInfo.isIOS && {
                    'webkit-playsinline': 'true',
                    'x-webkit-airplay': 'allow',
                    'webkit-video-playable-inline': 'true',
                    'autoplay': 'false'
                  })}
                />
              </div>
            )
          })}
        </div>

        {/* Text Content */}
        <div className={styles.textContent}>
          <h1 className={styles.title}>{TITLES[activeIndex] || TITLES[0]}</h1>
        </div>

        {/* Right Controls */}
        <div className={styles.rightControls}>
          <div className={styles.nextUp}>
            <div className={styles.nextUpText + ' ' + styles.hideOnMobile}>NEXT UP</div>
            <div className={styles.nextTitle + ' ' + styles.hideOnMobile}>
              {TITLES[getValidVideoIndex(activeIndex + 1, currentVideos.length)] || TITLES[0]}
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
            className={idx === activeIndex ? styles.slideIndicatorActive : styles.slideIndicator}
          />
        ))}
      </div>
    </section>
  )
}

export default OptimizedHeroCarousel 