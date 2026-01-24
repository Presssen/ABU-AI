
import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { X, Calendar as CalendarIcon, Clock, Send, Check } from 'lucide-react';

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (date: string, time: string) => void;
    leadEmail: string;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, onSchedule, leadEmail }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [sent, setSent] = useState(false);

    if (!isOpen) return null;

    const handleSend = () => {
        setSent(true);
        setTimeout(() => {
            onSchedule(date, time);
            setSent(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <GlassCard className="w-full max-w-md p-6 relative z-10 animate-in zoom-in-95">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={20} />
                </button>

                {sent ? (
                    <div className="py-12 text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} className="text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Invitación Enviada</h3>
                        <p className="text-gray-400">Reunión agendada con éxito.</p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <CalendarIcon size={20} className="text-blue-400" />
                            Agendar Reunión
                        </h3>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Email del Cliente</label>
                                <input type="text" value={leadEmail} disabled className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-gray-400" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Fecha</label>
                                    <input 
                                        type="date" 
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Hora</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 text-gray-500" size={16} />
                                        <input 
                                            type="time" 
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-blue-500" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleSend}
                            disabled={!date || !time}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-bold flex items-center justify-center gap-2"
                        >
                            <Send size={18} />
                            <span>Enviar Invitación</span>
                        </button>
                    </>
                )}
            </GlassCard>
        </div>
    );
};
