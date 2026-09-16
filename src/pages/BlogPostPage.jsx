import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Clock, Calendar, ArrowLeft, Share2, MessageCircle, 
  Copy, Check, FileText, ArrowRight, User, Sparkles, 
  ListOrdered, ChevronRight, ChevronDown, Bookmark, 
  Lightbulb, ShieldCheck, Zap, X, Eye, ThumbsUp
} from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { LinkedInIcon, TwitterIcon } from '../components/common/SocialIcons';
import { useRFQ } from '../context/RFQContext';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openTechPackModal } = useRFQ();

  const [copied, setCopied] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [mascotDismissed, setMascotDismissed] = useState(false);
  const [mascotClicked, setMascotClicked] = useState(false);
  const [claps, setClaps] = useState(24);
  const [hasClapped, setHasClapped] = useState(false);

  const articleRef = useRef(null);

  // Find post or fallback to first post
  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug) || blogPosts[0];
  }, [slug]);

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

    return h2s;
  }, [post]);

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

  const handleMascotClick = (e) => {
    if (e) e.stopPropagation();
    setMascotClicked(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FF751F', '#FFA05C', '#1A1A1A', '#FFFFFF']
      });
    } catch (e) {}

    setTimeout(() => {
      setMascotClicked(false);
      openTechPackModal();
    }, 450);
  };

  const handleClap = () => {
    setClaps(prev => prev + 1);
    setHasClapped(true);
    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.85 },
        colors: ['#FF751F', '#1A1A1A']
      });
    } catch (e) {}
  };

  // Dynamic Mascot speech bubble & tips based on scroll percentage
  const mascotState = useMemo(() => {
    if (scrollProgress < 25) {
      return {
        stage: 'intro',
        title: 'Hey Brand Founder! 🐰',
        message: "I'm Hurry the Hare. Read along as I share secret Sialkot manufacturing insights!",
        actionLabel: 'Browse All Sections',
        actionType: 'toc',
        badge: 'Article Guide',
      };
    } else if (scrollProgress < 55) {
      return {
        stage: 'specs',
        title: '💡 Engineering Tip',
        message: 'Always specify exact SPI (Stitches Per Inch) & Pantone TCX swatches to avoid sample rejections!',
        actionLabel: 'Need Fabric Specs?',
        actionType: 'glossary',
        badge: 'Factory Insight',
      };
    } else if (scrollProgress < 85) {
      return {
        stage: 'craft',
        title: '🧵 Sialkot Secret',
        message: 'Our 4-needle 6-thread flatlock seams prevent athlete chafing under maximum match exertion.',
        actionLabel: 'Order Physical Swatches',
        actionType: 'contact',
        badge: 'Craft Mastery',
      };
    } else {
      return {
        stage: 'conclusion',
        title: '🚀 Ready to Produce?',
        message: 'Click me to upload your tech pack for a rapid 7-day physical prototype run!',
        actionLabel: 'Get Instant 24h Quote',
        actionType: 'quote',
        badge: '7-Day Turnaround',
      };
    }
  }, [scrollProgress]);

  const handleMascotAction = () => {
    if (mascotState.actionType === 'quote') {
      openTechPackModal();
    } else if (mascotState.actionType === 'glossary') {
      navigate('/fabric-glossary');
    } else if (mascotState.actionType === 'contact') {
      navigate('/contact');
    } else if (headings[0]) {
      scrollToSection({ preventDefault: () => {} }, headings[0].id);
    }
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
        {/* Main 3-Column / Responsive SaaS Layout */}
        {/* [Left: Sticky TOC] | [Center: Article] | [Right: Floating Mascot] */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Sticky Table of Contents (Desktop) */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-6">
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
              <nav className="space-y-1.5 text-xs">
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
                Related Technical Hub
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
                <span>Sialkot Factory Certified Insights</span>
              </div>
            </div>

            {/* Article Content with Parsed H2, H3, Lists, and Text */}
            <div className="prose max-w-none text-[#403D38] space-y-6 text-sm sm:text-base leading-relaxed">
              {post.content.split('\n\n').map((para, i) => {
                const trimmed = para.trim();

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
                  href="https://wa.me/923001234567?text=Hi%20Hare%20Sportswear,%20I%20just%20read%20your%20blog%20post%20and%20want%20to%20inquire%20about%20manufacturing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Direct WhatsApp Line</span>
                </a>
              </div>
            </div>

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
          {/* RIGHT COLUMN: Floating Scrolling Mascot ("Hurry the Hare") */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-4">
            
            {!mascotDismissed ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* 1. SaaS Dynamic Speech Bubble (SayNine Inspired) */}
                <motion.div
                  key={mascotState.stage}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3 relative"
                >
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#FF751F]/40 shadow-xl space-y-2 relative">
                    
                    {/* Header badge */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded-full bg-[#FF751F]/15 text-[#FF751F] font-bold uppercase tracking-wider">
                        {mascotState.badge}
                      </span>
                      <button
                        onClick={() => setMascotDismissed(true)}
                        className="text-[#8C8476] hover:text-[#1A1A1A]"
                        title="Minimize mascot"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-[#1A1A1A] font-display">
                      {mascotState.title}
                    </h4>

                    <p className="text-xs text-[#59554E] leading-relaxed">
                      {mascotState.message}
                    </p>

                    <button
                      onClick={handleMascotAction}
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FF751F] hover:bg-[#e06214] text-white font-bold text-[11px] transition-colors shadow-sm flex items-center justify-center gap-1"
                    >
                      <span>{mascotState.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    {/* Speech pointer triangle */}
                    <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white border-r-2 border-b-2 border-[#FF751F]/40 rotate-45" />
                  </div>
                </motion.div>

                {/* 2. Interactive Mascot Card with Gentle Floating Animation */}
                <motion.div
                  animate={
                    mascotClicked
                      ? { scale: [1, 0.9, 1.12, 1], rotate: [0, -6, 6, 0] }
                      : { y: [0, -6, 0] }
                  }
                  transition={
                    mascotClicked
                      ? { duration: 0.45, ease: 'easeOut' }
                      : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleMascotClick}
                  className="rounded-3xl bg-white border border-[#E5DFD5] p-3 shadow-lg cursor-pointer group select-none relative overflow-hidden"
                  title="Click Hurry the Hare to request a quote!"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1A1A1A]">
                    <img
                      src="/images/mascot/hurry-hero.jpg"
                      alt="Hurry the Hare Mascot"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#1A1A1A] shadow-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Reading with you</span>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <span className="text-[11px] font-bold text-white block">
                        🐰 Hurry the Hare
                      </span>
                      <span className="text-[10px] text-[#FF751F] font-semibold">
                        Tap for 7-Day Prototype
                      </span>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            ) : (
              // Re-open chip when minimized
              <button
                onClick={() => setMascotDismissed(false)}
                className="w-full p-3 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm hover:border-[#FF751F] text-xs font-bold text-[#1A1A1A] flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🐰</span>
                  <span>Open Hurry Companion</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8C8476] group-hover:text-[#FF751F]" />
              </button>
            )}

            {/* Quick Sialkot Certifications Tag */}
            <div className="p-3 rounded-xl bg-white/60 border border-[#E5DFD5] text-[11px] text-[#66625B] space-y-1">
              <p className="font-bold text-[#1A1A1A]">⚡ Direct Factory Production</p>
              <p>Turnaround: 5-7 days rapid sample</p>
              <p>Export: USA, UK, EU, UAE, Australia</p>
            </div>

          </aside>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* Mobile Floating Hurry Companion Button (Bottom-Right) */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:hidden fixed bottom-6 right-4 z-40">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleMascotClick}
          className="p-3 rounded-full bg-[#1A1A1A] text-white border-2 border-[#FF751F] shadow-2xl flex items-center gap-2 relative"
        >
          <span className="text-xl">🐰</span>
          <span className="text-xs font-bold text-white pr-1">Ask Hurry</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
        </motion.button>
      </div>

    </div>
  );
}
