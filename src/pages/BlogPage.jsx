import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, BookOpen, Clock, 
  Sparkles, ChevronRight, X 
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import DynamicPageContent from '../components/cms/DynamicPageContent';
import PageFAQSection from '../components/common/PageFAQSection';

export default function BlogPage() {
  const { getPublishedBlogPosts } = useCMS();
  const blogPosts = getPublishedBlogPosts();

  const [searchQuery, setSearchQuery] = useState('');

  // Filtered articles (Unified single feed)
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return blogPosts;
    return blogPosts.filter(post => {
      return (post.title || '').toLowerCase().includes(q) ||
             (post.excerpt || '').toLowerCase().includes(q) ||
             (post.content || '').toLowerCase().includes(q);
    });
  }, [blogPosts, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Manufacturing Insights & Textile Intel</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          Sportswear Engineering & Sourcing Blog
        </h1>
        <p className="text-sm sm:text-base text-[#595856] leading-relaxed">
          Actionable guides on sportswear tech packs, GSM fabric selection, dye sublimation economics, and Sialkot supply chain dynamics.
        </p>
      </div>

      {/* Unified Feed Bar and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm">
        
        {/* Unified Feed Header */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold font-display shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF751F]" />
            <span>All Articles &amp; Guides</span>
          </div>
          <span className="text-xs text-[#8A847A] font-medium">
            ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
          </span>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, fabrics, MOQs..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1A1A1A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F] flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer block text-left no-underline"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-[#FAF8F3] border-b border-[#E5DFD5] flex items-center justify-center p-2">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                />
                {post.category && post.category !== 'All Articles' && post.category !== 'Technical Guide' && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-black/80 text-white backdrop-blur-sm uppercase tracking-wider shadow-xs">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-[#8A847A]">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-[#595856] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E5DFD5] mt-4">
              <div className="flex items-center gap-2 text-xs text-[#595856]">
                <span className="font-bold text-[#1A1A1A]">{post.author?.name || 'Haris Sheikh'}</span>
              </div>

              <span className="text-xs font-bold text-[#FF751F] group-hover:text-[#E65E08] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Article</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </Link>
        ))}
      </div>

      {/* Dynamic Visual Content Blocks (Elementor Page Builder) */}
      <DynamicPageContent pageId="blog" />

      {/* Frequently Asked Questions */}
      <PageFAQSection 
        pageId="blog" 
        title="Sportswear Manufacturing Knowledge Base FAQs" 
        subtitle="Garment Engineering & Industry Standards" 
      />

    </div>
  );
}
