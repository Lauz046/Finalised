import React from 'react';
import styles from './StashPrompt.module.css';
import { useStash } from './StashContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const StashPrompt: React.FC = () => {
  const { closePrompt } = useStash();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  const handleAuthClick = () => {
    closePrompt();
    router.push('/auth/signin');
  };

  return (
    <div className={styles.stashPrompt}>
      <div className={styles.stashPromptContent}>
        <span>
          {isAuthenticated ? (
            `Welcome back, ${user?.fullName}! Your stash is waiting for you.`
          ) : (
            <>
              <button onClick={handleAuthClick} className={styles.link}>Sign in</button> or <button onClick={handleAuthClick} className={styles.link}>create an account</button> to access your wishlist from anywhere.
            </>
          )}
        </span>
        <button className={styles.closeBtn} onClick={closePrompt} aria-label="Close">×</button>
      </div>
    </div>
  );
};

export default StashPrompt; 