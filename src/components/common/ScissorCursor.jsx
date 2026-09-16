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

    // Smooth mouse position update with lerp for organic feel
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
      // Create a micro spark particle at cursor blade tip
      setClickSpark({ id: Date.now(), x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setClickSpark(null);
      }, 350);
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

    // Smooth RAF loop to eliminate jitter while maintaining zero perceived lag
    const animate = () => {
      // 0.85 factor provides immediate, razor-sharp response without sluggishness
      currentPosRef.current.x += (mousePosRef.current.x - currentPosRef.current.x) * 0.9;
      currentPosRef.current.y += (mousePosRef.current.y - currentPosRef.current.y) * 0.9;

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
      {/* Click Spark / Fabric Cut Micro Effect */}
      {clickSpark && (
        <div
          className="fixed pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${clickSpark.x}px`, top: `${clickSpark.y}px` }}
        >
          {/* Expanding cut ripple */}
          <div className="w-8 h-8 rounded-full border border-[#FF751F] animate-ping opacity-75"></div>
          {/* Spark dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF751F] shadow-[0_0_8px_#FF751F] animate-bounce"></span>
          </div>
        </div>
      )}

      {/* Main Scissor Cursor */}
      <div
        className="fixed pointer-events-none z-[999998] transition-transform duration-75 select-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-4px, -4px) scale(${isHovering ? 1.15 : 1}) ${isSnapping ? 'scale(0.92)' : ''}`,
          willChange: 'transform, left, top'
        }}
        aria-hidden="true"
      >
        {/* Scissor Vector Graphic */}
        <div className="relative">
          <svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          >
            {/* Top Blade & Handle (pivoting from center screw at x=20, y=20) */}
            <g
              className="transition-transform duration-100 ease-out origin-[20px_20px]"
              style={{
                transform: isSnapping ? 'rotate(18deg)' : isHovering ? 'rotate(-6deg)' : 'rotate(0deg)'
              }}
            >
              {/* Upper Handle / Finger Loop */}
              <circle
                cx="34"
                cy="12"
                r="7"
                stroke="#FF751F"
                strokeWidth="2.5"
                fill="#1A1A1A"
              />
              {/* Upper Blade pointing down-left toward (2, 2) */}
              <path
                d="M27 16 C23 18 21 19 20 20 L2 4 C1 3 2 1 4 2 L20 18 Z"
                fill="url(#scissorBladeGrad)"
                stroke="#2B2927"
                strokeWidth="0.75"
              />
            </g>

            {/* Bottom Blade & Handle */}
            <g
              className="transition-transform duration-100 ease-out origin-[20px_20px]"
              style={{
                transform: isSnapping ? 'rotate(-18deg)' : isHovering ? 'rotate(6deg)' : 'rotate(0deg)'
              }}
            >
              {/* Lower Handle / Finger Loop */}
              <ellipse
                cx="35"
                cy="32"
                rx="8"
                ry="6.5"
                stroke="#FF751F"
                strokeWidth="2.5"
                fill="#1A1A1A"
              />
              {/* Lower Blade pointing down-left toward (2, 2) */}
              <path
                d="M28 28 C24 24 21 21 20 20 L2 4 C1 5 3 7 4 6 L20 22 Z"
                fill="url(#scissorBladeGrad)"
                stroke="#2B2927"
                strokeWidth="0.75"
              />
            </g>

            {/* Pivot Gold Screw at Center of rotation */}
            <circle cx="20" cy="20" r="3" fill="#FF751F" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="20" cy="20" r="1" fill="#1A1A1A" />

            {/* Precise Cutting Tip Pointer Dot at (2, 2) */}
            <circle cx="2.5" cy="2.5" r="1.2" fill="#FF751F" />

            {/* Linear Gradient for Metallic Stainless Steel Blades */}
            <defs>
              <linearGradient id="scissorBladeGrad" x1="2" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.45" stopColor="#E5DFD5" />
                <stop offset="0.8" stopColor="#A8A296" />
                <stop offset="1" stopColor="#595856" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hover Glow Dot at the Tip */}
          {isHovering && (
            <span className="absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full bg-[#FF751F] shadow-[0_0_8px_#FF751F] animate-pulse"></span>
          )}
        </div>
      </div>
    </>
  );
}
