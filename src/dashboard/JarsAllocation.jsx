import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import JarsIcon from "@/common/JarsIcon";

const JarsAllocation = () => {
	return (
		<>
			<div className="flex justify-between items-center mb-6">
			<h3 className="text-xl font-bold text-slate-800">Jars Allocation</h3>
			<a href="#" className="text-sm font-semibold text-primary hover:text-indigo-700">Details »</a>
			</div>
			<div className="grid grid-cols-3 gap-y-6 text-center">
			{JarsIcon.map(({ label, percent, icon, background, color }) => (
				<div key={label} className="flex flex-col items-center">
				<div className={`w-12 h-12 rounded-full flex items-center justify-center ${background} ${color} text-xl`}>
					<FontAwesomeIcon icon={icon}/>
				</div>
				<p className="text-sm font-medium text-slate-600 mt-2">{label}</p>
				<p className="font-bold text-slate-800">{percent}</p>
				</div>
			))}
			</div>
		</>
	)
}

export default JarsAllocation;