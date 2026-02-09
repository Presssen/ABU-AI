
import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, Tag, Clock, Check, Plus } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';

export interface PopupItem {
    id: number;
    name: string;
    price: number;
    compareAt: number;
    image: string;
    discount?: string;
}

interface PopupUpsellProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (items: PopupItem[]) => void;
}

export const PopupUpsell: React.FC<PopupUpsellProps> = ({ isOpen, onClose, onAdd }) => {
    const [addedIds, setAddedIds] = useState<number[]>([]);

    if (!isOpen) return null;

    const items: PopupItem[] = [
        {
            id: 101,
            name: "Sport Bands (3-Pack)",
            price: 14.99,
            compareAt: 29.99,
            image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=200",
            discount: "50% OFF"
        },
        {
            id: 102,
            name: "Screen Protector Pro",
            price: 9.99,
            compareAt: 19.99,
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200", 
            discount: "Save $10"
        },
        {
            id: 103,
            name: "Fast Charging Dock",
            price: 24.99,
            compareAt: 39.99,
            image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=200",
            discount: "Best Value"
        }
    ];

    const toggleItem = (id: number) => {
        if (addedIds.includes(id)) {
            setAddedIds(prev => prev.filter(i => i !== id));
        } else {
            setAddedIds(prev => [...prev, id]);
        }
    };

    const handleContinue = () => {
        const selectedItems = items.filter(i => addedIds.includes(i.id));
        onAdd(selectedItems);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <GlassCard className="w-full max-w-3xl relative z-10 animate-in zoom-in-95 duration-300 !bg-[#0f172a] border border-blue-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center relative flex-shrink-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20"
                    >
                        <X size={24} />
                    </button>
                    
                    <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full mb-2 border border-white/20">
                        LIMITED TIME OFFER
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Wait! Don't Miss These Deals</h2>
                    <div className="flex items-center justify-center gap-2 text-blue-100 text-sm">
                        <Clock size={14} className="text-yellow-400" />
                        <span>Offers expire in 04:59</span>
                    </div>
                </div>

                {/* Items Grid */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {items.map(item => {
                            const isAdded = addedIds.includes(item.id);
                            return (
                                <div 
                                    key={item.id} 
                                    className={`
                                        relative flex flex-col bg-[#1e293b] border rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer
                                        ${isAdded ? 'border-green-500 ring-1 ring-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-white/10 hover:border-white/30'}
                                    `}
                                    onClick={() => toggleItem(item.id)}
                                >
                                    {item.discount && (
                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 shadow-md">
                                            {item.discount}
                                        </div>
                                    )}
                                    
                                    <div className="h-32 w-full bg-white/5 relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        {isAdded && (
                                            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-[1px] animate-in fade-in duration-200">
                                                <div className="bg-green-500 text-white rounded-full p-2 shadow-lg scale-110">
                                                    <Check size={24} strokeWidth={4} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-4 flex flex-col flex-grow text-center">
                                        <h3 className="font-bold text-white text-sm mb-2 line-clamp-1">{item.name}</h3>
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <span className="text-lg font-bold text-white">${item.price}</span>
                                            <span className="text-gray-500 text-xs line-through">${item.compareAt}</span>
                                        </div>
                                        
                                        <button 
                                            className={`
                                                mt-auto w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all
                                                ${isAdded 
                                                    ? 'bg-green-600 text-white hover:bg-green-500' 
                                                    : 'bg-white text-[#0f172a] hover:bg-gray-100'}
                                            `}
                                        >
                                            {isAdded ? (
                                                <>Selected</>
                                            ) : (
                                                <>Add to Order <Plus size={12} /></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-white/10 bg-[#1e293b]/50 flex-shrink-0 flex flex-col items-center">
                    <button 
                        onClick={handleContinue}
                        className={`
                            w-full max-w-md py-4 font-bold text-lg rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 group
                            ${addedIds.length > 0 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-[1.02] shadow-green-500/20' 
                                : 'bg-white text-[#0f172a] hover:bg-gray-100 hover:scale-[1.02] shadow-white/10'}
                        `}
                    >
                        <span>
                            {addedIds.length > 0 
                                ? `Add ${addedIds.length} Items & Continue` 
                                : 'Continue to Cart'}
                        </span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    {addedIds.length === 0 && (
                        <button 
                            onClick={onClose}
                            className="mt-4 text-xs text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-gray-500"
                        >
                            No thanks, I don't want to save money today
                        </button>
                    )}
                </div>

            </GlassCard>
        </div>
    );
};
