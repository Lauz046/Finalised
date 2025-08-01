import React from 'react';
import styles from './sneaker/SneakerMobileFilterOverlay.module.css';

export interface CategoryMobileFilterOverlayProps {
  show: boolean;
  onClose: () => void;
  tab: 'filter' | 'sort';
  setTab: (tab: 'filter' | 'sort') => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  sizes?: string[];
  selectedSizes?: string[];
  onSizeChange?: (size: string) => void;
  subcategories?: string[];
  selectedSubcategories?: string[];
  onSubcategoryChange?: (subcategory: string) => void;
  genders?: string[];
  selectedGenders?: string[];
  onGenderChange?: (gender: string) => void;
  concentrations?: string[];
  selectedConcentrations?: string[];
  onConcentrationChange?: (concentration: string) => void;
  fragranceFamilies?: string[];
  selectedFragranceFamilies?: string[];
  onFragranceFamilyChange?: (family: string) => void;
  colors?: string[];
  selectedColors?: string[];
  onColorChange?: (color: string) => void;
  inStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
}

const CategoryMobileFilterOverlay: React.FC<CategoryMobileFilterOverlayProps> = ({
  show,
  onClose,
  tab,
  setTab,
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
  concentrations,
  selectedConcentrations,
  onConcentrationChange,
  fragranceFamilies,
  selectedFragranceFamilies,
  onFragranceFamilyChange,
  colors,
  selectedColors,
  onColorChange,
  inStockOnly,
  onInStockChange,
}) => {
  if (!show) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.panel}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <div className={styles.tabsRow}>
          <div
            className={tab === 'filter' ? styles.activeTab : styles.tab}
            onClick={() => setTab('filter')}
          >
            Filters
          </div>
          <div
            className={tab === 'sort' ? styles.activeTab : styles.tab}
            onClick={() => setTab('sort')}
          >
            Sort
          </div>
        </div>
        <div className={styles.tabsUnderline} />
        <div className={styles.body}>
          {tab === 'filter' && (
            <>
              {/* Brands */}
              {brands && brands.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Brand</div>
                  <div className={styles.brandScroll}>
                    {brands.map((brand) => (
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
              {/* Sizes */}
              {sizes && sizes.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Size</div>
                  <div className={styles.sizeScroll}>
                    {sizes.map((size) => (
                      <label key={size} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedSizes?.includes(size)}
                          onChange={() => onSizeChange && onSizeChange(size)}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* Subcategories */}
              {subcategories && subcategories.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Subcategory</div>
                  <div>
                    {subcategories.map((sub) => (
                      <label key={sub} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedSubcategories?.includes(sub)}
                          onChange={() => onSubcategoryChange && onSubcategoryChange(sub)}
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* Genders */}
              {genders && genders.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Gender</div>
                  <div>
                    {genders.map((gender) => (
                      <label key={gender} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedGenders?.includes(gender)}
                          onChange={() => onGenderChange && onGenderChange(gender)}
                        />
                        {gender}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* Concentrations */}
              {concentrations && concentrations.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Concentration</div>
                  <div>
                    {concentrations.map((c) => (
                      <label key={c} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedConcentrations?.includes(c)}
                          onChange={() => onConcentrationChange && onConcentrationChange(c)}
                        />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* Fragrance Families */}
              {fragranceFamilies && fragranceFamilies.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Fragrance Family</div>
                  <div>
                    {fragranceFamilies.map((f) => (
                      <label key={f} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedFragranceFamilies?.includes(f)}
                          onChange={() => onFragranceFamilyChange && onFragranceFamilyChange(f)}
                        />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* Colors */}
              {colors && colors.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Color</div>
                  <div>
                    {colors.map((color) => (
                      <label key={color} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedColors?.includes(color)}
                          onChange={() => onColorChange && onColorChange(color)}
                        />
                        {color}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* In Stock Only */}
              <div className={styles.section}>
                <label className={styles.switchLabel}>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => onInStockChange(!inStockOnly)}
                  />
                  <span className={styles.switchSlider}></span>
                  In Stock Only
                </label>
              </div>
            </>
          )}
          {tab === 'sort' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Sort By</div>
              <div>
                {['Price low to high', 'Price high to low', 'Newest', 'Popular'].map((option) => (
                  <label key={option} className={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === option}
                      onChange={() => onSortByChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryMobileFilterOverlay;
