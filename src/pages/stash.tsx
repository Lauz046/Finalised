import React from 'react';
import { useStash } from '../components/StashContext';
import StashEmptyState from '../components/stash/StashEmptyState';
import StashProductGrid from '../components/stash/StashProductGrid';
import styles from './stash.module.css';

const StashPage: React.FC = () => {
  const { stashedProducts } = useStash();

  return (
    <>
      <div className={styles.container}>
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