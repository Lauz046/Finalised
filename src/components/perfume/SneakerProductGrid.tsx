import React from 'react';
import styles from './SneakerProductGrid.module.css';
import Link from 'next/link';

interface SneakerProduct {
  id: string;
  brand: string;
  productName: string;
  images: string[];
  price: number;
}

interface SneakerProductGridProps {
  products: SneakerProduct[];
  onProductClick?: (id: string) => void;
}

const SneakerProductGrid: React.FC<SneakerProductGridProps> = ({ products, onProductClick }) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <Link href={`/sneaker/${product.id}`} key={product.id} legacyBehavior>
          <a className={styles.card} onClick={() => onProductClick && onProductClick(product.id)}>
            <div className={styles.imageWrapper}>
              <img
                src={product.images[0]}
                alt={product.productName}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.infoText}>
                <div className={styles.brand}>{product.brand}</div>
                <div className={styles.name}>{product.productName}</div>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.startingFrom}>starting from</span>
                <span className={styles.price}>Rs {product.price.toLocaleString()}</span>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SneakerProductGrid; 