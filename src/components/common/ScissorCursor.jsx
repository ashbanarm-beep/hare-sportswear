import React, { useState, useEffect, useRef } from 'react';

export default function ScissorCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isSnapping, setIsSnapping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);
  const [clickSpark, setClickSpark] = useState(null);

  const requestRef = useRef(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if the device has a fine pointer (mouse/trackpad, not touch only)
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);

    const handleMediaChange = (e) => setHasPointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) return;

    // Direct, ultra-responsive mouse position update
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target;
      const isClickable = target && typeof target.closest === 'function' && target.closest('a, button, input, select, textarea, [role="button"], label, .interactive-hover');
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = (e) => {
      setIsSnapping(true);
      // Create micro cut spark at scissor tip
      setClickSpark({ id: Date.now(), x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setClickSpark(null);
      }, 300);
    };

    const handleMouseUp = () => {
      setIsSnapping(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth RAF loop with high lerp factor for instant responsiveness
    const animate = () => {
      currentPosRef.current.x += (mousePosRef.current.x - currentPosRef.current.x) * 0.92;
      currentPosRef.current.y += (mousePosRef.current.y - currentPosRef.current.y) * 0.92;

      setPos({
        x: Math.round(currentPosRef.current.x * 10) / 10,
        y: Math.round(currentPosRef.current.y * 10) / 10
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    requestRef.current = requestAnimationFrame(animate);

    // Add class to body to hide default browser cursor on desktop
    document.documentElement.classList.add('custom-scissor-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      mediaQuery.removeEventListener('change', handleMediaChange);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.documentElement.classList.remove('custom-scissor-cursor-active');
    };
  }, [isVisible]);

  if (!hasPointer || !isVisible) return null;

  return (
    <>
      {/* Click Spark / Fabric Snip Effect */}
      {clickSpark && (
        <div
          className="fixed pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${clickSpark.x}px`, top: `${clickSpark.y}px` }}
        >
          <div className="w-6 h-6 rounded-full border border-[#FF751F] animate-ping opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF751F] shadow-[0_0_8px_#FF751F]"></span>
          </div>
        </div>
      )}

      {/* Main Straight Upright Scissor Cursor */}
      <div
        className="fixed pointer-events-none z-[999998] transition-transform duration-75 select-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          // Hotspot is exactly at the top sharp tip (x = 18px, y = 2px)
          transform: `translate(-18px, -2px) scale(${isHovering ? 1.15 : 1}) ${isSnapping ? 'scale(0.93)' : ''}`,
          willChange: 'transform, left, top'
        }}
        aria-hidden="true"
      >
        <div className="relative">
          {/* Professional Tailor's Shears SVG */}
          <svg
            width="36"
            height="48"
            viewBox="0 0 36 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
          >
            {/* Left Unit: Blade + Finger Bow Handle (Pivots at 18, 22) */}
            <g
              className="transition-transform duration-100 ease-out origin-[18px_22px]"
              style={{
                transform: isSnapping 
                  ? 'rotate(0deg)' 
                  : isHovering 
                    ? 'rotate(-13deg)' 
                    : 'rotate(-5deg)'
              }}
            >
              {/* Left Steel Blade (Cutting edge along x=18 from y=22 to y=2) */}
              <path
                d="M18 2 L14 18 C14 20 16 22 18 22 L18 2 Z"
                fill="url(#leftBladeGradient)"
                stroke="#1A1A1A"
                strokeWidth="0.75"
              />
              {/* Left Blade Bevel Highlight */}
              <path
                d="M18 2 L16.5 17 L18 21 L18 2 Z"
                fill="url(#bladeHighlight)"
                opacity="0.85"
              />
              {/* Left Handle Shank */}
              <path
                d="M17 22 C15.5 25.5 13 28.5 11 31"
                stroke="#FF751F"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Left Handle Elongated Finger Bow (for 2-3 fingers) */}
              <ellipse
                cx="10"
                cy="38.5"
                rx="6.5"
                ry="7.5"
                stroke="#FF751F"
                strokeWidth="2.8"
                fill="#1A1A1A"
              />
              <ellipse
                cx="10"
                cy="38.5"
                rx="4.2"
                ry="5.2"
                fill="#242424"
              />
            </g>

            {/* Right Unit: Blade + Thumb Loop Handle (Pivots at 18, 22) */}
            <g
              className="transition-transform duration-100 ease-out origin-[18px_22px]"
              style={{
                transform: isSnapping 
                  ? 'rotate(0deg)' 
                  : isHovering 
                    ? 'rotate(13deg)' 
                    : 'rotate(5deg)'
              }}
            >
              {/* Right Steel Blade (Cutting edge along x=18 from y=22 to y=2) */}
              <path
                d="M18 2 L22 18 C22 20 20 22 18 22 L18 2 Z"
                fill="url(#rightBladeGradient)"
                stroke="#1A1A1A"
                strokeWidth="0.75"
              />
              {/* Right Blade Bevel Highlight */}
              <path
                d="M18 2 L19.5 17 L18 21 L18 2 Z"
                fill="url(#bladeHighlight)"
                opacity="0.85"
              />
              {/* Right Handle Shank */}
              <path
                d="M19 22 C20.5 25.5 23 28.5 25 31"
                stroke="#FF751F"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Right Handle Oval Thumb Loop */}
              <ellipse
                cx="26"
                cy="37"
                rx="6.5"
                ry="6"
                stroke="#FF751F"
                strokeWidth="2.8"
                fill="#1A1A1A"
              />
              <ellipse
                cx="26"
                cy="37"
                rx="4.2"
                ry="3.8"
                fill="#242424"
              />
            </g>

            {/* Polished Brass Tension Screw & Washer at Center Pivot (18, 22) */}
            <circle cx="18" cy="22" r="3.5" fill="url(#brassScrewGradient)" stroke="#1A1A1A" strokeWidth="0.6" />
            <line x1="16.2" y1="22" x2="19.8" y2="22" stroke="#452C06" strokeWidth="0.8" strokeLinecap="round" />

            {/* Precision Tip Indicator Dot */}
            <circle cx="18" cy="2" r="1.2" fill="#FF751F" />

            {/* Gradients */}
            <defs>
              <linearGradient id="leftBladeGradient" x1="14" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5F5F5" />
                <stop offset="0.3" stopColor="#E0E0E0" />
                <stop offset="0.7" stopColor="#A8A29E" />
                <stop offset="1" stopColor="#78716C" />
              </linearGradient>
              <linearGradient id="rightBladeGradient" x1="22" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.3" stopColor="#ECECEC" />
                <stop offset="0.7" stopColor="#B8B2A7" />
                <stop offset="1" stopColor="#78716C" />
              </linearGradient>
              <linearGradient id="bladeHighlight" x1="18" y1="2" x2="18" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.5" stopColor="#F5F5F5" />
                <stop offset="1" stopColor="#D6D3D1" />
              </linearGradient>
              <linearGradient id="brassScrewGradient" x1="15" y1="19" x2="21" y2="25" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" />
                <stop offset="0.4" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hover Precision Indicator at Tip */}
          {isHovering && (
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF751F] shadow-[0_0_10px_#FF751F] animate-ping"></span>
          )}
        </div>
      </div>
    </>
  );
}
