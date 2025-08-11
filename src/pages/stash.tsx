import React, { useEffect } from 'react';
import { useStash } from '../components/StashContext';
import { useEnhancedNavigation } from '../hooks/useEnhancedNavigation';
import StashEmptyState from '../components/stash/StashEmptyState';
import StashProductGrid from '../components/stash/StashProductGrid';
import styles from './stash.module.css';

const StashPage: React.FC = () => {
  const { stashedProducts } = useStash();
  const { router } = useEnhancedNavigation();

  // Preload stash background image
  useEffect(() => {
    const img = new Image();
    img.src = '/restof/Stash.png';
  }, []);

  const handleClose = () => {
    // Go back to the previous page
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to home page if no history
      router.push('/');
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* Close button */}
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close stash">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.closeIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        
        {stashedProducts.length === 0 ? (
          <StashEmptyState />
        ) : (
          <StashProductGrid products={stashedProducts} />
        )}
      </div>
    </>
  );
};

export default StashPage; 