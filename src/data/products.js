export const categories = [
  { id: 'all', name: 'All Products', count: 32 },
  { id: 'teamwear', name: 'Teamwear', count: 6 },
  { id: 'activewear', name: 'Activewear', count: 6 },
  { id: 'equipment', name: 'Sports Equipment & Goods', count: 20 },
];

export const equipmentSubcategories = [
  { id: 'all-equipment', name: 'All Equipment & Goods' },
  { id: 'combat-sports', name: 'Wrestling & Combat Gear' },
  { id: 'racket-sports', name: 'Racket & Net Sports' },
  { id: 'fitness', name: 'Fitness & Gym Equipment' },
  { id: 'cue-sports', name: 'Cue Sports' },
  { id: 'team-sports', name: 'Team Sports Equipment' },
  { id: 'outdoor', name: 'Outdoor & Camping Gear' },
  { id: 'bags-accessories', name: 'Bags & Accessories' },
];

export const materialTypes = [
  'All Materials',
  '100% Polyester Interlock',
  'Poly-Spandex Stretch Blend',
  'Birdseye Mesh',
  'Heavyweight French Terry',
  'Thermal PU Leather',
  'German Contact Latex',
  'Pearl Weave Ripstop',
  'Toray High-Modulus Carbon Graphite',
  'Goose Feather & Synthetic Nylon',
  'High-Density Eco TPE / Rubber',
  'Cast Iron & Hex Virgin Rubber',
  'Ash Wood & Canadian Maple',
  'Microfiber Composite Leather',
  'Aircraft 7075 Aluminum & 3K Carbon',
  '1000D Cordura & 210T Ripstop Poly',
  'Heavy-Duty Synthetic Leather & Alloy',
  'Reinforced High-Tensile PU & Vinyl',
  'High-Density EVA Foam & Polymer Shell',
  'Honeycomb Mesh & Gum Rubber Sole'
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
    image: '/images/products/product-11-sports-bra.jpg',
    gallery: [
      '/images/products/product-11-sports-bra.jpg'
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
    image: '/images/products/product-12-training-tee.jpg',
    gallery: [
      '/images/products/product-12-training-tee.jpg'
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
    category: 'equipment',
    subcategory: 'team-sports',
    sport: 'Football / Soccer',
    badge: 'Sialkot Craftsmanship',
    material: 'Thermal PU Leather',
    gsm: '1.2mm Textured Japanese PU',
    moq: '50 Balls',
    leadTime: '15-20 Days',
    image: '/images/products/product-13-match-ball.jpg',
    gallery: [
      '/images/products/product-13-match-ball.jpg'
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
    category: 'equipment',
    subcategory: 'team-sports',
    sport: 'Football / Goalkeeping',
    badge: 'German Latex',
    material: 'German Contact Latex',
    gsm: '4mm German Pro Contact Foam',
    moq: '30 Pairs',
    leadTime: '14-18 Days',
    image: '/images/products/product-14-goalkeeper-gloves.jpg',
    gallery: [
      '/images/products/product-14-goalkeeper-gloves.jpg'
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
    category: 'equipment',
    subcategory: 'combat-sports',
    sport: 'Boxing / Combat Sports',
    badge: 'Handmade Leather',
    material: 'Thermal PU Leather',
    gsm: 'Genuine Cowhide / Microfiber',
    moq: '30 Pairs',
    leadTime: '15-20 Days',
    image: '/images/products/product-15-boxing-gloves.jpg',
    gallery: [
      '/images/products/product-15-boxing-gloves.jpg'
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
    category: 'equipment',
    subcategory: 'combat-sports',
    sport: 'Martial Arts / BJJ',
    badge: 'IBJJF Legal',
    material: 'Pearl Weave Ripstop',
    gsm: '450 GSM Pearl Weave + 10oz Pants',
    moq: '25 Sets',
    leadTime: '18-22 Days',
    image: '/images/products/product-16-bjj-gi.jpg',
    gallery: [
      '/images/products/product-16-bjj-gi.jpg'
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
    category: 'equipment',
    subcategory: 'bags-accessories',
    sport: 'All Sports / Travel',
    badge: 'Waterproof Base',
    material: 'Thermal PU Leather',
    gsm: '900D Ballistic Cordura Nylon',
    moq: '50 Pcs',
    leadTime: '15 Days',
    image: '/images/products/product-17-gear-duffle-bag.jpg',
    gallery: [
      '/images/products/product-17-gear-duffle-bag.jpg'
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
    category: 'equipment',
    subcategory: 'bags-accessories',
    sport: 'Football / Basketball / Running',
    badge: 'Cushioned Sole',
    material: 'Poly-Spandex Stretch Blend',
    gsm: '80% Combed Cotton / 15% Poly / 5% Elastane',
    moq: '100 Pairs',
    leadTime: '10 Days',
    image: '/images/products/product-18-sports-socks.jpg',
    gallery: [
      '/images/products/product-18-sports-socks.jpg'
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
  },
  {
    id: 'prod-19',
    name: 'Pro Tour Carbon-Graphite Badminton Racket',
    category: 'equipment',
    subcategory: 'racket-sports',
    sport: 'Badminton / Racket Sports',
    badge: 'Toray Carbon',
    material: 'Toray High-Modulus Carbon Graphite',
    gsm: '4U (82-84g) / 3U (85-88g)',
    moq: '50 Rackets',
    leadTime: '15-18 Days',
    image: '/images/products/product-19-badminton-racket.jpg',
    gallery: [
      '/images/products/product-19-badminton-racket.jpg'
    ],
    description: 'Engineered with Toray T800 Japanese high-modulus carbon graphite. Features an aerodynamic isometric head shape for an expanded sweet spot, ultra-slim 6.8mm aero-box shaft for lightning-fast swing speed, and 28-32 lbs string tension capability.',
    features: [
      'Toray T800 Carbon Fiber Frame & Nanomaterial Resin',
      'Ultra-Slim 6.8mm Aerodynamic Shaft for Reduced Drag',
      'High-Tension Grommet System (Rated up to 32 lbs)',
      'Vibration-Damping Solid Wooden Handle with Cushioned PU Grip',
      'Dynamic Optimum Frame with Enlarged Isometric Sweet Spot'
    ],
    customizationOptions: [
      'Custom Laser Decal Graphic & Matte/Gloss Finish',
      'Branded Grip Tape & Laser-Engraved End Cap Badge',
      'Full-Coverage Padded Thermal Carry Bag with Custom Embroidery'
    ],
    sizes: ['4U (83±2g) G5 Grip', '3U (87±2g) G4 Grip'],
    gearSpecs: {
      weight: '82g - 87g (3U / 4U)',
      balancePoint: '295mm - 305mm (Head Heavy / Balanced)',
      maxTension: '28 - 32 lbs',
      frameComposition: 'Toray T800 High-Modulus Carbon'
    }
  },
  {
    id: 'prod-20',
    name: 'Tournament Feather & Pro Nylon Shuttlecocks (12-Pack)',
    category: 'equipment',
    subcategory: 'racket-sports',
    sport: 'Badminton / Tournaments',
    badge: 'Tournament Grade',
    material: 'Goose Feather & Synthetic Nylon',
    gsm: '4.8g - 5.2g per Shuttlecock',
    moq: '100 Tubes (1,200 pcs)',
    leadTime: '12-15 Days',
    image: '/images/products/product-20-shuttlecocks.jpg',
    gallery: [
      '/images/products/product-20-shuttlecocks.jpg'
    ],
    description: 'Available in two precision tournament configurations: Grade-A selected natural goose feather with three-layer Portuguese natural cork base for international tournament trajectory, or high-tensile engineering nylon skirts with composite EVA cork heads for high-durability training facilities.',
    features: [
      'Grade-A Dense Goose Feather or High-Tensile Resilient Nylon Skirt',
      'Three-layer Solid Natural Portuguese Oak Wood / Cork Core',
      'Tested for Exact Flight Trajectory, Speed Rating (77/78), and Durability',
      'Precision Stitched Feather Binding with Moisture-Sealed Adhesive',
      'Anti-Crack Synthetic Skirt Option for 5x Longer Club Practice Life'
    ],
    customizationOptions: [
      'Custom Printed Tube Packaging & Metallic End Foil',
      'Branded Inner Cork Decal Label',
      'Custom Flight Speed Grading (Speed 76, 77, or 78)'
    ],
    sizes: ['Standard Tournament Speed 77', 'Training Speed 78'],
    gearSpecs: {
      featherCount: '16 Selected Goose Feathers',
      baseMaterial: '3-Layer Natural Cork / EVA Composite',
      flightSpeed: 'Speed 77 (Tournament) / Speed 78 (Fast)',
      durabilityScore: '400+ Hit Impact Resistance'
    }
  },
  {
    id: 'prod-21',
    name: '3K Carbon Spin Pro Padel Racket',
    category: 'equipment',
    subcategory: 'racket-sports',
    sport: 'Padel / Court Sports',
    badge: '3K Carbon Core',
    material: 'Toray High-Modulus Carbon Graphite',
    gsm: '360g - 375g Balance',
    moq: '40 Rackets',
    leadTime: '18-22 Days',
    image: '/images/products/product-21-padel-racket.jpg',
    gallery: [
      '/images/products/product-21-padel-racket.jpg'
    ],
    description: 'Full 3K bi-directional carbon fiber face paired with 100% carbon tubular frame and high-rebound Soft EVA 17 memory foam core. Features a 3D hexagonal sand-spin textured surface for maximum spin control, power output, and elbow vibration reduction.',
    features: [
      'Bi-Directional 3K Carbon Fiber Hitting Face',
      'Elastic Soft EVA Memory Foam Core (Density 17-20)',
      '3D Rough Sand-Grit Textured Surface for Extreme Ball Spin',
      'Shock-Absorbing Heart Bridge System Minimizes Tennis Elbow',
      'High-Flow Aerodynamic Hole Drilling Pattern for Swift Maneuverability'
    ],
    customizationOptions: [
      '3K / 12K / 18K Carbon Weave Finish Options',
      'Full-Surface Metallic UV Screen Graphics & Neon Accents',
      'Custom Embossed Neoprene Thermal Padel Cover with Shoulder Strap'
    ],
    sizes: ['Standard 38mm Profile (365±5g)'],
    gearSpecs: {
      frameThickness: '38 mm Profile',
      coreDensity: 'Soft EVA 17 Foam',
      surfaceTexture: '3D Hexagonal Spin Grit',
      shape: 'Teardrop (Power) / Round (Control)'
    }
  },
  {
    id: 'prod-22',
    name: 'Eco-Friendly High-Density TPE & Rubber Yoga Mat',
    category: 'equipment',
    subcategory: 'fitness',
    sport: 'Yoga / Pilates / Gym',
    badge: 'Eco Non-Slip',
    material: 'High-Density Eco TPE / Rubber',
    gsm: '6mm - 8mm High Density (950g)',
    moq: '50 Mats',
    leadTime: '10-14 Days',
    image: '/images/products/product-22-yoga-mat.jpg',
    gallery: [
      '/images/products/product-22-yoga-mat.jpg'
    ],
    description: 'Dual-layer closed-cell eco-friendly TPE and natural tree rubber workout mat. Completely non-toxic, PVC-free, and odorless with a textured non-slip wave base for zero slipping on wooden or tiled gym floors. Includes laser-etched precision alignment lines.',
    features: [
      'Dual-Layer Co-Extrusion Tech: Non-Slip Textured Top + Anti-Skid Wave Base',
      'Closed-Cell Waterproof Structure Prevents Sweat & Bacteria Penetration',
      'Laser-Engraved Body Alignment System for Safe Pose Guidance',
      '6mm High-Rebound Cushioning Protects Knees and Joints',
      'Hypoallergenic, 100% Recyclable, and Free from Toxic Phthalates'
    ],
    customizationOptions: [
      'Laser-Engraved Custom Alignment Lines & Brand Logo',
      'Debossed / Hot-Pressed Custom Corner Emblem',
      'Matching Woven Carrying Strap & Branded Canvas Yoga Bag'
    ],
    sizes: ['183cm x 61cm (72" x 24")', '183cm x 68cm (Extra Wide)'],
    gearSpecs: {
      thickness: '6mm / 8mm High-Density Cushion',
      composition: 'Dual-Layer Biodegradable TPE',
      traction: 'Dual-Pattern Wet & Dry Non-Slip',
      cleaning: 'Wipe Clean Waterproof Surface'
    }
  },
  {
    id: 'prod-23',
    name: 'Commercial Hex Rubber-Coated Dumbbells',
    category: 'equipment',
    subcategory: 'fitness',
    sport: 'Fitness / Strength Training',
    badge: 'Heavy Duty',
    material: 'Cast Iron & Hex Virgin Rubber',
    gsm: '2.5kg to 50kg Pairs (5 - 100 lbs)',
    moq: '500 kg (Assorted Sets)',
    leadTime: '20-25 Days',
    image: '/images/products/product-23-rubber-hex-dumbbells.jpg',
    gallery: [
      '/images/products/product-23-rubber-hex-dumbbells.jpg'
    ],
    description: 'Commercial-grade hexagonal dumbbells constructed from single-piece solid cast iron cores permanently welded to ergonomic chrome-plated contoured steel handles. Encased in high-density virgin rubber coating to eliminate floor damage and noise.',
    features: [
      'Solid Cast Iron Core Permanently Friction-Welded to Steel Handle',
      'Heavy-Duty Virgin Rubber Coating Protects Studio Flooring and Racks',
      'Anti-Roll Hexagonal Head Design for Safe Push-Up Planks and Storage',
      'Medium Diamond Ergonomic Knurled Handle with Hard Chrome Finish',
      'Clear Molded Kilogram / Pound Weight Denominations'
    ],
    customizationOptions: [
      'Custom Molded 3D Brand Logo on Rubber Hex Head Face',
      'Color-Coded Rubber Rings or Custom Colored Virgin Rubber Heads',
      'Laser-Etched Handle Grip Logo & Custom Rack Branding'
    ],
    sizes: ['Pairs: 2.5kg, 5kg, 7.5kg, 10kg, 12.5kg, 15kg, 20kg, 25kg, 30kg, 40kg, 50kg'],
    gearSpecs: {
      handleDiameter: '28mm (2.5-5kg) / 34mm (7.5-50kg)',
      coreConstruction: 'Solid Cast Iron + Solid Steel Shaft',
      coatingGrade: 'High-Density Virgin Natural Rubber',
      weldStandard: 'Friction Welded Zero-Looseness Pin'
    }
  },
  {
    id: 'prod-24',
    name: 'Master Hand-Spliced Ash & Maple Snooker Cue',
    category: 'equipment',
    subcategory: 'cue-sports',
    sport: 'Billiards / Snooker / Pool',
    badge: 'Handmade Ash',
    material: 'Ash Wood & Canadian Maple',
    gsm: '17.5 oz - 19.5 oz Balanced',
    moq: '30 Cues',
    leadTime: '20-25 Days',
    image: '/images/products/product-24-snooker-cue.jpg',
    gallery: [
      '/images/products/product-24-snooker-cue.jpg'
    ],
    description: 'Artisan hand-crafted cue built from selected kiln-dried North American Grade-A straight-grain Ash and Canadian Hard Rock Maple. Features a 3/4 quick-release precision brass vacuum joint, hand-spliced solid Ebony butt with exotic rosewood splices, and a 9.5mm pressed Elkmaster leather tip.',
    features: [
      'Kiln-Dried North American Grade-A Ash with Straight Feathering Grain',
      'Hand-Spliced Genuine Ebony Butt with Exotic Padauk / Rosewood Splices',
      'Quick-Release Precision Air-Vacuum Brass Joint for Solid Energy Transfer',
      '9.5mm - 10mm Multi-Layered Compressed Leather Tip with Brass Ferrule',
      'Balanced at 17-18 inches from butt with threaded base for mini-butt extension'
    ],
    customizationOptions: [
      'Laser-Engraved Nameplate / Metallic Logo Inlay on Butt',
      'Choice of 1-Piece, 3/4 Jointed, or 1/2 Center Jointed Configuration',
      'Custom Aluminum Flight Case with Velvet Molded Interior & Extensions'
    ],
    sizes: ['57" Length (17.5 oz)', '57" Length (18.5 oz)', '58" Length (19.0 oz)'],
    gearSpecs: {
      tipDiameter: '9.5mm / 9.8mm / 10mm Brass Ferrule',
      jointMechanism: 'Air-Vacuum Quick-Lock Solid Brass',
      buttDiameter: '29.5mm - 30.0mm Ebony Base',
      extensions: 'Includes 6" Mini-Butt + Telescopic Extender'
    }
  },
  {
    id: 'prod-25',
    name: 'Official Size 7 Microfiber Composite Basketball',
    category: 'equipment',
    subcategory: 'team-sports',
    sport: 'Basketball / Tournaments',
    badge: 'FIBA Specs',
    material: 'Microfiber Composite Leather',
    gsm: '567g - 650g (Official 29.5")',
    moq: '50 Balls',
    leadTime: '15-20 Days',
    image: '/images/products/product-25-basketball.jpg',
    gallery: [
      '/images/products/product-25-basketball.jpg'
    ],
    description: 'Tournament-ready official Size 7 basketball engineered with ultra-soft moisture-absorbing Japanese microfiber composite leather. Features deep-pebbled surface texture, patented concave channel design for ultimate fingertip control, and a reinforced butyl bladder for roundness retention.',
    features: [
      'Moisture-Wicking Microfiber Composite Surface Maintains Grip in Sweaty Hands',
      'Deep-Channel Pebbled Rubber Concave Seams for Superior Arc & Shot Control',
      '100% Nylon Wound Inner Core with High-Purity Butyl Bladder',
      'Approved FIBA Size 7 Circumference (29.5") and Official Rebound Rating',
      'Dual Indoor Hardwood / Outdoor Court Durability'
    ],
    customizationOptions: [
      'Full Color Custom Panel Printing & Foil Heat Stamped Logos',
      'Custom Composite Leather Colorways (Classic Amber, Matte Black, White/Gold)',
      'Branded Presentation Display Gift Box & Inflation Needle Set'
    ],
    sizes: ['Size 7 (Men 29.5")', 'Size 6 (Women 28.5")', 'Size 5 (Youth 27.5")'],
    gearSpecs: {
      circumference: '750 - 780 mm (Official Size 7)',
      internalPressure: '7.5 - 8.5 PSI Optimal Flight',
      carcassConstruction: '2-Ply Butyl Bladder with 2000m Nylon Wound Cord',
      surfaceGrip: 'Deep Pebble Micro-Fiber Channel'
    }
  },
  {
    id: 'prod-26',
    name: 'Ultralight 7075 Aluminum & Carbon Trekking Poles',
    category: 'equipment',
    subcategory: 'outdoor',
    sport: 'Hiking / Mountaineering / Trekking',
    badge: 'Ultralight Outdoor',
    material: 'Aircraft 7075 Aluminum & 3K Carbon',
    gsm: '220g per Pole (Ultralight)',
    moq: '50 Pairs',
    leadTime: '14-18 Days',
    image: '/images/products/product-26-trekking-poles.jpg',
    gallery: [
      '/images/products/product-26-trekking-poles.jpg'
    ],
    description: 'Heavy-duty collapsible telescopic trekking poles crafted from aircraft-grade 7075 aluminum alloy and 3K carbon fiber tubing. Outfitted with metal lever quick-flip locks for one-handed height adjustment from 65cm to 135cm, anti-sweat natural cork ergonomic grips, and tungsten carbide tips.',
    features: [
      'Aircraft Grade 7075 Aluminum & 3K Carbon Tube Composite Architecture',
      'High-Tension Aluminum Lever Quick-Flip Lock System (Withstands 60kg Lateral Load)',
      'Ergonomic Natural Cork Handle with Extended EVA Foam Choke Grip',
      'Ultra-Durable Tungsten Carbide Tip with Removable Rubber Feet & Snow Baskets',
      'Padded Adjustable Moisture-Wicking Wrist Harness Straps'
    ],
    customizationOptions: [
      'Anodized Shaft Color Finish & Custom Laser Shaft Scale Markings',
      'Laser-Engraved Brand Logo on Shaft & Rubber Grip Medallion',
      'Custom Ripstop Nylon Carry Bag with Drawstring and Mesh Ventilation'
    ],
    sizes: ['Adjustable Telescopic: 65cm to 135cm (25" to 53")'],
    gearSpecs: {
      weightPerPole: '220 grams (7.7 oz)',
      retractedLength: '65 cm (Packable)',
      lockMechanism: 'Quick-Flip Aluminum Cam Lever',
      accessories: 'Tungsten Tips + Mud Baskets + Snow Baskets'
    }
  },
  {
    id: 'prod-27',
    name: 'Waterproof 65L Expedition Tactical & Hiking Backpack',
    category: 'equipment',
    subcategory: 'outdoor',
    sport: 'Backpacking / Tactical / Expeditions',
    badge: '1000D Cordura',
    material: '1000D Cordura & 210T Ripstop Poly',
    gsm: '65 Liters Capacity (1.65 kg)',
    moq: '30 Pcs',
    leadTime: '15-20 Days',
    image: '/images/products/product-27-tactical-backpack.jpg',
    gallery: [
      '/images/products/product-27-tactical-backpack.jpg'
    ],
    description: 'Military-inspired multi-day expedition backpack constructed from 1000D waterproof PU-coated ballistic Cordura nylon. Built with a lightweight internal dual-aluminum spine frame, modular laser-cut MOLLE webbing, ventilated honeycomb EVA suspension harness, and an integrated bottom rain cover.',
    features: [
      '1000D Heavy-Duty Ballistic Cordura Nylon with 2000mm Waterproof Coating',
      'Ergonomic Internal Dual-Stay Aluminum Frame Transfers 70% Weight to Hips',
      'Laser-Cut Laser MOLLE Attachment Grid on Front, Sides, and Waistbelt',
      '3D Ventilated Breathable Honeycomb Mesh Back Padding with Airflow Channel',
      'Integrated High-Visibility Waterproof Orange Rainfly in Concealed Pocket'
    ],
    customizationOptions: [
      'Custom Velcro Hook-and-Loop Morale Patches & 3D PVC Emblems',
      'Custom Camouflage or Solid Pantone Color Palette Manufacturing',
      'YKK Paracord Puller Tags and Custom Branded Lining Fabric'
    ],
    sizes: ['65L Standard Expedition', '80L Extended Alpine Capacity'],
    gearSpecs: {
      capacityVolume: '65 Liters + 10L Extension Collar',
      frameType: 'Dual Aircraft Aluminum Contoured Stays',
      zippers: 'Heavy Duty #10 Weather-Sealed YKK',
      harnessSystem: 'Adjustable Torso Ladder (S/M/L/XL)'
    }
  },
  {
    id: 'prod-28',
    name: 'All-Weather 4-Season Geodesic Expedition Mountain Tent',
    category: 'equipment',
    subcategory: 'outdoor',
    sport: 'Alpine Camping / Expeditions',
    badge: '4-Season Alpine',
    material: '1000D Cordura & 210T Ripstop Poly',
    gsm: '3-Person Alpine (3.85 kg Complete)',
    moq: '20 Tents',
    leadTime: '20-25 Days',
    image: '/images/products/product-28-expedition-tent.jpg',
    gallery: [
      '/images/products/product-28-expedition-tent.jpg'
    ],
    description: 'Heavy-duty 4-season geodesic expedition tent engineered to withstand 80 km/h alpine winds and heavy snow loads. Features aerospace-grade 7001-T6 aluminum poles, 210T ripstop polyester rainfly with 5000mm PU waterproof silicone coating, reinforced snow flaps, and dual dual-entry vestibules.',
    features: [
      'Full Geodesic Freestanding 4-Pole Structure for Extreme Wind Stability',
      '5000mm Hydrostatic Head Waterproofing with Taped Seams & Silicone Outer',
      'Aerospace 7001-T6 High-Strength Anodized Aluminum Shock-Corded Poles',
      'Dual Extended Vestibules for Gear Stowage and Boots + Snow Skirt Base',
      'Breathable 190T Inner Tent with High-Density Bug-Proof Micro-Mesh Vents'
    ],
    customizationOptions: [
      'High-Visibility Custom Pantone Rainfly Colors & Reflective Branding',
      'Printed Expedition Team Logos on Vestibule Doors',
      'Heavy-Duty Compression Dry Sack with Custom Spec Labeling'
    ],
    sizes: ['2-Person Alpine Pro', '3-4 Person Expedition Base'],
    gearSpecs: {
      hydrostaticRating: 'Fly: 5000mm PU / Floor: 8000mm PU',
      poles: '4 x 8.5mm 7001-T6 Aircraft Aluminum',
      dimensions: 'Inner: 215 x 180 x 115 cm / Packed: 52 x 18 cm',
      windResistance: 'Tested to Force 9 Gale (80+ km/h)'
    }
  },
  {
    id: 'prod-29',
    name: 'Custom Championship Title Belts (Gold & Silver Plated)',
    category: 'equipment',
    subcategory: 'combat-sports',
    sport: 'Wrestling / Boxing / MMA',
    badge: 'Tournament Grade',
    material: 'Heavy-Duty Synthetic Leather & Alloy',
    gsm: '4mm Cast Plates / Heavy PU Leather',
    moq: '10 Belts',
    leadTime: '18-25 Days',
    durabilityRating: 'Tournament Pro (5/5)',
    image: '/images/products/product-29-championship-belt.jpg',
    gallery: [
      '/images/products/product-29-championship-belt.jpg'
    ],
    description: 'Premier custom championship title belt manufactured for wrestling leagues, MMA federations, and tournament promotions. Features heavy-duty 4mm solid cast metal plates with multi-level 3D embossing, high-luster gold and chrome electroplating, and a thick synthetic leather strap with floral leather tooling.',
    features: [
      'Heavy-duty 4mm thick solid cast zinc / brass alloy center and dual side plates',
      'Multi-layered 3D deep relief detailing with brilliant gold and silver electroplating',
      'Thick, reinforced synthetic leather strap with hand-tooled border embossing',
      'Heavy-duty brass snap-fasteners (5x2 on both sides) for secure waist fit',
      'Protective soft velvet inner back lining to prevent scratches and provide comfort',
      'Hand-applied jewelry-grade colored enamel infill on federation text and emblems'
    ],
    customizationOptions: [
      'Custom Center & Side Plate 3D Vector Sculpting with Federation Crest',
      'Dual-Tone 24K Gold, Antique Silver, or Smoked Nickel Finish',
      'Custom Laser-Engraved Champion Nameplate & Tournament Date Bars',
      'Deluxe Velvet-Lined Zippered Flight Case with Custom Brand Stamping'
    ],
    sizes: ['Adult Standard (50" Length)', 'Youth Division (40" Length)', 'Heavyweight Extra (54" Length)'],
    gearSpecs: {
      plateThickness: '4mm Solid Cast Zinc / Brass Alloy',
      strapMaterial: 'Heavy-Duty PU Synthetic Leather with Border Tooling',
      platingFinish: 'High-Gloss 24K Gold & Polished Chrome Duo-Tone',
      beltWeight: '3.1 kg (6.8 lbs Tournament Standard)',
      durabilityRating: 'Tournament Pro (5/5) Impact Resistant'
    }
  },
  {
    id: 'prod-30',
    name: 'Reinforced Grappling & Wrestling Training Dummy',
    category: 'equipment',
    subcategory: 'combat-sports',
    sport: 'Wrestling / MMA / BJJ / Grappling',
    badge: 'Heavy-Duty Gym Grade',
    material: 'Reinforced High-Tensile PU & Vinyl',
    gsm: '900 GSM Heavy-Duty Vinyl & Synthetic Leather',
    moq: '15 Units',
    leadTime: '14-18 Days',
    durabilityRating: 'Extreme Conditioning (5/5)',
    image: '/images/products/product-30-wrestling-dummy.jpg',
    gallery: [
      '/images/products/product-30-wrestling-dummy.jpg'
    ],
    description: 'Full-body anatomical grappling and throwing dummy designed for high-intensity wrestling clubs, MMA gyms, and tactical combat conditioning. Constructed from multi-layer 900 GSM synthetic leather reinforced with triple-stitched bonded nylon seams to withstand thousands of high-velocity suplexes and throws.',
    features: [
      'Multi-layer 900 GSM tear-proof synthetic leather engineered to resist mat abrasion',
      'Triple-locked bonded nylon structural seams with bar-tacked high-stress joints',
      'Anatomically curved arm architecture enables realistic takedowns, throws, and submissions',
      'Concealed industrial heavy-duty zipper base with protective hook-and-loop security flap',
      'Integrated reinforced nylon webbed hanging harness loop on collar for suspended drills',
      'Available pre-filled with shredded textile composite or unfilled for low-cost bulk export'
    ],
    customizationOptions: [
      'Custom Federation / Gym Brand Logo Screen Printing or Heat Transfer',
      'Available in Straight-Leg (Throws/Slams) or Positional Bent-Leg (BJJ/Ground)',
      'Custom Accent Color Stitching & High-Visibility Target Striking Zones',
      'Weight Calibration: Standard (30 kg), Heavy (45 kg), or Custom Specification'
    ],
    sizes: ['Youth 40" (15 kg)', 'Standard Adult 64" (30-35 kg)', 'Heavyweight Adult 70" (45 kg)'],
    gearSpecs: {
      shellMaterial: '900 GSM Laminated Synthetic Leather',
      seamStrength: 'Triple-Lock Bonded Nylon (35 kg/cm Tensile)',
      internalFilling: 'High-Density Clean Shredded Textile Composite',
      slamResistance: 'Tested for 10,000+ High-Velocity Mat Throws',
      durabilityRating: 'Extreme Conditioning (5/5)'
    }
  },
  {
    id: 'prod-31',
    name: 'Pro-Guard Wrestling Headgear & Ear Guards',
    category: 'equipment',
    subcategory: 'combat-sports',
    sport: 'Freestyle / Greco-Roman / Folkstyle',
    badge: 'NFHS / UWW Compliant',
    material: 'High-Density EVA Foam & Polymer Shell',
    gsm: 'Dual-Layer Impact Polymer + Moisture-Wicking Liner',
    moq: '30 Units',
    leadTime: '12-16 Days',
    durabilityRating: 'Mat-Proven Safety (5/5)',
    image: '/images/products/product-31-wrestling-headgear.jpg',
    gallery: [
      '/images/products/product-31-wrestling-headgear.jpg'
    ],
    description: 'Tournament-grade wrestling headgear and ear guard engineered for maximum ear cartilage protection without sacrificing peripheral hearing or comfort. Features injection-molded polymer ear cups surrounded by high-density closed-cell EVA foam and a secure 4-strap harness with a cushioned chin cup.',
    features: [
      'Rigid injection-molded internal ear cups effectively prevent cauliflower ear injury',
      'Dual-density shock-absorbing EVA foam cushions disperse direct collision forces',
      '4-point fully adjustable nylon strap system provides a customized, non-slip fit',
      'Strategic multi-port auditory ventilation holes maintain crystal-clear coach communication',
      'Ultra-soft, anti-chafing neoprene chin cup with heavy-duty quick-snap buckle',
      'Non-absorbent closed-cell foam cleans easily and resists bacterial growth and odor'
    ],
    customizationOptions: [
      'Two-Tone Custom Colorway Combinations for Ear Cups, Straps, and Chin Pad',
      'Custom School or Club Mascot Logo Printed Directly on Hard Ear Shells',
      'Sublimated Removable Strap Wraps with Team Name or Sponsor Graphics',
      'Custom Mesh Drawstring Gear Bag with Woven Brand Label'
    ],
    sizes: ['Youth Universal (Ages 6-12)', 'Adult Standard (Ages 13+)'],
    gearSpecs: {
      earCupCore: 'Rigid High-Impact Molded Polymer Shield',
      paddingThickness: '12mm Dual-Density Closed-Cell EVA Foam',
      strapSystem: '4-Point Adjustable Reinforced Hook & Loop Harness',
      complianceStandard: 'Meets NFHS & Collegiate Mat Safety Specifications',
      durabilityRating: 'Mat-Proven Safety (5/5)'
    }
  },
  {
    id: 'prod-32',
    name: 'Mat-Grip Elite Wrestling & Combat Boots',
    category: 'equipment',
    subcategory: 'combat-sports',
    sport: 'Wrestling / Boxing / Mat Sports',
    badge: 'High Traction',
    material: 'Honeycomb Mesh & Gum Rubber Sole',
    gsm: 'Single-Layer Monofilament + Gum Rubber Sole',
    moq: '25 Pairs',
    leadTime: '15-20 Days',
    durabilityRating: 'Tournament Ready (5/5)',
    image: '/images/products/product-32-wrestling-boots.jpg',
    gallery: [
      '/images/products/product-32-wrestling-boots.jpg'
    ],
    description: 'Ultra-lightweight high-performance wrestling boots designed for rapid pivot speed, zero-slip mat purchase, and rock-solid ankle stabilization. Features an engineered single-layer breathable honeycomb mesh upper reinforced with synthetic suede overlays and a split-pod natural gum rubber traction outsole.',
    features: [
      'Full-wrap natural gum rubber outsole with multidirectional radial traction pods',
      'High-top padded ankle collar provides structural support during explosive sprawls and shoots',
      'Single-layer breathable honeycomb mesh keeps athlete feet cool under intense tournament rounds',
      'Integrated tournament-legal lace garage system prevents shoelaces from untying during action',
      'Abrasion-resistant synthetic suede toe cap and heel counter withstand rough canvas friction',
      'Die-cut EVA sockliner provides low-profile impact cushioning without compromising mat feel'
    ],
    customizationOptions: [
      'Custom Brand Logo Embossed on Tongue Patch, Lateral Quarter, and Heel Counter',
      'Full Custom Colorway Matching for Mesh Body, Suede Overlays, and Laces',
      'Sublimated Graphic Mesh Inserts with Team Camouflage or Gradients',
      'Custom Branded Shoe Box, Tissue Wrap, and Extra Color-Coordinated Lace Pairs'
    ],
    sizes: ['US Men 5.0 - 14.0', 'EU 37 - 48', 'UK 4.5 - 13.5 (Custom Half-Sizes)'],
    gearSpecs: {
      outsoleCompound: 'Non-Marking Radial Pivot Gum Rubber',
      upperConstruction: 'Engineered Monofilament Honeycomb Mesh + Suede',
      shoeWeight: '235g per Shoe (US 9 / Featherlight)',
      ankleProfile: 'High-Cut Anatomical Padded Collar',
      durabilityRating: 'Tournament Ready (5/5)'
    }
  }
];
