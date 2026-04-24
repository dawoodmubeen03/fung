import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check for existing session in localStorage
        const storedUser = localStorage.getItem('fungep_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to load user from storage:', err);
      } finally {
        setLoading(false);
      }
    };

    // Simulate async auth check
    setTimeout(initializeAuth, 300);
  }, []);

  // Login function - mock implementation
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Create user object
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        loginTime: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem('fungep_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('fungep_user');
    setUser(null);
    setError(null);
  };

  // Register function
  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('fungep_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
