// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // URL của backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm một interceptor để tự động gắn token vào mỗi request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 1. Lấy tất cả các hũ ngân sách
export const getJars = () => apiClient.get('/jars/');

// 2. Lấy tất cả giao dịch (có thể thêm filter sau)
export const getTransactions = (params) => apiClient.get('/transactions/', { params });

// 3. Lấy cài đặt người dùng (bao gồm tổng thu nhập)
export const getUserSettings = () => apiClient.get('/user/settings');


export default apiClient;