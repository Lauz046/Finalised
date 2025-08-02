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
  currentPage?: string;
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
      console.log('Perfume BrandTicker - Mobile detected:', mobile, 'Window width:', window.innerWidth);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Limit brands for performance on mobile
  const limitedBrands = useMemo(() => {
    return isMobile ? brands.slice(0, 8) : brands;
  }, [brands, isMobile]);

  // Auto-scroll effect (infinite loop)
  useEffect(() => {
    if (paused) return;
    const ticker = tickerRef.current;
    if (!ticker) return;
    let animationFrame: number;
    const scrollAmount = ticker.scrollLeft || 0;
    const speed = 0.5; // px per frame
    function animate() {
      if (!ticker) return;
      scrollAmount += speed;
      if (ticker.scrollLeft >= ticker.scrollWidth / 2) {
        ticker.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        ticker.scrollLeft = scrollAmount;
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [limitedBrands, paused]);

  // Duplicate brands for infinite scrolling effect
  const displayBrands = [...limitedBrands, ...limitedBrands];

  return (
    <div style={{ fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif' }}>
      <div 
        className={styles.tickerWrapper}
        style={{
          marginTop: isMobile ? '40px' : '-32px',
          height: isMobile ? '270px' : 'auto',
          overflow: 'hidden',
        }}
      >
        <div className={styles.ticker} ref={tickerRef}>
          {displayBrands.map((brand, idx) => {
            const isSelected = selected === brand.name;
            const isFaded = selected !== null && !isSelected;
            const brandImage = getBrandImage(brand.name, 'perfume');
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
                  border: isSelected ? '1px solid rgb(9, 51, 74)' : 'none',
                  borderRadius: '12px',
                  minWidth: isMobile ? '205px !important' : '350px !important',
                  minHeight: isMobile ? '230px !important' : '600px !important',
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
                  alt={brand.name}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/image1.jpeg';
                  }}
                  style={{
                    width: isMobile ? 205 : 350,
                    height: isMobile ? 230 : 600,
                    objectFit: 'cover',
                    borderRadius: '0px 0px 0 0',
                    marginBottom: 0,
                    boxShadow: 'none',
                    background: '#f8f9fa',
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