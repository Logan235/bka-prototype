import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../features/chatbot/components/ChatWidget';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener('open-bka-chat', handleOpenChat);
    return () => window.removeEventListener('open-bka-chat', handleOpenChat);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-accent selection:text-white">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer onOpenChat={() => setIsChatOpen(true)} />
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onOpen={() => setIsChatOpen(true)} />
    </div>
  );
};
