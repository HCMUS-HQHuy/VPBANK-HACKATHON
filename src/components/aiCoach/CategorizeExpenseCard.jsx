// src/components/aiCoach/CategorizeExpenseCard.jsx

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPencil, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

const CategorizeExpenseCard = ({ onCategorizeSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    
    const handleUploadAreaClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setSelectedFile(null);
        setPreviewUrl(null);
        fileInputRef.current.value = null;
    };

    const handleAutoCategorize = async () => {
        if (!selectedFile) {
            setError('Please upload an image of your receipt.');
            return;
        }

        setIsLoading(true);
        setResult(null);
        setError('');

        const formData = new FormData();
        // CẬP NHẬT: Gửi một mô tả mặc định vì backend yêu cầu trường này,
        // nhưng người dùng không cần nhập nữa.
        formData.append('description', `Categorize from image: ${selectedFile.name}`);
        formData.append('image', selectedFile);

        try {
            // Gọi đến endpoint AI chuyên dụng để phân loại
            const response = await apiClient.post('/chat/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setResult(response.data.response);
                if (onCategorizeSuccess) onCategorizeSuccess();
            } else {
                setError(response.data.response || 'Failed to categorize.');
            }
        } catch (err) {
            const errorDetail = err.response?.data?.detail || "An error occurred.";
            setError(errorDetail);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 rounded-xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-4">Categorize by Receipt</h3>
            <div className="space-y-4">
                {/* Bỏ đi ô input description */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif"
                />
                <div 
                    className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer h-40" // Tăng chiều cao
                    onClick={handleUploadAreaClick}
                >
                    {previewUrl ? (
                        <div className="relative w-full h-full">
                            <img src={previewUrl} alt="Receipt Preview" className="w-full h-full object-contain rounded-md" />
                            <button 
                                onClick={handleRemoveImage} 
                                className="absolute -top-2 -right-2 bg-card rounded-full p-1 text-danger hover:text-danger-dark"
                                title="Remove image"
                            >
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                        </div>
                    ) : (
                        <div className="text-text-secondary">
                            <FontAwesomeIcon icon={faUpload} className="text-3xl mb-2" />
                            <p className="text-sm font-medium">Click to upload receipt</p>
                            <p className="text-xs text-text-secondary/70 mt-1">PNG, JPG, GIF</p>
                        </div>
                    )}
                </div>
                
                <button 
                    onClick={handleAutoCategorize}
                    disabled={isLoading || !selectedFile}
                    className="w-full px-4 py-3 bg-green text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faPencil} />}
                    <span>{isLoading ? 'Analyzing...' : 'Auto-Categorize Image'}</span>
                </button>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-danger-light text-danger text-sm rounded-lg border border-danger">{error}</div>
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