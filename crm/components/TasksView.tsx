
import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Lead } from '../types';
import { CheckSquare, Clock, ArrowRight, Calendar } from 'lucide-react';

interface TasksViewProps {
    leads: Lead[];
    onSelectLead: (leadId: number) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ leads, onSelectLead }) => {
    // Filter leads that have tasks
    const leadsWithTasks = leads.filter(l => l.nextTask && l.nextTask.trim() !== '').sort((a, b) => {
        if (!a.taskDate) return 1;
        if (!b.taskDate) return -1;
        return new Date(a.taskDate).getTime() - new Date(b.taskDate).getTime();
    });

    if (leadsWithTasks.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
                    <CheckSquare size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No hay tareas pendientes</h3>
                <p className="text-gray-400">¡Todo al día! Crea tareas desde la vista de leads.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckSquare className="text-purple-400" />
                Tareas y Recordatorios
            </h2>

            <div className="grid gap-4">
                {leadsWithTasks.map(lead => {
                    const date = lead.taskDate ? new Date(lead.taskDate) : null;
                    const isToday = date && new Date().toDateString() === date.toDateString();
                    const isOverdue = date && date < new Date() && !isToday;

                    return (
                        <GlassCard key={lead.id} className="p-6 hover:bg-white/10 transition-colors group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        {isToday && <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded">Hoy</span>}
                                        {isOverdue && <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded">Vencida</span>}
                                        <h3 className="text-lg font-bold text-white">{lead.domain}</h3>
                                    </div>
                                    <p className="text-gray-300 mb-3">{lead.nextTask}</p>
                                    
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{date ? date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }) : 'Sin fecha'}</span>
                                        </div>
                                        {date && (
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>{date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => onSelectLead(lead.id)}
                                    className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded-lg text-purple-300 font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap"
                                >
                                    <span>Ver Lead</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
};
