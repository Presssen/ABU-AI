
import React, { useState } from 'react';
import { Plus, Check, ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';

interface CarouselItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

export const AddonCarousel: React.FC = () => {
    const items: CarouselItem[] = [
        {
            id: 1,
            name: "Headphone Stand",
            price: 24.99,
            image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            name: "Premium Audio Cable",
            price: 12.50,
            image: "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/61gptx8GMsL.jpg?v=1770037083"
        },
        {
            id: 3,
            name: "Hard Carry Case",
            price: 18.00,
            image: "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/71I-91yPYiL.jpg?v=1770037061"
        },
        {
            id: 4,
            name: "USB-C Fast Charger",
            price: 19.99,
            image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=200"
        }
    ];

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleItem = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(i => i !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    return (
        <div className="w-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-white text-sm font-bold flex items-center gap-2">
                    <ShoppingBag size={14} className="text-orange-400" />
                    Completa tu pack
                </h3>
                <div className="flex gap-1">
                    <div className="p-1 bg-white/5 rounded-full"><ChevronLeft size={12} className="text-gray-500" /></div>
                    <div className="p-1 bg-white/5 rounded-full"><ChevronRight size={12} className="text-gray-500" /></div>
                </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {items.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                        <div 
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`
                                relative flex-shrink-0 w-32 bg-[#0f172a]/60 backdrop-blur-md border rounded-xl overflow-hidden cursor-pointer transition-all snap-start group
                                ${isSelected ? 'border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'border-white/10 hover:border-white/20'}
                            `}
                        >
                            <div className="h-24 w-full relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-orange-500 text-white' : 'bg-black/50 text-white/50 group-hover:bg-black/70'}`}>
                                    {isSelected ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
                                </div>
                            </div>
                            <div className="p-2.5">
                                <p className="text-xs font-bold text-white truncate mb-1">{item.name}</p>
                                <p className="text-xs text-orange-300 font-bold">+${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
