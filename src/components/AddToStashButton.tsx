import React from 'react';
import Image from 'next/image';
import { useStash } from './StashContext';
import { useAuth } from '../context/AuthContext';
import { useEnhancedNavigation } from '../hooks/useEnhancedNavigation';
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
  const { isAuthenticated } = useAuth();
  const { navigateWithScrollPreservation } = useEnhancedNavigation();
  const isStashed = isInStash(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigateWithScrollPreservation('/auth/signin');
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
    >
      <Image 
        src="/nav/STASH.svg" 
        alt="Stash" 
        width={20} 
        height={20} 
        style={{ marginRight: 8, verticalAlign: 'middle' }} 
      />
      {isStashed ? 'IN STASH' : 'ADD TO STASH'}
    </button>
  );
};

export default AddToStashButton; 