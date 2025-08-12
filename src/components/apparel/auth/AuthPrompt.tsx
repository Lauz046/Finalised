import React, { useState } from 'react';
import { useStash } from '../StashContext';
import { useAuth } from '../../context/AuthContext';
// // // import AuthModal from './AuthModal';
import styles from './AuthPrompt.module.css';

const AuthPrompt: React.FC = () => {
  const { showAuthPrompt, setShowAuthPrompt } = useStash();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!showAuthPrompt || isAuthenticated) return null;

  const handleSignInClick = () => {
    setShowAuthPrompt(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.authPrompt}>
        <div className={styles.authPromptContent}>
          <div className={styles.authPromptHeader}>
            <h3>Sign in to save your favorites</h3>
            <p>Create an account to sync your stash across all devices</p>
          </div>
          <div className={styles.authPromptActions}>
            <button 
              onClick={() => setShowAuthPrompt(false)}
              className={styles.skipButton}
            >
              Maybe later
            </button>
            <button 
              onClick={handleSignInClick}
              className={styles.signInButton}
            >
              Sign in / Sign up
            </button>
          </div>
        </div>
      </div>
      {/* <AuthModal /> */}
    </>
  );
};

export default AuthPrompt; 