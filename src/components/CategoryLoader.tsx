import React, { useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';

interface CategoryLoaderProps {
  category: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const CategoryLoader: React.FC<CategoryLoaderProps> = ({ 
  category, 
  children, 
  fallback = <div>Loading...</div> 
}) => {
  const { loadCategoryData, isCategoryLoaded, categoryData } = useProductContext();

  useEffect(() => {
    // Load category data if not already loaded
    if (!isCategoryLoaded(category)) {
      loadCategoryData(category);
    }
  }, [category, loadCategoryData, isCategoryLoaded]);

  // Show fallback while category is loading
  if (!isCategoryLoaded(category) || !categoryData[category as keyof typeof categoryData] || categoryData[category as keyof typeof categoryData].length === 0) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default CategoryLoader; 