import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, X, Volume2, VolumeX, Sparkles } from 'lucide-react';

/**
 * CircularVideoHover
 * Wraps text or custom trigger elements with a sleek, animated circular video preview
 * that plays smoothly on hover and can expand into a full lightbox video modal.
 */
export default function CircularVideoHover({
  text,
  children,
  videoSrc = '/videos/factory-production-showcase.mp4',
  label = 'Sialkot Manufacturing Floor',
  badge = 'LIVE 4K',
  size = 'md', // 'sm' | 'md' | 'lg'
  allowModal = true,
  className = ''
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [position, setPosition] = useState('top'); // 'top' or 'bottom'
  const triggerRef = useRef(null);
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Size mapping for the circular viewport
  const sizeClasses = {
    sm: 'w-40 h-40',
    md: 'w-52 h-52 sm:w-56 sm:h-56',
    lg: 'w-60 h-60 sm:w-64 sm:h-64'
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    
    // Check viewport space to flip position if too close to top
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      if (rect.top < 260) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Add micro-debounce to allow mouse to enter the circular preview window seamlessly
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  const handleClick = (e) => {
    if (allowModal) {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(true);
    }
  };

  // Keep modal video in sync
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {});
    }
  }, [isModalOpen]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`relative inline-block cursor-pointer select-none group/video-trigger ${className}`}
      >
        {/* Interactive Text / Element with Warm Glow Underline & Mini Play Indicator */}
        <span className="inline-flex items-center gap-1 font-semibold text-[#1A1A1A] group-hover/video-trigger:text-[#FF751F] border-b-2 border-[#FF751F]/50 group-hover/video-trigger:border-[#FF751F] transition-all duration-200 pb-0.5">
          {children || text}
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#FF751F]/15 text-[#FF751F] group-hover/video-trigger:bg-[#FF751F] group-hover/video-trigger:text-white transition-all transform group-hover/video-trigger:scale-110 ml-0.5 shrink-0 shadow-sm">
            <Play className="w-2 h-2 fill-current ml-0.5" />
          </span>
        </span>

        {/* Circular Floating Video Preview Window */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.35, y: position === 'top' ? 15 : -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.35, y: position === 'top' ? 10 : -10 }}
              transition={{ type: 'spring', damping: 22, stiffness: 320 }}
              onMouseEnter={() => {
                if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                setIsHovered(true);
              }}
              onMouseLeave={handleMouseLeave}
              className={`absolute left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto ${
                position === 'top' ? 'bottom-full mb-4' : 'top-full mt-4'
              }`}
            >
              {/* Outer Glowing Conic Halo */}
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#FF751F]/40 via-amber-400/30 to-[#FF751F]/40 blur-md opacity-90 animate-pulse pointer-events-none" />

                {/* Main Circular Video Frame */}
                <div
                  className={`${sizeClasses[size]} relative rounded-full overflow-hidden border-[3px] border-[#FF751F] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(255,117,31,0.35)] ring-4 ring-white/90 bg-black cursor-pointer group/circle`}
                  onClick={handleClick}
                >
                  {/* Performance-Optimized Autoplay Video */}
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover scale-110 group-hover/circle:scale-125 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

                  {/* Top Status Pill: LIVE RECORDING INDICATOR */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="text-[9px] font-black tracking-widest text-white uppercase">
                        {badge}
                      </span>
                    </div>
                  </div>

                  {/* Center Hover Play/Expand Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/circle:opacity-100 transition-opacity duration-200 z-20 pointer-events-none bg-black/30 backdrop-blur-[2px]">
                    <div className="w-10 h-10 rounded-full bg-[#FF751F] text-white flex items-center justify-center shadow-lg transform group-hover/circle:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Text Pill: Location & Factory Spec */}
                  <div className="absolute bottom-3 inset-x-3 text-center z-20 pointer-events-none">
                    <p className="text-[10px] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate px-2 font-display">
                      {label}
                    </p>
                    <p className="text-[8px] font-semibold text-[#FF751F] uppercase tracking-wider drop-shadow-sm">
                      Click to Expand ↗
                    </p>
                  </div>
                </div>

                {/* Subtle Pointer Triangle towards the trigger text */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF751F] rotate-45 pointer-events-none ${
                    position === 'top' ? '-bottom-1.5' : '-top-1.5'
                  }`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </span>

      {/* Cinematic Full-Screen Video Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#1A1A1A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <h3 className="text-white font-bold font-display text-base sm:text-lg flex items-center gap-2">
                      <span>{label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#FF751F]/20 text-[#FF751F] font-mono border border-[#FF751F]/30">
                        Sialkot Factory
                      </span>
                    </h3>
                    <p className="text-xs text-[#A0988A]">
                      Multi-needle automated embroidery, laser cutting, and precision 4-needle flatlock stitching.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Close Video"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Video Player Box */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={modalVideoRef}
                  src={videoSrc}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Footer Specs Bar */}
              <div className="px-6 py-3.5 bg-black/60 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#D4CDC3]">
                <div className="flex items-center gap-4">
                  <span>⚡ <strong>ISO 9001:2015</strong> Audited</span>
                  <span>🪡 <strong>140+</strong> Juki &amp; Tajima Units</span>
                  <span>📦 <strong>7-Day</strong> Sample Turnaround</span>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-bold text-[#FF751F] hover:text-white transition-colors"
                >
                  <span>Request Factory Visit or Quote</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Standalone Spinning Circular Video Badge
 * Ideal for Hero sections or About page cards, featuring a smooth spinning SVG text path
 * surrounding an autoplaying circular video portal!
 */
export function SpinningCircularVideoBadge({
  videoSrc = '/videos/factory-production-showcase.mp4',
  title = 'SIALKOT FACTORY • PRECISION STITCHING • 2026 •',
  sublabel = 'FACTORY TOUR',
  size = 'md',
  onClick
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32 sm:w-36 sm:h-36',
    lg: 'w-40 h-40 sm:w-44 sm:h-44'
  };

  const handleOpen = () => {
    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div 
        onClick={handleOpen}
        className={`relative ${sizeClasses[size]} cursor-pointer group/spin-badge select-none shrink-0`}
        title="Click to watch Sialkot factory production showcase"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-[#FF751F]/20 blur-xl group-hover/spin-badge:bg-[#FF751F]/40 transition-colors" />

        {/* Outer Rotating SVG Circular Text */}
        <div className="absolute inset-0 animate-[spin_16s_linear_infinite] pointer-events-none group-hover/spin-badge:[animation-duration:8s] transition-all">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              id="spinTextPath"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
            <text className="text-[7.5px] font-bold uppercase tracking-[0.2em] fill-[#1A1A1A] group-hover/spin-badge:fill-[#FF751F] transition-colors font-mono">
              <textPath href="#spinTextPath" startOffset="0%">
                {title}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center Circular Autoplay Video */}
        <div className="absolute inset-[15%] rounded-full overflow-hidden border-2 border-[#FF751F] shadow-lg ring-2 ring-white/80 bg-black group-hover/spin-badge:scale-105 transition-transform duration-300">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-110 group-hover/spin-badge:scale-125 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover/spin-badge:bg-transparent transition-colors" />
          
          {/* Center Play Icon Indicator on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover/spin-badge:opacity-100 transition-opacity">
            <div className="w-6 h-6 rounded-full bg-[#FF751F] text-white flex items-center justify-center shadow-md">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal when clicked */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-[#1A1A1A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF751F] animate-pulse" />
                  <span className="text-white font-bold font-display text-base">
                    Sialkot Factory Production Floor (Showcase Tour)
                  </span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  src={videoSrc}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
