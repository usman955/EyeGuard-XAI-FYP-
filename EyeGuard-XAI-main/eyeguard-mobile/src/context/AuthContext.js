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
const API_URL = 'http://192.168.1.14:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      // Load current session user
      const storedUser = await AsyncStorage.getItem('eyeguard_user');
      const token = await AsyncStorage.getItem('eyeguard_token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to load auth data", e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, role) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, role })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      
      setUser(data.user);
      await AsyncStorage.setItem('eyeguard_user', JSON.stringify(data.user));
      await AsyncStorage.setItem('eyeguard_token', data.token);
      return data.user;
    } catch (err) {
      throw err;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: userData.name, 
          email: userData.email.trim(), 
          password: userData.password, 
          role: userData.role, 
          license: userData.license 
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      // No auto-login, redirect to sign-in handled by RegisterScreen
      return { success: true };
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('eyeguard_user');
    await AsyncStorage.removeItem('eyeguard_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
