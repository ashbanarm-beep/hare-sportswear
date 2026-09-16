import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, HeartHandshake, ShieldCheck, Award, Globe, 
  Leaf, ArrowRight, CheckCircle2, History, Compass, Target,
  Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Factory, 
  Eye, LayoutGrid, Columns3
} from 'lucide-react';

export default function AboutPage() {
  const [layoutMode, setLayoutMode] = useState('grid-2x2');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const factoryImages = [
    {
      step: '01',
      title: 'Master Pattern Engineering & CAD Grading',
      stage: 'Pattern Engineering',
      image: '/images/factory/pattern-engineering.jpg',
      specs: 'Manual Grading Tables • Digital CAD Sizing',
      desc: 'Precision layout of master pattern templates on 60-foot cutting tables, ensuring anatomical garment drape and strict POM grading across XS to 5XL sizing.'
    },
    {
      step: '02',
      title: 'High-Speed Dye Sublimation Printing',
      stage: 'Digital Printing',
      image: '/images/factory/sublimation-printing.jpg',
      specs: 'Kiian Italian Inks • Continuous Roll-to-Roll',
      desc: 'Wide-format thermal dye sublimation presses applying vibrant, permanent colors directly into micro-interlock polyester with zero graphic cracking or color fade.'
    },
    {
      step: '03',
      title: 'Automated CNC Laser Cutting Bed',
      stage: 'Precision Cutting',
      image: '/images/factory/laser-cutting.jpg',
      specs: 'Optical Vision Laser • Micro-Tolerance Heat Seal',
      desc: 'Computer-guided CNC laser optics tracing sublimation print markers with sub-millimeter precision, heat-sealing edge fibers to prevent fraying during competition.'
    },
    {
      step: '04',
      title: 'Multi-Head Tajima Industrial Embroidery',
      stage: 'Artisanal Detailing',
      image: '/images/factory/tajima-embroidery.jpg',
      specs: '15-Color Synchronized Heads • 3D High-Density Puff',
      desc: 'Synchronized multi-needle Japanese Tajima embroidery lines producing dense 3D puff crests, championship badges, and reinforced club sponsor emblems.'
    }
  ];

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => (prev - 1 + factoryImages.length) % factoryImages.length);
      }
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => (prev + 1) % factoryImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);
  const values = [
    {
      title: 'Precision Craftsmanship',
      desc: 'Sialkot has been the sporting goods capital for over a century. We combine generational artisanal leather and stitching mastery with Japanese digital automation.',
      icon: Target
    },
    {
      title: 'Ethical & Humane Labor',
      desc: 'Strictly zero child labor, fair living wages above local statutory minimums, air-conditioned sewing floors, on-site medical dispensary, and equal opportunity employment.',
      icon: HeartHandshake
    },
    {
      title: 'Radical Transparency',
      desc: 'No hidden setup fees or surprise fabric substitutions. We provide open milestone tracking from lab dips to customs clearance with direct WhatsApp factory access.',
      icon: Compass
    },
    {
      title: 'Sustainable Production',
      desc: 'Recycled polyester yarns (rPET), water-based OEKO-TEX certified inks, in-house textile scrap sorting and recycling, and zero single-use non-biodegradable plastics in domestic packing.',
      icon: Leaf
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      
      {/* Hero */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Our Heritage & Corporate Narrative</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          Crafting World-Class Sportswear from the Heart of Sialkot
        </h1>
        <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
          For over two decades, <strong>Hare Sportswear & Goods</strong> has served as the quiet manufacturing engine behind global sportswear brands, collegiate athletic departments, and tournament organizers.
        </p>
      </div>

      {/* Story & Sialkot Heritage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-5 text-sm text-[#595856] leading-relaxed">
          <div className="flex items-center gap-2 text-[#FF751F] font-bold text-xs uppercase tracking-wider">
            <History className="w-4 h-4" /> Generational Craft Meets Modern Engineering
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1A1A]">
            The Sialkot Advantage: Where Global Champions Begin
          </h2>
          <p>
            Sialkot, Pakistan produces over 70% of the world's footballs and supplies high-performance sports apparel to premier global brands across the Americas, Europe, and Asia-Pacific.
          </p>
          <p>
            Hare Sportswear was founded to eliminate the traditional barriers that startups and sports clubs face when dealing with overseas factories. By establishing an agile production floor with low minimums (from 25 pieces) and 7-day rapid sampling, we allow growing athletic labels to compete with industry giants on quality and margin.
          </p>
          <p>
            Our 45,000 sq. ft facility houses integrated laser cutting, sublimation printing, 4-needle 6-thread flatlock seaming, Tajima multi-head embroidery, and certified AQL 2.5 testing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
              <span>45,000 Sq. Ft Plant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
              <span>250+ Skilled Artisans</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
              <span>150K Monthly Garments</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] p-3 shadow-xl">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A1A1A]">
              <img
                src="/images/factory/sublimation-printing.jpg"
                alt="Hare Sportswear roll-to-roll dye sublimation industrial printing floor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold text-[#FF751F] uppercase">
                  Sialkot Industrial Zone
                </span>
                <h4 className="font-display font-bold text-base mt-0.5">
                  High-Speed Kiian Sublimation Printing Line in Action
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Factory Floor Gallery: 4 Symmetric Production Stations */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E5DFD5]">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider flex items-center gap-2">
              <Factory className="w-4 h-4 text-[#FF751F]" />
              <span>Direct Sialkot OEM Facility</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-[#1A1A1A]">
              Inside Our Precision Manufacturing Floor
            </h3>
            <p className="text-xs sm:text-sm text-[#595856] max-w-2xl leading-relaxed">
              Authentic machinery and craftsmanship from our 45,000 sq. ft facility in Sialkot, Pakistan. Every custom garment is engineered across four integrated precision stations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#8A847A] hidden sm:inline mr-1">View Layout:</span>
            <div className="inline-flex p-1 rounded-xl bg-white border border-[#E5DFD5] text-xs font-semibold shadow-sm">
              <button
                type="button"
                onClick={() => setLayoutMode('grid-2x2')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  layoutMode === 'grid-2x2' 
                    ? 'bg-[#1A1A1A] text-white shadow-sm' 
                    : 'text-[#595856] hover:text-[#1A1A1A]'
                }`}
                title="Arrange in 2x2 symmetric quadrant grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>2 × 2 Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('grid-4col')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  layoutMode === 'grid-4col' 
                    ? 'bg-[#1A1A1A] text-white shadow-sm' 
                    : 'text-[#595856] hover:text-[#1A1A1A]'
                }`}
                title="Arrange in 4-column symmetric panorama"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span>4 Columns</span>
              </button>
            </div>
          </div>
        </div>

        {/* Symmetric 4-Images Grid */}
        <div className={`grid gap-6 ${
          layoutMode === 'grid-2x2'
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {factoryImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/60 p-3 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImageIndex(idx);
                }
              }}
              aria-label={`View enlarged photo of ${item.title}`}
            >
              {/* Image Container with Consistent Symmetric Aspect Ratio */}
              <div className={`relative w-full rounded-2xl overflow-hidden bg-[#1A1A1A] ${
                layoutMode === 'grid-2x2' ? 'aspect-[16/11]' : 'aspect-[4/5]'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                />

                {/* Subtle Gradient for Bottom Label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none"></div>

                {/* Top Badge: Process Step */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 text-[11px] font-bold text-[#1A1A1A] shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF751F]"></span>
                  <span>Station {item.step}</span>
                  <span className="text-[#8A847A]">|</span>
                  <span className="text-[#FF751F]">{item.stage}</span>
                </div>

                {/* Top Right Zoom Hint Button */}
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-[#FF751F] backdrop-blur-md border border-white/20 text-white text-xs transition-colors shadow-sm opacity-90 group-hover:opacity-100 flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold hidden sm:inline">Enlarge</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 p-3 sm:p-4 rounded-xl bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white space-y-1.5 pointer-events-none">
                  <h4 className="font-display font-bold text-sm sm:text-base text-white line-clamp-1 group-hover:text-[#FF751F] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#FF751F] font-semibold line-clamp-1">
                    {item.specs}
                  </p>
                  <p className="text-[11px] text-cream-200 line-clamp-2 leading-relaxed opacity-90">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal for Full-Screen Inspection */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImageIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative max-w-4xl w-full bg-[#1A1A1A] border border-white/20 rounded-3xl overflow-hidden shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#FF751F]/20 border border-[#FF751F]/40 text-[#FF751F] text-xs font-bold">
                  Station {factoryImages[selectedImageIndex].step} of 04
                </span>
                <span className="text-sm font-bold text-white">
                  {factoryImages[selectedImageIndex].stage}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8A847A] hidden sm:inline">
                  Use ← → keys or buttons to navigate
                </span>
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={factoryImages[selectedImageIndex].image}
                alt={factoryImages[selectedImageIndex].title}
                className="w-full h-full object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((selectedImageIndex - 1 + factoryImages.length) % factoryImages.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#FF751F] text-white border border-white/20 transition-all shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((selectedImageIndex + 1) % factoryImages.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#FF751F] text-white border border-white/20 transition-all shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Meta Footer */}
            <div className="p-4 sm:p-6 bg-[#141414] border-t border-white/10 text-white space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  {factoryImages[selectedImageIndex].title}
                </h3>
                <span className="text-xs font-semibold text-[#FF751F] bg-[#FF751F]/15 px-3 py-1 rounded-full border border-[#FF751F]/30 w-fit">
                  {factoryImages[selectedImageIndex].specs}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
                {factoryImages[selectedImageIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Core Values */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1A1A] mt-1">
            Our Core Values & Ethical Commitment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E5DFD5] space-y-3 hover:border-[#FF751F]/40 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#1A1A1A]">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#595856] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Compliance & Labor Standards Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#1A1A1A] text-white border border-black/40 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> BSCI & SEDEX Verified Social Compliance
            </span>
            <h3 className="text-2xl font-display font-bold text-white">
              Proudly Committed to Fair Wages & Workplace Safety
            </h3>
            <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
              We maintain strict adherence to international labor standards. We welcome unannounced third-party social audits (SGS, Intertek, Bureau Veritas) by our international brand partners.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>Request Compliance Audit Packet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
