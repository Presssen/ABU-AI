
import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { X, CheckSquare, Clock, Send, Check, Loader2 } from 'lucide-react';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: string, date: string) => void;
    isSaving?: boolean;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, isSaving = false }) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        const dateTime = date && time ? `${date}T${time}` : date;
        onSave(task, dateTime);
        // We do not clear/close immediately here, we wait for parent to handle it or manually close
        // But for better UX let's assume success if no error handling prop passed
        if (!isSaving) {
            setTimeout(() => {
                setTask('');
                setDate('');
                setTime('');
                onClose();
            }, 500);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <GlassCard className="w-full max-w-md p-6 relative z-10 animate-in zoom-in-95 border-purple-500/30">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={20} />
                </button>

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <CheckSquare size={20} className="text-purple-400" />
                    Crear Tarea / Recordatorio
                </h3>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Descripción</label>
                        <textarea 
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Ej: Llamar de nuevo a las 3PM..."
                            className="w-full h-24 bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 resize-none" 
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Fecha</label>
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Hora</label>
                            <input 
                                type="time" 
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500" 
                            />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleSave}
                    disabled={!task || isSaving}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all"
                >
                    {isSaving ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Guardando...</span>
                        </>
                    ) : (
                        <>
                            <Check size={18} />
                            <span>Guardar Tarea</span>
                        </>
                    )}
                </button>
            </GlassCard>
        </div>
    );
};
