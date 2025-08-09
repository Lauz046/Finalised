// OptimizedTikTokCarousel.tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './TikTokCarousal.module.css';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: number;
  videoUrl: string;
}

interface VideoCache {
  [key: string]: {
    element: HTMLVideoElement
    loaded: boolean
    lastUsed: number
  }
}

const OptimizedTikTokCarousel: React.FC = () => {
  // Original data
  const originalData: CarouselItem[] = [
    { id: 1, videoUrl: '/tictock/house_of_plutus-20250725-0001.webm' },
    { id: 2, videoUrl: '/tictock/house_of_plutus-20250725-0002.webm' },
    { id: 3, videoUrl: '/tictock/house_of_plutus-20250725-0003.webm' },
    { id: 4, videoUrl: '/tictock/house_of_plutus-20250725-0004.webm' },
    { id: 5, videoUrl: '/tictock/house_of_plutus-20250725-0005.webm' },
    { id: 6, videoUrl: '/tictock/house_of_plutus-20250725-0006.webm' },
    { id: 7, videoUrl: '/tictock/house_of_plutus-20250725-0007.webm' },
    { id: 8, videoUrl: '/tictock/house_of_plutus-20250725-0008.webm' },
    { id: 9, videoUrl: '/tictock/house_of_plutus-20250725-0009.webm' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingStates, setPlayingStates] = useState<{ [key: number]: boolean }>({});
  const [isInViewport, setIsInViewport] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 2 });
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoCache = useRef<VideoCache>({});

  // Check if mobile and iOS
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth <= 768;
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
      
      setIsMobile(isMobileDevice);
      setIsIOS(isIOSDevice);
      console.log(`📱 Device: ${isMobileDevice ? 'Mobile' : 'Desktop'}, ${isIOSDevice ? 'iOS' : 'Other'}`);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Set initial index to third video for desktop (will be positioned in center)
  useEffect(() => {
    if (!isMobile) {
      setCurrentIndex(2); // Start with third video (index 2)
    }
  }, [isMobile]);

  // Initialize playing states
  useEffect(() => {
    const initialStates: { [key: number]: boolean } = {};
    originalData.forEach((_, index) => {
      initialStates[index] = false;
    });
    setPlayingStates(initialStates);
  }, []);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Progressive video loading function
  const loadVideo = useCallback(async (index: number) => {
    if (loadedVideos.has(index)) return;

    console.log(`🎬 Loading TikTok video ${index + 1}`);
    
    const video = document.createElement('video');
    video.src = originalData[index].videoUrl;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    
    // iOS optimization
    if (isIOS) {
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
    }

    return new Promise<void>((resolve) => {
      video.addEventListener('loadedmetadata', () => {
        console.log(`✅ TikTok video ${index + 1} loaded successfully`);
        setLoadedVideos(prev => new Set([...prev, index]));
        resolve();
      }, { once: true });

      video.addEventListener('error', () => {
        console.warn(`❌ Failed to load TikTok video ${index + 1}`);
        resolve();
      }, { once: true });

      // Timeout for loading
      setTimeout(() => {
        console.warn(`⏰ Timeout loading TikTok video ${index + 1}`);
        resolve();
      }, 8000);
    });
  }, [loadedVideos, isIOS]);

  // Load initial videos (current + adjacent)
  useEffect(() => {
    if (!isInViewport) return;

    const loadInitialVideos = async () => {
      console.log('🚀 Loading initial TikTok videos...');
      
      // Load current video first
      await loadVideo(currentIndex);
      
      // Load adjacent videos
      const prevIndex = (currentIndex - 1 + originalData.length) % originalData.length;
      const nextIndex = (currentIndex + 1) % originalData.length;
      
      await Promise.all([
        loadVideo(prevIndex),
        loadVideo(nextIndex)
      ]);
      
      console.log('✅ Initial TikTok videos loaded');
    };

    loadInitialVideos();
  }, [isInViewport, currentIndex, loadVideo]);

  // Memory management: unload videos that are far from current
  useEffect(() => {
    if (!isInViewport) return;

    const cleanupOldVideos = () => {
      const videosToKeep = new Set<number>();
      
      // Keep current and adjacent videos
      videosToKeep.add(currentIndex);
      videosToKeep.add((currentIndex - 1 + originalData.length) % originalData.length);
      videosToKeep.add((currentIndex + 1) % originalData.length);
      
      // Unload videos that are not needed
      const videosToUnload = Array.from(loadedVideos).filter(
        index => !videosToKeep.has(index)
      );
      
      videosToUnload.forEach(index => {
        console.log(`🗑️ Unloading TikTok video ${index + 1}`);
        setLoadedVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      });
    };

    // Cleanup every 20 seconds
    const cleanupInterval = setInterval(cleanupOldVideos, 20000);
    return () => clearInterval(cleanupInterval);
  }, [currentIndex, loadedVideos, isInViewport, originalData.length]);

  // Auto-play logic
  useEffect(() => {
    const shouldPlay = isInViewport && (isHovered || isMobile) && loadedVideos.has(currentIndex);
    
    if (shouldPlay && !isPlaying) {
      setIsPlaying(true);
      setPlayingStates(prev => ({ ...prev, [currentIndex]: true }));
    } else if (!shouldPlay && isPlaying) {
      setIsPlaying(false);
      setPlayingStates(prev => ({ ...prev, [currentIndex]: false }));
    }
  }, [isInViewport, isHovered, currentIndex, isPlaying, isMobile, loadedVideos]);

  const handlePlayPause = () => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;
    
    const newPlayingState = !playingStates[currentIndex];
    
    if (newPlayingState) {
      video.play();
    } else {
      video.pause();
    }
    
    setPlayingStates(prev => ({
      ...prev,
      [currentIndex]: newPlayingState
    }));
    setIsPlaying(newPlayingState);
  };

  const navigate = useCallback(async (direction: 'left' | 'right') => {
    if (isMobile) {
      // Simple navigation for mobile - no infinite
      if (direction === 'left' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (direction === 'right' && currentIndex < originalData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      // Desktop: infinite navigation
      let newIndex;
      
      if (direction === 'left') {
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = originalData.length - 1;
        }
      } else {
        newIndex = currentIndex + 1;
        if (newIndex >= originalData.length) {
          newIndex = 0;
        }
      }
      
      setCurrentIndex(newIndex);
      
      // Preload the new current video if not loaded
      if (!loadedVideos.has(newIndex)) {
        await loadVideo(newIndex);
      }
    }
    
    const newPlayingState = playingStates[currentIndex] ?? false;
    setIsPlaying(newPlayingState);
  }, [currentIndex, originalData.length, isMobile, loadedVideos, loadVideo, playingStates]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || touchStart === null || touchEnd === null) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < originalData.length - 1) {
      navigate('right');
    } else if (isRightSwipe && currentIndex > 0) {
      navigate('left');
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
    const newPlayingState = playingStates[index] ?? false;
    setIsPlaying(newPlayingState);
  };

  useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Handle current video
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && loadedVideos.has(currentIndex)) {
      const shouldPlay = playingStates[currentIndex] ?? false;
      if (shouldPlay) {
        currentVideo.play().catch(console.error);
      } else {
        currentVideo.pause();
      }
      setIsPlaying(shouldPlay);
    }
  }, [currentIndex, playingStates, loadedVideos]);

  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        return window.innerWidth;
      }
      return 458;
    }
    return 458;
  };

  const getTransformValue = () => {
    if (isMobile) {
      return `translateX(-${currentIndex * 100}%)`;
    }
    
    const cardWidth = getCardWidth();
    const gap = 8;
    const totalCardWidth = cardWidth + gap;
    const centerPosition = window.innerWidth / 2 - cardWidth / 2;
    const leftOffset = centerPosition - (currentIndex * totalCardWidth) - (totalCardWidth * 2) + (2 * totalCardWidth);
    
    return `translateX(${leftOffset}px)`;
  };

  const getCurrentVideoIndex = () => {
    return currentIndex;
  };

  return (
    <div 
      ref={sectionRef}
      className={styles.wrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <header className={styles.header}>
        <h1>THE HYPE ZONE</h1>
        <p>
          A reel zone for fashion drops, sneak peeks, and styling stories.&nbsp;
          <a
            href="https://www.instagram.com/house_of_plutus?igsh=M2xzd2x0OXFzdWti"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.joinLink}
          >
            Join The Hype
          </a>
        </p>
      </header>

      {/* Desktop Navigation Arrows - Only show on desktop */}
      {!isMobile && (
        <>
          <div className={styles.navButtonLeft} onClick={() => navigate('left')}>
            <ChevronLeft size={28} />
          </div>

          <div className={styles.navButtonRight} onClick={() => navigate('right')}>
            <ChevronRight size={28} />
          </div>
        </>
      )}

      <div className={styles.carouselWrapper}>
        <div
          className={styles.carousel}
          style={{ 
            transform: getTransformValue(),
            transition: isMobile ? 'transform 0.3s ease' : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {originalData.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={`${item.id}-${index}`}
                className={`${styles.card} ${isActive ? styles.active : ''}`}
                onClick={() => handleCardClick(index)}
              >
                {loadedVideos.has(index) ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.videoUrl}
                    muted
                    loop
                    playsInline
                    className={styles.video}
                    onLoadedMetadata={(e) => {
                      // Limit video to 5 seconds
                      const video = e.target as HTMLVideoElement;
                      if (video.duration > 5) {
                        video.currentTime = 0;
                        const timer = setInterval(() => {
                          if (video.currentTime >= 5) {
                            video.currentTime = 0;
                          }
                        }, 100);
                        
                        video.addEventListener('loadedmetadata', () => {
                          clearInterval(timer);
                        });
                      }
                    }}
                  />
                ) : (
                  <div className={styles.videoPlaceholder}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading video {index + 1}...</p>
                  </div>
                )}
                
                {isActive && loadedVideos.has(index) && (
                  <button 
                    className={styles.controlBtn} 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handlePlayPause(); 
                    }}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Dots Navigation */}
      {isMobile && (
        <div className={styles.dotsContainer}>
          {originalData.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index === getCurrentVideoIndex() ? styles.activeDot : ''} ${
                loadedVideos.has(index) ? styles.loaded : styles.loading
              }`}
              onClick={() => {
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OptimizedTikTokCarousel; 