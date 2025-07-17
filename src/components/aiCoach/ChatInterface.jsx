// src/components/aiCoach/ChatInterface.jsx

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faRobot, faPaperPlane, faUser, faSpinner, 
    faSackDollar, faTags, faHandHoldingHeart, faLightbulb, faChartLine, faCog 
} from '@fortawesome/free-solid-svg-icons';
import apiClient from '@/services/apiClient';

// BƯỚC 1: TẠO MAPPING TỪ TÊN AGENT SANG ICON
const agentIcons = {
    classifier: faTags,
    jar: faSackDollar,
    fee: faCog,
    plan: faLightbulb,
    fetcher: faChartLine,
    knowledge: faHandHoldingHeart,
    orchestrator: faRobot,
    default: faRobot,
};

const getAgentIcon = (agentList) => {
    // Ưu tiên hiển thị icon của agent chuyên biệt thay vì orchestrator
    const specificAgent = agentList?.find(agent => agent !== 'orchestrator');
    return agentIcons[specificAgent] || agentIcons.default;
};

// BƯỚC 2: CẬP NHẬT CHATMESSAGE COMPONENT
const ChatMessage = ({ messageData, onAccept }) => {
    const { text, isUser, agent_list, plan_stage } = messageData;
    
    const isPlanStageTwo = !isUser && plan_stage === '2';
    const agentIcon = getAgentIcon(agent_list);

    return (
        <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-light text-primary text-xl flex-shrink-0" title={agent_list?.join(', ')}>
                    <FontAwesomeIcon icon={agentIcon} />
                </div>
            )}
            <div className="flex flex-col gap-2">
                <div className={`max-w-xl p-4 rounded-xl whitespace-pre-wrap ${isUser ? 'bg-primary text-primary-light rounded-br-none' : 'bg-card-secondary text-text-primary rounded-bl-none'}`}>
                    <p>{text}</p>
                </div>
                {/* Hiển thị nút Accept nếu đúng điều kiện */}
                {isPlanStageTwo && (
                    <div className="flex justify-start">
                        <button 
                            onClick={onAccept}
                            className="px-4 py-1.5 bg-green text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Accept
                        </button>
                    </div>
                )}
            </div>
            {isUser && (
                 <div className="w-10 h-10 rounded-full flex items-center justify-center bg-card-secondary text-text-primary font-bold flex-shrink-0">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </div>
    );
};


// BƯỚC 3: CẬP NHẬT CHATINTERFACE
const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatHistoryToMessages = (history) => {
        return history.reduce((acc, turn) => {
            if (turn.user_input) {
                acc.push({ text: turn.user_input, isUser: true });
            }
            if (turn.agent_output) {
                // Truyền toàn bộ thông tin của lượt chat từ AI
                acc.push({ 
                    text: turn.agent_output, 
                    isUser: false,
                    agent_list: turn.agent_list,
                    plan_stage: turn.plan_stage,
                 });
            }
            return acc;
        }, []);
    };
    
    useEffect(() => {
        const fetchHistory = async () => {
            setIsHistoryLoading(true);
            try {
                const response = await apiClient.get('/chat/history?limit=50');
                const history = response.data;
                if (history && history.length > 0) {
                    setMessages(formatHistoryToMessages(history));
                } else {
                    setMessages([{ text: "Hello! How can I help you manage your finances today?", isUser: false, agent_list: ['orchestrator'] }]);
                }
            } catch (err) {
                setMessages([{ text: "Could not load previous chat.", isUser: false, isError: true, agent_list: ['orchestrator'] }]);
            } finally {
                setIsHistoryLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const sendMessage = async (messageText) => {
        const userMessage = messageText.trim();
        if (!userMessage || isLoading) return;

        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await apiClient.post('/chat/', { message: userMessage });
            const newTurn = response.data;
            if (newTurn && newTurn.agent_output) {
                setMessages(prev => [...prev, { 
                    text: newTurn.agent_output, 
                    isUser: false,
                    agent_list: newTurn.agent_list,
                    plan_stage: newTurn.plan_stage,
                }]);
            } else {
                 setMessages(prev => [...prev, { text: "Sorry, I received an empty response.", isUser: false }]);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.detail || "An error occurred.";
            setMessages(prev => [...prev, { text: errorMsg, isUser: false, isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSendMessage = () => {
        sendMessage(inputValue);
    };

    // Hàm xử lý khi người dùng nhấn nút "Accept"
    const handleAcceptPlan = () => {
        sendMessage("Accept");
    };

    return (
        <div className="glass-card p-6 rounded-xl border border-border shadow-sm flex flex-col h-[75vh]">
            <div className="flex-grow space-y-6 overflow-y-auto pr-4">
                {isHistoryLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-primary text-3xl" />
                    </div>
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} messageData={msg} onAccept={handleAcceptPlan} />
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

            <div className="mt-6 pt-4 border-t border-border">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask a question or log an expense..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isLoading || isHistoryLoading}
                        className="w-full p-4 pr-24 text-text-primary bg-card-secondary border border-border rounded-lg focus:ring-2 focus:ring-ring disabled:bg-card-secondary/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button 
                            onClick={handleSendMessage} 
                            disabled={isLoading || isHistoryLoading || !inputValue.trim()}
                            className="px-5 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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