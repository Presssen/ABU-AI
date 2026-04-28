
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Language, Content } from '../types';
import { APP_LOGO_URL, SHOPIFY_LOGO_URL } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  text: Content['nav'];
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt-PT', label: 'Português', flag: '🇵🇹' },
  { code: 'pt-BR', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' },
  { code: 'no', label: 'Norsk', flag: '🇳🇴' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', label: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', label: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
];

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);

    const homePath = `/${lang}`;
    if (location.pathname !== homePath && location.pathname !== `${homePath}/`) {
      navigate(homePath);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(`/${lang}${path}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(`/${lang}`);
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
              <a
                href="#partnership"
                onClick={(e) => handleNavClick(e, 'partnership')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group"
              >
                Partners
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#95BF47] transition-all group-hover:w-full"></span>
              </a>
              <button
                onClick={(e) => handlePageChange(e, '/blog')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group"
              >
                {text.blog}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-wider p-2"
                  title="Select Language"
                >
                  <Globe size={16} />
                  <span>{lang}</span>
                </button>

                {langMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto custom-scrollbar">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors ${lang === l.code ? 'text-blue-400 font-bold bg-white/5' : 'text-gray-300'}`}
                        >
                          <span className="text-lg">{l.flag}</span>
                          <span>{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* CTA */}
              <a href="https://apps.shopify.com/abu-cross-selling-upselling" className="flex items-center space-x-2 bg-white text-[#0f172a] pl-3 pr-5 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src={SHOPIFY_LOGO_URL} alt="Shopify" className="w-full h-full object-contain" />
                </div>
                <span>{text.cta}</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="relative">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="appearance-none bg-white/5 border border-white/10 text-gray-300 text-xs font-bold py-1 px-3 pr-6 rounded-full focus:outline-none"
                >
                  {LANGUAGES.map(l => (
                    <option key={l.code} value={l.code} className="bg-[#0f172a] text-white">
                      {l.flag} {l.code.toUpperCase()}
                    </option>
                  ))}
                </select>
                <Globe size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

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
            <a href="#partnership" className="block text-gray-300 hover:text-white font-medium p-2 hover:bg-white/5 rounded-lg" onClick={(e) => handleNavClick(e, 'partnership')}>Partners</a>
            <button className="block w-full text-left text-gray-300 hover:text-white font-medium p-2 hover:bg-white/5 rounded-lg" onClick={(e) => handlePageChange(e, '/blog')}>{text.blog}</button>
            <a href="https://apps.shopify.com/abu-cross-selling-upselling" className="flex items-center justify-center space-x-2 w-full bg-white px-5 py-3 rounded-xl font-bold">
              <img src={SHOPIFY_LOGO_URL} alt="Shopify" className="h-6 w-auto object-contain" />
              <span className="text-slate-900">{text.cta}</span>
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
