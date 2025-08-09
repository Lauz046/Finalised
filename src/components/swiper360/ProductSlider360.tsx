'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './ProductSlider.module.css';
import OptimizedImage from '../OptimizedImage';
import { useImageOptimizer } from '../../utils/imageOptimizer';

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

// Device detection hook
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(userAgent)) {
        setDeviceType('ios');
      } else if (/android/.test(userAgent)) {
        setDeviceType('android');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
  }, []);

  return deviceType;
};

// Image cache for better performance
const imageCache = new Map<string, HTMLImageElement>();

// Optimized product data with local images
const products = [
  { 
    name: 'Air Jordan', 
    thumb: '/clean_sneakers/Jordan_4_Retro_Sb_Pine_Green/image_01.png', 
    images360: Array.from({ length: 36 }, (_, i) => `/clean_sneakers/Jordan_4_Retro_Sb_Pine_Green/image_${(i + 1).toString().padStart(2, '0')}.png`),
    category: 'sneakers'
  },
  { 
    name: 'Yeezy', 
    thumb: '/clean_sneakers/Yeezy_450_Resin/image_01.png', 
    images360: Array.from({ length: 36 }, (_, i) => `/clean_sneakers/Yeezy_450_Resin/image_${(i + 1).toString().padStart(2, '0')}.png`),
    category: 'sneakers'
  },
  { 
    name: 'New Balance', 
    thumb: '/clean_sneakers/New_Balance_550_Burnt_Orange/image_01.png', 
    images360: Array.from({ length: 36 }, (_, i) => `/clean_sneakers/New_Balance_550_Burnt_Orange/image_${(i + 1).toString().padStart(2, '0')}.png`),
    category: 'sneakers'
  },
  { 
    name: 'New Balance', 
    thumb: '/clean_sneakers/New_Balance_9060_Driftwood_Castlerock/image_01.png', 
    images360: Array.from({ length: 36 }, (_, i) => `/clean_sneakers/New_Balance_9060_Driftwood_Castlerock/image_${(i + 1).toString().padStart(2, '0')}.png`),
    category: 'sneakers'
  },
  { 
    name: 'Louis Vuitton', 
    thumb: '/clean_sneakers/Louis_Vuitton_Skate_Sneaker_\'Marine\'/image_01.png', 
    images360: Array.from({ length: 36 }, (_, i) => `/clean_sneakers/Louis_Vuitton_Skate_Sneaker_\'Marine\'/image_${(i + 1).toString().padStart(2, '0')}.png`),
    category: 'sneakers'
  },
  { 
    name: 'Air Jordan', 
    thumb: '/clean_sneakers/Travis_Scott_X_Air_Jordan_1_Low_Og_Olive/image_02.png', 
    images360: Array.from({ length: 31 }, (_, i) => `/clean_sneakers/Travis_Scott_X_Air_Jordan_1_Low_Og_Olive/image_${(i + 2).toString().padStart(2, '0')}.png`),
    category: 'sneakers'
  },
];

