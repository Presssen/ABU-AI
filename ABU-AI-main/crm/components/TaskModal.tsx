
import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { X, CheckSquare, Clock, Check, Loader2, Phone, Mail, Video } from 'lucide-react';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: string, date: string) => void;
    isSaving?: boolean;
}

type TaskType = 'General' | 'Llamada' | 'Email' | 'Reunión';

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, isSaving = false }) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState<TaskType>('General');

    if (!isOpen) return null;

    const handleSave = () => {
        const dateTime = date && time ? `${date}T${time}` : date;
        // Prefix the task with the type
        const finalTask = type === 'General' ? task : `[${type}] ${task}`;
        onSave(finalTask, dateTime);
        
        if (!isSaving) {
            setTimeout(() => {
                setTask('');
                setDate('');
                setTime('');
                setType('General');
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
                    {/* Type Selector */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Tipo de Tarea</label>
                        <div className="grid grid-cols-4 gap-2">
                            <button onClick={() => setType('General')} className={`p-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${type === 'General' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                                <CheckSquare size={16} /> General
                            </button>
                            <button onClick={() => setType('Llamada')} className={`p-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${type === 'Llamada' ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                                <Phone size={16} /> Llamada
                            </button>
                            <button onClick={() => setType('Email')} className={`p-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${type === 'Email' ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                                <Mail size={16} /> Email
                            </button>
                            <button onClick={() => setType('Reunión')} className={`p-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${type === 'Reunión' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                                <Video size={16} /> Reunión
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Descripción</label>
                        <textarea 
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Ej: Llamar para confirmar presupuesto..."
                            className="w-full h-20 bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 resize-none text-sm" 
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Fecha</label>
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Hora</label>
                            <input 
                                type="time" 
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 text-sm" 
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
