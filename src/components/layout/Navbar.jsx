import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, MessageCircle, FileText, ChevronRight, ChevronDown,
  Mail, Phone, ShoppingBag, Globe, Plane, ArrowRight
} from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import { useRFQ } from '../../context/RFQContext';
import { countryServices } from '../../data/countryServicesData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [globalDropdownOpen, setGlobalDropdownOpen] = useState(false);
  const [mobileRegionsOpen, setMobileRegionsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { inquiryBasket } = useRFQ();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setGlobalDropdownOpen(false);
    setMobileRegionsOpen(false);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      try {
        if (dropdownRef.current && e?.target instanceof Node && !dropdownRef.current.contains(e.target)) {
          setGlobalDropdownOpen(false);
        }
      } catch (err) {
        // Suppress any DOM tree traversal errors
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Custom Manufacturing', path: '/custom-manufacturing' },
    { name: 'Fabric Glossary', path: '/fabric-glossary' },
    { name: 'Quality & Factory', path: '/quality' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isCurrentPathRegional = countryServices.some((c) => location.pathname === `/${c.slug}`);

  return (
    <>
      {/* Top B2B Export Announcement Strip */}
      <div className="bg-[#1A1A1A] text-xs text-[#E5DFD5] py-2 px-4 border-b border-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-2 font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-[#FF751F] animate-pulse"></span>
              Sialkot Factory Direct OEM/ODM Export
            </span>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="hidden md:inline text-cream-200">⚡ 7-Day Rapid Sampling</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link to="/meet-hare" className="hidden sm:inline-flex items-center gap-1.5 text-[#FF751F] hover:text-white transition-colors font-semibold">
              <span>🐰</span>
              <span>Meet Hurry the Hare</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="mailto:export@haresportswear.com" className="hover:text-[#FF751F] transition-colors flex items-center gap-1.5 text-cream-200">
              <Mail className="w-3.5 h-3.5 text-[#FF751F]" />
              <span className="hidden sm:inline">export@haresportswear.com</span>
            </a>
            <span className="text-white/20 hidden sm:inline">•</span>
            <a href="https://wa.me/923001234567?text=Hello%20Hare%20Sportswear,%20inquiry%20from%20website" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium text-white">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +92 300 1234567</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#F5F1E8]/95 backdrop-blur-md shadow-md border-b border-[#E5DFD5] py-2.5' 
          : 'bg-[#F5F1E8] border-b border-[#E5DFD5] py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <BrandLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-sm' 
                    : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
                }`}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Global Reach Dropdown Menu */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setGlobalDropdownOpen(true)}
              onMouseLeave={() => setGlobalDropdownOpen(false)}
            >
              <button
                onClick={() => setGlobalDropdownOpen(!globalDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isCurrentPathRegional || globalDropdownOpen
                    ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-sm'
                    : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
                }`}
                aria-expanded={globalDropdownOpen}
              >
                <Globe className="w-4 h-4 text-[#FF751F]" />
                <span>Global Reach</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${globalDropdownOpen ? 'rotate-180 text-[#FF751F]' : ''}`} />
              </button>

              {/* Mega Dropdown Panel */}
              {globalDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px] z-50 animate-fadeIn">
                  <div className="rounded-2xl bg-white border border-[#E5DFD5] shadow-2xl p-5 space-y-4">
                    
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F]">
                          Target Regional Export Services
                        </span>
                        <h4 className="text-sm font-display font-bold text-[#1A1A1A]">
                          Select Your Target Country Service Hub
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#F5F1E8] text-[11px] font-semibold text-[#595856]">
                        ✈ Direct Air & DDP
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {countryServices.map((c) => {
                        const isActive = location.pathname === `/${c.slug}`;
                        return (
                          <Link
                            key={c.id}
                            to={`/${c.slug}`}
                            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                              isActive
                                ? 'bg-[#FF751F]/10 border-[#FF751F] text-[#FF751F]'
                                : 'bg-[#FAF8F3] hover:bg-white border-[#E5DFD5] hover:border-[#FF751F]/50 text-[#1A1A1A]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-xl shrink-0">{c.flag}</span>
                              <div className="truncate text-left">
                                <span className="font-bold text-xs block truncate">{c?.name}</span>
                                <span className="text-[10px] text-[#8A847A] block truncate">
                                  {c?.stats?.[1]?.value || '3-5 Days'} Air Transit
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
                      <span className="text-[#595856]">
                        Supplying 45+ countries worldwide with AQL 2.5 quality
                      </span>
                      <Link 
                        to="/contact" 
                        className="font-bold text-[#FF751F] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Custom Port Delivery</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(3).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-sm' 
                    : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
                }`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions & RFQ CTA */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* WhatsApp Quick Chat */}
            <a
              href="https://wa.me/923001234567?text=Hello%20Hare%20Sportswear,%20I%20want%20to%20inquire%20about%20sportswear%20manufacturing"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-600 border border-[#E5DFD5] hover:border-emerald-300 transition-all duration-200 group relative shadow-sm"
              title="Chat with Sialkot Factory on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1A1A1A] text-[11px] text-white px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                WhatsApp Chat
              </span>
            </a>

            {/* Inquiry Basket Indicator (if items selected) */}
            {(inquiryBasket?.length || 0) > 0 && (
              <Link
                to="/contact"
                className="relative p-2.5 rounded-xl bg-white text-[#FF751F] border border-[#FF751F]/30 hover:bg-[#FF751F]/10 transition-all shadow-sm"
                title={`${inquiryBasket.length} items in your RFQ basket`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF751F] text-white text-xs font-bold flex items-center justify-center animate-bounce">
                  {inquiryBasket.length}
                </span>
              </Link>
            )}

            {/* Primary RFQ Button */}
            <Link
              to="/contact"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-glow-orange hover:shadow-lg transition-all duration-300 transform active:scale-95 group overflow-hidden"
            >
              <FileText className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>Request a Quote (RFQ)</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href="https://wa.me/923001234567?text=Hello%20Hare%20Sportswear,%20inquiry%20from%20mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white border border-[#E5DFD5] text-[#1A1A1A] hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Drawer Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#F5F1E8] border-b border-[#E5DFD5] px-4 pt-3 pb-6 mt-3 space-y-2 animate-fadeIn shadow-xl max-h-[80vh] overflow-y-auto">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#FF751F]/15 text-[#FF751F]'
                    : 'text-[#1A1A1A] hover:bg-black/5'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}

            {/* Mobile Expandable Global Reach Accordion */}
            <div className="rounded-xl border border-[#E5DFD5] bg-white overflow-hidden">
              <button
                onClick={() => setMobileRegionsOpen(!mobileRegionsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-[#1A1A1A]"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#FF751F]" />
                  <span>Global Service Regions ({countryServices.length})</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileRegionsOpen ? 'rotate-180 text-[#FF751F]' : ''}`} />
              </button>

              {mobileRegionsOpen && (
                <div className="p-3 bg-[#F5F1E8]/70 border-t border-[#E5DFD5] grid grid-cols-2 gap-2">
                  {countryServices.map((c) => (
                    <Link
                      key={c.id}
                      to={`/${c.slug}`}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5DFD5] text-xs font-semibold text-[#1A1A1A] hover:text-[#FF751F]"
                    >
                      <span>{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(3).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#FF751F]/15 text-[#FF751F]'
                    : 'text-[#1A1A1A] hover:bg-black/5'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}

            <div className="pt-4 border-t border-[#E5DFD5] space-y-3">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] shadow-glow-orange"
              >
                <FileText className="w-4 h-4" />
                <span>Request a Quote (RFQ)</span>
              </Link>

              <a
                href="https://wa.me/923001234567?text=Hello%20Hare%20Sportswear,%20I%20am%20interested%20in%20custom%20sportswear%20manufacturing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-emerald-700 bg-emerald-50 border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
