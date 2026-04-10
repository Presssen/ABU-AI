import React, { useState, useEffect } from 'react';
import { X, Zap, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface PromoPopupProps {
  lang: Language;
}

const PROMO_TEXTS: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  highlight: string;
  features: string[];
  cta: string;
  dismiss: string;
  remaining: string;
}> = {
  es: {
    badge: '🎉 Oferta de Lanzamiento',
    title: 'Primeras 100 descargas',
    subtitle: 'Instalación gratuita + 30 días de prueba completa',
    highlight: '¡No te lo pierdas!',
    features: ['Instalación y configuración gratis', '30 días de acceso completo'],
    cta: 'Instalar Ahora Gratis',
    dismiss: 'Quizás más tarde',
    remaining: 'plazas restantes',
  },
  en: {
    badge: '🎉 Launch Offer',
    title: 'First 100 downloads',
    subtitle: 'Free installation + 30-day full trial',
    highlight: "Don't miss out!",
    features: ['Free setup & installation', '30-day full access'],
    cta: 'Install Free Now',
    dismiss: 'Maybe later',
    remaining: 'spots remaining',
  },
  de: {
    badge: '🎉 Startangebot',
    title: 'Erste 100 Downloads',
    subtitle: 'Kostenlose Installation + 30 Tage Vollzugang',
    highlight: 'Nicht verpassen!',
    features: ['Kostenlose Einrichtung', '30 Tage Vollzugang'],
    cta: 'Jetzt Kostenlos Installieren',
    dismiss: 'Vielleicht später',
    remaining: 'Plätze übrig',
  },
  fr: {
    badge: '🎉 Offre de Lancement',
    title: 'Premiers 100 téléchargements',
    subtitle: 'Installation gratuite + 30 jours d\'essai complet',
    highlight: 'Ne manquez pas !',
    features: ['Installation gratuite', '30 jours d\'accès complet'],
    cta: 'Installer Gratuitement',
    dismiss: 'Peut-être plus tard',
    remaining: 'places restantes',
  },
  it: {
    badge: '🎉 Offerta di Lancio',
    title: 'Primi 100 download',
    subtitle: 'Installazione gratuita + 30 giorni di prova completa',
    highlight: 'Non perdertelo!',
    features: ['Installazione gratuita', '30 giorni di accesso completo'],
    cta: 'Installa Ora Gratis',
    dismiss: 'Forse dopo',
    remaining: 'posti rimasti',
  },
  'pt-PT': {
    badge: '🎉 Oferta de Lançamento',
    title: 'Primeiros 100 downloads',
    subtitle: 'Instalação gratuita + 30 dias de teste completo',
    highlight: 'Não perca!',
    features: ['Instalação gratuita', '30 dias de acesso completo'],
    cta: 'Instalar Grátis Agora',
    dismiss: 'Talvez depois',
    remaining: 'vagas restantes',
  },
  'pt-BR': {
    badge: '🎉 Oferta de Lançamento',
    title: 'Primeiros 100 downloads',
    subtitle: 'Instalação gratuita + 30 dias de teste completo',
    highlight: 'Não perca!',
    features: ['Instalação gratuita', '30 dias de acesso completo'],
    cta: 'Instalar Grátis Agora',
    dismiss: 'Talvez depois',
    remaining: 'vagas restantes',
  },
  nl: {
    badge: '🎉 Introductieaanbieding',
    title: 'Eerste 100 downloads',
    subtitle: 'Gratis installatie + 30 dagen volledige proefperiode',
    highlight: 'Mis het niet!',
    features: ['Gratis installatie', '30 dagen volledige toegang'],
    cta: 'Nu Gratis Installeren',
    dismiss: 'Misschien later',
    remaining: 'plaatsen over',
  },
  pl: {
    badge: '🎉 Oferta Startowa',
    title: 'Pierwsze 100 pobrań',
    subtitle: 'Bezpłatna instalacja + 30 dni pełnego dostępu',
    highlight: 'Nie przegap!',
    features: ['Bezpłatna instalacja', '30 dni pełnego dostępu'],
    cta: 'Zainstaluj Za Darmo',
    dismiss: 'Może później',
    remaining: 'miejsc pozostało',
  },
  sv: {
    badge: '🎉 Lanseringserbjudande',
    title: 'Första 100 nedladdningar',
    subtitle: 'Gratis installation + 30 dagars fullt test',
    highlight: 'Missa inte!',
    features: ['Gratis installation', '30 dagars full tillgång'],
    cta: 'Installera Gratis Nu',
    dismiss: 'Kanske senare',
    remaining: 'platser kvar',
  },
  da: {
    badge: '🎉 Lanceringstilbud',
    title: 'Første 100 downloads',
    subtitle: 'Gratis installation + 30 dages fuld prøveperiode',
    highlight: 'Gå ikke glip af det!',
    features: ['Gratis installation', '30 dages fuld adgang'],
    cta: 'Installer Gratis Nu',
    dismiss: 'Måske senere',
    remaining: 'pladser tilbage',
  },
  fi: {
    badge: '🎉 Julkaisutarjous',
    title: 'Ensimmäiset 100 latausta',
    subtitle: 'Ilmainen asennus + 30 päivän täysi kokeilu',
    highlight: 'Älä missaa!',
    features: ['Ilmainen asennus', '30 päivää täyttä käyttöä'],
    cta: 'Asenna Ilmaiseksi Nyt',
    dismiss: 'Ehkä myöhemmin',
    remaining: 'paikkaa jäljellä',
  },
  no: {
    badge: '🎉 Lanseringstilbud',
    title: 'Første 100 nedlastinger',
    subtitle: 'Gratis installasjon + 30 dager full prøveperiode',
    highlight: 'Ikke gå glipp av det!',
    features: ['Gratis installasjon', '30 dager full tilgang'],
    cta: 'Installer Gratis Nå',
    dismiss: 'Kanskje senere',
    remaining: 'plasser igjen',
  },
  cs: {
    badge: '🎉 Startovací Nabídka',
    title: 'Prvních 100 stažení',
    subtitle: 'Bezplatná instalace + 30 dní plného přístupu',
    highlight: 'Nenechte si ujít!',
    features: ['Bezplatná instalace', '30 dní plný přístup'],
    cta: 'Nainstalovat Zdarma',
    dismiss: 'Možná později',
    remaining: 'míst zbývá',
  },
  tr: {
    badge: '🎉 Lansman Teklifi',
    title: 'İlk 100 indirme',
    subtitle: 'Ücretsiz kurulum + 30 gün tam deneme',
    highlight: 'Kaçırmayın!',
    features: ['Ücretsiz kurulum', '30 gün tam erişim'],
    cta: 'Şimdi Ücretsiz Kur',
    dismiss: 'Belki sonra',
    remaining: 'yer kaldı',
  },
  ja: {
    badge: '🎉 ローンチキャンペーン',
    title: '先着100ダウンロード',
    subtitle: '無料インストール + 30日間フルトライアル',
    highlight: 'お見逃しなく！',
    features: ['無料セットアップ', '30日間フルアクセス'],
    cta: '今すぐ無料インストール',
    dismiss: 'また後で',
    remaining: '枠残り',
  },
  ko: {
    badge: '🎉 런칭 프로모션',
    title: '선착순 100명',
    subtitle: '무료 설치 + 30일 전체 체험',
    highlight: '놓치지 마세요!',
    features: ['무료 설치 및 설정', '30일 전체 이용'],
    cta: '지금 무료로 설치',
    dismiss: '나중에',
    remaining: '자리 남음',
  },
  'zh-CN': {
    badge: '🎉 上线特惠',
    title: '前100次下载',
    subtitle: '免费安装 + 30天完整试用',
    highlight: '不要错过！',
    features: ['免费安装配置', '30天完整访问'],
    cta: '立即免费安装',
    dismiss: '以后再说',
    remaining: '名额剩余',
  },
  'zh-TW': {
    badge: '🎉 上線特惠',
    title: '前100次下載',
    subtitle: '免費安裝 + 30天完整試用',
    highlight: '不要錯過！',
    features: ['免費安裝配置', '30天完整訪問'],
    cta: '立即免費安裝',
    dismiss: '以後再說',
    remaining: '名額剩餘',
  },
  th: {
    badge: '🎉 โปรโมชั่นเปิดตัว',
    title: '100 ดาวน์โหลดแรก',
    subtitle: 'ติดตั้งฟรี + ทดลองใช้ 30 วันเต็ม',
    highlight: 'อย่าพลาด!',
    features: ['ติดตั้งฟรี', '30 วันเข้าถึงเต็มรูปแบบ'],
    cta: 'ติดตั้งฟรีตอนนี้',
    dismiss: 'ไว้ทีหลัง',
    remaining: 'ที่นั่งเหลือ',
  },
};

