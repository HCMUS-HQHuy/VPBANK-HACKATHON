import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'

const ExpensesCard  = () => {
	return (
		<>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-100 text-red-700 text-3xl">
                <FontAwesomeIcon icon={faArrowTrendDown}/>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Expenses this Month</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">$1,150</p>
              </div>
            </div>
		</>
	)
}

export default ExpensesCard;