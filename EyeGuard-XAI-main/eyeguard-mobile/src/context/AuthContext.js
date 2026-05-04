/**
 * ============================================================================
 * File: AuthContext.js
 * Location: context
 * Purpose: Global state management and context providers for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('eyeguard_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to load auth data", e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Mock login based on email
    let role = 'user';
    if (email.includes('doctor')) {
      role = 'doctor';
    }

    const mockUser = {
      id: 'usr_123',
      name: role === 'doctor' ? 'Dr. Smith' : 'John Doe',
      email: email,
      role: role
    };

    setUser(mockUser);
    await AsyncStorage.setItem('eyeguard_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = async (userData) => {
    // userData contains { name, email, password, role, licenseNumber (if doctor) }
    const mockUser = {
      id: 'usr_456',
      name: userData.name,
      email: userData.email,
      role: userData.role || 'user'
    };

    setUser(mockUser);
    await AsyncStorage.setItem('eyeguard_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('eyeguard_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
