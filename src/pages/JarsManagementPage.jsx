import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useJarsData } from '@/hooks/useJarsData'; 

import EditIncomeModal from '@/components/financialOverview/EditIncomeModal';
import ManageJarsModal from '@/components/jars/ManageJarsModal';
import AddFeeModal from '@/components/jars/AddFeeModal'; 

import TotalIncomeCard from '@/components/financialOverview/TotalIncomeCard';
import RecurringFeesCard from '@/components/jars/RecurringFeesCard';
import JarsAllocationCard from '@/components/jars/JarsAllocationCard';

const JarsManagementPage = () => {
  const { data, isLoading, error, refetch } = useJarsData();
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isJarsModalOpen, setIsJarsModalOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false); 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-danger-light text-danger rounded-lg">
        <p className="font-bold">Oops! Something went wrong.</p>
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <>
      <EditIncomeModal 
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        currentIncome={data.settings?.total_income}
        onSuccess={refetch}
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
            <TotalIncomeCard 
              income={data.settings?.total_income} 
              onEditClick={() => setIsIncomeModalOpen(true)}
            />
            <RecurringFeesCard 
              fees={data.fees}
              onAddFeeClick={() => setIsFeeModalOpen(true)}
              onSuccess={refetch}
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