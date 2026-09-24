import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, ShieldCheck, ChevronRight, Eye, Server, 
  FileCheck, Clock, Mail, CheckCircle2, UserCheck, Database
} from 'lucide-react';
import DynamicPageContent from '../components/cms/DynamicPageContent';
import PageFAQSection from '../components/common/PageFAQSection';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Hare Sportswear & Goods - B2B Data & Tech Pack Security';
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'overview', title: '1. Executive Privacy Overview' },
    { id: 'techpack-security', title: '2. Tech Pack & Design Asset Confidentiality' },
    { id: 'data-collection', title: '3. Information We Collect' },
    { id: 'data-usage', title: '4. How We Utilize Commercial Data' },
    { id: 'logistics-sharing', title: '5. Customs & Courier Data Disclosure' },
    { id: 'security-measures', title: '6. Technical Data Security & Storage' },
    { id: 'client-rights', title: '7. Your Rights & Data Retention' },
    { id: 'contact-officer', title: '8. Data Protection Officer Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A] pb-24">
      {/* Header Hero */}
      <section className="pt-12 pb-14 bg-gradient-to-b from-[#EFE9DC] to-[#F5F1E8] border-b border-[#E5DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#595856] mb-6">
            <Link to="/" className="hover:text-[#FF751F] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#8A847A]">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#FF751F] font-semibold">Privacy Policy</span>
          </nav>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-700">
              <Lock className="w-3.5 h-3.5" />
              <span>B2B Commercial Privacy & NDA Shield</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1A1A]">
              Corporate Privacy & Intellectual Property Policy
            </h1>
            
            <p className="text-sm sm:text-base text-[#595856] max-w-3xl leading-relaxed">
              How Hare Sportswear & Goods (Pvt.) Ltd. safeguards client proprietary apparel designs, CAD marker files, vector logos, company registration credentials, and supply chain records.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8A847A] pt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#FF751F]" />
                Effective: September 2026
              </span>
              <span>•</span>
              <span>Ref: HSG-PRIV-2026-V2</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Zero-Leak Guarantee
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Body Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Quick Jump Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
                Privacy Topics
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
                <span className="font-bold text-[#1A1A1A] block">Dedicated Tech Pack Security</span>
                <p className="text-[#595856] text-[11px] leading-relaxed">
                  Your CAD pattern designs are restricted to our encrypted pre-press workstations and never uploaded to public cloud directories.
                </p>
              </div>
            </div>
          </aside>

          {/* Privacy Clauses */}
          <main className="lg:col-span-8 space-y-12 text-sm leading-relaxed text-[#3D3C3A]">
            
            {/* Section 1 */}
            <section id="overview" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                1. Executive Privacy Overview
              </h2>
              <p>
                Hare Sportswear & Goods (Pvt.) Ltd. operates strictly as an export-oriented Original Equipment Manufacturer (OEM) and Original Design Manufacturer (ODM). We are not a direct-to-consumer retailer. We respect and protect the highly proprietary nature of new sportswear collection launches, team brand identities, and confidential technical specifications.
              </p>
              <p>
                This policy outlines our commitments under international commercial privacy conventions (including GDPR standards for European brand partners and CCPA guidelines for North American clients).
              </p>
            </section>

            {/* Section 2 */}
            <section id="techpack-security" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-emerald-500"></span>
                2. Tech Pack & Design Asset Confidentiality
              </h2>
              <p>
                When you share garment blueprints, graded measurement charts (POM), bill of materials (BOM), sublimation dye vectors, or 3D silicone mold concepts:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
                  <span className="font-bold text-[#1A1A1A] block flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#FF751F]" /> Air-Gapped Pre-Press
                  </span>
                  <p className="text-[#595856]">Digital printing files are stored on internal factory servers with role-based access restricted to pre-press supervisors.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
                  <span className="font-bold text-[#1A1A1A] block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Never Resold or Reused
                  </span>
                  <p className="text-[#595856]">We never reuse customer patterns, molds, or artwork for other clients or white-label catalogs.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="data-collection" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                3. Information We Collect
              </h2>
              <p>We only collect data necessary to prepare technical quotations, generate digital mockups, and execute international manufacturing orders:</p>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm pl-2">
                <li><strong>Corporate Contact Details:</strong> Company name, registration details, buyer name, work email address, WhatsApp/phone coordinates, and warehouse delivery address.</li>
                <li><strong>Manufacturing Specifications:</strong> Vector artwork, garment sizing breakdowns, fabric composition preferences, trim options, and target delivery dates.</li>
                <li><strong>Commercial Billing Credentials:</strong> Bank wire details, Letters of Credit (L/C) references, and VAT/EORI/Tax ID numbers required for cross-border customs declarations.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="data-usage" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                4. How We Utilize Commercial Data
              </h2>
              <p>Your information is used exclusively to:</p>
              <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm pl-2">
                <li>Formulate precision FOB/CIF/DDP price quotations and tech pack evaluations.</li>
                <li>Operate computerized cutting, dye-sublimation RIP software, and Tajima embroidery machines.</li>
                <li>Coordinate airway bills (AWB) and ocean Bills of Lading with verified freight carriers.</li>
                <li>Transmit factory quality control reports, pre-shipment photos, and tracking status.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="logistics-sharing" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                5. Customs & Courier Data Disclosure
              </h2>
              <p>
                We do not sell, rent, or trade commercial client data. Information is disclosed solely to authorized logistics authorities necessary to legally transport your goods:
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm pl-2">
                <li><strong>Certified Freight Carriers:</strong> DHL Express, FedEx Priority, and ocean freight shipping lines for parcel booking and consignment manifests.</li>
                <li><strong>Customs Authorities:</strong> Pakistan Customs Export Department, US Customs & Border Protection (CBP), HM Revenue & Customs (HMRC), and EU Port Authorities for legal import clearance.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="security-measures" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                6. Technical Data Security & Storage
              </h2>
              <p>
                All communications on haresportswear.com operate under 256-bit SSL encryption. Internal production databases are protected by enterprise hardware firewalls, regular vulnerability patching, and strict password protocols. Access to physical cutting dies and customer embroidery digitizing tapes is locked in our secure archives.
              </p>
            </section>

            {/* Section 7 */}
            <section id="client-rights" className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              <h2 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-[#FF751F]"></span>
                7. Your Rights & Data Retention
              </h2>
              <p>
                Upon completion of a manufacturing contract, you may request full deletion or return of your proprietary vector artwork files from our active design systems by contacting our compliance desk. Sizing markers and commercial invoices are retained in cold storage for the statutory period required by international fiscal and tax regulations.
              </p>
            </section>

            {/* Section 8 */}
            <section id="contact-officer" className="p-8 rounded-3xl bg-[#1A1A1A] text-white shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">Data Protection & NDA Compliance Desk</h3>
                  <p className="text-xs text-cream-200">Have questions or require custom bilateral NDA documentation?</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <a href="mailto:privacy@haresportswear.com" className="text-[#FF751F] font-bold hover:underline">
                  privacy@haresportswear.com
                </a>
                <span>•</span>
                <span>Address: Small Industrial Estate, Defence Road, Sialkot 51310, Pakistan</span>
                <span>•</span>
                <Link to="/contact" className="px-4 py-2 rounded-xl bg-[#FF751F] text-white font-bold hover:bg-[#E65E08] transition-colors ml-auto">
                  Contact Compliance Desk
                </Link>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* Dynamic Visual Content Blocks (Elementor Page Builder) */}
      <DynamicPageContent pageId="privacy" />

      {/* Frequently Asked Questions */}
      <PageFAQSection 
        pageId="privacy" 
        title="Privacy Policy & Intellectual Property FAQs" 
        subtitle="Data Protection & NDAs" 
      />
    </div>
  );
}
