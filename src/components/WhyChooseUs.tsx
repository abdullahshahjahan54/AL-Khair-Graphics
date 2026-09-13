import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Palette, 
  Printer, 
  Sliders, 
  Zap, 
  Megaphone, 
  HeartHandshake, 
  Clock, 
  MapPin 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Creative & Professional Designs',
      description: 'Strategic visual concepts crafted to elevate your business above competitors.',
      icon: Palette
    },
    {
      title: 'Quality Printing',
      description: 'High-DPI pigment, UV-resistant inks, and durable commercial-grade materials.',
      icon: Printer
    },
    {
      title: 'Custom Solutions',
      description: 'Flexible sizing, bespoke finishes, and personalized creative specifications.',
      icon: Sliders
    },
    {
      title: 'Fast Service',
      description: 'Rapid turnaround times on urgent flex banners, event posters, and business cards.',
      icon: Zap
    },
    {
      title: 'Advertising Expertise',
      description: 'Insights into large-format billboard placement and high-visibility road graphics.',
      icon: Megaphone
    },
    {
      title: 'Customer Focused',
      description: 'Responsive communication, collaborative design proofs, and dedicated support.',
      icon: HeartHandshake
    },
    {
      title: '24-Hour Availability',
      description: 'Open 24 Hours to support your time-sensitive production deadlines and emergencies.',
      icon: Clock
    },
    {
      title: 'Local D.I. Khan Service',
      description: 'Conveniently situated opposite Hamza I.T Market on East Circular Road.',
      icon: MapPin
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-neutral-900/40 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Advantage</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why Choose AL Khair Graphics?
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Delivering creative distinction and printing reliability to businesses and organizations across Dera Ismail Khan.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="p-7 rounded-2xl bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800/90 hover:border-amber-500/40 shadow-md hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 space-y-4 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-800 group-hover:bg-amber-400 text-amber-400 group-hover:text-neutral-950 flex items-center justify-center transition-all duration-300 shadow-sm">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
