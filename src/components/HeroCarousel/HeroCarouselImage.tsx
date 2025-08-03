"use client"
import { useState, useEffect, useRef, useCallback, memo } from "react"
import styles from "./HeroCarousel.module.css"
import { getPersistedState, persistComponentState } from "@/utils/cacheUtils"

// Image URLs for hero carousel
const HERO_IMAGES = [
  "/image1.jpeg",
  "/image2.jpeg", 
  "/image3.jpeg",
  "/image4.jpeg",
  "/image5.jpeg",
]

const HeroCarouselImage = memo(() => {
  // Initialize state with persisted data if available
  const persistedState = getPersistedState<{activeIndex: number; progress: number}>('hero-carousel');
  const [activeIndex, setActiveIndex] = useState(persistedState?.activeIndex || 0)
  const [progress, setProgress] = useState(persistedState?.progress || 0)
  const [isPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const initialized = useRef(false)

  // Titles corresponding to each image
  const titles = [
    "SCENT SYNDICATE",
    "LUXE KICKS", 
    "DRIP KNOTS",
    "FUSION OF FORM",
    "BOUNDLESS IMAGINATION",
  ]

  const carouselLength = HERO_IMAGES.length

  // Persist state when it changes
  useEffect(() => {
    persistComponentState('hero-carousel', {
      activeIndex,
      progress,
      timestamp: Date.now()
    });
  }, [activeIndex, progress]);

  // Initialize images
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Preload images
    const preloadImages = async () => {
      const imagePromises = HERO_IMAGES.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = src
        })
      })

      try {
        await Promise.all(imagePromises)
        console.log('📸 All hero images loaded successfully')
        setImagesLoaded(true)
      } catch (error) {
        console.warn('📸 Some images failed to load, but continuing:', error)
        setImagesLoaded(true) // Continue anyway
      }
    }

    preloadImages()
  }, [])

  const startProgress = useCallback(() => {
    // Clear any existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    
    // Reset progress to 0
    setProgress(0)
    
    // Calculate progress increment (8 seconds per image)
    const progressIncrement = 100 / (8 * 10) // 8 seconds = 8000ms, update every 100ms
    
    progressInterval.current = setInterval(() => {
      setProgress((prev: number) => {
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
    setActiveIndex((prev: number) => (prev + 1) % carouselLength)
    // Reset progress when changing slides
    setProgress(0)
  }, [carouselLength])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev: number) => (prev - 1 + carouselLength) % carouselLength)
    // Reset progress when changing slides
    setProgress(0)
  }, [carouselLength])

  // Start progress when images are loaded
  useEffect(() => {
    if (imagesLoaded && isPlaying) {
      console.log('🚀 Starting progress bar')
      startProgress()
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
    }
  }, [isPlaying, imagesLoaded, startProgress])

  // Reset progress when activeIndex changes
  useEffect(() => {
    setProgress(0)
  }, [activeIndex])

  // Loading state
  if (!imagesLoaded) {
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
        {/* Background Images */}
        <div className={styles.bgCarousel}>
          {HERO_IMAGES.map((imageSrc, index) => (
            <div
              key={`bg-${index}`}
              className={`${styles.videoContainer} ${index === activeIndex ? styles.active : ""}`}
            >
              <img
                className={styles.video}
                src={imageSrc}
                alt={`Hero image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          ))}
        </div>

        {/* Foreground Images */}
        <div className={styles.fgCarousel}>
          {HERO_IMAGES.map((imageSrc, index) => {
            const previewIndex = (index + 1) % carouselLength
            return (
              <div
                key={`fg-${index}`}
                className={`${styles.fgVideoContainer} ${index === activeIndex ? styles.active : ""}`}
              >
                <img
                  className={styles.fgVideo}
                  src={HERO_IMAGES[previewIndex]}
                  alt={`Preview image ${previewIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
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
        {HERO_IMAGES.map((_, idx) => (
          <span
            key={idx}
            className={idx === activeIndex ? styles.slideIndicatorActive : styles.slideIndicator}
          />
        ))}
      </div>
    </section>
  )
})

HeroCarouselImage.displayName = 'HeroCarouselImage'

export default HeroCarouselImage 