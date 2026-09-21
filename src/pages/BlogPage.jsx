import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, BookOpen, Clock, Calendar, ArrowRight, User, 
  Sparkles, Tag, ChevronRight, X 
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import DynamicPageContent from '../components/cms/DynamicPageContent';

export default function BlogPage() {
  const { getPublishedBlogPosts, blogCategories } = useCMS();
  const blogPosts = getPublishedBlogPosts();

  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  // Sticky featured article
  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];

  // Filtered articles
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCat = selectedCategory === 'All Articles' || post.category === selectedCategory;
      const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (post.content || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

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

      {/* Featured Sticky Post */}
      {featuredPost && (
        <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] p-2 sm:p-4 shadow-xl group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A1A1A]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#FF751F] text-white shadow">
                Featured Guide
              </span>
            </div>

            <div className="lg:col-span-6 p-4 sm:p-6 space-y-4 bg-white">
              <div className="flex items-center gap-3 text-xs text-[#595856]">
                <span className="text-[#FF751F] font-bold uppercase">{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors leading-tight">
                <Link to={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-[#595856] leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#E5DFD5]">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#E5DFD5]"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-[#1A1A1A]">{featuredPost.author.name}</p>
                    <p className="text-[#8A847A] text-[11px]">{featuredPost.author.role}</p>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs transition-colors shadow-glow-orange"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {blogCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FF751F] text-white shadow-glow-orange font-bold'
                  : 'bg-[#FAF8F3] text-[#595856] hover:bg-black/5 hover:text-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF751F] transition-colors"
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
          <article
            key={post.slug}
            className="group rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-black/80 text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-[#8A847A]">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors leading-snug">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs text-[#595856] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E5DFD5] mt-4">
              <div className="flex items-center gap-2 text-xs text-[#595856]">
                <span className="font-bold text-[#1A1A1A]">{post.author.name}</span>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="text-xs font-bold text-[#FF751F] hover:text-[#E65E08] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Read</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </article>
        ))}
      </div>

      {/* Dynamic Visual Content Blocks (Elementor Page Builder) */}
      <DynamicPageContent pageId="blog" />

    </div>
  );
}
