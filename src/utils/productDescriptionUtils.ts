import { useEffect, useState } from 'react';

export interface ProductDescription {
  id: string;
  category: string;
  brand: string;
  productName: string;
  description: string;
  productLink: string;
  subcategory: string;
}

// Cache for product descriptions to avoid repeated API calls
let descriptionsCache: ProductDescription[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Loads product descriptions from the JSON file
 * Uses caching for performance optimization
 */
export const loadProductDescriptions = async (): Promise<ProductDescription[]> => {
  const now = Date.now();
  
  // Return cached data if still valid
  if (descriptionsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return descriptionsCache;
  }

  try {
    const response = await fetch('/api/product-descriptions');
    if (!response.ok) {
      throw new Error(`Failed to load descriptions: ${response.status}`);
    }
    
    const descriptions = await response.json();
    
    // Update cache
    descriptionsCache = descriptions;
    cacheTimestamp = now;
    
    return descriptions;
  } catch (error) {
    console.error('Error loading product descriptions:', error);
    return [];
  }
};

/**
 * Finds the matching description for a product based on product link
 * Uses fuzzy matching for better accuracy
 */
export const findProductDescription = (
  descriptions: ProductDescription[],
  productLink: string,
  productName?: string,
  brand?: string
): ProductDescription | null => {
  if (!productLink) return null;

  // First try exact match
  const exactMatch = descriptions.find(desc => 
    desc.productLink === productLink
  );
  
  if (exactMatch) return exactMatch;

  // Try fuzzy matching by product name and brand
  if (productName && brand) {
    const fuzzyMatch = descriptions.find(desc => {
      const nameMatch = desc.productName.toLowerCase().includes(productName.toLowerCase()) ||
                       productName.toLowerCase().includes(desc.productName.toLowerCase());
      const brandMatch = desc.brand.toLowerCase() === brand.toLowerCase();
      return nameMatch && brandMatch;
    });
    
    if (fuzzyMatch) return fuzzyMatch;
  }

  // Try partial link matching
  const partialMatch = descriptions.find(desc => {
    const descUrl = new URL(desc.productLink);
    const productUrl = new URL(productLink);
    return descUrl.hostname === productUrl.hostname && 
           descUrl.pathname.includes(productUrl.pathname.split('/').pop() || '');
  });

  return partialMatch || null;
};

/**
 * Hook for using product descriptions in components
 * Provides loading state and error handling
 */
export const useProductDescription = (productLink: string, productName?: string, brand?: string) => {
  const [description, setDescription] = useState<ProductDescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDescription = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const descriptions = await loadProductDescriptions();
        const matchedDescription = findProductDescription(descriptions, productLink, productName, brand);
        
        setDescription(matchedDescription);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load description');
      } finally {
        setLoading(false);
      }
    };

    if (productLink) {
      loadDescription();
    } else {
      setLoading(false);
    }
  }, [productLink, productName, brand]);

  return { description, loading, error };
};

/**
 * Creates a dynamic description when no existing description is found
 */
export const createDynamicDescription = (productName: string, brand: string, category?: string): string => {
  const categoryDescriptions = {
    sneakers: "These premium sneakers combine cutting-edge design with exceptional comfort and performance.",
    apparel: "This luxury apparel piece embodies contemporary fashion with timeless elegance.",
    accessories: "This exquisite accessory adds the perfect finishing touch to any sophisticated look.",
    perfumes: "This captivating fragrance delivers a unique olfactory experience with carefully selected notes.",
    watches: "This precision timepiece represents the pinnacle of watchmaking excellence and style.",
  };

  const baseDescription = categoryDescriptions[category as keyof typeof categoryDescriptions] || 
    "This exceptional piece represents the finest in luxury craftsmanship and design.";

  return `Discover the ${brand} ${productName} - a testament to superior quality and refined taste. 
    ${baseDescription} 
    Meticulously crafted with attention to every detail, this item showcases the brand's commitment to excellence 
    and innovation. The perfect fusion of form and function, it delivers both aesthetic appeal and practical performance. 
    Experience the luxury difference with authentic materials, expert construction, and a design that stands the test of time. 
    This is more than just a product - it's an investment in quality that reflects your discerning standards and sophisticated lifestyle.`;
};

/**
 * Formats description text for better readability
 */
export const formatDescription = (description: string): string => {
  return description
    .replace(/\n/g, ' ') // Remove line breaks
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

/**
 * Truncates description for preview display
 */
export const truncateDescription = (description: string, maxLength: number = 150): string => {
  if (description.length <= maxLength) return description;
  
  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}; 