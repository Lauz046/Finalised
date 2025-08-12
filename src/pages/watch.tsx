import React, { useState, useEffect, useMemo, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import WatchBrandTicker from '../components/watch/WatchBrandTicker';
import { getBrandUrl } from '../utils/brandUtils';
import WatchFilterSidebar from '../components/watch/WatchFilterSidebar';
import WatchProductGrid from '../components/watch/WatchProductGrid';
import WatchMobileFilterOverlay from '../components/watch/WatchMobileFilterOverlay';
import Pagination from '../components/watch/Pagination';
import { Breadcrumbs } from '../components/ProductPage/Breadcrumbs';
import { useProductContext } from '../context/ProductContext';

const ALL_WATCH_BRANDS = gql`
  query AllWatchBrands {
    allWatchBrands
  }
`;

const ALL_WATCH_GENDERS = gql`
  query AllWatchGenders {
    allWatchGenders
  }
`;

const WATCHES_QUERY = gql`
  query Watches($brand: String, $color: String, $gender: String, $sortOrder: String) {
    watches(brand: $brand, color: $color, gender: $gender, sortOrder: $sortOrder) {
      id
      brand
      name
      color
      salePrice
      marketPrice
      images
      gender
    }
  }
`;

const PRODUCTS_PER_PAGE = 24;

const WatchPage = () => {
  const { categoryData, isPreloaded, loadCategoryData, isCategoryLoaded } = useProductContext();
  const router = useRouter();
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile overlay tab state
  const [mobileOverlayTab, setMobileOverlayTab] = useState<'filter' | 'sort'>('filter');
  // State for filters - only show on desktop by default
  const [showFilter, setShowFilter] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
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

  // Fetch brands and genders
  const { data: brandsData } = useQuery(ALL_WATCH_BRANDS);
  const { data: gendersData } = useQuery(ALL_WATCH_GENDERS);
  
  const brands = brandsData?.allWatchBrands || [];
  const genders = gendersData?.allWatchGenders || [];

  // Load category data if not already loaded
  useEffect(() => {
    if (!isCategoryLoaded('watches')) {
      loadCategoryData('watches');
    }
  }, [loadCategoryData, isCategoryLoaded]);

  /*
    Apply subcategory filter if it comes via query string, eg. /watch?subcategory=MALE
    We only apply it on initial load (when no gender has been selected yet) to
    avoid overriding user interactions.
  */
  useEffect(() => {
    if (!router.isReady) return;
    const sp = router.query.subcategory;
    if (sp && selectedGenders.length === 0) {
      const raw = Array.isArray(sp) ? sp[0] : sp;
      if (typeof raw === 'string' && raw.trim() !== '') {
        setSelectedGenders([raw]);
      }
    }
    // We only want to run this once when router is ready.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // Always fetch watches from the backend; we'll fall back to any cached/pre-loaded data only while the query is loading.
  const { data: watchesData, loading: apiLoading } = useQuery(WATCHES_QUERY, {
    variables: {
      brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
      color: selectedColors.length === 1 ? selectedColors[0] : undefined,
      gender: selectedGenders.length === 1 ? selectedGenders[0] : undefined,
      sortOrder: sortBy === 'Price low to high' ? 'asc' : sortBy === 'Price high to low' ? 'desc' : undefined,
    },
    skip: false
  });

  // Use freshly fetched data when available, otherwise rely on the (limited) pre-loaded cache.
  // If the user hasn't chosen a price sort we default to the natural data order: ascending by (numeric) id.
  const watches = useMemo(() => {
    const list = (watchesData?.watches || categoryData.watches || []);
    if (sortBy === '') {
      return [...list].sort((a: unknown, b: unknown) => {
        const aId = parseInt(a.id, 10);
        const bId = parseInt(b.id, 10);
        // Fallback for non-numeric ids
        if (isNaN(aId) || isNaN(bId)) return 0;
        return aId - bId;
      });
    }
    return list;
  }, [watchesData, categoryData, sortBy]);
  
  // Reset loading state when data loads
  useEffect(() => {
    if (watches.length > 0 && shouldResetPriceRange) {
      setShouldResetPriceRange(false);
    }
  }, [watches, shouldResetPriceRange]);

  // Derive unique colors and min/max prices from watches
  const allColors = useMemo(() => {
    const set = new Set<string>();
    watches.forEach((w: unknown) => {
      if (w.color) set.add(w.color);
    });
    return Array.from(set).sort();
  }, [watches]);
  
  const [minPrice, maxPrice] = useMemo(() => {
    let _min = Infinity, max = -Infinity;
    watches.forEach((w: unknown) => {
      if (w.salePrice < _min) _min = w.salePrice;
      if (w.salePrice > max) max = w.salePrice;
    });
    if (!isFinite(_min) || !isFinite(max)) return [0, 50000];
    return [Math.floor(_min), Math.ceil(max)];
  }, [watches]);
  
  useEffect(() => {
    if (shouldResetPriceRange && (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) {
      setPriceRange([minPrice, maxPrice]);
      setShouldResetPriceRange(false);
    }
  }, [minPrice, maxPrice, shouldResetPriceRange, priceRange]);

  // Filter for in-stock (frontend, as backend does not support it)
  const filteredWatches = useMemo(() => {
    let filtered = watches;
    if (inStockOnly) filtered = filtered.filter((w: unknown) => w.inStock);
    return filtered;
  }, [watches, inStockOnly]);

  // Pagination
  const totalPages = Math.ceil(filteredWatches.length / PRODUCTS_PER_PAGE);
  const paginatedWatches = filteredWatches.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Brand ticker: show only brands that have ticker images, with "Other" fallback
  const brandTickerData = useMemo(() => {
    const availableBrandImages: { [key: string]: string } = {
      'rolex': '/watchticker/Rolex.png',
      'carl f bucherer': '/watchticker/Carl F Bucherer.png',
      'graham': '/watchticker/GRAHAM.png',
      'vacheron constantin': '/watchticker/Vacheron Constantin.png',
      'glashütte': '/watchticker/GLASHUTTE.png',
      'glashütte original': '/watchticker/GLASHUTTE.png',
      'de bethune': '/watchticker/De Bethune.png',
      'arnold & son': '/watchticker/ARNOLD & SON.png',
      'bell & ross': '/watchticker/BELL & ROSS.png',
    };

    const brandsWithImages = brands.filter((brand: string) => {
      const normalizedBrand = brand.toLowerCase();
      return availableBrandImages[normalizedBrand];
    });

    const data = brandsWithImages.map((brand: string) => {
      const normalizedBrand = brand.toLowerCase();
      return {
        name: brand,
        image: availableBrandImages[normalizedBrand] || '/watchticker/Rolex.png',
      };
    });

    // Add "Other" category for brands without images
    const brandsWithoutImages = brands.filter((brand: string) => {
      const normalizedBrand = brand.toLowerCase();
      return !availableBrandImages[normalizedBrand];
    });

    if (brandsWithoutImages.length > 0) {
      data.push({
        name: 'Other',
        image: '/watchticker/Rolex.png',
      });
    }

    console.log('Watch brand ticker data:', data);
    return data;
  }, [brands]);

  // Handlers
  const handleBrandClick = (brand: string) => {
    if (brand === '') {
      // Clear all brand filters
      setSelectedBrands([]);
      setCurrentPage(1);
      setShouldResetPriceRange(true);
      return;
    }
    
    // Filter by the selected brand
    setSelectedBrands([brand]);
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
  
  const handleColorChange = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
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
    setShouldResetPriceRange(true);
    // Scroll to top when page changes
    if (page > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Prepare watch products for grid
  const watchProducts = paginatedWatches.map((w: unknown) => {
    return {
      id: w.id,
      brand: w.brand,
      name: w.name,
      images: w.images,
      price: w.salePrice,
      marketPrice: w.marketPrice,
    };
  });

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

  // Determine loading state
  const isLoading = (!isPreloaded && apiLoading) || shouldResetPriceRange;
  
  console.log('Watch pagination debug:', {
    totalWatches: filteredWatches.length,
    totalPages,
    currentPage,
    productsPerPage: PRODUCTS_PER_PAGE,
    paginatedWatchesLength: paginatedWatches.length,
    isLoading
  });

  return (
    <>
      {/* Mobile UI */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f1f1f1', paddingTop: 2 }}>
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Watches' }]} />
          <WatchBrandTicker brands={brandTickerData} onBrandClick={handleBrandClick} currentPage="Watches" />

          {/* Mobile Brand Selector */}
          <div style={{
            margin: '16px auto 0 auto',
            padding: '4px 16px 0 16px',
            display: 'none', // Hidden on mobile
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
                  marginRight: 2,
                }}
                onClick={() => {
                  const el = document.getElementById('brand-scroll-row-mobile');
                  if (el) el.scrollBy({ left: -120, behavior: 'smooth' });
                }}
                style={{ marginRight: '10px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div id="brand-scroll-row-mobile" style={{ display: 'flex', gap: 8, overflowX: 'auto', flex: 'none', scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: 40, maxWidth: 'calc(100% - 75px)' }}>
                {brands.map((b: string) => (
                  <button
                    key={b}
                    onClick={() => window.location.href = `/watch/brand/${getBrandUrl(b)}`}
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
                style={{ marginLeft: '10px' }}
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
          
          <WatchMobileFilterOverlay
            show={showFilter}
            onClose={() => setShowFilter(false)}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            colors={allColors}
            selectedColors={selectedColors}
            onColorChange={handleColorChange}
            genders={genders}
            selectedGenders={selectedGenders}
            onGenderChange={handleGenderChange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            tab={mobileOverlayTab}
            setTab={setMobileOverlayTab}
          />
          
          <div style={{ width: '100%', padding: 0, marginTop: 0 }}>
            <WatchProductGrid 
              products={paginatedWatches}
              mobile
              loading={isLoading}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
                { label: 'Watches' }
              ]}
            />
          </div>
          
          {/* Brand Ticker - same as brand-wise page */}
          <WatchBrandTicker brands={brandTickerData.length > 0 ? brandTickerData : [{ name: 'Loading...', image: '/image1.jpeg' }]} onBrandClick={handleBrandClick} currentPage="Watches" />
          
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 'none', minHeight: 56, position: 'relative', maxWidth: '80vw', justifyContent: 'center' }}>
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
                    onClick={() => window.location.href = `/watch/brand/${getBrandUrl(b)}`}
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
              <WatchFilterSidebar
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
                colors={allColors}
                selectedColors={selectedColors}
                onColorChange={handleColorChange}
                genders={genders}
                selectedGenders={selectedGenders}
                onGenderChange={handleGenderChange}
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
              <WatchProductGrid products={paginatedWatches} />
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

export default WatchPage;