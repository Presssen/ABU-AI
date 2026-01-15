import React from 'react';
import { Content } from '../types';
import { ShieldCheck, Award, Zap } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface SocialProofProps {
  text: Content['trust'];
}

const SocialProof: React.FC<SocialProofProps> = ({ text }) => {
  return (
    <section id="trust" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <GlassCard className="p-8 md:p-12">
            <div className="text-center mb-8">
                <span className="text-sm font-bold tracking-widest text-blue-300 uppercase opacity-80">{text.title}</span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Emulated Logos */}
                <div className="flex items-center space-x-2 text-xl font-bold font-sans">
                    <Zap className="text-[#95BF47]" />
                    <span>shopify<span className="font-light">plus</span></span>
                </div>
                
                <div className="flex items-center space-x-2 text-xl font-bold font-serif">
                   <Award className="text-blue-400" />
                   <span>Ecommerce<span className="text-blue-400">Experts</span></span>
                </div>

                <div className="flex items-center space-x-2 text-xl font-bold">
                    <ShieldCheck className="text-purple-400" />
                    <span>Secure<span className="text-purple-400">Pay</span></span>
                </div>
            </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default SocialProof;