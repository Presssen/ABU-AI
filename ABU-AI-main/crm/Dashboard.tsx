import React, { useState, useEffect, useMemo } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Phone, Globe, Mail, ArrowRight, CheckCircle, LogOut, Briefcase, Filter, Search, Save, Database, Loader2, AlertTriangle, RefreshCw, Calendar as CalendarIcon, PieChart, Users, ChevronLeft, ChevronRight, Plus, CheckSquare, Lock, Clock, RotateCcw, Settings, Video, Shield, User, ChevronDown } from 'lucide-react';
import { Lead, Region, DashboardStats, ActionType } from './types';
import { fetchLeadsFromSheet, updateLeadInSheet, saveProgressInSheet, completeTaskInSheet, getApiUrl, setApiUrl } from './api/googleSheets';
import { StatsView } from './components/StatsView';
import { TasksView } from './components/TasksView';
import { AdminPanel } from './components/AdminPanel';
import { CalendarModal } from './components/CalendarModal';
import { TaskModal } from './components/TaskModal';
import { AIEnrichment } from './components/AIEnrichment';
import { ProfilePage } from './components/ProfilePage';
import { AddLeadModal } from './components/AddLeadModal';

interface DashboardProps {
    currentUser: string;
    onLogout: () => void;
}

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

const NoteRenderer: React.FC<{ note: string }> = ({ note }) => {
    const parts = note.split(/(\[.*?\])/g);
    return (
        <div className="mb-2 last:mb-0 leading-relaxed break-words">
            {parts.map((part, index) => {
                if (part.startsWith('[') && part.endsWith(']')) {
                    const content = part.slice(1, -1);
                    let bgClass = "bg-gray-700 text-gray-300";
                    if (content.toLowerCase().includes('llamada')) bgClass = "bg-green-500/20 text-green-300 border border-green-500/30";
                    else if (content.toLowerCase().includes('email')) bgClass = "bg-orange-500/20 text-orange-300 border border-orange-500/30";
                    else if (content.toLowerCase().includes('reunión')) bgClass = "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
                    else if (content.toLowerCase().includes('tarea completada')) bgClass = "bg-purple-500/20 text-purple-300 border border-purple-500/30";
                    else if (content.match(/\d{4}-\d{2}-\d{2}/)) bgClass = "bg-blue-500/20 text-blue-300 border border-blue-500/30"; 
                    return <span key={index} className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mr-1 mb-1 align-middle ${bgClass}`}>{content}</span>;
                }
                return <span key={index} className="text-gray-300 text-sm align-middle">{part}</span>;
            })}
        </div>
    );
};

const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { return dateStr; }
};

const Dashboard: React.FC<DashboardProps> = ({ currentUser, onLogout }) => {
    const [view, setView] = useState<'leads' | 'stats' | 'tasks' | 'admin' | 'profile'>('leads');
    const [region, setRegion] = useState<Region>('spain');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [dailyLimit, setDailyLimit] = useState<number | null>(null);
    const [sessionStartIndex, setSessionStartIndex] = useState(0);
    const [filterPlan, setFilterPlan] = useState<string>('All');
    const [filterStoreStatus, setFilterStoreStatus] = useState<string>('All');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [newNote, setNewNote] = useState('');
    const [leadStatus, setLeadStatus] = useState(''); 
    const [newEmail, setNewEmail] = useState('');
    const [showAddEmail, setShowAddEmail] = useState(false);
    const [selectedAction, setSelectedAction] = useState<ActionType>(null);
    const [noteIndex, setNoteIndex] = useState(0);
    const [dateIndex, setDateIndex] = useState(0);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
    const [configUrl, setConfigUrl] = useState('');

    const isAdmin = currentUser === 'Admin';

    const uniquePlans = useMemo(() => {
        const plans = new Set(leads.map(l => l.plan ? l.plan.trim() : 'Shopify'));
        return ['All', ...Array.from(plans).filter(Boolean).sort()];
    }, [leads]);

    const uniqueStoreStatuses = useMemo(() => {
        const statuses = new Set(leads.map(l => l.storeStatus ? l.storeStatus.trim() : ''));
        return ['All', ...Array.from(statuses).filter(Boolean).sort()];
    }, [leads]);

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
    const effectiveLimit = dailyLimit ?? 50; 
    const leadsProcessedToday = Math.max(0, currentIndex - sessionStartIndex);
    const isDailyLimitReached = isAdmin ? false : leadsProcessedToday >= effectiveLimit;
    const isFinished = (currentIndex >= filteredLeads.length) || (!isAdmin && dailyLimit !== null && isDailyLimitReached);
    const isEmpty = filteredLeads.length === 0 && !loading && !error;

    const currentNotesHistory = useMemo(() => currentLead ? parseHistory(currentLead.notes).reverse() : [], [currentLead]);
    const currentDatesHistory = useMemo(() => currentLead && currentLead.lastContact ? currentLead.lastContact.split(',').filter(Boolean).reverse() : [], [currentLead]);

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

    const navItems = [
        { id: 'leads', label: 'Leads', icon: Users },
        { id: 'stats', label: 'Métricas', icon: PieChart },
        { id: 'tasks', label: 'Tareas', icon: CheckSquare },
        ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield }] : []),
        { id: 'profile', label: 'Perfil', icon: User },
    ];

    const loadData = async () => {
        const url = getApiUrl();
        if (!url) { setError("URL de API no configurada."); setLoading(false); return; }
        setLoading(true); setError(null); setDailyLimit(null);
        const result = await fetchLeadsFromSheet(region);
        if (result.error && !result.leads.length) { setError(result.error); setLeads([]); setLoading(false); return; }
        const processedLeads = result.leads.map(l => ({ ...l, plan: l.plan && l.plan.trim() !== '' ? l.plan : 'Shopify' }));
        setLeads(processedLeads);
        if (result.config) {
            setDailyLimit(result.config.dailyLimit);
            if (result.config.filterPlan) setFilterPlan(result.config.filterPlan);
            if (result.config.filterStoreStatus) setFilterStoreStatus(result.config.filterStoreStatus);
            const savedIdx = result.config.index || 0;
            const safeIndex = Math.min(savedIdx, Math.max(0, processedLeads.length - 1));
            if (result.config.filterPlan === 'All' && result.config.filterStoreStatus === 'All') { setCurrentIndex(safeIndex); setSessionStartIndex(safeIndex); } 
            else { setCurrentIndex(0); setSessionStartIndex(0); }
        } else { setDailyLimit(50); }
        setLoading(false);
    };

    useEffect(() => { loadData(); }, [region]);

    useEffect(() => {
        if (currentLead) {
            setNewNote('');
            setLeadStatus(currentLead.leadStatus || 'Pending');
            setNewEmail('');
            setShowAddEmail(false);
            setNoteIndex(0);
            setDateIndex(0);
            setSelectedAction(null); 
        }
    }, [currentLead]);

    const handleSaveConfig = () => { setApiUrl(configUrl); setIsConfigOpen(false); loadData(); };

    const handleFilterChange = (type: 'plan' | 'storeStatus', value: string) => {
        if (type === 'plan') setFilterPlan(value);
        if (type === 'storeStatus') setFilterStoreStatus(value);
        setCurrentIndex(0); setSessionStartIndex(0); 
        saveProgressInSheet(region, 0, type === 'plan' ? value : filterPlan, type === 'storeStatus' ? value : filterStoreStatus);
    };

    const handleSave = async (direction: 'next' | 'prev' | 'stay', overrideStatus?: string, taskData?: { task: string, date: string }) => {
        if (!currentLead) return;
        setIsSaving(true);
        const today = new Date().toISOString().split('T')[0];
        let finalNoteContent = newNote.trim();
        if (selectedAction) {
            const actionTag = selectedAction === 'call' ? 'Llamada' : selectedAction === 'email' ? 'Email' : 'Reunión';
            finalNoteContent = `[${actionTag}] ${finalNoteContent}`;
        }
        const oldNotesList = parseHistory(currentLead.notes);
        let updatedNotesList = oldNotesList;
        if (finalNoteContent) { updatedNotesList = [...oldNotesList, `[${today}] ${finalNoteContent}`]; }
        const updatedNotesStr = JSON.stringify(updatedNotesList);
        const oldDates = (currentLead.lastContact || '').split(',').filter(Boolean);
        let updatedDatesStr = currentLead.lastContact || '';
        if (oldDates[oldDates.length - 1] !== today && selectedAction) { updatedDatesStr = oldDates.length > 0 ? `${currentLead.lastContact},${today}` : today; }
        let updatedEmails = currentLead.emails || '';
        if (newEmail.trim()) { updatedEmails = updatedEmails ? `${updatedEmails}:${newEmail}` : newEmail; }
        const finalStatus = overrideStatus || leadStatus;
        const updatedLead: Lead = { ...currentLead, notes: updatedNotesStr, lastContact: updatedDatesStr, emails: updatedEmails, leadStatus: finalStatus, nextTask: taskData ? taskData.task : currentLead.nextTask, taskDate: taskData ? taskData.date : currentLead.taskDate };
        setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
        let newIndex = currentIndex;
        if (direction === 'next' && !isDailyLimitReached) { newIndex = Math.min(filteredLeads.length - 1, currentIndex + 1); } 
        else if (direction === 'prev') { newIndex = Math.max(0, currentIndex - 1); }
        await updateLeadInSheet(region, currentLead.id, { notes: updatedNotesStr, lastContact: updatedDatesStr, leadStatus: finalStatus, emails: updatedEmails, nextTask: updatedLead.nextTask, taskDate: updatedLead.taskDate, assignedTo: currentLead.assignedTo }, { currentIndex: newIndex, filterPlan, filterStoreStatus }, selectedAction);
        setIsSaving(false); setIsTaskOpen(false); setCurrentIndex(newIndex);
    };

    const handleCompleteTask = async (leadId: number, taskDescription: string) => {
        setLeads(prev => prev.map(l => {
            if (l.id === leadId) {
                const oldNotesList = parseHistory(l.notes);
                const today = new Date().toISOString().split('T')[0];
                const newNote = `[✅ TAREA COMPLETADA ${today}] ${taskDescription}`;
                const updatedNotes = JSON.stringify([...oldNotesList, newNote]);
                return { ...l, nextTask: '', taskDate: '', notes: updatedNotes };
            }
            return l;
        }));
        await completeTaskInSheet(region, leadId, taskDescription);
    };

    const handleScheduleMeeting = (date: string, time: string) => {
        const dateTime = `${date}T${time}`;
        setNewNote(prev => `${prev}\n\n📅 Reunión agendada: ${date} a las ${time}. (Email enviado)`);
        setSelectedAction('meeting'); 
        handleSave('stay', 'Meeting', { task: `[Reunión] ${currentLead.domain}`, date: dateTime });
    };

    const handleCreateTask = (task: string, date: string) => { handleSave('stay', undefined, { task, date }); };

    const handleSelectLeadFromTasks = (leadId: number) => {
        const index = filteredLeads.findIndex(l => l.id === leadId);
        if (index !== -1) { setCurrentIndex(index); setView('leads'); } 
        else { alert("El lead seleccionado no está visible."); }
    };

    if (loading) return <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white"><Loader2 size={48} className="animate-spin text-blue-500 mb-4" /><h2 className="text-xl font-bold">Cargando CRM...</h2></div>;

    if (error || !getApiUrl()) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white p-4">
                <GlassCard className="max-w-md w-full p-8 text-center border-red-500/50 bg-red-900/10">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500"><AlertTriangle size={32} /></div>
                    <h2 className="text-xl font-bold mb-2">Problema de Conexión</h2>
                    <p className="text-gray-300 text-sm mb-6">{error || "No se ha configurado la URL de la API."}</p>
                    <button onClick={() => { setConfigUrl(getApiUrl() || ''); setIsConfigOpen(true); }} className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-50 rounded-lg font-bold text-sm flex items-center justify-center gap-2 mb-3"><Settings size={18} /> Configurar Conexión</button>
                    <button onClick={loadData} className="w-full px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm flex items-center justify-center gap-2"><RefreshCw size={16} /> Reintentar</button>
                </GlassCard>
                {isConfigOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <GlassCard className="w-full max-w-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Configuración de API</h3>
                            <input type="text" value={configUrl} onChange={(e) => setConfigUrl(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-3 text-white mb-4 text-xs font-mono" />
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
                    <div className="w-full md:w-auto flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20"><Briefcase size={20} className="text-white" /></div>
                            <div>
                                <h1 className="font-bold text-lg leading-none tracking-tight">ABU Manager</h1>
                                <span className="text-xs text-blue-300 font-medium flex items-center gap-1">{currentUser} {isAdmin && <Shield size={10} className="text-yellow-400"/>} • {region === 'spain' ? 'España' : 'México'}</span>
                            </div>
                        </div>
                        <div className="md:hidden relative flex-grow flex justify-end">
                             <div className="relative z-50">
                                <button onClick={() => setIsNavOpen(!isNavOpen)} className="bg-[#0f172a] border border-white/10 px-3 py-2 rounded-lg flex items-center gap-2 text-white font-bold text-sm">
                                    {React.createElement(navItems.find(i => i.id === view)?.icon || Users, { size: 16 })}
                                    <span>{navItems.find(i => i.id === view)?.label}</span>
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${isNavOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isNavOpen && (
                                    <div className="absolute top-full right-0 w-48 mt-2 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
                                        {navItems.map(item => (
                                            <button key={item.id} onClick={() => { setView(item.id as any); setIsNavOpen(false); }} className={`w-full p-3 flex items-center gap-3 text-sm font-bold transition-colors ${view === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><item.icon size={16} />{item.label}</button>
                                        ))}
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>

                    <div className="hidden md:flex bg-[#0f172a] p-1 rounded-lg border border-white/10">
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => setView(item.id as any)} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${view === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><item.icon size={16} /> {item.label}</button>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <button onClick={() => { setConfigUrl(getApiUrl() || ''); setIsConfigOpen(true); }} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"><Settings size={20} /></button>
                        <button onClick={onLogout} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"><LogOut size={20} /></button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-8 flex-grow w-full">
                {view === 'admin' && isAdmin ? <AdminPanel leads={leads} region={region} onUpdate={loadData} /> : view === 'stats' ? <StatsView stats={stats} /> : view === 'tasks' ? <TasksView leads={leads} onSelectLead={handleSelectLeadFromTasks} onCompleteTask={handleCompleteTask} /> : view === 'profile' ? <ProfilePage currentUser={currentUser} role={isAdmin ? 'admin' : 'agent'} /> : (
                    <>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex justify-between items-end">
                                <div><h2 className="text-2xl font-bold text-white">{region === 'spain' ? '🇪🇸 Base de Datos España' : '🇲x Base de Datos México'}</h2><p className="text-gray-400 text-sm">Filtrado: {filteredLeads.length} leads</p></div>
                                <div className="flex items-end gap-4"><button onClick={() => setIsAddLeadOpen(true)} className="bg-green-600 hover:bg-green-500 text-white p-2 md:px-4 md:py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-green-500/20"><Plus size={20} /><span className="hidden md:inline">Añadir Lead</span></button></div>
                            </div>

                            <GlassCard className="p-3 bg-white/5">
                                <div className="flex md:hidden justify-between items-center cursor-pointer" onClick={() => setShowMobileFilters(!showMobileFilters)}><div className="flex items-center gap-2 px-2 text-gray-300"><Filter size={18} /><span className="font-bold text-sm">Filtros</span></div><ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${showMobileFilters ? 'rotate-180' : ''}`} /></div>
                                <div className={`${showMobileFilters ? 'flex flex-col gap-4 mt-4' : 'hidden'} md:flex md:flex-row md:items-center md:gap-4`}>
                                    <div className="flex items-center gap-2 px-2 border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0"><Database size={16} className="text-gray-500" /><select value={region} onChange={(e) => setRegion(e.target.value as Region)} className="bg-transparent text-sm font-bold text-white focus:outline-none w-full md:w-auto"><option value="spain">España</option><option value="mexico">México</option></select></div>
                                    <div className="grid grid-cols-2 md:flex gap-4 flex-grow">
                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2"><span className="text-[10px] text-gray-500 uppercase font-bold">Plan:</span><select value={filterPlan} onChange={(e) => handleFilterChange('plan', e.target.value)} className="bg-[#0f172a] border border-white/10 rounded-md text-xs py-1.5 px-2 text-white outline-none">{uniquePlans.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2"><span className="text-[10px] text-gray-500 uppercase font-bold">Tienda:</span><select value={filterStoreStatus} onChange={(e) => handleFilterChange('storeStatus', e.target.value)} className="bg-[#0f172a] border border-white/10 rounded-md text-xs py-1.5 px-2 text-white outline-none">{uniqueStoreStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {isEmpty ? <GlassCard className="text-center p-12"><div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Filter size={32} className="text-gray-400" /></div><h3 className="text-xl font-bold mb-2">Sin resultados</h3></GlassCard> : isFinished ? <GlassCard className="text-center p-12 animate-in fade-in zoom-in duration-500 border-green-500/30 bg-green-900/10"><div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Lock size={40} className="text-yellow-500" /></div><h2 className="text-3xl font-bold mb-4">Objetivo Completado</h2><button onClick={() => setCurrentIndex(sessionStartIndex)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors flex items-center justify-center gap-2"><RotateCcw size={18} /> Revisar Hoy</button></GlassCard> : (
                            <div className="grid lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    <GlassCard className="p-8 border-t-4 border-t-blue-500 shadow-2xl relative overflow-hidden">
                                        <div className="flex justify-between items-start mb-8"><div><div className="flex items-center gap-2 mb-2"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${currentLead.storeStatus === 'Active' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>Tienda: {currentLead.storeStatus}</span><span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">Plan: {currentLead.plan}</span></div><h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-all">{currentLead.domain}</h2></div></div>
                                        <div className="grid gap-4">
                                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:border-blue-500/30 transition-colors"><div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Globe size={20} /></div><div className="flex-grow"><a href={`https://${currentLead.domain}`} target="_blank" rel="noreferrer" className="text-lg text-blue-300 hover:underline">{currentLead.domain}</a></div></div>
                                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors"><div className="flex items-start gap-4 mb-2"><div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><Mail size={20} /></div><div className="flex-grow"><label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Emails</label><div className="flex flex-col gap-2">{currentLead.emails && currentLead.emails.trim() !== '' ? currentLead.emails.split(':').map((email, idx) => (<div key={idx} className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-white text-sm break-all flex items-center justify-between"><span>{email.trim()}</span></div>)) : <div className="text-gray-500 italic text-sm">Sin emails</div>}</div></div><button onClick={() => setShowAddEmail(!showAddEmail)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Plus size={16} /></button></div>{showAddEmail && <div className="ml-12 mt-2 flex gap-2 animate-in slide-in-from-top-2"><input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="nuevo@email.com" className="flex-grow bg-[#0f172a] border border-white/10 rounded px-2 py-1 text-sm text-white"/></div>}</div>
                                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors"><div className="flex items-center gap-4"><div className="p-2 bg-green-500/10 rounded-lg text-green-400"><Phone size={20} /></div><div className="flex-grow"><label className="block text-[10px] uppercase font-bold text-gray-500">Teléfono</label>{currentLead.phones ? <a href={`tel:${currentLead.phones}`} className="text-2xl font-mono text-white hover:text-green-400">{currentLead.phones}</a> : <div className="text-gray-500 italic text-sm">No disponible</div>}</div></div></div>
                                        </div>
                                    </GlassCard>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <GlassCard className="p-4 bg-white/5 min-h-[200px] flex flex-col"><div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-gray-400 uppercase">Historial</span><div className="flex gap-1"><button onClick={() => setNoteIndex(prev => Math.min(prev + 1, currentNotesHistory.length - 1))} disabled={noteIndex >= currentNotesHistory.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ChevronLeft size={16} /></button><button onClick={() => setNoteIndex(prev => Math.max(prev - 1, 0))} disabled={noteIndex <= 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ChevronRight size={16} /></button></div></div>{currentNotesHistory.length > 0 ? <div className="flex-grow bg-[#0f172a]/50 p-3 rounded-lg border border-white/5 overflow-y-auto"><NoteRenderer note={currentNotesHistory[noteIndex]} /></div> : <div className="text-gray-500 text-sm italic">Sin notas</div>}</GlassCard>
                                        <div className="flex flex-col gap-4"><AIEnrichment domain={currentLead.domain} /><GlassCard className="p-4 bg-white/5 flex flex-col flex-grow justify-center"><div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-gray-400 uppercase">Último Contacto</span></div>{currentDatesHistory.length > 0 ? <div className="flex-grow flex items-center justify-center text-sm font-medium text-blue-300 bg-[#0f172a]/50 rounded-lg border border-white/5 py-4">{formatDate(currentDatesHistory[dateIndex])}</div> : <div className="text-gray-500 text-sm italic py-4 text-center">Nunca</div>}</GlassCard></div>
                                    </div>
                                </div>
                                <div className="lg:col-span-1 flex flex-col gap-4">
                                    <GlassCard className="p-6 flex-grow flex flex-col bg-blue-900/5">
                                        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Save size={16} className="text-blue-400" /> Gestión</h3>
                                        <div className="space-y-4 flex-grow">
                                            <div><label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Acción</label><div className="grid grid-cols-3 gap-2"><button onClick={() => setSelectedAction('call')} className={`p-2 rounded-lg border flex flex-col items-center justify-center text-xs font-bold transition-all ${selectedAction === 'call' ? 'bg-green-600 border-green-500 text-white' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:text-white'}`}><Phone size={16} className="mb-1" /> Llamar</button><button onClick={() => setSelectedAction('email')} className={`p-2 rounded-lg border flex flex-col items-center justify-center text-xs font-bold transition-all ${selectedAction === 'email' ? 'bg-orange-600 border-orange-500 text-white' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:text-white'}`}><Mail size={16} className="mb-1" /> Email</button><button onClick={() => setSelectedAction('meeting')} className={`p-2 rounded-lg border flex flex-col items-center justify-center text-xs font-bold transition-all ${selectedAction === 'meeting' ? 'bg-yellow-600 border-yellow-500 text-white' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:text-white'}`}><Video size={16} className="mb-1" /> Video</button></div></div>
                                            <div><label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Estado</label><select value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)} className={`w-full p-3 rounded-xl border font-bold bg-[#0f172a] border-white/10 text-white focus:outline-none`}><option value="Pending">Pendiente</option><option value="Interested">Interesado</option><option value="Meeting">Reunión</option><option value="Sale">Venta</option><option value="Rejected">Rechazado</option></select></div>
                                            <div><label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Notas</label><textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} className="w-full h-24 bg-[#0f172a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Detalles de la gestión..."/></div>
                                            <div className="grid grid-cols-2 gap-2"><button onClick={() => setIsCalendarOpen(true)} className="p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex flex-col items-center justify-center text-yellow-400 transition-colors"><CalendarIcon size={20} className="mb-1" /><span className="text-xs font-bold">Agendar</span></button><button onClick={() => { setLeadStatus('Sale'); handleSave('next', 'Sale'); }} className="p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-xl flex flex-col items-center justify-center text-green-400 transition-colors"><CheckCircle size={20} className="mb-1" /><span className="text-xs font-bold">Venta</span></button></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-6"><button onClick={() => handleSave('prev')} disabled={isSaving || currentIndex === 0} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"><ChevronLeft size={20} /><span>Anterior</span></button><button onClick={() => handleSave('next')} disabled={isSaving} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20">{isSaving ? <Loader2 size={20} className="animate-spin" /> : <><span>Siguiente</span><ArrowRight size={20} /></>}</button></div>
                                    </GlassCard>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
            <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} leadEmail={currentLead?.emails?.split(':')[0] || ''} onSchedule={handleScheduleMeeting} />
            <TaskModal isOpen={isTaskOpen} onClose={() => setIsTaskOpen(false)} onSave={handleCreateTask} isSaving={isSaving} />
            <AddLeadModal isOpen={isAddLeadOpen} onClose={() => setIsAddLeadOpen(false)} region={region} onSuccess={() => { loadData(); }} />
        </div>
    );
};

export default Dashboard;