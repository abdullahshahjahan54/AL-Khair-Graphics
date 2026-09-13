import { 
  BusinessSettings, 
  ServiceItem, 
  PortfolioItem, 
  GalleryItem, 
  ReviewItem, 
  QuoteRequest, 
  ContactMessage, 
  AdminUser, 
  DashboardStats 
} from './types';

const API_BASE = '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('alkhair_admin_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('alkhair_admin_token', token);
}

export function clearAuthToken(): void {
  localStorage.removeItem('alkhair_admin_token');
  localStorage.removeItem('alkhair_admin_user');
}

export function getStoredUser(): AdminUser | null {
  const data = localStorage.getItem('alkhair_admin_user');
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setStoredUser(user: AdminUser): void {
  localStorage.setItem('alkhair_admin_user', JSON.stringify(user));
}

function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Public & Shared
  async getSettings(): Promise<BusinessSettings> {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to load business settings');
    return res.json();
  },

  async getServices(): Promise<ServiceItem[]> {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Failed to load services');
    return res.json();
  },

  async getPortfolio(): Promise<PortfolioItem[]> {
    const res = await fetch(`${API_BASE}/portfolio`);
    if (!res.ok) throw new Error('Failed to load portfolio items');
    return res.json();
  },

  async getGallery(): Promise<GalleryItem[]> {
    const res = await fetch(`${API_BASE}/gallery`);
    if (!res.ok) throw new Error('Failed to load gallery items');
    return res.json();
  },

  async getReviews(): Promise<ReviewItem[]> {
    const res = await fetch(`${API_BASE}/reviews`);
    if (!res.ok) throw new Error('Failed to load reviews');
    return res.json();
  },

  async submitQuote(quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; quote: QuoteRequest }> {
    const res = await fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Submission failed' }));
      throw new Error(err.error || 'Failed to submit quote request');
    }
    return res.json();
  },

  async submitContact(contactData: { name: string; email?: string; phone: string; subject?: string; message: string }): Promise<{ success: boolean; message: ContactMessage }> {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Submission failed' }));
      throw new Error(err.error || 'Failed to send message');
    }
    return res.json();
  },

  // Admin Auth
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(err.error || 'Invalid credentials');
    }
    const data = await res.json();
    setAuthToken(data.token);
    setStoredUser(data.user);
    return data;
  },

  async getMe(): Promise<AdminUser> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  async updateProfile(updates: { name: string; email: string; newPassword?: string }): Promise<{ success: boolean; user: AdminUser }> {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    const data = await res.json();
    if (data.user) setStoredUser(data.user);
    return data;
  },

  // Admin Management
  async getStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load stats');
    return res.json();
  },

  async updateSettings(settings: Partial<BusinessSettings>): Promise<BusinessSettings> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  // Admin Services
  async addService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(service)
    });
    if (!res.ok) throw new Error('Failed to create service');
    return res.json();
  },

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json();
  },

  async deleteService(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return true;
  },

  // Admin Portfolio
  async addPortfolio(item: Omit<PortfolioItem, 'id' | 'createdAt'>): Promise<PortfolioItem> {
    const res = await fetch(`${API_BASE}/portfolio`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to add portfolio item');
    return res.json();
  },

  async updatePortfolio(id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const res = await fetch(`${API_BASE}/portfolio/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update portfolio item');
    return res.json();
  },

  async deletePortfolio(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/portfolio/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete portfolio item');
    return true;
  },

  // Admin Gallery
  async addGallery(item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to add gallery item');
    return res.json();
  },

  async updateGallery(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update gallery item');
    return res.json();
  },

  async deleteGallery(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete gallery item');
    return true;
  },

  // Admin Quotes
  async getQuotes(): Promise<QuoteRequest[]> {
    const res = await fetch(`${API_BASE}/quotes`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load quotes');
    return res.json();
  },

  async updateQuoteStatus(id: string, status: QuoteRequest['status'], notes?: string): Promise<QuoteRequest> {
    const res = await fetch(`${API_BASE}/quotes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error('Failed to update quote status');
    return res.json();
  },

  async deleteQuote(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/quotes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete quote');
    return true;
  },

  // Admin Messages
  async getMessages(): Promise<ContactMessage[]> {
    const res = await fetch(`${API_BASE}/contact`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load messages');
    return res.json();
  },

  async markMessageRead(id: string, isRead: boolean): Promise<ContactMessage> {
    const res = await fetch(`${API_BASE}/contact/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isRead })
    });
    if (!res.ok) throw new Error('Failed to update message');
    return res.json();
  },

  async deleteMessage(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete message');
    return true;
  },

  // Admin Reviews
  async addReview(review: Omit<ReviewItem, 'id'>): Promise<ReviewItem> {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(review)
    });
    if (!res.ok) throw new Error('Failed to add review');
    return res.json();
  },

  async updateReview(id: string, updates: Partial<ReviewItem>): Promise<ReviewItem> {
    const res = await fetch(`${API_BASE}/reviews/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update review');
    return res.json();
  },

  async deleteReview(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/reviews/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete review');
    return true;
  },

  // Upload
  async uploadFile(fileName: string, fileData: string): Promise<{ url: string; name: string }> {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ fileName, fileData })
    });
    if (!res.ok) throw new Error('Failed to upload file');
    return res.json();
  },

  // AI Chat Assistant
  async sendChatMessage(message: string, history: Array<{ role: 'user' | 'assistant'; content: string }> = []): Promise<{ reply: string }> {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, history })
    });
    if (!res.ok) throw new Error('Failed to communicate with AI Assistant');
    return res.json();
  }
};
