import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ className = "", isDark = false, iconOnly = false, size = "md" }) {
  // Select the appropriate logo variant based on background or iconOnly
  const logoSrc = iconOnly 
    ? '/brand-logo-icon.png' 
    : (isDark ? '/hare-logo-white-text.png' : '/hare-logo-transparent.png');

  const heights = {
    sm: "h-8",
    md: "h-11 sm:h-12",
    lg: "h-16",
    xl: "h-20"
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-2 group select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Hare Sportswear & Goods Logo"
        className={`${heights[size] || heights.md} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
    </Link>
  );
}
