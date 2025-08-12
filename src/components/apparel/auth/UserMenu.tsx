import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './UserMenu.module.css';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose, anchorRef }) => {
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div ref={menuRef} className={styles.menuContainer}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>{user.fullName}</div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
        </div>
        
        <div className={styles.menuItems}>
          <button 
            className={styles.menuItem}
            onClick={() => {
              window.location.href = '/account';
              onClose();
            }}
          >
            <span>My Account</span>
          </button>
          <button 
            className={styles.menuItem}
            onClick={() => {
              window.location.href = '/stash';
              onClose();
            }}
          >
            <span>My Stash</span>
          </button>
          <div className={styles.menuDivider} />
          <button className={`${styles.menuItem} ${styles.logoutItem}`} onClick={handleLogout}>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu; 