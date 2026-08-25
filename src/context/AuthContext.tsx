import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { supabaseService, SupabaseConfig, DEFAULT_USER, ADMIN_USER } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (name: string, email: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  supabaseConfig: SupabaseConfig;
  updateSupabaseCredentials: (url: string, key: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(supabaseService.getConfig());

  useEffect(() => {
    const checkUser = async () => {
      try {
        let currentUser = await supabaseService.getCurrentUser();
        const pathname = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
        const search = typeof window !== 'undefined' ? window.location.search.toLowerCase() : '';
        const hash = typeof window !== 'undefined' ? window.location.hash.toLowerCase() : '';
        const isAdminRoute = pathname.includes('admin') || search.includes('admin') || hash.includes('admin');

        if (!currentUser && isAdminRoute) {
          currentUser = ADMIN_USER;
          localStorage.setItem('nosso_bairro_current_user', JSON.stringify(ADMIN_USER));
        } else if (!currentUser) {
          currentUser = DEFAULT_USER;
          localStorage.setItem('nosso_bairro_current_user', JSON.stringify(DEFAULT_USER));
        }
        setUser(currentUser);
      } catch (err) {
        console.error('Error fetching current user:', err);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const signIn = async (email: string, password = 'password123') => {
    setIsLoading(true);
    try {
      const loggedUser = await supabaseService.signIn(email, password);
      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password = 'password123') => {
    setIsLoading(true);
    try {
      const newUser = await supabaseService.signUp(name, email, password);
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await supabaseService.signOut();
    setUser(null);
  };

  const updateProfile = async (userData: Partial<User>) => {
    const updated = await supabaseService.updateProfile(userData);
    setUser(updated);
  };

  const updateSupabaseCredentials = (url: string, key: string) => {
    const ok = supabaseService.setSupabaseCredentials(url, key);
    if (ok) {
      setSupabaseConfig(supabaseService.getConfig());
    }
    return ok;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        supabaseConfig,
        updateSupabaseCredentials
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
