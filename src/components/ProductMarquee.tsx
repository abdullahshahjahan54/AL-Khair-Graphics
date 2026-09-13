import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Printer, 
  Palette, 
  Shirt, 
  CreditCard, 
  Coffee, 
  FileText, 
  Stamp, 
  Award, 
  Calendar, 
  Gift 
} from 'lucide-react';

interface ProductMarqueeProps {
  onSelectProduct: (productName: string) => void;
}

export const ProductMarquee: React.FC<ProductMarqueeProps> = ({ onSelectProduct }) => {
  const products = [
    { name: 'T-Shirts Printing', desc: 'Sublimation & Screen Printing', icon: Shirt, badge: 'Popular' },
    { name: 'PVC Cards & Lanyards', desc: 'Smart ID & Employee Cards', icon: CreditCard, badge: 'High Demand' },
    { name: 'Panaflex & Billboards', desc: 'Heavy Duty Solvent Printing', icon: Printer, badge: '24/7' },
    { name: 'Custom Mugs Printing', desc: 'Ceramic & Magic Color Mugs', icon: Coffee, badge: 'Gifting' },
    { name: 'Brochures & Flyers', desc: 'Gloss & Matte Art Paper', icon: FileText, badge: 'Bulk' },
    { name: 'Official Rubber Stamps', desc: 'Self-Inking & Wooden Seals', icon: Stamp, badge: 'Instant' },
    { name: 'Visiting Cards', desc: 'Velvet UV & Embossed Metallic', icon: Layers, badge: 'Premium' },
    { name: 'Shields & Awards', desc: 'Acrylic & Gold Engraved Trophies', icon: Award, badge: 'Corporate' },
    { name: 'Executive Calendars', desc: 'Desk, Wall & Pocket Planners', icon: Calendar, badge: 'Annual' },
    { name: 'Customized Gifts', desc: 'Pens, USBs, Keychains & Boxes', icon: Gift, badge: 'Custom' },
  ];

  const duplicated = [...products, ...products];

  return (
    <div className="py-14 bg-neutral-950 border-t border-neutral-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Commercial Products Line</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Printing &amp; Branding <span className="text-amber-400">Products</span>
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Custom merchandise, apparel, stationery and large-format commercial media.
            </p>
          </div>
          <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Fast Turnaround • Wholesale Rates</span>
          </div>
        </div>
      </div>

      {/* Infinite Product Stream */}
      <div className="relative flex overflow-x-hidden mask-fade">
        <div className="animate-marquee-reverse flex items-center gap-5 py-3">
          {duplicated.map((prod, idx) => {
            const Icon = prod.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectProduct(prod.name)}
                className="group relative w-64 sm:w-72 p-5 rounded-2xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-400/60 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 shrink-0 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-neutral-800 group-hover:bg-amber-400 text-amber-400 group-hover:text-neutral-950 flex items-center justify-center transition-all duration-300 shadow-inner">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors">
                      {prod.badge}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    {prod.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-amber-400 transition-colors">
                  <span>Order / Sample</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
