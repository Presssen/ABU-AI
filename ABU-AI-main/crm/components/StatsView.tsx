
import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { DashboardStats } from '../types';
import { Mail, Phone, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface StatsViewProps {
    stats: DashboardStats;
}

export const StatsView: React.FC<StatsViewProps> = ({ stats }) => {
    // Calculate percentages relative to Contacted (since Total Leads is removed)
    // Or relative to a base if available, otherwise just raw numbers
    const meetingRate = stats.contacted > 0 ? Math.round((stats.meetingsBooked / stats.contacted) * 100) : 0;
    const closeRate = stats.meetingsBooked > 0 ? Math.round((stats.sales / stats.meetingsBooked) * 100) : 0;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-white mb-6">Métricas de Rendimiento</h2>
            
            {/* Top Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GlassCard className="p-4 bg-purple-500/10 border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2 text-purple-300">
                        <Phone size={18} />
                        <span className="text-xs font-bold uppercase">Llamadas (Contactados)</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats.contacted}</div>
                </GlassCard>

                <GlassCard className="p-4 bg-orange-500/10 border-orange-500/30">
                    <div className="flex items-center gap-2 mb-2 text-orange-300">
                        <Mail size={18} />
                        <span className="text-xs font-bold uppercase">Emails Enviados</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats.emailsSent}</div>
                </GlassCard>

                <GlassCard className="p-4 bg-yellow-500/10 border-yellow-500/30">
                    <div className="flex items-center gap-2 mb-2 text-yellow-300">
                        <Calendar size={18} />
                        <span className="text-xs font-bold uppercase">Reuniones</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats.meetingsBooked}</div>
                    <div className="text-xs text-gray-400 mt-1">{meetingRate}% Conversión a Reunión</div>
                </GlassCard>

                <GlassCard className="p-4 bg-green-500/10 border-green-500/30">
                    <div className="flex items-center gap-2 mb-2 text-green-300">
                        <CheckCircle size={18} />
                        <span className="text-xs font-bold uppercase">Ventas</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats.sales}</div>
                    <div className="text-xs text-gray-400 mt-1">{closeRate}% Tasa de Cierre</div>
                </GlassCard>
            </div>

            {/* Funnel Visualization */}
            <div className="grid md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <h3 className="font-bold text-white mb-6">Flujo de Conversión</h3>
                    <div className="space-y-4">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-200 bg-purple-500/20">
                                    Contactados
                                </span>
                                <span className="text-xs font-semibold inline-block text-purple-200">
                                    {stats.contacted}
                                </span>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/10">
                                <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                            </div>
                        </div>

                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-200 bg-yellow-500/20">
                                    Reuniones
                                </span>
                                <span className="text-xs font-semibold inline-block text-yellow-200">
                                    {stats.meetingsBooked}
                                </span>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/10">
                                <div style={{ width: stats.contacted > 0 ? `${(stats.meetingsBooked / stats.contacted) * 100}%` : '0%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
                            </div>
                        </div>

                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-200 bg-green-500/20">
                                    Ventas Cerradas
                                </span>
                                <span className="text-xs font-semibold inline-block text-green-200">
                                    {stats.sales}
                                </span>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/10">
                                <div style={{ width: stats.contacted > 0 ? `${(stats.sales / stats.contacted) * 100}%` : '0%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Rejected Status */}
                 <GlassCard className="p-6 flex flex-col justify-center items-center text-center bg-red-500/5 border-red-500/10">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-400">
                        <XCircle size={40} />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stats.rejected}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Leads Rechazados</div>
                    <p className="text-xs text-gray-500 mt-4 max-w-xs">
                        Estos leads han sido marcados como "No Interesados" o datos incorrectos.
                    </p>
                 </GlassCard>
            </div>
        </div>
    );
};
