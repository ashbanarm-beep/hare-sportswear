import React, { useState, useEffect, useRef } from 'react';

/**
 * Dynamic Empty Space Video Follower
 * - Restores standard, default system cursors (default, pointer, text) across the site.
 * - Hides the system cursor and activates a smooth circular video follower only when moving
 *   over empty whitespace/background areas.
 * - Instantly hides the video follower and restores default system cursors when hovering over
 *   any clickable element, button, link, media, or text characters.
 */
export default function ScissorCursor() {
  const [followerPos, setFollowerPos] = useState({ x: -200, y: -200 });
  const [isOverWhitespace, setIsOverWhitespace] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

  const requestRef = useRef(null);
  const mousePosRef = useRef({ x: -200, y: -200 });
  const followerPosRef = useRef({ x: -200, y: -200 });
  const followerVideoRef = useRef(null);
  const isOverWhitespaceRef = useRef(false);

  // Live factory production showcase videos
  const factoryVideos = [
    {
      src: '/videos/factory-production-showcase.mp4',
      label: 'Precision Manufacturing'
    },
    {
      src: '/videos/factory-cutting-floor.mp4',
      label: 'Sialkot Cutting Floor'
    }
  ];

  // Auto-alternate videos periodically for dynamic showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIdx(prev => (prev + 1) % factoryVideos.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [factoryVideos.length]);

  // Ensure video plays smoothly
  useEffect(() => {
    if (followerVideoRef.current && isOverWhitespace) {
      followerVideoRef.current.play().catch(() => {});
    }
  }, [currentVideoIdx, isOverWhitespace]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);

    const handleMediaChange = (e) => setHasPointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) return;

    // Helper: Determine if mouse is over interactive elements or text characters
    const checkIsWhitespace = (target) => {
      if (!target) return false;

      // 1. Clickable or interactive elements
      const isClickable = Boolean(
        target.closest && target.closest(
          'a, button, input, select, textarea, [role="button"], label, summary, [onclick], [tabindex]:not([tabindex="-1"]), .interactive-hover, [role="dialog"], [role="menu"], [role="tab"]'
        )
      );
      if (isClickable) return false;

      // 2. Text elements and typographic characters
      const isText = Boolean(
        target.closest && target.closest(
          'p, h1, h2, h3, h4, h5, h6, span, strong, em, b, i, small, sub, sup, li, td, th, dt, dd, blockquote, code, pre, cite, time, mark, figcaption'
        )
      );
      if (isText) return false;

      // 3. Media elements
      const isMedia = Boolean(
        target.closest && target.closest(
          'img, svg, video, iframe, canvas, picture, [role="img"]'
        )
      );
      if (isMedia) return false;

      // 4. Check if element has direct text nodes with content
      if (target.childNodes && target.childNodes.length > 0) {
        for (let i = 0; i < target.childNodes.length; i++) {
          const node = target.childNodes[i];
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            return false;
          }
        }
      }

      // Not interactive, not text, not media -> empty whitespace/background
      return true;
    };

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const onWhitespace = checkIsWhitespace(target);

      if (onWhitespace !== isOverWhitespaceRef.current) {
        isOverWhitespaceRef.current = onWhitespace;
        setIsOverWhitespace(onWhitespace);

        if (onWhitespace) {
          document.documentElement.classList.add('whitespace-video-active');
        } else {
          document.documentElement.classList.remove('whitespace-video-active');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      isOverWhitespaceRef.current = false;
      setIsOverWhitespace(false);
      document.documentElement.classList.remove('whitespace-video-active');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth RAF loop with fluid momentum
    const animate = () => {
      const lerpFactor = 0.22;
      followerPosRef.current.x += (mousePosRef.current.x - followerPosRef.current.x) * lerpFactor;
      followerPosRef.current.y += (mousePosRef.current.y - followerPosRef.current.y) * lerpFactor;

      setFollowerPos({
        x: Math.round(followerPosRef.current.x * 10) / 10,
        y: Math.round(followerPosRef.current.y * 10) / 10
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      mediaQuery.removeEventListener('change', handleMediaChange);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.documentElement.classList.remove('whitespace-video-active');
    };
  }, [isVisible]);

  if (!hasPointer || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[999990] select-none"
      style={{
        left: `${followerPos.x}px`,
        top: `${followerPos.y}px`,
        transform: `translate(-50%, -50%) scale(${isOverWhitespace ? 1 : 0.25})`,
        opacity: isOverWhitespace ? 1 : 0,
        transition: 'transform 0.24s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.16s ease-out',
        willChange: 'transform, left, top, opacity'
      }}
      aria-hidden="true"
    >
      <div className="relative w-18 h-18 sm:w-20 sm:h-20 w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-[#FF751F] shadow-[0_12px_28px_rgba(255,117,31,0.3),0_4px_14px_rgba(0,0,0,0.4)] ring-2 ring-white/90 bg-black">
        {/* Live Factory Video Preview */}
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

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

        {/* Live Indicator Pill */}
        <div className="absolute top-1.5 inset-x-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[7px] font-black tracking-widest text-white uppercase font-mono">
              LIVE
            </span>
          </div>
        </div>

        {/* Bottom Title Label */}
        <div className="absolute bottom-1 inset-x-1 text-center pointer-events-none">
          <p className="text-[7px] font-extrabold text-white truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-display tracking-tight">
            {factoryVideos[currentVideoIdx].label}
          </p>
        </div>
      </div>
    </div>
  );
}
