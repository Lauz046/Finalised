"use client"
import { useEffect, useRef } from 'react'

interface PerformanceMonitorProps {
  onMetrics?: (metrics: PerformanceMetrics) => void
}

interface PerformanceMetrics {
  loadTime: number
  videoLoadTime: number
  memoryUsage?: number
  networkRequests: number
}

const PerformanceMonitor = ({ onMetrics }: PerformanceMonitorProps) => {
  const startTime = useRef<number>(Date.now())
  const videoLoadStart = useRef<number>(0)
  const networkRequests = useRef<number>(0)

  useEffect(() => {
    // Monitor network requests
    const originalFetch = window.fetch
    window.fetch = function(...args) {
      networkRequests.current++
      return originalFetch.apply(this, args)
    }

    // Monitor video loading
    const originalCreateElement = document.createElement
    document.createElement = function(tagName: string) {
      const element = originalCreateElement.call(this, tagName)
      
      if (tagName.toLowerCase() === 'video') {
        videoLoadStart.current = Date.now()
        
        const originalSrc = Object.getOwnPropertyDescriptor(HTMLVideoElement.prototype, 'src')
        if (originalSrc) {
          Object.defineProperty(element, 'src', {
            set: function(value: string) {
              if (originalSrc.set) {
                originalSrc.set.call(this, value)
              }
              
              // Monitor video load time
              this.addEventListener('canplay', () => {
                const loadTime = Date.now() - videoLoadStart.current
                console.log(`📊 Video load time: ${loadTime}ms`)
              }, { once: true })
            },
            get: function() {
              return originalSrc.get ? originalSrc.get.call(this) : ''
            }
          })
        }
      }
      
      return element
    }

    // Cleanup
    return () => {
      window.fetch = originalFetch
      document.createElement = originalCreateElement
    }
  }, [])

  useEffect(() => {
    // Report metrics when component unmounts
    return () => {
      const totalLoadTime = Date.now() - startTime.current
      
      const metrics: PerformanceMetrics = {
        loadTime: totalLoadTime,
        videoLoadTime: videoLoadStart.current ? Date.now() - videoLoadStart.current : 0,
        networkRequests: networkRequests.current,
        memoryUsage: (performance as any).memory?.usedJSHeapSize
      }

      console.log('📊 Performance Metrics:', metrics)
      onMetrics?.(metrics)
    }
  }, [onMetrics])

  return null // This component doesn't render anything
}

export default PerformanceMonitor 