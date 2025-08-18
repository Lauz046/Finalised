import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Menu from '../menu/Menu';
import { useProductContext } from '../../context/ProductContext';
import { useRouter } from 'next/router';
import { useStash } from '../StashContext';
import { useAuth } from '../../context/AuthContext';
import UserMenu from '../auth/UserMenu';

interface NavbarProps {
  onSearchClick: () => void;
  onMenuOrAccountClick?: () => void;
  blueIcons?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onMenuOrAccountClick, blueIcons }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [bg, setBg] = useState('#fff');
  const { isPreloaded, loading } = useProductContext();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const accountButtonRef = useRef<HTMLButtonElement>(null);

  // Use blueIcons prop if provided, otherwise fallback to route logic
  const isBlueIcons = typeof blueIcons === 'boolean' 
    ? blueIcons 
    : (
        router.pathname.startsWith('/sneaker') ||
        router.pathname.startsWith('/apparel') ||
        router.pathname.startsWith('/perfume') ||
        router.pathname.startsWith('/accessories') ||
        router.pathname.startsWith('/watch') ||
        router.pathname.startsWith('/search') ||
        router.pathname.startsWith('/stash') ||
        router.pathname.includes('/brand/')
      );
  
  const isHome = router.pathname === '/';

  useEffect(() => {
    if (router.pathname === '/') {
      setBg('#07202c'); // Home page - blue background
    } else {
      setBg('#fff'); // All other pages - white background
    }
  }, [router.pathname]);

  // Stash functionality
  const { showStashDot, isBlinking, clearStashDot } = useStash();

  // Auto-close the menu whenever we navigate to a new route
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const handleAccountClick = () => {
    onMenuOrAccountClick?.();
    if (isAuthenticated) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      router.push('/auth/signin');
    }
  };

  return (
    <>
      <nav
        className={styles.navbar}
        style={{ background: bg }}
      >
        <div className={styles.logoContainer}>
          <Link href="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <Image src={isBlueIcons ? "/blue_nav_icons/Blue PLUTUS LOGO.svg" : "/nav/plutus logo.svg"} alt="House of Plutus Logo" width={160} height={48} priority />
          </Link>
        </div>
        <div className={styles.iconsContainer}>
          <button className={styles.iconBtn} aria-label="Search" onClick={onSearchClick}>
            <Image src={isHome ? "/nav/search.svg" : (isBlueIcons ? "/blue_nav_icons/Blue Search icon.svg" : "/nav/search.svg")} alt="Search" width={32} height={32} />
            {!isPreloaded && loading && (
              <div style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                background: '#ff6b6b',
                borderRadius: '50%',
                animation: 'pulse 1s infinite'
              }}></div>
            )}
          </button>
         
          <button 
            className={styles.iconBtn} 
            style={{ position: 'relative' }} 
            onClick={() => {
              clearStashDot();
              router.push('/stash');
            }}
            aria-label="Stash"
          >
            <Image src={isHome ? "/nav/STASH.svg" : (isBlueIcons ? "/blue_nav_icons/Blue Stash icon.svg" : "/nav/STASH.svg")} alt="Stash" width={22} height={22} />
            {showStashDot && (
              <span className={isBlinking ? styles.blinkingDot : styles.solidDot}></span>
            )}
          </button>

          <button 
            ref={accountButtonRef}
            className={styles.iconBtn} 
            aria-label="Account"
            onClick={handleAccountClick}
          >
            {isAuthenticated && user ? (
              <div className={styles.userAvatar}>
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            ) : (
              <Image src={isHome ? "/nav/ACCOUNT.svg" : (isBlueIcons ? "/blue_nav_icons/Blue account icon.svg" : "/nav/ACCOUNT.svg")} alt="Account" width={32} height={32} style={{ filter: isHome ? 'brightness(0) invert(1)' : 'none' }} />
            )}
          </button>
          {isMenuOpen ? (
            <button className={styles.iconBtn} aria-label="Close Menu" onClick={() => setIsMenuOpen(false)}>
              <span style={{fontSize: 32, color: isHome ? '#fff' : (isBlueIcons ? '#22304a' : '#fff'), lineHeight: 1, fontWeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32}}>×</span>
            </button>
          ) : (
            <button className={styles.iconBtn} aria-label="Menu" onClick={() => {
              onMenuOrAccountClick?.();
              setIsMenuOpen(true);
            }}>
              <Image src={isHome ? "/nav/Menu.svg" : (isBlueIcons ? "/blue_nav_icons/Blue menu icon.svg" : "/nav/Menu.svg")} alt="Menu" width={32} height={32} />
              {!isPreloaded && loading && (
                <div style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  background: '#ff6b6b',
                  borderRadius: '50%',
                  animation: 'pulse 1s infinite'
                }}></div>
              )}
            </button>
          )}
        </div>
      </nav>
      {isMenuOpen && (
        <Menu />
      )}
      <UserMenu 
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        anchorRef={accountButtonRef}
      />
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Navbar; 