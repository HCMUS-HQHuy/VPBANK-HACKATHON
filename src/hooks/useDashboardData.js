// src/hooks/useDashboardData.js

import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/services/apiClient';

export const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const processWeeklySpending = (transactions) => {
    // Thứ tự các ngày mà component Spending.jsx sẽ render
    const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const weeklyData = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    
    transactions.forEach(tx => {
        // Đọc từ trường transaction_datetime thay vì date
        const txDate = new Date(tx.transaction_datetime); 
        
        // getDay() trả về 0 cho Chủ Nhật, 1 cho Thứ Hai, ..., 6 cho Thứ Bảy.
        // Điều chỉnh để 0 là Thứ Hai... 6 là Chủ Nhật để khớp với mảng daysOrder
        let dayIndex = txDate.getDay() - 1;
        if (dayIndex === -1) { // Nếu là Chủ Nhật (0), chuyển thành index 6
            dayIndex = 6;
        }

        const dayName = daysOrder[dayIndex];
        if (dayName) {
          weeklyData[dayName] += tx.amount;
        }
    });
    
    const allAmounts = Object.values(weeklyData);
    const maxAmount = allAmounts.length > 0 ? Math.max(...allAmounts) : 1;
    
    // Trả về dữ liệu theo đúng thứ tự render
    return daysOrder.map(day => ({
        day,
        amount: `$${weeklyData[day].toFixed(2)}`,
        height: `h-[${(weeklyData[day] / (maxAmount || 1)) * 150}px]` // 150px là chiều cao tối đa ví dụ
    }));
  };

  const fetchData = useCallback(async () => {
    try {
      const [settingsRes, jarsRes, transactionsRes] = await Promise.all([
        apiClient.get('/user/settings'),
        apiClient.get('/jars/'),
        apiClient.get('/transactions/?limit=100')
      ]);

      const totalIncome = settingsRes.data.total_income;
      const jars = jarsRes.data;
      const transactions = transactionsRes.data;

      // Logic tính toán các chỉ số khác giữ nguyên
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const totalExpenses = transactions
        .filter(t => {
          const tDate = new Date(t.transaction_datetime);
          return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
        
      const remainingAmount = totalIncome - totalExpenses;
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
  }, []);

  useEffect(() => {
    fetchData();
    
    const handleFocus = () => {
      fetchData();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};