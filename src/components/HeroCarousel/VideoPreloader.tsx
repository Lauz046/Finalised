"use client"
import React, { useEffect, useRef } from 'react';
import videoCache from '../../utils/videoCache'

interface VideoPreloaderProps {
  videos: string[];
  onAllLoaded?: () => void;
}

const VideoPreloader: React.FC<VideoPreloaderProps> = ({ videos, onAllLoaded }) => {
  const loadedVideos = useRef<Set<string>>(new Set());

  useEffect(() => {
    const mounted = true
    const isPreloading = false

    const preloadVideos = async () => {
      // Prevent multiple preload attempts
      if (isPreloading || isComplete) return
      isPreloading = true
      
      console.log('🚀 Starting video preload...')
      
      const preloadPromises = videoUrls.map(async (url, index) => {
        try {
          await videoCache.preloadVideo(url)
          if (mounted) {
            setLoadedCount(prev => {
              const newCount = prev + 1
              onProgress?.(newCount, videoUrls.length)
              return newCount
            })
          }
        } catch (error) {
          console.warn(`⚠️ Failed to preload video ${index + 1}:`, error)
        }
      })

      await Promise.allSettled(preloadPromises)
      
      if (mounted) {
        setIsComplete(true)
        onComplete?.()
        console.log('✅ Video preload complete!')
      }
    }

    preloadVideos()

    return () => {
      mounted = false
    }
  }, [videoUrls, onProgress, onComplete, isComplete])

  // Don't render anything - this is a background component
  return null
}

export default VideoPreloader 