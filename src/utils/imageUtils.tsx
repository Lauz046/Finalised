import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
}

export const SafeImage = ({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = '/static.jpg',
  priority = false,
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
      unoptimized={true}
    />
  );
};

// Utility function to check if an image URL is valid
export const isValidImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Utility function to get a safe image URL with fallback
export const getSafeImageUrl = (url: string, fallback: string = '/static.jpg'): string => {
  if (!url || !isValidImageUrl(url)) {
    return fallback;
  }
  return url;
};

// Utility function to check if an image is viewable (for watches and other products)
export const isViewableImage = (url?: string): boolean => {
  if (!url) return false;
  const lowered = url.toLowerCase();
  // Skip obviously bad/placeholder paths
  if (
    lowered.endsWith('.svg') ||
    lowered.includes('placeholder') ||
    lowered.includes('no_image') ||
    lowered.includes('noimage') ||
    lowered.includes('nophoto') ||
    lowered.startsWith('/image') // local fallback placeholder
  ) {
    return false;
  }
  // Allow images that originate from luxurysouq, even if they are served via an optimisation CDN
  // (e.g. https://cdn-*.nitrocdn.com/...luxurysouq.com/...)
  // As long as the final URL still contains "luxurysouq.com" we treat it as a valid, viewable image.
  if (lowered.includes('luxurysouq.com')) {
    return true;
  }

  // Everything else is considered non-viewable for watches
  return false;
};

// Utility function to check if a product has viewable images
export const hasViewableImage = (images?: string[]): boolean => {
  if (!images || images.length === 0) return false;
  return isViewableImage(images[0]);
}; 