// TikTokCarousel.tsx
import React, { useRef, useState, useEffect } from 'react';
import styles from './TikTokCarousal.module.css';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: number;
  videoUrl: string;
}

const TikTokCarousel: React.FC = () => {
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

  // Create infinite data for desktop only
  const getDisplayData = () => {
    if (isMobile) {
      return originalData;
    }
    // Desktop: duplicate the array 5 times for true infinite effect
    return [...originalData, ...originalData, ...originalData, ...originalData, ...originalData];
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingStates, setPlayingStates] = useState<{ [key: number]: boolean }>({});
  const [isInViewport, setIsInViewport] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  // Auto-play logic
  useEffect(() => {
    const shouldPlay = isInViewport && (isHovered || isMobile);
    
    if (shouldPlay && !isPlaying) {
      setIsPlaying(true);
      setPlayingStates(prev => ({ ...prev, [currentIndex]: true }));
    } else if (!shouldPlay && isPlaying) {
      setIsPlaying(false);
      setPlayingStates(prev => ({ ...prev, [currentIndex]: false }));
    }
  }, [isInViewport, isHovered, currentIndex, isPlaying, isMobile]);

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

  const navigate = (direction: 'left' | 'right') => {
    if (isMobile) {
      // Simple navigation for mobile - no infinite
      if (direction === 'left' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (direction === 'right' && currentIndex < originalData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      // Desktop: infinite navigation starting from first video
      let newIndex;
      
      if (direction === 'left') {
        newIndex = currentIndex - 1;
        // If we go below 0, wrap to the end
        if (newIndex < 0) {
          newIndex = originalData.length - 1;
        }
      } else {
        newIndex = currentIndex + 1;
        // If we go beyond the length, wrap to 0
        if (newIndex >= originalData.length) {
          newIndex = 0;
        }
      }
      
      setCurrentIndex(newIndex);
    }
    
    const newPlayingState = playingStates[currentIndex] ?? false;
    setIsPlaying(newPlayingState);
  };

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
    if (currentVideo) {
      const shouldPlay = playingStates[currentIndex] ?? false;
      if (shouldPlay) {
        currentVideo.play().catch(console.error);
      } else {
        currentVideo.pause();
      }
      setIsPlaying(shouldPlay);
    }
  }, [currentIndex, playingStates]);

  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        // Mobile: full width, no glimpses
        return window.innerWidth;
      }
      return 458; // Desktop: original width
    }
    return 458;
  };

  const [centerOffset, setCenterOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setCenterOffset(window.innerWidth / 2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTransformValue = () => {
    if (isMobile) {
      // Mobile: simple transform, no glimpses
      return `translateX(-${currentIndex * 100}%)`;
    }
    // Desktop: infinite scrolling effect with first video starting on left
    const cardWidth = getCardWidth();
    const gap = 8; // 4px margin on each side
    const totalCardWidth = cardWidth + gap;
    
    // Calculate the center position
    const centerPosition = window.innerWidth / 2 - cardWidth / 2;
    
    // For infinite effect, we need to show videos on both sides
    // Start with first video on the left, current video in center
    // Add some padding to show videos on both sides
    // Adjust offset so third video (index 2) is centered initially
    const leftOffset = centerPosition - (currentIndex * totalCardWidth) - (totalCardWidth * 2) + (2 * totalCardWidth);
    
    return `translateX(${leftOffset}px)`;
  };

  // Get current video index for dots
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
          {getDisplayData().map((item, index) => {
            // For desktop, we need to map the index to the original data for proper selection
            const originalIndex = isMobile ? index : index % originalData.length;
            const isActive = originalIndex === currentIndex;
            return (
              <div
                key={`${item.id}-${index}`}
                className={`${styles.card} ${isActive ? styles.active : ''}`}
                onClick={() => handleCardClick(originalIndex)}
              >
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
                      // Set up a timer to reset video after 5 seconds
                      const timer = setInterval(() => {
                        if (video.currentTime >= 5) {
                          video.currentTime = 0;
                        }
                      }, 100);
                      
                      // Clean up timer when video changes
                      video.addEventListener('loadedmetadata', () => {
                        clearInterval(timer);
                      });
                    }
                  }}
                />
                {isActive && (
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
              className={`${styles.dot} ${index === getCurrentVideoIndex() ? styles.activeDot : ''}`}
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

export default TikTokCarousel;