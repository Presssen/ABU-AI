import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minimize2, Bot } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GlassCard } from './ui/GlassCard';
import { Content, Language } from '../types';

interface ChatWidgetProps {
  lang: Language;
  content: Content;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ lang, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize Chat Session
  useEffect(() => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        
        const systemInstruction = `
          You are a helpful, friendly, and professional customer support agent for the app "ABU - Upsell & Cross-sell".
          Your goal is to answer visitor questions about the app, its features, pricing, and benefits.
          
          Language Instruction: Please answer in ${lang === 'es' ? 'Spanish' : 'English'}.
          
          App Details Context:
          - Name: ABU
          - Tagline: ${content.hero.title}
          - Description: ${content.hero.subtitle}
          
          Features:
          1. ${content.features.items.fbt.title}: ${content.features.items.fbt.description}
          2. ${content.features.items.popup.title}: ${content.features.items.popup.description}
          3. ${content.features.items.postPurchase.title}: ${content.features.items.postPurchase.description}
          
          Pricing Plans:
          ${content.pricing.plans.map(p => `- ${p.name}: ${p.price}. ${p.description} Features: ${p.features.join(', ')}`).join('\n')}
          
          Support Contact: info@tiendamanillc.com
          
          Rules:
          - Keep answers concise and helpful.
          - If you don't know an answer, suggest contacting support via email.
          - Do not make up features that are not listed.
          - Use a friendly tone with emojis occasionally.
        `;

        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: systemInstruction,
          }
        });
      } else {
        console.warn("API Key not found for ChatWidget");
      }
    } catch (e) {
      console.error("Failed to initialize chat", e);
    }
  }, [lang, content]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      if (!chatSessionRef.current) {
        // Fallback if no API key or init failed
        setTimeout(() => {
            const fallbackMsg: Message = { 
                id: (Date.now() + 1).toString(), 
                role: 'model', 
                text: lang === 'es' 
                    ? "El chat no está conectado a la API en este momento. Por favor contáctanos a info@tiendamanillc.com." 
                    : "Chat is currently offline (API Config missing). Please email us at info@tiendamanillc.com." 
            };
            setMessages(prev => [...prev, fallbackMsg]);
            setIsLoading(false);
        }, 1000);
        return;
      }

      const response: GenerateContentResponse = await chatSessionRef.current.sendMessage({ message: userMsg.text });
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || (lang === 'es' ? "Lo siento, no pude procesar eso." : "Sorry, I couldn't process that.")
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(lang === 'es' ? "Error de conexión. Intenta de nuevo." : "Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
            fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-110
            bg-gradient-to-r from-blue-600 to-purple-600 text-white
            ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'rotate-0 opacity-100'}
        `}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`
            fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] md:h-[600px]
            transition-all duration-500 ease-in-out origin-bottom-right
            ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        <GlassCard className="h-full flex flex-col shadow-2xl border-blue-500/30 overflow-hidden !bg-[#0f172a]/95 !backdrop-blur-xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <Bot size={20} className="text-blue-300" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">ABU Support</h3>
                        <p className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                        <Minimize2 size={18} />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white md:hidden">
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="text-center py-12 px-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle size={32} className="text-blue-400 opacity-50" />
                        </div>
                        <p className="text-gray-400 text-sm">
                            {lang === 'es' 
                             ? "¡Hola! Soy el asistente virtual de ABU. ¿En qué puedo ayudarte hoy?" 
                             : "Hi there! I'm ABU's virtual assistant. How can I help you today?"}
                        </p>
                    </div>
                )}
                
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div 
                            className={`
                                max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
                                ${msg.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-tr-none' 
                                    : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-none'}
                            `}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex items-center space-x-2">
                            <Loader2 size={16} className="animate-spin text-blue-400" />
                            <span className="text-xs text-gray-400">Thinking...</span>
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="text-center text-xs text-red-400 mt-2">
                        {error}
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={lang === 'es' ? "Escribe tu mensaje..." : "Type your message..."}
                        className="flex-grow bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </GlassCard>
      </div>
    </>
  );
};

export default ChatWidget;
