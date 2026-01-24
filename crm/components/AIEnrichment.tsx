
import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Sparkles, User, Mail, Phone, Loader2, Search } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AIEnrichmentProps {
    domain: string;
}

export const AIEnrichment: React.FC<AIEnrichmentProps> = ({ domain }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ ceo?: string, email?: string, phone?: string } | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!process.env.API_KEY) return;
        setLoading(true);
        setSearched(true);
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const prompt = `
                Analyze the company associated with the domain: ${domain}.
                I need to find:
                1. The Name of the CEO, Founder, or E-commerce Manager.
                2. A contact email address (publicly available).
                3. A business phone number.
                
                Return the result strictly in JSON format like this:
                {
                    "ceo": "Name or Not found",
                    "email": "Email or Not found",
                    "phone": "Phone or Not found"
                }
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview', 
                contents: prompt,
                config: {
                    responseMimeType: "application/json"
                }
            });

            const text = response.text;
            if (text) {
                const data = JSON.parse(text);
                setResult(data);
            }
        } catch (error) {
            console.error("AI Search Error", error);
            setResult({ ceo: "Error searching", email: "Error searching", phone: "Error searching" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassCard className="p-4 bg-gradient-to-br from-purple-900/10 to-blue-900/10 border-white/10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-purple-400" />
                    IA Detective
                </h3>
                {!searched && (
                    <button 
                        onClick={handleSearch}
                        disabled={loading}
                        className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                        {loading ? <Loader2 size={12} className="animate-spin" /> : <Search size={12} />}
                        Analizar
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-4 text-gray-400 text-xs gap-2">
                    <Loader2 size={24} className="animate-spin text-purple-400" />
                    Buscando CEO y datos de contacto...
                </div>
            ) : result ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                        <div className="p-1.5 bg-blue-500/20 rounded text-blue-300 mt-0.5"><User size={14} /></div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold">Responsable / CEO</div>
                            <div className="text-sm text-white font-medium">{result.ceo}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                        <div className="p-1.5 bg-orange-500/20 rounded text-orange-300 mt-0.5"><Mail size={14} /></div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold">Email Probable</div>
                            <div className="text-sm text-white font-medium break-all">{result.email}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                        <div className="p-1.5 bg-green-500/20 rounded text-green-300 mt-0.5"><Phone size={14} /></div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold">Teléfono</div>
                            <div className="text-sm text-white font-medium">{result.phone}</div>
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-500 text-center italic mt-2">
                        *Datos generados por IA. Verificar antes de usar.
                    </div>
                </div>
            ) : (
                <div className="text-xs text-gray-500 text-center py-2">
                    Pulsa analizar para buscar al CEO y datos de contacto ocultos.
                </div>
            )}
        </GlassCard>
    );
};
