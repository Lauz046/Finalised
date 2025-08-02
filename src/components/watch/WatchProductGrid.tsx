import React from 'react';
import styles from './WatchProductGrid.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface WatchProduct {
  id: string;
  brand: string;
  name: string;
  salePrice: number;
  marketPrice: string;
  images: string[];
}

interface WatchProductGridProps {
  products: WatchProduct[];
  loading?: boolean;
  mobile?: boolean;
}

// Format price with proper currency
const formatPrice = (price: number) => {
  if (price <= 0) return '-';
  return `Rs. ${new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)}`;
};

// Limit product name - 4 words for both desktop and mobile (no ellipsis)
const truncateProductName = (name: string) => {
  if (!name) return '';
  const words = name.split(' ');
  return words.slice(0, 4).join(' ');
};

const WatchProductGrid: React.FC<WatchProductGridProps> = ({ products, loading = false, mobile = false }) => {
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
        console.log('Watch product:', product);
        return (
          <Link href={`/watch/${product.id}`} key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={product.images[0] || '/blue_nav_icons/Blue PLUTUS LOGO.svg'}
                alt={product.name}
                width={300}
                height={300}
                className={styles.image}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/blue_nav_icons/Blue PLUTUS LOGO.svg';
                }}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.brand}>{product.brand}</div>
              <div className={styles.name} title={product.name}>
                {truncateProductName(product.name)}
              </div>
              <div className={styles.price}>{formatPrice(product.salePrice)}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default WatchProductGrid;