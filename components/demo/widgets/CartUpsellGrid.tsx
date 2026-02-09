
import React, { useState } from 'react';
import { Plus, Check, ShoppingCart, Star } from 'lucide-react';

interface UpsellItem {
    id: number;
    name: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    rating: number;
}

export const CartUpsellGrid: React.FC = () => {
    // Items relevant to Coffee (Pour-over set)
    const items: UpsellItem[] = [
        {
            id: 1,
            name: "Artisan Coffee Beans (250g)",
            price: 18.00,
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400",
            rating: 5
        },
        {
            id: 2,
            name: "Paper Filters (100 pack)",
            price: 8.50,
            compareAtPrice: 12.00,
            image: "https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?auto=format&fit=crop&q=80&w=400",
            rating: 4.8
        },
        {
            id: 3,
            name: "Precision Digital Scale",
            price: 32.00,
            image: "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/5120lqLs-dL._AC_UF894_1000_QL80.jpg?v=1770037570",
            rating: 4.9
        },
        {
            id: 4,
            name: "Gooseneck Kettle Matte Black",
            price: 45.00,
            compareAtPrice: 65.00,
            image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&q=80&w=400",
            rating: 5
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
            <div className="flex items-center gap-3 mb-4 px-1">
                <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                    <ShoppingCart size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">You might also like</h3>
                    <p className="text-gray-400 text-xs">Recommended based on your cart</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item) => {
                    const isAdded = addedIds.includes(item.id);
                    return (
                        <div 
                            key={item.id}
                            className={`
                                relative flex flex-col bg-[#0f172a]/60 backdrop-blur-md border rounded-xl overflow-hidden transition-all group
                                ${isAdded ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/10 hover:border-white/20'}
                            `}
                        >
                            <div className="h-40 w-full relative overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                />
                                {item.compareAtPrice && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        SAVE {Math.round(((item.compareAtPrice - item.price) / item.compareAtPrice) * 100)}%
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex items-center gap-1 mb-1 text-yellow-400">
                                    <Star size={10} fill="currentColor" />
                                    <span className="text-[10px] font-medium text-gray-400">{item.rating}</span>
                                </div>
                                <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{item.name}</h4>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-cyan-300 font-bold">${item.price.toFixed(2)}</span>
                                    {item.compareAtPrice && (
                                        <span className="text-gray-500 text-xs line-through">${item.compareAtPrice.toFixed(2)}</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => toggleItem(item.id)}
                                    className={`
                                        mt-auto w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all
                                        ${isAdded 
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                            : 'bg-white text-[#0f172a] hover:bg-cyan-50'}
                                    `}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check size={14} /> Added
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={14} /> Add to Cart
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
