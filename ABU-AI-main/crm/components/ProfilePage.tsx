
import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { User, Shield, Mail, LogOut, Key, Globe } from 'lucide-react';

interface ProfilePageProps {
    currentUser: string;
    role: 'admin' | 'agent';
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, role }) => {
    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-white mb-6">Mi Perfil</h2>
            
            <GlassCard className="p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-blue-500/20 border-4 border-white/10">
                        <User size={48} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{currentUser}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${role === 'admin' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                            {role === 'admin' ? 'Administrador' : 'Agente de Ventas'}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Correo Electrónico</p>
                            <p className="text-sm text-white">{currentUser === 'Admin' ? 'admin@abu.com' : 'agente@abu.com'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <Globe size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Región Principal</p>
                            <p className="text-sm text-white">España / México</p>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="p-6">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Shield size={18} className="text-green-400" />
                    Seguridad
                </h4>
                <button className="w-full p-4 flex items-center justify-between bg-[#0f172a] border border-white/10 rounded-xl hover:border-blue-500/50 transition-colors group">
                    <div className="flex items-center gap-3">
                        <Key size={18} className="text-gray-500 group-hover:text-blue-400" />
                        <span className="text-sm font-medium text-gray-300">Cambiar Contraseña</span>
                    </div>
                    <span className="text-xs text-blue-400 font-bold">Gestionar</span>
                </button>
            </GlassCard>
        </div>
    );
};
