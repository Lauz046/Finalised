import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useStash } from '../components/StashContext';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (email: string, fullName: string, password: string, phone?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const { syncStashWithUser } = useStash();

  // Handle NextAuth session changes
  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    if (status === 'authenticated' && session?.user) {
      // User is authenticated via NextAuth (Google OAuth)
      const nextAuthUser: User = {
        id: session.user.email || 'nextauth-user',
        fullName: session.user.name || session.user.email?.split('@')[0] || 'User',
        email: session.user.email || '',
        createdAt: new Date().toISOString()
      };
      
      setUser(nextAuthUser);
      setIsAuthenticated(true);
      syncStashWithUser(nextAuthUser.id);
      setIsLoading(false);
    } else if (status === 'unauthenticated') {
      // Check for custom authentication
      const savedUser = localStorage.getItem('plutus_user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          syncStashWithUser(userData.id);
        } catch (error) {
          console.error('Error loading user data:', error);
          localStorage.removeItem('plutus_user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }
  }, [session, status, syncStashWithUser]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('plutus_user', JSON.stringify(data.user));
        syncStashWithUser(data.user.id);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }
  };

  const signup = async (email: string, fullName: string, password: string, phone?: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName: email.split('@')[0], email, password, phone }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('plutus_user', JSON.stringify(data.user));
        syncStashWithUser(data.user.id);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Failed to create account. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('plutus_user');
    
    // Clear user-specific stash and revert to anonymous stash
    if (user) {
      localStorage.removeItem(`plutus_user_stash_${user.id}`);
    }

    // If user was authenticated via NextAuth, sign out from NextAuth as well
    if (status === 'authenticated') {
      signOut({ callbackUrl: '/' });
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 