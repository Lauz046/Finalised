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

// Helper function to limit text to 6 words
const limitToSixWords = (text: string): string => {
  const words = text.split(' ');
  return words.slice(0, 6).join(' ');
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
          <Link href={`/${productType}/${p.id}`} key={p.id} legacyBehavior>
            <a className={styles.card} style={{ textDecoration: 'none' }}>
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
                  <div className={styles.name}>{limitToSixWords(p.name)}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}; 