import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Eye } from 'lucide-react';
import { PortfolioItem } from '../types';

interface FeaturedWorkProps {
  portfolio: PortfolioItem[];
  onOpenLightbox: (item: { title: string; category: string; image: string; description?: string }) => void;
  onExploreAll: () => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ 
  portfolio, 
  onOpenLightbox,
  onExploreAll
}) => {
  // Filter featured items, or fallback to first 5
  const featuredItems = portfolio.filter(p => p.featured && p.published);
  const displayItems = featuredItems.length > 0 ? featuredItems.slice(0, 5) : portfolio.slice(0, 5);

  return (
    <section id="featured-work" className="py-24 bg-neutral-900/40 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agency Showcase</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured Creative Work
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              A glimpse of our latest design and advertising work.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="self-start md:self-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-full border border-neutral-700 text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <span>View Full Portfolio</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Asymmetric Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {displayItems.map((item, index) => {
            // Asymmetric layout span
            const isHeroCard = index === 0;
            const colSpan = isHeroCard ? 'md:col-span-8 md:row-span-2' : index === 1 ? 'md:col-span-4' : index === 2 ? 'md:col-span-4' : 'md:col-span-6';
            const heightClass = isHeroCard ? 'h-[440px] md:h-[580px]' : 'h-72 sm:h-80 md:h-[275px]';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => onOpenLightbox({
                  title: item.title,
                  category: item.category,
                  image: item.image,
                  description: item.description
                })}
                className={`group relative rounded-3xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 bg-neutral-900 cursor-pointer ${colSpan} ${heightClass} shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500`}
              >
                {/* Background Image with hover zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Category Badge */}
                <div className="absolute top-5 left-5 z-20">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-neutral-700/80 shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Content with upward slide & arrow */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex items-end justify-between gap-4">
                  <div className="space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* View Button */}
                  <div className="w-11 h-11 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 shadow-lg shadow-amber-500/20 transition-all duration-300">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Glowing border highlight */}
                <div className="absolute inset-0 rounded-3xl border-2 border-amber-400/0 group-hover:border-amber-400/40 pointer-events-none transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
