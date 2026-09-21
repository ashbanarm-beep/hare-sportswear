import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, ChevronDown, Sparkles, MessageCircle, 
  FileText, Search, ArrowRight, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function PageFAQSection({ 
  pageId = 'home',
  title = 'Frequently Asked B2B Manufacturing Questions',
  subtitle = 'Sialkot OEM / ODM Clarity',
  className = ''
}) {
  const { getFAQs } = useCMS();
  const rawFaqs = getFAQs(pageId);

  const [activeId, setActiveId] = useState(() => rawFaqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    rawFaqs.forEach(f => {
      if (f.category) set.add(f.category);
    });
    return ['All', ...Array.from(set)];
  }, [rawFaqs]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return rawFaqs.filter(faq => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [rawFaqs, selectedCategory, searchQuery]);

  if (!rawFaqs || rawFaqs.length === 0) {
    return null;
  }

  const toggleAccordion = (id) => {
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 ${className}`}>
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF751F]/10 border border-[#FF751F]/20 text-[#FF751F] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{subtitle}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A]">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-[#595856] leading-relaxed">
          Direct answers to key wholesale manufacturing inquiries, low MOQs, rapid sampling timelines, private labeling protocols, and global DDP export logistics.
        </p>
      </div>

      {/* Category Tabs & Quick Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        
        {/* Categories */}
        {categories.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-none overscroll-x-contain">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FF751F] text-white shadow-sm font-bold'
                    : 'bg-white border border-[#E5DFD5] text-[#595856] hover:text-[#1A1A1A] hover:bg-[#FAF8F3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#E5DFD5] text-xs text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:border-[#FF751F]"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5 max-w-4xl mx-auto">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-white border border-[#E5DFD5] p-6 text-xs text-[#595856]">
            No questions matching your search. Have a specific question? Reach out to our engineering team directly!
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = activeId === faq.id;

            return (
              <div
                key={faq.id || idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-xs ${
                  isOpen 
                    ? 'border-[#FF751F] ring-2 ring-[#FF751F]/10' 
                    : 'border-[#E5DFD5] hover:border-[#FF751F]/40'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-[#FF751F]/10 text-[#FF751F] text-xs font-bold font-mono flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="font-display font-bold text-sm sm:text-base text-[#1A1A1A] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {faq.category && (
                      <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F1E8] text-[#595856]">
                        {faq.category}
                      </span>
                    )}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-[#FF751F] text-white' : 'bg-[#FAF8F3] text-stone-500'
                    }`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#595856] leading-relaxed border-t border-[#F5F1E8] mt-1 space-y-2 bg-[#FAF8F3]/50">
                        <p className="pt-2">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions? Conversion Footer Card */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-[#E5DFD5] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Have a Custom Technical Inquiry?</span>
          </div>
          <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#1A1A1A]">
            Direct Consultation with Senior Garment Engineers
          </h4>
          <p className="text-xs text-[#595856] max-w-lg">
            Need custom fabric blend tests, proprietary silicone molds, or custom pattern grading? We respond within 24 hours.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            to="/contact"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#FF751F] hover:bg-[#E65E08] shadow-glow-orange transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Submit Tech Pack</span>
          </Link>
          <a
            href="https://wa.me/message/PBVPZM3J7ETGH1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

    </section>
  );
}
