import React, { useState, useRef, useMemo } from 'react';
import { 
  FileText, Plus, Edit3, Trash2, Eye, Power, Sparkles, 
  Search, Check, Table, Heading1, Heading2, Heading3, 
  Heading4, Bold, Italic, List, ListOrdered, Quote, 
  Image as ImageIcon, Link as LinkIcon, X, Calendar, 
  Clock, User, Tag, ArrowRight, ExternalLink, ShieldCheck,
  CheckCircle2, AlertCircle, HelpCircle, ArrowUp, ArrowDown
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminBlogManager() {
  const { 
    blogPosts, 
    blogCategories, 
    saveBlogPost, 
    deleteBlogPost, 
    togglePostStatus, 
    addBlogCategory 
  } = useCMS();

  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPost, setEditingPost] = useState(null); // null or post object
  const [editorTab, setEditorTab] = useState('write'); // 'write' | 'preview'
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [tableCols, setTableCols] = useState(3);
  const [tableRows, setTableRows] = useState(3);
  const [savedToast, setSavedToast] = useState(false);

  const textareaRef = useRef(null);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(p => {
      const matchesStatus = selectedFilter === 'all' || p.status === selectedFilter;
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [blogPosts, selectedFilter, categoryFilter, searchQuery]);

  // Quick Stats
  const publishedCount = blogPosts.filter(p => p.status === 'published').length;
  const draftCount = blogPosts.filter(p => p.status === 'draft').length;

  const handleCreateNew = () => {
    setEditingPost({
      title: '',
      slug: '',
      excerpt: '',
      category: blogCategories[1] || 'Manufacturing Guides',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: '5 min read',
      featured: false,
      status: 'published',
      author: {
        name: 'Tariq Mehmood',
        role: 'Senior Garment Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
      content: '## Overview & Engineering Scope\n\nEnter article content here...\n\n### Technical Specifications\n\nDetail the material specifications here.',
      faqs: [
        {
          question: '',
          answer: ''
        }
      ]
    });
    setEditorTab('write');
  };

  const handleAddFaq = () => {
    setEditingPost(prev => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: '', answer: '' }]
    }));
  };

  const handleUpdateFaq = (index, field, value) => {
    setEditingPost(prev => {
      const list = [...(prev.faqs || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, faqs: list };
    });
  };

  const handleDeleteFaq = (index) => {
    setEditingPost(prev => {
      const list = (prev.faqs || []).filter((_, i) => i !== index);
      return { ...prev, faqs: list };
    });
  };

  const handleMoveFaq = (index, direction) => {
    setEditingPost(prev => {
      const list = [...(prev.faqs || [])];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const [item] = list.splice(index, 1);
      list.splice(targetIndex, 0, item);
      return { ...prev, faqs: list };
    });
  };

  const handleAutoSuggestFaqs = () => {
    const title = editingPost?.title?.trim() || 'Custom Sportswear Manufacturing';
    const category = editingPost?.category || 'Manufacturing Guides';

    const suggestions = [
      {
        question: `What are the minimum order quantities (MOQs) for products covered in "${title}"?`,
        answer: `At Hare Sportswear & Goods, production orders start at 25 to 50 pieces per style with rapid 7-day physical pre-production sampling before full manufacturing runs.`
      },
      {
        question: `How does Hare Sportswear ensure strict quality control for ${category.toLowerCase()}?`,
        answer: `All production adheres to ISO 2859-1 (AQL 2.5 Major) standards with 4-stage inline checkpoints, digital laser pattern cut tolerances (±1mm), and automated needle detector scans before packaging.`
      },
      {
        question: `What is the standard production and shipping lead time from Sialkot?`,
        answer: `Physical sample strike-offs are completed in 5–7 business days. Bulk production takes 14–21 business days, followed by 3–5 day express DDP air cargo delivery directly to your facility via DHL or FedEx.`
      }
    ];

    setEditingPost(prev => ({
      ...prev,
      faqs: [...(prev.faqs || []).filter(f => f.question && f.question.trim()), ...suggestions]
    }));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (!editingPost.title.trim()) {
      alert('Please enter an article title.');
      return;
    }

    let slug = editingPost.slug.trim();
    if (!slug) {
      slug = editingPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Clean up empty FAQs
    const sanitizedFaqs = (editingPost.faqs || [])
      .filter(f => f.question && f.question.trim().length > 0)
      .map(f => ({
        question: f.question.trim(),
        answer: (f.answer || '').trim()
      }));

    saveBlogPost({
      ...editingPost,
      slug,
      faqs: sanitizedFaqs
    });

    setEditingPost(null);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  // Helper to insert markdown text at current cursor position
  const insertTextAtCursor = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = editingPost.content || '';
    const selected = current.substring(start, end);

    const replacement = `${prefix}${selected}${suffix}`;
    const newContent = current.substring(0, start) + replacement + current.substring(end);

    setEditingPost(prev => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // Table Insertion Tool Generator
  const handleInsertTable = () => {
    let headers = [];
    let divider = [];
    for (let c = 1; c <= tableCols; c++) {
      headers.push(`Header ${c}`);
      divider.push('---');
    }

    let rows = [];
    for (let r = 1; r <= tableRows; r++) {
      let cells = [];
      for (let c = 1; c <= tableCols; c++) {
        cells.push(`Data R${r}C${c}`);
      }
      rows.push(`| ${cells.join(' | ')} |`);
    }

    const tableMarkdown = `\n| ${headers.join(' | ')} |\n| ${divider.join(' | ')} |\n${rows.join('\n')}\n\n`;
    insertTextAtCursor(tableMarkdown);
    setTableModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Advanced Publishing Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Blog CMS &amp; Article Manager
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Publish, draft, edit, and format technical guides with H1-H4 headings and structured data tables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedToast && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-fadeIn">
              <Check className="w-4 h-4" /> Changes Saved!
            </span>
          )}

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-xs font-bold text-white shadow-glow-orange transition"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141210] p-4 rounded-2xl border border-white/10">
        
        {/* Status Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedFilter === 'all' 
                ? 'bg-white/20 text-white font-bold' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            All Articles ({blogPosts.length})
          </button>
          <button
            onClick={() => setSelectedFilter('published')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedFilter === 'published' 
                ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setSelectedFilter('draft')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedFilter === 'draft' 
                ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>

        {/* Category & Search */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#1D1A17] border border-white/15 text-xs text-stone-300 focus:outline-none focus:border-[#FF751F]"
          >
            <option value="All">All Categories</option>
            {blogCategories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#1D1A17] border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#FF751F]"
            />
          </div>
        </div>

      </div>

      {/* Posts Table */}
      <div className="rounded-2xl bg-[#141210] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#191715] text-stone-400 uppercase tracking-wider font-mono text-[10px] border-b border-white/10">
                <th className="py-3 px-4">Article</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date / Author</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-400">
                    No articles found matching criteria. Click "+ Write New Article" to draft one!
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => {
                  const isPub = post.status === 'published';

                  return (
                    <tr key={post.slug} className="hover:bg-white/5 transition-colors">
                      
                      {/* Title & Excerpt */}
                      <td className="py-3.5 px-4 min-w-[280px]">
                        <div className="flex items-start gap-3">
                          <img
                            src={post.image}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-display font-bold text-sm text-white hover:text-[#FF751F] transition-colors line-clamp-1">
                              {post.title}
                            </span>
                            <span className="font-mono text-[10px] text-stone-500 block truncate">
                              /blog/{post.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category & FAQ count */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-stone-300 font-semibold">
                            {post.category}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FF751F]/15 text-[#FF751F] border border-[#FF751F]/30 font-bold">
                            {(post.faqs || []).length} FAQ{(post.faqs || []).length === 1 ? '' : 's'}
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isPub 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isPub ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                          <span>{post.status}</span>
                        </span>
                      </td>

                      {/* Author & Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-stone-400 text-[11px]">
                        <div>{post.date}</div>
                        <div className="text-stone-500">{post.author?.name || 'Author'}</div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Toggle Publish / Draft */}
                          <button
                            onClick={() => togglePostStatus(post.slug)}
                            className={`p-1.5 rounded-lg transition ${
                              isPub 
                                ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400' 
                                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'
                            }`}
                            title={isPub ? 'Switch to Draft (Hide from public)' : 'Publish Article (Make public)'}
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit Post */}
                          <button
                            onClick={() => setEditingPost({ ...post, faqs: post.faqs ? [...post.faqs] : [] })}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                            title="Edit Article Content & FAQs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* View Live Post */}
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                            title="Open Article in New Tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {/* Delete Post */}
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete article "${post.title}" permanently?`)) {
                                deleteBlogPost(post.slug);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RICH-TEXT POST EDITOR MODAL VIEW */}
      {/* ========================================================= */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#141210] border border-white/15 rounded-3xl max-w-5xl w-full my-auto max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#191715] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#FF751F]" />
                <div>
                  <h3 className="font-display font-extrabold text-base text-white">
                    {editingPost.title ? `Edit: ${editingPost.title}` : 'Write New Sportswear Article'}
                  </h3>
                  <span className="text-[10px] text-stone-400 font-mono">
                    Markdown &amp; Rich-Text Editor with Table Insertion
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Status Switcher */}
                <select
                  value={editingPost.status || 'published'}
                  onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    editingPost.status === 'published' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  <option value="published">Status: Published (Public)</option>
                  <option value="draft">Status: Draft (Hidden)</option>
                </select>

                <button
                  onClick={handleSave}
                  className="px-4 py-1.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs shadow-glow-orange transition"
                >
                  Save Article
                </button>

                <button
                  onClick={() => setEditingPost(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Metadata Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Title */}
                <div className="sm:col-span-8">
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    placeholder="e.g. The Ultimate Tech Pack Guide for Sportswear Brands"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-display font-bold text-sm focus:outline-none focus:border-[#FF751F]"
                  />
                </div>

                {/* Slug */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#FF751F]"
                  />
                </div>

                {/* Excerpt */}
                <div className="sm:col-span-12">
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Short Excerpt / Meta Snippet
                  </label>
                  <textarea
                    rows={2}
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    placeholder="Brief 1-2 sentence description shown on article cards and search engines..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#FF751F]"
                  />
                </div>

                {/* Category & Featured Image */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editingPost.category || 'Manufacturing Guides'}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#191715] border border-white/15 text-white text-xs focus:outline-none focus:border-[#FF751F]"
                  >
                    {blogCategories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Featured Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingPost.image || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#FF751F]"
                    />
                    <button
                      type="button"
                      onClick={() => setEditingPost({
                        ...editingPost,
                        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80'
                      })}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-[11px] font-bold text-stone-300"
                    >
                      Preset
                    </button>
                  </div>
                </div>

              </div>

              {/* ========================================================= */}
              {/* RICH-TEXT TOOLBAR: H1, H2, H3, H4, TABLES, FORMATTING */}
              {/* ========================================================= */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">
                    Article Body &amp; Heading Formatter
                  </span>

                  <div className="flex items-center gap-1 bg-[#1A1815] p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditorTab('write')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        editorTab === 'write' ? 'bg-[#FF751F] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('preview')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        editorTab === 'preview' ? 'bg-[#FF751F] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Live Article Preview
                    </button>
                  </div>
                </div>

                {editorTab === 'write' && (
                  <div className="space-y-2">
                    
                    {/* Toolbar Ribbon */}
                    <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-[#1D1A17] border border-white/10">
                      
                      {/* Heading Selectors */}
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('\n# ', '\n')}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1"
                        title="H1 Main Title (# )"
                      >
                        <Heading1 className="w-3.5 h-3.5 text-[#FF751F]" />
                        <span>H1</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('\n## ', '\n')}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1"
                        title="H2 Major Section (## )"
                      >
                        <Heading2 className="w-3.5 h-3.5 text-[#FF751F]" />
                        <span>H2</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('\n### ', '\n')}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1"
                        title="H3 Subheading (### )"
                      >
                        <Heading3 className="w-3.5 h-3.5 text-[#FF751F]" />
                        <span>H3</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('\n#### ', '\n')}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1"
                        title="H4 Minor Subheading (#### )"
                      >
                        <Heading4 className="w-3.5 h-3.5 text-[#FF751F]" />
                        <span>H4</span>
                      </button>

                      <div className="h-4 w-px bg-white/15 mx-1" />

                      {/* Text Formatting */}
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('**', '**')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                        title="Bold (**text**)"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('*', '*')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                        title="Italic (*text*)"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('\n- ', '')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                        title="Bullet List (- item)"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('\n1. ', '')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                        title="Numbered List (1. item)"
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('\n> ', '\n')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                        title="Callout Blockquote (> quote)"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-4 w-px bg-white/15 mx-1" />

                      {/* TABLE INSERTION TOOL (KEY REQUIREMENT) */}
                      <button
                        type="button"
                        onClick={() => setTableModalOpen(true)}
                        className="px-3 py-1 rounded-lg bg-[#FF751F]/20 hover:bg-[#FF751F]/30 text-[#FF751F] font-bold text-xs flex items-center gap-1.5 border border-[#FF751F]/40 transition shadow-xs"
                        title="Insert Structured Data Table"
                      >
                        <Table className="w-3.5 h-3.5" />
                        <span>Insert Table Tool</span>
                      </button>

                      {/* Image & Link */}
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('![Image description](', ')')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                        title="Insert Image"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => insertTextAtCursor('[Link text](', ')')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white"
                        title="Insert Link"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>

                    </div>

                    {/* Textarea Editor */}
                    <textarea
                      ref={textareaRef}
                      rows={14}
                      value={editingPost.content || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      placeholder="Write your article in markdown format. Use H1-H4 headings and the Table tool above to insert structured data..."
                      className="w-full p-4 rounded-2xl bg-[#11100E] border border-white/15 text-white font-mono text-xs leading-relaxed focus:outline-none focus:border-[#FF751F]"
                    />
                  </div>
                )}

                {/* Live Article Preview Tab */}
                {editorTab === 'preview' && (
                  <div className="p-6 rounded-2xl bg-[#F5F1E8] text-[#1A1A1A] space-y-6 max-h-[500px] overflow-y-auto">
                    
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#1A1A1A]">
                      <img src={editingPost.image} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#FF751F] uppercase">{editingPost.category}</span>
                      <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1A1A1A]">
                        {editingPost.title || 'Untitled Article'}
                      </h1>
                      <p className="text-xs text-[#595856] italic">
                        {editingPost.excerpt}
                      </p>
                    </div>

                    {/* Preview Content */}
                    <div className="prose max-w-none text-xs sm:text-sm text-[#403D38] space-y-4">
                      {(editingPost.content || '').split('\n\n').map((block, i) => {
                        const trimmed = block.trim();
                        if (trimmed.startsWith('# ')) {
                          return (
                            <h1 key={i} className="text-2xl font-display font-extrabold text-[#1A1A1A] border-b border-[#E5DFD5] pb-2">
                              {trimmed.replace('# ', '')}
                            </h1>
                          );
                        }
                        if (trimmed.startsWith('## ')) {
                          return (
                            <h2 key={i} className="text-xl font-display font-bold text-[#1A1A1A] pt-3 text-[#FF751F]">
                              {trimmed.replace('## ', '')}
                            </h2>
                          );
                        }
                        if (trimmed.startsWith('### ')) {
                          return (
                            <h3 key={i} className="text-lg font-display font-bold text-[#1A1A1A] pt-2">
                              {trimmed.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (trimmed.startsWith('#### ')) {
                          return (
                            <h4 key={i} className="text-sm font-display font-bold text-[#595856] uppercase">
                              {trimmed.replace('#### ', '')}
                            </h4>
                          );
                        }
                        if (trimmed.startsWith('|')) {
                          const rows = trimmed.split('\n');
                          const headers = rows[0].split('|').filter(c => c.trim().length > 0).map(c => c.trim());
                          const dataRows = rows.slice(2);

                          return (
                            <div key={i} className="overflow-x-auto rounded-xl border border-[#E5DFD5] bg-white my-3">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-[#FAF8F3] border-b border-[#E5DFD5]">
                                    {headers.map((h, hIdx) => (
                                      <th key={hIdx} className="p-2.5 font-bold text-[#1A1A1A] uppercase text-[10px]">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {dataRows.map((r, rIdx) => {
                                    const cells = r.split('|').filter(c => c.trim().length > 0).map(c => c.trim());
                                    return (
                                      <tr key={rIdx} className="border-b border-[#E5DFD5] last:border-0 hover:bg-[#FAF8F3]/50">
                                        {cells.map((c, cIdx) => (
                                          <td key={cIdx} className="p-2.5 text-[#595856]">{c}</td>
                                        ))}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          );
                        }
                        return <p key={i} className="leading-relaxed">{trimmed}</p>;
                      })}
                    </div>

                  </div>
                )}

              </div>

              {/* ========================================================= */}
              {/* ARTICLE FAQs BUILDER (Interactive CMS Accordion Manager) */}
              {/* ========================================================= */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#191715] p-3.5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-[#FF751F]/15 text-[#FF751F]">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Article FAQs Builder
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF751F]/20 text-[#FF751F] border border-[#FF751F]/30">
                          {(editingPost.faqs || []).length} Question{(editingPost.faqs || []).length === 1 ? '' : 's'}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        These FAQs render in the blog post accordion and inject Google FAQPage schema for rich search results.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={handleAutoSuggestFaqs}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                      title="Generate technical questions tailored to this article"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Auto-Suggest FAQs</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="px-3 py-1.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Question</span>
                    </button>
                  </div>
                </div>

                {/* FAQs List */}
                <div className="space-y-3">
                  {(!editingPost.faqs || editingPost.faqs.length === 0) ? (
                    <div className="p-8 rounded-2xl bg-[#141210] border border-dashed border-white/15 text-center space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-400">
                        <HelpCircle className="w-5 h-5 text-stone-400" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white">No FAQs Added for this Article Yet</h4>
                        <p className="text-[11px] text-stone-400 max-w-md mx-auto">
                          Add frequently asked questions to help buyers understand your manufacturing tolerances, sampling lead times, and materials.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleAutoSuggestFaqs}
                          className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-bold border border-purple-500/30 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Generate 3 Auto Suggestions</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleAddFaq}
                          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Blank Question</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    editingPost.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#181614] border border-white/10 space-y-3 shadow-xs transition hover:border-white/20"
                      >
                        {/* FAQ Card Header */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-[#FF751F]/20 text-[#FF751F] border border-[#FF751F]/30 text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                              Q{idx + 1}
                            </span>
                            <span className="text-xs font-bold text-stone-300">
                              Question #{idx + 1}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveFaq(idx, -1)}
                              disabled={idx === 0}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-stone-300 hover:text-white transition"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveFaq(idx, 1)}
                              disabled={idx === editingPost.faqs.length - 1}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-stone-300 hover:text-white transition"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteFaq(idx)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Question Input */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Question *
                          </label>
                          <input
                            type="text"
                            value={faq.question || ''}
                            onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                            placeholder="e.g. What is the standard MOQ for this apparel category?"
                            className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-[#FF751F]"
                          />
                        </div>

                        {/* Answer Textarea */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            Detailed Answer *
                          </label>
                          <textarea
                            rows={3}
                            value={faq.answer || ''}
                            onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                            placeholder="Provide a clear, technical, and helpful explanation for brand buyers..."
                            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-stone-200 text-xs leading-relaxed focus:outline-none focus:border-[#FF751F]"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#191715] border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                Auto-saved changes persist in browser storage.
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-stone-300 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs shadow-glow-orange transition"
                >
                  Save &amp; Publish
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TABLE INSERTION TOOL MODAL (KEY FEATURE) */}
      {/* ========================================================= */}
      {tableModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#191715] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Table className="w-5 h-5 text-[#FF751F]" />
                <h4 className="font-display font-bold text-base text-white">
                  Table Insertion Tool
                </h4>
              </div>
              <button
                onClick={() => setTableModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-400">
              Specify the dimensions of your structured data table (e.g. GSM fabric comparison, pricing tiers, or sizing specs).
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Columns ({tableCols})
                </label>
                <input
                  type="number"
                  min="2"
                  max="6"
                  value={tableCols}
                  onChange={(e) => setTableCols(Math.max(2, Math.min(6, parseInt(e.target.value) || 2)))}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-sm text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Rows ({tableRows})
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableRows}
                  onChange={(e) => setTableRows(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-sm text-center"
                />
              </div>
            </div>

            {/* Visual Grid Preview */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center text-[10px] text-stone-400 font-mono">
              Generating a {tableCols}x{tableRows} table ({tableCols * tableRows} cells) with markdown formatting
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTableModalOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-white/10 text-xs text-stone-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertTable}
                className="px-4 py-1.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white text-xs font-bold shadow-glow-orange transition"
              >
                Insert Table into Editor
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
