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
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"], label, .interactive-hover');
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
          // Hotspot is exactly at the top center tip (x = 18px, y = 1px)
          transform: `translate(-18px, -1px) scale(${isHovering ? 1.15 : 1}) ${isSnapping ? 'scale(0.92)' : ''}`,
          willChange: 'transform, left, top'
        }}
        aria-hidden="true"
      >
        <div className="relative">
          {/* Straight Upright Scissor SVG */}
          <svg
            width="36"
            height="46"
            viewBox="0 0 36 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]"
          >
            {/* Left Blade & Handle Unit (Pivots around center screw at 18, 21) */}
            <g
              className="transition-transform duration-100 ease-out origin-[18px_21px]"
              style={{
                transform: isSnapping 
                  ? 'rotate(8deg)' 
                  : isHovering 
                    ? 'rotate(-5deg)' 
                    : 'rotate(0deg)'
              }}
            >
              {/* Left Blade (vertical taper pointing straight UP to x=17, y=1) */}
              <path
                d="M17.5 1 L14 18 C14 20 16 21 18 21 L18 19 L17.5 1 Z"
                fill="url(#straightBladeMetallic)"
                stroke="#1A1A1A"
                strokeWidth="0.75"
              />
              {/* Left Handle Arm */}
              <path
                d="M17 21 C15 25 12 28 11 31"
                stroke="#FF751F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Left Handle Finger Ring */}
              <ellipse
                cx="10"
                cy="37"
                rx="6.5"
                ry="5.5"
                stroke="#FF751F"
                strokeWidth="2.5"
                fill="#1A1A1A"
              />
            </g>

            {/* Right Blade & Handle Unit (Pivots around center screw at 18, 21) */}
            <g
              className="transition-transform duration-100 ease-out origin-[18px_21px]"
              style={{
                transform: isSnapping 
                  ? 'rotate(-8deg)' 
                  : isHovering 
                    ? 'rotate(5deg)' 
                    : 'rotate(0deg)'
              }}
            >
              {/* Right Blade (vertical taper pointing straight UP to x=18.5, y=1) */}
              <path
                d="M18.5 1 L22 18 C22 20 20 21 18 21 L18 19 L18.5 1 Z"
                fill="url(#straightBladeMetallic)"
                stroke="#1A1A1A"
                strokeWidth="0.75"
              />
              {/* Right Handle Arm */}
              <path
                d="M19 21 C21 25 24 28 25 31"
                stroke="#FF751F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Right Handle Thumb Loop */}
              <ellipse
                cx="26"
                cy="37"
                rx="7"
                ry="5.5"
                stroke="#FF751F"
                strokeWidth="2.5"
                fill="#1A1A1A"
              />
            </g>

            {/* Center Pivot Fastener & Screw */}
            <circle cx="18" cy="21" r="3.5" fill="#FF751F" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="18" cy="21" r="1.2" fill="#1A1A1A" />

            {/* Cutting Target Tip Indicator Dot at top apex (18, 1) */}
            <circle cx="18" cy="1" r="1" fill="#FF751F" />

            {/* Gradient for Sharp Stainless Steel Blades */}
            <defs>
              <linearGradient id="straightBladeMetallic" x1="14" y1="1" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.4" stopColor="#EAE5DC" />
                <stop offset="0.75" stopColor="#B3ADA3" />
                <stop offset="1" stopColor="#6E6962" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hover Glow Accent at Tip */}
          {isHovering && (
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF751F] shadow-[0_0_8px_#FF751F] animate-pulse"></span>
          )}
        </div>
      </div>
    </>
  );
}
