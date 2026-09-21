import React from 'react';
import { 
  Quote, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck, 
  Factory, 
  Award,
  ArrowRight
} from 'lucide-react';
import { LinkedInIcon } from '../common/SocialIcons';

export default function MeetFounderSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="rounded-3xl bg-[#141210] border border-white/15 text-white overflow-hidden shadow-2xl relative">
        {/* Subtle Ambient Glow Overlays */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF751F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF751F]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
          
          {/* Left Column: Quote, Message & Founder Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF751F]/15 border border-[#FF751F]/30 text-[#FF751F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founder's Direct Commitment • Sialkot HQ</span>
            </div>

            {/* Stylized Quotation Mark */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF751F]/20 border border-[#FF751F]/30 flex items-center justify-center text-[#FF751F] shadow-glow-orange">
                <Quote className="w-6 h-6 rotate-180" />
              </div>
              <span className="text-xs font-mono tracking-wider text-stone-400 uppercase">
                Direct OEM / ODM Manufacturing Vision
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white leading-tight tracking-tight">
              "We built Hare Sportswear to bridge international sportswear brands directly with the craftsmanship of Sialkot."
            </h2>

            {/* Quote Body */}
            <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                When international apparel founders and team organizers source custom sportswear, they are too often met with layered middleman agencies, inflated sampling costs, and opaque production timelines.
              </p>
              <p className="border-l-2 border-[#FF751F] pl-4 text-white italic font-medium">
                At Hare Sportswear, you communicate directly with our factory floor in Sialkot. Every fabric GSM selection, Italian sublimation strike-off, and reinforced flatlock seam is engineered under strict AQL 2.5 standards. Whether you are ordering a 25-set prototype run or a full tournament league rollout, our commitment to precision remains absolute.
              </p>
            </div>

            {/* Founder Signature & Author Details */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-wide">
                    Ashban Rafique
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#FF751F]" />
                </div>
                <p className="text-xs sm:text-sm text-[#FF751F] font-bold mt-0.5">
                  Founder &amp; Managing Director
                </p>
                <p className="text-xs text-stone-400 mt-1 font-mono">
                  Sialkot Export Manufacturing • OEM / ODM Technical Apparel Specialist
                </p>
              </div>

              {/* Quality Checklist Badges */}
              <div className="flex flex-col gap-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Factory Floor Oversight</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Trading Agents or Markups</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>7-Day Rapid Prototyping</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder Photo Card with Clean Branding (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-[#1B1917] border border-white/15 p-4 sm:p-6 shadow-2xl space-y-4 group hover:border-[#FF751F]/50 transition-all duration-300">
              
              {/* Photo Frame Container */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                <img
                  src="/images/founder/ashban-rafique.jpg"
                  alt="Ashban Rafique - Founder of Hare Sportswear & Goods"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700"
                />

                {/* Gradient Vignette at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Floating "Meet the Founder" Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF751F]" />
                    <span>Meet the Founder</span>
                  </span>
                </div>

                {/* Sialkot Plant Status Pill */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-400 text-[11px] font-semibold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Sialkot Factory HQ</span>
                  </span>
                </div>

                {/* Name Overlay at Base of Photo */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="text-white font-display font-extrabold text-lg leading-tight">
                    Ashban Rafique
                  </p>
                  <p className="text-xs text-stone-300 font-medium">
                    Hare Sportswear &amp; Goods (Pvt.) Ltd.
                  </p>
                </div>
              </div>

              {/* Action Buttons: LinkedIn Profile & Direct WhatsApp */}
              <div className="space-y-2 pt-1">
                {/* LinkedIn Profile Button */}
                <a
                  href="https://www.linkedin.com/in/ashban-rafique-6909a1395/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0A66C2] hover:bg-[#084e96] shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <LinkedInIcon className="w-4 h-4 fill-white" />
                  <span>Connect with Ashban on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                {/* Direct WhatsApp Contact */}
                <a
                  href="https://wa.me/message/PBVPZM3J7ETGH1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Direct WhatsApp with Founder</span>
                </a>
              </div>

              {/* Bottom Credential Note */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF751F]" /> Verified Sialkot Manufacturer
                </span>
                <span className="text-stone-500 font-mono">Export ID: PK-SKT-2026</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
