'use client';
import React, { useEffect, useRef } from 'react';
import styles from './loadingScreen.module.css';
import Image from 'next/image';
import { initGSAP, safeAnimate } from '../../utils/gsapUtils';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const imageStackRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const images = [
    '/watches.jpg',
    '/caps.jpg',
    '/perfumes.jpg',
    '/sunglasses.jpg',
    '/jackets.jpg'
  ];

  useEffect(() => {
    const setupAnimation = async () => {
      const { gsap } = await initGSAP();
      if (!gsap) {
        console.warn('GSAP not available, using fallback animation');
        // Fallback: just call onComplete after a delay
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 3000);
        return;
      }
      
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.set(containerRef.current, { opacity: 1 });

      // Logo fade in + move up
      tl.fromTo(
        logoWrapperRef.current,
        { opacity: 0, y: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      ).to(logoWrapperRef.current, {
        y: -80,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.5');

      // Expand white square
      tl.fromTo(squareRef.current, {
        scale: 0.2,
        opacity: 1,
      }, {
        scale: 1,
        duration: 1.2,
        ease: 'expo.out',
      }, '-=0.8');

      // Stack all images one by one from above
      images.forEach((_, i) => {
        const child = imageStackRef.current?.children[i] as HTMLElement | null;
        if (child) {
          gsap.set(child, { zIndex: i + 1 });
          tl.fromTo(
            child,
            { y: -300, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out'
            },
            `-=${0.4 - i * 0.08}`
          );
        }
      });

      // Final split-screen exit
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onStart: () => {
          if (leftPanelRef.current && rightPanelRef.current) {
            leftPanelRef.current.style.display = 'block';
            rightPanelRef.current.style.display = 'block';

            gsap.to(leftPanelRef.current, {
              x: '-100%',
              duration: 1.2,
              ease: 'power3.inOut'
            });

            gsap.to(rightPanelRef.current, {
              x: '100%',
              duration: 1.2,
              ease: 'power3.inOut',
              onComplete
            });
          }
        },
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      return () => tl.kill();
    };

    setupAnimation();
  }, [onComplete]);

  return (
    <>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.centerContent}>
          <div ref={logoWrapperRef} className={styles.logo}>
            <img src="/LOGO.svg" alt="House of Plutus Logo" className={styles.logoImage} />
          </div>

          <div ref={squareRef} className={styles.square}></div>

          <div ref={imageStackRef} className={styles.imageStack}>
            {images.map((src, i) => (
              <div key={i} className={styles.imageWrapper}>
                <Image
                  src={src}
                  alt={`loading-${i}`}
                  className={styles.image}
                  width={200}
                  height={250}
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split Screen Exit Panels */}
      <div className={styles.exitSplit}>
        <div ref={leftPanelRef} className={styles.leftPanel}></div>
        <div ref={rightPanelRef} className={styles.rightPanel}></div>
      </div>
    </>
  );
};

export default LoadingScreen;