const ProductSlider360 = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [cachedProducts, setCachedProducts] = useState<Set<string>>(new Set());
  const [preloadedFrames, setPreloadedFrames] = useState<Set<string>>(new Set());
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastXRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const deviceType = useDeviceType();

  // Image optimizer hook
  const { preloadImages, getLoadingProgress } = useImageOptimizer();

  // Reorder products for mobile - Louis Vuitton first, then others (no Yeezy)
  const displayProducts = useMemo(() => {
    if (isMobile) {
      // Mobile order: Louis Vuitton, Air Jordan, New Balance 9060, New Balance 550
      const mobileOrder = [
        products[4], // Louis Vuitton
        products[0], // Air Jordan
        products[3], // New Balance 9060 (replacing Yeezy)
        products[2], // New Balance 550
      ];
      return mobileOrder;
    }
    return products;
  }, [isMobile]);

  // Android-specific preloading strategy
  const preloadProductImages = useCallback(async (product: typeof products[0]) => {
    const productKey = product.name;
    
    // Check if product is already cached
    if (cachedProducts.has(productKey)) {
      setIsLoading(false);
      setLoadProgress(100);
      setImagesLoaded(product.images360.length);
      return;
    }

    setIsLoading(true);
    setLoadProgress(0);
    setImagesLoaded(0);
    
    try {
      // Phase 1: Load first frame immediately (for instant display)
      const firstFrame = product.images360[0];
      if (!imageCache.has(firstFrame)) {
        const img = new Image();
        img.src = firstFrame;
        imageCache.set(firstFrame, img);
      }
      setImagesLoaded(1);
      setLoadProgress((1 / product.images360.length) * 100);
      setIsLoading(false); // Show first frame immediately

      // Phase 2: Android-specific loading strategy
      if (deviceType === 'android') {
        // For Android: Load more frames upfront for smoother rotation
        const priorityFrames = product.images360.slice(1, 12); // Load more frames for Android
        let loadedCount = 1;
        
        const loadFrame = (src: string) => {
          return new Promise<void>((resolve) => {
            if (imageCache.has(src)) {
              loadedCount++;
              setImagesLoaded(loadedCount);
              setLoadProgress((loadedCount / product.images360.length) * 100);
              resolve();
              return;
            }

            const img = new Image();
            img.onload = () => {
              imageCache.set(src, img);
              loadedCount++;
              setImagesLoaded(loadedCount);
              setLoadProgress((loadedCount / product.images360.length) * 100);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = src;
          });
        };

        // Load priority frames for Android
        await Promise.all(priorityFrames.map(loadFrame));
        
        // Phase 3: Load remaining frames in background for Android
        setTimeout(() => {
          product.images360.slice(12).forEach((src) => {
            if (!imageCache.has(src)) {
              const img = new Image();
              img.onload = () => {
                imageCache.set(src, img);
                setImagesLoaded(prev => prev + 1);
              };
              img.src = src;
            }
          });
        }, 200); // Faster loading for Android
      } else {
        // iOS/Desktop: Standard loading strategy
        const priorityFrames = product.images360.slice(1, 5);
        let loadedCount = 1;
        
        const loadFrame = (src: string) => {
          return new Promise<void>((resolve) => {
            if (imageCache.has(src)) {
              loadedCount++;
              setImagesLoaded(loadedCount);
              setLoadProgress((loadedCount / product.images360.length) * 100);
              resolve();
              return;
            }

            const img = new Image();
            img.onload = () => {
              imageCache.set(src, img);
              loadedCount++;
              setImagesLoaded(loadedCount);
              setLoadProgress((loadedCount / product.images360.length) * 100);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = src;
          });
        };

        await Promise.all(priorityFrames.map(loadFrame));
        
        setTimeout(() => {
          product.images360.slice(5).forEach((src) => {
            if (!imageCache.has(src)) {
              const img = new Image();
              img.onload = () => {
                imageCache.set(src, img);
                setImagesLoaded(prev => prev + 1);
              };
              img.src = src;
            }
          });
        }, 500);
      }
      
      // Mark product as cached
      setCachedProducts(prev => new Set([...prev, productKey]));
      
    } catch (error) {
      console.error('Failed to preload images:', error);
      setIsLoading(false);
    }
  }, [cachedProducts, deviceType]);

  useEffect(() => {
    preloadProductImages(selectedProduct);
    setCurrentImageSrc(selectedProduct.images360[0]);
    setFrameIndex(0);
  }, [selectedProduct, preloadProductImages]);

  // Auto-rotation with device-specific timing
  useEffect(() => {
    if (!isHovering && !isLoading) {
      const interval = deviceType === 'android' ? 100 : 150; // Faster rotation for Android
      intervalRef.current = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % selectedProduct.images360.length);
      }, interval);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, selectedProduct, isLoading, deviceType]);

  // Update current image when frame changes with Android optimization
  useEffect(() => {
    if (selectedProduct && selectedProduct.images360[frameIndex]) {
      const imageSrc = selectedProduct.images360[frameIndex];
      setCurrentImageSrc(imageSrc);
      
      // Android-specific preloading: Load more frames ahead
      const preloadCount = deviceType === 'android' ? 6 : 3;
      const nextFrames = Array.from({ length: preloadCount }, (_, i) => 
        selectedProduct.images360[(frameIndex + i + 1) % selectedProduct.images360.length]
      );
      
      nextFrames.forEach(src => {
        if (!imageCache.has(src) && !preloadedFrames.has(src)) {
          const img = new Image();
          img.onload = () => {
            imageCache.set(src, img);
            setPreloadedFrames(prev => new Set([...prev, src]));
          };
          img.src = src;
        }
      });
    }
  }, [frameIndex, selectedProduct, deviceType, preloadedFrames]);

  // Mouse handling for manual rotation with Android optimization
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering || isLoading) return;
    
    const x = e.clientX;
    if (lastXRef.current !== null) {
      const delta = x - lastXRef.current;
      const threshold = deviceType === 'android' ? 2 : 3; // More sensitive for Android
      if (Math.abs(delta) > threshold) {
        setFrameIndex((prev) => {
          const newIndex = prev + (delta > 0 ? 1 : -1);
          return (newIndex + selectedProduct.images360.length) % selectedProduct.images360.length;
        });
        lastXRef.current = x;
      }
    } else {
      lastXRef.current = x;
    }
  }, [isHovering, selectedProduct, isLoading, deviceType]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    lastXRef.current = null;
  }, []);

  return (
    <div className={`${styles.home__products} ${styles.whiteBg}`}>
      <div className={styles.home__productsTitleInner}>PLUTUS CHOICE</div>
      
      <div className={`${styles.swiperSlideTitle} ${selectedProduct.name === 'Louis Vuitton' ? styles.louisText : selectedProduct.name === 'New Balance' ? styles.longText : ''}`}>
        {selectedProduct.name}
      </div>

      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => {
          const newProduct = displayProducts[swiper.activeIndex];
          setSelectedProduct(newProduct);
          setActiveSlide(swiper.activeIndex);
          setFrameIndex(0);
          setIsLoading(true);
          setLoadProgress(0);
          setImagesLoaded(0);
        }}
        className="product-swiper"
      >
        {displayProducts.map((product, index) => (
          <SwiperSlide key={index}>
            <div className={styles.productPreview}>
              <div
                className={styles.image360}
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
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
                    color: '#666',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div>Loading...</div>
                    <div style={{
                      width: '100px',
                      height: '4px',
                      backgroundColor: '#eee',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${loadProgress}%`,
                        height: '100%',
                        backgroundColor: '#007bff',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>
                      {imagesLoaded}/{product.images360.length} frames
                    </div>
                  </div>
                )}
                <img
                  src={currentImageSrc || product.images360[0]}
                  alt={product.name}
                  className={styles.productPreviewImage}
                  style={{
                    opacity: isLoading ? 0.3 : 1,
                    transition: 'opacity 0.3s ease',
                    maxWidth: '55%',
                    height: 'auto',
                    filter: isLoading ? 'blur(2px)' : 'none',
                    // Android-specific optimizations
                    ...(deviceType === 'android' && {
                      imageRendering: 'optimizeSpeed' as any,
                      backfaceVisibility: 'hidden' as any,
                      transform: 'translateZ(0)' as any,
                    })
                  }}
                  onLoad={() => {
                    if (isLoading && imagesLoaded >= (deviceType === 'android' ? 12 : 5)) {
                      setIsLoading(false);
                    }
                  }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className={styles['swiper-pagination']}>
        {displayProducts.map((product, index) => (
          <div
            key={index}
            className={`${styles['swiper-pagination-bullet']} ${activeSlide === index ? styles['swiper-pagination-bullet-active'] : ''}`}
            onClick={() => {
              setSelectedProduct(product);
              setActiveSlide(index);
              setFrameIndex(0);
              setIsLoading(true);
              setLoadProgress(0);
              setImagesLoaded(0);
            }}
          >
            <img 
              src={product.thumb} 
              alt={product.name} 
              className={styles['pagination-thumb']}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider360;
