import React, { useRef, useState, useEffect } from 'react';
import styles from './Showcase.module.css';

const showcaseItems = [
  { src: '/beyound/baccarat.png', alt: 'Baccarat', category: 'Luxury' },
  { src: '/beyound/LV jacket.png', alt: 'Louis Vuitton', category: 'Fashion' },
  { src: '/beyound/Balenciaga hoodie.png', alt: 'Balenciaga', category: 'Streetwear' },
  { src: '/beyound/LV shoes.png', alt: 'LV Shoes', category: 'Footwear' },
  { src: '/beyound/van cleef.png', alt: 'Van Cleef', category: 'Jewelry' },
  { src: '/beyound/yeezy red october.png', alt: 'Yeezy', category: 'Sneakers' },
  { src: '/beyound/loropiana.png', alt: 'Loro Piana', category: 'Premium' },
  { src: '/beyound/P_11_KELLY_PRODUIT_1_fit_wrap_0_wid_414_resMode_sharp2_op_usm_1_1_6_0-removebg-preview.png', alt: 'Hermès Kelly', category: 'Bags' },
];

const VISIBLE_CARDS = 7;
const CARD_WIDTH = 240; // Further increased for better visibility
const CARD_HEIGHT = 320; // Further increased for better proportions
const GAP = 35; // Increased for better spacing

