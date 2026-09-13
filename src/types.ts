export interface BusinessSettings {
  id?: string;
  name: string;
  tagline?: string;
  category: string;
  address: string;
  city?: string;
  phone: string;
  whatsappNumber: string;
  email?: string;
  hours: string;
  mapsEmbedUrl?: string;
  googleMapsLink?: string;
  mapsUrl?: string;
  facebook?: string;
  instagram?: string;
  logoText?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  slug?: string;
  description: string;
  iconName: string;
  features?: string[];
  sortOrder: number;
  published: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug?: string;
  category: 'Banners' | 'Flex Printing' | 'Billboards' | 'Graphic Design' | 'Wallpaper Designs' | 'Branding' | 'Posters' | 'Advertising' | 'Other';
  description: string;
  image: string;
  galleryImages?: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Banners' | 'Flex Printing' | 'Billboards' | 'Graphic Design' | 'Wallpapers' | 'Wallpaper' | 'Posters' | 'Printing' | 'Branding' | 'Advertising' | 'Other';
  image: string;
  description?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  reviewText?: string;
  source: string;
  date: string;
  published: boolean;
  isVerified?: boolean;
}

export type QuoteStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';

export interface QuoteRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  businessName?: string;
  serviceRequired: string;
  quantity?: string;
  preferredDate?: string;
  projectDetails: string;
  referenceFileUrl?: string;
  status: QuoteStatus;
  notes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email?: string;
  phone: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface DashboardStats {
  portfolioCount: number;
  servicesCount: number;
  galleryCount: number;
  reviewsCount: number;
  newQuotesCount: number;
  unreadMessagesCount: number;
}
