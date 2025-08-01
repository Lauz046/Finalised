import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './StashProductCard.module.css';

interface StashProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  productType: string;
}

interface StashProductCardProps {
  product: StashProduct;
  onRemove: () => void;
}

const StashProductCard: React.FC<StashProductCardProps> = ({ product, onRemove }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${product.productType}/${product.id}`);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            width={340}
            height={240}
            className={styles.productImage}
            style={{ zIndex: 2, position: 'relative' }}
          />
          <div className={styles.stashCardOverlay} style={{ zIndex: 1, position: 'absolute' }}>
            <Image
              src="/restof/Stash Card.svg"
              alt="Stash Card"
              width={340}
              height={240}
              className={styles.stashCardSvg}
            />
          </div>
        </div>
        <div className={styles.productInfo}>
          <div className={styles.goldLine} />
          <div className={styles.infoText}>
            <div className={styles.brand}>{product.brand}</div>
            <div className={styles.name}>{product.name}</div>
          </div>
        </div>
        <button 
          className={styles.closeButton}
          onClick={handleRemove}
          aria-label="Remove from stash"
        >
          <Image
            src="/restof/Stash card cancel icon.svg"
            alt="Remove"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default StashProductCard; 