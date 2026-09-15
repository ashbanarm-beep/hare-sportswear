import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles, CheckCircle2, 
  FileText, Award, Layers, ChevronRight, Play, Star, Truck, Factory,
  Sliders, MessageCircle
} from 'lucide-react';
import { products } from '../data/products';
import { useRFQ } from '../context/RFQContext';

export default function HomePage() {
  const { setIsTechPackModalOpen } = useRFQ();

  // Mini-calculator state for fast quote estimate
  const [calcCategory, setCalcCategory] = useState('Teamwear & Jerseys');
  const [calcQuantity, setCalcQuantity] = useState(100);
  const [calcTechnique, setCalcTechnique] = useState('All-Over Sublimation');

  const portfolioItems = [
    {
      title: 'Real Atletico FC Match Kits',
      category: 'Pro Soccer / Football',
      client: 'Spanish Division 3 Club',
      specs: '160 GSM Micro-Interlock • Kiian Sublimation • 3D Silicone Badge',
      turnaround: '12 Days Production',
      image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Vanguard MMA Pro Rashguards',
      category: 'Combat Sports & BJJ',
      client: 'US Martial Arts Academy',
      specs: '230 GSM Poly-Spandex • 6-Thread Flatlock • Anti-Slip Gel Hem',
      turnaround: '10 Days Production',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Aura Athletics Seamless Gym Sets',
      category: 'Activewear / Women',
      client: 'UK Direct-to-Consumer Brand',
      specs: '240 GSM Nylon-Elastane • Squat-Proof • Laser Cut Ventilation',
      turnaround: '14 Days Production',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Championship Match Thermal Balls',
      category: 'Sports Goods / Match Balls',
      client: 'Nordic Youth Cup Tournament',
      specs: '1.2mm Textured Japanese PU • Thermal-Bonded 32 Panels • FIFA Pro',
      turnaround: '16 Days Production',
      image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80'
    }
  ];

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

            {/* Hero Right Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Hero Showcase Card */}
                <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] p-3 shadow-premium group">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1A1A1A]">
                    <img
                      src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1000&q=80"
                      alt="Custom manufactured sports jersey"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                    {/* Live Factory Tag */}
                    <div className="absolute top-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 text-xs text-[#1A1A1A] shadow-lg">
                      <div className="flex items-center gap-1.5 text-[#FF751F] font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Factory Live</span>
                      </div>
                      <p className="text-[11px] text-[#595856] mt-0.5">Sialkot Plant Active</p>
                    </div>

                    {/* Bottom Card Meta */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
                          Full Kit OEM/ODM Spec
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                          AQL 2.5 Passed
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base">
                        Pro Sublimated Match Kit 2026
                      </h4>
                      <div className="flex items-center justify-between text-xs text-cream-200 pt-1 border-t border-white/10">
                        <span>160 GSM CoolMax</span>
                        <span>•</span>
                        <span>Zero Color-Fade</span>
                        <span>•</span>
                        <span>Kiian Inks</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Floating Capacity Badge */}
                <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E5DFD5] shadow-xl animate-bounce duration-1000">
                  <div className="p-2.5 rounded-xl bg-[#FF751F]/15 text-[#FF751F]">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A1A1A]">150,000+ Units/Mo</p>
                    <p className="text-[10px] text-[#595856]">Continuous Production Capacity</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm">
            <div className="text-center p-3 border-r border-[#E5DFD5] last:border-r-0">
              <p className="text-3xl sm:text-4xl font-display font-black text-[#1A1A1A]">150K+</p>
              <p className="text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">Monthly Output</p>
            </div>
            <div className="text-center p-3 border-r border-[#E5DFD5] last:border-r-0">
              <p className="text-3xl sm:text-4xl font-display font-black text-[#FF751F]">45+</p>
              <p className="text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">Export Destinations</p>
            </div>
            <div className="text-center p-3 border-r border-[#E5DFD5] last:border-r-0">
              <p className="text-3xl sm:text-4xl font-display font-black text-[#FF751F]">25 Pcs</p>
              <p className="text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">Flexible Low MOQ</p>
            </div>
            <div className="text-center p-3">
              <p className="text-3xl sm:text-4xl font-display font-black text-emerald-600">99.4%</p>
              <p className="text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">On-Time Shipment</p>
            </div>
          </div>

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
            <span>View Complete 18-Product Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Category 1 */}
          <Link
            to="/products?category=teamwear"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col h-[460px] shadow-sm hover:shadow-xl"
          >
            <div className="relative h-2/3 overflow-hidden bg-[#1A1A1A]">
              <img
                src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80"
                alt="Teamwear & Kits"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#FF751F] text-white shadow">
                Soccer • Basketball • Cricket
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-2xl font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Teamwear & Kits
                </h3>
                <p className="text-xs text-[#595856] mt-2 line-clamp-2">
                  All-over sublimated club match kits, reversible basketball singlets, rugby jerseys, and cricket whites engineered with moisture-wicking interlock fabrics.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-4 border-t border-[#E5DFD5]">
                <span>Explore Teamwear Specs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Category 2 */}
          <Link
            to="/products?category=activewear"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col h-[460px] shadow-sm hover:shadow-xl"
          >
            <div className="relative h-2/3 overflow-hidden bg-[#1A1A1A]">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                alt="Activewear & Gym Essentials"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#FF751F] text-white shadow">
                Gym • Compression • Hoodies
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-2xl font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Activewear & Gym Essentials
                </h3>
                <p className="text-xs text-[#595856] mt-2 line-clamp-2">
                  Heavyweight French Terry hoodies, squat-proof seamless leggings, 4-way compression rashguards, and custom tapered performance joggers.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-4 border-t border-[#E5DFD5]">
                <span>Explore Activewear Specs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Category 3 */}
          <Link
            to="/products?category=accessories"
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col h-[460px] shadow-sm hover:shadow-xl"
          >
            <div className="relative h-2/3 overflow-hidden bg-[#1A1A1A]">
              <img
                src="https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80"
                alt="Sports Goods & Accessories"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#FF751F] text-white shadow">
                Balls • Gloves • Gear Bags
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-2xl font-display font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  Sports Goods & Accessories
                </h3>
                <p className="text-xs text-[#595856] mt-2 line-clamp-2">
                  FIFA-quality thermal-bonded soccer balls, German contact latex goalkeeper gloves, genuine leather boxing fight gloves, and 900D Cordura gym bags.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FF751F] font-bold pt-4 border-t border-[#E5DFD5]">
                <span>Explore Sports Goods</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* 4. Manufacturing Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            Lean OEM / ODM Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A]">
            The 4-Step Production Journey
          </h2>
          <p className="text-sm text-[#595856] leading-relaxed">
            From digital artwork vector specs to container dispatch, our transparent milestone tracking ensures zero miscommunication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white relative space-y-4 border border-[#E5DFD5] group hover:border-[#FF751F]/40 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-display font-black text-[#FF751F]/40 group-hover:text-[#FF751F] transition-colors">
                01
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FF751F]/10 text-[#FF751F] text-[11px] font-bold">
                1-2 Days
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
              Tech Pack & Consultation
            </h3>
            <p className="text-xs text-[#595856] leading-relaxed">
              Submit your AI/PDF tech pack or conceptual sketch. Our technical garment technicians verify fabric weights, seams, POM grading, and prepare 3D digital mockups.
            </p>
            <button
              onClick={() => setIsTechPackModalOpen(true)}
              className="text-xs font-bold text-[#FF751F] hover:underline inline-flex items-center gap-1"
            >
              <span>Download Tech Pack Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white relative space-y-4 border border-[#E5DFD5] group hover:border-[#FF751F]/40 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-display font-black text-[#FF751F]/40 group-hover:text-[#FF751F] transition-colors">
                02
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FF751F]/10 text-[#FF751F] text-[11px] font-bold">
                7-10 Days
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
              Sampling & Prototype
            </h3>
            <p className="text-xs text-[#595856] leading-relaxed">
              We cut, print, and sew a physical prototype. High-resolution HD photos and express DHL courier shipment give you 100% touch-and-fit approval before mass run.
            </p>
            <span className="text-[11px] text-[#8A847A] block">
              ✓ Includes Lab Dips & Strike-offs
            </span>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white relative space-y-4 border border-[#E5DFD5] group hover:border-[#FF751F]/40 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-display font-black text-[#FF751F]/40 group-hover:text-[#FF751F] transition-colors">
                03
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FF751F]/10 text-[#FF751F] text-[11px] font-bold">
                12-18 Days
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
              Mass Production
            </h3>
            <p className="text-xs text-[#595856] leading-relaxed">
              Automated spreading, CNC laser cutting, Italian Kiian heat-press sublimation, and inline assembly by specialized stitching lines equipped with Juki and Pegasus machinery.
            </p>
            <span className="text-[11px] text-[#8A847A] block">
              ✓ 10-point seam tensile verification
            </span>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-white relative space-y-4 border border-[#E5DFD5] group hover:border-[#FF751F]/40 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-display font-black text-[#FF751F]/40 group-hover:text-[#FF751F] transition-colors">
                04
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                3-5 Days Air
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
              AQL 2.5 QA & Delivery
            </h3>
            <p className="text-xs text-[#595856] leading-relaxed">
              End-of-line needle detector scan, barcode tag validation, moisture-sealed carton packing, and global dispatch via DHL Express, air cargo, or ocean containers.
            </p>
            <span className="text-[11px] text-[#8A847A] block">
              ✓ Full Customs Clearance Handled
            </span>
          </div>

        </div>
      </section>

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
          {portfolioItems.map((item, idx) => (
            <div
              key={idx}
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
              href="https://wa.me/923001234567?text=Hi%20Hare%20Sportswear,%20I'd%20like%20to%20speak%20with%20a%20production%20manager"
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

    </div>
  );
}
