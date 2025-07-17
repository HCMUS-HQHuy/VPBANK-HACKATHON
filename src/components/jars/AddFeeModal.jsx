import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

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
    // const [repeatInterval, setRepeatInterval] = useState(value.interval || 1);
    const [selectedDays, setSelectedDays] = useState(value.days || []);

    useEffect(() => {
        if (frequency === 'weekly') {
            onChange({
                // interval: repeatInterval,
                days: selectedDays
            });
        }
    }, [selectedDays, frequency]);
    // }, [repeatInterval, selectedDays, frequency]);

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
        { full: '1', short: 'MON' },
        { full: '2', short: 'TUE' },
        { full: '3', short: 'WED' },
        { full: '4', short: 'THU' },
        { full: '5', short: 'FRI' },
        { full: '6', short: 'SAT' },
        { full: '7', short: 'SUN' }
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
                    {/* <div>
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
                    </div> */}
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

const AddFeeModal = ({ isOpen, onClose, jars, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    target_jar: jars.length > 0 ? jars[0].name : '',
    pattern_type: 'monthly',
    pattern_details: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setFormData({
        name: '',
        amount: '',
        description: '',
        target_jar: jars.length > 0 ? jars[0].name : '',
        pattern_type: 'monthly',
        pattern_details: '',
      });
    }
  }, [isOpen, jars]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let patternDetails;

      if (formData.pattern_type === 'daily') {
        patternDetails = [];
      } else if (formData.pattern_type === 'weekly') {
        const { days } = formData.pattern_details || {};
        if (!Array.isArray(days) || days.length === 0) {
        // if (!interval || !Array.isArray(days) || days.length === 0) {
          setError('Please provide at least one weekday for weekly pattern.');
          setIsLoading(false);
          return;
        }
        // patternDetails = { interval, days };
        patternDetails = days;
      } else if (formData.pattern_type === 'monthly') {
        const day = formData.pattern_details?.[0];
        if (!day || isNaN(day) || day < 1 || day > 31) {
          setError('Please provide a valid day of the month (1-31) for monthly pattern.');
          setIsLoading(false);
          return;
        }
        patternDetails = [parseInt(day, 10)];
      }

      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        pattern_details: patternDetails,
      };

      await apiClient.post('/fees/', payload);
      onSuccess();
      if (onClose != null) 
        onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add recurring fee.');
    } finally {
      setIsLoading(false);
    }
};

  if (!isOpen) return null;

  return (
  <div className="bg-card p-6 rounded-xl border border-border shadow-lg flex flex-col">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-text-primary">Add New Recurring Fee</h3>
      {onClose && <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-2xl">
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>}
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Fee Name and Amount */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <label htmlFor="name" className="text-sm font-medium text-text-secondary">Fee Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Netflix"
            className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="amount" className="text-sm font-medium text-text-secondary">Amount ($)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="0.00"
            className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring no-spinner"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="text-sm font-medium text-text-secondary">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="e.g., Monthly streaming service"
          className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Frequency and Pattern Details */}
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

      {/* Error Message */}
      {error && <p className="text-sm text-center text-danger pt-2">{error}</p>}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-card-secondary text-text-primary rounded-lg hover:bg-border"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-brand text-card font-semibold rounded-lg hover:opacity-90 flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faSave} />
          )}
          <span>{isLoading ? 'Saving...' : 'Save Fee'}</span>
        </button>
      </div>
    </form>
  </div>
// </div>

  );
};

export default AddFeeModal;