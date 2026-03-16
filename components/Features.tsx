
import React, { useState, useEffect, useRef } from 'react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { ICONS_MAP } from '../constants';
import { Plus, CreditCard, Check, X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

interface FeaturesProps {
  text: Content['features'];
}

type FeatureKey = 'fbt' | 'popup' | 'postPurchase';

const Features: React.FC<FeaturesProps> = ({ text }) => {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>('fbt');
  const featureKeys: FeatureKey[] = ['fbt', 'popup', 'postPurchase'];
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const startTimer = () => {
      intervalRef.current = setInterval(() => {
        setActiveFeature((prev) => {
          const currentIndex = featureKeys.indexOf(prev);
          return featureKeys[(currentIndex + 1) % featureKeys.length];
        });
      }, 10000);
    };

    startTimer();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleFeatureClick = (key: FeatureKey) => {
    setActiveFeature(key);
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveFeature((prev) => {
                const currentIndex = featureKeys.indexOf(prev);
                return featureKeys[(currentIndex + 1) % featureKeys.length];
            });
        }, 10000);
    }
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
          <div className="lg:col-span-5 space-y-4">
            {featureKeys.map((key) => {
              const feature = text.items[key];
              const isActive = activeFeature === key;
              return (
                <div 
                  key={key}
                  onClick={() => handleFeatureClick(key)}
                  className={`relative cursor-pointer p-6 rounded-2xl transition-all duration-300 border ${isActive ? 'bg-white/10 border-blue-400/50 shadow-lg translate-x-2' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                >
                  {isActive && <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-full origin-left animate-[progress_10s_linear]" />}
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-gray-400'}`}>
                      {ICONS_MAP[feature.icon]}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-400'}`}>{feature.title}</h3>
                      <p className={`text-sm ${isActive ? 'text-blue-100/80' : 'text-gray-500'}`}>{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7 relative h-[500px]">
            <GlassCard className="h-full p-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border-white/20">
               <div className={`absolute w-full max-w-lg transition-all duration-500 ${activeFeature === 'fbt' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="fbt-widget bg-[#0c1222] border border-white/[0.08] rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.5)] overflow-hidden">

                     {/* Header */}
                     <div className="px-6 pt-6 pb-4 fbt-fade-in" style={{animationDelay:'0.1s'}}>
                        <h4 className="text-[15px] font-bold text-white tracking-tight">Frequently Bought Together</h4>
                        <p className="text-[11px] text-gray-500 mt-1">Get 10% off by purchasing these products together</p>
                     </div>

                     <div className="px-6 pb-5 flex items-start gap-6">
                        {/* Product Images Row */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                           {/* Product 1 */}
                           <div className="fbt-fade-in fbt-img-container w-[72px] h-[72px] bg-white/[0.04] rounded-xl border border-white/[0.08] flex items-center justify-center overflow-hidden" style={{animationDelay:'0.3s'}}>
                              <div className="w-11 h-14 bg-gradient-to-b from-purple-400/80 to-purple-600/80 rounded-md fbt-shimmer" />
                           </div>
                           <Plus className="text-gray-600 w-3.5 h-3.5 flex-shrink-0 fbt-fade-in" style={{animationDelay:'0.5s'}} />
                           {/* Product 2 */}
                           <div className="fbt-fade-in fbt-img-container w-[72px] h-[72px] bg-white/[0.04] rounded-xl border border-white/[0.08] flex items-center justify-center overflow-hidden" style={{animationDelay:'0.6s'}}>
                              <div className="w-11 h-9 bg-gradient-to-b from-amber-300/80 to-amber-500/80 rounded-md fbt-shimmer" />
                           </div>
                           <Plus className="text-gray-600 w-3.5 h-3.5 flex-shrink-0 fbt-fade-in" style={{animationDelay:'0.8s'}} />
                           {/* Product 3 */}
                           <div className="fbt-fade-in fbt-img-container w-[72px] h-[72px] bg-white/[0.04] rounded-xl border border-white/[0.08] flex items-center justify-center overflow-hidden" style={{animationDelay:'0.9s'}}>
                              <div className="w-11 h-14 bg-gradient-to-b from-teal-400/80 to-teal-600/80 rounded-md fbt-shimmer" />
                           </div>
                        </div>

                        {/* Price Summary */}
                        <div className="ml-auto text-right flex-shrink-0 fbt-fade-in" style={{animationDelay:'1.1s'}}>
                           <span className="text-[10px] text-gray-500 block font-medium uppercase tracking-wider">Total Price:</span>
                           <span className="text-xl font-bold text-white block leading-tight mt-0.5 fbt-number-pop" style={{animationDelay:'1.3s'}}>1.867,37 US$</span>
                           <span className="text-[11px] text-gray-600 line-through">2.074,85 US$</span>
                           <div className="mt-2 fbt-badge-pop" style={{animationDelay:'1.5s'}}>
                              <span className="inline-block bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/25">Save 10%</span>
                           </div>
                           <button className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold py-2.5 px-5 rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/20 fbt-btn-appear" style={{animationDelay:'1.7s'}}>
                              Add Bundle to Cart
                           </button>
                        </div>
                     </div>

                     {/* Divider */}
                     <div className="fbt-line-draw mx-6" style={{animationDelay:'1.9s'}} />

                     {/* Product List */}
                     <div className="py-1">
                        {/* Row 1 */}
                        <div className="fbt-row-slide flex items-center justify-between px-6 py-3 border-b border-white/[0.04]" style={{animationDelay:'2.1s'}}>
                           <div className="flex items-center gap-3">
                              <div className="fbt-check-pop w-[18px] h-[18px] bg-blue-600 rounded flex items-center justify-center shadow-md shadow-blue-600/30" style={{animationDelay:'2.3s'}}>
                                 <Check size={11} className="text-white" strokeWidth={3} />
                              </div>
                              <span className="text-[12px] font-medium text-gray-300">This item: The Collection Snowboard: Hydrogen</span>
                           </div>
                           <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[11px] text-gray-600 line-through">600,00 US$</span>
                              <span className="text-[12px] font-bold text-emerald-400">540,00 US$</span>
                           </div>
                        </div>
                        {/* Row 2 */}
                        <div className="fbt-row-slide flex items-center justify-between px-6 py-3 border-b border-white/[0.04]" style={{animationDelay:'2.4s'}}>
                           <div className="flex items-center gap-3">
                              <div className="fbt-check-pop w-[18px] h-[18px] bg-blue-600 rounded flex items-center justify-center shadow-md shadow-blue-600/30" style={{animationDelay:'2.6s'}}>
                                 <Check size={11} className="text-white" strokeWidth={3} />
                              </div>
                              <span className="text-[12px] font-medium text-gray-300">Selling Plans Ski Wax</span>
                           </div>
                           <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[9px] border border-white/10 text-gray-500 rounded px-2 py-0.5 bg-white/[0.03]">Selling Plans Ski Wax</span>
                              <span className="text-[11px] text-gray-600 line-through">24,98 US$</span>
                              <span className="text-[12px] font-bold text-emerald-400">22,46 US$</span>
                           </div>
                        </div>
                        {/* Row 3 */}
                        <div className="fbt-row-slide flex items-center justify-between px-6 py-3 border-b border-white/[0.04]" style={{animationDelay:'2.7s'}}>
                           <div className="flex items-center gap-3">
                              <div className="fbt-check-pop w-[18px] h-[18px] bg-blue-600 rounded flex items-center justify-center shadow-md shadow-blue-600/30" style={{animationDelay:'2.9s'}}>
                                 <Check size={11} className="text-white" strokeWidth={3} />
                              </div>
                              <span className="text-[12px] font-medium text-gray-300">The Complete Snowboard</span>
                           </div>
                           <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[9px] border border-white/10 text-gray-500 rounded px-2 py-0.5 bg-white/[0.03]">Ice</span>
                              <span className="text-[11px] text-gray-600 line-through">699,95 US$</span>
                              <span className="text-[12px] font-bold text-emerald-400">629,96 US$</span>
                           </div>
                        </div>
                        {/* Row 4 */}
                        <div className="fbt-row-slide flex items-center justify-between px-6 py-3" style={{animationDelay:'3.0s'}}>
                           <div className="flex items-center gap-3">
                              <div className="fbt-check-pop w-[18px] h-[18px] bg-blue-600 rounded flex items-center justify-center shadow-md shadow-blue-600/30" style={{animationDelay:'3.2s'}}>
                                 <Check size={11} className="text-white" strokeWidth={3} />
                              </div>
                              <span className="text-[12px] font-medium text-gray-300">The Collection Snowboard: Liquid</span>
                           </div>
                           <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[11px] text-gray-600 line-through">749,95 US$</span>
                              <span className="text-[12px] font-bold text-emerald-400">674,96 US$</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={`absolute w-full max-w-lg transition-all duration-500 ${activeFeature === 'popup' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  {/* Ghost Add-to-Cart button that gets "clicked" */}
                  <div className="popup-ghost-btn" style={{animationDelay:'0.2s'}}>
                     <button className="px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-600/30 flex items-center gap-2 mx-auto">
                        <ShoppingCart size={16} /> Add to Cart
                     </button>
                     {/* Ghost cursor */}
                     <div className="popup-ghost-cursor" style={{animationDelay:'0.8s'}}>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M1 1L1 14.5L4.5 11L8.5 18L11 17L7 10H12.5L1 1Z" fill="white" stroke="#0c1222" strokeWidth="1.5"/></svg>
                     </div>
                  </div>

                  {/* The popup that appears after the "click" */}
                  <div className="popup-slide-up bg-[#0c1222] border border-white/[0.08] rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.5)] overflow-hidden" style={{animationDelay:'1.6s'}}>
                     {/* Header */}
                     <div className="px-6 pt-5 pb-4 text-center relative popup-fade-in" style={{animationDelay:'1.9s'}}>
                        <h4 className="text-[16px] font-bold text-white">Added to Cart!</h4>
                        <p className="text-[11px] text-gray-500 mt-1">You might also like these products</p>
                        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-400 transition-colors">
                           <X size={16} />
                        </button>
                     </div>

                     {/* Product Cards Row */}
                     <div className="px-5 pb-4 flex gap-3 overflow-hidden">
                        {/* Card 1 */}
                        <div className="popup-card-pop flex-shrink-0 w-[140px] bg-white/[0.04] rounded-xl border border-white/[0.08] overflow-hidden" style={{animationDelay:'2.2s'}}>
                           <div className="h-[100px] bg-white/[0.03] flex items-center justify-center popup-shimmer">
                              <div className="w-16 h-12 bg-gradient-to-b from-amber-300/70 to-amber-500/70 rounded-lg" />
                           </div>
                           <div className="p-3">
                              <p className="text-[11px] font-medium text-gray-300 truncate">Selling Plans Ski Wax</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                 <span className="text-[11px] font-bold text-emerald-400">22,46 US$</span>
                                 <span className="text-[9px] text-gray-600 line-through">24,95 US$</span>
                              </div>
                              <div className="mt-2 border border-white/10 rounded px-2 py-1 text-[9px] text-gray-500 bg-white/[0.02] flex items-center justify-between">
                                 <span>Selling Plans Ski W...</span>
                                 <ChevronRight size={8} className="text-gray-600" />
                              </div>
                              <button className="popup-btn-pop mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors" style={{animationDelay:'2.8s'}}>+ Add</button>
                           </div>
                        </div>
                        {/* Card 2 */}
                        <div className="popup-card-pop flex-shrink-0 w-[140px] bg-white/[0.04] rounded-xl border border-white/[0.08] overflow-hidden" style={{animationDelay:'2.4s'}}>
                           <div className="h-[100px] bg-white/[0.03] flex items-center justify-center popup-shimmer">
                              <div className="w-10 h-16 bg-gradient-to-b from-teal-400/70 to-teal-600/70 rounded-lg" />
                           </div>
                           <div className="p-3">
                              <p className="text-[11px] font-medium text-gray-300 truncate">The Complete Snowboard</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                 <span className="text-[11px] font-bold text-emerald-400">629,96 US$</span>
                                 <span className="text-[9px] text-gray-600 line-through">699,95 US$</span>
                              </div>
                              <div className="mt-2 border border-white/10 rounded px-2 py-1 text-[9px] text-gray-500 bg-white/[0.02] flex items-center justify-between">
                                 <span>Ice</span>
                                 <ChevronRight size={8} className="text-gray-600" />
                              </div>
                              <button className="popup-btn-pop mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors" style={{animationDelay:'3.0s'}}>+ Add</button>
                           </div>
                        </div>
                        {/* Card 3 */}
                        <div className="popup-card-pop flex-shrink-0 w-[140px] bg-white/[0.04] rounded-xl border border-white/[0.08] overflow-hidden" style={{animationDelay:'2.6s'}}>
                           <div className="h-[100px] bg-white/[0.03] flex items-center justify-center popup-shimmer">
                              <div className="w-10 h-16 bg-gradient-to-b from-purple-400/70 to-purple-600/70 rounded-lg" />
                           </div>
                           <div className="p-3">
                              <p className="text-[11px] font-medium text-gray-300 truncate">The Collection...</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                 <span className="text-[11px] font-bold text-emerald-400">674,96 US$</span>
                                 <span className="text-[9px] text-gray-600 line-through">749,95 US$</span>
                              </div>
                              <button className="popup-btn-pop mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors" style={{animationDelay:'3.2s'}}>+ Add</button>
                           </div>
                        </div>
                     </div>

                     {/* Carousel Navigation */}
                     <div className="flex items-center justify-center gap-3 pb-3 popup-fade-in" style={{animationDelay:'3.0s'}}>
                        <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors">
                           <ChevronLeft size={14} />
                        </button>
                        <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gray-300 transition-colors">
                           <ChevronRight size={14} />
                        </button>
                     </div>
                     <div className="flex items-center justify-center gap-1.5 pb-4 popup-fade-in" style={{animationDelay:'3.1s'}}>
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <div className="w-2 h-2 rounded-full bg-white/15" />
                     </div>

                     {/* Action Buttons */}
                     <div className="px-5 pb-5 space-y-2">
                        <button className="popup-fade-in w-full py-2.5 border border-white/10 text-white text-[12px] font-bold rounded-lg hover:bg-white/5 transition-colors" style={{animationDelay:'3.3s'}}>Continue Shopping</button>
                        <button className="popup-fade-in w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/20" style={{animationDelay:'3.5s'}}>View Cart</button>
                     </div>
                  </div>
               </div>

               <div className={`absolute w-full max-w-lg transition-all duration-500 ${activeFeature === 'postPurchase' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="pp-widget bg-[#0c1222] border border-white/[0.08] rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.5)] overflow-hidden">

                     {/* Order Confirmed Header */}
                     <div className="px-6 pt-6 pb-3 text-center pp-fade-in" style={{animationDelay:'0.2s'}}>
                        <div className="pp-check-badge w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center" style={{animationDelay:'0.5s'}}>
                           <Check size={20} className="text-emerald-400" strokeWidth={3} />
                        </div>
                        <h4 className="text-[16px] font-bold text-white">Thank You! Order Confirmed</h4>
                        <p className="text-[11px] text-gray-500 mt-1.5">Wait! Exclusive offer just for you</p>
                     </div>

                     {/* Timer Bar */}
                     <div className="mx-6 mb-4 pp-fade-in" style={{animationDelay:'0.8s'}}>
                        <div className="flex items-center justify-between mb-1.5">
                           <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">⏱ Offer expires in</span>
                           <span className="text-[11px] text-orange-400 font-mono font-bold">04:59</span>
                        </div>
                        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full w-[85%] pp-timer-bar" style={{animationDelay:'1.0s'}} />
                        </div>
                     </div>

                     {/* Product Cards */}
                     <div className="px-5 pb-4 flex gap-3 overflow-hidden">
                        {/* Card 1 */}
                        <div className="pp-card-pop flex-1 min-w-0 bg-white/[0.04] rounded-xl border border-white/[0.08] overflow-hidden" style={{animationDelay:'1.2s'}}>
                           <div className="h-[90px] bg-white/[0.03] flex items-center justify-center relative pp-shimmer">
                              <div className="w-14 h-10 bg-gradient-to-b from-amber-300/70 to-amber-500/70 rounded-lg" />
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full pp-badge-pop" style={{animationDelay:'1.8s'}}>-15%</div>
                           </div>
                           <div className="p-3">
                              <p className="text-[11px] font-medium text-gray-300 truncate">Selling Plans Ski Wax</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                 <span className="text-[12px] font-bold text-emerald-400">21,21 US$</span>
                                 <span className="text-[9px] text-gray-600 line-through">24,95 US$</span>
                              </div>
                              <button className="pp-btn-pop mt-2.5 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20" style={{animationDelay:'2.2s'}}>
                                 <CreditCard size={11} /> Buy with 1-Click
                              </button>
                           </div>
                        </div>
                        {/* Card 2 */}
                        <div className="pp-card-pop flex-1 min-w-0 bg-white/[0.04] rounded-xl border border-white/[0.08] overflow-hidden" style={{animationDelay:'1.4s'}}>
                           <div className="h-[90px] bg-white/[0.03] flex items-center justify-center relative pp-shimmer">
                              <div className="w-9 h-14 bg-gradient-to-b from-teal-400/70 to-teal-600/70 rounded-lg" />
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full pp-badge-pop" style={{animationDelay:'2.0s'}}>-10%</div>
                           </div>
                           <div className="p-3">
                              <p className="text-[11px] font-medium text-gray-300 truncate">Complete Snowboard</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                 <span className="text-[12px] font-bold text-emerald-400">629,96 US$</span>
                                 <span className="text-[9px] text-gray-600 line-through">699,95 US$</span>
                              </div>
                              <button className="pp-btn-pop mt-2.5 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20" style={{animationDelay:'2.4s'}}>
                                 <CreditCard size={11} /> Buy with 1-Click
                              </button>
                           </div>
                        </div>
                        {/* Card 3 */}
                        <div className="pp-card-pop flex-1 min-w-0 bg-white/[0.04] rounded-xl border border-white/[0.08] overflow-hidden" style={{animationDelay:'1.6s'}}>
                           <div className="h-[90px] bg-white/[0.03] flex items-center justify-center relative pp-shimmer">
                              <div className="w-9 h-14 bg-gradient-to-b from-purple-400/70 to-purple-600/70 rounded-lg" />
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full pp-badge-pop" style={{animationDelay:'2.2s'}}>-20%</div>
                           </div>
                           <div className="p-3">
                              <p className="text-[11px] font-medium text-gray-300 truncate">The Collection...</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                 <span className="text-[12px] font-bold text-emerald-400">599,96 US$</span>
                                 <span className="text-[9px] text-gray-600 line-through">749,95 US$</span>
                              </div>
                              <button className="pp-btn-pop mt-2.5 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20" style={{animationDelay:'2.6s'}}>
                                 <CreditCard size={11} /> Buy with 1-Click
                              </button>
                           </div>
                        </div>
                     </div>

                     {/* Decline link */}
                     <div className="text-center pb-5 pp-fade-in" style={{animationDelay:'2.8s'}}>
                        <span className="text-[10px] text-gray-600 hover:text-gray-400 cursor-pointer transition-colors underline underline-offset-2">No thanks, skip this offer</span>
                     </div>
                  </div>
               </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        
        /* FBT Ghost Motion Animations */
        @keyframes fbtFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fbtShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fbtLineDraw {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fbtNumberPop {
          0% { opacity: 0; transform: scale(0.5); }
          60% { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fbtBadgePop {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fbtBtnAppear {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fbtRowSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fbtCheckPop {
          0% { opacity: 0; transform: scale(0); }
          70% { transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .fbt-fade-in {
          opacity: 0;
          animation: fbtFadeIn 0.6s ease-out both;
        }
        .fbt-shimmer {
          background-size: 200% 100%;
          background-image: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.06) 40%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.06) 60%,
            transparent 100%
          );
          animation: fbtShimmer 3s ease-in-out infinite;
          animation-delay: 2s;
        }
        .fbt-img-container {
          transition: box-shadow 0.3s ease;
        }
        .fbt-img-container:hover {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.15);
        }
        .fbt-line-draw {
          height: 1px;
          background: rgba(255,255,255,0.06);
          transform-origin: left;
          transform: scaleX(0);
          animation: fbtLineDraw 0.5s ease-out both;
        }
        .fbt-number-pop {
          opacity: 0;
          animation: fbtNumberPop 0.5s ease-out both;
        }
        .fbt-badge-pop {
          opacity: 0;
          animation: fbtBadgePop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .fbt-btn-appear {
          opacity: 0;
          animation: fbtBtnAppear 0.5s ease-out both;
        }
        .fbt-row-slide {
          opacity: 0;
          animation: fbtRowSlide 0.4s ease-out both;
        }
        .fbt-check-pop {
          opacity: 0;
          animation: fbtCheckPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        /* ===== Popup Ghost Motion Animations ===== */
        @keyframes popupGhostBtn {
          0% { opacity: 0; transform: translateY(10px); }
          15% { opacity: 1; transform: translateY(0); }
          65% { opacity: 1; transform: scale(1); }
          72% { opacity: 1; transform: scale(0.96); }
          78% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes popupGhostCursor {
          0% { opacity: 0; transform: translate(40px, 30px); }
          30% { opacity: 1; transform: translate(0, 0); }
          60% { opacity: 1; transform: translate(-2px, 2px); }
          65% { opacity: 1; transform: translate(0, 0) scale(0.9); }
          75% { opacity: 1; transform: scale(1); }
          90% { opacity: 0.5; }
          100% { opacity: 0; transform: translate(-10px, -10px); }
        }
        @keyframes popupSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popupFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popupCardPop {
          0% { opacity: 0; transform: translateY(15px) scale(0.9); }
          60% { transform: translateY(-2px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popupBtnPop {
          0% { opacity: 0; transform: scale(0.8); }
          60% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }

        .popup-ghost-btn {
          opacity: 0;
          animation: popupGhostBtn 1.6s ease-in-out both;
          position: relative;
        }
        .popup-ghost-cursor {
          position: absolute;
          bottom: -4px;
          left: 55%;
          opacity: 0;
          animation: popupGhostCursor 1.2s ease-in-out both;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }
        .popup-slide-up {
          opacity: 0;
          animation: popupSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .popup-fade-in {
          opacity: 0;
          animation: popupFadeIn 0.5s ease-out both;
        }
        .popup-card-pop {
          opacity: 0;
          animation: popupCardPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .popup-shimmer {
          background-size: 200% 100%;
          background-image: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.04) 40%,
            rgba(255,255,255,0.08) 50%,
            rgba(255,255,255,0.04) 60%,
            transparent 100%
          );
          animation: fbtShimmer 3s ease-in-out infinite;
          animation-delay: 3s;
        }
        .popup-btn-pop {
          opacity: 0;
          animation: popupBtnPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        /* ===== Post-Purchase Ghost Motion Animations ===== */
        @keyframes ppTimerBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .pp-fade-in {
          opacity: 0;
          animation: fbtFadeIn 0.6s ease-out both;
        }
        .pp-check-badge {
          opacity: 0;
          animation: fbtBadgePop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .pp-timer-bar {
          transform-origin: left;
          transform: scaleX(0);
          animation: ppTimerBar 0.8s ease-out both;
        }
        .pp-card-pop {
          opacity: 0;
          animation: popupCardPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .pp-badge-pop {
          opacity: 0;
          animation: fbtBadgePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .pp-btn-pop {
          opacity: 0;
          animation: popupBtnPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .pp-shimmer {
          background-size: 200% 100%;
          background-image: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.04) 40%,
            rgba(255,255,255,0.08) 50%,
            rgba(255,255,255,0.04) 60%,
            transparent 100%
          );
          animation: fbtShimmer 3s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
    </section>
  );
};

export default Features;
