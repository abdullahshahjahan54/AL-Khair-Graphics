import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  CheckCircle, 
  Palette, 
  Printer, 
  Megaphone,
  Clock
} from 'lucide-react';
import { BusinessSettings } from '../types';

interface AboutSectionProps {
  settings: BusinessSettings;
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onOpenQuote }) => {
  const pillars = [
    {
      title: 'Professional Service',
      description: 'Dedicated client communication, attentive project handling, and dependable execution on every order.'
    },
    {
      title: 'Creative Solutions',
      description: 'Original concepts that capture customer attention across outdoor billboards, brand packaging, and print media.'
    },
    {
      title: 'Custom Designs',
      description: 'Designs created from scratch according to each client’s distinct specifications and marketing goals.'
    },
    {
      title: 'Local Business Support',
      description: 'Rooted right here in Dera Ismail Khan, empowering local businesses, stores, and institutions with commercial design.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-neutral-950 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Agency Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            {/* Floating Experience Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -top-4 -right-2 sm:-right-4 z-20 p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-neutral-950 shadow-2xl shadow-amber-500/30 border border-amber-300 animate-float-slow"
            >
              <p className="text-xl font-black font-display leading-none">12+ Years</p>
              <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5">Printing &amp; Advertising</p>
            </motion.div>

            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl relative overflow-hidden space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Building2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  AL Khair Graphics
                </h3>
                <p className="text-amber-400 text-sm font-semibold tracking-wide mt-1">
                  Graphic Design • Printing • Advertising
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-neutral-800 text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Liaquat Park, Hamza I.T Market Opp., East Circular Road, Dera Ismail Khan, 29111, Pakistan
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-emerald-400">Open 24 Hours</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-semibold text-neutral-300">
                  Billboards &amp; Flex
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-semibold text-neutral-300">
                  Logo &amp; Stationery
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-semibold text-neutral-300">
                  Wallpapers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: About Content & 4 Core Pillars */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Our Agency</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                About AL Khair Graphics
              </h2>
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                AL Khair Graphics is a graphics, printing and advertising business serving customers in Dera Ismail Khan. We provide creative design and printing solutions for businesses, promotions, branding and advertising requirements.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {pillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-2 hover:border-amber-500/40 hover:bg-neutral-900/90 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 font-display font-bold text-white text-base">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Production Quality Metric Progress Bars */}
            <div className="space-y-4 pt-4 border-t border-neutral-800/80">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">Panaflex &amp; Wide-Format Durability</span>
                  <span className="text-amber-400 font-mono">100% Guaranteed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">High-DPI Offset &amp; Color Precision</span>
                  <span className="text-amber-400 font-mono">99.8% Calibrated</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '99.8%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">On-Time Project Dispatch</span>
                  <span className="text-emerald-400 font-mono">24/7 Operations</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '99%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm rounded-full shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                Work With AL Khair Graphics
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
