
const Spending = () => {
	return (
		<>
			<h3 className="text-xl font-bold text-text-primary mb-6">Weekly Spending</h3>
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
					<span className="absolute bottom-full mb-2 hidden group-hover:block bg-card-secondary text-text-primary text-xs px-2 py-1 rounded">
					{amount}
					</span>
				</div>
				<div className={`w-8 ${height} bg-blue transition-colors rounded-t-lg`}></div>
				<p className="text-xs font-medium text-text-secondary">{day}</p>
				</div>
			))}
			</div>
		</>
	)
}

export default Spending;