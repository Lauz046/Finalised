"use client"
import { useEffect, useRef, useState } from 'react'

interface VideoOptimizerProps {
  videoSrc: string
  onLoad?: () => void
  onError?: (error: string) => void
  preload?: boolean
}

const VideoOptimizer = ({ videoSrc, onLoad, onError, preload = true }: VideoOptimizerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadStart = () => {
      console.log(`🔄 Loading video: ${videoSrc}`)
    }

    const handleCanPlay = () => {
      console.log(`✅ Video ready: ${videoSrc}`)
      setIsLoaded(true)
      onLoad?.()
    }

    const handleError = (e: Event) => {
      console.error(`❌ Video error: ${videoSrc}`, e)
      setHasError(true)
      onError?.(`Failed to load video: ${videoSrc}`)
    }

    const handleLoadedData = () => {
      console.log(`📹 Video data loaded: ${videoSrc}`)
    }

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)
    video.addEventListener('loadeddata', handleLoadedData)

    // Set video attributes for optimization
    video.preload = preload ? 'auto' : 'metadata'
    video.muted = true
    video.playsInline = true
    video.loop = true

    // Cleanup
    return () => {
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [videoSrc, onLoad, onError, preload])

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      style={{ display: 'none' }}
      muted
      playsInline
      loop
      preload={preload ? 'auto' : 'metadata'}
    />
  )
}

export default VideoOptimizer 