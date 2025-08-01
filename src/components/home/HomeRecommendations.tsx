import React, { useMemo } from 'react';
import Link from 'next/link';
import styles from '../ProductPage/Recommendations.module.css';
import { useProductContext } from '@/context/ProductContext';

interface HomeRecItem {
  id: string;
  image: string;
  name: string;
  brand: string;
  href: string;
}

const HomeRecommendations: React.FC = () => {
  const { allProducts } = useProductContext();

  // Build a mixed list of products across categories (max 12)
  const recs: HomeRecItem[] = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];

    // Ensure we have at least some variety – take first few items of each category
    const categories = ['sneakers', 'apparel', 'watches', 'perfumes', 'accessories'];
    const selected: HomeRecItem[] = [];

    // Helper to detect obviously invalid / placeholder image URLs
    const isValidImage = (url: string | undefined): boolean => {
      if (!url) return false;
      const lowered = url.toLowerCase();
      if (
        lowered.endsWith('.svg') ||
        lowered.includes('placeholder') ||
        lowered.includes('no_image') ||
        lowered.includes('noimage') ||
        lowered.includes('nophoto')
      ) {
        return false;
      }
      return true;
    };

    categories.forEach(cat => {
      // Get items of this category that have at least one valid image
      const catItems = allProducts.filter(
        p => p.type === cat && isValidImage(p.images?.[0])
      );

      if (catItems.length === 0) return;

      // Determine a start index around the middle of dataset
      const midIndex = Math.floor(catItems.length / 2);
      const startIndex = Math.max(0, midIndex - 2); // ensure at least 0
      const slice = catItems.slice(startIndex, startIndex + 4);

      slice.forEach(item => {
        selected.push({
          id: item.id,
          image: item.images?.[0] || '/static.jpg',
          name: (item.productName || item.title || item.name || '').slice(0, 50),
          brand: item.brand,
          href: `/${item.type}/${item.id}`,
        });
      });
    });

    // Limit total to 16
    return selected.slice(0, 16);
  }, [allProducts]);

  if (recs.length === 0) return null;

  return (
    <div className={styles.container} style={{ marginTop: '90px' }}>
      <div className={styles.header}>You May Also Like</div>
      <div className={styles.scrollRow}>
        {recs.map(rec => (
          <Link key={rec.id} href={rec.href} legacyBehavior>
            <a className={styles.card} style={{ textDecoration: 'none' }}>
              <div className={styles.imageWrapper}>
                {rec.image && rec.image.includes('luxurysouq.com') ? (
                  <img src={rec.image} alt={rec.name} className={styles.image} />
                ) : (
                  <img src="/blue_nav_icons/Blue PLUTUS LOGO.svg" alt="House of Plutus" style={{ width: 120, height: 120, objectFit: 'contain' }} />
                )}
              </div>
              <div className={styles.info}>
                <div className={styles.infoText}>
                  <div className={styles.brand}>{rec.brand}</div>
                  <div className={styles.name}>{rec.name}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeRecommendations; 