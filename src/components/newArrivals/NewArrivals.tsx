import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styles from './newArrivals.module.css';

import { useProductContext } from '../../context/ProductContext';
import { getBrandUrl } from '../../utils/brandUtils';
import { useApolloClient, gql } from '@apollo/client';

interface Card {
  id: number;
  images: string[];
  href: string;
}

const BRAND_CONFIGS = [
  // Watches
  { id: 1, brand: 'CARL F BUCHERER', displayName: 'Carl F Bucherer', category: 'watches', pagePrefix: '/watch' },
  { id: 2, brand: 'Dunhill', displayName: 'Dunhill', category: 'perfume', pagePrefix: '/perfume' },
  // Apparel
  { id: 3, brand: 'Billionaire Boys Club', displayName: 'Billionaire Boys Club', category: 'apparel', pagePrefix: '/apparel' },
  { id: 4, brand: 'Bape', displayName: 'Bape', category: 'apparel', pagePrefix: '/apparel' },
  // Sneakers / Perfumes (choose available data)
  { id: 5, brand: 'NIKE', displayName: 'Nike', category: 'sneakers', pagePrefix: '/sneaker' },
  { id: 6, brand: 'Louis Vuitton', displayName: 'Louis Vuitton', category: 'perfume', pagePrefix: '/perfume' },
] as const;

// Maximum number of images (and progress bars) to display per card
const MAX_IMAGES = 3;

