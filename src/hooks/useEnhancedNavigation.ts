import { useRouter } from 'next/router';
import { useNavigation } from '../context/NavigationContext';
import { useEffect } from 'react';

export const useEnhancedNavigation = () => {
  const router = useRouter();
  const { saveNavigationState, getPreviousNavigationState } = useNavigation();

  // Save scroll position before navigation
  const navigateWithScrollPreservation = (url: string) => {
    const currentScrollPosition = window.scrollY;
    saveNavigationState(url, currentScrollPosition);
    router.push(url);
  };

  // Restore scroll position when component mounts
  useEffect(() => {
    const state = getPreviousNavigationState();
    if (state) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, state.scrollPosition);
      });
    }
  }, [router.asPath]);

  // Save scroll position before leaving the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentScrollPosition = window.scrollY;
      saveNavigationState(router.asPath, currentScrollPosition);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [router.asPath]);

  return {
    navigateWithScrollPreservation,
    router
  };
}; 