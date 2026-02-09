
import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { DEMO_PRODUCTS } from './DemoData';
import { DemoProduct } from '../../types';
import { ShoppingBag, Layers, Sparkles, Plus, Package, ArrowRight, ListPlus, CheckSquare, GalleryHorizontalEnd, ShoppingCart, List, Sidebar, MessageSquarePlus, ArrowUpCircle, Settings } from 'lucide-react';

interface DemoStoreProps {
    onProductClick: (product: DemoProduct) => void;
}

const WIDGET_TITLES: Record<number, string> = {
    1: "Frequently Bought Together",
    2: "Addon Product List",
    3: "Addon Carousel",
    4: "Cart Page Grid",
    5: "Cart Compact List",
    6: "Side Cart Upsell",
    7: "Pop-up Upsell",
    8: "Post-Purchase Funnel"
};

const DemoStore: React.FC<DemoStoreProps> = ({ onProductClick }) => {
    
    const handleRandomClick = () => {
        const randomProduct = DEMO_PRODUCTS[Math.floor(Math.random() * DEMO_PRODUCTS.length)];
        onProductClick(randomProduct);
    };

    return (
        <section className="pt-32 pb-24 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
                        <ShoppingBag size={14} className="text-blue-400" />
                        <span className="text-sm font-bold text-blue-200 uppercase tracking-widest">Live Demo Environment</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 pb-2">
                        Shopify Store Simulator
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Experience the full ABU funnel. Click any product to enter the simulated store flow, add to cart, and checkout to see our widgets in action.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <button 
                            onClick={handleRandomClick}
                            className="w-full sm:w-auto px-8 py-3 bg-white text-[#0f172a] font-bold rounded-xl hover:scale-105 transition-transform"
                        >
                            I'm Feeling Lucky (Random Product)
                        </button>
                        
                        <a 
                            href="https://apps.shopify.com/abu-cross-selling-upselling"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <span>Start Free Trial</span>
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {DEMO_PRODUCTS.map((product) => (
                        <div key={product.id} onClick={() => onProductClick(product)} className="cursor-pointer group relative">
                            {/* Special Glow for Widget Products */}
                            {(product.id >= 1 && product.id <= 8) && (
                                <div className={`
                                    absolute -inset-0.5 rounded-2xl opacity-50 group-hover:opacity-100 blur transition duration-500 
                                    ${product.id === 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 
                                      product.id === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-600' :
                                      product.id === 3 ? 'bg-gradient-to-r from-orange-500 to-yellow-600' :
                                      product.id === 4 ? 'bg-gradient-to-r from-cyan-500 to-teal-600' :
                                      product.id === 5 ? 'bg-gradient-to-r from-indigo-500 to-violet-600' :
                                      product.id === 6 ? 'bg-gradient-to-r from-pink-500 to-rose-600' :
                                      product.id === 7 ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600' :
                                      'bg-gradient-to-r from-emerald-500 to-teal-600'}
                                `}></div>
                            )}
                            
                            <GlassCard className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:transform group-hover:-translate-y-1 relative bg-[#0f172a]">
                                <div className="relative h-64 overflow-hidden bg-gray-800">
                                    
                                    {/* --- PRODUCT 1: BUNDLE --- */}
                                    {product.id === 1 ? (
                                        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
                                            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1}}></div>
                                            <div className="relative z-10 flex items-center gap-3 scale-90 md:scale-100">
                                                <div className="w-14 h-20 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center transform -rotate-6 translate-y-1 shadow-lg"><div className="w-8 h-8 rounded-full bg-white/10"></div></div>
                                                <Plus size={16} className="text-blue-400 font-bold" strokeWidth={3} />
                                                <div className="w-14 h-20 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center transform rotate-6 translate-y-1 shadow-lg"><div className="w-8 h-1 bg-white/10 rounded"></div></div>
                                                <ArrowRight size={16} className="text-gray-500" strokeWidth={3} />
                                                <div className="w-20 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/20 flex flex-col items-center justify-center border-t border-white/20 relative overflow-hidden group-hover:-translate-y-1 transition-transform">
                                                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
                                                    <Package size={28} className="text-white mb-2 relative z-10" />
                                                    <div className="text-[9px] font-extrabold text-white uppercase tracking-widest relative z-10">Bundle</div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-blue-400 shadow-blue-900/50">
                                                <Layers size={12} fill="currentColor" /><span>LIVE WIDGET</span>
                                            </div>
                                        </div>
                                    ) : product.id === 2 ? (
                                        /* --- PRODUCT 2: ADDON LIST --- */
                                        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/20 to-pink-600/20"></div>
                                            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#d946ef 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1}}></div>
                                            <div className="relative z-10 flex flex-col items-center gap-2 scale-90 md:scale-100">
                                                <div className="w-32 h-12 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm flex items-center px-3 gap-3 shadow-lg mb-2"><div className="w-8 h-8 rounded bg-white/10"></div><div className="h-2 w-12 bg-white/10 rounded"></div></div>
                                                <div className="h-4 border-l-2 border-dashed border-purple-500/50"></div>
                                                <div className="w-40 bg-[#0f172a]/80 backdrop-blur-xl border-2 border-dashed border-purple-500/40 rounded-xl p-2 shadow-2xl flex flex-col gap-2 relative">
                                                    <div className="absolute -top-3 -right-3 bg-purple-500 text-white p-1.5 rounded-full shadow-lg animate-bounce"><Plus size={10} strokeWidth={4} /></div>
                                                    <div className="h-8 rounded bg-white/5 border border-white/5 flex items-center px-2 gap-2"><div className="w-4 h-4 rounded bg-purple-500/20"></div><div className="h-1.5 w-16 bg-white/10 rounded"></div></div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-purple-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-purple-400 animate-pulse">
                                                <ListPlus size={12} fill="currentColor" /><span>ADDON WIDGET</span>
                                            </div>
                                        </div>
                                    ) : product.id === 3 ? (
                                        /* --- PRODUCT 3: CAROUSEL --- */
                                        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-b from-orange-600/20 to-yellow-600/10"></div>
                                            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1}}></div>
                                            <div className="relative z-10 flex flex-col items-center gap-3 scale-90 md:scale-100">
                                                <div className="w-24 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-1"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><ShoppingBag size={20} className="text-white/20" /></div></div>
                                                <div className="relative w-48"><div className="flex gap-2 justify-center"><div className="w-10 h-12 bg-orange-500/20 rounded border border-orange-500/40 flex flex-col items-center justify-center gap-1"></div><div className="w-10 h-12 bg-white/5 rounded border border-white/10 flex flex-col items-center justify-center gap-1 scale-110 shadow-lg z-10"><div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center border border-black"><Plus size={8} className="text-white" strokeWidth={4} /></div></div><div className="w-10 h-12 bg-orange-500/20 rounded border border-orange-500/40 flex flex-col items-center justify-center gap-1"></div></div></div>
                                            </div>
                                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-orange-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-orange-400 animate-pulse">
                                                <GalleryHorizontalEnd size={12} fill="currentColor" /><span>CAROUSEL WIDGET</span>
                                            </div>
                                        </div>
                                    ) : product.id === 4 ? (
                                        /* --- PRODUCT 4: CART GRID --- */
                                        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 to-teal-600/10"></div>
                                            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1}}></div>
                                            <div className="relative z-10 flex flex-col items-center gap-4 scale-90 md:scale-100">
                                                <div className="w-36 bg-[#0f172a] rounded-lg border border-white/10 p-2 shadow-xl">
                                                    <div className="flex gap-2 mb-2"><div className="w-8 h-8 bg-white/10 rounded"></div><div className="flex-1 space-y-1"><div className="h-2 w-16 bg-white/20 rounded"></div></div></div>
                                                    <div className="border border-dashed border-cyan-500/50 bg-cyan-500/10 rounded p-1.5"><div className="flex gap-1.5"><div className="flex-1 h-12 bg-[#0f172a] rounded border border-cyan-500/30"></div><div className="flex-1 h-12 bg-[#0f172a] rounded border border-cyan-500/30"></div></div></div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-cyan-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-cyan-400 animate-pulse">
                                                <ShoppingCart size={12} fill="currentColor" /><span>CART GRID</span>
                                            </div>
                                        </div>
                                    ) : product.id === 5 ? (
                                        /* --- PRODUCT 5: CART COMPACT --- */
                                        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-violet-600/10"></div>
                                            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1}}></div>
                                            <div className="relative z-10 flex flex-col items-center gap-4 scale-90 md:scale-100">
                                                <div className="w-36 bg-[#0f172a] rounded-lg border border-white/10 p-2 shadow-xl">
                                                    <div className="flex gap-2 mb-2"><div className="w-8 h-8 bg-white/10 rounded"></div><div className="flex-1 space-y-1"><div className="h-2 w-16 bg-white/20 rounded"></div></div></div>
                                                    <div className="space-y-1"><div className="h-8 bg-indigo-500/10 border border-indigo-500/30 rounded"></div><div className="h-8 bg-indigo-500/10 border border-indigo-500/30 rounded"></div></div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-indigo-400 animate-pulse">
                                                <List size={12} fill="currentColor" /><span>CART COMPACT</span>
                                            </div>
                                        </div>
                                    ) : product.id === 6 ? (
                                        /* --- PRODUCT 6: DRAWER UPSELL --- */
                                        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-l from-pink-600/20 to-rose-600/10"></div>
                                            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1}}></div>
                                            <div className="relative z-10 flex items-center justify-center scale-90 md:scale-100">
                                                <div className="w-40 h-28 bg-[#0f172a] rounded-lg border border-white/10 shadow-xl relative overflow-hidden flex">
                                                    <div className="flex-grow p-2"><div className="w-full h-2 bg-white/10 rounded mb-2"></div></div>
                                                    <div className="w-16 bg-[#1e293b] border-l border-white/10 h-full flex flex-col p-1.5 gap-1.5 shadow-[-5px_0_15px_rgba(0,0,0,0.5)]"><div className="h-2 w-8 bg-white/20 rounded"></div><div className="h-10 bg-pink-500/10 border border-pink-500/30 rounded flex flex-col justify-center items-center gap-1"><div className="w-6 h-4 bg-pink-600 rounded flex items-center justify-center"><Plus size={6} className="text-white" strokeWidth={4} /></div></div></div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-pink-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-pink-400 animate-pulse">
                                                <Sidebar size={12} fill="currentColor" /><span>SIDE CART UPSELL</span>
                                            </div>
                                        </div>
                                    ) : product.id === 7 ? (
                                        /* --- PRODUCT 7: POPUP UPSELL --- */
                                        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/10"></div>
                                            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#d946ef 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1}}></div>
                                            <div className="relative z-10 flex flex-col items-center justify-center scale-90 md:scale-100">
                                                <div className="w-40 h-28 bg-[#0f172a] rounded-lg border border-white/10 shadow-xl opacity-30 blur-[1px]"></div>
                                                <div className="absolute w-32 h-auto bg-[#1e293b] border border-fuchsia-500/50 rounded-lg shadow-2xl p-2 flex flex-col gap-2 animate-in zoom-in-95 duration-700">
                                                    <div className="h-4 bg-fuchsia-500/20 rounded w-full flex items-center px-1"><div className="w-10 h-1.5 bg-fuchsia-400 rounded"></div></div>
                                                    <div className="flex gap-2"><div className="w-8 h-8 bg-white/10 rounded"></div><div className="flex-1 space-y-1"><div className="h-1.5 w-12 bg-white/20 rounded"></div></div></div>
                                                    <div className="h-5 bg-white text-black text-[6px] font-bold rounded flex items-center justify-center uppercase tracking-widest shadow-lg">Add to Order</div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-fuchsia-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-fuchsia-400 animate-pulse">
                                                <MessageSquarePlus size={12} fill="currentColor" /><span>POP-UP UPSELL</span>
                                            </div>
                                        </div>
                                    ) : product.id === 8 ? (
                                        /* --- PRODUCT 8: POST PURCHASE (NEW) --- */
                                        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/10"></div>
                                            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1}}></div>
                                            
                                            <div className="relative z-10 flex flex-col items-center justify-center scale-90 md:scale-100">
                                                {/* Thank you checkmark */}
                                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                                    <CheckSquare size={24} className="text-emerald-400" strokeWidth={3} />
                                                </div>
                                                
                                                {/* The Post Purchase Modal Card */}
                                                <div className="w-36 h-auto bg-[#1e293b] border-2 border-emerald-500/50 rounded-lg shadow-2xl p-3 flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-700">
                                                    <div className="text-[8px] font-bold text-emerald-400 uppercase text-center tracking-wider">One-Click Offer</div>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="w-8 h-8 bg-white/10 rounded"></div>
                                                        <div className="flex-1 space-y-1">
                                                            <div className="h-1.5 w-12 bg-white/20 rounded"></div>
                                                            <div className="h-1.5 w-8 bg-emerald-500/30 rounded"></div>
                                                        </div>
                                                    </div>
                                                    <div className="h-6 bg-emerald-600 text-white text-[7px] font-bold rounded flex items-center justify-center gap-1 uppercase tracking-tight shadow-lg">
                                                        <ArrowUpCircle size={8} />
                                                        Add to Order
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-emerald-400 animate-pulse">
                                                <ArrowUpCircle size={12} fill="currentColor" />
                                                <span>POST-PURCHASE FUNNEL</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <img 
                                                src={product.image} 
                                                alt={product.title} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Sale Badge for others */}
                                            {product.compareAtPrice && (
                                                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                    Sale
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {WIDGET_TITLES[product.id] || product.title}
                                    </h3>
                                    
                                    {product.id === 1 && <p className="text-xs text-blue-300 mb-3 flex items-center gap-1"><Sparkles size={12} />Interact with "Frequently Bought Together"</p>}
                                    {product.id === 2 && <p className="text-xs text-purple-300 mb-3 flex items-center gap-1"><Sparkles size={12} />Interact with "Addon Product List"</p>}
                                    {product.id === 3 && <p className="text-xs text-orange-300 mb-3 flex items-center gap-1"><Sparkles size={12} />Interact with "Addon Carousel"</p>}
                                    {product.id === 4 && <p className="text-xs text-cyan-300 mb-3 flex items-center gap-1"><Sparkles size={12} />Interact with "Cart Page Grid"</p>}
                                    {product.id === 5 && <p className="text-xs text-indigo-300 mb-3 flex items-center gap-1"><Sparkles size={12} />Interact with "Cart Compact List"</p>}
                                    {product.id === 6 && <p className="text-xs text-pink-300 mb-3 flex items-center gap-1"><Sparkles size={12} />Interact with "Side Cart Upsell"</p>}
                                    {product.id === 7 && <p className="text-xs text-fuchsia-300 mb-3 flex items-center gap-1"><Sparkles size={12} />Interact with "Pop-up Upsell"</p>}
                                    {product.id === 8 && <p className="text-xs text-emerald-300 mb-3 flex items-center gap-1"><Sparkles size={12} />Interact with "Post-Purchase Funnel"</p>}

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                                            {product.compareAtPrice && (
                                                <span className="text-sm text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
                                            )}
                                        </div>
                                        <button className="text-sm font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                                            View Demo &rarr;
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </div>

                {/* Footer Explanation */}
                <div className="border-t border-white/10 pt-12 text-center pb-12">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <Settings size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Total Customization Control</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Todo lo que ves aquí es simulado. Como ecommerce, tienes opciones infinitas de configuración para editar la estética del widget y mostrarlo exactamente como prefieras. ABU se adapta nativamente a tu marca.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DemoStore;
