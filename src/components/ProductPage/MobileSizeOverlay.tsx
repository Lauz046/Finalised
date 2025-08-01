import React from 'react';
import styles from './MobileSizeOverlay.module.css';
import { SizePrice } from './SizeGrid';

interface MobileSizeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  sizes: SizePrice[];
  selectedSize: SizePrice | null;
  onSelect: (size: SizePrice | null) => void;
  onSizeChartClick: () => void;
}

export const MobileSizeOverlay: React.FC<MobileSizeOverlayProps> = ({
  isOpen,
  onClose,
  sizes,
  selectedSize,
  onSelect,
  onSizeChartClick
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.closeIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className={styles.header}>
          <h3 className={styles.title}>Select Your Size</h3>
          <button 
            className={styles.sizeChartBtn} 
            onClick={onSizeChartClick}
            style={{
              background: 'none',
              border: 'none',
              color: '#22304a',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'Montserrat',
              padding: '12px 0',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            Size Chart
          </button>
        </div>

        <div className={styles.sizeGrid}>
          {sizes.map((size) => (
            <button
              key={size.size}
              onClick={() => onSelect(selectedSize?.size === size.size ? null : size)}
              className={`${styles.sizeButton} ${size.size === selectedSize?.size ? styles.selected : ''}`}
            >
              <span className={styles.sizeText}>{size.size}</span>
              <span className={styles.priceText}>₹{size.price.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 