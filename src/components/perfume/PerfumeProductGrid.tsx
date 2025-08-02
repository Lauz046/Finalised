import React from 'react';
import Link from 'next/link';
import styles from './PerfumeProductGrid.module.css';

interface Product {
  id: string;
  brand: string;
  title: string;
  images: string[];
  variants?: Array<{ price: number }>;
  price?: number;
}

interface PerfumeProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  mobile?: boolean;
  loading?: boolean;
}

// Utility function to limit product names - 5 words for desktop, 4 for mobile (no ellipsis)
const truncateProductName = (name: string, isMobile: boolean = false): string => {
  const words = name.split(' ');
  const maxWords = isMobile ? 4 : 5;
  return words.slice(0, maxWords).join(' ');
};

const PerfumeProductGrid: React.FC<PerfumeProductGridProps> = ({ products, onProductClick, mobile = false, loading = false }) => {
  // Format price with proper currency
  const formatPrice = (price: number) => {
    return `Rs. ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  // Get lowest price from variants
  const getLowestPrice = (variants: Array<{ price: number }>) => {
    if (!variants || variants.length === 0) return null;
    return Math.min(...variants.map(v => v.price));
  };

  if (loading) {
    return (
      <div className={mobile ? styles.gridMobile : styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageContainer}>
              <div className={styles.skeletonImage} />
            </div>
            <div className={styles.content}>
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
              <div className={styles.name} title={product.title}>
                {truncateProductName(product.title || '', mobile)}
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