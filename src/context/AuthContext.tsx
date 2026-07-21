import React, { createContext, useContext, useState, ReactNode } from 'react';

// Basic mock user
export interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signup: (email: string, password?: string, name?: string) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = async (email: string) => {
    // Mock login
    setTimeout(() => {
      setUser({ email, name: email.split('@')[0] });
      setIsAuthModalOpen(false);
    }, 500);
  };

  const signup = async (email: string, _?: string, name?: string) => {
    // Mock signup
    setTimeout(() => {
      setUser({ email, name: name || email.split('@')[0] });
      setIsAuthModalOpen(false);
    }, 500);
  };

  const logout = () => setUser(null);
  
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
