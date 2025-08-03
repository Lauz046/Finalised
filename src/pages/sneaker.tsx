import React, { useState, useEffect, useMemo, useRef } from 'react';
import SneakerMobileFilterOverlay from '../components/sneaker/SneakerMobileFilterOverlay';
import { gql, useQuery } from '@apollo/client';
import BrandTicker from '../components/sneaker/BrandTicker';
import { getBrandUrl } from '../utils/brandUtils';
import SneakerFilterSidebar from '../components/sneaker/SneakerFilterSidebar';
import SneakerProductGrid from '../components/sneaker/SneakerProductGrid';
import Pagination from '../components/sneaker/Pagination';
import { Breadcrumbs } from '../components/ProductPage/Breadcrumbs';
import { useProductContext } from '../context/ProductContext';

const ALL_SNEAKER_BRANDS = gql`
  query AllSneakerBrands {
    allSneakerBrands
  }
`;

const SNEAKERS_QUERY = gql`
  query Sneakers($brand: String, $size: String, $sortOrder: String, $limit: Int, $offset: Int) {
    sneakers(brand: $brand, size: $size, sortOrder: $sortOrder, limit: $limit, offset: $offset) {
      id
      brand
      productName
      sizePrices { size price }
      images
      soldOut
    }
  }
`;

const ALL_SNEAKER_SIZES = gql`
  query AllSneakerSizes($brand: String) {
    allSneakerSizes(brand: $brand)
  }
`;

const PRODUCTS_PER_PAGE = 21;

