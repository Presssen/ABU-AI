
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Minimize2, Bot } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Content, Language } from '../types';

interface ChatWidgetProps {
  lang: Language;
  content: Content;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ lang, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // AI disabled - Fallback response
    setTimeout(() => {
        const fallbackText = lang === 'es' 
            ? "Lo sentimos, el chat de soporte automático no está disponible en este momento. Por favor, contacta con info@tiendamanillc.com." 
            : "Sorry, automated chat support is currently unavailable. Please contact info@tiendamanillc.com.";
        
        setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            role: 'model', 
            text: fallbackText 
        }]);
        setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl bg-blue-600 text-white transition-all ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'scale-100'}`}
      >
        <MessageCircle size={28} />
      </button>
      
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] animate-in slide-in-from-bottom-10 origin-bottom-right">
          <GlassCard className="h-full flex flex-col !bg-[#0f172a]/95 backdrop-blur-xl border-white/10 shadow-2xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-blue-600/10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Bot size={20} className="text-blue-400" />
                    </div>
                    <span className="font-bold">ABU Support</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <Minimize2 size={18} className="text-gray-400" />
                </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2">Asistente Offline</p>
                        <p className="text-sm text-gray-400">¿En qué podemos ayudarte?</p>
                    </div>
                )}
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none animate-pulse text-xs text-gray-500">
                            Procesando...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-white/10 flex gap-2 bg-black/20">
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && handleSend()} 
                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors" 
                    placeholder={lang === 'es' ? "Escribe un mensaje..." : "Type a message..."} 
                />
                <button 
                    onClick={handleSend} 
                    disabled={!input.trim() || isLoading}
                    className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                >
                    <Send size={18} />
                </button>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
