import React from 'react';
import styles from './ProductDescription.module.css';
import { useProductDescription, formatDescription, truncateDescription, createDynamicDescription } from '../../utils/productDescriptionUtils';

interface ProductDescriptionProps {
  productLink: string;
  productName?: string;
  brand?: string;
  category?: string;
  showFull?: boolean;
  maxLength?: number;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  productLink,
  productName,
  brand,
  category,
  showFull = false,
  maxLength = 200 // Reduced from default to 200 characters
}) => {
  const { description: productDescription, loading, error } = useProductDescription(productLink, productName, brand);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>Product Description</div>
        <div className={styles.skeleton}>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>Product Description</div>
        <p className={styles.error}>Unable to load product description at this time.</p>
      </div>
    );
  }

  if (!productDescription) {
    // Use dynamic description when no description is found in the JSON
    const dynamicDescription = productName && brand
      ? createDynamicDescription(productName, brand, category)
      : `Experience the premium quality and craftsmanship of this ${brand || 'luxury'} ${productName || 'product'}.
         Expertly designed with meticulous attention to detail and crafted from the finest materials, this piece
         represents the perfect fusion of contemporary style, exceptional functionality, and enduring quality.
         Each element has been carefully considered to deliver an unparalleled luxury experience that exceeds expectations.`;

    const displayText = showFull ? dynamicDescription : truncateDescription(dynamicDescription, maxLength);

    return (
      <div className={`${styles.container} product-description`}>
        <div className={styles.header}>Product Description</div>
        {productName && (
          <div className={styles.productName}>{productName}</div>
        )}
        <p className={styles.text}>{displayText}</p>
        {!showFull && dynamicDescription.length > maxLength && (
          <button
            className={styles.readMore}
            onClick={() => {
              // This would typically trigger a modal or expand the description
              console.log('Show full description');
            }}
          >
            Read More
          </button>
        )}
      </div>
    );
  }

  const formattedDescription = formatDescription(productDescription.description);
  const displayText = showFull ? formattedDescription : truncateDescription(formattedDescription, maxLength);

  return (
    <div className={`${styles.container} product-description`}>
      <div className={styles.header}>Product Description</div>
      {productName && (
        <div className={styles.productName}>{productName}</div>
      )}
      <p className={styles.text}>{displayText}</p>
      {!showFull && formattedDescription.length > maxLength && (
        <button
          className={styles.readMore}
          onClick={() => {
            // This would typically trigger a modal or expand the description
            console.log('Show full description');
          }}
        >
          Read More
        </button>
      )}
    </div>
  );
}; 