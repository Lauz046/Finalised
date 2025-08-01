import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './PerfumeBrandTicker.module.css';
import { getBrandImage } from '../../utils/brandImageMapper';

interface Brand {
  name: string;
  image: string;
}

interface PerfumeBrandTickerProps {
  brands: Brand[];
  onBrandClick: (brand: string) => void;
  currentPage?: string;
}

const PerfumeBrandTicker: React.FC<PerfumeBrandTickerProps> = ({ brands, onBrandClick }) => {
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

  // Create the 3 fixed perfume categories in the correct order
  const perfumeCategories = [
    { name: 'Niche', image: '/perfumeticker/Niche perfume.png', filterType: 'niche' },
    { name: 'Explore All', image: '/perfumeticker/All Perfume.png', filterType: 'all' },
    { name: 'Designer', image: '/perfumeticker/designer perfume.png', filterType: 'designer' }
  ];

  // Create endless scrolling by duplicating the 3 categories multiple times
  const displayCategories = useMemo(() => {
    // Duplicate the categories 4 times for seamless endless scrolling
    return [...perfumeCategories, ...perfumeCategories, ...perfumeCategories, ...perfumeCategories];
  }, []);

  // Transform-based animation for smooth endless movement (same as sneaker)
  useEffect(() => {
    if (paused || displayCategories.length === 0) return;
    
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    let animationFrame: number;
    let translateX = 0;
    const speed = 1; // px per frame - same as sneaker
    
    function animate() {
      if (!ticker) return;
      translateX -= speed;
      
      // Reset position when we've moved the width of one set of brands
      const singleSetWidth = ticker.scrollWidth / 4; // Since we have 4 sets
      if (Math.abs(translateX) >= singleSetWidth) {
        translateX = 0;
      }
      
      ticker.style.transform = `translateX(${translateX}px)`;
      animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [displayCategories, paused]);

  // Reset selection when paused state changes
  useEffect(() => {
    if (!paused) {
      setSelected(null);
    }
  }, [paused]);

  return (
    <div style={{ fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif' }}>
      <div className={styles.tickerWrapper} style={{
        marginTop: isMobile ? '60px' : '10px', // Moved up like sneaker
        height: isMobile ? '240px' : 'auto',
        overflow: 'hidden'
      }}>
        <div className={styles.ticker} ref={tickerRef} style={{ 
          display: 'flex', 
          gap: isMobile ? '8px' : '20px',
          width: 'fit-content'
        }}>
          {displayCategories.map((category, idx) => {
            const isSelected = selected === category.name;
            const isFaded = selected !== null && !isSelected;
            const brandImage = category.image;
            return (
              <div
                key={`${category.name}-${idx}`}
                className={styles.brandCard}
                onClick={() => {
                  if (selected === category.name) {
                    setSelected(null);
                    setPaused(false);
                    onBrandClick(''); // Clear filter
                  } else {
                    setSelected(category.name);
                    setPaused(true);
                    onBrandClick(category.filterType);
                  }
                }}
                style={{
                  background: '#fff',
                  border: isSelected ? '3px solid rgb(9, 51, 74)' : '1px solid transparent',
                  borderRadius: '12px',
                  minWidth: isMobile ? 205 : 350,
                  minHeight: isMobile ? 230 : 600,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 0 0px 0',
                  margin: isMobile ? '10px 8px 0 8px' : 0,
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
                  alt={category.name}
                  loading="lazy"
                  style={{
                    width: isMobile ? 205 : 350,
                    height: isMobile ? 230 : 600,
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
                    {category.name}
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

export default PerfumeBrandTicker; 