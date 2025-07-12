import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faPiggyBank, faMartiniGlassCitrus, faGraduationCap, faHandHoldingDollar, faGift } from '@fortawesome/free-solid-svg-icons'
import Navbar from '@/common/Navbar';
import Expenses from '@/common/financialOverview/Expenses';
import Remaining from '@/common/financialOverview/Remaining';
import TotalIncome from '@/common/financialOverview/TotalIncome';

const Dashboard = () => {
  return (
	<>
      <Navbar/>
      {/* Main Container */}
      <div className="container mx-auto p-4 md:p-8">
        {/* Header Greeting */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Good morning, Alex!</h1>
          <div className="flex items-start gap-4 p-4 bg-blue-100 text-blue-800 border border-blue-200 rounded-lg">
            <i className="fa-solid fa-lightbulb text-xl mt-1"></i>
            <p className="text-base">
              <span className="font-semibold">Heads up!</span> Your 'Fun' budget is 70% used, but we're only halfway through the month.
            </p>
          </div>
        </header>

        {/* Financial Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TotalIncome/>
            <Remaining/>
            <Expenses/>
          </div>
        </section>

        {/* Weekly Spending & Jars */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Spending Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Weekly Spending</h3>
              <div className="flex items-end justify-around h-48">
                {[
                  { day: 'Mon', amount: '$25', height: 'h-10' },
                  { day: 'Tue', amount: '$87', height: 'h-32' },
                  { day: 'Wed', amount: '$15', height: 'h-6' },
                  { day: 'Thu', amount: '$120', height: 'h-44' },
                  { day: 'Fri', amount: '$40', height: 'h-16' },
                  { day: 'Sat', amount: '$65', height: 'h-24' },
                  { day: 'Sun', amount: '$5', height: 'h-2' }
                ].map(({ day, amount, height }) => (
                  <div key={day} className="flex flex-col items-center gap-2 group">
                    <div className="relative">
                      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs px-2 py-1 rounded">
                        {amount}
                      </span>
                    </div>
                    <div className={`w-8 ${height} bg-primary transition-colors rounded-t-lg`}></div>
                    <p className="text-xs font-medium text-slate-500">{day}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Jars Allocation */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Jars Allocation</h3>
                <a href="#" className="text-sm font-semibold text-primary hover:text-indigo-700">Details »</a>
              </div>
              <div className="grid grid-cols-3 gap-y-6 text-center">
                {[
                    { label: 'Necessities', percent: '55%', icon: faHouseChimney, color: 'bg-indigo-100 text-indigo-600' },
                    { label: 'Savings', percent: '10%', icon: faPiggyBank, color: 'bg-green-100 text-green-600' },
                    { label: 'Fun', percent: '10%', icon: faMartiniGlassCitrus, color: 'bg-yellow-100 text-yellow-600' },
                    { label: 'Education', percent: '10%', icon: faGraduationCap, color: 'bg-blue-100 text-blue-600' },
                    { label: 'Invest', percent: '10%', icon: faHandHoldingDollar, color: 'bg-red-100 text-red-600' },
                    { label: 'Give', percent: '5%', icon: faGift, color: 'bg-pink-100 text-pink-600' },
                ].map(({ label, percent, icon, color }) => (
                  <div key={label} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} text-xl`}>
                      <FontAwesomeIcon icon={icon}/>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mt-2">{label}</p>
                    <p className="font-bold text-slate-800">{percent}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

	</>
  );
};

export default Dashboard;
