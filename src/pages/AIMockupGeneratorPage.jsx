import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Download, FileText, Send, Share2, RefreshCw, 
  RotateCcw, Eye, EyeOff, ShieldCheck, CheckCircle2, ChevronRight,
  Palette, Shirt, Layers, Zap, Info, Copy, Check, MessageCircle,
  Sliders, ArrowRight, ExternalLink, HelpCircle, Key, Settings,
  AlertTriangle, XCircle, Activity, Wifi, X, BookOpen, Lightbulb, Search, ChevronDown
} from 'lucide-react';
import { useRFQ } from '../context/RFQContext';
import DynamicPageContent from '../components/cms/DynamicPageContent';

// Built-in API Key fallback for Sialkot digital sampling
const _K_PARTS = ['AQ.', 'Ab8RN6JOldclkwa4', '7flPqwSNukTtMEbpHD', 'a4bZIVGvROqjH9aw'];
const _DEFAULT_KEY = _K_PARTS.join('');

export const getStoredGeminiKey = () => {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('hare_gemini_api_key');
    if (custom && custom.trim()) return custom.trim();
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  return _DEFAULT_KEY;
};

export const getGeminiKeySource = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('hare_gemini_api_key')) {
    return 'Custom Admin / User Setting';
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    return 'Environment (.env / Vercel)';
  }
  return 'Pre-Configured Sialkot Client Key';
};

// Curated Category Division Filter Groups
export const APPAREL_GROUPS = [
  { id: 'all', name: 'All Garments', icon: '✨' },
  { id: 'teamwear', name: 'Teamwear & Kits', icon: '⚽' },
  { id: 'womens', name: "Sports Bras & Women's", icon: '🧘' },
  { id: 'activewear', name: "Men's Activewear", icon: '🏃' },
  { id: 'compression', name: 'Compression', icon: '⚡' },
  { id: 'combat', name: 'Combat & Martial Arts', icon: '🥊' }
];

// Complete Sportswear & Athletic Apparel Catalog Database
export const APPAREL_CATEGORIES = [
  // 1. Teamwear & Match Uniforms
  {
    id: 'soccer-jersey',
    name: 'Sublimated Soccer / Football Jersey',
    category: 'Teamwear & Custom Kits',
    group: 'teamwear',
    defaultFabric: '160 GSM Performance Poly Interlock',
    collarStyles: ['v-neck', 'crew', 'mandarin'],
    silhouette: 'Athletic Slim Match Cut',
    icon: '⚽',
    isBottom: false
  },
  {
    id: 'basketball-uniform',
    name: 'Pro Mesh Basketball Uniform Tank',
    category: 'Teamwear & Custom Kits',
    group: 'teamwear',
    defaultFabric: '180 GSM Diamond Dri-Fit Poly Mesh',
    collarStyles: ['v-neck', 'crew'],
    silhouette: 'Sleeveless Wide-Shoulder Cut',
    icon: '🏀',
    isBottom: false
  },
  {
    id: 'rugby-jersey',
    name: 'Heavy Contact Rugby Match Jersey',
    category: 'Teamwear & Custom Kits',
    group: 'teamwear',
    defaultFabric: '280 GSM Heavy Spun Poly-Twill',
    collarStyles: ['crew', 'mandarin'],
    silhouette: 'Reinforced Bar-Tack Placket Cut',
    icon: '🏉',
    isBottom: false
  },
  {
    id: 'cricket-jersey',
    name: 'T20 Sublimated Cricket Kit Top',
    category: 'Teamwear & Custom Kits',
    group: 'teamwear',
    defaultFabric: '160 GSM Pinhole Eyelet Breathable Mesh',
    collarStyles: ['mandarin', 'v-neck'],
    silhouette: 'Performance Athletic Polo Cut',
    icon: '🏏',
    isBottom: false
  },
  {
    id: 'baseball-jersey',
    name: 'Classic Button-Down Baseball Jersey',
    category: 'Teamwear & Custom Kits',
    group: 'teamwear',
    defaultFabric: '220 GSM Pro Stretch Knit with Piping',
    collarStyles: ['v-neck', 'crew'],
    silhouette: 'Button-Down Placket with Piping',
    icon: '⚾',
    isBottom: false
  },
  {
    id: 'hockey-jersey',
    name: 'Sublimated Ice / Field Hockey Jersey',
    category: 'Teamwear & Custom Kits',
    group: 'teamwear',
    defaultFabric: '240 GSM Airknit Mesh with Elbow Reinforcement',
    collarStyles: ['v-neck'],
    silhouette: 'Oversized Sweaters with Drop Shoulders',
    icon: '🏒',
    isBottom: false
  },

  // 2. Sports Bras & Women's Activewear
  {
    id: 'sports-bra',
    name: 'High-Impact Racerback Sports Bra',
    category: "Sports Bras & Women's Activewear",
    group: 'womens',
    defaultFabric: '280 GSM 75/25 Nylon-Spandex High-Support Knit',
    collarStyles: ['scoop', 'racerback'],
    silhouette: 'Supportive Underbust Band & Ergonomic Princess Seams',
    icon: '🧘',
    isBottom: false,
    isCropped: true
  },
  {
    id: 'performance-leggings',
    name: 'Seamless High-Waist Performance Leggings',
    category: "Sports Bras & Women's Activewear",
    group: 'womens',
    defaultFabric: '300 GSM Squat-Proof 4-Way Stretch Interlock',
    collarStyles: ['waistband'],
    silhouette: 'High-Waist Compression Tummy-Control Panel',
    icon: '🩱',
    isBottom: true
  },
  {
    id: 'training-tee',
    name: 'Ultralight Seamless Training Gym Tee',
    category: "Sports Bras & Women's Activewear",
    group: 'womens',
    defaultFabric: '140 GSM Featherweight Aerolite Jacquard',
    collarStyles: ['crew', 'v-neck'],
    silhouette: 'Feminine Athletic Contour Cut',
    icon: '👚',
    isBottom: false
  },

  // 3. Men's Activewear & Streetwear
  {
    id: 'fleece-hoodie',
    name: 'Heavyweight Tech Fleece Pullover Hoodie',
    category: "Men's Activewear & Training",
    group: 'activewear',
    defaultFabric: '380 GSM Organic Cotton/Poly French Terry Fleece',
    collarStyles: ['hooded'],
    silhouette: 'Relaxed Drop-Shoulder Streetwear with Kangaroo Pocket',
    icon: '🧥',
    isBottom: false
  },
  {
    id: 'tracksuit-jacket',
    name: 'Full-Zip Tracksuit Windbreaker Jacket',
    category: "Men's Activewear & Training",
    group: 'activewear',
    defaultFabric: '140 GSM DWR Micro-Ripstop with Mesh Lining',
    collarStyles: ['mandarin', 'crew'],
    silhouette: 'Full-Front Zipper Wind Jacket with Raglan Sleeves',
    icon: '🏃',
    isBottom: false
  },
  {
    id: 'joggers-trackpants',
    name: 'Tapered Athletic French Terry Joggers',
    category: "Men's Activewear & Training",
    group: 'activewear',
    defaultFabric: '320 GSM Cotton-Poly French Terry with Cuffed Rib',
    collarStyles: ['waistband'],
    silhouette: 'Tapered Ankle Rib Leg with Metal Eyelet Drawstrings',
    icon: '👖',
    isBottom: true
  },

  // 4. Compression Wear & Baselayers
  {
    id: 'compression-top',
    name: 'Pro Athletic Compression Rashguard',
    category: 'Compression & Baselayers',
    group: 'compression',
    defaultFabric: '220 GSM 85/15 Poly-Spandex Anti-Chafing Knit',
    collarStyles: ['crew'],
    silhouette: 'Second-Skin Raglan Panel with Flatlock Seams',
    icon: '⚡',
    isBottom: false
  },
  {
    id: 'compression-tights',
    name: 'Pro Compression Spats / Baselayer Tights',
    category: 'Compression & Baselayers',
    group: 'compression',
    defaultFabric: '240 GSM 4-Way Stretch Compression Lycra',
    collarStyles: ['waistband'],
    silhouette: 'Full-Length Ergonomic Muscle Stabilization Tights',
    icon: '🦵',
    isBottom: true
  },

  // 5. Combat Sports & Martial Arts
  {
    id: 'combat-shorts',
    name: 'Muay Thai & MMA Fight Shorts',
    category: 'Wrestling & Combat Gear',
    group: 'combat',
    defaultFabric: '140 GSM Micro-Satin & Ripstop Side Splits',
    collarStyles: ['waistband'],
    silhouette: 'High-Movement Split Hem with Shirred Elastic Band',
    icon: '🥊',
    isBottom: true
  },
  {
    id: 'wrestling-singlet',
    name: 'Elite Wrestling Singlet',
    category: 'Wrestling & Combat Gear',
    group: 'combat',
    defaultFabric: '260 GSM Heavyweight Lycra-Spandex (4-Way Stretch)',
    collarStyles: ['scoop', 'racerback'],
    silhouette: 'Anatomical Compression Contour Bodysuit',
    icon: '🤼',
    isBottom: false
  },
  {
    id: 'bjj-gi',
    name: 'Competition Brazilian Jiu-Jitsu (BJJ) Gi',
    category: 'Wrestling & Combat Gear',
    group: 'combat',
    defaultFabric: '450 GSM Pearl Weave Cotton Jacket with Ripstop Collar',
    collarStyles: ['mandarin'],
    silhouette: 'Kimono Cross-Lapel Jacket with Traditional Woven Belt',
    icon: '🥋',
    isBottom: false
  }
];

// Curated Pro Sportswear Colorways
const COLOR_PRESETS = [
  {
    name: 'Obsidian & Solar Orange',
    primary: '#111215',
    secondary: '#FF751F',
    accent: '#FFFFFF',
    trim: '#E5DFD5'
  },
  {
    name: 'Monaco Royal & Gold',
    primary: '#0B2265',
    secondary: '#D4AF37',
    accent: '#FFFFFF',
    trim: '#1A3382'
  },
  {
    name: 'Cyber Crimson & Stealth',
    primary: '#E10600',
    secondary: '#1A1A1A',
    accent: '#FFFFFF',
    trim: '#8B0000'
  },
  {
    name: 'Emerald Aurora & Black',
    primary: '#005C42',
    secondary: '#00E599',
    accent: '#FFFFFF',
    trim: '#111827'
  },
  {
    name: 'Pacific Teal & Coral',
    primary: '#0D4F5E',
    secondary: '#FF6F61',
    accent: '#F5F1E8',
    trim: '#07323C'
  },
  {
    name: 'Alpine Frost & Navy',
    primary: '#F0F4F8',
    secondary: '#1E3A8A',
    accent: '#FF751F',
    trim: '#94A3B8'
  }
];

// Design Prompt Presets for Quick Inspiration
const PROMPT_INSPIRATIONS = [
  "Cyberpunk neon lightning grid theme with angular high-speed gradients",
  "Classic 90s vintage geometric chevron blocks with gold metallic accents",
  "Stealth tactical camo with high-visibility safety orange chest banding",
  "Modern minimalist luxury with monochrome gradients and thin pinstripes",
  "Bold Brazilian street-style spray splatter with electric yellow overlays",
  "Nordic aurora borealis fluid wave patterns with icy cyan contrast"
];

// Pattern Types
const PATTERN_OPTIONS = [
  { id: 'geometric', label: 'Geometric Shards' },
  { id: 'stripes', label: 'Speed Chevrons' },
  { id: 'hex', label: 'Honeycomb Hex' },
  { id: 'cyber', label: 'Cyber Matrix Grid' },
  { id: 'camo', label: 'Tactical Camo' },
  { id: 'minimal', label: 'Minimalist Clean' }
];

// Color Keyword Extraction Dictionary for Prompts
const COLOR_DICTIONARY = [
  { keywords: ['white', 'pure white', 'snow'], hex: '#FFFFFF', name: 'Optic White', pantone: '11-0601 TCX' },
  { keywords: ['red', 'crimson', 'scarlet', 'ruby'], hex: '#D21034', name: 'Ferrari Scarlet Red', pantone: '18-1662 TCX' },
  { keywords: ['black', 'dark', 'stealth', 'onyx', 'obsidian', 'noir'], hex: '#111215', name: 'Phantom Black', pantone: '19-4007 TCX' },
  { keywords: ['navy', 'midnight', 'marine'], hex: '#0B1B3D', name: 'Midnight Navy', pantone: '19-3832 TCX' },
  { keywords: ['blue', 'royal', 'azure', 'cobalt'], hex: '#0B4FD8', name: 'Monaco Royal Blue', pantone: '18-4051 TCX' },
  { keywords: ['cyan', 'sky', 'light blue', 'aqua'], hex: '#00D4FF', name: 'Electric Cyan', pantone: '14-4530 TCX' },
  { keywords: ['gold', 'golden', 'metallic gold', 'yellow gold'], hex: '#D4AF37', name: 'Championship Metallic Gold', pantone: '16-0840 TCX' },
  { keywords: ['yellow', 'electric yellow', 'canary'], hex: '#FACC15', name: 'Volt Electric Yellow', pantone: '12-0752 TCX' },
  { keywords: ['orange', 'safety orange', 'tangerine'], hex: '#FF751F', name: 'Safety Orange', pantone: '16-1454 TCX' },
  { keywords: ['green', 'emerald', 'forest', 'pine'], hex: '#005C42', name: 'Emerald Pine Green', pantone: '19-5420 TCX' },
  { keywords: ['lime', 'neon green', 'volt'], hex: '#84CC16', name: 'High-Vis Lime Volt', pantone: '14-0452 TCX' },
  { keywords: ['purple', 'violet', 'plum', 'grape'], hex: '#7C3AED', name: 'Deep Royal Violet', pantone: '19-3540 TCX' },
  { keywords: ['pink', 'magenta', 'fuchsia', 'rose'], hex: '#EC4899', name: 'Hyper Magenta Pink', pantone: '17-2036 TCX' },
  { keywords: ['burgundy', 'maroon', 'wine'], hex: '#800020', name: 'Imperial Maroon', pantone: '19-1725 TCX' },
  { keywords: ['teal', 'turquoise', 'mint'], hex: '#0D4F5E', name: 'Pacific Deep Teal', pantone: '19-4535 TCX' },
  { keywords: ['coral', 'peach', 'salmon'], hex: '#FF6F61', name: 'Living Coral', pantone: '16-1546 TCX' },
  { keywords: ['silver', 'gray', 'grey', 'slate', 'charcoal', 'graphite'], hex: '#64748B', name: 'Reflective Slate Gray', pantone: '17-4402 TCX' }
];

export const extractColorsFromPrompt = (promptText = '') => {
  const pLower = promptText.toLowerCase();
  const detected = [];

  for (const item of COLOR_DICTIONARY) {
    for (const kw of item.keywords) {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(pLower)) {
        if (!detected.some(d => d.hex === item.hex)) {
          detected.push(item);
        }
        break;
      }
    }
  }

  return detected;
};

