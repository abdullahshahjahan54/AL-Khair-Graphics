import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Filter, ArrowUpRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioGalleryProps {
  portfolio: PortfolioItem[];
  onOpenLightbox: (item: { title: string; category: string; image: string; description?: string }) => void;
}

const CATEGORIES = [
  'All Projects',
  'Graphic Design',
  'Flex & Banners',
  'Billboards',
  'Wallpapers',
  'Branding',
  'Posters & Flyers',
  'Sign Boards'
];

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ 
  portfolio, 
  onOpenLightbox 
}) => {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  // Helper to match category according to sitemap
  const matchesCategory = (itemCategory: string, selectedCat: string) => {
    if (selectedCat === 'All Projects' || selectedCat === 'All') return true;
    const catLow = itemCategory.toLowerCase();
    const selLow = selectedCat.toLowerCase();
    
    if (selLow === 'flex & banners' || selLow === 'banners') {
      return catLow.includes('flex') || catLow.includes('banner') || catLow.includes('panaflex');
    }
    if (selLow === 'wallpapers' || selLow === 'wallpaper designs') {
      return catLow.includes('wallpaper') || catLow.includes('mural');
    }
    if (selLow === 'billboards') {
      return catLow.includes('billboard') || catLow.includes('outdoor');
    }
    if (selLow === 'branding') {
      return catLow.includes('brand') || catLow.includes('logo') || catLow.includes('identity');
    }
    if (selLow === 'posters & flyers' || selLow === 'posters') {
      return catLow.includes('poster') || catLow.includes('flyer');
    }
    if (selLow === 'sign boards') {
      return catLow.includes('sign') || catLow.includes('acrylic') || catLow.includes('board');
    }
    if (selLow === 'graphic design') {
      return catLow.includes('graphic') || catLow.includes('design') || catLow.includes('vector') || catLow.includes('social');
    }
    return catLow === selLow || catLow.includes(selLow);
  };

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    const published = portfolio.filter(p => p.published);
    if (activeCategory === 'All Projects' || activeCategory === 'All') return published;
    return published.filter(p => matchesCategory(p.category, activeCategory));
  }, [portfolio, activeCategory]);

  // Counts for each category
  const categoryCounts = useMemo(() => {
    const published = portfolio.filter(p => p.published);
    const counts: Record<string, number> = { 'All Projects': published.length };
    CATEGORIES.forEach(cat => {
      if (cat !== 'All Projects') {
        counts[cat] = published.filter(p => matchesCategory(p.category, cat)).length;
      }
    });
    return counts;
  }, [portfolio]);

  return (
    <section id="portfolio" className="py-24 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Portfolio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Work Gallery
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Explore large-format flex printing, creative branding, commercial billboards and decorative wallpaper installations.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 gap-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                <span>{cat}</span>
                {count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-neutral-950 text-amber-400' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Masonry / Responsive Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => onOpenLightbox({
                  title: item.title,
                  category: item.category,
                  image: item.image,
                  description: item.description
                })}
                className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/80 cursor-pointer aspect-[4/3] sm:aspect-[4/3.5] shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-neutral-950/80 text-amber-400 backdrop-blur-md border border-neutral-700/80">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Details (Title, Description, Zoom Eye) */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex items-end justify-between gap-4">
                  <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-neutral-300 line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-lg">No creative work currently listed in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
