// src/pages/DashboardPage.jsx
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';

import JarsAllocation from '@/components/dashboard/JarsAllocation';
import Spending from '@/components/dashboard/Spending';
import TotalIncomeCard from '@/components/financialOverview/TotalIncomeCard';
import RemainingCard from '@/components/financialOverview/RemainingCard';
import ExpensesCard from '@/components/financialOverview/ExpensesCard';
import EditIncomeModal from '@/components/financialOverview/EditIncomeModal';

const Dashboard = () => {
  const { user } = useAuth();
  // CẬP NHẬT DÒNG NÀY: Thêm 'refetch' vào danh sách các biến được lấy ra từ hook
  const { data, isLoading, error, refetch } = useDashboardData();

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);

  if (isLoading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-danger">Failed to load dashboard data. Please try again later.</div>;
  }

  // Logic cho thông báo Heads up (ví dụ)
  // Thêm 'optional chaining' (?.) để tránh lỗi khi data chưa có
  const funJar = data?.jars?.find(j => j.name.toLowerCase() === 'play');
  let headsUpMessage = null;
  if (funJar && funJar.amount > 0) {
    const funJarUsage = (funJar.current_amount / funJar.amount) * 100;
    if (funJarUsage > 70) {
        headsUpMessage = `Heads up! Your 'Fun' budget is ${funJarUsage.toFixed(0)}% used, but we're only halfway through the month.`;
    }
  }

  return (
    <>
      <EditIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        currentIncome={data?.totalIncome}
        // Cập nhật onSuccess để đóng modal sau khi refetch
        onSuccess={() => {
          refetch();
          setIsIncomeModalOpen(false);
        }}
      />
      
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Good morning, {user?.username || 'User'}!
          </h1>
          {headsUpMessage && (
            <div className="flex items-start gap-4 p-4 bg-yellow-light text-yellow border border-yellow rounded-lg">
              <i className="fa-solid fa-lightbulb text-xl mt-1"></i>
              <p className="text-base">
                <span className="font-semibold">Heads up!</span> {headsUpMessage}
              </p>
            </div>
          )}
        </header>

        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TotalIncomeCard 
              income={data?.totalIncome} 
              onEditClick={() => setIsIncomeModalOpen(true)}
            />
            <RemainingCard remaining={data?.remainingAmount} />
            <ExpensesCard expenses={data?.totalExpenses} />
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm">
              <Spending weeklyData={data?.weeklySpending} />
            </div>
            
            <div className="lg:col-span-1 bg-card p-6 rounded-xl border border-border shadow-sm">
              <JarsAllocation jars={data?.jars} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;