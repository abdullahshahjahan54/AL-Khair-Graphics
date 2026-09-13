import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { BrandMarquee } from './components/BrandMarquee';
import { ServicesSection } from './components/ServicesSection';
import { ProductShowcaseSlider } from './components/ProductShowcaseSlider';
import { ProductMarquee } from './components/ProductMarquee';
import { RecentOrderNotification } from './components/RecentOrderNotification';
import { FeaturedWork } from './components/FeaturedWork';
import { PortfolioGallery } from './components/PortfolioGallery';
import { WallpaperShowcase } from './components/WallpaperShowcase';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { ReviewsSection } from './components/ReviewsSection';
import { CTASection } from './components/CTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { QuoteFormModal } from './components/QuoteFormModal';
import { LightboxModal, LightboxItem } from './components/LightboxModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { api, getStoredUser } from './api';
import { 
  BusinessSettings, 
  ServiceItem, 
  PortfolioItem, 
  GalleryItem, 
  ReviewItem, 
  AdminUser 
} from './types';
import { WALLPAPER_COLLECTION, BANNER_POSTER_ITEMS } from './data/wallpapersAndBanners';

// Default fallback settings in case network loads synchronously
const defaultSettings: BusinessSettings = {
  name: 'AL Khair Graphics',
  category: 'Graphic Design • Printing • Advertising',
  address: 'Liaquat Park, Hamza I.T Market Opp., East Circular Road, Dera Ismail Khan, 29111, Pakistan',
  phone: '(0966) 730083',
  hours: 'Open 24 Hours',
  whatsappNumber: '+92300730083',
  email: 'info@alkhairgraphics.com',
  mapsUrl: 'https://maps.google.com'
};

export default function App() {
  const [settings, setSettings] = useState<BusinessSettings>(defaultSettings);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(BANNER_POSTER_ITEMS);
  const [gallery, setGallery] = useState<GalleryItem[]>(WALLPAPER_COLLECTION);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals & Drawers
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [prefillQuoteService, setPrefillQuoteService] = useState<string | undefined>(undefined);

  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getStoredUser());
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Load initial public content
  const loadAppData = async () => {
    try {
      const [sett, serv, port, gall, rev] = await Promise.all([
        api.getSettings().catch(() => defaultSettings),
        api.getServices().catch(() => []),
        api.getPortfolio().catch(() => []),
        api.getGallery().catch(() => []),
        api.getReviews().catch(() => [])
      ]);

      setSettings(sett);
      setServices(serv);
      setPortfolio(port);
      setGallery(gall);
      setReviews(rev);
    } catch (err) {
      console.error('Error loading initial app data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppData();

    // Check if URL has admin route
    if (window.location.pathname.includes('/admin')) {
      const stored = getStoredUser();
      if (stored) {
        setAdminDashboardOpen(true);
      } else {
        setAdminLoginOpen(true);
      }
    }
  }, []);

  const handleOpenQuote = (serviceName?: string) => {
    setPrefillQuoteService(serviceName);
    setQuoteModalOpen(true);
  };

  const handleOpenAdmin = () => {
    if (adminUser) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleOpenLightbox = (item: LightboxItem) => {
    // Compile current list of images for navigation
    const allGalleryItems: LightboxItem[] = [
      ...portfolio.filter(p => p.published).map(p => ({
        title: p.title,
        category: p.category,
        image: p.image,
        description: p.description
      })),
      ...gallery.filter(g => g.published).map(g => ({
        title: g.title,
        category: g.category,
        image: g.image,
        description: g.description
      }))
    ];

    // Find index of clicked item
    const targetIdx = allGalleryItems.findIndex(i => i.image === item.image || i.title === item.title);
    if (targetIdx !== -1) {
      setLightboxItems(allGalleryItems);
      setLightboxIndex(targetIdx);
    } else {
      setLightboxItems([item]);
      setLightboxIndex(0);
    }
    setLightboxOpen(true);
  };

  const handleExploreAllWork = () => {
    const el = document.querySelector('#portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Sticky Header Navigation */}
      <Navbar 
        settings={settings}
        onOpenQuote={handleOpenQuote}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Hero Section with 3D perspective creative work & 24/7 indicator */}
      <Hero 
        settings={settings}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Trust & Contact Quick Strip with Animated Counters */}
      <TrustBar 
        settings={settings}
        onContactClick={handleContactClick}
      />

      {/* Collaborating with Brands Infinite Marquee (GS Enterprises Inspired) */}
      <BrandMarquee />

      {/* 12 Creative Services Grid */}
      <ServicesSection 
        services={services}
        onSelectServiceForQuote={handleOpenQuote}
      />

      {/* 20 Signature Printing Products Interactive Showcase (GS Enterprises Inspired) */}
      <ProductShowcaseSlider 
        settings={settings}
        onOpenQuote={handleOpenQuote}
      />

      {/* Featured Creative Work with Asymmetric Grid */}
      <FeaturedWork 
        portfolio={portfolio}
        onOpenLightbox={handleOpenLightbox}
        onExploreAll={handleExploreAllWork}
      />

      {/* Full Work Portfolio with Filter Tabs & Masonry */}
      <PortfolioGallery 
        portfolio={portfolio}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* Wallpaper & Poster Showcase */}
      <WallpaperShowcase 
        gallery={gallery}
        portfolio={portfolio}
        onOpenLightbox={handleOpenLightbox}
        onOpenQuote={handleOpenQuote}
      />

      {/* About Section with 4 Pillars */}
      <AboutSection 
        settings={settings}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Why Choose Us - 8 Feature Cards */}
      <WhyChooseUs />

      {/* 5-Step Process Timeline */}
      <ProcessSection />

      {/* Verified Google Reviews */}
      <ReviewsSection 
        reviews={reviews}
      />

      {/* High-Impact Call to Action Banner */}
      <CTASection 
        settings={settings}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Contact Section, Form & Live Map */}
      <ContactSection 
        settings={settings}
      />

      {/* Footer */}
      <Footer 
        settings={settings}
        onOpenQuote={() => handleOpenQuote()}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Floating 24/7 WhatsApp & Direct Call Widget */}
      <FloatingContact 
        settings={settings}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Real-time Order Activity Ticker Toast */}
      <RecentOrderNotification />

      {/* Quote Request Modal */}
      <QuoteFormModal 
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedService={prefillQuoteService}
      />

      {/* High-Resolution Lightbox Modal */}
      <LightboxModal 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={(user) => {
          setAdminUser(user);
          setAdminDashboardOpen(true);
        }}
      />

      {/* Full Admin Dashboard Panel */}
      {adminDashboardOpen && adminUser && (
        <AdminDashboard 
          user={adminUser}
          onLogout={() => {
            setAdminUser(null);
            setAdminDashboardOpen(false);
          }}
          onCloseDashboard={() => {
            setAdminDashboardOpen(false);
            loadAppData(); // Refresh public view
          }}
        />
      )}

    </div>
  );
}
