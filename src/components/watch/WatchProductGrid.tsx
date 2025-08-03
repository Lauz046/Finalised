import React from 'react';
import styles from './WatchProductGrid.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface WatchProduct {
  id: string;
  brand: string;
  name: string;
  salePrice?: number | string | null;
  marketPrice?: string | number | null;
  images: string[];
}

interface WatchProductGridProps {
  products: WatchProduct[];
  loading?: boolean;
  mobile?: boolean;
}

// Calculate price from AED to INR with 10% markup
const calculatePrice = (aedPrice: number | null | undefined | string) => {
  let numericPrice: number;
  
  if (typeof aedPrice === 'string') {
    // Handle string format like "AED5,800.00"
    const match = aedPrice.match(/AED([\d,]+\.?\d*)/);
    if (match) {
      // Remove commas and convert to number
      numericPrice = parseFloat(match[1].replace(/,/g, ''));
    } else {
      // Try direct parsing if no AED prefix
      numericPrice = parseFloat(aedPrice.replace(/,/g, ''));
    }
  } else {
    numericPrice = aedPrice as number;
  }
  
  if (!numericPrice || numericPrice <= 0 || isNaN(numericPrice)) return 0;
  
  // Convert AED to INR and add 10% markup
  const aedToInrRate = 24; // Current approximate rate
  const basePrice = numericPrice * aedToInrRate;
  const markup = basePrice * 0.1; // 10% markup
  return basePrice + markup;
};

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
        console.log('=== WATCH PRODUCT DEBUG ===');
        console.log('Full product:', JSON.stringify(product, null, 2));
        console.log('Sale price:', product.salePrice, 'Type:', typeof product.salePrice, 'Is null:', product.salePrice === null, 'Is undefined:', product.salePrice === undefined);
        console.log('Market price:', product.marketPrice, 'Type:', typeof product.marketPrice);
        
        // Use salePrice if available, otherwise fall back to marketPrice
        const priceToUse = product.salePrice || product.marketPrice;
        const calculatedPrice = calculatePrice(priceToUse);
        console.log('Price to use:', priceToUse, 'Calculated price:', calculatedPrice);
        console.log('=== END DEBUG ===');
        return (
          <Link href={`/watch/${product.id}`} key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={product.images[0] || '/nav/Plutus logo blue.svg'}
                alt={product.name}
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
              <div className={styles.name} title={product.name}>
                {truncateProductName(product.name)}
              </div>
              <div className={styles.priceRow}>
                <span className={styles.startingFrom}>Starting from</span>
                <span className={styles.price}>{formatPrice(calculatedPrice)}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default WatchProductGrid;