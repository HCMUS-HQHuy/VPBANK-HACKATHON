import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard, faBell, faTrash } from '@fortawesome/free-solid-svg-icons';
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

const RecurringFeesCard = ({ fees = [], onAddFeeClick, onSuccess }) => {
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
        const jarKey = fee.target_jar.toLowerCase().replace(/\s/g, '_');
        const iconInfo = JarsIcon[jarKey] || JarsIcon.Default;
        return {
            fee: fee,
            icon: iconInfo.icon,
            color: iconInfo.color,
            bgLight: iconInfo.bgLight,
            onDelete: handleDelete, 
        };
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-text-primary">Recurring Fees</h3>
                <button onClick={onAddFeeClick} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                    + Add New Fee
                </button>
            </div>
            <div className="space-y-4">
                {fees.length > 0 ? (
                    fees.map(fee => {
                        const jarKey = fee.target_jar.toLowerCase().replace(/\s/g, '_');
                        const iconInfo = JarsIcon[jarKey] || JarsIcon.Default;
                        
                        return (
                            <RecurringFeeItem 
                                key={fee._id} 
                                fee={fee}
                                icon={iconInfo.icon}
                                color={iconInfo.color}
                                bgLight={iconInfo.bgLight}
                                onDelete={handleDelete} 
                            />
                        );
                    })
                ) : (
                    <p className="text-center text-text-secondary py-4">No active recurring fees.</p>
                )}
            </div>
        </div>
    );
};

export default RecurringFeesCard;