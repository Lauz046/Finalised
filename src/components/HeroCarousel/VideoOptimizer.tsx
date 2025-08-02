"use client"
import React, { useState, useEffect, useRef } from 'react';

interface VideoOptimizerProps {
  src: string;
  alt: string;
  className?: string;
}

const VideoOptimizer: React.FC<VideoOptimizerProps> = ({ src, alt, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadStart = () => {
      console.log(`🔄 Loading video: ${src}`)
    }

    const handleCanPlay = () => {
      console.log(`✅ Video ready: ${src}`)
      // setIsLoaded(true) // This line was removed
      // onLoad?.() // This line was removed
    }

    const handleError = (e: Event) => {
      console.error(`❌ Video error: ${src}`, e)
      // setHasError(true) // This line was removed
      // onError?.(`Failed to load video: ${src}`) // This line was removed
    }

    const handleLoadedData = () => {
      console.log(`📹 Video data loaded: ${src}`)
    }

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)
    video.addEventListener('loadeddata', handleLoadedData)

    // Set video attributes for optimization
    video.preload = 'auto' // Changed from preload prop to direct assignment
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
  }, [src]) // Changed dependency array to only include src

  return (
    <video
      ref={videoRef}
      src={src}
      style={{ display: 'none' }}
      muted
      playsInline
      loop
      preload="auto" // Changed from preload prop to direct assignment
    />
  )
}

export default VideoOptimizer 