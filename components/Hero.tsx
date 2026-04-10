
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Check, Plus, ShoppingCart, Package, Calculator } from 'lucide-react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { SHOPIFY_LOGO_URL } from '../constants';
import RevenueCalculator from './RevenueCalculator';

interface HeroProps {
  text: Content['hero'];
  lang?: string;
}

/* ── Small SVG product illustrations ── */
const SnowboardIllustration = () => (
  <svg viewBox="0 0 48 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="sb1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a78bfa"/>
        <stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="sbShine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.35)"/>
        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
      </linearGradient>
    </defs>
    <rect x="14" y="2" width="20" height="60" rx="10" fill="url(#sb1)"/>
    <rect x="14" y="2" width="10" height="60" rx="10" fill="url(#sbShine)"/>
    <rect x="18" y="18" width="12" height="2" rx="1" fill="rgba(255,255,255,0.4)"/>
    <rect x="18" y="24" width="12" height="2" rx="1" fill="rgba(255,255,255,0.25)"/>
    <rect x="18" y="30" width="8" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
    <circle cx="24" cy="44" r="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);

const WaxIllustration = () => (
  <svg viewBox="0 0 48 40" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="wax1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24"/>
        <stop offset="100%" stopColor="#d97706"/>
      </linearGradient>
    </defs>
    <rect x="6" y="4" width="36" height="32" rx="4" fill="url(#wax1)"/>
    <rect x="6" y="4" width="18" height="32" rx="4" fill="rgba(255,255,255,0.15)"/>
    <rect x="12" y="12" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.4)"/>
    <rect x="16" y="19" width="16" height="2" rx="1" fill="rgba(255,255,255,0.25)"/>
    <circle cx="24" cy="28" r="3" fill="rgba(255,255,255,0.2)"/>
  </svg>
);

const HelmetIllustration = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="hel1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2dd4bf"/>
        <stop offset="100%" stopColor="#0d9488"/>
      </linearGradient>
    </defs>
    <ellipse cx="24" cy="30" rx="18" ry="12" fill="url(#hel1)"/>
    <ellipse cx="24" cy="30" rx="18" ry="12" fill="rgba(255,255,255,0.1)"/>
    <path d="M6 30 C6 16 14 8 24 8 C34 8 42 16 42 30" fill="url(#hel1)"/>
    <path d="M6 30 C6 16 14 8 24 8 C24 8 14 16 14 30" fill="rgba(255,255,255,0.15)"/>
    <ellipse cx="24" cy="26" rx="10" ry="4" fill="rgba(255,255,255,0.12)"/>
    <rect x="8" y="29" width="32" height="2" rx="1" fill="rgba(0,0,0,0.15)"/>
  </svg>
);

