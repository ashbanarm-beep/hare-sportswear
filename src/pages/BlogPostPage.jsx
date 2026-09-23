import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Calendar, ArrowLeft, Share2, MessageCircle, 
  Copy, Check, FileText, ArrowRight, User, Sparkles, 
  ListOrdered, ChevronRight, ChevronDown, Bookmark, 
  ShieldCheck, Zap, ThumbsUp, Box, Layers, HelpCircle
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { LinkedInIcon, TwitterIcon } from '../components/common/SocialIcons';
import { useRFQ } from '../context/RFQContext';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openTechPackModal } = useRFQ();
  const { getBlogPostBySlug, blogPosts } = useCMS();

  const [copied, setCopied] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [claps, setClaps] = useState(28);
  const [hasClapped, setHasClapped] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const articleRef = useRef(null);

  // Find post or fallback to first post
  const post = useMemo(() => {
    return getBlogPostBySlug(slug) || blogPosts.find(p => p.slug === slug) || blogPosts[0];
  }, [slug, getBlogPostBySlug, blogPosts]);

  // Extract FAQs from post
  const postFaqs = useMemo(() => {
    return Array.isArray(post?.faqs) ? post.faqs : [];
  }, [post]);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(prev => prev === idx ? null : idx);
  };

  // Inject Google FAQPage JSON-LD schema into head
  useEffect(() => {
    if (!postFaqs || postFaqs.length === 0 || !post?.slug) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": postFaqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };
    const scriptId = `faq-schema-${post.slug}`;
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schema);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [postFaqs, post?.slug]);

  // Related posts (excluding current post)
  const relatedPosts = useMemo(() => {
    return blogPosts.filter(p => p.slug !== (post?.slug)).slice(0, 3);
  }, [blogPosts, post]);

  // Set document title
  useEffect(() => {
    document.title = `${post.title} | Hare Sportswear & Goods`;
    window.scrollTo(0, 0);
  }, [post]);

  // Extract all H2 headings for dynamic Table of Contents
  const headings = useMemo(() => {
    if (!post?.content) return [];
    const lines = post.content.split('\n');
    const h2s = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        const title = trimmed.replace(/^##\s+/, '');
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        h2s.push({ id, title });
      }
    });

    if (postFaqs.length > 0) {
      h2s.push({
        id: 'frequently-asked-questions',
        title: 'Frequently Asked Questions'
      });
    }

    return h2s;
  }, [post, postFaqs]);

  // Scroll listener for reading progress & scroll-spy TOC active state
  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate overall reading progress percentage
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(progress);

      // 2. Scroll-spy to determine currently active H2 heading
      if (headings.length > 0) {
        const headingElements = headings
          .map(h => document.getElementById(h.id))
          .filter(Boolean);

        const scrollPosition = window.scrollY + 180;

        let currentActive = headings[0].id;
        for (let i = 0; i < headingElements.length; i++) {
          const el = headingElements[i];
          if (el.offsetTop <= scrollPosition) {
            currentActive = headings[i].id;
          }
        }
        setActiveHeadingId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveHeadingId(id);
      setMobileTocOpen(false);
    }
  };

  const handleClap = () => {
    setClaps(prev => prev + 1);
    setHasClapped(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A] relative selection:bg-[#FF751F] selection:text-white">
      
      {/* ------------------------------------------------------------- */}
      {/* Top Reading Progress Bar (SaaS Style) */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#E5DFD5]">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#FF751F] via-[#FF934F] to-[#FF751F]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#595856] hover:text-[#FF751F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Article Header (Title, Author, Metadata) */}
        {/* ------------------------------------------------------------- */}
        <header className="max-w-4xl space-y-5 pb-8 border-b border-[#E5DFD5]">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#595856]">
            <span className="px-3 py-1 rounded-full bg-[#FF751F]/15 text-[#FF751F] font-bold uppercase tracking-wider text-[11px]">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FF751F]" /> {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#8C8476]" /> {post.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1A1A1A] leading-[1.18] tracking-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#595856] leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Author Header Row & Share Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="font-bold text-sm text-[#1A1A1A] font-display">{post.author.name}</p>
                <p className="text-xs text-[#8A847A]">{post.author.role}</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#8A847A] mr-1 hidden sm:inline">Share:</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white hover:bg-[#FF751F]/10 hover:text-[#FF751F] text-[#595856] border border-[#E5DFD5] transition-all shadow-sm"
                title="Share on LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white hover:bg-[#FF751F]/10 hover:text-[#FF751F] text-[#595856] border border-[#E5DFD5] transition-all shadow-sm"
                title="Share on Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-600 text-[#595856] border border-[#E5DFD5] transition-all shadow-sm"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyLink}
                className="p-2.5 rounded-xl bg-white hover:bg-black/5 text-[#595856] hover:text-[#1A1A1A] border border-[#E5DFD5] transition-all shadow-sm flex items-center gap-1.5 text-xs font-semibold"
                title="Copy Link"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-[11px] hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* Mobile Sticky / Collapsible TOC Bar */}
        {/* ------------------------------------------------------------- */}
        {headings.length > 0 && (
          <div className="lg:hidden mt-6 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm overflow-hidden">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between p-4 text-xs font-bold text-[#1A1A1A]"
            >
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-[#FF751F]" />
                <span>On this page ({headings.length} sections)</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#8C8476] transition-transform ${mobileTocOpen ? 'rotate-180 text-[#FF751F]' : ''}`} />
            </button>

            {mobileTocOpen && (
              <div className="p-4 pt-1 bg-[#FAF8F3] border-t border-[#E5DFD5] space-y-2 text-xs">
                {headings.map((heading, idx) => {
                  const isActive = activeHeadingId === heading.id;
                  return (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      onClick={(e) => scrollToSection(e, heading.id)}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-[#FF751F]/15 text-[#FF751F] font-bold' 
                          : 'text-[#595856] hover:text-[#1A1A1A]'
                      }`}
                    >
                      <span className="text-[10px] font-mono mr-2 text-[#8C8476]">{String(idx + 1).padStart(2, '0')}</span>
                      {heading.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* Main 3-Column SaaS Layout */}
        {/* [Left: Sticky TOC] | [Center: Article Body] | [Right: B2B Sidebar] */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Sticky Table of Contents (Desktop) */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF751F] animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-wider font-display text-[#1A1A1A]">
                    Table of Contents
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#8C8476]">
                  {Math.round(scrollProgress)}%
                </span>
              </div>

              {/* TOC Heading Links */}
              <nav className="space-y-1.5 text-xs max-h-[50vh] overflow-y-auto scrollbar-none pr-1">
                {headings.map((heading, idx) => {
                  const isActive = activeHeadingId === heading.id;
                  return (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      onClick={(e) => scrollToSection(e, heading.id)}
                      className={`group flex items-start gap-2.5 py-1.5 px-2.5 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-[#FF751F]/10 text-[#FF751F] font-bold translate-x-1' 
                          : 'text-[#66625B] hover:text-[#1A1A1A] hover:bg-black/5'
                      }`}
                    >
                      <span className={`text-[10px] font-mono mt-0.5 shrink-0 ${
                        isActive ? 'text-[#FF751F] font-bold' : 'text-[#8C8476]'
                      }`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="leading-snug line-clamp-2">
                        {heading.title}
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* Quick Tech Pack CTA in TOC */}
              <div className="pt-3 border-t border-[#E5DFD5] space-y-2 text-xs">
                <p className="text-[11px] text-[#66625B]">
                  Have a draft spec sheet ready for review?
                </p>
                <button
                  onClick={openTechPackModal}
                  className="w-full py-2 px-3 rounded-xl bg-[#1A1A1A] hover:bg-black text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#FF751F]" />
                  <span>Free Tech Pack Audit</span>
                </button>
              </div>

            </div>

            {/* Fabric Glossary Cross-Link Widget */}
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#DCD3C0] text-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF751F] block">
                Technical Reference
              </span>
              <h4 className="font-bold text-[#1A1A1A] font-display">
                Material &amp; Fabric Glossary
              </h4>
              <p className="text-[11px] text-[#66625B] leading-relaxed">
                Look up GSM standards, 4-way spandex ratios, and sublimation mechanics.
              </p>
              <Link 
                to="/fabric-glossary" 
                className="text-[#FF751F] font-bold hover:underline inline-flex items-center gap-1 pt-1"
              >
                <span>Browse Glossary Hub</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* CENTER COLUMN: Main Article Body */}
          {/* ========================================================= */}
          <main ref={articleRef} className="lg:col-span-6 space-y-8">
            
            {/* Featured Image */}
            <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-[#1A1A1A] border border-[#E5DFD5] shadow-md relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sialkot Factory Direct Insights</span>
              </div>
            </div>

            {/* Article Content with Parsed H2, H3, Lists, and Text */}
            <div className="prose max-w-none text-[#403D38] space-y-6 text-sm sm:text-base leading-relaxed">
              {post.content.split('\n\n').map((para, i) => {
                const trimmed = para.trim();

                // H1 Heading Parsing
                if (trimmed.startsWith('# ')) {
                  return (
                    <h1 key={i} className="text-3xl sm:text-4xl font-display font-black text-[#1A1A1A] pt-6 pb-2">
                      {trimmed.replace('# ', '')}
                    </h1>
                  );
                }

                // H2 Heading Parsing
                if (trimmed.startsWith('## ')) {
                  const title = trimmed.replace('## ', '');
                  const id = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                  return (
                    <div key={i} id={id} className="pt-8 scroll-mt-28 group">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#FF751F] uppercase tracking-wider font-mono">
                          // SECTION
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1A1A1A] leading-snug flex items-center gap-2">
                        <span>{title}</span>
                        <a 
                          href={`#${id}`} 
                          onClick={(e) => scrollToSection(e, id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[#8C8476] hover:text-[#FF751F] text-lg font-mono"
                          title="Copy link to section"
                        >
                          #
                        </a>
                      </h2>
                      <div className="w-12 h-1 bg-[#FF751F] rounded-full mt-2" />
                    </div>
                  );
                }

                // H3 Subheading Parsing
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-lg sm:text-xl font-display font-bold text-[#1A1A1A] pt-4 text-[#1A1A1A]">
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }

                // H4 Subheading Parsing
                if (trimmed.startsWith('#### ')) {
                  return (
                    <h4 key={i} className="text-base sm:text-lg font-display font-bold text-[#FF751F] pt-3">
                      {trimmed.replace('#### ', '')}
                    </h4>
                  );
                }

                // Markdown Table Parsing
                if (trimmed.startsWith('|') && trimmed.includes('\n|')) {
                  const rows = trimmed.split('\n').filter(r => r.trim().startsWith('|'));
                  const headerRow = rows[0];
                  const dataRows = rows.slice(1).filter(r => !r.includes('---'));

                  const parseCells = (rowStr) => 
                    rowStr.split('|')
                      .map(c => c.trim())
                      .filter((c, idx, arr) => (idx > 0 && idx < arr.length - 1) || (idx === 1 && arr.length === 3));

                  const headers = parseCells(headerRow);

                  return (
                    <div key={i} className="my-6 overflow-x-auto rounded-2xl border border-[#E5DFD5] bg-white shadow-xs">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead className="bg-[#FAF8F3] border-b border-[#E5DFD5]">
                          <tr>
                            {headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-4 py-3 font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                                {h.replace(/\*\*(.*?)\*\*/g, '$1')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5DFD5]/60">
                          {dataRows.map((rowStr, rIdx) => {
                            const cells = parseCells(rowStr);
                            return (
                              <tr key={rIdx} className="hover:bg-[#F5F1E8]/40 transition-colors">
                                {cells.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 text-gray-700 leading-relaxed">
                                    <span dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // Bullet Lists or Numbered Lists
                if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n');
                  return (
                    <div key={i} className="my-4 bg-white/70 p-5 rounded-2xl border border-[#E0D7C6]">
                      <ul className="space-y-2.5 text-xs sm:text-sm text-[#33302B]">
                        {items.map((it, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF751F] mt-2 shrink-0" />
                            <span dangerouslySetInnerHTML={{ 
                              __html: it.replace(/^[0-9]+\.\s*|-\s*/, '')
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                            }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                // Standard Paragraphs
                return (
                  <p 
                    key={i} 
                    className="leading-relaxed text-[#403D38]"
                    dangerouslySetInnerHTML={{ 
                      __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }}
                  />
                );
              })}
            </div>

            {/* Interactive Engagement & Clap Counter */}
            <div className="pt-6 border-t border-[#E5DFD5] flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E0D7C6]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClap}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                    hasClapped 
                      ? 'bg-[#FF751F] text-white border-[#FF751F] scale-105 shadow-md' 
                      : 'bg-[#FAF8F3] hover:bg-[#F5F1E8] text-[#1A1A1A] border-[#DCD3C0]'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful Article ({claps})</span>
                </button>
                <span className="text-xs text-[#8A847A] hidden sm:inline">Founders found this useful</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF8F3] hover:bg-[#F5F1E8] border border-[#DCD3C0] text-xs font-bold text-[#595856] flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Lead-Capture CTA Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#1A1A1A] text-white border border-black/40 shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF751F]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider relative z-10">
                <Sparkles className="w-4 h-4" /> Turn Your Designs Into Physical Samples
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight relative z-10">
                Get a Direct Sialkot Factory Quote &amp; 7-Day Physical Sample Run
              </h3>

              <p className="text-xs sm:text-sm text-[#D4CDC3] leading-relaxed max-w-2xl relative z-10">
                Whether you have a finalized Adobe Illustrator tech pack or simply need consultation on low-MOQ athletic apparel production from Sialkot, our technical engineering team will review your specs within 24 hours.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 relative z-10">
                <button
                  onClick={openTechPackModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-lg shadow-[#FF751F]/25 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Submit Tech Pack for Audit</span>
                </button>

                <a
                  href="https://wa.me/message/PBVPZM3J7ETGH1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Direct WhatsApp Line</span>
                </a>
              </div>
            </div>

            {/* ========================================================= */}
            {/* TECHNICAL FAQs SECTION (Page & SEO Schema Accordion) */}
            {/* ========================================================= */}
            {postFaqs.length > 0 && (
              <section id="frequently-asked-questions" className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5DFD5]">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#FF751F]/15 text-[#FF751F]">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1A1A1A]">
                        Frequently Asked Questions
                      </h2>
                      <span className="text-[11px] text-[#59554E]">
                        Technical manufacturing and procurement answers for this guide
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF751F] bg-[#FF751F]/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
                    {postFaqs.length} Technical Q&amp;As
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {postFaqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen
                            ? 'bg-white border-[#FF751F]/40 shadow-sm'
                            : 'bg-white/80 border-[#E5DFD5] hover:border-[#FF751F]/30 hover:bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <span className={`w-6 h-6 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isOpen ? 'bg-[#FF751F] text-white' : 'bg-[#F5F1E8] text-[#59554E]'
                            }`}>
                              Q{idx + 1}
                            </span>
                            <span className="font-display font-bold text-sm sm:text-base text-[#1A1A1A] leading-snug">
                              {faq.question}
                            </span>
                          </div>

                          <div className={`p-1 rounded-lg transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180 text-[#FF751F]' : 'text-stone-400'
                          }`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#59554E] leading-relaxed border-t border-[#E5DFD5]/50 mt-1">
                            <p className="pt-3">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* FAQ Technical Help / Inquiries Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#FFF8F2] to-[#FAF5EC] border border-[#FF751F]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF751F] animate-pulse"></span>
                    <span className="text-[#3A352F]">
                      Have a specific question not covered here? Consult our Sialkot garment engineers.
                    </span>
                  </div>
                  <button
                    onClick={openTechPackModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF751F] text-white font-bold hover:bg-[#e06214] transition-colors shrink-0 cursor-pointer shadow-xs text-[11px]"
                  >
                    <span>Ask An Engineer</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </section>
            )}

            {/* Author Bio Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5DFD5] flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-2xl object-cover border border-[#E5DFD5] shrink-0"
              />
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[11px] font-bold text-[#FF751F] uppercase tracking-wider">
                  About the Author
                </span>
                <h4 className="font-display font-bold text-base text-[#1A1A1A]">
                  {post.author.name}
                </h4>
                <p className="text-xs text-[#FF751F] font-bold">
                  {post.author.role} at Hare Sportswear &amp; Goods (Pvt.) Ltd.
                </p>
                <p className="text-xs text-[#595856] leading-relaxed pt-1">
                  Specializing in technical textile engineering, lean apparel manufacturing, and ISO quality auditing in Sialkot, Pakistan.
                </p>
              </div>
            </div>

          </main>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Dedicated B2B Sidebar */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-5">
            
            {/* Clean Stable Mascot Companion Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm space-y-3.5 text-center">
              <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-[#FF751F] shadow-md bg-[#1A1A1A]">
                <img
                  src="/images/mascot/hurry-hero.jpg"
                  alt="Hurry the Hare - Brand Mascot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF751F] block">
                  Meet Hurry the Hare 🐰
                </span>
                <h4 className="font-bold text-sm text-[#1A1A1A] font-display">
                  Need Custom Teamwear Samples?
                </h4>
                <p className="text-[11px] text-[#59554E] leading-relaxed mt-1">
                  Get direct Sialkot factory advice on tech packs, fabric weights (GSM), and 7-day rapid physical prototypes.
                </p>
              </div>
              <Link
                to="/contact?source=blog-mascot-card"
                className="w-full py-2.5 px-3 rounded-xl bg-[#FF751F] hover:bg-[#e06214] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Request Factory Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Factory Specs Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#FF751F] uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>Factory Production Highlights</span>
              </div>
              <h4 className="font-bold text-sm text-[#1A1A1A] font-display">
                Sialkot Turnaround Benchmarks
              </h4>
              <ul className="space-y-2 text-xs text-[#59554E]">
                <li className="flex items-center justify-between pb-1.5 border-b border-[#E5DFD5]">
                  <span>Physical Sampling:</span>
                  <strong className="text-[#1A1A1A]">5–7 Days</strong>
                </li>
                <li className="flex items-center justify-between pb-1.5 border-b border-[#E5DFD5]">
                  <span>Minimum Order (MOQ):</span>
                  <strong className="text-[#1A1A1A]">30–50 Pcs</strong>
                </li>
                <li className="flex items-center justify-between pb-1.5 border-b border-[#E5DFD5]">
                  <span>Quality Standard:</span>
                  <strong className="text-emerald-600 font-bold">AQL 2.5 Major</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Air Shipping Transit:</span>
                  <strong className="text-[#1A1A1A]">3–5 Days (DHL/FedEx)</strong>
                </li>
              </ul>
            </div>

            {/* Physical Swatch Box Promotion */}
            <div className="p-5 rounded-2xl bg-[#1A1A1A] text-white border border-black/40 shadow-md space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF751F]">
                <Box className="w-3.5 h-3.5" />
                <span>Physical Swatch Portfolio</span>
              </div>
              <h4 className="font-bold text-sm text-white font-display">
                Order 30+ Fabric Swatches
              </h4>
              <p className="text-[11px] text-[#C4BDAF] leading-relaxed">
                Test interlocks, 4-way spandex, and 3D silicone transfers before placing bulk orders.
              </p>
              <Link
                to="/fabric-glossary"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#FF751F] hover:underline pt-1"
              >
                <span>Explore Fabric Glossary</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Related Manufacturing Guides */}
            {relatedPosts.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] font-display">
                  Related Factory Guides
                </h4>
                <div className="space-y-3">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/blog/${rel.slug}`}
                      className="group block space-y-1 pb-2.5 border-b border-[#E5DFD5] last:border-0 last:pb-0"
                    >
                      <span className="text-[10px] font-semibold text-[#FF751F] block uppercase">
                        {rel.category}
                      </span>
                      <h5 className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </aside>

        </div>

      </div>

    </div>
  );
}
