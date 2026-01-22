import React from 'react';
import { ShoppingBag, Layers, ArrowUpCircle, Award, ShieldCheck, Zap } from 'lucide-react';
import { Content, Language } from './types';
import { BLOG_POSTS_EN } from './data/blog/en';
import { BLOG_POSTS_ES } from './data/blog/es';

export const APP_LOGO_URL = "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/new-abu-logo.png?v=1768487866";
export const SHOPIFY_LOGO_URL = "https://cdn.freebiesupply.com/logos/large/2x/shopify-logo-png-transparent.png";

export const CONTENT: Record<Language, Content> = {
  en: {
    nav: {
      features: "Engines",
      details: "Features",
      pricing: "Pricing",
      testimonials: "Reviews",
      blog: "Blog",
      cta: "Install App"
    },
    hero: {
      badge: "Shopify's #1 Upsell App",
      title: "Skyrocket Your AOV with Smart Upsells",
      subtitle: "The all-in-one solution for Frequently Bought Together, In-Cart Popups, and Post-Purchase funnels. Designed to look native to your store.",
      ctaPrimary: "Start Free Trial",
      ctaSecondary: "View Demo Store",
      stats: {
        users: "10,000+ Merchants",
        rating: "5.0/5 Rating"
      }
    },
    features: {
      title: "Three Powerful Engines",
      subtitle: "Select an engine to see how it integrates seamlessly into your store's flow.",
      items: {
        fbt: {
          title: "Frequently Bought Together",
          description: "Amazon-style recommendations located directly on the product page. Uses AI to pair items that sell well together.",
          icon: "layers"
        },
        popup: {
          title: "Smart Cart Pop-up",
          description: "A non-intrusive popup that appears when adding to cart, offering a complementary product with a one-time discount.",
          icon: "shopping-bag"
        },
        postPurchase: {
          title: "Post-Purchase Funnel",
          description: "The highest converting offer. Appears after checkout payment but before the thank you page. 1-Click Buy.",
          icon: "arrow-up"
        }
      }
    },
    detailedFeatures: {
      title: "Everything You Need to Scale",
      subtitle: "Packed with advanced features designed to maximize every visitor's value.",
      ai: {
        title: "AI & Smart Recommendations",
        description: "Our machine learning algorithm analyzes store data to suggest products most likely to convert.",
        tag: "Automated"
      },
      widgets: {
        title: "5+ Widget Types",
        description: "Versatile layouts for every page: Product, Cart, Thank You, and more.",
        tag: "Versatile"
      },
      design: {
        title: "Native Design Adaptation",
        description: "We automatically detect your theme's fonts and colors. It looks like you coded it yourself.",
        tag: "Zero Config"
      },
      bundles: {
        title: "Bundle Discounts",
        description: "Incentivize bulk purchases with automatic tiered discounts.",
      },
      data: {
        title: "Data Analytics",
        description: "Track views, clicks, and conversion revenue in real-time.",
      },
      translation: {
        title: "Multi-language",
        description: "Fully translatable widgets for global stores.",
      },
      support: {
        title: "Expert Support",
        description: "Direct access to Shopify experts via chat and email.",
      }
    },
    reviews: {
      title: "Loved by Merchants",
      items: [
        {
          storeName: "The Organic Tea Co.",
          author: "Sarah J.",
          comment: "Increased our AOV by 15% in the first week. The FBT widget looks exactly like our theme.",
          rating: 5
        },
        {
          storeName: "Urban Streetwear",
          author: "Mike T.",
          comment: "The post-purchase upsell is a game changer. We're capturing sales we didn't know existed.",
          rating: 5
        },
        {
          storeName: "Pet Paradise",
          author: "Emily R.",
          comment: "Super easy to set up. The support team helped me customize the CSS to match my brand perfectly.",
          rating: 5
        },
        {
          storeName: "Gadget World",
          author: "Alex D.",
          comment: "Tried 3 other apps before ABU. This is the only one that doesn't slow down my site.",
          rating: 5
        },
        {
          storeName: "Luxe Beauty",
          author: "Jessica M.",
          comment: "My customers love the bundle offers. Highly recommended for any Shopify store.",
          rating: 5
        }
      ]
    },
    trust: {
      title: "Trusted by E-commerce Experts",
      partners: ["Shopify Plus", "Certified Partner", "Liquid Masters"]
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "Plans that scale with your business growth.",
      monthly: "/month",
      plans: [
        {
          name: "Free",
          price: "Free",
          description: "For development stores.",
          features: [
            "Stores in development",
            "1 order per month",
            "Trial period"
          ]
        },
        {
          name: "Starter",
          price: "$9.99",
          description: "Essential tools for new stores.",
          features: [
            "1 widget",
            "Data analysis",
            "Translations",
            "2–5% conversion",
            "Design adapted to your brand",
            "Email support"
          ]
        },
        {
          name: "Grow",
          price: "$14.99",
          description: "More power for growing brands.",
          features: [
            "3 different widgets",
            "5–10% conversion",
            "Design adapted to your brand",
            "Email support",
            "Data analysis",
            "Translations"
          ],
          recommended: true
        },
        {
          name: "Advanced",
          price: "$24.99",
          description: "Maximum performance.",
          features: [
            "3 different widgets",
            "10% conversion",
            "Design adapted to your brand",
            "Email support",
            "Data analysis",
            "AI-powered recommendation algorithm",
            "Translations",
            "Live chat support + email support"
          ]
        }
      ]
    },
    faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about ABU.",
        items: [
            {
                question: "Does ABU affect my store's loading speed?",
                answer: "No. ABU is optimized for performance. We use asynchronous loading techniques, meaning our script loads after your main content has rendered. This ensures your Core Web Vitals remain healthy and your customers don't experience lag."
            },
            {
                question: "Can I customize the design of the widgets?",
                answer: "Absolutely. ABU automatically detects your theme's fonts and colors to look native out of the box. However, you also have full control to customize colors, borders, text sizes, and CSS directly from our dashboard if you want a specific look."
            },
            {
                question: "How does the 'Free' plan work?",
                answer: "The Free plan is designed for development stores or stores just launching. It includes full access to all features but is limited to 1 order per month containing an upsell. It's perfect for testing the app before going live."
            },
            {
                question: "Is it compatible with Shopify 2.0 themes?",
                answer: "Yes, ABU is fully compatible with Online Store 2.0 themes. You can add our widgets directly via the Theme Editor using app blocks, which gives you precise control over placement without touching code."
            },
            {
                question: "How does the AI recommendation engine work?",
                answer: "Our AI analyzes your store's historical order data to find patterns (e.g., people who buy X often buy Y). If you are a new store with no data, we use 'Global Intelligence' based on product descriptions and images to make smart initial recommendations until we have enough data."
            },
            {
                question: "What happens if I uninstall the app?",
                answer: "If you uninstall ABU, all widgets will instantly disappear from your store. We do not leave any 'ghost code' in your theme files. Your subscription will be cancelled immediately by Shopify."
            },
            {
                question: "Do you take a commission on upsell revenue?",
                answer: "No, we do not take any commission on the sales generated by the app. You keep 100% of the revenue. We only charge the flat monthly subscription fee associated with your chosen plan."
            }
        ]
    },
    blog: {
      title: "The ABU Blog",
      subtitle: "Insights, strategies, and tips to grow your Shopify store.",
      backButton: "Back to Blog",
      readMore: "Read Article",
      posts: BLOG_POSTS_EN
    },
    footer: {
      rights: "All rights reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      contact: "Contact Us",
      blog: "Blog"
    },
    privacyPage: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: October 24, 2026",
      backButton: "Back to Home",
      sections: [
        {
            heading: "1. Introduction",
            content: "Tiendamanilla S.L. ('Company', 'we', 'us', or 'our'), with VAT ID B55481766 and registered address at Polígono Abra Industrial, 1.4.2, Abanto-Zierbana, 48500, Bizkaia, Spain, is the operator of the ABU Shopify App. This Privacy Policy describes how we collect, use, and share information about you when you use our app installed through the Shopify App Store."
        },
        {
            heading: "2. Information We Collect",
            content: "When you install the App, we are automatically able to access certain types of information from your Shopify account: Shop Information (shop name, email, address, and Shopify plan), Customer Information (when required to process post-purchase upsells or analytics), and Order Information."
        },
        {
            heading: "3. How We Use Your Information",
            content: "We use the personal information we collect from you and your customers in order to provide the Service and to operate the App. This includes analyzing data to provide upsell recommendations, processing charges for the App subscription via Shopify, and improving our App's functionality."
        },
        {
            heading: "4. Sharing Your Information",
            content: "We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights. As a Shopify App, your data interacts with the Shopify platform."
        },
        {
            heading: "5. Your Rights (GDPR)",
            content: "If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below."
        },
        {
            heading: "6. Contact Us",
            content: "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@tiendamanillc.com."
        }
      ]
    },
    termsPage: {
      title: "Terms of Service",
      lastUpdated: "Last updated: October 24, 2026",
      backButton: "Back to Home",
      sections: [
        {
            heading: "1. Acceptance of Terms",
            content: "By installing and using the ABU App ('Service'), provided by Tiendamanilla S.L. ('we', 'us'), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not install or use the Service."
        },
        {
            heading: "2. Description of Service",
            content: "ABU provides upselling and cross-selling tools for Shopify merchants, including 'Frequently Bought Together' widgets, cart pop-ups, and post-purchase offers."
        },
        {
            heading: "3. Billing and Payments",
            content: "All billing for the Service is handled directly by Shopify. Fees are charged based on the plan you select (Starter, Grow, or Advanced). You agree to pay all charges incurred in connection with your use of the App. Refunds are handled at our sole discretion and in accordance with Shopify's policies."
        },
        {
            heading: "4. Intellectual Property",
            content: "The Service, including its design, code, and graphics, is the property of Tiendamanilla S.L. and is protected by copyright and intellectual property laws."
        },
        {
            heading: "5. Limitation of Liability",
            content: "To the maximum extent permitted by law, Tiendamanilla S.L. shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Service."
        },
        {
            heading: "6. Governing Law",
            content: "These Terms shall be governed by and construed in accordance with the laws of Spain, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the jurisdiction of the courts of Bizkaia, Spain."
        },
        {
            heading: "7. Contact Information",
            content: "Questions about the Terms of Service should be sent to us at info@tiendamanillc.com."
        }
      ]
    },
    contactPage: {
      title: "Contact Us",
      subtitle: "Have a question or need help? Send us a message.",
      backButton: "Back to Home",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        sending: "Sending...",
        successTitle: "Message Sent!",
        successMessage: "Thank you for reaching out. We will get back to you shortly.",
        error: "Something went wrong. Please try again."
      }
    },
    cookieConsent: {
      text: "We use cookies to analyze site traffic and improve your experience. By continuing to use our site, you agree to our",
      privacyLink: "Privacy Policy",
      accept: "Accept All",
      decline: "Reject All",
      customize: "Customize",
      modal: {
        title: "Cookie Preferences",
        description: "Manage your cookie settings here. Essential cookies are required for the site to function properly.",
        save: "Save Preferences",
        categories: [
          {
            id: 'necessary',
            title: "Strictly Necessary",
            description: "These cookies are essential for the website to function and cannot be switched off.",
            required: true
          },
          {
            id: 'analytics',
            title: "Analytics",
            description: "We use these cookies to count visits and traffic sources so we can measure and improve the performance of our site.",
            required: false
          },
          {
            id: 'marketing',
            title: "Marketing",
            description: "These cookies may be set through our site by our advertising partners to build a profile of your interests.",
            required: false
          }
        ]
      }
    }
  },
  es: {
    nav: {
      features: "Motores",
      details: "Funcionalidades",
      pricing: "Precios",
      testimonials: "Reseñas",
      blog: "Blog",
      cta: "Instalar App"
    },
    hero: {
      badge: "App #1 de Upsell en Shopify",
      title: "Dispara tu Ticket Medio con Upsells Inteligentes",
      subtitle: "La solución todo en uno para 'Comprados Juntos Habitualmente', Pop-ups de Carrito y Embudos Post-compra. Diseño nativo para tu tienda.",
      ctaPrimary: "Empezar Prueba Gratis",
      ctaSecondary: "Ver Tienda Demo",
      stats: {
        users: "+10,000 Tiendas",
        rating: "Valoración 5.0/5"
      }
    },
    features: {
      title: "Tres Motores Potentes",
      subtitle: "Selecciona un motor para ver cómo se integra perfectamente en el flujo de tu tienda.",
      items: {
        fbt: {
          title: "Comprados Juntos",
          description: "Recomendaciones estilo Amazon ubicadas directamente en la página de producto. Usa IA para emparejar artículos.",
          icon: "layers"
        },
        popup: {
          title: "Pop-up de Carrito",
          description: "Un popup no intrusivo que aparece al añadir al carrito, ofreciendo un producto complementario con descuento único.",
          icon: "shopping-bag"
        },
        postPurchase: {
          title: "Embudo Post-Compra",
          description: "La oferta de mayor conversión. Aparece tras el pago pero antes de la página de gracias. Compra en 1-Click.",
          icon: "arrow-up"
        }
      }
    },
    detailedFeatures: {
      title: "Todo lo que Necesitas para Escalar",
      subtitle: "Equipado con funciones avanzadas diseñadas para maximizar el valor de cada visitante.",
      ai: {
        title: "IA y Recomendaciones Smart",
        description: "Nuestro algoritmo de aprendizaje automático analiza los datos de la tienda para sugerir los productos con mayor probabilidad de conversión.",
        tag: "Automatizado"
      },
      widgets: {
        title: "+5 Tipos de Widgets",
        description: "Diseños versátiles para cada página: Producto, Carrito, Thank You page y más.",
        tag: "Versátil"
      },
      design: {
        title: "Adaptación de Diseño Nativo",
        description: "Detectamos automáticamente las fuentes y colores de tu tema. Parece que lo programaste tú mismo.",
        tag: "Zero Config"
      },
      bundles: {
        title: "Descuentos por Bundles",
        description: "Incentiva compras masivas con descuentos escalonados automáticos.",
      },
      data: {
        title: "Análisis de Datos",
        description: "Rastrea vistas, clics e ingresos por conversión en tiempo real.",
      },
      translation: {
        title: "Multi-idioma",
        description: "Widgets totalmente traducibles para tiendas globales.",
      },
      support: {
        title: "Soporte Experto",
        description: "Acceso directo a expertos de Shopify vía chat y email.",
      }
    },
    reviews: {
      title: "Amado por los eCoomerce",
      items: [
        {
          storeName: "The Organic Tea Co.",
          author: "Sarah J.",
          comment: "Aumentó nuestro AOV un 15% en la primera semana. El widget FBT se ve exactamente como nuestro tema.",
          rating: 5
        },
        {
          storeName: "Urban Streetwear",
          author: "Mike T.",
          comment: "El upsell post-compra es increíble. Estamos capturando ventas que no sabíamos que existían.",
          rating: 5
        },
        {
          storeName: "Pet Paradise",
          author: "Emily R.",
          comment: "Súper fácil de configurar. El equipo de soporte me ayudó a personalizar el CSS.",
          rating: 5
        },
        {
          storeName: "Gadget World",
          author: "Alex D.",
          comment: "Probé otras 3 apps antes de ABU. Esta es la única que no ralentiza mi sitio.",
          rating: 5
        },
        {
          storeName: "Luxe Beauty",
          author: "Jessica M.",
          comment: "A mis clientes les encantan las ofertas de bundles. Muy recomendada.",
          rating: 5
        }
      ]
    },
    trust: {
      title: "Con la confianza de Expertos en E-commerce",
      partners: ["Shopify Plus", "Partner Certificado", "Maestros Liquid"]
    },
    pricing: {
      title: "Precios Simples y Claros",
      subtitle: "Planes que escalan con el crecimiento de tu negocio.",
      monthly: "/mes",
      plans: [
        {
          name: "Gratis",
          price: "Gratis",
          description: "Para tiendas en desarrollo.",
          features: [
            "Tiendas en desarrollo",
            "1 pedido al mes",
            "Periodo de prueba"
          ]
        },
        {
          name: "Inicial",
          price: "$9.99",
          description: "Herramientas esenciales para nuevas tiendas.",
          features: [
            "1 widget",
            "Análisis de datos",
            "Traducciones",
            "Conversión del 2–5%",
            "Diseño adaptado a tu marca",
            "Soporte por email"
          ]
        },
        {
          name: "Crecimiento",
          price: "$14.99",
          description: "Más potencia para marcas en expansión.",
          features: [
            "3 widgets diferentes",
            "Conversión del 5–10%",
            "Diseño adaptado a tu marca",
            "Soporte por email",
            "Análisis de datos",
            "Traducciones"
          ],
          recommended: true
        },
        {
          name: "Avanzado",
          price: "$24.99",
          description: "Máximo rendimiento y soporte.",
          features: [
            "3 widgets diferentes",
            "Conversión del 10%",
            "Diseño adaptado a tu marca",
            "Soporte por email",
            "Análisis de datos",
            "Algoritmo de recomendación IA",
            "Traducciones",
            "Chat en vivo + soporte email"
          ]
        }
      ]
    },
    faq: {
        title: "Preguntas Frecuentes",
        subtitle: "Todo lo que necesitas saber sobre ABU.",
        items: [
            {
                question: "¿Afecta ABU a la velocidad de carga de mi tienda?",
                answer: "No. ABU está optimizado para el rendimiento. Utilizamos técnicas de carga asíncrona, lo que significa que nuestro script se carga después de que tu contenido principal se haya renderizado. Esto asegura que tus Core Web Vitals se mantengan saludables."
            },
            {
                question: "¿Puedo personalizar el diseño de los widgets?",
                answer: "Absolutamente. ABU detecta automáticamente las fuentes y colores de tu tema para parecer nativo desde el primer momento. Sin embargo, también tienes control total para personalizar colores, bordes, tamaños de texto y CSS directamente desde nuestro panel."
            },
            {
                question: "¿Cómo funciona el plan 'Gratis'?",
                answer: "El plan Gratis está diseñado para tiendas en desarrollo o tiendas que acaban de lanzarse. Incluye acceso completo a todas las funciones pero está limitado a 1 pedido al mes que contenga un upsell. Es perfecto para probar la app antes de lanzarla."
            },
            {
                question: "¿Es compatible con temas de Shopify 2.0?",
                answer: "Sí, ABU es totalmente compatible con los temas Online Store 2.0. Puedes añadir nuestros widgets directamente a través del Editor de Temas usando bloques de aplicaciones, lo que te da un control preciso sobre la ubicación sin tocar código."
            },
            {
                question: "¿Cómo funciona el motor de recomendación por IA?",
                answer: "Nuestra IA analiza el historial de pedidos de tu tienda para encontrar patrones (ej. gente que compra X a menudo compra Y). Si eres una tienda nueva sin datos, utilizamos 'Inteligencia Global' basada en descripciones e imágenes de productos para hacer recomendaciones iniciales inteligentes."
            },
            {
                question: "¿Qué pasa si desinstalo la app?",
                answer: "Si desinstalas ABU, todos los widgets desaparecerán instantáneamente de tu tienda. No dejamos ningún 'código fantasma' en los archivos de tu tema. Tu suscripción será cancelada inmediatamente por Shopify."
            },
            {
                question: "¿Cobráis comisión sobre las ventas de upsell?",
                answer: "No, no cobramos ninguna comisión sobre las ventas generadas por la aplicación. Te quedas con el 100% de los ingresos. Solo cobramos la tarifa de suscripción mensual fija asociada a tu plan elegido."
            }
        ]
    },
    blog: {
      title: "Blog de ABU",
      subtitle: "Estrategias, consejos y trucos para hacer crecer tu tienda Shopify.",
      backButton: "Volver al Blog",
      readMore: "Leer Artículo",
      posts: BLOG_POSTS_ES
    },
    footer: {
      rights: "Todos los derechos reservados.",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
      contact: "Contacto",
      blog: "Blog"
    },
    privacyPage: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: 24 de Octubre de 2026",
      backButton: "Volver al Inicio",
      sections: [
        {
            heading: "1. Introducción",
            content: "Tiendamanilla S.L. ('Compañía', 'nosotros' o 'nuestro'), con NIF B55481766 y domicilio social en Polígono Abra Industrial, 1.4.2, Abanto-Zierbana, 48500, Bizkaia, España, es el operador de la aplicación ABU para Shopify. Esta Política de Privacidad describe cómo recopilamos, usamos y compartimos información sobre usted cuando utiliza nuestra aplicación instalada a través de la Shopify App Store."
        },
        {
            heading: "2. Información que recopilamos",
            content: "Al instalar la Aplicación, podemos acceder automáticamente a ciertos tipos de información de su cuenta de Shopify: Información de la Tienda (nombre, email, dirección y plan de Shopify), Información del Cliente (cuando sea necesario para procesar upsells post-compra o analíticas) e Información de Pedidos."
        },
        {
            heading: "3. Cómo usamos su información",
            content: "Utilizamos la información personal que recopilamos de usted y sus clientes para proporcionar el Servicio y operar la Aplicación. Esto incluye analizar datos para ofrecer recomendaciones de upsell, procesar cargos por la suscripción de la App a través de Shopify y mejorar la funcionalidad de nuestra App."
        },
        {
            heading: "4. Compartir su información",
            content: "Podemos compartir su Información Personal para cumplir con las leyes y regulaciones aplicables, para responder a una citación u otra solicitud legal de información que recibamos, o para proteger nuestros derechos de otra manera. Como App de Shopify, sus datos interactúan con la plataforma Shopify."
        },
        {
            heading: "5. Sus Derechos (GDPR)",
            content: "Si usted es residente europeo, tiene derecho a acceder a la información personal que tenemos sobre usted y a solicitar que su información personal sea corregida, actualizada o eliminada. Si desea ejercer este derecho, contáctenos a través de la información de contacto a continuación."
        },
        {
            heading: "6. Contáctenos",
            content: "Para obtener más información sobre nuestras prácticas de privacidad, si tiene preguntas o si desea presentar una queja, contáctenos por correo electrónico a info@tiendamanillc.com."
        }
      ]
    },
    termsPage: {
      title: "Términos del Servicio",
      lastUpdated: "Última actualización: 24 de Octubre de 2026",
      backButton: "Volver al Inicio",
      sections: [
        {
            heading: "1. Aceptación de los Términos",
            content: "Al instalar y utilizar la App ABU ('Servicio'), proporcionada por Tiendamanilla S.L. ('nosotros'), usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con estos términos, no instale ni utilice el Servicio."
        },
        {
            heading: "2. Descripción del Servicio",
            content: "ABU proporciona herramientas de upselling y cross-selling para comerciantes de Shopify, incluyendo widgets de 'Comprados Juntos Habitualmente', pop-ups de carrito y ofertas post-compra."
        },
        {
            heading: "3. Facturación y Pagos",
            content: "Toda la facturación del Servicio es gestionada directamente por Shopify. Las tarifas se cobran según el plan que seleccione (Inicial, Crecimiento o Avanzado). Usted acepta pagar todos los cargos incurridos en relación con su uso de la App. Los reembolsos se gestionan a nuestra entera discreción y de acuerdo con las políticas de Shopify."
        },
        {
            heading: "4. Propiedad Intelectual",
            content: "El Servicio, incluyendo su diseño, código y gráficos, es propiedad de Tiendamanilla S.L. y está protegido por derechos de autor y leyes de propiedad intelectual."
        },
        {
            heading: "5. Limitación de Responsabilidad",
            content: "En la medida máxima permitida por la ley, Tiendamanilla S.L. no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, ni de ninguna pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de su uso del Servicio."
        },
        {
            heading: "6. Ley Aplicable",
            content: "Estos Términos se regirán e interpretarán de acuerdo con las leyes de España. Cualquier disputa que surja de estos Términos estará sujeta a la jurisdicción de los tribunales de Bizkaia, España."
        },
        {
            heading: "7. Información de Contacto",
            content: "Las preguntas sobre los Términos de Servicio deben enviarse a info@tiendamanillc.com."
        }
      ]
    },
    contactPage: {
      title: "Contáctanos",
      subtitle: "¿Tienes alguna pregunta o necesitas ayuda? Envíanos un mensaje.",
      backButton: "Volver al Inicio",
      form: {
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
        submit: "Enviar Mensaje",
        sending: "Enviando...",
        successTitle: "¡Mensaje Enviado!",
        successMessage: "Gracias por contactarnos. Te responderemos lo antes posible.",
        error: "Algo salió mal. Por favor intenta de nuevo."
      }
    },
    cookieConsent: {
      text: "Utilizamos cookies para analizar el tráfico del sitio y mejorar tu experiencia. Al continuar usando nuestro sitio, aceptas nuestra",
      privacyLink: "Política de Privacidad",
      accept: "Aceptar Todo",
      decline: "Rechazar Todo",
      customize: "Configurar",
      modal: {
        title: "Preferencias de Cookies",
        description: "Gestiona tu configuración de cookies aquí. Las cookies esenciales son necesarias para que el sitio funcione correctamente.",
        save: "Guardar Preferencias",
        categories: [
          {
            id: 'necessary',
            title: "Estrictamente Necesarias",
            description: "Estas cookies son esenciales para que el sitio web funcione y no se pueden desactivar.",
            required: true
          },
          {
            id: 'analytics',
            title: "Analíticas",
            description: "Usamos estas cookies para contar visitas y fuentes de tráfico para poder medir y mejorar el rendimiento de nuestro sitio.",
            required: false
          },
          {
            id: 'marketing',
            title: "Marketing",
            description: "Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios para construir un perfil de tus intereses.",
            required: false
          }
        ]
      }
    }
  }
};

export const ICONS_MAP: Record<string, React.ReactNode> = {
  layers: <Layers className="w-8 h-8 text-blue-400" />,
  "shopping-bag": <ShoppingBag className="w-8 h-8 text-purple-400" />,
  "arrow-up": <ArrowUpCircle className="w-8 h-8 text-pink-400" />,
};