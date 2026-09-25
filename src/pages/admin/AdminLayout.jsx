import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Layers, FileText, Search, HelpCircle, 
  Settings, ExternalLink, ShieldCheck, Sparkles, LogOut,
  RefreshCw, Download, Upload, CheckCircle2, ChevronRight,
  Menu, X, Package, UserCheck, Award
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { DOMAIN_PAGES } from '../../data/domainPagesData';
import { logoutAdmin } from '../../components/admin/AdminAuthGuard';

export default function AdminLayout({ activeTab = 'overview', children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { blogPosts, seoRegistry, pageFAQs, pageBlocks, caseStudies } = useCMS();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Compute counts for badges
  const totalDomainPages = DOMAIN_PAGES.length;
  const publishedBlogsCount = blogPosts.filter(p => p.status === 'published').length;
  const draftBlogsCount = blogPosts.filter(p => p.status === 'draft').length;
  const totalFAQsCount = useMemo(() => {
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

  const navItems = [
    {
      id: 'overview',
      path: '/admin',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: `${totalDomainPages} Routes`
    },
    {
      id: 'pages',
      path: '/admin/pages',
      label: 'Page & Block Editor',
      icon: Layers,
      badge: `${totalDomainPages} Pages`
    },
    {
      id: 'products',
      path: '/admin/products',
      label: 'Product Catalog',
      icon: Package,
      badge: '34 Styles'
    },
    {
      id: 'case-studies',
      path: '/admin/case-studies',
      label: 'Case Studies',
      icon: Award,
      badge: `${caseStudies?.length || 4} Cases`
    },
    {
      id: 'blog',
      path: '/admin/blog',
      label: 'Blog CMS & Editor',
      icon: FileText,
      badge: `${publishedBlogsCount} Pub`
    },
    {
      id: 'seo',
      path: '/admin/seo',
      label: 'SEO & Meta Tags',
      icon: Search,
      badge: `${totalDomainPages} SEO`
    },
    {
      id: 'faqs',
      path: '/admin/faqs',
      label: 'Dynamic FAQ Manager',
      icon: HelpCircle,
      badge: `${totalFAQsCount} FAQs`
    },
    {
      id: 'settings',
      path: '/admin/settings',
      label: 'Backup & Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0E0D] text-white flex flex-col font-sans selection:bg-[#FF751F] selection:text-white">
      
      {/* Top Admin Bar */}
      <header className="bg-[#191715] border-b border-white/10 py-3 px-4 sm:px-6 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 lg:hidden text-white hover:bg-white/10"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF751F] to-[#E65E08] flex items-center justify-center font-display font-black text-white text-sm shadow-glow-orange">
              H
            </div>
            <div>
              <span className="font-display font-black text-sm text-white tracking-wide flex items-center gap-1.5">
                <span>HARE SPORTSWEAR</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FF751F]/20 text-[#FF751F] font-bold border border-[#FF751F]/30">
                  CMS v2.0
                </span>
              </span>
              <span className="text-[10px] text-stone-400 block -mt-0.5">
                Executive Admin &amp; SEO Architecture
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Admin User Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-stone-400">Admin:</span>
            <strong className="text-white font-semibold">Ashban</strong>
          </div>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-stone-300 hover:text-white transition"
            title="Open Frontend Site in New Tab"
          >
            <span className="hidden sm:inline">Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FF751F]" />
          </Link>

          <div className="h-4 w-px bg-white/15 hidden sm:block"></div>

          {/* Prominent Header Logout Button */}
          <button
            type="button"
            onClick={logoutAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold text-red-400 hover:text-red-300 transition cursor-pointer"
            title="Safely logout administrative session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Shell */}
      <div className="flex-1 flex min-h-[calc(100vh-57px)] relative">
        
        {/* Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#141210] border-r border-white/10 pt-16 lg:pt-6 p-4 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="space-y-6">
            <div className="px-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Management Modules
              </span>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#FF751F] text-white shadow-glow-orange font-bold'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#FF751F]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-stone-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#FF751F] block">
                  Active Session
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-white font-bold text-xs">
                Ashban (Superadmin)
              </p>
              <p className="text-stone-400 text-[10px] leading-tight font-mono">
                Full administrative access &amp; publishing rights
              </p>
            </div>

            <button
              type="button"
              onClick={logoutAdmin}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 transition cursor-pointer shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Lock &amp; Logout (Ashban)</span>
            </button>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 bg-[#0F0E0D] p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
