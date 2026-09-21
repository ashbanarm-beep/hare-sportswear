import React, { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const AVAILABLE_PAGES = [
  { id: 'home', name: 'Homepage (Bottom Accordion)', path: '/' },
  { id: 'products', name: 'Products Catalog', path: '/products' },
  { id: 'custom-manufacturing', name: 'Custom Manufacturing (OEM/ODM)', path: '/custom-manufacturing' },
  { id: 'quality', name: 'Quality & Testing Standards', path: '/quality' },
  { id: 'about', name: 'About & Factory Ethics', path: '/about' },
  { id: 'contact', name: 'Contact & Quote Page', path: '/contact' },
  { id: 'tools', name: 'Digital Tools Hub', path: '/tools' },
  { id: 'usa-hub', name: 'USA Distribution Hub', path: '/sports-wear-manufacturer-usa' },
  { id: 'blog', name: 'Blog & Articles Hub', path: '/blog' },
  { id: 'fabric-glossary', name: 'Fabric Glossary Hub', path: '/fabric-glossary' },
  { id: 'meet-hare', name: 'Meet Hurry the Hare', path: '/meet-hare' }
];

const PRESET_CATEGORIES = [
  'MOQ & Orders',
  'Customization & Tech Packs',
  'Shipping & Customs',
  'Materials & Fabrics',
  'Payment & Financials',
  'Quality & Compliance',
  'General Inquiry'
];

export default function AdminFAQManager() {
  const { pageFAQs, getAllFAQsForPage, addFAQ, updateFAQ, deleteFAQ, reorderFAQs } = useCMS();

  const [selectedPageId, setSelectedPageId] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewOpenId, setPreviewOpenId] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [modalForm, setModalForm] = useState({
    question: '',
    answer: '',
    category: 'MOQ & Orders',
    active: true
  });
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const rawFaqs = getAllFAQsForPage(selectedPageId);

  // Get all unique categories for this page
  const pageCategories = ['All', ...new Set(rawFaqs.map(f => f.category).filter(Boolean))];

  // Filtered FAQs
  const filteredFaqs = rawFaqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const openAddModal = () => {
    setEditingFaq(null);
    setModalForm({
      question: '',
      answer: '',
      category: 'MOQ & Orders',
      active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setModalForm({
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

    if (editingFaq) {
      updateFAQ(selectedPageId, editingFaq.id, modalForm);
      showToast('FAQ updated successfully!');
    } else {
      addFAQ(selectedPageId, modalForm);
      showToast('New FAQ added to page!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (faqId, questionText) => {
    if (window.confirm(`Are you sure you want to delete this FAQ?\n\n"${questionText}"`)) {
      deleteFAQ(selectedPageId, faqId);
      showToast('FAQ deleted.');
    }
  };

  const handleDuplicate = (faq) => {
    const clone = {
      question: `${faq.question} (Copy)`,
      answer: faq.answer,
      category: faq.category,
      active: true
    };
    addFAQ(selectedPageId, clone);
    showToast('FAQ duplicated.');
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= rawFaqs.length) return;
    reorderFAQs(selectedPageId, index, targetIndex);
  };

  const toggleActive = (faq) => {
    updateFAQ(selectedPageId, faq.id, { active: !faq.active });
    showToast(`FAQ marked as ${!faq.active ? 'active' : 'hidden'}.`);
  };

  const currentPageObj = AVAILABLE_PAGES.find(p => p.id === selectedPageId) || AVAILABLE_PAGES[0];

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2 animate-bounce text-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF751F]/10 text-[#FF751F] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Dynamic Accordion Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Page-Specific FAQ Manager</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Configure dynamic, collapsible FAQ sections for any page across Hare Sportswear. 
            All changes update in real time with SEO schema-friendly formatting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF751F] text-white font-medium hover:bg-[#E05E0D] shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add New FAQ
          </button>
        </div>
      </div>

      {/* Page Selector Tabs */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5E0D8] shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF751F]" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Target Page to Manage</span>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            {rawFaqs.length} FAQ{rawFaqs.length === 1 ? '' : 's'} on {currentPageObj.name.split(' ')[0]}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {AVAILABLE_PAGES.map((page) => {
            const isSelected = selectedPageId === page.id;
            const count = (pageFAQs[page.id] || []).length;
            return (
              <button
                key={page.id}
                onClick={() => {
                  setSelectedPageId(page.id);
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm'
                    : 'bg-[#F5F1E8]/50 text-gray-700 hover:bg-[#F5F1E8] border-transparent'
                }`}
              >
                <span>{page.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  isSelected ? 'bg-[#FF751F] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Management Table (Left) + Live Preview Accordion (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Management Controls & List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E0D8] shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions or answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF751F] bg-gray-50/50"
              />
            </div>

            {pageCategories.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {pageCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#FF751F] text-white font-semibold shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* FAQ Items List */}
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-[#E5E0D8]">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-700">No FAQs found</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                {searchQuery || selectedCategory !== 'All' 
                  ? 'No questions matched your filter criteria.'
                  : `There are currently no FAQs configured for ${currentPageObj.name}. Click below to add your first entry.`}
              </p>
              <button
                onClick={openAddModal}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF751F] text-white text-xs font-semibold hover:bg-[#E05E0D]"
              >
                <Plus className="w-3.5 h-3.5" />
                Add FAQ Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const rawIndex = rawFaqs.findIndex(f => f.id === faq.id);
                const isFirst = rawIndex === 0;
                const isLast = rawIndex === rawFaqs.length - 1;

                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-2xl border transition-all ${
                      faq.active !== false 
                        ? 'border-[#E5E0D8] shadow-xs hover:border-[#FF751F]/40' 
                        : 'border-dashed border-gray-200 opacity-60 bg-gray-50/50'
                    }`}
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          {/* Reorder Buttons */}
                          <div className="flex flex-col gap-1 pt-0.5">
                            <button
                              onClick={() => handleMove(rawIndex, -1)}
                              disabled={isFirst}
                              title="Move Up"
                              className="p-1 rounded text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-20 disabled:hover:bg-transparent"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMove(rawIndex, 1)}
                              disabled={isLast}
                              title="Move Down"
                              className="p-1 rounded text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-20 disabled:hover:bg-transparent"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F5F1E8] text-gray-700 border border-[#E5E0D8]">
                                {faq.category || 'General'}
                              </span>
                              {faq.active === false && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                  Hidden / Inactive
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-[#1A1A1A] leading-snug">
                              {faq.question}
                            </h4>
                            <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => toggleActive(faq)}
                            title={faq.active !== false ? 'Hide FAQ' : 'Activate FAQ'}
                            className={`p-2 rounded-xl text-xs transition-colors ${
                              faq.active !== false 
                                ? 'text-emerald-600 hover:bg-emerald-50' 
                                : 'text-gray-400 hover:bg-gray-100'
                            }`}
                          >
                            <Check className={`w-4 h-4 ${faq.active !== false ? 'opacity-100' : 'opacity-40'}`} />
                          </button>
                          <button
                            onClick={() => handleDuplicate(faq)}
                            title="Duplicate FAQ"
                            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(faq)}
                            title="Edit FAQ"
                            className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq.id, faq.question)}
                            title="Delete FAQ"
                            className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Accordion Simulation */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#FF751F]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Client Preview</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Interactive
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  {currentPageObj.id === 'home' ? 'Frequently Asked Questions' : `${currentPageObj.name} FAQ`}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Test click each item below to verify expand/collapse UX as clients will experience it.
                </p>
              </div>

              {rawFaqs.filter(f => f.active !== false).length === 0 ? (
                <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">No active FAQs to preview for this page.</p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                  {rawFaqs.filter(f => f.active !== false).map((faq) => {
                    const isOpen = previewOpenId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className={`rounded-xl border transition-all duration-200 ${
                          isOpen
                            ? 'bg-[#F5F1E8]/30 border-[#FF751F] shadow-xs'
                            : 'bg-white border-[#E5E0D8] hover:border-gray-300'
                        }`}
                      >
                        <button
                          onClick={() => setPreviewOpenId(isOpen ? null : faq.id)}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-3"
                        >
                          <span className="text-xs font-bold text-[#1A1A1A] leading-snug">
                            {faq.question}
                          </span>
                          <span className={`p-1 rounded-full transition-transform duration-200 flex-shrink-0 ${
                            isOpen ? 'bg-[#FF751F] text-white rotate-180' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-3.5 pb-3.5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-[#E5E0D8]/60 mt-1">
                            <p className="pt-2">{faq.answer}</p>
                            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
                              <Tag className="w-3 h-3 text-[#FF751F]" />
                              <span>{faq.category || 'General'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* B2B Contact note */}
              <div className="mt-6 p-4 rounded-xl bg-[#F5F1E8] border border-[#E5E0D8] flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#FF751F] flex-shrink-0" />
                <div className="text-xs text-gray-600">
                  <span className="font-bold text-[#1A1A1A] block">Have custom contract terms?</span>
                  All FAQ modules include automated direct WhatsApp and RFQ lead escalation cards.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add / Edit FAQ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#FF751F]/10 text-[#FF751F]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">
                    {editingFaq ? 'Edit Frequently Asked Question' : 'Add New FAQ'}
                  </h3>
                  <p className="text-xs text-gray-400">Target Page: {currentPageObj.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is your minimum order quantity (MOQ) for custom teamwear?"
                  value={modalForm.question}
                  onChange={(e) => setModalForm(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF751F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Detailed Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Provide a clear, authoritative B2B answer. Include exact specifications, timelines, or requirements where applicable..."
                  value={modalForm.answer}
                  onChange={(e) => setModalForm(prev => ({ ...prev, answer: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF751F] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                    Category Tag
                  </label>
                  <select
                    value={modalForm.category}
                    onChange={(e) => setModalForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#FF751F] bg-white"
                  >
                    {PRESET_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                    Visibility Status
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={modalForm.active}
                        onChange={(e) => setModalForm(prev => ({ ...prev, active: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#FF751F] focus:ring-[#FF751F]"
                      />
                      <span>Active on Website</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF751F] text-white text-xs font-bold hover:bg-[#E05E0D] shadow-sm"
                >
                  {editingFaq ? 'Save Changes' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
