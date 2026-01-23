import React from 'react';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';

interface HeroProps {
  text: Content['hero'];
}

const Hero: React.FC<HeroProps> = ({ text }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-left z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#95BF47] animate-pulse"></span>
            <span className="text-sm font-medium text-blue-100">{text.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-6 leading-tight">
            {text.title}
          </h1>
          
          <p className="text-lg md:text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {text.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="https://apps.shopify.com/abu-cross-selling-upselling" className="w-full sm:w-auto px-8 py-4 bg-white text-[#0f172a] rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center space-x-2">
              <span>{text.ctaPrimary}</span>
              <ArrowRight size={20} />
            </a>
            <a href="https://ai-bundle-2.myshopify.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center">
              {text.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start space-x-8 text-sm font-medium text-blue-200/60">
            <div className="flex items-center space-x-2">
              <TrendingUp size={16} className="text-[#95BF47]" />
              <span>{text.stats.users}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <span>{text.stats.rating}</span>
            </div>
          </div>
        </div>

        {/* Visual Mockup */}
        <div className="relative z-10 hidden lg:block perspective-1000">
          <GlassCard className="p-6 rotate-y-12 rotate-x-6 transform transition-transform duration-700 hover:rotate-0">
             <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="h-2 w-20 bg-white/20 rounded-full"></div>
             </div>
             
             {/* Fake UI Content */}
             <div className="flex space-x-4">
                <div className="w-1/3 space-y-2">
                    <div className="w-full h-32 bg-white/5 rounded-lg border border-white/10"></div>
                    <div className="w-3/4 h-2 bg-white/20 rounded"></div>
                    <div className="w-1/2 h-2 bg-white/10 rounded"></div>
                </div>
                 <div className="w-2/3 space-y-4">
                    <div className="w-full h-8 bg-white/5 rounded-lg border border-white/10"></div>
                    <div className="w-full p-4 bg-[#95BF47]/20 border border-[#95BF47]/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#95BF47] font-bold text-xs">FREQUENTLY BOUGHT TOGETHER</span>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-12 h-12 bg-white/10 rounded"></div>
                            <div className="w-12 h-12 bg-white/10 rounded"></div>
                            <div className="w-8 h-8 rounded-full bg-[#95BF47] flex items-center justify-center text-black font-bold text-xs">+</div>
                        </div>
                    </div>
                    <div className="w-full h-24 bg-white/5 rounded-lg"></div>
                </div>
             </div>
          </GlassCard>

          {/* Floating Elements */}
          <GlassCard className="absolute -bottom-10 -left-10 p-4 w-48 animate-bounce delay-700">
             <div className="flex items-center space-x-3">
                 <div className="bg-green-500/20 p-2 rounded-full text-green-400">
                     <TrendingUp size={20} />
                 </div>
                 <div>
                     <div className="text-xs text-gray-400">Conversion Rate</div>
                     <div className="font-bold text-lg text-green-400">+24%</div>
                 </div>
             </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;