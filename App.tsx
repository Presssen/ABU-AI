
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate, useLocation } from 'react-router-dom';
import { Language, DemoProduct } from './types';
import { CONTENT } from './constants';

// Public Components
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
import PromoPopup from './components/PromoPopup';



// Demo Store Components
import DemoStore from './components/demo/DemoStore';
import ProductPage from './components/demo/ProductPage';
import CartPage from './components/demo/CartPage';
import CartDrawer from './components/demo/CartDrawer';
import Checkout from './components/demo/Checkout';
import PostPurchase from './components/demo/PostPurchase';
import { DemoNavbar } from './components/demo/DemoNavbar';

// Main App Component with Router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang/*" element={<AppContent />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

// Redirect from root or invalid lang to detected lang
function RootRedirect() {
  const detectLanguage = (): Language => {
    const browserLang = navigator.language;
    const supported = ['es', 'en', 'de', 'cs', 'ko', 'da', 'fi', 'fr', 'nl', 'it', 'ja', 'no', 'pl', 'sv', 'th', 'tr'];

    if (supported.includes(browserLang)) return browserLang as Language;

    const shortCode = browserLang.split('-')[0];
    if (supported.includes(shortCode)) return shortCode as Language;

    return 'en';
  };

  const defaultLang = detectLanguage();
  const location = useLocation();
  const path = location.pathname === '/' ? '' : location.pathname;

  return <Navigate to={`/${defaultLang}${path}`} replace />;
}

// App Content with Routes
function AppContent() {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Validate language or redirect to default
  const supported = ['es', 'en', 'de', 'cs', 'ko', 'da', 'fi', 'fr', 'nl', 'it', 'ja', 'no', 'pl', 'sv', 'th', 'tr'];
  const lang = (supported.includes(urlLang || '') ? urlLang : 'en') as Language;

  // Demo Store State
  const [selectedProduct, setSelectedProduct] = useState<DemoProduct | null>(null);
  const [additionalCartItems, setAdditionalCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Safe fallback if translation is missing for specific key
  const text = CONTENT[lang] || CONTENT['en'];

  const setLang = (newLang: Language) => {
    // Correctly replace the lang part of the URL
    const segments = location.pathname.split('/').filter(Boolean);
    segments[0] = newLang;
    navigate('/' + segments.join('/'), { replace: true });
  };

  // Demo Handlers
  const handleProductClick = (product: DemoProduct) => {
    setSelectedProduct(product);
    setAdditionalCartItems([]); // Reset extras
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (extras?: any[]) => {
    if (extras) setAdditionalCartItems(extras);
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    window.scrollTo(0, 0);
  };

  const handlePurchaseComplete = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={
        <LandingPage lang={lang} setLang={setLang} text={text} />
      } />

      {/* Public Pages */}
      <Route path="blog" element={
        <PageWithNav lang={lang} setLang={setLang} text={text}>
          <Blog text={text.blog} />
        </PageWithNav>
      } />

      <Route path="blog/:slug" element={
        <PageWithNav lang={lang} setLang={setLang} text={text}>
          <Blog text={text.blog} />
        </PageWithNav>
      } />

      <Route path="contacto" element={
        <PageWithNav lang={lang} setLang={setLang} text={text}>
          <Contact text={text.contactPage} />
        </PageWithNav>
      } />

      <Route path="privacidad" element={
        <PageWithNav lang={lang} setLang={setLang} text={text}>
          <PrivacyPolicy text={text.privacyPage} />
        </PageWithNav>
      } />

      <Route path="terminos" element={
        <PageWithNav lang={lang} setLang={setLang} text={text}>
          <TermsOfService text={text.termsPage} />
        </PageWithNav>
      } />

      {/* Demo Store Routes */}
      <Route path="tienda" element={
        <DemoStorePage
          onProductClick={handleProductClick}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          selectedProduct={selectedProduct}
          additionalCartItems={additionalCartItems}
          handleCheckout={handleCheckout}
          text={text}
          lang={lang}
        />
      } />

      <Route path="tienda/producto/:id" element={
        <ProductPageWrapper
          selectedProduct={selectedProduct}
          onAddToCart={handleAddToCart}
          handleCheckout={handleCheckout}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          additionalCartItems={additionalCartItems}
          text={text}
          lang={lang}
        />
      } />

      <Route path="tienda/carrito" element={
        <CartPageWrapper
          selectedProduct={selectedProduct}
          handleCheckout={handleCheckout}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          additionalCartItems={additionalCartItems}
          text={text}
          lang={lang}
        />
      } />

      <Route path="tienda/checkout" element={
        <CheckoutWrapper
          lang={lang}
          selectedProduct={selectedProduct}
          handlePurchaseComplete={handlePurchaseComplete}
        />
      } />

      <Route path="tienda/confirmacion" element={
        <PostPurchaseWrapper
          lang={lang}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      } />


    </Routes>
  );
}

// Landing Page Component
function LandingPage({ lang, setLang, text }: any) {
  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <Background />
      <Navbar lang={lang} setLang={setLang} text={text.nav} />
      <SEO
        title={text.hero.title + " | ABU"}
        description={text.hero.subtitle}
        lang={lang}
      />
      <Hero text={text.hero} lang={lang} />
      <SocialProof text={text.trust} />
      <Features text={text.features} />
      <DetailedFeatures text={text.detailedFeatures} />
      <Testimonials text={text.reviews} />
      <Pricing text={text.pricing} />
      <FAQ text={text.faq} />
      <Footer text={text.footer} lang={lang} />
      <CookieConsent text={text.cookieConsent} lang={lang} />
      <ChatWidget lang={lang} content={text} />
      <PromoPopup lang={lang} />
    </div>
  );
}

