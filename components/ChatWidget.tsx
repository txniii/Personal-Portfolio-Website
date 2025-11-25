import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAgent } from '../services/gemini';
import { ChatMessage } from '../types';
import { PROFILE } from '../constants';

// Icons
const MessageCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
        id: '0', 
        role: 'model', 
        text: `Hi there. I'm ${PROFILE.name.split(' ')[0]}'s AI assistant. How can I help you today?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen || isTyping) {
        scrollToBottom();
        // Auto focus input when opened with a slight delay for animation
        if (isOpen && !isTyping) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
        // Prepare history for the API (exclude the current message we are sending as it's passed as the new prompt)
        const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));
        
        const responseText = await sendMessageToAgent(historyForApi, userMsg.text);

        const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
        };

        setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
        console.error("Failed to send message", error);
        const errorMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "I'm having a bit of trouble connecting right now. Please try again later."
        };
        setMessages(prev => [...prev, errorMsg]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      <div 
        className={`
            mb-4 w-[360px] md:w-[400px] max-h-[600px] h-[70vh] 
            bg-[#1c1c1e]/90 backdrop-blur-xl 
            border border-white/10 rounded-[2rem] shadow-2xl 
            flex flex-col overflow-hidden 
            transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) origin-bottom-right
            ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none h-0 mb-0'}
        `}
      >
          
          {/* Header */}
          <div className="p-4 bg-white/5 backdrop-blur-md border-b border-white/5 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center space-x-3">
               <div className="relative">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-black">
                        <img src={PROFILE.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#34c759] border-2 border-[#1c1c1e] rounded-full"></div>
               </div>
               <div>
                    <h3 className="font-semibold text-sm text-white leading-tight">{PROFILE.name}</h3>
                    <p className="text-[10px] text-neutral-400 font-medium">AI Assistant • Active</p>
               </div>
            </div>
            <button 
                onClick={() => setMessages([{ id: '0', role: 'model', text: `Hi there. I'm ${PROFILE.name.split(' ')[0]}'s AI assistant. How can I help you today?` }])} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
                title="Reset Chat"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide bg-gradient-to-b from-[#1c1c1e] to-[#000]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                style={{ animationDuration: '0.3s' }}
              >
                <div 
                  className={`
                    max-w-[85%] px-5 py-3 text-[15px] leading-relaxed shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-[#0071e3] text-white rounded-[1.3rem] rounded-br-sm' 
                      : 'bg-[#2c2c2e] text-[#f5f5f7] rounded-[1.3rem] rounded-bl-sm border border-white/5'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
               <div className="flex justify-start animate-fade-in">
                 <div className="bg-[#2c2c2e] border border-white/5 px-3.5 py-3 rounded-[1.3rem] rounded-bl-sm flex space-x-1.5 items-center h-[38px] ml-1 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-typing" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-typing" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-typing" style={{ animationDelay: '300ms' }}></div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#1c1c1e] border-t border-white/10 shrink-0">
            <div className="relative flex items-center bg-[#2c2c2e] rounded-full border border-white/5 focus-within:border-[#0071e3]/50 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="w-full bg-transparent text-white pl-5 pr-12 py-3.5 text-[15px] focus:outline-none placeholder-neutral-500 rounded-full"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ED] disabled:opacity-0 disabled:scale-75 transition-all duration-300 shadow-lg"
              >
                <SendIcon />
              </button>
            </div>
          </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
            h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
            ${isOpen ? 'bg-[#1d1d1f] text-white rotate-90 scale-90' : 'bg-white text-black hover:scale-110 rotate-0'}
        `}
        aria-label="Toggle Chat"
      >
        {isOpen ? <XIcon /> : <MessageCircleIcon />}
      </button>
    </div>
  );
};