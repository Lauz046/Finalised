import React from 'react';
import styles from './SelectedFilters.module.css';
import { formatGenderText } from '../utils/brandUtils';

interface FilterChip {
  id: string;
  label: string;
  category: string;
  onRemove: () => void;
}

interface SelectedFiltersProps {
  selectedBrands: string[];
  onBrandRemove: (brand: string) => void;
  selectedSubcategories: string[];
  onSubcategoryRemove: (subcategory: string) => void;
  selectedGenders: string[];
  onGenderRemove: (gender: string) => void;
  selectedSizes: string[];
  onSizeRemove: (size: string) => void;
  selectedConcentrations?: string[];
  onConcentrationRemove?: (concentration: string) => void;
  selectedFragranceFamilies?: string[];
  onFragranceFamilyRemove?: (fragranceFamily: string) => void;
  selectedColors?: string[];
  onColorRemove?: (color: string) => void;
  selectedMaterials?: string[];
  onMaterialRemove?: (material: string) => void;
  inStockOnly?: boolean;
  onInStockRemove?: () => void;
  isMobile?: boolean;
}

export const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  selectedBrands,
  onBrandRemove,
  selectedSubcategories,
  onSubcategoryRemove,
  selectedGenders,
  onGenderRemove,
  selectedSizes,
  onSizeRemove,
  selectedConcentrations = [],
  onConcentrationRemove,
  selectedFragranceFamilies = [],
  onFragranceFamilyRemove,
  selectedColors = [],
  onColorRemove,
  selectedMaterials = [],
  onMaterialRemove,
  inStockOnly = false,
  onInStockRemove,
  isMobile = false,
}) => {
  // Don't render on mobile - filters will be handled differently in mobile view
  if (isMobile) {
    return null;
  }

  const allFilters: FilterChip[] = [
    ...selectedBrands.map(brand => ({
      id: `brand-${brand}`,
      label: brand,
      category: 'Brand',
      onRemove: () => onBrandRemove(brand)
    })),
    ...selectedSubcategories.map(subcategory => ({
      id: `subcategory-${subcategory}`,
      label: subcategory,
      category: 'Category',
      onRemove: () => onSubcategoryRemove(subcategory)
    })),
    ...selectedGenders.map(gender => ({
      id: `gender-${gender}`,
      label: formatGenderText(gender),
      category: 'Gender',
      onRemove: () => onGenderRemove(gender)
    })),
    ...selectedSizes.map(size => ({
      id: `size-${size}`,
      label: size,
      category: 'Size',
      onRemove: () => onSizeRemove(size)
    })),
    ...selectedConcentrations.map(concentration => ({
      id: `concentration-${concentration}`,
      label: concentration,
      category: 'Concentration',
      onRemove: () => onConcentrationRemove?.(concentration)
    })),
    ...selectedFragranceFamilies.map(family => ({
      id: `fragrance-${family}`,
      label: family,
      category: 'Fragrance',
      onRemove: () => onFragranceFamilyRemove?.(family)
    })),
    ...selectedColors.map(color => ({
      id: `color-${color}`,
      label: color,
      category: 'Color',
      onRemove: () => onColorRemove?.(color)
    })),
    ...selectedMaterials.map(material => ({
      id: `material-${material}`,
      label: material,
      category: 'Material',
      onRemove: () => onMaterialRemove?.(material)
    })),
    ...(inStockOnly && onInStockRemove ? [{
      id: 'inStock',
      label: 'In Stock Only',
      category: 'Availability',
      onRemove: onInStockRemove
    }] : [])
  ];

  if (allFilters.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Applied Filters</div>
      <div className={styles.filtersList}>
        {allFilters.map(filter => (
          <div key={filter.id} className={styles.filterChip}>
            <span className={styles.filterLabel}>{filter.label}</span>
            <button
              className={styles.removeButton}
              onClick={filter.onRemove}
              aria-label={`Remove ${filter.category} filter: ${filter.label}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.removeIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 