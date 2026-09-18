import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, ShieldCheck, ArrowRight, MessageCircle, 
  FileText, CheckCircle2, ChevronRight, Trophy, Flame, 
  Layers, Package, Plane, Scissors, Star, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRFQ } from '../context/RFQContext';

export default function MeetHarePage() {
  const { openTechPackModal } = useRFQ();

  useEffect(() => {
    document.title = "Our Brand Story & Identity | Hare Sportswear & Goods";
    window.scrollTo(0, 0);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#FF751F', '#FFA05C', '#1A1A1A', '#FFFFFF']
      });
    } catch (e) {}
  }, []);

  const handleHeroConfetti = () => {
    try {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.5 },
        colors: ['#FF751F', '#FFA05C', '#1A1A1A', '#FFFFFF']
      });
    } catch (e) {}
  };

  const brandPillars = [
    {
      title: 'Custom Teamwear & Match Kits',
      role: 'Italian Kiian Digital Dye & Breathable Interlock',
      image: '/teamwear-img.jpg',
      badge: 'Teamwear Standard',
      quote: '"Engineered with disperse Italian sublimation that bonds directly to synthetic fibers, guaranteeing numbers and sponsor crests never peel, crack, or fade."'
    },
    {
      title: 'Activewear & Technical Apparel',
      role: 'Pattern Engineering & 7-Day Rapid Sampling',
      image: '/activewear-img.jpg',
      badge: '7-Day Sampling Lead',
      quote: '"Our dedicated CAD pattern room turns around vector strike-offs in 24 hours and delivers physical samples via DHL Express in 7 days."'
    },
    {
      title: 'Sports Equipment & Goods',
      role: 'Worldwide DDP Air & Ocean Export',
      image: '/equipment-img.jpg',
      badge: '45+ Export Markets',
      quote: '"Direct priority air delivery into the USA, UK, Canada, Australia, and Europe with all customs duties and clearing pre-handled to your door."'
    }
  ];

  return (
    <div className="space-y-20 pb-24">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-[#EFE9DC] to-[#F5F1E8] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#595856] mb-6">
            <Link to="/" className="hover:text-[#FF751F] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#8A847A]">Company</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#FF751F] font-semibold">Brand Story & Identity</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] shadow-sm">
                <img src="/brand-logo-icon.png" alt="Hare Logo" className="w-4 h-4 object-contain" />
                <span className="text-[#FF751F] uppercase tracking-wider">Engineered For Athletic Speed & Precision</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#1A1A1A] leading-tight">
                The Symbol of Speed: <br />
                <span className="text-gradient-orange">Hare Sportswear & Goods</span>
              </h1>

              <p className="text-base sm:text-lg text-[#595856] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Our dynamic forward-leaning Letter H emblem embodies rapid 7-day physical sampling, high-agility manufacturing, and obsessive tailor precision from Sialkot to sports brands across the world.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/contact?source=meet-hare"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] shadow-glow-orange hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  <span>Build Your Custom Kit</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button
                  onClick={openTechPackModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-[#1A1A1A] bg-white hover:bg-[#FAF8F3] border border-[#E5DFD5] hover:border-[#FF751F]/40 transition-all shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#FF751F]" />
                  <span>Download Free Tech Pack</span>
                </button>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#595856]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>Always Fast: 7-Day Samples</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>Always Flexible: 25 Pcs MOQ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                  <span>Always Reliable: AQL 2.5 Certified</span>
                </div>
              </div>

            </div>

            {/* Right Brand Emblem Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div 
                onClick={handleHeroConfetti}
                className="relative rounded-3xl overflow-hidden bg-[#1A1A1A] border-2 border-[#FF751F]/50 p-6 shadow-2xl group cursor-pointer"
                title="Click for celebratory brand confetti!"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#252321] via-[#1A1A1A] to-[#0D0C0B] flex flex-col justify-between p-6">
                  
                  {/* Subtle Blueprint Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  {/* Ambient Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#FF751F]/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Status Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white uppercase tracking-wider">
                      Official Logo
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Sialkot OEM HQ
                    </span>
                  </div>

                  {/* Center Emblem Presentation */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center p-4">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md group-hover:scale-105 transition-transform duration-500">
                      <img
                        src="/brand-logo-icon.png"
                        alt="Hare Sportswear & Goods Official Logo"
                        className="w-48 sm:w-56 h-auto object-contain select-none drop-shadow-[0_8px_20px_rgba(255,117,31,0.4)]"
                      />
                    </div>
                  </div>

                  {/* Bottom Text Label */}
                  <div className="relative z-10 text-white text-center pt-3 border-t border-white/10">
                    <p className="font-display font-bold text-lg text-white">Hare Sportswear & Goods</p>
                    <p className="text-xs text-[#FF751F] font-mono uppercase tracking-wider">Aerodynamic Speed • Precision Tailoring</p>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. The Story Behind "The Hare" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#E5DFD5] p-8 sm:p-14 shadow-sm space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF751F]" />
              <span>Why We Chose The Hare</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1A1A1A]">
              The Antidote to Sluggish Sportswear Supply Chains
            </h2>
            <p className="text-base text-[#595856] leading-relaxed">
              Traditional garment manufacturing moves like a tortoise: 12-to-16-week lead times, inflexible 500-piece minimums, and bureaucratic communication that causes sports clubs and apparel founders to miss tournament kickoffs and seasonal retail windows.
            </p>
            <p className="text-base text-[#595856] leading-relaxed">
              We founded <strong>Hare Sportswear & Goods</strong> with a different philosophy: <strong>relentless speed, intelligent agility, and pinpoint manufacturing accuracy</strong>. The Hare is our commitment to agility, quick responsiveness, and tournament-level output.
            </p>
          </div>

          {/* 3 Core Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E5DFD5]">
            <div className="p-6 rounded-2xl bg-[#F5F1E8]/70 border border-[#E5DFD5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center font-black text-xl">
                ⚡
              </div>
              <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
                Swift 7-Day Sampling
              </h3>
              <p className="text-xs text-[#595856] leading-relaxed">
                While traditional factories take 45 days just to send a prototype, our dedicated sample room turns around digital 3D CADs in 24 hours and delivers physical strike-offs in 7 days via DHL Express.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F1E8]/70 border border-[#E5DFD5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center font-black text-xl">
                🎯
              </div>
              <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
                Agile 25-Piece Low MOQs
              </h3>
              <p className="text-xs text-[#595856] leading-relaxed">
                We don't lock you into massive inventory. Start small, test market demand, and scale your brand with complete size and colour flexibility across youth and adult categories.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F1E8]/70 border border-[#E5DFD5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center font-black text-xl">
                ✂
              </div>
              <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
                Uncompromising Precision
              </h3>
              <p className="text-xs text-[#595856] leading-relaxed">
                Speed means nothing without precision. Every cut uses CNC laser precision, automated Juki flatlock lines, genuine Italian Kiian sublimation inks, and statistical AQL 2.5 quality control.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Three Core Manufacturing Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            Industrial Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1A1A1A]">
            The Three Pillars of Hare Manufacturing
          </h2>
          <p className="text-sm text-[#595856]">
            From concept consultation to the cutting floor and international customs clearance, our Sialkot facility oversees every link in your production chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandPillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="rounded-3xl bg-white border border-[#E5DFD5] p-5 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#E5DFD5] p-3 flex items-center justify-center">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-[#E5DFD5] text-[11px] font-bold text-[#FF751F] shadow-sm">
                    {pillar.badge}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-[#1A1A1A]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#FF751F] mt-0.5">
                    {pillar.role}
                  </p>
                  <p className="text-xs text-[#595856] mt-3 italic leading-relaxed bg-[#F5F1E8]/70 p-3 rounded-xl border border-[#E5DFD5]">
                    {pillar.quote}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5DFD5]">
                <Link
                  to="/products"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F3] hover:bg-[#FF751F] hover:text-white text-[#1A1A1A] border border-[#E5DFD5] hover:border-[#FF751F] text-xs font-bold transition-all"
                >
                  <span>Explore Product Line</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Ready to Build Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#FF751F] via-[#FF8438] to-[#E65E08] text-white p-8 sm:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-black/40 bg-white/25 px-3 py-1 rounded-full inline-block">
              Start Your Production Run
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Ready to Experience Sialkot Speed & Precision?
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              Send your design ideas or vector tech pack today. Our master manufacturing team will prepare your technical quotation, BOM specifications, and digital 3D mockups within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
            <Link
              to="/contact?source=meet-hare"
              className="px-8 py-4 rounded-xl bg-white text-[#1A1A1A] hover:bg-[#FAF8F3] font-bold text-sm text-center shadow-lg hover:scale-105 transition-transform"
            >
              Request Custom Quote
            </Link>
            <a
              href="https://wa.me/923001234567?text=Hello%20Hare%20Sportswear,%20I%20want%20to%20manufacture%20custom%20sportswear"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-[#1A1A1A] hover:bg-black text-white font-bold text-sm text-center flex items-center justify-center gap-2 border border-white/20 hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat With Factory</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
