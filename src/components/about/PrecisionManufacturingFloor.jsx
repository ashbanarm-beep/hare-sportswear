import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, Layers, Zap, Tag, Sparkles, Cpu, 
  ShieldCheck, Flame, Package, CheckCircle2,
  ChevronRight, ChevronLeft, Maximize2, X, Clock, Play
} from 'lucide-react';

export default function PrecisionManufacturingFloor() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);

  const steps = [
    {
      number: '01',
      title: 'Fabric Inspection & Relaxation',
      shortTitle: 'Relaxation & Testing',
      stage: 'Raw Material Testing',
      image: '/images/factory/step-01-fabric-relaxation.jpg',
      leadTime: '24 - 48 Hours',
      icon: Scissors,
      specs: '24-48h Tension Rest • Spandex & Nylon Testing • 4-Point Audit',
      summary: 'Testing spandex, nylon, and resting high-stretch fabrics for 24-48 hours to eliminate elastane memory tension.',
      description: 'Incoming performance textiles undergo rigorous 4-point inspection for GSM uniformity, shrinkage coefficients, and color fastness. High-stretch fabrics—including spandex blends, athletic interlock, and nylon warp knits—are unrolled on tension-free relaxation tables for 24 to 48 hours to release elastane torque and prevent dimensional distortion after cutting.',
      keyHighlights: [
        'Roll-to-roll automated weight & skew torque verification',
        '24 to 48 hours static tension release prior to spreading',
        'Shrinkage & recovery tests under simulated sweat/wash stress'
      ]
    },
    {
      number: '02',
      title: 'Pattern Digitization & Marker Making',
      shortTitle: 'CAD & Marker Making',
      stage: 'Digital Engineering',
      image: '/images/factory/step-02-pattern-grading.jpg',
      leadTime: '24 Hours',
      icon: Layers,
      specs: '2D CAD Vectorization • 94%+ Yield Optimization • POM Grading',
      summary: 'CAD 2D pattern uploads and optimized marker placement to minimize fabric waste and ensure anatomical fit.',
      description: 'Approved customer tech packs and design vectors are imported into computerized 2D CAD systems. Senior garment pattern engineers digitize sizing grading tables from XS to 5XL, generating optimized nested cutting markers that maximize fabric yield above 94% while strictly preserving fabric grainlines, stretch direction, and sublimation panel symmetry.',
      keyHighlights: [
        'Complete 2D CAD digitizer table vector calibration',
        'Multi-size nested grading with anatomical stretch allowances',
        'High-efficiency marker algorithms reducing raw textile waste'
      ]
    },
    {
      number: '03',
      title: 'Spreading & Precision Cutting',
      shortTitle: 'Laser & CNC Cutting',
      stage: 'Automated Cutting',
      image: '/images/factory/step-03-laser-cutting.jpg',
      leadTime: 'Same Day',
      icon: Zap,
      specs: 'Optical Vision Laser • CNC Knife Bed • Micro-Sealed Edges',
      summary: 'Automated spreading and CNC Laser/Knife cutting for synthetic fabrics with heat-sealed anti-fray edges.',
      description: 'Relaxed fabrics are spread in uniform tension-free multi-ply layers across our 60-foot vacuum tables. Computer-guided CNC optical laser and oscillating knife cutters follow digital vector paths with sub-millimeter precision. The vision laser system automatically seals synthetic edges on technical polyesters, preventing unraveling or fiber fray during high-contact sports.',
      keyHighlights: [
        'Multi-ply automated spreading with tensionless alignment',
        'Optical contour-following CNC laser slicing',
        'Heat-sealed edge boundaries eliminating fraying on raw cuts'
      ]
    },
    {
      number: '04',
      title: 'Bundling & Pre-Assembly Sorting',
      shortTitle: 'Bundling & Sorting',
      stage: 'Batch Traceability',
      image: '/images/factory/step-04-bundling-ticketing.jpg',
      leadTime: 'Real-Time Sync',
      icon: Tag,
      specs: 'Barcode Traveler Tickets • Shade Batching • Zero Shade Variance',
      summary: 'Sizing, batching, and traceable barcode ticketing for continuous digital shop-floor tracking.',
      description: 'Cut panels are organized into production bundles categorized by garment section, colorway, and size code. Each bundle receives an industrial barcode traveler ticket that syncs with our factory ERP system. This prevents shade variance across cut lots and allows real-time tracking of every team kit as it transitions to embellishment and stitching.',
      keyHighlights: [
        'Barcoded traveler cards for real-time digital lot tracking',
        'Strict shade-band grouping preventing dye lot discrepancies',
        'Serialized bundle verification before dispatch to print floors'
      ]
    },
    {
      number: '05',
      title: 'Embellishment & Branding',
      shortTitle: 'Sublimation & Embellishment',
      stage: 'High-Def Branding',
      image: '/images/factory/step-05-sublimation-printing.jpg',
      leadTime: '1 - 2 Days',
      icon: Sparkles,
      specs: 'Kiian Italian Inks • 15-Color Tajima • 50+ Wash-Cycle Testing',
      summary: 'Pre-sewing Sublimation printing, heat transfers, and multi-needle embroidery for pro-grade durability.',
      description: 'Before panels are stitched together, branding is applied while flat for maximum definition. We deploy wide-format roll-to-roll dye sublimation using OEKO-TEX certified Italian Kiian inks for permanent, breathable team designs. Complementary stations feature 15-color Japanese Tajima embroidery for 3D puff crests and silicone heat presses for sponsor logos.',
      keyHighlights: [
        'Sublimation with Italian Kiian inks that never crack or fade',
        'High-density 3D puff and metallic thread embroidery lines',
        'Pneumatic heat-seal presses tested for 50+ commercial washes'
      ]
    },
    {
      number: '06',
      title: 'The Sewing & Assembly Line',
      shortTitle: 'Sewing & Assembly',
      stage: 'Precision Stitching',
      image: '/images/factory/step-06-sewing-assembly.jpg',
      leadTime: 'Continuous Flow',
      icon: Cpu,
      specs: 'Juki 4-Needle 6-Thread Flatlock • Differential Overlock • Bonded Hems',
      summary: 'Specialized Flatlock 4-needle/6-thread, Overlock, and tape bonding machines for chafeless durability.',
      description: 'Artisans on dedicated lines assemble garments using calibrated Japanese Juki machinery. High-friction athletic pieces (rashguards, gym tights, pro cycling kits) utilize 4-needle 6-thread flatlock machines creating smooth, chafeless seams that stretch without snapping. Activewear lines integrate automated ultrasonic bonding for stitch-free waterproof hems.',
      keyHighlights: [
        '4-needle 6-thread flatlock stitching for zero inner chafe',
        'Reinforced bar-tacking on all high-stress athletic zones',
        'Differential-feed automated overlockers calibrated per fabric GSM'
      ]
    },
    {
      number: '07',
      title: 'In-Line & Final Quality Control',
      shortTitle: 'In-Line & Final QC',
      stage: 'AQL 2.5 Verification',
      image: '/images/factory/step-07-quality-control.jpg',
      leadTime: 'Continuous 100% Audit',
      icon: ShieldCheck,
      specs: 'Statistical AQL 2.5 • Mannequin POM Verification • Stretch Elasticity',
      summary: 'Mid-assembly checks and mannequin verification against tech packs to ensure zero defect delivery.',
      description: 'Quality assurance begins at the needle and concludes at final inspection. In-line QC inspectors check seam tension and stitch count (SPI). Finished garments are fitted onto calibrated athletic mannequins to verify Points of Measure (POM) grading tables, neck opening stretch tolerances, and logo alignment against the signed tech pack.',
      keyHighlights: [
        'Continuous in-line audit stopping defects at the workstation',
        'Full tech-pack POM measurement review on 3D mannequins',
        'Needle-detector magnetic sweep ensuring 100% metal safety'
      ]
    },
    {
      number: '08',
      title: 'Post-Processing & Finishing',
      shortTitle: 'Finishing & Steaming',
      stage: 'Finishing & Pressing',
      image: '/images/factory/step-08-steam-finishing.jpg',
      leadTime: 'Same Day',
      icon: Flame,
      specs: 'Pneumatic Steam Press • Suction Thread Trimming • Texture Care',
      summary: 'Thread trimming and tunnel garment steaming without flattening technical textures.',
      description: 'Garments pass through automatic vacuum-suction tables where micro-trimmer blades remove all loose thread tails. Specialized pneumatic steam presses and vertical tunnel steamers smooth fabric creases, activating thermal memory in technical polyesters without crushing textured jacquards, mesh ventilation panels, or embossed logos.',
      keyHighlights: [
        'Vacuum suction trimmers removing all microscopic thread ends',
        'Controlled temperature steam tunnels tailored to synthetic poly/nylon',
        'Preservation of breathable micro-mesh dimples and 3D textures'
      ]
    },
    {
      number: '09',
      title: 'Packaging & Shipping',
      shortTitle: 'Packaging & Shipping',
      stage: 'Global DDP Logistics',
      image: '/images/factory/step-09-packaging-shipping.jpg',
      leadTime: 'Priority Dispatch',
      icon: Package,
      specs: 'RFID Tagging • Recycled Polybags • Priority DDP Customs Pre-Cleared',
      summary: 'RFID tagging, polybagging, and sorted carton packing for global air and ocean distribution.',
      description: 'Approved garments receive custom brand woven care labels, FSC-certified hangtags, and optional RFID tracking chips. Each piece is neatly folded into recyclable biodegradable polybags with moisture-absorbing silica packets, packed into 5-ply reinforced export cartons by size ratio, and dispatched with pre-cleared customs clearance directly to overseas warehouses.',
      keyHighlights: [
        'Custom woven labels, hangtag barcodes, and RFID inventory tags',
        'Individual polybags with moisture and dust barrier protection',
        'Master cartons barcoded and pallets staged for priority DDP air freight'
      ]
    }
  ];

  // Scroll Progress Listener for Center Glowing Timeline
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start glow when top of timeline reaches upper-middle of viewport
      const startTrigger = windowHeight * 0.70;
      const endTrigger = windowHeight * 0.30;
      const totalHeight = rect.height;

      if (totalHeight <= 0) return;

      const currentScroll = startTrigger - rect.top;
      const maxScrollable = totalHeight + (startTrigger - endTrigger);
      const progress = Math.min(Math.max(currentScroll / maxScrollable, 0), 1);

      setScrollProgress(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => (prev - 1 + steps.length) % steps.length);
      }
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => (prev + 1) % steps.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, steps.length]);

  return (
    <section className="space-y-10 pt-6">
      
      {/* 1. Header with Production Flow Details */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5DFD5]">
        <div className="space-y-2.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF751F] animate-pulse"></span>
            <span className="text-[#FF751F] uppercase tracking-wider">Sialkot Factory Operations</span>
            <span className="text-[#8A847A]">•</span>
            <span>9-Stage Precision Workflow</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1A1A1A] tracking-tight">
            Inside Our Precision Manufacturing Floor
          </h2>
          
          <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
            Every garment manufactured at Hare Sportswear moves through an integrated, 9-step production pipeline. From raw elastane relaxation to laser cutting, Juki flatlock assembly, and RFID packing, discover how we guarantee tour-level performance.
          </p>
        </div>

      </div>

      {/* Mobile Scroll Progress Bar */}
      <div className="lg:hidden w-full bg-[#E5DFD5]/70 h-1.5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#FF751F] to-[#E65E08] shadow-[0_0_8px_#FF751F] transition-all duration-150 ease-out"
          style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
        />
      </div>

      {/* 2. Alternating Flow Timeline with Glowing Center Spine */}
      <div ref={timelineRef} className="relative space-y-12 sm:space-y-16 py-4">
        
        {/* Central Connecting Spine Base Track (Desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-1 bg-[#E5DFD5] rounded-full pointer-events-none">
          
          {/* Ambient Glow Halo behind the spine */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 -ml-3.5 bg-gradient-to-b from-[#FF751F] via-[#FF9040] to-[#E65E08] blur-md opacity-75 rounded-full transition-all duration-150 ease-out pointer-events-none"
            style={{ 
              height: `${scrollProgress * 100}%` 
            }}
          />

          {/* Active Glowing Center Beam */}
          <div 
            className="relative w-full bg-gradient-to-b from-[#FF751F] via-[#FFA25B] to-[#FF4500] rounded-full transition-all duration-150 ease-out"
            style={{ 
              height: `${scrollProgress * 100}%`,
              boxShadow: '0 0 10px #FF751F, 0 0 20px #FF751F, 0 0 32px rgba(255, 117, 31, 0.7)'
            }}
          />
        </div>

        {/* Traveling Laser Pulse Orb at the glowing beam tip */}
        <div 
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 pointer-events-none z-30 transition-all duration-150 ease-out"
          style={{ 
            top: `calc(2rem + ${scrollProgress} * (100% - 4rem))`,
            opacity: scrollProgress > 0.01 && scrollProgress < 0.99 ? 1 : 0
          }}
        >
          <div className="relative -translate-y-1/2 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_20px_#FF751F,0_0_40px_#FF751F] border-2 border-[#FF751F] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FF751F] animate-ping" />
            </div>
            <div className="absolute w-8 h-8 rounded-full bg-[#FF751F]/30 animate-pulse pointer-events-none" />
          </div>
        </div>

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 1;
          
          // Node activation threshold: milestone glows when beam reaches it
          const nodeThreshold = idx / (steps.length - 1);
          const isNodeActive = scrollProgress >= nodeThreshold * 0.92;

          return (
            <div 
              key={idx}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Desktop Central Glowing Node Indicator */}
              <div 
                className={`hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-4 transition-all duration-500 items-center justify-center font-black text-xs select-none ${
                  isNodeActive
                    ? 'bg-gradient-to-br from-[#FF751F] to-[#E65E08] text-white border-white shadow-[0_0_25px_rgba(255,117,31,0.85),0_0_45px_rgba(255,117,31,0.45)] ring-4 ring-[#FF751F]/40 scale-110'
                    : 'bg-[#FAF8F3] text-[#8A847A] border-white shadow-md ring-1 ring-[#E5DFD5] scale-100'
                }`}
              >
                {step.number}
              </div>

              {/* Text Card Column */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div 
                  className={`rounded-3xl bg-white border p-6 sm:p-8 transition-all duration-500 space-y-5 relative group ${
                    isNodeActive
                      ? 'border-[#FF751F]/40 shadow-lg ring-1 ring-[#FF751F]/20'
                      : 'border-[#E5DFD5] shadow-sm hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors duration-300 ${
                        isNodeActive ? 'bg-[#FF751F] text-white shadow-sm' : 'bg-[#FF751F]/15 text-[#FF751F]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#FF751F] uppercase tracking-wider">
                            Stage {step.number}
                          </span>
                          <span className="text-[#8A847A]">•</span>
                          <span className="text-xs font-bold text-[#1A1A1A]">
                            {step.stage}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#8A847A] flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-[#FF751F]" />
                          {step.leadTime}
                        </span>
                      </div>
                    </div>

                    <span className={`text-3xl font-display font-black transition-colors duration-500 ${
                      isNodeActive ? 'text-[#FF751F]' : 'text-[#E5DFD5] group-hover:text-[#FF751F]/30'
                    }`}>
                      {step.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-[#1A1A1A]">
                      {step.title}
                    </h3>
                    <p className="text-xs font-bold text-[#FF751F] mt-1">
                      {step.specs}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#595856] leading-relaxed">
                    {step.description}
                  </p>


                  {/* Key Technical Checklist */}
                  <div className="space-y-2 pt-2 border-t border-[#E5DFD5]">
                    {step.keyHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#1A1A1A]">
                        <CheckCircle2 className="w-4 h-4 text-[#FF751F] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Photo Column */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div 
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative rounded-3xl overflow-hidden bg-white border p-3 shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer ${
                    isNodeActive 
                      ? 'border-[#FF751F]/50 shadow-[0_10px_30px_rgba(255,117,31,0.12)]' 
                      : 'border-[#E5DFD5] hover:border-[#FF751F]/60'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Enlarge photo of ${step.title}`}
                >
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-[#1A1A1A]">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none"></div>

                    {/* Top Step Pill */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 text-xs font-bold text-[#1A1A1A] shadow-sm flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isNodeActive ? 'bg-[#FF751F] animate-ping' : 'bg-[#FF751F]'}`}></span>
                      <span>Step {step.number} : {step.shortTitle}</span>
                    </div>

                    {/* Enlarge Hint */}
                    <div className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-black/60 hover:bg-[#FF751F] backdrop-blur-md border border-white/20 text-white text-xs transition-colors shadow-sm flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-semibold hidden sm:inline">Enlarge</span>
                    </div>

                    {/* Bottom Image Overlay Strip */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white pointer-events-none">
                      <p className="text-xs font-semibold text-[#FF751F]">
                        {step.stage} • Precision Benchmark
                      </p>
                      <p className="text-xs text-white/90 line-clamp-1 mt-0.5 font-medium">
                        {step.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. Lightbox Modal for Full-Screen Inspection */}
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
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-lg bg-[#FF751F]/20 border border-[#FF751F]/40 text-[#FF751F] text-xs font-black">
                  Step {steps[selectedImageIndex].number} of 09
                </span>
                <span className="text-sm font-bold text-white">
                  {steps[selectedImageIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8A847A] hidden sm:inline">
                  Use ← → keys to browse
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
                src={steps[selectedImageIndex].image}
                alt={steps[selectedImageIndex].title}
                className="w-full h-full object-contain select-none"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((selectedImageIndex - 1 + steps.length) % steps.length);
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
                  setSelectedImageIndex((selectedImageIndex + 1) % steps.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#FF751F] text-white border border-white/20 transition-all shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Meta Footer */}
            <div className="p-4 sm:p-6 bg-[#141414] border-t border-white/10 text-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  {steps[selectedImageIndex].title}
                </h3>
                <span className="text-xs font-semibold text-[#FF751F] bg-[#FF751F]/15 px-3 py-1 rounded-full border border-[#FF751F]/30 w-fit">
                  {steps[selectedImageIndex].specs}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
                {steps[selectedImageIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
