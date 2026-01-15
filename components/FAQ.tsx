import React, { useState } from 'react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  text: Content['faq'];
}

const FAQ: React.FC<FAQProps> = ({ text }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {text.title}
          </h2>
          <p className="text-blue-200/70 text-lg">
            {text.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {text.items.map((item, index) => (
            <GlassCard key={index} className="overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleIndex(index)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-white">{item.question}</span>
                <span className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-white/10' : ''}`}>
                   <ChevronDown className="text-blue-300" size={20} />
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                 <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5">
                    {item.answer}
                 </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;