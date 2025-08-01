import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPage.module.css';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const { login } = useAuth();
  const router = useRouter();

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
          router.push('/');
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
        </div>

        {/* Header with tabs */}
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button 
              className={styles.tab}
              onClick={() => router.push('/auth/signup')}
            >
              Sign Up
            </button>
            <button 
              className={`${styles.tab} ${styles.activeTab}`}
              onClick={() => router.push('/auth/signin')}
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

          {/* Forgot Password */}
          <div className={styles.forgotPassword}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>
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
              <button type="button" className={styles.socialButton}>
                <Image
                  src="/auth/google.svg"
                  alt="Google"
                  width={40}
                  height={40}
                />
              </button>
              <button type="button" className={styles.socialButton}>
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