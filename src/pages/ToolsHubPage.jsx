import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, Pipette, Calculator, BookOpen, Sparkles, 
  ArrowRight, ShieldCheck, CheckCircle2, Factory, Zap, Clock, Globe
} from 'lucide-react';
import DynamicPageContent from '../components/cms/DynamicPageContent';
import PageFAQSection from '../components/common/PageFAQSection';

export default function ToolsHubPage() {
  const tools = [
    {
      id: 'ai-mockup-generator',
      title: 'AI Sportswear Mockup & Prototype Generator',
      badge: 'Google Gemini AI Powered',
      description: 'Generate photorealistic custom sportswear mockups, apparel prototypes, and Pantone color BOM specifications directly with Google Gemini AI. Instant 1600px PNG downloads and direct RFQ quote attachment.',
      icon: Sparkles,
      color: 'from-purple-600 via-pink-600 to-orange-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      link: '/tools/ai-mockup-generator',
      features: [
        'Soccer jerseys, wrestling singlets, hoodies & combat wear',
        'Front & back view vector studio with dynamic fabric drape',
        'Calibrated Pantone TCX colorway matching & sublimation formulas',
        'Direct 1-click RFQ attachment for Sialkot physical sampling'
      ]
    },
    {
      id: 'pantone-matcher',
      title: 'Pantone Color Matcher & Swatches',
      badge: 'Digital Color Lab',
      description: 'Match any HEX color or brand identity code to authentic Pantone (PMS) textile standards calibrated for Italian Kiian sublimation inks and embroidery threads.',
      icon: Pipette,
      color: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      link: '/tools/pantone-matcher',
      features: [
        'Instant nearest PMS textile algorithm',
        'Fabric strike-off texture simulator',
        'Italian Kiian Hi-Pro sublimation ink recipes',
        'Direct 1-click RFQ color attachment'
      ]
    },
    {
      id: 'palette-generator',
      title: 'Athletic Palette Generator & Kit Preview',
      badge: 'Uniform Studio',
      description: 'Generate harmonized 4-color sportswear palettes for jerseys, shorts, and activewear with live interactive vector kit preview and slot-locking capabilities.',
      icon: Palette,
      color: 'from-blue-600 to-indigo-700',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      link: '/tools/palette-generator',
      features: [
        'Live interactive vector jersey simulation',
        'Broadcast-compliant contrast standards',
        'Slot-locking & random harmony generator',
        'Full 4-color tech pack specification export'
      ]
    },
    {
      id: 'cost-estimator',
      title: 'Manufacturing Cost Calculator',
      badge: 'Factory Direct Pricing',
      description: 'Configure matching Jerseys & Shorts kits, fabric GSM specs, tackle twill vs sublimation, size curves, and real-time tiered Sialkot factory pricing.',
      icon: Calculator,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      link: '/tools/cost-estimator',
      features: [
        'Multi-part kit configuration (Jerseys, Shorts, Matching Sets)',
        'Technical GSM fabric weights & Tackle Twill vs Sublimation',
        'MOQ tiered volume breaks (25 to 1,000+ pcs) & live size curves',
        'Landed DDP freight & 1-click export to official Factory RFQ'
      ]
    },
    {
      id: 'fabric-glossary',
      title: 'Fabric Glossary & Material Engineering Hub',
      badge: 'Textile Technical Library',
      description: 'In-depth engineering profiles, GSM weights, breathability ratings, and recommended athletic applications for all our technical performance fabrics.',
      icon: BookOpen,
      color: 'from-stone-700 to-stone-900',
      textColor: 'text-stone-700',
      bgColor: 'bg-stone-100',
      borderColor: 'border-stone-300',
      link: '/fabric-glossary',
      features: [
        'Detailed GSM weight & knit construction specs',
        'Interlock, mesh, fleece, compression & ripstop',
        'Wash durability & colorfastness ratings',
        'Sample swatching request options'
      ]
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1B2A4A] pt-8 sm:pt-12 pb-16 selection:bg-[#FF751F] selection:text-white">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF751F]/10 border border-[#FF751F]/20 text-[#FF751F] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Pre-Press & Engineering Suite</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1B2A4A] leading-tight">
            Sports Manufacturing <span className="text-[#FF751F]">Digital Tools</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Eliminate sampling guesswork, accelerate tech-pack approvals, and model exact factory-direct production costs before cutting a single yard of fabric in our Sialkot manufacturing facilities.
          </p>
        </div>

        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#FF751F]" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Zero Guesswork</div>
              <div className="text-[11px] text-stone-500">True Pantone matching</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Instant Turnaround</div>
              <div className="text-[11px] text-stone-500">Live cost & lead times</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Direct Sialkot</div>
              <div className="text-[11px] text-stone-500">No middleman markup</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Global DDP</div>
              <div className="text-[11px] text-stone-500">Door-to-door freight</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tools Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map(tool => {
            const Icon = tool.icon;
            return (
              <div 
                key={tool.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${tool.bgColor} ${tool.textColor} ${tool.borderColor}`}>
                      {tool.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-700 group-hover:scale-110 group-hover:bg-[#FF751F] group-hover:text-white group-hover:border-[#FF751F] transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1B2A4A] group-hover:text-[#FF751F] transition-colors">
                    {tool.title}
                  </h3>

                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-stone-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-3">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-2">
                      {tool.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to={tool.link}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#1B2A4A] text-white text-xs sm:text-sm font-bold hover:bg-[#FF751F] transition shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    <span>Launch {tool.title.split('&')[0].trim()}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Sialkot RFQ Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#1B2A4A] to-[#0B132B] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF751F] bg-[#FF751F]/20 px-3 py-1 rounded-full">
              Custom Manufacturing Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
              Need a Custom Tech Pack Analysis?
            </h2>
            <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
              Upload your Adobe Illustrator vector files, 3D mockups, or bill-of-materials. Our OEM master pattern cutters and pre-press specialists provide complimentary digital sampling review within 24 business hours.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-[#FF751F] text-white font-bold text-sm hover:bg-[#e06316] transition shadow-md"
              >
                Request Official Tech Pack Quote
              </Link>
              <Link
                to="/products"
                className="px-6 py-3 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition"
              >
                Browse Product Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Visual Content Blocks (Elementor Page Builder) */}
        <DynamicPageContent pageId="tools" />

        {/* Frequently Asked Questions */}
        <PageFAQSection 
          pageId="tools" 
          title="Digital Tools & Color Engines FAQs" 
          subtitle="Free Sportswear Engineering Utilities" 
        />
      </div>
    </div>
  );
}
