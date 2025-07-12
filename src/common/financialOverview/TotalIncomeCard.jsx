
const TotalIncomeCard = () => {
	return (
		<>
			<div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Total Income</h3>
                <a href="#" className="text-sm font-semibold text-primary hover:text-indigo-700">Edit</a>
              </div>
              <p className="text-4xl font-bold text-slate-900 mt-2">
                $3,500.00 <span className="text-xl font-medium text-slate-500">/ month</span>
              </p>
            </div>
		</>
	)
}

export default TotalIncomeCard;