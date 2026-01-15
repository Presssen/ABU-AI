import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language, Content, ViewState } from '../types';
import { APP_LOGO_URL, SHOPIFY_LOGO_URL } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  text: Content['nav'];
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, currentView, setView, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (currentView !== 'landing') {
      setView('landing');
      // Allow time for the landing page to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, view: ViewState) => {
    e.preventDefault();
    setIsOpen(false);
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl transition-all duration-300">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" onClick={handleHomeClick} className="block group">
                <img 
                  src={APP_LOGO_URL} 
                  alt="ABU Logo" 
                  className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="#features" 
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group"
              >
                {text.features}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
              <a 
                href="#detailed-features" 
                onClick={(e) => handleNavClick(e, 'detailed-features')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group"
              >
                {text.details}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => handleNavClick(e, 'pricing')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group"
              >
                {text.pricing}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
              <button 
                onClick={(e) => handlePageChange(e, 'blog')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group"
              >
                {text.blog}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </button>
              
              {/* Language Toggle */}
              <button 
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="flex items-center space-x-1 text-gray-300 hover:text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 transition-colors hover:bg-white/10"
              >
                <Globe size={14} />
                <span className="uppercase text-xs font-bold">{lang}</span>
              </button>

              {/* CTA */}
              <a href="#" className="flex items-center space-x-2 bg-white text-[#0f172a] pl-3 pr-5 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                <div className="w-6 h-6 flex items-center justify-center">
                    <img src={SHOPIFY_LOGO_URL} alt="Shopify" className="w-full h-full object-contain" />
                </div>
                <span>{text.cta}</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
               <button 
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="flex items-center space-x-1 text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10"
              >
                <span className="uppercase text-xs font-bold">{lang}</span>
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full mt-2 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-4 shadow-2xl origin-top animate-in fade-in zoom-in-95 duration-200">
            <a href="#features" className="block text-gray-300 hover:text-white font-medium p-2 hover:bg-white/5 rounded-lg" onClick={(e) => handleNavClick(e, 'features')}>{text.features}</a>
            <a href="#detailed-features" className="block text-gray-300 hover:text-white font-medium p-2 hover:bg-white/5 rounded-lg" onClick={(e) => handleNavClick(e, 'detailed-features')}>{text.details}</a>
            <a href="#pricing" className="block text-gray-300 hover:text-white font-medium p-2 hover:bg-white/5 rounded-lg" onClick={(e) => handleNavClick(e, 'pricing')}>{text.pricing}</a>
            <button className="block w-full text-left text-gray-300 hover:text-white font-medium p-2 hover:bg-white/5 rounded-lg" onClick={(e) => handlePageChange(e, 'blog')}>{text.blog}</button>
            <a href="#" className="flex items-center justify-center space-x-2 w-full bg-white text-[#0f172a] px-5 py-3 rounded-xl font-bold">
              <img src={SHOPIFY_LOGO_URL} alt="Shopify" className="h-6 w-auto object-contain" />
              <span>{text.cta}</span>
            </a>
          </div>
        )}
      </nav>
      {/* Spacer to push content down because of fixed floating nav */}
    </>
  );
};

export default Navbar;