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
              <div className={styles.skeletonPrice} />
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
              src={product.images[0] || '/nav/plutus logo.svg'}
              alt={product.productName}
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
            <div className={styles.name} title={product.productName}>
              {product.productName}
            </div>
            <div className={styles.price}>{formatPrice(product.price)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SneakerProductGrid;