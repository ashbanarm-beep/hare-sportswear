import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  HelpCircle, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Tag, 
  Copy, 
  Sparkles, 
  Info,
  Layers,
  AlertCircle,
  ExternalLink,
  Globe,
  FileText,
  Shirt,
  Settings,
  FolderPlus,
  RefreshCw,
  SlidersHorizontal,
  MoveRight
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { DOMAIN_PAGES, DOMAIN_PAGE_GROUPS } from '../../data/domainPagesData';
import { products } from '../../data/products';

const PRESET_CATEGORIES = [
  'MOQ & Orders',
  'Customization & Tech Packs',
  'Materials & Fabrics',
  'Sizing & Grading',
  'Printing & Sublimation',
  'Shipping & Customs',
  'Payment & Financials',
  'Quality & Compliance',
  'Turnaround & Sampling',
  'General Inquiry'
];

export default function AdminFAQManager() {
  const { 
    pageFAQs, 
    getAllFAQsForPage, 
    addFAQ, 
    updateFAQ, 
    deleteFAQ, 
    reorderFAQs, 
    duplicateFAQToPage,
    customFAQTargets,
    addCustomFAQTarget,
    deleteCustomFAQTarget,
    blogPosts 
  } = useCMS();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const actionParam = searchParams.get('action');

  // Master View Mode: 'all' (Global view of all FAQs) or 'page' (Manage specific page)
  const [viewMode, setViewMode] = useState(() => {
    if (pageParam) return 'page';
    return 'all';
  });

  const [selectedPageId, setSelectedPageId] = useState(() => {
    if (pageParam) return pageParam;
    return 'home';
  });

  const [targetGroupFilter, setTargetGroupFilter] = useState('all');

  useEffect(() => {
    if (pageParam && pageParam !== selectedPageId) {
      setSelectedPageId(pageParam);
      setViewMode('page');
    }
  }, [pageParam]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewOpenId, setPreviewOpenId] = useState(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [modalForm, setModalForm] = useState({
    targetPageId: 'home',
    question: '',
    answer: '',
    category: 'MOQ & Orders',
    active: true
  });

  // Copy to Another Page Modal State
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [faqToCopy, setFaqToCopy] = useState(null);
  const [copyTargetPageId, setCopyTargetPageId] = useState('products');

  // Custom Target Modal State
  const [customTargetModalOpen, setCustomTargetModalOpen] = useState(false);
  const [customTargetForm, setCustomTargetForm] = useState({
    id: '',
    name: '',
    path: '',
    category: 'Custom Section'
  });

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Build Comprehensive Selectable Target List across the whole site
  const allSelectablePages = useMemo(() => {
    const list = [...DOMAIN_PAGES];

    // 1. Blog Articles
    (blogPosts || []).forEach(p => {
      list.push({
        id: `blog-${p.slug}`,
        name: `Blog: ${p.title}`,
        path: `/blog/${p.slug}`,
        group: 'blog',
        category: p.category || 'Blog Article',
        icon: '📝'
      });
    });

    // 2. Products & Apparel Catalog (All 34 products from products.js)
    (products || []).forEach(prod => {
      list.push({
        id: `product-${prod.id}`,
        name: `Product: ${prod.name}`,
        path: `/products?category=${prod.category}`,
        group: 'products',
        category: prod.category || 'Sportswear',
        icon: '🎽'
      });
    });

    // 3. User-Defined Custom Targets
    (customFAQTargets || []).forEach(ct => {
      list.push({
        id: ct.id,
        name: `Custom: ${ct.name}`,
        path: ct.path || '#',
        group: 'custom',
        category: ct.category || 'Custom Section',
        icon: '✨'
      });
    });

    return list;
  }, [blogPosts, customFAQTargets]);

  // Handle URL action=new to instantly open add modal
  useEffect(() => {
    if (actionParam === 'new') {
      openAddModal(selectedPageId);
      // Clean query params
      setSearchParams({ page: selectedPageId });
    }
  }, [actionParam]);

  // Compute all FAQs across the entire website for the Global View
  const allWebsiteFaqs = useMemo(() => {
    const results = [];
    const processedPageIds = new Set();

    // From pageFAQs state
    Object.entries(pageFAQs || {}).forEach(([pId, faqList]) => {
      processedPageIds.add(pId);
      const pageMeta = allSelectablePages.find(p => p.id === pId) || {
        id: pId,
        name: pId,
        path: '#',
        group: 'custom'
      };
      (faqList || []).forEach(f => {
        results.push({
          ...f,
          pageId: pId,
          pageName: pageMeta.name,
          pagePath: pageMeta.path,
          pageGroup: pageMeta.group
        });
      });
    });

    // From blogPosts state (if not already mapped in pageFAQs)
    (blogPosts || []).forEach(p => {
      const blogPageId = `blog-${p.slug}`;
      if (!processedPageIds.has(blogPageId) && p.faqs && p.faqs.length > 0) {
        p.faqs.forEach(f => {
          results.push({
            ...f,
            pageId: blogPageId,
            pageName: `Blog: ${p.title}`,
            pagePath: `/blog/${p.slug}`,
            pageGroup: 'blog'
          });
        });
      }
    });

    return results;
  }, [pageFAQs, blogPosts, allSelectablePages]);

  // Overall Statistics
  const totalStats = useMemo(() => {
    const totalCount = allWebsiteFaqs.length;
    const activeCount = allWebsiteFaqs.filter(f => f.active !== false).length;
    const pagesWithFaqs = new Set(allWebsiteFaqs.map(f => f.pageId)).size;
    const blogFaqsCount = allWebsiteFaqs.filter(f => f.pageGroup === 'blog').length;
    const productFaqsCount = allWebsiteFaqs.filter(f => f.pageGroup === 'products').length;
    return { totalCount, activeCount, pagesWithFaqs, blogFaqsCount, productFaqsCount };
  }, [allWebsiteFaqs]);

  // Current selected page object for single-page view
  const currentPageObj = allSelectablePages.find(p => p.id === selectedPageId) || allSelectablePages[0];
  const currentPageFaqs = getAllFAQsForPage(selectedPageId);

  // Filtered list for Global View
  const filteredGlobalFaqs = useMemo(() => {
    return allWebsiteFaqs.filter(faq => {
      const matchesGroup = targetGroupFilter === 'all' || faq.pageGroup === targetGroupFilter;
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.pageName.toLowerCase().includes(q) ||
        (faq.category && faq.category.toLowerCase().includes(q));
      return matchesGroup && matchesCategory && matchesSearch;
    });
  }, [allWebsiteFaqs, targetGroupFilter, selectedCategory, searchQuery]);

  // Filtered list for Page-by-Page View
  const filteredPageFaqs = useMemo(() => {
    return currentPageFaqs.filter(faq => {
      const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [currentPageFaqs, selectedCategory, searchQuery]);

  // Unique categories for filtering
  const activeCategories = useMemo(() => {
    const set = new Set();
    const sourceList = viewMode === 'all' ? allWebsiteFaqs : currentPageFaqs;
    sourceList.forEach(f => {
      if (f.category) set.add(f.category);
    });
    return ['All', ...Array.from(set)];
  }, [viewMode, allWebsiteFaqs, currentPageFaqs]);

  const openAddModal = (targetPage = selectedPageId) => {
    setEditingFaq(null);
    setModalForm({
      targetPageId: targetPage,
      question: '',
      answer: '',
      category: 'MOQ & Orders',
      active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (faq, pageId = selectedPageId) => {
    setEditingFaq(faq);
    setModalForm({
      targetPageId: faq.pageId || pageId,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General Inquiry',
      active: faq.active !== false
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!modalForm.question.trim() || !modalForm.answer.trim()) {
      alert('Please fill in both Question and Answer.');
      return;
    }

    const targetPage = modalForm.targetPageId;

    if (editingFaq) {
      const originalPage = editingFaq.pageId || selectedPageId;
      // If target page was changed in the modal, move the FAQ
      if (originalPage !== targetPage) {
        deleteFAQ(originalPage, editingFaq.id);
        addFAQ(targetPage, {
          question: modalForm.question,
          answer: modalForm.answer,
          category: modalForm.category,
          active: modalForm.active
        });
        showToast(`FAQ updated and moved to ${targetPage}!`);
      } else {
        updateFAQ(targetPage, editingFaq.id, {
          question: modalForm.question,
          answer: modalForm.answer,
          category: modalForm.category,
          active: modalForm.active
        });
        showToast('FAQ updated successfully!');
      }
    } else {
      addFAQ(targetPage, {
        question: modalForm.question,
        answer: modalForm.answer,
        category: modalForm.category,
        active: modalForm.active
      });
      showToast(`New FAQ added to ${targetPage}!`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (pageId, faqId, questionText) => {
    if (window.confirm(`Are you sure you want to delete this FAQ?\n\n"${questionText}"`)) {
      deleteFAQ(pageId, faqId);
      showToast('FAQ deleted.');
    }
  };

  const handleDuplicateSamePage = (faq, pageId = selectedPageId) => {
    const clone = {
      question: `${faq.question} (Copy)`,
      answer: faq.answer,
      category: faq.category,
      active: true
    };
    addFAQ(pageId, clone);
    showToast('FAQ duplicated.');
  };

  const handleOpenCopyModal = (faq, pageId = selectedPageId) => {
    setFaqToCopy({ ...faq, pageId });
    setCopyTargetPageId(pageId === 'home' ? 'products' : 'home');
    setCopyModalOpen(true);
  };

  const handleExecuteCopy = () => {
    if (!faqToCopy) return;
    duplicateFAQToPage(faqToCopy.pageId, copyTargetPageId, faqToCopy.id);
    showToast(`FAQ copied to ${copyTargetPageId}!`);
    setCopyModalOpen(false);
    setFaqToCopy(null);
  };

  const handleMove = (pageId, index, direction) => {
    const targetIndex = index + direction;
    const faqs = getAllFAQsForPage(pageId);
    if (targetIndex < 0 || targetIndex >= faqs.length) return;
    reorderFAQs(pageId, index, targetIndex);
  };

  const handleSelectPage = (pageId) => {
    setSelectedPageId(pageId);
    setViewMode('page');
    setSearchParams({ page: pageId });
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const handleCreateCustomTarget = (e) => {
    e.preventDefault();
    const cleanId = customTargetForm.id.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    if (!cleanId || !customTargetForm.name.trim()) {
      alert('Please enter both an ID and a Display Name for your custom target.');
      return;
    }
    addCustomFAQTarget({
      id: cleanId,
      name: customTargetForm.name.trim(),
      path: customTargetForm.path.trim() || `/${cleanId}`,
      category: customTargetForm.category || 'Custom Section'
    });
    setCustomTargetModalOpen(false);
    setCustomTargetForm({ id: '', name: '', path: '', category: 'Custom Section' });
    showToast(`Custom Target "${cleanId}" created! You can now attach FAQs to it.`);
    handleSelectPage(cleanId);
  };

  // Auto-suggest 5 technical FAQs for selected page
  const handleAutoSuggest = () => {
    const pageName = currentPageObj.name;
    const category = currentPageObj.category || 'Garment Manufacturing';

    const suggestions = [
      {
        question: `What is the standard Minimum Order Quantity (MOQ) for ${pageName.replace('Product: ', '').replace('Blog: ', '')}?`,
        answer: `Our standard factory MOQ starts at only 25 pieces per custom design/colorway for ${pageName.toLowerCase()}, allowing sports clubs and apparel brands to launch without high capital commitments.`,
        category: 'MOQ & Orders'
      },
      {
        question: `How fast can physical prototype samples be manufactured and delivered?`,
        answer: `Our dedicated prototyping lab produces physical pre-production samples in 7 to 10 business days. Priority international delivery via DHL Express / FedEx takes 3-5 days with full online tracking.`,
        category: 'Turnaround & Sampling'
      },
      {
        question: `What custom printing, embroidery, or fabric techniques are available?`,
        answer: `We provide full OEM/ODM customization including Kiian Italian dye sublimation, Tajima 3D embroidery, high-density raised silicone heat transfers, reflective accents, and custom knit compositions.`,
        category: 'Printing & Sublimation'
      },
      {
        question: `Do you provide private labeling, custom collar tags, and barcoded polybags?`,
        answer: `Yes, 100% of our production is full private label. We produce woven neck labels, heat-sealed tagless collar prints, branded hangtags, and individual barcode polybags ready for retail distribution or Amazon FBA.`,
        category: 'Customization & Tech Packs'
      },
      {
        question: `How are international shipping tariffs and customs clearance handled?`,
        answer: `We provide complete DDP (Delivered Duty Paid) shipping to the USA, UK, EU, Canada, and Australia, handling all export documentation, air cargo logistics, and import customs duties with zero hidden fees.`,
        category: 'Shipping & Customs'
      }
    ];

    suggestions.forEach(s => {
      addFAQ(selectedPageId, { ...s, active: true });
    });

    showToast(`Added 5 technical FAQs to ${currentPageObj.name}!`);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2 animate-bounce text-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner & High-Level Statistics */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/10 text-[#FF751F] text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Universal FAQ &amp; Accordion Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1A1A1A]">
              Frequently Asked Questions Manager
            </h1>
            <p className="text-xs sm:text-sm text-[#595856] mt-1 max-w-2xl leading-relaxed">
              Create, edit, reorder, and publish FAQs anywhere across the website. Add unlimited questions for any core page, digital tool, international hub, blog article, or product.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCustomTargetModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5DFD5] hover:bg-[#FAF8F3] text-xs font-bold text-[#1A1A1A] transition shadow-xs"
              title="Add a custom route, section, or page target for FAQs"
            >
              <FolderPlus className="w-4 h-4 text-[#FF751F]" />
              <span>+ Custom Target</span>
            </button>

            <button
              onClick={() => openAddModal(selectedPageId)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white text-xs font-bold shadow-glow-orange transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ Anywhere</span>
            </button>
          </div>
        </div>

        {/* Real-Time Platform FAQ Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-[#F5F1E8]">
          <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5]">
            <span className="text-[10px] uppercase font-bold text-[#8A847A] tracking-wider block">Total FAQs</span>
            <span className="text-2xl font-display font-black text-[#1A1A1A] mt-0.5 block">{totalStats.totalCount}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5]">
            <span className="text-[10px] uppercase font-bold text-[#8A847A] tracking-wider block">Active On Site</span>
            <span className="text-2xl font-display font-black text-emerald-600 mt-0.5 block">{totalStats.activeCount}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5]">
            <span className="text-[10px] uppercase font-bold text-[#8A847A] tracking-wider block">Pages / Targets</span>
            <span className="text-2xl font-display font-black text-[#FF751F] mt-0.5 block">{totalStats.pagesWithFaqs}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5]">
            <span className="text-[10px] uppercase font-bold text-[#8A847A] tracking-wider block">Blog Article FAQs</span>
            <span className="text-2xl font-display font-black text-purple-600 mt-0.5 block">{totalStats.blogFaqsCount}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-[#8A847A] tracking-wider block">Product FAQs</span>
            <span className="text-2xl font-display font-black text-blue-600 mt-0.5 block">{totalStats.productFaqsCount}</span>
          </div>
        </div>
      </div>

      {/* Top Navigation & Mode Switcher */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E5DFD5] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F1E8]">
          {/* Mode Switcher Buttons */}
          <div className="inline-flex p-1 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5]">
            <button
              onClick={() => {
                setViewMode('all');
                setSearchParams({});
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#595856] hover:text-[#1A1A1A]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#FF751F]" />
              <span>🌐 All FAQs Across Website ({allWebsiteFaqs.length})</span>
            </button>

            <button
              onClick={() => {
                setViewMode('page');
                setSearchParams({ page: selectedPageId });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === 'page'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#595856] hover:text-[#1A1A1A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#FF751F]" />
              <span>📄 By Specific Page / Target</span>
            </button>
          </div>

          {/* Quick Target Page Dropdown */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-[#8A847A] font-bold">Target Page:</span>
            <select
              value={selectedPageId}
              onChange={(e) => handleSelectPage(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] bg-[#FAF8F3] focus:outline-none focus:border-[#FF751F] max-w-xs truncate cursor-pointer shadow-2xs"
            >
              <optgroup label="🏢 Core Platform Pages">
                {DOMAIN_PAGES.filter(p => p.group === 'core').map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({(getAllFAQsForPage(p.id)).length} FAQs)
                  </option>
                ))}
              </optgroup>

              <optgroup label="🛠️ Digital Tools Suite">
                {DOMAIN_PAGES.filter(p => p.group === 'tools').map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({(getAllFAQsForPage(p.id)).length} FAQs)
                  </option>
                ))}
              </optgroup>

              <optgroup label="✈️ International Country Hubs">
                {DOMAIN_PAGES.filter(p => p.group === 'international').map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({(getAllFAQsForPage(p.id)).length} FAQs)
                  </option>
                ))}
              </optgroup>

              <optgroup label="🧵 Brand Resources &amp; Legal">
                {DOMAIN_PAGES.filter(p => p.group === 'resources' || p.group === 'legal').map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({(getAllFAQsForPage(p.id)).length} FAQs)
                  </option>
                ))}
              </optgroup>

              {(blogPosts || []).length > 0 && (
                <optgroup label="📝 Blog Post Articles">
                  {blogPosts.map(p => (
                    <option key={`blog-${p.slug}`} value={`blog-${p.slug}`}>
                      Blog: {p.title} ({(getAllFAQsForPage(`blog-${p.slug}`)).length} FAQs)
                    </option>
                  ))}
                </optgroup>
              )}

              <optgroup label="🎽 Products &amp; Equipment Catalog">
                {products.map(prod => (
                  <option key={`product-${prod.id}`} value={`product-${prod.id}`}>
                    Product: {prod.name} ({(getAllFAQsForPage(`product-${prod.id}`)).length} FAQs)
                  </option>
                ))}
              </optgroup>

              {(customFAQTargets || []).length > 0 && (
                <optgroup label="✨ Custom User-Defined Targets">
                  {customFAQTargets.map(ct => (
                    <option key={ct.id} value={ct.id}>
                      Custom: {ct.name} ({(getAllFAQsForPage(ct.id)).length} FAQs)
                    </option>
                  ))}
                </optgroup>
              )}
            </select>

            {currentPageObj.path && currentPageObj.path !== '#' && (
              <a
                href={currentPageObj.path}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-[#E5DFD5] text-[#595856] hover:text-[#1A1A1A] hover:bg-[#FAF8F3] transition"
                title="Visit live page in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Group Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Targets', icon: '🌐' },
            { id: 'core', label: 'Core Platform', icon: '🏢' },
            { id: 'tools', label: 'Digital Tools', icon: '🛠️' },
            { id: 'international', label: 'Country Hubs', icon: '✈️' },
            { id: 'blog', label: 'Blog Posts', icon: '📝' },
            { id: 'products', label: 'Products Catalog', icon: '🎽' },
            { id: 'custom', label: 'Custom Targets', icon: '✨' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setTargetGroupFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                targetGroupFilter === tab.id
                  ? 'bg-[#FF751F] text-white shadow-xs font-bold'
                  : 'bg-[#FAF8F3] border border-[#E5DFD5] text-[#595856] hover:text-[#1A1A1A] hover:bg-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {activeCategories.slice(0, 7).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-white border border-[#E5DFD5] text-[#595856] hover:text-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or answers..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#E5DFD5] text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#FF751F]"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODE 1: GLOBAL VIEW (ALL FAQS ACROSS WEBSITE) */}
      {/* ============================================================ */}
      {viewMode === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-base text-[#1A1A1A] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FF751F]" />
              <span>All Website FAQs ({filteredGlobalFaqs.length})</span>
            </h3>
            <span className="text-xs text-[#8A847A]">
              Showing all active &amp; draft FAQs across every route
            </span>
          </div>

          {filteredGlobalFaqs.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border border-[#E5DFD5] text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-xs text-[#595856]">No FAQs matching your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setTargetGroupFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredGlobalFaqs.map((faq, idx) => (
                <div
                  key={`${faq.pageId}-${faq.id || idx}`}
                  className="p-5 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 shadow-xs transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    {/* Target Pill & Category */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleSelectPage(faq.pageId)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FF751F]/10 text-[#FF751F] text-xs font-bold hover:bg-[#FF751F]/20 transition"
                        title={`Manage ${faq.pageName} FAQs`}
                      >
                        <Layers className="w-3 h-3" />
                        <span>{faq.pageName}</span>
                      </button>

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5F1E8] text-[#595856]">
                        {faq.category || 'General'}
                      </span>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        faq.active !== false 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {faq.active !== false ? 'Live' : 'Draft'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(faq, faq.pageId)}
                        className="p-1.5 rounded-lg border border-[#E5DFD5] hover:bg-[#FAF8F3] text-stone-600 hover:text-[#1A1A1A] transition text-xs flex items-center gap-1"
                        title="Edit Question & Answer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#FF751F]" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => handleOpenCopyModal(faq, faq.pageId)}
                        className="p-1.5 rounded-lg border border-[#E5DFD5] hover:bg-[#FAF8F3] text-stone-600 hover:text-[#1A1A1A] transition text-xs flex items-center gap-1"
                        title="Copy to another page"
                      >
                        <MoveRight className="w-3.5 h-3.5 text-blue-500" />
                        <span className="hidden sm:inline">Copy to...</span>
                      </button>

                      <button
                        onClick={() => handleDuplicateSamePage(faq, faq.pageId)}
                        className="p-1.5 rounded-lg border border-[#E5DFD5] hover:bg-[#FAF8F3] text-stone-600 hover:text-[#1A1A1A] transition"
                        title="Duplicate on same page"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(faq.pageId, faq.id, faq.question)}
                        className="p-1.5 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 transition"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question */}
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#1A1A1A]">
                    {faq.question}
                  </h4>

                  {/* Answer */}
                  <p className="text-xs text-[#595856] leading-relaxed whitespace-pre-line bg-[#FAF8F3]/60 p-3.5 rounded-xl border border-[#F5F1E8]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: BY SPECIFIC PAGE / TARGET VIEW */}
      {/* ============================================================ */}
      {viewMode === 'page' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: FAQs List for this Page (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Page Header Bar */}
            <div className="p-5 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF751F] block">
                  Editing Target Section
                </span>
                <h3 className="font-display font-black text-lg text-[#1A1A1A] mt-0.5">
                  {currentPageObj.name}
                </h3>
                <span className="text-xs text-[#8A847A] font-mono block mt-0.5">
                  ID: {currentPageObj.id} • Path: {currentPageObj.path}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAutoSuggest}
                  className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition flex items-center gap-1.5"
                  title="Auto-generate 5 tailored B2B FAQs for this page"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Suggest 5</span>
                </button>

                <button
                  onClick={() => openAddModal(selectedPageId)}
                  className="px-4 py-2 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white text-xs font-bold shadow-glow-orange transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>
            </div>

            {/* List of FAQs on this page */}
            {filteredPageFaqs.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-dashed border-[#E5DFD5] text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-stone-300 mx-auto" />
                <h4 className="font-bold text-sm text-[#1A1A1A]">No FAQs for {currentPageObj.name} yet</h4>
                <p className="text-xs text-[#595856] max-w-md mx-auto">
                  Add custom questions or click "Auto-Suggest 5" to automatically generate technical manufacturing questions.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleAutoSuggest}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition"
                  >
                    + Auto-Suggest 5 Questions
                  </button>
                  <button
                    onClick={() => openAddModal(selectedPageId)}
                    className="px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold transition"
                  >
                    + Add Custom Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPageFaqs.map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="p-5 rounded-2xl bg-white border border-[#E5DFD5] hover:border-[#FF751F]/40 shadow-xs transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#FF751F]/10 text-[#FF751F] text-xs font-bold font-mono flex items-center justify-center shrink-0">
                          Q{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5F1E8] text-[#595856]">
                          {faq.category || 'General'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          faq.active !== false 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {faq.active !== false ? 'Live' : 'Draft'}
                        </span>
                      </div>

                      {/* Reorder and Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMove(selectedPageId, idx, -1)}
                          className="p-1 rounded-lg border border-[#E5DFD5] hover:bg-[#FAF8F3] text-stone-500 disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === filteredPageFaqs.length - 1}
                          onClick={() => handleMove(selectedPageId, idx, 1)}
                          className="p-1 rounded-lg border border-[#E5DFD5] hover:bg-[#FAF8F3] text-stone-500 disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openEditModal(faq, selectedPageId)}
                          className="p-1.5 rounded-lg border border-[#E5DFD5] hover:bg-[#FAF8F3] text-stone-600 hover:text-[#1A1A1A]"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#FF751F]" />
                        </button>

                        <button
                          onClick={() => handleOpenCopyModal(faq, selectedPageId)}
                          className="p-1.5 rounded-lg border border-[#E5DFD5] hover:bg-[#FAF8F3] text-stone-600 hover:text-[#1A1A1A]"
                          title="Copy to another page"
                        >
                          <MoveRight className="w-3.5 h-3.5 text-blue-500" />
                        </button>

                        <button
                          onClick={() => handleDuplicateSamePage(faq, selectedPageId)}
                          className="p-1.5 rounded-lg border border-[#E5DFD5] hover:bg-[#FAF8F3] text-stone-600"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(selectedPageId, faq.id, faq.question)}
                          className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-display font-bold text-sm sm:text-base text-[#1A1A1A]">
                      {faq.question}
                    </h4>

                    <p className="text-xs text-[#595856] leading-relaxed whitespace-pre-line bg-[#FAF8F3]/60 p-3 rounded-xl border border-[#F5F1E8]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Accordion Simulation (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-20">
            <div className="p-6 rounded-3xl bg-white border border-[#E5DFD5] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#FF751F]" />
                  <h4 className="font-display font-extrabold text-sm text-[#1A1A1A]">
                    Live Accordion Preview
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Real-time Simulation
                </span>
              </div>

              <div className="text-xs text-[#8A847A] leading-relaxed">
                Click any item below to verify how buyers on <span className="font-bold text-[#1A1A1A]">{currentPageObj.name}</span> will experience the accordion.
              </div>

              {currentPageFaqs.filter(f => f.active !== false).length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#FAF8F3] border border-dashed border-[#E5DFD5] text-center text-xs text-[#8A847A]">
                  No active FAQs to preview.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
                  {currentPageFaqs.filter(f => f.active !== false).map((faq, idx) => {
                    const isOpen = previewOpenId === faq.id;
                    return (
                      <div
                        key={faq.id || idx}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen 
                            ? 'border-[#FF751F] bg-white ring-2 ring-[#FF751F]/10 shadow-xs' 
                            : 'border-[#E5DFD5] bg-white hover:border-[#FF751F]/40'
                        }`}
                      >
                        <button
                          onClick={() => setPreviewOpenId(isOpen ? null : faq.id)}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-3"
                        >
                          <span className="font-bold text-xs text-[#1A1A1A] leading-snug">
                            {faq.question}
                          </span>
                          <span className={`p-1 rounded-lg transition-transform duration-200 shrink-0 ${
                            isOpen ? 'bg-[#FF751F] text-white rotate-180' : 'bg-[#FAF8F3] text-stone-500'
                          }`}>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-3.5 pb-3.5 pt-0 text-xs text-[#595856] leading-relaxed border-t border-[#F5F1E8] mt-1">
                            <p className="pt-2">{faq.answer}</p>
                            <div className="mt-2 text-[10px] font-bold text-[#FF751F] uppercase">
                              #{faq.category || 'General'}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Consultation escalation notice */}
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] text-xs text-[#595856] space-y-1">
                <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF751F]" />
                  <span>Google SEO Structured Data</span>
                </span>
                <p className="text-[11px] text-[#8A847A]">
                  Every active question on this page is automatically formatted into Google FAQPage JSON-LD schema for rich search results.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: ADD / EDIT FAQ */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="p-6 bg-[#FAF8F3] border-b border-[#E5DFD5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-[#1A1A1A]">
                    {editingFaq ? 'Edit Frequently Asked Question' : 'Add New FAQ'}
                  </h3>
                  <p className="text-xs text-[#8A847A]">Configure question, answer, category, and target page.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-[#1A1A1A] hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              {/* Target Location / Page Selector */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1.5">
                  Target Page or Section <span className="text-red-500">*</span>
                </label>
                <select
                  value={modalForm.targetPageId}
                  onChange={(e) => setModalForm(prev => ({ ...prev, targetPageId: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] bg-[#FAF8F3] focus:outline-none focus:border-[#FF751F] cursor-pointer"
                >
                  <optgroup label="🏢 Core Platform Pages">
                    {DOMAIN_PAGES.filter(p => p.group === 'core').map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.path})</option>
                    ))}
                  </optgroup>
                  <optgroup label="🛠️ Digital Tools Suite">
                    {DOMAIN_PAGES.filter(p => p.group === 'tools').map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.path})</option>
                    ))}
                  </optgroup>
                  <optgroup label="✈️ International Country Hubs">
                    {DOMAIN_PAGES.filter(p => p.group === 'international').map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.path})</option>
                    ))}
                  </optgroup>
                  <optgroup label="🧵 Brand Resources &amp; Legal">
                    {DOMAIN_PAGES.filter(p => p.group === 'resources' || p.group === 'legal').map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.path})</option>
                    ))}
                  </optgroup>
                  {(blogPosts || []).length > 0 && (
                    <optgroup label="📝 Blog Post Articles">
                      {blogPosts.map(p => (
                        <option key={`blog-${p.slug}`} value={`blog-${p.slug}`}>
                          Blog: {p.title}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <optgroup label="🎽 Products &amp; Equipment Catalog">
                    {products.map(prod => (
                      <option key={`product-${prod.id}`} value={`product-${prod.id}`}>
                        Product: {prod.name}
                      </option>
                    ))}
                  </optgroup>
                  {(customFAQTargets || []).length > 0 && (
                    <optgroup label="✨ Custom User-Defined Targets">
                      {customFAQTargets.map(ct => (
                        <option key={ct.id} value={ct.id}>
                          Custom: {ct.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              {/* Question */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1.5">
                  Question Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Can we customize the fabric GSM and collar ribbing?"
                  value={modalForm.question}
                  onChange={(e) => setModalForm(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD5] text-xs text-[#1A1A1A] font-bold focus:outline-none focus:border-[#FF751F]"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1.5">
                  Detailed Answer Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Provide an authoritative, clear factory answer. Include exact technical parameters, minimum orders, transit times, or compliance certificates..."
                  value={modalForm.answer}
                  onChange={(e) => setModalForm(prev => ({ ...prev, answer: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD5] text-xs text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#FF751F] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1.5">
                    Category Tag
                  </label>
                  <select
                    value={modalForm.category}
                    onChange={(e) => setModalForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5DFD5] text-xs text-[#1A1A1A] bg-white focus:outline-none focus:border-[#FF751F]"
                  >
                    {PRESET_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Visibility Status */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1.5">
                    Visibility
                  </label>
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-xs text-[#1A1A1A]">
                      <input
                        type="checkbox"
                        checked={modalForm.active}
                        onChange={(e) => setModalForm(prev => ({ ...prev, active: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#FF751F] focus:ring-[#FF751F]"
                      />
                      <span>Publish Live on Website</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#F5F1E8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5DFD5] text-xs font-bold text-[#595856] hover:bg-[#FAF8F3] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] text-white text-xs font-bold shadow-glow-orange transition active:scale-95"
                >
                  {editingFaq ? 'Save Changes' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: COPY FAQ TO ANOTHER PAGE */}
      {/* ============================================================ */}
      {copyModalOpen && faqToCopy && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn space-y-4 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <div className="flex items-center gap-2.5">
                <MoveRight className="w-5 h-5 text-blue-500" />
                <h3 className="font-display font-bold text-base text-[#1A1A1A]">
                  Copy FAQ to Another Page
                </h3>
              </div>
              <button
                onClick={() => setCopyModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-[#1A1A1A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] font-bold text-[#8A847A] uppercase">Source FAQ</span>
              <p className="text-xs font-bold text-[#1A1A1A]">{faqToCopy.question}</p>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1.5">
                Select Destination Page / Target
              </label>
              <select
                value={copyTargetPageId}
                onChange={(e) => setCopyTargetPageId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD5] text-xs font-bold text-[#1A1A1A] bg-[#FAF8F3] focus:outline-none focus:border-[#FF751F]"
              >
                {allSelectablePages.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-3 border-t border-[#F5F1E8] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCopyModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E5DFD5] text-xs font-bold text-[#595856]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteCopy}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition"
              >
                Confirm Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: CREATE CUSTOM TARGET SECTION */}
      {/* ============================================================ */}
      {customTargetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
              <div className="flex items-center gap-2.5">
                <FolderPlus className="w-5 h-5 text-[#FF751F]" />
                <h3 className="font-display font-bold text-base text-[#1A1A1A]">
                  Create Custom FAQ Target
                </h3>
              </div>
              <button
                onClick={() => setCustomTargetModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-[#1A1A1A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomTarget} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1">
                  Target Unique Identifier (Slug) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. shipping-guide, checkout-faq, size-charts"
                  value={customTargetForm.id}
                  onChange={(e) => setCustomTargetForm(prev => ({ ...prev, id: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5DFD5] font-mono text-xs focus:outline-none focus:border-[#FF751F]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1">
                  Display Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. International Shipping & Customs Guide"
                  value={customTargetForm.name}
                  onChange={(e) => setCustomTargetForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#FF751F]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#8A847A] text-[10px] mb-1">
                  Associated Public Route / Path (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /shipping-guide"
                  value={customTargetForm.path}
                  onChange={(e) => setCustomTargetForm(prev => ({ ...prev, path: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#FF751F]"
                />
              </div>

              <div className="pt-3 border-t border-[#F5F1E8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCustomTargetModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5DFD5] text-xs font-bold text-[#595856]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white text-xs font-bold shadow-xs transition"
                >
                  Create Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
