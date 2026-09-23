import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, TrendingDown, Clock, Plane, Ship, ShieldCheck, 
  Send, Sparkles, CheckCircle2, ChevronRight, Info, Layers, Package, 
  HelpCircle, Zap, Scissors, Shirt, ArrowRight, Check, RotateCcw,
  Sliders, Award, RefreshCw, MessageSquare
} from 'lucide-react';
import { useRFQ } from '../context/RFQContext';

// -------------------------------------------------------------
// PRODUCT / KIT ARCHITECTURE OPTIONS
// -------------------------------------------------------------
const KIT_CONFIGURATIONS = [
  {
    id: 'full-kit',
    name: 'Full Kit (Jersey + Matching Shorts)',
    shortName: 'Full Uniform Kit',
    subtitle: 'Soccer, Rugby, Basketball, Track & Field Teamwear',
    icon: '🎽',
    hasTop: true,
    hasBottom: true,
    basePriceTiers: {
      25: 18.90,
      50: 16.20,
      100: 13.80,
      250: 11.90,
      500: 10.40,
      1000: 8.90
    },
    weightKgPer100: 42,
    baseProdDays: 14
  },
  {
    id: 'jersey-only',
    name: 'Jersey / Top Only',
    shortName: 'Match Jersey / Top',
    subtitle: 'Sublimated Game Jerseys, Warm-up Tops & Training Shirts',
    icon: '👕',
    hasTop: true,
    hasBottom: false,
    basePriceTiers: {
      25: 11.80,
      50: 9.90,
      100: 8.40,
      250: 7.20,
      500: 6.30,
      1000: 5.30
    },
    weightKgPer100: 22,
    baseProdDays: 12
  },
  {
    id: 'shorts-only',
    name: 'Shorts / Bottom Only',
    shortName: 'Athletic Shorts',
    subtitle: 'Match Shorts, Gym Training Shorts & Running Bottoms',
    icon: '🩳',
    hasTop: false,
    hasBottom: true,
    basePriceTiers: {
      25: 9.80,
      50: 8.20,
      100: 6.90,
      250: 5.95,
      500: 5.20,
      1000: 4.40
    },
    weightKgPer100: 20,
    baseProdDays: 12
  },
  {
    id: 'compression',
    name: 'Pro Compression Rashguard',
    shortName: 'Compression Top',
    subtitle: 'Second-Skin BJJ/MMA, Conditioning & Baselayer Tops',
    icon: '⚡',
    hasTop: true,
    hasBottom: false,
    basePriceTiers: {
      25: 16.50,
      50: 14.10,
      100: 11.90,
      250: 10.20,
      500: 8.90,
      1000: 7.60
    },
    weightKgPer100: 26,
    baseProdDays: 14
  },
  {
    id: 'combat',
    name: 'Combat Gear & Fight Shorts',
    shortName: 'Combat Gear',
    subtitle: 'Wrestling Singlets, Muay Thai & MMA Split Shorts',
    icon: '🥊',
    hasTop: false,
    hasBottom: true,
    basePriceTiers: {
      25: 17.20,
      50: 14.80,
      100: 12.50,
      250: 10.70,
      500: 9.30,
      1000: 7.90
    },
    weightKgPer100: 30,
    baseProdDays: 15
  }
];

// -------------------------------------------------------------
// TOP / JERSEY PARAMETERS
// -------------------------------------------------------------
const TOP_FABRICS = [
  {
    id: 'poly-140',
    name: '140 GSM Aerolite Micro-Eyelet Poly',
    desc: 'Featherweight, high-ventilation pinhole mesh for marathon and hot climates',
    upcharge: 0.00
  },
  {
    id: 'poly-160',
    name: '160 GSM Pro Match Interlock (Standard)',
    desc: 'Club standard high-tensile polyester with smooth dye-sublimation finish',
    upcharge: 0.40
  },
  {
    id: 'poly-180',
    name: '180 GSM Heavy Contact Interlock',
    desc: 'Reinforced tear-resistant knit for rugby, lacrosse & high-friction sports',
    upcharge: 0.90
  },
  {
    id: 'lycra-220',
    name: '220 GSM 4-Way Stretch Poly-Spandex',
    desc: '85/15 elastane compression blend with second-skin anatomical stretch',
    upcharge: 1.45
  },
  {
    id: 'recycled-160',
    name: '160 GSM Eco-Recycled GRS Certified Poly',
    desc: 'Sustainable fabric engineered from certified recycled ocean-bound plastic bottles',
    upcharge: 0.85
  }
];

const TOP_PRINTING_METHODS = [
  {
    id: 'sublimation',
    name: 'All-Over Digital Dye Sublimation',
    desc: 'Italian Kiian inks infused into fiber; zero hand-feel, permanent fade-proof colors',
    upcharge: 0.00
  },
  {
    id: 'tackle-twill',
    name: 'Pro Tackle Twill Multi-Layer Stitching',
    desc: 'Heavyweight twill patches with high-density zig-zag embroidery (MLB/NBA pro style)',
    upcharge: 2.40
  },
  {
    id: 'silicone-screen',
    name: '3D High-Density Silicone Screen Print',
    desc: 'Raised 1mm tactile rubberized graphics with high elastic recovery',
    upcharge: 1.20
  },
  {
    id: 'hybrid',
    name: 'Hybrid: Sublimation Base + Tackle Twill Crest',
    desc: 'Sublimated dynamic background pattern accented by an embroidered twill crest',
    upcharge: 1.80
  }
];

const TOP_COLLARS = [
  { id: 'v-neck', name: '1x1 Rib-Knit V-Neck with Mitred Corner' },
  { id: 'crew-neck', name: 'Athletic Compression Crew with Neck Taping' },
  { id: 'mandarin', name: 'Mandarin Stand Collar with Snap Placket' },
  { id: 'overlap', name: 'Pro Overlap Cross-Collar' }
];

const TOP_SLEEVES = [
  { id: 'short', name: 'Short Sleeve (Set-In)', upcharge: 0.00 },
  { id: 'raglan', name: 'Ergonomic Raglan Sleeve', upcharge: 0.30 },
  { id: 'sleeveless', name: 'Sleeveless / Singlet Tank Cut', upcharge: -0.25 },
  { id: 'long', name: 'Full Long Sleeve with Cuffs', upcharge: 1.10 }
];

