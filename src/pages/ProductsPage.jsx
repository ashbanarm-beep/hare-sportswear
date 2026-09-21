import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, SlidersHorizontal, Check, Eye, 
  ArrowRight, Sparkles, Layers, ShieldCheck, X 
} from 'lucide-react';
import { products, categories, equipmentSubcategories, activewearSubcategories, womensSubcategories, materialTypes } from '../data/products';
import ProductDetailModal from '../components/products/ProductDetailModal';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCat = searchParams.get('category') || 'all';
  const initialCat = rawCat === 'accessories' ? 'equipment' : rawCat;
  const initialSub = searchParams.get('sub') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSub);
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    const sub = searchParams.get('sub');
    if (cat === 'accessories') {
      setSelectedCategory('equipment');
    } else if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('all');
    }

    if (sub) {
      setSelectedSubcategory(sub);
    } else {
      if (cat === 'equipment') setSelectedSubcategory('all-equipment');
      else if (cat === 'womens-activewear') setSelectedSubcategory('all-womens');
      else if (cat === 'activewear') setSelectedSubcategory('all-activewear');
      else setSelectedSubcategory('all');
    }
  }, [searchParams]);

  // Filter products based on category, subcategory, material, and search
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      // 1. Category Matching
      let matchesCategory = false;
      if (selectedCategory === 'all') {
        matchesCategory = true;
      } else if (selectedCategory === 'womens-activewear') {
        // STRICTLY WOMEN'S APPAREL - NO MEN'S PRODUCTS OR VARIANTS
        matchesCategory = (item.category === 'womens-activewear' || item.gender === 'women') && item.gender !== 'men';
      } else if (selectedCategory === 'activewear') {
        if (selectedSubcategory === 'womens-activewear') {
          // Strictly women's activewear subcategory
          matchesCategory = (item.category === 'womens-activewear' || item.gender === 'women') && item.gender !== 'men';
        } else if (selectedSubcategory === 'mens-activewear') {
          // Strictly men's
          matchesCategory = item.gender === 'men';
        } else {
          matchesCategory = item.category === 'activewear' || item.category === 'womens-activewear';
        }
      } else {
        matchesCategory = item.category === selectedCategory;
      }

      // Hard enforcement: If on Sports Bras & Women's Activewear category, strictly remove any men's styles
      if (selectedCategory === 'womens-activewear' && item.gender === 'men') {
        return false;
      }

      // 2. Subcategory Matching
      let matchesSubcategory = true;
      if (selectedCategory === 'equipment') {
        matchesSubcategory = 
          selectedSubcategory === 'all-equipment' || 
          selectedSubcategory === 'all' || 
          item.subcategory === selectedSubcategory;
      } else if (selectedCategory === 'womens-activewear') {
        matchesSubcategory = 
          selectedSubcategory === 'all-womens' || 
          selectedSubcategory === 'all' || 
          item.subcategory === selectedSubcategory;
      } else if (selectedCategory === 'activewear') {
        if (selectedSubcategory === 'all-activewear' || selectedSubcategory === 'all') {
          matchesSubcategory = true;
        } else if (selectedSubcategory === 'womens-activewear') {
          matchesSubcategory = item.gender === 'women';
        } else if (selectedSubcategory === 'mens-activewear') {
          matchesSubcategory = item.gender === 'men';
        } else {
          matchesSubcategory = item.subcategory === selectedSubcategory;
        }
      }

      // 3. Material Matching
      const matchesMaterial = selectedMaterial === 'All Materials' || item.material === selectedMaterial;

      // 4. Search Query Matching
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSubcategory && matchesMaterial && matchesSearch;
    });
  }, [selectedCategory, selectedSubcategory, selectedMaterial, searchQuery]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    let defaultSub = 'all';
    if (catId === 'equipment') defaultSub = 'all-equipment';
    else if (catId === 'womens-activewear') defaultSub = 'all-womens';
    else if (catId === 'activewear') defaultSub = 'all-activewear';
    setSelectedSubcategory(defaultSub);

    if (catId === 'all') {
      searchParams.delete('category');
      searchParams.delete('sub');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>
            {selectedCategory === 'womens-activewear'
              ? "Women's Technical Apparel Line"
              : "OEM / ODM Manufacturing Catalog"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A]">
          {selectedCategory === 'womens-activewear'
            ? "Sports Bras & Women's Activewear"
            : "Wholesale Products & Technical Apparel"}
        </h1>
        <p className="text-sm sm:text-base text-[#595856] max-w-3xl leading-relaxed">
          {selectedCategory === 'womens-activewear'
            ? "Engineered specifically for women's athletic silhouettes, high-impact bust support, and squat-proof compression. Strictly dedicated to women's apparel with bespoke tech pack grading, custom molded pads, and zero men's options."
            : "Explore our core manufacturing lines across sublimated teamwear, activewear, and athletic goods. All styles can be completely customized with your brand's labels, tech packs, PMS colors, and fabric specifications."}
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

      {/* Women's Activewear Division Subcategories (Shown when Sports Bras & Women's Activewear is selected) */}
      {selectedCategory === 'womens-activewear' && (
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none animate-fadeIn flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A847A] whitespace-nowrap mr-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF751F]"></span>
              <span>Women's Line:</span>
            </span>
            {womensSubcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubcategory(sub.id);
                  const params = new URLSearchParams(searchParams);
                  params.set('sub', sub.id);
                  setSearchParams(params);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubcategory === sub.id
                    ? 'bg-[#1A1A1A] text-white font-bold shadow-sm'
                    : 'bg-white border border-[#E5DFD5] text-[#595856] hover:text-[#1A1A1A] hover:bg-[#FAF8F3]'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/80 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strictly Dedicated Women's Sizing & Patterns • Zero Men's Options</span>
          </div>
        </div>
      )}

      {/* Activewear Division Subcategories (Shown when Men's Activewear & Training is selected) */}
      {selectedCategory === 'activewear' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none animate-fadeIn">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A847A] whitespace-nowrap mr-1">
            Activewear Division:
          </span>
          {activewearSubcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubcategory(sub.id);
                const params = new URLSearchParams(searchParams);
                params.set('sub', sub.id);
                setSearchParams(params);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubcategory === sub.id
                  ? 'bg-[#1A1A1A] text-white font-bold shadow-sm'
                  : 'bg-white border border-[#E5DFD5] text-[#595856] hover:text-[#1A1A1A] hover:bg-[#FAF8F3]'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Equipment Division Subcategories (Shown when Sports Equipment & Goods is selected) */}
      {selectedCategory === 'equipment' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none animate-fadeIn">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A847A] whitespace-nowrap mr-1">
            Equipment Division:
          </span>
          {equipmentSubcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubcategory(sub.id);
                const params = new URLSearchParams(searchParams);
                params.set('sub', sub.id);
                setSearchParams(params);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubcategory === sub.id
                  ? 'bg-[#1A1A1A] text-white font-bold shadow-sm'
                  : 'bg-white border border-[#E5DFD5] text-[#595856] hover:text-[#1A1A1A] hover:bg-[#FAF8F3]'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#595856]">
        <span>
          Showing <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> manufacturing styles
        </span>
        {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || selectedMaterial !== 'All Materials' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
              setSelectedMaterial('All Materials');
              setSearchQuery('');
              searchParams.delete('category');
              searchParams.delete('sub');
              setSearchParams(searchParams);
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
              <div className="relative aspect-[4/3] overflow-hidden bg-white border-b border-[#E5DFD5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                    product.image.startsWith('/images/products/') 
                      ? 'object-contain p-3' 
                      : 'object-cover object-center'
                  }`}
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
                <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProduct(product);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/95 hover:bg-[#FF751F] text-[#1A1A1A] hover:text-white transition-all shadow-xl font-bold text-xs flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 duration-200"
                    title="View Technical Specifications"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Specifications</span>
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
                  <div className="mt-2 space-y-1.5 text-xs">
                    <p className="text-[#595856] font-medium line-clamp-1">
                      {product.material}
                    </p>
                    <div className="flex items-center gap-2 text-[#8A847A] font-mono text-[11px]">
                      <span className="text-[#FF751F] font-bold">{product.gsm}</span>
                      <span>•</span>
                      <span>{product.leadTime} Lead</span>
                    </div>

                    {/* Durability Rating */}
                    {(product.durabilityRating || product.gearSpecs?.durabilityRating) && (
                      <div className="flex items-center gap-1.5 pt-0.5 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-[#8A847A] font-medium">Durability:</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 text-[10px]">
                          {product.durabilityRating || product.gearSpecs?.durabilityRating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Single Clean Primary Action Button */}
                <div className="pt-3 border-t border-[#E5DFD5]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProduct(product);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#FF751F] hover:bg-[#E65E08] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm group/btn"
                  >
                    <span>Request Bulk Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
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
