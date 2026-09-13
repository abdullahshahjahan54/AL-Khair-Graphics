import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Sparkles, Building2, CheckCircle } from 'lucide-react';

export const BrandMarquee: React.FC = () => {
  const brandClients = [
    { name: 'Gomal University', role: 'Official Educational Print Partner', icon: '🏛️' },
    { name: 'Bank of Khyber', role: 'Corporate Stationery & Branding', icon: '🏦' },
    { name: 'Govt of KPK', role: 'Institutional Awareness Campaigns', icon: '🇵🇰' },
    { name: 'National Bank of Pakistan', role: 'Signage & Promotional Media', icon: '🏢' },
    { name: 'PSO Petroleum', role: 'Outdoor Highway Banners', icon: '⛽' },
    { name: 'Pepsi Distributors', role: 'Point of Sale (POS) Flex', icon: '🥤' },
    { name: 'State Life Insurance', role: 'Executive Brochures & Awards', icon: '📑' },
    { name: 'Hamza I.T Market Association', role: 'Commercial Signboards', icon: '💻' },
  ];

  const techPartners = [
    { name: 'Star Flex Korea', role: 'Heavy 440gsm Frontlit Media', icon: '🌟' },
    { name: 'Roland DG Pro', role: 'Authorized High-DPI Output', icon: '🖨️' },
    { name: '3M Commercial Graphics', role: 'Reflective Vinyl & Car Wraps', icon: '🛡️' },
    { name: 'HP Indigo Master', role: 'Fine Art & Offset Reproduction', icon: '🎨' },
    { name: 'Epson UltraChrome', role: 'Architectural Wallpapers', icon: '🖼️' },
    { name: 'Mimaki UV Flatbed', role: 'Direct-to-Object & Acrylic Print', icon: '✨' },
    { name: 'Heidelberg Speedmaster', role: 'High Volume Offset Publishing', icon: '⚙️' },
    { name: 'Shiny Self-Inkers', role: 'Precision Rubber Stamp Tech', icon: '🖋️' },
  ];

  // Duplicate for seamless infinite loop
  const marqueeItems1 = [...brandClients, ...brandClients];
  const marqueeItems2 = [...techPartners, ...techPartners];

  return (
    <div className="relative py-12 bg-neutral-950 border-y border-neutral-800/80 overflow-hidden space-y-4">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/20 to-neutral-950 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Collaborating With Brands &amp; Print Technologies</span>
        </motion.div>
      </div>

      {/* Track 1: Moving Left */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center gap-4 py-1">
          {marqueeItems1.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-sm group shrink-0 cursor-default hover:bg-neutral-800/90 shadow-md"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-800 group-hover:bg-amber-400/20 border border-neutral-700 group-hover:border-amber-400/50 flex items-center justify-center text-base transition-colors shrink-0">
                {brand.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  {brand.name}
                </p>
                <p className="text-[10px] text-neutral-400 group-hover:text-neutral-300 transition-colors whitespace-nowrap">
                  {brand.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Track 2: Moving Right */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee-reverse flex items-center gap-4 py-1">
          {marqueeItems2.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-sm group shrink-0 cursor-default hover:bg-neutral-800/90 shadow-md"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-800 group-hover:bg-amber-400/20 border border-neutral-700 group-hover:border-amber-400/50 flex items-center justify-center text-base transition-colors shrink-0">
                {tech.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  {tech.name}
                </p>
                <p className="text-[10px] text-neutral-400 group-hover:text-neutral-300 transition-colors whitespace-nowrap">
                  {tech.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
