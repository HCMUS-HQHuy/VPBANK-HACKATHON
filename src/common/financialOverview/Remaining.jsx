import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

const Remaining = ()=> {
	return (
		<>
			<div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
				<div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100 text-green-700 text-3xl">
				<FontAwesomeIcon icon={faWallet}/>
				</div>
				<div>
				<p className="text-sm font-medium text-slate-500">Remaining this Month</p>
				<p className="text-3xl font-bold text-slate-800 mt-1">$2,350</p>
				</div>
			</div>
		</>
	)
}

export default Remaining;