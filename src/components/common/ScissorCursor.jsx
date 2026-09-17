import React, { useState, useEffect, useRef } from 'react';

/**
 * ScissorCursor with Dynamic Circular Video Follower
 * 1. Reverts to the original scissor design style, scaled down to a sleek, compact, natural size (~24px).
 * 2. Features an organic fabric snip spark on click.
 * 3. Dynamically displays a smooth circular video follower playing alternating factory production videos
 *    whenever the cursor moves over empty whitespace / background areas.
 */
export default function ScissorCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isSnapping, setIsSnapping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverWhitespace, setIsOverWhitespace] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);
  const [clickSpark, setClickSpark] = useState(null);
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

  const requestRef = useRef(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });
  const followerPosRef = useRef({ x: -100, y: -100 });
  const followerVideoRef = useRef(null);

  // Factory production showcase videos to alternate smoothly
  const factoryVideos = [
    {
      src: '/videos/factory-production-showcase.mp4',
      label: 'Precision Stitching'
    },
    {
      src: '/videos/factory-cutting-floor.mp4',
      label: 'Sialkot Cutting Floor'
    }
  ];

  // Auto-alternate videos every 9 seconds or when the current one ends
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIdx(prev => (prev + 1) % factoryVideos.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [factoryVideos.length]);

  // Ensure video plays smoothly when switching
  useEffect(() => {
    if (followerVideoRef.current && isOverWhitespace) {
      followerVideoRef.current.play().catch(() => {});
    }
  }, [currentVideoIdx, isOverWhitespace]);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse / precision trackpad)
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);

    const handleMediaChange = (e) => setHasPointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      // 1. Check if hovering over clickable or interactive elements
      const isClickable = target.closest && target.closest(
        'a, button, input, select, textarea, [role="button"], label, .interactive-hover, [role="dialog"], [role="menu"]'
      );
      setIsHovering(!!isClickable);

      // 2. Check if hovering over dense content (paragraphs, headings, images, cards, inputs)
      // If none of these match, the cursor is over empty background / whitespace!
      const isDenseContent = target.closest && target.closest(
        'p, h1, h2, h3, h4, h5, h6, img, video, table, ul, ol, form, blockquote, [data-no-follower]'
      );

      // Whitespace condition: not interactive and not over dense text/images
      const onBlankSpace = !isClickable && !isDenseContent;
      setIsOverWhitespace(onBlankSpace);
    };

    const handleMouseDown = (e) => {
      setIsSnapping(true);
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
      setIsOverWhitespace(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth RAF loop:
    // Cursor position uses snappy 0.90 lerp for zero perceived lag
    // Follower uses 0.16 lerp for organic trailing float
    const animate = () => {
      // Scissor cursor (sharp, instant response)
      currentPosRef.current.x += (mousePosRef.current.x - currentPosRef.current.x) * 0.90;
      currentPosRef.current.y += (mousePosRef.current.y - currentPosRef.current.y) * 0.90;

      // Calculate smart offset for the circular follower so it doesn't overflow the viewport
      const offsetDistance = 24;
      const followerDiameter = 88;
      
      let targetFollowerX = mousePosRef.current.x + offsetDistance;
      let targetFollowerY = mousePosRef.current.y + offsetDistance;

      if (typeof window !== 'undefined') {
        if (targetFollowerX + followerDiameter > window.innerWidth - 12) {
          targetFollowerX = mousePosRef.current.x - followerDiameter - 12;
        }
        if (targetFollowerY + followerDiameter > window.innerHeight - 12) {
          targetFollowerY = mousePosRef.current.y - followerDiameter - 12;
        }
      }

      followerPosRef.current.x += (targetFollowerX - followerPosRef.current.x) * 0.16;
      followerPosRef.current.y += (targetFollowerY - followerPosRef.current.y) * 0.16;

      setPos({
        x: Math.round(currentPosRef.current.x * 10) / 10,
        y: Math.round(currentPosRef.current.y * 10) / 10
      });

      setFollowerPos({
        x: Math.round(followerPosRef.current.x * 10) / 10,
        y: Math.round(followerPosRef.current.y * 10) / 10
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    requestRef.current = requestAnimationFrame(animate);
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
      {/* Click Spark / Fabric Snip Micro Effect */}
      {clickSpark && (
        <div
          className="fixed pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${clickSpark.x}px`, top: `${clickSpark.y}px` }}
        >
          <div className="w-6 h-6 rounded-full border border-[#FF751F] animate-ping opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF751F] shadow-[0_0_8px_#FF751F]" />
          </div>
        </div>
      )}

      {/* Dynamic Circular Video Follower (Active over empty space/whitespace) */}
      <div
        className="fixed pointer-events-none z-[999990] select-none transition-opacity duration-200"
        style={{
          left: `${followerPos.x}px`,
          top: `${followerPos.y}px`,
          opacity: isOverWhitespace ? 1 : 0,
          transform: `scale(${isOverWhitespace ? 1 : 0.4})`,
          transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.22s ease-out',
          willChange: 'transform, left, top, opacity'
        }}
        aria-hidden="true"
      >
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-[#FF751F] shadow-[0_10px_25px_rgba(255,117,31,0.35),0_4px_12px_rgba(0,0,0,0.5)] ring-2 ring-white/90 bg-black">
          {/* Autoplaying Alternating Factory Production Video */}
          <video
            ref={followerVideoRef}
            key={factoryVideos[currentVideoIdx].src}
            src={factoryVideos[currentVideoIdx].src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-110"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Mini Live Recording Pill */}
          <div className="absolute top-1.5 inset-x-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/75 backdrop-blur-sm border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[7.5px] font-black tracking-widest text-white uppercase font-mono">
                LIVE
              </span>
            </div>
          </div>

          {/* Bottom Video Category Label */}
          <div className="absolute bottom-1.5 inset-x-1 text-center pointer-events-none">
            <p className="text-[7.5px] font-extrabold text-white truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-display tracking-tight">
              {factoryVideos[currentVideoIdx].label}
            </p>
          </div>
        </div>
      </div>

      {/* Main Scissor Cursor - Reverted to Original Angled Tailor Style & Scaled Down Sleek (~24px) */}
      <div
        className="fixed pointer-events-none z-[999998] transition-transform duration-75 select-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          // Hotspot is exactly at the cutting point (2, 2)
          transform: `translate(-2px, -2px) scale(${isHovering ? 1.12 : 1}) ${isSnapping ? 'scale(0.92)' : ''}`,
          willChange: 'transform, left, top'
        }}
        aria-hidden="true"
      >
        <div className="relative">
          {/* Compact 24x24 Original Scissor Graphic */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            {/* Top Blade & Handle (pivoting from center screw at x=20, y=20) */}
            <g
              className="transition-transform duration-100 ease-out origin-[20px_20px]"
              style={{
                transform: isSnapping 
                  ? 'rotate(18deg)' 
                  : isHovering 
                    ? 'rotate(-6deg)' 
                    : 'rotate(0deg)'
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
                fill="url(#scissorBladeGradOrig)"
                stroke="#2B2927"
                strokeWidth="0.75"
              />
            </g>

            {/* Bottom Blade & Handle */}
            <g
              className="transition-transform duration-100 ease-out origin-[20px_20px]"
              style={{
                transform: isSnapping 
                  ? 'rotate(-18deg)' 
                  : isHovering 
                    ? 'rotate(6deg)' 
                    : 'rotate(0deg)'
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
                fill="url(#scissorBladeGradOrig)"
                stroke="#2B2927"
                strokeWidth="0.75"
              />
            </g>

            {/* Pivot Gold Screw at Center of rotation */}
            <circle cx="20" cy="20" r="3" fill="#FF751F" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="20" cy="20" r="1" fill="#1A1A1A" />

            {/* Precise Cutting Tip Pointer Dot at (2.5, 2.5) */}
            <circle cx="2.5" cy="2.5" r="1.2" fill="#FF751F" />

            {/* Linear Gradient for Metallic Stainless Steel Blades */}
            <defs>
              <linearGradient id="scissorBladeGradOrig" x1="2" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.45" stopColor="#E5DFD5" />
                <stop offset="0.8" stopColor="#A8A296" />
                <stop offset="1" stopColor="#595856" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hover Glow Dot at the Tip */}
          {isHovering && (
            <span className="absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full bg-[#FF751F] shadow-[0_0_8px_#FF751F] animate-pulse" />
          )}
        </div>
      </div>
    </>
  );
}
