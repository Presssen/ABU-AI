
import React from 'react';
import { Content, ViewState } from '../types';
import { Lock } from 'lucide-react';

interface FooterProps {
  text: Content['footer'];
  setView: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ text, setView }) => {
  return (
    <footer className="relative bg-[#0f172a] border-t border-white/10 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center gap-4">
          <div>
            <span className="font-bold text-2xl text-white tracking-tighter">ABU</span>
            <p className="text-gray-500 text-sm mt-1">© 2026 ABU App. {text.rights}</p>
          </div>
          
           {/* Discreet Admin Link - Moved to LEFT to avoid Chat Widget overlap */}
           <button 
            onClick={() => setView('login')} 
            className="hover:text-blue-400 transition-colors ml-4 pl-4 border-l border-gray-700 flex items-center gap-1 opacity-50 hover:opacity-100"
            title="Acceso ABU"
          >
            <Lock size={12} />
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-400">
           <button onClick={() => setView('blog')} className="hover:text-white transition-colors">
            {text.blog}
          </button>
          <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">
            {text.privacy}
          </button>
          <button onClick={() => setView('terms')} className="hover:text-white transition-colors">
            {text.terms}
          </button>
          <button onClick={() => setView('contact')} className="hover:text-white transition-colors">
            {text.contact}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
