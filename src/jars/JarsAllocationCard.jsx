import React from 'react';

// This is the individual, theme-aware card for a single jar.
const JarCard = ({ icon, color, name, remaining, total, percentage }) => {
    const themeColor = color === 'primary' ? `brand-primary` : color;
    const hoverThemeColor = color === 'primary' ? `brand-primary` : color;
    
    return (
        <div className="relative p-5 border border-border rounded-xl flex flex-col bg-card">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <i className={`fa-solid ${icon} text-xl w-6 text-center text-${themeColor}`}></i>
                    <h4 className="font-bold text-text-primary">{name}</h4>
                </div>
                <button className={`text-text-secondary hover:text-${hoverThemeColor}`}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
            <div className="mt-4 flex-grow">
                <p className="text-sm font-medium text-text-secondary">Remaining</p>
                <p className="text-2xl font-bold text-text-primary">
                    {remaining} <span className="text-lg font-normal text-text-secondary">/ {total}</span>
                </p>
            </div>
            <div className="mt-2">
                <div className="w-full bg-card-secondary rounded-full h-2.5">
                    <div className={`bg-${themeColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </div>
    );
};

const JarsAllocationCard = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-text-primary">Jars Allocation & Status</h3>
                <a href="#" className="flex items-center gap-2 text-sm font-semibold text-text-accent hover:underline transition-colors">
                    <i className="fa-solid fa-pencil"></i>
                    <span>Manage Allocation</span>
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* The props passed to JarCard remain the same, but the component now handles them differently */}
                <JarCard icon="fa-house-chimney" color="primary" name="Necessities" remaining="$925.00" total="$1,925.00" percentage={52} />
                <JarCard icon="fa-piggy-bank" color="green" name="Savings" remaining="$350.00" total="$350.00" percentage={100} />
                <JarCard icon="fa-martini-glass-citrus" color="yellow" name="Fun" remaining="$70.00" total="$350.00" percentage={80} />
                <JarCard icon="fa-graduation-cap" color="blue" name="Education" remaining="$300.00" total="$350.00" percentage={14} />
                <JarCard icon="fa-hand-holding-dollar" color="danger" name="Invest" remaining="$17.50" total="$175.00" percentage={90} />
                <JarCard icon="fa-gift" color="pink" name="Give" remaining="$175.00" total="$175.00" percentage={0} />
            </div>
        </div>
    );
};

export default JarsAllocationCard;