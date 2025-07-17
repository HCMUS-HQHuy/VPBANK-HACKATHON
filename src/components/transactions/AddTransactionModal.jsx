import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

const AddTransactionModal = ({ isOpen, onClose, onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    jar: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    source: 'manual_input',
  });
  const [jars, setJars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchJars = async () => {
        try {
          const response = await apiClient.get('/jars/');
          setJars(response.data);
          if (response.data.length > 0) {
            setFormData(prev => ({ ...prev, jar: response.data[0].name }));
          }
        } catch (err) {
          console.error("Failed to fetch jars:", err);
          setError("Could not load budget jars.");
        }
      };
      fetchJars();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const transaction_datetime = new Date(`${formData.date}T${formData.time}:00`).toISOString();
      const payload = {
        amount: parseFloat(formData.amount),
        description: formData.description,
        jar: formData.jar, 
        source: formData.source,
        transaction_datetime: transaction_datetime, 
      };

      await apiClient.post('/transactions/', payload);
      onTransactionAdded();
      onClose();
    } catch (err) {
      const errorMsg = err.response?.data?.detail?.[0]?.msg || err.response?.data?.detail || 'Failed to add transaction.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card p-8 rounded-xl shadow-lg w-full max-w-md border border-border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Add New Transaction</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Description</label>
            <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Amount ($)</label>
              <input type="number" name="amount" id="amount" step="0.01" value={formData.amount} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md" />
            </div>
            <div>
              <label htmlFor="jar" className="block text-sm font-medium text-text-secondary">Jar</label>
              <select name="jar" id="jar" value={formData.jar} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md">
                {jars.map(j => <option key={j._id} value={j.name}>{j.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-text-secondary">Date</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-text-secondary">Time</label>
                <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} required className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md" />
              </div>
          </div>

          {error && <p className="text-sm text-center text-danger">{error}</p>}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-card-secondary text-text-primary rounded-lg hover:bg-border">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-6 py-2 bg-brand text-card font-semibold rounded-lg hover:opacity-90 flex items-center gap-2 disabled:opacity-50">
              {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSave} />}
              <span>{isLoading ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;