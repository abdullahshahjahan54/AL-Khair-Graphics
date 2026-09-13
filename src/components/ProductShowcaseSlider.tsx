import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight, 
  ShoppingBag, 
  Check, 
  Clock, 
  Tag
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BusinessSettings } from '../types';

interface ProductShowcaseSliderProps {
  settings: BusinessSettings;
  onOpenQuote: (productName?: string) => void;
}

interface ProductItem {
  id: string;
  title: string;
  category: 'Apparel' | 'Panaflex' | 'Corporate' | 'Stationery' | 'Gifts';
  tag: string;
  badge: string;
  description: string;
  turnaround: string;
  icon: string;
  sampleSpecs: string[];
}

export const ProductShowcaseSlider: React.FC<ProductShowcaseSliderProps> = ({ 
  settings, 
  onOpenQuote 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Exact 20 signature printing products inspired by gsenterprises.com.pk
  const products: ProductItem[] = [
    {
      id: 'p1',
      title: 'T-Shirts Printing',
      category: 'Apparel',
      tag: 'Best Seller',
      badge: 'DTF / Screen / Vinyl',
      description: 'Custom corporate, event, and promotional round-neck and polo T-shirts with vibrant washable inks.',
      turnaround: '24-48 Hours',
      icon: '👕',
      sampleSpecs: ['100% Combed Cotton', 'No Minimum Order', 'Full Color DTF Print']
    },
    {
      id: 'p2',
      title: 'Panaflex & Billboards',
      category: 'Panaflex',
      tag: 'Heavy Duty',
      badge: 'Frontlit / Backlit / Star',
      description: 'Wide-format high-resolution outdoor hoardings, shop boards, and political campaign flex.',
      turnaround: 'Same Day Delivery',
      icon: '🏙️',
      sampleSpecs: ['Weatherproof UV Coating', 'Heavy GSM Media', 'High-DPI Seiko Heads']
    },
    {
      id: 'p3',
      title: 'PVC Cards & Lanyards',
      category: 'Corporate',
      tag: 'Security ID',
      badge: 'Thermal & Inkjet',
      description: 'Student IDs, employee cards, visitor passes, and custom branded satin ribbon lanyards.',
      turnaround: '24 Hours',
      icon: '🪪',
      sampleSpecs: ['CR80 Standard Size', 'RFID / Barcode / Magnetic', 'Dual Side Gloss / Matte']
    },
    {
      id: 'p4',
      title: 'Mugs Printing',
      category: 'Gifts',
      tag: 'Custom Gifts',
      badge: 'Ceramic Sublimation',
      description: 'Photo mugs, magic color-changing mugs, metallic finish mugs for corporate and family gifts.',
      turnaround: '2-4 Hours',
      icon: '☕',
      sampleSpecs: ['11oz AAA Grade Ceramic', 'Microwave & Dishwasher Safe', 'HD Photo Reproduction']
    },
    {
      id: 'p5',
      title: 'Visiting & Business Cards',
      category: 'Stationery',
      tag: 'Executive',
      badge: 'Spot UV & Velvet Matt',
      description: 'Luxury visiting cards with embossed foil, rounded corners, textured linen, and metallic edges.',
      turnaround: '24 Hours',
      icon: '💳',
      sampleSpecs: ['350gsm Art Card', 'Gold / Silver Stamping', 'Velvet Soft-Touch Finish']
    },
    {
      id: 'p6',
      title: 'Brochures & Flyers',
      category: 'Stationery',
      tag: 'Marketing',
      badge: 'Tri-fold / Bi-fold',
      description: 'Commercial sales flyers, medical brochures, restaurant menus, and product catalogs.',
      turnaround: '24-48 Hours',
      icon: '📄',
      sampleSpecs: ['128gsm - 170gsm Gloss', 'Precision Creasing & Fold', 'High-Speed Offset Quality']
    },
    {
      id: 'p7',
      title: 'Official Letterheads',
      category: 'Stationery',
      tag: 'Corporate',
      badge: 'Laser Safe 100gsm',
      description: 'Crisp corporate letterheads for companies, hospitals, clinics, and government contractors.',
      turnaround: '24 Hours',
      icon: '✉️',
      sampleSpecs: ['Imported Executive Paper', 'Color Matching Guarantee', 'Compatible with all Printers']
    },
    {
      id: 'p8',
      title: 'Self-Inking Rubber Stamps',
      category: 'Stationery',
      tag: 'Official',
      badge: 'Shiny / Trodat Type',
      description: 'Instant flash stamps, date stamps, pocket stamps, and embossed company seal presses.',
      turnaround: '1 Hour Express',
      icon: '🖋️',
      sampleSpecs: ['Sharp Micro Laser Engraved', '10,000+ Impressions', 'Blue, Black, Red & Green']
    },
    {
      id: 'p9',
      title: 'Royal Wedding Cards',
      category: 'Stationery',
      tag: 'Ceremony',
      badge: 'Laser Cut & Metallic',
      description: 'Grand Pakistani wedding invitations with gold foiling, velvet pouching, and acrylic inserts.',
      turnaround: '3-5 Days',
      icon: '💌',
      sampleSpecs: ['Laser Cut Envelopes', 'Traditional & Modern Calligraphy', 'Custom RSVP Inserts']
    },
    {
      id: 'p10',
      title: 'Custom Keychains',
      category: 'Gifts',
      tag: 'Promotional',
      badge: 'Metal & Acrylic',
      description: 'Engraved metal keyrings, acrylic cutouts, and leather stitched corporate branded key fobs.',
      turnaround: '2-3 Days',
      icon: '🔑',
      sampleSpecs: ['Double-Sided Crystal Coat', 'Custom Laser Shape Cutting', 'Bulk Branding Discount']
    },
    {
      id: 'p11',
      title: 'Corporate File Covers',
      category: 'Corporate',
      tag: 'Office',
      badge: 'Laminated Presentation',
      description: 'Heavy art card presentation folders with business card slots and document pockets.',
      turnaround: '2-3 Days',
      icon: '📁',
      sampleSpecs: ['350gsm Cardboard Core', 'Single / Double Pocket', 'Matt Lamination & UV']
    },
    {
      id: 'p12',
      title: 'Product Packaging Boxes',
      category: 'Corporate',
      tag: 'Retail Packaging',
      badge: 'Custom Die-Cut',
      description: 'Custom printed cartons, bakery boxes, cosmetics packaging, and luxury rigid gift boxes.',
      turnaround: '3-6 Days',
      icon: '📦',
      sampleSpecs: ['Food Grade Kraft / Bleached', 'Custom Dimensions & Locks', 'Gold Foil & Window Patching']
    },
    {
      id: 'p13',
      title: 'Wall & Desk Calendars',
      category: 'Stationery',
      tag: 'New Year Special',
      badge: 'Spiral & Tent Binding',
      description: 'Custom corporate 12-month desk calendars and wall hanging poster calendars with your logo.',
      turnaround: '3-4 Days',
      icon: '📅',
      sampleSpecs: ['Wire-O Heavy Spiral', 'Stand Support Base', 'High Gloss Coated Sheets']
    },
    {
      id: 'p14',
      title: 'Caps & Hat Printing',
      category: 'Apparel',
      tag: 'Outdoor Wear',
      badge: 'Embroidery & Print',
      description: 'Branded promotional caps for campaigns, delivery staff, sports events, and corporate uniforms.',
      turnaround: '2-3 Days',
      icon: '🧢',
      sampleSpecs: ['Adjustable Strap Brass Clip', '3D Puff Embroidery Available', 'Breathable Cotton Twill']
    },
    {
      id: 'p15',
      title: 'Executive Engraved Pens',
      category: 'Gifts',
      tag: 'Premium Giveaway',
      badge: 'Laser Engraved Metal',
      description: 'Executive metal ballpoint and rollerball pens etched with company name or recipient name.',
      turnaround: '24 Hours',
      icon: '🖊️',
      sampleSpecs: ['Permanent Laser Etching', 'Smooth German Ball Refill', 'Individual Gift Box Option']
    },
    {
      id: 'p16',
      title: 'Awards & Crystal Shields',
      category: 'Gifts',
      tag: 'Recognition',
      badge: 'Wood, Acrylic & Crystal',
      description: 'Honorary shields, annual awards, sports trophies, and engraved wooden plaques for events.',
      turnaround: '24-48 Hours',
      icon: '🏆',
      sampleSpecs: ['Optical Crystal & Solid Teak', 'Full Color Sublimation Plate', 'Velvet Lined Presentation Box']
    },
    {
      id: 'p17',
      title: 'Newsletters & Booklets',
      category: 'Corporate',
      tag: 'Publishing',
      badge: 'Saddle Stitch / Perfect Bound',
      description: 'Quarterly reports, NGO magazines, university bulletins, and event schedules.',
      turnaround: '2-4 Days',
      icon: '📰',
      sampleSpecs: ['Multi-Page Color Booklets', 'Center Staple / Perfect Bind', 'Quality Paper Range']
    },
    {
      id: 'p18',
      title: 'Books & School Course Printing',
      category: 'Corporate',
      tag: 'Educational',
      badge: 'Offset High-Volume',
      description: 'Academic notebooks, question banks, course notes, and private publishing with soft/hard covers.',
      turnaround: '3-7 Days',
      icon: '📚',
      sampleSpecs: ['High Opacity 68gsm - 80gsm', 'Thermal Hardcover & Softcover', 'Guaranteed Pagination']
    },
    {
      id: 'p19',
      title: 'Complete Stationery Sets',
      category: 'Stationery',
      tag: 'Corporate Bundle',
      badge: 'Full Suite',
      description: 'All-in-one branding set: Envelopes, writing pads, sticky notes, diary covers, and folder kits.',
      turnaround: '3-5 Days',
      icon: '📎',
      sampleSpecs: ['Matched Corporate Colorway', 'Assorted Envelope Sizes', 'Cost Saving Bundle Discount']
    },
    {
      id: 'p20',
      title: 'Customized Gift Hampers',
      category: 'Gifts',
      tag: 'VIP Luxury',
      badge: 'Curated Box Sets',
      description: 'Exclusive corporate gift sets including branded notebook, thermos flask, USB drive, and metal pen.',
      turnaround: '3-5 Days',
      icon: '🎁',
      sampleSpecs: ['Custom Die-Cut Foam Inset', 'Magnetic Closure Hard Box', 'Gold Hot-Stamped Logo']
    }
  ];

  const categories = ['All', 'Panaflex', 'Corporate', 'Stationery', 'Apparel', 'Gifts'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppOrder = (product: ProductItem) => {
    const rawWa = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum! I want to order/inquire about: *${product.title}* (${product.badge}) from AL Khair Graphics.`
    );
    window.open(`https://wa.me/${rawWa}?text=${msg}`, '_blank');
  };

  return (
    <section id="products-showcase" className="py-20 bg-neutral-950 relative overflow-hidden border-t border-neutral-800/80">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Production Spectrum</span>
            </motion.div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Products &amp; Printing Solutions
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              Swipe through our complete production catalog — from customized promotional gifts and apparel to heavy outdoor Panaflex and corporate stationery.
            </p>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              title="Previous Products"
              aria-label="Previous Products"
              className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-all active:scale-95 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              title="Next Products"
              aria-label="Next Products"
              className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-all active:scale-95 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Horizontal Smooth Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative flex-none w-[300px] sm:w-[340px] snap-start rounded-3xl bg-neutral-900/85 border border-neutral-800 hover:border-amber-500/50 p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
            >
              <div>
                {/* Top Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                    <Tag className="w-3 h-3" />
                    {prod.tag}
                  </span>

                  <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {prod.turnaround}
                  </span>
                </div>

                {/* Main Product Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-800/90 border border-neutral-700 group-hover:border-amber-400 group-hover:bg-amber-400/10 flex items-center justify-center text-3xl shrink-0 transition-all duration-300 shadow-inner group-hover:scale-110">
                    {prod.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs font-medium text-amber-400/90">
                      {prod.badge}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 leading-relaxed mb-5 line-clamp-3">
                  {prod.description}
                </p>

                {/* Specs List */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-neutral-800/60">
                  {prod.sampleSpecs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-[11px] text-neutral-400">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-neutral-800">
                {/* Order via WhatsApp */}
                <button
                  onClick={() => handleWhatsAppOrder(prod)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-emerald-400 hover:text-white border border-[#25D366]/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" size={16} />
                  <span>Order on WA</span>
                </button>

                {/* Quote Button */}
                <button
                  onClick={() => onOpenQuote(prod.title)}
                  className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-amber-400 text-neutral-200 hover:text-neutral-950 font-bold text-xs flex items-center justify-center gap-1 transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <span>Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Top Accent Gradient Shimmer */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-amber-400/0 group-hover:via-amber-400/70 to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
