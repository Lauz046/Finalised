import React, {useState} from 'react';
import styles from '../sneaker/SneakerMobileFilterOverlay.module.css';

interface ApparelMobileFilterOverlayProps {
  show: boolean;
  onClose: () => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  sizes: string[];
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
  subcategories: string[];
  selectedSubcategories: string[];
  onSubcategoryChange: (subcategory: string) => void;
  genders: string[];
  selectedGenders: string[];
  onGenderChange: (gender: string) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  tab: 'filter' | 'sort';
  setTab: (tab: 'filter' | 'sort') => void;
}

const ApparelMobileFilterOverlay: React.FC<ApparelMobileFilterOverlayProps> = ({
  show,
  onClose,
  sortBy,
  onSortByChange,
  brands,
  selectedBrands,
  onBrandChange,
  sizes,
  selectedSizes,
  onSizeChange,
  subcategories,
  selectedSubcategories,
  onSubcategoryChange,
  genders,
  selectedGenders,
  onGenderChange,
  inStockOnly,
  onInStockChange,
  tab,
  setTab: _setTab
}) => {
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    size: true,
    brands: true,
    subcategories: true,
  });

  const toggleSection = (section: 'gender' | 'size' | 'brands' | 'subcategories') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
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
              
              {/* Subcategory Section */}
              <div className={styles.section}>
                <div className={styles.sectionTitleRow} onClick={() => toggleSection('subcategories')} style={{ cursor: 'pointer' }}>
                  <span className={styles.sectionTitle}>Shop by Category</span>
                  <span className={styles.sectionArrow} style={{ transform: expandedSections.subcategories ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.subcategories && (
                  <div className={styles.sectionContent}>
                    {subcategories.map(subcategory => (
                      <label key={subcategory} className={styles.checkboxLabel}>
                        <input 
                          type="checkbox" 
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={() => onSubcategoryChange(subcategory)}
                        /> 
                        {subcategory}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.divider}></div>
              
              {/* Size Section */}
              <div className={styles.section}>
                <div className={styles.sectionTitleRow} onClick={() => toggleSection('size')} style={{ cursor: 'pointer' }}>
                  <span className={styles.sectionTitle}>Shop by Size</span>
                  <span className={styles.sectionArrow} style={{ transform: expandedSections.size ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.size && (
                  <div className={styles.sectionContent}>
                    <div className={styles.sizeScroll}>
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
                  </div>
                )}
              </div>
              <div className={styles.divider}></div>
              
              {/* Brand Section */}
              <div className={styles.section}>
                <div className={styles.sectionTitleRow} onClick={() => toggleSection('brands')} style={{ cursor: 'pointer' }}>
                  <span className={styles.sectionTitle}>Shop by Brand</span>
                  <span className={styles.sectionArrow} style={{ transform: expandedSections.brands ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 22, height: 22 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                {expandedSections.brands && (
                  <div className={styles.sectionContent}>
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
                  </div>
                )}
              </div>
              <div className={styles.divider}></div>
              
              {/* In Stock Only */}
              <div className={styles.section}>
                <label className={styles.switchLabel}>
                  <span>In Stock Only</span>
                  <input 
                    type="checkbox" 
                    checked={inStockOnly}
                    onChange={() => onInStockChange(!inStockOnly)}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
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
                        checked={sortBy === 'Newest'} 
                        onChange={() => onSortByChange('Newest')} 
                      /> 
                      New In
                    </label>
                  </div>
                  <div className={styles.sortOption}>
                    <label className={styles.checkboxLabel} style={{ width: '100%' }}>
                      <input 
                        type="checkbox" 
                        checked={sortBy === 'Popularity'} 
                        onChange={() => onSortByChange('Popularity')} 
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

export default ApparelMobileFilterOverlay;
