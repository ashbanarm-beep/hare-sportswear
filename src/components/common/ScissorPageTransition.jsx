import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScissorPageTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Trigger transition
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 750); // Complete sweep and reveal

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Upper Fabric Split Layer */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#1A1A1A] border-b border-[#FF751F]/40 shadow-2xl animate-fabricTopCut origin-bottom">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF751F_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute bottom-2 left-6 text-[10px] font-mono tracking-widest text-[#FF751F]/60 uppercase">
          HARE OEM/ODM PRECISION PATTERN CUT
        </div>
      </div>

      {/* Lower Fabric Split Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#1A1A1A] border-t border-[#FF751F]/40 shadow-2xl animate-fabricBottomCut origin-top">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF751F_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-2 right-6 text-[10px] font-mono tracking-widest text-cream-400/50 uppercase">
          AQL 2.5 TOLERANCE SPEC
        </div>
      </div>

      {/* Center Dashed Chalk Cutting Line */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px]">
        <div className="w-full h-full border-b-2 border-dashed border-[#FF751F]/80 animate-chalkCut"></div>
      </div>

      {/* Animated Shearing Scissor Vehicle */}
      <div className="absolute top-1/2 -translate-y-1/2 z-20 animate-scissorSweep pointer-events-none">
        <div className="relative -translate-x-1/2 flex items-center justify-center">
          
          {/* Cutting Glow Aura */}
          <div className="absolute w-20 h-20 rounded-full bg-[#FF751F]/30 blur-xl animate-pulse"></div>

          {/* Precision Tailor Scissors SVG Graphic */}
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_8px_16px_rgba(255,117,31,0.4)]"
          >
            {/* Top Blade & Handle */}
            <g className="animate-bladeTop origin-[42px_50px]">
              {/* Top Handle Loop */}
              <circle cx="18" cy="34" r="14" stroke="#D97706" strokeWidth="4" fill="#1A1A1A" />
              <path 
                d="M30 38 C36 44 40 48 42 50 L88 38 C92 37 94 34 88 34 L42 46 Z" 
                fill="url(#bladeGradient)" 
                stroke="#E5DFD5" 
                strokeWidth="1"
              />
            </g>

            {/* Bottom Blade & Handle */}
            <g className="animate-bladeBottom origin-[42px_50px]">
              {/* Bottom Handle Loop (larger for fingers) */}
              <ellipse cx="18" cy="66" rx="16" ry="13" stroke="#FF751F" strokeWidth="4" fill="#1A1A1A" />
              <path 
                d="M32 62 C36 56 40 52 42 50 L88 62 C92 63 94 66 88 66 L42 54 Z" 
                fill="url(#bladeGradient)" 
                stroke="#E5DFD5" 
                strokeWidth="1"
              />
            </g>

            {/* Pivot Screw & Nut */}
            <circle cx="42" cy="50" r="5.5" fill="#FF751F" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="42" cy="50" r="2" fill="#1A1A1A" />

            {/* Blade Metallic Gradient */}
            <defs>
              <linearGradient id="bladeGradient" x1="40" y1="40" x2="90" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5F1E8" />
                <stop offset="0.5" stopColor="#D4CDC3" />
                <stop offset="1" stopColor="#8A847A" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cutting Sparks Particle Effect */}
          <div className="absolute right-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FF751F] animate-ping"></div>
        </div>
      </div>
    </div>
  );
}
