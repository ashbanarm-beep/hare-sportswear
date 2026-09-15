import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, MessageCircle, ArrowRight, ShieldCheck, 
  Award, Globe, CheckCircle2, Send
} from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import { LinkedInIcon, TwitterIcon, InstagramIcon, FacebookIcon } from '../common/SocialIcons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#141414] text-[#E5DFD5] border-t border-black/30 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust & Certifications Strip */}
        <div className="pb-12 mb-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-cream-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF751F]/15 border border-[#FF751F]/30 text-[#FF751F]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">ISO 9001:2015</p>
              <p className="text-xs text-cream-300">Certified Quality Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">BSCI & SEDEX</p>
              <p className="text-xs text-cream-300">Ethical Social Compliance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">OEKO-TEX 100</p>
              <p className="text-xs text-cream-300">Eco-Safe Non-Toxic Inks</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF751F]/15 border border-[#FF751F]/30 text-[#FF751F]">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">45+ Export Countries</p>
              <p className="text-xs text-cream-300">USA, EU, UK, Australia & GCC</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Col 1 & 2: Company Info */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo isDark={true} size="lg" />
            <p className="text-xs sm:text-sm leading-relaxed text-[#B8B2A7] pr-4">
              <strong>Hare Sportswear & Goods</strong> is an export-oriented athletic apparel and sports equipment manufacturing plant based in Sialkot, Pakistan. We partner with athletic brands, gym chains, collegiate programs, and sports distributors worldwide for turnkey custom production (OEM/ODM).
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 hover:bg-[#FF751F]/20 hover:text-[#FF751F] transition-all border border-white/10 text-cream-300">
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 hover:bg-pink-500/20 hover:text-pink-400 transition-all border border-white/10 text-cream-300">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 transition-all border border-white/10 text-cream-300">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 hover:bg-sky-400/20 hover:text-sky-300 transition-all border border-white/10 text-cream-300">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs text-[#8A847A] pt-1">
              <span>SCCI Member No: 48291-C • NTN: 7291840-3</span>
            </div>
          </div>

          {/* Col 3: Manufacturing Capabilities */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-display">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#C4BDAF]">
              <li>
                <Link to="/custom-manufacturing" className="hover:text-[#FF751F] transition-colors">
                  All-Over Dye Sublimation
                </Link>
              </li>
              <li>
                <Link to="/custom-manufacturing" className="hover:text-[#FF751F] transition-colors">
                  Tajima 3D Embroidery
                </Link>
              </li>
              <li>
                <Link to="/custom-manufacturing" className="hover:text-[#FF751F] transition-colors">
                  Plastisol & High-Density Puff
                </Link>
              </li>
              <li>
                <Link to="/custom-manufacturing" className="hover:text-[#FF751F] transition-colors">
                  Seamless Compression Wear
                </Link>
              </li>
              <li>
                <Link to="/custom-manufacturing" className="hover:text-[#FF751F] transition-colors">
                  Thermal Bonded Match Balls
                </Link>
              </li>
              <li>
                <Link to="/custom-manufacturing" className="hover:text-[#FF751F] transition-colors">
                  Private Label & Custom Trims
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#C4BDAF]">
              <li>
                <Link to="/products" className="hover:text-[#FF751F] transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link to="/quality" className="hover:text-[#FF751F] transition-colors">
                  Quality & Lab Testing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF751F] transition-colors">
                  Factory & Ethics
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#FF751F] transition-colors">
                  Tech Pack Guides & Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF751F] transition-colors">
                  Request RFQ / Sample
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Sialkot Plant Coordinates */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-display">
              Sialkot Factory HQ
            </h4>
            <ul className="space-y-3.5 text-xs text-[#C4BDAF]">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF751F] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Plots 42-45, Phase II, Small Industrial Estate, Defence Road, Sialkot 51310, Punjab, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF751F] shrink-0" />
                <a href="mailto:export@haresportswear.com" className="hover:text-white transition-colors">
                  export@haresportswear.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF751F] shrink-0" />
                <span>
                  +92 (52) 355-8901 / 8902
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold">
                  +92 300 1234567 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="pt-8 pb-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h5 className="text-white font-bold text-sm font-display">
              Subscribe to B2B Manufacturing Intel & Fabric Reports
            </h5>
            <p className="text-xs text-[#A8A296] mt-1">
              Monthly insights on technical sportswear yarns, import tariff regulations, and production lead times. Zero spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-[#8A847A] text-xs focus:outline-none focus:border-[#FF751F] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs transition-colors flex items-center gap-2 shrink-0 shadow-glow-orange"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Thank you! You are subscribed to Hare Sportswear manufacturing briefings.
              </p>
            )}
          </form>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A847A] gap-4">
          <p>© {new Date().getFullYear()} Hare Sportswear & Goods (Pvt.) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Production Operating Timezone: PKT (GMT+5)</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">● Plant Operating at 100% Capacity</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
