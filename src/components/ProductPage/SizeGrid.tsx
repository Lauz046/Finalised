import React, { useState, useEffect } from 'react';
import styles from './SizeGrid.module.css';

export interface SizePrice {
  size: string;
  price: number;
  seller: string;
}

export const SizeGrid: React.FC<{ 
  sizes: SizePrice[]; 
  onSelect: (size: SizePrice | null) => void; 
  selectedSize: SizePrice | null;
  onMobileSizeClick?: () => void;
  onMobileSizeChartClick?: () => void;
}> = ({ sizes, onSelect, selectedSize, onMobileSizeClick, onMobileSizeChartClick }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mobile size selector button
  if (isMobile) {
    return (
      <div className={styles.mobileSection}>
        <div className={styles.mobileHeader}>
          <span className={styles.mobileLabel}>Select Your Size</span>
          <button 
            className={styles.sizeChartBtn} 
            onClick={onMobileSizeChartClick}
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
        <button className={styles.mobileSizeSelector} onClick={onMobileSizeClick}>
          {selectedSize ? `${selectedSize.size} - ₹${selectedSize.price.toLocaleString()}` : 'Select Size'}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    );
  }

  // Desktop size grid
  return (
    <div className={styles.section}>
      <button className={styles.headerRow} onClick={() => setOpen(o => !o)}>
        <div className={styles.header}>Size and Conversations:</div>
        <span className={open ? styles.arrowOpen : styles.arrowClosed}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.arrowSvg}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
        {open ? (
          <div className={styles.all}>
            {selectedSize ? selectedSize.size : 'All'}
          </div>
        ) : (
          <div className={styles.all}>
            {selectedSize ? selectedSize.size : 'All'}
          </div>
        )}
      </button>
      {open && (
        <div className={styles.grid}>
          {sizes.map((sp) => (
            <button
              key={sp.size}
              onClick={() => onSelect(selectedSize?.size === sp.size ? null : sp)}
              className={sp.size === selectedSize?.size ? styles.selected : styles.sizeBtn}
            >
              <span className={sp.size === selectedSize?.size ? styles.selectedContent : styles.size}>{sp.size}</span>
              <span className={sp.size === selectedSize?.size ? styles.selectedContent : styles.price}>₹{sp.price}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 