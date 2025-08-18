import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
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
  const { data: session, status } = useSession();
  const { navigateWithScrollPreservation } = useEnhancedNavigation();
  const { isAuthenticated, user } = useAuth();
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const isStashed = isInStash(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Store current page URL for redirect after login
      const currentUrl = window.location.pathname + window.location.search;
      localStorage.setItem('redirectAfterLogin', currentUrl);
      navigateWithScrollPreservation('/auth/signin');
      return;
    }
    
    // If authenticated, show account popup instead of adding to stash directly
    setShowAccountPopup(true);
    
    // Auto-hide popup after 3 seconds
    setTimeout(() => {
      setShowAccountPopup(false);
    }, 3000);
  };

  const handleAddToStash = () => {
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
    setShowAccountPopup(false);
  };

  const handleClosePopup = () => {
    setShowAccountPopup(false);
  };

  return (
    <>
      <button
        className={`${styles.button} ${styles[variant]} ${className}`}
        onClick={handleClick}
        aria-label={isStashed ? 'Remove from stash' : 'Add to stash'}
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

      {/* Account Popup */}
      {showAccountPopup && isAuthenticated && (
        <div className={styles.accountPopup}>
          <div className={styles.popupContent}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className={styles.userDetails}>
                <div className={styles.userName}>{user?.fullName || 'User'}</div>
                <div className={styles.userEmail}>{user?.email}</div>
              </div>
            </div>
            <div className={styles.popupActions}>
              <button 
                className={styles.addToStashBtn}
                onClick={handleAddToStash}
              >
                {isStashed ? 'View Stash' : 'Add to Stash'}
              </button>
              <button 
                className={styles.viewAccountBtn}
                onClick={() => {
                  setShowAccountPopup(false);
                  navigateWithScrollPreservation('/account');
                }}
              >
                View Account
              </button>
            </div>
            <button 
              className={styles.closePopupBtn}
              onClick={handleClosePopup}
              aria-label="Close popup"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToStashButton; 