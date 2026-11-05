import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, MessageCircle, FileText, ChevronRight, ChevronDown,
  ArrowRight, Shirt, Dumbbell, Trophy, Sparkles
} from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Desktop dropdown state
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  // Mobile accordion state
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const productsRef = useRef(null);
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
    setMobileProductsOpen(false);
  }, [location.pathname, location.search]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      try {
        if (productsRef.current && !productsRef.current.contains(e.target)) {
          setProductsDropdownOpen(false);
        }
      } catch (err) {
        // Suppress DOM traversal errors
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isProductsActive = location.pathname.startsWith('/products');

  // Product categories for the dropdown
  const productCategories = [
    {
      name: 'Teamwear & Custom Kits',
      path: '/products/teamwear',
      desc: 'Soccer, rugby, basketball, cricket uniforms & technical kits',
      badge: 'High-Performance',
      icon: Shirt,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      name: "Sports Bras & Women's Activewear",
      path: '/products/womens-activewear',
      desc: 'High-impact sports bras, seamless leggings, bike shorts & yoga sets',
      badge: "Women's Line",
      icon: Sparkles,
      color: 'text-rose-600 bg-rose-50'
    },
    {
      name: "Men's Activewear & Training",
      path: '/products/activewear',
      desc: 'Compression rashguards, athletic joggers & heavyweight fleece hoodies',
      badge: 'Athleisure',
      icon: Dumbbell,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      name: 'Sports Caps & Headwear',
      path: '/products/sports-caps',
      desc: 'Laser-perforated baseball caps, athletic running visors & thermal beanies',
      badge: 'Headwear Line',
      icon: Sparkles,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      name: 'Sports Equipment & Goods',
      path: '/products/equipment',
      desc: 'FIFA-spec match balls, carbon shin pads, padel/badminton rackets & gear',
      badge: 'Gear & Balls',
      icon: Trophy,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      name: 'Wrestling & Combat Gear',
      path: '/products/equipment/combat-sports',
      desc: 'Championship belts, grappling dummies, headgear & wrestling boots',
      badge: 'Pro Combat',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#F5F1E8]/95 backdrop-blur-md shadow-md border-b border-[#E5DFD5] py-2.5' 
        : 'bg-[#F5F1E8] border-b border-[#E5DFD5] py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div className="shrink-0 flex items-center pr-2">
          <BrandLogo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ml-8 xl:ml-12 mr-8 xl:mr-12">
          
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) => `px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 ${
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
              className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 ${
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
                <div className="rounded-2xl bg-white border border-[#E5DFD5] shadow-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F]">
                        Sialkot Factory Divisions
                      </span>
                      <h4 className="text-sm font-display font-bold text-[#1A1A1A]">
                        Explore Our Manufacturing Categories
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#F5F1E8] text-[11px] font-semibold text-[#595856]">
                      Low MOQ from 25 Pcs
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {productCategories.map((cat, idx) => {
                      const Icon = cat.icon;
                      const isCurrent = location.pathname === cat.path;
                      return (
                        <Link
                          key={idx}
                          to={cat.path}
                          onClick={() => setProductsDropdownOpen(false)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition group ${
                            isCurrent
                              ? 'bg-[#FF751F]/5 border-[#FF751F]/50'
                              : 'border-transparent hover:border-[#FF751F]/30 hover:bg-[#FAF8F3]'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${cat.color} shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-xs text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors block truncate">
                              {cat.name}
                            </span>
                            <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
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
            to="/custom-sportswear-manufacturer"
            className={({ isActive }) => `px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 ${
              isActive 
                ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs' 
                : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
            }`}
          >
            Custom Manufacturing
          </NavLink>

          {/* Quality & Factory */}
          <NavLink
            to="/quality"
            className={({ isActive }) => `px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 ${
              isActive 
                ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs' 
                : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
            }`}
          >
            Quality & Factory
          </NavLink>

          {/* About Us */}
          <NavLink
            to="/about-us"
            className={({ isActive }) => `px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 ${
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
            className={({ isActive }) => `px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 ${
              isActive 
                ? 'text-[#FF751F] bg-[#FF751F]/10 border border-[#FF751F]/20 shadow-xs' 
                : 'text-[#1A1A1A] hover:text-[#FF751F] hover:bg-black/5'
            }`}
          >
            Blog
          </NavLink>
        </nav>

        {/* Right Actions & RFQ CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
            href="https://wa.me/923144634183?text=Hello%20Hare%20Sportswear,%20inquiry%20from%20mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 sm:hidden"
            aria-label="Direct WhatsApp Inquiry"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Mobile & Tablet Hamburger Menu Button */}
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
                  View All Products →
                </Link>
              </div>
            )}
          </div>

          {/* Custom Manufacturing */}
          <NavLink
            to="/custom-sportswear-manufacturer"
            className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
              isActive
                ? 'bg-[#FF751F]/15 text-[#FF751F]'
                : 'text-[#1A1A1A] hover:bg-black/5'
            }`}
          >
            <span>Custom Manufacturing</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </NavLink>

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
            to="/about-us"
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
  );
}