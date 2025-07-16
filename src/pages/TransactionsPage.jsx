// src/pages/TransactionsPage.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner, faEdit, faTrash, faUndo, faFilter } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';
import JarsIcon from '@/utils/JarsIcon';
import useClickOutside from '@/hooks/useClickOutside'; // Giả sử bạn có hook này

const transactionSources = ["vpbank_api", "manual_input", "text_input", "image_input"];

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [userJars, setUserJars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  const initialFilters = { jar: '', source: '', start: '', end: '', min: '', max: '' };
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilter, setActiveFilter] = useState('all'); // State để theo dõi filter nào đang active

  const advancedFilterRef = useRef(null);
  useClickOutside(advancedFilterRef, () => setIsAdvancedFilterOpen(false));

  // Hàm fetch dữ liệu chung
  const fetchData = useCallback(async (endpoint = '/transactions/') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(endpoint);
      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setTransactions([]);
      setError("Could not retrieve transactions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch dữ liệu và jars lần đầu
  useEffect(() => {
    fetchData('/transactions/');
    const fetchUserJars = async () => {
      try {
        const response = await apiClient.get('/jars/');
        setUserJars(response.data);
      } catch (err) { console.error("Failed to fetch user jars:", err); }
    };
    fetchUserJars();
  }, [fetchData]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyJarFilter = (value) => {
    setFilters({ ...initialFilters, jar: value });
    setActiveFilter(value ? 'jar' : 'all');
    fetchData(value ? `/transactions/?jar=${value}` : '/transactions/');
  };

  const applySourceFilter = (value) => {
    setFilters({ ...initialFilters, source: value });
    setActiveFilter(value ? 'source' : 'all');
    fetchData(value ? `/transactions/by-source/${value}` : '/transactions/');
  };
  
  const applyAmountFilter = () => {
    if (filters.min || filters.max) {
      const params = new URLSearchParams();
      if (filters.min) params.append('min_amount', filters.min);
      if (filters.max) params.append('max_amount', filters.max);
      setFilters(prev => ({ ...initialFilters, min: prev.min, max: prev.max }));
      setActiveFilter('amount');
      fetchData(`/transactions/by-amount-range?${params.toString()}`);
      setIsAdvancedFilterOpen(false);
    }
  };

  const applyDateFilter = () => {
    if (filters.start) {
      let endpoint = `/transactions/by-date-range?start_date=${filters.start}T00:00:00`;
      if (filters.end) endpoint += `&end_date=${filters.end}T23:59:59`;
      setFilters(prev => ({ ...initialFilters, start: prev.start, end: prev.end }));
      setActiveFilter('date');
      fetchData(endpoint);
      setIsAdvancedFilterOpen(false);
    }
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setActiveFilter('all');
    fetchData('/transactions/');
  };

  const handleDelete = async (transactionId) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await apiClient.delete(`/transactions/${transactionId}`);
        fetchData(activeFilter === 'all' ? '/transactions/' : window.location.search); // Tải lại theo filter hiện tại
      } catch (err) {
        alert("Could not delete the transaction.");
      }
    }
  };
  
  const getJarPillClasses = (jarName) => {
    const jarKey = jarName?.toLowerCase().replace(/\s/g, '_') || 'default';
    const iconInfo = JarsIcon[jarKey] || JarsIcon.Default;
    return `${iconInfo?.bgLight} ${iconInfo?.color}`;
  };

  return (
    <>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTransactionAdded={handleResetFilters} />
      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* --- Bộ lọc chính --- */}
              <select value={filters.jar} onChange={(e) => applyJarFilter(e.target.value)} className={`px-4 py-2 text-text-primary bg-card-secondary border rounded-lg focus:ring-2 focus:ring-ring ${activeFilter === 'jar' ? 'border-primary' : 'border-border'}`}>
                <option value="">All Jars</option>
                {userJars.map(jar => <option key={jar.id} value={jar.name}>{jar.name}</option>)}
              </select>
              <select value={filters.source} onChange={(e) => applySourceFilter(e.target.value)} className={`px-4 py-2 text-text-primary bg-card-secondary border rounded-lg focus:ring-2 focus:ring-ring ${activeFilter === 'source' ? 'border-primary' : 'border-border'}`}>
                <option value="">All Sources</option>
                {transactionSources.map(source => <option key={source} value={source}>{source}</option>)}
              </select>

              {/* --- Nút Advanced Filters --- */}
              <div className="relative" ref={advancedFilterRef}>
                <button onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)} className="px-4 py-2 bg-card-secondary text-text-primary font-semibold rounded-lg hover:bg-border flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} />
                  <span>Advanced Filters</span>
                </button>
                {isAdvancedFilterOpen && (
                  <div className="absolute top-full left-0 mt-2 p-4 bg-card border border-border rounded-xl shadow-lg z-10 w-96 space-y-4">
                    {/* --- Filter by Amount Range --- */}
                    <div className="p-3 border border-border rounded-lg">
                      <label className="text-sm font-medium text-text-primary block mb-2">Amount Range</label>
                      <div className="flex items-center gap-2">
                        <input type="number" name="min" placeholder="Min" value={filters.min} onChange={handleFilterChange} className="p-2 w-full text-text-primary bg-card-secondary border border-border rounded-lg" />
                        <span className="text-text-secondary">to</span>
                        <input type="number" name="max" placeholder="Max" value={filters.max} onChange={handleFilterChange} className="p-2 w-full text-text-primary bg-card-secondary border border-border rounded-lg" />
                      </div>
                      <button onClick={applyAmountFilter} className="w-full mt-3 px-4 py-2 bg-primary/80 text-white font-semibold rounded-lg hover:bg-primary text-sm">Apply Amount Filter</button>
                    </div>

                    {/* --- Filter by Date Range --- */}
                     <div className="p-3 border border-border rounded-lg">
                       <label className="text-sm font-medium text-text-primary mb-2 block">Date Range</label>
                       <div className="flex items-center gap-2">
                          <input type="date" name="start" value={filters.start} onChange={handleFilterChange} className="w-full p-2 text-text-primary bg-card-secondary border border-border rounded-lg" />
                          <span className="text-text-secondary">to</span>
                          <input type="date" name="end" value={filters.end} onChange={handleFilterChange} className="w-full p-2 text-text-primary bg-card-secondary border border-border rounded-lg" />
                       </div>
                       <button onClick={applyDateFilter} className="w-full mt-3 px-4 py-2 bg-primary/80 text-white font-semibold rounded-lg hover:bg-primary text-sm">Apply Date Filter</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
             {/* --- Nút Reset và Add --- */}
            <div className="flex items-center gap-4">
                <button onClick={handleResetFilters} title="Reset all filters" className="px-4 py-2 text-text-secondary hover:text-primary flex items-center gap-2">
                    <FontAwesomeIcon icon={faUndo} />
                    <span>Reset</span>
                </button>
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 flex items-center gap-2">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add Transaction</span>
                </button>
            </div>
          </div>
          
                     {/* Bảng dữ liệu */}
                     <div className="overflow-x-auto mt-6">
                         <table className="w-full text-left">
                             <thead className="border-b-2 border-border text-text-secondary">
                                 <tr>
                                     <th className="p-3 text-sm font-semibold">Date</th>
                                     <th className="p-3 text-sm font-semibold">Description</th>
                                     <th className="p-3 text-sm font-semibold">Jar</th>
                                     <th className="p-3 text-sm font-semibold">Amount</th>
                                     <th className="p-3 text-sm font-semibold text-right">Actions</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {isLoading ? (
                                     <tr><td colSpan="5" className="text-center p-8"><FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-primary" /></td></tr>
                                 ) : error ? (
                                     <tr><td colSpan="5" className="text-center p-8 text-danger">{error}</td></tr>
                                 ) : transactions.length === 0 ? (
                                     <tr><td colSpan="5" className="text-center p-8 text-text-secondary">No transactions found for the selected filters.</td></tr>
                                 ) : (
                                     transactions.map((trx) => (
                                         <tr key={trx._id} className="border-b border-border hover:bg-card-secondary">
                                             <td className="p-3 text-sm text-text-secondary">{new Date(trx.transaction_datetime).toLocaleDateString()}</td>
                                             <td className="p-3 font-medium text-text-primary">{trx.description}</td>
                                             <td className="p-3">
                                                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getJarPillClasses(trx.jar)}`}>
                                                     {trx.jar}
                                                 </span>
                                             </td>
                                             <td className="p-3 font-medium text-text-primary">- ${trx.amount.toFixed(2)}</td>
                                             <td className="p-3 text-sm text-right space-x-4">
                                                 {/* <button disabled className="font-semibold text-text-secondary/50 cursor-not-allowed"><FontAwesomeIcon icon={faEdit} /> Edit</button> */}
                                                 <button onClick={() => handleDelete(trx._id)} className="font-semibold text-danger hover:underline"><FontAwesomeIcon icon={faTrash} /> Delete</button>
                                             </td>
                                         </tr>
                                     ))
                                 )}
                             </tbody>
                         </table>
                     </div>
                 </div>
             </div>
         </>
     );
 };
 
 export default TransactionsPage;