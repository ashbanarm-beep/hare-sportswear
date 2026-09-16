import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, SlidersHorizontal, Check, Eye, ShoppingBag, 
  ArrowRight, Sparkles, Layers, ShieldCheck, X 
} from 'lucide-react';
import { products, categories, materialTypes } from '../data/products';
import ProductDetailModal from '../components/products/ProductDetailModal';
import { useRFQ } from '../context/RFQContext';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const { addToBasket } = useRFQ();
  const [addedItemMap, setAddedItemMap] = useState({});

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  // Filter products based on category, material, and search
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesMaterial = selectedMaterial === 'All Materials' || item.material === selectedMaterial;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesMaterial && matchesSearch;
    });
  }, [selectedCategory, selectedMaterial, searchQuery]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    addToBasket(product);
    setAddedItemMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap(prev => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>OEM / ODM Manufacturing Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          Wholesale Products & Technical Apparel
        </h1>
        <p className="text-sm sm:text-base text-[#595856] max-w-3xl leading-relaxed">
          Explore our core manufacturing lines across sublimated teamwear, activewear, and athletic goods. All styles can be completely customized with your brand's labels, tech packs, PMS colors, and fabric specifications.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-4 rounded-2xl bg-white border border-[#E5DFD5] shadow-sm">
        
        {/* Search */}
        <div className="lg:col-span-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by sport, garment, or fabric..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] placeholder-slate-400 text-xs focus:outline-none focus:border-[#FF751F] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1A1A1A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="lg:col-span-5 flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#FF751F] text-white shadow-glow-orange font-bold'
                  : 'bg-[#FAF8F3] text-[#595856] hover:bg-black/5 hover:text-[#1A1A1A]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Material Filter Dropdown */}
        <div className="lg:col-span-3">
          <div className="relative">
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] text-[#1A1A1A] text-xs focus:outline-none focus:border-[#FF751F] appearance-none pr-8 cursor-pointer font-medium"
            >
              {materialTypes.map((mat, i) => (
                <option key={i} value={mat} className="bg-white text-[#1A1A1A]">
                  {mat}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#595856]">
        <span>
          Showing <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> manufacturing styles
        </span>
        {(selectedCategory !== 'all' || selectedMaterial !== 'All Materials' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedMaterial('All Materials');
              setSearchQuery('');
            }}
            className="text-[#FF751F] font-bold hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Reset all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white border border-[#E5DFD5] space-y-4 shadow-sm">
          <p className="text-lg font-bold text-[#1A1A1A]">No exact styles matching your criteria.</p>
          <p className="text-xs text-[#595856] max-w-md mx-auto">
            Need a custom proprietary garment that is not listed? We manufacture bespoke patterns based on custom tech packs.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedMaterial('All Materials');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#FF751F] text-white text-xs font-bold shadow-glow-orange"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setActiveModalProduct(product)}
              className="group rounded-3xl overflow-hidden bg-white border border-[#E5DFD5] hover:border-[#FF751F]/50 flex flex-col cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Product Image Box */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#FF751F] text-white shadow">
                    {product.badge || 'OEM/ODM'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-black/70 text-white backdrop-blur-sm border border-white/10">
                    {product.sport}
                  </span>
                </div>

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProduct(product);
                    }}
                    className="p-3 rounded-full bg-white text-[#1A1A1A] hover:bg-[#FF751F] hover:text-white transition-colors shadow-lg"
                    title="View Technical Specifications"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="p-3 rounded-full bg-[#FF751F] hover:bg-[#E65E08] text-white transition-colors shadow-lg"
                    title="Add to RFQ Basket"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>

                {/* MOQ Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-[#E5DFD5] text-[11px] font-bold text-[#FF751F] shadow-sm">
                  MOQ: {product.moq}
                </div>
              </div>

              {/* Product Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1A1A1A] group-hover:text-[#FF751F] transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Material Composition & GSM */}
                  <div className="mt-2 space-y-1 text-xs">
                    <p className="text-[#595856] font-medium line-clamp-1">
                      {product.material}
                    </p>
                    <div className="flex items-center gap-2 text-[#8A847A] font-mono text-[11px]">
                      <span className="text-[#FF751F] font-bold">{product.gsm}</span>
                      <span>•</span>
                      <span>{product.leadTime} Lead</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Inquire / RFQ Button */}
                <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between gap-3">
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`text-xs font-bold transition-colors flex items-center gap-1 ${
                      addedItemMap[product.id] ? 'text-emerald-600' : 'text-[#595856] hover:text-[#1A1A1A]'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#FF751F]" />
                    <span>{addedItemMap[product.id] ? 'Added to RFQ' : '+ Add to RFQ'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProduct(product);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#1A1A1A] bg-[#FAF8F3] hover:bg-[#FF751F] hover:text-white border border-[#E5DFD5] transition-all flex items-center gap-1.5"
                  >
                    <span>Inquire / Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <ProductDetailModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}

    </div>
  );
}
