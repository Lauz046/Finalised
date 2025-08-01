import React from 'react';
import styles from './ProductDescription.module.css';

export const ProductDescription: React.FC<{ description: string }> = ({ description }) => (
  <div className={styles.container}>
    <div className={styles.header}>Product Description</div>
    <p className={styles.text}>{description}</p>
  </div>
); 