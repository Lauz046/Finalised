import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import UniversalProductGrid from '../components/UniversalProductGrid';
import Pagination from '../components/apparel/Pagination';
import { Breadcrumbs } from '../components/ProductPage/Breadcrumbs';
import CategoryMobileFilterOverlay from '../components/CategoryMobileFilterOverlay';
import DynamicSearchFilterSidebar from '../components/apparel/DynamicSearchFilterSidebar';
import Navbar from '../components/nav/Navbar';
import SearchOverlay from '../components/SearchOverlay';
import { getBrandUrl } from '../utils/brandUtils';
import { useProductContext } from '../context/ProductContext';

console.log('SEARCH PAGE FILE LOADED');

const ALL_SNEAKER_BRANDS = gql`
  query AllSneakerBrands {
    allSneakerBrands
  }
`;

// Optimized search queries with smaller limits for faster loading
const SNEAKERS_SEARCH_QUERY = gql`
  query SneakersSearch($search: String, $limit: Int, $offset: Int) {
    sneakers(search: $search, limit: $limit, offset: $offset) {
      id
      brand
      productName
      images
      productLink
      sizePrices { size price }
      soldOut
      sellerName
      sellerUrl
    }
  }
`;

const WATCHES_SEARCH_QUERY = gql`
  query WatchesSearch($search: String, $limit: Int, $offset: Int) {
    watches(search: $search, limit: $limit, offset: $offset) {
      id
      brand
      name
      images
      link
      color
      gender
      salePrice
      marketPrice
      sellerName
      sellerUrl
    }
  }
`;

const PERFUMES_SEARCH_QUERY = gql`
  query PerfumesSearch($search: String, $limit: Int, $offset: Int) {
    perfumes(search: $search, limit: $limit, offset: $offset) {
      id
      brand
      title
      images
      url
      fragranceFamily
      concentration
      subcategory
      variants { size price }
      sellerName
      sellerUrl
    }
  }
`;

const ACCESSORIES_SEARCH_QUERY = gql`
  query AccessoriesSearch($search: String, $limit: Int, $offset: Int) {
    accessories(search: $search, limit: $limit, offset: $offset) {
      id
      brand
      productName
      images
      productLink
      subcategory
      gender
      sizePrices { size price }
      inStock
      sellerName
      sellerUrl
    }
  }
`;

const APPAREL_SEARCH_QUERY = gql`
  query ApparelSearch($search: String, $limit: Int, $offset: Int) {
    apparel(search: $search, limit: $limit, offset: $offset) {
      id
      brand
      productName
      images
      productLink
      subcategory
      gender
      sizePrices { size price }
      inStock
      sellerName
      sellerUrl
    }
  }
`;

const PAGE_SIZE = 16;

interface Product {
  id: string;
  brand: string;
  productName?: string;
  name?: string;
  title?: string;
  images?: string[];
  type?: string;
  subcategory?: string;
  gender?: string;
  fragranceFamily?: string;
  color?: string;
}

