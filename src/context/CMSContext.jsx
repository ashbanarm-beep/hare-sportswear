import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogPosts as initialBlogPosts, blogCategories as initialBlogCategories } from '../data/blogData';
import { defaultSEORegistry, defaultPageFAQs, defaultPageBlocks, defaultCaseStudies } from '../data/defaultCMSData';

const CMSContext = createContext(null);

const STORAGE_KEYS = {
  BLOG_POSTS: 'hare_cms_blog_posts_v1',
  BLOG_CATEGORIES: 'hare_cms_blog_categories_v1',
  SEO_REGISTRY: 'hare_cms_seo_registry_v1',
  PAGE_FAQS: 'hare_cms_page_faqs_v1',
  PAGE_BLOCKS: 'hare_cms_page_blocks_v1',
  CUSTOM_FAQ_TARGETS: 'hare_cms_custom_faq_targets_v1',
  CASE_STUDIES: 'hare_cms_case_studies_v1'
};

export function CMSProvider({ children }) {
  // 1. Blog Posts State
  const [blogPosts, setBlogPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(p => {
          const init = initialBlogPosts.find(ip => ip.slug === p.slug);
          return {
            ...p,
            status: p.status || 'published',
            updatedAt: p.updatedAt || p.date,
            faqs: (p.faqs && p.faqs.length > 0) ? p.faqs : (init?.faqs || [])
          };
        });
      }
    } catch (e) {
      console.warn('Failed to load blog posts from storage', e);
    }
    // Tag initial posts as 'published'
    return initialBlogPosts.map(p => ({
      ...p,
      status: p.status || 'published',
      updatedAt: p.updatedAt || p.date,
      faqs: p.faqs || []
    }));
  });

  const [blogCategories, setBlogCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOG_CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialBlogCategories;
  });

  // 2. SEO Registry State
  const [seoRegistry, setSeoRegistry] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEO_REGISTRY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load SEO registry from storage', e);
    }
    return defaultSEORegistry;
  });

  // 3. Page FAQs State
  const [pageFAQs, setPageFAQs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PAGE_FAQS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultPageFAQs,
          ...parsed
        };
      }
    } catch (e) {
      console.warn('Failed to load page FAQs from storage', e);
    }
    return defaultPageFAQs;
  });

  // 3b. Custom FAQ Target Pages/Sections Defined by Admin
  const [customFAQTargets, setCustomFAQTargets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_FAQ_TARGETS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom FAQ targets', e);
    }
    return [];
  });

  // 4. Page Blocks State (Elementor-Style Visual Page Builder)
  const [pageBlocks, setPageBlocks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PAGE_BLOCKS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaultPageBlocks so newly supported pages (products, tools, etc.) are always populated
        return {
          ...defaultPageBlocks,
          ...parsed
        };
      }
    } catch (e) {
      console.warn('Failed to load page blocks from storage', e);
    }
    return defaultPageBlocks;
  });

  // Persist states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(blogPosts));
    } catch (e) {}
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOG_CATEGORIES, JSON.stringify(blogCategories));
    } catch (e) {}
  }, [blogCategories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEO_REGISTRY, JSON.stringify(seoRegistry));
    } catch (e) {}
  }, [seoRegistry]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PAGE_FAQS, JSON.stringify(pageFAQs));
    } catch (e) {}
  }, [pageFAQs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PAGE_BLOCKS, JSON.stringify(pageBlocks));
    } catch (e) {}
  }, [pageBlocks]);

  // 5. Case Studies State
  const [caseStudies, setCaseStudies] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CASE_STUDIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load case studies from storage', e);
    }
    return defaultCaseStudies;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_FAQ_TARGETS, JSON.stringify(customFAQTargets));
    } catch (e) {}
  }, [customFAQTargets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CASE_STUDIES, JSON.stringify(caseStudies));
    } catch (e) {}
  }, [caseStudies]);

  // ============================================================
  // BLOG MANAGEMENT METHODS
  // ============================================================
  const getPublishedBlogPosts = () => {
    return blogPosts.filter(p => p.status === 'published');
  };

  const getBlogPostBySlug = (slug) => {
    return blogPosts.find(p => p.slug === slug);
  };

  const saveBlogPost = (postData) => {
    const postWithMeta = {
      ...postData,
      faqs: Array.isArray(postData.faqs) ? postData.faqs : [],
      status: postData.status || 'published',
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };

    setBlogPosts(prev => {
      const existingIndex = prev.findIndex(p => p.slug === postData.slug);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = postWithMeta;
        return updated;
      } else {
        return [postWithMeta, ...prev];
      }
    });

    // Also sync FAQs to pageFAQs under `blog-${postData.slug}`
    if (postWithMeta.faqs && postWithMeta.faqs.length > 0) {
      setPageFAQs(prev => ({
        ...prev,
        [`blog-${postData.slug}`]: postWithMeta.faqs.map((f, idx) => ({
          id: f.id || `faq-blog-${postData.slug}-${idx}-${Date.now()}`,
          question: f.question,
          answer: f.answer,
          category: postData.category || 'Blog Technical Q&A',
          active: f.active !== false
        }))
      }));
    }

    // Also register default SEO for this blog post if not present
    const blogPath = `/blog/${postData.slug}`;
    if (!seoRegistry[blogPath]) {
      updatePageSEO(blogPath, {
        title: `${postData.title} | Hare Sportswear Blog`,
        description: postData.excerpt || postData.title,
        keywords: `${postData.category}, sportswear tech pack, textile guide, sialkot manufacturing`,
        canonical: `https://hare-sportswear.vercel.app${blogPath}`
      });
    }
  };

  const deleteBlogPost = (slug) => {
    setBlogPosts(prev => prev.filter(p => p.slug !== slug));
  };

  const togglePostStatus = (slug) => {
    setBlogPosts(prev => prev.map(p => {
      if (p.slug === slug) {
        return {
          ...p,
          status: p.status === 'published' ? 'draft' : 'published'
        };
      }
      return p;
    }));
  };

  const addBlogCategory = (newCat) => {
    if (!newCat) return;
    setBlogCategories(prev => prev.includes(newCat) ? prev : [...prev, newCat]);
  };

  // ============================================================
  // SEO REGISTRY METHODS
  // ============================================================
  const getSEO = (pathname = '/') => {
    // Exact match
    if (seoRegistry[pathname]) return seoRegistry[pathname];
    // Strip trailing slash
    const normalized = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    if (seoRegistry[normalized]) return seoRegistry[normalized];
    // Fallback default
    return {
      title: 'Hare Sportswear & Goods | Sialkot OEM/ODM Custom Sportswear Manufacturer',
      description: 'Premier Sialkot direct athletic sportswear manufacturer. Sublimation teamwear kits, 4-way activewear, sports balls & combat gear with low MOQs.',
      keywords: 'sportswear manufacturer sialkot, custom teamwear oem, sublimation jerseys wholesale',
      canonical: `https://hare-sportswear.vercel.app${normalized}`
    };
  };

  const updatePageSEO = (path, data) => {
    setSeoRegistry(prev => ({
      ...prev,
      [path]: {
        ...(prev[path] || {}),
        ...data,
        canonical: data.canonical || `https://hare-sportswear.vercel.app${path}`
      }
    }));
  };

  const deletePageSEO = (path) => {
    setSeoRegistry(prev => {
      const updated = { ...prev };
      delete updated[path];
      return updated;
    });
  };

  // ============================================================
  // DYNAMIC PAGE-SPECIFIC FAQ METHODS
  // ============================================================
  const getAllFAQsForPage = (pageId = 'home') => {
    if (pageFAQs[pageId] && pageFAQs[pageId].length > 0) {
      return pageFAQs[pageId];
    }
    // If it's a blog post page, check blogPosts state for faqs
    if (pageId.startsWith('blog-')) {
      const slug = pageId.replace(/^blog-/, '');
      const post = blogPosts.find(p => p.slug === slug);
      if (post && post.faqs && post.faqs.length > 0) {
        return post.faqs.map((f, idx) => ({
          id: f.id || `faq-blog-${slug}-${idx}`,
          question: f.question,
          answer: f.answer,
          category: post.category || 'Blog Technical Q&A',
          active: f.active !== false
        }));
      }
    }
    return pageFAQs[pageId] || [];
  };

  const getFAQs = (pageId = 'home') => {
    return getAllFAQsForPage(pageId).filter(f => f.active !== false);
  };

  const addFAQ = (pageId, faq) => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: faq.question || 'New Frequently Asked Question',
      answer: faq.answer || 'Answer details...',
      category: faq.category || 'General',
      active: faq.active !== undefined ? faq.active : true
    };

    setPageFAQs(prev => {
      const existing = prev[pageId] || (pageId.startsWith('blog-') ? getAllFAQsForPage(pageId) : []);
      const updatedList = [...existing, newFaq];
      if (pageId.startsWith('blog-')) {
        const slug = pageId.replace(/^blog-/, '');
        setBlogPosts(bPrev => bPrev.map(p => p.slug === slug ? { ...p, faqs: updatedList } : p));
      }
      return {
        ...prev,
        [pageId]: updatedList
      };
    });
  };

  const updateFAQ = (pageId, faqId, updatedFields) => {
    setPageFAQs(prev => {
      const existing = prev[pageId] || (pageId.startsWith('blog-') ? getAllFAQsForPage(pageId) : []);
      const updatedList = existing.map(f => f.id === faqId ? { ...f, ...updatedFields } : f);
      if (pageId.startsWith('blog-')) {
        const slug = pageId.replace(/^blog-/, '');
        setBlogPosts(bPrev => bPrev.map(p => p.slug === slug ? { ...p, faqs: updatedList } : p));
      }
      return {
        ...prev,
        [pageId]: updatedList
      };
    });
  };

  const deleteFAQ = (pageId, faqId) => {
    setPageFAQs(prev => {
      const existing = prev[pageId] || (pageId.startsWith('blog-') ? getAllFAQsForPage(pageId) : []);
      const updatedList = existing.filter(f => f.id !== faqId);
      if (pageId.startsWith('blog-')) {
        const slug = pageId.replace(/^blog-/, '');
        setBlogPosts(bPrev => bPrev.map(p => p.slug === slug ? { ...p, faqs: updatedList } : p));
      }
      return {
        ...prev,
        [pageId]: updatedList
      };
    });
  };

  const reorderFAQs = (pageId, fromIndex, toIndex) => {
    setPageFAQs(prev => {
      const existing = prev[pageId] || (pageId.startsWith('blog-') ? getAllFAQsForPage(pageId) : []);
      const list = [...existing];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      if (pageId.startsWith('blog-')) {
        const slug = pageId.replace(/^blog-/, '');
        setBlogPosts(bPrev => bPrev.map(p => p.slug === slug ? { ...p, faqs: list } : p));
      }
      return {
        ...prev,
        [pageId]: list
      };
    });
  };

  const duplicateFAQToPage = (sourcePageId, targetPageId, faqId) => {
    const sourceFaqs = getAllFAQsForPage(sourcePageId);
    const targetFaq = sourceFaqs.find(f => f.id === faqId);
    if (!targetFaq) return;
    const cloned = {
      question: `${targetFaq.question} (Copy)`,
      answer: targetFaq.answer,
      category: targetFaq.category,
      active: targetFaq.active !== false
    };
    addFAQ(targetPageId, cloned);
  };

  const addCustomFAQTarget = (target) => {
    if (!target || !target.id) return;
    setCustomFAQTargets(prev => {
      const exists = prev.some(t => t.id === target.id);
      if (exists) return prev.map(t => t.id === target.id ? { ...t, ...target } : t);
      return [...prev, target];
    });
  };

  const deleteCustomFAQTarget = (targetId) => {
    setCustomFAQTargets(prev => prev.filter(t => t.id !== targetId));
  };

  // ============================================================
  // ELEMENTOR-STYLE PAGE BLOCKS METHODS
  // ============================================================
  const getPageBlocks = (pageId = 'home') => {
    return (pageBlocks[pageId] || []).filter(b => b.active !== false);
  };

  const getAllPageBlocks = (pageId = 'home') => {
    return pageBlocks[pageId] || [];
  };

  const addBlock = (pageId, blockType, initialData = {}) => {
    const newId = `block-${Date.now()}`;
    let template = {
      id: newId,
      type: blockType,
      active: true
    };

    if (blockType === 'text_block') {
      template = {
        ...template,
        title: 'High-Impact Performance Title',
        subtitle: 'ENGINEERING SPECIFICATION',
        content: 'Constructed using 4-way mechanical stretch polyester interlock. Engineered for maximum abrasion resistance, moisture management, and zero garment distortion.',
        alignment: 'left',
        theme: 'light'
      };
    } else if (blockType === 'image_block') {
      template = {
        ...template,
        imageUrl: '/teamwear-img.jpg',
        title: 'Precision Sialkot CNC Cutting & Laser Patterning',
        caption: 'Computerized laser cutters operating at 0.1mm seam tolerances for identical multi-size consistency.',
        fullWidth: false
      };
    } else if (blockType === 'cta_button') {
      template = {
        ...template,
        label: 'Request Free Tech Pack Sampling',
        url: '/contact',
        style: 'orange_glow',
        subtitle: 'Average turnaround 24 hours with complete BOM pricing analysis.'
      };
    } else if (blockType === 'feature_grid') {
      template = {
        ...template,
        title: 'Engineered For Global Brand Standards',
        subtitle: 'Key Manufacturing Metrics',
        columns: 3,
        items: [
          { title: 'Level 4.5+ Washfastness', desc: 'Kiian Italian disperse dyes vaporized at 205°C.', badge: 'Color Fastness', icon: 'Sparkles' },
          { title: '4-Needle 6-Thread Flatlock', desc: 'ISO 607 compression flat-seaming with Juki machines.', badge: 'Flat Seams', icon: 'Layers' },
          { title: 'AQL 2.5 Audit Inspected', desc: 'Zero needle metal detector sweep & barcode packaging.', badge: '100% Inspected', icon: 'ShieldCheck' }
        ]
      };
    } else if (blockType === 'data_table') {
      template = {
        ...template,
        title: 'Manufacturing Technical Specifications & MOQ Matrix',
        subtitle: 'Factory-Direct Pricing Tiers',
        headers: ['Specification / Item', 'Tier 1 (Startup)', 'Tier 2 (Pro Club)', 'Tier 3 (Bulk Wholesale)'],
        rows: [
          ['Order Volume (MOQ)', '25 - 50 Pcs', '100 - 500 Pcs', '1,000+ Pcs'],
          ['Sampling Lead Time', '7 Business Days', '5 Business Days', 'Priority 4 Days'],
          ['Dye Sublimation', 'Kiian Italian Disperse', 'Kiian Italian Disperse', 'Monti Antonio Rotary'],
          ['Embellishments', 'Heat Transfer / Polybag', '3D Silicone / Woven Tag', 'Barcoded Hangtags Included']
        ]
      };
    } else if (blockType === 'faq_block') {
      template = {
        ...template,
        title: 'Frequently Asked Questions',
        subtitle: 'Factory Clarifications & Specifications',
        targetPageId: pageId
      };
    }

    const merged = { ...template, ...initialData };

    setPageBlocks(prev => ({
      ...prev,
      [pageId]: [...(prev[pageId] || []), merged]
    }));

    return newId;
  };

  const updateBlock = (pageId, blockId, updatedFields) => {
    setPageBlocks(prev => ({
      ...prev,
      [pageId]: (prev[pageId] || []).map(b => b.id === blockId ? { ...b, ...updatedFields } : b)
    }));
  };

  const deleteBlock = (pageId, blockId) => {
    setPageBlocks(prev => ({
      ...prev,
      [pageId]: (prev[pageId] || []).filter(b => b.id !== blockId)
    }));
  };

  const reorderBlocks = (pageId, fromIndex, toIndex) => {
    setPageBlocks(prev => {
      const list = [...(prev[pageId] || [])];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return {
        ...prev,
        [pageId]: list
      };
    });
  };

  const toggleBlockActive = (pageId, blockId) => {
    setPageBlocks(prev => ({
      ...prev,
      [pageId]: (prev[pageId] || []).map(b => b.id === blockId ? { ...b, active: !b.active } : b)
    }));
  };

  // ============================================================
  // CASE STUDIES MANAGEMENT METHODS
  // ============================================================
  const saveCaseStudy = (studyData) => {
    const studyWithMeta = {
      ...studyData,
      id: studyData.id || `case-${Date.now()}`,
      active: studyData.active !== undefined ? studyData.active : true,
      updatedAt: new Date().toISOString()
    };

    setCaseStudies(prev => {
      const index = prev.findIndex(s => s.id === studyWithMeta.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = studyWithMeta;
        return updated;
      }
      return [studyWithMeta, ...prev];
    });
  };

  const deleteCaseStudy = (id) => {
    setCaseStudies(prev => prev.filter(s => s.id !== id));
  };

  const toggleCaseStudyStatus = (id) => {
    setCaseStudies(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const resetCaseStudies = () => {
    setCaseStudies(defaultCaseStudies);
  };

  // ============================================================
  // BACKUP, RESTORE & RESET
  // ============================================================
  const exportCMSBackup = () => {
    const data = {
      blogPosts,
      blogCategories,
      seoRegistry,
      pageFAQs,
      pageBlocks,
      caseStudies,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  };

  const importCMSBackup = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.blogPosts) setBlogPosts(parsed.blogPosts);
      if (parsed.blogCategories) setBlogCategories(parsed.blogCategories);
      if (parsed.seoRegistry) setSeoRegistry(parsed.seoRegistry);
      if (parsed.pageFAQs) setPageFAQs(parsed.pageFAQs);
      if (parsed.pageBlocks) setPageBlocks(parsed.pageBlocks);
      if (parsed.caseStudies) setCaseStudies(parsed.caseStudies);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const resetCMSToDefaults = () => {
    setBlogPosts(initialBlogPosts.map(p => ({ ...p, status: 'published' })));
    setBlogCategories(initialBlogCategories);
    setSeoRegistry(defaultSEORegistry);
    setPageFAQs(defaultPageFAQs);
    setPageBlocks(defaultPageBlocks);
    setCaseStudies(defaultCaseStudies);
    localStorage.removeItem(STORAGE_KEYS.BLOG_POSTS);
    localStorage.removeItem(STORAGE_KEYS.BLOG_CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.SEO_REGISTRY);
    localStorage.removeItem(STORAGE_KEYS.PAGE_FAQS);
    localStorage.removeItem(STORAGE_KEYS.PAGE_BLOCKS);
    localStorage.removeItem(STORAGE_KEYS.CASE_STUDIES);
  };

  const value = {
    // Blog
    blogPosts,
    blogCategories,
    getPublishedBlogPosts,
    getBlogPostBySlug,
    saveBlogPost,
    deleteBlogPost,
    togglePostStatus,
    addBlogCategory,

    // SEO
    seoRegistry,
    getSEO,
    updatePageSEO,
    deletePageSEO,

    // FAQs
    pageFAQs,
    getFAQs,
    getAllFAQsForPage,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    reorderFAQs,
    duplicateFAQToPage,
    customFAQTargets,
    addCustomFAQTarget,
    deleteCustomFAQTarget,

    // Blocks
    pageBlocks,
    getPageBlocks,
    getAllPageBlocks,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    toggleBlockActive,

    // Case Studies
    caseStudies,
    saveCaseStudy,
    deleteCaseStudy,
    toggleCaseStudyStatus,
    resetCaseStudies,

    // Backup
    exportCMSBackup,
    importCMSBackup,
    resetCMSToDefaults
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
