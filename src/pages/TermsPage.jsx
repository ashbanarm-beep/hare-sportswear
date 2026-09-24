import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, ShieldCheck, ChevronRight, Scale, Clock, 
  CheckCircle2, AlertCircle, Mail, Phone, Lock, ExternalLink 
} from 'lucide-react';
import DynamicPageContent from '../components/cms/DynamicPageContent';
import PageFAQSection from '../components/common/PageFAQSection';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions | Hare Sportswear & Goods - B2B Manufacturing Terms';
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'scope', title: '1. Scope of Engagement & Contract Manufacturing' },
    { id: 'techpacks', title: '2. Tech Packs, Artwork & Intellectual Property' },
    { id: 'sampling', title: '3. Sampling Protocol & Prototyping Terms' },
    { id: 'moq-pricing', title: '4. MOQs, Quotations & Commercial Terms' },
    { id: 'quality-aql', title: '5. Quality Standards, AQL 2.5 & Technical Tolerances' },
    { id: 'payments', title: '6. Payment Terms & Commercial Invoicing' },
    { id: 'shipping-ddp', title: '7. Export Shipping, DDP Customs & Freight Delivery' },
    { id: 'claims-remediation', title: '8. Defect Claims, Inspection Window & Remediation' },
    { id: 'confidentiality', title: '9. Confidentiality & Non-Disclosure (NDA)' },
    { id: 'governing-law', title: '10. Governing Jurisdiction & Dispute Resolution' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A] pb-24">
      {/* Header & Hero */}
      <section className="pt-12 pb-14 bg-gradient-to-b from-[#EFE9DC] to-[#F5F1E8] border-b border-[#E5DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#595856] mb-6">
            <Link to="/" className="hover:text-[#FF751F] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#8A847A]">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#FF751F] font-semibold">Terms & Conditions</span>
          </nav>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/15 border border-[#FF751F]/30 text-xs font-bold text-[#FF751F]">
              <Scale className="w-3.5 h-3.5" />
              <span>B2B Contractual Agreement</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1A1A]">
              Terms & Conditions of Manufacturing
            </h1>
            
            <p className="text-sm sm:text-base text-[#595856] max-w-3xl leading-relaxed">
              Standard commercial, manufacturing, quality assurance, and export logistics terms governing all OEM, ODM, and private label apparel and sports goods contracts executed with Hare Sportswear & Goods (Pvt.) Ltd.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8A847A] pt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#FF751F]" />
                Last Revised: September 2026
              </span>
              <span>•</span>
              <span>Document Ref: HSG-TOS-2026-V3</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> AQL 2.5 Guaranteed
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Quick Jump Sidebar (4 cols on desktop) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
                Table of Contents
              </h3>
              <nav className="space-y-1.5 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 px-2 rounded-lg text-[#595856] hover:text-[#FF751F] hover:bg-[#FAF8F3] transition-colors font-medium truncate"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#E5DFD5] space-y-2 text-xs">
                <span className="font-bold text-[#1A1A1A] block">Need a Custom Signed NDA?</span>
                <p className="text-[#595856] text-[11px] leading-relaxed">
                  We routinely execute bilateral Non-Disclosure Agreements with brand clients prior to receiving tech packs.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 font-bold text-[#FF751F] hover:underline pt-1"
                >
                  <span>Request Corporate NDA</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Legal Clauses Body (8 cols) */}
          <main className="lg:col-span-8 space-y-12 text-sm leading-relaxed text-[#3D3C3A]">
            
            {/* Section 1 */}
            <section id="scope" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                1. Scope of Engagement & Contract Manufacturing
              </h2>
              <p>
                These Terms and Conditions govern all commercial quotations, purchase orders (POs), prototyping agreements, and manufacturing runs entered into between <strong>Hare Sportswear & Goods (Pvt.) Ltd.</strong> (operating from Sialkot, Pakistan; SCCI Membership #48291-C) and the purchasing client (the "Buyer").
              </p>
              <p>
                By issuing an official Purchase Order, signing a Proforma Invoice (PI), or remitting a sampling/production deposit, the Buyer unconditionally accepts these Terms. Any customer-specific purchase conditions shall only apply if expressly consented to in writing by an authorized director of Hare Sportswear & Goods.
              </p>
            </section>

            {/* Section 2 */}
            <section id="techpacks" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                2. Tech Packs, Artwork & Intellectual Property
              </h2>
              <p>
                <strong>Client Ownership:</strong> The Buyer retains 100% full and exclusive intellectual property rights, trademarks, logos, team crests, and proprietary technical cut-and-sew blueprints submitted to Hare Sportswear.
              </p>
              <p>
                <strong>Non-Circumvention:</strong> Hare Sportswear covenants that it will never market, reproduce, sublicense, or distribute the Buyer's branded merchandise to any third party, online marketplace, or unauthorized distributor under any circumstance.
              </p>
              <p>
                <strong>Artwork Verification:</strong> Vector files (.AI, .EPS, .PDF) with outlined typography and specified Pantone Matching System (PMS) color codes must be provided by the Buyer. Digital PDF mockups approved by the Buyer serve as the definitive binding visual standard for print, embroidery, and trim placement.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sampling" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                3. Sampling Protocol & Prototyping Terms
              </h2>
              <p>
                <strong>Rapid Sampling:</strong> Physical prototypes and pre-production samples are completed within 7 to 10 working days following receipt of finalized tech packs and sampling fees.
              </p>
              <p>
                <strong>Sample Fee Credit:</strong> Initial prototype development fees are credited 100% against subsequent bulk production orders meeting the agreed style MOQ (typically 50+ pieces).
              </p>
              <p>
                <strong>Sign-Off:</strong> Bulk cutting will commence only after the Buyer has formally provided written "Pre-Production (PP) Approval" via email or electronic traveler sign-off.
              </p>
            </section>

            {/* Section 4 */}
            <section id="moq-pricing" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                4. MOQs, Quotations & Commercial Terms
              </h2>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm">
                <li><strong>Minimum Order Quantities (MOQ):</strong> Our standard low MOQ is 25 to 50 pieces per style with mixed sizing ratios (e.g., S through 3XL).</li>
                <li><strong>Quotation Validity:</strong> Official price quotes remain valid for 30 calendar days from date of issuance, subject to significant market spikes (&gt;10%) in raw yarn or international freight index tariffs.</li>
                <li><strong>Incoterms:</strong> Unless agreed otherwise, prices are quoted as <strong>FOB Sialkot / Lahore Dry Port</strong>, <strong>CIF Destination Port</strong>, or <strong>DDP (Delivered Duty Paid)</strong> direct to the Buyer's warehouse door.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="quality-aql" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                5. Quality Standards, AQL 2.5 & Technical Tolerances
              </h2>
              <p>
                All apparel and sports equipment undergo mandatory statistical quality auditing in accordance with <strong>ISO 2859-1 (AQL 2.5 Major / 4.0 Minor) Level II</strong> standards:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5]">
                  <strong className="text-[#1A1A1A] block mb-1">Dimensional Sizing Tolerance:</strong>
                  ±0.5 inch (1.27 cm) across chest width and body length per standard apparel manufacturing norms.
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5]">
                  <strong className="text-[#1A1A1A] block mb-1">Color Fastness Standard:</strong>
                  ISO 105 Grade 4.0+ resistance to chlorine, perspiration, and home laundering.
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5]">
                  <strong className="text-[#1A1A1A] block mb-1">Shrinkage Control:</strong>
                  Maximum allowable shrinkage within ±3% post 30°C commercial wash cycles.
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5]">
                  <strong className="text-[#1A1A1A] block mb-1">Metal Safety Scanning:</strong>
                  100% of garments pass 9-point conveyorized optical and electromagnetic needle detection.
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="payments" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                6. Payment Terms & Commercial Invoicing
              </h2>
              <p>
                <strong>Standard Production Terms:</strong> A 50% advance deposit is required upon PO confirmation to procure specialized raw materials and initiate pattern grading. The remaining 50% balance is payable upon completion and presentation of final pre-shipment quality audit photo/video logs, prior to dispatch or against Bill of Lading (B/L).
              </p>
              <p>
                <strong>Approved Payment Methods:</strong> Irrevocable Wire Transfer (T/T), Commercial Bank Letter of Credit (L/C at Sight for orders &gt;$25,000 USD), or direct corporate escrow for verified tier-1 athletic brands.
              </p>
            </section>

            {/* Section 7 */}
            <section id="shipping-ddp" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                7. Export Shipping, DDP Customs & Freight Delivery
              </h2>
              <p>
                <strong>Air Courier & Cargo:</strong> Expedited air shipments are handled via DHL Express, FedEx International Priority, or airline commercial freight (typically 3 to 6 transit days).
              </p>
              <p>
                <strong>Ocean Freight:</strong> Bulk consolidated shipments (FCL / LCL) are dispatched from Karachi / Sialkot Dry Port with transit times of 18 to 28 days depending on port of arrival (USA East/West Coast, Felixstowe UK, Hamburg, Rotterdam, or Sydney).
              </p>
              <p>
                <strong>DDP Guarantee:</strong> On DDP quotes, Hare Sportswear covers all export declarations, import customs duties, and local delivery tariffs directly to your facility door.
              </p>
            </section>

            {/* Section 8 */}
            <section id="claims-remediation" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                8. Defect Claims, Inspection Window & Remediation
              </h2>
              <p>
                The Buyer is granted a <strong>14 calendar day inspection window</strong> upon commercial receipt of the shipment. In the rare event that items fall below agreed AQL 2.5 specifications or exhibit sewing defects, the Buyer must document the variance with photographic evidence and submit a claim to <a href="mailto:quality@haresportswear.com" className="text-[#FF751F] font-bold hover:underline">quality@haresportswear.com</a>.
              </p>
              <p>
                Upon verification, Hare Sportswear will promptly:
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm pl-2">
                <li>Expedite replacement units at zero manufacturing and shipping cost to the Buyer; OR</li>
                <li>Issue an immediate monetary credit towards the Buyer's subsequent production cycle.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="confidentiality" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                9. Confidentiality & Non-Disclosure (NDA)
              </h2>
              <p>
                All proprietary design assets, pricing matrixes, sublimation color combinations, and technical product files shared between Buyer and Hare Sportswear are strictly confidential. Neither party shall disclose commercial or manufacturing data without prior written authorization.
              </p>
            </section>

            {/* Section 10 */}
            <section id="governing-law" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                10. Governing Jurisdiction & Dispute Resolution
              </h2>
              <p>
                These terms are governed in accordance with international commercial trade laws and the arbitration guidelines established by the <strong>Sialkot Chamber of Commerce & Industry (SCCI)</strong>. Any disputes shall first be resolved amicably through constructive commercial mediation.
              </p>
            </section>

            {/* Contact Card */}
            <div className="p-8 rounded-3xl bg-[#1A1A1A] text-white shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF751F]/20 text-[#FF751F] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">Questions Regarding Commercial Terms?</h3>
                  <p className="text-xs text-cream-200">Our export compliance and legal officers are available for contract reviews.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <a href="mailto:export@haresportswear.com" className="text-[#FF751F] font-bold hover:underline">
                  export@haresportswear.com
                </a>
                <span>•</span>
                <span>Phone: +92 (52) 355-8901</span>
                <span>•</span>
                <Link to="/contact" className="px-4 py-2 rounded-xl bg-[#FF751F] text-white font-bold hover:bg-[#E65E08] transition-colors ml-auto">
                  Contact Legal Desk
                </Link>
              </div>
            </div>

          </main>

        </div>
      </div>

      {/* Dynamic Visual Content Blocks (Elementor Page Builder) */}
      <DynamicPageContent pageId="terms" />

      {/* Frequently Asked Questions */}
      <PageFAQSection 
        pageId="terms" 
        title="Terms of Service & Manufacturing Contracts FAQs" 
        subtitle="Payment Terms, Milestones & NDAs" 
      />
    </div>
  );
}
