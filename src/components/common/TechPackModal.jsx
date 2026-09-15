import React, { useState } from 'react';
import { 
  X, Download, FileText, CheckCircle2, ArrowRight, Layers, 
  Ruler, Scissors, Sparkles, AlertTriangle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRFQ } from '../../context/RFQContext';

export default function TechPackModal() {
  const { isTechPackModalOpen, setIsTechPackModalOpen } = useRFQ();
  const [downloaded, setDownloaded] = useState(false);

  if (!isTechPackModalOpen) return null;

  const handleDownload = () => {
    // Generate standard technical specification document for buyer
    const techPackContent = `
========================================================================
HARE SPORTSWEAR & GOODS (PVT.) LTD. - SIALKOT, PAKISTAN
OFFICIAL TECHNICAL SPECIFICATION & TECH PACK TEMPLATE (V4.2)
========================================================================

COMPANY / BRAND NAME: __________________________________________________
STYLE NAME / CODE:     __________________________________________________
SEASON / YEAR:         2026 / 2027
TARGET PRODUCTION:     [ ] Sublimated Teamwear  [ ] Activewear  [ ] Combat / Balls
TARGET ORDER VOLUME:   [ ] 25-50 pcs (Sample)   [ ] 100-500 pcs [ ] 1000+ pcs

------------------------------------------------------------------------
SECTION 1: BILL OF MATERIALS (BOM)
------------------------------------------------------------------------
1.1 MAIN SHELL FABRIC:
    - Composition: (e.g., 100% Micro Polyester Interlock / 85% Poly 15% Spandex)
    - Weight: _____ GSM (Tolerance +/- 5 GSM)
    - Yarn Origin: Ring-spun Filament / Quick-Dry Treatment

1.2 SECONDARY CONTRAST / MESH INSERTS:
    - Placement: Underarm gussets / Side ventilation panels
    - Structure: Pin-hole Mesh / Birdseye Micro-mesh

1.3 THREAD & SEAM SPECIFICATIONS:
    - Seam Type: ISO 607 (4-Needle 6-Thread Flatlock) or ISO 406 (3-Thread Overlock)
    - Thread: Core-Spun High Tensile (Coats Gramax / Coats Astra)
    - Stitches Per Inch (SPI): 10 - 12 SPI for activewear; 8 - 10 SPI for teamwear

1.4 HARDWARE & TRIMS:
    - Zippers: YKK Reverse Coil #3 / #5 Waterproof Concealed
    - Drawcords: 100% Polyester braided with laser-etched silicone aglets
    - Waistband: 40mm anti-roll knitted elastic with interior silicone bead

------------------------------------------------------------------------
SECTION 2: POINT OF MEASURE (POM) - SPEC SHEET (CM)
------------------------------------------------------------------------
POM DESCRIPTION             | TOL  |  S   |  M   |  L   |  XL  | 2XL  |
----------------------------+------+------+------+------+------+------+
1/2 Chest (1" below armhole)| ±1.0 | 50.0 | 52.5 | 55.0 | 58.0 | 61.0 |
Body Length (HPS to hem)    | ±1.0 | 71.0 | 73.0 | 75.0 | 77.0 | 79.0 |
Sleeve Length (from collar) | ±0.8 | 36.0 | 37.5 | 39.0 | 40.5 | 42.0 |
Armhole Curve               | ±0.5 | 24.0 | 25.0 | 26.0 | 27.2 | 28.5 |
Bottom Sweep (relaxed)      | ±1.0 | 49.0 | 51.5 | 54.0 | 57.0 | 60.0 |
Collar Width (seam to seam) | ±0.5 | 18.0 | 18.5 | 19.0 | 19.5 | 20.0 |

------------------------------------------------------------------------
SECTION 3: PRINTING & EMBELLISHMENT CODES
------------------------------------------------------------------------
- Primary Printing: All-Over Italian Kiian Dye Sublimation
- Color Matching: Pantone TCX / TPX Codes Required (e.g., PMS 1505 C / Orange)
- Embellishments: [ ] 3D Silicone Transfer [ ] Tajima Embroidery [ ] High-Density Puff
- Vector Artwork Format: .AI (Adobe Illustrator), .EPS, or .PDF (Vector outlines created)

------------------------------------------------------------------------
SUBMISSION INSTRUCTIONS:
Attach this filled document along with your vector artwork files (.AI / .PDF)
to Hare Sportswear via the RFQ Portal:
https://haresportswear.com/contact
Or directly to engineering: export@haresportswear.com | WhatsApp: +92 300 1234567
========================================================================
`;

    const blob = new Blob([techPackContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Hare_Sportswear_TechPack_Guide_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
      
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-[#E5DFD5] shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#1A1A1A] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF751F]/20 text-[#FF751F] border border-[#FF751F]/30">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl text-white">
                  Sportswear Tech Pack Guide & Template
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-[#FF751F]/20 text-[#FF751F] font-bold">
                  Free B2B Asset
                </span>
              </div>
              <p className="text-xs text-cream-300 mt-0.5">
                Standardized factory blueprint used by global athletic brands to ensure zero sampling error
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTechPackModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto bg-white">
          
          {/* Visual Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center">
                <Scissors className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#1A1A1A]">1. Vector Flats & Seams</h4>
              <p className="text-xs text-[#595856] leading-relaxed">
                Illustrates stitch placement (flatlock vs. overlock), raglan cut lines, collar drops, and pocket orientations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#1A1A1A]">2. Bill of Materials (BOM)</h4>
              <p className="text-xs text-[#595856] leading-relaxed">
                Precise GSM weights, yarn filament counts, zip gauges (YKK), drawcords, and custom silicone aglets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center">
                <Ruler className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#1A1A1A]">3. POM Measurement Matrix</h4>
              <p className="text-xs text-[#595856] leading-relaxed">
                Chest, sleeve, waist, and inseam measurements in CM with strict +/- 1cm manufacturing tolerances.
              </p>
            </div>

          </div>

          {/* Critical Advice Callout */}
          <div className="p-4 rounded-2xl bg-[#FF751F]/10 border border-[#FF751F]/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#FF751F] shrink-0 mt-0.5" />
            <div className="text-xs text-[#1A1A1A] space-y-1">
              <p className="font-bold text-[#FF751F]">Why Exact Tech Packs Save 50% on Sampling Costs:</p>
              <p className="text-[#595856]">
                Without detailed stitch callouts or Pantone color codes, factory sample technicians have to guess your fit preferences. Providing this template guarantees your first physical prototype arrives 100% accurate.
              </p>
            </div>
          </div>

          {/* Interactive Preview Box */}
          <div className="rounded-2xl bg-[#1A1A1A] p-4 border border-black/40 font-mono text-xs text-cream-200 space-y-2">
            <div className="flex items-center justify-between text-cream-400 pb-2 border-b border-white/10">
              <span>HARE_TECHPACK_SPEC_V4.2.TXT</span>
              <span className="text-emerald-400 font-sans text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready for Immediate Use
              </span>
            </div>
            <p className="text-[#FF751F] font-bold">1.1 SHELL FABRIC: 100% Micro Polyester Interlock (160 GSM)</p>
            <p>1.2 STITCHING: ISO 607 (4-Needle 6-Thread Flatlock, 11 SPI)</p>
            <p>1.3 INKS: Italian Kiian Sublimation (OEKO-TEX Class 1)</p>
            <p>1.4 POM TOLERANCE: Grade A (±1.0cm Chest / Front Length)</p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-[#FAF8F3] border-t border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#595856] text-center sm:text-left">
            Have a custom sketch already? Our engineering team reviews them free of charge.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] transition-colors shadow-glow-orange"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'Downloaded Template!' : 'Download Tech Pack Template'}</span>
            </button>

            <Link
              to="/contact"
              onClick={() => setIsTechPackModalOpen(false)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs text-[#1A1A1A] bg-white hover:bg-black/5 border border-[#E5DFD5] transition-colors"
            >
              <span>Submit RFQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
