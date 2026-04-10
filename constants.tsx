
import React from 'react';
import { ShoppingBag, Layers, ArrowUpCircle, Award, ShieldCheck, Zap } from 'lucide-react';
import { Content, Language, BlogPost } from './types';
import { BLOG_POSTS_EN_EXPANDED } from './data/blog/en_expanded';
import { BLOG_POSTS_ES_EXPANDED } from './data/blog/es_expanded';
import { BLOG_POSTS_DE } from './data/blog/de';
import { BLOG_POSTS_FR } from './data/blog/fr';
import { BLOG_POSTS_IT } from './data/blog/it';
import { BLOG_POSTS_PT_PT } from './data/blog/pt-pt';
import { BLOG_POSTS_PT_BR } from './data/blog/pt-br';
import { BLOG_POSTS_NL } from './data/blog/nl';
import { BLOG_POSTS_PL } from './data/blog/pl';
import { BLOG_POSTS_SV } from './data/blog/sv';
import { BLOG_POSTS_DA } from './data/blog/da';
import { BLOG_POSTS_FI } from './data/blog/fi';
import { BLOG_POSTS_NO } from './data/blog/no';
import { BLOG_POSTS_CS } from './data/blog/cs';
import { BLOG_POSTS_TR } from './data/blog/tr';
import { BLOG_POSTS_JA } from './data/blog/ja';
import { BLOG_POSTS_KO } from './data/blog/ko';
import { BLOG_POSTS_ZH_CN } from './data/blog/zh-cn';
import { BLOG_POSTS_ZH_TW } from './data/blog/zh-tw';
import { BLOG_POSTS_TH } from './data/blog/th';

// Legal Imports
import { LEGAL_EN } from './data/legal/en';
import { LEGAL_ES } from './data/legal/es';
import { LEGAL_DE } from './data/legal/de';
import { LEGAL_FR } from './data/legal/fr';
import { LEGAL_IT } from './data/legal/it';
import { LEGAL_PT } from './data/legal/pt'; // Using same file for PT/BR base legal text
import { LEGAL_NL } from './data/legal/nl';
import { LEGAL_PL } from './data/legal/pl';
import { LEGAL_SV } from './data/legal/sv';
import { LEGAL_DA } from './data/legal/da';
import { LEGAL_FI } from './data/legal/fi';
import { LEGAL_NO } from './data/legal/no';
import { LEGAL_CS } from './data/legal/cs';
import { LEGAL_TR } from './data/legal/tr';
import { LEGAL_JA } from './data/legal/ja';
import { LEGAL_KO } from './data/legal/ko';
import { LEGAL_ZH_CN } from './data/legal/zh-cn';
import { LEGAL_ZH_TW } from './data/legal/zh-tw';
import { LEGAL_TH } from './data/legal/th';

export const APP_LOGO_URL = "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/new-abu-logo.png?v=1768487866";
export const SHOPIFY_LOGO_URL = "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/Shopify-Logo-PNG.png?v=1770039583";

// Helper to create basic content structure
const createContent = (
  langCode: string,
  t: {
    // Nav & Hero
    navFeatures: string, navPricing: string, navBlog: string, cta: string,
    heroTitle: string, heroSubtitle: string,
    // Features
    featuresTitle: string, fbtTitle: string, fbtDesc: string, popupTitle: string, popupDesc: string, ppTitle: string, ppDesc: string,
    // Pricing
    pricingTitle: string, pricingSubtitle: string, planFree: string, planStarter: string, planGrow: string, planAdv: string, month: string,
    // FAQ
    faqTitle: string,
    // Cookies
    cookieText: string, cookieAccept: string,
    // Misc
    backHome?: string
  },
  posts: BlogPost[] = BLOG_POSTS_EN_EXPANDED,
  legal: { privacy: any, terms: any } = LEGAL_EN
): Content => {
  // Clone English as base
  const base = JSON.parse(JSON.stringify(CONTENT_BASE.en)) as Content;

  // 1. Navigation & Hero
  base.nav.features = t.navFeatures;
  base.nav.pricing = t.navPricing;
  base.nav.blog = t.navBlog;
  base.nav.cta = t.cta;
  base.hero.title = t.heroTitle;
  base.hero.subtitle = t.heroSubtitle;
  base.hero.ctaPrimary = t.cta;

  // 2. Features (Three Engines)
  base.features.title = t.featuresTitle;
  base.features.items.fbt.title = t.fbtTitle;
  base.features.items.fbt.description = t.fbtDesc;
  base.features.items.popup.title = t.popupTitle;
  base.features.items.popup.description = t.popupDesc;
  base.features.items.postPurchase.title = t.ppTitle;
  base.features.items.postPurchase.description = t.ppDesc;

  // 3. Pricing (Titles & Plan Names)
  base.pricing.title = t.pricingTitle;
  base.pricing.subtitle = t.pricingSubtitle;
  base.pricing.monthly = t.month;
  base.pricing.plans[0].name = t.planFree;
  base.pricing.plans[1].name = t.planStarter;
  base.pricing.plans[2].name = t.planGrow;
  base.pricing.plans[3].name = t.planAdv;

  // 4. FAQ Title
  base.faq.title = t.faqTitle;


  // 6. Legal (Full Replacement)
  base.privacyPage = legal.privacy;
  base.termsPage = legal.terms;

  // Also update footer links to match legal titles if desired, or keep generic "Privacy Policy" translation
  // For now we keep the footer keys as passed in 't' or base, but update the actual legal page content.
  base.privacyPage.backButton = t.backHome || "Back";
  base.termsPage.backButton = t.backHome || "Back";

  // Blog
  base.blog.posts = posts;

  return base;
};

