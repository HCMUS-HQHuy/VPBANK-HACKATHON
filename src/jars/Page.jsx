import React from 'react';
import TotalIncomeCard from '@/common/financialOverview/TotalIncomeCard';
import RecurringFeesCard from './RecurringFeesCard';
import JarsAllocationCard from './JarsAllocationCard';
import SpendingTrendsChart from './SpendingTrendsChart';

const JarsManagementPage = () => {
  return (
    <>
      {/* Main Content Area */}
      <div className="container mx-auto p-4 md:p-8">
        {/* START: Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column: Controls (Income, Recurring Fees) */}
          <div className="lg:col-span-2 space-y-8">
            <TotalIncomeCard/>
            <RecurringFeesCard />
          </div>

          {/* Right Column: Jars & Statistics */}
          <div className="lg:col-span-3 space-y-8">
            <JarsAllocationCard />
            {/* <SpendingTrendsChart /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default JarsManagementPage;