import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, CheckCircle2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HurryHeroInteractive() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleMascotClick = (e) => {
    // Prevent accidental parent bubble triggers
    if (e) e.stopPropagation();

    setIsClicked(true);
    setClickCount(prev => prev + 1);

    // Trigger celebratory confetti burst with brand colors
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF751F', '#FFA05C', '#1A1A1A', '#FFFFFF']
      });
    } catch (err) {
      // Confetti fallback safely ignored
    }

    // Smooth redirect after playful bounce animation
    setTimeout(() => {
      navigate('/contact?source=hurry-mascot');
    }, 450);
  };

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none select-none">
      
      {/* Ambient Glow Aura */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-[#FF751F]/25 via-amber-300/15 to-transparent rounded-[42px] blur-2xl pointer-events-none"></div>

      {/* 1. SayNine-Style Animated Floating Speech Bubble */}
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
        className="absolute -top-12 -left-2 sm:-left-8 z-30 w-[290px] sm:w-[320px]"
      >
        <div className="relative p-4 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#FF751F]/40 shadow-2xl space-y-3">
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center font-bold text-xl shrink-0 shadow-inner">
              🐰
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#1A1A1A] tracking-tight">Hurry the Hare</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs font-bold text-[#1A1A1A] mt-0.5 leading-snug">
                "Need custom sportswear? Let's manufacture your brand!"
              </p>
            </div>
          </div>

          <p className="text-[11px] text-[#595856] leading-relaxed">
            ⚡ 7-day rapid samples, low 25-piece MOQs, and direct Sialkot factory DDP shipping.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleMascotClick}
              className="flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center gap-1.5 active:scale-95 group"
            >
              <span>Get a Quick Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <Link
              to="/meet-hare"
              className="py-2 px-3 rounded-xl bg-[#FAF8F3] hover:bg-white text-[#1A1A1A] border border-[#E5DFD5] hover:border-[#FF751F] text-[11px] font-bold transition-all"
            >
              Story 👋
            </Link>
          </div>

          {/* Speech Bubble Triangular Pointer Tail */}
          <div className="absolute -bottom-2.5 left-10 w-5 h-5 bg-white border-r-2 border-b-2 border-[#FF751F]/40 transform rotate-45"></div>
        </div>
      </motion.div>

      {/* 2. Interactive Mascot Card with Framer Motion */}
      <motion.div
        animate={
          isClicked 
            ? { scale: [1, 0.92, 1.12, 1], rotate: [0, -4, 4, 0] }
            : { y: [0, -8, 0] }
        }
        transition={
          isClicked 
            ? { duration: 0.45, ease: 'easeOut' }
            : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.96 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleMascotClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMascotClick(e);
          }
        }}
        className="relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] p-3 shadow-premium group cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Click to start custom sportswear production with Hurry the Hare"
        title="Click Hurry to start your RFQ!"
      >
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF8F3]">
          
          {/* Main 3D Mascot Image */}
          <motion.img
            src="/images/mascot/hurry-hero.jpg"
            alt="Hurry the Hare - Athletic 3D Mascot for Hare Sportswear & Goods"
            className="w-full h-full object-cover select-none"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Gradient Overlay for bottom card legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10 pointer-events-none"></div>

          {/* Top-Right Status Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 text-xs text-[#1A1A1A] shadow-md flex items-center gap-1.5 font-bold pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Click Me to Quote!</span>
          </div>

          {/* Interactive Floating Hover Prompt */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 py-2 rounded-2xl bg-[#FF751F] text-white text-xs font-bold shadow-2xl flex items-center gap-2 pointer-events-none"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Click to Start Production!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Card Meta */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#1A1A1A]/95 backdrop-blur-md border border-white/10 text-white space-y-2 pointer-events-none">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Official Brand Mascot
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Rapid 7-Day Samples
              </span>
            </div>
            <h4 className="font-display font-bold text-base text-white">
              "Your team designs brought to life in record time!"
            </h4>
            <div className="flex items-center justify-between text-xs text-cream-200 pt-1 border-t border-white/10">
              <span>Low 25 MOQ</span>
              <span>•</span>
              <span>Kiian Inks</span>
              <span>•</span>
              <span>Direct Sialkot OEM</span>
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
