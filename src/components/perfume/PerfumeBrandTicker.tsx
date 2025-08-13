import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './PerfumeBrandTicker.module.css';
import {  } from '../../utils/brandImageMapper';

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

  // Create the 3 fixed perfume categories with updated images
  const perfumeCategories = [
    { name: 'Niche', image: '/perfumeticker/Niche perfume.png', filterType: 'niche', bgColor: '#f5f5dc' },
    { name: 'All Perfume', image: '/perfumeticker/all_perfume.png', filterType: 'all', bgColor: '#1e3a8a' },
    { name: 'Designer', image: '/perfumeticker/Designer perfumes.png', filterType: 'designer', bgColor: '#f5f5dc' }
  ];

  // Use only the 3 categories for static display
  const displayCategories = useMemo(() => {
    return perfumeCategories;
  }, []);

  // Reset selection when paused state changes
  useEffect(() => {
    if (!paused) {
      setSelected(null);
    }
  }, [paused]);

  return (
    <div style={{ fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif' }}>
      <div className={styles.tickerWrapper} style={{
        marginTop: isMobile ? '20px' : '80px',
        height: isMobile ? '300px' : 'auto', // Increased height for mobile to prevent cutting
        overflow: 'hidden',
        width: '100%'
      }}>
        <div className={styles.ticker} ref={tickerRef} style={{ 
          display: 'flex', 
          gap: 0,
          width: '100%',
          justifyContent: 'space-between',
          height: isMobile ? '280px' : 'auto' // Fixed height for mobile
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
                  background: category.bgColor || '#fff',
                  border: isSelected ? '1px solid rgb(9, 51, 74)' : 'none',
                  borderRadius: '0px', // Sharp corners - no border radius
                  width: '33.33%',
                  height: isMobile ? '280px' : '600px', // Fixed height for mobile
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 0 0px 0',
                  margin: 0,
                  cursor: 'pointer',
                  position: 'relative',
                  fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif',
                  transition: 'transform 0.3s, box-shadow 0.3s, border 0.3s, filter 0.3s, opacity 0.3s',
                  transform: isSelected ? 'scale(1.07)' : 'none',
                  boxShadow: isSelected ? '0 8px 32px #051f2d' : 'none',
                  opacity: isFaded ? 0.5 : 1,
                  filter: isFaded ? 'blur(0.5px) grayscale(0.2)' : 'none',
                  zIndex: isSelected ? 2 : 1,
                  overflow: 'hidden', // Prevent image overflow
                }}
              >
                <img
                  src={brandImage}
                  alt={category.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.log(`Failed to load image: ${brandImage}`);
                    target.src = '/perfumeticker/All perfume.png'; // Fallback to existing image
                  }}
                  onLoad={() => {
                    console.log(`Successfully loaded image: ${brandImage}`);
                  }}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%', // Fill the entire container
                    objectFit: 'cover',
                    borderRadius: '0px', // Sharp corners - no border radius
                    marginBottom: 0,
                    boxShadow: 'none',
                    background: 'transparent',
                    imageRendering: 'auto',
                    display: 'block', // Ensure proper display
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
                      fontSize: isMobile ? '0.85rem' : '1.5rem',
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