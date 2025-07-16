// src/pages/TransactionsPage.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faPlus, faSpinner, faEdit, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'; // Thêm icon faUndo
import apiClient from '@/services/apiClient';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';
import useClickOutside from '@/hooks/useClickOutside'; // Giả sử bạn có hook này
import JarsIcon from '@/utils/JarsIcon'; // Giả sử bạn có file này chứa thông tin về các hũ

const transactionSources = ["vpbank_api", "manual_input", "text_input", "image_input"];

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [userJars, setUserJars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  // State cho các giá trị filter
  const initialFilters = {
    search: '',
    jar: 'All Jars',
    source: 'All Sources',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
  };
  const [filters, setFilters] = useState(initialFilters);

  const advancedFilterRef = useRef(null);
  useClickOutside(advancedFilterRef, () => setIsAdvancedFilterOpen(false));

  // Hàm fetch dữ liệu chung, có thể tái sử dụng
  const fetchTransactions = useCallback(async (currentFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (currentFilters.search) params.append('description', currentFilters.search);
      if (currentFilters.jar && currentFilters.jar !== 'All Jars') params.append('jar_name', currentFilters.jar);
      if (currentFilters.source && currentFilters.source !== 'All Sources') params.append('source', currentFilters.source);
      if (currentFilters.startDate) params.append('start_date', currentFilters.startDate);
      if (currentFilters.endDate) params.append('end_date', currentFilters.endDate);
      if (currentFilters.minAmount) params.append('min_amount', currentFilters.minAmount);
      if (currentFilters.maxAmount) params.append('max_amount', currentFilters.maxAmount);
      params.append('limit', 100);

      const response = await apiClient.get(`/transactions/?${params.toString()}`);
      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setTransactions([]);
      setError("Could not retrieve transactions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch dữ liệu lần đầu và khi các bộ lọc chính thay đổi
  useEffect(() => {
    fetchTransactions(filters);
  }, [filters.search, filters.jar, filters.source, fetchTransactions]);

  // Lấy danh sách hũ của người dùng
  useEffect(() => {
    const fetchUserJars = async () => {
      try {
        const response = await apiClient.get('/jars/');
        setUserJars(response.data);
      } catch (err) {
        console.error("Failed to fetch user jars:", err);
      }
    };
    fetchUserJars();
  }, []);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Hàm này áp dụng tất cả các bộ lọc, bao gồm cả nâng cao
  const handleApplyFilters = () => {
    fetchTransactions(filters);
    setIsAdvancedFilterOpen(false);
  };
  
  // THÊM MỚI: Hàm để reset tất cả bộ lọc
  const handleResetFilters = () => {
    setFilters(initialFilters);
    fetchTransactions(initialFilters); // Fetch lại với filter rỗng
  };

  const handleDelete = async (transactionId) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await apiClient.delete(`/transactions/${transactionId}`);
        fetchTransactions(filters);
      } catch (err) {
        alert("Could not delete the transaction.");
      }
    }
  };
  
  const getJarPillClasses = (jarName) => {
    const jarKey = jarName?.toLowerCase().replace(/\s/g, '_') || 'default';
    const iconInfo = JarsIcon[jarKey] || JarsIcon.Default;
    return `${iconInfo.bgLight} ${iconInfo.color}`;
  };

  return (
    <>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTransactionAdded={() => fetchTransactions(filters)} />
      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {/* --- Bộ lọc chính ---
              <div className="relative">
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input type="text" name="search" placeholder="Search..." value={filters.search} onChange={handleFilterChange} onBlur={() => fetchTransactions(filters)} className="pl-10 pr-4 py-2 w-40 md:w-48 text-text-primary bg-card-secondary border border-border rounded-lg" />
              </div> */}
              <select name="jar" value={filters.jar} onChange={(e) => { handleFilterChange(e); fetchTransactions({...filters, jar: e.target.value }); }} className="px-4 py-2 text-text-primary bg-card-secondary border border-border rounded-lg">
                <option value="All Jars">All Jars</option>
                {userJars.map(jar => <option key={jar._id} value={jar.name}>{jar.name}</option>)}
              </select>
              <select name="source" value={filters.source} onChange={(e) => { handleFilterChange(e); fetchTransactions({...filters, source: e.target.value }); }} className="px-4 py-2 text-text-primary bg-card-secondary border border-border rounded-lg">
                <option value="All Sources">All Sources</option>
                {transactionSources.map(source => <option key={source} value={source}>{source}</option>)}
              </select>

              {/* --- Nút Advanced và Reset --- */}
              <div className="relative" ref={advancedFilterRef}>
                <button onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)} className="px-4 py-2 bg-card-secondary text-text-primary font-semibold rounded-lg hover:bg-border flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} />
                  <span>Advanced</span>
                </button>
                {isAdvancedFilterOpen && (
                  <div className="absolute top-full left-0 mt-2 p-4 bg-card border border-border rounded-xl shadow-lg z-10 w-96 space-y-4">
                    <h4 className="font-semibold text-text-primary text-lg">Advanced Filters</h4>
                    <div>
                      <label className="text-sm font-medium text-text-secondary mb-1 block">Amount Range</label>
                      <div className="flex items-center gap-2">
                        <input type="number" name="minAmount" placeholder="Min" value={filters.minAmount} onChange={handleFilterChange} className="p-2 w-full text-text-primary bg-card-secondary border border-border rounded-lg" />
                        <span className="text-text-secondary">to</span>
                        <input type="number" name="maxAmount" placeholder="Max" value={filters.maxAmount} onChange={handleFilterChange} className="p-2 w-full text-text-primary bg-card-secondary border border-border rounded-lg" />
                      </div>
                    </div>
                    <div>
                       <label className="text-sm font-medium text-text-secondary mb-1 block">Date Range</label>
                       <div className="flex items-center gap-2">
                          <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="w-full p-2 text-text-primary bg-card-secondary border border-border rounded-lg" />
                          <span className="text-text-secondary">to</span>
                          <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="w-full p-2 text-text-primary bg-card-secondary border border-border rounded-lg" />
                       </div>
                    </div>
                    <button onClick={handleApplyFilters} className="w-full mt-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90">
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>
               {/* THÊM MỚI: Nút Reset */}
              <button onClick={handleResetFilters} title="Reset all filters" className="p-2 text-text-secondary hover:text-primary">
                  <FontAwesomeIcon icon={faUndo} size="lg" />
              </button>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 flex items-center gap-2">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Transaction</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
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
                    <tr key={trx._id} className="border-b border-border">
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