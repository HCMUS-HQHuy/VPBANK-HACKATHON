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
      const [settingsRes, jarsRes, feesRes] = await Promise.all([
        apiClient.get('/user/settings'),
        apiClient.get('/jars/'),
        apiClient.get('/fees/?active_only=true')
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};