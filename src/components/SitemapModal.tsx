import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Compass, 
  ChevronRight, 
  Layers, 
  Palette, 
  Printer, 
  Image, 
  Info, 
  Star, 
  Send, 
  Phone, 
  Lock, 
  Eye,
  FileText,
  Tag
} from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (url: string, sectionHash?: string) => void;
}

export const SITEMAP_DATA = [
  {
    id: 'home',
    title: 'Home',
    url: '/',
    description: 'Main landing experience with brand overview, interactive showcase & quick stats',
    icon: Layers,
    sections: [
      { name: 'Header / Navigation', anchor: '#main-navbar' },
      { 
        name: 'Hero Section', 
        anchor: '#hero',
        items: ['Heading', 'Short Description', 'Get a Quote', 'View Our Work']
      },
      { name: 'Trust / Quick Stats', anchor: '#trust' },
      { name: 'Featured Services', anchor: '#services' },
      { name: 'Featured Portfolio', anchor: '#portfolio' },
      { name: 'Why Choose AL Khair Graphics', anchor: '#why-us' },
      { name: 'Our Work Process', anchor: '#process' },
      { name: 'Customer Reviews', anchor: '#reviews' },
      { name: 'Call-to-Action', anchor: '#cta' },
      { name: 'Footer', anchor: '#main-footer' }
    ]
  },
  {
    id: 'services',
    title: 'Services',
    url: '/services',
    description: '11 comprehensive commercial design, wide-format printing & billboard advertising services',
    icon: Palette,
    itemsTitle: 'Services Catalog',
    items: [
      'Graphic Designing',
      'Flex & Banner Printing',
      'Billboard Advertising',
      'Poster & Flyer Design',
      'Logo & Branding',
      'Business Cards',
      'Wallpaper Designs',
      'Social Media Designs',
      'Sign Board Design',
      'Printing Services',
      'Custom Design Solutions'
    ]
  },
  {
    id: 'our-work',
    title: 'Our Work',
    url: '/our-work',
    description: 'Categorized commercial portfolio of executed design & print projects',
    icon: FileText,
    itemsTitle: 'Portfolio Categories',
    items: [
      'All Projects',
      'Graphic Design',
      'Flex & Banners',
      'Billboards',
      'Wallpapers',
      'Branding',
      'Posters & Flyers',
      'Sign Boards'
    ]
  },
  {
    id: 'gallery',
    title: 'Gallery',
    url: '/gallery',
    description: 'High-DPI visual showcase of luxury wallpapers, exhibition banners, posters & signage',
    icon: Image,
    itemsTitle: 'Gallery Collections',
    items: [
      'Banner Designs',
      'Wallpaper Designs',
      'Printing Work',
      'Advertising Work',
      'Design Showcase'
    ]
  },
  {
    id: 'about',
    title: 'About Us',
    url: '/about',
    description: 'Heritage, core values, mission, vision and production quality standards in D.I. Khan',
    icon: Info,
    sections: [
      { name: 'About AL Khair Graphics', anchor: '#about' },
      { name: 'Our Story', anchor: '#about' },
      { name: 'Our Mission', anchor: '#about' },
      { name: 'Our Vision', anchor: '#about' },
      { name: 'Why Clients Choose Us', anchor: '#why-us' },
      { name: 'Quality & Professionalism', anchor: '#about' }
    ]
  },
  {
    id: 'reviews',
    title: 'Reviews',
    url: '/reviews',
    description: 'Authentic 5-star customer testimonials and verified feedback from local clients',
    icon: Star,
    sections: [
      { name: 'Customer Reviews', anchor: '#reviews' },
      { name: 'Client Feedback', anchor: '#reviews' },
      { name: 'Google Reviews CTA', anchor: '#reviews' }
    ]
  },
  {
    id: 'quote',
    title: 'Get a Quote',
    url: '/get-a-quote',
    description: 'Direct inquiry form with file reference upload for instant pricing estimation',
    icon: Send,
    itemsTitle: 'Form Fields',
    items: [
      'Name',
      'Phone',
      'Service Selection',
      'Project Details',
      'Upload Design / Reference',
      'Submit Request'
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    url: '/contact',
    description: 'Studio location, 24/7 hotline, direct WhatsApp link and message form',
    icon: Phone,
    sections: [
      { name: 'Business Information', anchor: '#contact' },
      { name: 'Google Maps (Liaquat Park, D.I. Khan)', anchor: '#contact' },
      { name: 'Call (Direct Phone)', anchor: '#contact' },
      { name: 'WhatsApp (Instant Chat)', anchor: '#contact' },
      { name: 'Contact Form', anchor: '#contact' }
    ]
  },
  {
    id: 'admin',
    title: 'Admin Panel',
    url: '/admin',
    description: 'Protected back-office management console for services, portfolio, gallery, reviews & orders',
    icon: Lock,
    sections: [
      { name: 'Dashboard' },
      { name: 'Services Management' },
      { name: 'Portfolio Management' },
      { name: 'Gallery Management' },
      { name: 'Reviews Management' },
      { name: 'Quote Requests' },
      { name: 'Contact Messages' },
      { name: 'Business Settings' }
    ]
  }
];

const RAW_XML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemap>
  <website>
    <name>AL Khair Graphics</name>
    <description>Professional graphic design, printing and advertising website</description>

    <page id="home" title="Home" url="/">
      <section title="Header / Navigation"/>
      <section title="Hero Section">
        <item>Heading</item>
        <item>Short Description</item>
        <item>Get a Quote</item>
        <item>View Our Work</item>
      </section>
      <section title="Trust / Quick Stats"/>
      <section title="Featured Services"/>
      <section title="Featured Portfolio"/>
      <section title="Why Choose AL Khair Graphics"/>
      <section title="Our Work Process"/>
      <section title="Customer Reviews"/>
      <section title="Call-to-Action"/>
      <section title="Footer"/>
    </page>

    <page id="services" title="Services" url="/services">
      <service>Graphic Designing</service>
      <service>Flex &amp; Banner Printing</service>
      <service>Billboard Advertising</service>
      <service>Poster &amp; Flyer Design</service>
      <service>Logo &amp; Branding</service>
      <service>Business Cards</service>
      <service>Wallpaper Designs</service>
      <service>Social Media Designs</service>
      <service>Sign Board Design</service>
      <service>Printing Services</service>
      <service>Custom Design Solutions</service>
    </page>

    <page id="our-work" title="Our Work" url="/our-work">
      <category>All Projects</category>
      <category>Graphic Design</category>
      <category>Flex &amp; Banners</category>
      <category>Billboards</category>
      <category>Wallpapers</category>
      <category>Branding</category>
      <category>Posters &amp; Flyers</category>
      <category>Sign Boards</category>
    </page>

    <page id="gallery" title="Gallery" url="/gallery">
      <category>Banner Designs</category>
      <category>Wallpaper Designs</category>
      <category>Printing Work</category>
      <category>Advertising Work</category>
      <category>Design Showcase</category>
    </page>

    <page id="about" title="About Us" url="/about">
      <section title="About AL Khair Graphics"/>
      <section title="Our Story"/>
      <section title="Our Mission"/>
      <section title="Our Vision"/>
      <section title="Why Clients Choose Us"/>
      <section title="Quality &amp; Professionalism"/>
    </page>

    <page id="reviews" title="Reviews" url="/reviews">
      <section title="Customer Reviews"/>
      <section title="Client Feedback"/>
      <section title="Google Reviews CTA"/>
    </page>

    <page id="quote" title="Get a Quote" url="/get-a-quote">
      <field>Name</field>
      <field>Phone</field>
      <field>Service</field>
      <field>Project Details</field>
      <field>Upload Design / Reference</field>
      <field>Submit Request</field>
    </page>

    <page id="contact" title="Contact" url="/contact">
      <section title="Business Information"/>
      <section title="Google Maps"/>
      <section title="Call"/>
      <section title="WhatsApp"/>
      <section title="Contact Form"/>
    </page>

    <page id="admin" title="Admin Panel" url="/admin">
      <section title="Dashboard"/>
      <section title="Services Management"/>
      <section title="Portfolio Management"/>
      <section title="Gallery Management"/>
      <section title="Reviews Management"/>
      <section title="Quote Requests"/>
      <section title="Contact Messages"/>
      <section title="Business Settings"/>
    </page>

    <design>
      <style>Modern, Premium, Creative, Local Business, Portfolio-focused</style>
      <animation>Subtle and performance-friendly</animation>
      <responsive>Mobile, Tablet and Desktop</responsive>
    </design>
  </website>
</sitemap>`;

export const SitemapModal: React.FC<SitemapModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigateTo 
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'xml'>('visual');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyXML = () => {
    navigator.clipboard.writeText(RAW_XML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadXML = () => {
    const blob = new Blob([RAW_XML], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10"
      >
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Network className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  Website Architecture &amp; Site Map
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[11px] font-mono font-bold">
                  sitemap.xml
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                AL Khair Graphics • Complete hierarchical structure &amp; page routes
              </p>
            </div>
          </div>

          {/* Tab Switcher & Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-800/80 p-1 rounded-xl border border-neutral-700/60">
              <button
                onClick={() => setActiveTab('visual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'visual'
                    ? 'bg-amber-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Visual Tree</span>
              </button>
              <button
                onClick={() => setActiveTab('xml')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'xml'
                    ? 'bg-amber-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>XML Code</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'visual' ? (
            <div className="space-y-6">
              {/* Site Info Banner */}
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span>Website: AL Khair Graphics</span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-amber-400 font-mono text-xs">9 Structured Pages</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Professional graphic design, printing and advertising website with responsive mobile, tablet and desktop layout.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>View /sitemap.xml</span>
                  </a>
                </div>
              </div>

              {/* Grid of Pages from Sitemap */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SITEMAP_DATA.map((page) => {
                  const Icon = page.icon;
                  return (
                    <div
                      key={page.id}
                      className="p-5 rounded-2xl bg-neutral-950/50 border border-neutral-800/80 hover:border-amber-500/40 hover:bg-neutral-950/80 transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div className="space-y-3.5">
                        {/* Title & Route */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-neutral-800 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                                {page.title}
                              </h4>
                              <span className="text-[11px] font-mono text-amber-400/80">
                                {page.url}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              onNavigateTo(page.url);
                              onClose();
                            }}
                            className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-amber-400 hover:text-neutral-950 text-neutral-400 transition-colors cursor-pointer"
                            title={`Jump to ${page.title}`}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {page.description}
                        </p>

                        {/* Sections List */}
                        {page.sections && (
                          <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                              Sections &amp; Components:
                            </p>
                            <div className="space-y-1">
                              {page.sections.map((sec, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => {
                                    onNavigateTo(page.url, sec.anchor);
                                    onClose();
                                  }}
                                  className="text-xs text-neutral-300 hover:text-amber-400 flex items-center justify-between py-0.5 px-1.5 rounded hover:bg-neutral-800/50 cursor-pointer transition-colors"
                                >
                                  <span className="truncate">{sec.name}</span>
                                  {sec.anchor && (
                                    <span className="text-[10px] font-mono text-neutral-500">
                                      {sec.anchor}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Items List (Services, Categories, Form fields) */}
                        {page.items && (
                          <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                              {page.itemsTitle || 'Items'}:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {page.items.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded-md bg-neutral-800/80 border border-neutral-700/60 text-[11px] text-neutral-300"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Jump CTA */}
                      <button
                        onClick={() => {
                          onNavigateTo(page.url);
                          onClose();
                        }}
                        className="mt-4 w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Open Page</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-neutral-950/80 p-3 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  <span>Exact XML Sitemap format matching specifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyXML}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy XML</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadXML}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download XML</span>
                  </button>
                </div>
              </div>

              {/* Code Pre */}
              <pre className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed max-h-[500px]">
                {RAW_XML}
              </pre>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>XML Sitemap active &amp; accessible at <code className="text-amber-400 font-mono">/sitemap.xml</code></span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="/robots.txt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors underline"
            >
              /robots.txt
            </a>
            <span className="text-neutral-600">•</span>
            <a 
              href="/sitemap.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