const CONTENT_BASE: Record<'en' | 'es', Content> = {
  en: {
    nav: { features: "Engines", details: "Features", pricing: "Pricing", testimonials: "Reviews", blog: "Blog", cta: "Install App", demo: "Demo Store" },
    hero: {
      badge: "Shopify's #1 Upsell App",
      title: "Skyrocket Your AOV with Smart Upsells",
      subtitle: "The all-in-one solution for Frequently Bought Together, In-Cart Popups, and Post-Purchase funnels. Designed to look native to your store.",
      ctaPrimary: "Start Free Trial", ctaSecondary: "Calculate Your Revenue with ABU",
      stats: { users: "10,000+ Merchants", rating: "5.0/5 Rating" }
    },
    features: {
      title: "Three Powerful Engines", subtitle: "Select an engine to see how it integrates seamlessly into your store's flow.",
      items: {
        fbt: { title: "Frequently Bought Together", description: "Amazon-style recommendations located directly on the product page. Uses AI to pair items.", icon: "layers" },
        popup: { title: "Smart Cart Pop-up", description: "A non-intrusive popup that appears when adding to cart, offering a complementary product.", icon: "shopping-bag" },
        postPurchase: { title: "Post-Purchase Funnel", description: "The highest converting offer. Appears after checkout but before the thank you page. 1-Click Buy.", icon: "arrow-up" }
      }
    },
    detailedFeatures: {
      title: "Everything You Need to Scale", subtitle: "Packed with advanced features designed to maximize every visitor's value.",
      ai: { title: "AI & Smart Recommendations", description: "Our machine learning algorithm analyzes store data to suggest products most likely to convert.", tag: "Automated" },
      widgets: { title: "5+ Widget Types", description: "Versatile layouts for every page: Product, Cart, Thank You, and more.", tag: "Versatile" },
      design: { title: "Native Design Adaptation", description: "We automatically detect your theme's fonts and colors. It looks like you coded it yourself.", tag: "Zero Config" },
      bundles: { title: "Bundle Discounts", description: "Incentivize bulk purchases with automatic tiered discounts." },
      seo: { title: "SEO & AI Search Ready", description: "Your bundles generate structured data that appears in Google results and AI search engines like ChatGPT, Perplexity, and Gemini. More organic visibility, more sales.", tag: "SEO" },
      data: { title: "Data Analytics", description: "Track views, clicks, and conversion revenue in real-time." },
      translation: { title: "Multi-language", description: "Fully translatable widgets for global stores." },
      support: { title: "Expert Support", description: "Direct access to Shopify experts via chat and email." },
      comingSoon: { title: "Quantity Discounts & Comparison Tables", description: "Coming soon: Volume discount widgets that encourage higher quantities, and side-by-side comparison tables to help customers choose premium options.", tag: "Coming Soon" }
    },
    reviews: {
      title: "Loved by Merchants",
      items: [
        { storeName: "The Organic Tea Co.", author: "Sarah J.", comment: "Increased our AOV by 15% in the first week. The FBT widget looks exactly like our theme.", rating: 5 },
        { storeName: "Urban Streetwear", author: "Mike T.", comment: "The post-purchase upsell is a game changer. We're capturing sales we didn't know existed.", rating: 5 },
        { storeName: "Pet Paradise", author: "Emily R.", comment: "Super easy to set up. The support team helped me customize the CSS to match my brand perfectly.", rating: 5 },
        { storeName: "Gadget World", author: "Alex D.", comment: "Tried 3 other apps before ABU. This is the only one that doesn't slow down my site.", rating: 5 },
        { storeName: "Luxe Beauty", author: "Jessica M.", comment: "My customers love the bundle offers. Highly recommended for any Shopify store.", rating: 5 }
      ]
    },
    trust: { title: "Trusted by E-commerce Experts", partners: ["Shopify Plus", "Certified Partner", "Liquid Masters"] },
    pricing: {
      title: "Simple, Transparent Pricing", subtitle: "Plans that scale with your business growth.", monthly: "/month",
      plans: [
        { name: "Free", price: "Free", description: "For development stores.", features: ["Stores in development", "1 order per month", "Trial period"] },
        { name: "Starter", price: "$9.99", description: "Essential tools for new stores.", features: ["Unlimited orders", "1 widget", "Data analysis", "Translations", "2–5% conversion", "Design adaptation", "Email support"] },
        { name: "Grow", price: "$16.99", description: "More power for growing brands.", features: ["Unlimited orders", "6+ widgets", "5–10% conversion", "Design adaptation", "Email support", "Data analysis", "Translations"], recommended: true },
        { name: "Advanced", price: "$24.99", description: "Maximum performance.", features: ["Unlimited orders", "6+ widgets", "10% conversion", "AI Algorithm", "Live Chat", "Data analysis", "Translations"] }
      ]
    },
    faq: {
      title: "Frequently Asked Questions", subtitle: "Everything you need to know about ABU.",
      items: [
        { question: "Does ABU affect my store's loading speed?", answer: "No. ABU is optimized for performance using asynchronous loading, ensuring Core Web Vitals remain healthy." },
        { question: "Can I customize the design?", answer: "Yes. ABU auto-detects your theme, but you can fully customize colors, CSS, and text." },
        { question: "How does the AI work?", answer: "It analyzes historical order data to find patterns. For new stores, it uses global intelligence based on product types." },
        { question: "Is it compatible with Shopify 2.0?", answer: "Yes, fully compatible with App Blocks for easy placement in the Theme Editor." }
      ]
    },
    blog: { title: "The ABU Blog: eCommerce Growth Strategies", subtitle: "Learn from cross-selling and upselling experts. Detailed guides to scale your Shopify brand and boost your AOV.", backButton: "Back to list", readMore: "Read full article", posts: BLOG_POSTS_EN_EXPANDED },
    footer: { rights: "All rights reserved.", terms: "Terms of Service", privacy: "Privacy Policy", contact: "Contact Us", blog: "Blog" },
    privacyPage: LEGAL_EN.privacy,
    termsPage: LEGAL_EN.terms,
    contactPage: { title: "Contact Us", subtitle: "Need help?", backButton: "Back", form: { name: "Name", email: "Email", message: "Message", submit: "Send", sending: "Sending...", successTitle: "Sent!", successMessage: "We'll reply soon.", error: "Error sending." } },
    cookieConsent: {
      text: "We use cookies to improve your experience and analyze traffic. By clicking \"Accept\", you consent to our use of cookies.",
      privacyLink: "Privacy Policy",
      accept: "Accept",
      decline: "Decline",
      customize: "Settings",
      modal: {
        title: "Cookie Settings",
        description: "Manage your preferences. You can choose which types of cookies you want to allow.",
        save: "Save Preferences",
        requiredText: "Required",
        categories: [
          {
            id: 'necessary',
            title: "Strictly Necessary",
            description: "These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences or logging in.",
            required: true
          },
          {
            id: 'analytics',
            title: "Performance & Analytics",
            description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
            required: false
          },
          {
            id: 'marketing',
            title: "Marketing & Targeting",
            description: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
            required: false
          }
        ]
      }
    }
  },
  es: {
    nav: { features: "Motores", details: "Funcionalidades", pricing: "Precios", testimonials: "Reseñas", blog: "Blog", cta: "Instalar App", demo: "Tienda Demo" },
    hero: {
      badge: "App #1 de Upsell en Shopify",
      title: "Dispara tu Ticket Medio con Upsells Inteligentes",
      subtitle: "La solución todo en uno para 'Comprados Juntos Habitualmente', Pop-ups de Carrito y Embudos Post-compra. Diseño nativo para tu tienda.",
      ctaPrimary: "Empezar Prueba Gratis", ctaSecondary: "Calcula tu Facturación con ABU",
      stats: { users: "+10,000 Tiendas", rating: "Valoración 5.0/5" }
    },
    features: {
      title: "Tres Motores Potentes", subtitle: "Selecciona un motor para ver cómo se integra perfectamente.",
      items: {
        fbt: { title: "Comprados Juntos", description: "Recomendaciones estilo Amazon ubicadas directamente en la página de producto. Usa IA.", icon: "layers" },
        popup: { title: "Pop-up de Carrito", description: "Un popup no intrusivo que aparece al añadir al carrito, ofreciendo un producto complementario.", icon: "shopping-bag" },
        postPurchase: { title: "Embudo Post-Compra", description: "La oferta de mayor conversión. Aparece tras el pago. Compra en 1-Click.", icon: "arrow-up" }
      }
    },
    detailedFeatures: {
      title: "Todo lo que Necesitas para Escalar", subtitle: "Equipado con funciones avanzadas.",
      ai: { title: "IA y Recomendaciones Smart", description: "Algoritmo de aprendizaje automático que sugiere productos con alta probabilidad de conversión.", tag: "Automatizado" },
      widgets: { title: "+5 Tipos de Widgets", description: "Diseños versátiles para Producto, Carrito, Thank You page y más.", tag: "Versátil" },
      design: { title: "Adaptación de Diseño Nativo", description: "Detectamos automáticamente las fuentes y colores de tu tema.", tag: "Zero Config" },
      bundles: { title: "Descuentos por Bundles", description: "Incentiva compras masivas con descuentos escalonados." },
      seo: { title: "SEO y Buscadores IA", description: "Tus bundles generan datos estructurados que aparecen en Google y en buscadores IA como ChatGPT, Perplexity y Gemini. Más visibilidad orgánica, más ventas.", tag: "SEO" },
      data: { title: "Análisis de Datos", description: "Rastrea vistas, clics e ingresos en tiempo real." },
      translation: { title: "Multi-idioma", description: "Widgets totalmente traducibles." },
      support: { title: "Soporte Experto", description: "Acceso directo a expertos vía chat y email." },
      comingSoon: { title: "Descuentos por Cantidad y Tablas Comparativas", description: "Próximamente: Widgets de descuento por volumen que incentivan compras mayores, y tablas comparativas lado a lado para que tus clientes elijan las opciones premium.", tag: "Próximamente" }
    },
    reviews: {
      title: "Amado por los eCommerce",
      items: [
        { storeName: "The Organic Tea Co.", author: "Sarah J.", comment: "Aumentó nuestro AOV un 15% en la primera semana. El widget FBT se ve increíble.", rating: 5 },
        { storeName: "Urban Streetwear", author: "Mike T.", comment: "El upsell post-compra es una locura. Estamos capturando ventas extra sin esfuerzo.", rating: 5 },
        { storeName: "Pet Paradise", author: "Emily R.", comment: "Súper fácil de configurar. El equipo de soporte me ayudó con el CSS.", rating: 5 },
        { storeName: "Gadget World", author: "Alex D.", comment: "Probé 3 apps antes de ABU. Esta es la única que no ralentiza la web.", rating: 5 },
        { storeName: "Luxe Beauty", author: "Jessica M.", comment: "A mis clientes les encantan las ofertas de bundles.", rating: 5 }
      ]
    },
    trust: { title: "Con la confianza de Expertos", partners: ["Shopify Plus", "Partner Certificado", "Maestros Liquid"] },
    pricing: {
      title: "Precios Simples y Claros", subtitle: "Planes que escalan con tu negocio.", monthly: "/mes",
      plans: [
        { name: "Gratis", price: "Gratis", description: "Para tiendas en desarrollo.", features: ["Tiendas desarrollo", "1 pedido/mes", "Periodo de prueba"] },
        { name: "Inicial", price: "$9.99", description: "Herramientas esenciales.", features: ["Pedidos ilimitados", "1 widget", "Análisis de datos", "Traducciones", "Diseño adaptado", "Soporte email"] },
        { name: "Crecimiento", price: "$16.99", description: "Más potencia.", features: ["Pedidos ilimitados", "+ de 6 widgets", "Diseño adaptado", "Soporte email", "Análisis", "Traducciones"], recommended: true },
        { name: "Avanzado", price: "$24.99", description: "Máximo rendimiento.", features: ["Pedidos ilimitados", "+ de 6 widgets", "Algoritmo IA", "Soporte Chat", "Análisis", "Traducciones"] }
      ]
    },
    faq: {
      title: "Preguntas Frecuentes", subtitle: "Todo lo que necesitas saber.",
      items: [
        { question: "¿Afecta a la velocidad de carga?", answer: "No. ABU carga de forma asíncrona para no afectar tus Core Web Vitals." },
        { question: "¿Puedo personalizar el diseño?", answer: "Sí. ABU detecta tu tema automáticamente, pero puedes editar todo el CSS." },
        { question: "¿Cómo funciona la IA?", answer: "Analiza el historial de pedidos para encontrar patrones de compra." },
        { question: "¿Es compatible con Shopify 2.0?", answer: "Sí, usa App Blocks para una integración perfecta." }
      ]
    },
    blog: { title: "Blog de ABU: Estrategias para eCommerce", subtitle: "Aprende cómo aumentar el ticket medio, optimizar conversiones y escalar tu tienda Shopify con nuestros expertos.", backButton: "Volver al listado", readMore: "Leer artículo completo", posts: BLOG_POSTS_ES_EXPANDED },
    footer: { rights: "Todos los derechos reservados.", terms: "Términos", privacy: "Privacidad", contact: "Contacto", blog: "Blog" },
    privacyPage: LEGAL_ES.privacy,
    termsPage: LEGAL_ES.terms,
    contactPage: { title: "Contáctanos", subtitle: "¿Necesitas ayuda?", backButton: "Volver", form: { name: "Nombre", email: "Email", message: "Mensaje", submit: "Enviar", sending: "Enviando...", successTitle: "¡Enviado!", successMessage: "Responderemos pronto.", error: "Error." } },
    cookieConsent: {
      text: "Utilizamos cookies para mejorar tu experiencia y analizar el tráfico. Al hacer clic en \"Aceptar\", aceptas nuestro uso de cookies.",
      privacyLink: "Política de Privacidad",
      accept: "Aceptar",
      decline: "Rechazar",
      customize: "Configurar",
      modal: {
        title: "Preferencias de Cookies",
        description: "Gestiona tus preferencias. Puedes elegir qué tipos de cookies deseas permitir.",
        save: "Guardar Preferencias",
        requiredText: "Obligatorio",
        categories: [
          {
            id: 'necessary',
            title: "Estrictamente Necesarias",
            description: "Estas cookies son esenciales para que el sitio web funcione y no se pueden desactivar. Normalmente solo se configuran en respuesta a acciones realizadas por ti que equivalen a una solicitud de servicios, como establecer tus preferencias de privacidad o iniciar sesión.",
            required: true
          },
          {
            id: 'analytics',
            title: "Rendimiento y Analítica",
            description: "Estas cookies nos permiten contar las visitas y fuentes de tráfico para que podamos medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y menos populares y ver cómo se mueven los visitantes por el sitio.",
            required: false
          },
          {
            id: 'marketing',
            title: "Marketing y Publicidad",
            description: "Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas por esas empresas para crear un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios.",
            required: false
          }
        ]
      }
    }
  }
};

