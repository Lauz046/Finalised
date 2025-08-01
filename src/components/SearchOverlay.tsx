import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FixedSizeList as List } from 'react-window';
import { useProductContext } from '../context/ProductContext';
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
  const { searchData } = useProductContext();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('sneakers');
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
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
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.append('q', query.trim());
      if (category) params.append('category', category);
      params.append('page', page.toString());
      params.append('limit', ITEMS_PER_PAGE.toString());

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      
      if (page === 1) {
        setAllResults(data.products || []);
        setDisplayedResults(data.products || []);
        setTotalResults(data.total || 0);
        setHasMore(data.total > ITEMS_PER_PAGE);
      } else {
        setAllResults(prev => [...prev, ...(data.products || [])]);
        setDisplayedResults(prev => [...prev, ...(data.products || [])]);
        setHasMore(data.total > (page * ITEMS_PER_PAGE));
      }
      
      setCurrentPage(page);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more results
  const loadMore = useCallback(() => {
    if (!loading && hasMore && (input.trim() || activeCategory)) {
      const nextPage = currentPage + 1;
      performSearch(input, activeCategory, nextPage);
    }
  }, [loading, hasMore, input, activeCategory, currentPage, performSearch]);

  // Handle input changes with API search
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setCurrentPage(1);
    
    if (value.trim()) {
      // Perform API search
      performSearch(value, activeCategory, 1);
      
      // Add to search history
      if (!searchHistory.includes(value.trim())) {
        setSearchHistory(prev => [value.trim(), ...prev.slice(0, 4)]);
      }
    } else {
      // Show all products for current category
      performSearch('', activeCategory, 1);
    }
  };

  // Handle category selection
  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    performSearch(input, cat, 1);
  };

  // Handle search history click
  const handleSearchHistoryClick = (query: string) => {
    setInput(query);
    setCurrentPage(1);
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
    setResults([]);
  };

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize with data when overlay opens
  useEffect(() => {
    if (isOpen) {
      // Fetch product counts
      fetchProductCounts();
      
      // Load initial products for current category
      performSearch('', activeCategory, 1);
    }
  }, [isOpen, activeCategory, fetchProductCounts, performSearch]);

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
                ✕
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
              {loading && results.length === 0 ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    <span>Searching...</span>
                  </div>
                </div>
              ) : results.length > 0 ? (
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
                        if (scrollOffset >= maxOffset - 100 && hasMore) {
                          loadMore();
                        }
                      }
                    }}
                  >
                    {renderProductItem}
                  </List>
                </>
              ) : input.trim() ? (
                <div className={styles.emptyState}>
                  No products found for "{input}"
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