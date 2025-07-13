import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatMessage = ({ message, isUser }) => {
    return (
        <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-light text-primary text-xl flex-shrink-0">
                    <FontAwesomeIcon icon={faRobot} />
                </div>
            )}
            <div className={`max-w-md p-4 rounded-xl ${isUser ? 'bg-primary text-primary-light rounded-br-none' : 'bg-card-secondary text-text-primary rounded-bl-none'}`}>
                <p>{message}</p>
            </div>
            {isUser && (
                 <div className="w-10 h-10 rounded-full flex items-center justify-center bg-card-secondary text-text-primary font-bold flex-shrink-0">
                    A
                </div>
            )}
        </div>
    );
};

const ChatInterface = () => {
    return (
        <div className="glass-card p-6 rounded-xl border border-border shadow-sm flex flex-col h-[75vh]">
            {/* Chat Messages Area */}
            <div className="flex-grow space-y-6 overflow-y-auto pr-4">
                <ChatMessage 
                    message="Hello! How can I help you manage your finances today?" 
                />
                <ChatMessage 
                    message="Based on my spending, can I afford a new phone this month?" 
                    isUser 
                />
                <ChatMessage 
                    message="Let's take a look... Yes, you can likely afford a standard phone. If you want a high-end model, you might need to pull from your 'Fun' jar or wait another month." 
                />
            </div>

            {/* Chat Input Area */}
            <div className="mt-6 pt-4 border-t border-border">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask a question or log an expense..."
                        className="w-full p-4 pr-32 text-text-primary border border-border rounded-lg focus:ring-2 focus:ring-ring"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button className="p-2 text-text-secondary hover:text-text-primary">
                             <FontAwesomeIcon icon={faPaperclip} className="text-xl"/>
                        </button>
                        <button className="ml-2 px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 flex items-center gap-2">
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