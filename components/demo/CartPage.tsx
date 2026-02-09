
import React from 'react';
import { DemoProduct } from '../../types';
import { ArrowLeft, Trash2, Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { CartUpsellGrid } from './widgets/CartUpsellGrid';
import { CartUpsellCompact } from './widgets/CartUpsellCompact';

interface CartPageProps {
    product: DemoProduct;
    onBack: () => void;
    onCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ product, onBack, onCheckout }) => {
    return (
        <div className="pt-32 pb-24 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={onBack}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Continue Shopping</span>
                </button>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Your Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* Left Column: Cart Items & Widget */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Cart Item Table */}
                        <div className="bg-[#1e293b]/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                            <div className="p-4 md:p-6 flex gap-4 md:gap-6 items-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">{product.title}</h3>
                                            <p className="text-sm text-gray-400 mb-2">Standard Size</p>
                                        </div>
                                        <button className="text-gray-500 hover:text-red-400 transition-colors p-2">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end mt-2 md:mt-4">
                                        <div className="flex items-center border border-white/10 rounded-lg bg-[#0f172a]/50">
                                            <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">-</button>
                                            <span className="px-2 text-sm text-white font-medium">1</span>
                                            <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">+</button>
                                        </div>
                                        <div className="text-right">
                                            {product.compareAtPrice && (
                                                <span className="text-sm text-gray-500 line-through block">${product.compareAtPrice.toFixed(2)}</span>
                                            )}
                                            <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WIDGET AREA */}
                        <div className="border-t border-white/10 pt-4">
                            
                            {/* Label based on Product ID to distinguish demos */}
                            {product.id === 4 && (
                                <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">ABU Engine: Cart Page Grid</span>
                                </div>
                            )}

                            {product.id === 5 && (
                                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">ABU Engine: Compact List</span>
                                </div>
                            )}

                            {/* Render Logic */}
                            {product.id === 4 && <CartUpsellGrid />}
                            {product.id === 5 && <CartUpsellCompact />}
                            
                        </div>

                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                            
                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">${product.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax</span>
                                    <span className="text-gray-500">Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 mb-6">
                                <div className="flex justify-between items-center text-lg font-bold text-white">
                                    <span>Total</span>
                                    <span>${product.price.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                onClick={onCheckout}
                                className="w-full py-4 bg-white text-[#0f172a] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2 mb-4"
                            >
                                <Lock size={18} />
                                Checkout Securely
                            </button>

                            <div className="flex flex-col gap-3 text-xs text-gray-500 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <ShieldCheck size={14} />
                                    <span>Secure SSL Encryption</span>
                                </div>
                                <div className="flex justify-center gap-2 opacity-50">
                                    <CreditCard size={20} />
                                    <div className="w-8 h-5 bg-gray-600 rounded"></div>
                                    <div className="w-8 h-5 bg-gray-600 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;
