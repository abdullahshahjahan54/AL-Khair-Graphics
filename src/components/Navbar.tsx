import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Sparkles, 
  Menu, 
  X, 
  ArrowUpRight, 
  Clock, 
  Lock, 
  Layers,
  Network
} from 'lucide-react';
import { BusinessSettings } from '../types';

interface NavbarProps {
  settings: BusinessSettings;
  onOpenQuote: (prefillService?: string) => void;
  onOpenAdmin: () => void;
  onOpenSitemap?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenQuote, onOpenAdmin, onOpenSitemap }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Wallpapers & Posters', href: '#wallpapers' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-800/80 shadow-2xl py-3.5' 
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
            id="nav-logo-link"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white block leading-tight">
                AL Khair <span className="text-amber-400 font-normal">Graphics</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
                Design • Print • Advertising
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-md">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/70 rounded-full transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone Call Button */}
            <a
              id="navbar-call-btn"
              href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-full border border-neutral-800 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.phone}</span>
            </a>

            {/* Primary Get a Quote CTA */}
            <button
              id="navbar-quote-btn"
              onClick={() => onOpenQuote()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-95 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 fill-neutral-950" />
              <span>Get a Quote</span>
            </button>

            {/* Site Map Architecture Button */}
            {onOpenSitemap && (
              <button
                id="nav-sitemap-btn"
                onClick={onOpenSitemap}
                title="View Website Site Map (sitemap.xml)"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 flex items-center justify-center border border-neutral-800 transition-colors cursor-pointer"
              >
                <Network className="w-4 h-4" />
              </button>
            )}

            {/* Admin Access Portal Icon Button */}
            <button
              id="nav-admin-portal-btn"
              onClick={onOpenAdmin}
              title="Admin Portal"
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 flex items-center justify-center border border-neutral-800 transition-colors"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            {onOpenSitemap && (
              <button
                id="nav-mobile-sitemap-btn"
                onClick={onOpenSitemap}
                title="Site Map"
                className="w-9 h-9 rounded-full bg-neutral-900 text-neutral-400 hover:text-amber-400 flex items-center justify-center border border-neutral-800"
              >
                <Network className="w-4 h-4" />
              </button>
            )}
            <button
              id="nav-mobile-admin-btn"
              onClick={onOpenAdmin}
              title="Admin Portal"
              className="w-9 h-9 rounded-full bg-neutral-900 text-neutral-400 hover:text-amber-400 flex items-center justify-center border border-neutral-800"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[70px] bg-neutral-950/95 backdrop-blur-2xl border-b border-neutral-800 px-6 py-6 shadow-2xl transition-all"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold px-3 py-1 bg-amber-400/10 rounded-lg w-fit mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>OPEN 24 HOURS IN D.I. KHAN</span>
            </div>

            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-3 text-base font-semibold text-neutral-200 hover:text-amber-400 hover:bg-neutral-900 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-neutral-800/80 flex flex-col gap-3">
              <a
                id="mobile-call-link"
                href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl border border-neutral-800 font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Now: {settings.phone}</span>
              </a>

              <button
                id="mobile-quote-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-sm"
              >
                <Sparkles className="w-4 h-4 fill-neutral-950" />
                <span>Get a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
