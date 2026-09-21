import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, TrendingDown, Clock, Plane, Ship, ShieldCheck, 
  Send, Sparkles, CheckCircle2, ChevronRight, Info, Layers, Package, HelpCircle
} from 'lucide-react';
import { useRFQ } from '../context/RFQContext';

const CATEGORY_PRICING = {
  teamwear: {
    id: 'teamwear',
    name: 'Teamwear & Custom Kits',
    subtitle: 'Soccer, Rugby, Basketball, Track Uniforms',
    base25: 14.50,
    base50: 12.20,
    base200: 9.80,
    base500: 8.20,
    base1000: 6.90,
    leadDaysBase: 12,
    weightKgPer100: 22
  },
  activewear: {
    id: 'activewear',
    name: 'Activewear & Gym Essentials',
    subtitle: 'Seamless Leggings, Hoodies, Compression Sets',
    base25: 12.80,
    base50: 10.50,
    base200: 8.40,
    base500: 7.10,
    base1000: 5.80,
    leadDaysBase: 14,
    weightKgPer100: 28
  },
  equipment: {
    id: 'equipment',
    name: 'Sports Equipment & Goods',
    subtitle: 'Match Balls, Padel/Badminton, Gym Gear',
    base25: 16.00,
    base50: 13.50,
    base200: 11.20,
    base500: 9.40,
    base1000: 7.80,
    leadDaysBase: 15,
    weightKgPer100: 45
  },
  combat: {
    id: 'combat',
    name: 'Wrestling & Combat Gear',
    subtitle: 'Singlets, Championship Belts, Dummies, Boots',
    base25: 18.50,
    base50: 15.20,
    base200: 12.80,
    base500: 10.90,
    base1000: 8.90,
    leadDaysBase: 16,
    weightKgPer100: 38
  }
};

const FABRIC_TIERS = [
  { id: 'standard', name: 'Standard Performance Interlock (100% Micro-Poly)', multiplier: 1.0 },
  { id: 'recycled', name: 'Eco-Recycled GRS Certified Poly (Ocean Plastic)', multiplier: 1.10 },
  { id: 'premium', name: 'Pro Technical 4-Way Stretch Spandex / Compression', multiplier: 1.18 }
];

const DESTINATIONS = [
  { id: 'usa', name: 'United States (All 50 States)', airCostPerKg: 6.80, seaCostPerCbm: 180 },
  { id: 'uk', name: 'United Kingdom (London & Nationwide)', airCostPerKg: 6.20, seaCostPerCbm: 165 },
  { id: 'eu', name: 'European Union (Germany, France, NL)', airCostPerKg: 6.50, seaCostPerCbm: 175 },
  { id: 'aus', name: 'Australia & New Zealand', airCostPerKg: 7.40, seaCostPerCbm: 190 },
  { id: 'can', name: 'Canada (Toronto, Vancouver, Montreal)', airCostPerKg: 7.10, seaCostPerCbm: 185 },
  { id: 'other', name: 'Other Worldwide Destination', airCostPerKg: 7.50, seaCostPerCbm: 195 }
];

