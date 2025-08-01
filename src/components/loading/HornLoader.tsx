'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './HornLoader.module.css';
import { initGSAP, safeAnimate } from '../../utils/gsapUtils';

interface HornLoaderProps {
  onComplete: () => void;
  duration?: number; // Total duration in milliseconds
}

const HornLoader: React.FC<HornLoaderProps> = ({ 
  onComplete, 
  duration = 2000 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hornContainerRef = useRef<HTMLDivElement>(null);
  const brandContainerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [showBrand, setShowBrand] = useState(false);

  const hornFrames = [
    '/hornloader/1 HORN.svg',
    '/hornloader/2 HORN.svg',
    '/hornloader/3 HORN.svg',
    '/hornloader/4 HORN.svg',
    '/hornloader/5 HORN.svg',
    '/hornloader/Complete horn6.svg'
  ];

  useEffect(() => {
    const setupAnimation = async () => {
      const { gsap } = await initGSAP();
      if (!gsap) {
        console.warn('GSAP not available, using fallback animation');
        // Fallback: simple frame-by-frame animation
        let frameIndex = 0;
        const frameInterval = setInterval(() => {
          setCurrentFrame(frameIndex);
          frameIndex++;
          
          if (frameIndex >= hornFrames.length) {
            clearInterval(frameInterval);
            setShowBrand(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1000);
          }
        }, 300);
        
        return () => clearInterval(frameInterval);
      }

      const tl = gsap.timeline();

      // Initial white background fade in
      if (containerRef.current) {
        tl.to(containerRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      // Smooth overlapping horn loading
      hornFrames.forEach((frame, index) => {
        const frameDuration = 2000 / hornFrames.length; // Exactly 2 seconds for horn loading
        
        // Start each frame slightly before the previous one ends for smooth overlap
        tl.to({}, {
          duration: frameDuration / 1000,
          onStart: () => setCurrentFrame(index),
          ease: "power2.inOut"
        }, index === 0 ? 0 : `-=${frameDuration / 1000 * 0.25}`); // Reduced overlap for slower feel
      });

      // Horn gets smaller and fades
      if (hornContainerRef.current) {
        tl.to(hornContainerRef.current, {
          scale: 0.85,
          opacity: 0.6,
          duration: 0.6,
          ease: "power2.inOut"
        }, "-=0.3");
      }

      // Horn fades out completely
      if (hornContainerRef.current) {
        tl.to(hornContainerRef.current, {
          opacity: 0,
          scale: 0.7,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => setShowBrand(true)
        });
      }

      // Brand logo and tagline reveal - reduced delay
      if (brandContainerRef.current) {
        tl.to(brandContainerRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.1"); // Reduced delay from -0.2 to -0.1

        // Logo scales up with minimal bounce - smaller to larger
        const brandLogo = brandContainerRef.current.querySelector('.brand-logo');
        if (brandLogo) {
          tl.fromTo(brandLogo, {
            scale: 0.6, // Smaller starting scale
            opacity: 0
          }, {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.2)" // Reduced bounce for more minimal feel
          }, "-=0.4");
        }
      }

      // Final fade out
      if (containerRef.current) {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete
        }, "+=0.5");
      }

      return () => tl.kill();
    };

    setupAnimation();
  }, [duration, onComplete, hornFrames.length]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.hornContainer} ref={hornContainerRef}>
        {hornFrames.map((frame, index) => (
          <img
            key={index}
            src={frame}
            alt={`Horn Frame ${index + 1}`}
            className={`${styles.hornFrame} ${
              index === currentFrame ? styles.active : ''
            }`}
            style={{
              opacity: index === currentFrame ? 1 : 0,
              transform: index === currentFrame ? 'scale(1)' : 'scale(0.95)'
            }}
          />
        ))}
      </div>

      {/* Brand Reveal */}
      <div 
        ref={brandContainerRef} 
        className={styles.brandContainer}
        style={{ opacity: showBrand ? 1 : 0 }}
      >
        <img 
          src="/nav/Plutus logo blue.svg" 
          alt="PLUTUS" 
          className={`${styles.brandLogo} brand-logo`}
        />
      </div>
    </div>
  );
};

export default HornLoader; 