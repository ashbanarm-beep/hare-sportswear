// Authoritative Directory of all public domain pages across Hare Sportswear platform
export const DOMAIN_PAGE_GROUPS = [
  { id: 'all', name: 'All Domain Pages', icon: '🌐' },
  { id: 'core', name: 'Core Platform', icon: '🏢' },
  { id: 'tools', name: 'Digital Tools Suite', icon: '🛠️' },
  { id: 'resources', name: 'Resources & Heritage', icon: '🧵' },
  { id: 'legal', name: 'Legal & Compliance', icon: '⚖️' },
  { id: 'international', name: 'International Country Hubs', icon: '✈️' }
];

export const DOMAIN_PAGES = [
  // 1. Core Platform Pages
  {
    id: 'home',
    name: 'Homepage (Main / Sections)',
    path: '/',
    group: 'core',
    category: 'Core Platform',
    icon: '🏠',
    publicDesc: 'Main Sialkot OEM/ODM factory entrance, production video tour, and collection showcase'
  },
  {
    id: 'home-top',
    name: 'Homepage (Top Hero Zone)',
    path: '/',
    group: 'core',
    category: 'Core Platform',
    icon: '⚡',
    publicDesc: 'Above-the-fold banner and instant callout zone on the homepage'
  },
  {
    id: 'products',
    name: 'Products Catalog',
    path: '/products',
    group: 'core',
    category: 'Core Platform',
    icon: '👕',
    publicDesc: 'Browse 34+ wholesale manufacturing styles: sublimated team match jerseys, sports bras, and combat gear'
  },
  {
    id: 'custom-manufacturing',
    name: 'Custom Manufacturing (OEM/ODM)',
    path: '/custom-manufacturing',
    group: 'core',
    category: 'Core Platform',
    icon: '✂️',
    publicDesc: 'Tech pack development, 7-day physical sampling, Kiian Italian sublimation, and CNC cutting'
  },
  {
    id: 'quality',
    name: 'Quality & Factory Standards',
    path: '/quality',
    group: 'core',
    category: 'Core Platform',
    icon: '🛡️',
    publicDesc: 'AQL 2.5 inspection protocols, ISO 9001 compliance, spectrophotometer color tests, and metal detection'
  },
  {
    id: 'about',
    name: 'About Us & Sialkot Heritage',
    path: '/about',
    group: 'core',
    category: 'Core Platform',
    icon: '🏭',
    publicDesc: 'Four decades of athletic manufacturing craftsmanship, 150kW solar array, and ethical plant operations'
  },
  {
    id: 'contact',
    name: 'Contact & RFQ Quotation',
    path: '/contact',
    group: 'core',
    category: 'Core Platform',
    icon: '📩',
    publicDesc: 'Official line-item quotation and tech pack submission form with 24-hour engineering turnaround'
  },
  {
    id: 'blog',
    name: 'Blog & Technical Articles Hub',
    path: '/blog',
    group: 'core',
    category: 'Core Platform',
    icon: '📰',
    publicDesc: 'Technical sportswear guides, GSM breakdowns, and Sialkot supply chain intel'
  },

  // 2. Digital Pre-Press & Tools Suite
  {
    id: 'tools',
    name: 'Digital Tools Hub',
    path: '/tools',
    group: 'tools',
    category: 'Digital Tools',
    icon: '🛠️',
    publicDesc: 'Central digital pre-press suite for textile engineers, apparel startups, and tournament buyers'
  },
  {
    id: 'cost-estimator',
    name: 'Manufacturing Cost Calculator',
    path: '/tools/cost-estimator',
    group: 'tools',
    category: 'Digital Tools',
    icon: '🧮',
    publicDesc: 'Tiered factory manufacturing cost, weight, DDP air/sea freight, and size curve engine across 29 products'
  },
  {
    id: 'ai-mockup-generator',
    name: 'AI Mockup Generator',
    path: '/tools/ai-mockup-generator',
    group: 'tools',
    category: 'Digital Tools',
    icon: '✨',
    publicDesc: 'Google Gemini 3.5 Flash photorealistic sportswear prototype generation with 17 factory silhouettes'
  },
  {
    id: 'pantone-matcher',
    name: 'Pantone PMS Color Matcher',
    path: '/tools/pantone-matcher',
    group: 'tools',
    category: 'Digital Tools',
    icon: '🎨',
    publicDesc: 'HEX/RGB to official Pantone Textile (PMS) conversion and Italian Kiian sublimation ink formulation'
  },
  {
    id: 'palette-generator',
    name: 'Uniform Palette Generator',
    path: '/tools/palette-generator',
    group: 'tools',
    category: 'Digital Tools',
    icon: '🎯',
    publicDesc: 'Broadcast-compliant athletic uniform color harmonies and live 4-slot vector kit preview simulator'
  },

  // 3. Resources & Brand Heritage
  {
    id: 'fabric-glossary',
    name: 'Fabric Glossary Hub',
    path: '/fabric-glossary',
    group: 'resources',
    category: 'Resources',
    icon: '🧵',
    publicDesc: 'Technical engineering profiles, GSM weights, breathability ratings, and recommended applications'
  },
  {
    id: 'meet-hare',
    name: 'Meet Hurry the Hare',
    path: '/meet-hare',
    group: 'resources',
    category: 'Resources',
    icon: '🐇',
    publicDesc: 'Official mascot and ambassador representing rapid prototyping speed and agile Sialkot craftsmanship'
  },

  // 4. Legal & Compliance
  {
    id: 'terms',
    name: 'Terms of Service',
    path: '/terms',
    group: 'legal',
    category: 'Legal & Terms',
    icon: '📜',
    publicDesc: 'B2B commercial manufacturing terms, sample approvals, bulk production tolerances, and warranty'
  },
  {
    id: 'privacy',
    name: 'Privacy Policy',
    path: '/privacy',
    group: 'legal',
    category: 'Legal & Terms',
    icon: '🔒',
    publicDesc: 'Client tech pack confidentiality, design IP protection, and non-disclosure guarantees'
  },

  // 5. Regional & International Country Hubs
  {
    id: 'usa-hub',
    name: 'USA Distribution Hub',
    path: '/sports-wear-manufacturer-usa',
    group: 'international',
    category: 'Country Hub',
    icon: '🇺🇸',
    publicDesc: 'Dedicated US teamwear distribution, DDP air courier, and American athletic fit grading'
  },
  {
    id: 'uk-hub',
    name: 'UK & British Clubs Hub',
    path: '/sports-wear-manufacturer-uk',
    group: 'international',
    category: 'Country Hub',
    icon: '🇬🇧',
    publicDesc: 'Direct Sialkot supply to UK football clubs, rugby academies, and private label gymwear brands'
  },
  {
    id: 'australia-hub',
    name: 'Australia & Oceania Hub',
    path: '/sports-wear-manufacturer-australia',
    group: 'international',
    category: 'Country Hub',
    icon: '🇦🇺',
    publicDesc: 'AFL guernseys, netball dresses, and cricket kits for Australian sporting leagues'
  },
  {
    id: 'germany-hub',
    name: 'Germany & EU Hub',
    path: '/sports-wear-manufacturer-germany',
    group: 'international',
    category: 'Country Hub',
    icon: '🇩🇪',
    publicDesc: 'Oeko-Tex Standard 100 certified sportswear for German and EU athletic clubs and fitness brands'
  },
  {
    id: 'canada-hub',
    name: 'Canada Winter & Hockey Hub',
    path: '/sports-wear-manufacturer-canada',
    group: 'international',
    category: 'Country Hub',
    icon: '🇨🇦',
    publicDesc: 'Heavyweight Airknit ice hockey jerseys and winter performance wear for Canadian leagues'
  },
  {
    id: 'uae-hub',
    name: 'UAE & Dubai Sports Hub',
    path: '/sports-wear-manufacturer-uae',
    group: 'international',
    category: 'Country Hub',
    icon: '🇦🇪',
    publicDesc: 'Express 4-day Sialkot to Dubai air cargo for UAE sports academies and luxury tournament brands'
  },
  {
    id: 'france-hub',
    name: 'France European Hub',
    path: '/sports-wear-manufacturer-france',
    group: 'international',
    category: 'Country Hub',
    icon: '🇫🇷',
    publicDesc: 'Sublimated teamwear and martial arts gear for French sports federations and fitness brands'
  },
  {
    id: 'netherlands-hub',
    name: 'Netherlands & Benelux Hub',
    path: '/sports-wear-manufacturer-netherlands',
    group: 'international',
    category: 'Country Hub',
    icon: '🇳🇱',
    publicDesc: 'Direct factory custom sportswear and logistics for Netherlands & Benelux sports organizations'
  }
];