// Page with Navigation wrapper
function PageWithNav({ lang, setLang, text, children }: any) {
  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <Background />
      <Navbar lang={lang} setLang={setLang} text={text.nav} />
      <main>{children}</main>
      <Footer text={text.footer} lang={lang} />
      <CookieConsent text={text.cookieConsent} lang={lang} />
      <ChatWidget lang={lang} content={text} />
    </div>
  );
}

// Demo Store Page
function DemoStorePage({ onProductClick, isCartOpen, setIsCartOpen, selectedProduct, additionalCartItems, handleCheckout, text, lang }: any) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <Background />
      <DemoNavbar
        onExit={() => navigate(`/${lang}`)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={additionalCartItems.length + (selectedProduct ? 1 : 0)}
      />
      <main>
        <DemoStore onProductClick={(product: DemoProduct) => {
          onProductClick(product);
          // Special logic for Product ID 4 & 5 (Cart Page Demos)
          if (product.id === 4 || product.id === 5) {
            navigate(`/${lang}/tienda/carrito`);
          } else {
            navigate(`/${lang}/tienda/producto/${product.id}`);
          }
        }} />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        product={selectedProduct}
        additionalItems={additionalCartItems}
        onCheckout={() => {
          handleCheckout();
          navigate(`/${lang}/tienda/checkout`);
        }}
      />
      <CookieConsent text={text.cookieConsent} lang={lang} />
      <ChatWidget lang={lang} content={text} />
    </div>
  );
}

// Product Page Wrapper
function ProductPageWrapper({ selectedProduct, onAddToCart, handleCheckout, isCartOpen, setIsCartOpen, additionalCartItems, text, lang }: any) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Load product if not already selected
  useEffect(() => {
    if (!selectedProduct && id) {
      navigate(`/${lang}/tienda`);
    }
  }, [id, selectedProduct, navigate, lang]);

  if (!selectedProduct) return null;

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <Background />
      <DemoNavbar
        onExit={() => navigate(`/${lang}`)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={additionalCartItems.length + 1}
      />
      <main>
        <ProductPage
          product={selectedProduct}
          onBack={() => navigate(`/${lang}/tienda`)}
          onAddToCart={onAddToCart}
          onDirectCheckout={() => {
            handleCheckout();
            navigate(`/${lang}/tienda/checkout`);
          }}
        />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        product={selectedProduct}
        additionalItems={additionalCartItems}
        onCheckout={() => {
          handleCheckout();
          navigate(`/${lang}/tienda/checkout`);
        }}
      />
      <CookieConsent text={text.cookieConsent} lang={lang} />
      <ChatWidget lang={lang} content={text} />
    </div>
  );
}

// Cart Page Wrapper
function CartPageWrapper({ selectedProduct, handleCheckout, isCartOpen, setIsCartOpen, additionalCartItems, text, lang }: any) {
  const navigate = useNavigate();

  if (!selectedProduct) {
    navigate(`/${lang}/tienda`);
    return null;
  }

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30">
      <Background />
      <DemoNavbar
        onExit={() => navigate(`/${lang}`)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={additionalCartItems.length + 1}
      />
      <main>
        <CartPage
          product={selectedProduct}
          onBack={() => navigate(`/${lang}/tienda`)}
          onCheckout={() => {
            handleCheckout();
            navigate(`/${lang}/tienda/checkout`);
          }}
        />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        product={selectedProduct}
        additionalItems={additionalCartItems}
        onCheckout={() => {
          handleCheckout();
          navigate(`/${lang}/tienda/checkout`);
        }}
      />
      <CookieConsent text={text.cookieConsent} lang={lang} />
      <ChatWidget lang={lang} content={text} />
    </div>
  );
}

// Checkout Wrapper
function CheckoutWrapper({ selectedProduct, handlePurchaseComplete, lang }: any) {
  const navigate = useNavigate();

  if (!selectedProduct) {
    navigate(`/${lang}/tienda`);
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        <Checkout
          product={selectedProduct}
          onComplete={() => {
            handlePurchaseComplete();
            navigate(`/${lang}/tienda/confirmacion`);
          }}
          onBackToStore={() => navigate(`/${lang}/tienda/producto/${selectedProduct.id}`)}
        />
      </main>
    </div>
  );
}

// Post Purchase Wrapper
function PostPurchaseWrapper({ selectedProduct, setSelectedProduct, lang }: any) {
  const navigate = useNavigate();

  if (!selectedProduct) {
    navigate(`/${lang}/tienda`);
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        <PostPurchase
          product={selectedProduct}
          onBack={() => {
            setSelectedProduct(null);
            navigate(`/${lang}/tienda`);
          }}
        />
      </main>
    </div>
  );
}


export default App;
