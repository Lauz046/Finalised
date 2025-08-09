
"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import styles from "./HeroCarousel.module.css"
import VideoOptimizer from "./VideoOptimizer"

// Video format detection and fallback system
const getVideoFormats = () => {
  // iOS detection
  const isIOS = typeof navigator !== 'undefined' && 
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  
  // Android detection
  const isAndroid = typeof navigator !== 'undefined' && 
    /Android/.test(navigator.userAgent)
  
  return {
    preferredFormat: 'mp4', // Always use MP4 for consistency
    isIOS,
    isAndroid
  }
}

// Optimized video URLs - only MP4 files
const getOptimizedVideos = () => {
  return [
    "/herosection/optimized/hero-video-1.mp4",
    "/herosection/optimized/hero-video-2.mp4", 
    "/herosection/optimized/hero-video-3.mp4",
    "/herosection/optimized/hero-video-4.mp4",
    "/herosection/optimized/hero-video-5.mp4",
  ]
}

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying] = useState(true)
  const [videosLoaded, setVideosLoaded] = useState(false)
  const [currentVideos, setCurrentVideos] = useState<string[]>([])
  const [isIOS, setIsIOS] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const fgVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const initialized = useRef(false)

  // Titles corresponding to each video
  const titles = [
    "SCENT SYNDICATE",
    "LUXE KICKS", 
    "DRIP KNOTS",
    "FUSION OF FORM",
    "BOUNDLESS IMAGINATION",
  ]

  const carouselLength = currentVideos.length || 5

  // Initialize videos with format detection and fallbacks
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const initializeVideos = async () => {
      const { isIOS: iosDevice } = getVideoFormats()
      setIsIOS(iosDevice)
      
      console.log(`📱 Device detected: ${iosDevice ? 'iOS' : 'Other'}`)
      console.log(`🎬 Using MP4 format for all devices`)
      
      // Use optimized MP4 videos
      const videosToUse = getOptimizedVideos()
      
      // Check if optimized videos exist by testing the first one
      try {
        const testResponse = await fetch(videosToUse[0], { method: 'HEAD' })
        if (!testResponse.ok) {
          console.log('❌ Optimized videos not found')
          setVideosLoaded(false)
          return
        } else {
          console.log(`📹 Using optimized MP4 videos`)
        }
      } catch (error) {
        console.log('❌ Optimized videos not accessible:', error)
        setVideosLoaded(false)
        return
      }
      
      setCurrentVideos(videosToUse)
      setVideosLoaded(true)
    }

    initializeVideos()
  }, [])

  const startProgress = useCallback(() => {
    // Clear any existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    
    // Reset progress to 0
    setProgress(0)
    
    // Calculate progress increment (8 seconds per video)
    const progressIncrement = 100 / (8 * 10) // 8 seconds = 8000ms, update every 100ms
    
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
    // Reset progress when changing slides
    setProgress(0)
  }, [carouselLength])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + carouselLength) % carouselLength)
    // Reset progress when changing slides
    setProgress(0)
  }, [carouselLength])

  // Start progress when videos are loaded
  useEffect(() => {
    if (videosLoaded && isPlaying) {
      console.log('🚀 Starting progress bar')
      startProgress()
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
    }
  }, [isPlaying, videosLoaded, startProgress])

  // Reset progress when activeIndex changes
  useEffect(() => {
    setProgress(0)
  }, [activeIndex])

  // Handle video loading
  const handleVideoLoad = (index: number) => {
    setLoadedVideos(prev => new Set([...prev, index]))
  }

  const handleVideoError = (index: number, error: string) => {
    console.error(`Video ${index} failed to load:`, error)
  }

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
              <VideoOptimizer
                src={videoSrc}
                className={styles.video}
                playsInline={true}
                muted={true}
                loop={true}
                preload="metadata"
                isIOS={isIOS}
                onLoad={() => handleVideoLoad(index)}
                onError={(error) => handleVideoError(index, error)}
              />
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
                <VideoOptimizer
                  src={currentVideos[previewIndex]}
                  className={styles.fgVideo}
                  playsInline={true}
                  muted={true}
                  loop={true}
                  preload="metadata"
                  isIOS={isIOS}
                  onLoad={() => handleVideoLoad(previewIndex)}
                  onError={(error) => handleVideoError(previewIndex, error)}
                />
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
            className={idx === activeIndex ? styles.slideIndicatorActive : styles.slideIndicator}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroCarousel
