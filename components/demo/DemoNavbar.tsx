
import React from 'react';
import { ShoppingBag, Search, Menu, LogOut, User, ShoppingCart } from 'lucide-react';

interface DemoNavbarProps {
    onExit: () => void;
    cartCount?: number;
    onOpenCart?: () => void;
}

export const DemoNavbar: React.FC<DemoNavbarProps> = ({ onExit, cartCount = 0, onOpenCart }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a] border-b border-white/10 text-white shadow-lg animate-in slide-in-from-top duration-500">
            {/* Announcement Bar */}
            <div className="bg-blue-600 text-white text-[10px] md:text-xs font-bold text-center py-1.5 uppercase tracking-widest">
                Free Shipping on Orders Over $50 • Worldwide Delivery
            </div>

            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-gray-400">
                        <Menu size={24} />
                    </button>
                    <div className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer">
                        <div className="bg-white text-[#0f172a] p-1 rounded">
                            <ShoppingBag size={20} fill="currentColor" />
                        </div>
                        <span>CONCEPT<span className="font-light opacity-70">STORE</span></span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <span className="text-white cursor-pointer hover:text-white transition-colors">New Arrivals</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Shop All</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Accessories</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Sale</span>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                        <Search size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                        <User size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors relative" onClick={onOpenCart}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    
                    <div className="h-6 w-px bg-white/10 mx-2"></div>

                    <button 
                        onClick={onExit}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full text-xs font-bold transition-colors border border-red-500/20"
                        title="Return to ABU Landing Page"
                    >
                        <LogOut size={12} />
                        <span className="hidden sm:inline">Exit Demo</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};
