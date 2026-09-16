import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MessageCircle, ArrowRight, X, Sparkles, Send } from 'lucide-react';

export default function FloatingCornerMascot({ scrollProgress = 0 }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [hasDismissedBubble, setHasDismissedBubble] = useState(false);

  // Show mascot only after the reader has scrolled down past the header (e.g. 220px or 6%)
  useEffect(() => {
    const checkScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 220);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // SayNine inspired adaptive messages based on reading depth
  const bubbleContent = React.useMemo(() => {
    if (scrollProgress < 30) {
      return {
        headline: "Need custom kits? Let's talk! 🐰",
        subtext: "Turn your tech pack into physical samples in 7 days.",
        cta: "Request Quote",
        badge: "Sialkot Factory Direct",
      };
    } else if (scrollProgress < 65) {
      return {
        headline: "Have tech pack questions? 💡",
        subtext: "Free spec sheet audit & GSM advice from our engineers.",
        cta: "Ask Our Team",
        badge: "Free Spec Audit",
      };
    } else if (scrollProgress < 85) {
      return {
        headline: "Low MOQs Available! ⚡",
        subtext: "Start from just 30–50 pcs with pro dye-sublimation.",
        cta: "View MOQs",
        badge: "Low MOQ Production",
      };
    } else {
      return {
        headline: "Ready to manufacture? 🚀",
        subtext: "Let's build your upcoming teamwear collection.",
        cta: "Start Your RFQ",
        badge: "Get Instant Quote",
      };
    }
  }, [scrollProgress]);

  const handleMascotClick = (e) => {
    if (e) e.stopPropagation();
    setIsBouncing(true);

    // Trigger celebratory brand confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { x: 0.1, y: 0.8 },
        colors: ['#FF751F', '#FFA05C', '#1A1A1A', '#FFFFFF']
      });
    } catch (err) {
      // safe fallback
    }

    // Direct redirect to RFQ / Contact page after joyful bounce animation
    setTimeout(() => {
      navigate('/contact?source=hurry-floating-mascot');
    }, 420);
  };

  const handleBubbleDismiss = (e) => {
    e.stopPropagation();
    setIsBubbleOpen(false);
    setHasDismissedBubble(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <aside
          aria-label="Hurry the Hare - Interactive Manufacturing Assistant"
          className="fixed bottom-5 left-4 sm:bottom-8 sm:left-8 z-40 select-none flex flex-col items-start pointer-events-none"
        >
          {/* ========================================================= */}
          {/* 1. SayNine-Inspired Dynamic Floating Speech Bubble */}
          {/* ========================================================= */}
          <AnimatePresence>
            {isBubbleOpen && !hasDismissedBubble && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.88, originX: 0.1, originY: 1 }}
                animate={{ 
                  opacity: 1, 
                  y: isHovered ? -4 : 0, 
                  scale: 1,
                  transition: { type: 'spring', stiffness: 320, damping: 24 }
                }}
                exit={{ opacity: 0, y: 15, scale: 0.85, transition: { duration: 0.2 } }}
                className="pointer-events-auto mb-3 max-w-[260px] sm:max-w-[290px] relative hidden xs:block sm:block"
              >
                <div 
                  onClick={handleMascotClick}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#FF751F]/40 shadow-2xl space-y-2 cursor-pointer group hover:border-[#FF751F] transition-colors"
                >
                  {/* Top Badge & Close button */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#FF751F]/15 text-[#FF751F] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{bubbleContent.badge}</span>
                    </span>

                    <button
                      onClick={handleBubbleDismiss}
                      className="text-[#8C8476] hover:text-[#1A1A1A] p-0.5 rounded-md hover:bg-black/5 transition-colors"
                      title="Dismiss bubble"
                      aria-label="Dismiss speech bubble"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Headline & Subtext */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold font-display text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors leading-snug">
                      {bubbleContent.headline}
                    </h4>
                    <p className="text-[11px] text-[#59554E] leading-relaxed mt-0.5">
                      {bubbleContent.subtext}
                    </p>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-[#FF751F]">
                    <span className="group-hover:underline flex items-center gap-1">
                      <span>{bubbleContent.cta}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[10px] text-[#8C8476] font-normal">Tap to open</span>
                  </div>

                  {/* Speech Bubble Tail pointing down to Hurry */}
                  <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-[#FF751F]/40 rotate-45 pointer-events-none" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================= */}
          {/* 2. Floating Mascot Avatar with Fluid Viewport Following */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.6, rotate: -14 }}
            animate={{ 
              opacity: 1, 
              y: isBouncing 
                ? [0, -16, 8, -6, 0] 
                : [0, -7, 0],
              scale: isBouncing 
                ? [1, 0.85, 1.22, 0.95, 1] 
                : (isHovered ? 1.06 : 1),
              rotate: isBouncing 
                ? [0, -12, 12, -4, 0] 
                : (isHovered ? 2 : 0)
            }}
            exit={{ opacity: 0, y: 70, scale: 0.6, rotate: -10, transition: { duration: 0.25 } }}
            transition={{
              y: isBouncing 
                ? { duration: 0.42, ease: 'easeOut' } 
                : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
              scale: isBouncing 
                ? { duration: 0.42, ease: 'easeOut' } 
                : { duration: 0.25 },
              rotate: isBouncing 
                ? { duration: 0.42, ease: 'easeOut' } 
                : { duration: 0.25 },
            }}
            whileTap={{ scale: 0.92 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleMascotClick}
            className="pointer-events-auto cursor-pointer group relative flex items-center gap-3"
            role="button"
            tabIndex={0}
            aria-label="Hurry the Hare - Tap to request a custom sportswear quote"
            title="Click Hurry the Hare to get an instant RFQ / quote!"
          >
            {/* Ambient Brand Glow behind avatar */}
            <div className="absolute -inset-2 rounded-full bg-[#FF751F]/30 blur-xl group-hover:bg-[#FF751F]/50 transition-all pointer-events-none" />

            {/* Mascot Avatar Frame */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl p-1 bg-white border-2 border-[#FF751F] shadow-[0_12px_32px_rgba(255,117,31,0.35)] overflow-hidden transition-transform group-hover:shadow-[0_16px_40px_rgba(255,117,31,0.5)]">
              <img
                src="/images/mascot/hurry-hero.jpg"
                alt="Hurry the Hare Mascot"
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl select-none"
                loading="eager"
              />

              {/* Online Green Indicator Dot */}
              <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
              </div>
            </div>

            {/* Mobile/Compact Side Label Pill (on screens where speech bubble is dismissed or mobile) */}
            {(!isBubbleOpen || hasDismissedBubble) && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold shadow-lg border border-white/20 group-hover:bg-[#FF751F] transition-colors"
              >
                <span>🐰 Talk to Hurry</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </motion.div>
            )}

            {/* Mobile Mini Floating Badge */}
            <div className="sm:hidden px-2.5 py-1 rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold shadow-md border border-white/20">
              <span>Quote</span>
            </div>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
}
