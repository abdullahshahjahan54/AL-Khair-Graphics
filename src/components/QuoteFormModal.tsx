import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Calendar, 
  FileCheck,
  Building, 
  Phone, 
  User, 
  Layers
} from 'lucide-react';
import { api } from '../api';

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const SERVICES_LIST = [
  'Graphic Design',
  'Banner',
  'Flex Printing',
  'Billboard',
  'Logo',
  'Business Card',
  'Poster',
  'Flyer',
  'Wallpaper',
  'Social Media Design',
  'Sign Board',
  'Printing',
  'Branding',
  'Other'
];

export const QuoteFormModal: React.FC<QuoteFormModalProps> = ({ 
  isOpen, 
  onClose, 
  preselectedService 
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceRequired, setServiceRequired] = useState(SERVICES_LIST[0]);
  const [quantity, setQuantity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState('');

  const [loading, setLoading] = useState(false);
  const [successQuoteId, setSuccessQuoteId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      // Find matching item in list or fallback
      const found = SERVICES_LIST.find(
        s => s.toLowerCase() === preselectedService.toLowerCase() ||
             preselectedService.toLowerCase().includes(s.toLowerCase())
      );
      if (found) {
        setServiceRequired(found);
      }
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!projectDetails.trim()) {
      setErrorMessage('Please provide details about your design or printing project.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.submitQuote({
        fullName,
        phoneNumber,
        businessName: businessName || undefined,
        serviceRequired,
        quantity: quantity || undefined,
        preferredDate: preferredDate || undefined,
        projectDetails,
        referenceFileUrl: fileName ? `Uploaded: ${fileName}` : undefined
      });

      setSuccessQuoteId(response.quote.id);
      setLoading(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit quote request. Please try again or call us directly.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setPhoneNumber('');
    setBusinessName('');
    setServiceRequired(SERVICES_LIST[0]);
    setQuantity('');
    setPreferredDate('');
    setProjectDetails('');
    setFileName('');
    setFileBase64('');
    setSuccessQuoteId(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="quote-modal-container"
        className="relative w-full max-w-2xl my-8 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-700 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Studio Estimate</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Request a Quote
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Fill in your project specifications. Our Dera Ismail Khan production team will get in touch with accurate pricing.
          </p>
        </div>

        {/* Success Confirmation View */}
        {successQuoteId ? (
          <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              Quote Request Received!
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{fullName}</strong>. Your request for <strong>{serviceRequired}</strong> has been logged under Reference ID: <span className="font-mono text-amber-400 font-bold">{successQuoteId}</span>.
            </p>
            <p className="text-neutral-400 text-xs">
              We are open 24 Hours. Our team will review your specifications and contact you at {phoneNumber}.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error banner */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300-1234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Business Name & Service Required */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  <span>Business Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Al-Madina Traders"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Service Required *</span>
                </label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {SERVICES_LIST.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Quantity & Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Quantity / Dimensions
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 Banners (10x4 ft) or 1000 cards"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preferred Completion Date</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Project Details *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe your design vision, text content, color preferences, or specific placement requirements..."
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            {/* Upload Reference File */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Reference File (Optional)</span>
              </label>
              <div className="relative border-2 border-dashed border-neutral-800 hover:border-amber-400/40 rounded-xl p-4 text-center cursor-pointer transition-colors bg-neutral-950/50">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                  {fileName ? (
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <FileCheck className="w-4 h-4" /> Selected: {fileName}
                    </span>
                  ) : (
                    <span>Click or drag image, logo sketch, or brief document here</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Quote Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Request</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
