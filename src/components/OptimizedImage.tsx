import React, { useState, useEffect, useRef } from 'react';
import { useImageOptimizer } from '../utils/imageOptimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  style,
  priority = false,
  loading = 'lazy',
  onLoad,
  onError,
  placeholder,
  fallback
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || src);
  const imgRef = useRef<HTMLImageElement>(null);
  const { isImagePreloaded } = useImageOptimizer();

  useEffect(() => {
    // If image is already preloaded, show it immediately
    if (isImagePreloaded(src)) {
      setCurrentSrc(src);
      setIsLoaded(true);
    } else {
      setCurrentSrc(placeholder || src);
    }
  }, [src, placeholder, isImagePreloaded]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    if (currentSrc !== src) {
      setCurrentSrc(src);
    }
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
    onError?.();
  };

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.3,
        transition: 'opacity 0.3s ease',
        filter: isLoaded ? 'none' : 'blur(2px)',
      }}
      loading={priority ? 'eager' : loading}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default OptimizedImage; 