import React from 'react';

const SpendingTrendsChart = () => {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Monthly Cumulative Spending</h3>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-md">For June 2024</span>
        </div>
        <div className="w-full h-80">
          <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
            <g>
              <line x1="0" y1="0" x2="500" y2="0" stroke="#e2e8f0" strokeWidth="1"></line>
              <line x1="0" y1="50" x2="500" y2="50" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2"></line>
              <line x1="0" y1="100" x2="500" y2="100" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2"></line>
              <line x1="0" y1="150" x2="500" y2="150" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2"></line>
              <text x="50" y="195" fontSize="12" fill="#64748b" textAnchor="middle">1</text>
              <text x="130" y="195" fontSize="12" fill="#64748b" textAnchor="middle">5</text>
              <text x="210" y="195" fontSize="12" fill="#64748b" textAnchor="middle">10</text>
              <text x="290" y="195" fontSize="12" fill="#64748b" textAnchor="middle">15</text>
              <text x="370" y="195" fontSize="12" fill="#64748b" textAnchor="middle">20</text>
              <text x="450" y="195" fontSize="12" fill="#64748b" textAnchor="middle">25</text>
            </g>
            <g>
              <path d="M 50 180 L 130 180 L 210 175 L 290 175 L 370 170 L 450 170" stroke="#ec4899" fill="none" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M 50 175 L 130 170 L 210 165 L 290 160 L 370 155 L 450 150" stroke="#ef4444" fill="none" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M 50 165 L 130 160 L 210 155 L 290 140 L 370 140 L 450 130" stroke="#3b82f6" fill="none" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M 50 150 L 130 140 L 210 120 L 290 110 L 370 90 L 450 85" stroke="#f59e0b" fill="none" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M 50 130 L 130 110 L 210 110 L 290 110 L 370 110 L 450 110" stroke="#10b981" fill="none" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M 50 80 L 130 70 L 210 65 L 290 55 L 370 45 L 450 40" stroke="#4f46e5" fill="none" strokeWidth="3" strokeLinecap="round"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SpendingTrendsChart;