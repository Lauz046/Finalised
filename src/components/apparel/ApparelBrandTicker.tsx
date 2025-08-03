import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './ApparelBrandTicker.module.css';
import {  } from '../../utils/brandImageMapper';

interface Brand {
  name: string;
  image: string;
}

interface ApparelBrandTickerProps {
  brands: Brand[];
  onBrandClick: (brand: string) => void;
  currentPage?: string;
}

const ApparelBrandTicker: React.FC<ApparelBrandTickerProps> = ({ brands, onBrandClick }) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create the fixed apparel subcategories in the correct order
  const apparelSubcategories = useMemo(() => {
    return [
      { name: '3ELEVEN', image: '/apparelticker/3ELEVEN MEN.png', filterType: '3ELEVEN', bgColor: '#f5f5dc' }, // Beige
      { name: 'All Saints', image: '/apparelticker/ALLSAINTS WOMEN.png', filterType: 'All Saints', bgColor: '#1e3a8a' }, // Blue
      { name: 'Carhartt', image: '/apparelticker/CARHARRT MEN.png', filterType: 'Carhartt', bgColor: '#f5f5dc' }, // Beige
      { name: 'Bottega Veneta', image: '/apparelticker/BOTTEGA VENETA WOMEN.png', filterType: 'Bottega Veneta', bgColor: '#1e3a8a' }, // Blue
      { name: 'Aime Leon Dore', image: '/apparelticker/aime leon doreMEN.png', filterType: 'Aime Leon Dore', bgColor: '#f5f5dc' }, // Beige
      { name: 'Burberry', image: '/apparelticker/BURBERRY WOMEN.png', filterType: 'Burberry', bgColor: '#1e3a8a' }, // Blue
      { name: 'BAPE', image: '/apparelticker/BAPE MEN.png', filterType: 'BAPE', bgColor: '#f5f5dc' }, // Beige
      { name: 'Lanvin Women', image: '/apparelticker/LANVIN WOMEN.png', filterType: 'Lanvin Women', bgColor: '#1e3a8a' }, // Blue
    ];
  }, []);

  // Create endless scrolling by duplicating the subcategories multiple times
  const displaySubcategories = useMemo(() => {
    // Duplicate the subcategories 6 times for seamless endless scrolling
    return [...apparelSubcategories, ...apparelSubcategories, ...apparelSubcategories, ...apparelSubcategories, ...apparelSubcategories, ...apparelSubcategories];
  }, [apparelSubcategories]);

  // Auto-scroll effect (infinite loop)
  // Transform-based animation for smooth endless movement (same as accessories)
  useEffect(() => {
    if (paused || displaySubcategories.length === 0) return;
    
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    let animationFrame: number;
    let translateX = 0;
    const speed = isMobile ? 0.5 : 1; // Reduced speed for mobile
    
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
  }, [displaySubcategories, paused]);

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
          marginTop: isMobile ? '60px' : '50px', // Increased desktop margin to move down more from breadcrumbs
          height: isMobile ? '280px' : 'auto', // Increased height for mobile to prevent cutting
          overflow: 'hidden'
        }}
      >
        <div className={styles.ticker} ref={tickerRef}>
          {displaySubcategories.map((subcategory, idx) => {
            const isSelected = selected === subcategory.name;
            const isFaded = selected !== null && !isSelected;
            const brandImage = subcategory.image;
            return (
              <div
                key={`${subcategory.name}-${idx}`}
                className={styles.brandCard}
                onClick={() => {
                  if (selected === subcategory.name) {
                    setSelected(null);
                    setPaused(false);
                    onBrandClick(''); // Clear filter
                  } else {
                    setSelected(subcategory.name);
                    setPaused(true);
                    onBrandClick(subcategory.filterType);
                  }
                }}
                style={{
                  background: subcategory.bgColor || '#fff',
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
                  alt={subcategory.name}
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

export default ApparelBrandTicker; 