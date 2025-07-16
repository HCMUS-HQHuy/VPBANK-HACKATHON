// src/hooks/useJarsData.js

import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/services/apiClient';

export const useJarsData = () => {
  const [data, setData] = useState({
    settings: null,
    jars: [],
    fees: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Gọi đồng thời cả 3 API để tối ưu tốc độ
      const [settingsRes, jarsRes, feesRes] = await Promise.all([
        apiClient.get('/user/settings'),
        apiClient.get('/jars/'),
        apiClient.get('/fees/?active_only=true') // Chỉ lấy các khoản phí đang hoạt động
      ]);

      setData({
        settings: settingsRes.data,
        jars: jarsRes.data,
        fees: feesRes.data,
      });
      
    } catch (err) {
      console.error("Failed to fetch jars page data:", err);
      setError("Could not retrieve your financial data. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback với dependency rỗng để hàm không bị tạo lại

  // Chạy fetchData khi component được mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Trả về state và hàm để tải lại dữ liệu nếu cần
  return { data, isLoading, error, refetch: fetchData };
};