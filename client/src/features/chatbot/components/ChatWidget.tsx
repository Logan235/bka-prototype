import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import type { ChatMessage } from '../../../types';
import { INITIAL_MESSAGES, getBotResponse } from '../chatbotLogic';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = (textToSend?: string, action?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() && !action) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      const botMsg = getBotResponse(action || text);
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onClose}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform animate-bounce"
        title="Trợ lý AI BKA.ai"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[540px] bg-base-100 rounded-2xl shadow-2xl border border-base-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-primary-content px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-bold shadow">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-1">
              Trợ lý AI BKA.ai <Sparkles className="w-3.5 h-3.5 text-accent fill-accent" />
            </h3>
            <p className="text-[11px] text-blue-200">Hỗ trợ 24/7 • Kỷ niệm 70 năm Bách Khoa</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="btn btn-sm btn-ghost btn-square text-primary-content hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[85%]">
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs shadow">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-content rounded-br-none'
                    : 'bg-white text-neutral rounded-bl-none border border-base-200'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 text-xs shadow">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-9">{msg.timestamp}</span>

            {/* Quick Options Chips */}
            {msg.options && msg.options.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                {msg.options.map((opt: { label: string; action: string }, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(opt.label, opt.action)}
                    className="btn btn-xs bg-white hover:bg-accent hover:text-white text-primary border border-primary/25 rounded-full transition-colors shadow-sm"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <div className="p-3 bg-white border-t border-base-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Nhập câu hỏi của bạn..."
          className="input input-bordered input-sm flex-1 text-sm bg-base-100 focus:outline-none focus:border-primary"
        />
        <button
          onClick={() => handleSendMessage()}
          className="btn btn-sm bg-primary hover:bg-primary-focus text-white border-none btn-square shadow"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
