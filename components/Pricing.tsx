import React from 'react';
import { Content } from '../types';
import { Check } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface PricingProps {
  text: Content['pricing'];
}

const Pricing: React.FC<PricingProps> = ({ text }) => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-[90rem] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {text.title}
          </h2>
          <p className="text-blue-200/70 text-lg">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {text.plans.map((plan, index) => (
            <div key={index} className={`relative h-full ${plan.recommended ? 'lg:-mt-6' : ''}`}>
              {plan.recommended && (
                <div className="absolute -top-4 left-0 w-full flex justify-center z-10">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg tracking-wide">
                    RECOMMENDED
                  </span>
                </div>
              )}
              
              <GlassCard 
                className={`
                  p-6 h-full flex flex-col
                  ${plan.recommended ? 'border-blue-400/50 shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-white/10' : 'opacity-90 hover:opacity-100'}
                `}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-blue-200 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline flex-wrap">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {(plan.price !== 'Free' && plan.price !== 'Gratis') && (
                       <span className="text-blue-200/50 ml-1 text-sm">{text.monthly}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-3 min-h-[40px] leading-snug">{plan.description}</p>
                </div>

                <div className="flex-grow">
                    <div className="h-px bg-white/10 w-full mb-6"></div>
                    <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start space-x-2">
                        <div className="mt-0.5 min-w-[14px]">
                            <Check size={14} className="text-[#95BF47]" />
                        </div>
                        <span className="text-xs font-medium text-gray-300 leading-snug">{feat}</span>
                        </li>
                    ))}
                    </ul>
                </div>

                <button 
                  className={`
                    w-full py-3 rounded-xl font-bold text-sm transition-all mt-auto
                    ${plan.recommended 
                      ? 'bg-white text-blue-900 hover:bg-blue-50 shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}
                  `}
                >
                  {plan.name}
                </button>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;