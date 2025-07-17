import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const detailsArray = formData.pattern_details
      .split(',')
      .map(item => parseInt(item.trim(), 10))
      .filter(item => !isNaN(item));

    if (formData.pattern_type !== 'daily' && detailsArray.length === 0) {
        setError('Pattern details are required for weekly or monthly fees (e.g., "1" or "1,15").');
        setIsLoading(false);
        return;
    }
      
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        pattern_details: formData.pattern_type === 'daily' ? [] : detailsArray,
      };

      await apiClient.post('/fees/', payload);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add recurring fee.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg border border-border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Add New Recurring Fee</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Fee Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required placeholder="e.g., Netflix Subscription" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Description</label>
            <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} required placeholder="e.g., Monthly streaming service" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Amount ($)</label>
              <input type="number" name="amount" id="amount" step="0.01" value={formData.amount} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md" />
            </div>
            <div>
              <label htmlFor="target_jar" className="block text-sm font-medium text-text-secondary">Target Jar</label>
              <select name="target_jar" id="target_jar" value={formData.target_jar} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md">
                {jars.map(j => <option key={j._id} value={j.name}>{j.name.charAt(0).toUpperCase() + j.name.slice(1).replace(/_/g, ' ')}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label htmlFor="pattern_type" className="block text-sm font-medium text-text-secondary">Frequency</label>
              <select name="pattern_type" id="pattern_type" value={formData.pattern_type} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <div>
              <label htmlFor="pattern_details" className="block text-sm font-medium text-text-secondary">Pattern Details</label>
              <input type="text" name="pattern_details" id="pattern_details" value={formData.pattern_details} onChange={handleChange} placeholder="e.g., 1,15 (monthly) or 1,3 (weekly)" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md" />
              <p className="text-xs text-text-secondary mt-1">Comma-separated numbers. Monthly: day of month. Weekly: 1=Mon, 7=Sun.</p>
            </div>
          </div>

          {error && <p className="text-sm text-center text-danger pt-2">{error}</p>}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-card-secondary text-text-primary rounded-lg hover:bg-border">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-6 py-2 bg-brand text-card font-semibold rounded-lg hover:opacity-90 flex items-center gap-2 disabled:opacity-50">
              {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSave} />}
              <span>{isLoading ? 'Saving...' : 'Save Fee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeeModal;