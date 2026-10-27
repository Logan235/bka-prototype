import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../features/chatbot/components/ChatWidget';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};
