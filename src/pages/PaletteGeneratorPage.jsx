import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Palette, Lock, Unlock, RefreshCw, Send, Copy, CheckCircle2, 
  Sparkles, ArrowRight, ShieldCheck, Shirt, Eye, Download, Info
} from 'lucide-react';
import { 
  pantoneLibrary, 
  athleticPalettePresets, 
  findNearestPantone 
} from '../data/pantoneColors';
import { useRFQ } from '../context/RFQContext';

export default function PaletteGeneratorPage() {
  const navigate = useNavigate();
  const { attachColorsToRFQ } = useRFQ();

  // Initialize with the first preset (Hare Sportswear Signature)
  const initialPreset = athleticPalettePresets[0];
  const [currentSlots, setCurrentSlots] = useState(
    initialPreset.colors.map(c => ({
      ...c,
      locked: false
    }))
  );

  const [activePresetId, setActivePresetId] = useState(initialPreset.id);
  const [copied, setCopied] = useState(false);
  const [attached, setAttached] = useState(false);
  const [activeJerseyStyle, setActiveJerseyStyle] = useState('modern-athletic'); // or 'classic-stripe'
  const [jerseyNumber, setJerseyNumber] = useState('08');

  // Handle slot lock toggle
  const toggleLock = (index) => {
    setCurrentSlots(prev => prev.map((slot, i) => 
      i === index ? { ...slot, locked: !slot.locked } : slot
    ));
  };

  // Update specific slot color via manual color picker or hex input
  const updateSlotColor = (index, newHex) => {
    const match = findNearestPantone(newHex);
    const swatch = match.matchedSwatch;
    setCurrentSlots(prev => prev.map((slot, i) => {
      if (i === index) {
        return {
          ...slot,
          code: swatch.code,
          name: swatch.name,
          hex: swatch.hex,
          rgb: swatch.rgb,
          cmyk: swatch.cmyk,
          kiianInk: swatch.kiianInk,
          contrast: swatch.contrast
        };
      }
      return slot;
    }));
  };

  // Load a preset palette
  const handleLoadPreset = (preset) => {
    setActivePresetId(preset.id);
    setCurrentSlots(preset.colors.map((c, i) => {
      // If the current slot is locked, keep its current color
      if (currentSlots[i]?.locked) {
        return currentSlots[i];
      }
      return {
        ...c,
        locked: false
      };
    }));
  };

  // Randomize unlocked slots with diverse pantone swatches
  const handleRandomize = () => {
    setActivePresetId('custom');
    const available = [...pantoneLibrary].sort(() => 0.5 - Math.random());
    
    setCurrentSlots(prev => prev.map((slot, i) => {
      if (slot.locked) return slot;
      const picked = available[i % available.length];
      return {
        ...slot,
        code: picked.code,
        name: picked.name,
        hex: picked.hex,
        rgb: picked.rgb,
        cmyk: picked.cmyk,
        kiianInk: picked.kiianInk,
        contrast: picked.contrast
      };
    }));
  };

  // Copy full tech pack specs to clipboard
  const handleCopySpecs = () => {
    const specText = `HARE SPORTSWEAR - TEAM UNIFORM COLOR SPECIFICATION:
=========================================================
${currentSlots.map(s => `[${s.role}]
- Name: ${s.name}
- Pantone: ${s.code}
- HEX: ${s.hex}
- CMYK: ${s.cmyk}
- Kiian Ink: ${s.kiianInk}`).join('\n\n')}
=========================================================
Guaranteed Sublimation Precision: Level 4.5+ Washfastness (Sialkot Factory Direct)`;

    navigator.clipboard.writeText(specText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Attach full palette to RFQ context and redirect
  const handleAttachToRFQ = () => {
    attachColorsToRFQ(currentSlots.map(s => ({
      role: s.role,
      name: s.name,
      code: s.code,
      hex: s.hex,
      cmyk: s.cmyk,
      kiianInk: s.kiianInk
    })));

    setAttached(true);
    setTimeout(() => {
      navigate('/contact?source=palette-generator');
    }, 800);
  };

  // Color values for SVG preview
  const primaryColor = currentSlots[0]?.hex || '#FF751F';
  const secondaryColor = currentSlots[1]?.hex || '#0B132B';
  const accentColor = currentSlots[2]?.hex || '#00E5FF';
  const neutralColor = currentSlots[3]?.hex || '#FFFFFF';

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1B2A4A] pt-8 sm:pt-12 pb-16 selection:bg-[#FF751F] selection:text-white">
      {/* Top Header / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF751F] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Pre-Press & Color Lab</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500">Sublimation Kit Designer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1B2A4A]">
              Athletic Palette Generator & Kit Preview
            </h1>
            <p className="mt-1 text-sm sm:text-base text-stone-600 max-w-2xl">
              Construct high-contrast, broadcast-compliant uniform colorways. Test live on our vector kit model and submit exact Pantone (PMS) textile codes directly to our Sialkot factory for sampling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/tools/pantone-matcher"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-400 transition shadow-sm"
            >
              <Palette className="w-4 h-4 text-[#FF751F]" />
              Single Pantone Matcher
            </Link>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition shadow-sm"
            >
              All Digital Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Palette Slots & Preset Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Action Toolbar */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Preset Harmonized Palettes
                </span>
                <div className="flex flex-wrap gap-2">
                  {athleticPalettePresets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => handleLoadPreset(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                        activePresetId === preset.id
                          ? 'bg-[#1B2A4A] text-white shadow'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <span className="flex -space-x-1">
                        {preset.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full border border-white"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </span>
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRandomize}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition shadow-xs"
                  title="Randomize unlocked color slots"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-700 animate-spin-reverse" />
                  Roll Random
                </button>
              </div>
            </div>

            {/* 4 Interactive Color Slots */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600">
                  4-Color Technical Architecture
                </h3>
                <span className="text-xs text-stone-400">
                  Click lock icon to preserve slots while rolling
                </span>
              </div>

              {currentSlots.map((slot, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Swatch & Role */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative">
                      <div 
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl shadow-inner border border-stone-200 flex items-center justify-center text-xs font-bold transition-transform hover:scale-105"
                        style={{ backgroundColor: slot.hex, color: slot.contrast || '#FFFFFF' }}
                      >
                        <input
                          type="color"
                          value={slot.hex}
                          onChange={(e) => updateSlotColor(index, e.target.value)}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                          title="Click to choose custom color"
                        />
                        <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-black/40 text-white backdrop-blur-xs">
                          {slot.hex}
                        </span>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                          {slot.role}
                        </span>
                        {slot.locked && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            Locked
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-[#1B2A4A] truncate mt-0.5">
                        {slot.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 font-mono mt-1">
                        <span className="font-bold text-[#FF751F] bg-[#FF751F]/10 px-1.5 py-0.5 rounded">
                          {slot.code}
                        </span>
                        <span>CMYK: {slot.cmyk}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Ink & Lock */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                    <button
                      onClick={() => toggleLock(index)}
                      className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold ${
                        slot.locked 
                          ? 'bg-amber-100 border-amber-300 text-amber-800' 
                          : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200'
                      }`}
                      title={slot.locked ? 'Unlock this slot' : 'Lock this slot from randomizing'}
                    >
                      {slot.locked ? (
                        <>
                          <Lock className="w-4 h-4 text-amber-700" />
                          <span className="hidden sm:inline">Locked</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 text-stone-500" />
                          <span className="hidden sm:inline">Lock</span>
                        </>
                      )}
                    </button>
                    <span className="text-[10px] text-stone-400 font-mono hidden sm:block">
                      {slot.kiianInk?.split('+')[0]?.trim()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Full Tech Pack Spec Table */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B2A4A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Sialkot Factory Sublimation Formulation Table
                </h3>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ISO 105-C06 Class 4.5+
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider font-semibold">
                      <th className="py-2 pr-3">Uniform Component</th>
                      <th className="py-2 px-3">Pantone PMS</th>
                      <th className="py-2 px-3">Italian Ink Series</th>
                      <th className="py-2 pl-3 text-right">HEX / CMYK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium">
                    {currentSlots.map((s, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/60">
                        <td className="py-2.5 pr-3 font-semibold text-stone-800 flex items-center gap-2">
                          <span 
                            className="w-3 h-3 rounded-full border border-stone-300 shrink-0" 
                            style={{ backgroundColor: s.hex }} 
                          />
                          {s.role}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-[#FF751F]">
                          {s.code}
                        </td>
                        <td className="py-2.5 px-3 text-stone-600">
                          {s.kiianInk}
                        </td>
                        <td className="py-2.5 pl-3 text-right font-mono text-stone-500">
                          {s.hex} <span className="text-stone-300">|</span> {s.cmyk}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Kit Simulation & RFQ Export (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500">
                    <Shirt className="w-3.5 h-3.5 text-[#FF751F]" />
                    <span>Live Simulation</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1B2A4A]">
                    Uniform Vector Render
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setActiveJerseyStyle('modern-athletic')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      activeJerseyStyle === 'modern-athletic'
                        ? 'bg-white text-[#1B2A4A] shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Modern
                  </button>
                  <button
                    onClick={() => setActiveJerseyStyle('classic-stripe')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      activeJerseyStyle === 'classic-stripe'
                        ? 'bg-white text-[#1B2A4A] shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Hooped
                  </button>
                </div>
              </div>

              {/* Vector SVG Jersey Mockup */}
              <div className="relative w-full aspect-square max-w-[340px] mx-auto bg-radial from-stone-100 to-stone-200/60 rounded-2xl p-4 flex items-center justify-center border border-stone-200/80 shadow-inner overflow-hidden">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full drop-shadow-xl filter"
                  style={{ transition: 'all 0.35s ease' }}
                >
                  <defs>
                    <linearGradient id="jerseyShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
                    </linearGradient>

                    <linearGradient id="sleeveShadowL" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                    </linearGradient>

                    <linearGradient id="sleeveShadowR" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Left Sleeve (Secondary Color) */}
                  <path
                    d="M 125 90 L 40 165 L 75 220 L 125 170 Z"
                    fill={secondaryColor}
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 125 90 L 40 165 L 75 220 L 125 170 Z"
                    fill="url(#sleeveShadowL)"
                  />
                  {/* Left Cuff (Accent Color) */}
                  <path
                    d="M 40 165 L 52 184 L 88 238 L 75 220 Z"
                    fill={accentColor}
                  />

                  {/* Right Sleeve (Secondary Color) */}
                  <path
                    d="M 275 90 L 360 165 L 325 220 L 275 170 Z"
                    fill={secondaryColor}
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 275 90 L 360 165 L 325 220 L 275 170 Z"
                    fill="url(#sleeveShadowR)"
                  />
                  {/* Right Cuff (Accent Color) */}
                  <path
                    d="M 360 165 L 348 184 L 312 238 L 325 220 Z"
                    fill={accentColor}
                  />

                  {/* Main Torso / Body (Primary Color) */}
                  <path
                    d="M 125 90 L 275 90 L 285 340 L 115 340 Z"
                    fill={primaryColor}
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />

                  {/* Optional Hooped Style Stripes */}
                  {activeJerseyStyle === 'classic-stripe' && (
                    <g fill={secondaryColor} opacity="0.9">
                      <rect x="123" y="140" width="154" height="24" />
                      <rect x="120" y="195" width="160" height="24" />
                      <rect x="117" y="250" width="166" height="24" />
                      <rect x="115" y="305" width="170" height="20" />
                    </g>
                  )}

                  {/* Side Contoured Panels (Secondary Color) */}
                  <path
                    d="M 125 160 Q 145 250 116 340 L 115 340 L 125 160 Z"
                    fill={secondaryColor}
                  />
                  <path
                    d="M 275 160 Q 255 250 284 340 L 285 340 L 275 160 Z"
                    fill={secondaryColor}
                  />

                  {/* Torso Fabric Realism Shading */}
                  <path
                    d="M 125 90 L 275 90 L 285 340 L 115 340 Z"
                    fill="url(#jerseyShadow)"
                  />

                  {/* Collar Base (Accent Color) */}
                  <path
                    d="M 160 90 C 160 125, 240 125, 240 90 Z"
                    fill={accentColor}
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />
                  {/* Inner Neck Insert (Neutral) */}
                  <path
                    d="M 175 90 C 175 110, 225 110, 225 90 Z"
                    fill={neutralColor}
                  />

                  {/* Athletic Crest / Chest Badge (Hare H Emblem) */}
                  <circle cx="160" cy="150" r="14" fill={neutralColor} stroke={accentColor} strokeWidth="2" />
                  <text
                    x="160"
                    y="155"
                    fontSize="13"
                    fontWeight="900"
                    fill={primaryColor}
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    H
                  </text>

                  {/* Chest Sponsor / Manufacturer Watermark */}
                  <text
                    x="200"
                    y="225"
                    fontSize="12"
                    fontWeight="800"
                    letterSpacing="3"
                    fill={neutralColor}
                    textAnchor="middle"
                    opacity="0.85"
                  >
                    HARE
                  </text>

                  {/* Big Athletic Player Number on Chest/Torso */}
                  <text
                    x="200"
                    y="285"
                    fontSize="54"
                    fontWeight="900"
                    fontFamily="monospace"
                    fill={neutralColor}
                    stroke={secondaryColor}
                    strokeWidth="2.5"
                    textAnchor="middle"
                  >
                    {jerseyNumber}
                  </text>

                  {/* Hem Accent Line (Accent Color) */}
                  <path
                    d="M 115 334 L 285 334 L 285 340 L 115 340 Z"
                    fill={accentColor}
                  />
                </svg>

                {/* Number input overlay */}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg border border-stone-200 text-[10px] font-bold text-stone-600 flex items-center gap-1 shadow-xs">
                  <span>Kit #</span>
                  <input
                    type="text"
                    maxLength={2}
                    value={jerseyNumber}
                    onChange={(e) => setJerseyNumber(e.target.value.toUpperCase())}
                    className="w-6 text-center font-mono font-extrabold bg-stone-100 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#FF751F]"
                  />
                </div>
              </div>

              {/* Color Role Indicators Under Mockup */}
              <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                {currentSlots.map((s, idx) => (
                  <div key={idx} className="bg-stone-50 rounded-xl p-2 border border-stone-100">
                    <div 
                      className="w-full h-3 rounded-md mb-1.5 shadow-xs" 
                      style={{ backgroundColor: s.hex }} 
                    />
                    <span className="text-[10px] font-bold text-stone-700 block truncate">
                      {s.role.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-mono text-stone-400 block truncate">
                      {s.code.split(' ')[1]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleAttachToRFQ}
                  disabled={attached}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FF751F] text-white text-sm font-bold hover:bg-[#e06316] transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {attached ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span>Attached! Redirecting to RFQ...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      <span>Attach Full Palette to RFQ Form</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopySpecs}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-white text-stone-700 text-xs font-bold hover:bg-stone-50 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Specs Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-500" />
                      <span>Copy Tech Pack Color Codes</span>
                    </>
                  )}
                </button>
              </div>

              {/* Manufacturing Promise Notice */}
              <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-amber-900 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#FF751F] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Digital Lab Strike-Offs:</strong> All 4 Pantone codes are checked on Spectrophotometer Datacolor 800 before bulk roll sublimation to ensure 100% compliance with your team's visual identity.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
