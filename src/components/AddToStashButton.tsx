import React from 'react';
import Image from 'next/image';
import { useStash } from './StashContext';
import { useEnhancedNavigation } from '../hooks/useEnhancedNavigation';
import { useAuth } from '../context/AuthContext';
import styles from './AddToStashButton.module.css';

interface AddToStashButtonProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    category?: string;
    productType: string;
  };
  variant?: 'primary' | 'secondary';
  className?: string;
}

const AddToStashButton: React.FC<AddToStashButtonProps> = ({ 
  product, 
  variant = 'primary',
  className = ''
}) => {
  const { addToStash, isInStash } = useStash();
  const { navigateWithScrollPreservation } = useEnhancedNavigation();
  const { isAuthenticated, user, isLoading } = useAuth();
  const isStashed = isInStash(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't proceed if still loading
    if (isLoading) {
      return;
    }
    
    if (!isAuthenticated) {
      // Store current page URL for redirect after login
      const currentUrl = window.location.pathname + window.location.search;
      localStorage.setItem('redirectAfterLogin', currentUrl);
      navigateWithScrollPreservation('/auth/signin');
      return;
    }
    
    // If authenticated, directly add to stash or navigate to stash page
    if (isStashed) {
      // If already in stash, navigate to stash page
      navigateWithScrollPreservation('/stash');
      return;
    }
    
    const productData = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      category: product.category || product.productType,
      productType: product.productType
    };
    
    addToStash(productData);
  };

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={handleClick}
      aria-label={isStashed ? 'Remove from stash' : 'Add to stash'}
      disabled={isLoading}
    >
      <Image 
        src="/DON/Stash White icon.svg" 
        alt="Stash" 
        width={24} 
        height={24} 
        style={{ marginRight: 8, verticalAlign: 'middle' }} 
      />
      {isStashed ? 'IN STASH' : 'ADD TO STASH'}
    </button>
  );
};

export default AddToStashButton; 