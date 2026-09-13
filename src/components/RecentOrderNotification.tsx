import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface OrderEvent {
  customer: string;
  location: string;
  item: string;
  timeAgo: string;
  icon: string;
}

const mockOrders: OrderEvent[] = [
  { customer: 'Muhammad Tariq', location: 'Circular Road, D.I. Khan', item: '1,000 Spot UV Visiting Cards', timeAgo: '2 minutes ago', icon: '💳' },
  { customer: 'Farhan Electronics', location: 'Hamza Market, D.I. Khan', item: 'Backlit Panaflex Signboard (20x4 ft)', timeAgo: '5 minutes ago', icon: '🏙️' },
  { customer: 'Zainab Academy', location: 'Cantt Area, D.I. Khan', item: '50 Customized Event Polo T-Shirts', timeAgo: '8 minutes ago', icon: '👕' },
  { customer: 'Dr. Shahbaz Clinic', location: 'Topanwala Chowk, D.I. Khan', item: 'Official Letterheads & Prescription Pads', timeAgo: '12 minutes ago', icon: '📄' },
  { customer: 'Gomal Institute', location: 'University Road, D.I. Khan', item: '120 Ceramic Sublimation Gift Mugs', timeAgo: '16 minutes ago', icon: '☕' },
  { customer: 'Al-Hadi Trading', location: 'Bannu Road, D.I. Khan', item: 'Company Die-Cut Packaging Boxes', timeAgo: '21 minutes ago', icon: '📦' },
  { customer: 'Inam Ullah Advocate', location: 'District Courts, D.I. Khan', item: 'Self-Inking Trodat Rubber Stamp', timeAgo: '26 minutes ago', icon: '🖋️' },
  { customer: 'Khyber Diagnostic Lab', location: 'Commissionery Bazar, D.I. Khan', item: '250 PVC Smart Employee Cards', timeAgo: '32 minutes ago', icon: '🪪' },
];

export const RecentOrderNotification: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show after initial 4 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Rotate every 12 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockOrders.length);
        setVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const currentOrder = mockOrders[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-none sm:pointer-events-auto">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-neutral-900/95 border border-amber-500/30 text-white shadow-2xl backdrop-blur-xl flex items-center gap-3.5 relative group pointer-events-auto"
          >
            {/* Pulsing Green Indicator */}
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-xl shrink-0">
              {currentOrder.icon}
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[11px] font-bold text-amber-300 truncate">
                  Recent Verified Order
                </p>
                <span className="text-[10px] text-neutral-400 font-mono">
                  • {currentOrder.timeAgo}
                </span>
              </div>
              <p className="text-xs font-semibold text-white truncate">
                {currentOrder.item}
              </p>
              <p className="text-[10px] text-neutral-400 truncate">
                {currentOrder.customer} — {currentOrder.location}
              </p>
            </div>

            {/* Dismiss button */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 p-1 text-neutral-500 hover:text-white rounded-full transition-colors"
              title="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
