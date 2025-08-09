import React, { useState } from 'react';
import { ProductDescription } from './ProductDescription';
import { useProductDescription, formatDescription } from '../../utils/productDescriptionUtils';
import styles from './ProductDetailDescription.module.css';

interface ProductDetailDescriptionProps {
  productLink: string;
  productName?: string;
  brand?: string;
  category?: string;
  showFeatures?: boolean;
}

export const ProductDetailDescription: React.FC<ProductDetailDescriptionProps> = ({
  productLink,
  productName,
  brand,
  category,
  showFeatures = true
}) => {
  const { description, loading, error } = useProductDescription(productLink, productName, brand);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleReadMore = () => {
    setShowFullDescription(true);
  };

  const handleReadLess = () => {
    setShowFullDescription(false);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Product Description</h3>
          <div className={styles.skeleton}>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine} style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Product Description</h3>
          <p className={styles.errorMessage}>
            Unable to load product description at this time. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const formattedDescription = description ? formatDescription(description.description) : '';
  const isLongDescription = formattedDescription.length > 300;

  return (
    <div className={styles.container}>
      {/* Main Description Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Product Description</h3>
        {description ? (
          <div className={styles.descriptionContent}>
            <p className={styles.descriptionText}>
              {showFullDescription ? formattedDescription : formattedDescription.substring(0, 300)}
              {!showFullDescription && isLongDescription && '...'}
            </p>
            {isLongDescription && (
              <button
                className={styles.readMoreButton}
                onClick={showFullDescription ? handleReadLess : handleReadMore}
              >
                {showFullDescription ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        ) : (
          <p className={styles.fallbackDescription}>
            Experience the premium quality and craftsmanship of this {brand || 'luxury'} product. 
            Designed with attention to detail and made from the finest materials, this piece 
            represents the perfect blend of style and functionality.
          </p>
        )}
      </div>

      {/* Product Features Section */}
      {showFeatures && description && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Key Features</h3>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>✓</span>
              Premium quality materials and construction
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>✓</span>
              Sophisticated design and attention to detail
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>✓</span>
              Perfect blend of style and functionality
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>✓</span>
              Crafted for the discerning individual
            </li>
          </ul>
        </div>
      )}

      {/* Brand Information */}
      {brand && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>About {brand}</h3>
          <p className={styles.brandDescription}>
            {brand} represents the pinnacle of luxury and craftsmanship, creating products 
            that combine timeless elegance with contemporary design. Each piece is carefully 
            crafted to meet the highest standards of quality and style.
          </p>
        </div>
      )}
    </div>
  );
}; 