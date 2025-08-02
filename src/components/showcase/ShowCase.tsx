import React, { useRef, useState, useEffect } from 'react';
import styles from './Showcase.module.css';

const showcaseItems = [
  { src: '/perfumeticker/All Perfume.png', alt: 'All Perfume' },
  { src: '/perfumeticker/designer perfume.png', alt: 'Designer Perfume' },
  { src: '/accessoriesticker/BELT.png', alt: 'Belt' },
  { src: '/accessoriesticker/Sunglasses.png', alt: 'Sunglasses' },
  { src: '/sneakerticker/AF1.png', alt: 'Nike AF1' },
  { src: '/apparelticker/CARHARRT MEN.png', alt: 'Carhartt WIP' },
  { src: '/apparelticker/BAPE MEN.png', alt: 'BAPE' },
  { src: '/sneakerticker/AIR JORDAN CARD.png', alt: 'Air Jordan' },
];

const VISIBLE_CARDS = 7;
const CARD_WIDTH = 220;
const CARD_HEIGHT = 340;
const GAP = 40;

const MAX_TILT = 75;
const ARC_HEIGHT = 8;
const SCALES = [1.7, 1.3, 1.15, 1.12, 1.15, 1.3, 1.7];

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      velocityRef.current += e.deltaX * 0.002; // Reduced sensitivity for smoother scrolling
    }
  };

  // Touch swipe handlers for mobile horizontal scrolling
  const handleTouchStartCarousel = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchXRef.current = e.touches[0].clientX;
      velocityRef.current = 0; // reset inertia so it starts fresh
    }
  };

  const handleTouchMoveCarousel = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && touchXRef.current !== null) {
      const currentX = e.touches[0].clientX;
      const diff = currentX - touchXRef.current;
      // Convert pixel movement to scrollPos units with smoother factor
      setScrollPos((prev) => prev - diff * 0.003); // Reduced factor for smoother movement
      velocityRef.current = -diff * 0.015; // Reduced velocity accumulation
      touchXRef.current = currentX;
    }
  };

  const handleTouchEndCarousel = () => {
    touchXRef.current = null;
    // inertia will continue via velocityRef during animate loop
  };

  // Inertia animation loop
  useEffect(() => {
    let raf: number;
    const animate = () => {
      // apply velocity with smoother friction
      if (Math.abs(velocityRef.current) > 0.001) {
        setScrollPos((prev) => prev + velocityRef.current);
        velocityRef.current *= 0.95; // Increased friction for smoother stop
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const progress = (mod(Math.round(scrollPos), showcaseItems.length) + 0.5) / showcaseItems.length;

  const getVisibleItems = () => {
    const items = [];
    const half = Math.floor(VISIBLE_CARDS / 2);
    for (let i = -half; i <= half; i++) {
      const idx = mod(Math.round(scrollPos) + i, showcaseItems.length);
      items.push(showcaseItems[idx]);
    }
    return items;
  };

  // Helper for mobile: get 3 visible items (left, center, right)
  const getMobileVisibleItems = () => {
    const centerIdx = mod(Math.round(scrollPos), showcaseItems.length);
    const leftIdx = mod(centerIdx - 1, showcaseItems.length);
    const rightIdx = mod(centerIdx + 1, showcaseItems.length);
    return [
      { ...showcaseItems[leftIdx], pos: 'left' },
      { ...showcaseItems[centerIdx], pos: 'center' },
      { ...showcaseItems[rightIdx], pos: 'right' },
    ];
  };

  const getCardStyle = (i: number): React.CSSProperties => {
    const center = Math.floor(VISIBLE_CARDS / 2);
    const offset = i - center + (scrollPos - Math.round(scrollPos));
    const scale = SCALES[i];
    const tilt = -MAX_TILT * (offset / center);
    const arcY = -Math.pow(offset / center, 2) * ARC_HEIGHT + ARC_HEIGHT;
    const totalWidth = (CARD_WIDTH + GAP) * (VISIBLE_CARDS - 1);
    const x = (i * (CARD_WIDTH + GAP)) - totalWidth / 2;
    const z = 100 - Math.abs(offset) * 10;
    return {
      transform: `translateX(${x}px) translateY(${arcY}px) scale(${scale}) rotateY(${tilt}deg)`,
      zIndex: z,
      opacity: 1,
      position: 'absolute',
      top: `0px`,
      left: `44%`,
      transformOrigin: 'center center',
      transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s', // Smoother transition
      pointerEvents: 'auto',
    };
  };

  const INDICATOR_WIDTH = 80;

  // Progress bar drag helpers
  const handleProgressInteract = (clientX: number) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const newIdx = ratio * showcaseItems.length;
    setScrollPos(newIdx);
  };

  const onProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
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
    isDraggingRef.current = true;
    handleProgressInteract(e.touches[0].clientX);
  };
  const onProgressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      handleProgressInteract(e.touches[0].clientX);
    }
  };
  const onProgressTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleProgressInteract(e.clientX);
  };

  const onProgressTouch = (e: React.TouchEvent<HTMLDivElement>) => {
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
        src="/background.webm"
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
      <div style={{ marginTop: '2.5rem' }} />
      <h1 className={styles.title}>BEYOND ORDINARY</h1>
      <div className={styles.subtitle}>
        Curated for those who crave the exceptional,<br />
        not the expected.
      </div>
      <div className={styles.carouselContainer} style={{ height: CARD_HEIGHT + ARC_HEIGHT }}>
        <div className={styles.carousel} style={{ height: CARD_HEIGHT + ARC_HEIGHT }}>
          {windowWidth <= 700
            ? getMobileVisibleItems().map((item, i) => {
                // Position: left (25%), center (50%), right (75%)
                const positions = ['left', 'center', 'right'];
                const leftPercents = ['25%', '50%', '75%'];
                return (
                  <div
                    key={i}
                    className={`${styles.card} ${styles[item.pos]}`}
                    style={{
                      left: leftPercents[i],
                      marginLeft: '-40px',
                      position: 'absolute',
                    }}
                  >
                    <img src={item.src} alt={item.alt} />
                  </div>
                );
              })
            : getVisibleItems().map((item, i) => (
                <div key={i} className={styles.card} style={getCardStyle(i)}>
                  <img src={item.src} alt={item.alt} />
                </div>
              ))}
        </div>
      </div>
      <button className={styles.stepInsideBtn}>Step Inside</button>
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
              transition: 'left 0.4s cubic-bezier(0.77,0,0.175,1)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Showcase;
