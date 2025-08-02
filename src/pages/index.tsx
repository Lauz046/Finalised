import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import HeroCarousel from '../components/HeroCarousel/HeroCarousal';
import InfiniteCardSection from '@/components/infinitescroll/infiniteScroll';
import TikTokInspiration from '@/components/tik-tok/tik_inspiration';
import NewArrivals from '@/components/newArrivals/NewArrivals';
import ProductSlider360 from '@/components/swiper360/ProductSlider360';
import HeroShowcase from '@/components/showcase/ShowCase';
import ShowcaseMoodSection from '@/components/moodmatch/ShowcaseMoodSection';
import BentoGrid from '@/components/BentoGrid/BentoGrid';
import PremiumScrollRow from '@/components/scrollrow/PremiumScrollRow';
import PremiumIconRow from '@/components/scrollrow/PremiumIconRow';

// Progressive loading component
const ProgressiveLoader: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
};

const HomePage = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Mark initial load as complete after 100ms
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Premium Brand Experience</title>
        <meta name="description" content="A premium brand experience inspired by Cartier" />
        {/* Preload critical resources */}
        <link rel="preload" href="/herosection/optimized/hero-video-1.webm" as="video" type="video/webm" />
        <link rel="preload" href="/background.webm" as="video" type="video/webm" />
        <link rel="preload" href="/image1.jpeg" as="image" />
        <link rel="preload" href="/image7.jpeg" as="image" />
      </Head>
      
      {/* Critical components - load immediately */}
      <HeroCarousel/>
      <PremiumScrollRow uniqueId="top"/>
      
      {/* Secondary components - load after 100ms */}
      <ProgressiveLoader delay={100}>
        <BentoGrid/>
        <ShowcaseMoodSection/>
      </ProgressiveLoader>
      
      {/* Tertiary components - load after 200ms */}
      <ProgressiveLoader delay={200}>
        <NewArrivals/>
        <PremiumIconRow uniqueId="bottom"/>
      </ProgressiveLoader>
      
      {/* Heavy components - load after 300ms */}
      <ProgressiveLoader delay={300}>
        <InfiniteCardSection/>
        <ProductSlider360/>
      </ProgressiveLoader>
      
      {/* Final components - load after 400ms */}
      <ProgressiveLoader delay={400}>
        <HeroShowcase/> 
        <TikTokInspiration/>
      </ProgressiveLoader>
    </>
  );
};

export default HomePage;
