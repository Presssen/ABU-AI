
import React, { useState } from 'react';
import { Lead, Region } from '../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { ChevronLeft, ChevronRight, User as UserIcon, Search, CheckCircle } from 'lucide-react';
import { USERS } from '../data/mockData';
import { updateLeadInSheet } from '../api/googleSheets';

interface AdminPanelProps {
    leads: Lead[];
    region: Region;
    onUpdate: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ leads, region, onUpdate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const itemsPerPage = 50;

    // Filter Logic
    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.domain.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || lead.leadStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);

    const handleAssignUser = async (leadId: number, username: string) => {
        // Optimistic update (UI first would be complex here without state lift, so we just call API and then onUpdate)
        // For smoother UX, we could update local state, but let's just trigger refresh for now.
        const lead = leads.find(l => l.id === leadId);
        if (!lead) return;

        await updateLeadInSheet(
            region,
            leadId,
            { assignedTo: username },
            { currentIndex: 0, filterPlan: 'All', filterStoreStatus: 'All' } // Dummy config, won't change index
        );
        onUpdate(); // Reload data
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-white">Panel de Administración</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                            type="text" 
                            placeholder="Buscar dominio..." 
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <select 
                        value={filterStatus}
                        onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                    >
                        <option value="All">Todos</option>
                        <option value="Pending">Pendiente</option>
                        <option value="Interested">Interesado</option>
                        <option value="Meeting">Reunión</option>
                        <option value="Sale">Venta</option>
                    </select>
                </div>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-white/5 text-gray-200 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-3">Dominio</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Plan</th>
                                <th className="px-6 py-3">Próxima Tarea</th>
                                <th className="px-6 py-3">Asignado A</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {currentLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{lead.domain}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                            ${lead.leadStatus === 'Sale' ? 'bg-green-500/20 text-green-400' : 
                                              lead.leadStatus === 'Meeting' ? 'bg-yellow-500/20 text-yellow-400' : 
                                              lead.leadStatus === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300'}`}>
                                            {lead.leadStatus || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{lead.plan}</td>
                                    <td className="px-6 py-4 truncate max-w-[200px]">{lead.nextTask || '-'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <select 
                                                value={lead.assignedTo || ''}
                                                onChange={(e) => handleAssignUser(lead.id, e.target.value)}
                                                className="bg-[#0f172a] border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                                            >
                                                <option value="">Sin Asignar</option>
                                                {USERS.filter(u => u.role !== 'admin').map(u => (
                                                    <option key={u.username} value={u.username}>{u.username}</option>
                                                ))}
                                            </select>
                                            {lead.assignedTo && <CheckCircle size={14} className="text-green-500" />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="p-4 border-t border-white/10 flex justify-between items-center bg-white/5">
                    <span className="text-xs text-gray-400">
                        Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredLeads.length)} de {filteredLeads.length}
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 bg-white/5 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-white/5 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};
