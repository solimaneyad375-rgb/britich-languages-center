/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('bcl_active_session_token');
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate session on mount with real backend server
  useEffect(() => {
    let isMounted = true;

    async function verifySession() {
      if (token) {
        api.setAuthToken(token);
      }

      try {
        const result = await api.checkAuth();
        if (isMounted) {
          if (result && result.valid && result.user) {
            setUser(result.user);
          } else {
            // Invalid or expired token
            setToken(null);
            setUser(null);
            try {
              sessionStorage.removeItem('bcl_active_session_token');
            } catch {}
          }
        }
      } catch {
        if (isMounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    verifySession();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    api.setAuthToken(newToken);
    try {
      sessionStorage.setItem('bcl_active_session_token', newToken);
    } catch {}
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    api.setAuthToken(null);
    try {
      sessionStorage.removeItem('bcl_active_session_token');
      localStorage.removeItem('bcl_token');
      localStorage.removeItem('bcl_user');
    } catch {}
    api.logout().catch(() => {});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
