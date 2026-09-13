import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Maximize2, 
  Check, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Layers, 
  ZoomIn, 
  ShieldCheck, 
  Ruler, 
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { GalleryItem, PortfolioItem } from '../types';
import { WALLPAPER_COLLECTION, BANNER_POSTER_ITEMS } from '../data/wallpapersAndBanners';

interface WallpaperShowcaseProps {
  gallery?: GalleryItem[];
  portfolio?: PortfolioItem[];
  onOpenLightbox: (item: { title: string; category: string; image: string; description?: string }) => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const WallpaperShowcase: React.FC<WallpaperShowcaseProps> = ({ 
  gallery = [], 
  portfolio = [],
  onOpenLightbox,
  onOpenQuote
}) => {
  // Main Tab: Wallpapers vs Posters/Banners
  const [activeTab, setActiveTab] = useState<'wallpapers' | 'banners'>('wallpapers');
  
  // Selected Wallpaper category filter
  const [wallpaperFilter, setWallpaperFilter] = useState('All');
  
  // Selected Banner/Poster category filter
  const [bannerFilter, setBannerFilter] = useState('All');

  // Active item index for Hero visualizer
  const [activeWallpaperIndex, setActiveWallpaperIndex] = useState(0);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Combine fetched items with comprehensive fallback items
  const wallpaperItems = useMemo(() => {
    const fromProps = gallery.filter(g => 
      g.category?.toLowerCase() === 'wallpapers' || g.category?.toLowerCase() === 'wallpaper'
    );
    if (fromProps.length >= 10) return fromProps;
    
    // Merge or fallback to full 17 wallpaper collection
    const map = new Map<string, GalleryItem>();
    WALLPAPER_COLLECTION.forEach(item => map.set(item.id, item));
    fromProps.forEach(item => map.set(item.id, item));
    return Array.from(map.values());
  }, [gallery]);

  const bannerPosterItems = useMemo(() => {
    const fromProps = portfolio.filter(p => 
      p.category?.toLowerCase() === 'banners' || 
      p.category?.toLowerCase() === 'posters' ||
      p.category?.toLowerCase() === 'flex printing'
    );
    if (fromProps.length >= 7) return fromProps;

    const map = new Map<string, PortfolioItem>();
    BANNER_POSTER_ITEMS.forEach(item => map.set(item.id, item));
    fromProps.forEach(item => map.set(item.id, item));
    return Array.from(map.values());
  }, [portfolio]);

  // Sub-filtering for wallpapers
  const filteredWallpapers = useMemo(() => {
    if (wallpaperFilter === 'All') return wallpaperItems;
    if (wallpaperFilter === '3D & Murals') {
      return wallpaperItems.filter(w => 
        w.title.toLowerCase().includes('3d') || 
        w.title.toLowerCase().includes('mural') || 
        w.title.toLowerCase().includes('perspective')
      );
    }
    if (wallpaperFilter === 'Botanical & Flora') {
      return wallpaperItems.filter(w => 
        w.title.toLowerCase().includes('botanical') || 
        w.title.toLowerCase().includes('floral') || 
        w.title.toLowerCase().includes('feather') ||
        w.title.toLowerCase().includes('palm')
      );
    }
    if (wallpaperFilter === 'Luxury & Marble') {
      return wallpaperItems.filter(w => 
        w.title.toLowerCase().includes('marble') || 
        w.title.toLowerCase().includes('luxury') || 
        w.title.toLowerCase().includes('damask') ||
        w.title.toLowerCase().includes('emerald')
      );
    }
    if (wallpaperFilter === 'Modern & Minimal') {
      return wallpaperItems.filter(w => 
        w.title.toLowerCase().includes('minimal') || 
        w.title.toLowerCase().includes('scandinavian') || 
        w.title.toLowerCase().includes('fluid') ||
        w.title.toLowerCase().includes('slate')
      );
    }
    return wallpaperItems;
  }, [wallpaperItems, wallpaperFilter]);

  // Sub-filtering for banners/posters
  const filteredBanners = useMemo(() => {
    if (bannerFilter === 'All') return bannerPosterItems;
    if (bannerFilter === 'Banners') {
      return bannerPosterItems.filter(b => b.category.toLowerCase() === 'banners');
    }
    if (bannerFilter === 'Posters') {
      return bannerPosterItems.filter(b => b.category.toLowerCase() === 'posters');
    }
    return bannerPosterItems;
  }, [bannerPosterItems, bannerFilter]);

  // Current active item in Hero visualizer
  const currentWallpaper = wallpaperItems[activeWallpaperIndex] || wallpaperItems[0];
  const currentBanner = bannerPosterItems[activeBannerIndex] || bannerPosterItems[0];

  const handlePrevItem = () => {
    if (activeTab === 'wallpapers') {
      setActiveWallpaperIndex((prev) => (prev - 1 + wallpaperItems.length) % wallpaperItems.length);
    } else {
      setActiveBannerIndex((prev) => (prev - 1 + bannerPosterItems.length) % bannerPosterItems.length);
    }
  };

  const handleNextItem = () => {
    if (activeTab === 'wallpapers') {
      setActiveWallpaperIndex((prev) => (prev + 1) % wallpaperItems.length);
    } else {
      setActiveBannerIndex((prev) => (prev + 1) % bannerPosterItems.length);
    }
  };

  const createWhatsAppLink = (itemTitle: string, itemType: string) => {
    const text = encodeURIComponent(
      `Hello AL Khair Graphics! I am interested in ordering/custom sizing for: "${itemTitle}" (${itemType}). Please share pricing and wall measurement details.`
    );
    return `https://wa.me/92300730083?text=${text}`;
  };

  return (
    <section id="wallpapers" className="py-24 bg-neutral-900/70 relative border-t border-neutral-800 scroll-mt-20">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wallpapers &amp; Posters Gallery</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Bespoke Wallpapers &amp; Posters
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
              Explore our complete collection of 17+ luxury custom wallpapers, 3D room murals, and heavy-duty commercial advertising posters and banners.
            </p>
          </div>

          {/* Tab Switcher: Wallpapers vs Posters & Banners */}
          <div className="flex items-center p-1.5 bg-neutral-950/90 rounded-2xl border border-neutral-800 shadow-xl self-start lg:self-auto">
            <button
              onClick={() => setActiveTab('wallpapers')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'wallpapers'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Wallpapers ({wallpaperItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('banners')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'banners'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Posters &amp; Banners ({bannerPosterItems.length})</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* HERO INTERACTIVE VISUALIZER FOR ACTIVE SELECTION         */}
        {/* ======================================================== */}
        <div className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Main Visual Display Frame */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="relative flex-1 rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-700/80 shadow-2xl min-h-[380px] sm:min-h-[460px] group">
                
                {/* Active Image with smooth crossfade */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab === 'wallpapers' ? currentWallpaper.image : currentBanner.image}
                    src={activeTab === 'wallpapers' ? currentWallpaper.image : currentBanner.image}
                    alt={activeTab === 'wallpapers' ? currentWallpaper.title : currentBanner.title}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </AnimatePresence>

                {/* Dark atmospheric gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/30 to-transparent opacity-85" />

                {/* Top overlay pills & Controls */}
                <div className="absolute top-5 inset-x-5 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-neutral-950 shadow-lg">
                      {activeTab === 'wallpapers' ? 'Interior Wallpaper Mural' : currentBanner.category}
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-neutral-700">
                      {activeTab === 'wallpapers' 
                        ? `${activeWallpaperIndex + 1} / ${wallpaperItems.length}` 
                        : `${activeBannerIndex + 1} / ${bannerPosterItems.length}`}
                    </span>
                  </div>

                  {/* Lightbox Zoom Button */}
                  <button
                    onClick={() => onOpenLightbox({
                      title: activeTab === 'wallpapers' ? currentWallpaper.title : currentBanner.title,
                      category: activeTab === 'wallpapers' ? 'Wallpapers' : currentBanner.category,
                      image: activeTab === 'wallpapers' ? currentWallpaper.image : currentBanner.image,
                      description: activeTab === 'wallpapers' ? currentWallpaper.description : currentBanner.description
                    })}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-700 hover:border-amber-400 text-neutral-200 hover:text-white transition-all shadow-xl text-xs font-bold group/btn"
                    title="Open Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-4 h-4 text-amber-400 group-hover/btn:scale-110 transition-transform" />
                    <span>Fullscreen</span>
                  </button>
                </div>

                {/* Previous & Next Floating Buttons */}
                <button
                  onClick={handlePrevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-950/70 hover:bg-amber-400 text-white hover:text-neutral-950 border border-neutral-700/80 transition-all hover:scale-110 shadow-2xl"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-950/70 hover:bg-amber-400 text-white hover:text-neutral-950 border border-neutral-700/80 transition-all hover:scale-110 shadow-2xl"
                  aria-label="Next item"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Caption & WhatsApp Action */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2 max-w-xl">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                      {activeTab === 'wallpapers' ? 'Custom Wall Covering & Mural' : 'Commercial Advertising & Printing'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white drop-shadow-md">
                      {activeTab === 'wallpapers' ? currentWallpaper.title : currentBanner.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed drop-shadow">
                      {activeTab === 'wallpapers' ? currentWallpaper.description : currentBanner.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                      href={createWhatsAppLink(
                        activeTab === 'wallpapers' ? currentWallpaper.title : currentBanner.title,
                        activeTab === 'wallpapers' ? 'Wallpaper' : currentBanner.category
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onOpenQuote(activeTab === 'wallpapers' ? 'Wallpaper' : currentBanner.category)}
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                    >
                      <span>Get Instant Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Specifications & Quick Info */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="p-7 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-xl space-y-6 flex-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {activeTab === 'wallpapers' ? 'Technical Specifications' : 'Material & Printing Specs'}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    {activeTab === 'wallpapers' ? 'Wall Mural Engineering' : 'Print Finishing Standards'}
                  </h3>
                </div>

                {activeTab === 'wallpapers' ? (
                  <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-300">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Substrate:</strong> Heavyweight 280-320 GSM non-woven textured vinyl.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Sizing:</strong> Custom printed to your exact wall width and height with 0% distortion.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Durability:</strong> Washable, scratch-resistant surface with 10+ year anti-fade UV ink.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Local Installation:</strong> Professional measuring &amp; seamless pasting across D.I. Khan.</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-300">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Panaflex Star Grade:</strong> 340 to 440 GSM reinforced banner fabric for harsh weather.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Printing Technology:</strong> Konica 512i / Roland high-resolution solvent &amp; eco-solvent.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Finishing Options:</strong> Welded hems, brass grommets/eyelets, pole pockets &amp; framing.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span><strong>Turnaround:</strong> Same-day printing &amp; urgent 24/7 delivery available.</span>
                    </li>
                  </ul>
                )}

                {/* Direct Quote Request Box */}
                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <Ruler className="w-4 h-4" />
                    <span>Free Measurement Consultation</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Not sure about dimensions? Send us a WhatsApp photo of your space for free sizing recommendations.
                  </p>
                  <button
                    onClick={() => onOpenQuote(activeTab === 'wallpapers' ? 'Wallpaper' : 'Banners')}
                    className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-white font-bold text-xs rounded-xl border border-neutral-700 transition-colors"
                  >
                    Request Free Measurement &amp; Sample
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE THUMBNAIL RIBBON / QUICK SELECTOR            */}
        {/* ======================================================== */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Click Any Design to Preview in Hero Visualizer</span>
            </h4>
            <span className="text-xs text-neutral-500 font-mono">
              {activeTab === 'wallpapers' ? `${wallpaperItems.length} Designs` : `${bannerPosterItems.length} Designs`}
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
            {activeTab === 'wallpapers' ? (
              wallpaperItems.map((item, idx) => {
                const isSelected = idx === activeWallpaperIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveWallpaperIndex(idx)}
                    className={`group relative shrink-0 w-36 sm:w-44 rounded-2xl overflow-hidden border transition-all text-left ${
                      isSelected 
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-xl shadow-amber-400/10' 
                        : 'border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[4/3] bg-neutral-950 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2.5 bg-neutral-950">
                      <span className="block text-[11px] font-bold text-white truncate">
                        {item.title}
                      </span>
                      <span className="block text-[10px] text-amber-400 font-mono">
                        Design #{idx + 1}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              bannerPosterItems.map((item, idx) => {
                const isSelected = idx === activeBannerIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveBannerIndex(idx)}
                    className={`group relative shrink-0 w-36 sm:w-44 rounded-2xl overflow-hidden border transition-all text-left ${
                      isSelected 
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-xl shadow-amber-400/10' 
                        : 'border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[4/3] bg-neutral-950 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2.5 bg-neutral-950">
                      <span className="block text-[11px] font-bold text-white truncate">
                        {item.title}
                      </span>
                      <span className="block text-[10px] text-amber-400 font-mono">
                        {item.category}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* FULL GRID DISPLAY FOR ALL DESIGNS                        */}
        {/* ======================================================== */}
        <div className="pt-8 border-t border-neutral-800/80">
          
          {/* Sub-Category Filter Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              {activeTab === 'wallpapers' ? 'All Wallpaper Designs' : 'All Banner & Poster Projects'}
            </h3>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              {activeTab === 'wallpapers' ? (
                ['All', '3D & Murals', 'Botanical & Flora', 'Luxury & Marble', 'Modern & Minimal'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setWallpaperFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      wallpaperFilter === filter
                        ? 'bg-amber-400 text-neutral-950 shadow-md'
                        : 'bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {filter}
                  </button>
                ))
              ) : (
                ['All', 'Banners', 'Posters'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setBannerFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      bannerFilter === filter
                        ? 'bg-amber-400 text-neutral-950 shadow-md'
                        : 'bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {filter}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTab === 'wallpapers' ? (
              filteredWallpapers.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800/90 hover:border-amber-400/50 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
                >
                  {/* Thumbnail with overlay buttons */}
                  <div 
                    className="relative aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer"
                    onClick={() => onOpenLightbox({
                      title: item.title,
                      category: 'Wallpapers',
                      image: item.image,
                      description: item.description
                    })}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600 ease-out"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-neutral-700">
                        Design #{index + 1}
                      </span>
                    </div>

                    {/* Quick Lightbox Zoom Button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-neutral-950/80 backdrop-blur-md text-white hover:text-amber-400 border border-neutral-700 shadow-lg">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Click to Preview overlay hint */}
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-neutral-950 bg-amber-400 px-2.5 py-1 rounded-full shadow-md">
                        Click to Expand
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-white text-sm line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          const idx = wallpaperItems.findIndex(w => w.id === item.id);
                          if (idx !== -1) {
                            setActiveWallpaperIndex(idx);
                            window.scrollTo({
                              top: document.getElementById('wallpapers')?.offsetTop || 0,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className="text-xs text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <a
                        href={createWhatsAppLink(item.title, 'Wallpaper')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              filteredBanners.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800/90 hover:border-amber-400/50 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div 
                    className="relative aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer"
                    onClick={() => onOpenLightbox({
                      title: item.title,
                      category: item.category,
                      image: item.image,
                      description: item.description
                    })}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600 ease-out"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-neutral-700">
                        {item.category}
                      </span>
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-neutral-950/80 backdrop-blur-md text-white hover:text-amber-400 border border-neutral-700 shadow-lg">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-white text-sm line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          const idx = bannerPosterItems.findIndex(b => b.id === item.id);
                          if (idx !== -1) {
                            setActiveBannerIndex(idx);
                            window.scrollTo({
                              top: document.getElementById('wallpapers')?.offsetTop || 0,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className="text-xs text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <a
                        href={createWhatsAppLink(item.title, item.category)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
