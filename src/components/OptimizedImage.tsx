import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style = {},
  onClick
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // If there's an error, show a placeholder
  if (hasError) {
    return (
      <div
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          ...style
        }}
        onClick={onClick}
      >
        <div className="text-gray-400 text-sm">Image not available</div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className} ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}
      style={style}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        fill={fill}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          ...(fill && { position: 'absolute', top: 0, left: 0 })
        }}
      />
    </div>
  );
};

// Specialized components for different use cases
export const ProductImage: React.FC<Omit<OptimizedImageProps, 'width' | 'height'> & {
  size?: 'small' | 'medium' | 'large';
}> = ({ size = 'medium', ...props }) => {
  const sizes = {
    small: { width: 80, height: 80 },
    medium: { width: 200, height: 200 },
    large: { width: 400, height: 400 }
  };

  return (
    <OptimizedImage
      {...props}
      {...sizes[size]}
      quality={90}
      priority={size === 'large'}
    />
  );
};

export const HeroImage: React.FC<Omit<OptimizedImageProps, 'width' | 'height' | 'fill'> & {
  aspectRatio?: '16/9' | '4/3' | '1/1';
}> = ({ aspectRatio = '16/9', ...props }) => {
  const aspectRatios = {
    '16/9': { width: 1920, height: 1080 },
    '4/3': { width: 1600, height: 1200 },
    '1/1': { width: 1200, height: 1200 }
  };

  return (
    <OptimizedImage
      {...props}
      {...aspectRatios[aspectRatio]}
      quality={95}
      priority={true}
      placeholder="blur"
    />
  );
};

export const ThumbnailImage: React.FC<Omit<OptimizedImageProps, 'width' | 'height'> & {
  variant?: 'square' | 'portrait' | 'landscape';
}> = ({ variant = 'square', ...props }) => {
  const variants = {
    square: { width: 150, height: 150 },
    portrait: { width: 120, height: 180 },
    landscape: { width: 180, height: 120 }
  };

  return (
    <OptimizedImage
      {...props}
      {...variants[variant]}
      quality={80}
      placeholder="blur"
    />
  );
};

export default OptimizedImage; 