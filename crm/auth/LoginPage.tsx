
import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { USERS } from '../data/mockData';

interface LoginPageProps {
    onLoginSuccess: (username: string) => void;
    onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay for realism
        setTimeout(() => {
            const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (user && user.passwordHash === password) {
                onLoginSuccess(user.username);
            } else {
                setError('Credenciales incorrectas. Acceso denegado.');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
             {/* Security Background */}
             <div className="absolute inset-0 bg-[#0f172a] overflow-hidden -z-10">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
                 <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
             </div>

            <GlassCard className="w-full max-w-md p-8 border-t-4 border-t-blue-500 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                        <Lock size={32} className="text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Acceso ABU</h1>
                    <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                        <ShieldCheck size={14} className="text-green-500" />
                        Conexión Segura
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">Email Corporativo</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="usuario@empresa.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    >
                        {loading ? 'Verificando...' : 'Acceder al Sistema'}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <button onClick={onBack} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                        Volver a la web pública
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};

export default LoginPage;
