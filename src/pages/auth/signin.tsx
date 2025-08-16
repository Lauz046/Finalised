import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useAuth } from '../../context/AuthContext';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';
import styles from './AuthPage.module.css';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const { login } = useAuth();
  const { navigateWithScrollPreservation, router } = useEnhancedNavigation();
  const { data: session, status } = useSession();

  // Handle successful OAuth login
  useEffect(() => {
    if (session && status === 'authenticated') {
      console.log('Session detected:', session);
      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        localStorage.removeItem('redirectAfterLogin');
        navigateWithScrollPreservation(redirectUrl);
      } else {
        navigateWithScrollPreservation('/');
      }
    }
  }, [session, status, navigateWithScrollPreservation]);

  const handleClose = () => {
    navigateWithScrollPreservation('/');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation
    if (!validateEmail(email)) {
      setMessageType('error');
      setMessage('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setMessageType('error');
      setMessage('Password is required.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      setMessageType(result.success ? 'success' : 'error');
      setMessage(result.message);

      if (result.success) {
        setTimeout(() => {
          // Check if there's a redirect URL stored
          const redirectUrl = localStorage.getItem('redirectAfterLogin');
          if (redirectUrl) {
            localStorage.removeItem('redirectAfterLogin'); // Clean up
            navigateWithScrollPreservation(redirectUrl);
          } else {
            navigateWithScrollPreservation('/');
          }
        }, 1500);
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/auth-background-optimized.webp" as="image" type="image/webp" />
      </Head>
      <div className={styles.authPage} data-auth-page="true">
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <Image 
          src="/auth-background-optimized.webp" 
          alt="Background" 
          fill 
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          sizes="100vw"
          quality={60}
          loading="eager"
        />
      </div>

      {/* Auth Container */}
      <div className={styles.authContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Image src="/LOGO.svg" alt="House of Plutus" width={160} height={48} priority />
          {/* Close button */}
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close and go back">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.closeIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Header with tabs */}
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button 
              className={styles.tab}
              onClick={() => navigateWithScrollPreservation('/auth/signup')}
            >
              Sign Up
            </button>
            <button 
              className={`${styles.tab} ${styles.activeTab}`}
              onClick={() => navigateWithScrollPreservation('/auth/signin')}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email field */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email Address</label>
            <input
              type="email"
              placeholder="kashishexample@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          {/* Password field */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                <Image
                  src={showPassword ? "/auth/hidden-password.svg" : "/auth/view-password.svg"}
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>



          {/* Message */}
          {message && (
            <div className={`${styles.message} ${styles[messageType]}`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
          >
            {isLoading ? (
              <div className={styles.spinner} />
            ) : (
              'Log In'
            )}
          </button>

          {/* Terms */}
          <p className={styles.terms}>
            By logging in, you agree to the{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
          </p>

          {/* Divider */}
          <div className={styles.divider}>
            <span>OR</span>
          </div>

          {/* Social Buttons */}
          <div className={styles.socialSection}>
            <p className={styles.socialTitle}>Log in with</p>
            <div className={styles.socialButtons}>
              <button 
                type="button" 
                className={styles.socialButton}
                onClick={() => {
                  console.log('Google button clicked');
                  const redirectUrl = localStorage.getItem('redirectAfterLogin');
                  console.log('Redirect URL:', redirectUrl);
                  
                  try {
                    signIn('google', {
                      callbackUrl: redirectUrl || '/',
                    });
                  } catch (error) {
                    console.error('SignIn error:', error);
                  }
                }}
              >
                <Image
                  src="/auth/google.svg"
                  alt="Google"
                  width={40}
                  height={40}
                />
              </button>
              <button 
                type="button" 
                className={styles.socialButton}
                onClick={() => {
                  setMessageType('error');
                  setMessage('Apple Sign-In coming soon!');
                }}
              >
                <Image
                  src="/auth/apple.svg"
                  alt="Apple"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          </div>

          {/* Already have account */}
          <p className={styles.alreadyHaveAccount}>
            Already have an account?{' '}
            <a href="#" onClick={() => router.push('/auth/signup')}>
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

// Custom layout to remove navbar
SigninPage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>;
};

export default SigninPage; 