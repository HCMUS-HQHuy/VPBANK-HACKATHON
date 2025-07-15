const Spending = ({ weeklyData = [] }) => { // Nhận dữ liệu tuần qua props
  return (
    <>
      <h3 className="text-xl font-bold text-text-primary mb-6">Weekly Spending</h3>
      <div className="flex items-end justify-around h-48">
        {weeklyData && weeklyData.map(({ day, amount, height }) => (
          <div key={day} className="flex flex-col items-center gap-2 group">
            <div className="relative">
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-card-secondary text-text-primary text-xs px-2 py-1 rounded">
                {amount}
              </span>
            </div>
            <div className={`w-8 bg-blue transition-colors rounded-t-lg`} style={{ height: height.replace(/h-\[(.*?)px\]/, '$1px') }}></div>
            <p className="text-xs font-medium text-text-secondary">{day}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Spending;