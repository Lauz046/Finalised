import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import styles from './UserMenu.module.css';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose, anchorRef }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleAccountClick = () => {
    onClose();
    router.push('/account');
  };

  const handleLogout = () => {
    logout();
    onClose();
    router.push('/');
  };

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className={styles.userMenu} ref={menuRef}>
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
          onClick={handleAccountClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.menuIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          Account
        </button>
        
        <button 
          className={styles.menuItem}
          onClick={handleLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.menuIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu; 