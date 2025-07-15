// file: src/hooks/useDashboardData.js

import { useState, useEffect } from 'react';
import apiClient from '@/services/apiClient';

export const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Gọi đồng thời nhiều API để tăng tốc
        const [settingsRes, jarsRes, transactionsRes] = await Promise.all([
          apiClient.get('/user/settings'),
          apiClient.get('/jars/'),
          apiClient.get('/transactions/?limit=100') // Lấy 100 giao dịch gần nhất
        ]);

        // Xử lý dữ liệu
        const totalIncome = settingsRes.data.total_income;
        const jars = jarsRes.data;
        const transactions = transactionsRes.data;

        const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);
        const remainingAmount = totalIncome - totalExpenses;

        // Xử lý dữ liệu cho biểu đồ chi tiêu tuần
        const weeklySpending = processWeeklySpending(transactions);

        setData({
          totalIncome,
          jars,
          transactions,
          totalExpenses,
          remainingAmount,
          weeklySpending,
        });

      } catch (err) {
        setError(err);
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Hàm xử lý dữ liệu chi tiêu tuần (bạn có thể tùy chỉnh)
  const processWeeklySpending = (transactions) => {
      const weeklyData = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
      transactions.forEach(tx => {
          const dayOfWeek = new Date(tx.date).getDay();
          const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
          if(dayName) weeklyData[dayName] += tx.amount;
      });
      
      let maxAmount = Math.max(...Object.values(weeklyData));
      if (maxAmount === 0) maxAmount = 1; // Tránh chia cho 0

      return Object.entries(weeklyData).map(([day, amount]) => ({
          day,
          amount: `$${amount.toFixed(2)}`,
          height: `h-[${(amount / maxAmount) * 180}px]` // 180px là chiều cao tối đa của biểu đồ
      }));
  };


  return { data, isLoading, error };
};