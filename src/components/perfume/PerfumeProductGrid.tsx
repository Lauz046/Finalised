import React from 'react';
import styles from './PerfumeProductGrid.module.css';
import Link from 'next/link';
import ProductGridSkeleton from '../ProductGridSkeleton';

interface PerfumeProduct {
  id: string;
  brand: string;
  title?: string;
  name?: string;
  fragranceFamily?: string;
  images: string[];
  variants?: { size?: string; price?: number }[];
  price?: number;
}

interface PerfumeProductGridProps {
  products: PerfumeProduct[];
  onProductClick?: (id: string) => void;
  mobile?: boolean;
  loading?: boolean;
}

function getLowestPrice(variants: { price?: number }[] | undefined): number | null {
  if (!Array.isArray(variants) || variants.length === 0) return null;
  let lowest: number | null = null;
  for (const v of variants) {
    const p = v.price;
    const priceNum = typeof p === 'string' ? parseFloat(p) : p;
    if (typeof priceNum === 'number' && !isNaN(priceNum) && (lowest === null || priceNum < lowest)) {
      lowest = priceNum;
    }
  }
  return lowest;
}

const PerfumeProductGrid: React.FC<PerfumeProductGridProps> = ({ products, onProductClick, mobile = false, loading = false }) => {
  // Format price with proper currency
  const formatPrice = (price: number) => {
    return `Rs. ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  // Limit product name to 5 words
  const truncateProductName = (name: string) => {
    if (!name) return '';
    const words = name.split(' ');
    if (words.length <= 5) return name;
    return words.slice(0, 5).join(' ') + '...';
  };

  if (loading) {
    return (
      <div className={mobile ? styles.gridMobile : styles.grid}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonBrand} />
              <div className={styles.skeletonName} />
              <div className={styles.skeletonPrice} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={mobile ? styles.gridMobile : styles.grid}>
      {products.map(product => {
        const price = product.variants ? getLowestPrice(product.variants) : (typeof product.price === 'number' ? product.price : null);
        return (
          <Link href={`/perfume/${product.id}`} key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={product.images?.[0] || '/nav/plutus logo.svg'}
                alt={product.title}
                className={styles.image}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/nav/plutus logo.svg';
                }}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.brand}>{product.brand}</div>
              <div className={styles.name} title={product.title || product.name}>
                {product.title ? truncateProductName(product.title) : (product.name ? truncateProductName(product.name) : '')}
              </div>
              <div className={styles.price}>{price !== null ? formatPrice(price) : '-'}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PerfumeProductGrid;