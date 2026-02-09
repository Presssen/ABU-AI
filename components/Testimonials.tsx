import React from 'react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { Star } from 'lucide-react';

interface TestimonialsProps {
  text: Content['reviews'];
}

const Testimonials: React.FC<TestimonialsProps> = ({ text }) => {
  return (
    <section id="testimonials" className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
         <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
            <span className="text-sm font-bold text-yellow-200 uppercase tracking-widest">5.0 Shopify Rating</span>
         </div>
         <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {text.title}
         </h2>
      </div>

      <div 
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
          {/* Marquee Container */}
          <div className="flex w-max animate-scroll hover:pause-scroll py-4">
            {/* First Loop */}
            <div className="flex gap-6 px-3">
               {text.items.map((review, i) => (
                  <GlassCard key={i} className="w-[350px] p-6 flex-shrink-0 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md">
                     <div className="flex space-x-1 mb-4 text-yellow-400">
                        {[...Array(review.rating)].map((_, r) => (
                            <Star key={r} size={16} fill="currentColor" />
                        ))}
                     </div>
                     <p className="text-gray-300 text-sm leading-relaxed mb-6 h-20">"{review.comment}"</p>
                     <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="font-bold text-white text-sm">{review.storeName}</span>
                        <span className="text-xs text-gray-500">{review.author}</span>
                     </div>
                  </GlassCard>
               ))}
            </div>
            {/* Second Loop (Duplicate) for infinite effect */}
            <div className="flex gap-6 px-3">
               {text.items.map((review, i) => (
                  <GlassCard key={`dup-${i}`} className="w-[350px] p-6 flex-shrink-0 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md">
                     <div className="flex space-x-1 mb-4 text-yellow-400">
                        {[...Array(review.rating)].map((_, r) => (
                            <Star key={r} size={16} fill="currentColor" />
                        ))}
                     </div>
                     <p className="text-gray-300 text-sm leading-relaxed mb-6 h-20">"{review.comment}"</p>
                     <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="font-bold text-white text-sm">{review.storeName}</span>
                        <span className="text-xs text-gray-500">{review.author}</span>
                     </div>
                  </GlassCard>
               ))}
            </div>
          </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .hover\\:pause-scroll:hover {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;