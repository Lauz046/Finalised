import React from 'react';
import styles from './ComparePrice.module.css';

export interface SellerPrice {
  sellerName: string;
  sellerLogo: string;
  price: number;
}

export const ComparePrice: React.FC<{
  sellerName?: string;
  sellerLogo?: string;
  productPageUrl?: string;
  price?: number;
  onClick?: () => void;
}> = ({ sellerName, sellerLogo, productPageUrl, price, onClick }) => {
  // Require minimal necessary props; productPageUrl is optional when onClick is provided
  if (!sellerName || !sellerLogo || price === undefined) return null;

  const PriceContent = (
    <>
      <span className={styles.priceText}>Rs. {price.toLocaleString()}</span>
      <img src="/compare price icon.svg" alt="Compare Price" className={styles.priceIcon} />
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>Compare Price</div>
      <div className={styles.sellerCard}>
        <div className={styles.sellerInfoWrap}>
          <img src={sellerLogo} alt={sellerName} className={styles.logo} />
          <div className={styles.sellerInfo}>
            <span className={styles.sellerName}>{sellerName}</span>
          </div>
        </div>
        {onClick ? (
          <button type="button" onClick={onClick} className={styles.priceBtn}>
            {PriceContent}
          </button>
        ) : (
          <a href={productPageUrl} target="_blank" rel="noopener noreferrer" className={styles.priceBtn}>
            {PriceContent}
          </a>
        )}
      </div>
    </div>
  );
}; 