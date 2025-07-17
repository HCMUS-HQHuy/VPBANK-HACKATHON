import React, { useState, useEffect } from 'react';

// --- NEW COMPONENT: Day of the Week Button ---
// A small, reusable component for the day buttons.
const DayButton = ({ day, short, onClick, isSelected }) => {
    return (
        <button
            type="button"
            onClick={() => onClick(day)}
            className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors
                ${isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-card-secondary text-text-secondary hover:bg-border'
                }`}
        >
            {short}
        </button>
    );
};

const FrequencyDetails = ({ frequency, value, onChange }) => {
    const [repeatInterval, setRepeatInterval] = useState(value.interval || 1);
    const [selectedDays, setSelectedDays] = useState(value.days || ['T']);

    useEffect(() => {
        if (frequency === 'weekly') {
            onChange({
                interval: repeatInterval,
                days: selectedDays
            });
        }
    }, [repeatInterval, selectedDays, frequency]);

    const handleDayClick = (day) => {
        setSelectedDays(prevDays => {
            if (prevDays.includes(day)) {
                return prevDays.length > 1 ? prevDays.filter(d => d !== day) : prevDays;
            } else {
                return [...prevDays, day];
            }
        });
    };

    const daysOfWeek = [
        { full: 'monday', short: 'M' },
        { full: 'tuesday', short: 'T' },
        { full: 'wednesday', short: 'W' },
        { full: 'thursday', short: 'T' },
        { full: 'friday', short: 'F' },
        { full: 'saturday', short: 'S' },
        { full: 'sunday', short: 'S' }
    ];

    switch (frequency) {
        case 'monthly':
            return (
                <div>
                    <label htmlFor="dayOfMonth" className="text-sm font-medium text-text-secondary">Day of Month (1-31)</label>
                    <input id="dayOfMonth" name="pattern_details" type="number" value={value[0] || ''} onChange={(e) => onChange([parseInt(e.target.value, 10)])} min="1" max="31" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md no-spinner" />
                </div>
            );

        case 'weekly':
            return (
                <div className="col-span-full space-y-4 flex justify-between">
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Repeat every</label>
                        <div className="flex items-center gap-2 mt-1">
                            <input
                                type="number"
                                value={repeatInterval}
                                onChange={(e) => setRepeatInterval(parseInt(e.target.value, 10) || 1)}
                                min="1"
                                className="w-10 p-2 text-center bg-card-secondary border border-border rounded-md no-spinner"
                            />
                            <p className="text-text-primary">week(s)</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Repeat on</label>
                        <div className="flex items-center justify-between gap-1 mt-2">
                            {daysOfWeek.map((day, index) => (
                                <DayButton
                                    key={index}
                                    day={day.full}
                                    short={day.short}
                                    onClick={handleDayClick}
                                    isSelected={selectedDays.includes(day.full)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            );

        default:
            return null; // No details needed for daily or yearly
    }
};

const RecurringFeeForm = ({ initialData, onSubmit, onCancel, onDelete, title = "Recurring Fee" }) => {
    // Default empty state for adding a new fee
    const defaultState = {
        name: '',
        amount: '',
        target_jar: 'Fun',
        pattern_type: 'monthly',
        pattern_details: [1],
        start_date: new Date().toISOString().split('T')[0], // Today's date
        end_date: '',
        is_active: true,
    };

    const [formData, setFormData] = useState(initialData || defaultState);

    // Update form if initialData prop changes (for editing)
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDetailsChange = (details) => {
        setFormData(prev => ({ ...prev, pattern_details: details }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-lg w-full max-w-lg flex flex-col">
			<div className="flex justify-between items-center mb-6">
            	<h3 className="text-2xl font-bold text-text-primary">{title}</h3>
                {onCancel && <button onClick={onCancel} className="text-text-secondary hover:text-text-primary text-2xl">×</button>}
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Amount */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3">
                        <label htmlFor="name" className="text-sm font-medium text-text-secondary">Name</label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="e.g., Netflix" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="amount" className="text-sm font-medium text-text-secondary">Amount ($)</label>
                        <input id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required placeholder="0.00" step="0.01" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring  no-spinner" />
                    </div>
                </div>

                {/* Frequency and Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pattern_type" className="text-sm font-medium text-text-secondary">Frequency</label>
                        <select id="pattern_type" name="pattern_type" value={formData.pattern_type} onChange={handleChange} className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    {/* Conditional input for frequency details */}
                    <FrequencyDetails frequency={formData.pattern_type} value={formData.pattern_details} onChange={handleDetailsChange} />
                </div>
                
                {/* Jar Selection */}
                <div>
                    <label htmlFor="target_jar" className="text-sm font-medium text-text-secondary">Link to Jar</label>
                    <select id="target_jar" name="target_jar" value={formData.target_jar} onChange={handleChange} className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Fun</option><option>Necessities</option><option>Education</option><option>Invest</option><option>Give</option><option>Savings</option>
                    </select>
                </div>

                {/* Start and End Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="start_date" className="text-sm font-medium text-text-secondary">Start Date</label>
                        <input id="start_date" name="start_date" type="date" value={formData.start_date} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                        <label htmlFor="end_date" className="text-sm font-medium text-text-secondary">End Date (Optional)</label>
                        <input id="end_date" name="end_date" type="date" value={formData.end_date} onChange={handleChange} className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                </div>
				
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    {onDelete && <button type="button" onClick={onDelete} className="px-5 py-2.5 bg-danger-light text-brand-text font-semibold rounded-lg hover:bg-danger">Delete</button>}
                    <button type="submit" className="px-5 py-2.5 bg-brand text-card font-semibold rounded-lg hover:opacity-90">Save Fee</button>
                </div>
            </form>
        </div>
    );
};

export default RecurringFeeForm;