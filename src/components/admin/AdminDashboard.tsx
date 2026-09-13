import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Palette, 
  Image, 
  MessageSquareQuote, 
  FileText, 
  Mail, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Star, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Save, 
  Upload, 
  AlertCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
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
} from '../../types';
import { api, clearAuthToken } from '../../api';

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
  onCloseDashboard: () => void;
}

type TabType = 'overview' | 'portfolio' | 'services' | 'gallery' | 'reviews' | 'quotes' | 'messages' | 'settings' | 'profile';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  user, 
  onLogout, 
  onCloseDashboard 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Quote filter
  const [quoteFilter, setQuoteFilter] = useState<QuoteRequest['status'] | 'All'>('All');

  // Modal / Form state for adds & edits
  const [editingItem, setEditingItem] = useState<{ type: string; data?: any } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load all initial data
  const loadData = async () => {
    setLoading(true);
    try {
      const [
        statsData, 
        settingsData, 
        servicesData, 
        portfolioData, 
        galleryData, 
        reviewsData, 
        quotesData, 
        messagesData
      ] = await Promise.all([
        api.getStats().catch(() => null),
        api.getSettings(),
        api.getServices(),
        api.getPortfolio(),
        api.getGallery(),
        api.getReviews(),
        api.getQuotes(),
        api.getMessages()
      ]);

      setStats(statsData);
      setSettings(settingsData);
      setServices(servicesData);
      setPortfolio(portfolioData);
      setGallery(galleryData);
      setReviews(reviewsData);
      setQuotes(quotesData);
      setMessages(messagesData);
    } catch (err: any) {
      console.error(err);
      showToast('Error loading some dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  // Quote Status Update
  const handleQuoteStatusChange = async (id: string, newStatus: QuoteRequest['status']) => {
    try {
      await api.updateQuoteStatus(id, newStatus);
      showToast('Quote status updated.');
      setRefreshKey(k => k + 1);
    } catch (err: any) {
      showToast('Failed to update quote status');
    }
  };

  // Delete Quote
  const handleDeleteQuote = async (id: string) => {
    if (!window.confirm('Delete this quote request?')) return;
    try {
      await api.deleteQuote(id);
      showToast('Quote deleted');
      setRefreshKey(k => k + 1);
    } catch (err: any) {
      showToast('Failed to delete quote');
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.deleteMessage(id);
      showToast('Message deleted');
      setRefreshKey(k => k + 1);
    } catch (err: any) {
      showToast('Failed to delete message');
    }
  };

  // Toggle Message Read
  const handleToggleMessageRead = async (id: string, currentRead: boolean) => {
    try {
      await api.markMessageRead(id, !currentRead);
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Failed to update message status');
    }
  };

  // Toggle Portfolio featured
  const handleTogglePortfolioFeatured = async (item: PortfolioItem) => {
    try {
      await api.updatePortfolio(item.id, { featured: !item.featured });
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Update failed');
    }
  };

  // Toggle Portfolio published
  const handleTogglePortfolioPublished = async (item: PortfolioItem) => {
    try {
      await api.updatePortfolio(item.id, { published: !item.published });
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Update failed');
    }
  };

  // Delete Portfolio
  const handleDeletePortfolio = async (id: string) => {
    if (!window.confirm('Delete this portfolio project?')) return;
    try {
      await api.deletePortfolio(id);
      showToast('Portfolio item removed');
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Delete failed');
    }
  };

  // Toggle Service published
  const handleToggleServicePublished = async (srv: ServiceItem) => {
    try {
      await api.updateService(srv.id, { published: !srv.published });
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Update failed');
    }
  };

  // Delete Service
  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.deleteService(id);
      showToast('Service removed');
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Delete failed');
    }
  };

  // Delete Gallery
  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Delete this gallery image?')) return;
    try {
      await api.deleteGallery(id);
      showToast('Gallery item removed');
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Delete failed');
    }
  };

  // Delete Review
  const handleDeleteReview = async (id: string) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.deleteReview(id);
      showToast('Review removed');
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Delete failed');
    }
  };

  // Toggle Review published
  const handleToggleReviewPublished = async (rev: ReviewItem) => {
    try {
      await api.updateReview(rev.id, { published: !rev.published });
      setRefreshKey(k => k + 1);
    } catch (err) {
      showToast('Update failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 text-neutral-100 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-3 bg-neutral-900 border border-amber-400/50 text-amber-300 text-xs font-semibold rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col shrink-0">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-white leading-tight">
                AL Khair Admin
              </h2>
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono">
                Agency Studio
              </span>
            </div>
          </div>

          <button
            onClick={onCloseDashboard}
            title="View Public Site"
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs flex items-center gap-1"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'overview' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'quotes' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>Quote Requests</span>
            </div>
            {quotes.filter(q => q.status === 'New').length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-bold">
                {quotes.filter(q => q.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'messages' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>Contact Messages</span>
            </div>
            {messages.filter(m => !m.isRead).length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-bold">
                {messages.filter(m => !m.isRead).length}
              </span>
            )}
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Catalog &amp; Content
          </div>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'portfolio' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Portfolio Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'services' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services (12)</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'gallery' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Gallery &amp; Wallpapers</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'reviews' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Customer Reviews</span>
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            System
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'settings' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Business Settings</span>
          </button>
        </nav>

        {/* User Info & Logout Footer */}
        <div className="p-4 border-t border-neutral-800 flex items-center justify-between">
          <div className="truncate">
            <p className="text-xs font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-neutral-400 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              clearAuthToken();
              onLogout();
            }}
            title="Log out"
            className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-900/50 text-neutral-300 hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-neutral-950 overflow-y-auto p-6 sm:p-8">
        
        {/* Header Bar with Action & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-neutral-800">
          <div>
            <h1 className="text-2xl font-bold font-display text-white capitalize">
              {activeTab === 'overview' ? 'Agency Performance Dashboard' : activeTab}
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live database connection • Dera Ismail Khan Production Line
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRefreshKey(k => k + 1)}
              className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl border border-neutral-800 text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Refresh Data</span>
            </button>

            <button
              onClick={onCloseDashboard}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="pt-8 space-y-8">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <span className="text-xs text-neutral-400 font-semibold uppercase">Pending Quotes</span>
                <p className="text-3xl font-extrabold text-amber-400 font-display">
                  {quotes.filter(q => q.status === 'New').length}
                </p>
                <p className="text-[11px] text-neutral-500">Total requests: {quotes.length}</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <span className="text-xs text-neutral-400 font-semibold uppercase">Unread Messages</span>
                <p className="text-3xl font-extrabold text-white font-display">
                  {messages.filter(m => !m.isRead).length}
                </p>
                <p className="text-[11px] text-neutral-500">Total received: {messages.length}</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <span className="text-xs text-neutral-400 font-semibold uppercase">Portfolio Projects</span>
                <p className="text-3xl font-extrabold text-white font-display">
                  {portfolio.length}
                </p>
                <p className="text-[11px] text-emerald-400 font-medium">
                  {portfolio.filter(p => p.featured).length} Featured on home
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <span className="text-xs text-neutral-400 font-semibold uppercase">Customer Reviews</span>
                <p className="text-3xl font-extrabold text-white font-display">
                  {reviews.length}
                </p>
                <p className="text-[11px] text-neutral-500">Authentic verified</p>
              </div>
            </div>

            {/* Recent Quote Requests and Recent Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Quotes */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Recent Quote Requests</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    View all ({quotes.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {quotes.slice(0, 4).map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{q.fullName}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'New' ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          {q.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">
                        {q.serviceRequired} • {q.phoneNumber}
                      </p>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 italic">
                        "{q.projectDetails}"
                      </p>
                    </div>
                  ))}

                  {quotes.length === 0 && (
                    <p className="text-xs text-neutral-500 text-center py-6">No quote requests yet.</p>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>Recent Contact Messages</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    View all ({messages.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {messages.slice(0, 4).map((m) => (
                    <div key={m.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{m.name}</span>
                        <span className="text-[10px] text-neutral-500">{m.date}</span>
                      </div>
                      <p className="text-xs text-neutral-400">{m.phone}</p>
                      <p className="text-[11px] text-neutral-300 line-clamp-2">
                        {m.message}
                      </p>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <p className="text-xs text-neutral-500 text-center py-6">No messages received yet.</p>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: QUOTE REQUESTS MANAGEMENT */}
        {activeTab === 'quotes' && (
          <div className="pt-8 space-y-6">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              {(['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setQuoteFilter(status)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    quoteFilter === status
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Quotes Table / List */}
            <div className="space-y-4">
              {quotes
                .filter(q => quoteFilter === 'All' || q.status === quoteFilter)
                .map((q) => (
                  <div key={q.id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-white">{q.fullName}</span>
                          {q.businessName && (
                            <span className="text-xs text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                              {q.businessName}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Phone: <a href={`tel:${q.phoneNumber}`} className="text-amber-400 font-semibold">{q.phoneNumber}</a> • Received: {new Date(q.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={q.status}
                          onChange={(e) => handleQuoteStatusChange(q.id, e.target.value as any)}
                          className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => handleDeleteQuote(q.id)}
                          className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-900 text-neutral-400 hover:text-rose-300 transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-neutral-500 font-semibold block">Service Required</span>
                        <span className="text-neutral-200 font-bold text-sm">{q.serviceRequired}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-semibold block">Quantity / Size</span>
                        <span className="text-neutral-200">{q.quantity || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-semibold block">Preferred Date</span>
                        <span className="text-neutral-200">{q.preferredDate || 'Flexible'}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                      <span className="text-neutral-500 font-semibold block mb-1">Project Details:</span>
                      {q.projectDetails}
                    </div>

                    {q.referenceFileUrl && (
                      <div className="text-xs text-amber-400 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Reference: {q.referenceFileUrl}</span>
                      </div>
                    )}
                  </div>
                ))}

              {quotes.length === 0 && (
                <div className="p-12 text-center text-neutral-400">
                  No quote requests received yet.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="pt-8 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-6 rounded-2xl border transition-colors ${
                  msg.isRead ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-900 border-amber-500/40 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-white">{msg.name}</h3>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-extrabold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      Phone: <a href={`tel:${msg.phone}`} className="text-amber-400 font-semibold">{msg.phone}</a>
                      {msg.email && ` • Email: ${msg.email}`}
                      {msg.subject && ` • Subject: ${msg.subject}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleMessageRead(msg.id, msg.isRead)}
                      className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
                    >
                      {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-900 text-neutral-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 text-sm text-neutral-200">
                  {msg.message}
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="p-12 text-center text-neutral-400">
                No contact messages yet.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PORTFOLIO MANAGEMENT */}
        {activeTab === 'portfolio' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">
                Total portfolio items: <strong>{portfolio.length}</strong>
              </p>
              <button
                onClick={() => setEditingItem({ type: 'portfolio', data: null })}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Portfolio Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div key={item.id} className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                  <div className="relative aspect-video bg-neutral-950 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-neutral-950/80 text-amber-400 border border-neutral-700">
                        {item.category}
                      </span>
                      {item.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-neutral-950">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePortfolioFeatured(item)}
                          className={`p-1.5 rounded-lg border text-xs ${
                            item.featured ? 'bg-amber-400/20 border-amber-400 text-amber-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                          }`}
                          title="Toggle Featured on Homepage"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleTogglePortfolioPublished(item)}
                          className={`p-1.5 rounded-lg border text-xs ${
                            item.published ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-neutral-800 border-neutral-700 text-neutral-500'
                          }`}
                          title="Publish / Unpublish"
                        >
                          {item.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem({ type: 'portfolio', data: item })}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeletePortfolio(item.id)}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-900 text-neutral-400 hover:text-rose-300"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES (12) */}
        {activeTab === 'services' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">
                Manage commercial design, banner, billboard, wallpaper and printing services.
              </p>
              <button
                onClick={() => setEditingItem({ type: 'service', data: null })}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-amber-400 font-bold">{srv.number}</span>
                      <span className="text-xs text-neutral-500 font-mono">Icon: {srv.iconName}</span>
                    </div>
                    <h4 className="font-bold text-base text-white">{srv.name}</h4>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-3">{srv.description}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleServicePublished(srv)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        srv.published ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {srv.published ? 'Published' : 'Draft'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingItem({ type: 'service', data: srv })}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-900 text-neutral-400 hover:text-rose-300"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GALLERY & WALLPAPERS */}
        {activeTab === 'gallery' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">
                Total gallery items: <strong>{gallery.length}</strong>
              </p>
              <button
                onClick={() => setEditingItem({ type: 'gallery', data: null })}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Gallery</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((g) => (
                <div key={g.id} className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                  <div className="relative aspect-square bg-neutral-950">
                    <img src={g.image} alt={g.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-950/80 text-amber-400">
                      {g.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-xs text-white truncate">{g.title}</h4>
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                      <span className="text-[10px] text-neutral-500">{g.category}</span>
                      <button
                        onClick={() => handleDeleteGallery(g.id)}
                        className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">
                  Reviews from real clients. Strictly forbid fabricating fake customer text or artificial star counts.
                </p>
              </div>
              <button
                onClick={() => setEditingItem({ type: 'review', data: null })}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-base">{r.customerName}</h4>
                      <span className="text-[10px] text-amber-400 font-mono">{r.source}</span>
                    </div>
                    {r.reviewText ? (
                      <p className="text-xs text-neutral-300 italic">"{r.reviewText}"</p>
                    ) : (
                      <p className="text-xs text-neutral-500 italic">Verified Reviewer (No written comment)</p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleReviewPublished(r)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        r.published ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {r.published ? 'Visible' : 'Hidden'}
                    </button>

                    <button
                      onClick={() => handleDeleteReview(r.id)}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-900 text-neutral-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: BUSINESS SETTINGS */}
        {activeTab === 'settings' && settings && (
          <div className="pt-8 max-w-3xl space-y-6">
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
              <h3 className="text-xl font-bold font-display text-white">
                Studio &amp; Contact Configurations
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Category / Tagline</label>
                  <input
                    type="text"
                    value={settings.category}
                    onChange={(e) => setSettings({ ...settings, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Studio Address</label>
                  <textarea
                    rows={2}
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">Business Hours</label>
                    <input
                      type="text"
                      value={settings.hours}
                      onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={settings.email || ''}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Google Maps Direct Link</label>
                  <input
                    type="text"
                    value={settings.mapsUrl || ''}
                    onChange={(e) => setSettings({ ...settings, mapsUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={async () => {
                      try {
                        await api.updateSettings(settings);
                        showToast('Business settings saved.');
                      } catch {
                        showToast('Failed to save settings.');
                      }
                    }}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Generic Item Modal (Add/Edit for Portfolio, Service, Gallery, Review) */}
      {editingItem && (
        <ItemEditModal
          type={editingItem.type}
          initialData={editingItem.data}
          onClose={() => setEditingItem(null)}
          onSaved={() => {
            setEditingItem(null);
            showToast('Saved successfully');
            setRefreshKey(k => k + 1);
          }}
        />
      )}

    </div>
  );
};

// ItemEditModal Component for Quick Add/Edit
interface ItemEditModalProps {
  type: string;
  initialData?: any;
  onClose: () => void;
  onSaved: () => void;
}

const ItemEditModal: React.FC<ItemEditModalProps> = ({ type, initialData, onClose, onSaved }) => {
  const [formData, setFormData] = useState<any>(initialData || {});
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (type === 'portfolio') {
        if (initialData?.id) {
          await api.updatePortfolio(initialData.id, formData);
        } else {
          await api.addPortfolio({
            title: formData.title || 'New Project',
            category: formData.category || 'Graphic Design',
            image: formData.image || '/uploads/hero_billboard.jpg',
            description: formData.description || '',
            featured: formData.featured ?? true,
            published: formData.published ?? true,
            sortOrder: Number(formData.sortOrder) || 1
          });
        }
      } else if (type === 'service') {
        if (initialData?.id) {
          await api.updateService(initialData.id, formData);
        } else {
          await api.addService({
            number: formData.number || '13',
            name: formData.name || 'New Service',
            description: formData.description || '',
            iconName: formData.iconName || 'Palette',
            features: [],
            published: true,
            sortOrder: 13
          });
        }
      } else if (type === 'gallery') {
        if (initialData?.id) {
          await api.updateGallery(initialData.id, formData);
        } else {
          await api.addGallery({
            title: formData.title || 'New Gallery Item',
            category: formData.category || 'Banners',
            image: formData.image || '/uploads/flex_banner.jpg',
            description: formData.description || '',
            featured: false,
            published: true,
            sortOrder: 10
          });
        }
      } else if (type === 'review') {
        if (initialData?.id) {
          await api.updateReview(initialData.id, formData);
        } else {
          await api.addReview({
            customerName: formData.customerName || 'Verified Customer',
            reviewText: formData.reviewText || '',
            source: 'Google Review',
            date: formData.date || 'Recent',
            published: true
          });
        }
      }
      onSaved();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg p-6 rounded-3xl bg-neutral-900 border border-neutral-700 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <h3 className="font-bold text-lg text-white capitalize">
            {initialData?.id ? 'Edit' : 'Add'} {type}
          </h3>
          <button onClick={onClose} className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {type === 'portfolio' && (
            <>
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Category</label>
                <select
                  value={formData.category || 'Graphic Design'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                >
                  {['Banners', 'Flex Printing', 'Billboards', 'Graphic Design', 'Wallpaper Designs', 'Branding', 'Posters', 'Advertising'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/uploads/hero_billboard.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white resize-none"
                />
              </div>
            </>
          )}

          {type === 'service' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 font-semibold block mb-1">Number (e.g. 01)</label>
                  <input
                    type="text"
                    required
                    value={formData.number || ''}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 font-semibold block mb-1">Icon Name</label>
                  <input
                    type="text"
                    value={formData.iconName || 'Palette'}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white resize-none"
                />
              </div>
            </>
          )}

          {type === 'gallery' && (
            <>
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Category</label>
                <select
                  value={formData.category || 'Banners'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                >
                  {['Banners', 'Flex Printing', 'Billboards', 'Graphic Design', 'Wallpapers', 'Posters'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/uploads/wallpaper.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>
            </>
          )}

          {type === 'review' && (
            <>
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.customerName || ''}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Review Text (Only if provided by customer)</label>
                <textarea
                  rows={2}
                  value={formData.reviewText || ''}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white resize-none"
                  placeholder="e.g. MashAllah good & vip work"
                />
              </div>
            </>
          )}

          <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl shadow-md"
            >
              {saving ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
