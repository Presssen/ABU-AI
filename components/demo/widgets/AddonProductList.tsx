
import React, { useState } from 'react';
import { Plus, Check, ShoppingBag } from 'lucide-react';

interface AddonItem {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
}

export const AddonProductList: React.FC = () => {
    // Mock data for the addon items
    const addons: AddonItem[] = [
        {
            id: 1,
            name: "Leather Cleaning Kit",
            price: 18.00,
            originalPrice: 24.00,
            image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            name: "Replacement Strap (Black)",
            price: 42.00,
            originalPrice: 54.00,
            image: "https://images.unsplash.com/photo-1618453292507-4959ece6429e?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 3,
            name: "Travel Watch Case",
            price: 22.00,
            originalPrice: 35.00,
            image: "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/Sdebd31b71fd14e5596cb0b789a72dcd9M_jpg_640x640q75_jpg.avif?v=1770037237"
        }
    ];

    const [addedIds, setAddedIds] = useState<number[]>([]);

    const handleAdd = (id: number) => {
        if (addedIds.includes(id)) {
            setAddedIds(prev => prev.filter(i => i !== id));
        } else {
            setAddedIds(prev => [...prev, id]);
        }
    };

    return (
        <div className="w-full my-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-t-xl p-4 border border-white/10 border-b-0">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <ShoppingBag size={18} className="text-blue-400" />
                    Completa el producto
                </h3>
            </div>

            {/* Content Box with Dashed Border */}
            <div className="border-2 border-dashed border-blue-500/30 rounded-b-xl p-2 bg-[#0f172a]/40">
                <div className="space-y-2">
                    {addons.map((item) => {
                        const isAdded = addedIds.includes(item.id);
                        return (
                            <div 
                                key={item.id} 
                                className={`
                                    flex items-center justify-between p-3 rounded-lg transition-all border
                                    ${isAdded ? 'bg-blue-900/20 border-blue-500/30' : 'bg-white/5 border-transparent hover:bg-white/10'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 border border-white/5">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white leading-tight">{item.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-red-400 font-bold text-sm">
                                                -${(item.originalPrice - item.price).toFixed(2)}
                                            </span>
                                            <span className="text-gray-400 text-xs line-through">
                                                ${item.originalPrice.toFixed(2)}
                                            </span>
                                            <span className="text-white font-bold text-sm ml-1">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAdd(item.id)}
                                    className={`
                                        flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-lg
                                        ${isAdded 
                                            ? 'bg-green-600 text-white hover:bg-green-500 shadow-green-500/20' 
                                            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'}
                                    `}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check size={14} strokeWidth={3} />
                                            <span>Added</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={14} strokeWidth={3} />
                                            <span>Add</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
