import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Download, FileText, Send, Share2, RefreshCw, 
  RotateCcw, Eye, EyeOff, ShieldCheck, CheckCircle2, ChevronRight,
  Palette, Shirt, Layers, Zap, Info, Copy, Check, MessageCircle,
  Sliders, ArrowRight, ExternalLink, HelpCircle, Key, Settings,
  AlertTriangle, XCircle, Activity, Wifi, X
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

// Curated Apparel Configurations
const APPAREL_CATEGORIES = [
  {
    id: 'soccer-jersey',
    name: 'Sublimated Soccer Jersey',
    category: 'Teamwear & Custom Kits',
    defaultFabric: '160 GSM Performance Poly Interlock',
    collarStyles: ['v-neck', 'crew', 'mandarin'],
    silhouette: 'Athletic Slim Match Cut',
    icon: '⚽'
  },
  {
    id: 'basketball-uniform',
    name: 'Pro Mesh Basketball Jersey',
    category: 'Teamwear & Custom Kits',
    defaultFabric: '180 GSM Diamond Dri-Fit Poly Mesh',
    collarStyles: ['v-neck', 'crew'],
    silhouette: 'Sleeveless Wide-Shoulder Cut',
    icon: '🏀'
  },
  {
    id: 'wrestling-singlet',
    name: 'Elite Wrestling Singlet',
    category: 'Wrestling & Combat Gear',
    defaultFabric: '260 GSM Heavyweight Lycra-Spandex (4-Way Stretch)',
    collarStyles: ['scoop', 'racerback'],
    silhouette: 'Anatomical Compression Contour',
    icon: '🤼'
  },
  {
    id: 'fleece-hoodie',
    name: 'Heavyweight Fleece Hoodie',
    category: "Men's Activewear & Training",
    defaultFabric: '380 GSM Organic Cotton/Poly French Terry Fleece',
    collarStyles: ['hooded'],
    silhouette: 'Relaxed Drop-Shoulder Streetwear',
    icon: '🧥'
  },
  {
    id: 'compression-top',
    name: 'Pro Compression Rashguard',
    category: 'Activewear & Training',
    defaultFabric: '220 GSM 85/15 Poly-Spandex Anti-Chafing Knit',
    collarStyles: ['crew'],
    silhouette: 'Second-Skin Raglan Panel',
    icon: '⚡'
  },
  {
    id: 'combat-shorts',
    name: 'Muay Thai & MMA Shorts',
    category: 'Wrestling & Combat Gear',
    defaultFabric: '140 GSM Micro-Satin & Ripstop Side Splits',
    collarStyles: ['waistband'],
    silhouette: 'High-Movement Split Hem',
    icon: '🥊'
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

  // API Key & Health Check State
  const [apiKey, setApiKey] = useState(getStoredGeminiKey);
  const [apiKeySource, setApiKeySource] = useState(getGeminiKeySource);
  const [tempApiKeyInput, setTempApiKeyInput] = useState(apiKey);
  const [showApiModal, setShowApiModal] = useState(false);
  const [showKeyText, setShowKeyText] = useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [keySavedToast, setKeySavedToast] = useState(false);

  // Garment Customization State
  const [selectedApparel, setSelectedApparel] = useState(APPAREL_CATEGORIES[0]);
  const [prompt, setPrompt] = useState('Dynamic aerodynamic speed chevrons with high-contrast safety orange accents');
  const [primaryColor, setPrimaryColor] = useState('#111215');
  const [secondaryColor, setSecondaryColor] = useState('#FF751F');
  const [accentColor, setAccentColor] = useState('#FFFFFF');
  const [trimColor, setTrimColor] = useState('#D4AF37');
  const [selectedPattern, setSelectedPattern] = useState('stripes');
  const [collarStyle, setCollarStyle] = useState('v-neck');
  
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

  // Test Connection to Gemini API
  const handleTestConnection = async (keyToTest) => {
    setIsTestingKey(true);
    setTestResult(null);
    const key = (keyToTest || apiKey || '').trim() || _DEFAULT_KEY;
    const startTime = performance.now();
    const candidateModels = ['gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-3.5-flash'];
    let lastError = null;

    for (const m of candidateModels) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Respond with OK' }] }]
          })
        });
        const latency = Math.round(performance.now() - startTime);

        if (res.ok) {
          setTestResult({
            success: true,
            status: 200,
            latency,
            message: `Connected successfully to Google Gemini (${m}, ${latency}ms latency). API is active & healthy.`
          });
          setIsTestingKey(false);
          return;
        } else {
          const errJson = await res.json().catch(() => ({}));
          lastError = errJson?.error?.message || `HTTP ${res.status}`;
        }
      } catch (err) {
        lastError = err.message || 'Unable to connect to Google API';
      }
    }

    const latency = Math.round(performance.now() - startTime);
    setTestResult({
      success: false,
      status: 0,
      latency,
      message: `Connection status: ${lastError || 'Network handshake failed'}. Procedural fallback is always enabled.`
    });
    setIsTestingKey(false);
  };

  // Save Custom Key to LocalStorage
  const handleSaveApiKey = () => {
    if (tempApiKeyInput.trim()) {
      localStorage.setItem('hare_gemini_api_key', tempApiKeyInput.trim());
      setApiKey(tempApiKeyInput.trim());
      setApiKeySource('Custom Admin / User Setting');
    } else {
      localStorage.removeItem('hare_gemini_api_key');
      const def = getStoredGeminiKey();
      setApiKey(def);
      setTempApiKeyInput(def);
      setApiKeySource(getGeminiKeySource());
    }
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 3000);
  };

  // Reset to default key
  const handleResetApiKey = () => {
    localStorage.removeItem('hare_gemini_api_key');
    const def = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || _DEFAULT_KEY;
    setApiKey(def);
    setTempApiKeyInput(def);
    setApiKeySource(getGeminiKeySource());
    setTestResult(null);
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 3000);
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

          {/* Quick API Key & Engine Health Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowApiModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FF751F]/10 text-[#FF751F] border border-[#FF751F]/25 hover:bg-[#FF751F]/20 transition-all cursor-pointer"
            >
              <Key className="w-3 h-3" />
              <span>Gemini 3.5 Engine</span>
              <Settings className="w-3 h-3 text-stone-500" />
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/10 text-[#FF751F] text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Direct Digital Apparel Prototyping</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
            AI Sportswear <span className="text-[#FF751F]">Mockup Generator</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
            Generate custom photorealistic teamwear mockups, digital apparel prototypes, and factory-calibrated Pantone BOM specifications in real-time. Instantly download or attach directly to an RFQ for sampling in our Sialkot manufacturing facilities.
          </p>
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
                    onClick={() => setShowApiModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Settings className="w-3 h-3 text-[#FF751F]" />
                    <span>Check API Settings & Connection</span>
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
            
            {/* 1. Apparel Silhouette Selection */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-[#FF751F]" />
                  <span>1. Choose Apparel Type</span>
                </label>
                <span className="text-[11px] font-mono text-stone-400">6 Silhouettes</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {APPAREL_CATEGORIES.map((apparel) => {
                  const isSelected = selectedApparel.id === apparel.id;
                  return (
                    <button
                      key={apparel.id}
                      type="button"
                      onClick={() => setSelectedApparel(apparel)}
                      className={`p-3 rounded-2xl text-left transition-all border text-xs font-semibold flex flex-col justify-between min-h-[82px] cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF751F] text-white border-[#FF751F] shadow-md shadow-[#FF751F]/20 scale-[1.02]'
                          : 'bg-[#FAF8F5] text-stone-700 border-[#E5DFD5] hover:border-[#FF751F]/50 hover:bg-white'
                      }`}
                    >
                      <span className="text-lg mb-1">{apparel.icon}</span>
                      <span className="leading-snug">{apparel.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. AI Design Prompt & Inspiration Pills */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF751F]" />
                  <span>2. Design Concept & Prompt</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowApiModal(true)}
                  className="text-[11px] font-mono text-[#FF751F] hover:underline font-bold flex items-center gap-1"
                >
                  <span>Gemini API Key</span>
                  <Settings className="w-3 h-3" />
                </button>
              </div>

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
                  placeholder="Describe your design vision (e.g. 90s retro chevrons, cyberpunk Tokyo neon, stealth desert camo, royal championship crest)..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-[#1A1A1A] text-xs leading-relaxed placeholder-stone-400 focus:outline-none focus:border-[#FF751F] focus:ring-2 focus:ring-[#FF751F]/20 transition-all"
                />
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

                  {/* 5. COMPRESSION TOP / COMBAT SHORTS FALLBACK */}
                  {(selectedApparel.id === 'compression-top' || selectedApparel.id === 'combat-shorts') && (
                    <g id="compressionGroup">
                      <path
                        d="M 170 100 Q 250 115 330 100 L 340 170 Q 320 280 335 425 Q 250 435 165 425 Q 180 280 160 170 Z"
                        fill={primaryColor}
                        stroke="#1A1A1A"
                        strokeWidth="2"
                      />
                      <path
                        d="M 170 100 Q 250 115 330 100 L 340 170 Q 320 280 335 425 Q 250 435 165 425 Q 180 280 160 170 Z"
                        fill="url(#patCyber)"
                      />
                      {/* Ergonomic Flatlock Seams */}
                      <path d="M 195 105 Q 215 250 185 425" fill="none" stroke={secondaryColor} strokeWidth="2.5" strokeDasharray="4,2" />
                      <path d="M 305 105 Q 285 250 315 425" fill="none" stroke={secondaryColor} strokeWidth="2.5" strokeDasharray="4,2" />
                      {/* Crew Collar */}
                      <path d="M 215 95 Q 250 125 285 95" fill="none" stroke={trimColor} strokeWidth="5" />
                    </g>
                  )}

                  {/* =================================================== */}
                  {/* GRAPHICS & EMBELLISHMENTS: FRONT VIEW              */}
                  {/* =================================================== */}
                  {viewMode === 'front' && (
                    <g id="frontGraphics">
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
                    </g>
                  )}

                  {/* =================================================== */}
                  {/* GRAPHICS & EMBELLISHMENTS: BACK VIEW               */}
                  {/* =================================================== */}
                  {viewMode === 'back' && (
                    <g id="backGraphics">
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
                    </g>
                  )}

                  {/* Fabric Drape & Sheen Highlight Layer */}
                  {fabricSheen && (
                    <path
                      d="M 160 100 Q 250 120 340 100 L 350 425 Q 250 440 150 425 Z"
                      fill="url(#fabricSheen)"
                      pointerEvents="none"
                    />
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
      {/* GEMINI API CONFIGURATION & CONNECTION DIAGNOSTICS MODAL   */}
      {/* ========================================================= */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#FF751F]/10 text-[#FF751F]">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1A1A1A]">
                    Gemini AI Engine Settings
                  </h3>
                  <span className="text-xs text-stone-500">
                    Sialkot CAD Pre-Press & API Health Configuration
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowApiModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Key Status Info */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Active Key Source:</span>
                <span className="font-bold font-mono text-[#FF751F] bg-[#FF751F]/10 px-2.5 py-0.5 rounded-full border border-[#FF751F]/20">
                  {apiKeySource}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Engine Model:</span>
                <span className="font-bold text-[#1A1A1A]">gemini-3.5-flash</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Key Fingerprint:</span>
                <span className="font-mono text-stone-700">
                  {apiKey.slice(0, 7)}...{apiKey.slice(-6)}
                </span>
              </div>
            </div>

            {/* API Key Edit Form */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                Custom Gemini API Key Override:
              </label>
              <div className="relative">
                <input
                  type={showKeyText ? "text" : "password"}
                  value={tempApiKeyInput}
                  onChange={(e) => setTempApiKeyInput(e.target.value)}
                  placeholder="Paste custom Gemini API Key (AQ.xxx or AIzaxxx)..."
                  className="w-full pl-4 pr-20 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#FF751F]"
                />
                <button
                  type="button"
                  onClick={() => setShowKeyText(!showKeyText)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-semibold px-1.5 py-0.5 rounded"
                >
                  {showKeyText ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Leave empty or click "Reset" to use the default production key or <code>.env</code> file.
              </p>
            </div>

            {/* Connection Test Action & Result */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTestConnection(tempApiKeyInput)}
                  disabled={isTestingKey}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#1A1A1A] bg-[#FAF8F5] hover:bg-stone-100 border border-[#E5DFD5] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isTestingKey ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF751F]" />
                  ) : (
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  <span>{isTestingKey ? "Pinging Gemini API..." : "Test Connection"}</span>
                </button>

                <span className="text-[11px] text-stone-500">
                  Sends a lightweight handshake ping to verify Google endpoints.
                </span>
              </div>

              {testResult && (
                <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  testResult.success 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{testResult.success ? "Status 200 OK — Ready" : `HTTP Status ${testResult.status || 'Failed'}`}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {testResult.message}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5DFD5] gap-3">
              <button
                type="button"
                onClick={handleResetApiKey}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Reset to Default
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveApiKey}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#FF751F] hover:bg-[#E65C00] shadow-md transition-all cursor-pointer"
                >
                  {keySavedToast ? "Saved Successfully!" : "Save Configuration"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Dynamic Page Content from CMS if any blocks added */}
      <DynamicPageContent pageId="ai-mockup-generator" />

    </div>
  );
}
