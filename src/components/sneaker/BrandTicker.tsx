import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './BrandTicker.module.css';
import {  } from '../../utils/brandImageMapper';

interface Brand {
  name: string;
  image: string;
}

interface BrandTickerProps {
  brands: Brand[];
  onBrandClick: (brand: string) => void;
  currentPage?: string;
}

const BrandTicker: React.FC<BrandTickerProps> = ({ brands, onBrandClick }) => {
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

  // Create fixed 5 sneaker categories in specific order
  const sneakerCategories = useMemo(() => {
    return [
      { name: 'Air Jordan', image: '/sneakerticker/AIR JORDAN CARD.png', filterType: 'Air Jordan', bgColor: '#f5f5dc' }, // Beige
      { name: 'Luxury', image: '/sneakerticker/LUXURY CARD.png', filterType: 'Luxury', bgColor: '#1e3a8a' }, // Blue
      { name: 'New Balance', image: '/sneakerticker/NEW BALANCE.png', filterType: 'New Balance', bgColor: '#f5f5dc' }, // Beige
      { name: 'Samba', image: '/sneakerticker/AF1.png', filterType: 'Samba', bgColor: '#1e3a8a' }, // Blue - Using AF1 as fallback
      { name: 'Nike', image: '/sneakerticker/NIKE.png', filterType: 'Nike', bgColor: '#f5f5dc' }, // Beige
    ];
  }, []);

  // Create endless scrolling by duplicating the 5 categories multiple times
  const displayBrands = useMemo(() => {
    // Duplicate the categories 6 times for seamless endless scrolling (more for mobile)
    return [...sneakerCategories, ...sneakerCategories, ...sneakerCategories, ...sneakerCategories, ...sneakerCategories, ...sneakerCategories];
  }, [sneakerCategories]);

  // Transform-based animation for smooth endless movement
  useEffect(() => {
    if (paused || displayBrands.length === 0) return;
    
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    let animationFrame: number;
    let translateX = 0;
    // Reduced speed for mobile (0.5px per frame instead of 1px)
    const speed = isMobile ? 0.5 : 1;
    
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
  }, [displayBrands, paused, isMobile]);

  return (
    <div style={{ fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif' }}>
      <div className={styles.tickerWrapper} style={{
        marginTop: isMobile ? '60px' : '50px', // Increased desktop margin to move down more from breadcrumbs
        height: isMobile ? '280px' : 'auto', // Increased height for mobile to prevent cutting
        overflow: 'hidden'
      }}>
        <div className={styles.ticker} ref={tickerRef}>
          {displayBrands.map((brand, idx) => {
            const isSelected = selected === brand.name;
            const isFaded = selected !== null && !isSelected;
            const brandImage = brand.image;
            
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
                    onBrandClick(brand.filterType);
                  }
                }}
                style={{
                  background: brand.bgColor || '#fff',
                  border: isSelected ? '1px solidrgb(9, 51, 74)' : 'none',
                  borderRadius: '12px',
                  minWidth: isMobile ? 180 : 350,
                  minHeight: isMobile ? 220 : 550, // Increased height for mobile to prevent cutting
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 0 0px 0',
                  margin: isMobile ? '15px 0px 0 0px' : 0, // No gap between cards in mobile
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/nav/plutus logo.svg';
                  }}
                  loading="lazy"
                  style={{
                    width: isMobile ? 180 : 350,
                    height: isMobile ? 220 : 550, // Increased height for mobile to prevent cutting
                    objectFit: 'cover', // Fill the container completely
                    borderRadius: '0px',
                    marginBottom: 0,
                    boxShadow: 'none',
                    background: 'transparent',
                    imageRendering: 'auto', // Better quality for mobile
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

export default BrandTicker; 