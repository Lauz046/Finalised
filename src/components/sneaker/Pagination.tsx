import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, loading = false }) => {
  // Don't show pagination when loading
  if (loading) {
    return null;
  }
  
  // Always show pagination if there are multiple pages, even if totalPages is 1 but we have more data
  if (totalPages <= 1) {
    // Check if we should show pagination based on current page
    if (currentPage > 1) {
      return (
        <div className={styles.pagination}>
          <button
            className={styles.arrow}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className={styles.pageActive}>
            {currentPage}
          </button>
        </div>
      );
    }
    return null;
  }

  // Show first 3 pages, last page, and current page (if not in first 3 or last)
  type PageItem = number | 'ellipsis-left' | 'ellipsis-right';
  const pages: PageItem[] = [];
  
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (currentPage > 4 && currentPage < totalPages - 2) {
      pages.push('ellipsis-left', currentPage, 'ellipsis-right');
    } else if (currentPage >= totalPages - 2) {
      pages.push('ellipsis-left');
      for (let i = totalPages - 2; i < totalPages; i++) pages.push(i);
    } else if (currentPage > 3) {
      pages.push('ellipsis-right');
    }
    pages.push(totalPages);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      {pages.map((page, idx) => {
        if (page === 'ellipsis-left' || page === 'ellipsis-right') {
          return <span key={String(page) + idx} className={styles.ellipsis}>...</span>;
        }
        return (
          <button
            key={page}
            className={page === currentPage ? styles.pageActive : styles.page}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        );
      })}
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination; 