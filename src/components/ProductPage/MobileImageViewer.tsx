import React, { useState, useRef, useEffect } from 'react';
import styles from './MobileImageViewer.module.css';

interface MobileImageViewerProps {
  images: string[];
  lastImageRef?: React.Ref<HTMLImageElement>;
  productType?: string;
}

export const MobileImageViewer: React.FC<MobileImageViewerProps> = ({ images, lastImageRef, productType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    setCurrentIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    container.scrollTo({
      left: index * containerWidth,
      behavior: 'smooth'
    });
  };

  // If not mobile, don't render this component
  if (!isMobile) return null;

  const totalImages = images.length;

  // Perfume image logic
  let displayImages = images;
  if (productType === 'perfume') {
    if (totalImages === 2) {
      displayImages = images.slice(0, 2);
    } else if (totalImages === 3) {
      displayImages = images.slice(0, 2);
    } else if (totalImages >= 4) {
      displayImages = [images[0], images[2]]; // First and third
    }
  }

  // Case 1: 36+ images - show 360 viewer with slider
  if (totalImages >= 36) {
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={images[currentFrame % totalImages]}
            alt={`360 view frame ${currentFrame + 1}`}
            className={styles.image}
            ref={lastImageRef}
          />
        </div>
        
        {/* 360 Slider */}
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min={0}
            max={totalImages - 1}
            value={currentFrame}
            onChange={e => setCurrentFrame(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>
    );
  }

  // Case 2: Multiple images - show horizontal swipe with line progress
  if (displayImages.length > 1) {
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer} ref={containerRef} onScroll={handleScroll}>
          {displayImages.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className={styles.image}
                ref={index === displayImages.length - 1 && lastImageRef ? lastImageRef : undefined}
              />
            </div>
          ))}
        </div>
        
        {/* Line progress bar */}
        <div className={styles.progressContainer}>
          {displayImages.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressLine} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default case: show first image
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={displayImages[0]}
          alt="Product image"
          className={styles.image}
          ref={lastImageRef}
        />
      </div>
    </div>
  );
}; 