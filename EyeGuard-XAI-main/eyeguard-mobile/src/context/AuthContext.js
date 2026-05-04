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
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = 'http://10.0.2.2:5000/api'; // Android Emulator local IP

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('eyeguard_user');
      const token = await AsyncStorage.getItem('eyeguard_token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Failed to load auth data", e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { user, token } = response.data;
      
      setUser(user);
      await AsyncStorage.setItem('eyeguard_user', JSON.stringify(user));
      await AsyncStorage.setItem('eyeguard_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return user;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Login failed');
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('eyeguard_user');
    await AsyncStorage.removeItem('eyeguard_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
