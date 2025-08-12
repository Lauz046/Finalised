import React, { useState } from 'react';
import styles from './ApparelFilterSidebar.module.css';
import { formatGenderText } from '../../utils/brandUtils';
import { SelectedFilters } from '../SelectedFilters';

interface DynamicSearchFilterSidebarProps {
  show: boolean;
  onHide: () => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  subcategories: string[];
  selectedSubcategories: string[];
  onSubcategoryChange: (subcategory: string) => void;
  genders: string[];
  selectedGenders: string[];
  onGenderChange: (gender: string) => void;
  fragranceFamilies?: string[];
  selectedFragranceFamilies?: string[];
  onFragranceFamilyChange?: (fragranceFamily: string) => void;
  colors?: string[];
  selectedColors?: string[];
  onColorChange?: (color: string) => void;
  concentrations?: string[];
  selectedConcentrations?: string[];
  onConcentrationChange?: (concentration: string) => void;
  materials?: string[];
  selectedMaterials?: string[];
  onMaterialChange?: (material: string) => void;
  sizes?: string[];
  selectedSizes?: string[];
  onSizeChange?: (size: string) => void;
}

const DynamicSearchFilterSidebar: React.FC<DynamicSearchFilterSidebarProps> = ({
  show,
  onHide: _onHide,
  sortBy,
  onSortByChange,
  brands,
  selectedBrands,
  onBrandChange,
  subcategories,
  selectedSubcategories,
  onSubcategoryChange,
  genders,
  selectedGenders,
  onGenderChange,
  fragranceFamilies,
  selectedFragranceFamilies,
  onFragranceFamilyChange,
  colors,
  selectedColors,
  onColorChange,
  concentrations,
  selectedConcentrations,
  onConcentrationChange,
  materials,
  selectedMaterials,
  onMaterialChange,
  sizes,
  selectedSizes,
  onSizeChange,
}) => {
  const [brandExpanded, setBrandExpanded] = useState(true);
  const [subcategoryExpanded, setSubcategoryExpanded] = useState(true);
  const [genderExpanded, setGenderExpanded] = useState(true);
  const [fragranceFamilyExpanded, setFragranceFamilyExpanded] = useState(true);
  const [colorExpanded, setColorExpanded] = useState(true);
  const [concentrationExpanded, setConcentrationExpanded] = useState(true);
  const [materialExpanded, setMaterialExpanded] = useState(true);
  const [sizeExpanded, setSizeExpanded] = useState(true);

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
  const ColorCircle = ({ color }: { color: string }) => (
    <span style={{
      width: 16,
      height: 16,
      borderRadius: '50%',
      backgroundColor: colorMap[color] || '#CCCCCC',
      border: color === 'White' ? '1px solid #ddd' : 'none',
      display: 'inline-block',
      marginRight: 8,
      verticalAlign: 'middle',
    }} />
  );

  return (
    <aside className={show ? styles.sidebar : styles.sidebarHidden}>
      <div className={styles.heading}>Sort & Filter</div>
      <div className={styles.divider}></div>
      
      {/* Selected Filters Display */}
      <SelectedFilters
        selectedBrands={selectedBrands}
        onBrandRemove={onBrandChange}
        selectedSubcategories={selectedSubcategories}
        onSubcategoryRemove={onSubcategoryChange}
        selectedGenders={selectedGenders}
        onGenderRemove={onGenderChange}
        selectedSizes={selectedSizes || []}
        onSizeRemove={onSizeChange || (() => {})}
        selectedConcentrations={selectedConcentrations}
        onConcentrationRemove={onConcentrationChange}
        selectedFragranceFamilies={selectedFragranceFamilies}
        onFragranceFamilyRemove={onFragranceFamilyChange}
        selectedColors={selectedColors}
        onColorRemove={onColorChange}
        selectedMaterials={selectedMaterials}
        onMaterialRemove={onMaterialChange}
        inStockOnly={false}
        onInStockRemove={() => {}}
      />
      
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
      {/* Brand Filter */}
      <div className={styles.section}>
        <div
          className={styles.sectionTitle}
          style={{ cursor: 'pointer' }}
          onClick={() => setBrandExpanded((prev) => !prev)}
        >
          Brands
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
      {/* Subcategory Filter */}
      <div className={styles.section}>
        <div
          className={styles.sectionTitle}
          style={{ cursor: 'pointer' }}
          onClick={() => setSubcategoryExpanded((prev) => !prev)}
        >
          Subcategory
          <span style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center' }}>
            {subcategoryExpanded ? (
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
        {subcategoryExpanded && (
          <div className={styles.brandOptions}>
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
      {/* Gender Filter */}
      <div className={styles.section}>
        <div
          className={styles.sectionTitle}
          style={{ cursor: 'pointer' }}
          onClick={() => setGenderExpanded((prev) => !prev)}
        >
          Shop by Gender
          <span style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center' }}>
            {genderExpanded ? (
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
            <div className={styles.brandOptions}>
              {sizes.map(size => (
                <label key={size} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedSizes?.includes(size) || false}
                    onChange={() => onSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          )}
      </div>
      {/* Fragrance Family Filter (if perfumes present) */}
      {fragranceFamilies && fragranceFamilies.length > 0 && onFragranceFamilyChange && (
        <div className={styles.section}>
          <div
            className={styles.sectionTitle}
            style={{ cursor: 'pointer' }}
            onClick={() => setFragranceFamilyExpanded((prev) => !prev)}
          >
            Fragrance Family
            <span style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center' }}>
              {fragranceFamilyExpanded ? (
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
          {concentrationExpanded && (
            <div className={styles.brandOptions}>
              {concentrations.map(concentration => (
                <label key={concentration} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedConcentrations?.includes(concentration) || false}
                    onChange={() => onConcentrationChange(concentration)}
                  />
                  {concentration}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Color Filter (if watches present) */}
      {colors && colors.length > 0 && onColorChange && (
        <div className={styles.section}>
          <div
            className={styles.sectionTitle}
            style={{ cursor: 'pointer' }}
            onClick={() => setColorExpanded((prev) => !prev)}
          >
            Colour
            <span style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center' }}>
              {colorExpanded ? (
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
          {colorExpanded && (
            <div className={styles.brandOptions}>
              {colors.map(color => (
                <label key={color} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedColors?.includes(color) || false}
                    onChange={() => onColorChange(color)}
                  />
                  <ColorCircle color={color} />
                  {color}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Concentration Filter (if perfumes present) */}
      {concentrations && concentrations.length > 0 && onConcentrationChange && (
        <div className={styles.section}>
          <div
            className={styles.sectionTitle}
            style={{ cursor: 'pointer' }}
            onClick={() => setConcentrationExpanded((prev) => !prev)}
          >
            Concentration
            <span style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center' }}>
              {concentrationExpanded ? (
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
          {fragranceFamilyExpanded && (
            <div className={styles.brandOptions}>
              {concentrations.map(concentration => (
                <label key={concentration} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedConcentrations?.includes(concentration) || false}
                    onChange={() => onConcentrationChange(concentration)}
                  />
                  {concentration}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Material Filter (if accessories present) */}
      {materials && materials.length > 0 && onMaterialChange && (
        <div className={styles.section}>
          <div
            className={styles.sectionTitle}
            style={{ cursor: 'pointer' }}
            onClick={() => setMaterialExpanded((prev) => !prev)}
          >
            Material
            <span style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center' }}>
              {materialExpanded ? (
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
          {materialExpanded && (
            <div className={styles.brandOptions}>
              {materials.map(material => (
                <label key={material} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedMaterials?.includes(material) || false}
                    onChange={() => onMaterialChange(material)}
                  />
                  {material}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Size Filter (if sneakers/apparel present) */}
      {sizes && sizes.length > 0 && onSizeChange && (
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
          {genderExpanded && (
            <div className={styles.brandOptions}>
              {sizes.map(size => (
                <label key={size} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedSizes?.includes(size) || false}
                    onChange={() => onSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default DynamicSearchFilterSidebar; 