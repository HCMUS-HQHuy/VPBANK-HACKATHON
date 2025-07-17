import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // backend API base URL
  // baseURL: 'http://18.142.146.42:8000/api', // backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const getJars = () => apiClient.get('/jars/');
export const getTransactions = (params) => apiClient.get('/transactions/', { params });
export const getUserSettings = () => apiClient.get('/user/settings');


export default apiClient;