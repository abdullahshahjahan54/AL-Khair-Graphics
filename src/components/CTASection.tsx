import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Phone, ArrowRight } from 'lucide-react';
import { BusinessSettings } from '../types';

interface CTASectionProps {
  settings: BusinessSettings;
  onOpenQuote: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ settings, onOpenQuote }) => {
  return (
    <section id="cta-section" className="py-24 relative overflow-hidden bg-neutral-950 border-t border-neutral-800">
      
      {/* Visual background gradient accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-0 -left-20 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8"
      >
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Your Project Today • 24/7 Available</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Have a Design, Printing or <br />
          <span className="text-shimmer">Billboard Project?</span>
        </h2>

        <p className="text-neutral-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Let's create something memorable, creative, and impactful for your brand in Dera Ismail Khan and nationwide.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="cta-section-quote-btn"
            onClick={onOpenQuote}
            className="group px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-base rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
          >
            <Sparkles className="w-5 h-5 fill-neutral-950 transition-transform group-hover:rotate-12" />
            <span>Request Fast Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            id="cta-section-call-btn"
            href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
            className="px-8 py-4 bg-neutral-900/90 hover:bg-neutral-800 text-white hover:text-amber-300 font-bold text-base rounded-full border border-neutral-700 shadow-md active:scale-95 transition-all flex items-center gap-2.5 backdrop-blur-md"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Direct Call: {settings.phone}</span>
          </a>
        </div>

      </motion.div>
    </section>
  );
};
