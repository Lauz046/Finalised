import React, { useState } from 'react';
import styles from './WatchMobileFilterOverlay.module.css';

interface WatchMobileFilterOverlayProps {
  show: boolean;
  onClose: () => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  colors: string[];
  selectedColors: string[];
  onColorChange: (color: string) => void;
  genders: string[];
  selectedGenders: string[];
  onGenderChange: (gender: string) => void;
  inStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
  tab: 'filter' | 'sort';
  setTab: React.Dispatch<React.SetStateAction<'filter' | 'sort'>>;
}

const WatchMobileFilterOverlay: React.FC<WatchMobileFilterOverlayProps> = ({
  show,
  onClose,
  sortBy,
  onSortByChange,
  brands,
  selectedBrands,
  onBrandChange,
  colors,
  selectedColors,
  onColorChange,
  genders,
  selectedGenders,
  onGenderChange,
  inStockOnly,
  onInStockChange,
  tab,
  setTab: _setTab,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    color: true,
    brands: true,
  });

  const toggleSection = (section: 'gender' | 'color' | 'brands') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Color circle component
  const ColorCircle = ({ color }: { color: string }) => {
    const getColorValue = (colorName: string) => {
      const colorMap: { [key: string]: string } = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Silver': '#C0C0C0',
        'Gold': '#FFD700',
        'Rose Gold': '#B76E79',
        'Blue': '#0000FF',
        'Green': '#008000',
        'Red': '#FF0000',
        'Brown': '#A52A2A',
        'Grey': '#808080',
        'Yellow': '#FFFF00',
        'Purple': '#800080',
        'Orange': '#FFA500',
        'Pink': '#FFC0CB',
        'Navy': '#000080',
        'Beige': '#F5F5DC',
        'Cream': '#FFFDD0',
        'Tan': '#D2B48C',
        'Olive': '#808000',
        'Maroon': '#800000',
      };
      return colorMap[colorName] || '#CCCCCC';
    };

    return (
      <div 
        className={styles.colorCircle}
        style={{ 
          backgroundColor: getColorValue(color),
          border: color === 'White' ? '1px solid #ddd' : 'none',
        }} 
      />
    );
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.panel}>
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" style={{ width: 32, height: 32 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
        

        
        <div className={styles.body}>
          {tab === 'filter' ? (
            <>
              {/* Gender Section */}
              <div className={styles.section}>
                <div className={styles.sectionTitleRow} onClick={() => toggleSection('gender')} style={{ cursor: 'pointer' }}>
                  <span className={styles.sectionTitle}>Shop by Gender</span>
                  <span className={styles.sectionArrow} style={{ transform: expandedSections.gender ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.gender && (
                  <div className={styles.sectionContent}>
                    {genders.map(gender => (
                      <label key={gender} className={styles.checkboxLabel}>
                        <input 
                          type="checkbox" 
                          checked={selectedGenders.includes(gender)}
                          onChange={() => onGenderChange(gender)}
                        /> 
                        {gender}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.divider}></div>
              
              {/* Color Section */}
              <div className={styles.section}>
                <div className={styles.sectionTitleRow} onClick={() => toggleSection('color')} style={{ cursor: 'pointer' }}>
                  <span className={styles.sectionTitle}>Colour</span>
                  <span className={styles.sectionArrow} style={{ transform: expandedSections.color ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.color && (
                  <div className={styles.colorScroll}>
                    {colors.map(color => (
                      <label key={color} className={styles.checkboxLabel}>
                        <input 
                          type="checkbox" 
                          checked={selectedColors.includes(color)}
                          onChange={() => onColorChange(color)}
                        />
                        <ColorCircle color={color} />
                        {color}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.divider}></div>
              
              {/* In Stock Section */}
              <div className={styles.section}>
                <div className={styles.sectionTitleRow}>
                  <span className={styles.sectionTitle}>In stock only</span>
                </div>
                <label className={styles.switchLabel}>
                  <input 
                    type="checkbox" 
                    checked={inStockOnly}
                    onChange={() => onInStockChange(!inStockOnly)}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
              </div>
              <div className={styles.divider}></div>
              
              {/* Brands Section */}
              <div className={styles.section}>
                <div className={styles.sectionTitleRow} onClick={() => toggleSection('brands')} style={{ cursor: 'pointer' }}>
                  <span className={styles.sectionTitle}>Brands</span>
                  <span className={styles.sectionArrow} style={{ transform: expandedSections.brands ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.brands && (
                  <div className={styles.brandScroll}>
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
              <div className={styles.divider}></div>
              
              <button className={styles.applyBtn} onClick={onClose}>Apply Filters</button>
            </>
          ) : (
            <>
              <div className={styles.section} style={{ minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'New In'} 
                        onChange={() => onSortByChange('New In')} 
                      /> 
                      New In
                    </label>
                  </div>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'Trending'} 
                        onChange={() => onSortByChange('Trending')} 
                      /> 
                      Trending
                    </label>
                  </div>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'Price low to high'} 
                        onChange={() => onSortByChange('Price low to high')} 
                      /> 
                      Price low to high
                    </label>
                  </div>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'Price high to low'} 
                        onChange={() => onSortByChange('Price high to low')} 
                      /> 
                      Price high to low
                    </label>
                  </div>
                </div>
                <button className={styles.applyBtn} onClick={onClose}>Apply</button>
              </div>
              <div className={styles.divider}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchMobileFilterOverlay;