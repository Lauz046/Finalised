import React from 'react';
import { signIn, getSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './OAuthButtons.module.css';

interface OAuthButtonsProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ onSuccess, onError }) => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: false,
      });

      if (result?.error) {
        onError?.(result.error);
      } else if (result?.ok) {
        onSuccess?.();
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      onError?.('Failed to sign in with Google');
    }
  };

  const handleAppleSignIn = async () => {
    try {
      // Apple Sign-In implementation
      // For now, we'll show a message that it's coming soon
      onError?.('Apple Sign-In coming soon');
    } catch (error) {
      console.error('Apple sign-in error:', error);
      onError?.('Failed to sign in with Apple');
    }
  };

  return (
    <div className={styles.oauthContainer}>
      <div className={styles.divider}>
        <span className={styles.dividerText}>or continue with</span>
      </div>
      
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.oauthButton} ${styles.googleButton}`}
          onClick={handleGoogleSignIn}
          type="button"
        >
          <Image
            src="/auth/google.svg"
            alt="Google"
            width={20}
            height={20}
            className={styles.oauthIcon}
          />
          <span className={styles.oauthText}>Continue with Google</span>
        </button>

        <button
          className={`${styles.oauthButton} ${styles.appleButton}`}
          onClick={handleAppleSignIn}
          type="button"
        >
          <Image
            src="/auth/apple.svg"
            alt="Apple"
            width={20}
            height={20}
            className={styles.oauthIcon}
          />
          <span className={styles.oauthText}>Continue with Apple</span>
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons; 