const SHOPIFY_INSTALL_URL = 'https://apps.shopify.com/abu-cross-selling-upselling';

const PromoPopup: React.FC<PromoPopupProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [spotsLeft] = useState(() => Math.floor(Math.random() * 23) + 12); // 12-34 spots

  const t = PROMO_TEXTS[lang] || PROMO_TEXTS.en;

  useEffect(() => {
    // Show after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      sessionStorage.setItem('promo-popup-dismissed', 'true');
    }, 400);
  };

  const handleInstall = () => {
    sessionStorage.setItem('promo-popup-dismissed', 'true');
    window.open(SHOPIFY_INSTALL_URL, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none`}>
        <div
          className={`promo-popup pointer-events-auto relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[#0d1525] via-[#111b30] to-[#0d1525] shadow-[0_25px_100px_rgba(0,0,0,0.7)] transition-all duration-400 ${isClosing ? 'opacity-0 scale-90 translate-y-8' : 'opacity-100 scale-100 translate-y-0'}`}
        >
          {/* Glow effects */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/15 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={14} />
          </button>

          {/* Content */}
          <div className="relative z-10 p-8 pt-6">
            {/* Badge */}
            <div className="flex justify-center mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-xs font-bold text-amber-200 uppercase tracking-wider promo-badge-pulse">
                <Sparkles size={12} className="text-amber-300" />
                {t.badge}
              </span>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                {t.title}
              </h3>
              <p className="text-base text-blue-100/80 leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Spots counter */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/30 to-orange-500/30 border border-red-500/20 flex items-center justify-center">
                    <Zap size={18} className="text-red-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full promo-spot-pulse" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">{spotsLeft}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{t.remaining}</div>
                </div>
                {/* Progress bar */}
                <div className="w-20 h-2 bg-white/[0.06] rounded-full overflow-hidden ml-1">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full promo-bar-shrink"
                    style={{ width: `${(spotsLeft / 100) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2.5 mb-7">
              {t.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 promo-feature-slide" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                    <Gift size={10} className="text-emerald-400" />
                  </div>
                  <span className="text-sm text-blue-100/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleInstall}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white text-base font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 promo-cta-glow"
            >
              <Zap size={18} />
              {t.cta}
              <ArrowRight size={16} />
            </button>

            {/* Dismiss */}
            <button
              onClick={handleClose}
              className="w-full mt-3 py-2 text-xs text-gray-600 hover:text-gray-400 transition-colors text-center"
            >
              {t.dismiss}
            </button>
          </div>
        </div>
      </div>

      {/* Scoped animations */}
      <style>{`
        @keyframes promoBadgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.2); }
          50% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
        }
        @keyframes promoSpotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes promoBarShrink {
          from { width: 100%; }
          to { width: var(--target-width); }
        }
        @keyframes promoFeatureSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes promoCtaGlow {
          0%, 100% { box-shadow: 0 8px 30px rgba(59, 130, 246, 0.35); }
          50% { box-shadow: 0 8px 40px rgba(59, 130, 246, 0.5); }
        }

        .promo-badge-pulse {
          animation: promoBadgePulse 2s ease-in-out infinite;
        }
        .promo-spot-pulse {
          animation: promoSpotPulse 1.5s ease-in-out infinite;
        }
        .promo-bar-shrink {
          transition: width 1s ease-out;
        }
        .promo-feature-slide {
          opacity: 0;
          animation: promoFeatureSlide 0.4s ease-out both;
        }
        .promo-cta-glow {
          animation: promoCtaGlow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default PromoPopup;
