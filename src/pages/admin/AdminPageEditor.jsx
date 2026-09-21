import React, { useState } from 'react';
import { 
  Layers, Plus, Trash2, ArrowUp, ArrowDown, Edit3, 
  Eye, Monitor, Tablet, Smartphone, Check, Sparkles, 
  Copy, Power, Table, Type, Image as ImageIcon, MousePointerClick, 
  Grid3X3, Save, X, ExternalLink
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import DynamicPageContent from '../../components/cms/DynamicPageContent';

const availablePages = [
  { id: 'home', name: 'Homepage (/)', path: '/' },
  { id: 'products', name: 'Products Catalog (/products)', path: '/products' },
  { id: 'custom-manufacturing', name: 'Custom Manufacturing (/custom-manufacturing)', path: '/custom-manufacturing' },
  { id: 'quality', name: 'Quality & Factory (/quality)', path: '/quality' },
  { id: 'about', name: 'About Us (/about)', path: '/about' },
  { id: 'contact', name: 'Contact & RFQ (/contact)', path: '/contact' }
];

export default function AdminPageEditor() {
  const { 
    pageBlocks, 
    getAllPageBlocks, 
    addBlock, 
    updateBlock, 
    deleteBlock, 
    reorderBlocks, 
    toggleBlockActive 
  } = useCMS();

  const [selectedPage, setSelectedPage] = useState('home');
  const [devicePreview, setDevicePreview] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [editingBlockId, setEditingBlockId] = useState(null);
  const [addBlockModalOpen, setAddBlockModalOpen] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const blocks = getAllPageBlocks(selectedPage);

  const handleAddBlockType = (type) => {
    const newId = addBlock(selectedPage, type);
    setAddBlockModalOpen(false);
    setEditingBlockId(newId);
    showToast();
  };

  const showToast = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleDuplicate = (block) => {
    const { id, ...data } = block;
    addBlock(selectedPage, block.type, {
      ...data,
      title: `${data.title || 'Block'} (Copy)`
    });
    showToast();
  };

  const activePageObj = availablePages.find(p => p.id === selectedPage) || availablePages[0];

  return (
    <div className="space-y-6">
      
      {/* Top Header & Page Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF751F] mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Elementor-Style Visual Page Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Page &amp; Content Block Editor
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Visually construct, edit, and reorder dynamic sections across any page without modifying source code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Target Page Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-semibold">Editing:</span>
            <select
              value={selectedPage}
              onChange={(e) => {
                setSelectedPage(e.target.value);
                setEditingBlockId(null);
              }}
              className="px-3 py-2 rounded-xl bg-[#1A1815] border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-[#FF751F] cursor-pointer"
            >
              {availablePages.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <a
            href={activePageObj.path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-stone-300 hover:text-white transition"
            title="Open Target Page"
          >
            <span>Preview URL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Editor Main Layout: Left Block Reorder / Right Live Device Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Blocks Manager & Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Page Sections ({blocks.length})
              </span>
              {savedToast && (
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 animate-fadeIn">
                  <Check className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>

            <button
              onClick={() => setAddBlockModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-xs font-bold text-white shadow-glow-orange transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Section</span>
            </button>
          </div>

          {/* Block Cards List */}
          {blocks.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#141210] border border-dashed border-white/20 text-center space-y-3">
              <p className="text-xs text-stone-400">
                No custom visual blocks added to this page yet.
              </p>
              <button
                onClick={() => setAddBlockModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition"
              >
                + Add Your First Visual Section
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.map((block, idx) => {
                const isEditing = editingBlockId === block.id;

                return (
                  <div
                    key={block.id}
                    className={`rounded-2xl border transition-all ${
                      isEditing 
                        ? 'bg-[#191715] border-[#FF751F] ring-2 ring-[#FF751F]/15 shadow-xl' 
                        : 'bg-[#141210] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Block Summary Row */}
                    <div className="p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xs font-mono text-stone-500 font-bold shrink-0">
                          #{idx + 1}
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white truncate">
                              {block.title || block.label || `${block.type.toUpperCase()} Block`}
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-stone-400 shrink-0">
                              {block.type.replace('_', ' ')}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 block truncate">
                            {block.subtitle || block.caption || block.content?.slice(0, 45) || 'Configured parameters'}
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Move Up */}
                        <button
                          disabled={idx === 0}
                          onClick={() => {
                            reorderBlocks(selectedPage, idx, idx - 1);
                            showToast();
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white disabled:opacity-30"
                          title="Move Section Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          disabled={idx === blocks.length - 1}
                          onClick={() => {
                            reorderBlocks(selectedPage, idx, idx + 1);
                            showToast();
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white disabled:opacity-30"
                          title="Move Section Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Active Toggle */}
                        <button
                          onClick={() => {
                            toggleBlockActive(selectedPage, block.id);
                            showToast();
                          }}
                          className={`p-1.5 rounded-lg transition ${
                            block.active 
                              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                              : 'bg-white/5 text-stone-500 hover:text-stone-300'
                          }`}
                          title={block.active ? 'Active on Page' : 'Hidden / Inactive'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => setEditingBlockId(isEditing ? null : block.id)}
                          className={`p-1.5 rounded-lg transition ${
                            isEditing 
                              ? 'bg-[#FF751F] text-white' 
                              : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10'
                          }`}
                          title="Edit Block Settings"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicate(block)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
                          title="Duplicate Section"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this section permanently?')) {
                              deleteBlock(selectedPage, block.id);
                              if (editingBlockId === block.id) setEditingBlockId(null);
                              showToast();
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          title="Delete Section"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Inline Form Editor Drawer (Shown if block is selected for editing) */}
                    {isEditing && (
                      <div className="p-4 bg-[#11100E] border-t border-white/10 space-y-4 text-xs animate-fadeIn">
                        
                        {/* Common Fields */}
                        {block.type !== 'cta_button' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                Subtitle / Eyebrow Tag
                              </label>
                              <input
                                type="text"
                                value={block.subtitle || ''}
                                onChange={(e) => updateBlock(selectedPage, block.id, { subtitle: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#FF751F]"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                Section Title
                              </label>
                              <input
                                type="text"
                                value={block.title || ''}
                                onChange={(e) => updateBlock(selectedPage, block.id, { title: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#FF751F]"
                              />
                            </div>
                          </div>
                        )}

                        {/* Specific Block Controls: TEXT */}
                        {block.type === 'text_block' && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                Body Content (Markdown &amp; Text)
                              </label>
                              <textarea
                                rows={4}
                                value={block.content || ''}
                                onChange={(e) => updateBlock(selectedPage, block.id, { content: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#FF751F] font-mono text-xs"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                  Text Alignment
                                </label>
                                <select
                                  value={block.alignment || 'left'}
                                  onChange={(e) => updateBlock(selectedPage, block.id, { alignment: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white"
                                >
                                  <option value="left">Left Aligned</option>
                                  <option value="center">Center Aligned</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                  Visual Theme
                                </label>
                                <select
                                  value={block.theme || 'light'}
                                  onChange={(e) => updateBlock(selectedPage, block.id, { theme: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white"
                                >
                                  <option value="light">Crisp Light Card</option>
                                  <option value="dark">Executive Dark Card</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Specific Block Controls: IMAGE */}
                        {block.type === 'image_block' && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                Image URL / Preset
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={block.imageUrl || ''}
                                  onChange={(e) => updateBlock(selectedPage, block.id, { imageUrl: e.target.value })}
                                  className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => updateBlock(selectedPage, block.id, { imageUrl: '/teamwear-img.jpg' })}
                                  className="px-2 py-1 rounded-lg bg-white/10 text-[10px] text-stone-300"
                                >
                                  Preset
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                Caption / Description
                              </label>
                              <input
                                type="text"
                                value={block.caption || ''}
                                onChange={(e) => updateBlock(selectedPage, block.id, { caption: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white"
                              />
                            </div>
                          </div>
                        )}

                        {/* Specific Block Controls: CTA */}
                        {block.type === 'cta_button' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                  Button Label
                                </label>
                                <input
                                  type="text"
                                  value={block.label || ''}
                                  onChange={(e) => updateBlock(selectedPage, block.id, { label: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                  Target Link
                                </label>
                                <input
                                  type="text"
                                  value={block.url || ''}
                                  onChange={(e) => updateBlock(selectedPage, block.id, { url: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                Bottom Subtitle
                              </label>
                              <input
                                type="text"
                                value={block.subtitle || ''}
                                onChange={(e) => updateBlock(selectedPage, block.id, { subtitle: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white"
                              />
                            </div>
                          </div>
                        )}

                        {/* Specific Block Controls: DATA TABLE */}
                        {block.type === 'data_table' && (
                          <div className="space-y-3">
                            <label className="block text-[11px] font-bold text-stone-300">
                              Table Columns (Comma Separated Headers)
                            </label>
                            <input
                              type="text"
                              value={(block.headers || []).join(', ')}
                              onChange={(e) => {
                                const headers = e.target.value.split(',').map(s => s.trim());
                                updateBlock(selectedPage, block.id, { headers });
                              }}
                              className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs"
                            />
                            <p className="text-[10px] text-stone-400">
                              Row values can be adjusted dynamically. The table auto-wraps in a responsive horizontal scroll container on mobile.
                            </p>
                          </div>
                        )}

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => setEditingBlockId(null)}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-stone-300 font-semibold"
                          >
                            Done Editing
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Column: Live Device Simulation Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4 sticky top-20">
          
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#FF751F]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Live Elementor Canvas Preview
              </span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-[#141210] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setDevicePreview('desktop')}
                className={`p-1.5 rounded-lg transition ${
                  devicePreview === 'desktop' ? 'bg-[#FF751F] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevicePreview('tablet')}
                className={`p-1.5 rounded-lg transition ${
                  devicePreview === 'tablet' ? 'bg-[#FF751F] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevicePreview('mobile')}
                className={`p-1.5 rounded-lg transition ${
                  devicePreview === 'mobile' ? 'bg-[#FF751F] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Container Frame */}
          <div className="flex justify-center bg-[#090807] p-4 sm:p-6 rounded-3xl border border-white/10 min-h-[500px] overflow-x-auto">
            <div 
              className={`transition-all duration-300 rounded-2xl overflow-hidden bg-[#F5F1E8] shadow-2xl ${
                devicePreview === 'mobile' 
                  ? 'w-[375px] ring-8 ring-stone-800' 
                  : devicePreview === 'tablet' 
                    ? 'w-[768px] ring-8 ring-stone-800' 
                    : 'w-full'
              }`}
            >
              {/* Device Status Bar Simulation */}
              <div className="bg-[#1A1A1A] py-1 px-4 flex items-center justify-between text-[10px] text-stone-400 border-b border-black/20">
                <span className="font-mono">Preview: {activePageObj.name}</span>
                <span className="capitalize">{devicePreview} Viewport</span>
              </div>

              {/* Dynamic Content Live Render */}
              <div className="p-4 sm:p-6 min-h-[400px]">
                {blocks.filter(b => b.active).length === 0 ? (
                  <div className="text-center py-16 text-xs text-[#8A847A]">
                    No active blocks configured on this page. Add a block on the left to see live preview here!
                  </div>
                ) : (
                  <DynamicPageContent pageId={selectedPage} />
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Add New Block Modal Drawer */}
      {addBlockModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#191715] border border-white/15 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-fadeIn">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF751F]" />
                <h3 className="font-display font-extrabold text-lg text-white">
                  Add New Visual Content Block
                </h3>
              </div>
              <button
                onClick={() => setAddBlockModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option 1: Text */}
              <button
                onClick={() => handleAddBlockType('text_block')}
                className="p-4 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F] text-left transition group space-y-2 hover:bg-[#1D1A17]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FF751F]/15 text-[#FF751F] flex items-center justify-center">
                  <Type className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-[#FF751F]">
                  Text &amp; Heading Block
                </h4>
                <p className="text-[11px] text-stone-400">
                  Custom headlines, subtitles, markdown body copy, and theme styles.
                </p>
              </button>

              {/* Option 2: Image */}
              <button
                onClick={() => handleAddBlockType('image_block')}
                className="p-4 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F] text-left transition group space-y-2 hover:bg-[#1D1A17]"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-blue-400">
                  Image Showcase Banner
                </h4>
                <p className="text-[11px] text-stone-400">
                  Full-width or framed high-resolution sportswear visual with overlay text.
                </p>
              </button>

              {/* Option 3: CTA */}
              <button
                onClick={() => handleAddBlockType('cta_button')}
                className="p-4 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F] text-left transition group space-y-2 hover:bg-[#1D1A17]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <MousePointerClick className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-400">
                  Button &amp; CTA Action
                </h4>
                <p className="text-[11px] text-stone-400">
                  High-conversion gradient button linking directly to RFQ or custom pages.
                </p>
              </button>

              {/* Option 4: Feature Grid */}
              <button
                onClick={() => handleAddBlockType('feature_grid')}
                className="p-4 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F] text-left transition group space-y-2 hover:bg-[#1D1A17]"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Grid3X3 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-purple-400">
                  Multi-Column Feature Grid
                </h4>
                <p className="text-[11px] text-stone-400">
                  2, 3, or 4 column grid of technical benefits, badges, and icon cards.
                </p>
              </button>

              {/* Option 5: Data Table */}
              <button
                onClick={() => handleAddBlockType('data_table')}
                className="sm:col-span-2 p-4 rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F] text-left transition group space-y-2 hover:bg-[#1D1A17]"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Table className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400">
                  Structured Data Table
                </h4>
                <p className="text-[11px] text-stone-400">
                  Customizable specification or pricing matrix with zebra striping and responsive mobile scrolling.
                </p>
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
