import { useRouter } from 'next/router';
import { useNavigation } from '../context/NavigationContext';
import { useEffect, useCallback } from 'react';

export const useEnhancedNavigation = () => {
  const router = useRouter();
  const { saveNavigationState, getPreviousNavigationState } = useNavigation();

  // Save scroll position before navigation
  const navigateWithScrollPreservation = useCallback((url: string) => {
    const currentScrollPosition = window.scrollY;
    saveNavigationState(url, currentScrollPosition);
    router.push(url);
  }, [saveNavigationState, router]);

  // Restore scroll position when component mounts
  useEffect(() => {
    const state = getPreviousNavigationState();
    if (state) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, state.scrollPosition);
      });
    }
  }, [router.asPath, getPreviousNavigationState]);

  return {
    navigateWithScrollPreservation,
    router
  };
}; 