import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, HeartHandshake, ShieldCheck, Award, Globe, 
  Leaf, ArrowRight, CheckCircle2, History, Compass, Target 
} from 'lucide-react';

export default function AboutPage() {
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
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="Hare Sportswear manufacturing plant floor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold text-[#FF751F] uppercase">
                  Sialkot Industrial Zone
                </span>
                <h4 className="font-display font-bold text-base mt-0.5">
                  Automated Spreading & High-Density Sublimation Workshop
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

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