const Hero: React.FC<HeroProps> = ({ text, lang }) => {
  const navigate = useNavigate();
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <div className="text-center lg:text-left z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#95BF47] animate-pulse"></span>
            <span className="text-sm font-medium text-blue-100">{text.badge}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-6 leading-tight">
            {text.title}
          </h1>

          <p className="text-lg md:text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {text.subtitle}
          </p>

          <div className="flex flex-col items-center lg:items-start space-y-4 max-w-md mx-auto lg:mx-0">
            <a href="https://apps.shopify.com/abu-cross-selling-upselling" className="w-full sm:w-auto px-8 py-4 bg-white text-[#0f172a] rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center space-x-3">
              <img src={SHOPIFY_LOGO_URL} alt="Shopify" className="h-6 w-auto object-contain" />
              <span>{text.ctaPrimary}</span>
              <ArrowRight size={20} />
            </a>
            <button
              onClick={() => setIsCalcOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Calculator size={20} className="text-emerald-400" />
              {text.ctaSecondary}
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start space-x-8 text-sm font-medium text-blue-200/60">
            <div className="flex items-center space-x-2">
              <TrendingUp size={16} className="text-[#95BF47]" />
              <span>{text.stats.users}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <span>{text.stats.rating}</span>
            </div>
          </div>
        </div>

        {/* ── Visual Mockup ── */}
        <div className="relative z-10 hidden lg:block" style={{perspective:'1200px'}}>
          <div className="hero-mockup-entrance" style={{transformStyle:'preserve-3d'}}>
            <GlassCard className="p-0 overflow-hidden transform transition-transform duration-700 hover:scale-[1.02] bg-gradient-to-br from-[#0d1525]/90 to-[#0a0f1c]/95 border-white/[0.08] shadow-[0_20px_80px_rgba(0,0,0,0.55)]">

              {/* ── Browser Chrome ── */}
              <div className="flex items-center px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 bg-white/[0.06] rounded-lg px-4 py-1.5 max-w-[260px] w-full">
                    <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span className="text-[10px] text-gray-500 truncate">mystore.myshopify.com/products/hydrogen</span>
                  </div>
                </div>
              </div>

              {/* ── Page Content ── */}
              <div className="p-5">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 mb-4 hero-stagger" style={{animationDelay:'0.3s'}}>
                  <span className="text-[9px] text-gray-500">Home</span>
                  <span className="text-[9px] text-gray-600">/</span>
                  <span className="text-[9px] text-gray-500">Snowboards</span>
                  <span className="text-[9px] text-gray-600">/</span>
                  <span className="text-[9px] text-blue-400/70">Hydrogen</span>
                </div>

                <div className="flex gap-5">
                  {/* ── Left: Product Image ── */}
                  <div className="w-[42%] flex-shrink-0 space-y-3 hero-stagger" style={{animationDelay:'0.4s'}}>
                    <div className="aspect-square bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-xl border border-white/[0.06] flex items-center justify-center p-6 relative overflow-hidden">
                      <div className="absolute inset-0 hero-product-shimmer"></div>
                      <div className="w-20 h-full relative z-10">
                        <SnowboardIllustration />
                      </div>
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-2">
                      {[0,1,2].map(i => (
                        <div key={i} className={`w-12 h-12 rounded-lg border flex items-center justify-center ${i===0?'border-blue-500/50 bg-blue-500/5':'border-white/[0.06] bg-white/[0.02]'}`}>
                          <div className={`w-4 h-7 rounded-sm ${i===0?'bg-purple-400/60':i===1?'bg-purple-500/30':'bg-purple-600/20'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Right: Product Details ── */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="hero-stagger" style={{animationDelay:'0.5s'}}>
                      <h3 className="text-[14px] font-bold text-white leading-snug">The Collection Snowboard: Hydrogen</h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex text-yellow-400">
                          {[1,2,3,4,5].map(i=><Star key={i} size={10} fill="currentColor"/>)}
                        </div>
                        <span className="text-[9px] text-gray-500">(128 reviews)</span>
                      </div>
                    </div>

                    <div className="hero-stagger" style={{animationDelay:'0.6s'}}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-white">600,00 US$</span>
                      </div>
                      <span className="text-[9px] text-emerald-400/80 block mt-0.5">✓ In stock · Free shipping</span>
                    </div>

                    {/* Variant */}
                    <div className="hero-stagger" style={{animationDelay:'0.7s'}}>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Color</div>
                      <div className="flex gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-blue-400 shadow-[0_0_8px_rgba(139,92,246,0.4)]"></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border border-white/10"></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 border border-white/10"></div>
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="hero-stagger" style={{animationDelay:'0.8s'}}>
                      <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all">
                        <ShoppingCart size={13}/> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* ══════════════════════════════════════════
                    ── ABU Frequently Bought Together Widget ──
                    ══════════════════════════════════════════ */}
                <div className="mt-5 hero-widget-entrance" style={{animationDelay:'1.0s'}}>
                  <div className="relative rounded-xl border border-[#95BF47]/30 bg-gradient-to-br from-[#95BF47]/[0.06] to-transparent overflow-hidden">
                    {/* ABU badge */}
                    <div className="absolute top-0 right-0 bg-[#95BF47]/15 px-2.5 py-1 rounded-bl-lg border-b border-l border-[#95BF47]/20">
                      <span className="text-[8px] font-bold text-[#95BF47] tracking-wider uppercase">✦ Powered by ABU</span>
                    </div>

                    <div className="px-5 pt-4 pb-1">
                      <h4 className="text-[13px] font-bold text-white flex items-center gap-2">
                        <Package size={13} className="text-[#95BF47]"/>
                        Frequently Bought Together
                      </h4>
                      <p className="text-[9px] text-gray-500 mt-0.5">Get 10% off when you buy these together</p>
                    </div>

                    {/* ── Product Images Row ── */}
                    <div className="px-5 py-3 flex items-center justify-center gap-2">
                      {/* Product 1 — Snowboard */}
                      <div className="hero-fbt-item w-[80px] h-[80px] bg-white/[0.04] rounded-xl border border-white/[0.08] flex items-center justify-center p-2 relative group transition-all hover:border-[#95BF47]/30 hover:bg-[#95BF47]/[0.03]" style={{animationDelay:'1.3s'}}>
                        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shadow-md shadow-blue-600/30 hero-check-pop" style={{animationDelay:'1.8s'}}>
                          <Check size={9} className="text-white" strokeWidth={3}/>
                        </div>
                        <div className="w-8 h-14"><SnowboardIllustration/></div>
                      </div>

                      <Plus className="text-[#95BF47]/60 w-4 h-4 flex-shrink-0 hero-plus-spin" style={{animationDelay:'1.5s'}}/>

                      {/* Product 2 — Wax */}
                      <div className="hero-fbt-item w-[80px] h-[80px] bg-white/[0.04] rounded-xl border border-white/[0.08] flex items-center justify-center p-2 relative group transition-all hover:border-[#95BF47]/30 hover:bg-[#95BF47]/[0.03]" style={{animationDelay:'1.5s'}}>
                        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shadow-md shadow-blue-600/30 hero-check-pop" style={{animationDelay:'2.0s'}}>
                          <Check size={9} className="text-white" strokeWidth={3}/>
                        </div>
                        <div className="w-10 h-8"><WaxIllustration/></div>
                      </div>

                      <Plus className="text-[#95BF47]/60 w-4 h-4 flex-shrink-0 hero-plus-spin" style={{animationDelay:'1.7s'}}/>

                      {/* Product 3 — Helmet */}
                      <div className="hero-fbt-item w-[80px] h-[80px] bg-white/[0.04] rounded-xl border border-white/[0.08] flex items-center justify-center p-2 relative group transition-all hover:border-[#95BF47]/30 hover:bg-[#95BF47]/[0.03]" style={{animationDelay:'1.7s'}}>
                        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shadow-md shadow-blue-600/30 hero-check-pop" style={{animationDelay:'2.2s'}}>
                          <Check size={9} className="text-white" strokeWidth={3}/>
                        </div>
                        <div className="w-10 h-10"><HelmetIllustration/></div>
                      </div>
                    </div>

                    {/* ── Pricing Summary ── */}
                    <div className="mx-5 border-t border-white/[0.06]"></div>
                    <div className="px-5 py-3 flex items-center justify-between">
                      <div className="hero-price-reveal" style={{animationDelay:'2.0s'}}>
                        <div className="text-[9px] text-gray-500 uppercase tracking-wider font-medium">Bundle Price</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-[18px] font-bold text-white">1.108,46 US$</span>
                          <span className="text-[10px] text-gray-600 line-through">1.231,62 US$</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 hero-badge-pop" style={{animationDelay:'2.3s'}}>
                        <span className="inline-block bg-emerald-500/15 text-emerald-400 text-[9px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">SAVE 10%</span>
                      </div>
                    </div>

                    {/* ── Add Bundle Button ── */}
                    <div className="px-5 pb-4 hero-btn-entrance" style={{animationDelay:'2.5s'}}>
                      <button className="w-full py-2.5 bg-gradient-to-r from-[#95BF47] to-[#7da832] text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#95BF47]/20 transition-all hover:shadow-[#95BF47]/30">
                        <ShoppingCart size={13}/> Add Bundle to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* ── Floating Conversion Card ── */}
          <div className="absolute -bottom-8 -left-8 hero-float-card" style={{animationDelay:'2.8s'}}>
            <GlassCard className="p-4 w-52 bg-[#0d1525]/90 border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-500/15 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/10">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">AOV Increase</div>
                  <div className="font-bold text-xl text-emerald-400 leading-tight">+24.3%</div>
                </div>
              </div>
              <div className="mt-2.5 flex gap-1">
                {[40,65,45,80,60,90,75,95,70,85].map((h,i)=>(
                  <div key={i} className="flex-1 rounded-sm bg-emerald-500/20 relative overflow-hidden" style={{height:`${h*0.3}px`}}>
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500/50 rounded-sm hero-bar-fill" style={{height:`${h}%`, animationDelay:`${3.0+i*0.1}s`}}/>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* ── Floating AI Badge ── */}
          <div className="absolute -top-4 -right-4 hero-float-card" style={{animationDelay:'3.2s'}}>
            <GlassCard className="px-4 py-3 bg-[#0d1525]/90 border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-blue-500/25">AI</div>
                <div>
                  <div className="text-[10px] text-gray-500 font-medium">Smart Pairing</div>
                  <div className="text-[11px] font-bold text-blue-300">98.2% accuracy</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* ── Scoped Animations ── */}
      <style>{`
        @keyframes heroStagger {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroWidgetEntrance {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroFbtItem {
          0% { opacity: 0; transform: scale(0.7) rotate(-8deg); }
          60% { transform: scale(1.05) rotate(1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes heroCheckPop {
          0% { opacity: 0; transform: scale(0); }
          60% { transform: scale(1.4); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes heroPlusSpin {
          from { opacity: 0; transform: rotate(-180deg) scale(0); }
          to { opacity: 1; transform: rotate(0) scale(1); }
        }
        @keyframes heroPriceReveal {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroBadgePop {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes heroBtnEntrance {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloatCard {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroMockupEntrance {
          from { opacity: 0; transform: rotateY(15deg) rotateX(5deg) translateX(30px); }
          to { opacity: 1; transform: rotateY(0) rotateX(0) translateX(0); }
        }
        @keyframes heroProductShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes heroBarFill {
          from { height: 0%; }
          to { height: var(--h, 100%); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .hero-mockup-entrance {
          opacity: 0;
          animation: heroMockupEntrance 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .hero-stagger {
          opacity: 0;
          animation: heroStagger 0.5s ease-out both;
        }
        .hero-widget-entrance {
          opacity: 0;
          animation: heroWidgetEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-fbt-item {
          opacity: 0;
          animation: heroFbtItem 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .hero-check-pop {
          opacity: 0;
          animation: heroCheckPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .hero-plus-spin {
          opacity: 0;
          animation: heroPlusSpin 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .hero-price-reveal {
          opacity: 0;
          animation: heroPriceReveal 0.5s ease-out both;
        }
        .hero-badge-pop {
          opacity: 0;
          animation: heroBadgePop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .hero-btn-entrance {
          opacity: 0;
          animation: heroBtnEntrance 0.5s ease-out both;
        }
        .hero-float-card {
          opacity: 0;
          animation: heroFloatCard 0.6s cubic-bezier(0.16, 1, 0.3, 1) both, heroFloat 4s ease-in-out 3.5s infinite;
        }
        .hero-product-shimmer {
          background-size: 200% 100%;
          background-image: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.04) 40%,
            rgba(255,255,255,0.08) 50%,
            rgba(255,255,255,0.04) 60%,
            transparent 100%
          );
          animation: heroProductShimmer 3s ease-in-out 2s infinite;
        }
        .hero-bar-fill {
          animation: heroBarFill 0.6s ease-out both;
        }
      `}</style>

      <RevenueCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} lang={lang || 'en'} />
    </section>
  );
};

export default Hero;

