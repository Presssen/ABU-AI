
import React, { useState } from 'react';
import { Plus, Check, ShoppingCart, Tag } from 'lucide-react';

interface UpsellItem {
    id: number;
    name: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    offerText?: string;
}

export const CartUpsellCompact: React.FC = () => {
    const items: UpsellItem[] = [
        {
            id: 1,
            name: "Premium Cotton Socks (3-Pack)",
            price: 14.99,
            compareAtPrice: 25.00,
            image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=200",
            offerText: "Most Popular"
        },
        {
            id: 2,
            name: "Shoe Care Travel Kit",
            price: 19.50,
            compareAtPrice: 29.99,
            image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=200",
            offerText: "Save 35%"
        },
        {
            id: 3,
            name: "Waterproof Protectant Spray",
            price: 12.00,
            image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=200"
        }
    ];

    const [addedIds, setAddedIds] = useState<number[]>([]);

    const toggleItem = (id: number) => {
        if (addedIds.includes(id)) {
            setAddedIds(prev => prev.filter(i => i !== id));
        } else {
            setAddedIds(prev => [...prev, id]);
        }
    };

    return (
        <div className="w-full my-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-500/20 rounded text-indigo-400">
                        <ShoppingCart size={16} />
                    </div>
                    <h3 className="text-white font-bold text-lg">Add to your order</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    <Tag size={12} />
                    <span>One-time offers available</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {items.map((item) => {
                    const isAdded = addedIds.includes(item.id);
                    return (
                        <div 
                            key={item.id}
                            className={`
                                flex items-center p-3 rounded-xl border transition-all duration-300
                                ${isAdded 
                                    ? 'bg-indigo-900/20 border-indigo-500/30' 
                                    : 'bg-[#0f172a]/60 backdrop-blur-md border-white/10 hover:bg-white/5 hover:border-white/20'}
                            `}
                        >
                            {/* Image */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                {item.offerText && !isAdded && (
                                    <div className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-[9px] font-bold text-center py-0.5 uppercase tracking-wide">
                                        {item.offerText}
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex-grow px-4 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 mb-1">
                                    <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.compareAtPrice && (
                                        <span className="text-red-400 font-bold text-sm">
                                            -${(item.compareAtPrice - item.price).toFixed(2)}
                                        </span>
                                    )}
                                    <span className="text-gray-400 text-xs line-through">
                                        ${(item.compareAtPrice || item.price * 1.2).toFixed(2)}
                                    </span>
                                    <span className="text-white font-bold text-sm ml-1">
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                onClick={() => toggleItem(item.id)}
                                className={`
                                    flex-shrink-0 h-10 px-4 sm:px-6 rounded-lg font-bold text-xs flex items-center gap-2 transition-all shadow-lg
                                    ${isAdded 
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30' 
                                        : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 shadow-indigo-500/20'}
                                `}
                            >
                                {isAdded ? (
                                    <>
                                        <Check size={16} strokeWidth={3} />
                                        <span className="hidden sm:inline">Added</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16} strokeWidth={3} />
                                        <span className="hidden sm:inline">Add</span>
                                        <span className="sm:hidden">Add</span>
                                    </>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
