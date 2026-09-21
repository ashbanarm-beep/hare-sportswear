import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, X, Sparkles, Layers, Zap, Palette, ChevronDown, 
  Check, ArrowRight, ShieldCheck, Download, Sliders, ExternalLink,
  Info, Cpu, Scissors, CheckCircle2, AlertCircle, Copy, Share2, Box
} from 'lucide-react';
import { GLOSSARY_CATEGORIES, GSM_WEIGHT_TIERS, GLOSSARY_TERMS } from '../data/fabricGlossaryData';
import { useRFQ } from '../context/RFQContext';

export default function FabricGlossaryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTermId, setExpandedTermId] = useState('gsm-definition');
  const [selectedGsmTier, setSelectedGsmTier] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const { openTechPackModal } = useRFQ();

  // Set SEO Meta Title and Description
  useEffect(() => {
    document.title = "Sportswear Fabric & Technical Glossary Hub | Hare Sportswear";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Explore technical definitions for activewear materials, fabric weights (GSM), mesh structures, and custom printing technologies used in professional sports manufacturing.";

    // Smooth scroll check if hash is present
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setExpandedTermId(targetId);
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, []);

  // Filtered terms based on category, search, and GSM tier
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        term.name.toLowerCase().includes(query) ||
        term.technicalName.toLowerCase().includes(query) ||
        term.shortDef.toLowerCase().includes(query) ||
        term.tags.some(tag => tag.toLowerCase().includes(query)) ||
        term.bestApplications.some(app => app.toLowerCase().includes(query));

      // GSM Tier filter (if clicked)
      let matchesGsm = true;
      if (selectedGsmTier) {
        if (selectedGsmTier === 'Featherweight') matchesGsm = term.gsmRange.includes('110') || term.gsmRange.includes('120') || term.gsmRange.includes('140');
        else if (selectedGsmTier === 'Midweight Performance') matchesGsm = term.gsmRange.includes('150') || term.gsmRange.includes('160') || term.gsmRange.includes('180');
        else if (selectedGsmTier === 'Heavy / Compression') matchesGsm = term.gsmRange.includes('210') || term.gsmRange.includes('250') || term.gsmRange.includes('290');
        else if (selectedGsmTier === 'Heavyweight Fleece') matchesGsm = term.gsmRange.includes('320') || term.gsmRange.includes('450') || term.gsmRange.includes('460');
      }

      return matchesCategory && matchesSearch && matchesGsm;
    });
  }, [selectedCategory, searchQuery, selectedGsmTier]);

  const toggleAccordion = (id) => {
    setExpandedTermId(prev => (prev === id ? null : id));
  };

  const handleCopyLink = (e, id) => {
    e.stopPropagation();
    const url = `${window.location.origin}/fabric-glossary#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedGsmTier(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION & SEO H1 BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#141414] text-[#F5F1E8] pt-14 pb-20 border-b border-black/40">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Ambient warm glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF751F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8A196] mb-6">
            <Link to="/" className="hover:text-[#FF751F] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/custom-manufacturing" className="hover:text-[#FF751F] transition-colors">Resources</Link>
            <span>/</span>
            <span className="text-[#FF751F]">Fabric & Technical Glossary</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF751F]/15 border border-[#FF751F]/30 text-[#FF751F] text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>International B2B OEM / ODM Technical Reference</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-[1.15] mb-5">
              Sportswear Fabric &amp; Technical Glossary Hub
            </h1>

            <p className="text-base sm:text-lg text-[#C8C2B7] leading-relaxed mb-8">
              The essential engineering glossary for activewear brand founders, technical apparel designers, and international procurement managers. Master fabric weights (GSM), warp-knit meshes, elastane compression dynamics, and zero-feel sublimation print technologies directly from our Sialkot manufacturing floor.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-3 border-t border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[#FF751F] font-bold block text-sm sm:text-base">18+ Terms</span>
                <span className="text-[#A8A196]">Standardized Specs</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-emerald-400 font-bold block text-sm sm:text-base">110 – 460 GSM</span>
                <span className="text-[#A8A196]">Weight Spectrum</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-amber-400 font-bold block text-sm sm:text-base">OEKO-TEX &amp; GRS</span>
                <span className="text-[#A8A196]">Global Certifications</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sky-400 font-bold block text-sm sm:text-base">Sialkot Plant</span>
                <span className="text-[#A8A196]">Direct Factory Testing</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. INTERACTIVE GSM WEIGHT RULER (VISUAL GUIDE) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-10 bg-[#EFE9DD] border-b border-[#E0D7C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider mb-1">
                <Sliders className="w-4 h-4" />
                <span>Interactive Fabric Weight Guide</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1A1A1A]">
                The GSM Spectrum &amp; Garment Mapping
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#66625B] max-w-md">
              Click any weight tier below to filter our technical glossary to matching fabric structures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GSM_WEIGHT_TIERS.map((tier) => {
              const isSelected = selectedGsmTier === tier.tier;
              return (
                <button
                  key={tier.tier}
                  onClick={() => setSelectedGsmTier(isSelected ? null : tier.tier)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-white shadow-lg border-[#FF751F] ring-2 ring-[#FF751F]/30 translate-y-[-2px]' 
                      : 'bg-[#F5F1E8] hover:bg-white border-[#DCD3C0] hover:border-[#FF751F]/50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1A1A1A] text-white">
                      {tier.range}
                    </span>
                    {isSelected && (
                      <span className="text-[11px] font-bold text-[#FF751F] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors mb-1 font-display">
                    {tier.tier}
                  </h3>

                  <div className="text-xs text-[#59554E] space-y-1 mt-3">
                    <p><strong>Drape:</strong> {tier.drape}</p>
                    <p className="line-clamp-2"><strong>Best For:</strong> {tier.sports}</p>
                    <p className="text-[11px] text-[#8C8476] pt-1 border-t border-[#E5DFD5]">
                      Example: {tier.recommendedFabric}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedGsmTier && (
            <div className="mt-4 flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-[#FF751F]/30 text-xs text-[#1A1A1A]">
              <span>Filtered by <strong>{selectedGsmTier}</strong></span>
              <button 
                onClick={() => setSelectedGsmTier(null)}
                className="font-bold text-[#FF751F] hover:underline flex items-center gap-1"
              >
                <span>Reset GSM Filter</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SEARCH & CATEGORY FILTER TABS */}
      {/* ------------------------------------------------------------- */}
      <section className="sticky top-[69px] z-30 bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#E0D7C6] py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {GLOSSARY_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isActive 
                        ? 'bg-[#FF751F] text-white shadow-md shadow-[#FF751F]/25' 
                        : 'bg-white hover:bg-white/80 text-[#403D38] border border-[#DCD3C0]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-black/20 text-white' : 'bg-[#EAE4D7] text-[#59554E]'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-[#8C8476] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search GSM, Spandex, Sublimation..."
                className="w-full pl-9 pr-9 py-2 bg-white rounded-xl border border-[#DCD3C0] text-sm text-[#1A1A1A] placeholder-[#8C8476] focus:outline-none focus:border-[#FF751F] focus:ring-2 focus:ring-[#FF751F]/20 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8476] hover:text-[#1A1A1A]"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Search feedback row */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#66625B]">
            <span>
              Showing <strong>{filteredTerms.length}</strong> of {GLOSSARY_TERMS.length} technical terms
            </span>
            {(searchQuery || selectedCategory !== 'all' || selectedGsmTier) && (
              <button 
                onClick={clearFilters}
                className="text-[#FF751F] font-bold hover:underline flex items-center gap-1"
              >
                <span>Reset all filters</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. MAIN GLOSSARY LISTING (ACCORDION & CARDS) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredTerms.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#DCD3C0] p-12 text-center max-w-md mx-auto shadow-sm">
              <AlertCircle className="w-12 h-12 text-[#FF751F] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 font-display">No matching glossary terms found</h3>
              <p className="text-xs sm:text-sm text-[#66625B] mb-6">
                Try searching for broader keywords like "Polyester", "Printing", "GSM", or reset the category filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-xl bg-[#FF751F] text-white font-bold text-xs hover:bg-[#e06214] transition-colors shadow-md"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredTerms.map((term) => {
                const isExpanded = expandedTermId === term.id;
                return (
                  <article
                    key={term.id}
                    id={term.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded 
                        ? 'bg-white shadow-xl border-[#FF751F]/60 ring-1 ring-[#FF751F]/30' 
                        : 'bg-white hover:bg-[#FAF8F3] border-[#DCD3C0] shadow-sm'
                    }`}
                  >
                    {/* Header Row / Toggle Bar */}
                    <div
                      onClick={() => toggleAccordion(term.id)}
                      className="p-5 sm:p-6 cursor-pointer select-none flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FF751F]/15 text-[#FF751F] font-bold text-[11px] uppercase tracking-wider">
                            {term.badge}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EAE4D7] text-[#59554E] font-semibold text-[11px]">
                            {term.categoryLabel}
                          </span>
                          <span className="text-xs text-[#8C8476] font-mono">
                            {term.gsmRange}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold font-display text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                          {term.name}
                        </h3>

                        <p className="text-xs text-[#8C8476] font-medium italic mb-2">
                          {term.technicalName}
                        </p>

                        <p className="text-xs sm:text-sm text-[#4D4A45] leading-relaxed max-w-4xl">
                          {term.shortDef}
                        </p>
                      </div>

                      {/* Right Action Area */}
                      <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                        <button
                          onClick={(e) => handleCopyLink(e, term.id)}
                          className="p-2 rounded-xl border border-[#DCD3C0] text-[#66625B] hover:text-[#FF751F] hover:bg-[#F5F1E8] transition-colors text-xs flex items-center gap-1.5"
                          title="Copy direct link to this term"
                        >
                          {copiedId === term.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[11px] text-emerald-600 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5" />
                              <span className="text-[11px] font-semibold hidden sm:inline">Share</span>
                            </>
                          )}
                        </button>

                        <div className={`p-2 rounded-xl bg-[#F5F1E8] text-[#1A1A1A] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 bg-[#FF751F] text-white' : ''
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Accordion Body */}
                    {isExpanded && (
                      <div className="border-t border-[#E5DFD5] bg-[#FAF8F3] p-5 sm:p-8 animate-fadeIn space-y-6">
                        
                        {/* 1. Deep Dive Breakdown */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF751F] mb-2 flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5" />
                            <span>Technical Engineering Breakdown</span>
                          </h4>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#33302B]">
                            {term.inDepthBreakdown}
                          </p>
                        </div>

                        {/* 2. Visual Ratings Radar/Bars */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#DCD3C0]">
                          <div>
                            <span className="text-[11px] font-bold text-[#59554E] block mb-1">Breathability</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <span 
                                  key={num} 
                                  className={`h-2 flex-1 rounded-full ${
                                    num <= term.ratings.breathability ? 'bg-emerald-500' : 'bg-gray-200'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] font-bold text-[#59554E] block mb-1">Stretch Memory</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <span 
                                  key={num} 
                                  className={`h-2 flex-1 rounded-full ${
                                    num <= term.ratings.stretch ? 'bg-[#FF751F]' : 'bg-gray-200'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] font-bold text-[#59554E] block mb-1">Durability / Tear</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <span 
                                  key={num} 
                                  className={`h-2 flex-1 rounded-full ${
                                    num <= term.ratings.durability ? 'bg-blue-500' : 'bg-gray-200'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] font-bold text-[#59554E] block mb-1">Opacity / Squat-Proof</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <span 
                                  key={num} 
                                  className={`h-2 flex-1 rounded-full ${
                                    num <= term.ratings.opacity ? 'bg-purple-500' : 'bg-gray-200'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 3. Pros & Cons Side-by-Side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Key Performance Advantages</span>
                            </h5>
                            <ul className="space-y-1.5 text-xs text-emerald-950">
                              {term.pros.map((pro, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-emerald-500 font-bold">•</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              <span>Engineering Trade-Offs &amp; Precautions</span>
                            </h5>
                            <ul className="space-y-1.5 text-xs text-amber-950">
                              {term.cons.map((con, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-amber-500 font-bold">•</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 4. Best Garment Applications & Sialkot Factory Specs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E5DFD5] text-xs">
                          <div>
                            <span className="font-bold text-[#1A1A1A] block mb-2">Recommended Sport Applications:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {term.bestApplications.map((app, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2.5 py-1 rounded-lg bg-white border border-[#DCD3C0] text-[#33302B] font-medium"
                                >
                                  {app}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-bold text-[#1A1A1A] block mb-2">Sialkot Plant OEM Specs:</span>
                            <div className="bg-white p-3 rounded-xl border border-[#DCD3C0] space-y-1 text-[11px] text-[#59554E]">
                              <p><strong>Factory MOQ:</strong> {term.factorySpecs.moq}</p>
                              <p><strong>Lab Dip / Sample Lead Time:</strong> {term.factorySpecs.sampleTime}</p>
                              <p><strong>Tolerance &amp; Lab Standards:</strong> {term.factorySpecs.tolerance}</p>
                            </div>
                          </div>
                        </div>

                        {/* 5. Direct Action CTA */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E5DFD5]">
                          <span className="text-xs text-[#66625B]">
                            Interested in utilizing <strong>{term.name}</strong> for your brand collection?
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={openTechPackModal}
                              className="px-4 py-2 rounded-xl bg-[#FF751F] hover:bg-[#e06214] text-white font-bold text-xs transition-colors shadow-sm inline-flex items-center gap-1.5"
                            >
                              <span>Upload Tech Pack for Quote</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <Link
                              to="/contact"
                              className="px-4 py-2 rounded-xl bg-white hover:bg-black/5 border border-[#DCD3C0] text-[#1A1A1A] font-bold text-xs transition-colors"
                            >
                              Request Swatch Spec
                            </Link>
                          </div>
                        </div>

                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. B2B SWATCH BOOK CONVERSION BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-[#1A1A1A] text-white border-t border-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-neutral-900 to-stone-900 border border-white/10 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF751F]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/20 border border-[#FF751F]/30 text-[#FF751F] text-xs font-bold uppercase tracking-wider mb-4">
                <Box className="w-3.5 h-3.5" />
                <span>Physical Material Verification</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white mb-4">
                Need Physical Touch &amp; Feel? Order Our Sialkot Fabric Swatch Box
              </h3>

              <p className="text-sm sm:text-base text-[#D4CDC3] leading-relaxed mb-8">
                Don't guess weights from a computer screen. We courier a physical swatch portfolio containing 30+ precision swatches (110–460 GSM interlocks, birdseye meshes, 4-way spandex, brushed fleece, and tactile 3D silicone heat seals) directly to your design studio via DHL/FedEx Express in 3-5 days.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-xl bg-[#FF751F] hover:bg-[#e06214] text-white font-bold text-sm transition-colors shadow-lg shadow-[#FF751F]/20 inline-flex items-center gap-2"
                >
                  <span>Request Custom Swatch Kit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={openTechPackModal}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-colors"
                >
                  Upload Existing Tech Pack
                </button>
              </div>

              <div className="mt-6 flex items-center gap-6 text-xs text-[#A8A196]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Free with Bulk Orders
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Worldwide Air Transit
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. INTERNAL SEO INTERLINKING HUB */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 bg-[#EAE4D7] border-t border-[#DCD3C0] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="p-4 rounded-xl bg-white/80 border border-[#DCD3C0]">
              <h4 className="font-bold text-[#1A1A1A] mb-2 uppercase tracking-wider text-[11px] font-display">
                Custom Manufacturing
              </h4>
              <p className="text-[#59554E] mb-3 leading-relaxed">
                Explore our full OEM/ODM manufacturing pipeline, cutting tables, Monti Antonio sublimation presses, and stitching floors.
              </p>
              <Link to="/custom-manufacturing" className="text-[#FF751F] font-bold hover:underline inline-flex items-center gap-1">
                <span>View OEM Capabilities</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-[#DCD3C0]">
              <h4 className="font-bold text-[#1A1A1A] mb-2 uppercase tracking-wider text-[11px] font-display">
                Quality Assurance &amp; Lab Testing
              </h4>
              <p className="text-[#59554E] mb-3 leading-relaxed">
                Review our 7-stage AQL 2.5 inspection protocols, Martindale abrasion tests, and color fastness standards.
              </p>
              <Link to="/quality" className="text-[#FF751F] font-bold hover:underline inline-flex items-center gap-1">
                <span>Quality &amp; Lab Standards</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-[#DCD3C0]">
              <h4 className="font-bold text-[#1A1A1A] mb-2 uppercase tracking-wider text-[11px] font-display">
                Global Export Desks
              </h4>
              <p className="text-[#59554E] mb-3 leading-relaxed">
                Dedicated regional duty-paid (DDP) logistics for brand owners in USA, UK, Australia, Germany, and UAE.
              </p>
              <Link to="/sports-wear-manufacturer-usa" className="text-[#FF751F] font-bold hover:underline inline-flex items-center gap-1">
                <span>Explore Country Hubs</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
