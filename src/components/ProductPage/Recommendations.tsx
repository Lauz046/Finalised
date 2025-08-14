import React from 'react';
import styles from './Recommendations.module.css';
import Link from 'next/link';
import { isViewableImage } from '../../utils/imageUtils';

export interface Recommendation {
  id: string;
  image: string;
  name: string;
  brand: string;
  price?: number;
}

// Helper function to limit text to 4 words for consistent info section and remove brand name
const limitProductName = (text: string, brand?: string): string => {
  if (!text) return '';
  
  // Remove brand name from the beginning of product name
  let cleanName = text;
  if (brand && text.toLowerCase().startsWith(brand.toLowerCase())) {
    cleanName = text.substring(brand.length).trim();
    // Remove any leading punctuation or spaces
    cleanName = cleanName.replace(/^[\s\-_.,]+/, '');
  }
  
  const words = cleanName.split(' ');
  if (words.length <= 4) return cleanName;
  return words.slice(0, 4).join(' ');
};

export const Recommendations: React.FC<{ products: Recommendation[]; currentBrand: string; productType: string }> = ({ products, currentBrand, productType }) => {
  // Filter products to only show those of the same brand as the current product
  const filtered = products.filter(p => p.brand === currentBrand);
  const fallback = products.filter(p => p.brand !== currentBrand);
  const show = filtered.length > 0 ? filtered : fallback;
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>You May Also Like</div>
      <div className={styles.scrollRow}>
        {show.length === 0 ? (
          <div style={{ color: '#888', fontSize: '1rem', padding: '32px' }}>No recommendations found.</div>
        ) : show.map((p) => (
          <Link href={`/${productType}/${p.id}`} key={p.id} className={styles.card} style={{ textDecoration: 'none' }}>
            <div className={styles.imageWrapper}>
              {isViewableImage(p.image) ? (
                <img src={p.image} alt={p.name} className={styles.image} />
              ) : (
                <img
                  src={p.image || "/blue_nav_icons/Blue PLUTUS LOGO.svg"}
                  alt={p.name || "House of Plutus"}
                  className={styles.image}
                  style={{ width: 120, height: 120, objectFit: 'contain' }}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/blue_nav_icons/Blue PLUTUS LOGO.svg";
                    target.style.width = `120px`;
                    target.style.height = `120px`;
                  }}
                />
              )}
            </div>
            <div className={styles.info}>
              <div className={styles.infoText}>
                <div className={styles.brand}>{p.brand}</div>
                <div className={styles.name}>{limitProductName(p.name, p.brand)}</div>
                {p.price && (
                  <div className={styles.priceRow}>
                    <span className={styles.startingFrom}>Starting from</span>
                    <span className={styles.price}>₹{p.price.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 