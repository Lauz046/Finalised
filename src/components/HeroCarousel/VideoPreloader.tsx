"use client"
import { useEffect, useState } from 'react'
import videoCache from '../../utils/videoCache'

interface VideoPreloaderProps {
  videoUrls: string[]
  onProgress?: (loaded: number, total: number) => void
  onComplete?: () => void
}

const VideoPreloader = ({ videoUrls, onProgress, onComplete }: VideoPreloaderProps) => {
  const [loadedCount, setLoadedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let mounted = true
    let isPreloading = false

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