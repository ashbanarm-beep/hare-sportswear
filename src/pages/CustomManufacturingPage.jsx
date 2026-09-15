import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Layers, Download, CheckCircle2, ArrowRight, ShieldCheck, 
  Cpu, FileText, Palette, Scissors, Zap, Globe 
} from 'lucide-react';
import { useRFQ } from '../context/RFQContext';

export default function CustomManufacturingPage() {
  const { setIsTechPackModalOpen } = useRFQ();

  const printingTechniques = [
    {
      title: 'Italian Dye Sublimation',
      subtitle: 'Zero Hand-Feel & Maximum Breathability',
      badge: 'Teamwear Standard',
      desc: 'Disperse dye sublimation powered by Kiian Digital Italian inks and Monti Antonio heat presses. Dye molecules bond directly to synthetic polymers, guaranteeing colors never peel, crack, or fade under intense match friction.',
      benefits: ['Unlimited vibrant PMS color palettes', 'Zero breathability blockage on mesh', 'Includes names, numbers & sponsor logos at no extra plate charge'],
      bestFor: 'Football, Basketball, Cycling, Compression, Hockey'
    },
    {
      title: 'Tajima 3D & Flat Embroidery',
      subtitle: 'Premium Tactile Club Crests',
      badge: 'Heritage Craft',
      desc: 'Executed on Japanese computerized Tajima multi-head machines. Supports high-density 3D puff embroidery, metallic thread stitching, merrowed-edge patches, and authentic tackle-twill zig-zag stitching for professional club jerseys.',
      benefits: ['High stitch density (up to 12,000 stitches per badge)', 'Fade-resistant Madeira poly-neon threads', 'Sublimated patch bases with embroidered borders'],
      bestFor: 'Club Crests, Baseball Jerseys, Heavy Fleece Hoodies, Caps'
    },
    {
      title: 'Plastisol & High-Density Puff',
      subtitle: 'Streetwear & Lifestyle Apparel',
      badge: 'Tactile Relief',
      desc: 'Multi-station automated carousel screen printing with infrared curing. Offers thick tactile puff prints, silicone gel gloss finishes, reflective micro-glass bead inks, and water-based discharge prints with ultra-soft hand feel.',
      benefits: ['High-density 3D puff relief up to 2mm thickness', 'Pantone Solid Coated exact color matching', 'Crack-resistant stretch additives for elastic ribbing'],
      bestFor: 'Gym Hoodies, Oversized Tees, Joggers, Streetwear Brands'
    },
    {
      title: 'Silicone & Reflective Heat Transfers',
      subtitle: 'Aerodynamic Performance Detailing',
      badge: 'Pro Athletes',
      desc: 'Precision laser-cut 3D silicone heat seals, matte TPU film transfers, and 3M Scotchlite reflective badges. Bonds with extreme tensile adhesion to high-stretch spandex and nylon compression garments.',
      benefits: ['Beveled 3D silicone logo height up to 1.5mm', 'EN ISO 20471 certified high-visibility night reflectivity', 'Zero bulk inside seam collars (ideal for tagless care labels)'],
      bestFor: 'Running Apparel, Leggings, Training Tees, Sports Bras'
    }
  ];

  const fabrics = [
    {
      name: 'Micro Polyester Interlock',
      weight: '140 - 170 GSM',
      composition: '100% Micro Filament Polyester',
      features: 'Rapid Hydro-Wick, Anti-Bacterial Silver Ion, UPF 40+',
      useCases: 'Pro Soccer Kits, Running Singlets, Tennis Polos'
    },
    {
      name: 'Poly-Spandex 4-Way Stretch',
      weight: '210 - 250 GSM',
      composition: '82-88% Poly / 12-18% Spandex (Elastane)',
      features: 'High Compressive Memory, Anti-Pilling, Muscle Support',
      useCases: 'MMA Rashguards, BJJ Gi Linings, Compression Tights'
    },
    {
      name: 'Performance Birdseye Mesh',
      weight: '160 - 190 GSM',
      composition: '100% Textured Poly Mesh',
      features: 'Superior Cross-Ventilation, Quick-Dry Micro Pores',
      useCases: 'Basketball Uniforms, Ice Hockey Jerseys, Referees'
    },
    {
      name: 'Heavyweight Ringspun French Terry',
      weight: '320 - 380 GSM',
      composition: '100% Combed Cotton or 80/20 CVC Blend',
      features: 'Pre-Shrunk, Brushed Loopback Interior, High Drape',
      useCases: 'Gym Hoodies, Warm-Up Sweatpants, Boxy Crewnecks'
    },
    {
      name: 'High-Gauge Seamless Nylon-Elastane',
      weight: '240 - 270 GSM',
      composition: '78% Polyamide (Nylon 6.6) / 22% Elastane',
      features: '100% Squat-Proof Opacity, Buttery Soft Touch, Zero Sheer',
      useCases: 'Women High-Rise Leggings, Sports Bras, Bike Shorts'
    },
    {
      name: 'Eco-Friendly Recycled rPET Knit',
      weight: '150 - 180 GSM',
      composition: '100% Post-Consumer Recycled Ocean Plastics',
      features: 'Global Recycled Standard (GRS) Certified, Low Carbon Footprint',
      useCases: 'Eco Sports Lines, Marathon Finisher Shirts, Sustainable Brands'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      
      {/* Page Hero */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>OEM / ODM Industrial Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          Custom Manufacturing & Embellishment Technologies
        </h1>
        <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
          From proprietary yarn knitting and Italian sublimation to laser-welded seams and Tajima embroidery, our Sialkot factory translates your technical concepts into tournament-grade reality.
        </p>
      </div>

      {/* 1. Printing & Embellishment Breakdown */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            State-of-the-Art Workshop
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1A1A] mt-1">
            Printing & Branding Techniques
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {printingTechniques.map((tech, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-[#E5DFD5] space-y-6 flex flex-col justify-between hover:border-[#FF751F]/40 transition-all shadow-sm hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF751F]/15 text-[#FF751F] border border-[#FF751F]/30">
                    {tech.badge}
                  </span>
                  <span className="text-xs text-[#8A847A] font-mono">Process 0{i + 1}</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-[#1A1A1A]">
                    {tech.title}
                  </h3>
                  <p className="text-xs text-[#FF751F] font-bold mt-0.5">
                    {tech.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#595856] leading-relaxed">
                  {tech.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#E5DFD5]">
                  <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider">
                    Key Advantages:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#595856]">
                    {tech.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF751F] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F3] text-xs text-[#1A1A1A] flex items-center justify-between border border-[#E5DFD5]">
                <span className="text-[#595856] font-medium">Recommended Application:</span>
                <span className="font-bold text-[#1A1A1A]">{tech.bestFor}</span>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 2. Technical Performance Fabrics Library */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Textile Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1A1A] mt-1">
              Performance Fabric Sourcing & Laboratory
            </h2>
          </div>
          <p className="text-xs text-[#595856] max-w-md">
            All textiles are independently tested for shrinkage, pilling, color fastness (Grade 4+), and tensile burst strength before cutting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fabrics.map((fabric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5DFD5] space-y-4 hover:border-[#FF751F]/40 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base text-[#1A1A1A]">
                    {fabric.name}
                  </h4>
                  <span className="text-xs font-bold font-mono text-[#FF751F] bg-[#FF751F]/10 px-2 py-0.5 rounded">
                    {fabric.weight}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#FF751F]">
                  {fabric.composition}
                </p>
                <p className="text-xs text-[#595856] leading-relaxed pt-2 border-t border-[#E5DFD5]">
                  <strong>Functional Specs:</strong> {fabric.features}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5DFD5] text-[11px] text-[#595856]">
                <span className="text-[#8A847A] block">Typical Styles:</span>
                <span className="text-[#1A1A1A] font-medium">{fabric.useCases}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Downloadable Tech Pack Guide & Interactive Section */}
      <section className="rounded-3xl bg-[#1A1A1A] text-white border border-black/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/20 text-[#FF751F] text-xs font-bold">
            <FileText className="w-3.5 h-3.5" /> B2B Resource Download
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Download the Official Hare Sportswear Tech Pack Guide & Spec Template
          </h2>
          <p className="text-sm text-cream-200 leading-relaxed">
            Eliminate sample iterations and misunderstandings. Our standardized technical package includes complete Point of Measure (POM) grading sheets, Bill of Materials (BOM) templates, stitch callout references (ISO 607 flatlock), and artwork placement diagrams.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => setIsTechPackModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-glow-orange transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Preview & Download Tech Pack (.TXT / Spec)</span>
            </button>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
            >
              <span>Submit Ready Tech Pack for Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