const NewArrivals: React.FC = () => {
  const router = useRouter();
  const { categoryData, loadCategoryData, isCategoryLoaded } = useProductContext();
  const apolloClient = useApolloClient();

  const [brandImageMap, setBrandImageMap] = useState<Record<number, string[]>>({});

  // Ensure categories are loaded (non-blocking)
  useEffect(() => {
    const neededCategories = new Set(BRAND_CONFIGS.map(cfg => {
      switch (cfg.category) {
        case 'sneakers':
          return 'sneakers';
        case 'watches':
          return 'watches';
        case 'perfume':
          return 'perfumes';
        default:
          return cfg.category;
      }
    }));

    neededCategories.forEach(cat => {
      if (!isCategoryLoaded(cat)) {
        loadCategoryData(cat);
      }
    });
  }, [isCategoryLoaded, loadCategoryData]);

  // Fetch extra images if we didn't get enough from preload (e.g., watches with pagination)
  useEffect(() => {
    async function fetchMissing() {
      const promises = BRAND_CONFIGS.map(async cfg => {
        const ctxKey = cfg.category === 'perfume' ? 'perfumes' : cfg.category;
        const existing = (categoryData as any)[ctxKey] || [];
        const preImgs = existing
          .filter((it: any) => it.brand?.toLowerCase() === cfg.brand.toLowerCase() && it.images?.length)
          .slice(0, MAX_IMAGES)
          .map((it: any) => it.images[0]);
        if (preImgs.length >= MAX_IMAGES) {
          setBrandImageMap(prev => ({ ...prev, [cfg.id]: preImgs }));
          return;
        }

        // Build query per category
        const QUERY_MAP: Record<string, any> = {
          watches: gql`query BrandWatches($brand:String!, $limit:Int){ watches(brand:$brand, limit:$limit){ images } }`,
          apparel: gql`query BrandApparel($brand:String!, $limit:Int){ apparel(brand:$brand, limit:$limit){ images } }`,
          sneakers: gql`query BrandSneakers($brand:String!, $limit:Int){ sneakers(brand:$brand, limit:$limit){ images } }`,
          perfumes: gql`query BrandPerfumes($brand:String!, $limit:Int){ perfumes(brand:$brand, limit:$limit){ images } }`,
        };
        const categoryKey = cfg.category === 'perfume' ? 'perfumes' : cfg.category;
        const query = QUERY_MAP[categoryKey];
        if (!query) return;
        try {
          const res = await apolloClient.query({ query, variables: { brand: cfg.brand, limit: 10 } });
          const list = res.data?.[categoryKey] || [];
          const imgs: string[] = [];
          for (const item of list) {
            const img = item.images?.[0];
            if (img) imgs.push(img);
            if (imgs.length === MAX_IMAGES) break;
          }
          if (imgs.length) {
            setBrandImageMap(prev => ({ ...prev, [cfg.id]: imgs.slice(0, MAX_IMAGES) }));
          }
        } catch(e) {
          console.error('Error fetching brand images', cfg.brand, e);
        }
      });
      await Promise.all(promises);
    }
    fetchMissing();
  }, [apolloClient, categoryData]);

  // Build cards dynamically from loaded data
  const cards: Card[] = useMemo((): Card[] => {
    return BRAND_CONFIGS.map<Card>(cfg => {
      // Map category key for context
      const ctxKey = cfg.category === 'perfume' ? 'perfumes' : cfg.category; // plural alignment
      const items: any[] = (categoryData as any)[ctxKey] || [];

      // Filter by brand (case-insensitive) & with images
      const brandItems = items.filter(item => item.brand && item.images && item.images.length && item.brand.toLowerCase() === cfg.brand.toLowerCase());

      // Helper to detect obviously invalid / placeholder image URLs
      const isValidImage = (url: string): boolean => {
        if (!url) return false;
        const lowered = url.toLowerCase();
        // Skip empty, svg placeholders, or filenames containing common placeholder keywords
        if (lowered.endsWith('.svg') || lowered.includes('placeholder') || lowered.includes('no_image') || lowered.includes('noimage') || lowered.includes('nophoto')) return false;
        return true;
      };

      // Gather up to 4 distinct product images; especially for watches, skip any invalid images
      const images: string[] = [];

      // Prefer images fetched via brandImageMap
      if (brandImageMap[cfg.id]?.length) {
        images.push(...brandImageMap[cfg.id]);
      }

      if (images.length < MAX_IMAGES) {
        for (const item of brandItems) {
          const firstImg = item.images?.[0];
          if (firstImg && isValidImage(firstImg) && !images.includes(firstImg)) {
            images.push(firstImg);
          }
          if (images.length === MAX_IMAGES) break;
        }
      }

      while (images.length < MAX_IMAGES) {
        images.push('/static.jpg'); // fallback placeholder
      }

      return {
        id: cfg.id,
        images,
        href: `${cfg.pagePrefix}/brand/${getBrandUrl(cfg.displayName)}`
      } as Card;
    });
  }, [categoryData, brandImageMap]);

  // Animation state
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [progressBars, setProgressBars] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialImageIndex: { [key: number]: number } = {};
    const initialProgress: { [key: number]: number } = {};

    cards.forEach(card => {
      initialImageIndex[card.id] = 0;
      initialProgress[card.id] = 0;
    });

    setCurrentImageIndex(initialImageIndex);
    setProgressBars(initialProgress);
  }, [cards]);

  useEffect(() => {
    const cardIds = cards.map(card => card.id);
    const imageIntervals: { [key: number]: NodeJS.Timeout } = {};
    const progressIntervals: { [key: number]: NodeJS.Timeout } = {};

    cardIds.forEach((id) => {
      let progress = 0;

      progressIntervals[id] = setInterval(() => {
        setProgressBars(prev => {
          const newProgress = { ...prev };
          if (progress < 100) {
            progress += 1;
            newProgress[id] = progress;
          }
          return newProgress;
        });
      }, 30);

      imageIntervals[id] = setInterval(() => {
        setCurrentImageIndex(prev => {
          const newIndex = { ...prev };
          newIndex[id] = ((prev[id] ?? 0) + 1) % (cards.find(c => c.id === id)?.images.length || 1);
          return newIndex;
        });

        progress = 0;
        setProgressBars(prev => ({
          ...prev,
          [id]: 0,
        }));
      }, 3000);
    });

    return () => {
      Object.values(imageIntervals).forEach(clearInterval);
      Object.values(progressIntervals).forEach(clearInterval);
    };
  }, [cards]);

  return (
    <div className={styles.newArrivals}>
      <h1 className={styles.newArrivals__title}>NEW ARRIVALS</h1>
      <div className={styles.newArrivals__grid}>
        {cards.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.card__imageContainer}>
              <div className={styles.card__progressBars}>
                {card.images.map((_, barIndex) => (
                  <div key={barIndex} className={styles.progressBar}>
                    <div 
                      className={`${styles.progressBar__fill} ${
                        barIndex < (currentImageIndex[card.id] || 0)
                          ? styles.completed
                          : barIndex === (currentImageIndex[card.id] || 0)
                          ? styles.active
                          : ''
                      }`}
                      style={{
                        width:
                          barIndex === (currentImageIndex[card.id] || 0)
                            ? `${progressBars[card.id] || 0}%`
                            : barIndex < (currentImageIndex[card.id] || 0)
                            ? '100%'
                            : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.card__images}>
        {card.images.map((image, index) => {
  const isActive = index === (currentImageIndex[card.id] || 0);
  const wasPrev =
    index === ((currentImageIndex[card.id] || 0) - 1 + card.images.length) % card.images.length;

  return (
    <div
      key={index}
      className={`${styles.card__image} ${
        isActive ? styles.active : wasPrev ? styles['fade-out'] : ''
      }`}
    >
      <img src={image} alt={`Card ${card.id} Image ${index + 1}`} />
    </div>
  );
})}

              </div>

              <div className={styles.card__quickView}>
                <button
                  className={styles.quickViewBtn}
                  onClick={() => router.push(card.href)}
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
