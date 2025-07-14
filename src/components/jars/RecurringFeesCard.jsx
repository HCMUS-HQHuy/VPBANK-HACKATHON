import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard, faBell } from '@fortawesome/free-solid-svg-icons';
import JarsIcon from '@/utils/JarsIcon'; 

// --- THE DYNAMIC CHILD COMPONENT ---
// This component is purely presentational. It just receives props and renders them.
const RecurringFeeItem = ({ name, jar, amount, frequency, alert, icon, color, bgLight }) => {
    return (
        <div className="bg-card border border-border rounded-xl shadow-md text-text-primary overflow-hidden">
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${bgLight} rounded-full flex items-center justify-center`}>
                        <FontAwesomeIcon icon={icon} className={`text-2xl ${color}`} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text-primary">{name}</h3>
                        <p className="text-sm text-text-secondary">{jar}</p>
                    </div>
                </div>
            </div>
            <div className="bg-card-secondary border-t border-border px-4 py-2.5 flex items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center gap-2"><FontAwesomeIcon icon={faMoneyBillWave} /><span>${amount.toFixed(2)}</span></div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCreditCard} /><span>{frequency}</span></div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2"><FontAwesomeIcon icon={faBell} /><span>{alert}</span></div>
            </div>
        </div>
    );
};


// --- THE PARENT CONTAINER COMPONENT ---
const RecurringFeesCard = () => {
    // This is the raw data from your API.
    const recurringFeesFromAPI = [
        { name: "Rent", amount: 1200.00, description: "Monthly apartment rent payment", target_jar: "Necessities", pattern_type: "monthly", pattern_details: [1], created_date: new Date("2024-01-01"), next_occurrence: new Date("2025-07-01"), last_occurrence: new Date("2025-06-01"), end_date: null, is_active: true },
        { name: "Spotify", amount: 9.99, description: "Spotify Premium subscription", target_jar: "Fun", pattern_type: "monthly", pattern_details: [28], created_date: new Date("2023-06-01"), next_occurrence: new Date("2025-08-01"), last_occurrence: new Date("2025-07-01"), end_date: null, is_active: true },
        { name: "Gym", amount: 35.00, description: "Monthly gym membership fee", target_jar: "Fun", pattern_type: "monthly", pattern_details: [25], created_date: new Date("2023-05-15"), next_occurrence: new Date("2025-07-25"), last_occurrence: new Date("2025-06-25"), end_date: null, is_active: false }
    ];

    // Helper function to map API data to the props our UI component needs.
    const mapFeeToCardProps = (fee) => {
        const icon = JarsIcon[fee.target_jar].icon;
        const color = JarsIcon[fee.target_jar].color;
        const bgLight = JarsIcon[fee.target_jar].bgLight;

        let alertText = `on day ${fee.pattern_details[0]}`;
        return {
            name: fee.name,
            amount: fee.amount,
            frequency: fee.pattern_type,
            jar: fee.target_jar,
            alert: alertText,
            icon: icon,
            bgLight: bgLight,
            color: color
        };
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-text-primary">Recurring Fees</h3>
                <button className="px-4 py-2 bg-brand-primary text-text-accent text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                    + Add New Fee
                </button>
            </div>
            <div className="space-y-4">
                {/* We map over the API data, transform it, and then render the component */}
                {recurringFeesFromAPI.map(fee => {
                    const cardProps = mapFeeToCardProps(fee);
                    return <RecurringFeeItem key={cardProps.name} {...cardProps} />;
                })}
            </div>
        </div>
    );
};

export default RecurringFeesCard;