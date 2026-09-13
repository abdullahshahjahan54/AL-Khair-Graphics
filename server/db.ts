import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { 
  BusinessSettings, 
  ServiceItem, 
  PortfolioItem, 
  GalleryItem, 
  ReviewItem, 
  QuoteRequest, 
  ContactMessage, 
  AdminUser 
} from '../src/types';

interface DatabaseSchema {
  settings: BusinessSettings;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  quotes: QuoteRequest[];
  messages: ContactMessage[];
  admins: (AdminUser & { passwordHash: string })[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Default initial data matching AL Khair Graphics in Dera Ismail Khan
const defaultInitialData: DatabaseSchema = {
  settings: {
    id: 'settings_main',
    name: 'AL Khair Graphics',
    tagline: 'Creative Designs • Professional Printing • Powerful Advertising',
    category: 'Graphic Design • Printing • Advertising',
    address: 'Liaquat Park, Hamza I.T Market Opp., East Circular Road',
    city: 'Dera Ismail Khan, 29111, Pakistan',
    phone: '(0966) 730083',
    whatsappNumber: '+923000000000', // Configurable in business settings
    email: 'info@alkhairgraphics.pk',
    hours: 'Open 24 Hours',
    mapsEmbedUrl: 'https://maps.google.com/maps?q=Liaquat+Park,+Hamza+IT+Market,+East+Circular+Road,+Dera+Ismail+Khan&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapsLink: 'https://maps.google.com/?q=Liaquat+Park+Hamza+IT+Market+Opp+East+Circular+Road+Dera+Ismail+Khan',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    logoText: 'AL Khair Graphics'
  },
  services: [
    {
      id: 'srv_01',
      number: '01',
      name: 'Graphic Designing',
      slug: 'graphic-designing',
      description: 'Custom and professional graphic designs for businesses, brands and individuals.',
      iconName: 'Palette',
      features: ['Custom Vector Illustrations', 'Brand Consistency', 'Multi-Format Export', 'Print & Digital Optimization'],
      sortOrder: 1,
      published: true
    },
    {
      id: 'srv_02',
      number: '02',
      name: 'Flex & Banner Printing',
      slug: 'flex-banner-printing',
      description: 'Professional flex and banner printing for promotions, events and businesses.',
      iconName: 'Printer',
      features: ['High-DPI Solvent Printing', 'Weather-Proof Material', 'Reinforced Eyelets & Seams', 'Vibrant Color Gamut'],
      sortOrder: 2,
      published: true
    },
    {
      id: 'srv_03',
      number: '03',
      name: 'Billboard Advertising',
      slug: 'billboard-advertising',
      description: 'Creative billboard and large-format advertising solutions.',
      iconName: 'Tv',
      features: ['Highway & City Center Visibility', 'High-Resolution Large Format', 'Heavy-Duty Media', 'Turnkey Advertising Design'],
      sortOrder: 3,
      published: true
    },
    {
      id: 'srv_04',
      number: '04',
      name: 'Poster & Flyer Design',
      slug: 'poster-flyer-design',
      description: 'Eye-catching promotional posters, flyers and marketing materials.',
      iconName: 'FileText',
      features: ['Event Announcements', 'Commercial Product Flyers', 'Strategic Call to Action', 'Crisp Typography'],
      sortOrder: 4,
      published: true
    },
    {
      id: 'srv_05',
      number: '05',
      name: 'Logo & Branding',
      slug: 'logo-branding',
      description: 'Professional logos and visual identity designs for businesses.',
      iconName: 'Sparkles',
      features: ['Distinctive Brand Marks', 'Color Palette & Typography System', 'Full Brand Guidelines', 'Stationery Systems'],
      sortOrder: 5,
      published: true
    },
    {
      id: 'srv_06',
      number: '06',
      name: 'Business Cards',
      slug: 'business-cards',
      description: 'Modern and professional business card designs.',
      iconName: 'CreditCard',
      features: ['Premium Cardstock Mockups', 'Spot UV & Matte Finishing', 'Double-Sided Layouts', 'Quick Turnaround'],
      sortOrder: 6,
      published: true
    },
    {
      id: 'srv_07',
      number: '07',
      name: 'Wallpaper Designs',
      slug: 'wallpaper-designs',
      description: 'Creative wallpaper and decorative design solutions.',
      iconName: 'Image',
      features: ['Custom Architectural Murals', 'Seamless Geometric Motifs', 'High-Res Vinyl & Fabric', 'Luxury Interior Aesthetics'],
      sortOrder: 7,
      published: true
    },
    {
      id: 'srv_08',
      number: '08',
      name: 'Social Media Designs',
      slug: 'social-media-designs',
      description: 'Professional promotional graphics for Facebook, Instagram and other platforms.',
      iconName: 'Share2',
      features: ['Platform-Optimized Dimensions', 'High-Conversion Ad Creatives', 'Story & Reel Covers', 'Cohesive Brand Aesthetics'],
      sortOrder: 8,
      published: true
    },
    {
      id: 'srv_09',
      number: '09',
      name: 'Sign Board Design',
      slug: 'sign-board-design',
      description: 'Professional signage and shop-front design solutions.',
      iconName: 'Signpost',
      features: ['3D Acrylic Letters', 'Backlit & Frontlit Signage', 'Shop Front Facade Branding', 'Durable Exterior Build'],
      sortOrder: 9,
      published: true
    },
    {
      id: 'srv_10',
      number: '10',
      name: 'Printing Services',
      slug: 'printing-services',
      description: 'High-quality printing solutions for business and promotional materials.',
      iconName: 'Layers',
      features: ['Offset & Digital Printing', 'Brochures & Catalogs', 'Invoices & Receipt Books', 'Strict Color Fidelity'],
      sortOrder: 10,
      published: true
    },
    {
      id: 'srv_11',
      number: '11',
      name: 'Promotional Designs',
      slug: 'promotional-designs',
      description: 'Creative advertising materials designed to attract attention.',
      iconName: 'Megaphone',
      features: ['Discount Campaign Assets', 'Trade Show Displays', 'Vehicle Wraps & Decals', 'Impactful Messaging'],
      sortOrder: 11,
      published: true
    },
    {
      id: 'srv_12',
      number: '12',
      name: 'Custom Design Solutions',
      slug: 'custom-design-solutions',
      description: 'Custom designs based on the customer\'s specific requirements.',
      iconName: 'PenTool',
      features: ['Bespoke Creative Concepts', 'Personalized Consultation', 'Tailored Specifications', '24-Hour Production Queue'],
      sortOrder: 12,
      published: true
    }
  ],
  portfolio: [
    {
      id: 'port_01',
      title: 'City Center Billboard Advertising Campaign',
      slug: 'city-center-billboard-campaign',
      category: 'Billboards',
      description: 'High-impact illuminated large-format advertising campaign installed on East Circular Road, commanding maximum daytime and nighttime visibility.',
      image: '/uploads/hero_billboard.jpg',
      featured: true,
      published: true,
      sortOrder: 1,
      createdAt: '2026-08-20'
    },
    {
      id: 'port_02',
      title: 'Commercial Flex & Banner Exhibition Display',
      slug: 'commercial-flex-banner-display',
      category: 'Flex Printing',
      description: 'Premium heavy-duty flex banner with high-saturation pigment printing for an executive trade showcase in Dera Ismail Khan.',
      image: '/uploads/flex_banner.jpg',
      featured: true,
      published: true,
      sortOrder: 2,
      createdAt: '2026-08-22'
    },
    {
      id: 'port_03',
      title: 'Corporate Brand Identity & Executive Stationery',
      slug: 'corporate-brand-identity-stationery',
      category: 'Branding',
      description: 'Complete visual branding system featuring minimalist gold-embossed logo marks, luxury business cards, and corporate collateral.',
      image: '/uploads/branding.jpg',
      featured: true,
      published: true,
      sortOrder: 3,
      createdAt: '2026-08-25'
    },
    {
      id: 'port_04',
      title: 'Bespoke Luxury Geometric Interior Wallpaper',
      slug: 'bespoke-luxury-geometric-wallpaper',
      category: 'Wallpaper Designs',
      description: 'Architectural custom wallpaper design and wide-format vinyl printing engineered for contemporary executive interiors.',
      image: '/uploads/wallpaper.jpg',
      featured: true,
      published: true,
      sortOrder: 4,
      createdAt: '2026-08-28'
    },
    {
      id: 'port_05',
      title: 'Modern Typography & Cultural Event Posters',
      slug: 'modern-typography-event-posters',
      category: 'Posters',
      description: 'Striking Swiss-inspired exhibition poster series combining bold type hierarchies with high-contrast color theory.',
      image: '/uploads/posters.jpg',
      featured: true,
      published: true,
      sortOrder: 5,
      createdAt: '2026-09-02'
    },
    {
      id: 'port_06',
      title: 'Commercial Storefront 3D Signboard & Fascia',
      slug: 'storefront-3d-signboard-fascia',
      category: 'Advertising',
      description: 'Acrylic 3D dimensional lettering with integrated LED backlighting for retail frontages facing Liaquat Park.',
      image: '/uploads/hero_billboard.jpg',
      featured: false,
      published: true,
      sortOrder: 6,
      createdAt: '2026-09-04'
    }
  ],
  gallery: [
    {
      id: 'gal_01',
      title: 'Architectural Feature Wall Mural',
      category: 'Wallpapers',
      image: '/uploads/wallpaper.jpg',
      description: 'Custom engineered wall covering for contemporary residences and commercial lounges in Dera Ismail Khan.',
      featured: true,
      published: true,
      sortOrder: 1,
      createdAt: '2026-08-15'
    },
    {
      id: 'gal_02',
      title: 'Night Sky High-Impact Billboard',
      category: 'Billboards',
      image: '/uploads/hero_billboard.jpg',
      description: 'Dusk illuminated highway advertising board designed and produced for regional brand rollout.',
      featured: true,
      published: true,
      sortOrder: 2,
      createdAt: '2026-08-16'
    },
    {
      id: 'gal_03',
      title: 'Event Flex & Promotional Banners',
      category: 'Banners',
      image: '/uploads/flex_banner.jpg',
      description: 'Heavy flex print with weather-resistant finishing for outdoor exhibition stands.',
      featured: true,
      published: true,
      sortOrder: 3,
      createdAt: '2026-08-18'
    },
    {
      id: 'gal_04',
      title: 'Minimalist Corporate Identity Package',
      category: 'Branding',
      image: '/uploads/branding.jpg',
      description: 'Embossed foil business cards and letterhead mockups.',
      featured: true,
      published: true,
      sortOrder: 4,
      createdAt: '2026-08-20'
    },
    {
      id: 'gal_05',
      title: 'Artisan Typography & Graphic Posters',
      category: 'Posters',
      image: '/uploads/posters.jpg',
      description: 'High quality silk paper offset print with vibrant color gradients.',
      featured: true,
      published: true,
      sortOrder: 5,
      createdAt: '2026-08-22'
    }
  ],
  reviews: [
    // Real customer reviews strictly as provided in the prompt - zero fabricated text or stars
    {
      id: 'rev_01',
      customerName: 'Muhammad Kashif Naveed',
      reviewText: 'Any kinds of bill boards flex printing.',
      source: 'Google Review',
      date: 'Local Verified Customer',
      published: true,
      isVerified: true
    },
    {
      id: 'rev_02',
      customerName: 'Ali Khan',
      reviewText: 'MashAllah good & vip work',
      source: 'Google Review',
      date: 'Local Verified Customer',
      published: true,
      isVerified: true
    },
    {
      id: 'rev_03',
      customerName: 'Azizullah Pathan',
      reviewText: 'Good Work',
      source: 'Google Review',
      date: 'Local Verified Customer',
      published: true,
      isVerified: true
    },
    {
      id: 'rev_04',
      customerName: 'Adnan Ali',
      reviewText: 'MashAllah nice...',
      source: 'Google Review',
      date: 'Local Verified Customer',
      published: true,
      isVerified: true
    },
    // Reviewers with names provided in prompt (no invented text)
    {
      id: 'rev_05',
      customerName: 'SIRAJIA SCHOLARS Official',
      reviewText: undefined,
      source: 'Google Review',
      date: 'Verified Patron',
      published: true,
      isVerified: true
    },
    {
      id: 'rev_06',
      customerName: 'Usman Dj',
      reviewText: undefined,
      source: 'Google Review',
      date: 'Verified Patron',
      published: true,
      isVerified: true
    },
    {
      id: 'rev_07',
      customerName: 'Saad Yamin',
      reviewText: undefined,
      source: 'Google Review',
      date: 'Verified Patron',
      published: true,
      isVerified: true
    },
    {
      id: 'rev_08',
      customerName: 'Mubashir Farooq',
      reviewText: undefined,
      source: 'Google Review',
      date: 'Verified Patron',
      published: true,
      isVerified: true
    },
    {
      id: 'rev_09',
      customerName: 'Zia Baloch',
      reviewText: undefined,
      source: 'Google Review',
      date: 'Verified Patron',
      published: true,
      isVerified: true
    },
    {
      id: 'rev_10',
      customerName: 'Danial Khan',
      reviewText: undefined,
      source: 'Google Review',
      date: 'Verified Patron',
      published: true,
      isVerified: true
    }
  ],
  quotes: [
    {
      id: 'quote_01',
      fullName: 'Tariq Mehmood',
      phoneNumber: '0301-7890123',
      businessName: 'Al-Madina Traders',
      serviceRequired: 'Flex Printing',
      quantity: '4 Banners (10x5 ft)',
      preferredDate: '2026-09-15',
      projectDetails: 'Need high-resolution outdoor flex banners for shop grand opening on Circular Road.',
      status: 'In Progress',
      notes: 'Customer contacted on phone, design sample sent via WhatsApp.',
      createdAt: '2026-09-08'
    },
    {
      id: 'quote_02',
      fullName: 'Rashid Khan',
      phoneNumber: '0312-4567890',
      businessName: 'Khan Pharmacy',
      serviceRequired: 'Sign Board',
      quantity: '1 Fascia Board',
      preferredDate: '2026-09-20',
      projectDetails: 'Front backlit acrylic 3D lettering sign board for pharmacy entrance opposite hospital.',
      status: 'New',
      notes: 'Pending initial quote calculation.',
      createdAt: '2026-09-09'
    }
  ],
  messages: [
    {
      id: 'msg_01',
      name: 'Nadeem Ahmed',
      email: 'nadeem@example.com',
      phone: '0333-5551234',
      subject: 'Custom Wallpaper for Conference Room',
      message: 'Assalam o Alaikum, we need a 12x9 ft modern geometric wallpaper for our corporate office in DI Khan. Do you provide installation as well?',
      isRead: false,
      createdAt: '2026-09-09'
    }
  ],
  admins: [
    {
      id: 'admin_01',
      email: 'admin@alkhairgraphics.com',
      name: 'AL Khair Admin',
      role: 'Super Administrator',
      passwordHash: bcrypt.hashSync('admin12345', 10)
    }
  ]
};

export class Database {
  private static instance: Database;
  private data: DatabaseSchema;

  private constructor() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Error reading db.json, initializing defaults', err);
        this.data = defaultInitialData;
        this.save();
      }
    } else {
      this.data = defaultInitialData;
      this.save();
    }
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private save(): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file', err);
    }
  }

  // Settings
  public getSettings(): BusinessSettings {
    return this.data.settings;
  }

  public updateSettings(updates: Partial<BusinessSettings>): BusinessSettings {
    this.data.settings = { ...this.data.settings, ...updates };
    this.save();
    return this.data.settings;
  }

  // Services
  public getServices(): ServiceItem[] {
    return [...this.data.services].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public addService(service: Omit<ServiceItem, 'id'>): ServiceItem {
    const newItem: ServiceItem = {
      ...service,
      id: 'srv_' + Date.now().toString(36)
    };
    this.data.services.push(newItem);
    this.save();
    return newItem;
  }

  public updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
    const idx = this.data.services.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.data.services[idx] = { ...this.data.services[idx], ...updates };
    this.save();
    return this.data.services[idx];
  }

  public deleteService(id: string): boolean {
    const prevLen = this.data.services.length;
    this.data.services = this.data.services.filter(s => s.id !== id);
    if (this.data.services.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Portfolio
  public getPortfolio(): PortfolioItem[] {
    return [...this.data.portfolio].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public addPortfolio(item: Omit<PortfolioItem, 'id' | 'createdAt'>): PortfolioItem {
    const newItem: PortfolioItem = {
      ...item,
      id: 'port_' + Date.now().toString(36),
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.data.portfolio.push(newItem);
    this.save();
    return newItem;
  }

  public updatePortfolio(id: string, updates: Partial<PortfolioItem>): PortfolioItem | null {
    const idx = this.data.portfolio.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.portfolio[idx] = { ...this.data.portfolio[idx], ...updates };
    this.save();
    return this.data.portfolio[idx];
  }

  public deletePortfolio(id: string): boolean {
    const prevLen = this.data.portfolio.length;
    this.data.portfolio = this.data.portfolio.filter(p => p.id !== id);
    if (this.data.portfolio.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Gallery
  public getGallery(): GalleryItem[] {
    return [...this.data.gallery].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public addGallery(item: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
    const newItem: GalleryItem = {
      ...item,
      id: 'gal_' + Date.now().toString(36),
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.data.gallery.push(newItem);
    this.save();
    return newItem;
  }

  public updateGallery(id: string, updates: Partial<GalleryItem>): GalleryItem | null {
    const idx = this.data.gallery.findIndex(g => g.id === id);
    if (idx === -1) return null;
    this.data.gallery[idx] = { ...this.data.gallery[idx], ...updates };
    this.save();
    return this.data.gallery[idx];
  }

  public deleteGallery(id: string): boolean {
    const prevLen = this.data.gallery.length;
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    if (this.data.gallery.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Reviews
  public getReviews(): ReviewItem[] {
    return this.data.reviews;
  }

  public addReview(item: Omit<ReviewItem, 'id'>): ReviewItem {
    const newItem: ReviewItem = {
      ...item,
      id: 'rev_' + Date.now().toString(36)
    };
    this.data.reviews.push(newItem);
    this.save();
    return newItem;
  }

  public updateReview(id: string, updates: Partial<ReviewItem>): ReviewItem | null {
    const idx = this.data.reviews.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.data.reviews[idx] = { ...this.data.reviews[idx], ...updates };
    this.save();
    return this.data.reviews[idx];
  }

  public deleteReview(id: string): boolean {
    const prevLen = this.data.reviews.length;
    this.data.reviews = this.data.reviews.filter(r => r.id !== id);
    if (this.data.reviews.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Quote Requests
  public getQuotes(): QuoteRequest[] {
    return [...this.data.quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addQuote(quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
    const newQuote: QuoteRequest = {
      ...quote,
      id: 'quote_' + Date.now().toString(36),
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.data.quotes.unshift(newQuote);
    this.save();
    return newQuote;
  }

  public updateQuoteStatus(id: string, status: QuoteRequest['status'], notes?: string): QuoteRequest | null {
    const idx = this.data.quotes.findIndex(q => q.id === id);
    if (idx === -1) return null;
    this.data.quotes[idx].status = status;
    if (notes !== undefined) {
      this.data.quotes[idx].notes = notes;
    }
    this.save();
    return this.data.quotes[idx];
  }

  public deleteQuote(id: string): boolean {
    const prevLen = this.data.quotes.length;
    this.data.quotes = this.data.quotes.filter(q => q.id !== id);
    if (this.data.quotes.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Contact Messages
  public getMessages(): ContactMessage[] {
    return [...this.data.messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg_' + Date.now().toString(36),
      isRead: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.data.messages.unshift(newMsg);
    this.save();
    return newMsg;
  }

  public markMessageRead(id: string, isRead: boolean = true): ContactMessage | null {
    const idx = this.data.messages.findIndex(m => m.id === id);
    if (idx === -1) return null;
    this.data.messages[idx].isRead = isRead;
    this.save();
    return this.data.messages[idx];
  }

  public deleteMessage(id: string): boolean {
    const prevLen = this.data.messages.length;
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    if (this.data.messages.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Admin Auth
  public findAdminByEmail(email: string) {
    return this.data.admins.find(a => a.email.toLowerCase() === email.toLowerCase());
  }

  public updateAdminPassword(adminId: string, newPassword: string): boolean {
    const idx = this.data.admins.findIndex(a => a.id === adminId);
    if (idx === -1) return false;
    this.data.admins[idx].passwordHash = bcrypt.hashSync(newPassword, 10);
    this.save();
    return true;
  }

  public updateAdminProfile(adminId: string, name: string, email: string): AdminUser | null {
    const idx = this.data.admins.findIndex(a => a.id === adminId);
    if (idx === -1) return null;
    this.data.admins[idx].name = name;
    this.data.admins[idx].email = email;
    this.save();
    const { passwordHash: _, ...user } = this.data.admins[idx];
    return user;
  }

  // Stats
  public getStats(): {
    portfolioCount: number;
    servicesCount: number;
    galleryCount: number;
    reviewsCount: number;
    newQuotesCount: number;
    unreadMessagesCount: number;
  } {
    return {
      portfolioCount: this.data.portfolio.length,
      servicesCount: this.data.services.length,
      galleryCount: this.data.gallery.length,
      reviewsCount: this.data.reviews.length,
      newQuotesCount: this.data.quotes.filter(q => q.status === 'New').length,
      unreadMessagesCount: this.data.messages.filter(m => !m.isRead).length
    };
  }
}
