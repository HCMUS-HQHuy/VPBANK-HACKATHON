import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faPencilAlt, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

const ManageJarsModal = ({ isOpen, onClose, jars, onSuccess }) => {
  const [jarList, setJarList] = useState(jars);
  const [newJar, setNewJar] = useState({ name: '', description: '', percent: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddJar = async () => {
    if (!newJar.name || !newJar.description || !newJar.percent) {
      setError('Please fill all fields for the new jar.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const payload = { ...newJar, percent: parseFloat(newJar.percent) / 100 };
      await apiClient.post('/jars/', payload);
      setNewJar({ name: '', description: '', percent: '' });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add jar.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteJar = async (jarName) => {
    if (!window.confirm(`Are you sure you want to delete the "${jarName}" jar? This cannot be undone.`)) return;
    setIsLoading(true);
    try {
        await apiClient.delete(`/jars/${jarName}`);
        onSuccess();
    } catch (err) {
        setError(err.response?.data?.detail || 'Failed to delete jar.');
    } finally {
        setIsLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card p-6 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col border border-border">
        <div className="flex justify-between items-center mb-4 border-b border-border pb-4">
          <h2 className="text-2xl font-bold text-text-primary">Manage Jars Allocation</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary"><FontAwesomeIcon icon={faTimes} size="lg" /></button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-3 pr-2">
          {jars.map(jar => (
            <div key={jar._id} className="flex items-center justify-between p-3 bg-card-secondary rounded-lg">
              <div>
                <p className="font-semibold text-text-primary">{jar.name}</p>
                <p className="text-sm text-text-secondary">{jar.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg text-primary">{`${(jar.percent * 100).toFixed(1)}%`}</span>
                <button className="text-text-secondary hover:text-danger" onClick={() => handleDeleteJar(jar.name)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="font-semibold text-text-primary mb-2">Add New Jar</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <input type="text" placeholder="Jar Name" value={newJar.name} onChange={e => setNewJar({...newJar, name: e.target.value})} className="md:col-span-2 p-2 bg-card-secondary border border-border rounded-md" />
            <input type="text" placeholder="Description" value={newJar.description} onChange={e => setNewJar({...newJar, description: e.target.value})} className="md:col-span-3 p-2 bg-card-secondary border border-border rounded-md" />
            <input type="number" placeholder="% Alloc" value={newJar.percent} onChange={e => setNewJar({...newJar, percent: e.target.value})} className="p-2 bg-card-secondary border border-border rounded-md" />
          </div>
           {error && <p className="text-sm text-center text-danger mt-2">{error}</p>}
          <button onClick={handleAddJar} disabled={isLoading} className="mt-4 w-full py-2 bg-brand text-card font-semibold rounded-lg hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin"/> : <FontAwesomeIcon icon={faPlus} />}
            <span>Add Jar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageJarsModal;