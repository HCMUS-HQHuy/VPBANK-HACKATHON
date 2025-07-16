import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useJarsData } from '@/hooks/useJarsData'; 

// Import các modal
import EditIncomeModal from '@/components/financialOverview/EditIncomeModal';
import ManageJarsModal from '@/components/jars/ManageJarsModal';
import AddFeeModal from '@/components/jars/AddFeeModal'; // <-- THÊM IMPORT NÀY

import TotalIncomeCard from '@/components/financialOverview/TotalIncomeCard';
import RecurringFeesCard from '@/components/jars/RecurringFeesCard';
import JarsAllocationCard from '@/components/jars/JarsAllocationCard';

const JarsManagementPage = () => {
  // Dùng hook để lấy dữ liệu và hàm refetch
  const { data, isLoading, error, refetch } = useJarsData();

  // State để quản lý việc mở/đóng các modal
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isJarsModalOpen, setIsJarsModalOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false); // Dành cho tương lai

  // Hiển thị trạng thái loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  // Hiển thị thông báo lỗi
  if (error) {
    return (
      <div className="text-center p-8 bg-danger-light text-danger rounded-lg">
        <p className="font-bold">Oops! Something went wrong.</p>
        <p>{error}</p>
      </div>
    );
  }
  
  // Khi có dữ liệu, render các component với props
  return (
    <>
      {/* KHAI BÁO CÁC MODAL Ở ĐÂY */}
      <EditIncomeModal 
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        currentIncome={data.settings?.total_income}
        onSuccess={refetch} // Tải lại dữ liệu sau khi thành công
      />
      <ManageJarsModal
        isOpen={isJarsModalOpen}
        onClose={() => setIsJarsModalOpen(false)}
        jars={data.jars}
        onSuccess={refetch}
      />
      <AddFeeModal
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        jars={data.jars}
        onSuccess={refetch}
      />

      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Truyền hàm để mở modal vào component con */}
            <TotalIncomeCard 
              income={data.settings?.total_income} 
              onEditClick={() => setIsIncomeModalOpen(true)}
            />
            <RecurringFeesCard 
              fees={data.fees}
              onAddFeeClick={() => setIsFeeModalOpen(true)} // Dành cho tương lai
              onSuccess={refetch} // <-- THÊM DÒNG NÀY VÀO
            />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <JarsAllocationCard 
              jars={data.jars}
              onManageClick={() => setIsJarsModalOpen(true)}
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default JarsManagementPage;