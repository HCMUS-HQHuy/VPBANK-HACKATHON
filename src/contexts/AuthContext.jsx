// src/contexts/AuthContext.jsx
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
          // Nếu có token, gọi API để lấy thông tin user
          const response = await apiClient.get('/auth/me');
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          // Token không hợp lệ hoặc hết hạn
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

  // THÊM HÀM MỚI NÀY VÀO
  const updateUserProfile = async (updateData) => {
    try {
      // Gọi API endpoint mới
      const response = await apiClient.put('/auth/me', updateData);
      
      // Cập nhật lại state 'user' ngay lập tức để UI thay đổi
      setUser(response.data); 
      
      // Trả về dữ liệu để form có thể xử lý (ví dụ: hiển thị thông báo thành công)
      return response.data;
    } catch (error) {
      // Ném lỗi ra ngoài để component có thể bắt và hiển thị
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  // --- THÊM HÀM MỚI ĐỂ ĐỔI MẬT KHẨU ---
  const changePassword = async (passwordData) => {
    // passwordData là object { current_password, new_password }
    try {
      await apiClient.post('/auth/change-password', passwordData);
      // Không cần trả về gì, chỉ cần không có lỗi là thành công
    } catch (error) {
      console.error("Failed to change password:", error);
      // Ném lỗi ra để component có thể bắt và hiển thị
      throw error; 
    }
  };

  const login = async (username, password) => {
    // API yêu cầu form-data cho việc login, chúng ta tạo nó bằng URLSearchParams
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    // Gọi API login
    const response = await apiClient.post('/auth/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    
    // Lấy access token từ response
    const { access_token } = response.data;
    
    // Lưu token vào localStorage để duy trì đăng nhập
    localStorage.setItem('authToken', access_token);
    
    // Cập nhật state
    setToken(access_token);
    setIsAuthenticated(true);
    
    // Sau khi login thành công, gọi /auth/me để lấy thông tin user đầy đủ
    const userResponse = await apiClient.get('/auth/me');
    setUser(userResponse.data);
  };
  
  const register = async (userData) => {
    // userData là một object { email, username, password }
    // Chỉ cần gọi thẳng đến API đăng ký
    return apiClient.post('/auth/register', userData);
  };

  const logout = () => {
    // Xóa token khỏi localStorage và reset state
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, isLoading, login, register, logout, updateUserProfile, changePassword };

  // Chỉ render children khi không còn loading để đảm bảo ProtectedRoute hoạt động đúng
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  return useContext(AuthContext);
};