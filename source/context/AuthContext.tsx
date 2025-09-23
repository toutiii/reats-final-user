// /source/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define the shape of the context data
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void; // We'll add a logout function for completeness
}

// 2. Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // In a real app, these functions would handle tokens, API calls, etc.
  const login = () => {
    console.log('User logged in');
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('User logged out');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Create a custom hook for easy consumption of the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
