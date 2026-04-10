import React, { useState } from 'react';
import { X, Calculator, TrendingUp, DollarSign, ShoppingCart, Percent, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface RevenueCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const CALC_TEXTS: Record<string, {
  title: string;
  subtitle: string;
  aovLabel: string;
  aovPlaceholder: string;
  ordersLabel: string;
  ordersPlaceholder: string;
  crLabel: string;
  crPlaceholder: string;
  calculate: string;
  resultsTitle: string;
  currentRevenue: string;
  withAbu: string;
  extraRevenue: string;
  aovIncrease: string;
  crIncrease: string;
  perMonth: string;
  conservative: string;
  optimistic: string;
  cta: string;
  disclaimer: string;
}> = {
  es: {
    title: 'Calcula tu Potencial de Ingresos',
    subtitle: '¿Cuánto más podrías ganar con ABU?',
    aovLabel: 'Pedido Medio (€/$)',
    aovPlaceholder: '65',
    ordersLabel: 'Pedidos al mes',
    ordersPlaceholder: '500',
    crLabel: 'Tasa de conversión (%)',
    crPlaceholder: '2.5',
    calculate: 'Calcular mi Potencial',
    resultsTitle: 'Tu potencial con ABU',
    currentRevenue: 'Ingresos actuales',
    withAbu: 'Ingresos con ABU',
    extraRevenue: 'Ingresos extra al mes',
    aovIncrease: 'Aumento del pedido medio',
    crIncrease: 'Mejora de conversión',
    perMonth: '/mes',
    conservative: 'Conservador',
    optimistic: 'Optimista',
    cta: 'Empieza a Ganar Más Ahora',
    disclaimer: 'Estimación basada en datos de nuestros merchants. Los resultados reales pueden variar.',
  },
  en: {
    title: 'Calculate Your Revenue Potential',
    subtitle: 'How much more could you earn with ABU?',
    aovLabel: 'Average Order Value ($/€)',
    aovPlaceholder: '65',
    ordersLabel: 'Orders per month',
    ordersPlaceholder: '500',
    crLabel: 'Conversion rate (%)',
    crPlaceholder: '2.5',
    calculate: 'Calculate My Potential',
    resultsTitle: 'Your potential with ABU',
    currentRevenue: 'Current revenue',
    withAbu: 'Revenue with ABU',
    extraRevenue: 'Extra revenue per month',
    aovIncrease: 'AOV increase',
    crIncrease: 'Conversion improvement',
    perMonth: '/month',
    conservative: 'Conservative',
    optimistic: 'Optimistic',
    cta: 'Start Earning More Now',
    disclaimer: 'Estimate based on our merchant data. Actual results may vary.',
  },
  de: {
    title: 'Berechne dein Umsatzpotenzial',
    subtitle: 'Wie viel mehr könntest du mit ABU verdienen?',
    aovLabel: 'Durchschnittlicher Bestellwert (€)',
    aovPlaceholder: '65',
    ordersLabel: 'Bestellungen pro Monat',
    ordersPlaceholder: '500',
    crLabel: 'Konversionsrate (%)',
    crPlaceholder: '2.5',
    calculate: 'Mein Potenzial berechnen',
    resultsTitle: 'Dein Potenzial mit ABU',
    currentRevenue: 'Aktuelle Einnahmen',
    withAbu: 'Einnahmen mit ABU',
    extraRevenue: 'Zusätzliche Einnahmen pro Monat',
    aovIncrease: 'AOV-Steigerung',
    crIncrease: 'Konversionsverbesserung',
    perMonth: '/Monat',
    conservative: 'Konservativ',
    optimistic: 'Optimistisch',
    cta: 'Jetzt mehr verdienen',
    disclaimer: 'Schätzung basierend auf Händlerdaten. Tatsächliche Ergebnisse können variieren.',
  },
  fr: {
    title: 'Calculez votre potentiel de revenus',
    subtitle: 'Combien de plus pourriez-vous gagner avec ABU ?',
    aovLabel: 'Panier moyen (€)',
    aovPlaceholder: '65',
    ordersLabel: 'Commandes par mois',
    ordersPlaceholder: '500',
    crLabel: 'Taux de conversion (%)',
    crPlaceholder: '2.5',
    calculate: 'Calculer mon potentiel',
    resultsTitle: 'Votre potentiel avec ABU',
    currentRevenue: 'Revenus actuels',
    withAbu: 'Revenus avec ABU',
    extraRevenue: 'Revenus supplémentaires par mois',
    aovIncrease: 'Augmentation du panier moyen',
    crIncrease: 'Amélioration de la conversion',
    perMonth: '/mois',
    conservative: 'Conservateur',
    optimistic: 'Optimiste',
    cta: 'Commencez à gagner plus',
    disclaimer: 'Estimation basée sur les données de nos marchands. Les résultats réels peuvent varier.',
  },
};

// Fallback: any lang not explicitly defined falls back to English
const getCalcText = (lang: string) => CALC_TEXTS[lang] || CALC_TEXTS.en;

const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ isOpen, onClose, lang }) => {
  const [aov, setAov] = useState('');
  const [orders, setOrders] = useState('');
  const [conversionRate, setCr] = useState('');
  const [results, setResults] = useState<null | {
    currentRevenue: number;
    conservativeRevenue: number;
    optimisticRevenue: number;
    conservativeExtra: number;
    optimisticExtra: number;
    conservativeAov: number;
    optimisticAov: number;
    newCr: number;
    originalCr: number;
  }>(null);
  const [isClosing, setIsClosing] = useState(false);

  const t = getCalcText(lang);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      setResults(null);
    }, 350);
  };

  const handleCalculate = () => {
    const aovNum = parseFloat(aov) || 0;
    const ordersNum = parseFloat(orders) || 0;
    const crNum = parseFloat(conversionRate) || 0;

    if (aovNum <= 0 || ordersNum <= 0) return;

    const currentRevenue = aovNum * ordersNum;

    // Conservative: +7% AOV
    const conservativeAov = aovNum * 1.07;
    const conservativeRevenue = conservativeAov * ordersNum;
    const conservativeExtra = conservativeRevenue - currentRevenue;

    // Optimistic: +15% AOV
    const optimisticAov = aovNum * 1.15;
    const optimisticRevenue = optimisticAov * ordersNum;
    const optimisticExtra = optimisticRevenue - currentRevenue;

    // CR improvement: +0.1%
    const newCr = crNum + 0.1;

    setResults({
      currentRevenue,
      conservativeRevenue,
      optimisticRevenue,
      conservativeExtra,
      optimisticExtra,
      conservativeAov,
      optimisticAov,
      newCr,
      originalCr: crNum,
    });
  };

  const formatCurrency = (n: number) => {
    return n.toLocaleString(lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[#0d1525] via-[#111b30] to-[#0d1525] shadow-[0_25px_100px_rgba(0,0,0,0.7)] transition-all duration-350 ${isClosing ? 'opacity-0 scale-90 translate-y-8' : 'opacity-100 scale-100 translate-y-0'}`}
        >
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-emerald-500/15 rounded-full blur-[60px] pointer-events-none" />

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={14} />
          </button>

          <div className="relative z-10 p-8 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-blue-500/20 mb-4">
                <Calculator size={28} className="text-blue-300" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-1">{t.title}</h3>
              <p className="text-sm text-blue-100/60">{t.subtitle}</p>
            </div>

            {!results ? (
              /* ── Input Form ── */
              <div className="space-y-5">
                {/* AOV */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <DollarSign size={12} className="text-blue-400" />
                    {t.aovLabel}
                  </label>
                  <input
                    type="number"
                    value={aov}
                    onChange={(e) => setAov(e.target.value)}
                    placeholder={t.aovPlaceholder}
                    className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-lg font-semibold placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                {/* Orders */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ShoppingCart size={12} className="text-emerald-400" />
                    {t.ordersLabel}
                  </label>
                  <input
                    type="number"
                    value={orders}
                    onChange={(e) => setOrders(e.target.value)}
                    placeholder={t.ordersPlaceholder}
                    className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-lg font-semibold placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                {/* Conversion Rate */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Percent size={12} className="text-amber-400" />
                    {t.crLabel}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={conversionRate}
                    onChange={(e) => setCr(e.target.value)}
                    placeholder={t.crPlaceholder}
                    className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-lg font-semibold placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                {/* Calculate Button */}
                <button
                  onClick={handleCalculate}
                  disabled={!aov || !orders}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-base font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  <Calculator size={18} />
                  {t.calculate}
                </button>
              </div>
            ) : (
              /* ── Results ── */
              <div className="calc-results-entrance text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/15 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  <Sparkles size={12} />
                  {t.resultsTitle}
                </div>

                {/* Extra Revenue - Main highlight */}
                <div className="bg-gradient-to-r from-emerald-500/15 to-blue-500/15 border border-emerald-500/25 rounded-2xl p-8 calc-extra-pop">
                  <div className="text-sm text-emerald-400 uppercase tracking-wider font-bold mb-4">{t.extraRevenue}</div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-bold text-emerald-300">${formatCurrency(results.conservativeExtra)}</span>
                    <span className="text-gray-600">—</span>
                    <span className="text-4xl font-black text-emerald-400">${formatCurrency(results.optimisticExtra)}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">{t.perMonth}</div>
                </div>

                {/* CTA */}
                <a
                  href="https://apps.shopify.com/abu-cross-selling-upselling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-base font-bold rounded-2xl text-center shadow-[0_8px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span className="flex items-center justify-center gap-2.5">
                    <Sparkles size={18} />
                    {t.cta}
                    <ArrowRight size={16} />
                  </span>
                </a>

                {/* Recalculate */}
                <button
                  onClick={() => setResults(null)}
                  className="w-full py-2 text-xs text-gray-600 hover:text-gray-400 transition-colors text-center"
                >
                  ← {t.calculate}
                </button>

                <p className="text-[10px] text-gray-600 text-center leading-relaxed">{t.disclaimer}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes calcResultsEntrance {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes calcExtraPop {
          0% { opacity: 0; transform: scale(0.9); }
          60% { transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
        .calc-results-entrance {
          animation: calcResultsEntrance 0.5s ease-out both;
        }
        .calc-extra-pop {
          animation: calcExtraPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both;
        }
        /* Hide number input spinners */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
};

export default RevenueCalculator;
