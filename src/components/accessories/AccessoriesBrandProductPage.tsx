import React, { useState, useMemo, useEffect, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Breadcrumbs } from '../ProductPage/Breadcrumbs';
import AccessoriesFilterSidebar from './AccessoriesFilterSidebar';
import AccessoriesProductGrid from './AccessoriesProductGrid';
import AccessoriesMobileFilterOverlay from './AccessoriesMobileFilterOverlay';
import Pagination from './Pagination';
import { getBrandUrl, normalizeBrandForDatabase } from '../../utils/brandUtils';

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
export const ACCESSORIES_QUERY = gql`
  query Accessories($brand: String, $subcategory: String, $gender: String, $size: String, $sortOrder: String) {
    accessories(brand: $brand, subcategory: $subcategory, gender: $gender, size: $size, sortOrder: $sortOrder) {
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
const PRODUCTS_PER_PAGE = 24;

export default function AccessoriesBrandProductPage({ brand }: { brand: string }) {
  // Mobile overlay tab state
  const [mobileOverlayTab, setMobileOverlayTab] = useState<'filter' | 'sort'>('filter');
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldResetPriceRange, setShouldResetPriceRange] = useState(true);
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  const [gridScrollable, setGridScrollable] = useState(false);
  
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

  // Function to calculate responsive text size and position based on brand name length
  const getBrandTextStyle = (brandName: string, isMobileView: boolean) => {
    const nameLength = brandName.length;
    
    if (isMobileView) {
      // Mobile responsive text sizing - smaller and better positioned
      let fontSize = '2.2rem';
      let transformY = '-5%';
      let lineHeight = '1.2';
      
      if (nameLength > 20) {
        fontSize = '1.4rem';
        transformY = '0%';
        lineHeight = '1.1';
      } else if (nameLength > 15) {
        fontSize = '1.6rem';
        transformY = '-2%';
        lineHeight = '1.15';
      } else if (nameLength > 10) {
        fontSize = '1.8rem';
        transformY = '-4%';
        lineHeight = '1.2';
      } else if (nameLength > 6) {
        fontSize = '2rem';
        transformY = '-6%';
        lineHeight = '1.2';
      }
      
      return {
        fontSize,
        transform: `translate(-50%, ${transformY})`,
        lineHeight
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

  const { data: brandsData } = useQuery(ALL_ACCESSORY_BRANDS);
  const { data: subcategoriesData } = useQuery(ALL_ACCESSORY_SUBCATEGORIES);
  const { data: gendersData } = useQuery(ALL_ACCESSORY_GENDERS);
  const brands = brandsData?.allAccessoryBrands || [];
  const subcategories = subcategoriesData?.allAccessorySubcategories || [];
  const genders = gendersData?.allAccessoryGenders || [];

  const { data: accessoriesData, loading } = useQuery(ACCESSORIES_QUERY, {
    variables: {
      brand: normalizeBrandForDatabase(brand),
      subcategory: selectedSubcategories.length === 1 ? selectedSubcategories[0] : undefined,
      gender: selectedGenders.length === 1 ? selectedGenders[0] : undefined,
      size: selectedSizes.length === 1 ? selectedSizes[0] : undefined,
      sortOrder: sortBy === 'Price low to high' ? 'asc' : sortBy === 'Price high to low' ? 'desc' : undefined,
      limit: PRODUCTS_PER_PAGE,
      offset: (currentPage - 1) * PRODUCTS_PER_PAGE,
    },
  });
  
  // Prioritize query data over static data for pagination
  const accessories = useMemo(() => {
    // If we have query data (for pagination), use it
    if (accessoriesData?.accessories) {
      return accessoriesData.accessories;
    }
    return [];
  }, [accessoriesData?.accessories]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    accessories.forEach((a: unknown) => (a as unknown).sizePrices.forEach((sp: unknown) => set.add((sp as unknown).size)));
    return Array.from(set).sort();
  }, [accessories]);
  const [minPrice, maxPrice] = useMemo(() => {
    let min = Infinity, max = -Infinity;
    accessories.forEach((a: unknown) => (a as unknown).sizePrices.forEach((sp: unknown) => {
      if ((sp as unknown).price < min) min = (sp as unknown).price;
      if ((sp as unknown).price > max) max = (sp as unknown).price;
    }));
    if (!isFinite(min) || !isFinite(max)) return [0, 50000];
    return [Math.floor(min), Math.ceil(max)];
  }, [accessories]);
  useEffect(() => {
    if (shouldResetPriceRange && (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) {
      setPriceRange([minPrice, maxPrice]);
      setShouldResetPriceRange(false);
    }
  }, [minPrice, maxPrice, shouldResetPriceRange]);

  // Simple pagination logic (same as /sneaker page)
  const totalPages = useMemo(() => {
    if (accessories.length === 0) {
      // If we got no results and we're not on page 1, this means we've reached the end
      if (currentPage > 1) {
        return currentPage - 1;
      }
      return 1;
    }
    // If we got a full page of results, there might be more
    if (accessories.length === PRODUCTS_PER_PAGE) {
      return currentPage + 1;
    }
    // If we got fewer results than expected, this is the last page
    return currentPage;
  }, [accessories.length, currentPage]);

  const accessoriesProducts = accessories.map((a: unknown) => {
    const lowest = (a as unknown).sizePrices.reduce((min: number, sp: unknown) => (sp as unknown).price < min ? (sp as unknown).price : min, Infinity);
    return {
      id: (a as unknown).id,
      brand: (a as unknown).brand,
      productName: (a as unknown).productName,
      subcategory: (a as unknown).subcategory,
      images: (a as unknown).images,
      price: lowest,
    };
  });





  const stickyBarRef = useRef<HTMLDivElement>(null);


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

  // Loading state with skeleton
  if (loading) {
    return (
      <>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} style={{ background: '#f0f0f0', height: 400, borderRadius: 8 }} />
            ))}
          </div>
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
      {/* Background scroll prevention when filter is open */}
      {showFilter && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      
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
              opacity: 1,
              lineHeight: getBrandTextStyle(brand, true).lineHeight,
              maxWidth: '90%',
              whiteSpace: brand.length > 15 ? 'normal' : 'nowrap'
            }}>
              {brand}
            </div>
          </div>
          
          <div style={{ padding: '0 16px', marginTop: 16 }}>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessories', href: '/accessories' }, { label: brand }]} />
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
                {brands.map((b: string) => (
                  <button
                    key={b}
                    onClick={() => {
                      if (b !== brand) window.location.href = `/accessories/brand/${getBrandUrl(b)}`;
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
          
          <AccessoriesMobileFilterOverlay
            show={showFilter}
            onClose={() => setShowFilter(false)}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            brands={brands}
            selectedBrands={[brand]}
            onBrandChange={() => {}}
            subcategories={subcategories}
            selectedSubcategories={selectedSubcategories}
            onSubcategoryChange={subcategory => setSelectedSubcategories(prev =>
              prev.includes(subcategory) ? prev.filter(s => s !== subcategory) : [...prev, subcategory]
            )}
            genders={genders}
            selectedGenders={selectedGenders}
            onGenderChange={gender => setSelectedGenders(prev =>
              prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
            )}
            sizes={allSizes}
            selectedSizes={selectedSizes}
            onSizeChange={size => setSelectedSizes((prev: string[]) =>
              prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
            )}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            tab={mobileOverlayTab}
            setTab={setMobileOverlayTab}
          />
          
          <div style={{ width: '100%', padding: 0, marginTop: 0 }}>
            <AccessoriesProductGrid 
              products={accessoriesProducts}
              mobile
              loading={loading}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              loading={loading}
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
            height: 400, 
            overflow: 'hidden', 
            background: '#eee', 
            position: 'relative' 
          }}>
            <img src="/static.jpg" alt="Brand Banner" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', marginTop: '20px' }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: getBrandTextStyle(brand, false).transform,
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: getBrandTextStyle(brand, false).fontSize,
              fontWeight: '600',
              textAlign: 'center',
              textShadow: '1px 1px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.2)',
              fontFamily: 'Montserrat, Arial, sans-serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              zIndex: 2,
              opacity: 0.9
            }}>
              {brand}
            </div>
          </div>
          {/* Breadcrumbs */}
          <div style={{ maxWidth: 1500, margin: '0 auto', padding: '24px 32px 0 32px' }}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Accessories', href: '/accessories' },
                { label: brand }
              ]}
            />
          </div>
          {/* Brand Selector and Hide Filter in one line, matching screenshot UI */}
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
            {/* Brand buttons row with arrows, now smaller and not flex: 1 */}
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
                    onClick={() => {
                      if (b !== brand) window.location.href = `/accessories/brand/${getBrandUrl(b)}`;
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
                selectedBrands={[brand]}
                onBrandChange={() => {}}
                subcategories={subcategories}
                selectedSubcategories={selectedSubcategories}
                onSubcategoryChange={subcategory => setSelectedSubcategories(prev =>
                  prev.includes(subcategory) ? prev.filter(s => s !== subcategory) : [...prev, subcategory]
                )}
                genders={genders}
                selectedGenders={selectedGenders}
                onGenderChange={gender => setSelectedGenders(prev =>
                  prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
                )}
                sizes={allSizes}
                selectedSizes={selectedSizes}
                onSizeChange={size => setSelectedSizes((prev: string[]) =>
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
              <AccessoriesProductGrid 
                products={accessoriesProducts}
                loading={loading}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                loading={loading}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}