// import Navbar from '@/common/Navbar';
import JarsAllocation from '@/components/dashboard/JarsAllocation';
import Spending from '@/components/dashboard/Spending';
import TotalIncomeCard from '@/components/financialOverview/TotalIncomeCard';
import RemainingCard from '@/components/financialOverview/RemainingCard';
import ExpensesCard from '@/components/financialOverview/ExpensesCard';

const Dashboard = () => {
  return (
	<>
      {/* Main Container */}
      <div className="container mx-auto p-4 md:p-8">
        {/* Header Greeting */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Good morning, Alex!</h1>
          <div className="flex items-start gap-4 p-4 bg-green text-green-light border border-green-light rounded-lg">
            <i className="fa-solid fa-lightbulb text-xl mt-1"></i>
            <p className="text-base">
              <span className="font-semibold">Heads up!</span> Your 'Fun' budget is 70% used, but we're only halfway through the month.
            </p>
          </div>
        </header>

        {/* Financial Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TotalIncomeCard/>
            <RemainingCard/>
            <ExpensesCard/>
          </div>
        </section>

        {/* Weekly Spending & Jars */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Spending Chart */}
            <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm">
              <Spending />
            </div>
            
			<div className="lg:col-span-1 bg-card p-6 rounded-xl border border-border shadow-sm">
                <JarsAllocation/>
            </div>
          </div>
        </section>
      </div>

	</>
  );
};

export default Dashboard;
