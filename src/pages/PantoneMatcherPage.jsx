import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Pipette, Sparkles, Check, Copy, ArrowRight, ShieldCheck, 
  Layers, Search, Sliders, RefreshCw, Send, CheckCircle2, ChevronRight, Info
} from 'lucide-react';
import { pantoneLibrary, findNearestPantone, hexToRgb } from '../data/pantoneColors';
import { useRFQ } from '../context/RFQContext';

export default function PantoneMatcherPage() {
  const navigate = useNavigate();
  const { attachColorsToRFQ } = useRFQ();

  const [inputHex, setInputHex] = useState('#FF751F');
  const [selectedFabricTexture, setSelectedFabricTexture] = useState('interlock');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copied, setCopied] = useState(false);
  const [attached, setAttached] = useState(false);

  // Perform instant nearest-neighbor matching
  const matchResult = useMemo(() => {
    return findNearestPantone(inputHex);
  }, [inputHex]);

  const matched = matchResult.matchedSwatch;

  // Filter swatches in library
  const filteredSwatches = useMemo(() => {
    return pantoneLibrary.filter(item => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.sports.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopySpec = () => {
    const specText = `Pantone Specification for Sialkot Strike-Off:
- Color Name: ${matched.name}
- PMS Code: ${matched.code}
- HEX Code: ${matched.hex}
- CMYK Breakdown: ${matched.cmyk}
- Italian Sublimation Ink: ${matched.kiianInk}
- Delta-E Match Confidence: ${matchResult.confidence}`;

    navigator.clipboard.writeText(specText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAttachToRFQ = () => {
    attachColorsToRFQ({
      role: 'Client Custom Spec',
      name: matched.name,
      code: matched.code,
      hex: matched.hex,
      cmyk: matched.cmyk,
      kiianInk: matched.kiianInk
    });
    setAttached(true);
    setTimeout(() => {
      navigate('/contact?source=pantone-matcher');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#595856]">
        <Link to="/" className="hover:text-[#FF751F] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/tools" className="hover:text-[#FF751F] transition-colors">Tools</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#FF751F] font-semibold">Pantone Color Matcher</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/10 border border-[#FF751F]/25 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <Pipette className="w-3.5 h-3.5" />
          <span>Industrial Color Matching System</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          Pantone Color Matcher & Digital Swatches
        </h1>
        <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
          Match your team's vector brand identity to certified <strong>Pantone Textile (PMS)</strong> standards, verify Italian Kiian ink formulations for dye-sublimation, and simulate physical fabric strike-offs before cutting.
        </p>
      </div>

      {/* Main Interactive Matching Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Console: Color Picker & Input (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-[#E5DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD5]">
            <h3 className="font-display font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
              <Pipette className="w-5 h-5 text-[#FF751F]" />
              <span>Input Brand Color</span>
            </h3>
            <span className="text-xs text-[#8A847A] font-mono">HEX / RGB / EyeDropper</span>
          </div>

          {/* Dual Visual Picker + Hex Input */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#E5DFD5] shadow-inner shrink-0 cursor-pointer group">
                <input
                  type="color"
                  value={inputHex}
                  onChange={(e) => setInputHex(e.target.value.toUpperCase())}
                  className="absolute -top-4 -left-4 w-32 h-32 cursor-pointer opacity-0"
                  aria-label="Color Picker"
                />
                <div 
                  className="w-full h-full transition-transform group-hover:scale-105"
                  style={{ backgroundColor: inputHex }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <Pipette className="w-5 h-5 text-white drop-shadow" />
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <label className="text-xs font-bold text-[#1A1A1A] block uppercase tracking-wider">
                  Target Hex Code
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[#8A847A] font-bold">#</span>
                  <input
                    type="text"
                    maxLength={7}
                    value={inputHex.replace('#', '')}
                    onChange={(e) => {
                      const val = '#' + e.target.value.replace(/[^0-9A-Fa-f]/g, '');
                      setInputHex(val.toUpperCase());
                    }}
                    placeholder="FF751F"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] font-mono text-sm font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F] uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Quick Preset Color Chips */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-[#8A847A] uppercase tracking-wider block">
                Standard Athletic Benchmarks:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Hare Orange', hex: '#FF751F' },
                  { name: 'Royal Blue', hex: '#0033A0' },
                  { name: 'Navy', hex: '#00205B' },
                  { name: 'Crimson', hex: '#C8102E' },
                  { name: 'Gold', hex: '#FFB81C' },
                  { name: 'Kelly Green', hex: '#00843D' },
                  { name: 'Stealth Black', hex: '#111111' },
                  { name: 'Volt Lime', hex: '#DFFF00' }
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputHex(chip.hex)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F3] hover:bg-[#F5F1E8] border border-[#E5DFD5] text-[11px] font-semibold text-[#1A1A1A] transition-all hover:scale-105"
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: chip.hex }} />
                    <span>{chip.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Fabric Strike-off Texture Selector */}
          <div className="space-y-3 pt-4 border-t border-[#E5DFD5]">
            <label className="text-xs font-bold text-[#1A1A1A] block uppercase tracking-wider">
              Fabric Substrate Simulation
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'interlock', name: '160 GSM Interlock', label: 'Silky Gloss' },
                { id: 'mesh', name: '180 GSM Mesh', label: 'Micro-Pores' },
                { id: 'fleece', name: '300 GSM Terry', label: 'Matte Fleece' },
              ].map((fab) => (
                <button
                  key={fab.id}
                  onClick={() => setSelectedFabricTexture(fab.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedFabricTexture === fab.id
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm font-bold'
                      : 'bg-[#FAF8F3] text-[#595856] border-[#E5DFD5] hover:bg-white hover:text-[#1A1A1A]'
                  }`}
                >
                  <span className="block text-[11px] truncate">{fab.name}</span>
                  <span className="block text-[9px] opacity-75">{fab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Strike-Off Fabric Preview Swatch */}
          <div className="rounded-2xl border border-[#E5DFD5] overflow-hidden bg-[#FAF8F3]">
            <div 
              className={`relative h-28 flex items-end p-4 transition-all duration-300 ${
                selectedFabricTexture === 'mesh' 
                  ? 'bg-[radial-gradient(#00000030_1.5px,transparent_1.5px)] bg-[size:6px_6px]'
                  : selectedFabricTexture === 'fleece'
                    ? 'backdrop-blur-sm'
                    : ''
              }`}
              style={{ backgroundColor: matched.hex }}
            >
              {/* Texture sheen overlays */}
              {selectedFabricTexture === 'interlock' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
              )}
              {selectedFabricTexture === 'mesh' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff18_1px,transparent_1px)] bg-[size:4px_4px] pointer-events-none" />
              )}
              {selectedFabricTexture === 'fleece' && (
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              )}

              <div className="relative z-10 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs flex items-center justify-between w-full border border-white/20 font-mono">
                <span className="font-bold">{matched.code}</span>
                <span className="text-[10px] text-emerald-400">Simulation Active</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Console: Exact Match Results & Factory Action (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E5DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5DFD5]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F]">
                Nearest Certified Match
              </span>
              <h3 className="text-2xl font-display font-extrabold text-[#1A1A1A]">
                {matched.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{matchResult.confidence} Match Precision</span>
            </div>
          </div>

          {/* Color Swatch Comparison Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#8A847A] tracking-wider block">
                Your Input Target:
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-black/10 shrink-0 shadow-sm" style={{ backgroundColor: inputHex }} />
                <div>
                  <span className="font-mono text-xs font-bold text-[#1A1A1A] block">{inputHex}</span>
                  <span className="text-[10px] text-[#595856]">Digital Client Spec</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border-2 border-[#FF751F]/40 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#FF751F] tracking-wider block">
                Official Pantone Match:
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-black/10 shrink-0 shadow-sm" style={{ backgroundColor: matched.hex }} />
                <div>
                  <span className="font-mono text-xs font-bold text-[#1A1A1A] block">{matched.code}</span>
                  <span className="text-[10px] text-[#595856] font-mono">{matched.hex}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Production Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A847A] block">
                PMS Textile Reference
              </span>
              <p className="font-display font-bold text-base text-[#1A1A1A]">{matched.code}</p>
              <p className="text-[11px] text-[#595856]">Universal Pantone Formula Guide</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A847A] block">
                CMYK Strike-Off Ratio
              </span>
              <p className="font-mono font-bold text-sm text-[#1A1A1A]">{matched.cmyk}</p>
              <p className="text-[11px] text-[#595856]">Calibrated for 4-Color Rip Softwares</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A847A] block">
                Italian Sublimation Ink
              </span>
              <p className="font-semibold text-xs text-[#1A1A1A]">{matched.kiianInk}</p>
              <p className="text-[11px] text-[#595856]">Certified OEKO-TEX Standard 100</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A847A] block">
                Recommended Athletics
              </span>
              <p className="font-semibold text-xs text-[#1A1A1A]">{matched.sports}</p>
              <p className="text-[11px] text-[#595856]">High UV Fastness (Grade 4.5+)</p>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#E5DFD5] flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAttachToRFQ}
              className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-glow-orange flex items-center justify-center gap-2 active:scale-95 transition-all group"
            >
              <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              <span>{attached ? '✓ Attached! Routing to RFQ...' : 'Attach Color to RFQ'}</span>
            </button>

            <button
              onClick={handleCopySpec}
              className="py-3.5 px-5 rounded-xl font-semibold text-xs bg-[#FAF8F3] hover:bg-[#F5F1E8] text-[#1A1A1A] border border-[#E5DFD5] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#8A847A]" />}
              <span>{copied ? 'Copied Specs!' : 'Copy Spec Sheet'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Searchable Pantone Library Section */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
              Browse Authentic Athletic Palette
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#1A1A1A]">
              Standard Sialkot Factory PMS Swatches
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by color name, code, sport..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#FF751F]"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Teamwear', 'High-Vis', 'Muted', 'Neutral'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#1A1A1A] text-white font-bold shadow-sm'
                  : 'bg-white border border-[#E5DFD5] text-[#595856] hover:text-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Swatch Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredSwatches.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setInputHex(item.hex);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="p-3 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-2"
              title={`Click to inspect ${item.name}`}
            >
              <div 
                className="w-full h-16 rounded-xl border border-black/10 shadow-inner group-hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: item.hex }}
              />
              <div>
                <p className="font-mono text-xs font-bold text-[#1A1A1A] truncate">{item.code}</p>
                <p className="text-[11px] text-[#595856] font-medium truncate">{item.name}</p>
                <p className="text-[10px] text-[#8A847A] font-mono mt-0.5">{item.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Production Guarantee Banner */}
      <div className="rounded-3xl bg-[#1A1A1A] text-white p-8 sm:p-10 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF751F] flex items-center justify-center lg:justify-start gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Delta-E &lt; 1.5 Spectrophotometer Auditing</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            Need Physical Fabric Swatches Shipped to Your Facility?
          </h3>
          <p className="text-xs sm:text-sm text-[#D9D2C6] leading-relaxed">
            We provide physical 30-color sublimated polyester swatch rings delivered to the USA, UK, Canada, Australia, and Europe via DHL Express within 5 days so you can verify hand feel and color strike-off in person.
          </p>
        </div>

        <Link
          to="/contact?source=swatch-ring-request"
          className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#FF751F] hover:bg-[#E65E08] text-white transition-all shadow-glow-orange shrink-0"
        >
          Request Physical Swatch Ring
        </Link>
      </div>

    </div>
  );
}
