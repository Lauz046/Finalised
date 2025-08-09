"use client"
import { useRef, useEffect, useState } from 'react'

interface VideoOptimizerProps {
  src: string
  alt?: string
  className?: string
  playsInline?: boolean
  muted?: boolean
  loop?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  poster?: string
  onLoad?: () => void
  onError?: (error: string) => void
  onPlay?: () => void
  onPause?: () => void
  isIOS?: boolean
}

const VideoOptimizer: React.FC<VideoOptimizerProps> = ({ 
  src, 
  alt, 
  className, 
  playsInline = true,
  muted = true,
  loop = true,
  preload = 'metadata',
  poster,
  onLoad,
  onError,
  onPlay,
  onPause,
  isIOS = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadStart = () => {
      console.log(`🔄 Loading video: ${src}`)
    }

    const handleCanPlay = () => {
      console.log(`✅ Video ready: ${src}`)
      setIsLoaded(true)
      onLoad?.()
    }

    const handleError = (e: Event) => {
      console.error(`❌ Video error: ${src}`, e)
      setHasError(true)
      onError?.(`Failed to load video: ${src}`)
    }

    const handleLoadedData = () => {
      console.log(`📹 Video data loaded: ${src}`)
    }

    const handlePlay = () => {
      console.log(`▶️ Video playing: ${src}`)
      setIsPlaying(true)
      onPlay?.()
    }

    const handlePause = () => {
      console.log(`⏸️ Video paused: ${src}`)
      setIsPlaying(false)
      onPause?.()
    }

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    // Set video attributes for optimization
    video.preload = preload
    video.muted = muted
    video.playsInline = playsInline
    video.loop = loop

    // iOS-specific optimizations
    if (isIOS) {
      video.autoplay = false
      video.controls = false
      // iOS sometimes needs explicit attribute setting
      video.setAttribute('playsinline', 'true')
      video.setAttribute('webkit-playsinline', 'true')
      video.setAttribute('x-webkit-airplay', 'allow')
      // iOS specific styles for better performance
      video.style.webkitTransform = 'translateZ(0)'
      video.style.transform = 'translateZ(0)'
      video.style.webkitBackfaceVisibility = 'hidden'
      video.style.backfaceVisibility = 'hidden'
    }

    // Cleanup
    return () => {
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [src, preload, muted, playsInline, loop, isIOS, onLoad, onError, onPlay, onPause])

  const handlePlay = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      // iOS-specific play handling
      if (isIOS) {
        video.currentTime = 0
        video.playsInline = true
        video.muted = true
        
        // iOS sometimes needs a delay and multiple attempts
        const playVideo = async (attempt = 1) => {
          try {
            await video.play()
            console.log(`✅ iOS video play successful on attempt ${attempt}`)
          } catch (error) {
            console.warn(`⚠️ iOS video play failed on attempt ${attempt}:`, error)
            
            if (attempt < 3) {
              // Retry with a delay
              setTimeout(async () => {
                try {
                  video.load()
                  await new Promise(resolve => setTimeout(resolve, 200))
                  await playVideo(attempt + 1)
                } catch (e) {
                  console.error(`❌ Retry attempt ${attempt + 1} failed:`, e)
                }
              }, 300 * attempt)
            } else {
              console.error('❌ All iOS video play attempts failed')
            }
          }
        }
        
        await playVideo()
      } else {
        // Standard play for other devices
        await video.play()
      }
    } catch (error) {
      console.warn('Video play failed:', error)
    }
  }

  useEffect(() => {
    if (isLoaded && !isPlaying && !hasError) {
      handlePlay()
    }
  }, [isLoaded, isPlaying, hasError])

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      playsInline={playsInline}
      muted={muted}
      loop={loop}
      preload={preload}
      poster={poster}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        // iOS-specific styles for better performance
        ...(isIOS && {
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitPerspective: '1000px',
          perspective: '1000px'
        })
      }}
    />
  )
}

export default VideoOptimizer 