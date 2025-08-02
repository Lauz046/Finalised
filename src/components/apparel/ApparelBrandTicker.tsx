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
      { name: 'Lanvin Women', image: '/apparelticker/LANVIN WOMEN.png', filterType: 'Lanvin Women' },
      { name: 'Aime Leon Dore', image: '/apparelticker/aime leon doreMEN.png', filterType: 'Aime Leon Dore' },
      { name: 'BAPE', image: '/apparelticker/BAPE MEN.png', filterType: 'BAPE' },
      { name: '3ELEVEN', image: '/apparelticker/3ELEVEN MEN.png', filterType: '3ELEVEN' },
      { name: 'All Saints', image: '/apparelticker/ALLSAINTS WOMEN.png', filterType: 'All Saints' },
      { name: 'Bottega Veneta', image: '/apparelticker/BOTTEGA VENETA WOMEN.png', filterType: 'Bottega Veneta' },
      { name: 'Burberry', image: '/apparelticker/BURBERRY WOMEN.png', filterType: 'Burberry' },
      { name: 'Carhartt', image: '/apparelticker/CARHARRT MEN.png', filterType: 'Carhartt' },
    ];
  }, []);

  // Create endless scrolling by duplicating the subcategories multiple times
  const displaySubcategories = useMemo(() => {
    // Duplicate the subcategories 4 times for seamless endless scrolling
    return [...apparelSubcategories, ...apparelSubcategories, ...apparelSubcategories, ...apparelSubcategories];
  }, [apparelSubcategories]);

  // Auto-scroll effect (infinite loop)
  // Transform-based animation for smooth endless movement (same as accessories)
  useEffect(() => {
    if (paused || displaySubcategories.length === 0) return;
    
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    let animationFrame: number;
    let translateX = 0;
    const speed = 1; // px per frame - same as accessories
    
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
          marginTop: isMobile ? '60px' : '10px', // Same as accessories
          height: isMobile ? '280px' : 'auto', // Same as accessories
          overflow: 'hidden',
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
                  background: '#fff',
                  border: isSelected ? '3px solid rgb(9, 51, 74)' : '1px solid transparent',
                  borderRadius: '12px',
                  minWidth: isMobile ? 180 : 350, // Same as accessories
                  minHeight: isMobile ? 220 : 600, // Same as accessories
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 0 0px 0',
                  margin: isMobile ? '15px 4px 0 4px' : 0, // Same as accessories
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
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/nav/plutus logo.svg';
                  }}
                  style={{
                    width: isMobile ? 180 : 350, // Same as accessories
                    height: isMobile ? 220 : 600, // Same as accessories
                    objectFit: isMobile ? 'contain' : 'cover', // Better quality for mobile
                    borderRadius: '0px 0px 0 0',
                    marginBottom: 0,
                    boxShadow: 'none',
                    background: '#f8f9fa',
                    imageRendering: 'auto', // Better quality for mobile
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
                    {subcategory.name}
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

export default ApparelBrandTicker; 