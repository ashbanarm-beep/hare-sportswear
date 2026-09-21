import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, MessageCircle, FileText, ChevronRight, ChevronDown,
  Mail, Globe, ArrowRight, Palette, Pipette, 
  Calculator, BookOpen, Shirt, Dumbbell, Trophy, Sparkles
} from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import { countryServices } from '../../data/countryServicesData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Desktop dropdown states
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [globalDropdownOpen, setGlobalDropdownOpen] = useState(false);

  // Mobile accordion states
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileRegionsOpen, setMobileRegionsOpen] = useState(false);

  const productsRef = useRef(null);
  const toolsRef = useRef(null);
  const globalRef = useRef(null);

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
    setProductsDropdownOpen(false);
    setToolsDropdownOpen(false);
    setGlobalDropdownOpen(false);
    setMobileProductsOpen(false);
    setMobileToolsOpen(false);
    setMobileRegionsOpen(false);
  }, [location.pathname, location.search]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      try {
        if (productsRef.current && !productsRef.current.contains(e.target)) {
          setProductsDropdownOpen(false);
        }
        if (toolsRef.current && !toolsRef.current.contains(e.target)) {
          setToolsDropdownOpen(false);
        }
        if (globalRef.current && !globalRef.current.contains(e.target)) {
          setGlobalDropdownOpen(false);
        }
      } catch (err) {
        // Suppress DOM traversal errors
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCurrentPathRegional = countryServices.some((c) => location.pathname === `/${c.slug}`);
  const isToolsActive = location.pathname.startsWith('/tools') || location.pathname.includes('matcher') || location.pathname.includes('generator') || location.pathname.includes('estimator');
  const isProductsActive = location.pathname.startsWith('/products');

  // Product categories for the dropdown
  const productCategories = [
    {
      name: 'Teamwear & Custom Kits',
      path: '/products?category=teamwear',
      desc: 'Soccer, rugby, basketball, cricket uniforms & technical kits',
      badge: 'High-Performance',
      icon: Shirt,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      name: "Sports Bras & Women's Activewear",
      path: '/products?category=womens-activewear',
      desc: 'High-impact sports bras, seamless leggings, bike shorts & yoga sets',
      badge: "Women's Line",
      icon: Sparkles,
      color: 'text-rose-600 bg-rose-50'
    },
    {
      name: "Men's Activewear & Training",
      path: '/products?category=activewear',
      desc: 'Compression rashguards, athletic joggers & heavyweight fleece hoodies',
      badge: 'Athleisure',
      icon: Dumbbell,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      name: 'Sports Equipment & Goods',
      path: '/products?category=equipment',
      desc: 'FIFA-spec match balls, padel/badminton rackets, snooker & camping',
      badge: 'Gear & Balls',
      icon: Trophy,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      name: 'Wrestling & Combat Gear',
      path: '/products?category=equipment&sub=combat-sports',
      desc: 'Championship belts, grappling dummies, headgear & wrestling boots',
      badge: 'Pro Combat',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  // Digital manufacturing tools for the dropdown
  const digitalTools = [
    {
      name: 'Pantone Color Matcher',
      path: '/tools/pantone-matcher',
      desc: 'Match HEX codes to official PMS textile codes & Italian sublimation ink formulas',
      badge: 'Color Lab',
      icon: Pipette,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      name: 'Athletic Palette Generator',
      path: '/tools/palette-generator',
      desc: 'Generate 4-color uniform harmonies with live vector jersey simulation & slot locking',
      badge: 'Kit Studio',
      icon: Palette,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      name: 'Instant Cost & Lead Time Estimator',
      path: '/tools/cost-estimator',
      desc: 'Model tiered MOQ factory pricing, sample lead times & DDP shipping landed quotes',
      badge: 'Live Pricing',
      icon: Calculator,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      name: 'Fabric Glossary & Technical Hub',
      path: '/fabric-glossary',
      desc: 'Detailed GSM weights, knit structures, and washfastness specs for performance fabrics',
      badge: 'Material Specs',
      icon: BookOpen,
      color: 'text-stone-700 bg-stone-100'
    }
  ];

  return (
    <>
      {/* Top B2B Export Announcement Strip */}
      <div className="bg-[#1A1A1A] text-[11px] sm:text-xs text-[#E5DFD5] py-1.5 sm:py-2 px-3 sm:px-4 border-b border-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-6 min-w-0 truncate">
            <span className="flex items-center gap-1.5 sm:gap-2 font-medium text-white truncate">
              <span className="w-2 h-2 rounded-full bg-[#FF751F] animate-pulse shrink-0"></span>
              <span className="truncate">Sialkot Factory Direct OEM/ODM Export</span>
            </span>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="hidden md:inline text-cream-200 shrink-0">⚡ 7-Day Rapid Sampling</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link to="/meet-hare" className="hidden sm:inline-flex items-center gap-1.5 text-[#FF751F] hover:text-white transition-colors font-semibold shrink-0">
              <span>🐰</span>
              <span>Meet Hurry the Hare</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-[11px] sm:text-xs">
            <a href="mailto:export@haresportswear.com" className="hover:text-[#FF751F] transition-colors hidden sm:flex items-center gap-1.5 text-cream-200">
              <Mail className="w-3.5 h-3.5 text-[#FF751F]" />
              <span>export@haresportswear.com</span>
            </a>
            <span className="text-white/20 hidden sm:inline">•</span>
            <a href="https://wa.me/message/PBVPZM3J7ETGH1" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1 sm:gap-1.5 font-medium text-white">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden xs:inline sm:inline">WhatsApp: +92 300 1234567</span>
              <span className="inline xs:hidden sm:hidden">WhatsApp</span>
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
            
            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs' 
                  : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
              }`}
            >
              Home
            </NavLink>

            {/* Products Mega Dropdown */}
            <div 
              className="relative"
              ref={productsRef}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isProductsActive || productsDropdownOpen
                    ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs'
                    : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
                }`}
                aria-expanded={productsDropdownOpen}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-[#FF751F]' : ''}`} />
              </button>

              {/* Products Dropdown Panel */}
              {productsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-[520px] z-50 animate-fadeIn">
                  <div className="rounded-2xl bg-white border border-[#E5DFD5] shadow-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F]">
                          Manufacturing Divisions
                        </span>
                        <h4 className="text-sm font-display font-bold text-[#1A1A1A]">
                          Custom Apparel & Sports Equipment Catalog
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#F5F1E8] text-[11px] font-semibold text-[#595856]">
                        32+ Product Lines
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {productCategories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                          <Link
                            key={idx}
                            to={cat.path}
                            onClick={() => setProductsDropdownOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-xl border border-stone-100 hover:border-[#FF751F]/40 hover:bg-[#FAF8F3] transition group"
                          >
                            <div className={`p-2.5 rounded-xl ${cat.color} shrink-0 transition-transform group-hover:scale-105`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs sm:text-sm text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                                  {cat.name}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                                  {cat.badge}
                                </span>
                              </div>
                              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                                {cat.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
                      <span className="text-stone-500">
                        OEM/ODM full customization & private labeling
                      </span>
                      <Link 
                        to="/products" 
                        onClick={() => setProductsDropdownOpen(false)}
                        className="font-bold text-[#FF751F] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Explore Complete Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Manufacturing */}
            <NavLink
              to="/custom-manufacturing"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs' 
                  : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
              }`}
            >
              Custom Manufacturing
            </NavLink>

            {/* Global Reach Dropdown Menu */}
            <div 
              className="relative"
              ref={globalRef}
              onMouseEnter={() => setGlobalDropdownOpen(true)}
              onMouseLeave={() => setGlobalDropdownOpen(false)}
            >
              <button
                onClick={() => setGlobalDropdownOpen(!globalDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isCurrentPathRegional || globalDropdownOpen
                    ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs'
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
                            onClick={() => setGlobalDropdownOpen(false)}
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
                        onClick={() => setGlobalDropdownOpen(false)}
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

            {/* Tools Dropdown (Replaces standalone Fabric Glossary) */}
            <div 
              className="relative"
              ref={toolsRef}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isToolsActive || toolsDropdownOpen
                    ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs'
                    : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
                }`}
                aria-expanded={toolsDropdownOpen}
              >
                <Palette className="w-4 h-4 text-[#FF751F]" />
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-[#FF751F]' : ''}`} />
              </button>

              {/* Tools Dropdown Panel */}
              {toolsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px] z-50 animate-fadeIn">
                  <div className="rounded-2xl bg-white border border-[#E5DFD5] shadow-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F]">
                          Digital Engineering & Pre-Press Suite
                        </span>
                        <h4 className="text-sm font-display font-bold text-[#1A1A1A]">
                          Color Matching, Palette Builder & Cost Modeling
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#F5F1E8] text-[11px] font-semibold text-[#595856]">
                        ⚡ Instant Sialkot Specs
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {digitalTools.map((tool, idx) => {
                        const Icon = tool.icon;
                        const isCurrent = location.pathname === tool.path;
                        return (
                          <Link
                            key={idx}
                            to={tool.path}
                            onClick={() => setToolsDropdownOpen(false)}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition group ${
                              isCurrent
                                ? 'bg-[#FF751F]/5 border-[#FF751F]/50'
                                : 'border-stone-100 hover:border-[#FF751F]/40 hover:bg-[#FAF8F3]'
                            }`}
                          >
                            <div className={`p-2.5 rounded-xl ${tool.color} shrink-0 transition-transform group-hover:scale-105`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs sm:text-sm text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                                  {tool.name}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                                  {tool.badge}
                                </span>
                              </div>
                              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                                {tool.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
                      <span className="text-stone-500">
                        100% spectrophotometer color fidelity guaranteed
                      </span>
                      <Link 
                        to="/tools" 
                        onClick={() => setToolsDropdownOpen(false)}
                        className="font-bold text-[#FF751F] hover:underline inline-flex items-center gap-1"
                      >
                        <span>View All Digital Tools</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quality & Factory */}
            <NavLink
              to="/quality"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs' 
                  : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
              }`}
            >
              Quality & Factory
            </NavLink>

            {/* About Us */}
            <NavLink
              to="/about"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs' 
                  : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
              }`}
            >
              About Us
            </NavLink>

            {/* Blog */}
            <NavLink
              to="/blog"
              className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs' 
                  : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
              }`}
            >
              Blog
            </NavLink>
          </nav>

          {/* Right Actions & RFQ CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary RFQ Button (Desktop & Tablet) */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex relative items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-glow-orange hover:shadow-lg transition-all duration-300 transform active:scale-95 group overflow-hidden"
            >
              <FileText className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>Request a Quote (RFQ)</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </Link>

            {/* Mobile-Only WhatsApp Icon Button */}
            <a
              href="https://wa.me/923001234567?text=Hello%20Hare%20Sportswear,%20inquiry%20from%20mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 sm:hidden"
              aria-label="Direct WhatsApp Inquiry"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Mobile & Tablet Hamburger Menu Button (Shown across all viewports below lg: 1024px) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#E5DFD5] text-[#1A1A1A] hover:bg-black/5 transition-colors lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Drawer Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#F5F1E8] border-b border-[#E5DFD5] px-4 pt-3 pb-6 mt-3 space-y-2 animate-fadeIn shadow-xl max-h-[85vh] overflow-y-auto">
            
            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive
                  ? 'bg-[#FF751F]/15 text-[#FF751F]'
                  : 'text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>

            {/* Mobile Products Accordion */}
            <div className="rounded-xl border border-[#E5DFD5] bg-white overflow-hidden">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-[#1A1A1A]"
              >
                <span className="flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-[#FF751F]" />
                  <span>Products Catalog ({productCategories.length} Categories)</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180 text-[#FF751F]' : ''}`} />
              </button>

              {mobileProductsOpen && (
                <div className="p-3 bg-[#F5F1E8]/70 border-t border-[#E5DFD5] space-y-2">
                  {productCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      to={cat.path}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E5DFD5] text-xs font-semibold text-[#1A1A1A] hover:text-[#FF751F]"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  ))}
                  <Link
                    to="/products"
                    className="block text-center py-2 font-bold text-xs text-[#FF751F] hover:underline"
                  >
                    View All 32+ Products →
                  </Link>
                </div>
              )}
            </div>

            {/* Custom Manufacturing */}
            <NavLink
              to="/custom-manufacturing"
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive
                  ? 'bg-[#FF751F]/15 text-[#FF751F]'
                  : 'text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <span>Custom Manufacturing</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>

            {/* Mobile Global Reach Accordion */}
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

            {/* Mobile Tools Accordion */}
            <div className="rounded-xl border border-[#E5DFD5] bg-white overflow-hidden">
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-[#1A1A1A]"
              >
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#FF751F]" />
                  <span>Digital Tools & Color Lab</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsOpen ? 'rotate-180 text-[#FF751F]' : ''}`} />
              </button>

              {mobileToolsOpen && (
                <div className="p-3 bg-[#F5F1E8]/70 border-t border-[#E5DFD5] space-y-2">
                  {digitalTools.map((tool, idx) => (
                    <Link
                      key={idx}
                      to={tool.path}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E5DFD5] text-xs font-semibold text-[#1A1A1A] hover:text-[#FF751F]"
                    >
                      <span>{tool.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  ))}
                  <Link
                    to="/tools"
                    className="block text-center py-2 font-bold text-xs text-[#FF751F] hover:underline"
                  >
                    Open Digital Tools Hub →
                  </Link>
                </div>
              )}
            </div>

            {/* Quality & Factory */}
            <NavLink
              to="/quality"
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive
                  ? 'bg-[#FF751F]/15 text-[#FF751F]'
                  : 'text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <span>Quality & Factory</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>

            {/* About Us */}
            <NavLink
              to="/about"
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive
                  ? 'bg-[#FF751F]/15 text-[#FF751F]'
                  : 'text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>

            {/* Blog */}
            <NavLink
              to="/blog"
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive
                  ? 'bg-[#FF751F]/15 text-[#FF751F]'
                  : 'text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <span>Blog</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>

            <div className="pt-4 border-t border-[#E5DFD5] space-y-3">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] shadow-glow-orange"
              >
                <FileText className="w-4 h-4" />
                <span>Request a Quote (RFQ)</span>
              </Link>

              <a
                href="https://wa.me/message/PBVPZM3J7ETGH1"
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
