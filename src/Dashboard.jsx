import {
  faHouseChimney,
  faPiggyBank,
  faMartiniGlassCitrus,
  faGraduationCap,
  faHandHoldingDollar,
  faGift,
} from '@fortawesome/free-solid-svg-icons'


const Dashboard = () => {
  return (
	<>
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
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Total Income</h3>
                <a href="#" className="text-sm font-semibold text-primary hover:text-indigo-700">Edit</a>
              </div>
              <p className="text-4xl font-bold text-slate-900 mt-2">
                $3,500.00 <span className="text-xl font-medium text-slate-500">/ month</span>
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-bg text-green-text text-3xl">
                <i className="fa-solid fa-wallet"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Remaining this Month</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">$2,350</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-bg text-red-text text-3xl">
                <i className="fa-solid fa-arrow-trend-down"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Expenses this Month</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">$1,150</p>
              </div>
            </div>
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
                  { label: 'Necessities', percent: '55%', icon: 'house-chimney', color: 'indigo' },
                  { label: 'Savings', percent: '10%', icon: 'piggy-bank', color: 'green' },
                  { label: 'Fun', percent: '10%', icon: 'martini-glass-citrus', color: 'yellow' },
                  { label: 'Education', percent: '10%', icon: 'graduation-cap', color: 'blue' },
                  { label: 'Invest', percent: '10%', icon: 'hand-holding-dollar', color: 'red' },
                  { label: 'Give', percent: '5%', icon: 'gift', color: 'pink' },
                ].map(({ label, percent, icon, color }) => (
                  <div key={label} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${color}-100 text-${color}-600 text-xl`}>
                      <i className={`fa-solid fa-${icon}`}></i>
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
