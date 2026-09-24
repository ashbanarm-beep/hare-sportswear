import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Layers, ShieldCheck, 
  Truck, CheckCircle2, ChevronRight, FileText 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

import PageFAQSection from '../common/PageFAQSection';

const iconMap = {
  Layers: Layers,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Truck: Truck,
  CheckCircle2: CheckCircle2,
  FileText: FileText
};

export default function DynamicPageContent({ pageId = 'home', className = '' }) {
  const { getPageBlocks } = useCMS();
  const blocks = getPageBlocks(pageId);

  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-12 my-12 ${className}`}>
      {blocks.map((block) => {
        if (!block.active) return null;

        // 1. Text Block
        if (block.type === 'text_block') {
          const isCenter = block.alignment === 'center';
          const isDark = block.theme === 'dark';

          return (
            <section 
              key={block.id}
              className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
            >
              <div className={`rounded-3xl p-8 sm:p-12 border transition-all ${
                isDark 
                  ? 'bg-[#1A1A1A] text-white border-black/40 shadow-xl' 
                  : 'bg-white text-[#1A1A1A] border-[#E5DFD5] shadow-xs'
              } ${isCenter ? 'text-center max-w-4xl mx-auto' : ''}`}>
                {block.subtitle && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF751F] inline-block mb-2">
                    {block.subtitle}
                  </span>
                )}
                {block.title && (
                  <h3 className={`text-2xl sm:text-3xl font-display font-black leading-snug mb-4 ${
                    isDark ? 'text-white' : 'text-[#1A1A1A]'
                  }`}>
                    {block.title}
                  </h3>
                )}
                {block.content && (
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-cream-200' : 'text-[#595856]'
                  } whitespace-pre-line`}>
                    {block.content}
                  </p>
                )}
              </div>
            </section>
          );
        }

        // 2. Image Block
        if (block.type === 'image_block') {
          return (
            <section key={block.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] shadow-md">
                <div className={`relative ${block.fullWidth ? 'h-96 sm:h-[480px]' : 'aspect-[16/9] sm:aspect-[21/9]'} overflow-hidden bg-[#1A1A1A]`}>
                  <img
                    src={block.imageUrl || '/teamwear-img.jpg'}
                    alt={block.title || 'Sportswear Feature'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-2">
                    {block.title && (
                      <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                        {block.title}
                      </h4>
                    )}
                    {block.caption && (
                      <p className="text-xs sm:text-sm text-cream-200 max-w-2xl">
                        {block.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // 3. CTA Button Block
        if (block.type === 'cta_button') {
          return (
            <section key={block.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="p-8 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs max-w-3xl mx-auto space-y-4">
                <Link
                  to={block.url || '/contact'}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-glow-orange hover:shadow-xl transition-all"
                >
                  <span>{block.label || 'Learn More'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {block.subtitle && (
                  <p className="text-xs text-[#8A847A]">
                    {block.subtitle}
                  </p>
                )}
              </div>
            </section>
          );
        }

        // 4. Feature Grid Block
        if (block.type === 'feature_grid') {
          const colClass = block.columns === 4 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
            : block.columns === 2 
              ? 'grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-3';

          return (
            <section key={block.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {(block.title || block.subtitle) && (
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  {block.subtitle && (
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF751F]">
                      {block.subtitle}
                    </span>
                  )}
                  {block.title && (
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1A1A1A]">
                      {block.title}
                    </h3>
                  )}
                </div>
              )}

              <div className={`grid ${colClass} gap-6`}>
                {(block.items || []).map((item, idx) => {
                  const Icon = iconMap[item.icon] || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-[#FF751F]/10 text-[#FF751F] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F1E8] text-[#595856]">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-display font-bold text-base text-[#1A1A1A]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#595856] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        }

        // 5. Data Table Block
        if (block.type === 'data_table') {
          return (
            <section key={block.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {(block.title || block.subtitle) && (
                <div className="space-y-1">
                  {block.subtitle && (
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF751F]">
                      {block.subtitle}
                    </span>
                  )}
                  {block.title && (
                    <h3 className="text-2xl font-display font-extrabold text-[#1A1A1A]">
                      {block.title}
                    </h3>
                  )}
                </div>
              )}

              <div className="rounded-2xl bg-white border border-[#E5DFD5] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F3] border-b border-[#E5DFD5]">
                        {(block.headers || []).map((head, hIdx) => (
                          <th 
                            key={hIdx} 
                            className="py-3.5 px-4 font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px] whitespace-nowrap"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5DFD5]">
                      {(block.rows || []).map((row, rIdx) => (
                        <tr 
                          key={rIdx} 
                          className={rIdx % 2 === 0 ? 'bg-white hover:bg-[#FAF8F3]/50' : 'bg-[#FAF8F3]/30 hover:bg-[#FAF8F3]'}
                        >
                          {row.map((cell, cIdx) => (
                            <td 
                              key={cIdx} 
                              className={`py-3 px-4 text-[#595856] ${cIdx === 0 ? 'font-semibold text-[#1A1A1A]' : ''}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          );
        }

        // 6. Interactive FAQ Accordion Block (Embed FAQs Anywhere on Any Page)
        if (block.type === 'faq_block') {
          return (
            <div key={block.id} className="w-full">
              <PageFAQSection 
                pageId={block.targetPageId || pageId}
                title={block.title || undefined}
                subtitle={block.subtitle || undefined}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