export const CONTENT: Record<Language, Content> = {
  // Core Languages
  en: CONTENT_BASE.en,
  es: CONTENT_BASE.es,

  // Translated Languages
  de: createContent('de', {
    navFeatures: "Funktionen", navPricing: "Preise", navBlog: "Blog", cta: "Kostenlos Testen",
    heroTitle: "Steigern Sie Ihren AOV mit Smart Upsells", heroSubtitle: "Die All-in-One-Lösung für Frequently Bought Together und Post-Purchase.",
    featuresTitle: "Drei Leistungsstarke Motoren",
    fbtTitle: "Häufig zusammen gekauft", fbtDesc: "Amazon-ähnliche Empfehlungen direkt auf der Produktseite.",
    popupTitle: "Smart Cart Pop-up", popupDesc: "Ein nicht aufdringliches Popup mit passenden Angeboten.",
    ppTitle: "Post-Purchase Funnel", ppDesc: "Das Angebot mit der höchsten Konversion nach dem Kauf.",
    pricingTitle: "Einfache Preise", pricingSubtitle: "Pläne, die mit Ihnen wachsen.",
    planFree: "Gratis", planStarter: "Starter", planGrow: "Wachstum", planAdv: "Profi", month: "/monat",
    faqTitle: "Häufige Fragen",
    cookieText: "Wir verwenden Cookies für eine bessere Erfahrung.", cookieAccept: "Akzeptieren",
    // Legal Override via params not needed as we pass LEGAL_DE object
  }, BLOG_POSTS_DE, LEGAL_DE),

  fr: createContent('fr', {
    navFeatures: "Fonctionnalités", navPricing: "Tarifs", navBlog: "Blog", cta: "Essai Gratuit",
    heroTitle: "Explosez votre AOV avec Smart Upsells", heroSubtitle: "La solution tout-en-un pour les achats groupés et les tunnels post-achat.",
    featuresTitle: "Trois Moteurs Puissants",
    fbtTitle: "Fréquemment achetés ensemble", fbtDesc: "Recommandations style Amazon sur la page produit.",
    popupTitle: "Popup Panier", popupDesc: "Offre complémentaire non intrusive lors de l'ajout au panier.",
    ppTitle: "Tunnel Post-Achat", ppDesc: "L'offre à plus forte conversion après le paiement. Achat en 1 clic.",
    pricingTitle: "Tarification Simple", pricingSubtitle: "Des plans qui évoluent avec vous.",
    planFree: "Gratuit", planStarter: "Démarrage", planGrow: "Croissance", planAdv: "Avancé", month: "/mois",
    faqTitle: "FAQ",
    cookieText: "Nous utilisons des cookies pour améliorer votre expérience.", cookieAccept: "Accepter",
  }, BLOG_POSTS_FR, LEGAL_FR),

  it: createContent('it', {
    navFeatures: "Funzionalità", navPricing: "Prezzi", navBlog: "Blog", cta: "Prova Gratuita",
    heroTitle: "Aumenta il tuo AOV con Smart Upsells", heroSubtitle: "Soluzione all-in-one per 'Spesso comprati insieme' e post-acquisto.",
    featuresTitle: "Tre Motori Potenti",
    fbtTitle: "Spesso comprati insieme", fbtDesc: "Raccomandazioni stile Amazon sulla pagina prodotto.",
    popupTitle: "Popup Carrello", popupDesc: "Offerta complementare non intrusiva nel carrello.",
    ppTitle: "Funnel Post-Acquisto", ppDesc: "L'offerta a più alta conversione dopo il checkout.",
    pricingTitle: "Prezzi Semplici", pricingSubtitle: "Piani che crescono con te.",
    planFree: "Gratis", planStarter: "Base", planGrow: "Crescita", planAdv: "Avanzato", month: "/mese",
    faqTitle: "Domande Frequenti",
    cookieText: "Utilizziamo i cookie per migliorare l'esperienza.", cookieAccept: "Accetta",
  }, BLOG_POSTS_IT, LEGAL_IT),

  'pt-PT': createContent('pt-PT', {
    navFeatures: "Funcionalidades", navPricing: "Preços", navBlog: "Blog", cta: "Teste Grátis",
    heroTitle: "Aumente o seu AOV com Smart Upsells", heroSubtitle: "Solução tudo-em-um para 'Frequentemente Comprados Juntos' e pós-compra.",
    featuresTitle: "Três Motores Poderosos",
    fbtTitle: "Comprados Juntos", fbtDesc: "Recomendações estilo Amazon na página do produto.",
    popupTitle: "Popup de Carrinho", popupDesc: "Oferta complementar não intrusiva.",
    ppTitle: "Funil Pós-Compra", ppDesc: "A oferta de maior conversão após o pagamento.",
    pricingTitle: "Preços Simples", pricingSubtitle: "Planos que crescem consigo.",
    planFree: "Grátis", planStarter: "Inicial", planGrow: "Crescimento", planAdv: "Avançado", month: "/mês",
    faqTitle: "Perguntas Frequentes",
    cookieText: "Utilizamos cookies para melhorar a sua experiência.", cookieAccept: "Aceitar",
  }, BLOG_POSTS_PT_PT, LEGAL_PT),

  'pt-BR': createContent('pt-BR', {
    navFeatures: "Funcionalidades", navPricing: "Preços", navBlog: "Blog", cta: "Teste Grátis",
    heroTitle: "Aumente seu Ticket Médio com Smart Upsells", heroSubtitle: "Solução completa para 'Comprados Juntos' e funis pós-compra.",
    featuresTitle: "Três Motores Poderosos",
    fbtTitle: "Comprados Juntos", fbtDesc: "Recomendações estilo Amazon na página do produto.",
    popupTitle: "Popup de Carrinho", popupDesc: "Oferta complementar ao adicionar ao carrinho.",
    ppTitle: "Funil Pós-Compra", ppDesc: "Oferta de alta conversão após o checkout.",
    pricingTitle: "Preços Transparentes", pricingSubtitle: "Planos para todos os tamanhos.",
    planFree: "Grátis", planStarter: "Inicial", planGrow: "Crescimento", planAdv: "Avançado", month: "/mês",
    faqTitle: "Dúvidas Frequentes",
    cookieText: "Usamos cookies para melhorar sua experiência.", cookieAccept: "Aceitar",
  }, BLOG_POSTS_PT_BR, LEGAL_PT),

  nl: createContent('nl', {
    navFeatures: "Functies", navPricing: "Prijzen", navBlog: "Blog", cta: "Gratis Proberen",
    heroTitle: "Verhoog uw AOV met Smart Upsells", heroSubtitle: "De alles-in-één oplossing voor 'Vaak samen gekocht' en post-purchase.",
    featuresTitle: "Drie Krachtige Engines",
    fbtTitle: "Vaak samen gekocht", fbtDesc: "Amazon-stijl aanbevelingen op de productpagina.",
    popupTitle: "Winkelwagen Popup", popupDesc: "Niet-intrusieve aanbieding bij toevoegen aan winkelwagen.",
    ppTitle: "Post-Purchase Funnel", ppDesc: "De hoogste conversie aanbieding na betaling.",
    pricingTitle: "Eenvoudige Prijzen", pricingSubtitle: "Plannen die meegroeien.",
    planFree: "Gratis", planStarter: "Starter", planGrow: "Groei", planAdv: "Geavanceerd", month: "/maand",
    faqTitle: "Veelgestelde Vragen",
    cookieText: "We gebruiken cookies om uw ervaring te verbeteren.", cookieAccept: "Accepteren",
  }, BLOG_POSTS_NL, LEGAL_NL),

  pl: createContent('pl', {
    navFeatures: "Funkcje", navPricing: "Cennik", navBlog: "Blog", cta: "Darmowy Próbny",
    heroTitle: "Zwiększ swoje AOV dzięki Smart Upsells", heroSubtitle: "Kompleksowe rozwiązanie dla 'Często kupowane razem' i lejków po zakupie.",
    featuresTitle: "Trzy Potężne Silniki",
    fbtTitle: "Często kupowane razem", fbtDesc: "Rekomendacje w stylu Amazon na stronie produktu.",
    popupTitle: "Pop-up Koszyka", popupDesc: "Nieinwazyjna oferta przy dodawaniu do koszyka.",
    ppTitle: "Lejek Po Zakupie", ppDesc: "Oferta o najwyższej konwersji po płatności.",
    pricingTitle: "Prosty Cennik", pricingSubtitle: "Plany rosnące razem z Tobą.",
    planFree: "Darmowy", planStarter: "Start", planGrow: "Wzrost", planAdv: "Zaawansowany", month: "/mies",
    faqTitle: "Częste Pytania",
    cookieText: "Używamy plików cookie, aby poprawić Twoje doświadczenia.", cookieAccept: "Akceptuj",
  }, BLOG_POSTS_PL, LEGAL_PL),

  sv: createContent('sv', {
    navFeatures: "Funktioner", navPricing: "Priser", navBlog: "Blog", cta: "Prova Gratis",
    heroTitle: "Öka ditt AOV med Smart Upsells", heroSubtitle: "Allt-i-ett-lösningen för 'Ofta köpta tillsammans' och post-purchase.",
    featuresTitle: "Tre Kraftfulla Motorer",
    fbtTitle: "Ofta köpta tillsammans", fbtDesc: "Amazon-liknande rekommendationer på produktsidan.",
    popupTitle: "Varukorg Popup", popupDesc: "Ett icke-påträngande erbjudande vid varukorgen.",
    ppTitle: "Post-Purchase Funnel", ppDesc: "Högst konverterande erbjudandet efter betalning.",
    pricingTitle: "Enkla Priser", pricingSubtitle: "Planer som växer med dig.",
    planFree: "Gratis", planStarter: "Start", planGrow: "Tillväxt", planAdv: "Avancerad", month: "/mån",
    faqTitle: "Vanliga Frågor",
    cookieText: "Vi använder cookies för att förbättra din upplevelse.", cookieAccept: "Acceptera",
  }, BLOG_POSTS_SV, LEGAL_SV),

  da: createContent('da', {
    navFeatures: "Funktioner", navPricing: "Priser", navBlog: "Blog", cta: "Prøv Gratis",
    heroTitle: "Forøg din AOV med Smart Upsells", heroSubtitle: "Alt-i-én-løsningen til 'Ofte købt sammen' og post-køb.",
    featuresTitle: "Tre Kraftfulde Motorer",
    fbtTitle: "Ofte købt sammen", fbtDesc: "Amazon-stil anbefalinger på produktsiden.",
    popupTitle: "Indkøbskurv Popup", popupDesc: "Ikke-påtrængende tilbud ved tilføjelse til kurv.",
    ppTitle: "Post-Køb Funnel", ppDesc: "Højest konverterende tilbud efter betaling.",
    pricingTitle: "Enkle Priser", pricingSubtitle: "Planer der vokser med dig.",
    planFree: "Gratis", planStarter: "Start", planGrow: "Vækst", planAdv: "Avanceret", month: "/md",
    faqTitle: "Ofte Stillede Spørgsmål",
    cookieText: "Vi bruger cookies til at forbedre din oplevelse.", cookieAccept: "Accepter",
  }, BLOG_POSTS_DA, LEGAL_DA),

  fi: createContent('fi', {
    navFeatures: "Ominaisuudet", navPricing: "Hinnat", navBlog: "Blogi", cta: "Kokeile Ilmaiseksi",
    heroTitle: "Kasvata AOV:täsi Smart Upsells -ratkaisuilla", heroSubtitle: "Kaikki yhdessä -ratkaisu 'Usein yhdessä ostetut' ja oston jälkeisiin tarjouksiin.",
    featuresTitle: "Kolme Tehokasta Moottoria",
    fbtTitle: "Usein yhdessä ostetut", fbtDesc: "Amazon-tyyliset suositukset tuotesivulla.",
    popupTitle: "Ostoskori Popup", popupDesc: "Huomaamaton tarjous lisättäessä koriin.",
    ppTitle: "Oston Jälkeinen Suppilo", ppDesc: "Parhaiten konvertoiva tarjous maksun jälkeen.",
    pricingTitle: "Yksinkertainen Hinnoittelu", pricingSubtitle: "Suunnitelmat, jotka kasvavat kanssasi.",
    planFree: "Ilmainen", planStarter: "Aloitus", planGrow: "Kasvu", planAdv: "Edistynyt", month: "/kk",
    faqTitle: "UKK",
    cookieText: "Käytämme evästeitä parantaaksemme kokemustasi.", cookieAccept: "Hyväksy",
  }, BLOG_POSTS_FI, LEGAL_FI),

  no: createContent('no', {
    navFeatures: "Funksjoner", navPricing: "Priser", navBlog: "Blogg", cta: "Prøv Gratis",
    heroTitle: "Øk din AOV med Smart Upsells", heroSubtitle: "Alt-i-ett-løsningen for 'Ofte kjøpt sammen' og post-kjøp.",
    featuresTitle: "Tre Kraftige Motorer",
    fbtTitle: "Ofte kjøpt sammen", fbtDesc: "Amazon-stil anbefalinger på produktsiden.",
    popupTitle: "Handlekurv Popup", popupDesc: "Ikke-påtrengende tilbud ved legg til i kurv.",
    ppTitle: "Post-Kjøp Trakt", ppDesc: "Høyest konverterende tilbud etter betaling.",
    pricingTitle: "Enkle Priser", pricingSubtitle: "Planer som vokser med deg.",
    planFree: "Gratis", planStarter: "Start", planGrow: "Vekst", planAdv: "Avansert", month: "/mnd",
    faqTitle: "Vanlige Spørsmål",
    cookieText: "Vi bruker informasjonskapsler for å forbedre opplevelsen din.", cookieAccept: "Aksepter",
  }, BLOG_POSTS_NO, LEGAL_NO),

  cs: createContent('cs', {
    navFeatures: "Funkce", navPricing: "Ceník", navBlog: "Blog", cta: "Vyzkoušet Zdarma",
    heroTitle: "Zvyšte své AOV pomocí Smart Upsells", heroSubtitle: "Komplexní řešení pro 'Často kupované spolu' a post-nákupní nabídky.",
    featuresTitle: "Tři Výkonné Motory",
    fbtTitle: "Často kupované spolu", fbtDesc: "Doporučení ve stylu Amazonu na stránce produktu.",
    popupTitle: "Vyskakovací okno v košíku", popupDesc: "Nenásilná nabídka při přidání do košíku.",
    ppTitle: "Post-Nákupní Trychtýř", ppDesc: "Nabídka s nejvyšší konverzí po zaplacení.",
    pricingTitle: "Jednoduchý Ceník", pricingSubtitle: "Plány, které rostou s vámi.",
    planFree: "Zdarma", planStarter: "Start", planGrow: "Růst", planAdv: "Pokročilý", month: "/měsíc",
    faqTitle: "Časté Dotazy",
    cookieText: "Používáme cookies pro zlepšení vašeho zážitku.", cookieAccept: "Přijmout",
  }, BLOG_POSTS_CS, LEGAL_CS),

  tr: createContent('tr', {
    navFeatures: "Özellikler", navPricing: "Fiyatlandırma", navBlog: "Blog", cta: "Ücretsiz Dene",
    heroTitle: "Smart Upsells ile AOV'nizi Artırın", heroSubtitle: "'Birlikte Sıkça Alınanlar' ve Satın Alma Sonrası için hepsi bir arada çözüm.",
    featuresTitle: "Üç Güçlü Motor",
    fbtTitle: "Birlikte Sıkça Alınanlar", fbtDesc: "Ürün sayfasında Amazon tarzı öneriler.",
    popupTitle: "Sepet Pop-up", popupDesc: "Sepete eklerken rahatsız etmeyen teklif.",
    ppTitle: "Satın Alma Sonrası Huni", ppDesc: "Ödeme sonrası en yüksek dönüşüm sağlayan teklif.",
    pricingTitle: "Basit Fiyatlandırma", pricingSubtitle: "Sizinle büyüyen planlar.",
    planFree: "Ücretsiz", planStarter: "Başlangıç", planGrow: "Büyüme", planAdv: "Gelişmiş", month: "/ay",
    faqTitle: "Sıkça Sorulan Sorular",
    cookieText: "Deneyiminizi geliştirmek için çerezleri kullanıyoruz.", cookieAccept: "Kabul Et",
  }, BLOG_POSTS_TR, LEGAL_TR),

  ja: createContent('ja', {
    navFeatures: "機能", navPricing: "料金", navBlog: "ブログ", cta: "無料体験",
    heroTitle: "スマートアップセルでAOVを向上", heroSubtitle: "「よく一緒に購入される商品」と購入後アップセルのためのオールインワンソリューション。",
    featuresTitle: "3つの強力なエンジン",
    fbtTitle: "よく一緒に購入される商品", fbtDesc: "商品ページでのAmazonスタイルの推奨。",
    popupTitle: "スマートカートポップアップ", popupDesc: "カート追加時の邪魔にならない提案。",
    ppTitle: "購入後ファネル", ppDesc: "支払い後の最もコンバージョン率の高いオファー。",
    pricingTitle: "シンプルな料金体系", pricingSubtitle: "成長に合わせて選べるプラン。",
    planFree: "無料", planStarter: "スターター", planGrow: "成長", planAdv: "アドバンス", month: "/月",
    faqTitle: "よくある質問",
    cookieText: "体験向上のためにクッキーを使用しています。", cookieAccept: "同意する",
  }, BLOG_POSTS_JA, LEGAL_JA),

  ko: createContent('ko', {
    navFeatures: "기능", navPricing: "가격", navBlog: "블로그", cta: "무료 체험",
    heroTitle: "스마트 업셀로 AOV 증대", heroSubtitle: "'자주 함께 구매하는 상품' 및 구매 후 퍼널을 위한 올인원 솔루션.",
    featuresTitle: "3가지 강력한 엔진",
    fbtTitle: "자주 함께 구매", fbtDesc: "제품 페이지의 Amazon 스타일 추천.",
    popupTitle: "장바구니 팝업", popupDesc: "장바구니 추가 시 방해되지 않는 제안.",
    ppTitle: "구매 후 퍼널", ppDesc: "결제 후 가장 높은 전환율을 보이는 제안.",
    pricingTitle: "투명한 가격", pricingSubtitle: "비즈니스와 함께 성장하는 플랜.",
    planFree: "무료", planStarter: "스타터", planGrow: "성장", planAdv: "고급", month: "/월",
    faqTitle: "자주 묻는 질문",
    cookieText: "더 나은 경험을 위해 쿠키를 사용합니다.", cookieAccept: "수락",
  }, BLOG_POSTS_KO, LEGAL_KO),

  'zh-CN': createContent('zh-CN', {
    navFeatures: "功能", navPricing: "价格", navBlog: "博客", cta: "免费试用",
    heroTitle: "利用智能追加销售提升客单价", heroSubtitle: "集“经常一起购买”和购后追加销售于一体的解决方案。",
    featuresTitle: "三大强大引擎",
    fbtTitle: "经常一起购买", fbtDesc: "产品页面上的亚马逊风格推荐。",
    popupTitle: "购物车弹窗", popupDesc: "添加到购物车时的非侵入式优惠。",
    ppTitle: "购后漏斗", ppDesc: "支付后转化率最高的优惠。一键购买。",
    pricingTitle: "简单定价", pricingSubtitle: "随您业务增长的计划。",
    planFree: "免费", planStarter: "入门", planGrow: "成长", planAdv: "高级", month: "/月",
    faqTitle: "常见问题",
    cookieText: "我们要使用 Cookie 来改善您的体验。", cookieAccept: "接受",
  }, BLOG_POSTS_ZH_CN, LEGAL_ZH_CN),

  'zh-TW': createContent('zh-TW', {
    navFeatures: "功能", navPricing: "價格", navBlog: "博客", cta: "免費試用",
    heroTitle: "利用智能追加銷售提升客單價", heroSubtitle: "集「經常一起購買」和購後追加銷售於一體的解決方案。",
    featuresTitle: "三大強大引擎",
    fbtTitle: "經常一起購買", fbtDesc: "產品頁面上的亞馬遜風格推薦。",
    popupTitle: "購物車彈窗", popupDesc: "添加到購物車時的非侵入式優惠。",
    ppTitle: "購後漏斗", ppDesc: "支付後轉化率最高的優惠。一鍵購買。",
    pricingTitle: "簡單定價", pricingSubtitle: "隨您業務增長的計劃。",
    planFree: "免費", planStarter: "入門", planGrow: "成長", planAdv: "高級", month: "/月",
    faqTitle: "常見問題",
    cookieText: "我們要使用 Cookie 來改善您的體驗。", cookieAccept: "接受",
  }, BLOG_POSTS_ZH_TW, LEGAL_ZH_TW),

  th: createContent('th', {
    navFeatures: "ฟีเจอร์", navPricing: "ราคา", navBlog: "บล็อก", cta: "ทดลองใช้ฟรี",
    heroTitle: "เพิ่ม AOV ด้วย Smart Upsells", heroSubtitle: "โซลูชันครบวงจรสำหรับ 'ซื้อคู่กันบ่อยๆ' และข้อเสนอหลังการขาย",
    featuresTitle: "3 เครื่องมือทรงพลัง",
    fbtTitle: "ซื้อคู่กันบ่อยๆ", fbtDesc: "คำแนะนำสไตล์ Amazon บนหน้าสินค้า",
    popupTitle: "ป๊อปอัปตะกร้า", popupDesc: "ข้อเสนอเพิ่มเติมเมื่อกดลงตะกร้า",
    ppTitle: "ข้อเสนอหลังการขาย", ppDesc: "ข้อเสนอที่แปลงยอดขายได้ดีที่สุดหลังชำระเงิน",
    pricingTitle: "ราคาที่เรียบง่าย", pricingSubtitle: "แผนที่เติบโตไปพร้อมกับคุณ",
    planFree: "ฟรี", planStarter: "เริ่มต้น", planGrow: "เติบโต", planAdv: "ขั้นสูง", month: "/เดือน",
    faqTitle: "คำถามที่พบบ่อย",
    cookieText: "เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ", cookieAccept: "ยอมรับ",
  }, BLOG_POSTS_TH, LEGAL_TH),
};

export const ICONS_MAP: Record<string, React.ReactNode> = {
  layers: <Layers className="w-8 h-8 text-blue-400" />,
  "shopping-bag": <ShoppingBag className="w-8 h-8 text-purple-400" />,
  "arrow-up": <ArrowUpCircle className="w-8 h-8 text-pink-400" />,
};
