// src/services/api.js
import axios from 'axios';

// Tạo một instance của axios với cấu hình cơ bản
const apiClient = axios.create({
  baseURL: 'https://your-api-domain.com/api', // Lấy từ tài liệu API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Đây là điểm mấu chốt: Interceptor để tự động thêm token vào mỗi yêu cầu
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Chúng ta sẽ lưu token vào localStorage ở Bước 3
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;