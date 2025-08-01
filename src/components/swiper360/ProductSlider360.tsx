'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductSlider.css';

// Configure Swiper
// eslint-disable-next-line react-hooks/rules-of-hooks
SwiperCore.use([Pagination]);

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// CDN base URL
const CDN_BASE_URL = 'https://houseofplutus.mos.ap-southeast-2.sufybkt.com';

// Product data with CDN images
const products = [
  { 
    name: 'New Balance', 
    thumb: `${CDN_BASE_URL}/550shoesimage_01.png`, 
    images360: Array.from({ length: 36 }, (_, i) => `${CDN_BASE_URL}/550shoesimage_${(i + 1).toString().padStart(2, '0')}.png`)
  },
  { 
    name: 'Yeezy', 
    thumb: `${CDN_BASE_URL}/yeezyimage_01.png`, 
    images360: Array.from({ length: 36 }, (_, i) => `${CDN_BASE_URL}/yeezyimage_${(i + 1).toString().padStart(2, '0')}.png`)
  },
  { 
    name: 'New Balance', 
    thumb: `${CDN_BASE_URL}/newbalanceshoe1image_01.png`, 
    images360: Array.from({ length: 36 }, (_, i) => `${CDN_BASE_URL}/newbalanceshoe1image_${(i + 1).toString().padStart(2, '0')}.png`)
  },
  { 
    name: 'Louis Vuitton', 
    thumb: `${CDN_BASE_URL}/louisimage_01.png`, 
    images360: Array.from({ length: 36 }, (_, i) => `${CDN_BASE_URL}/louisimage_${(i + 1).toString().padStart(2, '0')}.png`)
  },
  { 
    name: 'Air Jordan', 
    thumb: `${CDN_BASE_URL}/airjordanpinegreenimage_01.png`, 
    images360: Array.from({ length: 36 }, (_, i) => `${CDN_BASE_URL}/airjordanpinegreenimage_${(i + 1).toString().padStart(2, '0')}.png`)
  },
  { 
    name: 'Air Jordan', 
    thumb: `${CDN_BASE_URL}/airjordan221image_02.png`, 
    images360: Array.from({ length: 19 }, (_, i) => `${CDN_BASE_URL}/airjordan221image_${(i + 2).toString().padStart(2, '0')}.png`) // Frames 2-20
  },
];

const ProductSlider360 = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedImageElements, setPreloadedImageElements] = useState<Map<string, HTMLImageElement>>(new Map());
  const [currentImageSrc, setCurrentImageSrc] = useState<string>('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastXRef = useRef<number | null>(null);
  const frameUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  // Filter products for mobile (show only 4)
  const displayProducts = isMobile ? products.slice(0, 4) : products;

  // Preload images for current product
  const preloadImages = useCallback((product: typeof products[0]) => {
    const newPreloaded = new Map<string, HTMLImageElement>();
    let loadedCount = 0;
    
    // Preload ALL frames immediately for smooth 360° rotation
    product.images360.forEach((src, index) => {
      const img = new window.Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 5) {
          setIsLoading(false);
        }
      };
      img.src = src;
      newPreloaded.set(src, img);
    });

    setPreloadedImages(new Set(newPreloaded.keys()));
    setPreloadedImageElements(newPreloaded);
  }, []);

  useEffect(() => {
    preloadImages(selectedProduct);
    setCurrentImageSrc(selectedProduct.images360[0]);
  }, [selectedProduct, preloadImages]);

  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % selectedProduct.images360.length);
      }, 150); // Slightly slower for better performance
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, selectedProduct]);

  // Update current image src when frame index changes (debounced)
  useEffect(() => {
    if (frameUpdateTimeoutRef.current) {
      clearTimeout(frameUpdateTimeoutRef.current);
    }
    
    frameUpdateTimeoutRef.current = setTimeout(() => {
      setCurrentImageSrc(selectedProduct.images360[frameIndex]);
    }, 50); // Debounce frame updates

    return () => {
      if (frameUpdateTimeoutRef.current) {
        clearTimeout(frameUpdateTimeoutRef.current);
      }
    };
  }, [frameIndex, selectedProduct]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    const x = e.clientX;
    if (lastXRef.current !== null) {
      const delta = x - lastXRef.current;
      if (Math.abs(delta) > 8) { // Increased threshold for better performance
        setFrameIndex((prev) => (prev + (delta > 0 ? 1 : -1) + selectedProduct.images360.length) % selectedProduct.images360.length);
        lastXRef.current = x;
      }
    } else {
      lastXRef.current = x;
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    lastXRef.current = null;
  };

  return (
    <div className="home__products white-bg">
      <div className="home__products-title__inner">PLUTUS CHOICE</div>

      <div className={`swiper-slide-title ${selectedProduct.name === 'Louis Vuitton' ? 'louis-text' : selectedProduct.name === 'New Balance' ? 'long-text' : ''}`}>
        {selectedProduct.name}
      </div>

      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"><img src="${displayProducts[index].thumb}" class="pagination-thumb"/></span>`;
          },
        }}
        onSlideChange={(swiper) => {
          setSelectedProduct(displayProducts[swiper.activeIndex]);
          setFrameIndex(0);
          setIsLoading(true);
        }}
        className="product-swiper"
      >
        {displayProducts.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="product-preview">
              <div
                className="image-360"
                ref={containerRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {isLoading && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    fontSize: '1.2rem',
                    color: '#666'
                  }}>
                    Loading...
                  </div>
                )}
                <img
                  src={currentImageSrc || product.images360[frameIndex]}
                  alt={product.name}
                  className="product-preview__image"
                  style={{
                    opacity: isLoading ? 0.3 : 1,
                    transition: 'opacity 0.3s ease',
                    maxWidth: '55%',
                    height: 'auto'
                  }}
                  onLoad={() => {
                    if (isLoading) {
                      setIsLoading(false);
                    }
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider360;
