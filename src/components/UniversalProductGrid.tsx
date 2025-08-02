import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './UniversalProductGrid.module.css';

interface Product {
  id: string;
  brand: string;
  productName?: string;
  name?: string;
  title?: string;
  images: string[];
  price?: number;
  salePrice?: number;
  sizePrices?: Array<{ size: string; price: number }>;
  variants?: Array<{ price: number }>;
  productLink?: string;
  url?: string;
  link?: string;
}

interface UniversalProductGridProps {
  products: Product[];
  category: string;
  loading?: boolean;
}

// Utility function to limit product names - 5 words for desktop, 4 for mobile (no ellipsis)
const truncateProductName = (name: string, isMobile: boolean = false): string => {
  const words = name.split(' ');
  const maxWords = isMobile ? 4 : 5;
  return words.slice(0, maxWords).join(' ');
};

const UniversalProductGrid: React.FC<UniversalProductGridProps> = ({ 
  products, 
  category, 
  loading = false 
}) => {
  // Format price with proper currency
  const formatPrice = (price: number) => {
    return `Rs. ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  const getProductName = (product: Product): string => {
    return product.productName || product.name || product.title || 'Unknown Product';
  };

  const getProductPrice = (product: Product): number => {
    // Check for direct price first
    if (product.price && product.price > 0) return product.price;
    if (product.salePrice && product.salePrice > 0) return product.salePrice;
    
    // Check for sizePrices (get the first available price)
    if (product.sizePrices && product.sizePrices.length > 0) {
      const firstPrice = product.sizePrices[0]?.price;
      if (firstPrice && firstPrice > 0) return firstPrice;
    }
    
    // Check for variants
    if (product.variants && product.variants.length > 0) {
      const firstVariantPrice = product.variants[0]?.price;
      if (firstVariantPrice && firstVariantPrice > 0) return firstVariantPrice;
    }
    
    return 0;
  };

  const getProductLink = (product: Product): string => {
    return product.productLink || product.url || product.link || `/${category}/${product.id}`;
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
              <div className={styles.skeletonPrice} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => {
        const productName = getProductName(product);
        const productPrice = getProductPrice(product);
        const productLink = getProductLink(product);
        
        return (
          <Link 
            key={product.id} 
            href={productLink}
            className={styles.card}
          >
            <div className={styles.imageContainer}>
              <Image
                src={product.images[0] || '/nav/plutus logo.svg'}
                alt={productName}
                width={300}
                height={300}
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
              <div className={styles.name} title={productName}>
                {truncateProductName(productName)}
              </div>
              <div className={styles.price}>
                {productPrice > 0 ? formatPrice(productPrice) : 'Price on request'}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default UniversalProductGrid; 