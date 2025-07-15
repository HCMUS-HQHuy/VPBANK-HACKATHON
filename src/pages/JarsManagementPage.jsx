import React from 'react';
import TotalIncomeCard from '@/components/financialOverview/TotalIncomeCard';
import RecurringFeesCard from '@/components/jars/RecurringFeesCard';
import JarsAllocationCard from '@/components/jars/JarsAllocationCard';
import RecommendationCard from '../components/jars/RecommendationCard';
// import SpendingTrendsChart from '@/components/jars/SpendingTrendsChart'; 

const JarsManagementPage = () => {
  return (
    <>
      {/* Main Content Area */}
      <div className="container mx-auto p-4 md:p-8">
        {/* START: Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Controls (Income, Recurring Fees) */}
          <div className="lg:col-span-1 space-y-8">
            <TotalIncomeCard/>
            <RecurringFeesCard />
          </div>

          {/* Right Column: Jars & Statistics */}
          <div className="lg:col-span-2 space-y-8">
            {/* <RecommendationCard/> */}
            <JarsAllocationCard />
            {/* <SpendingTrendsChart /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default JarsManagementPage;