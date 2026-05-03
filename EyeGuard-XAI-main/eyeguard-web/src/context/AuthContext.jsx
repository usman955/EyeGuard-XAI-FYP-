import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('eyeguard_user');
    const token = localStorage.getItem('eyeguard_token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      
      setUser(data.user);
      localStorage.setItem('eyeguard_user', JSON.stringify(data.user));
      localStorage.setItem('eyeguard_token', data.token);
      return data.user;
    } catch (err) {
      throw err;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      setUser(data.user);
      localStorage.setItem('eyeguard_user', JSON.stringify(data.user));
      localStorage.setItem('eyeguard_token', data.token);
      return data.user;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eyeguard_user');
    localStorage.removeItem('eyeguard_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
