import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

// A helper component for the conditional frequency details
const FrequencyDetails = ({ frequency, value, onChange }) => {
    switch (frequency) {
        case 'monthly':
            return (
                <div>
                    <label htmlFor="dayOfMonth" className="text-sm font-medium text-text-secondary">Day of Month (1-31)</label>
                    <input
                        id="dayOfMonth"
                        name="pattern_details"
                        type="number"
                        value={value[0] || ''}
                        onChange={(e) => onChange([parseInt(e.target.value, 10)])}
                        min="1"
                        max="31"
                        className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            );
        case 'weekly':
            return (
                <div>
                    <label htmlFor="dayOfWeek" className="text-sm font-medium text-text-secondary">Day of Week</label>
                    <select
                        id="dayOfWeek"
                        name="pattern_details"
                        value={value[0] || 'monday'}
                        onChange={(e) => onChange([e.target.value])}
                        className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                    </select>
                </div>
            );
        default:
            return null; // No details needed for daily or yearly
    }
};

const RecurringFeeForm = ({ initialData, onSubmit, onCancel, title = "Recurring Fee" }) => {
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
        <div className="bg-card p-6 rounded-xl border border-border shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-text-primary mb-6">{title}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Amount */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3">
                        <label htmlFor="name" className="text-sm font-medium text-text-secondary">Name</label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="e.g., Netflix" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="amount" className="text-sm font-medium text-text-secondary">Amount ($)</label>
                        <input id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required placeholder="0.00" step="0.01" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                </div>

                {/* Frequency and Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pattern_type" className="text-sm font-medium text-text-secondary">Frequency</label>
                        <select id="pattern_type" name="pattern_type" value={formData.pattern_type} onChange={handleChange} className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                            <option value="daily">Daily</option>
                            <option value="yearly">Yearly</option>
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

                {/* Active Toggle */}
                <div className="flex items-center justify-between bg-card-secondary p-3 rounded-lg">
                    <label htmlFor="is_active" className="font-medium text-text-primary">Set as Active</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input id="is_active" name="is_active" type="checkbox" checked={formData.is_active} onChange={handleChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:bg-brand-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-card-secondary text-text-primary font-semibold rounded-lg hover:bg-border">Cancel</button>
                    <button type="submit" className="px-5 py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:opacity-90">Save Fee</button>
                </div>
            </form>
        </div>
    );
};

export default RecurringFeeForm;