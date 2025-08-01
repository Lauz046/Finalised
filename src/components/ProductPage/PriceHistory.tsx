import React from 'react';
import styles from './PriceHistory.module.css';

export const PriceHistory: React.FC = () => (
  <div className={styles.container}>
    <div>
      <div className={styles.header}>View Price History</div>
      <div className={styles.comingSoon}>Coming Soon</div>
    </div>
    <img src="/view price hisstory illustration.svg" alt="View Price History" className={styles.illustration} />
  </div>
); 