import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckSquare, Activity, ShieldCheck } from 'lucide-react';

export default function QualityCertifications() {
  const certifications = [
    {
      title: 'ISO 9001:2015',
      subtitle: 'Quality Management System',
      description: 'Certified standard operating procedures for cut, sew, sublimation, and export dispatch.',
      status: 'ISO Certified',
      icon: Award,
      iconColor: 'text-[#FF751F]',
      bgColor: 'bg-[#FF751F]/10',
      borderColor: 'border-[#FF751F]/30',
      ringColor: 'bg-[#FF751F]/20',
      badgeColor: 'text-[#FF751F] bg-[#FF751F]/10 border-[#FF751F]/30'
    },
    {
      title: 'BSCI Audited',
      subtitle: 'Fair Wages & Ethical Labor',
      description: 'Zero child labor, statutory living wages, on-site medical clinic, and regulated working hours.',
      status: 'Ethical Audit Pass',
      icon: CheckSquare,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      ringColor: 'bg-emerald-500/20',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      title: 'OEKO-TEX 100',
      subtitle: 'Free from Harmful Toxins',
      description: 'Zero formaldehyde, heavy metals, or carcinogenic azo dyes across yarns and sublimated panels.',
      status: 'Eco-Tested',
      icon: Activity,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      ringColor: 'bg-amber-500/20',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      title: 'AQL 2.5 Level II',
      subtitle: 'Acceptance Quality Limit',
      description: 'Statistical batch sampling protocol guaranteeing strict zero-defect shipments worldwide.',
      status: 'AQL Verified',
      icon: ShieldCheck,
      iconColor: 'text-[#FF751F]',
      bgColor: 'bg-[#FF751F]/10',
      borderColor: 'border-[#FF751F]/30',
      ringColor: 'bg-[#FF751F]/20',
      badgeColor: 'text-[#FF751F] bg-[#FF751F]/10 border-[#FF751F]/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-sm relative overflow-hidden">
      {certifications.map((cert, idx) => {
        const Icon = cert.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className={`text-center p-5 rounded-2xl transition-all duration-300 relative group flex flex-col items-center justify-between ${
              idx < certifications.length - 1 ? 'lg:border-r border-[#E5DFD5]' : ''
            }`}
          >
            {/* Top Radar Pulse Icon */}
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              {/* Concentric Radar Wave 1 */}
              <motion.div
                animate={{
                  scale: [1, 1.85, 2.3],
                  opacity: [0.55, 0.2, 0]
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: idx * 0.45
                }}
                className={`absolute inset-0 rounded-full ${cert.ringColor} pointer-events-none`}
              />

              {/* Concentric Radar Wave 2 */}
              <motion.div
                animate={{
                  scale: [1, 1.45, 1.9],
                  opacity: [0.45, 0.15, 0]
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: idx * 0.45 + 0.8
                }}
                className={`absolute inset-0 rounded-full ${cert.ringColor} pointer-events-none`}
              />

              {/* Central Badge Box */}
              <div className={`relative z-10 w-12 h-12 rounded-2xl ${cert.bgColor} ${cert.borderColor} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${cert.iconColor}`} />
              </div>
            </div>

            {/* Badge Content */}
            <div className="space-y-1.5 w-full">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${cert.badgeColor}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                <span>{cert.status}</span>
              </span>

              <h4 className="font-display font-bold text-[#1A1A1A] text-lg mt-1 group-hover:text-[#FF751F] transition-colors">
                {cert.title}
              </h4>
              <p className="text-xs font-semibold text-[#8A847A]">
                {cert.subtitle}
              </p>
              <p className="text-[11px] text-[#595856] leading-relaxed pt-1">
                {cert.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
