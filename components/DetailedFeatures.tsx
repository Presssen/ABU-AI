import React from 'react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { Brain, Layout, Palette, Tag, BarChart3, Globe2, Headset, Search, Sparkles, Percent, Table2 } from 'lucide-react';

interface DetailedFeaturesProps {
  text: Content['detailedFeatures'];
}

const DetailedFeatures: React.FC<DetailedFeaturesProps> = ({ text }) => {
  return (
    <section id="detailed-features" className="py-24 relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-100 to-blue-200">
            {text.title}
          </h2>
          <p className="text-blue-200/70 max-w-2xl mx-auto text-lg">
            {text.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-4 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* AI Feature - Large Card */}
          <GlassCard className="col-span-1 md:col-span-2 md:row-span-2 p-8 group overflow-hidden" hoverEffect>
             <div className="absolute top-0 right-0 p-32 bg-purple-500/20 blur-[60px] rounded-full group-hover:bg-purple-500/30 transition-all duration-700" />
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30 text-purple-300">
                            <Brain size={32} />
                        </div>
                        {text.ai.tag && (
                            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs font-bold text-purple-200 uppercase tracking-wider">
                                {text.ai.tag}
                            </span>
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{text.ai.title}</h3>
                    <p className="text-blue-100/70 text-lg leading-relaxed">{text.ai.description}</p>
                </div>
                {/* Visual Representation of Nodes connecting */}
                <div className="mt-8 flex space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="h-2 w-full bg-gradient-to-r from-purple-500/50 to-transparent rounded-full animate-pulse"></div>
                    <div className="h-2 w-2/3 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full animate-pulse delay-75"></div>
                    <div className="h-2 w-1/3 bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse delay-150"></div>
                </div>
             </div>
          </GlassCard>

          {/* Design Feature - Wide Card */}
          <GlassCard className="col-span-1 md:col-span-2 p-8 group" hoverEffect>
             <div className="flex items-start justify-between">
                 <div>
                     <div className="mb-4 p-2 w-fit bg-pink-500/20 rounded-lg border border-pink-500/30 text-pink-300">
                        <Palette size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">{text.design.title}</h3>
                     <p className="text-blue-100/70">{text.design.description}</p>
                 </div>
                 {text.design.tag && (
                    <span className="ml-4 px-2 py-1 bg-pink-500/10 border border-pink-500/20 rounded text-[10px] font-bold text-pink-200 uppercase whitespace-nowrap">
                        {text.design.tag}
                    </span>
                 )}
             </div>
             {/* Visual Palette */}
             <div className="mt-6 flex gap-2">
                 <div className="w-8 h-8 rounded-full bg-[#95BF47] border-2 border-white/20 shadow-lg transform group-hover:-translate-y-1 transition-transform"></div>
                 <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white/20 shadow-lg transform group-hover:-translate-y-1 transition-transform delay-75"></div>
                 <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white/20 shadow-lg transform group-hover:-translate-y-1 transition-transform delay-150"></div>
                 <div className="w-8 h-8 rounded-full bg-white border-2 border-white/20 shadow-lg transform group-hover:-translate-y-1 transition-transform delay-200"></div>
             </div>
          </GlassCard>

          {/* Widgets - Tall Card */}
          <GlassCard className="col-span-1 md:row-span-2 p-6 flex flex-col group" hoverEffect>
             <div className="mb-4 p-2 w-fit bg-blue-500/20 rounded-lg border border-blue-500/30 text-blue-300">
                <Layout size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">{text.widgets.title}</h3>
             <p className="text-blue-100/70 text-sm mb-6">{text.widgets.description}</p>
             
             {/* Animated Stack */}
             <div className="relative mt-auto h-24 w-full flex justify-center">
                 <div className="absolute bottom-0 w-3/4 h-16 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm transform scale-90 -translate-y-4 group-hover:-translate-y-6 transition-transform duration-500"></div>
                 <div className="absolute bottom-0 w-4/5 h-16 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm transform scale-95 -translate-y-2 group-hover:-translate-y-3 transition-transform duration-500 delay-75"></div>
                 <div className="absolute bottom-0 w-full h-16 bg-[#0f172a] border border-blue-500/30 rounded-lg flex items-center justify-center shadow-lg z-10">
                    <span className="text-blue-400 font-bold text-xs">Widget UI</span>
                 </div>
             </div>
          </GlassCard>

          {/* SEO & AI Search - Large Card */}
          <GlassCard className="col-span-1 md:col-span-2 md:row-span-2 p-8 group overflow-hidden" hoverEffect>
             <div className="absolute top-0 left-0 p-32 bg-emerald-500/15 blur-[60px] rounded-full group-hover:bg-emerald-500/25 transition-all duration-700" />
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-emerald-300">
                            <Search size={32} />
                        </div>
                        {text.seo.tag && (
                            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-200 uppercase tracking-wider">
                                {text.seo.tag}
                            </span>
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{text.seo.title}</h3>
                    <p className="text-blue-100/70 text-lg leading-relaxed">{text.seo.description}</p>
                </div>
                {/* Visual: Search engine logos / icons representation */}
                <div className="mt-8 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[8px] font-black text-white">G</div>
                        <span className="text-[11px] text-gray-400 font-medium">Google</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                            <Sparkles size={10} className="text-white" />
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">ChatGPT</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-[8px] font-black text-white">P</div>
                        <span className="text-[11px] text-gray-400 font-medium">Perplexity</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-300 to-indigo-500 flex items-center justify-center text-[8px] font-black text-white">G</div>
                        <span className="text-[11px] text-gray-400 font-medium">Gemini</span>
                    </div>
                </div>
             </div>
          </GlassCard>

          {/* Bundles */}
          <GlassCard className="col-span-1 p-6 group" hoverEffect>
              <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                      <Tag size={20} />
                  </div>
                  <h3 className="font-bold text-white">{text.bundles.title}</h3>
              </div>
              <p className="text-sm text-blue-100/60">{text.bundles.description}</p>
          </GlassCard>

           {/* Data */}
           <GlassCard className="col-span-1 p-6 group" hoverEffect>
              <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                      <BarChart3 size={20} />
                  </div>
                  <h3 className="font-bold text-white">{text.data.title}</h3>
              </div>
              <p className="text-sm text-blue-100/60">{text.data.description}</p>
          </GlassCard>

           {/* Translation */}
           <GlassCard className="col-span-1 p-6 group" hoverEffect>
              <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                      <Globe2 size={20} />
                  </div>
                  <h3 className="font-bold text-white">{text.translation.title}</h3>
              </div>
              <p className="text-sm text-blue-100/60">{text.translation.description}</p>
          </GlassCard>

           {/* Support */}
           <GlassCard className="col-span-1 p-6 group" hoverEffect>
              <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                      <Headset size={20} />
                  </div>
                  <h3 className="font-bold text-white">{text.support.title}</h3>
              </div>
              <p className="text-sm text-blue-100/60">{text.support.description}</p>
          </GlassCard>

          {/* Coming Soon - Full Width Highlight Card */}
          <GlassCard className="col-span-1 md:col-span-4 p-8 group overflow-hidden relative" hoverEffect>
             <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[80px] rounded-full group-hover:bg-amber-500/20 transition-all duration-700 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 blur-[60px] rounded-full group-hover:bg-violet-500/15 transition-all duration-700 pointer-events-none" />
             <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="p-4 bg-gradient-to-br from-amber-500/20 to-violet-500/20 rounded-2xl border border-amber-500/20 text-amber-300">
                        <Sparkles size={32} />
                    </div>
                    {text.comingSoon.tag && (
                        <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-violet-500/20 border border-amber-500/30 rounded-full text-xs font-bold text-amber-200 uppercase tracking-wider animate-pulse">
                            {text.comingSoon.tag}
                        </span>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{text.comingSoon.title}</h3>
                    <p className="text-blue-100/70 text-base leading-relaxed">{text.comingSoon.description}</p>
                </div>
                {/* Visual mini-previews */}
                <div className="flex gap-3 flex-shrink-0">
                    {/* Quantity Discount Preview */}
                    <div className="w-28 h-24 bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 group-hover:border-amber-500/20 transition-colors">
                        <Percent size={18} className="text-amber-400" />
                        <div className="w-full space-y-1">
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] text-gray-500">2+</span>
                                <span className="text-[8px] text-emerald-400 font-bold">-5%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] text-gray-500">5+</span>
                                <span className="text-[8px] text-emerald-400 font-bold">-10%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] text-gray-500">10+</span>
                                <span className="text-[8px] text-emerald-400 font-bold">-20%</span>
                            </div>
                        </div>
                    </div>
                    {/* Comparison Table Preview */}
                    <div className="w-28 h-24 bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 group-hover:border-violet-500/20 transition-colors">
                        <Table2 size={18} className="text-violet-400" />
                        <div className="w-full space-y-1">
                            <div className="flex gap-1">
                                <div className="flex-1 h-1.5 bg-white/10 rounded-sm"></div>
                                <div className="flex-1 h-1.5 bg-violet-500/30 rounded-sm"></div>
                                <div className="flex-1 h-1.5 bg-white/10 rounded-sm"></div>
                            </div>
                            <div className="flex gap-1">
                                <div className="flex-1 h-1.5 bg-white/10 rounded-sm"></div>
                                <div className="flex-1 h-1.5 bg-violet-500/30 rounded-sm"></div>
                                <div className="flex-1 h-1.5 bg-white/10 rounded-sm"></div>
                            </div>
                            <div className="flex gap-1">
                                <div className="flex-1 h-1.5 bg-white/10 rounded-sm"></div>
                                <div className="flex-1 h-1.5 bg-violet-500/30 rounded-sm"></div>
                                <div className="flex-1 h-1.5 bg-white/10 rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </GlassCard>

        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;