import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, Plane, Ship, CheckCircle2, ArrowRight, 
  Sparkles, Clock, Globe, Award, ChevronRight, Package, 
  MessageCircle, FileText, Check, HelpCircle, Trophy, Flame, 
  Layers, Tag, CheckSquare, Zap, Star
} from 'lucide-react';
import { getCountryBySlug, countryServices } from '../data/countryServicesData';
import { useRFQ } from '../context/RFQContext';

export default function CountryServicePage() {
  const location = useLocation();
  const { countryCode } = useParams();
  const { openTechPackModal } = useRFQ();

  // Determine current country from params or pathname
  const cleanPath = location.pathname.replace(/^\/+|\/+$/g, '');
  const country = getCountryBySlug(countryCode || cleanPath) || countryServices[0];

  // Dynamically set Meta Title and Meta Description strictly per user requirement
  useEffect(() => {
    if (country) {
      document.title = country.metaTitle || `#1 Sportswear Manufacturer in ${country.name}`;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = country.metaDescription;
    }
  }, [country]);

  if (!country) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-display font-bold text-[#1A1A1A]">Service Region Not Found</h1>
        <p className="text-sm text-[#595856] mt-2">Please select one of our global export destinations.</p>
        <Link to="/" className="mt-4 px-6 py-2.5 rounded-xl bg-[#FF751F] text-white font-bold text-sm">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-[#EFE9DC] to-[#F5F1E8] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#595856] mb-6">
            <Link to="/" className="hover:text-[#FF751F] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#8A847A]">Global Export Markets</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#FF751F] font-semibold">{country.name} ({country.fullName})</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* National Market Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] shadow-sm">
                <span className="text-base leading-none">{country.flag}</span>
                <span className="text-[#FF751F] uppercase tracking-wider">{country.heroBadge}</span>
              </div>

              {/* Exact SEO H1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1A1A] leading-tight">
                #1 Sportswear Manufacturer in {country.name}
              </h1>

              {/* Subheadline with Natural SEO Keywords */}
              <p className="text-base sm:text-lg text-[#595856] leading-relaxed">
                {country.heroSubheadline}
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  to={`/contact?country=${encodeURIComponent(country.name)}&source=regional-page`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-[#FF751F] hover:bg-[#E65E08] transition-all duration-200 shadow-md shadow-[#FF751F]/20 hover:scale-[1.02]"
                >
                  <span>Request {country.name} Wholesale Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button
                  onClick={openTechPackModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-[#1A1A1A] bg-white hover:bg-[#FAF8F3] border border-[#E5DFD5] hover:border-[#FF751F]/40 transition-all duration-200 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#FF751F]" />
                  <span>Download Tech Pack Specs</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-[#595856]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>Customs & DDP Handled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>Door Delivery Across {country.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>7-Day Rapid Sample Approval</span>
                </div>
              </div>

            </div>

            {/* Right Card / Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] p-3 shadow-xl group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={country.heroImage}
                    alt={`${country.name} custom sportswear manufacturer`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                  {/* Top Live Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 text-xs text-[#1A1A1A] shadow font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Direct Sialkot ✈ {country.name}</span>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#FF751F] uppercase tracking-wider">
                      <span>Regional Express Freight</span>
                      <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                        AQL 2.5 Certified
                      </span>
                    </div>
                    <p className="font-display font-bold text-sm">
                      Door-to-door delivery across all major {country.name} metropolitan territories
                    </p>
                  </div>
                </div>

                {/* Country Quick Spec Strip */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#E5DFD5] text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F5F1E8]/70 border border-[#E5DFD5]/60">
                    <span className="text-[10px] text-[#8A847A] uppercase font-bold block">Standard Currency</span>
                    <span className="font-display font-bold text-[#1A1A1A]">{country.currency}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F5F1E8]/70 border border-[#E5DFD5]/60">
                    <span className="text-[10px] text-[#8A847A] uppercase font-bold block">Air Freight Transit</span>
                    <span className="font-display font-bold text-[#FF751F]">{country.stats[1].value}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Dynamic Statistics Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm">
            {country.stats.map((stat, i) => (
              <div 
                key={i} 
                className="text-center p-3 border-r border-[#E5DFD5] last:border-r-0"
              >
                <p className="text-3xl sm:text-4xl font-display font-black text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                  {stat.value}
                </p>
                <p className="text-xs text-[#595856] mt-1 uppercase tracking-wider font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Introduction & Market Trust Authority Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#E5DFD5] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-[#FF751F] fill-[#FF751F]" />
              <span>Trusted B2B Manufacturing Partner</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#1A1A1A]">
              Why Sports Brands & Teams in {country.name} Trust Hare Sportswear
            </h2>
            <p className="text-base font-semibold text-[#FF751F]">
              {country.introduction?.lead}
            </p>
            <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
              {country.introduction?.body}
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#E5DFD5]">
            {country.introduction?.highlights?.map((highlight, hIdx) => (
              <div key={hIdx} className="p-4 rounded-xl bg-[#F5F1E8]/70 border border-[#E5DFD5] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF751F] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#1A1A1A] leading-snug">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Manufacturing Offerings for this Country */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            Engineered For The {country.name} Market
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1A1A1A]">
            Our Core Offerings for {country.name}
          </h2>
          <p className="text-sm text-[#595856]">
            From high-impact team uniforms to luxury lifestyle apparel and wholesale sports goods, our Sialkot factory covers the entire spectrum of athletic manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {country.coreOfferings?.map((offering, oIdx) => (
            <div 
              key={oIdx}
              className="rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 p-6 sm:p-8 transition-all duration-300 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF751F]/10 text-[#FF751F] border border-[#FF751F]/20 flex items-center justify-center font-display font-black text-xl">
                  0{oIdx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-[#1A1A1A]">
                    {offering.category}
                  </h3>
                  <p className="text-xs text-[#595856] mt-1 leading-relaxed">
                    {offering.desc}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-2 border-t border-[#E5DFD5]/60 text-xs text-[#1A1A1A]">
                  {offering.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#FF751F] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5DFD5]">
                <Link
                  to={`/contact?country=${encodeURIComponent(country.name)}&product=${encodeURIComponent(offering.category)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F3] hover:bg-[#FF751F] hover:text-white text-[#1A1A1A] border border-[#E5DFD5] hover:border-[#FF751F] text-xs font-bold transition-all"
                >
                  <span>Inquire {offering.category.split('&')[0].trim()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Brands Choose Us in this Country */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1A1A1A] text-white p-8 sm:p-12 shadow-xl space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
              The Hare Sportswear Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white">
              Why Brands & Teams in {country.name} Choose Us
            </h2>
            <p className="text-sm text-cream-200">
              We eliminate the common pitfalls of international garment sourcing: high minimums, poor communication, faded sublimation, and delayed shipments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {country.whyChooseUs?.map((pillar, pIdx) => (
              <div key={pIdx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF751F]/20 text-[#FF751F] flex items-center justify-center">
                  {pIdx === 0 && <Package className="w-5 h-5" />}
                  {pIdx === 1 && <Flame className="w-5 h-5" />}
                  {pIdx === 2 && <ShieldCheck className="w-5 h-5" />}
                  {pIdx === 3 && <Plane className="w-5 h-5" />}
                </div>
                <h4 className="text-base font-display font-bold text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs text-cream-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Popular Regional Manufacturing Lines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            Target Sport Niches
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1A1A1A]">
            Popular Production Lines In {country.name}
          </h2>
          <p className="text-sm text-[#595856]">
            Engineered to meet the exact sizing charts, fabric durability requirements, and league regulations across {country.fullName}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {country.nicheFocus.map((niche, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 transition-all duration-300 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#FF751F]/15 text-[#FF751F] border border-[#FF751F]/30 flex items-center justify-center font-display font-black text-lg">
                  0{idx + 1}
                </div>
                <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
                  {niche.title}
                </h3>
                <p className="text-xs text-[#595856] leading-relaxed">
                  {niche.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DFD5]">
                <Link
                  to={`/contact?country=${encodeURIComponent(country.name)}&product=${encodeURIComponent(niche.title)}`}
                  className="text-xs font-bold text-[#FF751F] hover:text-[#E65E08] inline-flex items-center gap-1"
                >
                  <span>Inquire This Line</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Logistics, Shipping & Duty Compliance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#E5DFD5] p-8 sm:p-12 shadow-sm space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
              Seamless International Fulfillment
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#1A1A1A]">
              Shipping Logistics & Duty Clearances To {country.name}
            </h2>
            <p className="text-sm text-[#595856]">
              We eliminate export friction. Our logistics department coordinates direct priority air freight or consolidated ocean containers straight to your doorstep or warehouse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Air Freight */}
            <div className="p-6 rounded-2xl bg-[#F5F1E8]/70 border border-[#E5DFD5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1A1A1A]">Priority Air Cargo</h4>
              <p className="text-xs text-[#595856] leading-relaxed">
                <strong>Carriers:</strong> {country.logistics.airCarriers}
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-[#E5DFD5] text-xs font-semibold text-[#FF751F]">
                ⏱ Transit: {country.logistics.airTransit}
              </div>
            </div>

            {/* Sea Freight */}
            <div className="p-6 rounded-2xl bg-[#F5F1E8]/70 border border-[#E5DFD5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center">
                <Ship className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1A1A1A]">Consolidated Sea Freight</h4>
              <p className="text-xs text-[#595856] leading-relaxed">
                Ideal for large seasonal production runs (1,000+ units) seeking lowest landed cost per unit.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-[#E5DFD5] text-xs text-[#595856]">
                ⚓ {country.logistics.seaFreight}
              </div>
            </div>

            {/* Duty & Compliance */}
            <div className="p-6 rounded-2xl bg-[#F5F1E8]/70 border border-[#E5DFD5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1A1A1A]">Customs & DDP Support</h4>
              <p className="text-xs text-[#595856] leading-relaxed">
                {country.logistics.dutyCompliance}
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-xs font-semibold text-emerald-700">
                ✓ Full Commercial Invoice & Packing Lists Provided
              </div>
            </div>

          </div>

          {/* Popular Performance Fabrics Grid */}
          <div className="pt-4 border-t border-[#E5DFD5] space-y-4">
            <h4 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
              Standard Technical Fabrics Engineered For {country.name} Buyers:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {country.popularFabrics.map((fabric, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F1E8] border border-[#E5DFD5] text-xs text-[#1A1A1A] font-medium">
                  <Check className="w-4 h-4 text-[#FF751F] shrink-0" />
                  <span>{fabric}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Client Testimonial Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1A1A1A] text-white p-8 sm:p-12 shadow-xl border border-black/40">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/20 text-[#FF751F] text-xs font-bold">
              <span>{country.flag}</span>
              <span>Verified Client Review • {country.clientTestimonial.city}</span>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-display font-medium leading-relaxed text-white">
              "{country.clientTestimonial.quote}"
            </p>

            <div className="pt-2">
              <p className="font-display font-bold text-base text-white">
                {country.clientTestimonial.author}
              </p>
              <p className="text-xs text-[#FF751F]">
                {country.clientTestimonial.role}
              </p>
              <p className="text-xs text-cream-300 mt-0.5">
                {country.clientTestimonial.city}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Direct Conversion Call to Action for this country */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-black uppercase tracking-wider text-black/30 bg-white/20 px-3 py-1 rounded-full">
              Ready To Start Production?
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black">
              {country.ctaSection?.headline || `Launch Your Next Sportswear Collection in ${country.name}`}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              {country.ctaSection?.subheadline || `Send us your tech packs or design ideas today. Our export managers provide guaranteed 24-hour turnaround on technical quotes, freight estimates, and free digital mockups.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              to={`/contact?country=${encodeURIComponent(country.name)}`}
              className="px-8 py-4 rounded-xl bg-white text-[#1A1A1A] hover:bg-[#FAF8F3] font-bold text-sm text-center shadow-lg hover:scale-105 transition-transform"
            >
              {country.ctaSection?.buttonText || `Request ${country.name} Quote`}
            </Link>
            <a
              href={`https://wa.me/923001234567?text=Hello%20Hare%20Sportswear,%20inquiring%20about%20manufacturing%20for%20${encodeURIComponent(country.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-[#1A1A1A] hover:bg-black text-white font-bold text-sm text-center flex items-center justify-center gap-2 border border-white/20 hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. Targeted SEO Keywords Integration Strip */}
      {country.targetKeywords && country.targetKeywords.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-2xl bg-white/70 border border-[#E5DFD5] space-y-2">
            <span className="text-[11px] font-bold text-[#8A847A] uppercase tracking-wider block">
              Related Search Capabilities & Manufacturing Services in {country.name}:
            </span>
            <div className="flex flex-wrap gap-2">
              {country.targetKeywords.map((keyword, kIdx) => (
                <span 
                  key={kIdx} 
                  className="px-3 py-1 rounded-lg bg-[#FAF8F3] border border-[#E5DFD5] text-[11px] font-semibold text-[#595856]"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Other Regional Markets Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#595856]">
              Explore Other Major Global Export Destinations:
            </h4>
            <Link to="/contact" className="text-xs font-bold text-[#FF751F] hover:underline">
              View All Destinations →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {countryServices.filter((c) => c.slug !== cleanPath).map((c) => (
              <Link
                key={c.id}
                to={`/${c.slug}`}
                className="p-3 rounded-xl bg-white border border-[#E5DFD5] hover:border-[#FF751F] text-center transition-all group shadow-sm hover:shadow"
              >
                <span className="text-2xl block mb-1">{c.flag}</span>
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors block">
                  {c.name}
                </span>
                <span className="text-[10px] text-[#8A847A] block truncate">
                  {c.stats[1].value} Air
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
