import React, { useState, useRef, useEffect } from 'react';
import { useStash } from '../StashContext';
import StashProductCard from './StashProductCard';
import styles from './StashProductGrid.module.css';

interface StashProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  productType: string;
}

interface StashProductGridProps {
  products: StashProduct[];
}

const StashProductGrid: React.FC<StashProductGridProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hoveredLineIndex, setHoveredLineIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { removeFromStash } = useStash();

  // Preload background image for faster loading
  useEffect(() => {
    const img = new Image();
    img.src = '/restof/Stash.png';
  }, []);

  // Initialize scroll position to show first card
  useEffect(() => {
    if (scrollContainerRef.current && products.length > 0) {
      // Ensure scroll starts from the leftmost position
      scrollContainerRef.current.scrollLeft = 0;
      setCurrentIndex(0);
    }
  }, [products.length]);

  // Scroll to specific card
  useEffect(() => {
    if (currentIndex !== null && cardRefs.current[currentIndex] && scrollContainerRef.current) {
      const cardElement = cardRefs.current[currentIndex];
      const container = scrollContainerRef.current;
      const cardWidth = cardElement.offsetWidth + 20; // Include gap
      const scrollPosition = currentIndex * cardWidth;
      
      // Ensure we don't scroll beyond the available content
      const maxScroll = container.scrollWidth - container.clientWidth;
      const finalScrollPosition = Math.min(scrollPosition, maxScroll);
      
      container.scrollTo({
        left: finalScrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / products.length;
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(Math.max(newIndex, 0), products.length - 1));
    }
  };

  const scrollToProduct = (index: number) => {
    setCurrentIndex(index);
  };

  // Ensure scroll container width accommodates all cards
  useEffect(() => {
    if (scrollContainerRef.current && products.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = 340; // Width of each card
      const gap = 20; // Gap between cards
      const totalWidth = (cardWidth + gap) * products.length + 64; // 64px for padding
      
      // Set minimum width to ensure all cards are accessible
      container.style.minWidth = `${Math.max(totalWidth, window.innerWidth)}px`;
    }
  }, [products.length]);

  return (
    <div className={styles.container}>
      <div className={styles.productGrid}>
        <div 
          ref={scrollContainerRef}
          className={styles.scrollContainer}
          onScroll={handleScroll}
        >
          {products.map((product, idx) => {
            const isHovered = idx === hoveredCardIndex || idx === hoveredLineIndex;
            return (
              <div
                key={product.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onMouseEnter={() => setHoveredCardIndex(idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                style={{
                  zIndex: isHovered ? 2 : 1,
                  transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)',
                  transform: isHovered ? 'translateY(-16px)' : 'translateY(0)'
                }}
              >
                <StashProductCard
                  product={product}
                  onRemove={() => removeFromStash(product.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
      {products.length > 1 && (
        <div className={styles.navigation}>
          <div className={styles.productCount}>
            {currentIndex + 1}/{products.length}
          </div>
          <div className={styles.lineContainer}>
            {products.map((_, index) => {
              const isHovered = index === hoveredCardIndex || index === hoveredLineIndex;
              const isActive = index === currentIndex;
              return (
                <div
                  key={index}
                  className={`${styles.line} ${isActive ? styles.activeLine : ''}`}
                  style={{
                    transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)',
                    transform: isHovered ? 'translateY(-12px)' : 'translateY(0)'
                  }}
                  onClick={() => scrollToProduct(index)}
                  onMouseEnter={() => setHoveredLineIndex(index)}
                  onMouseLeave={() => setHoveredLineIndex(null)}
                  onMouseDown={e => e.preventDefault()}
                />
              );
            })}
          </div>
        </div>
      )}
      {products.length === 1 && (
        <div className={styles.navigation}>
          <div className={styles.productCount}>
            1/1
          </div>
        </div>
      )}
    </div>
  );
};

export default StashProductGrid; 