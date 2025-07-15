import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCreditCard,
    faBell,
    faMoneyBillWave,
    faChevronLeft,
    faChevronRight,
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import JarsIcon from '@/utils/JarsIcon';
import RecurringFeeForm from './RecurringFeeForm';

// --- CHILD COMPONENT: Represents a single fee item (Unchanged) ---
const RecurringFeeItem = ({ name, jar, amount, frequency, alert, icon, color, bgLight }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    return (
        <>
            <div className="bg-card border border-border rounded-xl shadow-md text-text-primary overflow-hidden mb-2">
                <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${bgLight} rounded-full flex items-center justify-center`}>
                            <FontAwesomeIcon icon={icon} className={`text-xl ${color}`} />
                        </div>
                        <div>
                            <h4 className="font-bold text-text-primary">{name}</h4>
                            <p className="text-sm text-text-secondary">{jar}</p>
                        </div>
                    </div>
                    <button onClick={() => setIsFormOpen(true)} className="text-xl text-gray-500 cursor-pointer">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                </div>
                <div className="bg-card-secondary border-t border-border px-4 py-2.5 flex items-center justify-between text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                        <span>${amount.toFixed(2)}</span>
                    </div>
                    <div className="w-px h-4 bg-border"></div>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCreditCard} /><span>{frequency}</span>
                    </div>
                    <div className="w-px h-4 bg-border"></div>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faBell} /><span>{alert}</span>
                    </div>
                </div>
            </div>
            {isFormOpen && <RecurringFeeForm onSubmit={()=>{}} onDelete={()=>{}} onCancel={() => setIsFormOpen(false)} />}
        </>
    );
};

const RecurringFeesModal = ({ fees, onClose }) => {
    return (
        <div className="bg-card w-full max-w-md p-6 md:p-8 rounded-xl shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-text-primary">All Recurring Fees</h3>
                <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-2xl">×</button>
            </div>
            <div className="overflow-y-auto space-y-4 pr-2">
                {fees.map(fee => <RecurringFeeItem key={fee.name} {...fee} />)}
            </div>
        </div>
    );
};

const RecurringFeesCard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const recurringFeesFromAPI = [
        { name: "Rent", amount: 1200.00, target_jar: "Necessities", pattern_type: "monthly", pattern_details: [1], is_active: true },
        { name: "Spotify", amount: 9.99, target_jar: "Fun", pattern_type: "monthly", pattern_details: [28], is_active: true },
        { name: "Gym", amount: 35.00, target_jar: "Health", pattern_type: "monthly", pattern_details: [25], is_active: false },
        { name: "Car Insurance", amount: 85.50, target_jar: "Necessities", pattern_type: "monthly", pattern_details: [15], is_active: true },
        { name: "Phone Bill", amount: 55.00, target_jar: "Necessities", pattern_type: "monthly", pattern_details: [20], is_active: true },
    ];

    const mapFeeToCardProps = (fee) => {
        const styleProps = JarsIcon[fee.target_jar] || { icon: faMoneyBillWave, color: 'text-text-secondary', bgLight: 'bg-card-secondary' };
        let alertText = `on day ${fee.pattern_details[0]}`;
        return { name: fee.name, amount: fee.amount, frequency: fee.pattern_type, jar: fee.target_jar, alert: alertText, ...styleProps };
    };
    
    const allFeeProps = recurringFeesFromAPI.map(mapFeeToCardProps);

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(allFeeProps.length - 1, prev + 1));
    };

    const progressPercentage = allFeeProps.length > 1 ? (currentIndex / (allFeeProps.length - 1)) * 100 : 0;

    return (
        <>
            {isModalOpen == false && 
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-text-primary">Recurring Fees</h3>
                        {/* NEW: View All Button */}
                        <button onClick={() => setIsModalOpen(true)} className="text-sm font-semibold text-text-accent hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="relative">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {allFeeProps.map(props => (
                                    <div key={props.name} className="w-full flex-shrink-0 px-1">
                                        <RecurringFeeItem {...props} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={handlePrev} disabled={currentIndex === 0} className="absolute top-1/2 left-[-20px] -translate-y-1/2 bg-card border border-border w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-20 disabled:cursor-not-allowed">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={handleNext} disabled={currentIndex === allFeeProps.length - 1} className="absolute top-1/2 right-[-20px] -translate-y-1/2 bg-card border border-border w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-20 disabled:cursor-not-allowed">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    
                    <div className="w-full h-2 bg-card-secondary rounded-full mt-6">
                        <div
                            className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            }

            {isModalOpen && <RecurringFeesModal fees={allFeeProps} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default RecurringFeesCard;