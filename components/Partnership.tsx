import React from 'react';
import { ExternalLink } from 'lucide-react';

const TRUSTZ_LOGO = 'https://cdn.shopify.com/s/files/1/0751/1290/6942/files/Logo.png?v=1777386013';
const TRUSTZ_UTM = 'https://apps.shopify.com/trustz?utm_medium=abuapp-website&utm_source=trustz-partnership&utm_campaign=trustz';

const Partnership: React.FC = () => {
  return (
    <section id="partnership" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4">
        {/* Polaris-style card */}
        <div
          className="
            relative overflow-hidden
            bg-white/[0.04]
            backdrop-blur-xl
            border border-white/[0.08]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
            rounded-2xl
            p-8 md:p-10
          "
        >
          {/* Glossy reflection */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Subtle top-border accent — Polaris green */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#95BF47] to-transparent opacity-60" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={TRUSTZ_LOGO}
                alt="TrustZ Logo"
                width={100}
                height={100}
                className="w-[100px] h-[100px] object-contain rounded-xl"
                style={{ border: 'none' }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              {/* Polaris-style badge */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-[#95BF47]/80 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#95BF47] animate-pulse" />
                Partner App
              </span>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                TrustZ – All-in-one Marketing Toolkit
              </h3>

              <p className="text-sm md:text-base text-blue-200/60 leading-relaxed max-w-lg">
                One app, total growth. Explore this all-in-one marketing tool that your store needs to sell more.
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <a
                href={TRUSTZ_UTM}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3
                  bg-[#95BF47] hover:bg-[#86ad3f]
                  text-white font-semibold text-sm
                  rounded-xl
                  shadow-[0_4px_14px_rgba(149,191,71,0.3)]
                  hover:shadow-[0_6px_20px_rgba(149,191,71,0.45)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                "
              >
                Install now
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
