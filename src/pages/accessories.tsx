import React, { useState, useEffect, useMemo, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';

import AccessoriesBrandTicker from '../components/accessories/AccessoriesBrandTicker';
import { getBrandUrl } from '../utils/brandUtils';
import AccessoriesFilterSidebar from '../components/accessories/AccessoriesFilterSidebar';
import AccessoriesProductGrid from '../components/accessories/AccessoriesProductGrid';
import AccessoriesMobileFilterOverlay from '../components/accessories/AccessoriesMobileFilterOverlay';
import Pagination from '../components/accessories/Pagination';
import { Breadcrumbs } from '../components/ProductPage/Breadcrumbs';
import { useProductContext } from '../context/ProductContext';

const ALL_ACCESSORY_BRANDS = gql`
  query AllAccessoryBrands {
    allAccessoryBrands
  }
`;

const ALL_ACCESSORY_SUBCATEGORIES = gql`
  query AllAccessorySubcategories {
    allAccessorySubcategories
  }
`;

const ALL_ACCESSORY_GENDERS = gql`
  query AllAccessoryGenders {
    allAccessoryGenders
  }
`;

const ACCESSORIES_QUERY = gql`
  query Accessories($brand: String, $subcategory: String, $gender: String, $size: String, $sortOrder: String, $limit: Int, $offset: Int) {
    accessories(brand: $brand, subcategory: $subcategory, gender: $gender, size: $size, sortOrder: $sortOrder, limit: $limit, offset: $offset) {
      id
      brand
      productName
      subcategory
      gender
      sizePrices { size price }
      images
      inStock
    }
  }
`;

const PRODUCTS_PER_PAGE = 21;

const AccessoriesPage = () => {
  const { categoryData, isPreloaded, loadCategoryData, isCategoryLoaded } = useProductContext();
  
  // Mobile overlay tab state
  const [mobileOverlayTab, setMobileOverlayTab] = useState<'filter' | 'sort'>('filter');
  // State for filters
  const [showFilter, setShowFilter] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldResetPriceRange, setShouldResetPriceRange] = useState(true);
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth < 900);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Fetch brands, subcategories, and genders
  const { data: brandsData } = useQuery(ALL_ACCESSORY_BRANDS);
  const { data: subcategoriesData } = useQuery(ALL_ACCESSORY_SUBCATEGORIES);
  const { data: gendersData } = useQuery(ALL_ACCESSORY_GENDERS);
  
  const brands = brandsData?.allAccessoryBrands || [];
  const subcategories = subcategoriesData?.allAccessorySubcategories || [];
  const genders = gendersData?.allAccessoryGenders || [];
  


  // Load category data if not already loaded
  useEffect(() => {
    if (!isCategoryLoaded('accessories')) {
      loadCategoryData('accessories');
    }
  }, [loadCategoryData, isCategoryLoaded]);

  // Determine if we should use preloaded data or fetch from API
  const shouldUsePreloadedData = isPreloaded && 
    selectedBrands.length === 0 && 
    selectedSizes.length === 0 && 
    selectedSubcategories.length === 0 && 
    selectedGenders.length === 0 && 
    sortBy === '' && 
    currentPage === 1;

  // Fetch accessories with filters
  const { data: accessoriesData, loading: apiLoading } = useQuery(ACCESSORIES_QUERY, {
    variables: {
      brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
      subcategory: selectedSubcategories.length === 1 ? selectedSubcategories[0] : undefined,
      gender: selectedGenders.length === 1 ? selectedGenders[0] : undefined,
      size: selectedSizes.length === 1 ? selectedSizes[0] : undefined,
      sortOrder: sortBy === 'Price low to high' ? 'asc' : sortBy === 'Price high to low' ? 'desc' : undefined,
      limit: PRODUCTS_PER_PAGE,
      offset: (currentPage - 1) * PRODUCTS_PER_PAGE,
    },
    skip: shouldUsePreloadedData
  });
  

  
  const accessories = React.useMemo(() => {
    if (shouldUsePreloadedData && categoryData.accessories) {
      return categoryData.accessories.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
    }
    return accessoriesData?.accessories || [];
  }, [shouldUsePreloadedData, categoryData.accessories, currentPage, accessoriesData?.accessories]);

  // Derive unique sizes and min/max prices from accessories
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    accessories.forEach((a: any) => a.sizePrices.forEach((sp: any) => set.add(sp.size)));
    return Array.from(set).sort();
  }, [accessories]);
  
  const [minPrice, maxPrice] = useMemo(() => {
    let min = Infinity, max = -Infinity;
    accessories.forEach((a: any) => a.sizePrices.forEach((sp: any) => {
      if (sp.price < min) min = sp.price;
      if (sp.price > max) max = sp.price;
    }));
    if (!isFinite(min) || !isFinite(max)) return [0, 50000];
    return [Math.floor(min), Math.ceil(max)];
  }, [accessories]);
  
  useEffect(() => {
    if (shouldResetPriceRange && (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) {
      setPriceRange([minPrice, maxPrice]);
      setShouldResetPriceRange(false);
    }
  }, [minPrice, maxPrice, shouldResetPriceRange, priceRange]);

  // Filter for in-stock (frontend, as backend does not support it)
  const filteredAccessories = useMemo(() => {
    let filtered = accessories;
    if (inStockOnly) filtered = filtered.filter((a: any) => a.inStock);
    return filtered;
  }, [accessories, inStockOnly]);

  // Pagination - smart logic like sneaker page
  const totalPages = React.useMemo(() => {
    if (filteredAccessories.length === 0) {
      // If we got no results and we're not on page 1, this means we've reached the end
      if (currentPage > 1) {
        return currentPage - 1;
      }
      return 1;
    }
    // If we got a full page of results, there might be more
    if (filteredAccessories.length === PRODUCTS_PER_PAGE) {
      return currentPage + 1;
    }
    // If we got fewer results than expected, this is the last page
    return currentPage;
  }, [filteredAccessories.length, currentPage]);
  const accessoryProducts = filteredAccessories.map((a: any) => {
    const lowest = a.sizePrices.reduce((min: number, sp: any) => sp.price < min ? sp.price : min, Infinity);
    return {
      id: a.id,
      brand: a.brand,
      productName: a.productName,
      images: a.images,
      price: lowest,
    };
  });

  // Subcategory ticker: show each subcategory with a representative image
  const subcategoryTickerData = useMemo(() => {
    // Only use the 7 available images and map them to specific subcategories
    const subcategoryToImageMap: { [key: string]: string } = {
      'sunglasses': '/accessoriesticker/Sunglasses.png',
      'belts': '/accessoriesticker/BELT.png',
      'belt': '/accessoriesticker/BELT.png',
      'hats': '/accessoriesticker/CAPS.png',
      'beanie': '/accessoriesticker/CAPS.png',
      'caps': '/accessoriesticker/CAPS.png',
      'scarves': '/accessoriesticker/SCARF.png',
      'scarf': '/accessoriesticker/SCARF.png',
      'socks': '/accessoriesticker/SOCKS.png',
      'sock': '/accessoriesticker/SOCKS.png',
      'backpack': '/accessoriesticker/STANLEY.png',
      'mini bags': '/accessoriesticker/STANLEY.png',
      'shoulder bags': '/accessoriesticker/STANLEY.png',
      'tote bags': '/accessoriesticker/STANLEY.png',
      'crossbody bag': '/accessoriesticker/STANLEY.png',
      'tumbler': '/accessoriesticker/STANLEY.png',
      'wallets': '/accessoriesticker/STANLEY.png',
      'watches': '/accessoriesticker/STANLEY.png',
      'tech accessories': '/accessoriesticker/PHONE CASE.png',
      'phone cases': '/accessoriesticker/PHONE CASE.png',
      'phone case': '/accessoriesticker/PHONE CASE.png',
    };

    // Create a fixed list in the correct order: Sunglasses → Scarves → Caps → Socks → Belts → Bags → Tech Accessories
    const fixedSubcategories = [
      { name: 'Sunglasses', image: '/accessoriesticker/Sunglasses.png' },
      { name: 'Scarves', image: '/accessoriesticker/SCARF.png' },
      { name: 'Hats', image: '/accessoriesticker/CAPS.png' },
      { name: 'Socks', image: '/accessoriesticker/SOCKS.png' },
      { name: 'Belts', image: '/accessoriesticker/BELT.png' },
      { name: 'Bags', image: '/accessoriesticker/STANLEY.png' },
      { name: 'Tech Accessories', image: '/accessoriesticker/PHONE CASE.png' },
    ];

    console.log('Fixed accessories subcategory ticker data:', fixedSubcategories);
    return fixedSubcategories;
  }, []);

  // Handlers
  const handleSubcategoryClick = (subcategory: string) => {
    // Handle clearing the filter
    if (subcategory === '') {
      setSelectedSubcategories([]);
      setCurrentPage(1);
      setShouldResetPriceRange(true);
      return;
    }
    
    // Map the fixed subcategory names to actual database subcategories for filtering
    const subcategoryMapping: { [key: string]: string } = {
      'Sunglasses': 'Sunglasses',
      'Scarves': 'Scarves',
      'Hats': 'Hats',
      'Socks': 'Socks',
      'Belts': 'Belts',
      'Bags': 'Backpack', // Map to Backpack for filtering
      'Tech Accessories': 'Tech Accessories',
    };
    
    const actualSubcategory = subcategoryMapping[subcategory] || subcategory;
    console.log('Clicked subcategory:', subcategory, 'Mapped to:', actualSubcategory);
    
    setSelectedSubcategories([actualSubcategory]);
    setCurrentPage(1);
    setShouldResetPriceRange(true);
  };
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
    setShouldResetPriceRange(true);
  };
  
  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
    setShouldResetPriceRange(true);
  };
  
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory) ? prev.filter(s => s !== subcategory) : [...prev, subcategory]
    );
    setCurrentPage(1);
    setShouldResetPriceRange(true);
  };
  
  const handleGenderChange = (gender: string) => {
    setSelectedGenders(prev =>
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
    setCurrentPage(1);
    setShouldResetPriceRange(true);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stickyBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stickyBar = stickyBarRef.current;
    if (!stickyBar) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        // This will be used for sticky behavior
      },
      {
        root: null,
        threshold: 1.0,
        rootMargin: '-67px 0px 0px 0px',
      }
    );
    observer.observe(stickyBar);
    return () => observer.disconnect();
  }, []);

  // Determine loading state
  const isLoading = !isPreloaded && apiLoading;

  return (
    <>
      {/* Mobile UI */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f1f1f1', paddingTop: 2 }}>
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessories' }]} />
          <AccessoriesBrandTicker brands={[]} onBrandClick={handleSubcategoryClick} currentPage="Accessories" />

          {/* Mobile Brand Selector */}
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
                    onClick={() => window.location.href = `/accessories/brand/${getBrandUrl(b)}`}
                    style={{
                      border: '2px solid #bfc9d1',
                      background: '#fff',
                      color: '#22304a',
                      borderRadius: 6,
                      padding: '6px 12px',
                      fontWeight: 500,
                      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      boxShadow: 'none',
                      borderBottom: '2.5px solid #bfc9d1',
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
          
          {/* Sticky mobile filter/sort bar */}
          <div style={{
            position: 'sticky',
            top: 90,
            zIndex: 50,
            background: '#f1f1f1',
            width: '100%',
            maxWidth: '100%',
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
                flex: 1,
                background: 'none',
                border: 'none',
                color: mobileOverlayTab === 'filter' ? '#22304a' : '#7a8ca3',
                fontSize: '1.13rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Montserrat',
                padding: '10px 0',
                borderBottom: mobileOverlayTab === 'filter' ? '2.5px solid #22304a' : '2.5px solid transparent',
                transition: 'color 0.2s, border-bottom 0.2s',
              }}
              onClick={() => {
                setMobileOverlayTab('filter');
                setShowFilter(true);
              }}
            >
              Filters
            </button>
            <button
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: mobileOverlayTab === 'sort' ? '#22304a' : '#7a8ca3',
                fontSize: '1.13rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Montserrat',
                padding: '10px 0',
                borderBottom: mobileOverlayTab === 'sort' ? '2.5px solid #22304a' : '2.5px solid transparent',
                transition: 'color 0.2s, border-bottom 0.2s',
              }}
              onClick={() => {
                setMobileOverlayTab('sort');
                setShowFilter(true);
              }}
            >
              Sort
            </button>
          </div>
          <AccessoriesMobileFilterOverlay
            show={showFilter}
            onClose={() => setShowFilter(false)}
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
            sizes={allSizes}
            selectedSizes={selectedSizes}
            onSizeChange={handleSizeChange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            tab={mobileOverlayTab}
            setTab={setMobileOverlayTab}
          />
          <div style={{ width: '100%', padding: 0, marginTop: 0 }}>
            <AccessoriesProductGrid products={accessoryProducts} mobile loading={isLoading} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      ) : (
        <>
          {/* Desktop UI - exactly like sneaker page */}
          {/* Breadcrumbs */}
          <div style={{ maxWidth: 1500, margin: '0 auto', padding: '24px 32px 0 32px' }}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Accessories' }
              ]}
            />
          </div>

          {/* Brand Ticker - same as sneaker page */}
          <AccessoriesBrandTicker brands={[]} onBrandClick={handleSubcategoryClick} currentPage="Accessories" />

          {/* Brand Selector and Hide Filter in one line, matching sneaker page exactly */}
          <div ref={stickyBarRef} style={{
            maxWidth: 1500,
            margin: '0 auto',
            padding: '4px 32px 0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            overflowX: 'visible',
            minHeight: 56,
            marginBottom: 18,
          }}>
            {/* Brand buttons row with arrows, exactly as sneaker page */}
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
                  const el = document.getElementById('brand-scroll-row');
                  if (el) el.scrollBy({ left: -180, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 28, height: 28 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div id="brand-scroll-row" style={{ display: 'flex', gap: 14, overflowX: 'auto', flex: 'none', scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: 48, maxWidth: '70vw' }}>
                {brands.map((b: string) => (
                  <button
                    key={b}
                    onClick={() => window.location.href = `/accessories/brand/${getBrandUrl(b)}`}
            style={{
                      border: '2px solid #bfc9d1',
                      background: '#fff',
                      color: '#22304a',
                      borderRadius: 8,
                      padding: '8px 18px',
                      fontWeight: 500,
                      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      boxShadow: 'none',
                      borderBottom: '2.5px solid #bfc9d1',
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
                  const el = document.getElementById('brand-scroll-row');
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
              <AccessoriesFilterSidebar
                show={showFilter}
                onHide={() => setShowFilter(false)}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                priceRange={priceRange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={setPriceRange}
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
                subcategories={subcategories}
                selectedSubcategories={selectedSubcategories}
                onSubcategoryChange={handleSubcategoryChange}
                genders={genders}
                selectedGenders={selectedGenders}
                onGenderChange={handleGenderChange}
                sizes={allSizes}
                selectedSizes={selectedSizes}
                onSizeChange={handleSizeChange}
                inStockOnly={inStockOnly}
                onInStockChange={setInStockOnly}
              />
            </div>
            <div style={{ 
                flex: 1,
              padding: 0, 
                marginTop: -30,
              transition: 'margin-left 0.3s ease',
              marginLeft: showFilter ? 0 : -14
            }}>
              <AccessoriesProductGrid products={accessoryProducts} loading={isLoading} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AccessoriesPage;