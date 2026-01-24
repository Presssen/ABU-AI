
import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Lead } from '../types';
import { CheckSquare, Clock, ArrowRight, Calendar as CalendarIcon, Phone, Video, List, Grid3X3, CheckCircle, Bell, ChevronLeft, ChevronRight, LayoutList } from 'lucide-react';

interface TasksViewProps {
    leads: Lead[];
    onSelectLead: (leadId: number) => void;
    onCompleteTask: (leadId: number, taskDescription: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ leads, onSelectLead, onCompleteTask }) => {
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');
    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mobileView, setMobileView] = useState<'month' | 'agenda'>('agenda');

    const [completingId, setCompletingId] = useState<number | null>(null);

    // Filter leads that have active tasks
    const leadsWithTasks = leads.filter(l => l.nextTask && l.nextTask.trim() !== '').sort((a, b) => {
        if (!a.taskDate) return 1;
        if (!b.taskDate) return -1;
        return new Date(a.taskDate).getTime() - new Date(b.taskDate).getTime();
    });

    // Helper to determine task type based on keyword
    const getTaskIcon = (task: string, size = 16) => {
        const lower = task.toLowerCase();
        if (lower.includes('llamar') || lower.includes('llamada')) return <Phone size={size} className="text-green-400" />;
        if (lower.includes('reunión') || lower.includes('meet')) return <Video size={size} className="text-yellow-400" />;
        if (lower.includes('email') || lower.includes('correo')) return <Bell size={size} className="text-blue-400" />;
        return <CheckSquare size={size} className="text-purple-400" />;
    };

    const handleComplete = async (leadId: number, task: string) => {
        setCompletingId(leadId);
        await onCompleteTask(leadId, task);
        setCompletingId(null);
    };

    // Calendar Logic
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        // 0 = Sunday, 1 = Monday. We want Monday to be first (Europe style) or Sunday?
        // Let's stick to standard 0-6 Sunday-Saturday for simplicity or adjust grid.
        return new Date(year, month, 1).getDay();
    };

    const changeMonth = (delta: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
    };

    const renderCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        
        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-[#0f172a]/30 border border-white/5"></div>);
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = new Date(year, month, day).toDateString();
            const isToday = new Date().toDateString() === dateStr;
            
            // Find tasks for this day
            const dayTasks = leadsWithTasks.filter(l => {
                if (!l.taskDate) return false;
                return new Date(l.taskDate).toDateString() === dateStr;
            });

            days.push(
                <div key={day} className={`min-h-[100px] md:h-32 border border-white/5 p-2 transition-colors ${isToday ? 'bg-blue-900/10 border-blue-500/30' : 'bg-[#0f172a]/50 hover:bg-white/5'}`}>
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-bold ${isToday ? 'text-blue-400 bg-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-400'}`}>
                            {day}
                        </span>
                        {dayTasks.length > 0 && <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 rounded">{dayTasks.length}</span>}
                    </div>
                    
                    <div className="space-y-1 overflow-y-auto max-h-[70px] custom-scrollbar">
                        {dayTasks.map(task => (
                            <div 
                                key={task.id} 
                                onClick={() => onSelectLead(task.id)}
                                className="text-[10px] p-1 rounded bg-white/10 hover:bg-white/20 cursor-pointer truncate flex items-center gap-1 border-l-2 border-purple-400"
                                title={task.nextTask}
                            >
                                {getTaskIcon(task.nextTask!, 10)}
                                <span className="text-gray-200">{task.nextTask}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    const renderAgendaView = () => {
        // Group by day, sorted
        const groupedTasks = leadsWithTasks.reduce((acc, lead) => {
            const d = lead.taskDate ? new Date(lead.taskDate).toDateString() : 'Sin Fecha';
            if (!acc[d]) acc[d] = [];
            acc[d].push(lead);
            return acc;
        }, {} as Record<string, Lead[]>);
        
        // Only show current month logic? Or just all upcoming? 
        // Agenda view usually shows list. We will filter by current month selected to keep context.
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const datesInMonth = Object.keys(groupedTasks).filter(dateStr => {
            const d = new Date(dateStr);
            return d.getMonth() === month && d.getFullYear() === year;
        });

        if (datesInMonth.length === 0) {
             return <div className="text-center py-12 text-gray-500 italic">No hay tareas para este mes.</div>;
        }

        return (
            <div className="space-y-4">
                {datesInMonth.map(dateStr => (
                    <div key={dateStr}>
                        <div className="sticky top-0 bg-[#0f172a] z-10 py-2 border-b border-white/10 flex items-center gap-2 mb-2">
                            <span className="font-bold text-lg text-blue-400">{new Date(dateStr).getDate()}</span>
                            <span className="text-sm text-gray-400 uppercase">{new Date(dateStr).toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                            {dateStr === new Date().toDateString() && <span className="ml-auto text-xs font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded">HOY</span>}
                        </div>
                        <div className="space-y-2">
                             {groupedTasks[dateStr].map(lead => (
                                 <div key={lead.id} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                     <div className="text-xs text-gray-400 flex flex-col items-center pt-1 min-w-[40px]">
                                         {lead.taskDate ? new Date(lead.taskDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                                     </div>
                                     <div className="flex-grow border-l-2 border-purple-500 pl-3">
                                         <h4 className="text-sm font-bold text-white mb-1">{lead.domain}</h4>
                                         <p className="text-xs text-gray-400 mb-2">{lead.nextTask}</p>
                                         <div className="flex gap-2">
                                             <button onClick={() => handleComplete(lead.id, lead.nextTask!)} className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded hover:bg-green-500/20">Completar</button>
                                             <button onClick={() => onSelectLead(lead.id)} className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20">Ver Lead</button>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <CheckSquare className="text-purple-400" />
                        Registro de ToDos
                    </h2>
                    <p className="text-gray-400 text-sm">Próximas reuniones, llamadas y recordatorios.</p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <List size={16} /> Lista
                    </button>
                    <button 
                        onClick={() => setViewMode('calendar')}
                        className={`px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors ${viewMode === 'calendar' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Grid3X3 size={16} /> Calendario
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                // --- LIST VIEW ---
                <div className="grid gap-4">
                    {leadsWithTasks.map(lead => {
                        const date = lead.taskDate ? new Date(lead.taskDate) : null;
                        const isToday = date && new Date().toDateString() === new Date().toDateString();
                        const isOverdue = date && date < new Date() && !isToday;

                        return (
                            <GlassCard key={lead.id} className="p-6 hover:bg-white/10 transition-colors group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="mr-2">
                                        <button 
                                            onClick={() => handleComplete(lead.id, lead.nextTask!)}
                                            disabled={completingId === lead.id}
                                            className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-green-500 hover:bg-green-500/20 flex items-center justify-center transition-all group/check"
                                            title="Marcar como Hecho"
                                        >
                                            {completingId === lead.id ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <CheckCircle className="text-gray-500 group-hover/check:text-green-500" size={20} />
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            {isToday && <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded">Hoy</span>}
                                            {isOverdue && <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded">Vencida</span>}
                                            {getTaskIcon(lead.nextTask!)}
                                            <h3 className="text-lg font-bold text-white">{lead.domain}</h3>
                                        </div>
                                        <p className="text-gray-300 mb-3">{lead.nextTask}</p>
                                        
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <CalendarIcon size={14} />
                                                <span>{date ? date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'long' }) : 'Sin fecha'}</span>
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
                                        className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded-lg text-purple-300 font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap self-start md:self-center"
                                    >
                                        <span>Ver Lead</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            ) : (
                // --- CALENDAR VIEW ---
                <div className="space-y-4">
                    {/* Calendar Header Controls */}
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-lg text-white"><ChevronLeft size={20} /></button>
                        <h3 className="text-lg font-bold text-white capitalize">
                            {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                        </h3>
                        <div className="flex items-center gap-2">
                             {/* Mobile Toggle for Agenda vs Month Grid */}
                             <div className="md:hidden flex bg-[#0f172a] p-0.5 rounded-lg border border-white/10">
                                <button onClick={() => setMobileView('agenda')} className={`p-1.5 rounded ${mobileView === 'agenda' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}><LayoutList size={16}/></button>
                                <button onClick={() => setMobileView('month')} className={`p-1.5 rounded ${mobileView === 'month' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}><Grid3X3 size={16}/></button>
                             </div>
                             <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-lg text-white"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    {/* Desktop / Mobile Grid Logic */}
                    <div className={`
                        ${mobileView === 'agenda' ? 'block md:hidden' : 'hidden'} 
                    `}>
                        {renderAgendaView()}
                    </div>

                    <div className={`
                        ${mobileView === 'month' ? 'grid' : 'hidden md:grid'} 
                        grid-cols-7 gap-1 md:gap-2
                    `}>
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                            <div key={day} className="text-center text-xs font-bold text-gray-500 py-2 uppercase">{day}</div>
                        ))}
                        {renderCalendarGrid()}
                    </div>
                </div>
            )}
        </div>
    );
};
