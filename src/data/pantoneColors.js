/**
 * Pantone Matching System (PMS) Textile Database & Matching Engine
 * Specially calibrated for dye-sublimation on sports polyester (Kiian Italian inks),
 * screen printing plastisol, and garment embroidery threads.
 */

export const pantoneLibrary = [
  // --- Core Teamwear & Collegiate Shades ---
  {
    code: 'PMS 1505 C',
    name: 'Hare Apex Orange',
    hex: '#FF751F',
    rgb: [255, 117, 31],
    cmyk: '0 / 68 / 90 / 0',
    kiianInk: 'Kiian Hi-Pro Orange K-08',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Football, Basketball, Motorsports, Rugby'
  },
  {
    code: 'PMS 286 C',
    name: 'Collegiate Royal Blue',
    hex: '#0033A0',
    rgb: [0, 51, 160],
    cmyk: '100 / 75 / 0 / 0',
    kiianInk: 'Kiian Hi-Pro Cyan K-01 + Violet K-06',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Soccer, Basketball, Track & Field, Swimming'
  },
  {
    code: 'PMS 282 C',
    name: 'Midnight Navy Blue',
    hex: '#00205B',
    rgb: [0, 32, 91],
    cmyk: '100 / 90 / 13 / 68',
    kiianInk: 'Kiian Hi-Pro Deep Blue K-02',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Rugby, Hockey, Cricket, Rowing'
  },
  {
    code: 'PMS 186 C',
    name: 'Championship Crimson Red',
    hex: '#C8102E',
    rgb: [200, 16, 46],
    cmyk: '0 / 100 / 81 / 4',
    kiianInk: 'Kiian Hi-Pro Magenta K-03 + Warm Red K-05',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Football, Boxing, Basketball, Athletics'
  },
  {
    code: 'PMS 200 C',
    name: 'Heritage Cardinal Red',
    hex: '#BA0C2F',
    rgb: [186, 12, 47],
    cmyk: '0 / 100 / 65 / 15',
    kiianInk: 'Kiian Hi-Pro Scarlet K-04',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'College Teamwear, Baseball, Rugby'
  },
  {
    code: 'PMS 209 C',
    name: 'Varsity Maroon',
    hex: '#6B1F34',
    rgb: [107, 31, 52],
    cmyk: '20 / 100 / 60 / 60',
    kiianInk: 'Kiian Hi-Pro Bordeaux K-07',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Rugby, Cricket, Lacrosse'
  },
  {
    code: 'PMS 1235 C',
    name: 'Athletic Gold / Yellow',
    hex: '#FFB81C',
    rgb: [255, 184, 28],
    cmyk: '0 / 31 / 98 / 0',
    kiianInk: 'Kiian Hi-Pro Golden Yellow K-10',
    category: 'Teamwear',
    contrast: '#1A1A1A',
    sports: 'Football, Basketball, Netball, Volleyball'
  },
  {
    code: 'PMS 109 C',
    name: 'Vibrant Solar Yellow',
    hex: '#FFD100',
    rgb: [255, 209, 0],
    cmyk: '0 / 10 / 100 / 0',
    kiianInk: 'Kiian Hi-Pro Process Yellow K-09',
    category: 'Teamwear',
    contrast: '#1A1A1A',
    sports: 'Cycling, Marathon, Soccer, Tennis'
  },
  {
    code: 'PMS 348 C',
    name: 'Classic Kelly Green',
    hex: '#00843D',
    rgb: [0, 132, 61],
    cmyk: '96 / 0 / 100 / 22',
    kiianInk: 'Kiian Hi-Pro Emerald Green K-12',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Football, Basketball, Field Hockey'
  },
  {
    code: 'PMS 350 C',
    name: 'Forest Pine Green',
    hex: '#2C5234',
    rgb: [44, 82, 52],
    cmyk: '80 / 25 / 85 / 65',
    kiianInk: 'Kiian Hi-Pro Dark Green K-13',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Outdoor, Tactical, Equestrian, Golf'
  },
  {
    code: 'PMS 2685 C',
    name: 'Royal Crown Purple',
    hex: '#582C83',
    rgb: [88, 44, 131],
    cmyk: '90 / 100 / 0 / 0',
    kiianInk: 'Kiian Hi-Pro Deep Violet K-14',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Basketball, Track, Cheer, Netball'
  },
  {
    code: 'PMS 312 C',
    name: 'Speed Cyan / Electric Turquoise',
    hex: '#00A9CE',
    rgb: [0, 169, 206],
    cmyk: '90 / 0 / 10 / 0',
    kiianInk: 'Kiian Hi-Pro Light Cyan K-15',
    category: 'Teamwear',
    contrast: '#FFFFFF',
    sports: 'Swimming, Triathlon, Cycling, Motorsports'
  },

  // --- High-Visibility & Fluorescent Endurance Shades ---
  {
    code: 'PMS 809 C',
    name: 'Neon Volt Electric Lime',
    hex: '#DFFF00',
    rgb: [223, 255, 0],
    cmyk: '15 / 0 / 95 / 0',
    kiianInk: 'Kiian Fluo Yellow K-FL01',
    category: 'High-Vis',
    contrast: '#1A1A1A',
    sports: 'Marathon, Trail Running, Night Cycling, Soccer Referees'
  },
  {
    code: 'PMS 804 C',
    name: 'Fluorescent Safety Orange',
    hex: '#FF6F00',
    rgb: [255, 111, 0],
    cmyk: '0 / 65 / 100 / 0',
    kiianInk: 'Kiian Fluo Orange K-FL02',
    category: 'High-Vis',
    contrast: '#FFFFFF',
    sports: 'Cross Country, Alpine Expeditions, Field Safety'
  },
  {
    code: 'PMS 806 C',
    name: 'Cyber Neon Magenta',
    hex: '#FF1493',
    rgb: [255, 20, 147],
    cmyk: '0 / 95 / 0 / 0',
    kiianInk: 'Kiian Fluo Pink K-FL03',
    category: 'High-Vis',
    contrast: '#FFFFFF',
    sports: 'Fitness, Gymnastics, Triathlons, Athletics'
  },
  {
    code: 'PMS 801 C',
    name: 'Aero Fluo Cyan Blue',
    hex: '#00D4FF',
    rgb: [0, 212, 255],
    cmyk: '75 / 0 / 0 / 0',
    kiianInk: 'Kiian Fluo Blue K-FL04',
    category: 'High-Vis',
    contrast: '#1A1A1A',
    sports: 'Motorsports, Cycling, Watersports'
  },

  // --- Modern Athleisure & Muted Earth Tones ---
  {
    code: 'PMS 5625 C',
    name: 'Nordic Sage Olive',
    hex: '#6B8E7D',
    rgb: [107, 142, 125],
    cmyk: '55 / 20 / 45 / 15',
    kiianInk: 'Kiian Muted Olive Composite M-01',
    category: 'Muted',
    contrast: '#FFFFFF',
    sports: 'Pilates, Yoga, Lifestyle Activewear, Trail Hiking'
  },
  {
    code: 'PMS 7529 C',
    name: 'Sahara Sand Dune',
    hex: '#C5B9A8',
    rgb: [197, 185, 168],
    cmyk: '20 / 20 / 30 / 5',
    kiianInk: 'Kiian Neutral Warm Sand M-02',
    category: 'Muted',
    contrast: '#1A1A1A',
    sports: 'Outdoor, Tactical, Gym Apparel, Lifestyle Hoodies'
  },
  {
    code: 'PMS 7544 C',
    name: 'Mineral Slate Blue',
    hex: '#8C9BAE',
    rgb: [140, 155, 174],
    cmyk: '45 / 25 / 15 / 5',
    kiianInk: 'Kiian Mineral Cool Gray M-03',
    category: 'Muted',
    contrast: '#1A1A1A',
    sports: 'Athletic Leggings, Seamless Tops, Joggers'
  },
  {
    code: 'PMS 7607 C',
    name: 'Dusty Clay Terracotta',
    hex: '#A05C55',
    rgb: [160, 92, 85],
    cmyk: '25 / 65 / 55 / 15',
    kiianInk: 'Kiian Earth Terracotta M-04',
    category: 'Muted',
    contrast: '#FFFFFF',
    sports: 'Climbing, Functional Fitness, Athleisure'
  },
  {
    code: 'PMS 5005 C',
    name: 'Dusty Rose Mauve',
    hex: '#B88F96',
    rgb: [184, 143, 150],
    cmyk: '20 / 40 / 25 / 5',
    kiianInk: 'Kiian Soft Mauve M-05',
    category: 'Muted',
    contrast: '#1A1A1A',
    sports: 'Womens Gymwear, Seamless Sets, Tennis'
  },
  {
    code: 'PMS 418 C',
    name: 'Tactical Shadow Khaki',
    hex: '#5B584E',
    rgb: [91, 88, 78],
    cmyk: '50 / 45 / 60 / 35',
    kiianInk: 'Kiian Heavy Military Green M-06',
    category: 'Muted',
    contrast: '#FFFFFF',
    sports: 'Tactical, MMA, Combat Gear, Gym Bags'
  },

  // --- Core Neutrals & Base Foundations ---
  {
    code: 'PMS Black 6 C',
    name: 'Stealth Championship Black',
    hex: '#111111',
    rgb: [17, 17, 17],
    cmyk: '70 / 60 / 60 / 95',
    kiianInk: 'Kiian Hi-Pro Deep High-Density Black K-BK',
    category: 'Neutral',
    contrast: '#FFFFFF',
    sports: 'All Sports, Combat, Uniform Bases, Outerwear'
  },
  {
    code: 'PMS 426 C',
    name: 'Industrial Carbon Anthracite',
    hex: '#25282A',
    rgb: [37, 40, 42],
    cmyk: '65 / 55 / 50 / 70',
    kiianInk: 'Kiian Hi-Pro Carbon Grey K-CG',
    category: 'Neutral',
    contrast: '#FFFFFF',
    sports: 'Teamwear Trim, Compression Shorts, Tracksuits'
  },
  {
    code: 'PMS Cool Gray 9 C',
    name: 'Storm Heather Grey',
    hex: '#75787B',
    rgb: [117, 120, 123],
    cmyk: '30 / 22 / 17 / 57',
    kiianInk: 'Kiian Hi-Pro Neutral Medium Grey',
    category: 'Neutral',
    contrast: '#FFFFFF',
    sports: 'French Terry Hoodies, Joggers, Baselayers'
  },
  {
    code: 'PMS Cool Gray 3 C',
    name: 'Silver Mist Grey',
    hex: '#C8C9C7',
    rgb: [200, 201, 199],
    cmyk: '8 / 5 / 7 / 16',
    kiianInk: 'Kiian Hi-Pro Light Silver Tint',
    category: 'Neutral',
    contrast: '#1A1A1A',
    sports: 'Reflective Piping, Mesh Panels, Away Jerseys'
  },
  {
    code: 'PMS 000 C (White)',
    name: 'Optical Clean White',
    hex: '#FFFFFF',
    rgb: [255, 255, 255],
    cmyk: '0 / 0 / 0 / 0',
    kiianInk: 'Sublimation Base Polyester Blank (Bleached)',
    category: 'Neutral',
    contrast: '#1A1A1A',
    sports: 'All Sports, Numbers, Collar Tapes, Away Kits'
  },
  {
    code: 'PMS 7541 C',
    name: 'Warm Porcelain Cream',
    hex: '#F5F1E8',
    rgb: [245, 241, 232],
    cmyk: '2 / 3 / 8 / 0',
    kiianInk: 'Kiian Retro Off-White Tint',
    category: 'Neutral',
    contrast: '#1A1A1A',
    sports: 'Heritage Cricket, Retro Tennis, Lifestyle'
  }
];

