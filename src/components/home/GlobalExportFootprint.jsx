import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, Ship, ShieldCheck, ArrowRight, CheckCircle2, 
  MapPin, Clock, Package, Globe, Award, Sparkles, Building2
} from 'lucide-react';

export default function GlobalExportFootprint() {
  const exportDestinations = [
    {
      id: 'us',
      name: 'United States',
      code: 'USA',
      flag: '🇺🇸',
      slug: '/global-reach/usa',
      tag: 'Largest Export Market',
      volume: '110,000+ Units/Yr',
      transit: '4-6 Days DDP Air',
      primaryGoods: 'American Football & 7v7 Uniforms, Baseball Button-Downs, Heavy 460 GSM Fleece, FIFA Match Balls',
      ports: 'JFK, O\'Hare, LAX, Long Beach & Savannah'
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      code: 'UK',
      flag: '🇬🇧',
      slug: '/sports-wear-manufacturer-uk',
      tag: 'FA & Rugby Spec',
      volume: '65,000+ Units/Yr',
      transit: '3-5 Days Air Cargo',
      primaryGoods: 'Football Club Matchwear, Pro Rugby Union Kits, German Latex Goalkeeper Gloves, Tracksuits',
      ports: 'London Heathrow & Port of Felixstowe'
    },
    {
      id: 'ca',
      name: 'Canada',
      code: 'Canada',
      flag: '🇨🇦',
      slug: '/sports-wear-manufacturer-canada',
      tag: 'Cold-Climate Thermal',
      volume: '40,000+ Units/Yr',
      transit: '4-6 Days Express',
      primaryGoods: 'Sublimated Ice Hockey Jerseys, Heavyweight Thermal Roubaix, Winter Coaching Parkas, Training Tees',
      ports: 'Toronto Pearson & Vancouver Dry Port'
    },
    {
      id: 'au',
      name: 'Australia',
      code: 'Australia',
      flag: '🇦🇺',
      slug: '/sports-wear-manufacturer-australia',
      tag: 'AFL & Cricket',
      volume: '45,000+ Units/Yr',
      transit: '5-7 Days Priority Air',
      primaryGoods: 'AFL Guernseys, T20 Sublimated Cricket Kits, Rugby League Jerseys, Netball Dresses',
      ports: 'Sydney Kingsford & Melbourne Airport'
    },
    {
      id: 'de',
      name: 'Germany',
      code: 'Germany',
      flag: '🇩🇪',
      slug: '/sports-wear-manufacturer-germany',
      tag: 'DIN & ISO Compliant',
      volume: '50,000+ Units/Yr',
      transit: '3-5 Days Direct Air',
      primaryGoods: 'Pro Football Club Kits, Aerodynamic Cycling Wear, Seamless Compression Tights, BJJ Fight Gis',
      ports: 'Frankfurt CargoCity & Port of Hamburg'
    },
    {
      id: 'fr',
      name: 'France',
      code: 'France',
      flag: '🇫🇷',
      slug: '/sports-wear-manufacturer-france',
      tag: 'Athleisure & Clubwear',
      volume: '35,000+ Units/Yr',
      transit: '4-5 Days DDP Air',
      primaryGoods: 'French Terry Streetwear Hoodies, Seamless Fitness Leggings, Marathon Singlets, Combat Gloves',
      ports: 'Paris Charles de Gaulle (CDG)'
    },
    {
      id: 'nl',
      name: 'Netherlands',
      code: 'Netherlands',
      flag: '🇳🇱',
      slug: '/sports-wear-manufacturer-netherlands',
      tag: 'Eco-Textiles Hub',
      volume: '30,000+ Units/Yr',
      transit: '3-5 Days Express Air',
      primaryGoods: 'Recycled rPET Teamwear, Field Hockey Outfits, Speedskating Skinsuits, Lifestyle Joggers',
      ports: 'Amsterdam Schiphol & Port of Rotterdam'
    },
    {
      id: 'ae',
      name: 'UAE & GCC',
      code: 'UAE / GCC',
      flag: '🇦🇪',
      slug: '/sports-wear-manufacturer-uae',
      tag: 'Rapid 48h Transit',
      volume: '55,000+ Units/Yr',
      transit: '2-4 Days Direct Air',
      primaryGoods: 'Desert Hydro-Wick Interlock Kits, Tournament Match Soccer Balls, Boxing Gloves, Padels',
      ports: 'Dubai World Central & Abu Dhabi Cargo'
    }
  ];

  const additionalCountries = [
    'Italy 🇮🇹', 'Spain 🇪🇸', 'Sweden 🇸🇪', 'Norway 🇳🇴', 'Switzerland 🇨🇭', 
    'Japan 🇯🇵', 'New Zealand 🇳🇿', 'Ireland 🇮🇪', 'Belgium 🇧🇪', 'Austria 🇦🇹', 
    'Denmark 🇩🇰', 'Finland 🇫🇮', 'Saudi Arabia 🇸🇦', 'Qatar 🇶🇦', 'Singapore 🇸🇬', 
    'South Africa 🇿🇦', 'Mexico 🇲🇽', 'Brazil 🇧🇷', 'Poland 🇵🇱', 'Czech Republic 🇨🇿'
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DFD5] pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/15 border border-[#FF751F]/30 text-xs font-bold text-[#FF751F]">
            <Globe className="w-3.5 h-3.5" />
            <span>Global B2B Export Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A]">
            Supplying 45+ Countries Worldwide Direct from Sialkot
          </h2>
          <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
            Eliminate middlemen markups. From single-club private label runs to high-volume containerized national league shipments, our Sialkot dry-port facility provides end-to-end DDP customs clearance and express air logistics globally.
          </p>
        </div>

        {/* 4 Quick Assurance Badges */}
        <div className="grid grid-cols-2 gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm">
            <span className="text-xs font-bold text-[#FF751F] block">✈ 3-5 Days Priority</span>
            <span className="text-[11px] text-[#595856]">Express Air Delivery</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm">
            <span className="text-xs font-bold text-emerald-600 block">✓ DDP Door Delivery</span>
            <span className="text-[11px] text-[#595856]">Pre-Cleared Customs</span>
          </div>
        </div>
      </div>

      {/* Featured Country Hubs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {exportDestinations.map((dest) => (
          <Link
            key={dest.id}
            to={dest.slug}
            className="group p-6 rounded-3xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3.5">
              {/* Top Tag & Flag */}
              <div className="flex items-center justify-between">
                <span className="text-3xl">{dest.flag}</span>
                <span className="px-2.5 py-1 rounded-full bg-[#FAF8F3] border border-[#E5DFD5] text-[10px] font-bold text-[#595856] group-hover:bg-[#FF751F]/15 group-hover:text-[#FF751F] group-hover:border-[#FF751F]/30 transition-colors">
                  {dest.tag}
                </span>
              </div>

              {/* Title & Code */}
              <div>
                <h3 className="font-display font-bold text-lg text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors flex items-center justify-between">
                  <span>{dest.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF751F]" />
                </h3>
                <span className="text-xs text-[#8A847A] font-mono">{dest.transit}</span>
              </div>

              {/* Goods Breakdown */}
              <div className="pt-2 border-t border-[#E5DFD5] text-xs space-y-1">
                <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider block">
                  Export Specializations:
                </span>
                <p className="text-[#595856] text-[11px] leading-relaxed line-clamp-2">
                  {dest.primaryGoods}
                </p>
              </div>
            </div>

            {/* Bottom Ports / Volume Strip */}
            <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between text-[11px] text-[#8A847A]">
              <span>Annual Vol: <strong className="text-[#1A1A1A]">{dest.volume}</strong></span>
              <span className="font-semibold text-[#FF751F] group-hover:underline">Explore Hub →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Extended Global Coverage Marquee / Badge Strip */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Bilateral Shipping Routes To Additional 35+ Destinations:
          </span>
          <span className="text-xs text-[#8A847A]">
            Worldwide DDP / CIF Air & Ocean Consignments
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {additionalCountries.map((country, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-xs font-medium text-[#1A1A1A] hover:border-[#FF751F]/40 transition-colors"
            >
              {country}
            </span>
          ))}
          <Link
            to="/contact"
            className="px-3 py-1.5 rounded-xl bg-[#FF751F]/15 border border-[#FF751F]/30 text-xs font-bold text-[#FF751F] hover:bg-[#FF751F] hover:text-white transition-colors"
          >
            + Ship to Your Country
          </Link>
        </div>
      </div>

    </section>
  );
}
