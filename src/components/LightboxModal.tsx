import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export interface LightboxItem {
  title: string;
  category: string;
  image: string;
  description?: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/95 backdrop-blur-2xl p-4 sm:p-8 select-none"
      onClick={onClose}
    >
      {/* Top Header Controls */}
      <div 
        className="absolute top-6 inset-x-6 z-20 flex items-center justify-between text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-neutral-950 shadow-md">
            {currentItem.category}
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            {currentIndex + 1} of {items.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
            title={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 transition-all hover:scale-110 shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 transition-all hover:scale-110 shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image and Caption Container */}
      <div 
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`overflow-hidden rounded-2xl flex items-center justify-center max-h-[70vh] transition-all duration-300 ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`}
             onClick={() => setIsZoomed(!isZoomed)}>
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption bar */}
        <div className="mt-4 text-center max-w-2xl px-4 space-y-1">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            {currentItem.title}
          </h3>
          {currentItem.description && (
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {currentItem.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