export default function CostEstimatorPage() {
  const navigate = useNavigate();
  const { attachEstimateToRFQ } = useRFQ();

  const [category, setCategory] = useState('teamwear');
  const [quantity, setQuantity] = useState(100);
  const [fabricTier, setFabricTier] = useState('standard');
  const [destination, setDestination] = useState('usa');
  const [shippingMethod, setShippingMethod] = useState('air'); // 'air' or 'sea'

  // Embellishments
  const [hasSiliconeBadge, setHasSiliconeBadge] = useState(true);
  const [hasIndividualNames, setHasIndividualNames] = useState(true);
  const [hasCustomPackaging, setHasCustomPackaging] = useState(false);
  const [attached, setAttached] = useState(false);

  // Calculation Engine
  const estimate = useMemo(() => {
    const catData = CATEGORY_PRICING[category];
    
    // Base unit pricing interpolated across MOQ tiers
    let baseUnit = catData.base25;
    if (quantity >= 1000) {
      baseUnit = catData.base1000;
    } else if (quantity >= 500) {
      baseUnit = catData.base500;
    } else if (quantity >= 200) {
      baseUnit = catData.base200;
    } else if (quantity >= 50) {
      baseUnit = catData.base50;
    }

    // Fabric adjustment
    const fabricObj = FABRIC_TIERS.find(f => f.id === fabricTier);
    baseUnit *= fabricObj.multiplier;

    // Embellishments
    let embellishmentTotal = 0;
    if (hasSiliconeBadge) embellishmentTotal += 0.85;
    if (hasIndividualNames) embellishmentTotal += 0.60;
    if (hasCustomPackaging) embellishmentTotal += 0.45;

    const unitFactoryPrice = baseUnit + embellishmentTotal;

    // Shipping calculation
    const destObj = DESTINATIONS.find(d => d.id === destination);
    const estWeightKg = (catData.weightKgPer100 * (quantity / 100));
    
    let shippingPerUnit = 0;
    let shippingDays = 0;

    if (shippingMethod === 'air') {
      const airTotal = estWeightKg * destObj.airCostPerKg;
      shippingPerUnit = Math.max(1.80, airTotal / quantity);
      shippingDays = 6;
    } else {
      // Ocean freight
      const seaTotal = Math.max(250, (estWeightKg / 250) * destObj.seaCostPerCbm);
      shippingPerUnit = Math.max(0.70, seaTotal / quantity);
      shippingDays = 24;
    }

    const unitLandedPrice = unitFactoryPrice + shippingPerUnit;
    const grandTotal = unitLandedPrice * quantity;

    // Production lead time
    let prodLeadDays = catData.leadDaysBase;
    if (quantity > 1000) prodLeadDays += 10;
    else if (quantity > 500) prodLeadDays += 6;
    else if (quantity > 200) prodLeadDays += 3;

    // Projected calendar delivery date
    const totalDays = 7 + prodLeadDays + shippingDays; // 7 days sample/pre-production
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + totalDays);

    // Savings vs MOQ 25
    const savingsPercent = Math.round(((catData.base25 - baseUnit) / catData.base25) * 100);

    return {
      categoryName: catData.name,
      quantity,
      unitFactoryMin: (unitFactoryPrice * 0.95).toFixed(2),
      unitFactoryMax: (unitFactoryPrice * 1.05).toFixed(2),
      unitLandedEst: unitLandedPrice.toFixed(2),
      grandTotalEst: Math.round(grandTotal),
      sampleLeadDays: 7,
      bulkLeadDays: prodLeadDays,
      transitDays: shippingDays,
      estimatedDeliveryDate: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      savingsPercent: savingsPercent > 0 ? savingsPercent : 0,
      embellishments: [
        hasSiliconeBadge && '3D High-Density Silicone Badge',
        hasIndividualNames && 'Individual Player Names & Numbers',
        hasCustomPackaging && 'Custom Barcoded Polybag & Woven Neck Tag'
      ].filter(Boolean),
      shippingMethodLabel: shippingMethod === 'air' ? 'DDP Express Air Cargo (DHL/FedEx)' : 'DDP Consolidated Ocean Freight'
    };
  }, [category, quantity, fabricTier, destination, shippingMethod, hasSiliconeBadge, hasIndividualNames, hasCustomPackaging]);

  // Attach estimate to RFQ and navigate to /contact
  const handleExportToRFQ = () => {
    attachEstimateToRFQ({
      category: estimate.categoryName,
      quantity: estimate.quantity,
      unitPriceRange: `$${estimate.unitFactoryMin} - $${estimate.unitFactoryMax}/pc`,
      landedUnitEst: `$${estimate.unitLandedEst}/pc`,
      totalEst: `$${estimate.grandTotalEst.toLocaleString()}`,
      leadTimeDays: `${estimate.sampleLeadDays + estimate.bulkLeadDays} days + ${estimate.transitDays} days transit`,
      embellishments: estimate.embellishments,
      shipping: estimate.shippingMethodLabel
    });

    setAttached(true);
    setTimeout(() => {
      navigate('/contact?source=cost-estimator');
    }, 800);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1B2A4A] pt-24 pb-20 selection:bg-[#FF751F] selection:text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF751F] mb-1">
              <Calculator className="w-3.5 h-3.5" />
              <span>Sialkot Factory Direct Pricing</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500">B2B Manufacturing Intelligence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1B2A4A]">
              Instant Production Cost & Lead Time Estimator
            </h1>
            <p className="mt-1 text-sm sm:text-base text-stone-600 max-w-2xl">
              Model real-time tiered factory pricing, sample turnarounds, and door-to-door DDP shipping quotes for your custom sports apparel and equipment orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/tools/pantone-matcher"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition shadow-sm"
            >
              Pantone Matcher
            </Link>
            <Link
              to="/tools/palette-generator"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition shadow-sm"
            >
              Palette Generator
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Cost Model Parameters (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* 1. Category Selection */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                1. Select Manufacturing Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(CATEGORY_PRICING).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition ${
                      category === cat.id
                        ? 'border-[#FF751F] bg-[#FF751F]/5 ring-1 ring-[#FF751F]'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#1B2A4A]">{cat.name}</span>
                      {category === cat.id && (
                        <CheckCircle2 className="w-4 h-4 text-[#FF751F]" />
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-1">{cat.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Order Quantity Slider */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                    2. Production Run Volume (Units)
                  </label>
                  <span className="text-xs text-stone-400">
                    Direct Sialkot Factory Minimum: 25 pcs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono text-[#FF751F]">
                    {quantity.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-stone-500">PCS</span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="25"
                max="2500"
                step="25"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#FF751F]"
              />

              {/* Volume Quick Presets */}
              <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                {[25, 100, 500, 1000].map(val => (
                  <button
                    key={val}
                    onClick={() => setQuantity(val)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition ${
                      quantity === val
                        ? 'bg-[#1B2A4A] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {val} pcs
                  </button>
                ))}
              </div>

              {estimate.savingsPercent > 0 && (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span>Volume Tier Unlocked: Save ~{estimate.savingsPercent}% per unit vs trial sample batch!</span>
                </div>
              )}
            </div>

            {/* 3. Technical Fabric Specification */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                3. Technical Fabric & Yarn Quality
              </label>
              <div className="space-y-2">
                {FABRIC_TIERS.map(tier => (
                  <label
                    key={tier.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      fabricTier === tier.id
                        ? 'border-[#1B2A4A] bg-stone-50 ring-1 ring-[#1B2A4A]'
                        : 'border-stone-200 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="fabric"
                        value={tier.id}
                        checked={fabricTier === tier.id}
                        onChange={() => setFabricTier(tier.id)}
                        className="text-[#FF751F] focus:ring-[#FF751F]"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-stone-800">
                        {tier.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-500">
                      {tier.multiplier === 1 ? 'Standard' : `+${Math.round((tier.multiplier - 1) * 100)}%`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Embellishments & Custom Branding */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                4. Custom Branding & Embellishment Add-ons
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasSiliconeBadge}
                      onChange={(e) => setHasSiliconeBadge(e.target.checked)}
                      className="rounded text-[#FF751F] focus:ring-[#FF751F]"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-stone-800 block">
                        3D Molded High-Density Silicone Crest
                      </span>
                      <span className="text-[11px] text-stone-500">Professional TPU / silicone heat transfer logo</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-500">+$0.85/pc</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasIndividualNames}
                      onChange={(e) => setHasIndividualNames(e.target.checked)}
                      className="rounded text-[#FF751F] focus:ring-[#FF751F]"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-stone-800 block">
                        Variable Player Names & Numbers
                      </span>
                      <span className="text-[11px] text-stone-500">Roster roster customization across all sizes</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-500">+$0.60/pc</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasCustomPackaging}
                      onChange={(e) => setHasCustomPackaging(e.target.checked)}
                      className="rounded text-[#FF751F] focus:ring-[#FF751F]"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-stone-800 block">
                        Custom Woven Neck Labels & Barcoded Polybags
                      </span>
                      <span className="text-[11px] text-stone-500">Retail-ready individual SKU packaging</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-500">+$0.45/pc</span>
                </label>
              </div>
            </div>

            {/* 5. Destination & Logistics Method */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                5. Global Shipping & Delivery Destination
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Destination Country</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#FF751F]"
                  >
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Logistics Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('air')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        shippingMethod === 'air'
                          ? 'border-[#1B2A4A] bg-[#1B2A4A] text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <Plane className="w-3.5 h-3.5" />
                      Express Air
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingMethod('sea')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        shippingMethod === 'sea'
                          ? 'border-[#1B2A4A] bg-[#1B2A4A] text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <Ship className="w-3.5 h-3.5" />
                      Ocean Cargo
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Calculated Estimate Card & RFQ Export (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md">
              <div className="border-b border-stone-100 pb-4 mb-5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF751F]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-Time Model Output</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B2A4A] mt-0.5">
                  Production & Landed Quote
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  {estimate.categoryName} ({estimate.quantity} Units)
                </span>
              </div>

              {/* Price Callout */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Estimated Factory Unit Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#1B2A4A]">
                    ${estimate.unitFactoryMin} – ${estimate.unitFactoryMax}
                  </span>
                  <span className="text-xs font-bold text-stone-500">/ pc</span>
                </div>
                <div className="mt-2 text-xs text-stone-500 flex items-center justify-between border-t border-stone-200 pt-2 font-medium">
                  <span>Estimated Landed DDP (Incl. Freight):</span>
                  <span className="font-mono font-bold text-stone-800">~${estimate.unitLandedEst} / pc</span>
                </div>
                <div className="mt-1 text-xs text-stone-500 flex items-center justify-between font-medium">
                  <span>Grand Landed Order Total:</span>
                  <span className="font-mono font-black text-[#FF751F] text-sm">~${estimate.grandTotalEst.toLocaleString()}</span>
                </div>
              </div>

              {/* Turnaround & Milestone Schedule */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF751F]" />
                  Production Timeline & Delivery Target
                </h4>

                <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/70 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Sample Strike-Off / Proof:</span>
                    <span className="font-bold text-stone-800">{estimate.sampleLeadDays} Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Bulk Factory Sewing & Pressing:</span>
                    <span className="font-bold text-stone-800">{estimate.bulkLeadDays} Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Transit Mode:</span>
                    <span className="font-bold text-stone-800">{estimate.transitDays} Days ({shippingMethod === 'air' ? 'Air' : 'Sea'})</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-stone-200 pt-2 font-bold text-[#1B2A4A]">
                    <span>Target Delivery Date:</span>
                    <span className="text-[#FF751F] font-mono">{estimate.estimatedDeliveryDate}</span>
                  </div>
                </div>
              </div>

              {/* Export to RFQ Action Button */}
              <div className="space-y-3">
                <button
                  onClick={handleExportToRFQ}
                  disabled={attached}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FF751F] text-white text-sm font-bold hover:bg-[#e06316] transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {attached ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span>Estimate Exported! Opening RFQ...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      <span>Export Estimate to Official RFQ Form</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-stone-400">
                  Transfers your exact specs, volume tier, and embellishments directly into our quotation form.
                </p>
              </div>

              {/* Guarantees Badge */}
              <div className="mt-5 pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-stone-600">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No Hidden Surcharges</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Package className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Pre-Production Sample</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
