import Navbar from '@/components/nav/Navbar';
import Footer from '@/components/Footer';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Montserrat } from 'next/font/google';
import SearchOverlay from '../components/SearchOverlay';
import React, { useState, useEffect } from 'react';
import { useApollo } from '../lib/apolloClient';
import { StashProvider } from '../components/StashContext';
import StashPrompt from '../components/StashPrompt';
import { useStash } from '../components/StashContext';
import { EnquiryPanelProvider } from '../components/EnquiryPanelContext';
import EnquiryPanel from '../components/EnquiryPanel';
import { ProductProvider } from '../context/ProductContext';
import { AuthProvider } from '../context/AuthContext';
import PerformanceMonitor from '../components/PerformanceMonitor';
import HornLoader from '../components/loading/HornLoader';
import { useRouter } from 'next/router';
import { registerServiceWorker, handleServiceWorkerUpdate } from '../utils/serviceWorker';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700'] });

function MyApp({ Component, pageProps }: AppProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  
  // Check if current page is stash to conditionally render footer
  const isStashPage = router.pathname === '/stash';
  
  // Check if current page is auth page to conditionally render navbar and footer
  const isAuthPage = router.pathname.startsWith('/auth/');

  // Register service worker and handle updates
  useEffect(() => {
    registerServiceWorker();
    handleServiceWorkerUpdate();
  }, []);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Show loading for 3.5 seconds to accommodate 2s horn + brand reveal

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // No pre-fetching needed - pages are statically generated and will load instantly

  return (
    <ApolloProvider client={apolloClient}>
      <ProductProvider>
        <StashProvider>
          <AuthProvider>
            <EnquiryPanelProvider>
              <EnquiryPanel />
              <StashPromptWrapper />
              {isLoading ? (
                <HornLoader 
                  onComplete={handleLoadingComplete} 
                  duration={2000}
                />
              ) : (
                <>
                  <main className={montserrat.className}>
                    {!isAuthPage && <Navbar onSearchClick={() => setIsSearchOpen(true)} />}
                    {!isAuthPage && <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
                    <Component {...pageProps} />
                    <PerformanceMonitor />
                    {!isStashPage && !isAuthPage && <Footer />}
                  </main>
                </>
              )}
            </EnquiryPanelProvider>
          </AuthProvider>
        </StashProvider>
      </ProductProvider>
    </ApolloProvider>
  );
}

function StashPromptWrapper() {
  const { showStashPrompt } = useStash();
  return showStashPrompt ? <StashPrompt /> : null;
}

export default MyApp; 