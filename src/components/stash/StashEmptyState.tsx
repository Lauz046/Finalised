import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './StashEmptyState.module.css';

const StashEmptyState: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <Image 
            src="/restof/Stash illustration.png" 
            alt="Stash Illustration" 
            width={300} 
            height={300}
            priority
          />
        </div>
        <h1 className={styles.title}>Your Stash is empty</h1>
        <p className={styles.description}>
          Looks like you haven&apos;t stashed anything yet. Start saving your favourites before they vanish.
        </p>
        <button 
          className={styles.addButton}
          onClick={() => router.push('/')}
        >
          Add Your Faves
        </button>
      </div>
    </div>
  );
};

export default StashEmptyState; 