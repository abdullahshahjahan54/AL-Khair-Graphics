import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Printer,
  Play,
  Pause,
  Maximize2,
  Facebook,
  ExternalLink,
  Video
} from 'lucide-react';
import { BusinessSettings } from '../types';

interface HeroProps {
  settings: BusinessSettings;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onOpenQuote }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewFacebookEmbed, setViewFacebookEmbed] = useState(false);

  const fbReelUrl = "https://www.facebook.com/reel/872255749213750";
  const fbEmbedUrl = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F872255749213750&show_text=0&width=500";

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const openFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const scrollToWork = () => {
    const el = document.querySelector('#portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-neutral-950 bg-grid-pattern"
    >
      {/* Ambient background glow & geometric accent lines */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Creative Agency Typography & Value Props */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            {/* Status & Location Pill Badges */}
            <motion.div 
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              {/* 24 Hours Status Badge */}
              <div 
                id="hero-status-badge"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-sm backdrop-blur-md"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <Clock className="w-3.5 h-3.5" />
                <span>OPEN 24 HOURS</span>
              </div>

              {/* Location Tag */}
              <div 
                id="hero-location-badge"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-xs font-semibold backdrop-blur-md"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Dera Ismail Khan, Pakistan</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                Creative Designs. <br />
                <span className="text-shimmer font-black">
                  Printing Your Dreams.
                </span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  Powerful Advertising.
                </span>
              </h1>
              <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
                AL Khair Graphics delivers masterclass graphic design, wide-format Panaflex printing, and outdoor billboard advertising across Dera Ismail Khan and KPK.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="hero-cta-quote-btn"
                onClick={onOpenQuote}
                className="group px-7 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-base rounded-full shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 transition-all duration-300 flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 fill-neutral-950 transition-transform group-hover:rotate-12" />
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-explore-btn"
                onClick={scrollToWork}
                className="px-7 py-4 bg-neutral-900/90 hover:bg-neutral-800 text-white hover:text-amber-300 font-semibold text-base rounded-full border border-neutral-700/80 hover:border-neutral-600 active:scale-95 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>Explore Our Work</span>
              </button>
            </motion.div>

            {/* Trust highlights under CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800/60 max-w-xl text-xs sm:text-sm text-neutral-400 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Custom Graphics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Heavy Flex &amp; Print</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7 Availability</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Featured Video Showcase from Facebook Reel */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center">
            
            {/* Visual Frame Container */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square sm:aspect-[4/4.8]">
              
              {/* Floating Badge 1: 1440 DPI Precision Print (Animated Float Slow) */}
              <div className="absolute -top-5 -right-3 sm:-right-6 z-30 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-900/95 border border-amber-400/40 text-white shadow-2xl shadow-amber-500/20 backdrop-blur-md animate-float-slow">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-extrabold text-amber-300">✨ 1440 DPI Print Output</span>
              </div>

              {/* Floating Badge 2: 24/7 Rapid Turnaround (Animated Float Reverse) */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 z-30 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-900/95 border border-emerald-500/40 text-white shadow-2xl backdrop-blur-md animate-float-reverse">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-extrabold text-emerald-300">🚀 24/7 Express Turnaround</span>
              </div>

              {/* Offset Background Accent Card */}
              <motion.div
                initial={{ opacity: 0, rotate: -4, scale: 0.95 }}
                animate={{ opacity: 1, rotate: -3, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="absolute -top-3 -left-3 sm:-left-5 w-full h-full rounded-3xl bg-neutral-900/60 border border-amber-500/20 -z-10 shadow-2xl backdrop-blur-sm"
              />

              {/* Main Featured Video Card */}
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full rounded-3xl overflow-hidden bg-neutral-900 border-2 border-amber-400/40 shadow-2xl shadow-amber-500/10 flex flex-col group"
              >
                {/* Header Bar */}
                <div className="p-3 sm:p-3.5 bg-neutral-950/90 border-b border-neutral-800/80 flex items-center justify-between z-20 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide font-display flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-amber-400" />
                      AL Khair Studio Reel
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Switcher: Native HD vs FB Embed */}
                    <button
                      onClick={() => setViewFacebookEmbed(!viewFacebookEmbed)}
                      title="Toggle Facebook Embed"
                      className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700 font-medium flex items-center gap-1"
                    >
                      {viewFacebookEmbed ? 'HD Video' : 'FB Player'}
                    </button>

                    {/* Direct Facebook Link */}
                    <a
                      href={fbReelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Facebook Reel in new tab"
                      className="px-2.5 py-1 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#4ea3ff] hover:text-white border border-[#1877F2]/40 text-[11px] font-semibold flex items-center gap-1 transition-all"
                    >
                      <Facebook className="w-3 h-3 fill-current" />
                      <span className="hidden xs:inline">Reel</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Video Container */}
                <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center">
                  {viewFacebookEmbed ? (
                    /* Official Facebook Embed Player */
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <iframe
                        src={fbEmbedUrl}
                        title="AL Khair Graphics Facebook Reel"
                        className="w-full h-full border-0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    /* Ultra-smooth HD Native Player */
                    <div className="relative w-full h-full flex items-center justify-center group/video">
                      <video
                        ref={videoRef}
                        src="/uploads/hero_reel.mp4"
                        poster="/uploads/al_khair_reel_poster.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-center"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />

                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/30" />

                      {/* Floating Play/Pause Center Indicator on Hover or Pause */}
                      {!isPlaying && (
                        <button
                          onClick={togglePlay}
                          aria-label="Play video"
                          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-neutral-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 transition-all transform hover:scale-110"
                        >
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </button>
                      )}

                      {/* On-video Floating Controls Bar */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                        {/* Play & Quality Status */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                            className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center border border-neutral-700/80 backdrop-blur-md transition-all active:scale-90"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                          </button>

                          <div className="px-3 h-8 rounded-full bg-neutral-900/85 border border-amber-500/30 backdrop-blur-md text-xs font-semibold text-neutral-200 flex items-center gap-1.5 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[11px] text-amber-300 font-extrabold tracking-wide">HD 1440p</span>
                            <span className="text-[10px] text-neutral-400 font-normal border-l border-neutral-700 pl-1.5">Silent Reel</span>
                          </div>
                        </div>

                        {/* Fullscreen Trigger */}
                        <button
                          onClick={openFullscreen}
                          aria-label="Watch Fullscreen"
                          title="Fullscreen"
                          className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center border border-neutral-700/80 backdrop-blur-md transition-all active:scale-90"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Sub-bar with Live Production Details */}
                <div className="p-3 bg-neutral-950/95 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <div>
                      <p className="font-bold text-white text-xs leading-none">AL Khair Graphics &amp; Advertising</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">Dera Ismail Khan • 24 Hours Open</p>
                    </div>
                  </div>

                  <a
                    href={fbReelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-semibold text-[11px] flex items-center gap-1 group/fb"
                  >
                    <span>Watch on FB</span>
                    <ArrowRight className="w-3 h-3 group-hover/fb:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>

              {/* Top-Left Floating Trust Badge (GS Enterprises style) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -top-4 -left-3 sm:-left-6 z-30 bg-neutral-900/95 text-white px-3.5 py-2.5 rounded-2xl shadow-2xl shadow-amber-500/10 border border-amber-400/40 flex items-center gap-2.5 backdrop-blur-md animate-float-slow"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center font-bold text-xs">
                  ⚡
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 leading-none">
                    Guaranteed Turnaround
                  </p>
                  <p className="text-xs font-extrabold text-white mt-0.5">
                    24/7 Production
                  </p>
                </div>
              </motion.div>

              {/* Floating Decorative Agency Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 right-4 sm:-right-3 z-30 bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 p-3.5 sm:p-4 rounded-2xl shadow-2xl shadow-amber-500/40 border border-amber-300 flex items-center gap-3 backdrop-blur-md animate-float-reverse"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-amber-400 flex items-center justify-center font-extrabold text-lg shadow-inner">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-900 leading-none">
                    AL Khair Studio
                  </p>
                  <p className="text-xs sm:text-sm font-black text-neutral-950 font-display mt-0.5">
                    Live Printing Reel
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
