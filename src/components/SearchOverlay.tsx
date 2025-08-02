import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FixedSizeList as List } from 'react-window';

import styles from './SearchOverlay.module.css';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: string;
  brand?: string;
  productName?: string;
  title?: string;
  name?: string;
  images?: string[];
  type?: string;
  productLink?: string;
  url?: string;
  link?: string;
}

const ITEM_HEIGHT = 100;
const LIST_HEIGHT = 600;
const CATEGORIES = [
  { key: 'sneakers', label: 'Sneakers' },
  { key: 'apparel', label: 'Apparel' },
  { key: 'accessories', label: 'Accessories' },
  { key: 'perfumes', label: 'Perfumes' },
  { key: 'watches', label: 'Watches' },
];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {

  const router = useRouter();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('sneakers');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<List>(null);

  // State for pagination and counts
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [allResults, setAllResults] = useState<Product[]>([]);
  const [displayedResults, setDisplayedResults] = useState<Product[]>([]);
  const ITEMS_PER_PAGE = 50;
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch product counts for each category
  const fetchProductCounts = useCallback(async () => {
    try {
      const res = await fetch('/api/search/counts');
      const counts = await res.json();
      setProductCounts(counts);
    } catch (error) {
      console.error('Error fetching product counts:', error);
    }
  }, []);

  // Search function with API pagination
  const performSearch = useCallback(async (query: string, category: string = '', page: number = 1) => {
    // Prevent unnecessary API calls
    if (loading) {
      console.log('🔍 SearchOverlay: Skipping search - already loading');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.append('q', query.trim());
      if (category) params.append('category', category);
      params.append('page', page.toString());
      params.append('limit', ITEMS_PER_PAGE.toString());

      console.log('🔍 SearchOverlay: Searching with params:', params.toString());
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      
      console.log('🔍 SearchOverlay: Search results:', data);
      console.log('🔍 SearchOverlay: Products count:', data.products?.length || 0);
      
      if (page === 1) {
        setAllResults(data.products || []);
        setDisplayedResults(data.products || []);
        setTotalResults(data.total || 0);
        setHasMore((data.products?.length || 0) === ITEMS_PER_PAGE);
      } else {
        const newResults = [...allResults, ...(data.products || [])];
        setAllResults(newResults);
        setDisplayedResults(newResults);
        setHasMore((data.products?.length || 0) === ITEMS_PER_PAGE);
      }
      
      setCurrentPage(page);
      console.log('🔍 SearchOverlay: Updated displayedResults count:', displayedResults.length);
    } catch (error) {
      console.error('🔍 SearchOverlay: Search error:', error);
      setDisplayedResults([]);
    } finally {
      setLoading(false);
    }
  }, [allResults, ITEMS_PER_PAGE, loading]);

  // Load more results
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      console.log('Loading more results, page:', nextPage);
      performSearch(input, activeCategory, nextPage);
    }
  }, [loading, hasMore, input, activeCategory, currentPage, performSearch]);

  // Handle input changes with API search
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('🔍 SearchOverlay: Input changed to:', value);
    setInput(value);
    setCurrentPage(1);
    setAllResults([]);
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout for debounced search
    const timeout = setTimeout(() => {
      if (value.trim()) {
        console.log('🔍 SearchOverlay: Performing search for:', value);
        // Perform API search
        performSearch(value, activeCategory, 1);
        
        // Add to search history
        if (!searchHistory.includes(value.trim())) {
          setSearchHistory(prev => [value.trim(), ...prev.slice(0, 4)]);
        }
      } else {
        console.log('🔍 SearchOverlay: Showing all products for category:', activeCategory);
        // Show all products for current category
        performSearch('', activeCategory, 1);
      }
    }, 300); // 300ms debounce
    
    setSearchTimeout(timeout);
  };

  // Handle category selection
  const handleCategoryClick = (cat: string) => {
    if (cat === activeCategory) return; // Don't reload if same category
    
    setActiveCategory(cat);
    setCurrentPage(1);
    setAllResults([]);
    performSearch(input, cat, 1);
  };

  // Handle search history click
  const handleSearchHistoryClick = (query: string) => {
    setInput(query);
    setCurrentPage(1);
    setAllResults([]);
    performSearch(query, activeCategory, 1);
  };

  // Handle product click
  const handleProductClick = (product: Product) => {
    let productUrl = '';
    
    // Determine the correct product URL based on type
    switch (product.type) {
      case 'sneakers':
        productUrl = `/sneaker/${product.id}`;
        break;
      case 'apparel':
        productUrl = `/apparel/${product.id}`;
        break;
      case 'accessories':
        productUrl = `/accessories/${product.id}`;
        break;
      case 'perfumes':
        productUrl = `/perfume/${product.id}`;
        break;
      case 'watches':
        productUrl = `/watch/${product.id}`;
        break;
      default:
        productUrl = `/product/${product.id}`;
    }
    
    router.push(productUrl);
    onClose();
  };

  // Handle Enter key to go to search results page
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      const searchQuery = encodeURIComponent(input.trim());
      const categoryParam = activeCategory !== 'sneakers' ? `&category=${activeCategory}` : '';
      router.push(`/search?q=${searchQuery}${categoryParam}`);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Handle close
  const handleCloseClick = () => {
    onClose();
    setInput('');
    setDisplayedResults([]);
  };

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [isOpen, searchTimeout]);

  // Initialize with data when overlay opens
  useEffect(() => {
    if (isOpen) {
      // Fetch product counts only once when overlay opens
      fetchProductCounts();
      
      // Load initial products for current category only once
      if (displayedResults.length === 0) {
        performSearch('', activeCategory, 1);
      }
    }
  }, [isOpen]); // Remove activeCategory and performSearch from dependencies

  // Handle category changes separately
  useEffect(() => {
    if (isOpen && activeCategory) {
      setCurrentPage(1);
      setAllResults([]);
      performSearch(input, activeCategory, 1);
    }
  }, [activeCategory, isOpen]); // Only depend on activeCategory and isOpen

  // Render individual product item
  const renderProductItem = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const product = displayedResults[index];
    if (!product) return null;

    const productName = product.productName || product.title || product.name || 'Unknown Product';
    const productImage = product.images?.[0] || '/placeholder.jpg';
    const productBrand = product.brand || 'Unknown Brand';

    return (
      <div 
        className={styles.productItem}
        onClick={() => handleProductClick(product)}
        style={{ ...style, cursor: 'pointer' }}
      >
        <div className={styles.productImage}>
          <Image
            src={productImage}
            alt={productName}
            width={90}
            height={90}
            className={styles.image}
            priority={index < 10}
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productTitle}>{productName}</div>
          <div className={styles.productType}>{productBrand}</div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={handleCloseClick}></div>
      <div className={styles.searchOverlay}>
        <div className={styles.header}>
          <div className={styles.container}>
            <div className={styles.searchInput}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                className={styles.input}
              />
              <button onClick={handleCloseClick} className={styles.closeButton}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.closeIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.resultsSection}>
          <div className={styles.resultsContainer}>
            {/* Category Tabs */}
            <div className={styles.categoryContainer}>
              {CATEGORIES.map((category) => (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className={`${styles.categoryButton} ${
                    activeCategory === category.key ? styles.categoryButtonActive : ''
                  }`}
                >
                  {category.label}
                  {productCounts[category.key] && (
                    <span className={styles.categoryCount}>
                      ({productCounts[category.key]})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && !input.trim() && (
              <div className={styles.searchHistory}>
                <h4 className={styles.searchHistoryTitle}>Recent Searches</h4>
                <div className={styles.searchHistoryButtons}>
                  {searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchHistoryClick(query)}
                      className={styles.searchHistoryButton}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            <div className={styles.resultsWrapper}>
              {(() => { console.log('🔍 SearchOverlay: Rendering results - displayedResults.length:', displayedResults.length, 'loading:', loading, 'input:', input); return null; })()}
              {loading && displayedResults.length === 0 ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    <span>Searching...</span>
                  </div>
                </div>
              ) : displayedResults.length > 0 ? (
                <>
                  <div className={styles.resultsCount}>
                    {totalResults} results found
                  </div>
                  <List
                    ref={listRef}
                    height={LIST_HEIGHT}
                    width="100%"
                    itemCount={displayedResults.length}
                    itemSize={ITEM_HEIGHT}
                    onScroll={({ scrollOffset, scrollUpdateWasRequested }) => {
                      if (!scrollUpdateWasRequested) {
                        const maxOffset = displayedResults.length * ITEM_HEIGHT - LIST_HEIGHT;
                        if (scrollOffset >= maxOffset - 100 && hasMore && !loading) {
                          loadMore();
                        }
                      }
                    }}
                  >
                    {renderProductItem}
                  </List>
                  {loading && displayedResults.length > 0 && (
                    <div className={styles.loadingMore}>
                      <div className={styles.spinner}></div>
                      <span>Loading more...</span>
                    </div>
                  )}
                </>
              ) : input.trim() ? (
                <div className={styles.emptyState}>
                  No products found for &quot;{input}&quot;
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchOverlay; 