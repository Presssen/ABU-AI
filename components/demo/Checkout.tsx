
import React, { useState } from 'react';
import { DemoProduct } from '../../types';
import { ChevronRight, Globe, HelpCircle } from 'lucide-react';

interface CheckoutProps {
    product: DemoProduct;
    onComplete: () => void;
    onBackToStore: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ product, onComplete, onBackToStore }) => {
    const [step, setStep] = useState(1); // 1: Info, 2: Shipping, 3: Payment
    const [loading, setLoading] = useState(false);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            onComplete();
        }, 2000);
    };

    return (
        // Force Light Theme for Shopify Authenticity
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            <div className="flex flex-col lg:flex-row min-h-screen">
                
                {/* Left Column (Form) */}
                <div className="flex-1 lg:w-[58%] px-4 py-8 lg:pt-16 lg:pl-40 lg:pr-16 border-r border-gray-200">
                    
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-medium mb-4 text-black cursor-pointer" onClick={onBackToStore}>ABU Demo Store</h1>
                        <div className="flex items-center text-xs text-blue-600 gap-2 font-medium">
                            <span className="cursor-pointer" onClick={onBackToStore}>Cart</span>
                            <ChevronRight size={12} className="text-gray-400" />
                            <span className="text-gray-800">Information</span>
                            <ChevronRight size={12} className="text-gray-400" />
                            <span className="text-gray-500">Shipping</span>
                            <ChevronRight size={12} className="text-gray-400" />
                            <span className="text-gray-500">Payment</span>
                        </div>
                    </div>

                    {/* Express Checkout (Fake) */}
                    <div className="mb-8">
                        <div className="text-xs text-gray-500 text-center mb-3">Express Checkout</div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-[#5A31F4] h-10 rounded text-white flex items-center justify-center font-bold italic">Shop Pay</div>
                            <div className="bg-[#FFC439] h-10 rounded flex items-center justify-center font-bold text-blue-900 italic">PayPal</div>
                            <div className="bg-black h-10 rounded text-white flex items-center justify-center font-bold">GPay</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px bg-gray-300 flex-1"></div>
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="h-px bg-gray-300 flex-1"></div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-medium text-gray-800">Contact Information</h2>
                            <span className="text-xs text-blue-600 cursor-pointer">Log in</span>
                        </div>
                        <input type="email" placeholder="Email or mobile phone number" className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        
                        <h2 className="text-lg font-medium text-gray-800 mt-8 mb-2">Shipping address</h2>
                        <div className="relative">
                            <select className="w-full border border-gray-300 rounded p-3 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                            </select>
                            <Globe size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex gap-3">
                            <input type="text" placeholder="First name" className="w-1/2 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                            <input type="text" placeholder="Last name" className="w-1/2 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                        <input type="text" placeholder="Address" className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        <div className="flex gap-3">
                            <input type="text" placeholder="City" className="w-1/3 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                            <input type="text" placeholder="State" className="w-1/3 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                            <input type="text" placeholder="ZIP code" className="w-1/3 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                        <button onClick={onBackToStore} className="text-blue-600 text-sm hover:text-blue-800 transition-colors flex items-center gap-1">
                            <ChevronRight size={12} className="rotate-180" /> Return to cart
                        </button>
                        <button 
                            onClick={handlePay}
                            disabled={loading}
                            className="bg-[#197bbd] hover:bg-[#15669d] text-white px-6 py-4 rounded-[5px] font-medium text-sm transition-colors flex items-center gap-2"
                        >
                            {loading ? 'Processing...' : 'Continue to shipping'}
                        </button>
                    </div>
                    
                    <div className="mt-12 pt-4 border-t border-gray-200 flex gap-4 text-xs text-blue-600">
                        <span>Refund policy</span>
                        <span>Shipping policy</span>
                        <span>Privacy policy</span>
                        <span>Terms of service</span>
                    </div>
                </div>

                {/* Right Column (Summary) */}
                <div className="flex-1 bg-gray-50 lg:w-[42%] border-l border-gray-200 px-4 py-8 lg:pt-16 lg:pr-40 lg:pl-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                            <div className="w-16 h-16 border border-gray-200 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            </div>
                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">1</span>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-sm font-medium text-gray-800">{product.title}</h3>
                            <p className="text-xs text-gray-500">Standard</p>
                        </div>
                        <span className="text-sm font-medium text-gray-800">${product.price.toFixed(2)}</span>
                    </div>

                    <div className="py-6 border-y border-gray-200 space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-800">${product.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span className="flex items-center gap-1">Shipping <HelpCircle size={12} /></span>
                            <span className="text-xs text-gray-500">Calculated at next step</span>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-between items-center">
                        <span className="text-base text-gray-600">Total</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs text-gray-500">USD</span>
                            <span className="text-xl font-medium text-gray-800">${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
