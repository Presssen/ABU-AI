
import React, { useState, useMemo } from 'react';
import { Plus, Check } from 'lucide-react';
import { DemoProduct } from '../../../types';

interface BundleItem {
    id: number;
    name: string;
    price: number;
    compareAtPrice: number;
    image: string;
    variant?: string;
    isMain?: boolean;
}

interface FBTProps {
    mainProduct: DemoProduct;
}

export const FrequentlyBoughtTogether: React.FC<FBTProps> = ({ mainProduct }) => {
    // Updated mock data: Max 3 items as requested
    const [items, setItems] = useState<BundleItem[]>([
        {
            id: mainProduct.id,
            name: `This item: ${mainProduct.title}`,
            price: mainProduct.price,
            compareAtPrice: mainProduct.compareAtPrice || mainProduct.price * 1.2,
            image: mainProduct.image,
            isMain: true
        },
        {
            id: 102,
            name: "Canvas Daily Sneakers",
            price: 45.00,
            compareAtPrice: 60.00,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=300", 
            variant: "US 10"
        },
        {
            id: 103,
            name: "Classic Aviator Glasses",
            price: 25.00,
            compareAtPrice: 35.00,
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300",
            variant: "Gold/Green"
        }
    ]);

    const [selectedIds, setSelectedIds] = useState<number[]>(items.map(i => i.id));

    const toggleItem = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(i => i !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const totals = useMemo(() => {
        const selected = items.filter(i => selectedIds.includes(i.id));
        const totalOriginal = selected.reduce((sum, i) => sum + i.compareAtPrice, 0);
        
        // Apply a special "Bundle Discount" logic (e.g. extra 10% off)
        const totalBase = selected.reduce((sum, i) => sum + i.price, 0);
        const bundlePrice = totalBase * 0.9; 

        return {
            original: totalOriginal,
            bundle: bundlePrice,
            saved: totalOriginal - bundlePrice
        };
    }, [selectedIds, items]);

    return (
        <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8 font-sans text-white shadow-2xl">
            {/* Header */}
            <div className="mb-8 border-b border-white/5 pb-4">
                <h3 className="text-xl md:text-2xl font-bold text-white">Frequently Bought Together</h3>
                <p className="text-gray-400 text-sm mt-1">Get 10% off by purchasing these products together</p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-start">
                
                {/* Left Column: Images + List */}
                <div className="flex-grow w-full">
                    
                    {/* Images Row */}
                    <div className="flex items-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                        {items.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <div 
                                    className={`
                                        relative w-28 h-28 md:w-40 md:h-40 flex-shrink-0 border-2 rounded-xl overflow-hidden transition-all duration-300 
                                        ${selectedIds.includes(item.id) 
                                            ? 'opacity-100 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                                            : 'opacity-40 border-white/10 grayscale scale-95'}
                                    `}
                                >
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    {/* Checkmark Overlay on Image */}
                                    {selectedIds.includes(item.id) && (
                                        <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow-lg scale-75 md:scale-100">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                                {index < items.length - 1 && (
                                    <div className="text-gray-500 flex-shrink-0">
                                        <Plus size={20} strokeWidth={3} />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* List Selection */}
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div 
                                key={item.id} 
                                className={`
                                    flex items-center justify-between group p-3 rounded-xl transition-all border cursor-pointer
                                    ${selectedIds.includes(item.id) 
                                        ? 'bg-white/5 border-white/10' 
                                        : 'bg-transparent border-transparent opacity-60'}
                                `}
                                onClick={() => toggleItem(item.id)}
                            >
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div 
                                        className={`
                                            w-5 h-5 rounded flex items-center justify-center border transition-all flex-shrink-0
                                            ${selectedIds.includes(item.id) ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-gray-500 group-hover:border-blue-400'}
                                        `}
                                    >
                                        {selectedIds.includes(item.id) && <Check size={14} className="text-white" />}
                                    </div>
                                    
                                    <div className="flex-grow min-w-0 flex flex-col">
                                        <span className={`text-sm font-bold truncate ${item.isMain ? 'text-white' : 'text-gray-200'}`}>
                                            {item.name}
                                        </span>
                                        {item.variant && (
                                            <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                                {item.variant}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end pl-4 flex-shrink-0">
                                    <span className="text-sm font-bold text-white">${item.price.toFixed(2)}</span>
                                    <span className="text-xs text-gray-500 line-through">${item.compareAtPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Summary Box */}
                <div className="w-full xl:w-[320px] flex-shrink-0 xl:sticky xl:top-4">
                    <div className="bg-[#0f172a] p-6 rounded-xl border border-white/10 shadow-lg">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-gray-400 text-xs uppercase font-bold tracking-wider block mb-1">Total Bundle Price:</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-white">${totals.bundle.toFixed(2)}</span>
                                </div>
                                <span className="text-sm text-gray-500 line-through">${totals.original.toFixed(2)}</span>
                            </div>
                            <div className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30 flex flex-col items-center">
                                <span>Save</span>
                                <span className="text-sm">10%</span>
                            </div>
                        </div>
                        
                        <div className="h-px bg-white/10 w-full mb-6"></div>

                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-blue-600/20 transform active:scale-[0.98] duration-100 flex items-center justify-center gap-2">
                            Add {selectedIds.length} Items to Cart
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
