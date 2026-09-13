import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Minimize2, 
  RefreshCw, 
  FileText, 
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BusinessSettings } from '../types';
import { api } from '../api';

interface AIAssistantWidgetProps {
  settings: BusinessSettings;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: (preselectedService?: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedAction?: 'quote' | 'whatsapp';
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'msg_welcome',
  role: 'assistant',
  content: 'Assalam-o-Alaikum! Main AL Khair Graphics ka AI Design & Printing Assistant hoon. 🎨\n\nAap mujhse Flex printing rates, 3D Wallpapers, Billboards, Business Cards, Logo designing ya Dera Ismail Khan me 24/7 delivery ke baray me pooch saktay hain!',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const SUGGESTED_QUESTIONS = [
  'Flex Printing rates & qualities?',
  '3D Wallpapers varieties for room?',
  'Emergency 24/7 printing in D.I. Khan?',
  'Visiting card 1000 cards cost?',
  'Shop Sign Board & 3D Letters design?'
];

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  settings,
  isOpen,
  onClose,
  onOpenQuote
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const rawWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Build history for context
      const history = messages.slice(-5).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await api.sendChatMessage(text, history);

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `ai_err_${Date.now()}`,
        role: 'assistant',
        content: `Assalam-o-Alaikum! AL Khair Graphics Dera Ismail Khan me 24/7 khula hai. Aap direct hamari team se WhatsApp par rabta kar saktay hain: ${settings.whatsappNumber} ya call karein: ${settings.phone}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] max-h-[82vh] h-[580px] bg-neutral-900/95 border border-neutral-700/80 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
      role="dialog"
      aria-label="AL Khair Graphics AI Assistant"
    >
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border-b border-neutral-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Bot className="w-5 h-5 text-neutral-950 stroke-[2.3]" />
            </div>
            {/* Live Indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-sm text-white leading-tight">
                AL Khair AI Assistant
              </h3>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400 text-neutral-950 uppercase tracking-wider">
                24/7
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
              <span>Printing &amp; Design Consultant</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Online</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            title="Reset conversation"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            title="Close Assistant"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-neutral-950/60 scrollbar-thin scrollbar-thumb-neutral-800">
        
        {/* Info Banner */}
        <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Ask in <strong>English</strong>, <strong>Urdu</strong>, or <strong>Roman Urdu</strong>!</span>
          </div>
          <span className="text-neutral-500 font-mono text-[10px]">D.I. Khan</span>
        </div>

        {/* Message Bubbles */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-400 text-neutral-950 font-medium rounded-br-none shadow-md'
                  : 'bg-neutral-850 bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">
                {msg.content}
              </div>
            </div>

            <span className="text-[10px] text-neutral-500 mt-1 px-1">
              {msg.timestamp}
            </span>

            {/* In-chat shortcuts for assistant replies */}
            {msg.role === 'assistant' && msg.id !== 'msg_welcome' && (
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-[11px] font-semibold text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  <span>Request Custom Quote</span>
                </button>

                <a
                  href={`https://wa.me/${rawWhatsapp}?text=${encodeURIComponent('Assalam-o-Alaikum, I was chatting with AL Khair AI and would like to place an order.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5 transition-colors"
                >
                  <WhatsAppIcon className="w-3 h-3 fill-emerald-400" size={12} />
                  <span>Confirm on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        ))}

        {/* Typing Loading State */}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-amber-400 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 w-fit">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] text-neutral-400 ml-1">AL Khair AI typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2 border-t border-neutral-800 bg-neutral-900/60 overflow-x-auto scrollbar-none flex gap-2 shrink-0">
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 text-[11px] transition-all disabled:opacity-50 shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-neutral-900 border-t border-neutral-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Poochiye... (Urdu, English, Roman Urdu)"
            className="flex-1 px-4 py-2.5 bg-neutral-950 border border-neutral-700 text-white rounded-xl text-xs placeholder-neutral-500 focus:outline-none focus:border-amber-400 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-neutral-950 flex items-center justify-center font-bold shrink-0 transition-all active:scale-95 shadow-md shadow-amber-500/10"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-2 px-1">
          <span>AL Khair Graphics • 24/7 Support</span>
          <span>D.I. Khan Line: {settings.phone}</span>
        </div>
      </div>

    </div>
  );
};
