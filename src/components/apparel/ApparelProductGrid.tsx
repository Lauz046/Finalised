import React from 'react';
import styles from './ApparelProductGrid.module.css';
import Link from 'next/link';
import ProductGridSkeleton from '../ProductGridSkeleton';

interface ApparelProduct {
  id: string;
  brand: string;
  productName: string;
  images: string[];
  price: number;
}

interface ApparelProductGridProps {
  products: ApparelProduct[];
  onProductClick?: (id: string) => void;
  mobile?: boolean;
  loading?: boolean;
}

const ApparelProductGrid: React.FC<ApparelProductGridProps> = ({ products, onProductClick, mobile = false, loading = false }) => {
  // Format price with proper currency
  const formatPrice = (price: number) => {
    return `Rs. ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  // Limit product name to 6 words
  const truncateProductName = (name: string) => {
    const words = name.split(' ');
    if (words.length <= 6) return name;
    return words.slice(0, 6).join(' ') + '...';
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
      {products.map(product => (
        <Link href={`/apparel/${product.id}`} key={product.id} className={styles.card}>
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
            <div className={styles.name} title={product.productName}>
              {truncateProductName(product.productName)}
            </div>
            <div className={styles.price}>{formatPrice(product.price)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ApparelProductGrid;