export default function SearchPage() {
  const router = useRouter();
  const queryParam = typeof router.query.q === 'string' ? router.query.q : '';
  const [search, setSearch] = useState(queryParam);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedFragranceFamilies, setSelectedFragranceFamilies] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('New In');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOverlayTab, setMobileOverlayTab] = useState<'filter' | 'sort'>('filter');
  const [inStockOnly, setInStockOnly] = useState(false);
  const brandScrollRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use ProductContext for preloaded data
  const { categoryData, isPreloaded, loadCategoryData, isCategoryLoaded } = useProductContext();

  // Debug: Log router query and search state
  useEffect(() => {
    console.log('🔍 SearchPage: Search term:', search);
  }, [search]);

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      console.log(`Search page render time: ${endTime - startTime}ms`);
    };
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update search when query param changes
  useEffect(() => {
    setSearch(queryParam);
    setCurrentPage(1);
  }, [queryParam]);

  // Fetch search results from API with lazy loading
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!search || search.trim() === '') {
        setSearchResults([]);
        setTotalProducts(0);
        setHasMoreProducts(false);
        return;
      }

      setIsLoading(true);
      try {
        // First, get the total count of products for this search
        const countResponse = await fetch(`/api/search/counts?q=${encodeURIComponent(search)}`);
        const countData = await countResponse.json();
        const totalCount = Object.values(countData).reduce((sum: number, count: any) => sum + (count || 0), 0);
        setTotalProducts(totalCount);
        console.log('🔍 SearchPage: Total products for search:', search, '=', totalCount);

        // Fetch first page of products (100 items)
        const response = await fetch(`/api/search?q=${encodeURIComponent(search)}&limit=100&offset=0`);
        const data = await response.json();
        const products = data.products || [];
        setSearchResults(products);
        setHasMoreProducts(products.length === 100 && totalCount > 100);
        console.log('🔍 SearchPage: Loaded first page with', products.length, 'products');
      } catch (error) {
        console.error('🔍 SearchPage: Error fetching search results:', error);
        setSearchResults([]);
        setTotalProducts(0);
        setHasMoreProducts(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [search]);

  // Load more products when page changes
  useEffect(() => {
    const loadMoreProducts = async () => {
      if (!search || search.trim() === '' || currentPage === 1) {
        return;
      }

      const offset = (currentPage - 1) * PAGE_SIZE;
      
      // Check if we already have enough products loaded
      if (offset < searchResults.length) {
        console.log('🔍 SearchPage: Already have enough products loaded, skipping API call');
        return;
      }
      
      // Check if we've reached the total number of products
      if (offset >= totalProducts) {
        setHasMoreProducts(false);
        console.log('🔍 SearchPage: Reached total products limit, no more to load');
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(search)}&limit=100&offset=${offset}`);
        const data = await response.json();
        const newProducts = data.products || [];
        
        // Check if we got any new products
        if (newProducts.length === 0) {
          setHasMoreProducts(false);
          console.log('🔍 SearchPage: No more products available');
          return;
        }
        
        // Append new products to existing results
        setSearchResults(prev => [...prev, ...newProducts]);
        
        // Check if we have more products to load
        const totalLoaded = searchResults.length + newProducts.length;
        setHasMoreProducts(newProducts.length === 100 && totalLoaded < totalProducts);
        
        console.log('🔍 SearchPage: Loaded page', currentPage, 'with', newProducts.length, 'products. Total loaded:', totalLoaded, 'of', totalProducts);
      } catch (error) {
        console.error('🔍 SearchPage: Error loading more products:', error);
        setHasMoreProducts(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoreProducts();
  }, [currentPage, search, totalProducts, searchResults.length]);

  // Load category data if not already loaded
  useEffect(() => {
    const loadAllCategories = async () => {
      const startTime = performance.now();
      
      if (!isCategoryLoaded('sneakers')) {
        await loadCategoryData('sneakers');
      }
      if (!isCategoryLoaded('apparel')) {
        await loadCategoryData('apparel');
      }
      if (!isCategoryLoaded('watches')) {
        await loadCategoryData('watches');
      }
      if (!isCategoryLoaded('perfumes')) {
        await loadCategoryData('perfumes');
      }
      if (!isCategoryLoaded('accessories')) {
        await loadCategoryData('accessories');
      }
      
      const endTime = performance.now();
      console.log(`Category data loading time: ${endTime - startTime}ms`);
    };
    loadAllCategories();
  }, [loadCategoryData, isCategoryLoaded]);

  // Always use preloaded data for instant results
  const shouldUsePreloadedData = true;
  
  // Skip all GraphQL queries and use cached data instead
  const sneakersData = { sneakers: [] };
  const sneakersLoading = false;
  
  // Use cached data for all categories
  const watchesData = { watches: [] };
  const watchesLoading = false;
  const perfumesData = { perfumes: [] };
  const perfumesLoading = false;
  const accessoriesData = { accessories: [] };
  const accessoriesLoading = false;
  const apparelData = { apparel: [] };
  const apparelLoading = false;
  
  const { data: brandsData } = useQuery(ALL_SNEAKER_BRANDS, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  });

  // Always use preloaded category data for instant results
  const allProducts = useMemo(() => {
    let all: Product[] = [];
    
    // Use preloaded category data for instant performance
    all = all.concat((categoryData.sneakers || []).map((p: Product) => ({ ...p, type: 'Sneaker' })));
    all = all.concat((categoryData.apparel || []).map((p: Product) => ({ ...p, type: 'Apparel' })));
    all = all.concat((categoryData.accessories || []).map((p: Product) => ({ ...p, type: 'Accessory' })));
    all = all.concat((categoryData.perfumes || []).map((p: Product) => ({ ...p, type: 'Perfume' })));
    all = all.concat((categoryData.watches || []).map((p: Product) => ({ ...p, type: 'Watch' })));
    
    return all;
  }, [categoryData]);

  // Apply search filter to all products
  const searchFilteredProducts = useMemo(() => {
    // If we have a search term, use the API results
    if (search && search.trim() !== '') {
      return searchResults;
    }
    
    // Otherwise use all products from category data
    return allProducts;
  }, [search, searchResults, allProducts]);

  // Extract unique filter values
  const brands = brandsData?.allSneakerBrands || [];
  
  // Auto-scroll brand ticker
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      
      autoScrollIntervalRef.current = setInterval(() => {
        const el = brandScrollRef.current;
        if (el) {
          el.scrollBy({ left: 200, behavior: 'smooth' });
          
          // Reset to beginning when reaching the end
          if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
            setTimeout(() => {
              el.scrollTo({ left: 0, behavior: 'smooth' });
            }, 1000);
          }
        }
      }, 3000); // Scroll every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [brands]);
  
  const subcategories = useMemo(() => {
    const values = allProducts.map(p => p.subcategory).filter((s): s is string => Boolean(s));
    return Array.from(new Set(values));
  }, [allProducts]);
  const genders = useMemo(() => {
    const values = allProducts.map(p => p.gender).filter((g): g is string => Boolean(g));
    return Array.from(new Set(values));
  }, [allProducts]);
  const fragranceFamilies = useMemo(() => {
    const values = allProducts.filter(p => p.type === 'Perfume').map(p => p.fragranceFamily).filter((f): f is string => Boolean(f));
    return Array.from(new Set(values));
  }, [allProducts]);
  const colors = useMemo(() => {
    const values = allProducts.filter(p => p.type === 'Watch').map(p => p.color).filter((c): c is string => Boolean(c));
    return Array.from(new Set(values));
  }, [allProducts]);

  // Filter products based on selected filters
  const filteredResults = useMemo(() => {
    console.log('🔍 SearchPage: filteredResults - searchFilteredProducts.length:', searchFilteredProducts.length);
    
    const filtered = searchFilteredProducts.filter(product => {
      if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;
      if (selectedSubcategories.length && product.subcategory && !selectedSubcategories.includes(product.subcategory)) return false;
      if (selectedGenders.length && product.gender && !selectedGenders.includes(product.gender)) return false;
      if (selectedFragranceFamilies.length && product.type === 'Perfume' && product.fragranceFamily && !selectedFragranceFamilies.includes(product.fragranceFamily)) return false;
      if (selectedColors.length && product.type === 'Watch' && product.color && !selectedColors.includes(product.color)) return false;
      return true;
    });
    
    console.log('🔍 SearchPage: Final filtered results:', filtered.length);
    return filtered;
  }, [searchFilteredProducts, selectedBrands, selectedSubcategories, selectedGenders, selectedFragranceFamilies, selectedColors]);

  // Pagination logic for lazy loading
  const PAGE_SIZE = 100;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  
  // Get products for current page (show all loaded products up to current page)
  const paginatedResults = useMemo(() => {
    const endIndex = currentPage * PAGE_SIZE;
    return searchResults.slice(0, endIndex);
  }, [searchResults, currentPage]);

  // Only show pagination if we have more than one page and there are more products to load
  const shouldShowPagination = totalPages > 1 && (hasMoreProducts || currentPage < totalPages);

  // Use filtered results for display
  const displayResults = useMemo(() => {
    if (search && search.trim() !== '') {
      // For search results, use the paginated results
      return paginatedResults;
    } else {
      // For browsing, use the filtered results
      return filteredResults;
    }
  }, [search, paginatedResults, filteredResults]);

  // Optimized loading state - only show loading when actually fetching search data

  // Handlers for filter changes
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setCurrentPage(1);
  };
  
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev => prev.includes(subcategory) ? prev.filter(s => s !== subcategory) : [...prev, subcategory]);
    setCurrentPage(1);
  };
  const handleGenderChange = (gender: string) => {
    setSelectedGenders(prev => prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]);
    setCurrentPage(1);
  };
  const handleFragranceFamilyChange = (fam: string) => {
    setSelectedFragranceFamilies(prev => prev.includes(fam) ? prev.filter(f => f !== fam) : [...prev, fam]);
    setCurrentPage(1);
  };
  const handleColorChange = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
    setCurrentPage(1);
  };

  // Handle page changes with validation
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Debug: Log what's happening
  useEffect(() => {
    console.log('🔍 SearchPage: Search term:', search);
    console.log('🔍 SearchPage: All products count:', allProducts.length);
    console.log('🔍 SearchPage: Search filtered products count:', searchFilteredProducts.length);
    console.log('🔍 SearchPage: Final filtered results count:', filteredResults.length);
    console.log('🔍 SearchPage: Sneakers data:', sneakersData?.sneakers?.length);
    console.log('🔍 SearchPage: Perfumes data:', perfumesData?.perfumes?.length);
    console.log('🔍 SearchPage: Watches data:', watchesData?.watches?.length);
    console.log('🔍 SearchPage: Accessories data:', accessoriesData?.accessories?.length);
    console.log('🔍 SearchPage: Apparel data:', apparelData?.apparel?.length);
  }, [search, allProducts.length, searchFilteredProducts.length, filteredResults.length, sneakersData, perfumesData, watchesData, accessoriesData, apparelData]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
    { label: search ? `"${search}"` : 'All' }
  ];

  return (
    <>
      {/* Navbar with blue icons and menu functionality */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Mobile UI */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f1f1f1', paddingTop: 2, overflowX: 'hidden' }}>
          <div style={{ padding: '0 16px', marginTop: 16 }}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          
          {/* Mobile Brand Selector - Auto-moving */}
          <div style={{
            margin: '16px auto 0 auto',
            padding: '4px 16px 0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            overflowX: 'visible',
            minHeight: 48,
            marginBottom: 8,
            maxWidth: '100%',
          }}>
            {/* Brand buttons row with arrows - mobile optimized */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 'none', minHeight: 48, position: 'relative', maxWidth: '85vw' }}>
              <button
                aria-label="Scroll left"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0 4px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: 40,
                  marginRight: 2,
                }}
                onClick={() => {
                  const el = document.getElementById('brand-scroll-row-mobile');
                  if (el) el.scrollBy({ left: -120, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div id="brand-scroll-row-mobile" style={{ display: 'flex', gap: 8, overflowX: 'auto', flex: 'none', scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: 40, maxWidth: '75vw' }}>
                {brands.map((b: string) => (
                  <button
                    key={b}
                    onClick={() => handleBrandChange(b)}
                    style={{
                      border: selectedBrands.includes(b) ? '2px solid #22304a' : '2px solid #bfc9d1',
                      background: '#fff',
                      color: '#22304a',
                      borderRadius: 6,
                      padding: '6px 12px',
                      fontWeight: 500,
                      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      boxShadow: selectedBrands.includes(b) ? '0 2px 8px rgba(30,167,253,0.08)' : 'none',
                      borderBottom: selectedBrands.includes(b) ? '2.5px solid #0a2230' : '2.5px solid #bfc9d1',
                      minWidth: 100,
                      maxWidth: 160,
                      outline: 'none',
                      transition: 'border 0.15s, box-shadow 0.15s',
                      height: 40,
                      margin: 0,
                      whiteSpace: 'nowrap',
                      lineHeight: 1,
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={b}
                  >
                    <span style={{ display: 'block', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b}</span>
                  </button>
                ))}
              </div>
              <button
                aria-label="Scroll right"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0 4px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: 40,
                  marginLeft: 2,
                }}
                onClick={() => {
                  const el = document.getElementById('brand-scroll-row-mobile');
                  if (el) el.scrollBy({ left: 120, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Results Summary */}
          <div style={{
            padding: '16px 16px 8px 16px',
            background: '#f1f1f1',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#22304a',
              textAlign: 'center',
              lineHeight: 1.4,
            }}>
              {search ? (
                <>
                  <span style={{ color: '#666' }}>Search results for </span>
                  <span style={{ color: '#22304a' }}>"{search}"</span>
                </>
              ) : (
                <span>All Products</span>
              )}
            </div>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#666',
              textAlign: 'center',
              marginTop: 4,
            }}>
              {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div style={{
            position: 'sticky',
            top: 62,
            zIndex: 50,
            background: '#f1f1f1',
            width: '100%',
            maxWidth: '100vw',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 0 0 0',
            minHeight: 54,
            boxSizing: 'border-box',
            border: 'none',
            boxShadow: '0 2px 8px rgba(30,167,253,0.04)'
          }}>
            <button
              style={{
                background: 'none',
                border: '1px solid #22304a',
                color: '#22304a',
                fontSize: '1.13rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'Montserrat',
                padding: '10px 16px',
                borderRadius: 8,
              }}
              onClick={() => setShowFilter(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
              Sort & Filter
            </button>
          </div>
          
          {/* Mobile Filter Overlay */}
          <CategoryMobileFilterOverlay
            show={showFilter}
            onClose={() => setShowFilter(false)}
            tab={mobileOverlayTab}
            setTab={setMobileOverlayTab}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            subcategories={subcategories}
            selectedSubcategories={selectedSubcategories}
            onSubcategoryChange={handleSubcategoryChange}
            genders={genders}
            selectedGenders={selectedGenders}
            onGenderChange={handleGenderChange}
            fragranceFamilies={fragranceFamilies}
            selectedFragranceFamilies={selectedFragranceFamilies}
            onFragranceFamilyChange={handleFragranceFamilyChange}
            colors={colors}
            selectedColors={selectedColors}
            onColorChange={handleColorChange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
          />
          
          {/* Mobile Product Grid */}
          <div style={{ width: '100%', padding: '0 8px', marginTop: 0 }}>
            <UniversalProductGrid 
              products={displayResults}
              loading={isLoading}
              isMobile={true}
            />
            {shouldShowPagination && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop UI */}
          {/* Add a large top margin so nothing is hidden behind the fixed Navbar */}
          <div style={{ maxWidth: 1500, margin: '0 auto', padding: '104px 32px 0 32px' }}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          
          {/* Brand bar with arrows and Hide Filter, matching SneakerBrandProductPage */}
          <div style={{
            maxWidth: 1500,
            margin: '0 auto',
            padding: '12px 32px 0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            overflowX: 'visible',
            minHeight: 56,
            marginBottom: 18,
          }}>
            {/* Brand buttons row with arrows */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 'none', minHeight: 56, position: 'relative', maxWidth: '80vw' }}>
              <button
                aria-label="Scroll left"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0 8px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: 48,
                  marginRight: 4,
                }}
                onClick={() => {
                  const el = brandScrollRef.current;
                  if (el) el.scrollBy({ left: -180, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 28, height: 28 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div ref={brandScrollRef} id="brand-scroll-row" style={{ display: 'flex', gap: 14, overflowX: 'auto', flex: 'none', scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: 48, maxWidth: '70vw' }}>
                {brands.map((b: string) => (
                  <button
                    key={b}
                    onClick={() => {
                      // On search page, filter by brand (toggle in selectedBrands)
                      handleBrandChange(b);
                    }}
                    style={{
                      border: selectedBrands.includes(b) ? '2px solid #22304a' : '2px solid #bfc9d1',
                      background: '#fff',
                      color: '#22304a',
                      borderRadius: 8,
                      padding: '8px 18px',
                      fontWeight: 500,
                      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      boxShadow: selectedBrands.includes(b) ? '0 2px 8px rgba(30,167,253,0.08)' : 'none',
                      borderBottom: selectedBrands.includes(b) ? '2.5px solid #0a2230' : '2.5px solid #bfc9d1',
                      minWidth: 200,
                      maxWidth: 400,
                      outline: 'none',
                      transition: 'border 0.15s, box-shadow 0.15s',
                      height: 48,
                      margin: 0,
                      marginBottom: 0,
                      marginTop: 0,
                      whiteSpace: 'nowrap',
                      lineHeight: 1,
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={b}
                  >
                    <span style={{ display: 'block', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b}</span>
                  </button>
                ))}
              </div>
              <button
                aria-label="Scroll right"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0 8px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: 48,
                  marginLeft: 4,
                }}
                onClick={() => {
                  const el = brandScrollRef.current;
                  if (el) el.scrollBy({ left: 180, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 28, height: 28 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            {/* Hide Filter button with new SVG, fixed at end */}
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#22304a',
                fontSize: '1.13rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'Montserrat',
                marginLeft: 16,
                whiteSpace: 'nowrap',
                height: 40,
                flex: 'none',
              }}
              onClick={() => setShowFilter(f => !f)}
              aria-label={showFilter ? 'Hide Filters' : 'Show Filters'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24, marginRight: 2 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
              Hide Filters
            </button>
          </div>
          
          {/* Main content row: filter + cards grid */}
          <div style={{ display: 'flex', width: '100%', maxWidth: '100%', margin: 0, alignItems: 'flex-start', paddingTop: 0, position: 'relative' }}>
            <div style={{ 
              position: 'sticky', 
              top: 107, 
              alignSelf: 'flex-start', 
              zIndex: 20, 
              height: 'calc(100vh - 107px)', 
              overflowY: 'auto', 
              marginTop: 0, 
              marginLeft: 14, 
              paddingTop: 0, 
              background: '#f8f9fa', 
              width: showFilter ? 280 : 0,
              flexShrink: 0,
              transition: 'width 0.3s ease',
              overflow: 'hidden'
            }}>
              <DynamicSearchFilterSidebar
                show={showFilter}
                onHide={() => setShowFilter(false)}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
                subcategories={subcategories}
                selectedSubcategories={selectedSubcategories}
                onSubcategoryChange={handleSubcategoryChange}
                genders={genders}
                selectedGenders={selectedGenders}
                onGenderChange={handleGenderChange}
                fragranceFamilies={fragranceFamilies}
                selectedFragranceFamilies={selectedFragranceFamilies}
                onFragranceFamilyChange={handleFragranceFamilyChange}
                colors={colors}
                selectedColors={selectedColors}
                onColorChange={handleColorChange}
              />
            </div>
            <div style={{ 
              flex: 1, 
              padding: 0, 
              marginTop: -30,
              transition: 'margin-left 0.3s ease',
              marginLeft: showFilter ? 0 : -14
            }}>
              <UniversalProductGrid 
                products={displayResults}
                loading={isLoading}
                isMobile={false}
              />
              {shouldShowPagination && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
            </div>
          </div>
        </>
      )}
    </>
  );
} 