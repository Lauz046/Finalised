import React, { useState } from 'react';
import styles from './PerfumeMobileFilterOverlay.module.css';

interface PerfumeMobileFilterOverlayProps {
  show: boolean;
  onClose: () => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  subcategories: string[];
  selectedSubcategories: string[];
  onSubcategoryChange: (subcategory: string) => void;
  concentrations: string[];
  selectedConcentrations: string[];
  onConcentrationChange: (concentration: string) => void;
  fragranceFamilies: string[];
  selectedFragranceFamilies: string[];
  onFragranceFamilyChange: (family: string) => void;
  sizes: string[];
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  tab: 'filter' | 'sort';
  setTab: (tab: 'filter' | 'sort') => void;
}

const PerfumeMobileFilterOverlay: React.FC<PerfumeMobileFilterOverlayProps> = ({
  show,
  onClose,
  sortBy,
  onSortByChange,
  brands,
  selectedBrands,
  onBrandChange,
  subcategories,
  selectedSubcategories,
  onSubcategoryChange,
  concentrations,
  selectedConcentrations,
  onConcentrationChange,
  fragranceFamilies,
  selectedFragranceFamilies,
  onFragranceFamilyChange,
  sizes,
  selectedSizes,
  onSizeChange,
  inStockOnly,
  onInStockChange,
  tab,
  setTab: _setTab
}) => {
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    concentration: false,
    size: false,
    brands: false,
    subcategories: false,
    fragranceFamilies: false
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.panel}>
        {/* Close button in top right */}
        <button
          className={styles.closeBtn}
          aria-label="Close filter overlay"
          onClick={onClose}
        >
          &times;
        </button>
        <div className={styles.body}>
          {tab === 'filter' ? (
            <>
              {/* Concentration Filter */}
              <div className={styles.filterSection}>
                <div 
                  className={styles.sectionHeader}
                  onClick={() => toggleSection('concentration')}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer'}}>
                  <span className={styles.sectionTitle}>Concentration</span>
                  <span className={styles.sectionArrow} style={{marginLeft: 'auto', transform: expandedSections.concentration ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 20, height: 20}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.concentration && (
                  <div className={styles.sectionContent}>
                    {concentrations.map(concentration => (
                      <label key={concentration} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedConcentrations.includes(concentration)}
                          onChange={() => onConcentrationChange(concentration)}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>{concentration}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Fragrance Families Filter */}
              <div className={styles.filterSection}>
                <div 
                  className={styles.sectionHeader}
                  onClick={() => toggleSection('fragranceFamilies')}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer'}}>
                  <span className={styles.sectionTitle}>Fragrance Families</span>
                  <span className={styles.sectionArrow} style={{marginLeft: 'auto', transform: expandedSections.fragranceFamilies ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 20, height: 20}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.fragranceFamilies && (
                  <div className={styles.sectionContent} style={{gap: 12, borderTop: '1px solid #e0e6ed', borderBottom: '1px solid #e0e6ed', padding: '16px 0'}}>
                    {fragranceFamilies.map(family => (
                      <label key={family} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedFragranceFamilies.includes(family)}
                          onChange={() => onFragranceFamilyChange(family)}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>{family}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Subcategories Filter */}
              <div className={styles.filterSection}>
                <div 
                  className={styles.sectionHeader}
                  onClick={() => toggleSection('subcategories')}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer'}}>
                  <span className={styles.sectionTitle}>Subcategories</span>
                  <span className={styles.sectionArrow} style={{marginLeft: 'auto', transform: expandedSections.subcategories ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 20, height: 20}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.subcategories && (
                  <div className={styles.sectionContent} style={{gap: 12, borderTop: '1px solid #e0e6ed', borderBottom: '1px solid #e0e6ed', padding: '16px 0'}}>
                    {subcategories.map(subcategory => (
                      <label key={subcategory} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={() => onSubcategoryChange(subcategory)}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>{subcategory}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Filter */}
              <div className={styles.filterSection}>
                <div 
                  className={styles.sectionHeader}
                  onClick={() => toggleSection('size')}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer'}}>
                  <span className={styles.sectionTitle}>Size</span>
                  <span className={styles.sectionArrow} style={{marginLeft: 'auto', transform: expandedSections.size ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 20, height: 20}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.size && (
                  <div className={styles.sectionContent} style={{gap: 12, borderTop: '1px solid #e0e6ed', borderBottom: '1px solid #e0e6ed', padding: '16px 0'}}>
                    {sizes.map(size => (
                      <label key={size} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => onSizeChange(size)}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>{size}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands Filter */}
              <div className={styles.filterSection}>
                <div 
                  className={styles.sectionHeader}
                  onClick={() => toggleSection('brands')}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer'}}>
                  <span className={styles.sectionTitle}>Brands</span>
                  <span className={styles.sectionArrow} style={{marginLeft: 'auto', transform: expandedSections.brands ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 20, height: 20}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.brands && (
                  <div className={styles.sectionContent} style={{gap: 12, borderTop: '1px solid #e0e6ed', borderBottom: '1px solid #e0e6ed', padding: '16px 0'}}>
                    {brands.map(brand => (
                      <label key={brand} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => onBrandChange(brand)}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>{brand}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* In Stock Only Toggle */}
              <div className={styles.filterSection}>
                <div className={styles.switchContainer}>
                  <span>In Stock Only</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={() => onInStockChange(!inStockOnly)}
                    />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                  </label>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.section} style={{ minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'newest'} 
                        onChange={() => onSortByChange('newest')} 
                      /> 
                      New In
                    </label>
                  </div>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'popularity'} 
                        onChange={() => onSortByChange('popularity')} 
                      /> 
                      Trending
                    </label>
                  </div>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'price_asc'} 
                        onChange={() => onSortByChange('price_asc')} 
                      /> 
                      Price low to high
                    </label>
                  </div>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'price_desc'} 
                        onChange={() => onSortByChange('price_desc')} 
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

export default PerfumeMobileFilterOverlay;