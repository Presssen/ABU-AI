
import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { MOCK_LEADS } from './data/mockData';
import { Phone, Globe, User, ArrowRight, CheckCircle, LogOut, Briefcase } from 'lucide-react';
import { ViewState } from '../types';

interface DashboardProps {
    currentUser: string;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser, onLogout }) => {
    // State to track which lead we are viewing
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completedLeads, setCompletedLeads] = useState<number[]>([]);

    const currentLead = MOCK_LEADS[currentIndex];
    const isFinished = currentIndex >= MOCK_LEADS.length;

    const handleNext = () => {
        // Mark current as completed (simulated)
        if (currentLead) {
            setCompletedLeads([...completedLeads, currentLead.id]);
        }
        setCurrentIndex(prev => prev + 1);
    };

    const progressPercentage = Math.min(100, (currentIndex / MOCK_LEADS.length) * 100);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            {/* Top Bar */}
            <header className="bg-[#1e293b] border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Briefcase size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-none">ABU CRM</h1>
                        <span className="text-xs text-gray-400">Panel de Ventas</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-white">{currentUser}</div>
                        <div className="text-xs text-green-400 flex items-center justify-end gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Online
                        </div>
                    </div>
                    <button 
                        onClick={onLogout}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                        title="Cerrar Sesión"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto p-6 md:p-12">
                
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Progreso de Leads</span>
                        <span>{currentIndex} / {MOCK_LEADS.length}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {isFinished ? (
                    <GlassCard className="text-center p-12 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-green-500" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">¡Todo listo por hoy!</h2>
                        <p className="text-gray-400 mb-8">Has contactado con todos los leads de la lista actual.</p>
                        <button 
                            onClick={() => setCurrentIndex(0)} 
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            Reiniciar lista (Simulación)
                        </button>
                    </GlassCard>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Lead Card (Main Focus) */}
                        <div className="md:col-span-2">
                            <GlassCard className="h-full p-8 border-t-4 border-t-blue-500 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider mb-6 border border-blue-500/20">
                                        LEAD #{currentLead.id}
                                    </span>
                                    
                                    <h2 className="text-4xl font-bold mb-8 text-white">{currentLead.name}</h2>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-3 -mx-3 rounded-lg transition-colors">
                                            <div className="w-12 h-12 bg-[#0f172a] rounded-full flex items-center justify-center border border-white/10 group-hover:border-blue-500/50">
                                                <Globe size={24} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase font-bold">Sitio Web</label>
                                                <a href={`https://${currentLead.website}`} target="_blank" rel="noreferrer" className="text-xl text-blue-300 hover:underline">
                                                    {currentLead.website}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-3 -mx-3 rounded-lg transition-colors">
                                            <div className="w-12 h-12 bg-[#0f172a] rounded-full flex items-center justify-center border border-white/10 group-hover:border-green-500/50">
                                                <Phone size={24} className="text-gray-400 group-hover:text-green-400 transition-colors" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase font-bold">Teléfono</label>
                                                <span className="text-2xl font-mono text-white tracking-wide">
                                                    {currentLead.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <button 
                                        onClick={handleNext}
                                        className="w-full group bg-white text-[#0f172a] hover:bg-blue-50 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg"
                                    >
                                        <span>Marcar como Llamado y Siguiente</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Side Panel / Script Helper */}
                        <div className="md:col-span-1 space-y-4">
                            <GlassCard className="p-6 bg-blue-600/10 border-blue-500/20">
                                <h3 className="font-bold text-blue-300 mb-2 text-sm uppercase">Script Rápido</h3>
                                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                    "Hola, hablo con el encargado de la tienda online de <strong>{currentLead.name}</strong>? Os llamo desde ABU porque hemos visto vuestra web..."
                                </p>
                            </GlassCard>

                            <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/5">
                                <h3 className="font-bold text-gray-400 mb-4 text-xs uppercase">Historial Reciente</h3>
                                <div className="space-y-3">
                                    {completedLeads.slice(-3).reverse().map(id => {
                                        const l = MOCK_LEADS.find(lead => lead.id === id);
                                        return (
                                            <div key={id} className="flex items-center gap-2 text-sm text-gray-500 line-through opacity-50">
                                                <CheckCircle size={14} />
                                                {l?.name}
                                            </div>
                                        );
                                    })}
                                    {completedLeads.length === 0 && (
                                        <p className="text-xs text-gray-600 italic">No hay llamadas previas en esta sesión.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
