import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, Search, Filter, ShieldCheck, Clock, Layers, 
  ExternalLink, Eye, CheckCircle2, AlertCircle, Plus,
  Award, ArrowRight, Tag, Sparkles, RefreshCw
} from 'lucide-react';
import { products, categories } from '../../data/products';
import ProductDetailModal from '../../components/products/ProductDetailModal';

export default function AdminProductManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewProduct, setPreviewProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        p.name.toLowerCase().includes(q) ||
        p.sport.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.gsm?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF751F]/15 border border-[#FF751F]/30 text-[10px] font-mono font-bold text-[#FF751F] uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>Master Catalog Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Product &amp; OEM Style Directory
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Manage factory direct production specifications, fabric GSM weights, MOQs, and engineering standards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/products"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition shadow-sm"
          >
            <span>Live Catalog</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FF751F]" />
          </Link>

          <Link
            to="/contact?cat=Custom%20OEM%20Development"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-xs font-bold text-white shadow-glow-orange transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Custom Style</span>
          </Link>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#141210] border border-white/10">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Total Catalog Items</span>
          <span className="text-2xl sm:text-3xl font-display font-black text-white mt-1 block">{products.length}</span>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">✓ All Active for OEM/ODM</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#141210] border border-white/10">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Production Categories</span>
          <span className="text-2xl sm:text-3xl font-display font-black text-[#FF751F] mt-1 block">7</span>
          <span className="text-[10px] text-stone-400 font-mono mt-1 block">Teamwear to Combat</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#141210] border border-white/10">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Rapid Sample Window</span>
          <span className="text-2xl sm:text-3xl font-display font-black text-white mt-1 block">7 Days</span>
          <span className="text-[10px] text-stone-400 font-mono mt-1 block">Direct Sialkot Dispatch</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#141210] border border-white/10">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Quality Assurance</span>
          <span className="text-2xl sm:text-3xl font-display font-black text-emerald-400 mt-1 block">AQL 2.5</span>
          <span className="text-[10px] text-stone-400 font-mono mt-1 block">ISO 2859-1 Level II</span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by style name, sport, material, or GSM..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#FF751F] transition"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-[#FF751F] text-white shadow-glow-orange'
                    : 'bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredProducts.length}</strong> of {products.length} manufacturing styles
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#FF751F] hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="group rounded-2xl bg-[#141210] border border-white/10 hover:border-[#FF751F]/40 p-4 transition-all duration-300 flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Image & Header */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF751F] text-white shadow">
                    {p.badge || 'OEM/ODM'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/80 text-white backdrop-blur-sm">
                    {p.sport}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-[#FF751F] border border-[#FF751F]/30">
                  MOQ: {p.moq}
                </div>
              </div>

              {/* Title & Specifications */}
              <div className="mt-3.5 space-y-2">
                <h3 className="font-display font-bold text-base text-white group-hover:text-[#FF751F] transition-colors line-clamp-1">
                  {p.name}
                </h3>

                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-stone-500 block text-[9px] uppercase">Fabric / Material</span>
                    <span className="text-stone-200 block truncate font-sans font-medium">{p.material}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-stone-500 block text-[9px] uppercase">GSM / Weight</span>
                    <span className="text-[#FF751F] block font-bold">{p.gsm || 'Custom spec'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setPreviewProduct(p)}
                className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/15 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>

              <Link
                to={`/contact?product=${encodeURIComponent(p.name)}&cat=${encodeURIComponent(p.category)}`}
                className="py-2 px-3 rounded-xl bg-[#FF751F]/15 hover:bg-[#FF751F] text-[#FF751F] hover:text-white border border-[#FF751F]/30 text-xs font-bold transition flex items-center justify-center gap-1"
                title="Test Direct RFQ Routing"
              >
                <span>RFQ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal Preview */}
      {previewProduct && (
        <ProductDetailModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}

    </div>
  );
}
