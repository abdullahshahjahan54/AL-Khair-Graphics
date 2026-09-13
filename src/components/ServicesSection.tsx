import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Printer, 
  Tv, 
  FileText, 
  Sparkles, 
  CreditCard, 
  Image, 
  Share2, 
  Signpost, 
  Layers, 
  Megaphone, 
  PenTool, 
  ArrowUpRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceForQuote: (serviceName: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Palette,
  Printer,
  Tv,
  FileText,
  Sparkles,
  CreditCard,
  Image,
  Share2,
  Signpost,
  Layers,
  Megaphone,
  PenTool
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  services, 
  onSelectServiceForQuote 
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter only published services
  const displayServices = services.filter(s => s.published);

  const categories = [
    { id: 'all', label: 'All Solutions' },
    { id: 'signage', label: 'Panaflex & Outdoor' },
    { id: 'stationery', label: 'Corporate Printing' },
    { id: 'gifts', label: 'Gifts & Apparel' },
    { id: 'digital', label: 'Design & Wallpaper' },
  ];

  const filteredServices = displayServices.filter(s => {
    if (activeCategory === 'all') return true;
    const name = s.name.toLowerCase();
    const desc = s.description.toLowerCase();
    if (activeCategory === 'signage') {
      return name.includes('flex') || name.includes('billboard') || name.includes('sign') || desc.includes('outdoor') || desc.includes('flex');
    }
    if (activeCategory === 'stationery') {
      return name.includes('card') || name.includes('stationery') || name.includes('brochure') || name.includes('flyer') || name.includes('poster');
    }
    if (activeCategory === 'gifts') {
      return name.includes('gift') || name.includes('t-shirt') || name.includes('mug') || name.includes('cap') || name.includes('award') || desc.includes('brand');
    }
    if (activeCategory === 'digital') {
      return name.includes('wallpaper') || name.includes('social') || name.includes('logo') || name.includes('graphic') || name.includes('design');
    }
    return true;
  });

  return (
    <section id="services" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-neutral-800/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Printing Your Dreams • Comprehensive Solutions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Creative Services &amp; Products
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            From heavy industrial Panaflex to executive business stationery and custom apparel printing.
          </p>
        </div>

        {/* Animated Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-neutral-950 bg-amber-400 shadow-lg shadow-amber-400/25 font-bold'
                    : 'text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 12 Premium Service Cards Grid with Motion */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Palette;
            return (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedService(service)}
                className="group relative p-8 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900/95 border border-neutral-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-amber-400/70 group-hover:text-amber-400 transition-colors">
                      {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-neutral-800/90 border border-neutral-700/80 group-hover:bg-amber-400 group-hover:border-amber-400 text-neutral-300 group-hover:text-neutral-950 flex items-center justify-center transition-all duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer: Action Arrow */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-amber-400 transition-colors">
                  <span>View Details &amp; Quote</span>
                  <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-amber-400 text-neutral-300 group-hover:text-neutral-950 flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Subtle Amber Top Border Glow */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/0 group-hover:via-amber-400/60 to-transparent transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Interactive Service Details & Quick Quote Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="relative w-full max-w-lg p-7 rounded-3xl bg-neutral-900 border border-neutral-700 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  {React.createElement(iconMap[selectedService.iconName] || Palette, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    SERVICE {selectedService.number}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white">
                    {selectedService.name}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-neutral-300 text-base leading-relaxed">
              {selectedService.description}
            </p>

            {selectedService.features && selectedService.features.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Key Capabilities &amp; Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-neutral-800 flex gap-3">
              <button
                onClick={() => {
                  const sName = selectedService.name;
                  setSelectedService(null);
                  onSelectServiceForQuote(sName);
                }}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl text-center text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                Request Quote for this Service
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="py-3.5 px-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-xl text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
