// src/components/aiCoach/CategorizeExpenseCard.jsx

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPencil, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

const CategorizeExpenseCard = ({ onCategorizeSuccess }) => { // Nhận thêm prop để thông báo thành công
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleAutoCategorize = async () => {
        if (!description.trim()) {
            setError('Please enter an expense description.');
            return;
        }

        setIsLoading(true);
        setResult(null);
        setError('');

        try {
            const prompt = `Categorize this transaction: "${description}"`;
            const response = await apiClient.post('/chat/', { message: prompt });

            if (response.data.success) {
                setResult(response.data.response);
                // Nếu có hàm callback, gọi nó để component cha có thể hành động (ví dụ: refetch)
                if (onCategorizeSuccess) {
                    onCategorizeSuccess();
                }
            } else {
                setError(response.data.response || 'Failed to categorize. Please try again.');
            }
        } catch (err) {
            console.error("Auto-categorization failed:", err);
            const errorDetail = err.response?.data?.detail || "An error occurred while communicating with the AI coach.";
            setError(errorDetail);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 rounded-xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-4">Categorize Expense</h3>
            <div className="space-y-4">
                {/* <input
                    type="text"
                    placeholder="e.g., lunch with friends 25k"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleAutoCategorize()}
                    className="w-full p-3 text-text-primary bg-card-secondary border border-border rounded-lg focus:ring-2 focus:ring-ring"
                /> */}
                <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center text-text-secondary/50 cursor-not-allowed">
                    <FontAwesomeIcon icon={faUpload} className="text-2xl mb-2" />
                    <p className="text-sm font-medium">Upload Receipt (Coming Soon)</p>
                </div>
                <button 
                    onClick={handleAutoCategorize}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-green text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait"
                >
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faPencil} />}
                    <span>{isLoading ? 'Categorizing...' : 'Auto-Categorize'}</span>
                </button>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-danger-light text-danger text-sm rounded-lg border border-danger">
                    {error}
                </div>
            )}
            {result && (
                <div className="mt-4 p-3 bg-green-light text-green text-sm rounded-lg border border-green">
                    <p className="font-semibold">AI Suggestion:</p>
                    <p className="whitespace-pre-wrap">{result}</p>
                </div>
            )}
        </div>
    );
};

export default CategorizeExpenseCard;