// -------------------------------------------------------------
// BOTTOM / SHORTS PARAMETERS
// -------------------------------------------------------------
const BOTTOM_FABRICS = [
  {
    id: 'shorts-140',
    name: '140 GSM Micro-Poly Interlock (Standard)',
    desc: 'Ultra-lightweight moisture-wicking woven blend with quick-dry DWR finish',
    upcharge: 0.00
  },
  {
    id: 'shorts-160',
    name: '160 GSM Vented Micro-Mesh',
    desc: 'Breathable diamond pinhole mesh engineered for basketball & active running',
    upcharge: 0.35
  },
  {
    id: 'shorts-190',
    name: '190 GSM Stretch Ripstop & Micro-Satin',
    desc: 'Heavy-duty tear-resistant combat fabric for MMA grappling & Muay Thai kicks',
    upcharge: 0.95
  },
  {
    id: 'shorts-220',
    name: '220 GSM Spandex Compression Liner',
    desc: '2-in-1 hybrid with built-in compression underlayer to prevent inner-thigh chafing',
    upcharge: 1.50
  }
];

const BOTTOM_WAISTBANDS = [
  { id: 'covered-drawcord', name: 'Covered Elastic with Internal Heavy-Duty Drawcord', upcharge: 0.00 },
  { id: 'silicone-grip', name: 'Shirred Waistband with Inner Non-Slip Silicone Rubber Bead', upcharge: 0.40 },
  { id: 'jacquard-elastic', name: 'Custom Jacquard Woven Elastic with Brand Name / Logo', upcharge: 0.85 }
];

const BOTTOM_CUT_FEATURES = [
  { id: 'standard-cut', name: 'Standard Athletic Match Hem', upcharge: 0.00 },
  { id: 'high-side-splits', name: 'High-Mobility Curved Side Splits (Fight & Sprint Cut)', upcharge: 0.30 },
  { id: 'lycra-crotch', name: 'Inseam Lycra 4-Way Stretch Flex Gusset', upcharge: 0.55 },
  { id: 'zipper-pockets', name: 'Dual Concealed Zipper Side Pockets (YKK Zips)', upcharge: 0.80 }
];

// -------------------------------------------------------------
// SIZES DEFINITIONS
// -------------------------------------------------------------
const SIZES_MEN = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
const SIZES_WOMEN = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const SIZES_YOUTH = ['YXS', 'YS', 'YM', 'YL', 'YXL'];

// -------------------------------------------------------------
// GLOBAL SHIPPING & DESTINATIONS
// -------------------------------------------------------------
const DESTINATIONS = [
  { id: 'usa', name: 'United States (All 50 States)', airCostPerKg: 6.80, seaCostPerCbm: 180 },
  { id: 'uk', name: 'United Kingdom (London & Nationwide)', airCostPerKg: 6.20, seaCostPerCbm: 165 },
  { id: 'eu', name: 'European Union (Germany, France, NL, Spain)', airCostPerKg: 6.50, seaCostPerCbm: 175 },
  { id: 'aus', name: 'Australia & New Zealand', airCostPerKg: 7.40, seaCostPerCbm: 190 },
  { id: 'can', name: 'Canada (Ontario, BC, Quebec)', airCostPerKg: 7.10, seaCostPerCbm: 185 },
  { id: 'uae', name: 'UAE & Middle East (Dubai, Riyadh, Doha)', airCostPerKg: 5.80, seaCostPerCbm: 155 },
  { id: 'other', name: 'Other Worldwide Destination', airCostPerKg: 7.80, seaCostPerCbm: 195 }
];

