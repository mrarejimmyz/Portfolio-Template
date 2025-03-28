// components/ChatNavigator.tsx
"use client"; // Add this for Next.js app router

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';


// Define message types
interface Message {
  role: 'user' | 'assistant' | 'navigation';
  content: string;
  action?: () => void;
}



interface ChatNavigatorProps {
  highlightedSection: string | null;
}

export default function ChatNavigator({ highlightedSection }: ChatNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! I'm Ashish's portfolio assistant. How can I help you explore his work?" }
  ]);
  
  
  const [input, setInput] = useState('');
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedSection) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `You've navigated to the ${highlightedSection} section. Let me know if you need more details!`
        }
      ]);
    }
  }, [highlightedSection]);

  // Handle scrolling to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Process user input and navigate portfolio
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Process the message (simplified version)
    processMessage(input);
    
    // Clear input
    setInput('');
  };

  const processMessage = (message: string) => {
    const lowerMsg = message.toLowerCase();
    
    // Add response based on message content
    setTimeout(() => {
      if (lowerMsg.includes('solana') || lowerMsg.includes('transaction')) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Ashish has extensive Solana experience, including building a real-time monitoring system handling 5,000+ TPS. Would you like to see his Solana projects?"
        }]);
        
        // Add navigation button
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'navigation', 
            content: "View Solana Projects",
            action: () => router.push('/projects#solana')
          }]);
        }, 500);
      } else if (lowerMsg.includes('hackathon') || lowerMsg.includes('award') || lowerMsg.includes('win')) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Ashish has won several prestigious hackathons, including EthGlobal 2023, HackFS Grand Prize, and StarkHack. Would you like to see details?"
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'navigation', 
            content: "View Hackathon Wins",
            action: () => router.push('/awards')
          }]);
        }, 500);
      } else if (lowerMsg.includes('ipfs') || lowerMsg.includes('deployment')) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Ashish recently deployed this portfolio on IPFS, creating a fully decentralized website. Would you like to see how he overcame the challenges?"
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'navigation', 
            content: "View IPFS Case Study",
            action: () => router.push('/blog/ipfs-deployment')
          }]);
        }, 500);
      } else {
        // Generic response for other queries
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I can help you explore Ashish's Solana projects, hackathon wins, or IPFS deployment process. What would you like to know more about?"
        }]);
      }
    }, 600);
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
              <h3 className="font-medium">Portfolio Navigator</h3>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Messages container */}
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <div key={index} className="mb-3">
                  {msg.role === 'user' ? (
                    <div className="bg-indigo-100 p-2 rounded-lg ml-auto max-w-[80%] inline-block">
                      {msg.content}
                    </div>
                  ) : msg.role === 'navigation' ? (
                    <motion.button
                    onClick={msg.action ? msg.action : undefined}
                    className="bg-indigo-600 text-white px-3 py-2 rounded-lg mt-1 hover:bg-indigo-700"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {msg.content}
                  </motion.button>

                  ) : (
                    <div className="bg-white p-2 rounded-lg shadow-sm max-w-[80%] inline-block">
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-3 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  placeholder="Ask about Solana, hackathons, IPFS..."
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  type="submit"
                  className="bg-indigo-600 text-white p-2 rounded-r-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
