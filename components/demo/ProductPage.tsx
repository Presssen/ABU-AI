
import React, { useState } from 'react';
import { DemoProduct } from '../../types';
import { ArrowLeft, Star, ShoppingCart, Truck, ShieldCheck, Layers, ArrowDown, MousePointerClick } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { FrequentlyBoughtTogether } from './widgets/FrequentlyBoughtTogether';
import { AddonProductList } from './widgets/AddonProductList';
import { AddonCarousel } from './widgets/AddonCarousel';
import { PopupUpsell, PopupItem } from './widgets/PopupUpsell';
import { SimulationWarningModal } from './widgets/SimulationWarningModal';

interface ProductPageProps {
    product: DemoProduct;
    onBack: () => void;
    onAddToCart: (extras?: PopupItem[]) => void;
    onDirectCheckout?: () => void; // New prop for direct checkout redirect
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onAddToCart, onDirectCheckout }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSimulationWarning, setShowSimulationWarning] = useState(false);

    const handleAddToCartClick = () => {
        if (product.id === 7) {
            // Product 7 triggers the Popup Upsell
            setShowPopup(true);
        } else if (product.id === 8) {
            // Product 8 triggers the Simulation Warning for Post-Purchase Demo
            setShowSimulationWarning(true);
        } else {
            // Otherwise, standard add to cart (opens drawer)
            onAddToCart();
        }
    };

    const handlePopupAdd = (items: PopupItem[]) => {
        setShowPopup(false);
        onAddToCart(items); // Proceed to open cart drawer with extras
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        onAddToCart(); // Proceed to open cart drawer (user declined upsell)
    };

    const handleSimulationConfirm = () => {
        setShowSimulationWarning(false);
        // If onDirectCheckout is provided, use it to go straight to checkout page.
        // Otherwise fallback to add to cart.
        if (onDirectCheckout) {
            onDirectCheckout();
        } else {
            onAddToCart();
        }
    };

    return (
        <div className="pt-40 pb-24 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <button 
                    onClick={onBack}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Store</span>
                </button>

                {/* Main Product Grid */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    {/* Left: Image */}
                    <div className="relative rounded-2xl overflow-hidden bg-gray-800 h-[500px] lg:h-[700px]">
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-2 flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <span className="text-sm text-gray-400">(128 reviews)</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.title}</h1>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
                            {product.compareAtPrice && (
                                <span className="text-xl text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
                            )}
                            {product.compareAtPrice && (
                                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                                    Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                                </span>
                            )}
                        </div>

                        <div className="prose prose-invert mb-8 text-gray-300">
                            <p>{product.description}</p>
                        </div>

                        {/* Variants (Visual Only) */}
                        <div className="mb-8 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Color</label>
                                <div className="flex gap-3">
                                    <button className="w-8 h-8 rounded-full bg-black border-2 border-white ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0f172a]"></button>
                                    <button className="w-8 h-8 rounded-full bg-gray-500 border-2 border-transparent hover:border-white transition-colors"></button>
                                    <button className="w-8 h-8 rounded-full bg-blue-900 border-2 border-transparent hover:border-white transition-colors"></button>
                                </div>
                            </div>
                        </div>

                        {/* WIDGET INSERTION: Add-On Carousel (Only for Product ID 3) - ABOVE BUTTON */}
                        {product.id === 3 && (
                            <AddonCarousel />
                        )}

                        {/* DEMO HINT for Product 6, 7 and 8 */}
                        {(product.id === 6 || product.id === 7 || product.id === 8) && (
                            <div className="mb-6 relative group cursor-default animate-in fade-in zoom-in duration-500">
                                <div className={`absolute -inset-0.5 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200 
                                    ${product.id === 8 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}></div>
                                <div className="relative flex items-center gap-3 bg-[#0f172a] p-4 rounded-lg border border-white/10">
                                    <div className={`p-2 rounded-full animate-bounce ${product.id === 8 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                        <MousePointerClick size={20} />
                                    </div>
                                    <div className="text-sm">
                                        <span className={`font-bold block mb-0.5 ${product.id === 8 ? 'text-emerald-300' : 'text-blue-300'}`}>
                                            Demo Interaction Required
                                        </span>
                                        <span className="text-gray-400">
                                            {product.id === 7 
                                                ? "Click 'Add to Cart' to trigger the Pop-up Upsell." 
                                                : product.id === 8 
                                                ? "Click 'Add to Cart' to start the Checkout Flow for Post-Purchase."
                                                : "Click 'Add to Cart' to see the Side Cart Upsell."}
                                        </span>
                                    </div>
                                    <ArrowDown className="ml-auto text-gray-600 animate-pulse" size={20} />
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={handleAddToCartClick}
                            className={`w-full py-4 font-bold rounded-full text-lg transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 mb-6
                                ${product.id === 8 ? 'bg-emerald-500 hover:bg-emerald-400 text-white' : 'bg-white text-[#0f172a] hover:bg-gray-100'}
                            `}
                        >
                            <ShoppingCart size={20} />
                            {product.id === 8 ? 'Buy Now & Test Funnel' : 'Add to Cart'}
                        </button>

                        {/* WIDGET INSERTION: Addon Product List (Only for Product ID 2) - BELOW BUTTON */}
                        {product.id === 2 && (
                            <AddonProductList />
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mt-6">
                            <div className="flex items-center gap-2">
                                <Truck size={18} />
                                <span>Free Shipping over $50</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={18} />
                                <span>30-Day Money Back Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FULL WIDTH WIDGET AREA (Used for Product ID 1) */}
                {product.id === 1 && (
                    <div className="border-t border-white/10 pt-12 relative">
                        
                        {/* VISUAL ILLUSTRATION FOR WIDGET TYPE */}
                        <div className="flex flex-col items-center justify-center mb-10 opacity-80">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-16 bg-white/10 rounded border border-white/20"></div>
                                <span className="text-2xl font-bold text-gray-500">+</span>
                                <div className="w-12 h-16 bg-white/10 rounded border border-white/20"></div>
                                <span className="text-2xl font-bold text-gray-500">=</span>
                                <div className="w-16 h-16 bg-blue-500/20 rounded-full border border-blue-500/40 flex items-center justify-center">
                                    <Layers size={24} className="text-blue-400" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-blue-300 bg-blue-500/10 px-4 py-1 rounded-full border border-blue-500/20">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                                <span className="text-xs uppercase tracking-widest font-bold">ABU Engine: Frequently Bought Together</span>
                            </div>
                            <ArrowDown size={24} className="text-gray-600 mt-2 animate-bounce" />
                        </div>
                        
                        {/* RENDER LOGIC FOR BOTTOM WIDGETS */}
                        <div className="max-w-6xl mx-auto">
                            <FrequentlyBoughtTogether mainProduct={product} />
                        </div>
                    </div>
                )}

            </div>

            {/* Popup Widget (Only for Product 7) */}
            <PopupUpsell 
                isOpen={showPopup} 
                onClose={handlePopupClose} 
                onAdd={handlePopupAdd} 
            />

            {/* Simulation Warning (Only for Product 8) */}
            <SimulationWarningModal 
                isOpen={showSimulationWarning}
                onClose={() => setShowSimulationWarning(false)}
                onConfirm={handleSimulationConfirm}
            />
        </div>
    );
};

export default ProductPage;
