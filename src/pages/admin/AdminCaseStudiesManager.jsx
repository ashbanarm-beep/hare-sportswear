import React, { useState, useMemo, useRef } from 'react';
import { 
  Award, Plus, Search, Filter, Trash2, Edit3, Check, X, 
  ExternalLink, Eye, EyeOff, Sparkles, RefreshCw, Upload, 
  Image as ImageIcon, Globe, Clock, Package, CheckCircle2,
  AlertCircle, ChevronRight, Layers, Star
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const DEFAULT_CATEGORIES = [
  'Pro Soccer / Football',
  'Combat Sports & BJJ',
  'Activewear / Women',
  'Sports Goods / Match Balls',
  'Basketball & Courtwear',
  'Gym & Fitness Apparel',
  'Rugby & Field Sports',
  'Custom OEM Production'
];

const PRESET_IMAGES = [
  { label: 'Pro Soccer Kit', url: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80' },
  { label: 'MMA Rashguard', url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80' },
  { label: 'Seamless Gymwear', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
  { label: 'Thermal Match Ball', url: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Running / Track', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80' },
  { label: 'Basketball Uniform', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' }
];

export default function AdminCaseStudiesManager() {
  const { 
    caseStudies, 
    saveCaseStudy, 
    deleteCaseStudy, 
    toggleCaseStudyStatus, 
    resetCaseStudies 
  } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingStudy, setEditingStudy] = useState(null); // null = modal closed, object = modal open
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Derive unique categories from existing case studies + defaults
  const categoriesList = useMemo(() => {
    const set = new Set(DEFAULT_CATEGORIES);
    (caseStudies || []).forEach(c => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [caseStudies]);

  // Filtered case studies
  const filteredStudies = useMemo(() => {
    return (caseStudies || []).filter(study => {
      const matchesCategory = selectedCategory === 'All' || study.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        study.title?.toLowerCase().includes(q) ||
        study.client?.toLowerCase().includes(q) ||
        study.country?.toLowerCase().includes(q) ||
        study.specs?.toLowerCase().includes(q) ||
        study.category?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [caseStudies, selectedCategory, searchQuery]);

  // Initial blank case study template
  const handleOpenCreateModal = () => {
    setEditingStudy({
      id: '',
      title: '',
      category: 'Pro Soccer / Football',
      client: '',
      country: '',
      specs: '180 GSM Technical Fabric • Italian Kiian Sublimation • Heat-Pressed Crest',
      turnaround: '12 Days Production',
      moq: '100 Sets',
      image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80',
      description: 'Custom athletic sportswear production run manufactured to international federation specifications in Sialkot, Pakistan.',
      active: true,
      featured: true
    });
  };

  const handleEditStudy = (study) => {
    setEditingStudy({ ...study });
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingStudy.title.trim()) {
      alert('Please enter a case study title.');
      return;
    }
    if (!editingStudy.category.trim()) {
      alert('Please select or specify a category.');
      return;
    }

    saveCaseStudy(editingStudy);
    showToast(editingStudy.id ? 'Case study updated successfully!' : 'New case study published to homepage!');
    setEditingStudy(null);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the case study "${title}"?`)) {
      deleteCaseStudy(id);
      showToast('Case study deleted.');
    }
  };

  // Direct PNG / JPG file upload handler via FileReader
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 5MB for base64 local storage
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is larger than 5MB. Please choose a compressed PNG, JPG, or WebP image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target.result;
      setEditingStudy(prev => ({
        ...prev,
        image: dataUrl
      }));
      showToast(`Uploaded image (${(file.size / 1024).toFixed(1)} KB) successfully!`);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  // Quick stats
  const totalCount = caseStudies?.length || 0;
  const activeCount = (caseStudies || []).filter(s => s.active !== false).length;
  const featuredCount = (caseStudies || []).filter(s => s.featured).length;

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF751F] mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Homepage Portfolio Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Case Studies &amp; Production Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
            Add new client case studies or edit existing deliveries. Changes instantly sync with the live "Production Portfolio &amp; Case Studies" showcase on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {toastMessage && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-4 h-4" /> {toastMessage}
            </span>
          )}

          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white font-bold text-xs shadow-glow-orange flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Case Study</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#191715] border border-white/10 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-[#FF751F]/15 text-[#FF751F]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-black text-white">{totalCount}</span>
            <span className="text-[11px] text-stone-400 block">Total Case Studies</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#191715] border border-white/10 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-black text-white">{activeCount}</span>
            <span className="text-[11px] text-stone-400 block">Active on Homepage</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#191715] border border-white/10 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-purple-500/15 text-purple-400">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-black text-white">{featuredCount}</span>
            <span className="text-[11px] text-stone-400 block">Featured Highlights</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#191715] border border-white/10 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-blue-500/15 text-blue-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-display font-black text-white">45+</span>
            <span className="text-[11px] text-stone-400 block">Export Countries</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Ribbon */}
      <div className="p-4 rounded-2xl bg-[#191715] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, client, country, or specs..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-stone-400 text-xs focus:outline-none focus:border-[#FF751F]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
              selectedCategory === 'All' 
                ? 'bg-[#FF751F] text-white shadow-sm' 
                : 'bg-white/5 hover:bg-white/10 text-stone-300'
            }`}
          >
            All Categories ({totalCount})
          </button>
          {categoriesList.map(cat => {
            const count = (caseStudies || []).filter(c => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedCategory === cat 
                    ? 'bg-[#FF751F] text-white shadow-sm' 
                    : 'bg-white/5 hover:bg-white/10 text-stone-300'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Reset to Factory Defaults */}
        <button
          onClick={() => {
            if (window.confirm('Reset all case studies to initial factory defaults? Any custom added case studies will be reverted.')) {
              resetCaseStudies();
              showToast('Reset to initial 4 case studies.');
            }
          }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white text-xs flex items-center gap-1.5 shrink-0"
          title="Reset to factory default case studies"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Defaults</span>
        </button>
      </div>

      {/* Case Studies Grid */}
      {filteredStudies.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#191715] border border-white/10 space-y-3">
          <Award className="w-12 h-12 text-stone-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Case Studies Found</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            No case studies match your current search or category filter. Try clearing filters or create a new case study.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-[#FF751F] text-white font-bold text-xs"
          >
            Add New Case Study
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className={`rounded-2xl overflow-hidden bg-[#191715] border transition-all flex flex-col justify-between shadow-lg ${
                study.active !== false 
                  ? 'border-white/10 hover:border-[#FF751F]/50' 
                  : 'border-white/5 opacity-60'
              }`}
            >
              {/* Card Top Image & Badges */}
              <div>
                <div className="relative aspect-video overflow-hidden bg-black/60">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/80 text-white border border-white/20 backdrop-blur-md">
                    {study.category}
                  </span>

                  {/* Active / Inactive Pill */}
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border backdrop-blur-md ${
                    study.active !== false 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {study.active !== false ? '● Live' : '○ Hidden'}
                  </span>

                  {/* Turnaround Badge */}
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-[#FF751F] text-white shadow-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{study.turnaround}</span>
                  </span>

                  {/* Country Flag/Pill */}
                  {study.country && (
                    <span className="absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded bg-black/80 text-stone-200 border border-white/15 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#FF751F]" />
                      <span>{study.country}</span>
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-white leading-snug">
                      {study.title}
                    </h3>
                    <p className="text-xs text-[#FF751F] font-semibold mt-1">
                      Client: {study.client || 'Confidential Athletic Brand'}
                      {study.moq && <span className="text-stone-400 font-normal"> • Volume: {study.moq}</span>}
                    </p>
                  </div>

                  {study.description && (
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {study.description}
                    </p>
                  )}

                  {/* Specs Box */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-stone-300">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Manufacturing Specs:</span>
                    {study.specs}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-[#141210] border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => toggleCaseStudyStatus(study.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    study.active !== false 
                      ? 'bg-white/5 hover:bg-white/10 text-stone-300' 
                      : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                  }`}
                  title={study.active !== false ? 'Hide from live website' : 'Make visible on live website'}
                >
                  {study.active !== false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{study.active !== false ? 'Deactivate' : 'Activate'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditStudy(study)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#FF751F]" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(study.id, study.title)}
                    className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                    title="Delete case study"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* ADD / EDIT CASE STUDY MODAL */}
      {/* ========================================================= */}
      {editingStudy && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#191715] border border-white/15 rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl animate-fadeIn flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#1D1A17] border-b border-white/10 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#FF751F]/20 text-[#FF751F] border border-[#FF751F]/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {editingStudy.id ? 'Edit Case Study' : 'Create New Production Case Study'}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Configure technical specifications, client details, turnaround, and featured visual.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingStudy(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Project / Case Study Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStudy.title}
                    onChange={(e) => setEditingStudy({ ...editingStudy, title: e.target.value })}
                    placeholder="e.g. Real Atletico FC Match Kits"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-[#FF751F]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Sport Category *
                  </label>
                  <input
                    type="text"
                    list="category-suggestions"
                    required
                    value={editingStudy.category}
                    onChange={(e) => setEditingStudy({ ...editingStudy, category: e.target.value })}
                    placeholder="Select or enter category..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141210] border border-white/15 text-white text-xs focus:outline-none focus:border-[#FF751F]"
                  />
                  <datalist id="category-suggestions">
                    {categoriesList.map(cat => <option key={cat} value={cat} />)}
                  </datalist>
                </div>
              </div>

              {/* Row 2: Client Name, Country, Turnaround, MOQ */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingStudy.client}
                    onChange={(e) => setEditingStudy({ ...editingStudy, client: e.target.value })}
                    placeholder="e.g. Spanish Division 3 Club"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#FF751F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Destination Country
                  </label>
                  <input
                    type="text"
                    value={editingStudy.country}
                    onChange={(e) => setEditingStudy({ ...editingStudy, country: e.target.value })}
                    placeholder="e.g. Spain, USA, Germany..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#FF751F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Production Lead Time
                  </label>
                  <input
                    type="text"
                    value={editingStudy.turnaround}
                    onChange={(e) => setEditingStudy({ ...editingStudy, turnaround: e.target.value })}
                    placeholder="e.g. 12 Days Production"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#FF751F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                    Order Volume / MOQ
                  </label>
                  <input
                    type="text"
                    value={editingStudy.moq}
                    onChange={(e) => setEditingStudy({ ...editingStudy, moq: e.target.value })}
                    placeholder="e.g. 250 Sets, 500 Pcs..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#FF751F]"
                  />
                </div>
              </div>

              {/* Row 3: Technical Specifications */}
              <div>
                <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                  Technical Specifications (Shown on Card) *
                </label>
                <input
                  type="text"
                  required
                  value={editingStudy.specs}
                  onChange={(e) => setEditingStudy({ ...editingStudy, specs: e.target.value })}
                  placeholder="e.g. 160 GSM Micro-Interlock • Kiian Sublimation • 3D Silicone Badge"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#FF751F]"
                />
                <p className="text-[10px] text-stone-400 mt-1">
                  Separate key specs with " • " bullet points (e.g. Fabric GSM, Printing Method, Stitching/Trims).
                </p>
              </div>

              {/* Row 4: Detailed Summary / Narrative */}
              <div>
                <label className="block text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-1">
                  Case Study Overview / Results Summary
                </label>
                <textarea
                  rows={3}
                  value={editingStudy.description}
                  onChange={(e) => setEditingStudy({ ...editingStudy, description: e.target.value })}
                  placeholder="Detail the manufacturing challenges, fabric engineering, sampling timeline, and client delivery satisfaction..."
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs leading-relaxed focus:outline-none focus:border-[#FF751F]"
                />
              </div>

              {/* Row 5: FEATURED IMAGE UPLOAD (KEY REQUIREMENT: PNG/JPG DIRECT LOCAL UPLOAD) */}
              <div className="p-4 rounded-2xl bg-[#141210] border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#FF751F]" />
                      Featured Case Study Visual (PNG / JPG / WebP)
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      Upload directly from your local computer without external links, or paste a direct image URL.
                    </span>
                  </div>

                  {/* Direct File Upload Button */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileUpload}
                      accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload PNG / JPG File</span>
                    </button>
                  </div>
                </div>

                {/* Image Preview & URL Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/15 relative group">
                    {editingStudy.image ? (
                      <>
                        <img
                          src={editingStudy.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setEditingStudy({ ...editingStudy, image: '' })}
                          className="absolute top-2 right-2 p-1 rounded-lg bg-black/80 text-white hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 text-[10px]">
                        <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                        <span>No image selected</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-8 space-y-2">
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Or Image URL / Base64 Data String
                    </label>
                    <input
                      type="text"
                      value={editingStudy.image}
                      onChange={(e) => setEditingStudy({ ...editingStudy, image: e.target.value })}
                      placeholder="https://... or data:image/png;base64,..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-[#FF751F]"
                    />

                    {/* Quick System Presets */}
                    <div>
                      <span className="text-[10px] text-stone-400 block mb-1">High-Res Factory Presets:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_IMAGES.map((p) => (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => setEditingStudy({ ...editingStudy, image: p.url })}
                            className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-stone-300 border border-white/10 transition"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 6: Visibility & Highlights Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={editingStudy.active !== false}
                    onChange={(e) => setEditingStudy({ ...editingStudy, active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FF751F] focus:ring-[#FF751F] bg-black/40 border-white/20"
                  />
                  <div>
                    <span className="font-bold text-white block">Active on Homepage</span>
                    <span className="text-[10px] text-stone-400">Show this case study in the live portfolio section.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={!!editingStudy.featured}
                    onChange={(e) => setEditingStudy({ ...editingStudy, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FF751F] focus:ring-[#FF751F] bg-black/40 border-white/20"
                  />
                  <div>
                    <span className="font-bold text-white block">Featured Showcase Item</span>
                    <span className="text-[10px] text-stone-400">Prioritize this project across promotional banners.</span>
                  </div>
                </label>
              </div>

            </form>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[#1D1A17] border-t border-white/10 flex items-center justify-between sticky bottom-0 z-10">
              <span className="text-[11px] text-stone-400">
                All changes sync automatically to the live website.
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingStudy(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 font-semibold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveModal}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white font-bold text-xs shadow-glow-orange transition"
                >
                  Save Case Study
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
