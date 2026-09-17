export const categories = [
  { id: 'all', name: 'All Products', count: 18 },
  { id: 'teamwear', name: 'Teamwear & Kits', count: 6 },
  { id: 'activewear', name: 'Activewear & Gym Essentials', count: 6 },
  { id: 'accessories', name: 'Sports Goods & Gear', count: 6 },
];

export const materialTypes = [
  'All Materials',
  '100% Polyester Interlock',
  'Poly-Spandex Stretch Blend',
  'Birdseye Mesh',
  'Heavyweight French Terry',
  'Thermal PU Leather',
  'German Contact Latex',
  'Pearl Weave Ripstop'
];

export const products = [
  {
    id: 'prod-01',
    name: 'Pro Elite Sublimated Football Kit',
    category: 'teamwear',
    sport: 'Football / Soccer',
    badge: 'Best Seller',
    material: '100% Micro Polyester Interlock',
    gsm: '155 - 160 GSM',
    moq: '25 Sets',
    leadTime: '10-14 Days',
    image: '/images/products/product-01-football-kit.jpg',
    gallery: [
      '/images/products/product-01-football-kit.jpg'
    ],
    description: 'Engineered for professional clubs and tournament play. Features full all-over Italian sublimation with zero color-bleed, ultra-fast moisture wicking, reinforced bar-tack seams, and ergonomic side mesh cooling inserts.',
    features: [
      'Anti-Bacterial & Odor-Resistant Silver-ion Finish',
      'Sublimated Numbering, Names & Sponsor Logos included',
      'Ergonomic Raglan or Set-In Sleeve options',
      'Ribbed V-neck or Crew collar configurations',
      'Includes matching shorts with inner drawcord'
    ],
    customizationOptions: [
      'All-Over Italian Kiian Dye Sublimation',
      'Silicone 3D Raised Club Crest Badges',
      'Laser-cut Ventilation Eyelets on Ribs',
      'Custom Printed Neck Tape & Woven Hem Tags'
    ],
    sizes: ['YS', 'YM', 'YL', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
  },
  {
    id: 'prod-02',
    name: 'Pro Reversible Basketball Uniform',
    category: 'teamwear',
    sport: 'Basketball',
    badge: 'Low MOQ',
    material: 'Poly-Birdseye Mesh',
    gsm: '180 GSM (Dual-Ply)',
    moq: '20 Sets',
    leadTime: '12-15 Days',
    image: '/images/products/product-02-basketball-uniform.jpg',
    gallery: [
      '/images/products/product-02-basketball-uniform.jpg'
    ],
    description: 'Two jerseys in one for home and away fixtures. Dual-layer micro birdseye mesh offers maximum airflow and frictionless drape during intense court movement.',
    features: [
      'Dual-ply reversible construction with clean hidden armhole finish',
      'Deep armholes for unrestricted shooting motion',
      'Sublimated tackle-twill look graphics or screen printing',
      'Matching shorts with 2-inch heavy elasticated waistband'
    ],
    customizationOptions: [
      'Sublimation Printing on both sides',
      'Tackle Twill Stitching on numbers',
      'Sublimated woven rib knit around collar & armholes'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL']
  },
  {
    id: 'prod-03',
    name: 'High-Performance Rugby Match Jersey',
    category: 'teamwear',
    sport: 'Rugby Union / League',
    badge: 'Tear-Resistant',
    material: 'Poly-Spandex Stretch Blend',
    gsm: '280 - 300 GSM',
    moq: '25 Pcs',
    leadTime: '14 Days',
    image: '/images/products/product-03-rugby-jersey.jpg',
    gallery: [
      '/images/products/product-03-rugby-jersey.jpg'
    ],
    description: 'Heavyweight, grip-infused rugby match jersey built to withstand high-impact scrums and tackles. Features tensile-reinforced flatlock stitching and rubber button plackets.',
    features: [
      '4-way tensile stretch with snap-back recovery',
      'Internal silicon chest grip print for ball security',
      'Reinforced Mandarin or traditional rugby loop collar',
      'Triple-needle cover-stitching on all stress seams'
    ],
    customizationOptions: [
      'Sublimation Print with high UV stability',
      'Tajima 3D Embroidered Club Crests',
      'Rubberized GPS Tracker Pocket on upper back'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '5XL']
  },
  {
    id: 'prod-04',
    name: 'T20 Pro Sublimated Cricket Kit',
    category: 'teamwear',
    sport: 'Cricket',
    badge: 'CoolMax Tech',
    material: '100% Polyester Interlock',
    gsm: '160 GSM CoolMax Jacquard',
    moq: '25 Sets',
    leadTime: '12 Days',
    image: '/images/products/product-04-cricket-kit.jpg',
    gallery: [
      '/images/products/product-04-cricket-kit.jpg'
    ],
    description: 'Designed for high-performance fielding and batting in warm climates. Featuring UPF 50+ sun protection and moisture channels that disperse sweat rapidly.',
    features: [
      'UPF 50+ Ultraviolet Protection',
      'Polo collar with lightweight 2-button placket',
      'Breathable side panel mesh for maximum cross-ventilation',
      'Reinforced cricket trousers with deep angled pockets'
    ],
    customizationOptions: [
      'Full Body Sublimation',
      'Embroidered Association Crest',
      'Heat-seal reflective sponsor transfers'
    ],
    sizes: ['YS', 'YM', 'YL', 'S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: 'prod-05',
    name: 'Classic Button-Down Baseball Jersey',
    category: 'teamwear',
    sport: 'Baseball / Softball',
    badge: 'Authentic Spec',
    material: '100% Polyester Interlock',
    gsm: '220 GSM Double Knit',
    moq: '30 Pcs',
    leadTime: '14 Days',
    image: '/images/products/product-05-baseball-jersey.jpg',
    gallery: [
      '/images/products/product-05-baseball-jersey.jpg'
    ],
    description: 'Traditional pro-cut baseball jersey featuring full button-up front with braided piping along placket, neck, and cuffs. Built with heavy-duty snag-resistant double knit yarn.',
    features: [
      'Authentic full button front with spacing for team lettering',
      'Woven braid piping trim in 1/8" or 1/4" widths',
      'Drop-tail curved hem for clean tucked or untucked look'
    ],
    customizationOptions: [
      'Multi-layer Tackle Twill Embroidery',
      'Sublimated base with stitched patches',
      'Custom woven vintage neck label'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL']
  },
  {
    id: 'prod-06',
    name: 'Sublimated Ice / Field Hockey Jersey',
    category: 'teamwear',
    sport: 'Hockey',
    badge: 'Reinforced',
    material: 'Birdseye Mesh',
    gsm: '240 GSM Heavy Knit',
    moq: '20 Pcs',
    leadTime: '14 Days',
    image: '/images/products/product-06-hockey-jersey.jpg',
    gallery: [
      '/images/products/product-06-hockey-jersey.jpg'
    ],
    description: 'Roomy pro-fit cut designed to accommodate chest protectors and elbow pads. Double-layered shoulders and reinforced elbows give superior abrasion resistance.',
    features: [
      'Double shoulders and elbows for gear abrasion durability',
      'Lace-up or crossover V-neck styling with gusset',
      'Optional authentic nylon fight-strap with snap button'
    ],
    customizationOptions: [
      'Dye Sublimation with rich vibrant PMS colors',
      'High-density Chenille or Twill crest embroidery',
      'Screen printed or sublimated sock sets'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', 'Goalie Cut']
  },
  {
    id: 'prod-07',
    name: 'Pro Athletic Compression Rashguard',
    category: 'activewear',
    sport: 'MMA / BJJ / Crossfit',
    badge: '4-Way Stretch',
    material: 'Poly-Spandex Stretch Blend',
    gsm: '230 GSM (85% Poly / 15% Spandex)',
    moq: '30 Pcs',
    leadTime: '10 Days',
    image: '/images/products/product-07-compression-rashguard.jpg',
    gallery: [
      '/images/products/product-07-compression-rashguard.jpg'
    ],
    description: 'Second-skin compression designed for martial arts, grappling, and gym training. 6-thread flatlock seams prevent mat burns and chafing. Sublimation will never peel or crack.',
    features: [
      'Graduated compression profile supports muscle recovery',
      'Anti-slip silicone gel waistband keeps rashguard anchored',
      'Reinforced flatlock stitching using premium Coats thread',
      'Antibacterial and quick-dry hydro-shield finish'
    ],
    customizationOptions: [
      'Full all-over Sublimation',
      'Silicone waist grip branding',
      'Internal heat transfer care labels (tagless)'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: 'prod-08',
    name: 'Heavyweight Tech Fleece Pullover Hoodie',
    category: 'activewear',
    sport: 'Lifestyle / Gym',
    badge: 'Premium Comfort',
    material: 'Heavyweight French Terry',
    gsm: '340 - 360 GSM (80% Cotton / 20% Poly)',
    moq: '50 Pcs',
    leadTime: '15-18 Days',
    image: '/images/products/product-08-fleece-hoodie.jpg',
    gallery: [
      '/images/products/product-08-fleece-hoodie.jpg'
    ],
    description: 'Custom heavyweight streetwear-inspired fitness hoodie. Features a 3-panel double-layer hood, bonded waterproof zip kangaroo pocket, and matte metal custom-branded aglets.',
    features: [
      'Pre-shrunk comb-cotton face ideal for high-density printing',
      'Brushed fleece interior provides warmth without bulk',
      'Heavy 2x2 ribbing on cuffs and bottom waistband'
    ],
    customizationOptions: [
      'Puff / High-Density Screen Printing',
      'Chenille / Felt Lettering Applique',
      'Custom dyed PMS colors (Pantone matching)',
      'Metal aglets engraved with your brand logo'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL']
  },
  {
    id: 'prod-09',
    name: 'Tapered Athletic French Terry Joggers',
    category: 'activewear',
    sport: 'Gym / Warm-Up',
    badge: 'Pre-Shrunk',
    material: 'Heavyweight French Terry',
    gsm: '320 GSM 100% Cotton',
    moq: '50 Pcs',
    leadTime: '15 Days',
    image: '/images/products/product-09-terry-joggers.jpg',
    gallery: [
      '/images/products/product-09-terry-joggers.jpg'
    ],
    description: 'Modern slim-tapered athletic jogger pants crafted from premium ringspun French Terry. Features concealed zip pockets to keep phones and keys safe during workouts.',
    features: [
      'YKK concealed waterproof pocket zippers',
      'Gusseted crotch panel for maximum squats range of motion',
      'Chunky flat braided drawstring with custom metal tips'
    ],
    customizationOptions: [
      'Subtle 3D Silicone Transfer Logo',
      'Tajima Direct Embroidery',
      'Custom woven patch on back pocket'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: 'prod-10',
    name: 'Seamless High-Waist Women Leggings',
    category: 'activewear',
    sport: 'Yoga / Training',
    badge: 'Squat-Proof',
    material: 'Poly-Spandex Stretch Blend',
    gsm: '250 GSM (78% Nylon / 22% Spandex)',
    moq: '40 Pcs',
    leadTime: '12-15 Days',
    image: '/images/products/product-10-seamless-leggings.jpg',
    gallery: [
      '/images/products/product-10-seamless-leggings.jpg'
    ],
    description: 'Ultra-luxurious buttery soft hand-feel with complete squat-proof opacity. Designed with a wide compressive waistband that stays in place with zero roll-down.',
    features: [
      '100% Squat-Proof zero-sheer testing guaranteed',
      'Seamless front (no camel-toe center seam)',
      'Hidden key/card pocket inside waistband',
      'Contouring glute-accentuating subtle back seam'
    ],
    customizationOptions: [
      'Matte Heat Transfer Vinyl Logos',
      'Laser-cut pattern detailing along calf',
      'Custom Pantone matching & custom hangtags'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-11',
    name: 'High-Impact Racerback Sports Bra',
    category: 'activewear',
    sport: 'Fitness / Running',
    badge: 'High Support',
    material: 'Poly-Spandex Stretch Blend',
    gsm: '260 GSM Recycled Poly Blend',
    moq: '40 Pcs',
    leadTime: '12-14 Days',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for high-impact sports like sprinting, HIIT, and boxing. Features perforated breathable lining, removable molded cups, and an ultra-soft plush underband.',
    features: [
      'Removable anti-bacterial molded foam padding',
      'Reinforced racerback straps for maximum scapular mobility',
      'Plush brushed elastic underband prevents skin irritation'
    ],
    customizationOptions: [
      'Sublimation or solid Pantone reactive dye',
      'Reflective transfer logo for night running',
      'Custom woven underband elastic with brand jacquard'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-12',
    name: 'Ultralight Seamless Training Gym Tee',
    category: 'activewear',
    sport: 'Gym / Crossfit',
    badge: 'Ultralight',
    material: '100% Polyester Interlock',
    gsm: '135 GSM Engineered Mesh',
    moq: '50 Pcs',
    leadTime: '10-12 Days',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Weightless athletic tee with gradient jacquard breathability. Pulls moisture directly from skin to the surface where it evaporates in seconds.',
    features: [
      'Featherweight 135 GSM aerated fabric structure',
      'Forward side seams prevent friction during repetitive workouts',
      'Curved split droptail hem'
    ],
    customizationOptions: [
      'Soft-hand Screen Printing',
      'Sublimation Printing',
      'Reflective 3M safety transfers'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: 'prod-13',
    name: 'FIFA Pro Thermal-Bonded Match Ball',
    category: 'accessories',
    sport: 'Football / Soccer',
    badge: 'Sialkot Craftsmanship',
    material: 'Thermal PU Leather',
    gsm: '1.2mm Textured Japanese PU',
    moq: '50 Balls',
    leadTime: '15-20 Days',
    image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Manufactured in the heart of Sialkot—supplier to the world cup match balls. Seamless thermal-bonding technology delivers zero water absorption, true flight trajectory, and exceptional shape retention.',
    features: [
      'Seamless thermal bonding technology (zero stitch water absorption)',
      'High-grade Taiwanese butyl bladder with micro-fiber backing',
      'Tested to FIFA Quality Pro weight, rebound, and circumference standards',
      'Textured dimpled surface provides superior grip in wet conditions'
    ],
    customizationOptions: [
      'Full Custom Panel Graphic Printing',
      'Custom Match Ball Gift Box packaging',
      'Official Club / Tournament Logos and Serial Numbers'
    ],
    sizes: ['Size 5 (Official)', 'Size 4 (Youth)', 'Size 3 (Junior)']
  },
  {
    id: 'prod-14',
    name: 'Elite Contact Grip Goalkeeper Gloves',
    category: 'accessories',
    sport: 'Football / Goalkeeping',
    badge: 'German Latex',
    material: 'German Contact Latex',
    gsm: '4mm German Pro Contact Foam',
    moq: '30 Pairs',
    leadTime: '14-18 Days',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pro goalkeeper glove featuring 4mm premium German Contact Latex palm offering supreme grip in dry and wet conditions. Negative cut design provides tight, tactile feel.',
    features: [
      'Negative or Roll-Finger cut with latex wrapped thumb',
      'Embossed 3mm neoprene backhand for punch protection',
      'Removable spine finger-protection system optional',
      'Extended wrist bandage with full latex lock strap'
    ],
    customizationOptions: [
      'Silicone injection backhand printing',
      'Personalized wrist strap name & flag printing',
      'Custom branded zipper glove carry pouch'
    ],
    sizes: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11']
  },
  {
    id: 'prod-15',
    name: 'Pro Sparring & Fight Boxing Gloves',
    category: 'accessories',
    sport: 'Boxing / Combat Sports',
    badge: 'Handmade Leather',
    material: 'Thermal PU Leather',
    gsm: 'Genuine Cowhide / Microfiber',
    moq: '30 Pairs',
    leadTime: '15-20 Days',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Traditional Sialkot handmade leather combat gloves. Multi-layer foam padding distributes knuckle impact evenly, protecting hands during heavy sparring.',
    features: [
      'Multi-density EVA and shock-absorbing gel knuckle padding',
      'Full wrap-around hook and loop wrist support or traditional lace-up',
      'Attached thumb design prevents accidental eye gouging and hyper-extension',
      'Water-repellent nylon lining prevents sweat absorption into padding'
    ],
    customizationOptions: [
      'Screen Printed or Hot-Stamped Foil Logos',
      'Custom woven wrist patch with embossed border',
      'Available in Genuine Cowhide or Microfiber Leather'
    ],
    sizes: ['10 oz', '12 oz', '14 oz', '16 oz']
  },
  {
    id: 'prod-16',
    name: 'Competition Brazilian Jiu-Jitsu (BJJ) Gi',
    category: 'accessories',
    sport: 'Martial Arts / BJJ',
    badge: 'IBJJF Legal',
    material: 'Pearl Weave Ripstop',
    gsm: '450 GSM Pearl Weave + 10oz Pants',
    moq: '25 Sets',
    leadTime: '18-22 Days',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'IBJJF tournament compliant kimono. Jacket crafted from 450 GSM pre-shrunk Pearl Weave cotton with EVA foam collar, paired with military-grade 10oz ripstop cotton pants.',
    features: [
      'EVA foam collar wrapped in ripstop prevents bacteria accumulation',
      'Reinforced stress points (armpits, side slits, pants knees)',
      'Stretchy bungee cord drawstring on trousers with 6 loop system',
      'Triple stitching across all structural seams'
    ],
    customizationOptions: [
      'Direct Embroidery on shoulders, chest, and pants',
      'Sublimated interior rashguard lining',
      'Custom woven patches and embroidered cotton travel bag'
    ],
    sizes: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5']
  },
  {
    id: 'prod-17',
    name: 'Heavy Duty 900D Athletic Gear Duffle Bag',
    category: 'accessories',
    sport: 'All Sports / Travel',
    badge: 'Waterproof Base',
    material: 'Thermal PU Leather',
    gsm: '900D Ballistic Cordura Nylon',
    moq: '50 Pcs',
    leadTime: '15 Days',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Rugged B2B custom team travel bag. Built with ventilated shoe compartment, water-resistant tarp bottom, and padded backpack convertibility straps.',
    features: [
      'Aerated separate shoe compartment prevents locker smell',
      'Waterproof tarpaulin base for wet turf or court placement',
      'Heavy-duty #10 YKK zippers with paracord pullers',
      'Concealable ergonomic padded backpack shoulder straps'
    ],
    customizationOptions: [
      'Silk Screen Printing or Rubberized 3D Patch',
      'Embroidered Team / Club Logo',
      'Custom branded zipper pullers and lining print'
    ],
    sizes: ['55 Liters (Medium)', '75 Liters (Large Pro)']
  },
  {
    id: 'prod-18',
    name: 'Custom Jacquard Performance Sports Socks',
    category: 'accessories',
    sport: 'Football / Basketball / Running',
    badge: 'Cushioned Sole',
    material: 'Poly-Spandex Stretch Blend',
    gsm: '80% Combed Cotton / 15% Poly / 5% Elastane',
    moq: '100 Pairs',
    leadTime: '10 Days',
    image: 'https://images.unsplash.com/photo-1582965372486-66497473d0f6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582965372486-66497473d0f6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Custom knit technical team socks featuring terry cushioned sole for shock absorption, rib-arch compression band for stability, and anti-blister flat toe seams.',
    features: [
      'Direct Jacquard knit allows intricate team logos and lettering',
      'Zone-cushioned heel and toe for impact protection',
      'Compression arch band prevents sock twisting during sprints',
      'Ribbed leg with high recovery elastane prevents slipping'
    ],
    customizationOptions: [
      'Knit-in custom jacquard patterns and colors',
      'Optional silicone anti-slip grip pads on soles',
      'Custom printed cardboard header tags with barcodes'
    ],
    sizes: ['Youth (34-38)', 'Adult Regular (39-43)', 'Adult Large (44-48)']
  }
];
