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
      
      // Reset position when we've moved the width of one complete set of brands
      const singleSetWidth = ticker.scrollWidth / 8; // Since we have 8 sets now
      if (Math.abs(translateX) >= singleSetWidth) {
        translateX = 0;
      }
      
      ticker.style.transform = `translateX(${translateX}px)`;
      animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [brands, paused]);

  // Create watch categories using actual database brands with available images
  const watchCategories = useMemo(() => {
    // Define available brand images
    const availableBrandImages: { [key: string]: string } = {
      'A. LANGE & SOHNE': '/watchticker/ARNOLD & SON.png', // Using Arnold & Son image as fallback
      'AUDEMARS PIGUET': '/watchticker/Rolex.png', // Using Rolex image as fallback
      'BAUME & MERCIER': '/watchticker/Rolex.png',
      'BELL & ROSS': '/watchticker/BELL & ROSS.png',
      'BLANCPAIN': '/watchticker/Rolex.png',
      'BOUCHERON': '/watchticker/Rolex.png',
      'BREITLING': '/watchticker/Rolex.png',
      'CARTIER': '/watchticker/Rolex.png',
      'CHANEL': '/watchticker/Rolex.png',
      'F.P. JOURNE': '/watchticker/Rolex.png',
      'GLASHUTTE ORIGINAL': '/watchticker/GLASHUTTE.png',
      'HUBLOT': '/watchticker/Rolex.png',
      'IWC': '/watchticker/Rolex.png',
      'JAEGER LECOULTRE': '/watchticker/Rolex.png',
      'OMEGA': '/watchticker/Rolex.png',
      'PANERAI': '/watchticker/Rolex.png',
      'PATEK PHILIPPE': '/watchticker/Rolex.png',
      'RICHARD MILLE': '/watchticker/Rolex.png',
      'ROLEX': '/watchticker/Rolex.png',
      'TAG HEUER': '/watchticker/Rolex.png',
      'TUDOR': '/watchticker/Rolex.png',
      'VACHERON CONSTANTIN': '/watchticker/Vacheron Constantin.png',
      'ZENITH': '/watchticker/Rolex.png',
    };

    // Create categories from available brands with images
    const categories = [
      { name: 'A. LANGE & SOHNE', image: availableBrandImages['A. LANGE & SOHNE'], filterType: 'A. LANGE & SOHNE', bgColor: '#f5f5dc' },
      { name: 'AUDEMARS PIGUET', image: availableBrandImages['AUDEMARS PIGUET'], filterType: 'AUDEMARS PIGUET', bgColor: '#1e3a8a' },
      { name: 'BELL & ROSS', image: availableBrandImages['BELL & ROSS'], filterType: 'BELL & ROSS', bgColor: '#f5f5dc' },
      { name: 'CARTIER', image: availableBrandImages['CARTIER'], filterType: 'CARTIER', bgColor: '#1e3a8a' },
      { name: 'F.P. JOURNE', image: availableBrandImages['F.P. JOURNE'], filterType: 'F.P. JOURNE', bgColor: '#f5f5dc' },
      { name: 'GLASHUTTE ORIGINAL', image: availableBrandImages['GLASHUTTE ORIGINAL'], filterType: 'GLASHUTTE ORIGINAL', bgColor: '#1e3a8a' },
      { name: 'HUBLOT', image: availableBrandImages['HUBLOT'], filterType: 'HUBLOT', bgColor: '#f5f5dc' },
      { name: 'PATEK PHILIPPE', image: availableBrandImages['PATEK PHILIPPE'], filterType: 'PATEK PHILIPPE', bgColor: '#1e3a8a' },
      { name: 'RICHARD MILLE', image: availableBrandImages['RICHARD MILLE'], filterType: 'RICHARD MILLE', bgColor: '#f5f5dc' },
      { name: 'ROLEX', image: availableBrandImages['ROLEX'], filterType: 'ROLEX', bgColor: '#1e3a8a' },
      { name: 'VACHERON CONSTANTIN', image: availableBrandImages['VACHERON CONSTANTIN'], filterType: 'VACHERON CONSTANTIN', bgColor: '#f5f5dc' },
    ];

    return categories;
  }, []);

  // Create endless scrolling by duplicating the categories multiple times for seamless loop
  const displayBrands = useMemo(() => {
    // Duplicate the categories 8 times for seamless endless scrolling
    const duplicated = [];
    for (let i = 0; i < 8; i++) {
      duplicated.push(...watchCategories);
    }
    return duplicated;
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
                    
                    // Try multiple fallback variations for each brand with URL encoding
                    if (target.src.includes('A. LANGE & SOHNE') || target.src.includes('ARNOLD & SON')) {
                      const fallbacks = [
                        '/watchticker/ARNOLD & SON.png',
                        '/watchticker/ARNOLD & SON.png',
                        '/watchticker/ARNOLD & SON.png',
                        '/watchticker/arnold-son.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('AUDEMARS PIGUET') || target.src.includes('Audemars Piguet')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/audemars-piguet.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('BELL & ROSS') || target.src.includes('Bell & Ross')) {
                      const fallbacks = [
                        '/watchticker/BELL%20%26%20ROSS.png',
                        '/watchticker/BELL & ROSS.png',
                        '/watchticker/Bell & Ross.png',
                        '/watchticker/bell-ross.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('CARTIER') || target.src.includes('Cartier')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/cartier.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('F.P. JOURNE') || target.src.includes('F.P. Journe')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/f-p-journe.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('GLASHUTTE ORIGINAL') || target.src.includes('Glashutte')) {
                      const fallbacks = [
                        '/watchticker/GLASHUTTE.png',
                        '/watchticker/Glashutte.png',
                        '/watchticker/glashutte.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('HUBLOT') || target.src.includes('Hublot')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/hublot.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('IWC') || target.src.includes('IWC')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/iwc.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('JAEGER LECOULTRE') || target.src.includes('Jaeger LeCoultre')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/jaeger-lecoultre.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('OMEGA') || target.src.includes('Omega')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/omega.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('PANERAI') || target.src.includes('Panerai')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/panerai.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('PATEK PHILIPPE') || target.src.includes('Patek Philippe')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/patek-philippe.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('RICHARD MILLE') || target.src.includes('Richard Mille')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/richard-mille.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('ROLEX') || target.src.includes('Rolex')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/ROLEX.png',
                        '/watchticker/rolex.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('TAG HEUER') || target.src.includes('Tag Heuer')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/tag-heuer.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('TUDOR') || target.src.includes('Tudor')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/tudor.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('VACHERON CONSTANTIN') || target.src.includes('Vacheron Constantin')) {
                      const fallbacks = [
                        '/watchticker/Vacheron%20Constantin.png',
                        '/watchticker/Vacheron Constantin.png',
                        '/watchticker/VACHERON CONSTANTIN.png',
                        '/watchticker/vacheron-constantin.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else if (target.src.includes('ZENITH') || target.src.includes('Zenith')) {
                      const fallbacks = [
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/Rolex.png',
                        '/watchticker/zenith.png'
                      ];
                      const nextFallback = fallbacks.find(f => !target.src.includes(f));
                      if (nextFallback) {
                        target.src = nextFallback;
                      } else {
                        target.src = '/nav/Plutus logo blue.svg';
                      }
                    } else {
                      target.src = '/nav/Plutus logo blue.svg';
                    }
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