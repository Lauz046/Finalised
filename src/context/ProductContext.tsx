import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { gql } from '@apollo/client';
import { cacheUtils, searchCache, menuCache, categoryCache } from '../utils/cacheUtils';

const ALL_PRODUCTS_QUERY = gql`
  query AllProducts {
    sneakers(limit: 21) { id brand productName images productLink }
    apparel(limit: 21) { id brand productName images productLink }
    accessories(limit: 21) { id brand productName images productLink }
    perfumes(limit: 21) { id brand title images url }
    watches(limit: 21) { id brand name images link }
  }
`;

// Add category-specific queries for faster loading
const SNEAKERS_CATEGORY_QUERY = gql`
  query SneakersCategory($limit: Int, $offset: Int) {
    sneakers(limit: $limit, offset: $offset) {
      id brand productName sizePrices { size price } images soldOut productLink
    }
  }
`;

const APPAREL_CATEGORY_QUERY = gql`
  query ApparelCategory($limit: Int, $offset: Int) {
    apparel(limit: $limit, offset: $offset) {
      id brand productName subcategory gender sizePrices { size price } images inStock
    }
  }
`;

const WATCHES_CATEGORY_QUERY = gql`
  query WatchesCategory($limit: Int, $offset: Int) {
    watches(limit: $limit, offset: $offset) {
      id brand name color salePrice marketPrice images gender
    }
  }
`;

const PERFUMES_CATEGORY_QUERY = gql`
  query PerfumesCategory($limit: Int, $offset: Int) {
    perfumes(limit: $limit, offset: $offset) {
      id brand title fragranceFamily concentration subcategory variants { size price } images
    }
  }
`;

const ACCESSORIES_CATEGORY_QUERY = gql`
  query AccessoriesCategory($limit: Int, $offset: Int) {
    accessories(limit: $limit, offset: $offset) {
      id brand productName subcategory gender sizePrices { size price } images inStock
    }
  }
`;



interface Product {
  id: string;
  brand: string;
  productName?: string;
  title?: string;
  name?: string;
  images: string[];
  productLink?: string;
  url?: string;
  link?: string;
  type: string;
}

interface ProductContextType {
  allProducts: Product[];
  menuData: Record<string, Product[]>;
  searchData: Record<string, Product[]>;
  loading: boolean;
  loadTime: number;
  isPreloaded: boolean;
  categoryData: {
    sneakers: Product[];
    apparel: Product[];
    watches: Product[];
    perfumes: Product[];
    accessories: Product[];
  };
  // Progressive loading methods
  loadCategoryData: (category: string) => Promise<void>;
  isCategoryLoaded: (category: string) => boolean;
}

