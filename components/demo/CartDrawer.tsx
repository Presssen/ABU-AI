
import React from 'react';
import { DemoProduct } from '../../types';
import { X, Lock, Minus, Plus, Trash2 } from 'lucide-react';
import { SideCartUpsell } from './widgets/SideCartUpsell';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    product: DemoProduct | null;
    additionalItems?: any[];
    onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, product, additionalItems = [], onCheckout }) => {
    
    // Calculate total
    const mainPrice = product ? product.price : 0;
    const extrasPrice = additionalItems.reduce((acc, item) => acc + item.price, 0);
    const totalPrice = mainPrice + extrasPrice;

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#1e293b] z-[70] shadow-2xl transform transition-transform duration-300 ease-out border-l border-white/10 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0f172a]">
                    <h2 className="text-xl font-bold text-white">Your Cart</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
                    {product ? (
                        <div className="space-y-6">
                            {/* Main Product */}
                            <div className="flex gap-4">
                                <div className="w-24 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-white font-medium mb-1 line-clamp-2">{product.title}</h3>
                                        <button className="text-gray-500 hover:text-white"><Trash2 size={16} /></button>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2">Standard Size</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center border border-white/10 rounded-md">
                                            <button className="px-2 py-1 text-gray-400 hover:text-white"><Minus size={14} /></button>
                                            <span className="px-2 text-sm text-white">1</span>
                                            <button className="px-2 py-1 text-gray-400 hover:text-white"><Plus size={14} /></button>
                                        </div>
                                        <span className="text-white font-bold">${product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Items (Upsells) */}
                            {additionalItems.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex gap-4 animate-in slide-in-from-right-4 duration-500">
                                    <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/10">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl">
                                            BUNDLE
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-white font-medium mb-1 text-sm line-clamp-2">{item.name}</h3>
                                            <button className="text-gray-500 hover:text-white"><Trash2 size={14} /></button>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-gray-400 text-xs">Qty: 1</span>
                                            <div className="text-right">
                                                {item.compareAt && (
                                                    <span className="text-[10px] text-gray-500 line-through block">${item.compareAt}</span>
                                                )}
                                                <span className="text-white font-bold text-sm">${item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-20">Your cart is empty</div>
                    )}

                    {/* WIDGET AREA */}
                    <div className="mt-8 border-t border-white/10 pt-6">
                        {product?.id === 6 ? (
                            <>
                                <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full mb-4">
                                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-pink-300 uppercase tracking-widest">ABU Engine: Drawer Upsell</span>
                                </div>
                                <SideCartUpsell />
                            </>
                        ) : (
                            <div className="border border-dashed border-gray-700 bg-gray-800/30 rounded-lg p-4 text-center">
                                <p className="text-gray-500 text-xs font-bold uppercase mb-2">ABU Placeholder</p>
                                <p className="text-gray-600 text-xs">Select Product #6 to see the Drawer Upsell Demo.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                {product && (
                    <div className="p-6 border-t border-white/10 bg-[#0f172a]">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold text-white">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 text-center">Shipping, taxes, and discounts calculated at checkout.</p>
                        <button 
                            onClick={onCheckout}
                            className="w-full py-4 bg-white text-[#0f172a] font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <Lock size={16} />
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
