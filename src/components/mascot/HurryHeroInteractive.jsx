import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HurryHeroInteractive() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = (e) => {
    if (e) e.stopPropagation();

    setIsClicked(true);

    try {
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FF751F', '#FFA05C', '#1A1A1A', '#FFFFFF']
      });
    } catch (err) {
      // Confetti fallback
    }

    setTimeout(() => {
      navigate('/contact?source=hero-brand-showcase');
    }, 400);
  };

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none select-none">
      
      {/* Ambient Brand Glow Aura */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-[#FF751F]/30 via-amber-400/15 to-transparent rounded-[42px] blur-2xl pointer-events-none"></div>

      {/* 1. Animated Floating Technical Badge Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.92 }}
        animate={{ 
          opacity: 1, 
          y: isHovered ? -6 : [0, -6, 0],
          scale: isHovered ? 1.03 : 1
        }}
        transition={{ 
          y: isHovered 
            ? { duration: 0.2 } 
            : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.25 }
        }}
        className="absolute -top-12 -left-2 sm:-left-8 z-30 w-[300px] sm:w-[330px]"
      >
        <div className="relative p-4 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#FF751F]/40 shadow-2xl space-y-3">
          
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#1A1A1A] p-2 flex items-center justify-center shrink-0 border border-white/20 shadow-md">
              <img 
                src="/brand-logo-icon.png" 
                alt="Hare Sportswear Brand Icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#1A1A1A] tracking-tight">Hare Sportswear & Goods</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs font-bold text-[#FF751F] mt-0.5 leading-snug">
                Engineered For Championship Performance
              </p>
            </div>
          </div>

          <p className="text-[11px] text-[#595856] leading-relaxed">
            ⚡ Direct Sialkot factory OEM/ODM: 7-day rapid physical strike-offs, low 25 MOQ, and worldwide DDP courier delivery.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCardClick}
              className="flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center gap-1.5 active:scale-95 group"
            >
              <span>Request Factory Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <Link
              to="/meet-hare"
              className="py-2 px-3 rounded-xl bg-[#FAF8F3] hover:bg-white text-[#1A1A1A] border border-[#E5DFD5] hover:border-[#FF751F] text-[11px] font-bold transition-all"
            >
              Brand Story
            </Link>
          </div>

          {/* Speech Bubble Triangular Pointer Tail */}
          <div className="absolute -bottom-2.5 left-10 w-5 h-5 bg-white border-r-2 border-b-2 border-[#FF751F]/40 transform rotate-45"></div>
        </div>
      </motion.div>

      {/* 2. Interactive Brand Emblem Card */}
      <motion.div
        animate={
          isClicked 
            ? { scale: [1, 0.94, 1.08, 1], rotate: [0, -3, 3, 0] }
            : { y: [0, -8, 0] }
        }
        transition={
          isClicked 
            ? { duration: 0.45, ease: 'easeOut' }
            : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(e);
          }
        }}
        className="relative rounded-3xl overflow-hidden bg-[#1A1A1A] border-2 border-[#FF751F]/50 p-4 shadow-2xl group cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Click to start custom sportswear production with Hare Sportswear & Goods"
        title="Click to request a custom manufacturing quote!"
      >
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-[#242220] via-[#1A1A1A] to-[#0E0D0C] flex flex-col justify-between p-6">
          
          {/* Subtle Technical Blueprint Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Centered Brand Orange Ambient Flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF751F]/25 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          {/* Top Row: Official Emblem Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white shadow-sm uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FF751F]" />
              Official Brand Icon
            </span>

            <div className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sialkot Factory HQ</span>
            </div>
          </div>

          {/* Center Stage: Bold Dynamic Letter H Brand Emblem */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-6">
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4 }}
              className="relative p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md group-hover:border-[#FF751F]/60 transition-colors"
            >
              <img
                src="/brand-logo-icon.png"
                alt="Hare Sportswear & Goods Official Logo"
                className="w-48 sm:w-56 h-auto object-contain drop-shadow-[0_12px_24px_rgba(255,117,31,0.35)] select-none"
              />
            </motion.div>
            
            <p className="mt-4 text-xs font-mono uppercase tracking-[0.25em] text-[#FF751F] font-bold">
              Aerodynamic Speed • Precision Craft
            </p>
          </div>

          {/* Interactive Floating Hover Prompt */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-5 py-2.5 rounded-2xl bg-[#FF751F] text-white text-xs font-bold shadow-2xl flex items-center gap-2 pointer-events-none"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Click to Start Production!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Technical Specifications Card */}
          <div className="relative z-10 p-4 rounded-2xl bg-[#141312]/90 backdrop-blur-md border border-white/15 text-white space-y-2 pointer-events-none shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                B2B Manufacturing Standard
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Rapid 7-Day Samples
              </span>
            </div>
            
            <h4 className="font-display font-bold text-sm sm:text-base text-white">
              "Tour-grade custom uniforms, teamwear & goods built to technical specs."
            </h4>
            
            <div className="flex items-center justify-between text-xs text-[#D9D2C6] pt-1.5 border-t border-white/10 font-mono text-[11px]">
              <span>25 Sets MOQ</span>
              <span>•</span>
              <span>Kiian Italian Dye</span>
              <span>•</span>
              <span>Direct DDP Air Export</span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 3. Floating Quick Capacity Pill */}
      <div className="absolute -bottom-5 -right-2 sm:-right-4 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E5DFD5] shadow-xl pointer-events-none">
        <div className="p-2 rounded-xl bg-[#FF751F]/15 text-[#FF751F]">
          <Zap className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-[#1A1A1A]">150,000+ Units/Mo</p>
          <p className="text-[10px] text-[#595856]">Continuous Factory Output</p>
        </div>
      </div>

    </div>
  );
}
