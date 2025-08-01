import React, { useState } from 'react';
import styles from './SneakerFilterSidebar.module.css';

interface SneakerFilterSidebarProps {
  show: boolean;
  onHide: () => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  priceRange: [number, number];
  minPrice: number;
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  sizes: string[];
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
  inStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
}

const SneakerFilterSidebar: React.FC<SneakerFilterSidebarProps> = ({
  show,
  onHide,
  sortBy,
  onSortByChange,
  priceRange,
  minPrice,
  maxPrice,
  onPriceChange,
  brands,
  selectedBrands,
  onBrandChange,
  sizes,
  selectedSizes,
  onSizeChange,
  inStockOnly,
  onInStockChange,
}) => {
  const [sizeExpanded, setSizeExpanded] = useState(true);
  const [brandExpanded, setBrandExpanded] = useState(true);

  return (
    <aside className={show ? styles.sidebar : styles.sidebarHidden}>
      <div className={styles.heading}>Sort & Filter</div>
      <div className={styles.divider}></div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Sort by</div>
        <div className={styles.sortOptions}>
          {['New In', 'Trending', 'Price low to high', 'Price high to low'].map(option => (
            <label key={option} className={styles.checkboxLabel}>
              <input
                type="radio"
                name="sortBy"
                value={option}
                checked={sortBy === option}
                onChange={() => onSortByChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>In Stock only</div>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => onInStockChange(e.target.checked)}
          />
          <span className={styles.switchSlider}></span>
        </label>
      </div>
      <div className={styles.section}>
        <div
          className={styles.sectionTitle}
          style={{ cursor: 'pointer' }}
          onClick={() => setSizeExpanded((prev) => !prev)}
        >
          Size
          <span style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center' }}>
            {sizeExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            )}
          </span>
        </div>
        {sizeExpanded && (
          <div className={styles.sizeOptions}>
            {sizes.map(size => (
              <label key={size} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => onSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className={styles.section}>
        <div
          className={styles.sectionTitle}
          style={{ cursor: 'pointer' }}
          onClick={() => setBrandExpanded((prev) => !prev)}
        >
          Brands/Category
          <span style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center' }}>
            {brandExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            )}
          </span>
        </div>
        {brandExpanded && (
          <div className={styles.brandOptions}>
            {brands.map(brand => (
              <label key={brand} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandChange(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default SneakerFilterSidebar; 