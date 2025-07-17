import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faChevronDown, faChevronUp, faEllipsisH } from '@fortawesome/free-solid-svg-icons'; 
import JarsIcon from '@/utils/JarsIcon'; 

const JarCard = ({ icon, name, spentAmount, total, color, bgColor }) => {
    const actualRemaining = total - spentAmount;
    const usagePercentage = total > 0 ? (spentAmount / total) * 100 : 0;
    const progressWidth = Math.min(100, usagePercentage);

    let progressBarColor;
    if (usagePercentage >= 100) progressBarColor = 'bg-red-900';
    else if (usagePercentage >= 90) progressBarColor = 'bg-red-600';
    else if (usagePercentage >= 80) progressBarColor = 'bg-yellow-400';
    else progressBarColor = bgColor;

    return (
        <div className={`relative p-5 border border-border rounded-xl flex flex-col bg-card hover:bg-card-secondary transition-colors duration-200`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={icon} className={`text-xl w-6 text-center ${color}`}/>
                    <h4 className="font-bold text-text-primary capitalize">{name.replace(/_/g, ' ')}</h4>
                </div>
            </div>
            <div className="mt-4 flex-grow">
                <p className="text-sm font-medium text-text-secondary">Remaining</p>
                <p className="text-2xl font-bold text-text-primary">
                    ${actualRemaining.toFixed(2)} 
                    <span className="text-lg font-normal text-text-secondary"> / ${total.toFixed(2)}</span>
                </p>
            </div>
            <div className="mt-2">
                <div className="w-full bg-card-secondary rounded-full h-2.5">
                    <div 
                        className={`h-2.5 rounded-full transition-all duration-500 ${progressBarColor}`} 
                        style={{ width: `${progressWidth}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const JarsAllocationCard = ({ jars = [], onManageClick }) => {
  const [showAllJars, setShowAllJars] = useState(false);

  const jarsToDisplay = showAllJars ? jars : jars.slice(0, 6);

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-text-primary">Jars Allocation & Status</h3>
            <button onClick={onManageClick} className="flex items-center gap-2 text-sm font-semibold text-text-accent hover:underline transition-colors">
                <FontAwesomeIcon icon={faPencilAlt} />
                <span>Manage Allocation</span>
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-300">
            {jars.length > 0 ? (
                jarsToDisplay.map((jar, index) => {
                    const iconInfo = JarsIcon[jar.name.toLowerCase().replace(/\s/g, '_')] || JarsIcon.Default;
                    const isOverlayItem = !showAllJars && index === 5 && jars.length > 6;

                    if (isOverlayItem) {
                        return (
                            <div 
                                key="show-more-card" 
                                className="relative group cursor-pointer"
                                onClick={() => setShowAllJars(true)}
                                title="Show all jars"
                            >
                                <JarCard
                                    className="opacity-30"
                                    icon={iconInfo.icon}
                                    color={iconInfo.color}
                                    bgColor={iconInfo.bg}
                                    name={jar.name} 
                                    spentAmount={jar.current_amount}
                                    total={jar.amount}          
                                />

                                <div className="absolute inset-0 p-5 bg-card/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center text-text-primary transition-opacity duration-300 opacity-80 group-hover:opacity-100">
                                    <FontAwesomeIcon icon={faEllipsisH} className="text-3xl" />
                                    <p className="mt-2 font-semibold">Show More</p>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <JarCard 
                            key={jar.id || jar._id}
                            icon={iconInfo.icon}
                            color={iconInfo.color}
                            bgColor={iconInfo.bg}
                            name={jar.name} 
                            spentAmount={jar.current_amount}
                            total={jar.amount}          
                        />
                    );
                })
            ) : (
                <p className="col-span-full text-center text-text-secondary py-4">No jars have been set up.</p>
            )}
        </div>

        {showAllJars && jars.length > 6 && (
            <div className="flex justify-center mt-6">
                <button 
                    onClick={() => setShowAllJars(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-text-accent hover:text-primary transition-colors"
                >
                    <span>Show Less</span>
                    <FontAwesomeIcon icon={faChevronUp} />
                </button>
            </div>
        )}
    </div>
  );
};

export default JarsAllocationCard;