
"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import styles from "./HeroCarousel.module.css"

// Optimized 10-second video URLs
const OPTIMIZED_VIDEOS = [
  "/herosection/optimized/hero-video-1.webm",
  "/herosection/optimized/hero-video-2.webm", 
  "/herosection/optimized/hero-video-3.webm",
  "/herosection/optimized/hero-video-4.webm",
  "/herosection/optimized/hero-video-5.webm",
]

// Fallback to original videos if optimized ones don't exist
const FALLBACK_VIDEOS = [
  "/herosection/StorySaver.to_AQMiiL2ymzY2G0kqVs2OLw37rR5PwqdeSPY4Op1sUmtSQSXL8NwtA7r00YqdE1AEMu0ELk9x1MZ9NxIdYGo8Jd7wS4Hjc.webm",
  "/herosection/StorySaver.to_AQNRVdeF2ejk-sqw5JUDMy_23uzXuD2m1jqUBnYxUodDN_38d8AFtBk-n4pjN13bvNcAiNFdx2EsLUHMFYoY3sx.webm",
  "/herosection/StorySaver.to_AQObCzPuN2j23kjIwDyRbd4rgniYN7kM8ZAn_fO09Q_ZhVpRCGVQya6evieaDdlyqwx0hZOnX1q72VjoW2-PGhw.webm",
  "/herosection/StorySaver.to_AQP8TheManZYkoMPUGyyyzhRfH5jlRZ8veRzG5zO9o3Jw4Pql8C71K27_MG7DFMr7x1MZ9NxIdYGo8Jd7wS4Hjc.webm",
  "/herosection/StorySaver.to_AQOKbDbVhs6Jnnb0LVccp3FdKXqVba9a7ps5E53RcALtrDbCosTs8ub03_Gb0-IV7Ju9m0AIAoO-Zl0TCDu9w7i.webm",
]

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying] = useState(true)
  const [videosLoaded, setVideosLoaded] = useState(false)
  const [currentVideos, setCurrentVideos] = useState<string[]>([])
  
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

  // Initialize videos (try optimized first, fallback to originals)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const initializeVideos = async () => {
      // Try to load optimized videos first
      let videosToUse = OPTIMIZED_VIDEOS
      
      // Check if optimized videos exist by testing the first one
      try {
        const testResponse = await fetch(OPTIMIZED_VIDEOS[0], { method: 'HEAD' })
        if (!testResponse.ok) {
          console.log('📹 Using fallback videos (optimized not found)')
          videosToUse = FALLBACK_VIDEOS
        } else {
          console.log('📹 Using optimized 10-second videos')
        }
      } catch {
        console.log('📹 Using fallback videos (optimized not accessible)')
        videosToUse = FALLBACK_VIDEOS
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

  // Handle video playback with optimization
  useEffect(() => {
    if (!videosLoaded) return

    const safePlay = (video: HTMLVideoElement | null) => {
      if (!video) return
      
      // Reset video to beginning
      video.currentTime = 0
      
      // Play with error handling
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video play failed:', error)
        })
      }
    }

    // Reset all videos
    videoRefs.current.forEach((v) => {
      if (v) {
        v.currentTime = 0
      }
    })
    fgVideoRefs.current.forEach((v) => {
      if (v) {
        v.currentTime = 0
      }
    })
    
    // Play current video
    safePlay(videoRefs.current[activeIndex])
    safePlay(fgVideoRefs.current[activeIndex])
  }, [activeIndex, videosLoaded])

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
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                className={styles.video}
                src={videoSrc}
                playsInline
                muted
                loop
                preload="metadata"
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
                <video
                  ref={(el) => { fgVideoRefs.current[index] = el; }}
                  className={styles.fgVideo}
                  src={currentVideos[previewIndex]}
                  playsInline
                  muted
                  loop
                  preload="metadata"
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
