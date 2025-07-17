// src/pages/AICoachPage.jsx

import { useEffect, useState } from 'react';
import JarsAllocation from '@/components/dashboard/JarsAllocation';
import CategorizeExpenseCard from '@/components/aiCoach/CategorizeExpenseCard';
import ChatInterface from '@/components/aiCoach/ChatInterface';
import apiClient from '@/services/apiClient';

const AiCoachPage = () => {
  const [jars, setJars] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchJars = async () => {
      try {
        const response = await apiClient.get('/jars/');
        setJars(response.data);
      } catch (error) {
        console.error("Failed to fetch jars data for AI Coach page:", error);
      }
    };

    fetchJars();
  }, [refreshTrigger]);

  const handleCategorizationSuccess = () => {
    // Khi phân loại ảnh thành công, trigger fetch lại dữ liệu hũ
    // để cập nhật % phân bổ nếu có giao dịch mới được tạo.
    setRefreshTrigger(prev => prev + 1); 
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Cột Trái */}
        <div className="lg:col-span-1 space-y-8">
          <CategorizeExpenseCard onCategorizeSuccess={handleCategorizationSuccess} />
          <div className="glass-card p-6 rounded-xl border border-border shadow-sm">
              <JarsAllocation jars={jars} />
          </div>
        </div>

        {/* Cột Phải */}
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>

      </div>
    </div>
  );
};

export default AiCoachPage;