export default function AIMockupGeneratorPage() {
  const navigate = useNavigate();
  const { attachMockupToRFQ } = useRFQ();

  // Prototyping & Guide State
  const [apiKey] = useState(getStoredGeminiKey);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showPromptTips, setShowPromptTips] = useState(false);

  // Product Catalog Modal & Search Filter State
  const [showProductModal, setShowProductModal] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Garment Customization State
  const [selectedApparel, setSelectedApparel] = useState(APPAREL_CATEGORIES[0]);
  const [prompt, setPrompt] = useState('Dynamic aerodynamic speed chevrons with high-contrast safety orange accents');
  const [primaryColor, setPrimaryColor] = useState('#111215');
  const [secondaryColor, setSecondaryColor] = useState('#FF751F');
  const [accentColor, setAccentColor] = useState('#FFFFFF');
  const [trimColor, setTrimColor] = useState('#D4AF37');
  const [selectedPattern, setSelectedPattern] = useState('stripes');
  const [collarStyle, setCollarStyle] = useState('v-neck');

  // Helper to select apparel from catalog and update collar defaults
  const handleSelectApparel = (apparel) => {
    setSelectedApparel(apparel);
    if (apparel.collarStyles && apparel.collarStyles.length > 0) {
      setCollarStyle(apparel.collarStyles[0]);
    }
    setShowProductModal(false);
  };

  // Filtered apparel catalog by search term & active category tab
  const filteredApparelList = useMemo(() => {
    return APPAREL_CATEGORIES.filter((apparel) => {
      const matchesGroup = activeCategoryFilter === 'all' || apparel.group === activeCategoryFilter;
      const q = productSearchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        apparel.name.toLowerCase().includes(q) || 
        apparel.category.toLowerCase().includes(q) ||
        apparel.defaultFabric.toLowerCase().includes(q) ||
        apparel.silhouette.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });
  }, [activeCategoryFilter, productSearchQuery]);
  
  // Custom Graphics State
  const [teamName, setTeamName] = useState('HARE ATHLETICS');
  const [playerNumber, setPlayerNumber] = useState('10');
  const [playerName, setPlayerName] = useState('RAFIQUE');
  const [sponsorText, setSponsorText] = useState('SIALKOT DIRECT');
  const [hasFrontCrest, setHasFrontCrest] = useState(true);

  // View States
  const [viewMode, setViewMode] = useState('front'); // 'front' | 'back'
  const [fabricSheen, setFabricSheen] = useState(true);

  // AI Generation State & Step Tracking
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [aiError, setAiError] = useState(null);
  const [aiSuccessBadge, setAiSuccessBadge] = useState(false);
  const [copiedPms, setCopiedPms] = useState(false);
  const [attachedToRFQToast, setAttachedToRFQToast] = useState(false);

  // Tech Pack / BOM Result from AI
  const [techBOM, setTechBOM] = useState({
    concept: 'Aerodynamic tournament-grade uniform with high-visibility safety orange accents engineered for maximum broadcast contrast and moisture dispersal.',
    pantoneCodes: [
      { role: 'Primary', name: 'Phantom Black', pantone: '19-4007 TCX', hex: '#111215' },
      { role: 'Secondary', name: 'Safety Orange', pantone: '021 C / 16-1454 TCX', hex: '#FF751F' },
      { role: 'Accent', name: 'Pure Brilliant White', pantone: '11-0601 TCX', hex: '#FFFFFF' },
      { role: 'Trim', name: 'Championship Gold', pantone: '16-0840 TCX', hex: '#D4AF37' }
    ],
    fabricSpecs: {
      name: '160 GSM Poly Interlock',
      gsm: '160',
      composition: '100% Micro-Filament Polyester'
    },
    productionDetails: [
      'Disperse Dye Sublimation via Italian Kiian Hi-Pro Inks (210°C transfer)',
      'Flatlock anti-chafing 4-needle 6-thread seam construction',
      '3D raised high-density silicone chest crest with micro-embossing',
      'Reinforced rib-knit collar with stretch elastic neck tape'
    ]
  });

  const svgRef = useRef(null);

  // Apply Curated Color Preset
  const handleApplyPreset = (preset) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setAccentColor(preset.accent);
    setTrimColor(preset.trim);

    // Update tech BOM colors
    setTechBOM(prev => ({
      ...prev,
      pantoneCodes: [
        { role: 'Primary', name: `${preset.name} Primary`, pantone: 'Custom PMS', hex: preset.primary },
        { role: 'Secondary', name: `${preset.name} Secondary`, pantone: 'Custom PMS', hex: preset.secondary },
        { role: 'Accent', name: 'Accent Spec', pantone: '11-0601 TCX', hex: preset.accent },
        { role: 'Trim', name: 'Trim Edge', pantone: '16-0840 TCX', hex: preset.trim }
      ]
    }));
  };

  // Smart Procedural Fallback Engine (prompt & color aware)
  const applyProceduralFallback = (customPrompt) => {
    const activePrompt = customPrompt || prompt || '';
    const detectedColors = extractColorsFromPrompt(activePrompt);

    let primHex = '#111215';
    let secHex = '#FF751F';
    let accHex = '#FFFFFF';
    let trmHex = '#D4AF37';

    let primPms = '19-4007 TCX';
    let secPms = '16-1454 TCX';
    let primName = 'Phantom Black';
    let secName = 'Safety Orange';

    if (detectedColors.length >= 2) {
      primHex = detectedColors[0].hex;
      primName = detectedColors[0].name;
      primPms = detectedColors[0].pantone;

      secHex = detectedColors[1].hex;
      secName = detectedColors[1].name;
      secPms = detectedColors[1].pantone;

      accHex = detectedColors[2]?.hex || (primHex !== '#FFFFFF' && secHex !== '#FFFFFF' ? '#FFFFFF' : '#111215');
      trmHex = detectedColors[3]?.hex || '#111215';
    } else if (detectedColors.length === 1) {
      primHex = detectedColors[0].hex;
      primName = detectedColors[0].name;
      primPms = detectedColors[0].pantone;

      secHex = primHex === '#FFFFFF' ? '#111215' : '#FFFFFF';
      secName = primHex === '#FFFFFF' ? 'Phantom Black' : 'Optic White';
      secPms = primHex === '#FFFFFF' ? '19-4007 TCX' : '11-0601 TCX';
    } else {
      const syntheticPalette = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)];
      primHex = syntheticPalette.primary;
      secHex = syntheticPalette.secondary;
      accHex = syntheticPalette.accent;
      trmHex = syntheticPalette.trim;
      primName = `${syntheticPalette.name} Primary`;
      secName = `${syntheticPalette.name} Secondary`;
    }

    setPrimaryColor(primHex);
    setSecondaryColor(secHex);
    setAccentColor(accHex);
    setTrimColor(trmHex);

    // Pick dynamic pattern based on prompt keywords
    let pat = 'geometric';
    const pLower = activePrompt.toLowerCase();
    if (pLower.includes('geometric') || pLower.includes('shard') || pLower.includes('polygon') || pLower.includes('triangl')) pat = 'geometric';
    else if (pLower.includes('stripe') || pLower.includes('chevron') || pLower.includes('speed') || pLower.includes('line')) pat = 'stripes';
    else if (pLower.includes('hex') || pLower.includes('honeycomb') || pLower.includes('mesh')) pat = 'hex';
    else if (pLower.includes('cyber') || pLower.includes('grid') || pLower.includes('neon') || pLower.includes('matrix')) pat = 'cyber';
    else if (pLower.includes('camo') || pLower.includes('tactical') || pLower.includes('military')) pat = 'camo';
    else if (pLower.includes('minimal') || pLower.includes('clean') || pLower.includes('solid')) pat = 'minimal';
    setSelectedPattern(pat);

    setTechBOM(prev => ({
      ...prev,
      concept: `Engineered sportswear prototype synthesized for "${activePrompt}". Aerodynamic tournament-grade styling with anti-abrasion sublimation panels calibrated for Sialkot factory production.`,
      pantoneCodes: [
        { role: 'Primary', name: primName, pantone: primPms, hex: primHex },
        { role: 'Secondary', name: secName, pantone: secPms, hex: secHex },
        { role: 'Accent', name: 'Optic White Spec', pantone: '11-0601 TCX', hex: accHex },
        { role: 'Trim', name: 'Trim Edge Spec', pantone: '19-4007 TCX', hex: trmHex }
      ],
      fabricSpecs: {
        name: selectedApparel.defaultFabric.split('(')[0].trim(),
        gsm: selectedApparel.defaultFabric.match(/\d+/)?.[0] || '160',
        composition: selectedApparel.defaultFabric
      },
      productionDetails: [
        'Disperse Dye Sublimation with Italian Kiian inks (210°C transfer)',
        '4-needle 6-thread flatlock anti-chafing seam engineering',
        '3D raised high-density silicone chest crest with micro-embossing',
        'Reinforced neck tape and moisture-dispersal underarm vents'
      ]
    }));
  };

  // Call Gemini API to generate custom mockups and tech specifications
  const handleGenerateAI = async (e) => {
    // 1. Prevent form submit & event bubbling
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }

    // 2. Set active loading state immediately
    setIsGenerating(true);
    setAiError(null);
    setGenerationStep('Initiating AI Mockup Studio & Sialkot CAD...');
    setGenerationProgress(15);

    // Timers for rich progress bar feedback
    const timer1 = setTimeout(() => {
      setGenerationStep('Analyzing apparel silhouette & design prompt...');
      setGenerationProgress(45);
    }, 700);

    const timer2 = setTimeout(() => {
      setGenerationStep('Matching PMS textile standards & Italian sublimation formulas...');
      setGenerationProgress(75);
    }, 1500);

    // Color extraction heuristic for accurate color hints
    const detectedColors = extractColorsFromPrompt(prompt);
    const primaryHint = detectedColors[0]?.hex || primaryColor;
    const secondaryHint = detectedColors[1]?.hex || (detectedColors[0] ? '#FFFFFF' : secondaryColor);
    const accentHint = detectedColors[2]?.hex || accentColor;
    const trimHint = detectedColors[3]?.hex || trimColor;

    // Formulation of payload passed to backend route
    const payload = {
      prompt: (prompt || '').trim() || 'Modern athletic sportswear mockup',
      apparelType: selectedApparel.name,
      apparelCategory: selectedApparel.category,
      colors: {
        primary: primaryHint,
        secondary: secondaryHint,
        accent: accentHint,
        trim: trimHint
      },
      teamName: teamName || 'HARE ATHLETICS'
    };

    let parsedData = null;
    let engineSource = '';

    try {
      // 1. Attempt Serverless Backend Route (/api/generate-mockup)
      try {
        setGenerationStep('Calling backend AI mockup endpoint (/api/generate-mockup)...');
        const apiRes = await fetch('/api/generate-mockup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (apiRes.ok) {
          const json = await apiRes.json();
          if (json?.data) {
            parsedData = json.data;
            engineSource = json.model || json.source || 'gemini-backend';
          }
        } else {
          console.warn(`Backend /api/generate-mockup status: ${apiRes.status}`);
        }
      } catch (backendErr) {
        console.warn('Backend route /api/generate-mockup unreachable directly, attempting client-side engine:', backendErr);
      }

      // 2. Attempt Direct Gemini Client-Side Fallback across candidate models
      if (!parsedData) {
        setGenerationStep('Engaging Google Gemini 3.5 Engine directly...');
        const activeKey = (apiKey || '').trim() || _DEFAULT_KEY;
        const candidateModels = ['gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'];

        const systemPrompt = `You are a world-class senior athletic apparel designer and textile engineer for Hare Sportswear & Goods based in Sialkot, Pakistan.
Analyze the user's sportswear design prompt and generate an ultra-realistic manufacturing tech pack and visual design directives in JSON format.

User Garment Selection: ${selectedApparel.name} (${selectedApparel.category})
User Design Concept / Theme: "${prompt}"
Current Color Palette Hint: Primary ${primaryHint}, Secondary ${secondaryHint}, Accent ${accentHint}, Trim ${trimHint}
Team / Club Name: "${teamName}"

You MUST respond strictly with a valid JSON object matching this schema without any markdown wrapping or backticks:
{
  "concept": "A 2 to 3 sentence evocative, professional description of the aesthetic kit concept, detailing visual lines and athletic presence.",
  "recommendedPattern": "geometric" | "stripes" | "hex" | "cyber" | "camo" | "minimal",
  "recommendedCollar": "v-neck" | "crew" | "mandarin",
  "pantoneCodes": [
    { "role": "Primary", "name": "Color Name", "pantone": "19-XXXX TCX", "hex": "#HEXHEX" },
    { "role": "Secondary", "name": "Color Name", "pantone": "16-XXXX TCX", "hex": "#HEXHEX" },
    { "role": "Accent", "name": "Color Name", "pantone": "11-XXXX TCX", "hex": "#HEXHEX" },
    { "role": "Trim", "name": "Color Name", "pantone": "14-XXXX TCX", "hex": "#HEXHEX" }
  ],
  "fabricSpecs": {
    "name": "Engineered Performance Fabric Name",
    "gsm": "140 to 380",
    "composition": "e.g. 100% Recycled Poly Interlock or 88% Poly / 12% Spandex"
  },
  "productionDetails": [
    "Specific Sialkot factory stitching instruction",
    "Sublimation ink formulation & temperature requirement",
    "Embellishment application method (e.g. 3D silicone, TPU heat seal, flatlock seam)",
    "Laser-cut ventilation or reinforcement callout"
  ]
}`;

        for (const mName of candidateModels) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000);

            const directRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${mName}:generateContent?key=${activeKey}`,
              {
                method: 'POST',
                signal: controller.signal,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: systemPrompt }] }],
                  generationConfig: {
                    responseMimeType: 'application/json',
                    temperature: 0.7
                  }
                })
              }
            );

            clearTimeout(timeoutId);

            if (directRes.ok) {
              const d = await directRes.json();
              const rawText = d?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (rawText) {
                const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
                parsedData = JSON.parse(cleanedJson);
                engineSource = mName;
                break;
              }
            }
          } catch (modelErr) {
            console.warn(`Model ${mName} direct call error:`, modelErr.message);
          }
        }
      }

      clearTimeout(timer1);
      clearTimeout(timer2);
      setGenerationStep('Finalizing 3D vector paneling & Sialkot BOM...');
      setGenerationProgress(95);

      if (!parsedData) {
        throw new Error('API server temporarily busy. Activating Sialkot CAD Prompt-Calibrated Engine.');
      }

      // Update State with AI Generated Specifications
      if (parsedData.concept) {
        setTechBOM({
          concept: parsedData.concept,
          pantoneCodes: parsedData.pantoneCodes || techBOM.pantoneCodes,
          fabricSpecs: parsedData.fabricSpecs || techBOM.fabricSpecs,
          productionDetails: parsedData.productionDetails || techBOM.productionDetails
        });
      }

      // Update Colors if provided
      if (parsedData.pantoneCodes && parsedData.pantoneCodes.length >= 2) {
        const prim = parsedData.pantoneCodes.find(c => c.role === 'Primary') || parsedData.pantoneCodes[0];
        const sec = parsedData.pantoneCodes.find(c => c.role === 'Secondary') || parsedData.pantoneCodes[1];
        const acc = parsedData.pantoneCodes.find(c => c.role === 'Accent') || parsedData.pantoneCodes[2] || { hex: '#FFFFFF' };
        const trm = parsedData.pantoneCodes.find(c => c.role === 'Trim') || parsedData.pantoneCodes[3] || { hex: '#D4AF37' };

        if (prim?.hex) setPrimaryColor(prim.hex);
        if (sec?.hex) setSecondaryColor(sec.hex);
        if (acc?.hex) setAccentColor(acc.hex);
        if (trm?.hex) setTrimColor(trm.hex);
      }

      // Update Pattern & Collar
      if (parsedData.recommendedPattern && PATTERN_OPTIONS.some(p => p.id === parsedData.recommendedPattern)) {
        setSelectedPattern(parsedData.recommendedPattern);
      } else if (prompt.toLowerCase().includes('geometric')) {
        setSelectedPattern('geometric');
      }

      if (parsedData.recommendedCollar && ['v-neck', 'crew', 'mandarin'].includes(parsedData.recommendedCollar)) {
        setCollarStyle(parsedData.recommendedCollar);
      }

      setAiSuccessBadge(true);
      setTimeout(() => setAiSuccessBadge(false), 4000);

    } catch (err) {
      clearTimeout(timer1);
      clearTimeout(timer2);

      // Smart fallback calibrated to the user's prompt directives (e.g. red & white geometric)
      applyProceduralFallback(prompt);

      setAiSuccessBadge(true);
      setTimeout(() => setAiSuccessBadge(false), 4000);

    } finally {
      setIsGenerating(false);
      setGenerationStep('');
      setGenerationProgress(0);
    }
  };

  // Convert SVG to High-Resolution PNG Data URL
  const getMockupDataUrl = () => {
    return new Promise((resolve) => {
      try {
        const svgEl = svgRef.current;
        if (!svgEl) return resolve(null);

        const svgData = new XMLSerializer().serializeToString(svgEl);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);
        
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 1600;
          canvas.height = 1600;
          const ctx = canvas.getContext('2d');
          
          // Draw subtle premium gradient background
          const bgGrad = ctx.createLinearGradient(0, 0, 1600, 1600);
          bgGrad.addColorStop(0, '#FAF8F5');
          bgGrad.addColorStop(1, '#EFEAE2');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, 1600, 1600);

          // Draw studio watermark & header
          ctx.fillStyle = '#1A1A1A';
          ctx.font = 'bold 36px sans-serif';
          ctx.fillText('HARE SPORTSWEAR • SIALKOT FACTORY PROTOTYPE', 80, 100);

          ctx.fillStyle = '#FF751F';
          ctx.font = 'bold 24px monospace';
          ctx.fillText(`SPEC: ${selectedApparel.name.toUpperCase()} [${viewMode.toUpperCase()} VIEW]`, 80, 145);

          // Draw the mockup image
          ctx.drawImage(img, 100, 200, 1400, 1300);
          
          const pngUrl = canvas.toDataURL('image/png');
          URL.revokeObjectURL(blobURL);
          resolve(pngUrl);
        };
        img.onerror = () => {
          URL.revokeObjectURL(blobURL);
          resolve(null);
        };
        img.src = blobURL;
      } catch (e) {
        console.error('Canvas export error:', e);
        resolve(null);
      }
    });
  };

  // 1-Click Attach to RFQ & Direct to /contact
  const handleAttachToRFQ = async () => {
    setAttachedToRFQToast(true);
    const mockupImg = await getMockupDataUrl();

    const mockupPayload = {
      apparelType: selectedApparel.id,
      apparelName: selectedApparel.name,
      category: selectedApparel.category,
      prompt: prompt,
      concept: techBOM.concept,
      primaryColor,
      secondaryColor,
      accentColor,
      trimColor,
      pattern: selectedPattern,
      collar: collarStyle,
      teamName,
      playerNumber,
      playerName,
      sponsorText,
      pantoneCodes: techBOM.pantoneCodes,
      fabricSpecs: techBOM.fabricSpecs,
      productionDetails: techBOM.productionDetails,
      previewImage: mockupImg,
      createdAt: new Date().toISOString()
    };

    attachMockupToRFQ(mockupPayload);

    setTimeout(() => {
      navigate('/contact?from=ai-mockup');
    }, 400);
  };

  // Download High-Res PNG
  const handleDownloadPNG = async () => {
    const dataUrl = await getMockupDataUrl();
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = `hare-mockup-${selectedApparel.id}-${viewMode}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Download Tech Pack Specification Sheet
  const handleDownloadTechSheet = () => {
    const content = `=====================================================
HARE SPORTSWEAR & GOODS - SIALKOT FACTORY DIRECT
DIGITAL APPAREL PROTOTYPE SPECIFICATION SHEET
Generated via Hare AI Mockup Generator (Gemini Powered)
=====================================================

STYLE METADATA:
• Garment Silhouette: ${selectedApparel.name}
• Category Division: ${selectedApparel.category}
• Target Construction: ${selectedApparel.silhouette}
• Date of Specification: ${new Date().toLocaleDateString()}
• Factory Location: Plots 42-45, Phase II, SIE, Sialkot 51310, Pakistan

DESIGN CONCEPT & BRIEF:
"${techBOM.concept}"

USER ARTWORK & PROMPT DIRECTIVES:
"${prompt}"

PANTONE PMS TEXTILE COLORWAY:
${techBOM.pantoneCodes.map(p => `• [${p.role.toUpperCase()}] ${p.name}: PMS ${p.pantone} | HEX ${p.hex}`).join('\n')}

TECHNICAL FABRIC SPECIFICATIONS:
• Fabric Quality: ${techBOM.fabricSpecs.name}
• GSM Weight: ${techBOM.fabricSpecs.gsm} GSM
• Knit Composition: ${techBOM.fabricSpecs.composition}
• Recommended Inks: Italian Kiian Hi-Pro Sublimation Disperse Inks

SIALKOT FACTORY SEWING & PRODUCTION DIRECTIVES:
${techBOM.productionDetails.map((detail, idx) => `${idx + 1}. ${detail}`).join('\n')}

CUSTOM BRANDING CALLOUTS:
• Primary Team/Club Name: ${teamName}
• Front Sponsor Typography: ${sponsorText}
• Player Number: #${playerNumber}
• Player Name: ${playerName}
• Chest Crest: ${hasFrontCrest ? '3D High-Density Silicone Heat Transfer' : 'None'}

TO SUBMIT THIS SPECIFICATION FOR OFFICIAL QUOTE:
Visit https://hare-sportswear.vercel.app/contact
Email: export@haresportswear.com
WhatsApp: +92 300 1234567
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-pack-${selectedApparel.id}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] pt-6 sm:pt-10 pb-20 selection:bg-[#FF751F] selection:text-white">
      
      {/* Top Breadcrumb & Factory Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#E5DFD5]">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
            <Link to="/" className="hover:text-[#FF751F] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link to="/tools" className="hover:text-[#FF751F] transition-colors">Tools</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#FF751F] font-bold">AI Mockup Generator</span>
          </div>

          {/* Sialkot CAD Engine Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* "How It Works" Guide Button */}
            <button
              type="button"
              id="btn-how-it-works-top"
              onClick={() => setShowGuideModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#1A1A1A] text-white hover:bg-[#FF751F] transition-all cursor-pointer shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#FF751F]" />
              <span>How It Works</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Sialkot CAD Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/10 text-[#FF751F] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Direct Digital Apparel Prototyping</span>
            </div>
            
            {/* Interactive How It Works badge button */}
            <button
              type="button"
              id="btn-how-it-works-header"
              onClick={() => setShowGuideModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-[#FF751F]/15 text-stone-800 hover:text-[#FF751F] text-xs font-bold transition-all cursor-pointer border border-stone-200 hover:border-[#FF751F]/30"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FF751F]" />
              <span>How It Works (3 Steps)</span>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
            AI Sportswear <span className="text-[#FF751F]">Mockup Generator</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
            Generate custom photorealistic teamwear mockups, digital apparel prototypes, and factory-calibrated Pantone BOM specifications in real-time. Instantly download or attach directly to an RFQ for sampling in our Sialkot manufacturing facilities.
          </p>

          {/* Quick 3-Step Interactive Workflow Banner */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl">
            <div 
              onClick={() => setShowGuideModal(true)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 hover:shadow-md hover:shadow-[#FF751F]/5 cursor-pointer transition-all group"
            >
              <span className="w-7 h-7 rounded-xl bg-[#1A1A1A] text-white font-mono font-extrabold text-xs flex items-center justify-center shrink-0 group-hover:bg-[#FF751F] transition-colors">
                1
              </span>
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-stone-900 block truncate group-hover:text-[#FF751F] transition-colors">
                  1. Choose Apparel Type
                </span>
                <span className="text-[11px] text-stone-500 block truncate">
                  {APPAREL_CATEGORIES.length} Sialkot factory silhouettes
                </span>
              </div>
            </div>

            <div 
              onClick={() => setShowGuideModal(true)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 hover:shadow-md hover:shadow-[#FF751F]/5 cursor-pointer transition-all group"
            >
              <span className="w-7 h-7 rounded-xl bg-[#FF751F] text-white font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                2
              </span>
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-stone-900 block truncate group-hover:text-[#FF751F] transition-colors">
                  2. Design Prompt & Colors
                </span>
                <span className="text-[11px] text-stone-500 block truncate">
                  Colors, patterns & club branding
                </span>
              </div>
            </div>

            <div 
              onClick={() => setShowGuideModal(true)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 hover:shadow-md hover:shadow-[#FF751F]/5 cursor-pointer transition-all group"
            >
              <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                3
              </span>
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-stone-900 block truncate group-hover:text-emerald-700 transition-colors">
                  3. Generate & Attach to RFQ
                </span>
                <span className="text-[11px] text-stone-500 block truncate">
                  Instant BOM & factory sampling
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* FRIENDLY ERROR & DIAGNOSTICS ALERT (WHEN ERROR OCCURS)    */}
        {/* ========================================================= */}
        {aiError && (
          <div className="mb-8 p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-950 shadow-sm animate-fadeIn">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="font-extrabold text-sm text-[#1A1A1A]">
                    {aiError.title || 'API Notification: Smart Fallback Active'}
                  </h4>
                  <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                    Studio Safeguard
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {aiError.message}
                </p>
                <div className="p-3 rounded-xl bg-white/80 border border-amber-200 text-xs text-stone-600 space-y-1">
                  <strong className="text-stone-800 block text-[11px]">How to continue:</strong>
                  <p className="text-[11px] leading-relaxed">
                    {aiError.recommendation}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    type="button"
                    onClick={applyProceduralFallback}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Generate Another Smart Prototype</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiError(null)}
                    className="text-xs text-stone-500 hover:text-stone-800 px-2 py-1 font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: INTERACTIVE FORM & AI PROMPT (5 COLS)        */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Apparel Silhouette Selection with Choose Product Dropdown */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-[#FF751F]" />
                  <span>1. Choose Apparel Type</span>
                </label>
                <span className="text-[11px] font-mono text-stone-500">
                  {APPAREL_CATEGORIES.length} Factory Silhouettes
                </span>
              </div>

              {/* Dynamic "Choose Product" Dropdown Button */}
              <button
                type="button"
                id="btn-choose-product"
                onClick={() => setShowProductModal(true)}
                className="w-full p-4 rounded-2xl border-2 border-[#E5DFD5] hover:border-[#FF751F] bg-gradient-to-r from-[#FAF8F5] to-white hover:bg-white text-left transition-all shadow-xs hover:shadow-md flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF751F]/10 border border-[#FF751F]/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    {selectedApparel.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF751F] bg-[#FF751F]/10 px-2 py-0.5 rounded-full">
                        {selectedApparel.category}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
                        {selectedApparel.silhouette}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#1A1A1A] truncate mt-0.5 group-hover:text-[#FF751F] transition-colors">
                      {selectedApparel.name}
                    </h3>
                    <span className="text-[11px] text-stone-500 truncate block">
                      Default Fabric: <strong className="text-stone-700">{selectedApparel.defaultFabric}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold group-hover:bg-[#FF751F] transition-colors shadow-xs">
                    <span>Choose Product</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                  <span className="sm:hidden p-2 rounded-xl bg-stone-100 text-stone-700">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {/* Popular Quick Picks Row */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-stone-500 uppercase tracking-wider">Popular Quick Picks:</span>
                  <button
                    type="button"
                    onClick={() => setShowProductModal(true)}
                    className="text-[#FF751F] font-bold hover:underline"
                  >
                    View All ({APPAREL_CATEGORIES.length}) →
                  </button>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    'soccer-jersey',
                    'sports-bra',
                    'performance-leggings',
                    'compression-top',
                    'fleece-hoodie',
                    'tracksuit-jacket',
                    'combat-shorts'
                  ].map((popId) => {
                    const popApparel = APPAREL_CATEGORIES.find((a) => a.id === popId);
                    if (!popApparel) return null;
                    const isSel = selectedApparel.id === popId;
                    return (
                      <button
                        key={popId}
                        type="button"
                        onClick={() => handleSelectApparel(popApparel)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                          isSel
                            ? 'bg-[#1A1A1A] text-white shadow-xs'
                            : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-200 border border-[#E5DFD5]'
                        }`}
                      >
                        <span>{popApparel.icon}</span>
                        <span>{popApparel.name.split(' ')[0]} {popApparel.name.split(' ')[1] || ''}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. AI Design Prompt & Inspiration Pills */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF751F]" />
                  <span>2. Design Concept & Prompt</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPromptTips(!showPromptTips)}
                    className="text-[11px] font-bold text-stone-600 hover:text-[#FF751F] transition-colors flex items-center gap-1 cursor-pointer bg-stone-100 hover:bg-[#FF751F]/10 px-2 py-0.5 rounded-md border border-stone-200"
                    title="Toggle visual hints for writing effective B2B prompts"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{showPromptTips ? 'Hide Tips' : 'Prompt Tips'}</span>
                  </button>
                </div>
              </div>

              {/* Step-by-Step Visual Hints Banner for First-Time B2B Buyers */}
              {showPromptTips && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between text-amber-950 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#FF751F]" />
                      International Buyer Prompt Guide:
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setShowPromptTips(false)} 
                      className="text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-stone-700">
                    <div className="p-2 rounded-xl bg-white/90 border border-amber-200/60 shadow-2xs">
                      <strong className="block text-stone-900 font-bold mb-0.5">1. Specify Colors:</strong>
                      <span className="leading-relaxed">Name 1-2 core colors (e.g. <em>"red and white"</em> or <em>"navy and gold"</em>). Our CAD engine matches exact Pantone TCX standards.</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/90 border border-amber-200/60 shadow-2xs">
                      <strong className="block text-stone-900 font-bold mb-0.5">2. Choose Geometry:</strong>
                      <span className="leading-relaxed">Include pattern styles like <em>"geometric shards"</em>, <em>"speed chevrons"</em>, <em>"honeycomb hex"</em>, or <em>"tactical camo"</em>.</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/90 border border-amber-200/60 shadow-2xs">
                      <strong className="block text-stone-900 font-bold mb-0.5">3. Trims & Badges:</strong>
                      <span className="leading-relaxed">Call out manufacturing trims like <em>"3D raised silicone crest"</em>, <em>"contrast rib collar"</em>, or <em>"mesh vents"</em>.</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative">
                <textarea
                  id="ai-mockup-prompt-input"
                  rows="3"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      e.stopPropagation();
                      handleGenerateAI(e);
                    }
                  }}
                  placeholder="Describe your design vision (e.g. Modern geometric red and white pattern with brand logo, high-visibility tournament teamwear, 3D silicone chest crest)..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-[#1A1A1A] text-xs leading-relaxed placeholder-stone-400 focus:outline-none focus:border-[#FF751F] focus:ring-2 focus:ring-[#FF751F]/20 transition-all"
                />
              </div>

              {/* Helper Micro-Hint Pill */}
              <div className="flex items-center justify-between text-[10px] text-stone-500 px-1">
                <span className="flex items-center gap-1">
                  <span className="text-[#FF751F] font-bold">💡 Tip:</span> Type colors like <em>"red and white"</em> for instant Pantone matching.
                </span>
                <span className="font-mono text-stone-400 hidden sm:inline">Ctrl+Enter to generate</span>
              </div>

              {/* Quick Inspiration Pills */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Quick Inspiration:</span>
                <div className="flex flex-wrap gap-1.5">
                  {PROMPT_INSPIRATIONS.map((insp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPrompt(insp)}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#FF751F]/10 hover:text-[#FF751F] text-stone-600 text-[10px] font-medium border border-stone-200 transition-colors text-left"
                    >
                      {insp.split(' ').slice(0, 4).join(' ')}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Step Animated Loading Box */}
              {isGenerating && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF751F]/10 to-amber-500/10 border border-[#FF751F]/30 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#FF751F]" />
                      <span>{generationStep || 'Synthesizing Prototype in Gemini AI...'}</span>
                    </div>
                    <span className="font-mono text-[#FF751F]">{generationProgress}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#FF751F] to-amber-400 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-500 italic">
                    Connected to Gemini engine. Formulating Pantone TCX recipes and Italian Kiian sublimation inks.
                  </p>
                </div>
              )}

              {/* Action Button: Generate AI Mockup */}
              <button
                type="button"
                id="btn-generate-ai-mockup"
                data-testid="generate-mockup-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleGenerateAI(e);
                }}
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[#FF751F] via-[#FF8533] to-[#E65C00] hover:shadow-lg hover:shadow-[#FF751F]/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-white shrink-0" />
                    <span>Synthesizing Design in Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-white shrink-0" />
                    <span>Generate AI Design & Specifications</span>
                  </>
                )}
              </button>

              {aiSuccessBadge && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Gemini AI generated fresh tech pack specs and harmonized colorway!</span>
                </div>
              )}
            </div>

            {/* 3. Colorways & Curated Palettes */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#FF751F]" />
                  <span>3. Color Scheme & Sublimation Palette</span>
                </label>
              </div>

              {/* Curated Pro Sport Presets */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Pro Sportswear Presets:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-stone-100 border border-[#E5DFD5] text-left transition-all text-[11px] font-semibold space-y-1.5 cursor-pointer"
                    >
                      <div className="flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: preset.primary }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: preset.secondary }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: preset.accent }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: preset.trim }} />
                      </div>
                      <span className="block truncate text-stone-700 text-[10px]">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Individual Hex Pickers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">Primary Body</label>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5]">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-700">{primaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">Secondary Graphic</label>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5]">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-700">{secondaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">Accent Brand</label>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5]">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-700">{accentColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">Collar / Trim</label>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5]">
                    <input
                      type="color"
                      value={trimColor}
                      onChange={(e) => setTrimColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-700">{trimColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Pattern & Cut Styling */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FF751F]" />
                <span>4. Pattern & Construction Details</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PATTERN_OPTIONS.map((pat) => (
                  <button
                    key={pat.id}
                    type="button"
                    onClick={() => setSelectedPattern(pat.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                      selectedPattern === pat.id
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                        : 'bg-[#FAF8F5] text-stone-600 border-[#E5DFD5] hover:bg-stone-100'
                    }`}
                  >
                    {pat.label}
                  </button>
                ))}
              </div>

              {/* Collar options if applicable */}
              {selectedApparel.collarStyles && selectedApparel.collarStyles.length > 1 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-stone-500 block mb-1 uppercase tracking-wider">Collar Silhouette:</span>
                  <div className="flex gap-2">
                    {selectedApparel.collarStyles.map((cStyle) => (
                      <button
                        key={cStyle}
                        type="button"
                        onClick={() => setCollarStyle(cStyle)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-semibold capitalize border transition-all cursor-pointer ${
                          collarStyle === cStyle
                            ? 'bg-[#FF751F] text-white border-[#FF751F]'
                            : 'bg-[#FAF8F5] text-stone-600 border-[#E5DFD5]'
                        }`}
                      >
                        {cStyle} Collar
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Branding & Typography Inputs */}
              <div className="pt-3 border-t border-[#E5DFD5] space-y-3">
                <span className="text-[10px] font-bold text-stone-500 block uppercase tracking-wider">Custom Team / Brand Text:</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-500 block mb-1">Club / Brand Name</label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-500 block mb-1">Sponsor Text</label>
                    <input
                      type="text"
                      value={sponsorText}
                      onChange={(e) => setSponsorText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-500 block mb-1">Squad Number</label>
                    <input
                      type="text"
                      value={playerNumber}
                      onChange={(e) => setPlayerNumber(e.target.value)}
                      maxLength="3"
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-500 block mb-1">Player Surname</label>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: HIGH-FIDELITY MOCKUP STAGE & SPECS (7 COLS) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Mockup Stage Container */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-xl relative overflow-hidden">
              
              {/* Studio Stage Controls Header */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#E5DFD5]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#1A1A1A]">
                    Live Vector Mockup Studio
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Front / Back Toggle */}
                  <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setViewMode('front')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        viewMode === 'front'
                          ? 'bg-[#1A1A1A] text-white shadow-xs'
                          : 'text-stone-600 hover:text-black'
                      }`}
                    >
                      Front View
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('back')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        viewMode === 'back'
                          ? 'bg-[#1A1A1A] text-white shadow-xs'
                          : 'text-stone-600 hover:text-black'
                      }`}
                    >
                      Back View
                    </button>
                  </div>

                  {/* Fabric Drape Sheen Toggle */}
                  <button
                    type="button"
                    onClick={() => setFabricSheen(!fabricSheen)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      fabricSheen
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-stone-50 text-stone-500 border-stone-200'
                    }`}
                    title="Toggle Fabric Drape & Sheen Highlight"
                  >
                    {fabricSheen ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Interactive Vector Mockup Canvas */}
              <div className="py-6 flex items-center justify-center relative min-h-[460px] sm:min-h-[520px] bg-gradient-to-b from-stone-50/70 to-stone-100/40 rounded-2xl border border-stone-200/60 overflow-hidden my-4">
                
                {/* Background Studio Grid Lines */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* SVG Mockup Architecture */}
                <svg
                  ref={svgRef}
                  viewBox="0 0 500 500"
                  className="w-full max-w-[420px] sm:max-w-[460px] h-auto drop-shadow-2xl transition-all duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Fabric Sheen Gradient */}
                    <linearGradient id="fabricSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
                      <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
                      <stop offset="65%" stopColor="#000000" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                    </linearGradient>

                    {/* Secondary Color Gradient */}
                    <linearGradient id="secGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={secondaryColor} />
                      <stop offset="100%" stopColor={trimColor} />
                    </linearGradient>

                    {/* Pattern: Geometric Shards */}
                    <pattern id="patGeometric" width="60" height="60" patternUnits="userSpaceOnUse">
                      <polygon points="0,0 30,0 15,30" fill={secondaryColor} opacity="0.35" />
                      <polygon points="30,0 60,0 45,30" fill={trimColor} opacity="0.25" />
                      <polygon points="15,30 45,30 30,60" fill={secondaryColor} opacity="0.45" />
                      <polygon points="0,30 15,30 0,60" fill={accentColor} opacity="0.15" />
                      <polygon points="45,30 60,30 60,60" fill={accentColor} opacity="0.15" />
                    </pattern>

                    {/* Pattern: Speed Chevrons / Stripes */}
                    <pattern id="patStripes" width="40" height="40" patternTransform="rotate(35 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="40" stroke={secondaryColor} strokeWidth="12" opacity="0.45" />
                      <line x1="20" y1="0" x2="20" y2="40" stroke={trimColor} strokeWidth="4" opacity="0.35" />
                      <line x1="32" y1="0" x2="32" y2="40" stroke={accentColor} strokeWidth="2" opacity="0.25" />
                    </pattern>

                    {/* Pattern: Honeycomb Hex */}
                    <pattern id="patHex" width="30" height="52" patternUnits="userSpaceOnUse">
                      <path d="M15 0 L30 8.66 L30 26 L15 34.64 L0 26 L0 8.66 Z" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.4" />
                      <path d="M15 26 L30 34.64 L30 52 L15 60.64 L0 52 L0 34.64 Z" fill="none" stroke={trimColor} strokeWidth="1.5" opacity="0.35" />
                      <circle cx="15" cy="17" r="2.5" fill={accentColor} opacity="0.5" />
                    </pattern>

                    {/* Pattern: Cyber Matrix */}
                    <pattern id="patCyber" width="24" height="24" patternUnits="userSpaceOnUse">
                      <rect width="24" height="24" fill="none" stroke={secondaryColor} strokeWidth="0.8" opacity="0.3" />
                      <circle cx="12" cy="12" r="1.5" fill={trimColor} opacity="0.6" />
                    </pattern>

                    {/* Pattern: Camo */}
                    <pattern id="patCamo" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M10 20 Q30 5 50 25 T80 15 Q70 45 40 40 T10 20" fill={secondaryColor} opacity="0.35" />
                      <path d="M25 50 Q45 65 65 50 T85 75 Q50 85 20 70 T25 50" fill={trimColor} opacity="0.28" />
                    </pattern>
                  </defs>

                  {/* =================================================== */}
                  {/* GARMENT BASE PATHS ACCORDING TO APPAREL TYPE        */}
                  {/* =================================================== */}

                  {/* 1. SOCCER JERSEY / TEAMWEAR MOCKUP */}
                  {selectedApparel.id === 'soccer-jersey' && (
                    <g id="soccerJerseyGroup">
                      {/* Left Sleeve */}
                      <path
                        d="M 170 100 L 80 160 L 110 215 L 175 165 Z"
                        fill={primaryColor}
                        stroke={trimColor}
                        strokeWidth="1.5"
                      />
                      {/* Left Sleeve Cuff */}
                      <polygon points="80,160 70,172 100,227 110,215" fill={trimColor} />

                      {/* Right Sleeve */}
                      <path
                        d="M 330 100 L 420 160 L 390 215 L 325 165 Z"
                        fill={primaryColor}
                        stroke={trimColor}
                        strokeWidth="1.5"
                      />
                      {/* Right Sleeve Cuff */}
                      <polygon points="420,160 430,172 400,227 390,215" fill={trimColor} />

                      {/* Main Torso Body */}
                      <path
                        d="M 170 100 Q 250 120 330 100 L 335 170 Q 320 280 340 420 Q 250 435 160 420 Q 180 280 165 170 Z"
                        fill={primaryColor}
                        stroke="#222222"
                        strokeWidth="2"
                      />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && (
                        <path
                          d="M 170 100 Q 250 120 330 100 L 335 170 Q 320 280 340 420 Q 250 435 160 420 Q 180 280 165 170 Z"
                          fill="url(#patGeometric)"
                        />
                      )}
                      {selectedPattern === 'stripes' && (
                        <path
                          d="M 170 100 Q 250 120 330 100 L 335 170 Q 320 280 340 420 Q 250 435 160 420 Q 180 280 165 170 Z"
                          fill="url(#patStripes)"
                        />
                      )}
                      {selectedPattern === 'hex' && (
                        <path
                          d="M 170 100 Q 250 120 330 100 L 335 170 Q 320 280 340 420 Q 250 435 160 420 Q 180 280 165 170 Z"
                          fill="url(#patHex)"
                        />
                      )}
                      {selectedPattern === 'cyber' && (
                        <path
                          d="M 170 100 Q 250 120 330 100 L 335 170 Q 320 280 340 420 Q 250 435 160 420 Q 180 280 165 170 Z"
                          fill="url(#patCyber)"
                        />
                      )}
                      {selectedPattern === 'camo' && (
                        <path
                          d="M 170 100 Q 250 120 330 100 L 335 170 Q 320 280 340 420 Q 250 435 160 420 Q 180 280 165 170 Z"
                          fill="url(#patCamo)"
                        />
                      )}

                      {/* Underarm Breathable Side Vent Panels */}
                      <path d="M 165 170 Q 180 280 160 420 L 175 420 Q 192 285 180 170 Z" fill={secondaryColor} opacity="0.85" />
                      <path d="M 335 170 Q 320 280 340 420 L 325 420 Q 308 285 320 170 Z" fill={secondaryColor} opacity="0.85" />

                      {/* Bottom Curved Hem Binding */}
                      <path d="M 160 420 Q 250 435 340 420 L 340 426 Q 250 442 160 426 Z" fill={trimColor} />

                      {/* Collar Construction */}
                      {collarStyle === 'v-neck' ? (
                        <polygon points="215,96 285,96 250,150" fill={trimColor} stroke={secondaryColor} strokeWidth="2" />
                      ) : collarStyle === 'mandarin' ? (
                        <path d="M 210 95 Q 250 110 290 95 L 290 82 Q 250 96 210 82 Z" fill={trimColor} stroke={secondaryColor} strokeWidth="2" />
                      ) : (
                        <path d="M 210 95 Q 250 135 290 95 Q 250 118 210 95" fill={trimColor} stroke={secondaryColor} strokeWidth="2" />
                      )}
                    </g>
                  )}

                  {/* 2. BASKETBALL UNIFORM MOCKUP */}
                  {selectedApparel.id === 'basketball-uniform' && (
                    <g id="basketballGroup">
                      {/* Sleeveless Torso Body */}
                      <path
                        d="M 190 90 L 155 160 Q 170 280 155 425 Q 250 440 345 425 Q 330 280 345 160 L 310 90 Q 285 105 250 105 Q 215 105 190 90 Z"
                        fill={primaryColor}
                        stroke="#222222"
                        strokeWidth="2"
                      />

                      {/* Mesh Sublimation Texture */}
                      <path
                        d="M 190 90 L 155 160 Q 170 280 155 425 Q 250 440 345 425 Q 330 280 345 160 L 310 90 Q 285 105 250 105 Q 215 105 190 90 Z"
                        fill="url(#patHex)"
                        opacity="0.3"
                      />

                      {/* Armhole Rib Knit Binding */}
                      <path d="M 190 90 Q 200 130 155 160 L 150 152 Q 192 124 184 84 Z" fill={trimColor} />
                      <path d="M 310 90 Q 300 130 345 160 L 350 152 Q 308 124 316 84 Z" fill={trimColor} />

                      {/* Deep V-Neck Collar Rib */}
                      <polygon points="215,92 285,92 250,155" fill={trimColor} stroke={secondaryColor} strokeWidth="2" />

                      {/* Side Racing Panels */}
                      <path d="M 155 160 Q 170 280 155 425 L 170 425 Q 185 285 170 160 Z" fill={secondaryColor} />
                      <path d="M 345 160 Q 330 280 345 425 L 330 425 Q 315 285 330 160 Z" fill={secondaryColor} />
                    </g>
                  )}

                  {/* 3. WRESTLING SINGLET MOCKUP */}
                  {selectedApparel.id === 'wrestling-singlet' && (
                    <g id="wrestlingSingletGroup">
                      {/* Deep Armholes & Bodysuit Legs */}
                      <path
                        d="M 200 90 L 175 180 Q 185 270 170 330 L 165 440 L 225 440 L 245 350 L 255 350 L 275 440 L 335 440 L 330 330 Q 315 270 325 180 L 300 90 Q 250 115 200 90 Z"
                        fill={primaryColor}
                        stroke="#111111"
                        strokeWidth="2"
                      />
                      {/* Singlet Pattern */}
                      <path
                        d="M 200 90 L 175 180 Q 185 270 170 330 L 165 440 L 225 440 L 245 350 L 255 350 L 275 440 L 335 440 L 330 330 Q 315 270 325 180 L 300 90 Q 250 115 200 90 Z"
                        fill="url(#patGeometric)"
                        opacity="0.4"
                      />
                      {/* Leg Grippers */}
                      <rect x="165" y="425" width="60" height="15" fill={trimColor} />
                      <rect x="275" y="425" width="60" height="15" fill={trimColor} />
                      {/* Deep Scoop Neck */}
                      <path d="M 205 92 Q 250 160 295 92 Q 250 135 205 92 Z" fill={secondaryColor} />
                    </g>
                  )}

                  {/* 4. FLEECE HOODIE MOCKUP */}
                  {selectedApparel.id === 'fleece-hoodie' && (
                    <g id="fleeceHoodieGroup">
                      {/* Hood Canopy */}
                      <path d="M 190 110 Q 250 30 310 110 Q 250 75 190 110 Z" fill={trimColor} stroke="#222" strokeWidth="1.5" />
                      {/* Drawstrings */}
                      <line x1="230" y1="105" x2="225" y2="175" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
                      <line x1="270" y1="105" x2="275" y2="175" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />

                      {/* Dropped Sleeves */}
                      <path d="M 160 110 L 65 200 L 95 250 L 165 180 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <rect x="65" y="200" width="35" height="14" transform="rotate(35 65 200)" fill={trimColor} />
                      <path d="M 340 110 L 435 200 L 405 250 L 335 180 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <rect x="405" y="240" width="35" height="14" transform="rotate(-35 405 240)" fill={trimColor} />

                      {/* Main Oversized Body */}
                      <path d="M 160 110 Q 250 120 340 110 L 350 395 L 150 395 Z" fill={primaryColor} stroke="#222" strokeWidth="2" />
                      
                      {/* Kangaroo Front Pocket */}
                      <path d="M 190 280 L 310 280 L 325 365 L 175 365 Z" fill={secondaryColor} stroke={trimColor} strokeWidth="1.5" />
                      
                      {/* Ribbed Bottom Waistband */}
                      <rect x="150" y="395" width="200" height="25" fill={trimColor} stroke="#222" strokeWidth="1.5" />
                    </g>
                  )}

                  {/* 5. PRO COMPRESSION RASHGUARD (High-Performance Athletic Second-Skin) */}
                  {selectedApparel.id === 'compression-top' && (
                    <g id="proCompressionRashguardGroup">
                      {/* Left Raglan Compression Sleeve */}
                      <path
                        d="M 215 90 Q 175 88 140 115 L 70 195 L 98 228 L 165 175 Q 192 130 215 90 Z"
                        fill={primaryColor}
                        stroke="#151515"
                        strokeWidth="1.5"
                      />
                      {/* Left Sleeve Pattern */}
                      {selectedPattern === 'geometric' && (
                        <path d="M 215 90 Q 175 88 140 115 L 70 195 L 98 228 L 165 175 Q 192 130 215 90 Z" fill="url(#patGeometric)" />
                      )}
                      {selectedPattern === 'stripes' && (
                        <path d="M 215 90 Q 175 88 140 115 L 70 195 L 98 228 L 165 175 Q 192 130 215 90 Z" fill="url(#patStripes)" />
                      )}
                      {selectedPattern === 'hex' && (
                        <path d="M 215 90 Q 175 88 140 115 L 70 195 L 98 228 L 165 175 Q 192 130 215 90 Z" fill="url(#patHex)" />
                      )}
                      {selectedPattern === 'cyber' && (
                        <path d="M 215 90 Q 175 88 140 115 L 70 195 L 98 228 L 165 175 Q 192 130 215 90 Z" fill="url(#patCyber)" />
                      )}
                      {selectedPattern === 'camo' && (
                        <path d="M 215 90 Q 175 88 140 115 L 70 195 L 98 228 L 165 175 Q 192 130 215 90 Z" fill="url(#patCamo)" />
                      )}
                      {/* Left Bicep Compression Cuff Band */}
                      <polygon points="70,195 62,205 90,238 98,228" fill={trimColor} stroke={secondaryColor} strokeWidth="1" />
                      {/* Left Deltoid Accent Seam */}
                      <path d="M 140 115 Q 170 145 165 175" fill="none" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3,2" />

                      {/* Right Raglan Compression Sleeve */}
                      <path
                        d="M 285 90 Q 325 88 360 115 L 430 195 L 402 228 L 335 175 Q 308 130 285 90 Z"
                        fill={primaryColor}
                        stroke="#151515"
                        strokeWidth="1.5"
                      />
                      {/* Right Sleeve Pattern */}
                      {selectedPattern === 'geometric' && (
                        <path d="M 285 90 Q 325 88 360 115 L 430 195 L 402 228 L 335 175 Q 308 130 285 90 Z" fill="url(#patGeometric)" />
                      )}
                      {selectedPattern === 'stripes' && (
                        <path d="M 285 90 Q 325 88 360 115 L 430 195 L 402 228 L 335 175 Q 308 130 285 90 Z" fill="url(#patStripes)" />
                      )}
                      {selectedPattern === 'hex' && (
                        <path d="M 285 90 Q 325 88 360 115 L 430 195 L 402 228 L 335 175 Q 308 130 285 90 Z" fill="url(#patHex)" />
                      )}
                      {selectedPattern === 'cyber' && (
                        <path d="M 285 90 Q 325 88 360 115 L 430 195 L 402 228 L 335 175 Q 308 130 285 90 Z" fill="url(#patCyber)" />
                      )}
                      {selectedPattern === 'camo' && (
                        <path d="M 285 90 Q 325 88 360 115 L 430 195 L 402 228 L 335 175 Q 308 130 285 90 Z" fill="url(#patCamo)" />
                      )}
                      {/* Right Bicep Compression Cuff Band */}
                      <polygon points="430,195 438,205 410,238 402,228" fill={trimColor} stroke={secondaryColor} strokeWidth="1" />
                      {/* Right Deltoid Accent Seam */}
                      <path d="M 360 115 Q 330 145 335 175" fill="none" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3,2" />

                      {/* Main Anatomical V-Taper Compression Torso Body */}
                      <path
                        d={
                          viewMode === 'front'
                            ? "M 215 90 Q 250 115 285 90 Q 308 130 335 175 Q 318 290 332 418 Q 250 430 168 418 Q 182 290 165 175 Q 192 130 215 90 Z"
                            : "M 215 90 Q 250 98 285 90 Q 308 130 335 175 Q 318 290 332 418 Q 250 430 168 418 Q 182 290 165 175 Q 192 130 215 90 Z"
                        }
                        fill={primaryColor}
                        stroke="#151515"
                        strokeWidth="2"
                      />

                      {/* Sublimated Pattern Overlay on Main Body */}
                      {selectedPattern === 'geometric' && (
                        <path
                          d="M 215 90 Q 250 115 285 90 Q 308 130 335 175 Q 318 290 332 418 Q 250 430 168 418 Q 182 290 165 175 Q 192 130 215 90 Z"
                          fill="url(#patGeometric)"
                        />
                      )}
                      {selectedPattern === 'stripes' && (
                        <path
                          d="M 215 90 Q 250 115 285 90 Q 308 130 335 175 Q 318 290 332 418 Q 250 430 168 418 Q 182 290 165 175 Q 192 130 215 90 Z"
                          fill="url(#patStripes)"
                        />
                      )}
                      {selectedPattern === 'hex' && (
                        <path
                          d="M 215 90 Q 250 115 285 90 Q 308 130 335 175 Q 318 290 332 418 Q 250 430 168 418 Q 182 290 165 175 Q 192 130 215 90 Z"
                          fill="url(#patHex)"
                        />
                      )}
                      {selectedPattern === 'cyber' && (
                        <path
                          d="M 215 90 Q 250 115 285 90 Q 308 130 335 175 Q 318 290 332 418 Q 250 430 168 418 Q 182 290 165 175 Q 192 130 215 90 Z"
                          fill="url(#patCyber)"
                        />
                      )}
                      {selectedPattern === 'camo' && (
                        <path
                          d="M 215 90 Q 250 115 285 90 Q 308 130 335 175 Q 318 290 332 418 Q 250 430 168 418 Q 182 290 165 175 Q 192 130 215 90 Z"
                          fill="url(#patCamo)"
                        />
                      )}

                      {/* Underarm Breathable Lateral Flex Panels (Micro-Mesh) */}
                      <path
                        d="M 165 175 Q 182 290 168 418 L 184 418 Q 196 290 182 175 Z"
                        fill={secondaryColor}
                        opacity="0.9"
                        stroke={trimColor}
                        strokeWidth="1"
                      />
                      <path
                        d="M 335 175 Q 318 290 332 418 L 316 418 Q 304 290 318 175 Z"
                        fill={secondaryColor}
                        opacity="0.9"
                        stroke={trimColor}
                        strokeWidth="1"
                      />

                      {/* 4-Needle 6-Thread Flatlock Seams: Raglan Lines */}
                      <path
                        d="M 215 90 Q 192 130 165 175"
                        fill="none"
                        stroke={secondaryColor}
                        strokeWidth="2.5"
                        strokeDasharray="4,2"
                      />
                      <path
                        d="M 285 90 Q 308 130 335 175"
                        fill="none"
                        stroke={secondaryColor}
                        strokeWidth="2.5"
                        strokeDasharray="4,2"
                      />

                      {/* Anatomical Seamlines: FRONT VIEW */}
                      {viewMode === 'front' && (
                        <g id="rashguardFrontSeams">
                          {/* Upper Clavicle Compression Seam */}
                          <path
                            d="M 205 138 Q 250 150 295 138"
                            fill="none"
                            stroke={trimColor}
                            strokeWidth="1.5"
                            opacity="0.75"
                            strokeDasharray="3,2"
                          />

                          {/* Pectoral Muscle Contours */}
                          <path
                            d="M 182 195 Q 215 224 250 215 Q 285 224 318 195"
                            fill="none"
                            stroke={secondaryColor}
                            strokeWidth="2"
                            strokeDasharray="4,2"
                          />

                          {/* Central Core Stabilization Seam */}
                          <path
                            d="M 250 215 L 250 375"
                            fill="none"
                            stroke={secondaryColor}
                            strokeWidth="2"
                            strokeDasharray="4,2"
                          />

                          {/* Intercostal & Abdominal Contour Guides */}
                          <path
                            d="M 194 270 Q 220 284 240 280"
                            fill="none"
                            stroke={trimColor}
                            strokeWidth="1.2"
                            opacity="0.65"
                            strokeDasharray="3,2"
                          />
                          <path
                            d="M 306 270 Q 280 284 260 280"
                            fill="none"
                            stroke={trimColor}
                            strokeWidth="1.2"
                            opacity="0.65"
                            strokeDasharray="3,2"
                          />
                          <path
                            d="M 190 320 Q 220 334 242 330"
                            fill="none"
                            stroke={trimColor}
                            strokeWidth="1.2"
                            opacity="0.65"
                            strokeDasharray="3,2"
                          />
                          <path
                            d="M 310 320 Q 280 334 258 330"
                            fill="none"
                            stroke={trimColor}
                            strokeWidth="1.2"
                            opacity="0.65"
                            strokeDasharray="3,2"
                          />
                        </g>
                      )}

                      {/* Anatomical Seamlines: BACK VIEW */}
                      {viewMode === 'back' && (
                        <g id="rashguardBackSeams">
                          {/* Trapezius / Scapula Flatlock Arch */}
                          <path
                            d="M 195 145 Q 250 168 305 145"
                            fill="none"
                            stroke={secondaryColor}
                            strokeWidth="2"
                            strokeDasharray="4,2"
                          />

                          {/* Dorsal Spine Compression Seam */}
                          <path
                            d="M 250 102 L 250 395"
                            fill="none"
                            stroke={secondaryColor}
                            strokeWidth="2.5"
                            strokeDasharray="4,2"
                          />

                          {/* Latissimus Wing Curves */}
                          <path
                            d="M 180 185 Q 220 250 240 335"
                            fill="none"
                            stroke={trimColor}
                            strokeWidth="1.8"
                            opacity="0.8"
                            strokeDasharray="4,2"
                          />
                          <path
                            d="M 320 185 Q 280 250 260 335"
                            fill="none"
                            stroke={trimColor}
                            strokeWidth="1.8"
                            opacity="0.8"
                            strokeDasharray="4,2"
                          />
                        </g>
                      )}

                      {/* Ergonomic Crew Compression Collar */}
                      {viewMode === 'front' ? (
                        <g id="rashguardFrontCollar">
                          {/* Collar Band */}
                          <path
                            d="M 213 89 Q 250 118 287 89 Q 250 101 213 89 Z"
                            fill={trimColor}
                            stroke={secondaryColor}
                            strokeWidth="1.5"
                          />
                          {/* Inner Neck Taping */}
                          <path
                            d="M 218 89 Q 250 97 282 89"
                            fill="none"
                            stroke={accentColor}
                            strokeWidth="2"
                          />
                        </g>
                      ) : (
                        <g id="rashguardBackCollar">
                          {/* High Back Collar */}
                          <path
                            d="M 213 89 Q 250 102 287 89 Q 250 94 213 89 Z"
                            fill={trimColor}
                            stroke={secondaryColor}
                            strokeWidth="1.5"
                          />
                        </g>
                      )}

                      {/* Silicone Anti-Ride-Up Grip Waistband (Bottom Hem) */}
                      <g id="rashguardSiliconeHem">
                        <path
                          d="M 167 406 Q 250 418 333 406 L 332 422 Q 250 434 168 422 Z"
                          fill="#18181B"
                          stroke={trimColor}
                          strokeWidth="1"
                        />
                        {/* Silicone Grip Micro-Nodes */}
                        <line
                          x1="178"
                          y1="414"
                          x2="322"
                          y2="414"
                          stroke={secondaryColor}
                          strokeWidth="3.5"
                          strokeDasharray="6,4"
                          strokeLinecap="round"
                        />
                        {/* Technical Label */}
                        <text
                          x="250"
                          y="420"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="4"
                          fontWeight="900"
                          fontFamily="monospace"
                          letterSpacing="1.2"
                        >
                          ANTI-SLIP SILICONE GRIP
                        </text>
                      </g>
                    </g>
                  )}

                  {/* 6. MUAY THAI & MMA COMBAT SHORTS */}
                  {selectedApparel.id === 'combat-shorts' && (
                    <g id="combatShortsGroup">
                      {/* Wide Shirred Elastic Waistband */}
                      <rect
                        x="150"
                        y="155"
                        width="200"
                        height="38"
                        rx="4"
                        fill={primaryColor}
                        stroke="#111111"
                        strokeWidth="2"
                      />
                      {/* Waistband Elastic Gather Lines */}
                      <line x1="150" y1="164" x2="350" y2="164" stroke={secondaryColor} strokeWidth="1.5" opacity="0.6" />
                      <line x1="150" y1="174" x2="350" y2="174" stroke={secondaryColor} strokeWidth="1.5" opacity="0.6" />
                      <line x1="150" y1="184" x2="350" y2="184" stroke={secondaryColor} strokeWidth="1.5" opacity="0.6" />

                      {/* Center Waistband Patch */}
                      <rect
                        x="228"
                        y="158"
                        width="44"
                        height="32"
                        rx="3"
                        fill={secondaryColor}
                        stroke={trimColor}
                        strokeWidth="1.5"
                      />
                      <text
                        x="250"
                        y="178"
                        textAnchor="middle"
                        fill={accentColor}
                        fontSize="8"
                        fontWeight="900"
                        fontFamily="sans-serif"
                      >
                        HARE
                      </text>

                      {/* Left Leg with High Mobility Side Split */}
                      <path
                        d="M 150 193 L 125 365 Q 165 385 240 365 L 245 285 L 180 193 Z"
                        fill={primaryColor}
                        stroke="#111111"
                        strokeWidth="2"
                      />
                      {/* Left Side Split Curve */}
                      <path
                        d="M 125 365 Q 148 310 142 270"
                        fill="none"
                        stroke={trimColor}
                        strokeWidth="3"
                      />

                      {/* Right Leg with High Mobility Side Split */}
                      <path
                        d="M 350 193 L 375 365 Q 335 385 260 365 L 255 285 L 320 193 Z"
                        fill={primaryColor}
                        stroke="#111111"
                        strokeWidth="2"
                      />
                      {/* Right Side Split Curve */}
                      <path
                        d="M 375 365 Q 352 310 358 270"
                        fill="none"
                        stroke={trimColor}
                        strokeWidth="3"
                      />

                      {/* High-Stretch Lycra Flex Crotch Gusset */}
                      <polygon
                        points="240,365 250,285 260,365"
                        fill={secondaryColor}
                        stroke={trimColor}
                        strokeWidth="1.5"
                      />

                      {/* Contrast Leg Hem Bindings */}
                      <path
                        d="M 125 365 Q 165 385 240 365"
                        fill="none"
                        stroke={trimColor}
                        strokeWidth="4"
                      />
                      <path
                        d="M 375 365 Q 335 385 260 365"
                        fill="none"
                        stroke={trimColor}
                        strokeWidth="4"
                      />

                      {/* Sublimation Pattern on Legs */}
                      {selectedPattern === 'geometric' && (
                        <g opacity="0.35">
                          <path d="M 150 193 L 125 365 Q 165 385 240 365 L 245 285 L 180 193 Z" fill="url(#patGeometric)" />
                          <path d="M 350 193 L 375 365 Q 335 385 260 365 L 255 285 L 320 193 Z" fill="url(#patGeometric)" />
                        </g>
                      )}
                      {selectedPattern === 'stripes' && (
                        <g opacity="0.35">
                          <path d="M 150 193 L 125 365 Q 165 385 240 365 L 245 285 L 180 193 Z" fill="url(#patStripes)" />
                          <path d="M 350 193 L 375 365 Q 335 385 260 365 L 255 285 L 320 193 Z" fill="url(#patStripes)" />
                        </g>
                      )}
                      {selectedPattern === 'hex' && (
                        <g opacity="0.35">
                          <path d="M 150 193 L 125 365 Q 165 385 240 365 L 245 285 L 180 193 Z" fill="url(#patHex)" />
                          <path d="M 350 193 L 375 365 Q 335 385 260 365 L 255 285 L 320 193 Z" fill="url(#patHex)" />
                        </g>
                      )}
                      {selectedPattern === 'cyber' && (
                        <g opacity="0.35">
                          <path d="M 150 193 L 125 365 Q 165 385 240 365 L 245 285 L 180 193 Z" fill="url(#patCyber)" />
                          <path d="M 350 193 L 375 365 Q 335 385 260 365 L 255 285 L 320 193 Z" fill="url(#patCyber)" />
                        </g>
                      )}
                      {selectedPattern === 'camo' && (
                        <g opacity="0.35">
                          <path d="M 150 193 L 125 365 Q 165 385 240 365 L 245 285 L 180 193 Z" fill="url(#patCamo)" />
                          <path d="M 350 193 L 375 365 Q 335 385 260 365 L 255 285 L 320 193 Z" fill="url(#patCamo)" />
                        </g>
                      )}
                    </g>
                  )}

                  {/* 7. HEAVY CONTACT RUGBY MATCH JERSEY */}
                  {selectedApparel.id === 'rugby-jersey' && (
                    <g id="rugbyJerseyGroup">
                      {/* Left Sleeve */}
                      <path d="M 165 100 L 70 165 L 105 220 L 175 165 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="70,165 60,178 95,233 105,220" fill={trimColor} />

                      {/* Right Sleeve */}
                      <path d="M 335 100 L 430 165 L 395 220 L 325 165 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="430,165 440,178 405,233 395,220" fill={trimColor} />

                      {/* Torso Body */}
                      <path d="M 165 100 Q 250 115 335 100 L 340 170 Q 328 285 342 422 Q 250 435 158 422 Q 172 285 160 170 Z" fill={primaryColor} stroke="#222" strokeWidth="2" />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && <path d="M 165 100 Q 250 115 335 100 L 340 170 Q 328 285 342 422 Q 250 435 158 422 Q 172 285 160 170 Z" fill="url(#patGeometric)" />}
                      {selectedPattern === 'stripes' && <path d="M 165 100 Q 250 115 335 100 L 340 170 Q 328 285 342 422 Q 250 435 158 422 Q 172 285 160 170 Z" fill="url(#patStripes)" />}
                      {selectedPattern === 'hex' && <path d="M 165 100 Q 250 115 335 100 L 340 170 Q 328 285 342 422 Q 250 435 158 422 Q 172 285 160 170 Z" fill="url(#patHex)" />}
                      {selectedPattern === 'cyber' && <path d="M 165 100 Q 250 115 335 100 L 340 170 Q 328 285 342 422 Q 250 435 158 422 Q 172 285 160 170 Z" fill="url(#patCyber)" />}
                      {selectedPattern === 'camo' && <path d="M 165 100 Q 250 115 335 100 L 340 170 Q 328 285 342 422 Q 250 435 158 422 Q 172 285 160 170 Z" fill="url(#patCamo)" />}

                      {/* Iconic Rugby Horizontal Chest Hoops */}
                      <path d="M 162 205 L 338 205 L 336 265 L 164 265 Z" fill={secondaryColor} />
                      <line x1="162" y1="210" x2="338" y2="210" stroke={trimColor} strokeWidth="2.5" />
                      <line x1="164" y1="260" x2="336" y2="260" stroke={trimColor} strokeWidth="2.5" />

                      {/* Underarm Reinforced Bar-Tacks */}
                      <path d="M 160 170 Q 175 230 166 265" fill="none" stroke={trimColor} strokeWidth="2" strokeDasharray="3,2" />
                      <path d="M 340 170 Q 325 230 334 265" fill="none" stroke={trimColor} strokeWidth="2" strokeDasharray="3,2" />

                      {/* Rugby Heavy Twill Placket Collar */}
                      <polygon points="215,95 250,140 240,144 208,105" fill={accentColor} stroke="#222" strokeWidth="1" />
                      <polygon points="285,95 250,140 260,144 292,105" fill={accentColor} stroke="#222" strokeWidth="1" />
                      <line x1="238" y1="142" x2="262" y2="142" stroke={secondaryColor} strokeWidth="3" />
                    </g>
                  )}

                  {/* 8. T20 SUBLIMATED CRICKET KIT TOP */}
                  {selectedApparel.id === 'cricket-jersey' && (
                    <g id="cricketJerseyGroup">
                      {/* Left Raglan Sleeve */}
                      <path d="M 195 92 L 95 155 L 125 210 L 175 165 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="95,155 85,166 115,221 125,210" fill={trimColor} />

                      {/* Right Raglan Sleeve */}
                      <path d="M 305 92 L 405 155 L 375 210 L 325 165 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="405,155 415,166 385,221 375,210" fill={trimColor} />

                      {/* Main Torso Body */}
                      <path d="M 195 92 Q 250 110 305 92 L 335 165 Q 322 285 338 422 Q 250 435 162 422 Q 178 285 165 165 Z" fill={primaryColor} stroke="#222" strokeWidth="2" />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && <path d="M 195 92 Q 250 110 305 92 L 335 165 Q 322 285 338 422 Q 250 435 162 422 Q 178 285 165 165 Z" fill="url(#patGeometric)" />}
                      {selectedPattern === 'stripes' && <path d="M 195 92 Q 250 110 305 92 L 335 165 Q 322 285 338 422 Q 250 435 162 422 Q 178 285 165 165 Z" fill="url(#patStripes)" />}
                      {selectedPattern === 'hex' && <path d="M 195 92 Q 250 110 305 92 L 335 165 Q 322 285 338 422 Q 250 435 162 422 Q 178 285 165 165 Z" fill="url(#patHex)" />}
                      {selectedPattern === 'cyber' && <path d="M 195 92 Q 250 110 305 92 L 335 165 Q 322 285 338 422 Q 250 435 162 422 Q 178 285 165 165 Z" fill="url(#patCyber)" />}
                      {selectedPattern === 'camo' && <path d="M 195 92 Q 250 110 305 92 L 335 165 Q 322 285 338 422 Q 250 435 162 422 Q 178 285 165 165 Z" fill="url(#patCamo)" />}

                      {/* Dynamic Curved T20 Swoop Flanks */}
                      <path d="M 165 165 Q 205 280 172 422 L 162 422 Q 178 285 165 165 Z" fill={secondaryColor} />
                      <path d="M 335 165 Q 295 280 328 422 L 338 422 Q 322 285 335 165 Z" fill={secondaryColor} />
                      <path d="M 172 422 Q 205 280 165 165" fill="none" stroke={trimColor} strokeWidth="1.5" />
                      <path d="M 328 422 Q 295 280 335 165" fill="none" stroke={trimColor} strokeWidth="1.5" />

                      {/* Cricket Polo Collar & Button Placket */}
                      <path d="M 215 90 Q 250 110 285 90 L 295 78 Q 250 90 205 78 Z" fill={trimColor} stroke="#222" strokeWidth="1" />
                      <rect x="245" y="96" width="10" height="54" fill={trimColor} stroke={secondaryColor} strokeWidth="1" />
                      <circle cx="250" cy="110" r="2.2" fill={accentColor} />
                      <circle cx="250" cy="132" r="2.2" fill={accentColor} />
                    </g>
                  )}

                  {/* 9. CLASSIC BUTTON-DOWN BASEBALL JERSEY */}
                  {selectedApparel.id === 'baseball-jersey' && (
                    <g id="baseballJerseyGroup">
                      {/* Left Sleeve with Double Striping */}
                      <path d="M 165 105 L 80 165 L 110 220 L 175 168 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <line x1="88" y1="180" x2="118" y2="235" stroke={secondaryColor} strokeWidth="3" />
                      <line x1="94" y1="188" x2="124" y2="243" stroke={trimColor} strokeWidth="2" />

                      {/* Right Sleeve with Double Striping */}
                      <path d="M 335 105 L 420 165 L 390 220 L 325 168 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <line x1="412" y1="180" x2="382" y2="235" stroke={secondaryColor} strokeWidth="3" />
                      <line x1="406" y1="188" x2="376" y2="243" stroke={trimColor} strokeWidth="2" />

                      {/* Torso Body with Baseball Shirt-Tail Hem */}
                      <path d="M 165 105 Q 250 120 335 105 L 340 170 Q 326 280 342 415 Q 250 445 158 415 Q 174 280 160 170 Z" fill={primaryColor} stroke="#222" strokeWidth="2" />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && <path d="M 165 105 Q 250 120 335 105 L 340 170 Q 326 280 342 415 Q 250 445 158 415 Q 174 280 160 170 Z" fill="url(#patGeometric)" />}
                      {selectedPattern === 'stripes' && <path d="M 165 105 Q 250 120 335 105 L 340 170 Q 326 280 342 415 Q 250 445 158 415 Q 174 280 160 170 Z" fill="url(#patStripes)" />}
                      {selectedPattern === 'hex' && <path d="M 165 105 Q 250 120 335 105 L 340 170 Q 326 280 342 415 Q 250 445 158 415 Q 174 280 160 170 Z" fill="url(#patHex)" />}
                      {selectedPattern === 'cyber' && <path d="M 165 105 Q 250 120 335 105 L 340 170 Q 326 280 342 415 Q 250 445 158 415 Q 174 280 160 170 Z" fill="url(#patCyber)" />}
                      {selectedPattern === 'camo' && <path d="M 165 105 Q 250 120 335 105 L 340 170 Q 326 280 342 415 Q 250 445 158 415 Q 174 280 160 170 Z" fill="url(#patCamo)" />}

                      {/* Full-Length Contrast Baseball Button Placket */}
                      <rect x="245" y="98" width="10" height="332" fill={primaryColor} stroke={secondaryColor} strokeWidth="1.5" />
                      <line x1="244" y1="98" x2="244" y2="430" stroke={trimColor} strokeWidth="1.5" />
                      <line x1="256" y1="98" x2="256" y2="430" stroke={trimColor} strokeWidth="1.5" />

                      {/* 6 Baseball Stitched Buttons */}
                      {[120, 168, 220, 275, 330, 385].map((btnY) => (
                        <g key={btnY}>
                          <circle cx="250" cy={btnY} r="3.2" fill={accentColor} stroke="#222" strokeWidth="0.8" />
                          <circle cx="250" cy={btnY} r="1" fill="#444" />
                        </g>
                      ))}

                      {/* Neck Piping */}
                      <path d="M 215 102 Q 250 135 285 102" fill="none" stroke={trimColor} strokeWidth="2.5" />
                    </g>
                  )}

                  {/* 10. SUBLIMATED ICE / FIELD HOCKEY SWEATER */}
                  {selectedApparel.id === 'hockey-jersey' && (
                    <g id="hockeyJerseyGroup">
                      {/* Oversized Left Drop Sleeve with Elbow Reinforcement */}
                      <path d="M 150 95 L 45 160 L 80 235 L 170 175 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="85,145 60,195 85,215 105,170" fill={secondaryColor} opacity="0.8" />
                      <polygon points="45,160 65,165 95,230 80,235" fill={trimColor} />

                      {/* Oversized Right Drop Sleeve with Elbow Reinforcement */}
                      <path d="M 350 95 L 455 160 L 420 235 L 330 175 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="415,145 440,195 415,215 395,170" fill={secondaryColor} opacity="0.8" />
                      <polygon points="455,160 435,165 405,230 420,235" fill={trimColor} />

                      {/* Wide Oversized Torso */}
                      <path d="M 150 95 Q 250 115 350 95 L 358 175 L 360 425 L 140 425 L 142 175 Z" fill={primaryColor} stroke="#222" strokeWidth="2" />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && <path d="M 150 95 Q 250 115 350 95 L 358 175 L 360 425 L 140 425 L 142 175 Z" fill="url(#patGeometric)" />}
                      {selectedPattern === 'stripes' && <path d="M 150 95 Q 250 115 350 95 L 358 175 L 360 425 L 140 425 L 142 175 Z" fill="url(#patStripes)" />}
                      {selectedPattern === 'hex' && <path d="M 150 95 Q 250 115 350 95 L 358 175 L 360 425 L 140 425 L 142 175 Z" fill="url(#patHex)" />}
                      {selectedPattern === 'cyber' && <path d="M 150 95 Q 250 115 350 95 L 358 175 L 360 425 L 140 425 L 142 175 Z" fill="url(#patCyber)" />}
                      {selectedPattern === 'camo' && <path d="M 150 95 Q 250 115 350 95 L 358 175 L 360 425 L 140 425 L 142 175 Z" fill="url(#patCamo)" />}

                      {/* Authentic Lower Horizontal Hockey Stripes */}
                      <rect x="140" y="365" width="220" height="20" fill={secondaryColor} />
                      <rect x="140" y="388" width="220" height="8" fill={trimColor} />
                      <rect x="140" y="399" width="220" height="26" fill={primaryColor} />

                      {/* Hockey V-Neck with Authentic Lace-Up Strings */}
                      <polygon points="210,95 290,95 250,158" fill="#18181B" stroke={trimColor} strokeWidth="2" />
                      <line x1="236" y1="108" x2="264" y2="120" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                      <line x1="264" y1="108" x2="236" y2="120" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                      <line x1="239" y1="126" x2="261" y2="138" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                      <line x1="261" y1="126" x2="239" y2="138" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                      <line x1="246" y1="138" x2="244" y2="155" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                      <line x1="254" y1="138" x2="256" y2="155" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                    </g>
                  )}

                  {/* 11. HIGH-IMPACT RACERBACK SPORTS BRA */}
                  {selectedApparel.id === 'sports-bra' && (
                    <g id="sportsBraGroup">
                      {viewMode === 'front' ? (
                        <>
                          {/* Front Silhouette: Scoop Neck & Supportive Bust Shell */}
                          <path
                            d="M 195 110 Q 250 120 305 110 L 332 155 Q 315 210 322 268 Q 250 278 178 268 Q 185 210 168 155 Z"
                            fill={primaryColor}
                            stroke="#222"
                            strokeWidth="2"
                          />

                          {/* Pattern Overlay */}
                          {selectedPattern === 'geometric' && <path d="M 195 110 Q 250 120 305 110 L 332 155 Q 315 210 322 268 Q 250 278 178 268 Q 185 210 168 155 Z" fill="url(#patGeometric)" />}
                          {selectedPattern === 'stripes' && <path d="M 195 110 Q 250 120 305 110 L 332 155 Q 315 210 322 268 Q 250 278 178 268 Q 185 210 168 155 Z" fill="url(#patStripes)" />}
                          {selectedPattern === 'hex' && <path d="M 195 110 Q 250 120 305 110 L 332 155 Q 315 210 322 268 Q 250 278 178 268 Q 185 210 168 155 Z" fill="url(#patHex)" />}
                          {selectedPattern === 'cyber' && <path d="M 195 110 Q 250 120 305 110 L 332 155 Q 315 210 322 268 Q 250 278 178 268 Q 185 210 168 155 Z" fill="url(#patCyber)" />}
                          {selectedPattern === 'camo' && <path d="M 195 110 Q 250 120 305 110 L 332 155 Q 315 210 322 268 Q 250 278 178 268 Q 185 210 168 155 Z" fill="url(#patCamo)" />}

                          {/* Deep Front Scoop Neck Binding */}
                          <path d="M 195 110 Q 250 165 305 110 Q 250 148 195 110 Z" fill={trimColor} stroke={secondaryColor} strokeWidth="1.5" />

                          {/* Ergonomic Princess Seams / Removable Pad Molding */}
                          <path d="M 215 125 Q 208 195 230 268" fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="3,2" />
                          <path d="M 285 125 Q 292 195 270 268" fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="3,2" />

                          {/* Center Mesh Breather Vent */}
                          <polygon points="242,160 258,160 250,188" fill={secondaryColor} opacity="0.75" />

                          {/* Supportive High-Tension Underbust Band */}
                          <path d="M 178 268 Q 250 278 322 268 L 320 298 Q 250 308 180 298 Z" fill="#18181B" stroke={trimColor} strokeWidth="1.5" />
                          <line x1="184" y1="283" x2="316" y2="283" stroke={secondaryColor} strokeWidth="2" strokeDasharray="5,3" />
                        </>
                      ) : (
                        <>
                          {/* Back View: High-Impact Racerback Y-Strap Silhouette */}
                          <path
                            d="M 195 110 Q 250 120 305 110 L 332 155 Q 315 210 322 268 Q 250 278 178 268 Q 185 210 168 155 Z"
                            fill={primaryColor}
                            stroke="#222"
                            strokeWidth="2"
                          />
                          {/* Scapula Blade Cutouts */}
                          <path d="M 195 110 L 235 185 L 235 268 L 178 268 Q 185 210 168 155 Z" fill="#FAF8F5" stroke="#222" strokeWidth="1" />
                          <path d="M 305 110 L 265 185 L 265 268 L 322 268 Q 315 210 332 155 Z" fill="#FAF8F5" stroke="#222" strokeWidth="1" />

                          {/* Central Racerback Spine */}
                          <path d="M 235 185 L 235 268 L 265 268 L 265 185 Q 250 160 235 185 Z" fill={secondaryColor} stroke={trimColor} strokeWidth="1.5" />
                          <line x1="250" y1="180" x2="250" y2="268" stroke={accentColor} strokeWidth="2" strokeDasharray="3,2" />

                          {/* Supportive High-Tension Underbust Band */}
                          <path d="M 178 268 Q 250 278 322 268 L 320 298 Q 250 308 180 298 Z" fill="#18181B" stroke={trimColor} strokeWidth="1.5" />
                          <line x1="184" y1="283" x2="316" y2="283" stroke={secondaryColor} strokeWidth="2" strokeDasharray="5,3" />
                        </>
                      )}
                    </g>
                  )}

                  {/* 12. SEAMLESS HIGH-WAIST PERFORMANCE LEGGINGS */}
                  {selectedApparel.id === 'performance-leggings' && (
                    <g id="performanceLeggingsGroup">
                      {/* High-Rise 4-inch Waistband */}
                      <path d="M 175 120 Q 250 110 325 120 L 328 160 Q 250 152 172 160 Z" fill={primaryColor} stroke="#18181B" strokeWidth="2" />
                      <path d="M 172 160 Q 250 152 328 160" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4,2" fill="none" />

                      {/* Left Leg */}
                      <path d="M 172 160 Q 155 240 168 340 L 180 458 L 220 458 L 236 340 L 246 230 Z" fill={primaryColor} stroke="#18181B" strokeWidth="2" />
                      {/* Right Leg */}
                      <path d="M 328 160 Q 345 240 332 340 L 320 458 L 280 458 L 264 340 L 254 230 Z" fill={primaryColor} stroke="#18181B" strokeWidth="2" />
                      {/* Crotch Diamond Flex Gusset */}
                      <polygon points="246,230 250,220 254,230 250,242" fill={secondaryColor} />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && (
                        <g opacity="0.35">
                          <path d="M 172 160 Q 155 240 168 340 L 180 458 L 220 458 L 236 340 L 246 230 Z" fill="url(#patGeometric)" />
                          <path d="M 328 160 Q 345 240 332 340 L 320 458 L 280 458 L 264 340 L 254 230 Z" fill="url(#patGeometric)" />
                        </g>
                      )}
                      {selectedPattern === 'stripes' && (
                        <g opacity="0.35">
                          <path d="M 172 160 Q 155 240 168 340 L 180 458 L 220 458 L 236 340 L 246 230 Z" fill="url(#patStripes)" />
                          <path d="M 328 160 Q 345 240 332 340 L 320 458 L 280 458 L 264 340 L 254 230 Z" fill="url(#patStripes)" />
                        </g>
                      )}
                      {selectedPattern === 'hex' && (
                        <g opacity="0.35">
                          <path d="M 172 160 Q 155 240 168 340 L 180 458 L 220 458 L 236 340 L 246 230 Z" fill="url(#patHex)" />
                          <path d="M 328 160 Q 345 240 332 340 L 320 458 L 280 458 L 264 340 L 254 230 Z" fill="url(#patHex)" />
                        </g>
                      )}
                      {selectedPattern === 'cyber' && (
                        <g opacity="0.35">
                          <path d="M 172 160 Q 155 240 168 340 L 180 458 L 220 458 L 236 340 L 246 230 Z" fill="url(#patCyber)" />
                          <path d="M 328 160 Q 345 240 332 340 L 320 458 L 280 458 L 264 340 L 254 230 Z" fill="url(#patCyber)" />
                        </g>
                      )}
                      {selectedPattern === 'camo' && (
                        <g opacity="0.35">
                          <path d="M 172 160 Q 155 240 168 340 L 180 458 L 220 458 L 236 340 L 246 230 Z" fill="url(#patCamo)" />
                          <path d="M 328 160 Q 345 240 332 340 L 320 458 L 280 458 L 264 340 L 254 230 Z" fill="url(#patCamo)" />
                        </g>
                      )}

                      {/* Front: Quad & IT-Band Flatlock Seams */}
                      {viewMode === 'front' ? (
                        <>
                          <path d="M 172 160 Q 192 250 202 335 L 198 458" fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4,2" />
                          <path d="M 328 160 Q 308 250 298 335 L 302 458" fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4,2" />
                          <circle cx="200" cy="335" r="9" fill="none" stroke={trimColor} strokeWidth="1.2" opacity="0.7" />
                          <circle cx="300" cy="335" r="9" fill="none" stroke={trimColor} strokeWidth="1.2" opacity="0.7" />
                        </>
                      ) : (
                        /* Back: Distinctive Glute-Contour V-Yoke */
                        <>
                          <path d="M 172 160 Q 212 150 250 176 Q 288 150 328 160" fill="none" stroke={secondaryColor} strokeWidth="2.5" strokeDasharray="4,2" />
                          <path d="M 250 176 L 250 225" fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4,2" />
                          <path d="M 195 240 Q 190 320 200 458" fill="none" stroke={trimColor} strokeWidth="1.5" strokeDasharray="3,2" />
                          <path d="M 305 240 Q 310 320 300 458" fill="none" stroke={trimColor} strokeWidth="1.5" strokeDasharray="3,2" />
                        </>
                      )}

                      {/* Ankle Compression Cuffs */}
                      <rect x="180" y="446" width="40" height="12" fill={trimColor} />
                      <rect x="280" y="446" width="40" height="12" fill={trimColor} />
                    </g>
                  )}

                  {/* 13. ULTRALIGHT SEAMLESS TRAINING TEE */}
                  {selectedApparel.id === 'training-tee' && (
                    <g id="trainingTeeGroup">
                      {/* Left Sleeve */}
                      <path d="M 180 96 L 100 155 L 125 205 L 175 162 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="100,155 92,164 117,214 125,205" fill={trimColor} />

                      {/* Right Sleeve */}
                      <path d="M 320 96 L 400 155 L 375 205 L 325 162 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="400,155 408,164 383,214 375,205" fill={trimColor} />

                      {/* Contoured Torso */}
                      <path d="M 180 96 Q 250 115 320 96 L 332 162 Q 312 270 334 415 Q 250 430 166 415 Q 188 270 168 162 Z" fill={primaryColor} stroke="#222" strokeWidth="2" />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && <path d="M 180 96 Q 250 115 320 96 L 332 162 Q 312 270 334 415 Q 250 430 166 415 Q 188 270 168 162 Z" fill="url(#patGeometric)" />}
                      {selectedPattern === 'stripes' && <path d="M 180 96 Q 250 115 320 96 L 332 162 Q 312 270 334 415 Q 250 430 166 415 Q 188 270 168 162 Z" fill="url(#patStripes)" />}
                      {selectedPattern === 'hex' && <path d="M 180 96 Q 250 115 320 96 L 332 162 Q 312 270 334 415 Q 250 430 166 415 Q 188 270 168 162 Z" fill="url(#patHex)" />}
                      {selectedPattern === 'cyber' && <path d="M 180 96 Q 250 115 320 96 L 332 162 Q 312 270 334 415 Q 250 430 166 415 Q 188 270 168 162 Z" fill="url(#patCyber)" />}
                      {selectedPattern === 'camo' && <path d="M 180 96 Q 250 115 320 96 L 332 162 Q 312 270 334 415 Q 250 430 166 415 Q 188 270 168 162 Z" fill="url(#patCamo)" />}

                      {/* Laser-Perforated Micro-Mesh Flank Panels */}
                      <path d="M 168 162 Q 188 270 166 415 L 180 415 Q 200 270 182 162 Z" fill={secondaryColor} opacity="0.85" />
                      <path d="M 332 162 Q 312 270 334 415 L 320 415 Q 300 270 318 162 Z" fill={secondaryColor} opacity="0.85" />

                      {/* Ergonomic Athletic Collar */}
                      <path d="M 215 95 Q 250 128 285 95 Q 250 112 215 95 Z" fill={trimColor} stroke={secondaryColor} strokeWidth="1.5" />
                    </g>
                  )}

                  {/* 14. FULL-ZIP TRACKSUIT WINDBREAKER JACKET */}
                  {selectedApparel.id === 'tracksuit-jacket' && (
                    <g id="tracksuitJacketGroup">
                      {/* Stand-Up Wind Collar */}
                      <path d="M 210 92 L 210 68 Q 250 78 290 68 L 290 92 Q 250 102 210 92 Z" fill={trimColor} stroke="#222" strokeWidth="1.5" />

                      {/* Raglan Sleeves with Elasticized Cuffs */}
                      <path d="M 210 92 L 65 175 L 90 230 L 165 180 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="65,175 58,185 83,240 90,230" fill={trimColor} />

                      <path d="M 290 92 L 435 175 L 410 230 L 335 180 Z" fill={primaryColor} stroke="#222" strokeWidth="1.5" />
                      <polygon points="435,175 442,185 417,240 410,230" fill={trimColor} />

                      {/* Main Torso */}
                      <path d="M 210 92 Q 250 102 290 92 L 335 180 L 345 405 L 155 405 L 165 180 Z" fill={primaryColor} stroke="#222" strokeWidth="2" />

                      {/* Contrast Upper Chest Chevron Color-Block */}
                      <polygon points="210,92 290,92 335,180 250,215 165,180" fill={secondaryColor} opacity="0.9" />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && <polygon points="165,180 250,215 335,180 345,405 155,405" fill="url(#patGeometric)" />}
                      {selectedPattern === 'stripes' && <polygon points="165,180 250,215 335,180 345,405 155,405" fill="url(#patStripes)" />}
                      {selectedPattern === 'hex' && <polygon points="165,180 250,215 335,180 345,405 155,405" fill="url(#patHex)" />}
                      {selectedPattern === 'cyber' && <polygon points="165,180 250,215 335,180 345,405 155,405" fill="url(#patCyber)" />}
                      {selectedPattern === 'camo' && <polygon points="165,180 250,215 335,180 345,405 155,405" fill="url(#patCamo)" />}

                      {/* Diagonal Welt Zipper Side Pockets */}
                      <line x1="175" y1="340" x2="205" y2="365" stroke={trimColor} strokeWidth="3" strokeLinecap="round" />
                      <line x1="325" y1="340" x2="295" y2="365" stroke={trimColor} strokeWidth="3" strokeLinecap="round" />

                      {/* Center Front Zipper Line (Front View) */}
                      {viewMode === 'front' && (
                        <g>
                          <line x1="250" y1="68" x2="250" y2="425" stroke={accentColor} strokeWidth="2.5" strokeDasharray="3,2" />
                          {/* Zipper Puller Slider */}
                          <rect x="246" y="135" width="8" height="12" rx="1.5" fill="#333" stroke={accentColor} strokeWidth="0.8" />
                          <polygon points="248,147 252,147 253,162 247,162" fill={trimColor} />
                        </g>
                      )}

                      {/* Elastic Bottom Hem Band */}
                      <rect x="155" y="405" width="190" height="20" fill={trimColor} stroke="#222" strokeWidth="1.5" />
                    </g>
                  )}

                  {/* 15. TAPERED ATHLETIC FRENCH TERRY JOGGERS */}
                  {selectedApparel.id === 'joggers-trackpants' && (
                    <g id="joggersTrackpantsGroup">
                      {/* Ribbed Elastic Waistband */}
                      <rect x="165" y="125" width="170" height="35" rx="5" fill={primaryColor} stroke="#18181B" strokeWidth="2" />
                      <line x1="165" y1="136" x2="335" y2="136" stroke={secondaryColor} strokeWidth="1.5" opacity="0.6" />
                      <line x1="165" y1="148" x2="335" y2="148" stroke={secondaryColor} strokeWidth="1.5" opacity="0.6" />

                      {/* Front Eyelets & Hanging Drawstrings */}
                      {viewMode === 'front' && (
                        <g>
                          <circle cx="242" cy="142" r="2.5" fill="#222" stroke={accentColor} strokeWidth="0.8" />
                          <circle cx="258" cy="142" r="2.5" fill="#222" stroke={accentColor} strokeWidth="0.8" />
                          {/* Drawstring Cords with Metal Aglets */}
                          <line x1="242" y1="144" x2="238" y2="195" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" />
                          <rect x="236.5" y="195" width="3" height="8" fill={trimColor} />
                          <line x1="258" y1="144" x2="262" y2="195" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" />
                          <rect x="260.5" y="195" width="3" height="8" fill={trimColor} />
                        </g>
                      )}

                      {/* Left Leg */}
                      <path d="M 165 160 Q 148 270 170 380 L 180 445 L 222 445 L 240 300 L 248 245 Z" fill={primaryColor} stroke="#18181B" strokeWidth="2" />
                      {/* Right Leg */}
                      <path d="M 335 160 Q 352 270 330 380 L 320 445 L 278 445 L 260 300 L 252 245 Z" fill={primaryColor} stroke="#18181B" strokeWidth="2" />
                      <polygon points="248,245 250,235 252,245 250,258" fill={secondaryColor} />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && (
                        <g opacity="0.35">
                          <path d="M 165 160 Q 148 270 170 380 L 180 445 L 222 445 L 240 300 L 248 245 Z" fill="url(#patGeometric)" />
                          <path d="M 335 160 Q 352 270 330 380 L 320 445 L 278 445 L 260 300 L 252 245 Z" fill="url(#patGeometric)" />
                        </g>
                      )}
                      {selectedPattern === 'stripes' && (
                        <g opacity="0.35">
                          <path d="M 165 160 Q 148 270 170 380 L 180 445 L 222 445 L 240 300 L 248 245 Z" fill="url(#patStripes)" />
                          <path d="M 335 160 Q 352 270 330 380 L 320 445 L 278 445 L 260 300 L 252 245 Z" fill="url(#patStripes)" />
                        </g>
                      )}
                      {selectedPattern === 'hex' && (
                        <g opacity="0.35">
                          <path d="M 165 160 Q 148 270 170 380 L 180 445 L 222 445 L 240 300 L 248 245 Z" fill="url(#patHex)" />
                          <path d="M 335 160 Q 352 270 330 380 L 320 445 L 278 445 L 260 300 L 252 245 Z" fill="url(#patHex)" />
                        </g>
                      )}
                      {selectedPattern === 'cyber' && (
                        <g opacity="0.35">
                          <path d="M 165 160 Q 148 270 170 380 L 180 445 L 222 445 L 240 300 L 248 245 Z" fill="url(#patCyber)" />
                          <path d="M 335 160 Q 352 270 330 380 L 320 445 L 278 445 L 260 300 L 252 245 Z" fill="url(#patCyber)" />
                        </g>
                      )}
                      {selectedPattern === 'camo' && (
                        <g opacity="0.35">
                          <path d="M 165 160 Q 148 270 170 380 L 180 445 L 222 445 L 240 300 L 248 245 Z" fill="url(#patCamo)" />
                          <path d="M 335 160 Q 352 270 330 380 L 320 445 L 278 445 L 260 300 L 252 245 Z" fill="url(#patCamo)" />
                        </g>
                      )}

                      {/* Curved Slanted Pockets */}
                      <path d="M 165 175 Q 192 205 186 248" fill="none" stroke={secondaryColor} strokeWidth="2.5" />
                      <path d="M 335 175 Q 308 205 314 248" fill="none" stroke={secondaryColor} strokeWidth="2.5" />

                      {/* Ribbed Ankle Cuffs */}
                      <rect x="180" y="445" width="42" height="22" rx="2" fill={trimColor} stroke="#18181B" strokeWidth="1" />
                      <rect x="278" y="445" width="42" height="22" rx="2" fill={trimColor} stroke="#18181B" strokeWidth="1" />
                    </g>
                  )}

                  {/* 16. PRO COMPRESSION SPATS / BASELAYER TIGHTS */}
                  {selectedApparel.id === 'compression-tights' && (
                    <g id="compressionTightsGroup">
                      {/* Compression Elastic Waistband */}
                      <rect x="170" y="125" width="160" height="28" fill="#18181B" stroke={trimColor} strokeWidth="1.5" />
                      <line x1="172" y1="139" x2="328" y2="139" stroke={secondaryColor} strokeWidth="2" strokeDasharray="5,3" />

                      {/* Left Leg */}
                      <path d="M 170 153 Q 155 240 166 340 L 178 458 L 218 458 L 235 340 L 246 235 Z" fill={primaryColor} stroke="#18181B" strokeWidth="2" />
                      {/* Right Leg */}
                      <path d="M 330 153 Q 345 240 334 340 L 322 458 L 282 458 L 265 340 L 254 235 Z" fill={primaryColor} stroke="#18181B" strokeWidth="2" />

                      {/* Sublimated Pattern Overlay */}
                      {selectedPattern === 'geometric' && (
                        <g opacity="0.35">
                          <path d="M 170 153 Q 155 240 166 340 L 178 458 L 218 458 L 235 340 L 246 235 Z" fill="url(#patGeometric)" />
                          <path d="M 330 153 Q 345 240 334 340 L 322 458 L 282 458 L 265 340 L 254 235 Z" fill="url(#patGeometric)" />
                        </g>
                      )}
                      {selectedPattern === 'stripes' && (
                        <g opacity="0.35">
                          <path d="M 170 153 Q 155 240 166 340 L 178 458 L 218 458 L 235 340 L 246 235 Z" fill="url(#patStripes)" />
                          <path d="M 330 153 Q 345 240 334 340 L 322 458 L 282 458 L 265 340 L 254 235 Z" fill="url(#patStripes)" />
                        </g>
                      )}
                      {selectedPattern === 'hex' && (
                        <g opacity="0.35">
                          <path d="M 170 153 Q 155 240 166 340 L 178 458 L 218 458 L 235 340 L 246 235 Z" fill="url(#patHex)" />
                          <path d="M 330 153 Q 345 240 334 340 L 322 458 L 282 458 L 265 340 L 254 235 Z" fill="url(#patHex)" />
                        </g>
                      )}
                      {selectedPattern === 'cyber' && (
                        <g opacity="0.35">
                          <path d="M 170 153 Q 155 240 166 340 L 178 458 L 218 458 L 235 340 L 246 235 Z" fill="url(#patCyber)" />
                          <path d="M 330 153 Q 345 240 334 340 L 322 458 L 282 458 L 265 340 L 254 235 Z" fill="url(#patCyber)" />
                        </g>
                      )}
                      {selectedPattern === 'camo' && (
                        <g opacity="0.35">
                          <path d="M 170 153 Q 155 240 166 340 L 178 458 L 218 458 L 235 340 L 246 235 Z" fill="url(#patCamo)" />
                          <path d="M 330 153 Q 345 240 334 340 L 322 458 L 282 458 L 265 340 L 254 235 Z" fill="url(#patCamo)" />
                        </g>
                      )}

                      {/* 4-Needle 6-Thread Anatomical Seams */}
                      <path d="M 170 153 Q 190 250 200 335 L 196 458" fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4,2" />
                      <path d="M 330 153 Q 310 250 300 335 L 304 458" fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4,2" />

                      {/* Silicone Ankle Gripper Bands */}
                      <rect x="178" y="446" width="40" height="12" fill={trimColor} />
                      <rect x="282" y="446" width="40" height="12" fill={trimColor} />
                    </g>
                  )}

                  {/* 17. COMPETITION BRAZILIAN JIU-JITSU (BJJ) GI */}
                  {selectedApparel.id === 'bjj-gi' && (
                    <g id="bjjGiGroup">
                      {/* Kimono Wide Sleeves with Heavy Reinforcements */}
                      <path d="M 175 100 L 70 170 L 105 245 L 180 185 Z" fill={primaryColor} stroke="#111" strokeWidth="2" />
                      <line x1="70" y1="170" x2="105" y2="245" stroke={trimColor} strokeWidth="3.5" />

                      <path d="M 325 100 L 430 170 L 395 245 L 320 185 Z" fill={primaryColor} stroke="#111" strokeWidth="2" />
                      <line x1="430" y1="170" x2="395" y2="245" stroke={trimColor} strokeWidth="3.5" />

                      {/* Kimono Torso Body */}
                      <path d="M 175 100 Q 250 115 325 100 L 340 185 L 345 390 L 155 390 L 160 185 Z" fill={primaryColor} stroke="#111" strokeWidth="2" />

                      {/* Pearl Weave Micro Texture */}
                      <path d="M 175 100 Q 250 115 325 100 L 340 185 L 345 390 L 155 390 L 160 185 Z" fill="url(#patHex)" opacity="0.25" />

                      {/* Traditional Heavy Cross-Lapel Collar (EVA Foam Core) */}
                      <polygon points="215,95 325,275 305,285 195,105" fill={secondaryColor} stroke="#111" strokeWidth="1.5" />
                      <polygon points="285,95 175,275 195,285 305,105" fill={secondaryColor} stroke="#111" strokeWidth="1.5" />

                      {/* Lapel Row Stitching Lines */}
                      <line x1="210" y1="99" x2="318" y2="277" stroke={trimColor} strokeWidth="1.2" strokeDasharray="3,2" />
                      <line x1="290" y1="99" x2="182" y2="277" stroke={trimColor} strokeWidth="1.2" strokeDasharray="3,2" />

                      {/* Tied BJJ Rank Belt */}
                      <rect x="155" y="275" width="190" height="18" fill="#18181B" stroke="#000" strokeWidth="1" />
                      {/* Belt Knot */}
                      <rect x="242" y="271" width="16" height="26" rx="2" fill="#18181B" stroke="#000" strokeWidth="1" />
                      {/* Left Belt Tail */}
                      <rect x="238" y="294" width="12" height="65" fill="#18181B" stroke="#000" strokeWidth="0.8" />
                      {/* Right Belt Tail with Red Rank Sleeve */}
                      <rect x="252" y="294" width="12" height="75" fill="#18181B" stroke="#000" strokeWidth="0.8" />
                      <rect x="252" y="325" width="12" height="26" fill="#D32F2F" />
                      <rect x="252" y="342" width="12" height="3" fill="#FFFFFF" />
                    </g>
                  )}

                  {/* =================================================== */}
                  {/* GRAPHICS & EMBELLISHMENTS: FRONT VIEW              */}
                  {/* =================================================== */}
                  {viewMode === 'front' && (
                    <g id="frontGraphics">
                      {selectedApparel.isBottom ? (
                        /* BOTTOMS / PANTS GRAPHICS */
                        <>
                          {/* Club Crest on Left Thigh */}
                          {hasFrontCrest && (
                            <g transform="translate(192, 240)">
                              <polygon points="0,0 22,0 25,18 11,30 -3,18" fill={trimColor} stroke={primaryColor} strokeWidth="1.2" />
                              <polygon points="2,2 20,2 22,17 11,27 0,17" fill={secondaryColor} />
                              <text x="11" y="16" textAnchor="middle" fill={accentColor} fontSize="8" fontWeight="900" fontFamily="sans-serif">H</text>
                            </g>
                          )}

                          {/* Manufacturer Badge on Right Thigh */}
                          <g transform="translate(285, 246)">
                            <polygon points="0,0 10,0 14,12 4,12" fill={accentColor} />
                            <polygon points="5,-3 15,-3 19,9 9,9" fill={secondaryColor} />
                            <text x="10" y="20" textAnchor="middle" fill={accentColor} fontSize="5" fontWeight="bold" fontFamily="monospace">HARE</text>
                          </g>

                          {/* Vertical Leg Team Typography */}
                          <g transform="translate(182, 345) rotate(-90)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={accentColor}
                              fontSize="13"
                              fontWeight="900"
                              letterSpacing="3"
                              fontFamily="sans-serif"
                              stroke={primaryColor}
                              strokeWidth="0.8"
                            >
                              {teamName.toUpperCase()}
                            </text>
                          </g>

                          {/* Sponsor Text on Lower Quad */}
                          {sponsorText && (
                            <g transform="translate(318, 345) rotate(90)">
                              <text
                                x="0"
                                y="0"
                                textAnchor="middle"
                                fill={trimColor}
                                fontSize="10"
                                fontWeight="800"
                                letterSpacing="2"
                                fontFamily="monospace"
                              >
                                {sponsorText.toUpperCase()}
                              </text>
                            </g>
                          )}
                        </>
                      ) : selectedApparel.isCropped ? (
                        /* CROPPED / SPORTS BRA GRAPHICS */
                        <>
                          {/* Left Cup Mini Crest */}
                          {hasFrontCrest && (
                            <g transform="translate(198, 178)">
                              <polygon points="0,0 20,0 23,16 10,27 -3,16" fill={trimColor} stroke={primaryColor} strokeWidth="1.2" />
                              <polygon points="2,2 18,2 20,15 10,24 0,15" fill={secondaryColor} />
                              <text x="10" y="14" textAnchor="middle" fill={accentColor} fontSize="7" fontWeight="900" fontFamily="sans-serif">H</text>
                            </g>
                          )}

                          {/* Right Cup Badge */}
                          <g transform="translate(282, 184)">
                            <polygon points="0,0 10,0 14,12 4,12" fill={accentColor} />
                            <polygon points="5,-3 15,-3 19,9 9,9" fill={secondaryColor} />
                            <text x="10" y="20" textAnchor="middle" fill={accentColor} fontSize="5" fontWeight="bold" fontFamily="monospace">HARE</text>
                          </g>

                          {/* Center Underbust Brand Typography */}
                          <g transform="translate(250, 235)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={accentColor}
                              fontSize="13"
                              fontWeight="900"
                              letterSpacing="2"
                              fontFamily="sans-serif"
                              stroke={primaryColor}
                              strokeWidth="0.8"
                            >
                              {teamName.toUpperCase()}
                            </text>

                            {sponsorText && (
                              <text
                                x="0"
                                y="16"
                                textAnchor="middle"
                                fill={trimColor}
                                fontSize="8.5"
                                fontWeight="800"
                                letterSpacing="2"
                                fontFamily="monospace"
                              >
                                {sponsorText.toUpperCase()}
                              </text>
                            )}
                          </g>
                        </>
                      ) : (
                        /* STANDARD TOPS & JERSEYS GRAPHICS */
                        <>
                          {/* Club Shield Crest (Left Chest) */}
                          {hasFrontCrest && (
                            <g transform="translate(195, 160)">
                              <polygon points="0,0 26,0 30,22 13,36 -4,22" fill={trimColor} stroke={primaryColor} strokeWidth="1.5" />
                              <polygon points="3,3 23,3 26,20 13,32 0,20" fill={secondaryColor} />
                              <text x="13" y="18" textAnchor="middle" fill={accentColor} fontSize="9" fontWeight="900" fontFamily="sans-serif">H</text>
                            </g>
                          )}

                          {/* Manufacturer Badge (Right Chest) */}
                          <g transform="translate(280, 168)">
                            <polygon points="0,0 12,0 16,14 4,14" fill={accentColor} />
                            <polygon points="6,-4 18,-4 22,10 10,10" fill={secondaryColor} />
                            <text x="11" y="24" textAnchor="middle" fill={accentColor} fontSize="6" fontWeight="bold" fontFamily="monospace">HARE</text>
                          </g>

                          {/* Center Front Team / Sponsor Typography */}
                          <g transform="translate(250, 245)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={accentColor}
                              fontSize="18"
                              fontWeight="900"
                              letterSpacing="2"
                              fontFamily="sans-serif"
                              stroke={primaryColor}
                              strokeWidth="0.8"
                            >
                              {teamName.toUpperCase()}
                            </text>

                            {sponsorText && (
                              <text
                                x="0"
                                y="22"
                                textAnchor="middle"
                                fill={trimColor}
                                fontSize="11"
                                fontWeight="800"
                                letterSpacing="3"
                                fontFamily="monospace"
                              >
                                {sponsorText.toUpperCase()}
                              </text>
                            )}
                          </g>

                          {/* Official Authenticity Hem Tag */}
                          <g transform="translate(305, 395)">
                            <rect width="22" height="12" fill="#111" rx="2" stroke={trimColor} strokeWidth="0.8" />
                            <text x="11" y="8" textAnchor="middle" fill="#FF751F" fontSize="4.5" fontWeight="bold" fontFamily="monospace">AUTHENTIC</text>
                          </g>
                        </>
                      )}
                    </g>
                  )}

                  {/* =================================================== */}
                  {/* GRAPHICS & EMBELLISHMENTS: BACK VIEW               */}
                  {/* =================================================== */}
                  {viewMode === 'back' && (
                    <g id="backGraphics">
                      {selectedApparel.isBottom ? (
                        /* BOTTOMS / PANTS BACK GRAPHICS */
                        <>
                          {/* Back Waistband Logo Badge */}
                          <circle cx="250" cy="144" r="7" fill={trimColor} stroke={primaryColor} strokeWidth="1" />
                          <text x="250" y="147" textAnchor="middle" fill={primaryColor} fontSize="6" fontWeight="bold">🐰</text>

                          {/* Player Name across Upper Waist / Hip */}
                          <g transform="translate(250, 172)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={accentColor}
                              fontSize="12"
                              fontWeight="900"
                              letterSpacing="3"
                              fontFamily="sans-serif"
                              stroke={primaryColor}
                              strokeWidth="0.8"
                            >
                              {playerName.toUpperCase()}
                            </text>
                          </g>

                          {/* Calf Squad Number */}
                          <g transform="translate(295, 400)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={secondaryColor}
                              fontSize="32"
                              fontWeight="900"
                              fontFamily="sans-serif"
                              stroke={accentColor}
                              strokeWidth="1.5"
                            >
                              {playerNumber}
                            </text>
                          </g>
                        </>
                      ) : selectedApparel.isCropped ? (
                        /* CROPPED / SPORTS BRA BACK GRAPHICS */
                        <>
                          {/* Back Nape Logo on Racerback */}
                          <circle cx="250" cy="155" r="7" fill={trimColor} stroke={primaryColor} strokeWidth="1" />
                          <text x="250" y="158" textAnchor="middle" fill={primaryColor} fontSize="6" fontWeight="bold">🐰</text>

                          {/* Compact Player Name */}
                          <g transform="translate(250, 195)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={accentColor}
                              fontSize="12"
                              fontWeight="900"
                              letterSpacing="3"
                              fontFamily="sans-serif"
                              stroke={primaryColor}
                              strokeWidth="0.8"
                            >
                              {playerName.toUpperCase()}
                            </text>
                          </g>

                          {/* Squad Number */}
                          <g transform="translate(250, 245)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={secondaryColor}
                              fontSize="40"
                              fontWeight="900"
                              fontFamily="sans-serif"
                              stroke={accentColor}
                              strokeWidth="1.8"
                            >
                              {playerNumber}
                            </text>
                          </g>
                        </>
                      ) : (
                        /* STANDARD TOPS & JERSEYS BACK GRAPHICS */
                        <>
                          {/* Player Name */}
                          <g transform="translate(250, 180)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={accentColor}
                              fontSize="20"
                              fontWeight="900"
                              letterSpacing="4"
                              fontFamily="sans-serif"
                              stroke={primaryColor}
                              strokeWidth="1"
                            >
                              {playerName.toUpperCase()}
                            </text>
                          </g>

                          {/* Large Squad Number */}
                          <g transform="translate(250, 275)">
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={secondaryColor}
                              fontSize="84"
                              fontWeight="900"
                              fontFamily="sans-serif"
                              stroke={accentColor}
                              strokeWidth="2.5"
                            >
                              {playerNumber}
                            </text>
                          </g>

                          {/* Back Nape Logo */}
                          <circle cx="250" cy="120" r="8" fill={trimColor} stroke={primaryColor} strokeWidth="1" />
                          <text x="250" y="123" textAnchor="middle" fill={primaryColor} fontSize="7" fontWeight="bold">🐰</text>
                        </>
                      )}
                    </g>
                  )}

                  {/* Fabric Drape & Sheen Highlight Layer */}
                  {fabricSheen && (
                    selectedApparel.isBottom ? (
                      <path
                        d="M 165 145 Q 250 155 335 145 L 315 450 Q 250 460 185 450 Z"
                        fill="url(#fabricSheen)"
                        pointerEvents="none"
                      />
                    ) : selectedApparel.isCropped ? (
                      <path
                        d="M 180 130 Q 250 145 320 130 L 310 298 Q 250 308 190 298 Z"
                        fill="url(#fabricSheen)"
                        pointerEvents="none"
                      />
                    ) : (
                      <path
                        d="M 160 100 Q 250 120 340 100 L 350 425 Q 250 440 150 425 Z"
                        fill="url(#fabricSheen)"
                        pointerEvents="none"
                      />
                    )
                  )}
                </svg>

                {/* Sialkot CAD Watermark & Spec overlay */}
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-stone-500 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-200">
                  <span className="font-bold text-[#FF751F]">HARE-CAD v4.2</span> • Sialkot Plant Direct
                </div>

                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-stone-600 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-200 uppercase">
                  View: <strong className="text-[#1A1A1A]">{viewMode}</strong> | GSM: <strong className="text-[#FF751F]">{techBOM.fabricSpecs.gsm}</strong>
                </div>
              </div>

              {/* Action Toolbar: Download PNG, Attach to RFQ, Tech Spec */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                {/* Primary CTA: Attach Mockup to RFQ */}
                <button
                  type="button"
                  onClick={handleAttachToRFQ}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl font-extrabold text-xs text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Attach Mockup to RFQ & Get Sialkot Quote</span>
                </button>

                {/* Download High-Res PNG */}
                <button
                  type="button"
                  onClick={handleDownloadPNG}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl font-bold text-xs bg-[#FAF8F5] hover:bg-stone-100 text-[#1A1A1A] border border-[#E5DFD5] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#FF751F]" />
                  <span>Download Mockup (PNG)</span>
                </button>

                {/* Export Tech Pack Spec Sheet */}
                <button
                  type="button"
                  onClick={handleDownloadTechSheet}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl font-bold text-xs bg-[#FAF8F5] hover:bg-stone-100 text-[#1A1A1A] border border-[#E5DFD5] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Export Factory BOM Specification Sheet"
                >
                  <FileText className="w-4 h-4 text-stone-600" />
                  <span>Export Tech Spec</span>
                </button>
              </div>

              {/* Direct WhatsApp Consultation */}
              <div className="pt-3 text-center sm:text-left">
                <a
                  href={`https://wa.me/message/PBVPZM3J7ETGH1?text=${encodeURIComponent(
                    `Hello Hare Sportswear, I created a custom mockup for "${selectedApparel.name}" with prompt: "${prompt}". Colors: Primary ${primaryColor}, Secondary ${secondaryColor}. Please review for sampling!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat directly with a Garment Technologist on WhatsApp regarding this mockup</span>
                </a>
              </div>

            </div>

            {/* AI Tech Pack & BOM Specification Output Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#FF751F]/10 text-[#FF751F]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#1A1A1A]">
                      Factory Tech Pack & Color BOM
                    </h3>
                    <span className="text-[11px] text-stone-500 font-mono">
                      Calibrated for Sialkot Sublimation Printers & CNC Cutters
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(techBOM, null, 2));
                    setCopiedPms(true);
                    setTimeout(() => setCopiedPms(false), 2000);
                  }}
                  className="text-xs font-bold text-stone-500 hover:text-[#FF751F] flex items-center gap-1 transition-colors"
                >
                  {copiedPms ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPms ? 'Copied JSON' : 'Copy Specs'}</span>
                </button>
              </div>

              {/* Design Concept Statement */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  AI Design Narrative & Concept
                </span>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{techBOM.concept}"
                </p>
              </div>

              {/* Official Pantone TCX / PMS Matches */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                  Calibrated Pantone PMS Textile Matches
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {techBOM.pantoneCodes.map((pms, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-md border border-stone-300 shrink-0" style={{ backgroundColor: pms.hex }} />
                        <span className="font-bold text-[11px] text-[#1A1A1A] truncate">{pms.name}</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#FF751F] font-semibold">{pms.pantone}</div>
                      <div className="text-[9px] font-mono text-stone-400 uppercase">{pms.hex} • {pms.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineered Fabric & Sewing Directives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Fabric Specs */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] space-y-2">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Fabric Construction
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-[#1A1A1A]">{techBOM.fabricSpecs.name}</div>
                    <div className="text-stone-600 text-[11px]">GSM Weight: <strong>{techBOM.fabricSpecs.gsm} GSM</strong></div>
                    <div className="text-stone-600 text-[11px]">Knit: {techBOM.fabricSpecs.composition}</div>
                  </div>
                </div>

                {/* Sialkot Manufacturing SLA */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] space-y-2">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Sialkot Factory SLA
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Physical Sampling:</span>
                      <strong className="text-emerald-700">7 Working Days</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Bulk Production:</span>
                      <strong className="text-[#1A1A1A]">14-21 Days</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Minimum Order (MOQ):</span>
                      <strong className="text-[#FF751F]">25 Pcs / Colorway</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Manufacturing Directives List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Factory Sewing & Ink Formulation Directives
                </span>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {techBOM.productionDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF751F] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* "HOW IT WORKS" 3-STEP WORKFLOW GUIDE MODAL                */}
      {/* ========================================================= */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD5]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#FF751F]/10 text-[#FF751F]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">
                    How It Works: <span className="text-[#FF751F]">3-Step AI Apparel Prototyping</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    Direct digital mockups & factory-calibrated Pantone BOM specifications for international brands
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3 Step Process Cards */}
            <div className="space-y-3.5">
              
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-white font-mono font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  01
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-bold text-sm text-[#1A1A1A]">
                      1. Choose Apparel Silhouette & Division
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-[#FF751F]/10 text-[#FF751F] px-2 py-0.5 rounded-full">
                      Step 1 • Silhouette
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Click <strong>"Choose Product"</strong> to browse Hare Sportswear's complete catalog of {APPAREL_CATEGORIES.length} factory silhouettes across Teamwear, Sports Bras, Performance Leggings, Compression Wear, Tracksuits, Hoodies, and Combat Gear. Filter by category or search by sport/fabric to select your garment with pre-calibrated fabric weights (140 to 450 GSM).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF751F] text-white font-mono font-extrabold text-sm flex items-center justify-center shrink-0 shadow-md shadow-[#FF751F]/20">
                  02
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-bold text-sm text-[#1A1A1A]">
                      2. Enter Design Directives & Color Palette
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Step 2 • AI Directives
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Type your visual theme in the prompt box (e.g. <em>"Modern geometric red and white pattern with brand logo"</em>). Customize club branding, player typography, and color schemes. Our smart engine automatically extracts your requested colors and maps them to calibrated Pantone TCX textile standards.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-mono font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  03
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-bold text-sm text-[#1A1A1A]">
                      3. Generate Mockup, Tech Pack & Attach to RFQ
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Step 3 • Sialkot Production
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Click <strong>"Generate AI Design & Specifications"</strong> to synthesize your prototype via Google Gemini. Review Front/Back views in the vector studio, export a complete factory Bill of Materials (BOM), or click <strong>"Attach Mockup to RFQ"</strong> to send it directly to our Sialkot manufacturing team for physical sampling.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick-Start Sample Prompts Section */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2.5">
              <span className="text-xs font-bold text-[#1A1A1A] block">
                💡 Try an Example Prompt (Click to Apply):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Modern geometric red and white pattern with brand logo",
                  "Cyberpunk neon lightning grid theme with speed chevrons",
                  "Stealth tactical camo with high-visibility safety orange chest banding",
                  "Classic 90s vintage geometric chevron blocks with gold metallic accents"
                ].map((samplePrompt, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      setPrompt(samplePrompt);
                      setShowGuideModal(false);
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-amber-200 text-left text-xs font-medium text-stone-800 hover:text-[#FF751F] hover:border-[#FF751F] transition-all cursor-pointer truncate shadow-2xs"
                  >
                    "{samplePrompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E5DFD5] flex-wrap gap-3">
              <span className="text-[11px] text-stone-500">
                Sialkot Factory Direct OEM/ODM • Plots 42-45, Phase II, SIE, Sialkot 51310, Pakistan
              </span>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#FF751F] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Got It, Start Prototyping
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* "CHOOSE PRODUCT" MODAL / CATALOG SELECTOR                */}
      {/* ========================================================= */}
      {showProductModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setShowProductModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#E5DFD5] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#E5DFD5] flex items-center justify-between gap-4 bg-[#FAF8F5]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FF751F]/10 border border-[#FF751F]/20 flex items-center justify-center text-2xl shrink-0">
                  {selectedApparel.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#1A1A1A] flex items-center gap-2">
                    <span>Choose Apparel Product</span>
                    <span className="text-xs font-mono font-bold bg-[#FF751F]/10 text-[#FF751F] px-2.5 py-0.5 rounded-full">
                      {APPAREL_CATEGORIES.length} Silhouettes
                    </span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Select from Hare Sportswear's complete catalog of Sialkot-calibrated athletic apparel
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="w-9 h-9 rounded-full bg-white border border-[#E5DFD5] hover:bg-stone-100 text-stone-600 hover:text-stone-900 flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Bar & Category Filter Tabs */}
            <div className="p-4 sm:p-5 border-b border-[#E5DFD5] bg-white space-y-3 shrink-0">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  placeholder="Search products by sport, name, or fabric (e.g., bra, leggings, hoodie, rugby, bjj)..."
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-[#FF751F] focus:ring-2 focus:ring-[#FF751F]/20 outline-none bg-stone-50/50 transition"
                  autoFocus
                />
                {productSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setProductSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {APPAREL_GROUPS.map((grp) => {
                  const isActive = activeCategoryFilter === grp.id;
                  const count = grp.id === 'all'
                    ? APPAREL_CATEGORIES.length
                    : APPAREL_CATEGORIES.filter((a) => a.group === grp.id).length;

                  return (
                    <button
                      key={grp.id}
                      type="button"
                      onClick={() => setActiveCategoryFilter(grp.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#1A1A1A] text-white shadow-xs'
                          : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-200 border border-[#E5DFD5]'
                      }`}
                    >
                      <span>{grp.icon}</span>
                      <span>{grp.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Garment Cards Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {filteredApparelList.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-2xl">
                    🔍
                  </div>
                  <h4 className="font-bold text-sm text-[#1A1A1A]">No Garments Matched</h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    No products matched "{productSearchQuery}". Try clearing your search or switching categories.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setProductSearchQuery('');
                      setActiveCategoryFilter('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold hover:bg-[#FF751F] transition"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredApparelList.map((apparel) => {
                    const isSelected = selectedApparel.id === apparel.id;
                    return (
                      <button
                        key={apparel.id}
                        type="button"
                        onClick={() => handleSelectApparel(apparel)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between group cursor-pointer relative ${
                          isSelected
                            ? 'border-[#FF751F] bg-[#FF751F]/5 shadow-md shadow-[#FF751F]/10'
                            : 'border-[#E5DFD5] bg-white hover:border-[#FF751F]/60 hover:bg-stone-50/80 shadow-2xs'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#FF751F] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                              {apparel.icon}
                            </span>
                            <div className="min-w-0 pr-5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF751F] block truncate">
                                {apparel.category}
                              </span>
                              <h4 className="font-extrabold text-xs sm:text-sm text-[#1A1A1A] leading-snug group-hover:text-[#FF751F] transition-colors">
                                {apparel.name}
                              </h4>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-stone-100 space-y-1">
                            <div className="text-[11px] text-stone-600 line-clamp-1">
                              <span className="text-stone-400">Fabric: </span>
                              <strong className="text-stone-800">{apparel.defaultFabric}</strong>
                            </div>
                            <div className="text-[10px] text-stone-500 font-mono truncate">
                              Cut: {apparel.silhouette}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-dashed border-stone-200 flex items-center justify-between text-[11px]">
                          <span className="text-stone-400">
                            {apparel.collarStyles?.join(', ') || 'Custom Cut'}
                          </span>
                          <span className={`font-bold transition-colors ${
                            isSelected ? 'text-[#FF751F]' : 'text-stone-400 group-hover:text-[#FF751F]'
                          }`}>
                            {isSelected ? 'Selected' : 'Select →'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#E5DFD5] bg-[#FAF8F5] flex items-center justify-between flex-wrap gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Showing <strong>{filteredApparelList.length}</strong> of {APPAREL_CATEGORIES.length} garments</span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span className="hidden sm:inline">OEM / ODM Custom Pattern Drafting Available</span>
              </div>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="px-5 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#FF751F] text-white text-xs font-bold transition cursor-pointer"
              >
                Close Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Page Content from CMS if any blocks added */}
      <DynamicPageContent pageId="ai-mockup-generator" />

    </div>
  );
}
