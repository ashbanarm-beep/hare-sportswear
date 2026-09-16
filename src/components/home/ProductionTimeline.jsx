import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  FileText, Sparkles, CheckCircle2, ChevronRight, 
  Layers, Scissors, ShieldCheck, Truck, Clock, ArrowRight,
  Eye, CheckSquare
} from 'lucide-react';
import { useRFQ } from '../../context/RFQContext';

export default function ProductionTimeline() {
  const navigate = useNavigate();
  const { openTechPackModal } = useRFQ();
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mascotBounce, setMascotBounce] = useState(false);

  const handleMascotRedirect = (e) => {
    if (e) e.stopPropagation();
    setMascotBounce(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF751F', '#FFA05C', '#1A1A1A', '#FFFFFF']
      });
    } catch (err) {}
    setTimeout(() => {
      navigate('/meet-hare');
    }, 400);
  };

  const stepRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const steps = [
    {
      stepNumber: '01',
      title: 'Tech Pack & Consultation',
      subtitle: 'Pattern Engineering & Digital Prototyping',
      timeframe: '1-2 Days',
      badgeColor: 'bg-[#FF751F]/10 text-[#FF751F] border-[#FF751F]/20',
      description: 'Submit your vector AI/PDF tech pack, conceptual sketches, or physical reference garment. Our garment technicians review fabric compositions, POM grading tables, seam tolerances, and generate 3D digital renderings for sign-off.',
      deliverables: [
        'Complete Bill of Materials (BOM) verification',
        'Fabric weight & GSM optimization analysis',
        '3D digital mockup rendering & sizing scale check',
        'Direct consultation with senior pattern maker'
      ],
      actionLabel: 'Download Free Tech Pack Guide',
      actionType: 'modal',
      icon: FileText
    },
    {
      stepNumber: '02',
      title: 'Rapid Prototyping & Sampling',
      subtitle: 'Physical Strike-Offs & Fit Approval',
      timeframe: '7-10 Days',
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      description: 'We cut, print, and sew a physical prototype in our dedicated sampling lab. High-resolution HD photos and express DHL courier dispatch ensure 100% fit, touch, and color accuracy before greenlighting mass production.',
      deliverables: [
        'Physical sample in your specified base size',
        'Kiian Italian sublimation print strike-offs & lab dips',
        'Seam stretch elasticity & wash-test verification',
        'Express door-to-door courier tracking (DHL/FedEx)'
      ],
      actionLabel: 'Inquire Sample Run',
      actionType: 'link',
      icon: Scissors
    },
    {
      stepNumber: '03',
      title: 'Precision Mass Production',
      subtitle: 'CNC Cutting, Sublimation & Stitching Lines',
      timeframe: '12-18 Days',
      badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      description: 'Automated fabric spreading, high-speed CNC laser cutting, and Japanese Juki / Pegasus 4-needle 6-thread flatlock stitching lines execute your mass production run with continuous inline QC inspection.',
      deliverables: [
        'Automated tensionless fabric relaxation & laser cut',
        'Monti Antonio continuous roll heat transfer sublimation',
        'Tajima multi-head 3D embroidery & silicone badges',
        'Reinforced bar-tacking on all high-stress seams'
      ],
      actionLabel: 'Explore Factory Equipment',
      actionType: 'quality-link',
      icon: Layers
    },
    {
      stepNumber: '04',
      title: 'AQL 2.5 Inspection & Door Delivery',
      subtitle: 'Statistical Audit, Barcoding & Global Dispatch',
      timeframe: '3-5 Days Air',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      description: 'Every production lot undergoes statistical AQL 2.5 quality control: digital spectrophotometer color matching, dual-needle metal detector scans, individual polybagging, barcode labeling, and DDP direct export dispatch.',
      deliverables: [
        'Full AQL 2.5 pre-shipment audit inspection report',
        'Individual barcode hangtag & polybag packaging',
        'End-of-line metal contamination safety sweep',
        'Priority air cargo or ocean container customs clearance'
      ],
      actionLabel: 'Request Shipping Freight Estimate',
      actionType: 'contact-link',
      icon: Truck
    }
  ];

  const hurryTips = [
    {
      heading: 'Tech Pack Vector Digitalization',
      message: 'Send your AI vector or PDF tech pack! Our senior pattern masters calculate precise seam tolerances and fabric consumptions within 24 hours.'
    },
    {
      heading: '7-Day Courier Strike-Off',
      message: 'Approve your physical sample! Inspect Kiian Italian sublimation vibrancy, 4-way stretch tension, and woven brand labels before mass run.'
    },
    {
      heading: 'Precision Juki Flatlock Assembly',
      message: 'CNC laser cutters and automated Juki stitching lines in full swing! Producing 150,000+ units monthly with strict dimensional consistency.'
    },
    {
      heading: 'AQL 2.5 Needle Detector Sweep',
      message: '100% metal detector cleared, individual barcode polybags, and pre-cleared for direct DDP priority air dispatch straight to your door!'
    }
  ];

  // Scroll listener to update dynamic pipeline progress bar and active step
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height - windowHeight * 0.5;
      const currentScroll = -rect.top + windowHeight * 0.25;
      
      const progress = Math.max(0, Math.min(1, currentScroll / totalHeight));
      setScrollProgress(progress);

      // Determine which step is closest to viewport center
      stepRefs.forEach((ref, index) => {
        if (ref.current) {
          const stepRect = ref.current.getBoundingClientRect();
          if (stepRect.top <= windowHeight * 0.5 && stepRect.bottom >= windowHeight * 0.2) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (index) => {
    if (stepRefs[index].current) {
      stepRefs[index].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF751F]/10 border border-[#FF751F]/20">
          <Sparkles className="w-3.5 h-3.5" />
          Lean OEM / ODM Execution
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A]">
          The 4-Step Production Journey
        </h2>
        <p className="text-sm text-[#595856] leading-relaxed">
          From digital artwork vector specs to container dispatch, our transparent milestone tracking ensures zero miscommunication and complete manufacturing integrity.
        </p>
      </div>

      {/* Side-by-Side Timeline Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
        
        {/* Left Side: Sticky Progress Pipeline & Navigation (5 cols) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-28 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-lg space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD5]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F]">
                  Milestone Pipeline
                </span>
                <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
                  Active Phase: {steps[activeStep].stepNumber}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#FF751F]">
                  {Math.round(scrollProgress * 100)}%
                </span>
                <span className="text-[10px] text-[#8A847A] block">Pipeline Progress</span>
              </div>
            </div>

            {/* Vertical Pipeline Navigation Track with Dynamic Orange Fill */}
            <div className="relative pl-8 space-y-6">
              
              {/* Background Pipeline Track */}
              <div className="absolute left-3.5 top-2 bottom-2 w-1 bg-[#E5DFD5] rounded-full"></div>

              {/* Dynamic Animated Orange Progress Line */}
              <div 
                className="absolute left-3.5 top-2 w-1 bg-gradient-to-b from-[#FF751F] to-[#E65E08] rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(255,117,31,0.8)]"
                style={{ height: `${Math.max(6, scrollProgress * 96)}%` }}
              ></div>

              {/* Interactive Step Nodes */}
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <button
                    key={idx}
                    onClick={() => scrollToStep(idx)}
                    className={`w-full text-left relative flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#FF751F]/10 border border-[#FF751F]/30 translate-x-1 shadow-sm' 
                        : 'hover:bg-black/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Node Dot on Pipeline */}
                    <div 
                      className={`absolute -left-8 top-4 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FF751F] text-white ring-4 ring-[#FF751F]/20 scale-110 shadow-glow-orange'
                          : isPassed
                            ? 'bg-[#1A1A1A] text-white border-2 border-[#FF751F]'
                            : 'bg-white text-[#8A847A] border-2 border-[#E5DFD5]'
                      }`}
                    >
                      {isPassed ? <CheckSquare className="w-3.5 h-3.5 text-[#FF751F]" /> : step.stepNumber}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#FF751F]">
                          Phase {step.stepNumber}
                        </span>
                        <span className="text-[11px] text-[#8A847A]">• {step.timeframe}</span>
                      </div>
                      <h4 className={`font-display font-bold text-sm truncate ${isActive ? 'text-[#1A1A1A]' : 'text-[#595856]'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-[#8A847A] truncate mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Quick Timeline Specs Pill */}
            <div className="pt-4 border-t border-[#E5DFD5] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#595856]">
                <span>Total Turnaround (Sampling + Mass):</span>
                <span className="font-bold text-[#1A1A1A]">21 - 28 Days</span>
              </div>
              <div className="flex items-center justify-between text-[#595856]">
                <span>Quality Standard:</span>
                <span className="font-bold text-emerald-600">AQL 2.5 Strict Audit</span>
              </div>
            </div>

          </div>

          {/* Mascot Companion Card: Hurry the Hare - Master Craftsman */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={mascotBounce ? { scale: [1, 0.92, 1.1, 1], rotate: [0, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#FAF8F3] border border-[#E5DFD5] hover:border-[#FF751F]/60 p-5 shadow-sm hover:shadow-lg space-y-4 overflow-hidden relative group transition-all cursor-pointer"
            onClick={handleMascotRedirect}
            role="button"
            tabIndex={0}
            aria-label="Click to meet Hurry the Hare and explore our brand story"
            title="Click Hurry to view our brand story! 🐰"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#FF751F]/15 to-transparent rounded-bl-3xl pointer-events-none"></div>

            <div className="flex items-center gap-3.5">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white border-2 border-[#E5DFD5] group-hover:border-[#FF751F] shadow shrink-0 transition-colors">
                <img
                  src="/images/mascot/hurry-craftsman.jpg"
                  alt="Hurry the Hare - Master Sports Craftsman"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse"></span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#1A1A1A]">Hurry's Production Tip</span>
                  <span className="text-[10px] font-bold text-[#FF751F] bg-[#FF751F]/10 px-2 py-0.5 rounded-full border border-[#FF751F]/20">
                    Phase 0{activeStep + 1}
                  </span>
                </div>
                <p className="text-[11px] text-[#8A847A] font-medium flex items-center gap-1">
                  <span>Head of Rapid Sampling</span>
                  <span className="text-[10px] text-[#FF751F] font-semibold">• Click Me!</span>
                </p>
              </div>
            </div>

            {/* Dynamic Mascot Tip */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E5DFD5] text-xs text-[#595856] leading-relaxed relative shadow-sm">
              <div className="font-semibold text-[#1A1A1A] mb-1 flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF751F]" />
                <span>{hurryTips[activeStep]?.heading}</span>
              </div>
              <p>{hurryTips[activeStep]?.message}</p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openTechPackModal();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#FF751F] text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Tech Pack Guide</span>
              </button>

              <button
                type="button"
                onClick={handleMascotRedirect}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FF751F]/10 text-[#FF751F] border border-[#FF751F]/30 text-xs font-bold transition-all flex items-center gap-1"
              >
                <span>Story 👋</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* Right Side: Detailed Scrolling Step Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Mobile Mascot Companion Banner */}
          <motion.div 
            whileTap={{ scale: 0.97 }}
            onClick={handleMascotRedirect}
            className="lg:hidden rounded-2xl bg-white border border-[#E5DFD5] p-4 flex items-center gap-3.5 shadow-sm cursor-pointer active:bg-[#FAF8F3]"
            title="Click to meet Hurry the Hare!"
          >
            <img
              src="/images/mascot/hurry-craftsman.jpg"
              alt="Hurry the Hare"
              className="w-14 h-14 rounded-xl object-cover border border-[#E5DFD5] shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#1A1A1A]">Hurry the Hare</span>
                  <span className="text-[10px] font-bold text-[#FF751F] bg-[#FF751F]/10 px-1.5 py-0.5 rounded">
                    Craftsman
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#FF751F]">Meet Me 👋</span>
              </div>
              <p className="text-[11px] text-[#595856] mt-0.5 line-clamp-2">
                "{hurryTips[activeStep]?.message}"
              </p>
            </div>
          </motion.div>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={idx}
                ref={stepRefs[idx]}
                className={`p-6 sm:p-8 rounded-3xl bg-white border transition-all duration-300 space-y-6 shadow-sm ${
                  isActive 
                    ? 'border-[#FF751F] ring-2 ring-[#FF751F]/10 shadow-xl' 
                    : 'border-[#E5DFD5] hover:border-[#FF751F]/40'
                }`}
              >
                {/* Step Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF751F]/15 text-[#FF751F] border border-[#FF751F]/30 flex items-center justify-center font-display font-black text-xl">
                      {step.stepNumber}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#FF751F]">
                        Production Phase {step.stepNumber}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-black text-[#1A1A1A]">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${step.badgeColor}`}>
                    ⏱ {step.timeframe}
                  </span>
                </div>

                {/* Subtitle & Description */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-sm text-[#595856] uppercase tracking-wider">
                    {step.subtitle}
                  </h4>
                  <p className="text-sm text-[#595856] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverables Checklist */}
                <div className="p-4 rounded-2xl bg-[#F5F1E8]/70 border border-[#E5DFD5] space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block">
                    Phase Milestones & Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-[#1A1A1A]">
                        <CheckCircle2 className="w-4 h-4 text-[#FF751F] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Trigger */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  {step.actionType === 'modal' ? (
                    <button
                      onClick={openTechPackModal}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{step.actionLabel}</span>
                    </button>
                  ) : (
                    <a
                      href="#production-calculator"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold transition-all"
                    >
                      <span>{step.actionLabel}</span>
                      <ChevronRight className="w-4 h-4 text-[#FF751F]" />
                    </a>
                  )}

                  <span className="text-xs text-[#8A847A] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF751F]" />
                    <span>Real-time factory floor milestone updates</span>
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
