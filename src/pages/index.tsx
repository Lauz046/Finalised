import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import OptimizedHeroCarousel from '../components/HeroCarousel/OptimizedHeroCarousel';
import InfiniteCardSection from '@/components/infinitescroll/infiniteScroll';
import NewArrivals from '@/components/newArrivals/NewArrivals';
import ProductSlider360 from '@/components/swiper360/ProductSlider360';
import HeroShowcase from '@/components/showcase/ShowCase';
import ShowcaseMoodSection from '@/components/moodmatch/ShowcaseMoodSection';
import BentoGrid from '@/components/BentoGrid/BentoGrid';
import PremiumScrollRow from '@/components/scrollrow/PremiumScrollRow';
import PremiumIconRow from '@/components/scrollrow/PremiumIconRow';


// CSS-based progressive loading component
const ProgressiveLoader: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Premium Brand Experience</title>
        <meta name="description" content="A premium brand experience inspired by Cartier" />
        {/* Preload critical resources */}
        <link rel="preload" href="/image1.jpeg" as="image" />
        <link rel="preload" href="/image2.jpeg" as="image" />
        <link rel="preload" href="/image3.jpeg" as="image" />
        <link rel="preload" href="/image4.jpeg" as="image" />
        <link rel="preload" href="/image5.jpeg" as="image" />
        <link rel="preload" href="/image7.jpeg" as="image" />
      </Head>
      
      {/* Critical components - load immediately */}
      <OptimizedHeroCarousel/>
      <PremiumScrollRow uniqueId="top"/>
      
      {/* Secondary components - fade in after 100ms */}
      <ProgressiveLoader delay={100}>
        <BentoGrid/>
        <ShowcaseMoodSection/>
      </ProgressiveLoader>
      
      {/* Tertiary components - fade in after 200ms */}
      <ProgressiveLoader delay={200}>
        <NewArrivals/>
        <PremiumIconRow uniqueId="bottom"/>
      </ProgressiveLoader>
      
      {/* Heavy components - fade in after 300ms */}
      <ProgressiveLoader delay={300}>
        <InfiniteCardSection/>
        <ProductSlider360/>
      </ProgressiveLoader>
      
      {/* Final components - fade in after 400ms */}
      <ProgressiveLoader delay={400}>
        <HeroShowcase/> 
      </ProgressiveLoader>
      

    </>
  );
};

export default HomePage;
