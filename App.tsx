
import React, { useState, useEffect } from 'react';
import { Language, ViewState } from './types';
import { CONTENT } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import DetailedFeatures from './components/DetailedFeatures';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Background from './components/Background';
import SEO from './components/SEO';
import CookieConsent from './components/CookieConsent';
import ChatWidget from './components/ChatWidget';
// CRM Imports
import LoginPage from './crm/auth/LoginPage';
import Dashboard from './crm/Dashboard';

function App() {
  const [lang, setLang] = useState<Language>('es');
  const [currentView, setView] = useState<ViewState>('landing');
  
  // CRM State
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const text = CONTENT[lang];

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('abu_crm_user');
    if (savedUser) {
        setCurrentUser(savedUser);
        setView('dashboard');
    }
  }, []);

  const handleLoginSuccess = (username: string) => {
      setCurrentUser(username);
      setView('dashboard');
  };

  const handleLogout = () => {
      // Remove saved session
      localStorage.removeItem('abu_crm_user');
      setCurrentUser(null);
      setView('landing');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
          if (!currentUser) {
              setView('login');
              return null;
          }
          return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
          
      case 'login':
          return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setView('landing')} />;

      case 'blog':
        return (
            <>
                <Navbar lang={lang} setLang={setLang} currentView={currentView} setView={setView} text={text.nav} />
                <Blog text={text.blog} onBackToHome={() => setView('landing')} />
                <Footer text={text.footer} setView={setView} />
            </>
        );
      case 'privacy':
        return (
            <>
                <Navbar lang={lang} setLang={setLang} currentView={currentView} setView={setView} text={text.nav} />
                <PrivacyPolicy text={text.privacyPage} onBack={() => setView('landing')} />
                <Footer text={text.footer} setView={setView} />
            </>
        );
      case 'terms':
        return (
            <>
                <Navbar lang={lang} setLang={setLang} currentView={currentView} setView={setView} text={text.nav} />
                <TermsOfService text={text.termsPage} onBack={() => setView('landing')} />
                <Footer text={text.footer} setView={setView} />
            </>
        );
      case 'contact':
        return (
            <>
                <Navbar lang={lang} setLang={setLang} currentView={currentView} setView={setView} text={text.nav} />
                <Contact text={text.contactPage} onBack={() => setView('landing')} />
                <Footer text={text.footer} setView={setView} />
            </>
        );
      case 'landing':
      default:
        return (
          <>
            <Navbar lang={lang} setLang={setLang} currentView={currentView} setView={setView} text={text.nav} />
            <SEO 
              title={lang === 'en' ? "ABU - #1 Upsell & Cross-sell App for Shopify" : "ABU - App #1 de Upsell y Cross-sell para Shopify"}
              description={lang === 'en' 
                ? "Increase your AOV with Frequently Bought Together, In-Cart Upsells, and Post-Purchase offers. Native design and AI recommendations." 
                : "Aumenta tu Ticket Medio con Comprados Juntos, Upsells en Carrito y ofertas Post-Compra. Diseño nativo y recomendaciones por IA."}
            />
            <Hero text={text.hero} />
            <SocialProof text={text.trust} />
            <Features text={text.features} />
            <DetailedFeatures text={text.detailedFeatures} />
            <Testimonials text={text.reviews} />
            <Pricing text={text.pricing} />
            <FAQ text={text.faq} />
            <Footer text={text.footer} setView={setView} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <Background />
      
      <main>
        {renderContent()}
      </main>

      {/* Utilities that should persist across public pages but maybe not Dashboard if we want clean UI */}
      {currentView !== 'dashboard' && currentView !== 'login' && (
          <>
            <CookieConsent text={text.cookieConsent} setView={setView} />
            <ChatWidget lang={lang} content={text} />
          </>
      )}
    </div>
  );
}

export default App;