export default function CostEstimatorPage() {
  const navigate = useNavigate();
  const { attachEstimateToRFQ } = useRFQ();

  // 1. Kit Configuration
  const [kitMode, setKitMode] = useState('full-kit');
  const activeKit = useMemo(() => 
    KIT_CONFIGURATIONS.find(k => k.id === kitMode) || KIT_CONFIGURATIONS[0]
  , [kitMode]);

  // 2. Production Run Volume
  const [quantity, setQuantity] = useState(100);

  // 3. Tops / Jerseys Specs
  const [topFabric, setTopFabric] = useState('poly-160');
  const [topPrinting, setTopPrinting] = useState('sublimation');
  const [topCollar, setTopCollar] = useState('v-neck');
  const [topSleeve, setTopSleeve] = useState('short');

  // 4. Shorts / Bottoms Specs
  const [bottomFabric, setBottomFabric] = useState('shorts-140');
  const [bottomWaistband, setBottomWaistband] = useState('covered-drawcord');
  const [bottomCut, setBottomCut] = useState('standard-cut');

  // 5. Factory Embellishment Add-ons
  const [hasSiliconeBadge, setHasSiliconeBadge] = useState(true);
  const [hasEmbroidery, setHasEmbroidery] = useState(false);
  const [hasPlayerRoster, setHasPlayerRoster] = useState(true);
  const [hasCustomPackaging, setHasCustomPackaging] = useState(false);
  const [hasAntiBacterial, setHasAntiBacterial] = useState(false);

  // 6. Size Curve Allocations
  const [sizeCategory, setSizeCategory] = useState('men'); // 'men' | 'women' | 'youth'
  const [sizesMen, setSizesMen] = useState({
    XS: 5, S: 15, M: 35, L: 30, XL: 10, '2XL': 5, '3XL': 0, '4XL': 0
  });
  const [sizesWomen, setSizesWomen] = useState({
    XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0
  });
  const [sizesYouth, setSizesYouth] = useState({
    YXS: 0, YS: 0, YM: 0, YL: 0, YXL: 0
  });

  // 7. Production Speed & Logistics
  const [productionSpeed, setProductionSpeed] = useState('standard'); // 'standard' | 'rush'
  const [destination, setDestination] = useState('usa');
  const [shippingMethod, setShippingMethod] = useState('air'); // 'air' | 'sea'

  // UI State
  const [showItemizedBOM, setShowItemizedBOM] = useState(false);
  const [attachedToast, setAttachedToast] = useState(false);

  // Helper to calculate total allocated sizes
  const totalAllocatedSizes = useMemo(() => {
    const menSum = Object.values(sizesMen).reduce((a, b) => a + (Number(b) || 0), 0);
    const womenSum = Object.values(sizesWomen).reduce((a, b) => a + (Number(b) || 0), 0);
    const youthSum = Object.values(sizesYouth).reduce((a, b) => a + (Number(b) || 0), 0);
    return menSum + womenSum + youthSum;
  }, [sizesMen, sizesWomen, sizesYouth]);

  // Synchronize size curves when quantity changes if requested
  const applySizePreset = (presetName) => {
    const q = quantity;
    if (presetName === 'team-adult') {
      // Standard Adult Team: 10% S, 40% M, 35% L, 15% XL
      const s = Math.round(q * 0.10);
      const m = Math.round(q * 0.40);
      const l = Math.round(q * 0.35);
      const xl = q - (s + m + l);
      setSizesMen({ XS: 0, S: s, M: m, L: l, XL: xl, '2XL': 0, '3XL': 0, '4XL': 0 });
      setSizesWomen({ XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0 });
      setSizesYouth({ YXS: 0, YS: 0, YM: 0, YL: 0, YXL: 0 });
      setSizeCategory('men');
    } else if (presetName === 'broad-curve') {
      // Broad curve
      const xs = Math.round(q * 0.05);
      const s = Math.round(q * 0.15);
      const m = Math.round(q * 0.30);
      const l = Math.round(q * 0.30);
      const xl = Math.round(q * 0.15);
      const xxl = q - (xs + s + m + l + xl);
      setSizesMen({ XS: xs, S: s, M: m, L: l, XL: xl, '2XL': xxl, '3XL': 0, '4XL': 0 });
      setSizesWomen({ XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0 });
      setSizesYouth({ YXS: 0, YS: 0, YM: 0, YL: 0, YXL: 0 });
      setSizeCategory('men');
    } else if (presetName === 'youth-academy') {
      const yxs = Math.round(q * 0.10);
      const ys = Math.round(q * 0.25);
      const ym = Math.round(q * 0.35);
      const yl = Math.round(q * 0.20);
      const yxl = q - (yxs + ys + ym + yl);
      setSizesYouth({ YXS: yxs, YS: ys, YM: ym, YL: yl, YXL: yxl });
      setSizesMen({ XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0, '3XL': 0, '4XL': 0 });
      setSizesWomen({ XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0 });
      setSizeCategory('youth');
    } else if (presetName === 'equal-split') {
      const activeKeys = ['S', 'M', 'L', 'XL'];
      const baseShare = Math.floor(q / activeKeys.length);
      const remainder = q % activeKeys.length;
      setSizesMen({
        XS: 0,
        S: baseShare + (remainder > 0 ? 1 : 0),
        M: baseShare + (remainder > 1 ? 1 : 0),
        L: baseShare + (remainder > 2 ? 1 : 0),
        XL: baseShare,
        '2XL': 0,
        '3XL': 0,
        '4XL': 0
      });
      setSizesWomen({ XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0 });
      setSizesYouth({ YXS: 0, YS: 0, YM: 0, YL: 0, YXL: 0 });
      setSizeCategory('men');
    }
  };

  // Rebalance active sizes to match current quantity if user drags quantity
  useEffect(() => {
    applySizePreset('team-adult');
  }, [quantity]);

  // -------------------------------------------------------------
  // DYNAMIC MANUFACTURING COST CALCULATION ENGINE
  // -------------------------------------------------------------
  const calculation = useMemo(() => {
    // 1. Tiered Base Price Interpolation
    let baseUnit = activeKit.basePriceTiers[25];
    if (quantity >= 1000) baseUnit = activeKit.basePriceTiers[1000];
    else if (quantity >= 500) baseUnit = activeKit.basePriceTiers[500];
    else if (quantity >= 250) baseUnit = activeKit.basePriceTiers[250];
    else if (quantity >= 100) baseUnit = activeKit.basePriceTiers[100];
    else if (quantity >= 50) baseUnit = activeKit.basePriceTiers[50];

    // 2. Component Technical Upcharges
    let fabricUpcharge = 0;
    let printingUpcharge = 0;
    let trimsUpcharge = 0;

    // Top specifics (if included)
    if (activeKit.hasTop) {
      const tFab = TOP_FABRICS.find(f => f.id === topFabric);
      const tPrint = TOP_PRINTING_METHODS.find(p => p.id === topPrinting);
      const tSleeve = TOP_SLEEVES.find(s => s.id === topSleeve);

      if (tFab) fabricUpcharge += tFab.upcharge;
      if (tPrint) printingUpcharge += tPrint.upcharge;
      if (tSleeve) trimsUpcharge += tSleeve.upcharge;
    }

    // Bottom specifics (if included)
    if (activeKit.hasBottom) {
      const bFab = BOTTOM_FABRICS.find(f => f.id === bottomFabric);
      const bWaist = BOTTOM_WAISTBANDS.find(w => w.id === bottomWaistband);
      const bCut = BOTTOM_CUT_FEATURES.find(c => c.id === bottomCut);

      if (bFab) fabricUpcharge += bFab.upcharge;
      if (bWaist) trimsUpcharge += bWaist.upcharge;
      if (bCut) trimsUpcharge += bCut.upcharge;
    }

    // Embellishment add-ons
    let embellishmentsTotal = 0;
    const activeEmbellishments = [];

    if (hasSiliconeBadge) {
      embellishmentsTotal += 0.85;
      activeEmbellishments.push('3D Molded High-Density Silicone Crest');
    }
    if (hasEmbroidery) {
      embellishmentsTotal += 0.75;
      activeEmbellishments.push('Direct High-Stitch Precision Embroidery');
    }
    if (hasPlayerRoster) {
      embellishmentsTotal += 0.65;
      activeEmbellishments.push('Custom Individual Player Names & Numbers');
    }
    if (hasCustomPackaging) {
      embellishmentsTotal += 0.55;
      activeEmbellishments.push('Barcoded Polybags & Custom Woven Damask Neck Labels');
    }
    if (hasAntiBacterial) {
      embellishmentsTotal += 0.35;
      activeEmbellishments.push('Silver-Ion Anti-Microbial Odor Treatment');
    }

    // 3. Labor Speed Adjustment (Standard vs Express Rush)
    let rushMultiplier = 1.0;
    if (productionSpeed === 'rush') {
      rushMultiplier = 1.12; // +12% factory priority fee for double-shift stitching
    }

    const rawFactoryUnit = (baseUnit + fabricUpcharge + printingUpcharge + trimsUpcharge + embellishmentsTotal) * rushMultiplier;

    // Factory Min / Max range (+/- 4% buffer for international currency fluctuation)
    const unitFactoryMin = Number((rawFactoryUnit * 0.96).toFixed(2));
    const unitFactoryMax = Number((rawFactoryUnit * 1.04).toFixed(2));
    const unitFactoryMid = Number(rawFactoryUnit.toFixed(2));

    // 4. Global Logistics Freight Calculation
    const destObj = DESTINATIONS.find(d => d.id === destination) || DESTINATIONS[0];
    const totalEstWeightKg = (activeKit.weightKgPer100 * (quantity / 100));

    let shippingPerUnit = 0;
    let shippingDays = 0;

    if (shippingMethod === 'air') {
      // Air cargo: DHL/FedEx courier door-to-door DDP
      const airTotal = totalEstWeightKg * destObj.airCostPerKg;
      shippingPerUnit = Math.max(1.90, airTotal / quantity);
      shippingDays = 6;
    } else {
      // Ocean freight: DDP consolidated container
      const seaTotal = Math.max(260, (totalEstWeightKg / 260) * destObj.seaCostPerCbm);
      shippingPerUnit = Math.max(0.85, seaTotal / quantity);
      shippingDays = 25;
    }

    const unitLandedPrice = Number((unitFactoryMid + shippingPerUnit).toFixed(2));
    const grandTotalFactory = Math.round(unitFactoryMid * quantity);
    const grandTotalLanded = Math.round(unitLandedPrice * quantity);

    // 5. Production Timelines
    let prodLeadDays = activeKit.baseProdDays;
    if (quantity > 1000) prodLeadDays += 8;
    else if (quantity > 500) prodLeadDays += 5;
    else if (quantity > 250) prodLeadDays += 3;

    if (productionSpeed === 'rush') {
      prodLeadDays = Math.max(7, Math.round(prodLeadDays * 0.55)); // Cut down significantly
    }

    const sampleLeadDays = productionSpeed === 'rush' ? 4 : 6;
    const totalTurnaroundDays = sampleLeadDays + prodLeadDays + shippingDays;

    const deliveryTargetDate = new Date();
    deliveryTargetDate.setDate(deliveryTargetDate.getDate() + totalTurnaroundDays);

    // 6. Volume Tier Savings vs MOQ 25
    const baseAt25 = activeKit.basePriceTiers[25];
    const savingsPercent = Math.round(((baseAt25 - baseUnit) / baseAt25) * 100);

    // 7. Itemized Bill of Materials (BOM) Estimate
    const itemized = {
      fabricCutting: Number((unitFactoryMid * 0.38).toFixed(2)),
      printingStitching: Number((unitFactoryMid * 0.36).toFixed(2)),
      trimsBadges: Number((unitFactoryMid * 0.16).toFixed(2)),
      packagingQC: Number((unitFactoryMid * 0.10).toFixed(2)),
      freightPerPc: Number(shippingPerUnit.toFixed(2))
    };

    return {
      activeKit,
      quantity,
      unitFactoryMin,
      unitFactoryMax,
      unitFactoryMid,
      unitLandedPrice,
      grandTotalFactory,
      grandTotalLanded,
      sampleLeadDays,
      bulkLeadDays: prodLeadDays,
      shippingDays,
      totalTurnaroundDays,
      deliveryTargetDate: deliveryTargetDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      savingsPercent: savingsPercent > 0 ? savingsPercent : 0,
      activeEmbellishments,
      shippingMethodLabel: shippingMethod === 'air' ? 'DDP Express Air Cargo (DHL / FedEx)' : 'DDP Consolidated Ocean Freight',
      destName: destObj.name,
      itemized,
      totalWeightKg: Math.round(totalEstWeightKg)
    };
  }, [
    activeKit, quantity, topFabric, topPrinting, topCollar, topSleeve,
    bottomFabric, bottomWaistband, bottomCut,
    hasSiliconeBadge, hasEmbroidery, hasPlayerRoster, hasCustomPackaging, hasAntiBacterial,
    productionSpeed, destination, shippingMethod
  ]);

  // Handle Export / Transfer to official RFQ Form
  const handleExportToRFQ = () => {
    // Compile size breakdown string
    const menEntries = Object.entries(sizesMen).filter(([_, count]) => count > 0).map(([sz, c]) => `${sz}:${c}`);
    const womenEntries = Object.entries(sizesWomen).filter(([_, count]) => count > 0).map(([sz, c]) => `${sz}:${c}`);
    const youthEntries = Object.entries(sizesYouth).filter(([_, count]) => count > 0).map(([sz, c]) => `${sz}:${c}`);

    const sizeSummaryParts = [];
    if (menEntries.length) sizeSummaryParts.push(`Men (${menEntries.join(', ')})`);
    if (womenEntries.length) sizeSummaryParts.push(`Women (${womenEntries.join(', ')})`);
    if (youthEntries.length) sizeSummaryParts.push(`Youth (${youthEntries.join(', ')})`);
    const sizeSummary = sizeSummaryParts.join(' | ') || 'Standard Mix';

    // Compile garment specifications
    const garmentSpecs = [];
    if (activeKit.hasTop) {
      const f = TOP_FABRICS.find(item => item.id === topFabric)?.name;
      const p = TOP_PRINTING_METHODS.find(item => item.id === topPrinting)?.name;
      const c = TOP_COLLARS.find(item => item.id === topCollar)?.name;
      const s = TOP_SLEEVES.find(item => item.id === topSleeve)?.name;
      garmentSpecs.push(`Jersey: ${f}; ${p}; Collar: ${c}; Sleeve: ${s}`);
    }
    if (activeKit.hasBottom) {
      const f = BOTTOM_FABRICS.find(item => item.id === bottomFabric)?.name;
      const w = BOTTOM_WAISTBANDS.find(item => item.id === bottomWaistband)?.name;
      const c = BOTTOM_CUT_FEATURES.find(item => item.id === bottomCut)?.name;
      garmentSpecs.push(`Shorts: ${f}; Waistband: ${w}; Cut: ${c}`);
    }

    attachEstimateToRFQ({
      category: activeKit.name,
      quantity: calculation.quantity,
      unitPriceRange: `$${calculation.unitFactoryMin} – $${calculation.unitFactoryMax} / pc`,
      landedUnitEst: `$${calculation.unitLandedPrice} / pc`,
      totalEst: `$${calculation.grandTotalLanded.toLocaleString()}`,
      leadTimeDays: `${calculation.sampleLeadDays + calculation.bulkLeadDays} days factory + ${calculation.shippingDays} days transit (${productionSpeed === 'rush' ? 'EXPRESS RUSH' : 'Standard Line'})`,
      embellishments: calculation.activeEmbellishments,
      shipping: `${calculation.shippingMethodLabel} to ${calculation.destName}`,
      garmentSpecs: garmentSpecs.join('\n'),
      sizeCurve: sizeSummary
    });

    setAttachedToast(true);
    setTimeout(() => {
      navigate('/contact?source=manufacturing-calculator');
    }, 800);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] pt-6 sm:pt-10 pb-20 selection:bg-[#FF751F] selection:text-white">
      {/* Top Breadcrumb & Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-stone-500 pb-3 border-b border-[#E5DFD5]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#FF751F] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link to="/tools" className="hover:text-[#FF751F] transition-colors">Tools</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#FF751F] font-bold">Manufacturing Cost Calculator</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sialkot Plant Direct Pricing
            </span>
            <span className="hidden sm:inline-block text-stone-400">•</span>
            <span className="hidden sm:inline-block text-xs font-mono text-stone-500">
              MOQ: 25 PCS / Design
            </span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF751F] mb-1">
              <Calculator className="w-4 h-4" />
              <span>Sialkot B2B Manufacturing Cost Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
              Manufacturing Cost Calculator
            </h1>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl leading-relaxed">
              Configure matching jerseys and shorts kits, technical fabric GSM weights, tackle twill vs. sublimation, size breakdowns, and real-time door-to-door landed DDP quotes.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              to="/tools/ai-mockup-generator"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E5DFD5] bg-white text-xs font-bold text-stone-700 hover:text-[#FF751F] hover:border-[#FF751F] transition shadow-xs"
            >
              <Shirt className="w-3.5 h-3.5 text-[#FF751F]" />
              <span>AI Mockup Studio</span>
            </Link>
            <Link
              to="/tools/pantone-matcher"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E5DFD5] bg-white text-xs font-bold text-stone-700 hover:text-[#FF751F] hover:border-[#FF751F] transition shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-stone-500" />
              <span>Pantone Matcher</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ========================================================= */}
          {/* LEFT COLUMN: MULTI-PART CONFIGURATION ENGINE (7 Cols)      */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">

            {/* 1. PRODUCT / KIT ARCHITECTURE SELECTION */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F] block">
                    Step 1
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                    Select Product / Kit Structure
                  </h2>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {activeKit.shortName}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {KIT_CONFIGURATIONS.map(kit => (
                  <button
                    key={kit.id}
                    type="button"
                    onClick={() => setKitMode(kit.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      kitMode === kit.id
                        ? 'border-[#FF751F] bg-[#FF751F]/5 ring-2 ring-[#FF751F]/20 shadow-xs'
                        : 'border-[#E5DFD5] hover:border-stone-400 bg-[#FAF8F5]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{kit.icon}</span>
                        <div>
                          <h3 className="font-bold text-xs sm:text-sm text-[#1A1A1A] leading-snug">
                            {kit.name}
                          </h3>
                        </div>
                      </div>
                      {kitMode === kit.id && (
                        <div className="w-5 h-5 rounded-full bg-[#FF751F] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                      {kit.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. ORDER QUANTITY SLIDER & VOLUME TIER MATRIX */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F] block">
                    Step 2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                    Production Run Volume (Total Units)
                  </h2>
                  <span className="text-xs text-stone-500">
                    Sialkot Factory MOQ: 25 pcs per customized kit
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#FF751F]">
                    {quantity.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-stone-500 ml-1">PCS</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="25"
                  max="2000"
                  step="25"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#FF751F]"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>25 pcs (MOQ)</span>
                  <span>100 pcs</span>
                  <span>500 pcs</span>
                  <span>1,000 pcs</span>
                  <span>2,000+ pcs</span>
                </div>
              </div>

              {/* Volume Quick Presets */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1 text-center">
                {[25, 50, 100, 250, 500, 1000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setQuantity(val)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      quantity === val
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200 border border-[#E5DFD5]'
                    }`}
                  >
                    {val} pcs
                  </button>
                ))}
              </div>

              {calculation.savingsPercent > 0 && (
                <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2.5 rounded-2xl border border-emerald-200">
                  <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Volume Efficiency Tier Unlocked: Save ~{calculation.savingsPercent}% per unit compared to a 25 pc trial batch!
                  </span>
                </div>
              )}
            </div>

            {/* 3A. JERSEYS & TOPS SPECIFICATION SECTION */}
            {activeKit.hasTop && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5DFD5]">
                  <div className="p-2 rounded-xl bg-orange-100 text-[#FF751F]">
                    <Shirt className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F] block">
                      Garment Section A
                    </span>
                    <h3 className="text-base font-bold text-[#1A1A1A]">
                      Jerseys & Tops Technical Specifications
                    </h3>
                  </div>
                </div>

                {/* Fabric Weight & Technical GSM */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-stone-700 block uppercase tracking-wider">
                    Top Fabric Weight & Performance GSM
                  </label>
                  <div className="space-y-2">
                    {TOP_FABRICS.map(fab => (
                      <label
                        key={fab.id}
                        className={`flex items-start justify-between p-3 rounded-2xl border cursor-pointer transition ${
                          topFabric === fab.id
                            ? 'border-[#FF751F] bg-[#FF751F]/5 ring-1 ring-[#FF751F]'
                            : 'border-[#E5DFD5] hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="topFabric"
                            checked={topFabric === fab.id}
                            onChange={() => setTopFabric(fab.id)}
                            className="mt-1 text-[#FF751F] focus:ring-[#FF751F]"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] block">
                              {fab.name}
                            </span>
                            <span className="text-[11px] text-stone-500 leading-snug block mt-0.5">
                              {fab.desc}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-stone-600 shrink-0 ml-2">
                          {fab.upcharge === 0 ? 'Standard' : `+$${fab.upcharge.toFixed(2)}/pc`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Printing, Embellishment & Stitching Method */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-stone-700 block uppercase tracking-wider">
                    Printing & Stitching Technology (Sublimation vs. Tackle Twill)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TOP_PRINTING_METHODS.map(method => (
                      <label
                        key={method.id}
                        className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                          topPrinting === method.id
                            ? 'border-[#1A1A1A] bg-stone-50 ring-1 ring-[#1A1A1A]'
                            : 'border-[#E5DFD5] hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="radio"
                            name="topPrinting"
                            checked={topPrinting === method.id}
                            onChange={() => setTopPrinting(method.id)}
                            className="mt-0.5 text-[#FF751F] focus:ring-[#FF751F]"
                          />
                          <div>
                            <span className="text-xs font-bold text-[#1A1A1A] block">
                              {method.name}
                            </span>
                            <span className="text-[10px] text-stone-500 block mt-1 leading-snug">
                              {method.desc}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-right">
                          <span className="text-xs font-mono font-bold text-[#FF751F]">
                            {method.upcharge === 0 ? 'Included in Base' : `+$${method.upcharge.toFixed(2)}/pc`}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Collar & Sleeve Configurations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Collar Construction
                    </label>
                    <select
                      value={topCollar}
                      onChange={(e) => setTopCollar(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E5DFD5] bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                    >
                      {TOP_COLLARS.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Sleeve Construction
                    </label>
                    <select
                      value={topSleeve}
                      onChange={(e) => setTopSleeve(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E5DFD5] bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                    >
                      {TOP_SLEEVES.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name} {s.upcharge > 0 ? `(+$${s.upcharge.toFixed(2)})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>
            )}

            {/* 3B. SHORTS & BOTTOMS SPECIFICATION SECTION */}
            {activeKit.hasBottom && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5DFD5]">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                      Garment Section B
                    </span>
                    <h3 className="text-base font-bold text-[#1A1A1A]">
                      Shorts & Bottoms Technical Specifications
                    </h3>
                  </div>
                </div>

                {/* Shorts Fabric Weight */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-stone-700 block uppercase tracking-wider">
                    Shorts Fabric Weight & Inseam GSM
                  </label>
                  <div className="space-y-2">
                    {BOTTOM_FABRICS.map(fab => (
                      <label
                        key={fab.id}
                        className={`flex items-start justify-between p-3 rounded-2xl border cursor-pointer transition ${
                          bottomFabric === fab.id
                            ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                            : 'border-[#E5DFD5] hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="bottomFabric"
                            checked={bottomFabric === fab.id}
                            onChange={() => setBottomFabric(fab.id)}
                            className="mt-1 text-blue-600 focus:ring-blue-600"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] block">
                              {fab.name}
                            </span>
                            <span className="text-[11px] text-stone-500 leading-snug block mt-0.5">
                              {fab.desc}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-stone-600 shrink-0 ml-2">
                          {fab.upcharge === 0 ? 'Standard' : `+$${fab.upcharge.toFixed(2)}/pc`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Waistband & Mobility Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Waistband & Drawstring Type
                    </label>
                    <select
                      value={bottomWaistband}
                      onChange={(e) => setBottomWaistband(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E5DFD5] bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-blue-600"
                    >
                      {BOTTOM_WAISTBANDS.map(w => (
                        <option key={w.id} value={w.id}>
                          {w.name} {w.upcharge > 0 ? `(+$${w.upcharge.toFixed(2)})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Leg Cut & Ergonomic Mobility
                    </label>
                    <select
                      value={bottomCut}
                      onChange={(e) => setBottomCut(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E5DFD5] bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-blue-600"
                    >
                      {BOTTOM_CUT_FEATURES.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.upcharge > 0 ? `(+$${c.upcharge.toFixed(2)})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>
            )}

            {/* 4. SIZE BREAKDOWN MATRIX & PRESETS */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DFD5]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F] block">
                    Step 3
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                    Size Breakdown & Allocation Curve
                  </h3>
                  <span className="text-xs text-stone-500">
                    Distribute your {quantity} pcs across Men's, Women's, and Youth sizing.
                  </span>
                </div>

                {/* Allocation Counter Badge */}
                <div className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 ${
                  totalAllocatedSizes === quantity
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-50 text-amber-800 border border-amber-300'
                }`}>
                  <span>Allocated:</span>
                  <strong>{totalAllocatedSizes} / {quantity} PCS</strong>
                  {totalAllocatedSizes === quantity ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  ) : (
                    <span className="text-[10px] font-sans">({quantity - totalAllocatedSizes} diff)</span>
                  )}
                </div>
              </div>

              {/* Quick Distribution Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-500">Quick Curves:</span>
                <button
                  type="button"
                  onClick={() => applySizePreset('team-adult')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-[#FF751F] hover:text-white transition cursor-pointer"
                >
                  Standard Team (S-XL)
                </button>
                <button
                  type="button"
                  onClick={() => applySizePreset('broad-curve')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-[#FF751F] hover:text-white transition cursor-pointer"
                >
                  Broad Curve (XS-2XL)
                </button>
                <button
                  type="button"
                  onClick={() => applySizePreset('youth-academy')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-[#FF751F] hover:text-white transition cursor-pointer"
                >
                  Youth Academy (YXS-YXL)
                </button>
                <button
                  type="button"
                  onClick={() => applySizePreset('equal-split')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-[#FF751F] hover:text-white transition cursor-pointer"
                >
                  Equal Split
                </button>
              </div>

              {/* Size Tab Selector */}
              <div className="flex border-b border-[#E5DFD5]">
                <button
                  type="button"
                  onClick={() => setSizeCategory('men')}
                  className={`pb-2 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
                    sizeCategory === 'men'
                      ? 'border-[#FF751F] text-[#FF751F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Adult Men's Sizes
                </button>
                <button
                  type="button"
                  onClick={() => setSizeCategory('women')}
                  className={`pb-2 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
                    sizeCategory === 'women'
                      ? 'border-[#FF751F] text-[#FF751F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Women's Athletic Cut
                </button>
                <button
                  type="button"
                  onClick={() => setSizeCategory('youth')}
                  className={`pb-2 px-4 text-xs font-bold border-b-2 transition cursor-pointer ${
                    sizeCategory === 'youth'
                      ? 'border-[#FF751F] text-[#FF751F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Youth Academy Sizes
                </button>
              </div>

              {/* Size Input Cells */}
              {sizeCategory === 'men' && (
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {SIZES_MEN.map(sz => (
                    <div key={sz} className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-center">
                      <span className="text-[11px] font-bold text-stone-600 block mb-1">{sz}</span>
                      <input
                        type="number"
                        min="0"
                        value={sizesMen[sz] || 0}
                        onChange={(e) => {
                          const val = Math.max(0, parseInt(e.target.value) || 0);
                          setSizesMen(prev => ({ ...prev, [sz]: val }));
                        }}
                        className="w-full text-center py-1 rounded bg-white border border-stone-300 text-xs font-mono font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {sizeCategory === 'women' && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {SIZES_WOMEN.map(sz => (
                    <div key={sz} className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-center">
                      <span className="text-[11px] font-bold text-stone-600 block mb-1">{sz}</span>
                      <input
                        type="number"
                        min="0"
                        value={sizesWomen[sz] || 0}
                        onChange={(e) => {
                          const val = Math.max(0, parseInt(e.target.value) || 0);
                          setSizesWomen(prev => ({ ...prev, [sz]: val }));
                        }}
                        className="w-full text-center py-1 rounded bg-white border border-stone-300 text-xs font-mono font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {sizeCategory === 'youth' && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {SIZES_YOUTH.map(sz => (
                    <div key={sz} className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-center">
                      <span className="text-[11px] font-bold text-stone-600 block mb-1">{sz}</span>
                      <input
                        type="number"
                        min="0"
                        value={sizesYouth[sz] || 0}
                        onChange={(e) => {
                          const val = Math.max(0, parseInt(e.target.value) || 0);
                          setSizesYouth(prev => ({ ...prev, [sz]: val }));
                        }}
                        className="w-full text-center py-1 rounded bg-white border border-stone-300 text-xs font-mono font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 5. FACTORY EMBELLISHMENTS & CUSTOM BRANDING ADD-ONS */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-sm space-y-3.5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F] block">
                  Step 4
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  Custom Branding & Sialkot Factory Embellishments
                </h3>
                <span className="text-xs text-stone-500">
                  Optional pro finishing touches added during sewing and final pressing.
                </span>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-2xl border border-[#E5DFD5] hover:bg-stone-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasSiliconeBadge}
                      onChange={(e) => setHasSiliconeBadge(e.target.checked)}
                      className="rounded text-[#FF751F] focus:ring-[#FF751F]"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] block">
                        3D Molded High-Density Silicone Crest
                      </span>
                      <span className="text-[11px] text-stone-500">Raised rubberized heat-seal badge on chest or leg</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-600">+$0.85/pc</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl border border-[#E5DFD5] hover:bg-stone-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasEmbroidery}
                      onChange={(e) => setHasEmbroidery(e.target.checked)}
                      className="rounded text-[#FF751F] focus:ring-[#FF751F]"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] block">
                        Direct High-Stitch Precision Embroidery
                      </span>
                      <span className="text-[11px] text-stone-500">Tajima multi-head direct thread embroidery logo</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-600">+$0.75/pc</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl border border-[#E5DFD5] hover:bg-stone-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasPlayerRoster}
                      onChange={(e) => setHasPlayerRoster(e.target.checked)}
                      className="rounded text-[#FF751F] focus:ring-[#FF751F]"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] block">
                        Custom Individual Player Names & Numbers
                      </span>
                      <span className="text-[11px] text-stone-500">Individual roster names on back and squad numbers</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-600">+$0.65/pc</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl border border-[#E5DFD5] hover:bg-stone-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasCustomPackaging}
                      onChange={(e) => setHasCustomPackaging(e.target.checked)}
                      className="rounded text-[#FF751F] focus:ring-[#FF751F]"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] block">
                        Retail Packaging: Custom Woven Labels & Barcoded Polybags
                      </span>
                      <span className="text-[11px] text-stone-500">Custom damask neck tags, card hangtags, and individual SKU barcoding</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-600">+$0.55/pc</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl border border-[#E5DFD5] hover:bg-stone-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasAntiBacterial}
                      onChange={(e) => setHasAntiBacterial(e.target.checked)}
                      className="rounded text-[#FF751F] focus:ring-[#FF751F]"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] block">
                        Silver-Ion Anti-Microbial & Odor Shield Bath
                      </span>
                      <span className="text-[11px] text-stone-500">Textile bath treatment eliminating odor-causing bacterial growth</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-600">+$0.35/pc</span>
                </label>
              </div>
            </div>

            {/* 6. PRODUCTION SPEED & GLOBAL DDP DESTINATION */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-sm space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF751F] block">
                  Step 5
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  Production Lead Time & Door-to-Door DDP Logistics
                </h3>
              </div>

              {/* Production Speed Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Factory Production Speed Line</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProductionSpeed('standard')}
                    className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                      productionSpeed === 'standard'
                        ? 'border-[#1A1A1A] bg-stone-50 ring-1 ring-[#1A1A1A]'
                        : 'border-[#E5DFD5] bg-[#FAF8F5]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs text-[#1A1A1A]">
                      <span>Standard Factory Line</span>
                      <span className="font-mono text-stone-500">12-16 Days</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Cost-efficient production line with complimentary pre-production sample strike-off.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProductionSpeed('rush')}
                    className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                      productionSpeed === 'rush'
                        ? 'border-[#FF751F] bg-[#FF751F]/10 ring-1 ring-[#FF751F]'
                        : 'border-[#E5DFD5] bg-[#FAF8F5]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs text-[#FF751F]">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        Express Sialkot Rush Line
                      </span>
                      <span className="font-mono">7-9 Days</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      Priority laser cutting & 2-shift sewing floor (+12% labor expediting fee).
                    </p>
                  </button>
                </div>
              </div>

              {/* Destination & Freight Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Destination Country / Region
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD5] bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                  >
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Logistics Freight Mode (DDP Landed)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('air')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        shippingMethod === 'air'
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                          : 'border-[#E5DFD5] bg-[#FAF8F5] text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <Plane className="w-3.5 h-3.5" />
                      <span>Express Air (6d)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingMethod('sea')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        shippingMethod === 'sea'
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs'
                          : 'border-[#E5DFD5] bg-[#FAF8F5] text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <Ship className="w-3.5 h-3.5" />
                      <span>Ocean (25d)</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: REAL-TIME FACTORY QUOTE & RFQ (5 Cols)      */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">

            {/* Calculated Quote Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xl relative overflow-hidden space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF751F]">
                  <Sparkles className="w-4 h-4 text-[#FF751F]" />
                  <span>Calculated Factory Quotation</span>
                </div>
                <span className="text-[11px] font-mono text-stone-500">
                  Total Weight: ~{calculation.totalWeightKg} kg
                </span>
              </div>

              {/* Product Label */}
              <div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FF751F]/10 text-[#FF751F] border border-[#FF751F]/20 font-mono">
                  {calculation.activeKit.name}
                </span>
                <h3 className="text-xl font-extrabold text-[#1A1A1A] mt-2">
                  {calculation.quantity.toLocaleString()} Custom Kits
                </h3>
              </div>

              {/* Core Price Callouts */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    Estimated Factory Cost Per Unit
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#1A1A1A]">
                      ${calculation.unitFactoryMin} – ${calculation.unitFactoryMax}
                    </span>
                    <span className="text-xs font-bold text-stone-500">/ pc</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5DFD5] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600 font-medium">Landed DDP Per Unit (Incl. Freight):</span>
                    <span className="font-mono font-bold text-stone-900">
                      ~${calculation.unitLandedPrice} / pc
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-600 font-medium">Grand Landed Batch Total:</span>
                    <span className="font-mono font-black text-emerald-700 text-base">
                      ~${calculation.grandTotalLanded.toLocaleString()} USD
                    </span>
                  </div>
                </div>
              </div>

              {/* Production Timeline Milestones */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF751F]" />
                    Manufacturing & Delivery Target
                  </span>
                  <span className="font-mono text-[#FF751F]">
                    {calculation.totalTurnaroundDays} Days Total
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs space-y-2">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Sample Strike-Off / Proof:</span>
                    <span className="font-bold text-stone-800">{calculation.sampleLeadDays} Business Days</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Bulk Sewing & Pressing:</span>
                    <span className="font-bold text-stone-800">{calculation.bulkLeadDays} Business Days</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Transit Mode:</span>
                    <span className="font-bold text-stone-800">
                      {calculation.shippingDays} Days ({shippingMethod === 'air' ? 'Air DDP' : 'Ocean DDP'})
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#E5DFD5] pt-2 font-bold text-[#1A1A1A]">
                    <span>Estimated Door-to-Door Delivery:</span>
                    <span className="text-[#FF751F] font-mono">{calculation.deliveryTargetDate}</span>
                  </div>
                </div>
              </div>

              {/* Itemized Cost Breakdown Toggle */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowItemizedBOM(!showItemizedBOM)}
                  className="w-full py-2 px-3 rounded-xl border border-[#E5DFD5] hover:bg-stone-50 text-xs font-bold text-stone-700 flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#FF751F]" />
                    {showItemizedBOM ? 'Hide Itemized Factory Cost Breakdown' : 'View Itemized Factory Cost Breakdown'}
                  </span>
                  <span className="text-[11px] font-mono text-[#FF751F]">
                    {showItemizedBOM ? '▲' : '▼'}
                  </span>
                </button>

                {showItemizedBOM && (
                  <div className="mt-2.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-stone-600">
                      <span>1. Technical Fabric & Laser Cutting:</span>
                      <span className="font-bold text-stone-800">${calculation.itemized.fabricCutting} / pc</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600">
                      <span>2. Printing, Sublimation & Assembly:</span>
                      <span className="font-bold text-stone-800">${calculation.itemized.printingStitching} / pc</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600">
                      <span>3. Custom Badges & Trims:</span>
                      <span className="font-bold text-stone-800">${calculation.itemized.trimsBadges} / pc</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600">
                      <span>4. Packaging & Sialkot QC Inspection:</span>
                      <span className="font-bold text-stone-800">${calculation.itemized.packagingQC} / pc</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#E5DFD5] pt-1.5 text-stone-600">
                      <span>5. DDP Landed Courier Freight:</span>
                      <span className="font-bold text-emerald-700">${calculation.itemized.freightPerPc} / pc</span>
                    </div>
                  </div>
                )}
              </div>

              {/* PRIMARY ACTION: EXPORT TO OFFICIAL RFQ */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleExportToRFQ}
                  disabled={attachedToast}
                  className="w-full py-4 px-5 rounded-2xl bg-[#FF751F] hover:bg-[#E65C00] active:scale-[0.99] text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {attachedToast ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                      <span>Quote Attached! Opening Official RFQ...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Request Exact Factory Quote (RFQ)</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-stone-400 leading-snug">
                  Transfers your configured fabric weights, size curves, and Sialkot factory unit pricing directly into our quotation form for immediate engineering review.
                </p>
              </div>

              {/* Guarantees Strip */}
              <div className="pt-3 border-t border-[#E5DFD5] grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-stone-600">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No Hidden Surcharges</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Package className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pre-Production Proof</span>
                </div>
              </div>

            </div>

            {/* Direct Factory WhatsApp Support Card */}
            <div className="p-4 rounded-3xl bg-[#1A1A1A] text-white flex items-center justify-between gap-3 shadow-md">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF751F]">
                  Need Custom Pattern Drafting?
                </span>
                <h4 className="text-xs font-bold text-white">
                  Speak Directly with Sialkot Pattern Masters
                </h4>
              </div>
              <a
                href="https://wa.me/923001234567?text=Hi%20Hare%20Sportswear,%20I%20configured%20a%20custom%20sportswear%20batch%20on%20your%20Manufacturing%20Cost%20Calculator%20and%20would%20like%20to%20review%20physical%20sampling."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5 transition shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
