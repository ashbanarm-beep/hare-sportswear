import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ShieldCheck, CheckCircle2, Activity, Gauge, 
  FileCheck2, CheckSquare, Sparkles
} from 'lucide-react';

export default function ZeroDefectSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const inspectionStages = [
    {
      step: '01',
      title: 'Raw Material & Yarn Quality Gate',
      category: 'Fabric Test & Lab Stress',
      standard: 'ISO 105 / ASTM D3787',
      desc: 'Before a single meter of fabric is unrolled on the spreading table, representative samples undergo rigorous chemical and mechanical stress testing in our in-house laboratory.',
      tolerance: 'Shrinkage < 3% • Colorfastness Grade 4+ • GSM ±2%',
      telemetry: [
        { label: 'Wash Fastness', value: 'Grade 4.8 / 5.0', status: 'Optimal' },
        { label: 'Tumble Shrinkage', value: '1.2% (Limit 3%)', status: 'Passed' },
        { label: 'Martindale Abrasion', value: '24,500 Cycles', status: 'Certified' },
        { label: 'GSM Uniformity', value: '240.2 g/m²', status: 'Calibrated' }
      ],
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
      category: 'Pattern & Cut Check',
      standard: 'CAD DXF-AAMA / Optical CNC',
      desc: 'Pattern files are automatically graded and optimized using advanced CAD nesting software to minimize raw material waste while maintaining perfect grain-line alignment.',
      tolerance: 'Laser Cut Accuracy ±0.5mm • 24h Tension Relaxation',
      telemetry: [
        { label: 'Laser Spot Focus', value: '0.15mm Micro-Beam', status: 'Calibrated' },
        { label: 'Marker Fabric Yield', value: '94.8% Efficiency', status: 'Optimal' },
        { label: 'Residual Latent Torque', value: '0.00% Zero-Memory', status: 'Released' },
        { label: 'Panel Grain Skew', value: '0.0° Parity', status: 'Aligned' }
      ],
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
      category: 'Inline Assembly Check',
      standard: 'ASTM D1683 / ISO 4915 Flatlock',
      desc: 'Every sewing line has a dedicated, roaming QA supervisor who conducts random inspections every 45 minutes across every workstation with digital tension meters.',
      tolerance: '10-12 SPI Activewear • 100% Seam Elongation Zero-Snap',
      telemetry: [
        { label: 'Mean Stitch Density', value: '11.4 SPI Gauge', status: 'Audited' },
        { label: 'Tensile Seam Load', value: '240N No-Snap', status: 'Max Stress' },
        { label: 'Bar-Tack Cycle', value: '42-Stitch Locking', status: 'Anchored' },
        { label: 'Needle Temp Probe', value: '58°C Anti-Scorch', status: 'Normal' }
      ],
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
      category: 'Final Measurement & Dispatch',
      standard: 'ISO 2859-1 Level II / ASTM F2053',
      desc: 'Before polybagging and master carton packing, all finished goods undergo end-of-line statistical auditing compliant with ISO 2859-1 Level II standards and conveyorized metal detection.',
      tolerance: 'AQL 2.5 Major 0 Defect • Fe 0.8mm Needle Scanner',
      telemetry: [
        { label: 'Conveyor Metal Scan', value: '0.8mm Fe Verified', status: '100% Pass' },
        { label: 'POM Measurement Tol.', value: '±0.25 cm vs Tech Pack', status: 'Verified' },
        { label: 'Tunnel Steam Pressure', value: '4.5 Bar 140°C', status: 'Set' },
        { label: 'Desiccant Seal Guard', value: '20g Silica Packet', status: 'Protected' }
      ],
      checks: [
        '100% Needle Detector Scan: High-sensitivity conveyor detector to catch broken fragments',
        'Barcode & Size Label Verification against customer purchase order specifications',
        'Loose thread trimming and high-pressure steam pressing to set garment drape',
        'Moisture-barrier silica gel desiccant packs sealed in every export carton'
      ]
    }
  ];

  return (
    <section ref={containerRef} className="space-y-10 relative">
      
      {/* Section Header */}
      <div className="pb-6 border-b border-[#E5DFD5] space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF751F] animate-pulse"></span>
          <span className="text-[#FF751F] uppercase tracking-wider">Quality Gate Protocol</span>
          <span className="text-[#8A847A]">•</span>
          <span>AQL 2.5 Verification</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-display font-black text-[#1A1A1A] tracking-tight">
          How We Guarantee Zero Defect Shipments
        </h2>

        <p className="text-xs sm:text-sm text-[#595856] leading-relaxed">
          Our 4-stage quality gate protocol eliminates production variance from yarn intake to finished carton dispatch. Every shipment undergoes rigorous laboratory verification and statistical inspection before leaving our Sialkot plant.
        </p>
      </div>

      {/* Cards Grid: Clean, Professional Layout without Laser or Toggle Buttons */}
      <div className="space-y-8">
        {inspectionStages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-3xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6 sm:p-9 space-y-6">
              
              {/* Top Bar: Gate Number, Category, Standard */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DFD5]/80">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-[#FF751F] flex items-center justify-center font-display font-black text-xl shadow-md ring-2 ring-[#FF751F]/20 group-hover:scale-105 transition-transform">
                    {stage.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#FF751F]">
                        Gate {stage.step}
                      </span>
                      <span className="text-[#8A847A]">•</span>
                      <span className="text-xs font-bold text-[#1A1A1A]">
                        {stage.category}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-[#1A1A1A] mt-0.5">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] self-start sm:self-center">
                  <span className="text-[10px] uppercase font-bold text-[#8A847A] block">Protocol Standard</span>
                  <span className="text-xs font-black text-[#1A1A1A] font-mono">{stage.standard}</span>
                </div>
              </div>

              {/* Description & Target Tolerance */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-[#595856] leading-relaxed">
                  {stage.desc}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-[#8A847A] uppercase tracking-wider flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-[#FF751F]" /> Target Tolerance:
                  </span>
                  <span className="text-xs font-black text-[#1A1A1A] bg-[#FAF8F3] px-3 py-1 rounded-lg border border-[#E5DFD5]">
                    {stage.tolerance}
                  </span>
                </div>
              </div>

              {/* Diagnostic Sensor Telemetry Panel */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E5DFD5]/70">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#FF751F]" />
                      Laboratory & Sensor Telemetry
                    </span>
                  </div>
                  <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    PASS VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stage.telemetry.map((item, tIdx) => (
                    <div 
                      key={tIdx} 
                      className="p-3 rounded-xl bg-white border border-[#E5DFD5] shadow-sm"
                    >
                      <span className="text-[10px] uppercase font-semibold text-[#8A847A] block truncate">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-[#1A1A1A] font-mono block mt-0.5">
                        {item.value}
                      </span>
                      <span className="text-[10px] font-bold text-[#FF751F] mt-1 inline-flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#FF751F]"></span>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mandatory Quality Checkpoints with Ignited Checkmarks */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F3]/60 border border-[#E5DFD5] space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E5DFD5]">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF751F]" />
                    Mandatory Quality Checkpoints
                  </h4>
                  <span className="text-[10px] font-bold text-[#FF751F] bg-[#FF751F]/10 px-2.5 py-0.5 rounded-full border border-[#FF751F]/20">
                    100% Sign-Off Required
                  </span>
                </div>

                {/* Checkpoints Grid with Ignited Checkmark Animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stage.checks.map((check, idx) => (
                    <CheckmarkIgnitionItem 
                      key={idx} 
                      text={check} 
                      delay={idx * 0.1} 
                      isParentInView={isInView} 
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Audit Verification Footer Bar */}
            <div className="px-6 sm:px-9 py-3 bg-[#FAF8F3] border-t border-[#E5DFD5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8A847A] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] font-bold text-[#1A1A1A]">Digital Traveler Log #HS-QC-{stage.step}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span>Defect Index: <strong className="text-emerald-600">0.00%</strong></span>
                <span>•</span>
                <span className="text-[#FF751F] font-bold">AQL 2.5 Passed</span>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: Ignited Animated Checkmark Item
// ----------------------------------------------------------------------
function CheckmarkIgnitionItem({ text, delay = 0, isParentInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={isParentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ duration: 0.4, delay: 0.15 + delay }}
      className="flex items-start gap-3 text-xs text-[#1A1A1A] p-2 rounded-xl hover:bg-white transition-colors duration-200 group/item"
    >
      {/* Ignited Checkmark Container */}
      <div className="relative shrink-0 mt-0.5 flex items-center justify-center">
        {/* Radial Ignition Glow Burst */}
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isParentInView ? {
            scale: [1, 1.7, 1],
            opacity: [0.7, 0.15, 0]
          } : { scale: 0.8, opacity: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.25 + delay,
            ease: 'easeOut'
          }}
          className="absolute inset-0 rounded-full bg-[#FF751F]/30 pointer-events-none"
        />

        {/* Scaled-up Checkmark Box */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={isParentInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 18,
            delay: 0.2 + delay
          }}
          className="w-5 h-5 rounded-lg bg-[#FF751F]/15 border border-[#FF751F]/40 flex items-center justify-center text-[#FF751F] shadow-sm group-hover/item:bg-[#FF751F] group-hover/item:text-white transition-colors"
        >
          <CheckCircle2 className="w-3.5 h-3.5 drop-shadow-[0_0_6px_rgba(255,117,31,0.6)]" />
        </motion.div>
      </div>

      <span className="leading-relaxed font-medium text-[#4A4A4A] group-hover/item:text-[#1A1A1A] transition-colors">
        {text}
      </span>
    </motion.div>
  );
}
