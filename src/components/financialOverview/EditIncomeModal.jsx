import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

const EditIncomeModal = ({ isOpen, onClose, currentIncome, onSuccess }) => {
  const [income, setIncome] = useState(currentIncome);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await apiClient.put('/user/settings', { total_income: parseFloat(income) });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update income.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card p-8 rounded-xl shadow-lg w-full max-w-md border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Edit Total Income</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="total_income" className="block text-sm font-medium text-text-secondary">Monthly Income ($)</label>
            <input
              type="number"
              id="total_income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
              className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md"
            />
          </div>
          {error && <p className="text-sm text-center text-danger">{error}</p>}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-card-secondary text-text-primary rounded-lg hover:bg-border">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-6 py-2 bg-brand text-card font-semibold rounded-lg hover:opacity-90 disabled:opacity-50">
              {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSave} />}
              {isLoading ? ' Saving...' : ' Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIncomeModal;