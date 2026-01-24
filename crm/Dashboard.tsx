
import React, { useState, useEffect, useMemo } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Phone, Globe, Mail, ArrowRight, CheckCircle, LogOut, Briefcase, Filter, Search, Sparkles, Save, Database, Loader2, AlertTriangle, RefreshCw, Calendar as CalendarIcon, PieChart, Users, ChevronLeft, ChevronRight, Plus, CheckSquare, Lock, Clock, RotateCcw, Settings, Video } from 'lucide-react';
import { Lead, Region, DashboardStats, ActionType } from './types';
import { fetchLeadsFromSheet, updateLeadInSheet, saveProgressInSheet, completeTaskInSheet, getApiUrl, setApiUrl } from './api/googleSheets';
import { StatsView } from './components/StatsView';
import { TasksView } from './components/TasksView';
import { CalendarModal } from './components/CalendarModal';
import { TaskModal } from './components/TaskModal';
import { AIEnrichment } from './components/AIEnrichment';

interface DashboardProps {
    currentUser: string;
    onLogout: () => void;
}

// Robust utility to parse notes
const parseHistory = (raw: string | undefined | null): string[] => {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        return [raw];
    } catch (e) {
        return raw.includes('|||') ? raw.split('|||').filter(Boolean) : [raw];
    }
};

