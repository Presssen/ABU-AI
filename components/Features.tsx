import React, { useState, useEffect, useRef } from 'react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { ICONS_MAP } from '../constants';
import { ArrowRight, Plus, ShoppingCart, Check, CreditCard } from 'lucide-react';

interface FeaturesProps {
  text: Content['features'];
}

type FeatureKey = 'fbt' | 'popup' | 'postPurchase';

const Features: React.FC<FeaturesProps> = ({ text }) => {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>('fbt');
  const featureKeys = Object.keys(text.items) as FeatureKey[];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Function to start the timer
    const startTimer = () => {
      intervalRef.current = setInterval(() => {
        setActiveFeature((prev) => {
          const currentIndex = featureKeys.indexOf(prev);
          const nextIndex = (currentIndex + 1) % featureKeys.length;
          return featureKeys[nextIndex];
        });
      }, 10000); // 10 seconds
    };

    startTimer();

    // Cleanup interval on unmount or dependency change
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleFeatureClick = (key: FeatureKey) => {
    setActiveFeature(key);
    // Reset the timer when user manually interacts
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveFeature((prev) => {
        const currentIndex = featureKeys.indexOf(prev);
        const nextIndex = (currentIndex + 1) % featureKeys.length;
        return featureKeys[nextIndex];
      });
    }, 10000);
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
            {text.title}
          </h2>
          <p className="text-blue-200/70 max-w-2xl mx-auto text-lg">
            {text.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Interactive Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {featureKeys.map((key) => {
              const feature = text.items[key];
              const isActive = activeFeature === key;
              
              return (
                <div 
                  key={key}
                  onClick={() => handleFeatureClick(key)}
                  className={`
                    relative cursor-pointer p-6 rounded-2xl transition-all duration-300 border overflow-hidden
                    ${isActive 
                      ? 'bg-white/10 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] translate-x-2' 
                      : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'}
                  `}
                >
                  {/* Progress Bar Background for Active Item */}
                  {isActive && (
                      <div className="absolute bottom-0 left-0 h-1 bg-blue-500 animate-progress" />
                  )}

                  <div className="flex items-start space-x-4 relative z-10">
                    <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-gray-400'}`}>
                      {ICONS_MAP[feature.icon]}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-blue-100/80' : 'text-gray-500'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Ghost UI Mockups */}
          <div className="lg:col-span-7 relative h-[500px] perspective-1000">
            <GlassCard className="h-full p-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border-white/20">
               {/* Background Grid Pattern */}
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               
               {/* --- FBT MOCKUP --- */}
               <div className={`absolute w-full max-w-md transition-all duration-500 transform ${activeFeature === 'fbt' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
                  <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6 shadow-2xl">
                     <div className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Frequently Bought Together</div>
                     <div className="flex items-center space-x-2 mb-6">
                        {/* Main Product */}
                        <div className="bg-white/10 w-20 h-20 rounded-lg border border-white/5"></div>
                        <Plus className="text-gray-500 w-4 h-4" />
                        {/* Upsell 1 */}
                        <div className="bg-white/10 w-20 h-20 rounded-lg border border-white/5 relative">
                             <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">-15%</div>
                        </div>
                        <Plus className="text-gray-500 w-4 h-4 hidden sm:block" />
                        {/* Upsell 2 */}
                        <div className="bg-white/10 w-20 h-20 rounded-lg border border-white/5 hidden sm:block"></div>
                     </div>
                     
                     <div className="flex justify-between items-center mb-4">
                         <div className="text-sm text-gray-300">Total Price: <span className="text-white font-bold">$124.99</span></div>
                         <div className="text-xs text-green-400">Save $15.00</div>
                     </div>
                     
                     <button className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                        <span>Add Selected to Cart</span>
                     </button>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -z-10 -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
               </div>

               {/* --- POPUP MOCKUP --- */}
               <div className={`absolute w-full max-w-sm transition-all duration-500 transform ${activeFeature === 'popup' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
                  {/* Backdrop */}
                  <div className="absolute -inset-20 bg-black/60 backdrop-blur-sm z-0 rounded-3xl"></div>
                  
                  <div className="relative z-10 bg-[#1e293b] border border-white/10 rounded-xl p-6 shadow-2xl">
                      <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-bold text-white">Wait! Before you go...</h4>
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400">✕</div>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">Add these matching socks to your order and get <span className="text-green-400 font-bold">10% OFF</span> your entire cart.</p>
                      
                      <div className="flex items-center space-x-4 mb-6 bg-white/5 p-3 rounded-lg">
                          <div className="w-16 h-16 bg-white/10 rounded-md"></div>
                          <div>
                              <div className="h-4 w-24 bg-white/20 rounded mb-2"></div>
                              <div className="h-3 w-16 bg-white/10 rounded"></div>
                          </div>
                          <div className="ml-auto text-right">
                              <div className="text-white font-bold">$12.00</div>
                              <div className="text-gray-500 text-xs line-through">$24.00</div>
                          </div>
                      </div>

                      <button className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors mb-3">
                          Add to Order & Save
                      </button>
                      <div className="text-center text-xs text-gray-500 cursor-pointer hover:text-gray-300">No thanks, I hate saving money</div>
                  </div>
               </div>

               {/* --- POST PURCHASE MOCKUP --- */}
               <div className={`absolute w-full max-w-md transition-all duration-500 transform ${activeFeature === 'postPurchase' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
                   <div className="bg-white text-slate-900 rounded-xl p-8 shadow-2xl border border-gray-200">
                       <div className="flex items-center justify-center mb-4 text-green-600 space-x-2">
                           <Check size={24} strokeWidth={3} />
                           <span className="font-bold text-lg">Order Confirmed!</span>
                       </div>
                       
                       <div className="text-center mb-6">
                           <h4 className="text-2xl font-black text-slate-900 mb-2">Wait! One Last Deal</h4>
                           <p className="text-slate-500 text-sm">Exclusive offer for new customers. Adds to your existing order instantly.</p>
                       </div>

                       <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 mb-6 bg-slate-50">
                           <div className="w-full h-32 bg-slate-200 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-bold">Product Image</div>
                           <div className="flex justify-between items-center mb-2">
                               <span className="font-bold text-lg">Premium Warranty</span>
                               <span className="font-bold text-red-500 text-lg">$9.99 <span className="text-slate-400 text-sm line-through font-normal">$29.99</span></span>
                           </div>
                       </div>

                       <div className="space-y-3">
                           <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2">
                               <CreditCard size={18} />
                               <span>Pay Now • 1-Click</span>
                           </button>
                           <button className="w-full py-2 text-slate-400 font-medium text-sm hover:text-slate-600">
                               No thanks, take me to receipt
                           </button>
                       </div>
                   </div>
               </div>

            </GlassCard>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 10s linear;
        }
      `}</style>
    </section>
  );
};

export default Features;