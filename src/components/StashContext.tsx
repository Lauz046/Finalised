import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface StashProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  productType: string;
}

interface StashContextType {
  showStashDot: boolean;
  isBlinking: boolean;
  showStashPrompt: boolean;
  stashedProducts: StashProduct[];
  triggerStash: () => void;
  clearStashDot: () => void;
  closePrompt: () => void;
  addToStash: (product: StashProduct) => void;
  removeFromStash: (productId: string) => void;
  isInStash: (productId: string) => boolean;
  showAuthPrompt: boolean;
  setShowAuthPrompt: (show: boolean) => void;
  syncStashWithUser: (userId: string) => void;
}

const StashContext = createContext<StashContextType | undefined>(undefined);

export const StashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showStashDot, setShowStashDot] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showStashPrompt, setShowStashPrompt] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [stashedProducts, setStashedProducts] = useState<StashProduct[]>([]);

  // Load stashed products from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('stashedProducts');
      if (saved) {
        try {
          setStashedProducts(JSON.parse(saved));
        } catch (error) {
          console.error('Error loading stashed products:', error);
        }
      }
    }
  }, []);

  // Save to localStorage whenever stashedProducts changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('stashedProducts', JSON.stringify(stashedProducts));
    }
  }, [stashedProducts]);

  const triggerStash = useCallback(() => {
    setShowStashDot(true);
    setIsBlinking(true);
    setShowStashPrompt(true);
    setTimeout(() => setIsBlinking(false), 3500);
  }, []);

  const clearStashDot = useCallback(() => {
    setShowStashDot(false);
    setIsBlinking(false);
  }, []);

  const closePrompt = useCallback(() => {
    setShowStashPrompt(false);
  }, []);

  const addToStash = useCallback((product: StashProduct) => {
    setStashedProducts(prev => {
      // Check if product already exists
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
    triggerStash(); // Show the stash feedback
  }, [triggerStash]);

  const removeFromStash = useCallback((productId: string) => {
    setStashedProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const isInStash = useCallback((productId: string) => {
    return stashedProducts.some(p => p.id === productId);
  }, [stashedProducts]);

  const syncStashWithUser = useCallback((userId: string) => {
    // Get anonymous stash
    const anonymousStash = localStorage.getItem('stashedProducts');
    const userStashKey = `plutus_user_stash_${userId}`;
    const userStash = localStorage.getItem(userStashKey);
    
    if (anonymousStash && !userStash) {
      // If user has anonymous stash but no user stash, migrate it
      try {
        const parsedAnonymousStash = JSON.parse(anonymousStash);
        localStorage.setItem(userStashKey, anonymousStash);
        setStashedProducts(parsedAnonymousStash);
        localStorage.removeItem('stashedProducts'); // Clear anonymous stash
      } catch (error) {
        console.error('Error syncing stash with user:', error);
      }
    } else if (userStash) {
      // Load user's existing stash
      try {
        const parsedUserStash = JSON.parse(userStash);
        setStashedProducts(parsedUserStash);
      } catch (error) {
        console.error('Error loading user stash:', error);
      }
    }
  }, []);

  return (
    <StashContext.Provider value={{ 
      showStashDot, 
      isBlinking, 
      showStashPrompt, 
      stashedProducts,
      triggerStash, 
      clearStashDot, 
      closePrompt,
      addToStash,
      removeFromStash,
      isInStash,
      showAuthPrompt,
      setShowAuthPrompt,
      syncStashWithUser
    }}>
      {children}
    </StashContext.Provider>
  );
};

export function useStash() {
  const ctx = useContext(StashContext);
  if (!ctx) throw new Error('useStash must be used within a StashProvider');
  return ctx;
} 