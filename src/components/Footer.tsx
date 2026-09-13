import React from 'react';
import { 
  Layers, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  ArrowUp, 
  Lock,
  Heart,
  Facebook,
  Instagram,
  Network,
  FileCode
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BusinessSettings } from '../types';

interface FooterProps {
  settings: BusinessSettings;
  onOpenQuote: () => void;
  onOpenAdmin: () => void;
  onOpenSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  settings, 
  onOpenQuote, 
  onOpenAdmin,
  onOpenSitemap 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rawWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${rawWhatsapp}?text=${encodeURIComponent('Assalam-o-Alaikum, I would like to inquire about design and printing services at AL Khair Graphics.')}`;

  const servicesList = [
    'Graphic Designing',
    'Flex & Banner Printing',
    'Billboard Advertising',
    'Poster & Flyer Design',
    'Logo & Visual Identity',
    'Business Cards',
    'Wallpaper Designs',
    'Social Media Graphics',
    'Sign Board Manufacturing'
  ];

  return (
    <footer id="main-footer" className="bg-neutral-950 text-neutral-300 border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-bold shadow-md shadow-amber-500/20">
                <Layers className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-display text-2xl font-extrabold text-white tracking-tight">
                AL Khair <span className="text-amber-400 font-normal">Graphics</span>
              </span>
            </div>
            
            <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              {settings.category}
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Professional graphic design studio, wide-format flex printing, and outdoor billboard advertising partner based in Dera Ismail Khan, KPK.
            </p>

            {/* Official Social Media Logos */}
            <div className="pt-2 flex items-center gap-3">
              {/* Facebook Logo */}
              <a
                href="https://www.facebook.com/alkhair.graphics.1/"
                target="_blank"
                rel="noopener noreferrer"
                title="AL Khair Graphics Facebook"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#1877F2] text-neutral-400 hover:text-white hover:bg-[#1877F2] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </a>

              {/* Instagram Logo */}
              <a
                href="https://www.instagram.com/alkhair_printing_press/"
                target="_blank"
                rel="noopener noreferrer"
                title="AL Khair Graphics Instagram"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-pink-500 text-neutral-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* WhatsApp Logo */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="AL Khair Graphics WhatsApp"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#25D366] text-neutral-400 hover:text-white hover:bg-[#25D366] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" size={20} />
              </a>

              {/* Call / Phone Logo */}
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                title={`Call Studio: ${settings.phone}`}
                aria-label={`Call ${settings.phone}`}
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-neutral-400 hover:text-neutral-950 hover:bg-amber-400 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPEN 24 HOURS IN D.I. KHAN</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-amber-400 transition-colors">Portfolio</a>
              </li>
              <li>
                <a href="#wallpapers" className="hover:text-amber-400 transition-colors">Wallpaper Collection</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">Client Reviews</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
              </li>
              {onOpenSitemap && (
                <li>
                  <button 
                    onClick={onOpenSitemap}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer text-amber-400/90 font-medium"
                  >
                    <Network className="w-3.5 h-3.5 text-amber-400" />
                    <span>Site Map</span>
                  </button>
                </li>
              )}
              <li>
                <button 
                  onClick={onOpenQuote}
                  className="text-amber-400 font-semibold hover:underline flex items-center gap-1 mt-1 text-left"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Quote</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Creative Services
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              {servicesList.map((srv) => (
                <li key={srv} className="hover:text-white transition-colors">
                  {srv}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Local SEO (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Visit Studio
            </h4>
            
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-xs leading-relaxed text-neutral-300">
                  {settings.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a 
                  href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-white hover:text-amber-400 transition-colors"
                >
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-semibold text-xs">
                  Open 24 Hours, 7 Days a Week
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" size={16} />
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {settings.whatsappNumber}
                </a>
              </div>
            </div>

            {/* Local SEO badge */}
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed mt-3">
              Serving commercial clients, retailers, schools, clinics, and organizations across Dera Ismail Khan, Tank, Kulachi, and South Khyber Pakhtunkhwa.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} {settings.name}. All rights reserved. Registered Graphic Design &amp; Printing Agency in D.I. Khan, Pakistan.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {onOpenSitemap && (
              <button
                onClick={onOpenSitemap}
                className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <Network className="w-3.5 h-3.5 text-amber-400" />
                <span>Site Map</span>
              </button>
            )}

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>sitemap.xml</span>
            </a>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-colors"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
