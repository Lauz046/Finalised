import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './BrandTicker.module.css';
import { getBrandImage } from '../../utils/brandImageMapper';

interface Brand {
  name: string;
  image: string;
}

interface BrandTickerProps {
  brands: Brand[];
  onBrandClick: (brand: string) => void;
}

const BrandTicker: React.FC<BrandTickerProps> = ({ brands, onBrandClick }) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      console.log('Watch BrandTicker - Mobile detected:', mobile, 'Window width:', window.innerWidth);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use all brands for endless scrolling
  const uniqueBrands = useMemo(() => {
    const seen = new Set<string>();
    const unique = brands.filter(brand => {
      if (seen.has(brand.name)) {
        return false;
      }
      seen.add(brand.name);
      return true;
    });
    return unique;
  }, [brands]);

  // Create endless scrolling by duplicating brands
  const displayBrands = useMemo(() => {
    // Only duplicate if we have brands, and limit to 5 brands maximum
    if (uniqueBrands.length === 0) return [];
    
    // Limit to 5 brands maximum
    const limitedBrands = uniqueBrands.slice(0, 5);
    
    // Duplicate the brands 6 times for seamless endless scrolling
    return [...limitedBrands, ...limitedBrands, ...limitedBrands, ...limitedBrands, ...limitedBrands, ...limitedBrands];
  }, [uniqueBrands]);

  // Transform-based animation for smooth endless movement
  useEffect(() => {
    if (paused || displayBrands.length === 0) return;
    
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    let animationFrame: number;
    let translateX = 0;
    const speed = 1; // px per frame
    
    function animate() {
      if (!ticker) return;
      translateX -= speed;
      
      // Reset position when we've moved the width of one set of brands
      const singleSetWidth = ticker.scrollWidth / 6; // Since we have 6 sets
      if (Math.abs(translateX) >= singleSetWidth) {
        translateX = 0;
      }
      
      ticker.style.transform = `translateX(${translateX}px)`;
      animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [displayBrands, paused]);

  // Reset selection when paused state changes
  useEffect(() => {
    if (!paused) {
      setSelected(null);
    }
  }, [paused]);

  return (
    <div style={{ fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif' }}>
      <div 
        className={styles.tickerWrapper}
        style={{
          marginTop: isMobile ? '60px' : '10px', // Moved up like sneaker
          height: isMobile ? '280px' : 'auto', // Same as sneaker
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className={styles.ticker} ref={tickerRef}>
          {displayBrands.map((brand, idx) => {
            const isSelected = selected === brand.name;
            const isFaded = selected !== null && !isSelected;
            const brandImage = getBrandImage(brand.name, 'watch');
            
            return (
              <div
                key={`${brand.name}-${idx}`}
                className={styles.brandCard}
                onClick={() => {
                  if (selected === brand.name) {
                    setSelected(null);
                    setPaused(false);
                    onBrandClick(''); // Clear filter
                  } else {
                    setSelected(brand.name);
                    setPaused(true);
                    onBrandClick(brand.name);
                  }
                }}
                style={{
                  background: '#fff',
                  border: isSelected ? '3px solid rgb(9, 51, 74)' : '1px solid transparent',
                  borderRadius: '12px',
                  minWidth: isMobile ? 180 : 350, // Same as sneaker
                  minHeight: isMobile ? 220 : 550, // Same as sneaker
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 0 0px 0',
                  margin: isMobile ? '15px 4px 0 4px' : 0, // Same as sneaker
                  cursor: 'pointer',
                  position: 'relative',
                  fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif',
                  transition: 'transform 0.3s, box-shadow 0.3s, border 0.3s, filter 0.3s, opacity 0.3s',
                  transform: isSelected ? 'scale(1.07)' : 'none',
                  boxShadow: isSelected ? '0 8px 32px #051f2d' : 'none',
                  opacity: isFaded ? 0.5 : 1,
                  filter: isFaded ? 'blur(0.5px) grayscale(0.2)' : 'none',
                  zIndex: isSelected ? 2 : 1,
                }}
              >
                <img
                  src={brandImage}
                  alt={brand.name}
                  loading="lazy"
                  style={{
                    width: isMobile ? 180 : 350, // Same as sneaker
                    height: isMobile ? 220 : 550, // Same as sneaker
                    objectFit: isMobile ? 'contain' : 'cover', // Better quality for mobile
                    borderRadius: '0px 0px 0 0',
                    marginBottom: 0,
                    boxShadow: 'none',
                    background: '#f8f9fa',
                    imageRendering: 'auto', // Better quality for mobile
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/nav/plutus logo.svg';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: isMobile ? 10 : 20,
                  bottom: isMobile ? 16 : 32,
                  width: '100%',
                  zIndex: 2,
                }}>
                  <span
                    style={{
                      fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif',
                      fontSize: isMobile ? '1rem' : '1.5rem',
                      color: '#fff',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                      textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                      background: 'transparent',
                      padding: 0,
                      textTransform: 'uppercase',
                      display: 'inline-block',
                    }}
                    ref={el => {
                      if (el) el.dataset.underline = el.offsetWidth.toString();
                    }}
                  >
                    {brand.name}
                  </span>
                  <div
                    style={{
                      height: 1,
                      background: '#fff',
                      margin: '0px 0 0 0',
                      borderRadius: 0,
                      opacity: 0.95,
                      width: 'fit-content',
                      minWidth: 24,
                      maxWidth: '100%',
                      transition: 'width 0.2s',
                    }}
                    ref={el => {
                      const span = el?.previousElementSibling as HTMLSpanElement | null;
                      if (el && span) {
                        el.style.width = span.offsetWidth + 'px';
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandTicker; 