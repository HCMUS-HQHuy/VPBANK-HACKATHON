// src/pages/AICoachPage.jsx

import { useEffect, useState } from 'react';
import JarsAllocation from '@/components/dashboard/JarsAllocation';
import CategorizeExpenseCard from '@/components/aiCoach/CategorizeExpenseCard';
import ChatInterface from '@/components/aiCoach/ChatInterface';
import apiClient from '@/services/apiClient'; // Import apiClient

const AiCoachPage = () => {
  // State để lưu trữ dữ liệu các hũ
  const [jars, setJars] = useState([]);
  // State để trigger việc fetch lại dữ liệu jars khi có thay đổi
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch dữ liệu các hũ khi component được tải hoặc khi có trigger
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
  }, [refreshTrigger]); // Fetch lại khi refreshTrigger thay đổi

  // Hàm này sẽ được gọi từ CategorizeExpenseCard khi phân loại thành công
  const handleCategorizationSuccess = () => {
    // Thay đổi giá trị của trigger để kích hoạt useEffect fetch lại dữ liệu
    setRefreshTrigger(prev => prev + 1); 
  };


  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Cột Trái */}
          <div className="lg:col-span-1 space-y-8">
            <CategorizeExpenseCard onCategorizeSuccess={handleCategorizationSuccess} />
            <div className="glass-card p-6 rounded-xl border border-border shadow-sm">
                {/* Truyền dữ liệu hũ động vào component */}
                <JarsAllocation jars={jars} />
            </div>
          </div>

          {/* Cột Phải - Tạm thời bỏ qua */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>

        </div>
      </div>
    </>
  );
};

export default AiCoachPage;