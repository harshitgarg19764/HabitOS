'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.getMe();
      setUser(response.data);
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      
      const token = response.data?.accessToken;
      if (token) {
        localStorage.setItem('accessToken', token);
      }
      
      setUser(response.data.user);
      router.push('/dashboard');
      
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const response = await authAPI.register({ name, email, password });
      
      const token = response.data?.accessToken;
      if (token) {
        localStorage.setItem('accessToken', token);
      }
      
      setUser(response.data.user);
      router.push('/dashboard');
      
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/');
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated: !!user,
  }), [user, loading, error, router]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
