import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard, faBell, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AddFeeModal from '@/components/jars/AddFeeModal';
import JarsIcon from '@/utils/JarsIcon';
import apiClient from '@/services/apiClient';

const RecurringFeeItem = ({ fee, icon, color, bgLight, onDelete }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    let alertText = fee.pattern_type === 'daily' ? 'Daily' : `on day ${fee.pattern_details.join(', ')}`;
    if (fee.pattern_type === 'weekly') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        alertText = fee.pattern_details.map(d => days[d - 1]).join(', ');
    }
    
    return (
        <div className="bg-card border border-border rounded-xl shadow-md text-text-primary overflow-hidden">
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${bgLight} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <FontAwesomeIcon icon={icon} className={`text-2xl ${color}`} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text-primary">{fee.name}</h3>
                        <p className="text-sm text-text-secondary capitalize">{fee.target_jar.replace(/_/g, ' ')}</p>
                    </div>
                </div>
                <button 
                    onClick={() => onDelete(fee.name)} 
                    className="text-text-secondary hover:text-danger transition-colors p-2"
                    aria-label={`Delete ${fee.name}`}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            <div className="bg-card-secondary border-t border-border px-4 py-2.5 flex items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center gap-2" title="Amount"><FontAwesomeIcon icon={faMoneyBillWave} /><span>${fee.amount.toFixed(2)}</span></div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2 capitalize" title="Frequency"><FontAwesomeIcon icon={faCreditCard} /><span>{fee.pattern_type}</span></div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2" title="Next Due"><FontAwesomeIcon icon={faBell} /><span>Next: {formatDate(fee.next_occurrence)}</span></div>
            </div>
        </div>
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

const RecurringFeesCard = ({ recurringFeesFromAPI = [], onAddFeeClick, onSuccess }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleDelete = async (feeName) => {
        if (!window.confirm(`Are you sure you want to delete the recurring fee: "${feeName}"?`)) {
            return;
        }

        try {
            await apiClient.delete(`/fees/${feeName}`);
            alert('Fee deleted successfully!');
            if (typeof onSuccess === 'function') {
                onSuccess(); 
            }
        } catch (err) {
            console.error("Failed to delete fee:", err);
            alert(err.response?.data?.detail || "Could not delete the fee.");
        }
    };

    const mapFeeToCardProps = (fee) => {
        const styleProps = JarsIcon[fee.target_jar] || { icon: faMoneyBillWave, color: 'text-text-secondary', bgLight: 'bg-card-secondary' };
        let alertText = `on day ${fee.pattern_details[0]}`;
        return { name: fee.name, amount: fee.amount, frequency: fee.pattern_type, jar: fee.target_jar, alert: alertText, ...styleProps, onDelete: handleDelete };
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

            {/* {isModalOpen && <RecurringFeesModal fees={allFeeProps} onClose={() => setIsModalOpen(false)} />} */}
        </>
    );
};

export default RecurringFeesCard;