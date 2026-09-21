import React, { useState, useMemo } from 'react';
import { 
  Search, Globe, Check, Sparkles, Monitor, Smartphone, 
  ExternalLink, Save, ArrowRight, ShieldCheck, HelpCircle,
  Copy, RefreshCw, Layers, FileText
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminSEOManager() {
  const { seoRegistry, updatePageSEO, blogPosts } = useCMS();

  // Combine static pages and blog posts into available SEO list
  const allRoutes = useMemo(() => {
    const list = Object.keys(seoRegistry).map(path => {
      let type = 'Core Page';
      if (path.startsWith('/tools')) type = 'Digital Tool';
      else if (path.startsWith('/sports-wear-manufacturer-') || path.startsWith('/global-reach')) type = 'Regional Hub';
      else if (path.startsWith('/blog/')) type = 'Blog Post';

      return {
        path,
        type,
        ...(seoRegistry[path] || {})
      };
    });

    // Also include any published blog posts not yet explicitly in registry
    blogPosts.forEach(p => {
      const blogPath = `/blog/${p.slug}`;
      if (!list.some(item => item.path === blogPath)) {
        list.push({
          path: blogPath,
          type: 'Blog Post',
          title: `${p.title} | Hare Sportswear Blog`,
          description: p.excerpt || p.title,
          keywords: `${p.category}, sportswear tech pack, textile guide, sialkot manufacturing`,
          canonical: `https://hare-sportswear.vercel.app${blogPath}`
        });
      }
    });

    return list;
  }, [seoRegistry, blogPosts]);

  const [selectedPath, setSelectedPath] = useState('/');
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [savedToast, setSavedToast] = useState(false);

  // Active item state
  const activeSEO = useMemo(() => {
    return seoRegistry[selectedPath] || allRoutes.find(r => r.path === selectedPath) || {
      title: '',
      description: '',
      keywords: '',
      canonical: `https://hare-sportswear.vercel.app${selectedPath}`
    };
  }, [selectedPath, seoRegistry, allRoutes]);

  const [formData, setFormData] = useState({ ...activeSEO });

  // Update formData when selectedPath changes
  React.useEffect(() => {
    setFormData({ ...activeSEO });
  }, [selectedPath, activeSEO]);

  // Filtered route list
  const filteredRoutes = useMemo(() => {
    return allRoutes.filter(r => {
      const matchesType = filterType === 'All' || r.type === filterType;
      const matchesSearch = searchQuery === '' || 
        r.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.title && r.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [allRoutes, filterType, searchQuery]);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updatePageSEO(selectedPath, formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const generateAISuggestion = () => {
    const pageName = selectedPath === '/' ? 'Homepage' : selectedPath.replace(/[-/]/g, ' ').trim();
    const title = `${pageName.replace(/\b\w/g, l => l.toUpperCase())} | Sialkot Sportswear OEM/ODM Manufacturer`;
    const desc = `Direct Sialkot manufacturer for ${pageName}. Low MOQs, rapid 7-day sampling, Kiian Italian sublimation, and DDP door delivery to global sports brands.`;
    const keywords = `${pageName}, sportswear manufacturer sialkot, custom athletic wear oem, direct factory pricing`;

    setFormData(prev => ({
      ...prev,
      title,
      description: desc,
      keywords
    }));
  };

  const titleLength = (formData.title || '').length;
  const descLength = (formData.description || '').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
            <Search className="w-3.5 h-3.5" />
            <span>Search Engine Optimization &amp; SERP Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Per-Page SEO &amp; Meta Tags Manager
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Control individual Google Meta Titles, Meta Descriptions, and keywords for maximum international B2B ranking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedToast && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-fadeIn">
              <Check className="w-4 h-4" /> SEO Saved!
            </span>
          )}

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-xs font-bold text-white shadow-glow-orange transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Meta Tags</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Route Navigator / Right SEO Editor & Google SERP Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Route Selector & Search (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Managed Pages ({filteredRoutes.length})
              </span>
            </div>

            {/* Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by URL or title..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#141210] border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#FF751F]"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                {['All', 'Core Page', 'Digital Tool', 'Regional Hub', 'Blog Post'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition ${
                      filterType === t 
                        ? 'bg-[#FF751F] text-white' 
                        : 'bg-white/5 text-stone-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Route List */}
          <div className="rounded-2xl bg-[#141210] border border-white/10 p-2 space-y-1 max-h-[550px] overflow-y-auto">
            {filteredRoutes.map((route) => {
              const isSelected = selectedPath === route.path;

              return (
                <button
                  key={route.path}
                  onClick={() => setSelectedPath(route.path)}
                  className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between gap-2 ${
                    isSelected 
                      ? 'bg-[#FF751F]/15 border border-[#FF751F]/40 text-white font-bold shadow-xs' 
                      : 'hover:bg-white/5 text-stone-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs block truncate">
                      {route.path}
                    </span>
                    <span className="text-[10px] text-stone-400 block truncate">
                      {route.title || 'Untitled Page'}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-stone-400 shrink-0">
                    {route.type}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: SEO Form & Live Google SERP Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Route Header Bar */}
          <div className="p-4 rounded-2xl bg-[#141210] border border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FF751F]" />
              <span className="font-mono text-xs text-stone-300 font-bold">
                Route: <span className="text-[#FF751F]">{selectedPath}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={generateAISuggestion}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 text-xs font-bold border border-purple-500/30 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Generate AI SEO Tags</span>
              </button>

              <a
                href={selectedPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-stone-400 hover:text-white"
              >
                <span>Live URL</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* GOOGLE SERP SNIPPET PREVIEW (KEY FEATURE) */}
          {/* ========================================================= */}
          <div className="p-5 rounded-2xl bg-[#141210] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-300">
                <span>Google Search Results (SERP) Live Preview</span>
              </div>

              <div className="flex items-center gap-1 bg-[#1A1815] p-1 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-[#FF751F] text-white' : 'text-stone-400'}`}
                  title="Desktop Search Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-[#FF751F] text-white' : 'text-stone-400'}`}
                  title="Mobile Search Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Google Search Result Box */}
            <div className={`p-4 rounded-xl bg-[#202124] border border-stone-700 space-y-1 ${
              previewDevice === 'mobile' ? 'max-w-sm' : 'w-full'
            }`}>
              {/* URL & Favicon */}
              <div className="flex items-center gap-2 text-[11px] text-[#bdc1c6] truncate">
                <div className="w-4 h-4 rounded-full bg-[#FF751F] text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                  H
                </div>
                <span className="text-[#dadce0] font-semibold">Hare Sportswear</span>
                <span className="text-[#9aa0a6] truncate">https://hare-sportswear.vercel.app{selectedPath}</span>
              </div>

              {/* SERP Title */}
              <h3 className="text-[#8ab4f8] text-base hover:underline cursor-pointer font-sans leading-snug line-clamp-1">
                {formData.title || 'Page Title Not Specified'}
              </h3>

              {/* SERP Description */}
              <p className="text-[#bdc1c6] text-xs leading-relaxed line-clamp-2 pt-0.5">
                {formData.description || 'No meta description provided. Search engines will automatically grab arbitrary text from your page body instead.'}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#141210] border border-white/10 space-y-5 text-xs">
            
            {/* Meta Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-stone-300 uppercase tracking-wider text-[11px]">
                  Meta Title (&lt;title&gt;) *
                </label>
                <span className={`font-mono text-[11px] font-bold ${
                  titleLength >= 50 && titleLength <= 60 
                    ? 'text-emerald-400' 
                    : titleLength > 60 
                      ? 'text-red-400' 
                      : 'text-amber-400'
                }`}>
                  {titleLength} / 60 chars (Recommended: 50-60)
                </span>
              </div>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Custom Sportswear & Athletic Goods Catalog | Hare Sportswear Sialkot"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-sm focus:outline-none focus:border-[#FF751F]"
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-stone-300 uppercase tracking-wider text-[11px]">
                  Meta Description (&lt;meta name="description"&gt;) *
                </label>
                <span className={`font-mono text-[11px] font-bold ${
                  descLength >= 140 && descLength <= 160 
                    ? 'text-emerald-400' 
                    : descLength > 160 
                      ? 'text-red-400' 
                      : 'text-amber-400'
                }`}>
                  {descLength} / 160 chars (Recommended: 140-160)
                </span>
              </div>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Compelling 1-2 sentence description explaining your Sialkot OEM/ODM capabilities, low MOQs, and product offerings..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs leading-relaxed focus:outline-none focus:border-[#FF751F]"
              />
            </div>

            {/* Target Keywords */}
            <div className="space-y-1.5">
              <label className="font-bold text-stone-300 uppercase tracking-wider text-[11px] block">
                Target SEO Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.keywords || ''}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="e.g. sportswear manufacturer sialkot, custom jerseys wholesale, activewear OEM"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#FF751F]"
              />
            </div>

            {/* Canonical Link */}
            <div className="space-y-1.5">
              <label className="font-bold text-stone-300 uppercase tracking-wider text-[11px] block">
                Canonical URL
              </label>
              <input
                type="text"
                value={formData.canonical || `https://hare-sportswear.vercel.app${selectedPath}`}
                onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-stone-300 font-mono text-xs focus:outline-none focus:border-[#FF751F]"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-[11px] text-stone-400">
                SEO tags apply dynamically and immediately update document title and head tags.
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs shadow-glow-orange transition"
              >
                Save Meta Configuration
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