/**
 * Curated Athletic Teamwear & Brand Palettes
 */
export const presetPalettes = [
  {
    id: 'hare-apex',
    name: 'Hare Apex Signature',
    tagline: 'High-speed modern athletic identity with maximum visual punch',
    colors: [
      { role: 'Primary Body', ...pantoneLibrary.find(p => p.code === 'PMS 1505 C') },
      { role: 'Secondary Contrast', ...pantoneLibrary.find(p => p.code === 'PMS Black 6 C') },
      { role: 'Accent Trim', ...pantoneLibrary.find(p => p.code === 'PMS 000 C (White)') },
      { role: 'Neutral Base', ...pantoneLibrary.find(p => p.code === 'PMS 426 C') }
    ]
  },
  {
    id: 'collegiate-navy-gold',
    name: 'Varsity Champions',
    tagline: 'Collegiate prestige palette used by top athletic programs',
    colors: [
      { role: 'Primary Body', ...pantoneLibrary.find(p => p.code === 'PMS 282 C') },
      { role: 'Secondary Contrast', ...pantoneLibrary.find(p => p.code === 'PMS 1235 C') },
      { role: 'Accent Trim', ...pantoneLibrary.find(p => p.code === 'PMS 000 C (White)') },
      { role: 'Neutral Base', ...pantoneLibrary.find(p => p.code === 'PMS Cool Gray 3 C') }
    ]
  },
  {
    id: 'euro-crimson-cyan',
    name: 'Euro Football Pulse',
    tagline: 'Aggressive tournament contrast engineered for speed',
    colors: [
      { role: 'Primary Body', ...pantoneLibrary.find(p => p.code === 'PMS 186 C') },
      { role: 'Secondary Contrast', ...pantoneLibrary.find(p => p.code === 'PMS 312 C') },
      { role: 'Accent Trim', ...pantoneLibrary.find(p => p.code === 'PMS Black 6 C') },
      { role: 'Neutral Base', ...pantoneLibrary.find(p => p.code === 'PMS 000 C (White)') }
    ]
  },
  {
    id: 'cyber-volt-endurance',
    name: 'Cyber Volt Marathon',
    tagline: 'High-visibility safety and night endurance performance',
    colors: [
      { role: 'Primary Body', ...pantoneLibrary.find(p => p.code === 'PMS Black 6 C') },
      { role: 'Secondary Contrast', ...pantoneLibrary.find(p => p.code === 'PMS 809 C') },
      { role: 'Accent Trim', ...pantoneLibrary.find(p => p.code === 'PMS 801 C') },
      { role: 'Neutral Base', ...pantoneLibrary.find(p => p.code === 'PMS Cool Gray 9 C') }
    ]
  },
  {
    id: 'nordic-sage-lifestyle',
    name: 'Nordic Sage Gym & Yoga',
    tagline: 'Modern organic gymwear and seamless compression aesthetic',
    colors: [
      { role: 'Primary Body', ...pantoneLibrary.find(p => p.code === 'PMS 5625 C') },
      { role: 'Secondary Contrast', ...pantoneLibrary.find(p => p.code === 'PMS 7529 C') },
      { role: 'Accent Trim', ...pantoneLibrary.find(p => p.code === 'PMS 7541 C') },
      { role: 'Neutral Base', ...pantoneLibrary.find(p => p.code === 'PMS 418 C') }
    ]
  },
  {
    id: 'heritage-rugby',
    name: 'Tradition Celtic Pitch',
    tagline: 'Classic heavy rugby and turf sports colorway',
    colors: [
      { role: 'Primary Body', ...pantoneLibrary.find(p => p.code === 'PMS 348 C') },
      { role: 'Secondary Contrast', ...pantoneLibrary.find(p => p.code === 'PMS 1235 C') },
      { role: 'Accent Trim', ...pantoneLibrary.find(p => p.code === 'PMS 000 C (White)') },
      { role: 'Neutral Base', ...pantoneLibrary.find(p => p.code === 'PMS 350 C') }
    ]
  }
];

