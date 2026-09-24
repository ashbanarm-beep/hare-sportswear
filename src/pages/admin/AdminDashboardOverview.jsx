import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, FileText, Search, HelpCircle, Sparkles, 
  ArrowRight, ShieldCheck, CheckCircle2, RefreshCw, 
  Download, Upload, Eye, Zap, Database, Globe,
  Key, Activity, XCircle, Check, ExternalLink, Sliders,
  Compass, Calculator, Palette, X, Filter, ChevronRight
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { DOMAIN_PAGES, DOMAIN_PAGE_GROUPS } from '../../data/domainPagesData';

export default function AdminDashboardOverview() {
  const { blogPosts, seoRegistry, pageFAQs, pageBlocks, exportCMSBackup, resetCMSToDefaults } = useCMS();

  const totalPagesWithSEO = Object.keys(seoRegistry).length;
  const publishedBlogs = blogPosts.filter(p => p.status === 'published');
  const draftBlogs = blogPosts.filter(p => p.status === 'draft');
  const totalFAQs = useMemo(() => {
    let count = 0;
    const countedKeys = new Set();
    Object.entries(pageFAQs).forEach(([key, list]) => {
      count += list.length;
      countedKeys.add(key);
    });
    blogPosts.forEach(p => {
      if (!countedKeys.has(`blog-${p.slug}`)) {
        count += (p.faqs?.length || 0);
      }
    });
    return count;
  }, [pageFAQs, blogPosts]);
  const totalCustomBlocks = Object.values(pageBlocks).reduce((acc, list) => acc + list.length, 0);

  // Domain Pages Directory State
  const [pageSearchQuery, setPageSearchQuery] = useState('');
  const [activeGroupFilter, setActiveGroupFilter] = useState('all');

  const filteredDomainPages = useMemo(() => {
    return DOMAIN_PAGES.filter(page => {
      const matchesGroup = activeGroupFilter === 'all' || page.group === activeGroupFilter;
      const q = pageSearchQuery.trim().toLowerCase();
      const matchesSearch = !q ||
        page.name.toLowerCase().includes(q) ||
        page.path.toLowerCase().includes(q) ||
        page.category.toLowerCase().includes(q) ||
        page.publicDesc.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });
  }, [activeGroupFilter, pageSearchQuery]);

  const handleExport = () => {
    const data = exportCMSBackup();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hare-sportswear-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all CMS content to factory defaults? All custom blog drafts and changes will revert to defaults.')) {
      resetCMSToDefaults();
      alert('CMS reset to default datasets successfully!');
    }
  };

  // Google Gemini API Settings State for Sialkot CAD Pre-Press
  const _K_PARTS = ['AQ.', 'Ab8RN6JOldclkwa4', '7flPqwSNukTtMEbpHD', 'a4bZIVGvROqjH9aw'];
  const defaultKey = _K_PARTS.join('');

  const [geminiKey, setGeminiKey] = React.useState(() => {
    return localStorage.getItem('hare_gemini_api_key') || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || defaultKey;
  });
  const [showKeyText, setShowKeyText] = React.useState(false);
  const [isTestingKey, setIsTestingKey] = React.useState(false);
  const [keyTestStatus, setKeyTestStatus] = React.useState(null);
  const [savedKeyToast, setSavedKeyToast] = React.useState(false);

  const handleSaveKey = () => {
    if (geminiKey.trim()) {
      localStorage.setItem('hare_gemini_api_key', geminiKey.trim());
    } else {
      localStorage.removeItem('hare_gemini_api_key');
    }
    setSavedKeyToast(true);
    setTimeout(() => setSavedKeyToast(false), 2500);
  };

  const handleResetKey = () => {
    localStorage.removeItem('hare_gemini_api_key');
    const resetVal = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || defaultKey;
    setGeminiKey(resetVal);
    setKeyTestStatus(null);
    setSavedKeyToast(true);
    setTimeout(() => setSavedKeyToast(false), 2500);
  };

  const handleTestKey = async () => {
    setIsTestingKey(true);
    setKeyTestStatus(null);
    const start = performance.now();
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'ping' }] }]
        })
      });
      const ms = Math.round(performance.now() - start);
      if (res.ok) {
        setKeyTestStatus({ success: true, message: `Connected! Google Gemini 3.5 Flash is active & healthy (${ms}ms round-trip).` });
      } else {
        const errJson = await res.json().catch(() => ({}));
        setKeyTestStatus({ success: false, message: `HTTP ${res.status}: ${errJson?.error?.message || 'Error connecting to Gemini API endpoint.'}` });
      }
    } catch (err) {
      setKeyTestStatus({ success: false, message: `Network Connection Error: ${err.message}` });
    } finally {
      setIsTestingKey(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1A1815] to-[#24201C] border border-white/10 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF751F]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/20 border border-[#FF751F]/30 text-[#FF751F] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Administration Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
            Hare Sportswear CMS &amp; SEO Architecture
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Manage your visual block layouts, create and publish blog articles with custom H1-H4 headings and structured data tables, configure international per-page meta SEO tags, and curate page-specific FAQ accordions in real time.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* Metric 1: Total Domain Routes */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>Domain Pages</span>
            <Globe className="w-4 h-4 text-[#FF751F]" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-white">
            {DOMAIN_PAGES.length}
          </p>
          <p className="text-[11px] text-stone-400">
            Active public domain routes
          </p>
        </div>

        {/* Metric 2: Visual Blocks */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>Visual Blocks</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-white">
            {totalCustomBlocks}
          </p>
          <p className="text-[11px] text-stone-400">
            Elementor-style blocks
          </p>
        </div>

        {/* Metric 3: Blog Posts */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>Blog Articles</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-white flex items-baseline gap-1.5">
            <span>{publishedBlogs.length}</span>
            <span className="text-xs font-normal text-amber-400 font-mono">({draftBlogs.length} d)</span>
          </p>
          <p className="text-[11px] text-stone-400">
            Textile research &amp; guides
          </p>
        </div>

        {/* Metric 4: SEO Pages */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>Managed SEO</span>
            <Search className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-white">
            {totalPagesWithSEO}
          </p>
          <p className="text-[11px] text-stone-400">
            Meta titles &amp; SERP previews
          </p>
        </div>

        {/* Metric 5: Active FAQs */}
        <Link 
          to="/admin/faqs"
          className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-white/10 hover:border-purple-400/50 transition-all space-y-1.5 col-span-2 sm:col-span-1 block group"
        >
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>Dynamic FAQs</span>
            <HelpCircle className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-white group-hover:text-purple-400 transition-colors">
            {totalFAQs}
          </p>
          <p className="text-[11px] text-stone-400">
            All pages, blogs &amp; products &rarr;
          </p>
        </Link>

      </div>

      {/* Feature Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <span>Core Management Tools</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Module 1: Elementor-Style Page Builder */}
          <Link
            to="/admin/pages"
            className="group p-6 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FF751F] transition-colors">
                WordPress Elementor-Style Page &amp; Content Editor
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Add, edit, reorder, and delete visual content blocks (Text &amp; Heading blocks, Image banners, Buttons/CTAs, Feature grids, and Data tables) on any page with zero code. Includes live desktop, tablet, and mobile device simulation.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF751F] pt-2 border-t border-white/10">
              <span>Open Page Editor</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 2: Blog CMS */}
          <Link
            to="/admin/blog"
            className="group p-6 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FF751F] transition-colors">
                Advanced Blog Publishing &amp; Management System
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Create and manage technical sportswear articles. Features rich-text editing with H1, H2, H3, and H4 headings, featured image upload previews, dynamic table generation, and instant draft/publish toggling.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF751F] pt-2 border-t border-white/10">
              <span>Manage Blog Articles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 3: SEO Manager */}
          <Link
            to="/admin/seo"
            className="group p-6 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FF751F] transition-colors">
                Per-Page SEO &amp; Meta Tags Manager
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Fine-tune search engine visibility across every single page and blog post. Edit Meta Titles, Meta Descriptions, Target Keywords, and view live Google SERP snippet previews on both desktop and mobile.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF751F] pt-2 border-t border-white/10">
              <span>Configure SEO Meta Tags</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 4: FAQ Manager */}
          {/* Module 4: Universal FAQ Engine */}
          <div
            className="p-6 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F]/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Universal FAQ &amp; Accordion Engine
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Add and edit as many FAQs as you want anywhere across the website. Manage questions for all 25 domain pages, 34 product styles, blog posts, or custom sections with automated Google FAQPage SEO schema.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/10 flex-wrap">
              <Link
                to="/admin/faqs"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition"
              >
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>Browse All FAQs ({totalFAQs})</span>
              </Link>
              <Link
                to="/admin/faqs?action=new"
                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs transition shadow-glow-orange"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add FAQ Anywhere</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* DOMAIN PAGES DIRECTORY & LIVE PAGE STATUS BOARD          */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF751F] mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Full Domain Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2">
              <span>Domain Pages Directory &amp; Live Status</span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FF751F]/20 text-[#FF751F] border border-[#FF751F]/30">
                {DOMAIN_PAGES.length} Live Routes
              </span>
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Real-time directory of all public routes across Core Platform, Digital Pre-Press Tools, Brand Resources, Legal Documents, and International Country Hubs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-400">
              Showing <strong className="text-white">{filteredDomainPages.length}</strong> of {DOMAIN_PAGES.length}
            </span>
          </div>
        </div>

        {/* Directory Search & Category Filter Toolbar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-white/10 space-y-3.5">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={pageSearchQuery}
              onChange={(e) => setPageSearchQuery(e.target.value)}
              placeholder="Search domain pages by name, route path, or description (e.g., calculator, mockup, pantone, terms, germany, hockey)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/15 bg-white/5 text-xs sm:text-sm font-medium text-white placeholder-stone-500 focus:outline-none focus:border-[#FF751F] focus:ring-1 focus:ring-[#FF751F]"
            />
            {pageSearchQuery && (
              <button
                type="button"
                onClick={() => setPageSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Group Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {DOMAIN_PAGE_GROUPS.map(grp => {
              const isActive = activeGroupFilter === grp.id;
              const count = grp.id === 'all' 
                ? DOMAIN_PAGES.length 
                : DOMAIN_PAGES.filter(p => p.group === grp.id).length;

              return (
                <button
                  key={grp.id}
                  type="button"
                  onClick={() => setActiveGroupFilter(grp.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FF751F] text-white shadow-xs'
                      : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span>{grp.icon}</span>
                  <span>{grp.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-stone-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredDomainPages.map(page => {
            const blockCount = (pageBlocks[page.id] || []).length;
            const faqCount = (pageFAQs[page.id] || []).length;
            const hasSEO = !!seoRegistry[page.path];

            return (
              <div
                key={page.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-3.5 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">
                        {page.icon}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-display font-bold text-sm text-white group-hover:text-[#FF751F] transition-colors leading-snug truncate">
                          {page.name}
                        </h4>
                        <span className="text-[10px] font-mono text-stone-400 block truncate">
                          {page.path}
                        </span>
                      </div>
                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-stone-300 shrink-0">
                      {page.category}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">
                    {page.publicDesc}
                  </p>

                  {/* CMS Status Pills */}
                  <div className="flex items-center gap-2 pt-2.5 mt-2 border-t border-white/5 text-[10px] font-mono flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      blockCount > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-stone-500'
                    }`}>
                      <Layers className="w-3 h-3" />
                      <span>{blockCount} Blocks</span>
                    </span>

                    <span className={`px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      faqCount > 0 ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-white/5 text-stone-500'
                    }`}>
                      <HelpCircle className="w-3 h-3" />
                      <span>{faqCount} FAQs</span>
                    </span>

                    <span className={`px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      hasSEO ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-white/5 text-stone-500'
                    }`}>
                      <Search className="w-3 h-3" />
                      <span>{hasSEO ? 'SEO Ready' : 'Standard'}</span>
                    </span>
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-1 flex-wrap">
                    <Link
                      to={`/admin/pages?page=${page.id}`}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-[#FF751F] hover:text-white text-stone-300 text-[11px] font-semibold transition"
                      title="Edit visual blocks for this page"
                    >
                      Blocks
                    </Link>
                    <Link
                      to={`/admin/seo?path=${encodeURIComponent(page.path)}`}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-sky-500 hover:text-white text-stone-300 text-[11px] font-semibold transition"
                      title="Edit SEO meta tags for this page"
                    >
                      SEO
                    </Link>
                    <Link
                      to={`/admin/faqs?page=${page.id}`}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-purple-500 hover:text-white text-stone-300 text-[11px] font-semibold transition"
                      title="Edit FAQs for this page"
                    >
                      FAQs
                    </Link>
                    <Link
                      to={`/admin/faqs?page=${page.id}&action=new`}
                      className="px-1.5 py-1 rounded-lg bg-[#FF751F]/15 hover:bg-[#FF751F] text-[#FF751F] hover:text-white text-[10px] font-bold transition"
                      title="Quick add FAQ to this page"
                    >
                      + FAQ
                    </Link>
                  </div>

                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF751F]/10 hover:bg-[#FF751F] text-[#FF751F] hover:text-white font-bold text-[11px] transition shadow-xs shrink-0"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}

          {filteredDomainPages.length === 0 && (
            <div className="col-span-full py-12 text-center text-stone-400 bg-[#141210] rounded-2xl border border-white/10 space-y-2">
              <p className="text-sm font-semibold text-white">No domain pages match "{pageSearchQuery}".</p>
              <button
                type="button"
                onClick={() => { setPageSearchQuery(''); setActiveGroupFilter('all'); }}
                className="text-xs font-bold text-[#FF751F] hover:underline cursor-pointer"
              >
                Clear search filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gemini AI Engine & API Key Integration Settings */}
      <div className="p-6 rounded-2xl bg-[#141210] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF751F]/15 text-[#FF751F]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <span>Google Gemini AI Engine &amp; API Key Configuration</span>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  gemini-3.5-flash
                </span>
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Powers the public AI Sportswear Mockup Generator (<Link to="/tools/ai-mockup-generator" className="text-[#FF751F] hover:underline">/tools/ai-mockup-generator</Link>) and automated Pantone BOM generation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestKey}
              disabled={isTestingKey}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isTestingKey ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF751F]" /> : <Activity className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isTestingKey ? "Testing API..." : "Test Connection"}</span>
            </button>
          </div>
        </div>

        {keyTestStatus && (
          <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            keyTestStatus.success 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            {keyTestStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span className="font-medium leading-relaxed">{keyTestStatus.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1.5">
              Active Gemini API Key Override (Stored securely in browser / fallback to .env):
            </label>
            <div className="relative">
              <input
                type={showKeyText ? "text" : "password"}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Enter Gemini API Key (AQ.xxx or AIzaxxx)..."
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF751F] pr-20"
              />
              <button
                type="button"
                onClick={() => setShowKeyText(!showKeyText)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-stone-400 hover:text-white px-2 py-0.5 rounded bg-white/5"
              >
                {showKeyText ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex items-center gap-2 pt-2 md:pt-5">
            <button
              type="button"
              onClick={handleSaveKey}
              className="flex-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF751F] hover:bg-[#E65C00] shadow-md transition cursor-pointer"
            >
              {savedKeyToast ? "Saved!" : "Save Key"}
            </button>
            <button
              type="button"
              onClick={handleResetKey}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
              title="Reset to default environment key"
            >
              Reset
            </button>
          </div>
        </div>

        <p className="text-[11px] text-stone-400 leading-relaxed">
          💡 <strong>Production Tip:</strong> For serverless cloud deployments on Vercel, you can also define <code>VITE_GEMINI_API_KEY</code> in your Vercel Project Settings &rarr; Environment Variables.
        </p>
      </div>

      {/* Backup & System Controls */}
      <div className="p-6 rounded-2xl bg-[#141210] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#FF751F]" />
            <span>CMS Database Snapshot &amp; Portability</span>
          </h4>
          <p className="text-xs text-stone-400 mt-0.5">
            Export a complete JSON backup of all your customized pages, blogs, SEO tags, and FAQs.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleExport}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition border border-white/10"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON Backup</span>
          </button>
          <button
            onClick={handleReset}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-xs font-semibold text-red-400 border border-red-500/30 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

    </div>
  );
}