const MAX_TILT = 75;
const ARC_HEIGHT = 10; // Increased for better arc effect
const SCALES = [1.8, 1.4, 1.25, 1.2, 1.25, 1.4, 1.8]; // Made center card same size as side cards

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const GodRaysCanvas = ({ color = '230,199,110', rays = 100, blur = 60, intensity = 0.18 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2 + 50;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * 2 * Math.PI;
        const length = h * 1.2;
        const width = 40;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        const grad = ctx.createLinearGradient(0, 0, 0, length);
        grad.addColorStop(0, `rgba(${color},${intensity})`);
        grad.addColorStop(1, `rgba(${color},0)`);
        ctx.globalAlpha = 1;
        ctx.filter = `blur(${blur}px)`;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-width / 2, 0);
        ctx.lineTo(width / 2, 0);
        ctx.lineTo(0, length);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.filter = 'none';
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [color, rays, blur, intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

const Showcase = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const velocityRef = useRef(0);
  const touchXRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(1200);
  const isDraggingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const now = Date.now();
      const timeDiff = now - lastScrollTimeRef.current;
      const sensitivity = timeDiff < 50 ? 0.002 : 0.003; // Increased sensitivity for smoother scrolling
      velocityRef.current += e.deltaX * sensitivity;
      lastScrollTimeRef.current = now;
    }
  };

  // Touch swipe handlers for mobile horizontal scrolling
  const handleTouchStartCarousel = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchXRef.current = e.touches[0].clientX;
      velocityRef.current = 0;
    }
  };

  const handleTouchMoveCarousel = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && touchXRef.current !== null) {
      const currentX = e.touches[0].clientX;
      const diff = currentX - touchXRef.current;
      const sensitivity = 0.003; // Increased for more responsive movement
      setScrollPos((prev) => prev - diff * sensitivity);
      velocityRef.current = -diff * 0.015; // Increased velocity for smoother feel
      touchXRef.current = currentX;
    }
  };

  const handleTouchEndCarousel = () => {
    touchXRef.current = null;
  };

  // Inertia animation loop with improved smoothness
  useEffect(() => {
    let raf: number;
    const animate = () => {
      if (Math.abs(velocityRef.current) > 0.0005) {
        setScrollPos((prev) => prev + velocityRef.current);
        velocityRef.current *= 0.92; // Increased friction for smoother stop
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const progress = (mod(Math.round(scrollPos), showcaseItems.length) + 0.5) / showcaseItems.length;

  // Fixed infinite scrolling - only repeat after all cards are shown
  const getVisibleItems = () => {
    const items = [];
    const half = Math.floor(VISIBLE_CARDS / 2);
    const centerIndex = Math.round(scrollPos);
    
    for (let i = -half; i <= half; i++) {
      const idx = mod(centerIndex + i, showcaseItems.length);
      items.push({ ...showcaseItems[idx], originalIndex: idx });
    }
    return items;
  };

  // Helper for mobile: get 3 visible items (left, center, right)
  const getMobileVisibleItems = () => {
    // Use smooth scrollPos instead of rounded for continuous movement
    const centerIdx = mod(Math.floor(scrollPos), showcaseItems.length);
    const leftIdx = mod(centerIdx - 1, showcaseItems.length);
    const rightIdx = mod(centerIdx + 1, showcaseItems.length);
    
    // Calculate smooth transition between cards
    const smoothOffset = scrollPos - Math.floor(scrollPos);
    
    return [
      { ...showcaseItems[leftIdx], pos: 'left', index: leftIdx, offset: smoothOffset },
      { ...showcaseItems[centerIdx], pos: 'center', index: centerIdx, offset: smoothOffset },
      { ...showcaseItems[rightIdx], pos: 'right', index: rightIdx, offset: smoothOffset },
    ];
  };

  const getCardStyle = (i: number): React.CSSProperties => {
    const center = Math.floor(VISIBLE_CARDS / 2);
    const offset = i - center + (scrollPos - Math.round(scrollPos));
    const scale = SCALES[i];
    // Fixed tilt angles instead of dynamic calculation
    const fixedTilts = [75, 45, 20, 0, -20, -45, -75]; // Fixed tilt values
    const tilt = fixedTilts[i] || 0;
    // Removed arcY to prevent vertical movement
    const totalWidth = (CARD_WIDTH + GAP) * (VISIBLE_CARDS - 1);
    const x = (i * (CARD_WIDTH + GAP)) - totalWidth / 2;
    const z = 100 - Math.abs(offset) * 10;
    return {
      transform: `translateX(${x}px) scale(${scale}) rotateY(${tilt}deg)`, // Removed translateY
      zIndex: z,
      opacity: 1,
      position: 'absolute',
      top: `0px`,
      left: `44%`,
      transformOrigin: 'center center',
      transition: 'transform 0.15s ease-out, opacity 0.15s ease-out', // Smoother, faster transition
      pointerEvents: 'auto',
    };
  };

  const INDICATOR_WIDTH = 80;

  // Improved progress bar drag helpers with smoother interaction
  const handleProgressInteract = (clientX: number) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newIdx = ratio * showcaseItems.length;
    setScrollPos(newIdx);
    velocityRef.current = 0; // Reset velocity when manually dragging
  };

  const onProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    handleProgressInteract(e.clientX);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleProgressInteract(e.clientX);
      }
    };
    const handleUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  const onProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    handleProgressInteract(e.touches[0].clientX);
  };
  const onProgressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
      handleProgressInteract(e.touches[0].clientX);
    }
  };
  const onProgressTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleProgressInteract(e.clientX);
  };

  const onProgressTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleProgressInteract(e.touches[0].clientX);
  };

  return (
    <section
      className={styles.showcaseBackground}
      onWheel={handleWheel}
      onTouchStart={handleTouchStartCarousel}
      onTouchMove={handleTouchMoveCarousel}
      onTouchEnd={handleTouchEndCarousel}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.backgroundVideo}
        src="/background.mp4"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div style={{ marginTop: '2rem' }} />
      <h1 className={styles.title}>BEYOND ORDINARY</h1>
      <div className={styles.subtitle}>
        Curated for those who crave the exceptional,<br />
        not the expected.
      </div>
      
      <div className={styles.carouselContainer} style={{ height: CARD_HEIGHT + ARC_HEIGHT }}>
        <div className={styles.carousel} style={{ height: CARD_HEIGHT + ARC_HEIGHT }}>
          {windowWidth <= 700
            ? getMobileVisibleItems().map((item, i) => {
                // Calculate smooth position based on offset
                const basePosition = item.pos === 'left' ? -80 : item.pos === 'right' ? 80 : 0;
                const smoothPosition = basePosition + (item.offset * 20); // Smooth transition
                
                return (
                  <div
                    key={`${item.index}-${item.pos}`}
                    className={`${styles.card} ${styles[item.pos]}`}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translateX(${smoothPosition}px)`,
                      transition: 'transform 0.1s ease-out', // Very fast transition for smooth movement
                    }}
                  >
                    <img src={item.src} alt={item.alt} />
                  </div>
                );
              })
            : getVisibleItems().map((item, i) => (
                <div key={`${item.originalIndex}-${i}`} className={styles.card} style={getCardStyle(i)}>
                  <img src={item.src} alt={item.alt} />
                </div>
              ))}
        </div>
      </div>
      
      <div
        className={styles.progressBarContainer}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, margin: '0 auto 2.5rem auto', zIndex: 10 }}
        onMouseDown={onProgressMouseDown}
        onTouchStart={onProgressTouchStart}
        onTouchMove={onProgressTouchMove}
        onTouchEnd={onProgressTouchEnd}
      >
        <div className={styles.progressBar} ref={progressBarRef}>
          <div
            style={{
              position: 'absolute',
              left: `calc(${progress * 100}% - ${INDICATOR_WIDTH / 2}px)`,
              top: 0,
              width: INDICATOR_WIDTH,
              height: '100%',
              background: 'linear-gradient(90deg, #e6c76e 0%, #fffbe6 100%)',
              borderRadius: '4px',
              transition: 'left 0.3s cubic-bezier(0.77,0,0.175,1)',
            }}
          />
        </div>
      </div>
      
      {/* Step Inside button positioned after progress bar */}
      <button className={styles.stepInsideBtn}>Step Inside</button>
    </section>
  );
};

export default Showcase;
