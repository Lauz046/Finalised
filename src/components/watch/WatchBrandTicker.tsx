import React, { useEffect, useRef, useState } from 'react';
import styles from './WatchBrandTicker.module.css';
import { getBrandImage } from '../../utils/brandImageMapper';

interface Brand {
  name: string;
  image: string;
}

interface WatchBrandTickerProps {
  brands: Brand[];
  onBrandClick: (brand: string) => void;
  currentPage?: string;
}

const WatchBrandTicker: React.FC<WatchBrandTickerProps> = ({ brands, onBrandClick }) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Transform-based animation for smooth endless movement (same as sneaker)
  useEffect(() => {
    if (paused || brands.length === 0) return;
    
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    let animationFrame: number;
    let translateX = 0;
    const speed = 1; // px per frame - same as sneaker
    
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
  }, [brands, paused]);

  // Create endless scrolling by duplicating brands 6 times (same as sneaker)
  const displayBrands = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <div style={{ fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif' }}>
      <div className={styles.tickerWrapper} style={{
        marginTop: isMobile ? '60px' : '10px', // Same as sneaker
        height: isMobile ? '280px' : 'auto', // Same as sneaker
        overflow: 'hidden'
      }}>
        <div className={styles.ticker} ref={tickerRef}>
          {displayBrands.map((brand, idx) => {
            const isSelected = selected === brand.name;
            const isFaded = selected !== null && !isSelected;
            const brandImage = getBrandImage(brand.name, 'watch');
            return (
              <div
                key={brand.name + idx}
                className={styles.brandCard}
                onClick={() => {
                  if (isSelected) {
                    setSelected(null);
                    setPaused(false);
                  } else {
                    setSelected(brand.name);
                    setPaused(true);
                  }
                  onBrandClick(brand.name);
                }}
                style={{
                  background: '#fff',
                  border: isSelected ? '1px solidrgb(9, 51, 74)' : 'none',
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
                    target.src = '/image1.jpeg';
                  }}
                />

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchBrandTicker; 