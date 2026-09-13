import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle2
} from 'lucide-react';
import { BusinessSettings } from '../types';

interface TrustBarProps {
  settings: BusinessSettings;
  onContactClick: () => void;
}

// Animated counting number hook
const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800; // 1.8s
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * value));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-extrabold font-display">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const TrustBar: React.FC<TrustBarProps> = ({ settings, onContactClick }) => {
  const stats = [
    { label: 'Completed Orders', value: 15000, suffix: '+', icon: CheckCircle2, sub: 'Flex, Billboards & Cards' },
    { label: 'Corporate Partners', value: 100, suffix: '+', icon: Award, sub: 'Banks, Brands & Govt' },
    { label: 'Production Capacity', value: 24, suffix: '/7', icon: Clock, sub: 'Non-stop Wide-Format' },
    { label: 'Quality Satisfaction', value: 99.8, suffix: '%', icon: TrendingUp, sub: 'High DPI Color Precision' },
  ];

  return (
    <section 
      id="trust-bar" 
      className="relative z-20 border-y border-neutral-800 bg-neutral-900/95 backdrop-blur-xl py-6 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Info Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
          
          {/* Brand Identity & Category */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-white text-lg tracking-tight flex items-center gap-2">
                <span>{settings.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 font-mono">
                  VERIFIED
                </span>
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {settings.category}
              </p>
            </div>
          </div>

          {/* Location Info */}
          <div className="flex items-center gap-3 text-neutral-300">
            <div className="w-9 h-9 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex items-center justify-center text-amber-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs text-neutral-400 font-medium">Headquarters</p>
              <p className="text-sm font-semibold text-white">Dera Ismail Khan, KPK</p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-center gap-3 text-neutral-300">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs text-neutral-400 font-medium">Operations</p>
              <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Open 24 Hours
              </p>
            </div>
          </div>

          {/* Phone Direct */}
          <div className="flex items-center gap-3 text-neutral-300">
            <div className="w-9 h-9 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex items-center justify-center text-amber-400 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs text-neutral-400 font-medium">Phone Support</p>
              <a 
                href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                className="text-sm font-bold text-white hover:text-amber-400 transition-colors"
              >
                {settings.phone}
              </a>
            </div>
          </div>

          {/* CTA Action */}
          <div className="shrink-0 w-full sm:w-auto">
            <button
              id="trust-bar-contact-btn"
              onClick={onContactClick}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Free Instant Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Animated Statistics Row (GS Enterprises Inspired) */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 hover:border-amber-500/40 transition-all duration-300 flex items-center gap-3.5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800/80 group-hover:bg-amber-400 text-neutral-300 group-hover:text-neutral-950 flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
                    {stat.value === 99.8 ? (
                      <span className="font-extrabold font-display">99.8%</span>
                    ) : stat.value === 24 ? (
                      <span className="font-extrabold font-display">24/7</span>
                    ) : (
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <p className="text-xs font-bold text-neutral-300">{stat.label}</p>
                  <p className="text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors">{stat.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

