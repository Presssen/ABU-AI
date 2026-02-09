import React, { useEffect } from 'react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';

interface TermsOfServiceProps {
  text: Content['termsPage'];
  onBack?: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ text, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-40 pb-24 min-h-screen px-4">
      <SEO
        title={`${text.title} | ABU`}
        description="Read our Terms of Service to understand the rules and regulations for using ABU."
      />
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-300 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>{text.backButton}</span>
        </button>

        <GlassCard className="p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            {text.title}
          </h1>
          <p className="text-gray-400 mb-12">{text.lastUpdated}</p>

          <div className="space-y-8">
            {text.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-white mb-2">{section.heading}</h3>
                <p className="text-gray-300 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default TermsOfService;