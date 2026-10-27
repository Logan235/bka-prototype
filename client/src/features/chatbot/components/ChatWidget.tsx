import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User as UserIcon, 
  Sparkles, 
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import type { ChatMessage } from '../../../types';
import { INITIAL_MESSAGES, getBotResponse } from '../chatbotLogic';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string, action?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() && !action) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      // eslint-disable-next-line react-hooks/purity
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate AI thinking typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = getBotResponse(action || text);
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleRestart = () => {
    setMessages(INITIAL_MESSAGES);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onOpen || onClose}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group flex items-center justify-center border-2 border-white/20"
        title="Trợ lý AI BKA.ai (24/7)"
        aria-label="Mở Trợ lý AI BKA.ai"
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 border-2 border-white animate-pulse"></span>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Hỏi Trợ lý AI BKA.ai 💬
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002244] to-[#003366] text-white px-4 py-3.5 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
            <Bot className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5 text-white">
              Trợ lý AI BKA.ai 
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </h3>
            <p className="text-[11px] text-blue-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Trực tuyến 24/7 • ĐHBK ĐHQG-HCM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleRestart}
            className="btn btn-xs btn-ghost btn-square text-white hover:bg-white/15 rounded-xl"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="btn btn-xs btn-ghost btn-square text-white hover:bg-white/15 rounded-xl"
            title="Thu nhỏ"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 text-xs sm:text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[88%]">
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-xl bg-[#003366] text-amber-400 flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl shadow-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#003366] text-white rounded-br-none'
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-200/80 shadow-slate-100'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-9">{msg.timestamp}</span>

            {/* Quick Suggestions Chips */}
            {msg.options && msg.options.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                {msg.options.map((opt: { label: string; action: string }, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(opt.label, opt.action)}
                    className="btn btn-xs bg-white hover:bg-[#003366] hover:text-white text-slate-700 border border-slate-200 rounded-full transition-all shadow-sm font-semibold"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#003366] text-amber-400 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Hỏi về Quỹ BKA Fund, Bảo lãnh vay, Gia sư..."
          className="input input-bordered input-sm flex-1 text-xs sm:text-sm rounded-xl bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900 focus:border-[#003366]"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          className="btn btn-sm bg-[#003366] hover:bg-[#002244] text-white border-none rounded-xl btn-square shadow-sm"
          title="Gửi tin nhắn"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
