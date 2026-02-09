
import React, { useState } from 'react';
import { Plus, Check, Truck, Zap } from 'lucide-react';

export const SideCartUpsell: React.FC = () => {
    const [added, setAdded] = useState<number[]>([]);

    const items = [
        {
            id: 1,
            name: "Jade Facial Roller",
            price: 24.00,
            originalPrice: 35.00,
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=200",
            tag: "Trending"
        },
        {
            id: 2,
            name: "Silk Sleep Mask",
            price: 15.00,
            image: "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/R33RPWDK55PRBFZZGNCO2UCKVQ.avif?v=1770038093"
        }
    ];

    const toggle = (id: number) => {
        if (added.includes(id)) setAdded(added.filter(i => i !== id));
        else setAdded([...added, id]);
    };

    return (
        <div className="animate-in slide-in-from-right duration-700">
            {/* Free Shipping Progress */}
            <div className="bg-[#0f172a] rounded-lg p-3 border border-white/10 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300 mb-2">
                    <Truck size={14} className="text-green-400" />
                    <span>You are $15 away from Free Shipping!</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[75%] rounded-full"></div>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Don't Miss Out</h3>
            </div>

            <div className="space-y-3">
                {items.map(item => {
                    const isAdded = added.includes(item.id);
                    return (
                        <div key={item.id} className="flex gap-3 bg-[#0f172a] border border-white/10 p-2 rounded-xl group hover:border-white/20 transition-colors">
                            <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                {item.tag && (
                                    <div className="absolute top-0 left-0 bg-pink-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-br">
                                        {item.tag}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-grow flex flex-col justify-between py-0.5">
                                <div>
                                    <h4 className="text-sm font-medium text-white leading-tight mb-1">{item.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-white">${item.price.toFixed(2)}</span>
                                        {item.originalPrice && (
                                            <span className="text-[10px] text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => toggle(item.id)}
                                    className={`
                                        self-start text-[10px] font-bold px-3 py-1 rounded-md border flex items-center gap-1 transition-all
                                        ${isAdded 
                                            ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                            : 'bg-white text-black border-white hover:bg-gray-200'}
                                    `}
                                >
                                    {isAdded ? (
                                        <>Added <Check size={10} /></>
                                    ) : (
                                        <>Add <Plus size={10} /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
