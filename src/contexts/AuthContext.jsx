import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const response = await apiClient.get('/auth/me');
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    verifyUser();
  }, [token]);

  const updateUserProfile = async (updateData) => {
    try {
      const response = await apiClient.put('/auth/me', updateData);
      setUser(response.data); 
      return response.data;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      await apiClient.post('/auth/change-password', passwordData);
    } catch (error) {
      console.error("Failed to change password:", error);
      throw error; 
    }
  };

  const login = async (username, password) => {
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
    
    const userResponse = await apiClient.get('/auth/me');
    setUser(userResponse.data);
  };
  
  const register = async (userData) => {
    return apiClient.post('/auth/register', userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, isLoading, login, register, logout, updateUserProfile, changePassword };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};