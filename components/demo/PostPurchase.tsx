
import React, { useState } from 'react';
import { DemoProduct } from '../../types';
import { CheckCircle, MapPin, ChevronDown, CreditCard, ArrowUpCircle, Check, ShieldCheck } from 'lucide-react';

interface PostPurchaseProps {
    product: DemoProduct;
    onBack: () => void;
}

const PostPurchase: React.FC<PostPurchaseProps> = ({ product, onBack }) => {
    const [accepted, setAccepted] = useState(false);
    const [loading, setLoading] = useState(false);

    const OFFER_PRICE = 15.00;

    const handleAcceptOffer = () => {
        setLoading(true);
        setTimeout(() => {
            setAccepted(true);
            setLoading(false);
        }, 1500);
    };

    return (
        // Force Light Theme
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            
            {/* Header */}
            <div className="border-b border-gray-200 py-4 px-4 lg:px-40">
                <h1 className="text-2xl font-medium text-black">ABU Demo Store</h1>
            </div>

            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
                
                {/* Main Content */}
                <div className="flex-1 px-4 py-8 lg:pr-12">
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full border-2 border-[#197bbd] flex items-center justify-center text-[#197bbd]">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Order #1029</p>
                            <h2 className="text-xl font-medium text-gray-800">Thank you, User!</h2>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 mb-8">
                        <h3 className="font-medium text-gray-800 mb-4">Your order is confirmed</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            You’ll receive a confirmation email with your order number shortly.
                        </p>
                        <div className="flex items-start gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded">
                            <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                            <div>
                                <p className="font-medium text-gray-800 mb-1">Shipping Updates</p>
                                <p>You will receive shipping updates by email.</p>
                            </div>
                        </div>
                    </div>

                    {/* WIDGET PLACEHOLDER: POST PURCHASE */}
                    {!accepted ? (
                        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <p className="text-xs text-pink-500 font-bold uppercase mb-2 text-center tracking-widest border-b border-pink-200 pb-1">
                                ABU Engine: Post-Purchase Funnel (OCU)
                            </p>
                            
                            <div className="border-2 border-pink-100 bg-pink-50/30 rounded-xl p-6 shadow-sm">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Wait! Protect Your Purchase</h2>
                                    <p className="text-gray-600 text-sm">Exclusive offer for new customers. Adds to your existing order instantly.</p>
                                    
                                    <div className="flex justify-center mt-3">
                                        <div className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                            Expires in 04:59
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden p-2">
                                        <img 
                                            src="https://cdn.shopify.com/s/files/1/0370/2466/1636/files/sello-goma-garantia-marca-roja-marca-goma-garantia-marca-grunge-vector-ilustracion-vector_140916-30092.avif?v=1770039055" 
                                            alt="Extended Warranty" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">1-Year Extended Warranty</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-600 font-bold text-lg">${OFFER_PRICE.toFixed(2)}</span>
                                            <span className="text-gray-400 line-through text-sm">$29.00</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Full coverage against damage and defects.</p>
                                        <div className="mt-2 text-xs text-green-600 font-bold flex items-center gap-1">
                                            <ShieldCheck size={12} /> Instant Activation
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button 
                                        onClick={handleAcceptOffer}
                                        disabled={loading}
                                        className="w-full py-4 bg-[#197bbd] hover:bg-[#15669d] text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.98]"
                                    >
                                        {loading ? (
                                            "Processing..."
                                        ) : (
                                            <>
                                                <ArrowUpCircle size={20} />
                                                <span>Pay Now • ${OFFER_PRICE.toFixed(2)} (1-Click)</span>
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        onClick={() => setAccepted(true)} // Just hide it if declined
                                        className="w-full text-center text-xs text-gray-500 underline hover:text-gray-700"
                                    >
                                        No thanks, take me to my receipt
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-in fade-in zoom-in duration-500">
                            <div className="bg-green-100 p-2 rounded-full text-green-600">
                                <Check size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-green-800 text-sm">Offer Added Successfully!</p>
                                <p className="text-xs text-green-700">Your order has been updated. No new payment info required.</p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8 text-sm text-gray-600 border-t border-gray-200 pt-8">
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-800 mb-2">Customer information</h4>
                            <p className="mb-2">user@example.com</p>
                            <p>Shipping Address</p>
                            <p>123 Fake Street, Madrid, Spain</p>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-800 mb-2">Payment method</h4>
                            <div className="flex items-center gap-2">
                                <CreditCard size={14} />
                                <span>Ending with 4242 - $ {(product.price + (accepted ? OFFER_PRICE : 0)).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <button onClick={onBack} className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800">
                            Continue Shopping
                        </button>
                    </div>
                </div>

                {/* Right Column (Summary) */}
                <div className="hidden lg:block w-80 bg-gray-50 border-l border-gray-200 p-8">
                    <h3 className="font-medium text-gray-500 mb-4">Order Summary</h3>
                    
                    {/* Main Product */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-800">{product.title}</p>
                            <p className="text-xs text-gray-500">Qty: 1</p>
                        </div>
                        <p className="text-sm font-medium text-gray-800">${product.price.toFixed(2)}</p>
                    </div>

                    {/* Upsell Item */}
                    {accepted && (
                        <div className="flex items-center gap-3 mb-4 animate-in slide-in-from-right duration-500">
                            <div className="w-12 h-12 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden p-1">
                                <img src="https://cdn.shopify.com/s/files/1/0370/2466/1636/files/sello-goma-garantia-marca-roja-marca-goma-garantia-marca-grunge-vector-ilustracion-vector_140916-30092.avif?v=1770039055" alt="Warranty" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm font-medium text-gray-800">1-Year Extended Warranty</p>
                                <p className="text-xs text-gray-500">Qty: 1 (Upsell)</p>
                            </div>
                            <p className="text-sm font-medium text-gray-800">${OFFER_PRICE.toFixed(2)}</p>
                        </div>
                    )}

                    <div className="border-t border-gray-200 pt-4 flex justify-between font-medium text-gray-800">
                        <span>Total</span>
                        <span>${(product.price + (accepted ? OFFER_PRICE : 0)).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPurchase;