const SneakerPage = () => {
  const { categoryData, isPreloaded, loadCategoryData, isCategoryLoaded } = useProductContext();
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile overlay tab state
  const [mobileOverlayTab, setMobileOverlayTab] = useState<'filter' | 'sort'>('filter');
  // State for filters - only show on desktop by default
  const [showFilter, setShowFilter] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldResetPriceRange, setShouldResetPriceRange] = useState(true);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const newIsMobile = window.innerWidth < 900;
        setIsMobile(newIsMobile);
        // Update filter visibility based on device type
        if (newIsMobile) {
          setShowFilter(false); // Don't show filter on mobile by default
        } else {
          setShowFilter(true); // Show filter on desktop by default
        }
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Fetch brands
  const { data: brandsData } = useQuery(ALL_SNEAKER_BRANDS);
  const brands: string[] = React.useMemo(() => brandsData?.allSneakerBrands || [], [brandsData]);

  // Load category data if not already loaded
  useEffect(() => {
    if (!isCategoryLoaded('sneakers')) {
      loadCategoryData('sneakers');
    }
  }, [loadCategoryData, isCategoryLoaded]);

  // Determine if we should use preloaded data or fetch from API
  const shouldUsePreloadedData = isPreloaded && 
    selectedBrands.length === 0 && 
    selectedSizes.length === 0 && 
    sortBy === '' && 
    currentPage === 1;

  // Use pre-loaded data if available, otherwise fetch from API
  const { data: sneakersData, loading: apiLoading } = useQuery(SNEAKERS_QUERY, {
    variables: {
      brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
      size: selectedSizes.length === 1 ? selectedSizes[0] : undefined,
      sortOrder: sortBy === 'Price low to high' ? 'asc' : sortBy === 'Price high to low' ? 'desc' : undefined,
      limit: PRODUCTS_PER_PAGE,
      offset: (currentPage - 1) * PRODUCTS_PER_PAGE,
    },
    skip: shouldUsePreloadedData
  });

  // Use pre-loaded data when no filters are applied
  const sneakers: Array<{
    id: string;
    brand: string;
    productName: string;
    sizePrices: Array<{ size: string; price: number }>;
    images: string[];
    soldOut: boolean;
  }> = React.useMemo(() => {
    if (shouldUsePreloadedData && categoryData.sneakers) {
      return categoryData.sneakers.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
    }
    return sneakersData?.sneakers || [];
  }, [shouldUsePreloadedData, categoryData.sneakers, currentPage, sneakersData?.sneakers]);

  // Get all available sizes for the selected brands
  const { data: allSizesData } = useQuery(ALL_SNEAKER_SIZES, {
    variables: { brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined },
    skip: selectedBrands.length !== 1
  });

  const allSizes = React.useMemo(() => {
    if (allSizesData?.allSneakerSizes) {
      return allSizesData.allSneakerSizes;
    }
    return [];
  }, [allSizesData]);

  // Calculate price range from data
  const { minPrice, maxPrice } = React.useMemo(() => {
    if (!categoryData.sneakers || categoryData.sneakers.length === 0) {
      return { minPrice: 0, maxPrice: 50000 };
    }

    const allPrices = categoryData.sneakers.flatMap((sneaker: unknown) =>
      sneaker.sizePrices.map((sp: unknown) => sp.price)
    );

    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);

    return { minPrice: min, maxPrice: max };
  }, [categoryData.sneakers]);

  // Reset price range when filters change
  useEffect(() => {
    if (shouldResetPriceRange) {
      setPriceRange([minPrice, maxPrice]);
      setShouldResetPriceRange(false);
    }
  }, [minPrice, maxPrice, shouldResetPriceRange]);

  // Filter products based on price range and other filters
  const filteredSneakers = React.useMemo(() => {
    return sneakers.filter((sneaker) => {
      const lowestPrice = sneaker.sizePrices.reduce((min, sp) => sp.price < min ? sp.price : min, Infinity);
      
      // Price filter
      if (lowestPrice < priceRange[0] || lowestPrice > priceRange[1]) {
        return false;
      }
      
      // In stock filter
      if (inStockOnly && sneaker.soldOut) {
        return false;
      }
      
      return true;
    });
  }, [sneakers, priceRange, inStockOnly]);

  // Convert to product format for grid
  const sneakerProducts = filteredSneakers.map((s: {
    id: string;
    brand: string;
    productName: string;
    sizePrices: Array<{ size: string; price: number }>;
    images: string[];
    soldOut: boolean;
  }) => {
    const lowest = s.sizePrices.reduce((min: number, sp: { size: string; price: number }) => sp.price < min ? sp.price : min, Infinity);
    return {
      id: s.id,
      brand: s.brand,
      productName: s.productName,
      images: s.images,
      price: lowest,
    };
  });

  // Brand ticker data with brand-specific images
  const brandTickerData = React.useMemo(() => {
    const brandImageMapping: { [key: string]: string } = {
      'nike': '/sneakerticker/NIKE.png',
      'air jordan': '/sneakerticker/AIR JORDAN CARD.png',
      'adidas': '/sneakerticker/SAMBA CARDS.png',
      'yeezy': '/sneakerticker/SAMBA CARDS.png',
      'new balance': '/sneakerticker/NEW BALANCE.png',
      'on': '/sneakerticker/ON CLOUD CARD.png',
      'dunks': '/sneakerticker/Dunks card.png',
      'sb dunks': '/sneakerticker/SB DUNKS CARD.png',
      'nike dunk': '/sneakerticker/Dunks card.png',
      'af1': '/sneakerticker/AF1.png',
      'air force': '/sneakerticker/AF1.png',
      'air force 1': '/sneakerticker/AF1.png',
      'balenciaga': '/sneakerticker/LUXURY CARD.png',
      'amiri': '/sneakerticker/LUXURY CARD.png',
      'gucci': '/sneakerticker/LUXURY CARD.png',
      'dolce and gabbana': '/sneakerticker/LUXURY CARD.png',
      'dolce & gabbana': '/sneakerticker/LUXURY CARD.png',
    };

    return brands.map((brandName: string) => {
      const normalizedBrand = brandName.toLowerCase();
      const image = brandImageMapping[normalizedBrand] || '/sneakerticker/NIKE.png';
      return {
        name: brandName,
        image: image,
      };
    });
  }, [brands]);

  // Simple pagination logic (same as brand-wise page)
  const totalPages = React.useMemo(() => {
    if (sneakers.length === 0) {
      // If we got no results and we're not on page 1, this means we've reached the end
      if (currentPage > 1) {
        return currentPage - 1;
      }
      return 1;
    }
    // If we got a full page of results, there might be more
    if (sneakers.length === PRODUCTS_PER_PAGE) {
      return currentPage + 1;
    }
    // If we got fewer results than expected, this is the last page
    return currentPage;
  }, [sneakers.length, currentPage]);

  const handleBrandClick = (filterType: string) => {
    if (filterType === '') {
      setSelectedBrands([]);
      setCurrentPage(1);
      setShouldResetPriceRange(true);
      return;
    }
    
    // Handle specific filter types
    if (filterType === 'Luxury') {
      setSelectedBrands(['Amiri', 'Louis Vuitton']);
    } else if (filterType === 'Samba') {
      setSelectedBrands(['Adidas']);
    } else {
      setSelectedBrands([filterType]);
    }
    
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

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    setShouldResetPriceRange(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Trigger loading state for pagination
    setShouldResetPriceRange(true);
  };

  // Scroll to top when filters change
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const stickyBarRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [gridScrollable, setGridScrollable] = useState(false);

  useEffect(() => {
    const stickyBar = stickyBarRef.current;
    if (!stickyBar) return;
    
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setGridScrollable(!entry.isIntersecting);
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

  // Determine loading state - show loading for pagination changes too
  const isLoading = (!isPreloaded && apiLoading) || shouldResetPriceRange;

  return (
    <>
      {/* Mobile UI */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f1f1f1', paddingTop: 2 }}>
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sneakers' }]} />
          <BrandTicker brands={[]} onBrandClick={handleBrandClick} currentPage="Sneakers" />

          {/* Mobile Brand Selector */}
          <div style={{
            margin: '16px auto 0 auto',
            padding: '4px 16px 0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            overflowX: 'visible',
            minHeight: 48,
            marginBottom: 8,
            maxWidth: '100%',
          }}>
            {/* Brand buttons row with arrows - mobile optimized */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 'none', minHeight: 48, position: 'relative', maxWidth: '100%' }}>
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
                  marginRight: 10,
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
              <div id="brand-scroll-row-mobile" style={{ display: 'flex', gap: 8, overflowX: 'auto', flex: 'none', scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: 40, maxWidth: 'calc(100% - 75px)' }}>
                {brands.map((b: string) => (
                  <button
                    key={b}
                    onClick={() => window.location.href = `/sneaker/brand/${getBrandUrl(b)}`}
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
                  marginLeft: 10,
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
          
          <SneakerMobileFilterOverlay
            show={showFilter}
            onClose={() => setShowFilter(false)}
            sortBy={sortBy}
            onSortByChange={handleSortChange}
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            sizes={allSizes}
            selectedSizes={selectedSizes}
            onSizeChange={handleSizeChange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            tab={mobileOverlayTab}
            setTab={setMobileOverlayTab}
            onApplyFilters={() => {
              // Trigger loading state when filters are applied
              setCurrentPage(1);
              setShouldResetPriceRange(true);
            }}
          />
          
          <div style={{ width: '100%', padding: 0, marginTop: 0 }}>
            <SneakerProductGrid 
              products={sneakerProducts}
              mobile
              loading={isLoading}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} loading={isLoading} />
          </div>
        </div>
      ) : (
        <>
          {/* Desktop UI - exactly like brand-wise page */}
          {/* Breadcrumbs */}
          <div style={{ maxWidth: 1500, margin: '0 auto', padding: '24px 32px 0 32px' }}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Sneakers' }
              ]}
            />
          </div>
          
          {/* Brand Ticker - same as brand-wise page */}
          <BrandTicker brands={[]} onBrandClick={handleBrandClick} currentPage="Sneakers" />
          
          {/* Brand Selector and Hide Filter in one line, matching brand-wise page exactly */}
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
            {/* Brand buttons row with arrows, exactly as brand-wise page */}
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
                    onClick={() => window.location.href = `/sneaker/brand/${getBrandUrl(b)}`}
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
              <SneakerFilterSidebar
                show={showFilter}
                onHide={() => setShowFilter(false)}
                sortBy={sortBy}
                onSortByChange={handleSortChange}
                priceRange={priceRange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={setPriceRange}
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
                sizes={allSizes}
                selectedSizes={selectedSizes}
                onSizeChange={handleSizeChange}
                inStockOnly={inStockOnly}
                onInStockChange={setInStockOnly}
                onApplyFilters={() => {
                  // Trigger loading state when filters are applied
                  setCurrentPage(1);
                  setShouldResetPriceRange(true);
                }}
              />
            </div>
            <div style={{ 
              flex: 1, 
              padding: 0, 
              marginTop: -30,
              transition: 'margin-left 0.3s ease',
              marginLeft: showFilter ? 0 : -14
            }}>
              <SneakerProductGrid products={sneakerProducts} loading={isLoading} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={isLoading}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SneakerPage;