// src/components/aiCoach/ChatInterface.jsx

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPaperPlane, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

const ChatMessage = ({ message, isUser, isError }) => {
    // Cập nhật để có thể hiển thị tin nhắn lỗi
    const userBubbleClasses = 'bg-primary text-primary-light rounded-br-none';
    const aiBubbleClasses = 'bg-card-secondary text-text-primary rounded-bl-none';
    const errorBubbleClasses = 'bg-danger-light text-danger border border-danger rounded-bl-none';

    return (
        <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-light text-primary text-xl flex-shrink-0">
                    <FontAwesomeIcon icon={isError ? faRobot : faRobot} />
                </div>
            )}
            <div className={`max-w-md p-4 rounded-xl whitespace-pre-wrap ${isUser ? userBubbleClasses : (isError ? errorBubbleClasses : aiBubbleClasses)}`}>
                <p>{message}</p>
            </div>
            {isUser && (
                 <div className="w-10 h-10 rounded-full flex items-center justify-center bg-card-secondary text-text-primary font-bold flex-shrink-0">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </div>
    );
};

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading cho phản hồi của AI
    const [isHistoryLoading, setIsHistoryLoading] = useState(true); // <-- State mới cho việc tải lịch sử

    const chatEndRef = useRef(null);

    // Tự động cuộn xuống tin nhắn mới nhất
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // THÊM MỚI: useEffect để fetch lịch sử trò chuyện khi component mount
    useEffect(() => {
        const fetchHistory = async () => {
            setIsHistoryLoading(true);
            try {
                const response = await apiClient.get('/chat/history?limit=50'); // Lấy 50 tin nhắn gần nhất
                const history = response.data;

                if (history && history.length > 0) {
                    // Chuyển đổi dữ liệu lịch sử thành định dạng của `messages`
                    const formattedMessages = [];
                    history.forEach(turn => {
                        if (turn.user_input) {
                            formattedMessages.push({ text: turn.user_input, isUser: true });
                        }
                        if (turn.agent_output) {
                            formattedMessages.push({ text: turn.agent_output, isUser: false });
                        }
                    });
                    setMessages(formattedMessages);
                } else {
                    // Nếu không có lịch sử, hiển thị tin nhắn chào mừng
                    setMessages([{ text: "Hello! How can I help you manage your finances today?", isUser: false }]);
                }
            } catch (err) {
                console.error("Failed to fetch chat history:", err);
                // Nếu có lỗi, hiển thị tin nhắn lỗi và chào mừng
                setMessages([{ text: "Could not load previous chat. How can I help you now?", isUser: false, isError: true }]);
            } finally {
                setIsHistoryLoading(false);
            }
        };

        fetchHistory();
    }, []); // Mảng dependency rỗng đảm bảo hook này chỉ chạy một lần


    const handleSendMessage = async () => {
        const userMessage = inputValue.trim();
        if (!userMessage) return;

        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await apiClient.post('/chat/', { message: userMessage });
            const aiResponse = response.data?.response || "Sorry, I couldn't process that.";
            setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
        } catch (error) {
            console.error("Chat API error:", error);
            const errorMsg = error.response?.data?.detail || "An error occurred. Please check your connection.";
            setMessages(prev => [...prev, { text: errorMsg, isUser: false, isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 rounded-xl border border-border shadow-sm flex flex-col h-[75vh]">
            <div className="flex-grow space-y-6 overflow-y-auto pr-4">
                {/* CẬP NHẬT: Hiển thị spinner khi tải lịch sử */}
                {isHistoryLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-primary text-3xl" />
                    </div>
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} isError={msg.isError} />
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-light text-primary text-xl flex-shrink-0">
                                   <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                </div>
                                <div className="max-w-md p-4 rounded-xl bg-card-secondary text-text-primary rounded-bl-none">
                                    <p className="italic">AI is thinking...</p>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </>
                )}
            </div>

            {/* Vùng nhập liệu */}
            <div className="mt-6 pt-4 border-t border-border">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask a question or log an expense..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                        disabled={isLoading || isHistoryLoading} // Vô hiệu hóa khi đang tải
                        className="w-full p-4 pr-32 text-text-primary border border-border rounded-lg focus:ring-2 focus:ring-ring disabled:bg-card-secondary/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button 
                            onClick={handleSendMessage} 
                            disabled={isLoading || isHistoryLoading || !inputValue.trim()}
                            className="ml-2 px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <span>Send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;