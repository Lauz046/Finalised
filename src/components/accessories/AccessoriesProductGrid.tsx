import React from 'react';
import styles from './AccessoriesProductGrid.module.css';
import Link from 'next/link';

interface AccessoriesProduct {
  id: string;
  brand: string;
  productName: string;
  images: string[];
  price: number;
}

interface AccessoriesProductGridProps {
  products: AccessoriesProduct[];
  mobile?: boolean;
  loading?: boolean;
}

// Utility function to format price
const formatPrice = (price: number): string => {
  return `Rs. ${price.toLocaleString()}`;
};

// Utility function to truncate product name to 6 words
const truncateProductName = (name: string): string => {
  if (!name) return '';
  const words = name.split(' ');
  return words.slice(0, 6).join(' ') + (words.length > 6 ? '...' : '');
};

const AccessoriesProductGrid: React.FC<AccessoriesProductGridProps> = ({ products, loading = false, mobile = false }) => {
  if (loading) {
    return (
      <div className={mobile ? styles.gridMobile : styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonBrand}></div>
              <div className={styles.skeletonName}></div>
              <div className={styles.skeletonPrice}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={mobile ? styles.gridMobile : styles.grid}>
      {products.map(product => (
        <Link href={`/accessories/${product.id}`} key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={product.images[0] || '/nav/plutus logo.svg'}
              alt={product.productName}
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
            <div className={styles.name}>{truncateProductName(product.productName)}</div>
            <div className={styles.price}>{formatPrice(product.price)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AccessoriesProductGrid;