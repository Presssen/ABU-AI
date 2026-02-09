
import React, { useState, useEffect, useRef } from 'react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { ICONS_MAP } from '../constants';
import { Plus, CreditCard, Check } from 'lucide-react';

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
               <div className={`absolute w-full max-w-md transition-all duration-500 ${activeFeature === 'fbt' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6 shadow-2xl">
                     <div className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Comprados Juntos</div>
                     <div className="flex items-center space-x-2 mb-6">
                        <div className="bg-white/10 w-20 h-20 rounded-lg"></div>
                        <Plus className="text-gray-500 w-4 h-4" />
                        <div className="bg-white/10 w-20 h-20 rounded-lg relative">
                             <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">-15%</div>
                        </div>
                     </div>
                     <button className="w-full py-3 bg-white text-black font-bold rounded-lg">Añadir al Carrito</button>
                  </div>
               </div>

               <div className={`absolute w-full max-w-sm transition-all duration-500 ${activeFeature === 'popup' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6 shadow-2xl relative z-10">
                      <h4 className="text-lg font-bold text-white mb-2">¡Espera! Oferta exclusiva</h4>
                      <p className="text-sm text-gray-400 mb-4">Añade esto y ahorra un 10% en tu pedido total.</p>
                      <button className="w-full py-3 bg-green-500 text-white font-bold rounded-lg">Aceptar Oferta</button>
                  </div>
               </div>

               <div className={`absolute w-full max-w-md transition-all duration-500 ${activeFeature === 'postPurchase' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                   <div className="bg-white text-slate-900 rounded-xl p-8 shadow-2xl">
                       <div className="text-center mb-6">
                           <h4 className="text-2xl font-black mb-2">Pedido Confirmado</h4>
                           <p className="text-slate-500 text-sm">Añade esta oferta de última hora con un solo clic.</p>
                       </div>
                       <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center space-x-2">
                           <CreditCard size={18} />
                           <span>Pagar con 1-Click</span>
                       </button>
                   </div>
               </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </section>
  );
};

export default Features;
