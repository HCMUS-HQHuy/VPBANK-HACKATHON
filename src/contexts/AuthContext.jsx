// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Nếu có token, gọi API để lấy thông tin user
      apiClient.get('/auth/me')
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token không hợp lệ -> logout
          localStorage.removeItem('authToken');
          setUser(null);
          setIsAuthenticated(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    // API yêu cầu form-data cho việc login
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await apiClient.post('/auth/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    
    const { access_token } = response.data;
    localStorage.setItem('authToken', access_token);
    setToken(access_token);
    setIsAuthenticated(true);
    
    // Sau khi login, gọi /auth/me để lấy thông tin user
    const userResponse = await apiClient.get('/auth/me');
    setUser(userResponse.data);
  };

  const register = async (userData) => {
    // userData là object { email, username, password }
    return apiClient.post('/auth/register', userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  return useContext(AuthContext);
};