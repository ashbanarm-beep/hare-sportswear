import React, { useState, useEffect, useRef } from 'react';

/**
 * Professional Tailoring Scissor Cursor
 * - Active on fine pointer devices (desktop / trackpad).
 * - Cleanly scaled down to a natural, sleek, razor-sharp size (24px x 31px).
 * - Features metallic stainless steel blades, Hare signature orange handles, and brass pivot screw.
 * - Dynamic cutting motion: blades snap shut on click (mousedown) with a subtle micro-spark.
 * - Reverts to the standard system default pointer over clickable links, buttons, form inputs, and text.
 */
export default function ScissorCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);
  const [clickSpark, setClickSpark] = useState(null);

  const requestRef = useRef(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);

    const handleMediaChange = (e) => setHasPointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) return;

    // Helper: Check if mouse is currently over clickable links, buttons, inputs, or text
    const checkIsInteractiveOrText = (target) => {
      if (!target || !(target instanceof Element)) return false;

      // 1. Clickable or interactive elements
      const isClickable = Boolean(
        target.closest(
          'a, button, input, select, textarea, [role="button"], label, summary, [onclick], [tabindex]:not([tabindex="-1"]), .cursor-pointer, .interactive-hover, [role="dialog"], [role="menu"], [role="tab"]'
        )
      );
      if (isClickable) return true;

      // 2. Typographic headings, paragraphs, and long text passages
      const isTextTag = Boolean(
        target.closest(
          'p, h1, h2, h3, h4, h5, h6, blockquote, code, pre, dt, dd, figcaption'
        )
      );
      if (isTextTag) return true;

      // 3. Text spans / list items with readable text content
      const textContainer = target.closest('span, li, td, th, strong, em, b, i');
      if (textContainer && textContainer.textContent && textContainer.textContent.trim().length > 0) {
        // If it contains direct text nodes
        for (let i = 0; i < textContainer.childNodes.length; i++) {
          const child = textContainer.childNodes[i];
          if (child.nodeType === Node.TEXT_NODE && child.textContent.trim().length > 0) {
            return true;
          }
        }
      }

      return false;
    };

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const interactive = checkIsInteractiveOrText(target);
      setIsInteractive(interactive);
    };

    const handleMouseDown = (e) => {
      setIsSnapping(true);
      // Create micro cut spark at scissor tip if not over an interactive element
      setClickSpark({ id: Date.now(), x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setClickSpark(null);
      }, 260);
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

    // Ultra-responsive direct animation loop
    const animate = () => {
      // 0.94 lerp factor gives near instantaneous 1:1 mouse tracking with zero float/lag
      currentPosRef.current.x += (mousePosRef.current.x - currentPosRef.current.x) * 0.94;
      currentPosRef.current.y += (mousePosRef.current.y - currentPosRef.current.y) * 0.94;

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

    // Apply active class to html root
    document.documentElement.classList.add('custom-scissor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      mediaQuery.removeEventListener('change', handleMediaChange);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.documentElement.classList.remove('custom-scissor-active');
    };
  }, [isVisible]);

  if (!hasPointer || !isVisible) return null;

  // The scissor SVG is 36x46 in viewBox.
  // Scaled to width="24" height="31", the tip apex (18, 2 in viewBox) sits exactly at x = 12px, y = 1.3px.
  // We translate by -12px, -1.3px so the tip aligns with the true mouse coordinates.
  return (
    <>
      {/* Click Micro-Spark / Snip Flash Effect */}
      {clickSpark && !isInteractive && (
        <div
          className="fixed pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2 select-none"
          style={{ left: `${clickSpark.x}px`, top: `${clickSpark.y}px` }}
          aria-hidden="true"
        >
          <div className="w-5 h-5 rounded-full border border-[#FF751F] animate-ping opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF751F] shadow-[0_0_6px_#FF751F]"></span>
          </div>
        </div>
      )}

      {/* Main Sleek Tailoring Scissor Cursor */}
      <div
        className="fixed pointer-events-none z-[999998] select-none will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          // Hotspot tip alignment: x=12px, y=1.5px
          transform: `translate(-12px, -1.5px) scale(${isInteractive ? 0.45 : 1})`,
          opacity: isInteractive ? 0 : 1,
          transition: 'opacity 0.14s ease-out, transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        aria-hidden="true"
      >
        <div className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
          <svg
            width="24"
            height="31"
            viewBox="0 0 36 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left Blade & Handle Unit (Pivots at 18, 22) */}
            <g
              className="origin-[18px_22px] transition-transform duration-75 ease-out"
              style={{
                transform: isSnapping 
                  ? 'rotate(0deg)' 
                  : 'rotate(-5deg)'
              }}
            >
              {/* Left Stainless Steel Blade */}
              <path
                d="M18 2 L14 18 C14 20 16 22 18 22 L18 2 Z"
                fill="url(#leftBladeMetallic)"
                stroke="#1A1A1A"
                strokeWidth="0.8"
              />
              {/* Blade Bevel Light Reflection */}
              <path
                d="M18 2 L16.5 17 L18 21 L18 2 Z"
                fill="url(#bladeHighlightShine)"
                opacity="0.9"
              />
              {/* Left Handle Shank */}
              <path
                d="M17 22 C15.5 25.5 13 28.5 11 31"
                stroke="#FF751F"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Left Handle Finger Bow */}
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

            {/* Right Blade & Handle Unit (Pivots at 18, 22) */}
            <g
              className="origin-[18px_22px] transition-transform duration-75 ease-out"
              style={{
                transform: isSnapping 
                  ? 'rotate(0deg)' 
                  : 'rotate(5deg)'
              }}
            >
              {/* Right Stainless Steel Blade */}
              <path
                d="M18 2 L22 18 C22 20 20 22 18 22 L18 2 Z"
                fill="url(#rightBladeMetallic)"
                stroke="#1A1A1A"
                strokeWidth="0.8"
              />
              {/* Blade Bevel Light Reflection */}
              <path
                d="M18 2 L19.5 17 L18 21 L18 2 Z"
                fill="url(#bladeHighlightShine)"
                opacity="0.9"
              />
              {/* Right Handle Shank */}
              <path
                d="M19 22 C20.5 25.5 23 28.5 25 31"
                stroke="#FF751F"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Right Handle Thumb Loop */}
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

            {/* Polished Brass Tension Screw & Pivot Fastener */}
            <circle
              cx="18"
              cy="22"
              r="3.2"
              fill="url(#brassScrewFinish)"
              stroke="#1A1A1A"
              strokeWidth="0.6"
            />
            <line
              x1="16.4"
              y1="22"
              x2="19.6"
              y2="22"
              stroke="#452C06"
              strokeWidth="0.8"
              strokeLinecap="round"
            />

            {/* Precision Cutting Tip Indicator Point */}
            <circle cx="18" cy="2" r="1.1" fill="#FF751F" />

            {/* Gradients */}
            <defs>
              <linearGradient id="leftBladeMetallic" x1="14" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FAFAFA" />
                <stop offset="0.35" stopColor="#E2E2E2" />
                <stop offset="0.7" stopColor="#A8A29E" />
                <stop offset="1" stopColor="#78716C" />
              </linearGradient>

              <linearGradient id="rightBladeMetallic" x1="22" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.3" stopColor="#EDEDED" />
                <stop offset="0.75" stopColor="#B3ADA3" />
                <stop offset="1" stopColor="#78716C" />
              </linearGradient>

              <linearGradient id="bladeHighlightShine" x1="18" y1="2" x2="18" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.5" stopColor="#F5F5F5" />
                <stop offset="1" stopColor="#D6D3D1" />
              </linearGradient>

              <linearGradient id="brassScrewFinish" x1="15.5" y1="19.5" x2="20.5" y2="24.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" />
                <stop offset="0.45" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
