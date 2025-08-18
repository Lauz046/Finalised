import React, { useEffect } from 'react';
import styles from './StashPrompt.module.css';
import { useStash } from './StashContext';
import { useAuth } from '../context/AuthContext';
import { useEnhancedNavigation } from '../hooks/useEnhancedNavigation';

const StashPrompt: React.FC = () => {
  const { closePrompt } = useStash();
  const { isAuthenticated, user } = useAuth();
  const { navigateWithScrollPreservation } = useEnhancedNavigation();
  
  // Auto-dismiss after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      closePrompt();
    }, 2000); // 2 seconds
    
    return () => clearTimeout(timer);
  }, [closePrompt]);
  
  const handleAuthClick = () => {
    closePrompt();
    navigateWithScrollPreservation('/auth/signin');
  };

  const handleViewStash = () => {
    closePrompt();
    navigateWithScrollPreservation('/stash');
  };

  return (
    <div className={styles.stashPrompt}>
      <div className={styles.stashPromptContent}>
        <span>
          {isAuthenticated ? (
            <div className={styles.welcomeMessage}>
              <div>Welcome back, {user?.fullName}!</div>
              <div>Your stash is waiting for you.</div>
              <button onClick={handleViewStash} className={styles.stashLink}>
                View My Stash
              </button>
            </div>
          ) : (
            <div className={styles.authMessage}>
              <div>
                <button onClick={handleAuthClick} className={styles.link}>Sign in</button> or <button onClick={handleAuthClick} className={styles.link}>create an account</button>
              </div>
              <div>to access your wishlist from anywhere.</div>
            </div>
          )}
        </span>
        <button className={styles.closeBtn} onClick={closePrompt} aria-label="Close">×</button>
      </div>
    </div>
  );
};

export default StashPrompt; 