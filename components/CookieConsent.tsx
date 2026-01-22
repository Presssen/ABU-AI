import React, { useState, useEffect } from 'react';
import { Content, ViewState, CookieCategory } from '../types';
import { Cookie, X, Check } from 'lucide-react';

interface CookieConsentProps {
  text: Content['cookieConsent'];
  setView: (view: ViewState) => void;
}

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookieConsent: React.FC<CookieConsentProps> = ({ text, setView }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true
  });

  useEffect(() => {
    // Check if consent has already been given
    const savedConsent = localStorage.getItem('abu_cookie_consent');
    if (!savedConsent) {
      // Small delay for animation
      setTimeout(() => setIsVisible(true), 1000);
    } else {
        // If saved, load preferences just in case user re-opens (not implemented yet, but good practice)
        try {
            const parsed = JSON.parse(savedConsent);
            if(typeof parsed === 'object') setPreferences(parsed);
        } catch(e) { /* ignore legacy string values */ }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('abu_cookie_consent', JSON.stringify(prefs));
    setIsVisible(false);
    setShowModal(false);
    
    // Here you would normally initialize your scripts based on prefs
    if(prefs.analytics) console.log("Init Analytics");
    if(prefs.marketing) console.log("Init Marketing");
  };

  const handleAcceptAll = () => {
    const allTrue = { necessary: true, analytics: true, marketing: true };
    setPreferences(allTrue);
    saveConsent(allTrue);
  };

  const handleDeclineAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('privacy');
  };
  
  const togglePreference = (id: keyof CookiePreferences) => {
      if(id === 'necessary') return; // Cannot toggle necessary
      setPreferences(prev => ({
          ...prev,
          [id]: !prev[id]
      }));
  };

  if (!isVisible && !showModal) return null;

  return (
    <>
      {/* 1. Bottom Banner */}
      {isVisible && !showModal && (
        <div className="fixed bottom-0 left-0 w-full p-4 z-[100] animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
              
              <div className="flex items-start md:items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 hidden sm:block">
                    <Cookie size={24} />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                    {text.text}{' '}
                    <button 
                    onClick={handlePrivacyClick}
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium transition-colors"
                    >
                    {text.privacyLink}
                    </button>.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-center lg:justify-end">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {text.customize}
                </button>
                <button
                  onClick={handleDeclineAll}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {text.decline}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 whitespace-nowrap"
                >
                  {text.accept}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. Detailed Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={() => setShowModal(false)}
            />
            
            {/* Modal Content */}
            <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1e293b]/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Cookie size={20} className="text-blue-400" />
                        {text.modal.title}
                    </h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <p className="text-gray-400 text-sm mb-6">
                        {text.modal.description}
                    </p>

                    <div className="space-y-4">
                        {text.modal.categories.map((cat: CookieCategory) => (
                            <div key={cat.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-start gap-4 justify-between">
                                <div className="flex-1 pr-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-white text-sm">{cat.title}</h3>
                                        {cat.required && (
                                            <span className="text-[10px] uppercase font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">
                                                Required
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        {cat.description}
                                    </p>
                                </div>
                                
                                {/* Toggle Switch Logic */}
                                <button
                                    onClick={() => togglePreference(cat.id as keyof CookiePreferences)}
                                    disabled={cat.required}
                                    className={`
                                        w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-[#0f172a] flex items-center flex-shrink-0
                                        ${cat.required || preferences[cat.id as keyof CookiePreferences] ? 'bg-blue-600' : 'bg-gray-600'}
                                        ${cat.required ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                                    `}
                                >
                                    <span
                                        className={`
                                            block w-4 h-4 bg-white rounded-full transition-transform transform duration-200 ease-in-out
                                            ${cat.required || preferences[cat.id as keyof CookiePreferences] ? 'translate-x-6' : 'translate-x-1'}
                                        `}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-[#1e293b]/50 flex justify-end gap-3">
                     <button
                        onClick={handleDeclineAll}
                        className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors"
                    >
                        {text.decline}
                    </button>
                    <button
                        onClick={handleSavePreferences}
                        className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
                    >
                        {text.modal.save}
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;