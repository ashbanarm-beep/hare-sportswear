import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, MessageCircle, Upload, FileText, 
  CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock, 
  Trash2, Sparkles, Building2, Send, Check, Palette, Calculator, X
} from 'lucide-react';
import { useRFQ } from '../context/RFQContext';
import DynamicPageContent from '../components/cms/DynamicPageContent';
import PageFAQSection from '../components/common/PageFAQSection';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const { 
    selectedProductForInquiry, 
    setSelectedProductForInquiry,
    attachedColors,
    clearAttachedColors,
    attachedEstimate,
    clearAttachedEstimate,
    attachedMockup,
    clearAttachedMockup
  } = useRFQ();

  const prefillProduct = searchParams.get('product') || (selectedProductForInquiry ? selectedProductForInquiry.name : '');
  const prefillCat = searchParams.get('cat') || (selectedProductForInquiry ? selectedProductForInquiry.category : 'Teamwear & Kits');
  const prefillQty = searchParams.get('qty') || (selectedProductForInquiry ? `MOQ: ${selectedProductForInquiry.moq}` : '100-500');
  const prefillCountry = searchParams.get('country') || '';
  const prefillFabric = selectedProductForInquiry ? selectedProductForInquiry.material : '100% Polyester Interlock (160 GSM)';

  const initialMessage = prefillProduct 
    ? `Inquiring regarding custom OEM/ODM manufacturing for "${prefillProduct}". Please provide wholesale factory pricing, MOQ breakdown, and sampling lead times.`
    : '';

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: prefillCountry,
    category: prefillCat,
    quantity: prefillQty,
    targetDate: 'Within 30 Days',
    fabricPreference: prefillFabric,
    message: initialMessage
  });

  // Pre-fill attached colors from digital tools
  useEffect(() => {
    if (attachedColors && attachedColors.length > 0) {
      const colorNotes = `[Attached Pantone Textile Specifications]:\n` +
        attachedColors.map(c => `• ${c.role || 'Color'}: ${c.name} (${c.code} / ${c.hex}) - Ink: ${c.kiianInk}`).join('\n');
      
      setFormData(prev => {
        if (!prev.message.includes('[Attached Pantone Textile Specifications]')) {
          return {
            ...prev,
            message: prev.message ? `${colorNotes}\n\n${prev.message}` : colorNotes
          };
        }
        return prev;
      });
    }
  }, [attachedColors]);

  // Pre-fill attached estimate from Manufacturing Cost Calculator
  useEffect(() => {
    if (attachedEstimate) {
      const estNotes = `[Attached Manufacturing Cost Calculator Specification & Quote]:\n` +
        `• Product / Kit: ${attachedEstimate.category}\n` +
        `• Quantity: ${attachedEstimate.quantity} Units\n` +
        `• Estimated Factory Price: ${attachedEstimate.unitPriceRange}\n` +
        `• Landed Unit Est (DDP): ${attachedEstimate.landedUnitEst}\n` +
        `• Grand Total Projected: ${attachedEstimate.totalEst}\n` +
        `• Production & Lead Time: ${attachedEstimate.leadTimeDays}\n` +
        `• Freight Mode: ${attachedEstimate.shipping}` +
        (attachedEstimate.garmentSpecs ? `\n• Garment Specifications:\n  ${attachedEstimate.garmentSpecs}` : '') +
        (attachedEstimate.sizeCurve ? `\n• Size Curve Breakdown: ${attachedEstimate.sizeCurve}` : '') +
        (attachedEstimate.embellishments?.length ? `\n• Custom Embellishments: ${attachedEstimate.embellishments.join(', ')}` : '');

      setFormData(prev => {
        if (!prev.message.includes('[Attached Manufacturing Cost Calculator') && !prev.message.includes('[Attached Instant Production Cost Estimate]')) {
          return {
            ...prev,
            quantity: `${attachedEstimate.quantity}`,
            message: prev.message ? `${estNotes}\n\n${prev.message}` : estNotes
          };
        }
        return prev;
      });
    }
  }, [attachedEstimate]);

  // Pre-fill attached AI mockup prototype from AI Mockup Generator
  useEffect(() => {
    if (attachedMockup) {
      const pmsList = attachedMockup.pantoneCodes?.map(p => `${p.role}: ${p.name} (${p.pantone || p.hex})`).join(', ') || 'Custom Sportswear Palette';
      const mockupNotes = `[Attached AI Product Mockup & Design Prototype]:\n` +
        `• Garment Type: ${attachedMockup.apparelName || attachedMockup.apparelType || 'Custom Sportswear'}\n` +
        `• Style / Concept: ${attachedMockup.concept || attachedMockup.prompt || 'Custom Athletic Tech Spec'}\n` +
        `• Color Scheme & Pantone: ${pmsList}\n` +
        (attachedMockup.fabricSpecs ? `• Fabric Specification: ${attachedMockup.fabricSpecs.name} (${attachedMockup.fabricSpecs.gsm} GSM, ${attachedMockup.fabricSpecs.composition})\n` : '') +
        (attachedMockup.productionDetails?.length ? `• Construction & Stitching: ${attachedMockup.productionDetails.join('; ')}\n` : '') +
        `• Visual Mockup Attached: Yes (Digital Vector / Prototype included)`;

      setFormData(prev => {
        if (!prev.message.includes('[Attached AI Product Mockup & Design Prototype]')) {
          return {
            ...prev,
            category: attachedMockup.category || prev.category,
            fabricPreference: attachedMockup.fabricSpecs?.name 
              ? `${attachedMockup.fabricSpecs.name} (${attachedMockup.fabricSpecs.gsm} GSM)` 
              : prev.fabricPreference,
            message: prev.message ? `${mockupNotes}\n\n${prev.message}` : mockupNotes
          };
        }
        return prev;
      });
    }
  }, [attachedMockup]);

  useEffect(() => {
    const country = searchParams.get('country');
    const product = searchParams.get('product') || (selectedProductForInquiry ? selectedProductForInquiry.name : '');
    const cat = searchParams.get('cat') || (selectedProductForInquiry ? selectedProductForInquiry.category : '');
    const qty = searchParams.get('qty') || (selectedProductForInquiry ? `MOQ: ${selectedProductForInquiry.moq}` : '');

    if (country || product || cat || qty || selectedProductForInquiry) {
      setFormData(prev => ({
        ...prev,
        country: country !== null && country !== undefined ? country : prev.country,
        category: cat || prev.category,
        quantity: qty || prev.quantity,
        fabricPreference: selectedProductForInquiry?.material || prev.fabricPreference,
        message: product 
          ? `Inquiring regarding custom OEM/ODM manufacturing for "${product}". Please provide wholesale factory pricing, MOQ breakdown, and sampling lead times.`
          : prev.message
      }));
    }
  }, [searchParams, selectedProductForInquiry]);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type || 'Tech Pack Asset'
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type || 'Tech Pack Asset'
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = 'RFQ-HSG-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(ref);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSelectedProductForInquiry(null);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Direct Export Desk • Sialkot Plant</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          Request a Production Quote (RFQ)
        </h1>
        <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
          Submit your design files, tech packs, or general quantity inquiry. Our garment technologists will examine your specifications and provide a factory-direct pricing quote and sampling timeline within 12 hours.
        </p>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Factory Coordinates (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="p-8 rounded-3xl bg-white border border-[#E5DFD5] space-y-6 shadow-sm">
            <h3 className="font-display font-bold text-xl text-[#1A1A1A]">
              Sialkot Headquarters & Factory
            </h3>
            
            <ul className="space-y-4 text-xs text-[#595856]">
              <li className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#FF751F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block text-sm">Factory Plant Location</strong>
                  <span className="leading-relaxed mt-0.5 block">
                    Plots 42-45, Phase II, Small Industrial Estate, Defence Road, Sialkot 51310, Punjab, Pakistan
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#FF751F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block text-sm">Direct Commercial Emails</strong>
                  <div className="space-y-0.5 mt-0.5">
                    <a href="mailto:export@haresportswear.com" className="text-[#FF751F] font-bold hover:underline block">
                      export@haresportswear.com (Export Director)
                    </a>
                    <a href="mailto:sampling@haresportswear.com" className="hover:text-[#1A1A1A] block">
                      sampling@haresportswear.com (Tech Pack & Sampling)
                    </a>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#FF751F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block text-sm">Telephone Desk</strong>
                  <span className="block mt-0.5">
                    +92 (52) 355-8901 / 8902 (09:00 - 18:00 PKT / GMT+5)
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block text-sm">24/7 Factory WhatsApp Desk</strong>
                  <span className="block mt-0.5">
                    Dedicated account managers for North America, UK, and European timezones.
                  </span>
                  <a
                    href="https://wa.me/message/PBVPZM3J7ETGH1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-600 font-bold mt-1.5 hover:underline"
                  >
                    <span>Chat on Factory WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#E5DFD5] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#1A1A1A]">
                <Clock className="w-4 h-4 text-[#FF751F]" />
                <span><strong>12-Hour SLA:</strong> Guaranteed quote turnaround</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-[#FF751F]" />
                <span>NDA & Confidentiality Agreements available upon request</span>
              </div>
            </div>

          </div>

          {/* Sialkot Location Logistics Card */}
          <div className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8A847A] uppercase tracking-wider">
                Logistics & Air Freight Hub
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                SKT Airport Conduits
              </span>
            </div>
            <p className="text-xs text-[#595856] leading-relaxed">
              Located 15 minutes from Sialkot International Airport (SKT), with daily DHL, FedEx, and UPS cargo flights ensuring your sample arrives in Los Angeles, London, Frankfurt, or Sydney in 3-5 days.
            </p>
          </div>

        </div>

        {/* Right Column: Advanced RFQ Form (7 cols) */}
        <div className="lg:col-span-7">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5DFD5] shadow-xl relative">
            
            {/* Submitted Confirmation State */}
            {isSubmitted ? (
              <div className="text-center py-10 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#FF751F]/15 border-2 border-[#FF751F] text-[#FF751F] flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold font-mono text-[#FF751F] bg-[#FF751F]/10 px-3 py-1 rounded-full border border-[#FF751F]/30">
                    {referenceId}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1A1A1A] mt-3">
                    RFQ Successfully Dispatched to Sialkot!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#595856] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Our Lead Garment Technologist has received your technical specs and will review your tech pack files.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] text-left max-w-md mx-auto space-y-2 text-xs text-[#595856]">
                  <div className="flex justify-between py-1 border-b border-[#E5DFD5]">
                    <span>Company:</span>
                    <span className="font-bold text-[#1A1A1A]">{formData.companyName || 'Private Label'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5DFD5]">
                    <span>Product Division:</span>
                    <span className="font-bold text-[#FF751F]">{formData.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5DFD5]">
                    <span>Order Bracket:</span>
                    <span className="font-bold text-[#1A1A1A]">{formData.quantity} Units</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5DFD5]">
                    <span>Attached Assets:</span>
                    <span className="font-bold text-[#1A1A1A]">{uploadedFiles.length} file(s) attached</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>SLA Response Time:</span>
                    <span className="font-bold text-emerald-600">Within 12 Hours</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <a
                    href="https://wa.me/message/PBVPZM3J7ETGH1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Notify Production on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setUploadedFiles([]);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs bg-[#FAF8F3] hover:bg-black/5 text-[#1A1A1A] border border-[#E5DFD5] transition-colors"
                  >
                    Submit Another Quote
                  </button>
                </div>
              </div>
            ) : (
              
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#1A1A1A]">
                      Custom Production Request
                    </h3>
                    <p className="text-xs text-[#595856]">
                      Fill in your specifications below for instant factory evaluation
                    </p>
                  </div>
                  {(prefillProduct || selectedProductForInquiry) && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF751F]/10 border border-[#FF751F]/30 text-xs font-bold text-[#FF751F]">
                      <span className="w-2 h-2 rounded-full bg-[#FF751F] animate-pulse"></span>
                      <span className="truncate max-w-[240px]">
                        Inquiring: {prefillProduct || selectedProductForInquiry?.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Company / Club / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Athletics LLC"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F] transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@apexathletics.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+1 (555) 019-2831"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F] transition-colors"
                    />
                  </div>
                </div>

                {/* Category & Quantity Bracket */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Product Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs focus:outline-none focus:border-[#FF751F] cursor-pointer font-medium"
                    >
                      <option value="Teamwear & Kits">Teamwear & Sublimated Match Kits</option>
                      <option value="Activewear & Gym Essentials">Activewear & Gym Essentials</option>
                      <option value="Sports Bras & Women's Activewear">Sports Bras & Women's Activewear</option>
                      <option value="Wrestling Equipment & Combat Gear">Wrestling Equipment & Combat Gear</option>
                      <option value="Sports Goods & Accessories">Sports Equipment & Goods</option>
                      <option value="Custom Bespoke Production">Custom Bespoke Tech Pack Production</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Estimated Quantity (MOQ) *
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs focus:outline-none focus:border-[#FF751F] cursor-pointer font-medium"
                    >
                      <option value="25-50 (Sample Run)">25 - 50 Pcs (Rapid Sample Run)</option>
                      <option value="50-100 (Team / Startup)">50 - 100 Pcs (Teamwear / Startup)</option>
                      <option value="100-500 (Pro Brand)">100 - 500 Pcs (Pro Brand / Club)</option>
                      <option value="500-2,000 (Bulk Production)">500 - 2,000 Pcs (Bulk Production)</option>
                      <option value="2,000+ (Distributor Wholesale)">2,000+ Pcs (Distributor Wholesale)</option>
                    </select>
                  </div>
                </div>

                {/* Target Fabric Preference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Target Fabric / Yarn Preference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 160 GSM CoolMax Interlock / 340 GSM French Terry"
                    value={formData.fabricPreference}
                    onChange={(e) => setFormData({ ...formData, fabricPreference: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F] transition-colors"
                  />
                </div>

                {/* File Upload Area for Tech Packs / Vector Art */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5 flex items-center justify-between">
                    <span>Attach Tech Pack / Vector Logo / Mockup</span>
                    <span className="text-[#8A847A] font-normal">Formats: AI, PDF, EPS, CDR, PNG (Up to 50MB)</span>
                  </label>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleFileDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                      isDragging 
                        ? 'border-[#FF751F] bg-[#FF751F]/10' 
                        : 'border-[#E5DFD5] hover:border-[#FF751F]/50 bg-[#FAF8F3]'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-[#FF751F] mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#1A1A1A]">
                      Drag & Drop your Tech Pack or Vector artwork here
                    </p>
                    <p className="text-[11px] text-[#595856] mt-1">
                      or click to browse local files from your computer
                    </p>
                    
                    <input
                      type="file"
                      id="techPackInput"
                      multiple
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    <label
                      htmlFor="techPackInput"
                      className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-white hover:bg-black/5 text-[#1A1A1A] border border-[#E5DFD5] font-bold text-xs cursor-pointer transition-colors shadow-sm"
                    >
                      Browse Files
                    </label>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-xs text-[#1A1A1A]"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-[#FF751F] shrink-0" />
                            <span className="truncate font-bold">{file.name}</span>
                            <span className="text-[#8A847A] font-mono text-[10px]">({file.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="text-[#8A847A] hover:text-[#FF751F] transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Attached Tools Badges */}
                {attachedColors && attachedColors.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[#FF751F]/5 border border-[#FF751F]/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-[#FF751F]" />
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          Attached Pantone Textile Specifications ({attachedColors.length})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={clearAttachedColors}
                        className="text-[11px] font-bold text-stone-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {attachedColors.map((color, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-white border border-[#E5DFD5] flex items-center gap-2 shadow-xs">
                          <span 
                            className="w-4 h-4 rounded-full border border-stone-300 shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-[10px] block truncate text-[#1A1A1A]">{color.name}</span>
                            <span className="font-mono text-[9px] text-[#FF751F] block">{color.code}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {attachedEstimate && (
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          Attached Manufacturing Cost Calculator Specification & Quote
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={clearAttachedEstimate}
                        className="text-[11px] font-bold text-stone-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-white border border-[#E5DFD5]">
                        <span className="text-[10px] text-stone-400 block">Category</span>
                        <span className="font-bold text-stone-800 text-[11px] truncate block">{attachedEstimate.category}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#E5DFD5]">
                        <span className="text-[10px] text-stone-400 block">Order Volume</span>
                        <span className="font-bold text-[#1A1A1A] text-[11px] font-mono">{attachedEstimate.quantity} PCS</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#E5DFD5]">
                        <span className="text-[10px] text-stone-400 block">Factory Unit Est</span>
                        <span className="font-bold text-[#FF751F] text-[11px] font-mono">{attachedEstimate.unitPriceRange}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#E5DFD5]">
                        <span className="text-[10px] text-stone-400 block">Projected Total</span>
                        <span className="font-bold text-emerald-700 text-[11px] font-mono">{attachedEstimate.totalEst}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Attached AI Mockup Prototype Badge */}
                {attachedMockup && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FF751F]/10 via-amber-500/5 to-purple-500/10 border border-[#FF751F]/40 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-[#FF751F] text-white shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-[#1A1A1A] block">
                            Attached AI Sportswear Mockup Prototype
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {attachedMockup.apparelName || 'Digital Apparel Tech Pack'} • Sialkot OEM/ODM Direct
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearAttachedMockup}
                        className="text-[11px] font-bold text-stone-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 rounded-xl bg-white border border-[#E5DFD5]">
                      {attachedMockup.previewImage ? (
                        <img 
                          src={attachedMockup.previewImage} 
                          alt="AI Mockup Preview" 
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-stone-50 border border-stone-200 p-1 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-stone-900 text-white flex flex-col items-center justify-center p-2 text-center shrink-0 border border-stone-800 shadow-inner">
                          <Sparkles className="w-5 h-5 text-[#FF751F] mb-1" />
                          <span className="text-[9px] font-bold uppercase tracking-wider text-stone-300">Mockup</span>
                          <span className="text-[8px] text-[#FF751F] font-mono">Vector AI</span>
                        </div>
                      )}

                      <div className="min-w-0 flex-1 space-y-1 text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-[#1A1A1A] text-sm">
                            {attachedMockup.apparelName || attachedMockup.apparelType}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF751F]/15 text-[#FF751F] border border-[#FF751F]/30">
                            {attachedMockup.teamName || 'Custom Teamwear'}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 line-clamp-2 italic">
                          "{attachedMockup.concept || attachedMockup.prompt}"
                        </p>
                        
                        {/* Pantone Swatches */}
                        {attachedMockup.pantoneCodes && attachedMockup.pantoneCodes.length > 0 && (
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="text-[10px] font-bold text-stone-400">PMS:</span>
                            {attachedMockup.pantoneCodes.slice(0, 4).map((p, pIdx) => (
                              <div key={pIdx} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-[9px] font-mono">
                                <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: p.hex }} />
                                <span className="font-semibold text-stone-700">{p.pantone || p.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Specific Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Order Details & Custom Notes
                  </label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify sizing breakdown, Pantone color codes, collar styles, or target delivery deadlines..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F] transition-colors"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF751F] via-[#FF8438] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-glow-orange transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Dispatching Specifications to Engineering...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit RFQ for Instant Factory Evaluation</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#8A847A]">
                  By submitting, you will receive an itemized quotation sheet and sample timeline directly from our Sialkot manufacturing desk.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>

      {/* Dynamic Visual Content Blocks (Elementor Page Builder) */}
      <DynamicPageContent pageId="contact" />

      {/* Frequently Asked Questions */}
      <PageFAQSection 
        pageId="contact" 
        title="Quotation, RFQ & Direct Contact FAQs" 
        subtitle="Response Times & Technical Support" 
      />

    </div>
  );
}
