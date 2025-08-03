import React, { useEffect, useRef, useState, useMemo } from 'react';
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
    const ticker = tickerRef.current;
    if (!ticker || paused) return;
    
    let translateX = 0;
    let animationFrame: number;
    const speed = 0.5;
    
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

  // Create fixed watch categories in specific order
  const watchCategories = useMemo(() => {
    return [
      { name: 'Vacheron Constantin', image: '/watchticker/VACHERON CONSTANTIN.png', filterType: 'Vacheron Constantin', bgColor: '#f5f5dc' }, // Beige
      { name: 'Bell & Ross', image: '/watchticker/BELL & ROSS.png', filterType: 'Bell & Ross', bgColor: '#1e3a8a' }, // Blue
      { name: 'Rolex', image: '/watchticker/ROLEX.png', filterType: 'Rolex', bgColor: '#f5f5dc' }, // Beige
      { name: 'Carl F Bucherer', image: '/watchticker/CARL F BUCHERER.png', filterType: 'Carl F Bucherer', bgColor: '#1e3a8a' }, // Blue
      { name: 'Glashutte Original', image: '/watchticker/GLASHUTTE.png', filterType: 'Glashutte Original', bgColor: '#f5f5dc' }, // Beige
    ];
  }, []);

  // Create endless scrolling by duplicating the 5 categories multiple times
  const displayBrands = useMemo(() => {
    // Duplicate the categories 6 times for seamless endless scrolling
    return [...watchCategories, ...watchCategories, ...watchCategories, ...watchCategories, ...watchCategories, ...watchCategories];
  }, [watchCategories]);

  return (
    <div style={{ fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif' }}>
      <div className={styles.tickerWrapper} style={{
        marginTop: isMobile ? '60px' : '50px', // Increased desktop margin to move down more from breadcrumbs
        height: isMobile ? '280px' : 'auto', // Same as sneaker
        overflow: 'hidden'
      }}>
        <div className={styles.ticker} ref={tickerRef}>
          {displayBrands.map((brand: any, idx: number) => {
            const isSelected = selected === brand.name;
            const isFaded = selected !== null && !isSelected;
            const brandImage = brand.image || getBrandImage(brand.name, 'watch');
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
                  background: brand.bgColor || '#fff',
                  border: isSelected ? '1px solidrgb(9, 51, 74)' : 'none',
                  borderRadius: '12px',
                  minWidth: isMobile ? 180 : 350, // Same as sneaker
                  minHeight: isMobile ? 220 : 550, // Same as sneaker
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 0 0px 0',
                  margin: isMobile ? '15px 0px 0 0px' : 0, // No gap between cards
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
                    objectFit: 'cover', // Fill the container completely
                    borderRadius: '0px',
                    marginBottom: 0,
                    boxShadow: 'none',
                    background: 'transparent',
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