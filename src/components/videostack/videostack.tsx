'use client';

import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { initGSAP, safeAnimate } from '../../utils/gsapUtils';

const config = {
  NUM_CARDS: 10,
  CARD_WIDTH: 2.2,
  CARD_HEIGHT: 3.3,
};

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

const imageUrls = [
  '/beyound/loropiana.png',
  '/beyound/baccarat.png',
  '/beyound/van cleef.png',
  '/beyound/Balenciaga hoodie.png',
  '/beyound/LV jacket.png',
  '/beyound/LV shoes.png',
  '/beyound/yeezy red october.png',
  '/beyound/P_11_KELLY_PRODUIT_1_fit_wrap_0_wid_414_resMode_sharp2_op_usm_1_1_6_0-removebg-preview.png',
  '/beyound/1628063.png',
  '/beyound/loropiana.png',
];

function Card({
  index,
  imageUrl,
  activeIndex,
  setCenterCardIndex,
  isMobile,
}: {
  index: number;
  imageUrl: string;
  activeIndex: number;
  setCenterCardIndex: (index: number | null) => void;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(imageUrl);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [imageUrl]);

  useFrame(() => {
    const mesh = meshRef.current;

    if (isMobile) {
      // Mobile layout: 5 cards in a horizontal line
      const delta = index - activeIndex;
      if (delta > config.NUM_CARDS / 2) delta -= config.NUM_CARDS;
      if (delta < -config.NUM_CARDS / 2) delta += config.NUM_CARDS;

      // Horizontal spacing for mobile with non-uniform distribution
      const x = 0;
      if (delta === 0) x = 0; // Center card
      else if (delta === 1) x = 1.7; // Right card - more space from center
      else if (delta === -1) x = -1.7; // Left card - more space from center
      else if (delta === 2) x =3; // Far right - even more space
      else if (delta === -2) x = -3; // Far left - even more space
      
      const z = 0; // All cards on same z-plane
      const y = 0;

      // Mobile tilt logic
      const rotY = 0;
      if (delta === 0) rotY = 0; // Center card no tilt
      else if (delta === 1) rotY = -1.4; // Right card slight tilt
      else if (delta === -1) rotY = 1.4; // Left card slight tilt
      else if (delta === 2) rotY = -1.3; // Far right more tilt
      else if (delta === -2) rotY = 1.3; // Far left more tilt

      const scale = 0.8;
      if (delta === 0) scale = 1.3; // Center card larger
      else if (Math.abs(delta) === 1) scale = 1.3;
      else if (Math.abs(delta) === 2) scale = 1.4;

      // Only show 5 cards in mobile view
      mesh.visible = Math.abs(delta) <= 2;

      if (delta === 0) setCenterCardIndex(index);

      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, x, 0.15);
      mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, z, 0.15);
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, y, 0.15);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, rotY, 0.15); // Mobile tilt
      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, scale, 0.15));
    } else {
      // Desktop layout: Original curved layout
      const delta = index - activeIndex;
      if (delta > config.NUM_CARDS / 2) delta -= config.NUM_CARDS;
      if (delta < -config.NUM_CARDS / 2) delta += config.NUM_CARDS;

      const angle = delta * (Math.PI / 9);
      // Adjusted for 7 visible cards
      const radius = 4.5; // reduce from 5.2
      const spacing = 0.5; // reduce from 0.5
      const x = Math.sin(angle) * radius + delta * spacing;
      const z = Math.cos(angle) * radius - radius;
      const rotY = -angle;

      const tiltMultiplier = 1;
      if (Math.abs(delta) === 1) tiltMultiplier = 3;
      else if (Math.abs(delta) === 2) tiltMultiplier = 2.1;
      else if (Math.abs(delta) === 3) tiltMultiplier = 1.3; // less tilt for outermost

      const adjustedRotY = rotY * tiltMultiplier;
      const y = delta === 0 ? -0.2 : -0.3;

      const scale = 0.6;
      if (delta === 0) scale = 1.1;
      else if (Math.abs(delta) === 1) scale = 1;
      else if (Math.abs(delta) === 2) scale = 1;
      else if (Math.abs(delta) === 3) scale = 0.9; // larger for outermost

      mesh.visible = Math.abs(delta) <= 3;

      if (delta === 0) setCenterCardIndex(index);

      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, x, 0.15);
      mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, z, 0.15);
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, y, 0.15);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, adjustedRotY, 0.15);
      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, scale, 0.15));
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[
        isMobile ? 2.2 : config.CARD_WIDTH, // Larger width for better visibility
        isMobile ? 3.8 : config.CARD_HEIGHT  // Larger height for better visibility
      ]} />
      <meshStandardMaterial 
        map={texture} 
        toneMapped={false}
        color="#ffffff" // White background
      />
    </mesh>
  );
}

function CardStack({
  activeIndex,
  setCenterCardIndex,
  isMobile,
}: {
  activeIndex: number;
  setCenterCardIndex: (index: number | null) => void;
  isMobile: boolean;
}) {
  const cards = useMemo(() => imageUrls.map((url, i) => ({ id: i, url })), []);
  return (
    <>
      {cards.map((card, i) => (
        <Card
          key={card.id}
          index={i}
          imageUrl={card.url}
          activeIndex={activeIndex}
          setCenterCardIndex={setCenterCardIndex}
          isMobile={isMobile}
        />
      ))}
    </>
  );
}

