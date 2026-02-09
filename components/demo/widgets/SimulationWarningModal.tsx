
import React from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { ShieldAlert, AlertTriangle, ArrowRight, X } from 'lucide-react';

interface SimulationWarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const SimulationWarningModal: React.FC<SimulationWarningModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            <GlassCard className="w-full max-w-lg p-8 relative z-10 animate-in zoom-in-95 duration-300 border-yellow-500/30">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 border-2 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                        <ShieldAlert size={40} className="text-yellow-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">Modo Simulación Activo</h2>
                    <p className="text-yellow-200/80 text-sm font-medium uppercase tracking-widest mb-6 border px-3 py-1 rounded border-yellow-500/30 bg-yellow-500/5">
                        Entorno Demo Seguro
                    </p>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8 text-left w-full">
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Para ver el funcionamiento del <strong>Post-Purchase Funnel</strong>, necesitas completar el proceso de compra.
                        </p>
                        <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <AlertTriangle size={18} className="text-blue-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-200">
                                <strong>Nota Importante:</strong> Esta es una tienda ficticia. No guardamos ningún dato personal, ni de pago. No se realizará ningún cargo real.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={onConfirm}
                        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    >
                        <span>Entendido, Continuar al Checkout</span>
                        <ArrowRight size={20} />
                    </button>
                    
                    <button 
                        onClick={onClose}
                        className="mt-4 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};
