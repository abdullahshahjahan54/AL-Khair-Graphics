import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Navigation, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BusinessSettings } from '../types';
import { api } from '../api';

interface ContactSectionProps {
  settings: BusinessSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Please provide your name, phone number and message.');
      return;
    }

    setLoading(true);
    try {
      await api.submitContact({
        name,
        phone,
        email: email || undefined,
        subject: subject || undefined,
        message
      });
      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please reach us via phone or WhatsApp.');
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum, I would like to inquire about design and printing services at AL Khair Graphics.`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'AL Khair Graphics Liaquat Park Hamza I.T Market Opp East Circular Road Dera Ismail Khan'
  )}`;

  return (
    <section id="contact" className="py-24 bg-neutral-950 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Studio Access</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Reach out via phone, WhatsApp, or drop by our studio in Dera Ismail Khan. We operate around the clock.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards, Actions & Live Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Business Contact Info Card */}
            <div className="p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-display text-white">
                  AL Khair Graphics
                </h3>
                <p className="text-amber-400 text-xs uppercase tracking-widest font-semibold">
                  Creative Agency • Printing House • Outdoor Advertising
                </p>
              </div>

              <div className="space-y-5 pt-2 border-t border-neutral-800">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-neutral-800 border border-neutral-700 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 font-medium">Studio &amp; Workshop Address</p>
                    <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {settings.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-neutral-800 border border-neutral-700 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 font-medium">Telephone (24/7)</p>
                    <a 
                      href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                      className="text-base font-bold text-white hover:text-amber-400 transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 font-medium">Operating Schedule</p>
                    <p className="text-base font-bold text-emerald-400">
                      {settings.hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call Now, WhatsApp, Get Directions */}
              <div className="pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                  className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-700/50 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" size={16} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                </a>
              </div>

            </div>

            {/* Interactive Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl h-64 relative">
              <iframe
                title="AL Khair Graphics Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13540.69085202619!2d70.902347!3d31.831518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39266b0cb54e3d63%3A0x8e83344a0459db4b!2sEast%20Circular%20Rd%2C%20Dera%20Ismail%20Khan%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
                className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-700 text-xs font-semibold text-neutral-200">
                Liaquat Park / Hamza I.T Market Opp.
              </div>
            </div>

          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-6">
              
              <div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Send a Direct Message
                </h3>
                <p className="text-neutral-400 text-sm mt-1">
                  Have an urgent question or project inquiry? Drop us a note and we will reply promptly.
                </p>
              </div>

              {success ? (
                <div className="p-8 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    Thank you for reaching out to AL Khair Graphics. Our D.I. Khan team has received your inquiry and will follow up shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Muhammad..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Shop Sign Board or Flex Print"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
