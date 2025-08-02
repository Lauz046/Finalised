import React from 'react';
import Link from 'next/link';
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

const UniversalProductGrid: React.FC<UniversalProductGridProps> = ({ 
  products, 
  category, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.skeleton}>
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

  const getProductName = (product: Product): string => {
    return product.productName || product.name || product.title || 'Unknown Product';
  };

  const getProductPrice = (product: Product): number => {
    return product.price || product.salePrice || 
           (product.sizePrices && product.sizePrices[0]?.price) || 
           (product.variants && product.variants[0]?.price) || 0;
  };

  const getProductLink = (product: Product): string => {
    return product.productLink || product.url || product.link || '#';
  };

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <Link 
          key={product.id} 
          href={`/${category}/${product.id}`}
          className={styles.productCard}
        >
          <div className={styles.imageContainer}>
            <img 
              src={product.images[0] || '/placeholder.jpg'} 
              alt={getProductName(product)}
              className={styles.productImage}
              loading="lazy"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.brand}>{product.brand}</div>
            <div className={styles.name}>{getProductName(product)}</div>
            <div className={styles.price}>
              ₹{getProductPrice(product).toLocaleString()}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UniversalProductGrid; 