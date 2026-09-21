import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

import QualityCertifications from '../components/quality/QualityCertifications';
import ZeroDefectSection from '../components/quality/ZeroDefectSection';
import DynamicPageContent from '../components/cms/DynamicPageContent';

export default function QualityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AQL 2.5 Zero-Defect Manufacturing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          Multi-Stage Quality Assurance & Factory Standards
        </h1>
        <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
          Overseas sports brands and bulk buyers cannot afford return rates or defective jerseys. Our multi-stage inspection gates ensure every stitch, seam, and print meets rigorous international retail standards.
        </p>
      </div>

      {/* Certifications Badges with Radar-Pulse Animations */}
      <QualityCertifications />

      {/* 4-Stage Inspection Timeline with Laser Scanning, Exploded Layers & Checkmark Ignition */}
      <ZeroDefectSection />

      {/* Factory Machinery Fleet */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#1A1A1A] text-white border border-black/40 space-y-8 shadow-2xl">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            Industrial Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Modern Machine Fleet in Sialkot, Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-cream-200">
            Precision engineering requires precision machinery. Our production floor is powered by industry-standard equipment:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#FF751F] font-bold block text-sm">Juki & Pegasus</span>
            <span className="text-cream-300">4-Needle 6-Thread Flatlock Machines for Compression</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#FF751F] font-bold block text-sm">Tajima Japan</span>
            <span className="text-cream-300">12-Head Multi-Color Computerized 3D Embroidery</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#FF751F] font-bold block text-sm">Monti Antonio</span>
            <span className="text-cream-300">Rotary Drum Calender Sublimation Heat Presses</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-emerald-400 font-bold block text-sm">Hashima</span>
            <span className="text-cream-300">Conveyorized Metal Detector Needle Scanners</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <p className="text-xs text-cream-300">
            Request an in-person or live video audit of our Sialkot factory prior to placing a bulk order.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs transition-colors shadow-glow-orange flex items-center gap-2 shrink-0"
          >
            <span>Request Factory Audit & Sample</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Dynamic Visual Content Blocks (Elementor Page Builder) */}
      <DynamicPageContent pageId="quality" />

    </div>
  );
}
