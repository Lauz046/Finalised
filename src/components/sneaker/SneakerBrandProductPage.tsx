import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import Navbar from '../nav/Navbar';
import { Breadcrumbs } from '../ProductPage/Breadcrumbs';
import SneakerFilterSidebar from './SneakerFilterSidebar';
import SneakerProductGrid from './SneakerProductGrid';
import SneakerMobileFilterOverlay from './SneakerMobileFilterOverlay';
import BrandSelector from '../BrandSelector';
import Pagination from './Pagination';
import SearchOverlay from '../SearchOverlay';
import ProductGridSkeleton from '../ProductGridSkeleton';
import { useProductContext } from '../../context/ProductContext';
import { getBrandUrl } from '../../utils/brandUtils';

const ALL_SNEAKER_BRANDS = gql`
  query AllSneakerBrands {
    allSneakerBrands
  }
`;

const ALL_SNEAKER_SIZES = gql`
  query AllSneakerSizes($brand: String) {
    allSneakerSizes(brand: $brand)
  }
`;

export const SNEAKERS_QUERY = gql`
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

const PRODUCTS_PER_PAGE = 21;

export default function SneakerBrandProductPage({ brand, initialSneakerData, apolloState }: { brand: string, initialSneakerData?: unknown[], apolloState?: unknown }) {
  const { categoryData, isPreloaded } = useProductContext();
  // Mobile overlay tab state
  const [mobileOverlayTab, setMobileOverlayTab] = useState<'filter' | 'sort'>('filter');
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldResetPriceRange, setShouldResetPriceRange] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  // Update showFilter based on mobile detection
  useEffect(() => {
    setShowFilter(!isMobile);
  }, [isMobile]);

  // Use pre-loaded data if available for brands
  const brands = useMemo(() => {
    if (isPreloaded && categoryData.sneakers?.length > 0) {
      return Array.from(new Set(categoryData.sneakers.map((p: unknown) => p.brand)));
    }
    return [];
  }, [isPreloaded, categoryData.sneakers]);

  // Use pre-loaded data for initial products if available (limit to first page)
  const preloadedBrandProducts = useMemo(() => {
    if (isPreloaded && categoryData.sneakers?.length > 0) {
      const filtered = categoryData.sneakers.filter((p: unknown) => 
        p.brand?.toLowerCase() === brand?.toLowerCase()
      );
      // Limit to first page to reduce data size
      return filtered.slice(0, PRODUCTS_PER_PAGE);
    }
    return [];
  }, [isPreloaded, categoryData.sneakers, brand]);

  // Determine if we should use preloaded data (no filters applied)
  const shouldUsePreloadedData = useMemo(() => {
    return isPreloaded && 
           preloadedBrandProducts.length > 0 && 
           !selectedSizes.length && 
           !sortBy && 
           !inStockOnly &&
           currentPage === 1; // Only use preloaded data on page 1
  }, [isPreloaded, preloadedBrandProducts.length, selectedSizes.length, sortBy, inStockOnly, currentPage]);

  const { data: brandsData } = useQuery(ALL_SNEAKER_BRANDS, {
    skip: isPreloaded && brands.length > 0
  });
  
  // Only fetch sizes if we have filters or no preloaded data
  const { data: allSizesData } = useQuery(ALL_SNEAKER_SIZES, { 
    variables: { brand },
    skip: isPreloaded || !selectedSizes.length // Skip if we have pre-loaded data or no size filters
  });

  const { data: sneakersData, loading } = useQuery(SNEAKERS_QUERY, {
    variables: {
      brand,
      size: selectedSizes.length === 1 ? selectedSizes[0] : undefined,
      sortOrder: sortBy === 'Price low to high' ? 'asc' : sortBy === 'Price high to low' ? 'desc' : undefined,
      limit: PRODUCTS_PER_PAGE,
      offset: (currentPage - 1) * PRODUCTS_PER_PAGE,
    },
    fetchPolicy: initialSneakerData || preloadedBrandProducts.length > 0 ? 'cache-and-network' : 'cache-first',
    nextFetchPolicy: 'cache-first',
    skip: shouldUsePreloadedData
  });

  // Prioritize static data, then query data, then pre-loaded data
  const sneakers = useMemo(() => {
    // If we have query data (for pagination), use it
    if (sneakersData?.sneakers) {
      return sneakersData.sneakers;
    }
    // First priority: Static data from getStaticProps (only on page 1)
    if (initialSneakerData && initialSneakerData.length > 0 && currentPage === 1) {
      return initialSneakerData;
    }
    // Second priority: Pre-loaded data (limited)
    if (shouldUsePreloadedData) {
      return preloadedBrandProducts;
    }
    return [];
  }, [initialSneakerData, sneakersData, shouldUsePreloadedData, preloadedBrandProducts, currentPage]);

  // Simple pagination logic (same as /sneaker page)
  const totalPages = useMemo(() => {
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

  // Derive sizes from available data instead of making separate query
  const allSizes = useMemo(() => {
    if (allSizesData?.allSneakerSizes) {
      return allSizesData.allSneakerSizes;
    }
    // Derive from available products
    const sizeSet = new Set<string>();
    sneakers.forEach((s: unknown) => {
      if (s.sizePrices) {
        s.sizePrices.forEach((sp: unknown) => {
          if (sp.size) sizeSet.add(sp.size);
        });
      }
    });
    return Array.from(sizeSet).sort();
  }, [allSizesData?.allSneakerSizes, sneakers]);

  const [minPrice, maxPrice] = useMemo(() => {
    let _min = Infinity, max = -Infinity;
    sneakers.forEach((s: unknown) => {
      if (s.sizePrices) {
        s.sizePrices.forEach((sp: unknown) => {
          if (sp.price < _min) _min = sp.price;
          if (sp.price > max) max = sp.price;
        });
      }
    });
    if (!isFinite(_min) || !isFinite(max)) return [0, 50000];
    return [Math.floor(_min), Math.ceil(max)];
  }, [sneakers]);

  useEffect(() => {
    if (shouldResetPriceRange && (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) {
      setPriceRange([minPrice, maxPrice]);
      setShouldResetPriceRange(false);
    }
  }, [minPrice, maxPrice, shouldResetPriceRange]);

  // Pagination (now backend-driven)
  const paginatedSneakers = sneakers;

  const sneakerProducts = paginatedSneakers.map((s: unknown) => {
    const lowest = s.sizePrices ? s.sizePrices.reduce((min: number, sp: unknown) => sp.price < min ? sp.price : min, Infinity) : 0;
    return {
      id: s.id,
      brand: s.brand,
      productName: s.productName,
      images: s.images,
      price: lowest,
    };
  });

  // Brand ticker data for mobile
  const brandTickerData = useMemo(() => {
    const availableBrands = brandsData?.allSneakerBrands || brands;
    return availableBrands.map((brandName: string) => {
      const sneaker = sneakers.find((s: unknown) => s.brand === brandName);
      return {
        name: brandName,
        image: sneaker?.images?.[0] || '/image1.jpeg',
      };
    });
  }, [brandsData?.allSneakerBrands, brands, sneakers]);

  // Handlers
  const handleBrandClick = (brandName: string) => {
    if (brandName !== brand) {
      window.location.href = `/sneaker/brand/${getBrandUrl(brandName)}`;
    }
  };
  
  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
    setShouldResetPriceRange(true);
  };

  const stickyBarRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [gridScrollable, setGridScrollable] = useState(false);

  // Function to calculate responsive text size and position based on brand name length
  const getBrandTextStyle = (brandName: string, isMobileView: boolean) => {
    const nameLength = brandName.length;
    
    if (isMobileView) {
      // Mobile responsive text sizing
      let fontSize = '3.2rem';
      let transformY = '5%';
      
      if (nameLength > 15) {
        fontSize = '2.2rem';
        transformY = '0%';
      } else if (nameLength > 10) {
        fontSize = '2.6rem';
        transformY = '2%';
      } else if (nameLength > 6) {
        fontSize = '2.8rem';
        transformY = '3%';
      }
      
      return {
        fontSize,
        transform: `translate(-50%, ${transformY})`
      };
    } else {
      // Desktop responsive text sizing
      let fontSize = '5rem';
      let transformY = '-10%';
      
      if (nameLength > 20) {
        fontSize = '3.5rem';
        transformY = '-5%';
      } else if (nameLength > 15) {
        fontSize = '4rem';
        transformY = '-8%';
      } else if (nameLength > 10) {
        fontSize = '4.5rem';
        transformY = '-9%';
      }
      
      return {
        fontSize,
        transform: `translate(-50%, ${transformY})`
      };
    }
  };

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

  // Use brands from query if available, otherwise use preloaded data
  const availableBrands = brandsData?.allSneakerBrands || brands;

  // Loading state with skeleton
  if (loading && !shouldUsePreloadedData) {
    return (
      <>
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />
        {/* Static image banner skeleton */}
        <div style={{ 
          width: '100vw', 
          marginLeft: 'calc(50% - 50vw)', 
          height: isMobile ? 300 : 400, 
          overflow: 'hidden', 
          background: '#eee', 
          position: 'relative' 
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite'
          }} />
        </div>
        
        {/* Breadcrumbs skeleton */}
        <div style={{ maxWidth: 1500, margin: '0 auto', padding: '24px 32px 0 32px' }}>
          <div style={{ height: 20, background: '#f0f0f0', width: '60%', borderRadius: 4 }} />
        </div>
        
        {/* Brand list skeleton */}
        <div style={{ maxWidth: 1500, margin: '0 auto', padding: '4px 32px 0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, overflowX: 'hidden' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{
                width: 120,
                height: 48,
                background: '#f0f0f0',
                borderRadius: 8,
                flexShrink: 0
              }} />
            ))}
          </div>
        </div>
        
        {/* Product grid skeleton */}
        <div style={{ maxWidth: 1500, margin: '0 auto', padding: '24px 32px' }}>
          <ProductGridSkeleton count={8} />
        </div>
        
        <style jsx>{`
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      {/* Mobile UI */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f1f1f1', paddingTop: 2 }}>
          {/* Static image banner */}
          <div style={{ 
            width: '100vw', 
            marginLeft: 'calc(50% - 50vw)', 
            height: 300, 
            overflow: 'hidden', 
            background: '#eee', 
            position: 'relative' 
          }}>
            <img src="/static.jpg" alt="Brand Banner" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', marginTop: '40px' }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: getBrandTextStyle(brand, true).transform,
              color: '#ffffff',
              fontSize: getBrandTextStyle(brand, true).fontSize,
              fontWeight: '600',
              textAlign: 'center',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
              fontFamily: 'Montserrat, Arial, sans-serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              zIndex: 2,
              opacity: 1
            }}>
              {brand}
            </div>
          </div>
          
          <div style={{ padding: '0 16px', marginTop: 16 }}>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sneaker', href: '/sneaker' }, { label: brand }]} />
          </div>

          {/* Mobile Brand Selector - matching sneaker page exactly */}
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
            {/* Brand buttons row with arrows - matching sneaker page */}
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
                {availableBrands.map((b: string) => (
                  <button
                    key={b}
                    onClick={() => {
                      if (b !== brand) window.location.href = `/sneaker/brand/${getBrandUrl(b)}`;
                    }}
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
            onSortByChange={setSortBy}
            brands={availableBrands}
            selectedBrands={[brand]}
            onBrandChange={() => {}}
            sizes={allSizes}
            selectedSizes={selectedSizes}
            onSizeChange={handleSizeChange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            tab={mobileOverlayTab}
            setTab={setMobileOverlayTab}
          />
          
          {/* Prevent scroll when filter is open */}
          {showFilter && (
            <style jsx global>{`
              body {
                overflow: hidden !important;
              }
            `}</style>
          )}
          
          <div style={{ width: '100%', padding: 0, marginTop: 0 }}>
            <SneakerProductGrid 
              products={sneakerProducts}
              mobile
              loading={loading && !shouldUsePreloadedData}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              loading={loading && !shouldUsePreloadedData}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Desktop UI - unchanged */}
      {/* Static image banner */}
      <div style={{ 
        width: '100vw', 
        marginLeft: 'calc(50% - 50vw)', 
        height: isMobile ? 300 : 400, 
        overflow: 'hidden', 
        background: '#eee', 
        position: 'relative' 
      }}>
        <img 
          src="/static.jpg" 
          alt="Brand Banner" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            display: 'block',
            marginTop: isMobile ? '40px' : '20px'
          }} 
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: getBrandTextStyle(brand, false).transform,
          color: '#ffffff',
          fontSize: getBrandTextStyle(brand, false).fontSize,
          fontWeight: '600',
          textAlign: 'center',
          textShadow: '1px 1px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.2)',
          fontFamily: 'Montserrat, Arial, sans-serif',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          zIndex: 2,
          opacity: 1
        }}>
          {brand}
        </div>
      </div>
      {/* Breadcrumbs */}
          <div style={{ maxWidth: 1500, margin: '0 auto', padding: '24px 32px 0 32px' }}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Sneaker', href: '/sneaker' },
            { label: brand }
          ]}
        />
      </div>
      {/* Brand Selector and Hide Filter in one line, matching accessories exactly */}
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
        {/* Brand buttons row with arrows, exactly as accessories */}
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
            {availableBrands.map((b: string) => (
              <button
                key={b}
                onClick={() => {
                  if (b !== brand) window.location.href = `/sneaker/brand/${getBrandUrl(b)}`;
                }}
                style={{
                  border: b === brand ? '2px solid #22304a' : '2px solid #bfc9d1',
                  background: '#fff',
                  color: '#22304a',
                  borderRadius: 8,
                      padding: '8px 18px',
                  fontWeight: 500,
                  fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                      fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: b === brand ? '0 2px 8px rgba(30,167,253,0.08)' : 'none',
                  borderBottom: b === brand ? '2.5px solid #0a2230' : '2.5px solid #bfc9d1',
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
            onSortByChange={setSortBy}
            priceRange={priceRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={setPriceRange}
            brands={availableBrands}
            selectedBrands={[brand]}
            onBrandChange={() => {}}
            sizes={allSizes}
            selectedSizes={selectedSizes}
            onSizeChange={size => setSelectedSizes(prev =>
              prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
            )}
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
          <SneakerProductGrid products={sneakerProducts} loading={loading && !shouldUsePreloadedData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            loading={loading && !shouldUsePreloadedData}
          />
        </div>
      </div>
        </>
      )}
    </>
  );
}