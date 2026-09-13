import React, { useState } from 'react';
import { Phone, X, Sparkles, Bot, MessageSquare } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { AIAssistantWidget } from './AIAssistantWidget';
import { BusinessSettings } from '../types';

interface FloatingContactProps {
  settings: BusinessSettings;
  onOpenQuote: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ settings, onOpenQuote }) => {
  const [expanded, setExpanded] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const rawPhone = settings.phone.replace(/[^0-9]/g, '');
  const rawWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const prefilledText = encodeURIComponent('Assalam-o-Alaikum, I would like to inquire about printing and design services at AL Khair Graphics.');
  const whatsappUrl = `https://wa.me/${rawWhatsapp}?text=${prefilledText}`;

  return (
    <>
      {/* Interactive AI Assistant Widget */}
      <AIAssistantWidget 
        settings={settings}
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onOpenQuote={onOpenQuote}
      />

      {/* Floating Action Buttons Container (Bottom Right) */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        
        {/* Expanded Quick Options Menu */}
        {expanded && (
          <div className="p-4 rounded-2xl bg-neutral-900/95 border border-neutral-700 shadow-2xl backdrop-blur-xl flex flex-col gap-2.5 w-64 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Direct Assistance</span>
              <button 
                onClick={() => setExpanded(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AI Assistant option in dropdown */}
            <button
              onClick={() => {
                setExpanded(false);
                setAiAssistantOpen(true);
              }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-semibold text-xs transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center font-bold shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold">AL Khair AI Assistant</span>
                <span className="text-[10px] text-amber-400/80">Rates &amp; advice 24/7</span>
              </div>
            </button>

            {/* WhatsApp Direct */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-emerald-300 font-semibold text-xs transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center font-bold shrink-0">
                <WhatsAppIcon className="w-4 h-4 fill-white" size={16} />
              </div>
              <div>
                <span className="block font-bold text-white">WhatsApp Chat</span>
                <span className="text-[10px] text-emerald-400">Instant response</span>
              </div>
            </a>

            {/* Phone Call */}
            <a
              href={`tel:${rawPhone}`}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-semibold text-xs transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-700 text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold">Direct Call</span>
                <span className="text-[10px] text-neutral-400">{settings.phone}</span>
              </div>
            </a>

            {/* Online Quote Modal */}
            <button
              onClick={() => {
                setExpanded(false);
                onOpenQuote();
              }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors shadow-md"
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-950 text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>Online Quote Request</span>
            </button>
          </div>
        )}

        {/* 1. AI ASSISTANT BUTTON (POSITIONED DIRECTLY ABOVE WHATSAPP) */}
        <div className="flex items-center gap-2">
          {/* Subtle Attention Bubble on desktop */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-amber-400/40 text-amber-300 text-[11px] font-semibold shadow-lg backdrop-blur-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ask AL Khair AI 24/7</span>
          </div>

          <button
            onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
            title="Chat with AL Khair AI Assistant"
            aria-label="AL Khair AI Assistant"
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-900 to-amber-950 border-2 border-amber-400 hover:border-amber-300 text-amber-400 hover:text-white flex items-center justify-center shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-md group animate-float-slow"
          >
            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-amber-400 group-hover:text-amber-300 stroke-[2.2] group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-neutral-900 animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-neutral-900" />
            </div>
          </button>
        </div>

        {/* 2. WHATSAPP & PHONE CONTROLS (POSITIONED DIRECTLY BELOW AI ASSISTANT) */}
        <div className="flex items-center gap-2">
          {/* Direct Phone Call Button */}
          <a
            href={`tel:${rawPhone}`}
            title={`Call Studio: ${settings.phone}`}
            aria-label={`Call Studio: ${settings.phone}`}
            className="w-11 h-11 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-amber-400 hover:border-amber-400 flex items-center justify-center shadow-xl backdrop-blur-md transition-all active:scale-95"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Authentic WhatsApp Button (LOGO ONLY with Radar Pulse) */}
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat directly on WhatsApp"
              aria-label="WhatsApp Chat"
              className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <WhatsAppIcon className="w-8 h-8 fill-white drop-shadow-md group-hover:scale-110 transition-transform" size={32} />
            </a>
          </div>

          {/* Quick Menu Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            title="More Contact Options"
            aria-label="More Contact Options"
            className="w-11 h-11 rounded-full bg-neutral-900/90 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
};