const ProductContext = createContext<ProductContextType>({ 
  allProducts: [], 
  menuData: {},
  searchData: {},
  loading: true, 
  loadTime: 0,
  isPreloaded: false,
  categoryData: {
    sneakers: [],
    apparel: [],
    watches: [],
    perfumes: [],
    accessories: []
  },
  loadCategoryData: async () => {},
  isCategoryLoaded: () => false
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [menuData, setMenuData] = useState<Record<string, Product[]>>({});
  const [searchData, setSearchData] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [loadTime, setLoadTime] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [categoryData, setCategoryData] = useState({
    sneakers: [],
    apparel: [],
    watches: [],
    perfumes: [],
    accessories: []
  });
  const [loadedCategories, setLoadedCategories] = useState<Set<string>>(new Set());
  const apolloClient = useApolloClient();

  // Progressive loading method
  const loadCategoryData = async (category: string) => {
    if (loadedCategories.has(category)) return; // Already loaded
    
    try {
      const queryMap: Record<string, any> = {
        sneakers: SNEAKERS_CATEGORY_QUERY,
        apparel: APPAREL_CATEGORY_QUERY,
        watches: WATCHES_CATEGORY_QUERY,
        perfumes: PERFUMES_CATEGORY_QUERY,
        accessories: ACCESSORIES_CATEGORY_QUERY
      };

      const query = queryMap[category];
      if (!query) return;

      const categoryData = await cacheUtils.getWithFallback(
        categoryCache,
        `${category}_data`,
        async () => {
          const result = await apolloClient.query({ 
            query, 
            variables: { limit: 21, offset: 0 } 
          });
          return result.data?.[category] || [];
        },
        2 * 60 * 60 * 1000 // Auto-refresh every 2 hours
      );

      const processed = categoryData;
      // if (category === 'watches') {
      //   processed = categoryData.filter((w: any) => hasViewableImage(w.images));
      // }

      setCategoryData(prev => ({
        ...prev,
        [category]: processed
      }));
      setLoadedCategories(prev => new Set([...prev, category]));
      
      console.log(`📦 Loaded category: ${category}`);
    } catch (error) {
      console.error(`Error loading ${category} data:`, error);
    }
  };

  const isCategoryLoaded = (category: string) => {
    return loadedCategories.has(category);
  };

  useEffect(() => {
    // Only run on client side (SSR safe)
    if (typeof window === 'undefined') return;
    
    const preloadEssentialData = async () => {
      const t0 = performance.now();
      
      try {
        // Load only essential data first (menu + search)
        const [menuData, searchData] = await Promise.all([
          // Menu data (essential for navigation)
          cacheUtils.getWithFallback(
            menuCache,
            'menu_data',
            async () => {
              const res = await fetch('http://localhost:8090/api/menu');
              if (!res.ok) throw new Error('Failed to fetch menu');
              return res.json();
            },
            30 * 60 * 1000 // Auto-refresh every 30 minutes
          ),
          
          // Search data (essential for search functionality)
          cacheUtils.getWithFallback(
            searchCache,
            'search_data',
            async () => {
              const productsResult = await apolloClient.query({ query: ALL_PRODUCTS_QUERY });
              
              if (productsResult.data) {
                const all = [
                  ...(productsResult.data.sneakers?.map((p: any) => ({ ...p, type: 'sneakers' })) || []),
                  ...(productsResult.data.apparel?.map((p: any) => ({ ...p, type: 'apparel' })) || []),
                  ...(productsResult.data.accessories?.map((p: any) => ({ ...p, type: 'accessories' })) || []),
                  ...(productsResult.data.perfumes?.map((p: any) => ({ ...p, type: 'perfumes' })) || []),
                  ...(productsResult.data.watches?.map((p: any) => ({ ...p, type: 'watches' })) || []),
                ];
                
                return {
                  products: all,
                  categoryCounts: {
                    sneakers: all.filter(p => p.type === 'sneakers').length,
                    apparel: all.filter(p => p.type === 'apparel').length,
                    accessories: all.filter(p => p.type === 'accessories').length,
                    perfumes: all.filter(p => p.type === 'perfumes').length,
                    watches: all.filter(p => p.type === 'watches').length,
                  }
                };
              }
              return { products: [], categoryCounts: {} };
            },
            5 * 60 * 1000 // Auto-refresh every 5 minutes
          )
        ]);

        setMenuData(menuData);
        setAllProducts(searchData.products);
        setSearchData({
          sneakers: searchData.products.filter((p: Product) => p.type === 'sneakers'),
          apparel: searchData.products.filter((p: Product) => p.type === 'apparel'),
          accessories: searchData.products.filter((p: Product) => p.type === 'accessories'),
          perfumes: searchData.products.filter((p: Product) => p.type === 'perfumes'),
          watches: searchData.products.filter((p: Product) => p.type === 'watches'),
        });
        
        setLoadTime(performance.now() - t0);
        setLoading(false);
        setIsPreloaded(true);
        
        console.log(`🚀 Essential data loaded in ${(performance.now() - t0).toFixed(2)}ms`);
        console.log('📊 Cache stats:', cacheUtils.getStats());

        // Load category data in background (non-blocking)
        setTimeout(async () => {
          console.log('🔄 Loading category data in background...');
          await loadCategoryData('sneakers'); // Load most popular category first
        }, 1000);

      } catch (error) {
        console.error('Error pre-loading essential data:', error);
        setLoading(false);
      }
    };

    // Pre-load essential data immediately on mount
    preloadEssentialData();
  }, [apolloClient]);

  return (
    <ProductContext.Provider value={{ 
      allProducts, 
      menuData, 
      searchData, 
      loading, 
      loadTime, 
      isPreloaded, 
      categoryData,
      loadCategoryData,
      isCategoryLoaded
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext); 