// Component to render stylized notes
const NoteRenderer: React.FC<{ note: string }> = ({ note }) => {
    // Regex to find content inside []
    const parts = note.split(/(\[.*?\])/g);
    
    return (
        <div className="mb-2 last:mb-0 leading-relaxed break-words">
            {parts.map((part, index) => {
                if (part.startsWith('[') && part.endsWith(']')) {
                    const content = part.slice(1, -1);
                    // Determine color based on content keywords
                    let bgClass = "bg-gray-700 text-gray-300";
                    if (content.toLowerCase().includes('llamada')) bgClass = "bg-green-500/20 text-green-300 border border-green-500/30";
                    else if (content.toLowerCase().includes('email')) bgClass = "bg-orange-500/20 text-orange-300 border border-orange-500/30";
                    else if (content.toLowerCase().includes('reunión')) bgClass = "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
                    else if (content.toLowerCase().includes('tarea completada')) bgClass = "bg-purple-500/20 text-purple-300 border border-purple-500/30";
                    else if (content.match(/\d{4}-\d{2}-\d{2}/)) bgClass = "bg-blue-500/20 text-blue-300 border border-blue-500/30"; // Date

                    return (
                        <span key={index} className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mr-1 mb-1 align-middle ${bgClass}`}>
                            {content}
                        </span>
                    );
                }
                return <span key={index} className="text-gray-300 text-sm align-middle">{part}</span>;
            })}
        </div>
    );
};

// Utility to format date nicely
const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
        return dateStr;
    }
};

const Dashboard: React.FC<DashboardProps> = ({ currentUser, onLogout }) => {
    // --- State ---
    const [view, setView] = useState<'leads' | 'stats' | 'tasks'>('leads');
    const [region, setRegion] = useState<Region>('spain');
    const [showFilters, setShowFilters] = useState(false);
    
    // Data State
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    
    // Config & Limits
    const [dailyLimit, setDailyLimit] = useState<number | null>(null);
    const [sessionStartIndex, setSessionStartIndex] = useState(0);

    // Filters
    const [filterPlan, setFilterPlan] = useState<string>('All');
    const [filterStoreStatus, setFilterStoreStatus] = useState<string>('All');

    // Current Navigation
    const [currentIndex, setCurrentIndex] = useState(0);

    // Editing State (Current Lead)
    const [newNote, setNewNote] = useState('');
    const [leadStatus, setLeadStatus] = useState(''); 
    const [newEmail, setNewEmail] = useState('');
    const [showAddEmail, setShowAddEmail] = useState(false);
    const [selectedAction, setSelectedAction] = useState<ActionType>(null);
    
    // History Navigation
    const [noteIndex, setNoteIndex] = useState(0);
    const [dateIndex, setDateIndex] = useState(0);
    
    // Modals
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [configUrl, setConfigUrl] = useState('');

    // --- Derived Data ---
    const uniquePlans = useMemo(() => {
        const plans = new Set(leads.map(l => l.plan ? l.plan.trim() : 'Shopify'));
        return ['All', ...Array.from(plans).filter(Boolean).sort()];
    }, [leads]);

    const uniqueStoreStatuses = useMemo(() => {
        const statuses = new Set(leads.map(l => l.storeStatus ? l.storeStatus.trim() : ''));
        return ['All', ...Array.from(statuses).filter(Boolean).sort()];
    }, [leads]);

    // Filter Logic
    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            const leadPlan = lead.plan ? lead.plan.trim() : 'Shopify';
            const leadStoreStatus = lead.storeStatus ? lead.storeStatus.trim() : '';
            const isNotSold = lead.leadStatus !== 'Sale';
            const matchPlan = filterPlan === 'All' || leadPlan === filterPlan;
            const matchStoreStatus = filterStoreStatus === 'All' || leadStoreStatus === filterStoreStatus;
            return matchPlan && matchStoreStatus && isNotSold;
        });
    }, [leads, filterPlan, filterStoreStatus]);

    const currentLead = filteredLeads[currentIndex];
    
    // Logic for Daily Limit
    const effectiveLimit = dailyLimit ?? 50; 
    const leadsProcessedToday = Math.max(0, currentIndex - sessionStartIndex);
    const leadsRemainingToday = Math.max(0, effectiveLimit - leadsProcessedToday);
    const isDailyLimitReached = leadsProcessedToday >= effectiveLimit;
    const isFinished = (currentIndex >= filteredLeads.length) || (dailyLimit !== null && isDailyLimitReached);
    const isEmpty = filteredLeads.length === 0 && !loading && !error;
    const hasRawData = leads.length > 0;

    // Parsed History
    const currentNotesHistory = useMemo(() => currentLead ? parseHistory(currentLead.notes).reverse() : [], [currentLead]);
    const currentDatesHistory = useMemo(() => currentLead && currentLead.lastContact ? currentLead.lastContact.split(',').filter(Boolean).reverse() : [], [currentLead]);

    // Calculate Stats
    const stats: DashboardStats = useMemo(() => {
        return {
            contacted: leads.filter(l => l.leadStatus !== 'Pending' && l.leadStatus !== '').length,
            emailsSent: leads.filter(l => {
                const notesLower = (l.notes || '').toLowerCase();
                return notesLower.includes('email') || notesLower.includes('correo') || notesLower.includes('mail');
            }).length,
            meetingsBooked: leads.filter(l => l.leadStatus === 'Meeting').length,
            sales: leads.filter(l => l.leadStatus === 'Sale').length,
            rejected: leads.filter(l => l.leadStatus === 'Rejected').length
        };
    }, [leads]);

    // --- Effects ---

    const loadData = async () => {
        const url = getApiUrl();
        if (!url) {
            setError("URL de API no configurada.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setDailyLimit(null);
        
        const result = await fetchLeadsFromSheet(region);
        
        if (result.error) {
            setError(result.error);
            setLeads([]);
            setLoading(false);
            return;
        }

        const processedLeads = result.leads.map(l => ({
            ...l,
            plan: l.plan && l.plan.trim() !== '' ? l.plan : 'Shopify'
        }));

        setLeads(processedLeads);
        
        if (result.config) {
            setDailyLimit(result.config.dailyLimit);
            if (result.config.filterPlan) setFilterPlan(result.config.filterPlan);
            if (result.config.filterStoreStatus) setFilterStoreStatus(result.config.filterStoreStatus);
            
            const savedIdx = result.config.index || 0;
            const safeIndex = Math.min(savedIdx, Math.max(0, processedLeads.length - 1));
            
            if (result.config.filterPlan === 'All' && result.config.filterStoreStatus === 'All') {
                    setCurrentIndex(safeIndex);
                    setSessionStartIndex(safeIndex); 
            } else {
                setCurrentIndex(0);
                setSessionStartIndex(0);
            }
        } else {
            setDailyLimit(50);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [region]);

    useEffect(() => {
        if (currentLead) {
            setNewNote('');
            setLeadStatus(currentLead.leadStatus || 'Pending');
            setNewEmail('');
            setShowAddEmail(false);
            setNoteIndex(0);
            setDateIndex(0);
            setSelectedAction(null); // Reset selected action
        }
    }, [currentLead]);

    // --- Handlers ---

    const handleSaveConfig = () => {
        setApiUrl(configUrl);
        setIsConfigOpen(false);
        loadData();
    };

    const handleFilterChange = (type: 'plan' | 'storeStatus', value: string) => {
        const newPlan = type === 'plan' ? value : filterPlan;
        const newStatus = type === 'storeStatus' ? value : filterStoreStatus;
        setFilterPlan(newPlan);
        setFilterStoreStatus(newStatus);
        setCurrentIndex(0);
        setSessionStartIndex(0); 
        saveProgressInSheet(region, 0, newPlan, newStatus);
    };

    const handleSave = async (direction: 'next' | 'prev' | 'stay', overrideStatus?: string, taskData?: { task: string, date: string }) => {
        if (!currentLead) return;
        setIsSaving(true);

        const today = new Date().toISOString().split('T')[0];
        
        // 1. Prepare Note Content with Action Tag if selected
        let finalNoteContent = newNote.trim();
        if (selectedAction) {
            // Capitalize first letter
            const actionLabel = selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1);
            // Prefix note with [Action] tag
            const actionTag = selectedAction === 'call' ? 'Llamada' : selectedAction === 'email' ? 'Email' : 'Reunión';
            finalNoteContent = `[${actionTag}] ${finalNoteContent}`;
        }

        const oldNotesList = parseHistory(currentLead.notes);
        let updatedNotesList = oldNotesList;
        if (finalNoteContent) {
            updatedNotesList = [...oldNotesList, `[${today}] ${finalNoteContent}`];
        }
        const updatedNotesStr = JSON.stringify(updatedNotesList);

        const oldDates = (currentLead.lastContact || '').split(',').filter(Boolean);
        let updatedDatesStr = currentLead.lastContact || '';
        if (oldDates[oldDates.length - 1] !== today && selectedAction) {
            updatedDatesStr = oldDates.length > 0 ? `${currentLead.lastContact},${today}` : today;
        }

        let updatedEmails = currentLead.emails || '';
        if (newEmail.trim()) {
            updatedEmails = updatedEmails ? `${updatedEmails}:${newEmail}` : newEmail;
        }

        const finalStatus = overrideStatus || leadStatus;

        const updatedLead: Lead = {
            ...currentLead,
            notes: updatedNotesStr,
            lastContact: updatedDatesStr,
            emails: updatedEmails,
            leadStatus: finalStatus,
            nextTask: taskData ? taskData.task : currentLead.nextTask,
            taskDate: taskData ? taskData.date : currentLead.taskDate
        };

        setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));

        let newIndex = currentIndex;
        if (direction === 'next' && !isDailyLimitReached) {
            newIndex = Math.min(filteredLeads.length - 1, currentIndex + 1);
        } else if (direction === 'prev') {
            newIndex = Math.max(0, currentIndex - 1);
        }

        // Send to API including metric to increment
        await updateLeadInSheet(
            region, 
            currentLead.id, 
            {
                notes: updatedNotesStr,
                lastContact: updatedDatesStr,
                leadStatus: finalStatus,
                emails: updatedEmails,
                nextTask: updatedLead.nextTask,
                taskDate: updatedLead.taskDate
            },
            {
                currentIndex: newIndex, 
                filterPlan,
                filterStoreStatus
            },
            selectedAction // Pass the metric type (call, email, meeting)
        );

        setIsSaving(false);
        setIsTaskOpen(false); 
        setCurrentIndex(newIndex);
    };

    const handleCompleteTask = async (leadId: number, taskDescription: string) => {
        setLeads(prev => prev.map(l => {
            if (l.id === leadId) {
                const oldNotesList = parseHistory(l.notes);
                const today = new Date().toISOString().split('T')[0];
                const newNote = `[✅ TAREA COMPLETADA ${today}] ${taskDescription}`;
                const updatedNotes = JSON.stringify([...oldNotesList, newNote]);
                
                return {
                    ...l,
                    nextTask: '', 
                    taskDate: '', 
                    notes: updatedNotes
                };
            }
            return l;
        }));

        await completeTaskInSheet(region, leadId, taskDescription);
    };

    const handleScheduleMeeting = (date: string, time: string) => {
        const dateTime = `${date}T${time}`;
        setNewNote(prev => `${prev}\n\n📅 Reunión agendada: ${date} a las ${time}. (Email enviado)`);
        setSelectedAction('meeting'); // Mark as meeting for saving stats
        // We trigger save immediately here potentially? 
        // For now, user still clicks "Schedule" in modal which calls this.
        // We need to trigger the save flow.
        handleSave('stay', 'Meeting', { task: `[Reunión] ${currentLead.domain}`, date: dateTime });
    };

    const handleCreateTask = (task: string, date: string) => {
        handleSave('stay', undefined, { task, date });
    };

    const handleSelectLeadFromTasks = (leadId: number) => {
        const index = filteredLeads.findIndex(l => l.id === leadId);
        if (index !== -1) {
            setCurrentIndex(index);
            setView('leads');
        } else {
            alert("El lead seleccionado no está visible en los filtros actuales o ya es una Venta.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white">
                <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
                <h2 className="text-xl font-bold">Cargando CRM...</h2>
            </div>
        );
    }

    if (error || !getApiUrl()) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white p-4">
                <GlassCard className="max-w-md w-full p-8 text-center border-red-500/50 bg-red-900/10">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-white">Problema de Conexión</h2>
                    <p className="text-gray-300 text-sm mb-6">{error || "No se ha configurado la URL de la API."}</p>
                    <button 
                        onClick={() => { setConfigUrl(getApiUrl() || ''); setIsConfigOpen(true); }} 
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-sm flex items-center justify-center gap-2 mb-3"
                    >
                        <Settings size={18} /> Configurar Conexión
                    </button>
                    <button onClick={loadData} className="w-full px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm flex items-center justify-center gap-2">
                        <RefreshCw size={16} /> Reintentar
                    </button>
                </GlassCard>
                {isConfigOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <GlassCard className="w-full max-w-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Configuración de API</h3>
                            <p className="text-sm text-gray-400 mb-4">Pega aquí la URL de tu Web App de Google Apps Script.</p>
                            <input 
                                type="text" 
                                value={configUrl}
                                onChange={(e) => setConfigUrl(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white mb-4 text-xs font-mono"
                            />
                            <div className="flex gap-2 justify-end">
                                <button onClick={() => setIsConfigOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                                <button onClick={handleSaveConfig} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold">Guardar</button>
                            </div>
                        </GlassCard>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col">
            <header className="bg-[#1e293b] border-b border-white/10 px-4 md:px-6 py-4 sticky top-0 z-50 shadow-xl">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="w-full md:w-auto flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                                <Briefcase size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg leading-none tracking-tight">ABU Manager</h1>
                                <span className="text-xs text-blue-300 font-medium">{currentUser} • {region === 'spain' ? 'España' : 'México'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:hidden">
                            {view === 'leads' && (
                                <button onClick={() => setShowFilters(!showFilters)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"><Filter size={20} /></button>
                            )}
                            <button onClick={() => { setConfigUrl(getApiUrl() || ''); setIsConfigOpen(true); }} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"><Settings size={20} /></button>
                        </div>
                    </div>

                    <div className="flex bg-[#0f172a] p-1 rounded-lg border border-white/10 w-full md:w-auto justify-center md:justify-start">
                        <button onClick={() => setView('leads')} className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-bold transition-all ${view === 'leads' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}><Users size={16} className="inline mr-2" /> <span className="hidden sm:inline">Leads</span></button>
                        <button onClick={() => setView('stats')} className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-bold transition-all ${view === 'stats' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}><PieChart size={16} className="inline mr-2" /> <span className="hidden sm:inline">Métricas</span></button>
                        <button onClick={() => setView('tasks')} className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-bold transition-all ${view === 'tasks' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}><CheckSquare size={16} className="inline mr-2" /> <span className="hidden sm:inline">Tareas</span></button>
                    </div>

                    {view === 'leads' && (
                        <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-stretch md:items-center gap-4 bg-[#0f172a]/50 p-2 rounded-xl border border-white/5`}>
                            <div className="flex items-center gap-2 px-2 border-r border-white/10">
                                <Database size={16} className="text-gray-400" />
                                <select value={region} onChange={(e) => setRegion(e.target.value as Region)} className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer hover:text-blue-300 w-full md:w-auto">
                                    <option value="spain">España</option>
                                    <option value="mexico">México</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 uppercase font-bold whitespace-nowrap">Plan:</span>
                                <select value={filterPlan} onChange={(e) => handleFilterChange('plan', e.target.value)} className="w-full md:w-auto bg-white/5 border border-white/10 rounded-md text-xs py-1 px-2 text-white">
                                    {uniquePlans.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 uppercase font-bold whitespace-nowrap">Tienda:</span>
                                <select value={filterStoreStatus} onChange={(e) => handleFilterChange('storeStatus', e.target.value)} className="w-full md:w-auto bg-white/5 border border-white/10 rounded-md text-xs py-1 px-2 text-white">
                                    {uniqueStoreStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    )}
                    
                    <div className="hidden md:flex items-center gap-2">
                        <button onClick={() => { setConfigUrl(getApiUrl() || ''); setIsConfigOpen(true); }} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Configurar API"><Settings size={20} /></button>
                        <button onClick={onLogout} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"><LogOut size={20} /></button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-8 flex-grow w-full">
                {view === 'stats' && <StatsView stats={stats} />}
                
                {view === 'tasks' && (
                    <TasksView leads={leads} onSelectLead={handleSelectLeadFromTasks} onCompleteTask={handleCompleteTask} />
                )}
                
                {view === 'leads' && (
                    <>
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {region === 'spain' ? '🇪🇸 Base de Datos España' : '🇲x Base de Datos México'}
                                </h2>
                                <p className="text-gray-400 text-sm">Filtrado: {filteredLeads.length} leads</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Objetivo Diario</div>
                                <div className="flex items-baseline justify-end gap-1">
                                    <span className="text-4xl font-bold text-blue-500">{leadsProcessedToday}</span>
                                    <span className="text-xl text-gray-500 font-medium">/ {dailyLimit === null ? <Loader2 size={16} className="inline animate-spin text-gray-600" /> : dailyLimit}</span>
                                </div>
                                {dailyLimit !== null && <div className="text-xs text-green-400 font-bold mt-1">{leadsRemainingToday} restantes hoy</div>}
                            </div>
                        </div>

                        {isEmpty ? (
                            <GlassCard className="text-center p-12">
                                <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Filter size={32} className="text-gray-400" /></div>
                                <h3 className="text-xl font-bold mb-2">Sin resultados</h3>
                                <p className="text-gray-400 mb-4">No hay leads que coincidan con los filtros seleccionados.</p>
                                {!hasRawData && (
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg text-left text-sm max-w-lg mx-auto">
                                        <p className="font-bold text-yellow-400 mb-1">⚠️ Diagnóstico:</p>
                                        <p className="text-gray-300">La conexión con Google Sheets fue exitosa, pero devolvió 0 filas.</p>
                                    </div>
                                )}
                            </GlassCard>
                        ) : isFinished ? (
                             <GlassCard className="text-center p-12 animate-in fade-in zoom-in duration-500 border-green-500/30 bg-green-900/10">
                                {isDailyLimitReached ? (
                                    <>
                                        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Lock size={40} className="text-yellow-500" /></div>
                                        <h2 className="text-3xl font-bold mb-4">Límite Diario Alcanzado</h2>
                                        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                                            <button onClick={() => setCurrentIndex(sessionStartIndex)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors flex items-center justify-center gap-2"><RotateCcw size={18} /> Revisar Leads de Hoy</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-green-500" /></div>
                                        <h2 className="text-3xl font-bold mb-4">¡Lista Completada!</h2>
                                        <button onClick={() => setCurrentIndex(0)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors">Volver al inicio</button>
                                    </>
                                )}
                            </GlassCard>
                        ) : (
                            <div className="grid lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    {currentLead.nextTask && (
                                        <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-xl mb-2 flex justify-between items-start animate-in slide-in-from-left-2">
                                            <div>
                                                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1 flex items-center gap-2"><CheckSquare size={12} /> Tarea Pendiente</div>
                                                <div className="text-white font-medium text-sm">{currentLead.nextTask}</div>
                                                {currentLead.taskDate && <div className="text-gray-400 text-xs mt-1 flex items-center gap-1"><Clock size={10} />{new Date(currentLead.taskDate).toLocaleString()}</div>}
                                            </div>
                                            <button onClick={() => handleCompleteTask(currentLead.id, currentLead.nextTask!)} className="p-2 bg-purple-500/20 hover:bg-green-500/20 text-purple-300 hover:text-green-400 rounded-lg transition-colors" title="Completar Tarea"><CheckCircle size={20} /></button>
                                        </div>
                                    )}

                                    <GlassCard className="p-8 border-t-4 border-t-blue-500 shadow-2xl relative overflow-hidden">
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${currentLead.storeStatus === 'Active' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>Tienda: {currentLead.storeStatus}</span>
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">Plan: {currentLead.plan}</span>
                                                </div>
                                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-all">{currentLead.domain}</h2>
                                                <div className="text-sm text-gray-400 mt-1">Alta: {formatDate(currentLead.created)}</div>
                                            </div>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:border-blue-500/30 transition-colors">
                                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Globe size={20} /></div>
                                                <div className="flex-grow"><a href={`https://${currentLead.domain}`} target="_blank" rel="noreferrer" className="text-lg text-blue-300 hover:underline">{currentLead.domain}</a></div>
                                                <a href={`https://${currentLead.domain}`} target="_blank" rel="noreferrer" className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><ArrowRight size={16} /></a>
                                            </div>

                                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors">
                                                <div className="flex items-start gap-4 mb-2">
                                                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><Mail size={20} /></div>
                                                    <div className="flex-grow">
                                                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Emails</label>
                                                        <div className="flex flex-col gap-2">
                                                            {currentLead.emails && currentLead.emails.trim() !== '' ? (
                                                                currentLead.emails.split(':').map((email, idx) => (
                                                                    <div key={idx} className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-white text-sm break-all flex items-center justify-between group">
                                                                        <span>{email.trim()}</span>
                                                                        <a href={`mailto:${email.trim()}`} className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-300 transition-opacity"><Mail size={14}/></a>
                                                                    </div>
                                                                ))
                                                            ) : ( <div className="text-gray-500 italic text-sm">Sin emails</div> )}
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setShowAddEmail(!showAddEmail)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white" title="Añadir Email"><Plus size={16} /></button>
                                                </div>
                                                {showAddEmail && (
                                                    <div className="ml-12 mt-2 flex gap-2 animate-in slide-in-from-top-2">
                                                        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="nuevo@email.com" className="flex-grow bg-[#0f172a] border border-white/10 rounded px-2 py-1 text-sm text-white"/>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><Phone size={20} /></div>
                                                    <div className="flex-grow">
                                                        <label className="block text-[10px] uppercase font-bold text-gray-500">Teléfono</label>
                                                        {currentLead.phones ? <div className="text-2xl font-mono text-white">{currentLead.phones}</div> : <div className="flex items-center gap-2 mt-1"><span className="text-gray-500 italic text-sm">No disponible</span></div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <GlassCard className="p-4 bg-white/5 min-h-[200px] flex flex-col">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-gray-400 uppercase">Historial Notas ({currentNotesHistory.length})</span>
                                                <div className="flex gap-1">
                                                    <button onClick={() => setNoteIndex(prev => Math.min(prev + 1, currentNotesHistory.length - 1))} disabled={noteIndex >= currentNotesHistory.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ChevronLeft size={16} /></button>
                                                    <button onClick={() => setNoteIndex(prev => Math.max(prev - 1, 0))} disabled={noteIndex <= 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ChevronRight size={16} /></button>
                                                </div>
                                            </div>
                                            {currentNotesHistory.length > 0 ? (
                                                <div className="flex-grow bg-[#0f172a]/50 p-3 rounded-lg border border-white/5 overflow-y-auto">
                                                    <NoteRenderer note={currentNotesHistory[noteIndex]} />
                                                </div>
                                            ) : (
                                                <div className="text-gray-500 text-sm italic">Sin notas previas</div>
                                            )}
                                        </GlassCard>

                                        <div className="flex flex-col gap-4">
                                            {/* AI Window */}
                                            <AIEnrichment domain={currentLead.domain} />
                                            
                                            <GlassCard className="p-4 bg-white/5 flex flex-col flex-grow justify-center">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-bold text-gray-400 uppercase">Contactos Previos</span>
                                                    <div className="flex gap-1">
                                                         <button onClick={() => setDateIndex(prev => Math.min(prev + 1, currentDatesHistory.length - 1))} disabled={dateIndex >= currentDatesHistory.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ChevronLeft size={16} /></button>
                                                         <button onClick={() => setDateIndex(prev => Math.max(prev - 1, 0))} disabled={dateIndex <= 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ChevronRight size={16} /></button>
                                                    </div>
                                                </div>
                                                 {currentDatesHistory.length > 0 ? <div className="flex-grow flex items-center justify-center text-sm font-medium text-blue-300 bg-[#0f172a]/50 rounded-lg border border-white/5 py-4">{formatDate(currentDatesHistory[dateIndex])}</div> : <div className="text-gray-500 text-sm italic py-4">Nunca contactado</div>}
                                            </GlassCard>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-1 flex flex-col gap-4">
                                    <GlassCard className="p-6 flex-grow flex flex-col bg-blue-900/5">
                                        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Save size={16} className="text-blue-400" /> Gestión del Lead</h3>
                                        
                                        <div className="space-y-4 flex-grow">
                                            {/* Action Type Selector */}
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Acción Realizada</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <button 
                                                        onClick={() => setSelectedAction('call')} 
                                                        className={`p-2 rounded-lg border flex flex-col items-center justify-center text-xs font-bold transition-all ${selectedAction === 'call' ? 'bg-green-600 border-green-500 text-white' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
                                                    >
                                                        <Phone size={16} className="mb-1" /> Llamar
                                                    </button>
                                                    <button 
                                                        onClick={() => setSelectedAction('email')} 
                                                        className={`p-2 rounded-lg border flex flex-col items-center justify-center text-xs font-bold transition-all ${selectedAction === 'email' ? 'bg-orange-600 border-orange-500 text-white' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
                                                    >
                                                        <Mail size={16} className="mb-1" /> Email
                                                    </button>
                                                    <button 
                                                        onClick={() => setSelectedAction('meeting')} 
                                                        className={`p-2 rounded-lg border flex flex-col items-center justify-center text-xs font-bold transition-all ${selectedAction === 'meeting' ? 'bg-yellow-600 border-yellow-500 text-white' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
                                                    >
                                                        <Video size={16} className="mb-1" /> Reunión
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Estado Actual</label>
                                                <select value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)} className={`w-full p-3 rounded-xl border font-bold focus:outline-none ${leadStatus === 'Sale' ? 'bg-green-500/20 border-green-500 text-green-400' : leadStatus === 'Meeting' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-[#0f172a] border-white/10 text-white'}`}>
                                                    <option value="Pending">Pendiente</option>
                                                    <option value="Interested">Interesado</option>
                                                    <option value="Meeting">Reunión Agendada</option>
                                                    <option value="Sale">Venta Cerrada</option>
                                                    <option value="Rejected">Rechazado</option>
                                                </select>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Notas de la Acción</label>
                                                <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} className="w-full h-24 bg-[#0f172a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none placeholder-gray-600" placeholder="Resultado de la llamada, detalles del email..."/>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <button onClick={() => setIsCalendarOpen(true)} className="p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex flex-col items-center justify-center text-yellow-400 transition-colors"><CalendarIcon size={20} className="mb-1" /><span className="text-xs font-bold">Agendar</span></button>
                                                <button onClick={() => { setLeadStatus('Sale'); handleSave('next', 'Sale'); }} className="p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-xl flex flex-col items-center justify-center text-green-400 transition-colors"><CheckCircle size={20} className="mb-1" /><span className="text-xs font-bold">Venta</span></button>
                                                <button onClick={() => setIsTaskOpen(true)} className="col-span-2 p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center gap-2 text-purple-400 transition-colors"><CheckSquare size={16} /><span className="text-xs font-bold">Crear Tarea</span></button>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3 mt-6">
                                            <button onClick={() => handleSave('prev')} disabled={isSaving || currentIndex === 0} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                                {isSaving ? <Loader2 size={20} className="animate-spin" /> : <><ChevronLeft size={20} /><span>Anterior</span></>}
                                            </button>
                                            <button onClick={() => handleSave('next')} disabled={isSaving} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg transform active:scale-95 disabled:opacity-50 disabled:cursor-wait">
                                                {isSaving ? <Loader2 size={20} className="animate-spin" /> : <><span>Siguiente</span><ArrowRight size={20} /></>}
                                            </button>
                                        </div>
                                    </GlassCard>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
            
            <div className="md:hidden sticky bottom-0 w-full bg-[#1e293b] border-t border-white/10 p-4 z-40 flex justify-center">
                 <button onClick={onLogout} className="flex items-center gap-2 text-red-400 font-bold hover:text-red-300 transition-colors">
                     <LogOut size={20} /><span>Cerrar Sesión</span>
                 </button>
            </div>

            {isConfigOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <GlassCard className="w-full max-w-lg p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Configuración de API</h3>
                        <p className="text-sm text-gray-400 mb-4">Pega aquí la URL de tu Web App de Google Apps Script.</p>
                        <input type="text" value={configUrl} onChange={(e) => setConfigUrl(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white mb-4 text-xs font-mono" />
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setIsConfigOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                            <button onClick={handleSaveConfig} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold">Guardar</button>
                        </div>
                    </GlassCard>
                </div>
            )}

            <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} leadEmail={currentLead?.emails?.split(':')[0] || ''} onSchedule={handleScheduleMeeting} />
            <TaskModal isOpen={isTaskOpen} onClose={() => setIsTaskOpen(false)} onSave={handleCreateTask} isSaving={isSaving} />
        </div>
    );
};

export default Dashboard;
