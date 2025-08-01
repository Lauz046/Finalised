import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './ShowcaseMoodSection.module.css';

const HER_BG = '/bg.png';
const HIM_BG = '/bg2.png';

const himImages = [
  '/morph 1.png', // 1 front
  '/morph 2.png', // 2 back
  '/morph 3.png', // 3 front
  '/morph 4.png', // 4 back
];
const herImages = [
  '/morph women.png', // 1 front
  '/morph women 2.png', // 2 back
  '/morph women 3.png', // 3 front
  '/morph women 4.png', // 4 back
];

const ANIMATION_SEQUENCE = ['flip', 'rotate', 'flip', 'rotate'];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 600;

const ShowcaseMoodSection = () => {
  const router = useRouter();
  // For each card, track which image is currently shown
  const [herIndex, setHerIndex] = useState(0);
  const [himIndex, setHimIndex] = useState(0);
  const [herAnim, setHerAnim] = useState('');
  const [himAnim, setHimAnim] = useState('');
  const herInterval = useRef<NodeJS.Timeout | null>(null);
  const himInterval = useRef<NodeJS.Timeout | null>(null);
  const herStep = useRef(0);
  const himStep = useRef(0);
  const herCardRef = useRef<HTMLDivElement | null>(null);
  const himCardRef = useRef<HTMLDivElement | null>(null);

  // Animation cycle: flip, rotate, flip, rotate...
  const startHerCycle = () => {
    if (herInterval.current) return;
    herStep.current = 0;
    setHerIndex(0);
    setHerAnim('');
    herInterval.current = setInterval(() => {
      const nextStep = (herStep.current + 1) % 4;
      setHerAnim(ANIMATION_SEQUENCE[nextStep]);
      setTimeout(() => {
        setHerIndex((prev) => (prev + 1) % 4);
        setHerAnim('');
      }, 200);
      herStep.current = nextStep;
    }, 500);
  };
  const stopHerCycle = () => {
    if (herInterval.current) clearInterval(herInterval.current);
    herInterval.current = null;
    setHerIndex(0);
    setHerAnim('');
    herStep.current = 0;
  };
  const startHimCycle = () => {
    if (himInterval.current) return;
    himStep.current = 0;
    setHimIndex(0);
    setHimAnim('');
    himInterval.current = setInterval(() => {
      const nextStep = (himStep.current + 1) % 4;
      setHimAnim(ANIMATION_SEQUENCE[nextStep]);
      setTimeout(() => {
        setHimIndex((prev) => (prev + 1) % 4);
        setHimAnim('');
      }, 200);
      himStep.current = nextStep;
    }, 500);
  };
  const stopHimCycle = () => {
    if (himInterval.current) clearInterval(himInterval.current);
    himInterval.current = null;
    setHimIndex(0);
    setHimAnim('');
    himStep.current = 0;
  };

  // Intersection Observer for mobile auto-animate
  useEffect(() => {
    if (!isMobile()) return;
    const herNode = herCardRef.current;
    const himNode = himCardRef.current;
    if (!herNode || !himNode) return;
    const herObs = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startHerCycle();
        else stopHerCycle();
      },
      { threshold: 0.5 }
    );
    const himObs = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startHimCycle();
        else stopHimCycle();
      },
      { threshold: 0.5 }
    );
    herObs.observe(herNode);
    himObs.observe(himNode);
    return () => {
      herObs.disconnect();
      himObs.disconnect();
      stopHerCycle();
      stopHimCycle();
    };
     
  }, []);

  // Desktop: hover, Mobile: auto-animate
  const herCardProps = isMobile()
    ? { ref: herCardRef }
    : { onMouseEnter: startHerCycle, onMouseLeave: stopHerCycle };
  const himCardProps = isMobile()
    ? { ref: himCardRef }
    : { onMouseEnter: startHimCycle, onMouseLeave: stopHimCycle };

  // Navigation handlers
  const navigateToHim = () => {
    router.push('/apparel?gender=male');
  };
  const navigateToHer = () => {
    router.push('/apparel?gender=female');
  };

  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.title}>Made to Match Your Mood</h2>
      <div className={styles.cardsGrid}>
       

        {/* FOR HIM */}
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${HIM_BG})` }}
          onClick={navigateToHim}
          {...himCardProps}
        >
          <span className={styles.cardLabelHim}>FOR HIM</span>
          <div className={styles.mediaWrapper}>
            <img
              className={
                styles.image +
                (himAnim === 'flip' ? ' ' + styles.flipCard : '') +
                (himAnim === 'rotate' ? ' ' + styles.rotateCard : '')
              }
              src={himImages[himIndex]}
              alt={`Him 360 ${himIndex + 1}`}
              draggable={false}
            />
            <div className={styles.shadowCircle} />
          </div>
          <div className={styles.cardFooterHim}>
            <span>Explore the Drip</span>
          </div>
        </div>

         {/* FOR HER */}
         <div
          className={styles.card}
          style={{ backgroundImage: `url(${HER_BG})` }}
          onClick={navigateToHer}
          {...herCardProps}
        >
          <span className={styles.cardLabelHer}>FOR HER</span>
          <div className={styles.mediaWrapper}>
            <img
              className={
                styles.image +
                (herAnim === 'flip' ? ' ' + styles.flipCard : '') +
                (herAnim === 'rotate' ? ' ' + styles.rotateCard : '')
              }
              src={herImages[herIndex]}
              alt={`Her 360 ${herIndex + 1}`}
              draggable={false}
            />
            <div className={styles.shadowCircle} />
          </div>
          <div className={styles.cardFooterHer}>
            <span>Explore the Drip</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseMoodSection;
