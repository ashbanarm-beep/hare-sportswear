import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles, CheckCircle2, 
  FileText, Award, Layers, ChevronRight, Play, Star, Truck, Factory,
  Sliders, MessageCircle
} from 'lucide-react';
import { products } from '../data/products';
import { useRFQ } from '../context/RFQContext';
import AnimatedCounter from '../components/common/AnimatedCounter';
import ProductionTimeline from '../components/home/ProductionTimeline';
import GlobalExportFootprint from '../components/home/GlobalExportFootprint';
import HurryHeroInteractive from '../components/mascot/HurryHeroInteractive';
import PageFAQSection from '../components/common/PageFAQSection';
import DynamicPageContent from '../components/cms/DynamicPageContent';
import MeetFounderSection from '../components/home/MeetFounderSection';

import { useCMS } from '../context/CMSContext';

export default function HomePage() {
  const { setIsTechPackModalOpen } = useRFQ();
  const { caseStudies } = useCMS();

  useEffect(() => {
    const pageTitle = "Hare Sportswear: Best Sportswear Manufacturer In Sialkot";
    const pageDescription = "Looking for a reliable sportswear manufacturer? Partner with Hare Sportswear for custom teamwear, activewear, and fitness gear direct from Sialkot. Get a quote today";
    document.title = pageTitle;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDescription);

    // Set og:title meta tag
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', pageTitle);

    // Set og:description meta tag
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', pageDescription);

    // Set twitter:title meta tag
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', pageTitle);

    // Set twitter:description meta tag
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', pageDescription);
  }, []);

  // Mini-calculator state for fast quote estimate
  const [calcCategory, setCalcCategory] = useState('Teamwear & Jerseys');
  const [calcQuantity, setCalcQuantity] = useState(100);
  const [calcTechnique, setCalcTechnique] = useState('All-Over Sublimation');

  // Filter only active case studies from CMS
  const activeCaseStudies = (caseStudies || []).filter(item => item.active !== false);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-10 pb-16 overflow-hidden">
        {/* Warm Subtle Grid */}
        <div className="absolute inset-0 grid-pattern-light opacity-50"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-[#FF751F]/15 via-amber-200/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD5] text-xs font-semibold text-[#1A1A1A] shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF751F] animate-pulse"></span>
                <span>Premier Sialkot OEM/ODM Sports Manufacturer</span>
                <span className="text-[#C9BEAB]">•</span>
                <span className="text-[#FF751F] font-bold">2026/27 Production Active</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black tracking-tight leading-[1.08] text-[#1A1A1A]">
                Engineered for Performance. <br />
                <span className="text-gradient-orange">Manufactured to Perfection.</span>
              </h1>

              <p className="text-base sm:text-xl text-[#595856] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                We empower international sports brands, tournament organizers, and athletic startups with factory-direct custom sportswear, technical sublimation, and premium athletic equipment. Low MOQs, rapid 7-day sampling, and precision Sialkot craftsmanship.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#FF751F] via-[#FF8438] to-[#E65E08] shadow-glow-orange hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Start Custom Production</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-[#1A1A1A] bg-white hover:bg-[#FAF8F3] border border-[#E5DFD5] hover:border-[#FF751F]/40 transition-all duration-200 shadow-sm"
                >
                  <span>Explore Products</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Trust Indicators below CTA */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#595856]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>MOQ from 25 Sets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>7-Day Rapid Sampling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>Air & Ocean Door Delivery</span>
                </div>
              </div>

            </div>

            {/* Hero Right Visual (5 cols) featuring Interactive "Hurry the Hare" Mascot */}
            <div className="lg:col-span-5 relative pt-10 sm:pt-6 lg:pt-0">
              <HurryHeroInteractive />
            </div>

          </div>

          {/* Animated Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm">
            <div className="text-center p-3 border-r border-b md:border-b-0 border-[#E5DFD5]">
              <p className="text-2xl sm:text-4xl font-display font-black text-[#1A1A1A]">
                <AnimatedCounter target={150} suffix="K+" duration={2000} />
              </p>
              <p className="text-[11px] sm:text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">Monthly Output</p>
            </div>
            <div className="text-center p-3 border-b md:border-b-0 md:border-r border-[#E5DFD5]">
              <p className="text-2xl sm:text-4xl font-display font-black text-[#FF751F]">
                <AnimatedCounter target={45} suffix="+" duration={1800} />
              </p>
              <p className="text-[11px] sm:text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">Export Destinations</p>
            </div>
            <div className="text-center p-3 border-r border-[#E5DFD5]">
              <p className="text-2xl sm:text-4xl font-display font-black text-[#FF751F]">
                <AnimatedCounter target={25} suffix=" Pcs" duration={1600} />
              </p>
              <p className="text-[11px] sm:text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">Flexible Low MOQ</p>
            </div>
            <div className="text-center p-3">
              <p className="text-2xl sm:text-4xl font-display font-black text-emerald-600">
                <AnimatedCounter target={99.4} decimals={1} suffix="%" duration={2200} />
              </p>
              <p className="text-[11px] sm:text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">On-Time Shipment</p>
            </div>
          </div>

          {/* Dynamic Top Announcement / Hero Content Blocks (Elementor Page Builder) */}
          <DynamicPageContent pageId="home-top" className="mt-8" />

        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-[#E5DFD5] glass-card-hover space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#FF751F]/15 text-[#FF751F] border border-[#FF751F]/30 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">Flexible Low MOQs</h3>
            <p className="text-xs text-[#595856] leading-relaxed">
              Launch your athletic brand without massive inventory risk. Production runs start at just 25-50 pieces per style with mixed sizing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5DFD5] glass-card-hover space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#FF751F]/15 text-[#FF751F] border border-[#FF751F]/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">Italian Kiian Inks</h3>
            <p className="text-xs text-[#595856] leading-relaxed">
              Sublimation powered by authentic Kiian & Epson digital systems. Zero wash degradation, breathability remains 100% unimpeded.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5DFD5] glass-card-hover space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">100% Quality Inspection</h3>
            <p className="text-xs text-[#595856] leading-relaxed">
              Every production lot undergoes statistical AQL 2.5 audits: tensile seam resistance, color fastness, and dual-needle metal detection scans.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5DFD5] glass-card-hover space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#FF751F]/15 text-[#FF751F] border border-[#FF751F]/30 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">Global Express Freight</h3>
            <p className="text-xs text-[#595856] leading-relaxed">
              Direct dry-port customs clearance from Sialkot with priority 3-5 day DHL/FedEx air freight or consolidated ocean containers.
            </p>
          </div>

        </div>
      </section>

      {/* Global Export Footprint Section */}
      <GlobalExportFootprint />

      {/* 3. Core Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
              Specialized Product Divisions
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] mt-1">
              Core Manufacturing Capabilities
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF751F] hover:text-[#E65E08] transition-colors"
          >
            <span>View Complete 32-Product Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          
          {/* Category 1: Teamwear */}
          <Link
            to="/products?category=teamwear"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col min-h-[420px] h-auto shadow-sm hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden bg-white p-4 flex items-center justify-center border-b border-[#E5DFD5]">
              <img
                src="/teamwear-img.jpg"
                alt="Custom Teamwear & Kits"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md border border-[#E5DFD5] text-[#FF751F] shadow-sm">
                Cricket • Basketball • Football
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Teamwear & Kits
                </h3>
                <p className="text-xs text-[#595856] mt-1.5 line-clamp-2">
                  All-over sublimated club match kits, reversible basketball singlets, rugby jerseys, and cricket whites.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-3 border-t border-[#E5DFD5]">
                <span>Explore Teamwear</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Category 2: Sports Bras & Women's Activewear */}
          <Link
            to="/products?category=womens-activewear"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col min-h-[420px] h-auto shadow-sm hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden bg-white p-4 flex items-center justify-center border-b border-[#E5DFD5]">
              <img
                src="/images/products/product-10-seamless-leggings.jpg"
                alt="Sports Bras & Women's Activewear"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md border border-[#E5DFD5] text-[#FF751F] shadow-sm">
                Sports Bras • Leggings • Shorts
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Women's Activewear
                </h3>
                <p className="text-xs text-[#595856] mt-1.5 line-clamp-2">
                  High-impact sports bras, squat-proof seamless leggings, and compression biker shorts strictly engineered for women.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-3 border-t border-[#E5DFD5]">
                <span>Explore Women's Line</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Category 3: Men's Activewear & Training */}
          <Link
            to="/products?category=activewear"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col min-h-[420px] h-auto shadow-sm hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden bg-white p-4 flex items-center justify-center border-b border-[#E5DFD5]">
              <img
                src="/activewear-img.jpg"
                alt="Men's Activewear & Training"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md border border-[#E5DFD5] text-[#FF751F] shadow-sm">
                Hoodies • Joggers • Rashguards
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Men's Activewear & Gym
                </h3>
                <p className="text-xs text-[#595856] mt-1.5 line-clamp-2">
                  Heavyweight French Terry hoodies, 4-way compression rashguards, gym tees, and tapered performance joggers.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-3 border-t border-[#E5DFD5]">
                <span>Explore Men's Specs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Category 4: Sports Caps & Headwear (NEW) */}
          <Link
            to="/products?category=sports-caps"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col min-h-[420px] h-auto shadow-sm hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden bg-white p-4 flex items-center justify-center border-b border-[#E5DFD5]">
              <img
                src="/images/products/performance-baseball-cap.webp"
                alt="Sports Caps & Athletic Headwear"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md border border-[#E5DFD5] text-[#FF751F] shadow-sm">
                Caps • Visors • Beanies
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Sports Caps &amp; Headwear
                </h3>
                <p className="text-xs text-[#595856] mt-1.5 line-clamp-2">
                  Laser-perforated baseball caps, aerodynamic running visors, and thermal seamless rib-knit beanies with 3D Tajima embroidery.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-3 border-t border-[#E5DFD5]">
                <span>Explore Caps &amp; Headwear</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Category 5: Sports Equipment & Protective Goods */}
          <Link
            to="/products?category=equipment"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col min-h-[420px] h-auto shadow-sm hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden bg-white p-4 flex items-center justify-center border-b border-[#E5DFD5]">
              <img
                src="/equipment-img.jpg"
                alt="Sports Equipment, Balls & Shin Pads"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md border border-[#E5DFD5] text-[#FF751F] shadow-sm">
                Balls • Shin Pads • Rackets • Gear
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Sports Equipment &amp; Goods
                </h3>
                <p className="text-xs text-[#595856] mt-1.5 line-clamp-2">
                  FIFA-spec match balls, tournament-grade soccer shin pads, Toray carbon padel rackets, dumbbells, and gear.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-3 border-t border-[#E5DFD5]">
                <span>Explore Equipment Specs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Category 5: Wrestling & Combat Gear */}
          <Link
            to="/products?category=equipment&sub=combat-sports"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col min-h-[420px] h-auto shadow-sm hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden bg-white p-4 flex items-center justify-center border-b border-[#E5DFD5]">
              <img
                src="/images/products/product-29-championship-belt.jpg"
                alt="Wrestling Equipment & Combat Gear"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md border border-[#E5DFD5] text-[#FF751F] shadow-sm">
                Belts • Dummies • Headgear • Boots
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Wrestling & Combat Gear
                </h3>
                <p className="text-xs text-[#595856] mt-1.5 line-clamp-2">
                  Championship title belts, 900 GSM grappling dummies, ear guards, and wrestling boots.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-3 border-t border-[#E5DFD5]">
                <span>Explore Wrestling Gear</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* 4. Manufacturing Process Section (Interactive Side-by-Side Timeline with Orange Progress Pipeline) */}
      <ProductionTimeline />

      {/* 5. Production Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1A1A1A] text-white border border-black/40 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/20 text-[#FF751F] text-xs font-bold">
                <Sliders className="w-3.5 h-3.5" /> Instant Production Calculator
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
                Estimate Your Custom Manufacturing Parameters
              </h2>
              <p className="text-sm text-cream-200 leading-relaxed">
                Configure your desired garment type, volume, and printing process to get estimated lead times, sampling speed, and direct wholesale routing.
              </p>

              <div className="pt-2 space-y-2 text-xs text-cream-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>Free Tech Pack Review with every inquiry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>Transparent tiered pricing with zero hidden tooling charges</span>
                </div>
              </div>
            </div>

            {/* Interactive Calculator Box */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#242220] border border-white/10 space-y-6">
              
              {/* Product Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-200 mb-2">
                  Select Product Line
                </label>
                <select
                  value={calcCategory}
                  onChange={(e) => setCalcCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF751F]"
                >
                  <option value="Teamwear & Jerseys" className="bg-[#1A1A1A] text-white">Teamwear & Match Jerseys</option>
                  <option value="Activewear & Compression" className="bg-[#1A1A1A] text-white">Activewear, Leggings & Compression</option>
                  <option value="Sports Bras & Women's Activewear" className="bg-[#1A1A1A] text-white">Sports Bras & Women's Activewear</option>
                  <option value="Sports Caps & Headwear" className="bg-[#1A1A1A] text-white">Sports Caps, Running Visors &amp; Beanies</option>
                  <option value="Wrestling Equipment & Combat Gear" className="bg-[#1A1A1A] text-white">Wrestling Equipment & Combat Gear</option>
                  <option value="Streetwear & Hoodies" className="bg-[#1A1A1A] text-white">Heavyweight Hoodies & Joggers</option>
                  <option value="Sports Match Balls" className="bg-[#1A1A1A] text-white">Thermal-Bonded FIFA Soccer Balls</option>
                  <option value="Combat Gear & Gloves" className="bg-[#1A1A1A] text-white">Boxing Gloves & BJJ Gis</option>
                </select>
              </div>

              {/* Quantity Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-cream-200">
                    Order Quantity (Units / Sets)
                  </label>
                  <span className="text-sm font-display font-extrabold text-[#FF751F] bg-[#FF751F]/15 px-3 py-0.5 rounded border border-[#FF751F]/30">
                    {calcQuantity} Pieces
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="2000"
                  step="25"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value))}
                  className="w-full accent-[#FF751F] bg-white/20 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-cream-400 mt-1">
                  <span>25 (Sample Run)</span>
                  <span>500 (Club / Brand)</span>
                  <span>2000+ (Distributor Bulk)</span>
                </div>
              </div>

              {/* Printing Technique */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-200 mb-2">
                  Primary Embellishment
                </label>
                <select
                  value={calcTechnique}
                  onChange={(e) => setCalcTechnique(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF751F]"
                >
                  <option value="All-Over Sublimation" className="bg-[#1A1A1A] text-white">All-Over Dye Sublimation (Kiian Inks)</option>
                  <option value="Tajima 3D Embroidery" className="bg-[#1A1A1A] text-white">Tajima Multi-Head 3D Embroidery</option>
                  <option value="Silicone Heat Transfer" className="bg-[#1A1A1A] text-white">Raised 3D Silicone Heat Transfer</option>
                  <option value="Screen Print & Puff" className="bg-[#1A1A1A] text-white">Plastisol Screen Print / High Density Puff</option>
                </select>
              </div>

              {/* Summary & Forward to RFQ */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-cream-300 block">Est. Production Window:</span>
                  <span className="text-sm font-bold text-white">
                    {calcQuantity <= 100 ? '10-12 Days' : calcQuantity <= 500 ? '14-16 Days' : '18-22 Days'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-cream-300 block">Pricing Tier:</span>
                  <span className="text-sm font-bold text-[#FF751F]">
                    {calcQuantity < 100 ? 'Tier 1 (Startup)' : calcQuantity < 500 ? 'Tier 2 (Pro Club)' : 'Tier 3 (Bulk Wholesale)'}
                  </span>
                </div>
              </div>

              <Link
                to={`/contact?cat=${encodeURIComponent(calcCategory)}&qty=${calcQuantity}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-glow-orange transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Request Quotation with these Specs</span>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* 6. Portfolio Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
              Proven Global Deliveries
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] mt-1">
              Production Portfolio & Case Studies
            </h2>
          </div>
          <p className="text-xs text-[#595856] max-w-md">
            Recent custom manufacturing runs completed at our Sialkot facility for international athletic clubs, apparel startups, and sporting leagues.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCaseStudies.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group rounded-2xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 transition-all duration-300 flex flex-col shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-[#1A1A1A]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-white border border-white/15 backdrop-blur-sm">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FF751F] text-white">
                  {item.turnaround}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-display font-bold text-base text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#FF751F] font-bold mt-0.5">
                    Client: {item.client}
                  </p>
                </div>
                <p className="text-xs text-[#595856] border-t border-[#E5DFD5] pt-2 font-mono text-[11px]">
                  {item.specs}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Founder & Executive Sialkot Vision Section */}
      <MeetFounderSection />

      {/* Dynamic Visual Content Blocks (Configurable via Admin Elementor-Style Page Builder) */}
      <DynamicPageContent pageId="home" />

      {/* 7. Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1A1A1A] text-white border border-black/40 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FF751F]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white max-w-3xl mx-auto leading-tight">
            Ready to Bring Your Custom Sportswear Line to Market?
          </h2>
          <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto leading-relaxed">
            Send us your tech pack or rough design concept. Our Sialkot engineering team will generate a customized pricing sheet and sampling plan within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] shadow-glow-orange hover:shadow-xl transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Submit RFQ & Tech Pack</span>
            </Link>

            <a
              href="https://wa.me/message/PBVPZM3J7ETGH1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Discussion</span>
            </a>
          </div>
        </div>
      </section>

      {/* Dedicated FAQ Accordion Section (Managed via Admin Dynamic FAQ Manager) */}
      <PageFAQSection 
        pageId="home" 
        title="Frequently Asked Questions" 
        subtitle="Key manufacturing insights, sampling processes, MOQ requirements, and international export procedures direct from our Sialkot factory."
      />

    </div>
  );
}
