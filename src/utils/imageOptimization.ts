
import { useEffect, useState } from 'react';

export const useOptimizedImage = (src: string, fallback?: string) => {
  const [imageSrc, setImageSrc] = useState(fallback || src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      if (fallback) setImageSrc(fallback);
    };
    img.src = src;
  }, [src, fallback]);

  return { imageSrc, isLoaded };
};

export const preloadImages = (urls: string[]) => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};