export default function FlipbookComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [centerCardIndex, setCenterCardIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Initialize GSAP and ScrollTrigger
    initGSAP();
  }, []);

  // Remove ScrollTrigger - we'll use manual navigation instead
  // useEffect(() => {
  //   if (!sectionRef.current) return;
  //   const setupScrollTrigger = async () => {
  //     const { gsap, ScrollTrigger } = await initGSAP();
  //     if (!gsap || !ScrollTrigger) {
  //       console.warn('GSAP not available, using fallback scroll behavior');
  //       return;
  //     }
  //     const trigger = ScrollTrigger.create({
  //       trigger: sectionRef.current,
  //       start: 'top top',
  //       end: isMobile ? '+=3000' : '+=5000',
  //       pin: true,
  //       scrub: isMobile ? 0.3 : 0.5,
  //       snap: {
  //         snapTo: (value: unknown) => Math.round(value * config.NUM_CARDS) / config.NUM_CARDS,
  //         duration: { min: 0.2, max: 0.4 },
  //         delay: 0.05,
  //       },
  //       onUpdate: (self: unknown) => {
  //         let idx;
  //         if (isMobile) {
  //           idx = Math.round(self.progress * (config.NUM_CARDS - 1));
  //         } else {
  //           idx = Math.round(self.progress * (config.NUM_CARDS - 1));
  //         }
  //         setActiveIndex(idx);
  //       },
  //     });
  //     return () => trigger.kill();
  //   };
  //   setupScrollTrigger();
  // }, [isMobile]);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % config.NUM_CARDS);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + config.NUM_CARDS) % config.NUM_CARDS);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        height: '120vh', // Increased height to prevent overlap
        width: '100vw',
        overflow: 'hidden',
        background: 'transparent',
        position: 'relative',
        margin: '2rem 0 0 0', // Add top margin to prevent overlap
        padding: 0,
        border: 'none',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
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
        src="/background.webm"
      />
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? 80 : 20,
          width: '100%',
          textAlign: 'center',
          color: '#051f2d',
          fontFamily: 'TIMES NEW NORMAL',
          zIndex: 30,
        }}
      >
        <h1 style={{ 
          fontSize: isMobile ? '2.6rem' : '4rem', 
          fontWeight: '400', 
          marginBottom: '0.2rem',
          fontFamily: 'Playfair Display, Didot, Times New Roman, serif',
          background: 'linear-gradient(90deg, #F9F295 0%, #E0AA3E 50%, #F9F295 75%, #B88A44 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          
          display: 'inline-block'
        }}>
          BEYOND ORDINARY
        </h1>
        <p style={{ 
          fontSize: isMobile ? '1.2rem' : '1.4rem', 
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          color: '#e6eaf0',
          fontFamily: 'Inter, sans-serif',
          marginBottom: isMobile ? '4rem' : '7rem'
        }}>
          Curated for those who crave the exceptional,<br />
          not the expected.
        </p>
      </div>

      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '120vh', // Match section height
          width: '100vw',
          zIndex: 10,
          margin: 0,
          padding: '2rem 0 0 0', // Add top padding
          border: 'none',
        }}
      >
        <Suspense fallback={null}>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ 
              position: isMobile ? [0, 0, 8] : [0, 0, 7.2], 
              fov: isMobile ? 75 : 42 
            }}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
            <CardStack 
              activeIndex={activeIndex} 
              setCenterCardIndex={setCenterCardIndex} 
              isMobile={isMobile}
            />
          </Canvas>
        </Suspense>

        {/* Steal the Look button - bottom of center card */}
        {centerCardIndex !== null && (
          <div
            style={{
              position: 'absolute',
              top: isMobile ? '74%' : '80%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 25,
              pointerEvents: 'none',
            }}
          >
            <button
              style={{
                padding: isMobile ? '8px 16px' : '10px 20px',
                fontSize: isMobile ? '1rem' : '1rem',
                background: '#051f2d',
                color: '#fff',
                fontFamily: 'TIMES NEW NORMAL',
                border: 'none',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
            >
              Steal the Look
            </button>
          </div>
        )}

        {/* Navigation Arrows with SVGs */}
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? 120 : 30,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 20,
          }}
        >
          {/* Slider */}
          <div
            style={{
              width: '80vw',
              maxWidth: '900px',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: `${(activeIndex / (config.NUM_CARDS - 1)) * 100}%`,
                top: 0,
                width: '80px',
                height: '100%',
                background: 'linear-gradient(90deg, #e6c76e 0%, #fffbe6 100%)',
                borderRadius: '4px',
                transition: 'left 0.4s cubic-bezier(0.77,0,0.175,1)',
              }}
            />
          </div>
          
          {/* Arrow buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={goPrev}
              style={{
                width: isMobile ? '40px' : '40px',
                height: isMobile ? '40px' : '40px',
                borderRadius: '50%',
                border: 'none',
                background: '#051f2d',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" style={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 20 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={goNext}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: '#051f2d',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" style={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 20 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
