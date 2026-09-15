import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, Award, FileCheck, Search, Activity, 
  ArrowRight, Cpu, Scissors, Gauge, CheckSquare 
} from 'lucide-react';

export default function QualityPage() {
  const inspectionStages = [
    {
      step: '01',
      title: 'Raw Material & Yarn Quality Gate',
      desc: 'Before a single meter of fabric is unrolled on the spreading table, representative samples undergo rigorous chemical and mechanical stress testing in our in-house laboratory.',
      checks: [
        'Color Fastness Test: Grade 4+ against washing, sweat, and chlorinated water (ISO 105)',
        'Shrinkage & Torque: Verified < 3% under high-temperature 60°C tumble cycle',
        'GSM Weight Calibration: Precision circular cutter and digital gram scale audit',
        'Bursting & Pilling Resistance: Martindale test exceeding 20,000 friction cycles'
      ]
    },
    {
      step: '02',
      title: 'CAD Marker & CNC Laser Cutting Precision',
      desc: 'Pattern files are automatically graded and optimized using advanced CAD nesting software to minimize raw material waste while maintaining perfect grain-line alignment.',
      checks: [
        'Automated fabric relaxation for 24 hours prior to cutting to eliminate latent tension',
        'High-precision computerized laser cutters with ±0.5mm cutting tolerance',
        'Matched stripe and panel alignment for sublimated jersey front and backs',
        '100% panel audit for warp/weft skewness before bundling to sewing lines'
      ]
    },
    {
      step: '03',
      title: 'Inline Stitching & Seam Tension Audits',
      desc: 'Every sewing line has a dedicated, roaming QA supervisor who conducts random inspections every 45 minutes across every workstation.',
      checks: [
        'Stitch Density Verification: 10-12 Stitches Per Inch (SPI) on activewear, 8-10 SPI on kits',
        'Tensile Seam Stretch Test: Seams stretched to 100% elongation with zero thread snap',
        'Bar-Tack Reinforcements: Pocket openings, crotch seams, and plackets double bar-tacked',
        'Thread Brand Compliance: 100% Coats high-tenacity core-spun filament threads'
      ]
    },
    {
      step: '04',
      title: 'Final AQL 2.5 Audit & Metal Detection',
      desc: 'Before polybagging and master carton packing, all finished goods undergo end-of-line statistical auditing compliant with ISO 2859-1 Level II standards.',
      checks: [
        '100% Needle Detector Scan: High-sensitivity conveyor detector to catch broken fragments',
        'Barcode & Size Label Verification against customer purchase order specifications',
        'Loose thread trimming and high-pressure steam pressing to set garment drape',
        'Moisture-barrier silica gel desiccant packs sealed in every export carton'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AQL 2.5 Zero-Defect Manufacturing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          Multi-Stage Quality Assurance & Factory Standards
        </h1>
        <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
          Overseas sports brands and bulk buyers cannot afford return rates or defective jerseys. Our multi-stage inspection gates ensure every stitch, seam, and print meets rigorous international retail standards.
        </p>
      </div>

      {/* Certifications Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm">
        <div className="text-center p-4 border-r border-[#E5DFD5] last:border-r-0">
          <Award className="w-8 h-8 text-[#FF751F] mx-auto mb-2" />
          <h4 className="font-display font-bold text-[#1A1A1A] text-base">ISO 9001:2015</h4>
          <p className="text-xs text-[#595856] mt-1">Quality Management System</p>
        </div>

        <div className="text-center p-4 border-r border-[#E5DFD5] last:border-r-0">
          <CheckSquare className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <h4 className="font-display font-bold text-[#1A1A1A] text-base">BSCI Audited</h4>
          <p className="text-xs text-[#595856] mt-1">Fair Wages & Ethical Labor</p>
        </div>

        <div className="text-center p-4 border-r border-[#E5DFD5] last:border-r-0">
          <Activity className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h4 className="font-display font-bold text-[#1A1A1A] text-base">OEKO-TEX 100</h4>
          <p className="text-xs text-[#595856] mt-1">Free from Harmful Toxins</p>
        </div>

        <div className="text-center p-4">
          <ShieldCheck className="w-8 h-8 text-[#FF751F] mx-auto mb-2" />
          <h4 className="font-display font-bold text-[#1A1A1A] text-base">AQL 2.5 Level II</h4>
          <p className="text-xs text-[#595856] mt-1">Acceptance Quality Limit</p>
        </div>
      </div>

      {/* 4-Stage Inspection Timeline */}
      <section className="space-y-10">
        <div>
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            Quality Gate Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1A1A1A] mt-1">
            How We Guarantee Zero Defect Shipments
          </h2>
        </div>

        <div className="space-y-8">
          {inspectionStages.map((stage, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-sm hover:shadow-md"
            >
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-display font-black text-[#FF751F] font-mono">
                    {stage.step}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A847A]">
                    Inspection Gate
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-[#1A1A1A]">
                  {stage.title}
                </h3>
                <p className="text-xs text-[#595856] leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="lg:col-span-8 p-6 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF751F] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Mandatory Quality Checkpoints:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#595856]">
                  {stage.checks.map((check, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF751F] shrink-0 mt-1.5"></span>
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Factory Machinery Fleet */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#1A1A1A] text-white border border-black/40 space-y-8 shadow-2xl">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            Industrial Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Modern Machine Fleet in Sialkot, Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-cream-200">
            Precision engineering requires precision machinery. Our production floor is powered by industry-standard equipment:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#FF751F] font-bold block text-sm">Juki & Pegasus</span>
            <span className="text-cream-300">4-Needle 6-Thread Flatlock Machines for Compression</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#FF751F] font-bold block text-sm">Tajima Japan</span>
            <span className="text-cream-300">12-Head Multi-Color Computerized 3D Embroidery</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#FF751F] font-bold block text-sm">Monti Antonio</span>
            <span className="text-cream-300">Rotary Drum Calender Sublimation Heat Presses</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-emerald-400 font-bold block text-sm">Hashima</span>
            <span className="text-cream-300">Conveyorized Metal Detector Needle Scanners</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <p className="text-xs text-cream-300">
            Request an in-person or live video audit of our Sialkot factory prior to placing a bulk order.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs transition-colors shadow-glow-orange flex items-center gap-2"
          >
            <span>Book a Factory Video Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
