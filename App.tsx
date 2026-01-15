import React, { useState } from 'react';
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

function App() {
  const [lang, setLang] = useState<Language>('es');
  const [currentView, setView] = useState<ViewState>('landing');
  const text = CONTENT[lang];

  const renderContent = () => {
    switch (currentView) {
      case 'blog':
        return <Blog text={text.blog} onBackToHome={() => setView('landing')} />;
      case 'privacy':
        return <PrivacyPolicy text={text.privacyPage} onBack={() => setView('landing')} />;
      case 'terms':
        return <TermsOfService text={text.termsPage} onBack={() => setView('landing')} />;
      case 'contact':
        return <Contact text={text.contactPage} onBack={() => setView('landing')} />;
      case 'landing':
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <Background />
      
      {/* Navbar receives navigation props */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        currentView={currentView}
        setView={setView}
        text={text.nav} 
      />

      <main>
        {renderContent()}
      </main>

      {/* Footer receives navigation props */}
      <Footer text={text.footer} setView={setView} />
    </div>
  );
}

export default App;