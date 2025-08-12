import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

interface NavigationState {
  previousPath: string;
  scrollPosition: number;
  timestamp: number;
}

interface NavigationContextType {
  saveNavigationState: (path: string, scrollPosition: number) => void;
  getPreviousNavigationState: () => NavigationState | null;
  clearNavigationState: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [navigationHistory, setNavigationHistory] = useState<Map<string, NavigationState>>(new Map());

  // Save navigation state when navigating away from a page
  const saveNavigationState = useCallback((path: string, scrollPosition: number) => {
    const state: NavigationState = {
      previousPath: router.asPath,
      scrollPosition,
      timestamp: Date.now()
    };
    
    setNavigationHistory(prev => {
      const newMap = new Map(prev);
      newMap.set(path, state);
      return newMap;
    });
  }, [router.asPath]);

  // Get previous navigation state for current path
  const getPreviousNavigationState = useCallback((): NavigationState | null => {
    return navigationHistory.get(router.asPath) || null;
  }, [navigationHistory, router.asPath]);

  // Clear navigation state
  const clearNavigationState = useCallback(() => {
    setNavigationHistory(new Map());
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Save current scroll position before leaving
      const currentScrollPosition = window.scrollY;
      saveNavigationState(router.asPath, currentScrollPosition);
    };

    const handlePopState = () => {
      // When user clicks back, restore scroll position
      const state = getPreviousNavigationState();
      if (state) {
        setTimeout(() => {
          window.scrollTo(0, state.scrollPosition);
        }, 100);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router.asPath, saveNavigationState, getPreviousNavigationState]);

  const value: NavigationContextType = useMemo(() => ({
    saveNavigationState,
    getPreviousNavigationState,
    clearNavigationState
  }), [saveNavigationState, getPreviousNavigationState, clearNavigationState]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}; 