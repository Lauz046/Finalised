import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Breadcrumbs } from '../components/ProductPage/Breadcrumbs';
import Navbar from '../components/nav/Navbar';
import SearchOverlay from '../components/SearchOverlay';

const AccountPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Redirect to signin if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect to signin
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Account' }
  ];

  return (
    <>
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Desktop UI */}
      <div style={{ maxWidth: 1500, margin: '0 auto', padding: '104px 32px 0 32px' }}>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px' }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginTop: '24px'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#22304a',
            marginBottom: '32px',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            My Account
          </h1>
          
          {/* User Profile Section */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#22304a',
              marginBottom: '16px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Profile Information
            </h2>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#22304a',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 600,
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#22304a',
                  marginBottom: '4px',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  {user.fullName}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#7a8ca3',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {user.email}
                </div>
                {user.phone && (
                  <div style={{
                    fontSize: '1rem',
                    color: '#7a8ca3',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {user.phone}
                  </div>
                )}
              </div>
            </div>
            
            <div style={{
              fontSize: '0.875rem',
              color: '#7a8ca3',
              fontFamily: 'Inter, sans-serif'
            }}>
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          {/* Account Actions */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#22304a',
              marginBottom: '16px',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Account Actions
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <button
                onClick={() => router.push('/stash')}
                style={{
                  background: '#22304a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2538'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#22304a'}
              >
                View My Stash
              </button>
              
              <button
                onClick={() => router.push('/auth/signin')}
                style={{
                  background: 'transparent',
                  color: '#22304a',
                  border: '2px solid #22304a',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#22304a';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#22304a';
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
          
          {/* Sign Out Section */}
          <div style={{
            borderTop: '1px solid #e0e0e0',
            paddingTop: '24px'
          }}>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#dc3545',
                border: '2px solid #dc3545',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#dc3545';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#dc3545';
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage; 