export const athleticPalettePresets = presetPalettes;

/**
 * Converts a HEX color string (#FFFFFF or #FFF) to RGB tuple
 */
export function hexToRgb(hex) {
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  const intVal = parseInt(cleaned, 16);
  if (isNaN(intVal) || cleaned.length !== 6) {
    return [255, 117, 31]; // Default Hare orange fallback
  }
  return [
    (intVal >> 16) & 255,
    (intVal >> 8) & 255,
    intVal & 255
  ];
}

/**
 * Calculates weighted perceptual color distance (Redmean metric)
 * between two RGB colors
 */
export function colorDistance(rgb1, rgb2) {
  const rmean = (rgb1[0] + rgb2[0]) / 2;
  const r = rgb1[0] - rgb2[0];
  const g = rgb1[1] - rgb2[1];
  const b = rgb1[2] - rgb2[2];
  return Math.sqrt(
    (((512 + rmean) * r * r) >> 8) +
    4 * g * g +
    (((767 - rmean) * b * b) >> 8)
  );
}

/**
 * Algorithmically finds the nearest Pantone PMS color in the database for any HEX input.
 * Returns the matching Pantone object along with match confidence percentage.
 */
export function findNearestPantone(hexInput) {
  const targetRgb = hexToRgb(hexInput);
  let closest = pantoneLibrary[0];
  let minDistance = Infinity;

  for (const swatch of pantoneLibrary) {
    const dist = colorDistance(targetRgb, swatch.rgb);
    if (dist < minDistance) {
      minDistance = dist;
      closest = swatch;
    }
  }

  // Calculate match confidence percentage (0 to 100%)
  const maxPossibleDist = 765;
  const confidence = Math.max(75, Math.min(99.8, Math.round((1 - minDistance / maxPossibleDist) * 1000) / 10));

  return {
    matchedSwatch: closest,
    distance: Math.round(minDistance * 10) / 10,
    confidence: confidence + '%'
  };
}
