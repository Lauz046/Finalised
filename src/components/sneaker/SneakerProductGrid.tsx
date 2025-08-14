import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SneakerProductGrid.module.css';

interface Product {
  id: string;
  brand: string;
  productName: string;
  images: string[];
  price: number;
}

interface SneakerProductGridProps {
  products: Product[];
  loading?: boolean;
  mobile?: boolean;
}

// Helper function to truncate product names and remove brand name from beginning
const truncateProductName = (name: string, isMobile: boolean = false, brand?: string): string => {
  if (!name) return '';
  
  // Remove brand name from the beginning of product name
  let cleanName = name;
  if (brand && name.toLowerCase().startsWith(brand.toLowerCase())) {
    cleanName = name.substring(brand.length).trim();
    // Remove any leading punctuation or spaces
    cleanName = cleanName.replace(/^[\s\-_.,]+/, '');
  }
  
  // Limit to 5 words on desktop, 4 words on mobile
  const words = cleanName.split(' ');
  const maxWords = isMobile ? 4 : 5;
  if (words.length <= maxWords) return cleanName;
  return words.slice(0, maxWords).join(' ');
};

const SneakerProductGrid: React.FC<SneakerProductGridProps> = ({ products, loading = false, mobile = false }) => {
  // Format price with proper currency
  const formatPrice = (price: number) => {
    return `Rs. ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonBrand} />
              <div className={styles.skeletonName} />
              {!mobile && <div className={styles.skeletonPrice} />}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <Link href={`/sneaker/${product.id}`} key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={product.images[0] || '/nav/Plutus logo blue.svg'}
              alt={product.productName}
              width={300}
              height={300}
              className={styles.image}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/nav/Plutus logo blue.svg';
              }}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.brand}>{product.brand}</div>
            <div className={styles.name} title={product.productName}>
              {truncateProductName(product.productName, mobile, product.brand)}
            </div>
            <div className={styles.priceRow}>
              <span className={styles.startingFrom}>Starting from</span>
              <span className={styles.price}>{formatPrice(product.price)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SneakerProductGrid;