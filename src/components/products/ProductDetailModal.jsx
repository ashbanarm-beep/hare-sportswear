import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, Clock, Layers, Ruler, Sparkles, 
  ArrowRight, Info, Award 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRFQ } from '../../context/RFQContext';

export default function ProductDetailModal({ product, onClose }) {
  const isSportsBra = product?.sizingType === 'sports-bra' || product?.name?.toLowerCase().includes('bra');
  const isWomenLeggings = product?.sizingType === 'women-leggings' || (product?.gender === 'women' && !isSportsBra);
  const isWomenApparel = isSportsBra || isWomenLeggings || product?.gender === 'women' || product?.category === 'womens-activewear';

  const [activeImage, setActiveImage] = useState(0);
  const [activeSizeTab, setActiveSizeTab] = useState(
    isSportsBra ? 'women' : isWomenApparel ? 'women' : 'men'
  );
  const [unit, setUnit] = useState('cm'); // 'cm' or 'inches'

  const { setSelectedProductForInquiry } = useRFQ();

  if (!product) return null;

  const handleInquireNow = () => {
    setSelectedProductForInquiry(product);
    onClose();
  };

  // Dedicated Sports Bra sizing (Band POM, Bust POM, US/UK Bra Cup Equivalents, Support)
  const sportsBraSizes = [
    { size: 'XS', underbustCm: '63-68', underbustIn: '25-27', bustCm: '78-83', bustIn: '30.5-32.5', cupFit: '30A • 30B • 32A', support: 'High-Impact Compressive' },
    { size: 'S', underbustCm: '68-73', underbustIn: '27-29', bustCm: '83-88', bustIn: '32.5-34.5', cupFit: '32B • 32C • 34A', support: 'High-Impact Compressive' },
    { size: 'M', underbustCm: '73-78', underbustIn: '29-31', bustCm: '88-93', bustIn: '34.5-36.5', cupFit: '32D • 34B • 34C • 36A', support: 'High-Impact Compressive' },
    { size: 'L', underbustCm: '78-83', underbustIn: '31-33', bustCm: '93-99', bustIn: '36.5-39.0', cupFit: '34D • 36B • 36C • 38B', support: 'High-Impact Compressive' },
    { size: 'XL', underbustCm: '83-88', underbustIn: '33-35', bustCm: '99-105', bustIn: '39.0-41.5', cupFit: '36D • 38B • 38C • 40B', support: 'High-Impact Compressive' },
    { size: '2XL', underbustCm: '88-93', underbustIn: '35-37', bustCm: '105-112', bustIn: '41.5-44.0', cupFit: '38DD • 40C • 40D • 42C', support: 'High-Impact Compressive' },
  ];

  // Dedicated Women's Leggings & Activewear sizing (Waist, Hip, Inseam POM + US Dress Size)
  const womenLeggingsSizes = [
    { size: 'XS', usSize: 'US 0 - 2', waistCm: '58-64', waistIn: '23-25', hipCm: '84-89', hipIn: '33-35', inseamCm: '68', inseamIn: '26.8' },
    { size: 'S', usSize: 'US 4 - 6', waistCm: '64-70', waistIn: '25-27.5', hipCm: '89-95', hipIn: '35-37.5', inseamCm: '70', inseamIn: '27.5' },
    { size: 'M', usSize: 'US 8 - 10', waistCm: '70-76', waistIn: '27.5-30', hipCm: '95-101', hipIn: '37.5-40', inseamCm: '71', inseamIn: '28.0' },
    { size: 'L', usSize: 'US 12 - 14', waistCm: '76-83', waistIn: '30-32.5', hipCm: '101-108', hipIn: '40-42.5', inseamCm: '72', inseamIn: '28.3' },
    { size: 'XL', usSize: 'US 16', waistCm: '83-90', waistIn: '32.5-35.5', hipCm: '108-115', hipIn: '42.5-45.5', inseamCm: '73', inseamIn: '28.7' },
  ];

  // Standard Unisex / Teamwear Sizing chart data (CM / Inches)
  const sizeCharts = {
    men: [
      { size: 'S', chestCm: '96-101', chestIn: '38-40', lengthCm: '71', lengthIn: '28.0', waistCm: '76-81', waistIn: '30-32' },
      { size: 'M', chestCm: '101-106', chestIn: '40-42', lengthCm: '73', lengthIn: '28.7', waistCm: '81-86', waistIn: '32-34' },
      { size: 'L', chestCm: '106-112', chestIn: '42-44', lengthCm: '75', lengthIn: '29.5', waistCm: '86-92', waistIn: '34-36' },
      { size: 'XL', chestCm: '112-118', chestIn: '44-46', lengthCm: '77', lengthIn: '30.3', waistCm: '92-97', waistIn: '36-38' },
      { size: '2XL', chestCm: '118-124', chestIn: '46-49', lengthCm: '79', lengthIn: '31.1', waistCm: '97-102', waistIn: '38-40' },
      { size: '3XL', chestCm: '124-130', chestIn: '49-51', lengthCm: '81', lengthIn: '31.9', waistCm: '102-108', waistIn: '40-42' },
    ],
    women: [
      { size: 'XS', chestCm: '81-86', chestIn: '32-34', lengthCm: '62', lengthIn: '24.4', waistCm: '61-66', waistIn: '24-26' },
      { size: 'S', chestCm: '86-91', chestIn: '34-36', lengthCm: '64', lengthIn: '25.2', waistCm: '66-71', waistIn: '26-28' },
      { size: 'M', chestCm: '91-96', chestIn: '36-38', lengthCm: '66', lengthIn: '26.0', waistCm: '71-76', waistIn: '28-30' },
      { size: 'L', chestCm: '96-101', chestIn: '38-40', lengthCm: '68', lengthIn: '26.8', waistCm: '76-81', waistIn: '30-32' },
      { size: 'XL', chestCm: '101-106', chestIn: '40-42', lengthCm: '70', lengthIn: '27.5', waistCm: '81-86', waistIn: '32-34' },
    ],
    youth: [
      { size: 'YXS', chestCm: '66-71', chestIn: '26-28', lengthCm: '52', lengthIn: '20.5', waistCm: '53-56', waistIn: '21-22' },
      { size: 'YS', chestCm: '71-76', chestIn: '28-30', lengthCm: '56', lengthIn: '22.0', waistCm: '56-61', waistIn: '22-24' },
      { size: 'YM', chestCm: '76-81', chestIn: '30-32', lengthCm: '60', lengthIn: '23.6', waistCm: '61-66', waistIn: '24-26' },
      { size: 'YL', chestCm: '81-86', chestIn: '32-34', lengthCm: '64', lengthIn: '25.2', waistCm: '66-71', waistIn: '26-28' },
    ]
  };

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
      
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-[#E5DFD5] shadow-2xl overflow-hidden my-6">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] text-white transition-colors"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-[#FAF8F3] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5DFD5]">
            <div>
              {/* Main Preview Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#E5DFD5] shadow-inner group p-3 flex items-center justify-center">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                    images[activeImage]?.startsWith('/images/products/')
                      ? 'object-contain'
                      : 'object-cover object-center'
                  }`}
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FF751F] text-white shadow">
                    {product.badge || 'OEM/ODM'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/80 text-white backdrop-blur-sm">
                    {product.sport}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 mt-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === idx ? 'border-[#FF751F] shadow-glow-orange scale-105' : 'border-[#E5DFD5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Specs Highlight Box */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-[#E5DFD5] space-y-2.5 text-xs shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#595856]">Standard MOQ:</span>
                <span className="font-bold text-[#FF751F]">{product.moq}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#595856]">Production Lead Time:</span>
                <span className="font-bold text-[#1A1A1A]">{product.leadTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#595856]">Sample Turnaround:</span>
                <span className="font-bold text-emerald-600">7-10 Days Worldwide</span>
              </div>
            </div>

          </div>

          {/* Right Column: Specs, Customizations & Sizing Chart (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white">
            
            {/* Title & Material Specs */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider mb-1">
                <span>{product.category.toUpperCase()}</span>
                <span>•</span>
                <span>Sialkot Factory Engineered</span>
              </div>
              <h2 className="text-2xl font-display font-extrabold text-[#1A1A1A]">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#595856] mt-2.5 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Technical Composition Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5]">
                <span className="text-[10px] uppercase text-[#8A847A] font-bold block">Material</span>
                <span className="text-xs font-bold text-[#1A1A1A] mt-0.5 block">{product.material}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5]">
                <span className="text-[10px] uppercase text-[#8A847A] font-bold block">Density / Weight</span>
                <span className="text-xs font-bold text-[#FF751F] mt-0.5 block">{product.gsm}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD5] col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase text-[#8A847A] font-bold block">Available Sizes</span>
                <span className="text-xs font-bold text-[#1A1A1A] mt-0.5 block">{product.sizes.join(', ')}</span>
              </div>
            </div>

            {/* Key Engineering Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2 flex items-center gap-1.5 font-display">
                <ShieldCheck className="w-4 h-4 text-[#FF751F]" />
                Technical Features & Reinforcements
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#595856]">
                {product.features?.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF751F] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customization Techniques */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2 flex items-center gap-1.5 font-display">
                <Sparkles className="w-4 h-4 text-[#FF751F]" />
                Supported OEM/ODM Embellishments
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.customizationOptions?.map((opt, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs bg-[#FAF8F3] text-[#1A1A1A] border border-[#E5DFD5] font-medium"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Sizing Chart Guide or Equipment Specifications */}
            {product.gearSpecs ? (
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5 font-display">
                    <Award className="w-4 h-4 text-[#FF751F]" />
                    Equipment Engineering Specifications & Tolerances
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Factory QA Certified
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(product.gearSpecs).map(([key, val]) => (
                    <div key={key} className="p-2.5 rounded-xl bg-white border border-[#E5DFD5] flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-[#8A847A] uppercase tracking-wider">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-xs font-bold text-[#1A1A1A] mt-0.5">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#8A847A]">
                  * Bespoke dimensions, custom stiffness, and OEM branding available upon tech pack submission.
                </p>
              </div>
            ) : (
              /* Sizing Chart Guide Accordion */
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD5]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5 font-display">
                    <Ruler className="w-4 h-4 text-[#FF751F]" />
                    <span>
                      {isSportsBra 
                        ? "Sports Bra Technical Measurement Guide (POM)"
                        : isWomenLeggings 
                        ? "Women's Activewear Specification Guide (POM)" 
                        : "Sizing Chart Guide (POM)"}
                    </span>
                  </h4>

                  <div className="flex items-center gap-2 text-xs">
                    {/* Unit Switcher */}
                    <div className="flex items-center bg-white rounded-lg p-0.5 border border-[#E5DFD5]">
                      <button
                        onClick={() => setUnit('cm')}
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all ${
                          unit === 'cm' ? 'bg-[#FF751F] text-white' : 'text-[#595856] hover:text-[#1A1A1A]'
                        }`}
                      >
                        CM
                      </button>
                      <button
                        onClick={() => setUnit('inches')}
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all ${
                          unit === 'inches' ? 'bg-[#FF751F] text-white' : 'text-[#595856] hover:text-[#1A1A1A]'
                        }`}
                      >
                        INCH
                      </button>
                    </div>
                  </div>
                </div>

                {isSportsBra ? (
                  /* 100% Women's Sports Bra Sizing - Zero Men's Options */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#1A1A1A] text-white flex items-center gap-1.5 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-[#FF751F] inline-block animate-pulse"></span>
                          <span>Women's Band & Cup Specifications</span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          100% Women's Sizing
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8A847A] font-medium">
                        POM Tolerances: &plusmn; 0.75 cm
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#E5DFD5] bg-white shadow-sm">
                      <table className="w-full text-left text-xs text-[#595856]">
                        <thead className="bg-[#FAF8F3] text-[11px] uppercase text-[#1A1A1A] border-b border-[#E5DFD5]">
                          <tr>
                            <th className="p-2.5 font-bold">Alpha Size</th>
                            <th className="p-2.5 font-bold">Underbust Band ({unit.toUpperCase()})</th>
                            <th className="p-2.5 font-bold">Overbust Apex ({unit.toUpperCase()})</th>
                            <th className="p-2.5 font-bold">Recommended Bra Cup Fit</th>
                            <th className="p-2.5 font-bold hidden sm:table-cell">Support Profile</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5DFD5]">
                          {sportsBraSizes.map((row, idx) => (
                            <tr key={idx} className="hover:bg-orange-50/40 transition-colors">
                              <td className="p-2.5 font-bold text-[#1A1A1A]">{row.size}</td>
                              <td className="p-2.5 font-mono">{unit === 'cm' ? `${row.underbustCm} cm` : `${row.underbustIn}"`}</td>
                              <td className="p-2.5 font-mono">{unit === 'cm' ? `${row.bustCm} cm` : `${row.bustIn}"`}</td>
                              <td className="p-2.5 font-semibold text-[#FF751F]">{row.cupFit}</td>
                              <td className="p-2.5 hidden sm:table-cell text-[11px] text-[#8A847A]">{row.support}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* How to Measure POM Guide */}
                    <div className="p-3 rounded-xl bg-white border border-[#E5DFD5] text-[11px] text-[#595856] space-y-1.5 shadow-sm">
                      <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                        <Info className="w-3.5 h-3.5 text-[#FF751F]" />
                        <span>How to Measure Sports Bra Points of Measure (POM):</span>
                      </div>
                      <p className="leading-relaxed">
                        • <strong>Underbust Band:</strong> Measure snugly around the ribcage directly beneath the bustline, keeping tape level around back.<br />
                        • <strong>Overbust Circumference:</strong> Measure across the fullest point of the bust while breathing naturally.
                      </p>
                      <p className="text-[10px] text-[#8A847A] pt-0.5 border-t border-[#E5DFD5]/60 mt-1">
                        * Strictly dedicated to women's athletic pattern grading. Custom removable pad depths, racerback configs, and branded jacquard underbands built to client tech pack.
                      </p>
                    </div>
                  </div>
                ) : isWomenLeggings ? (
                  /* 100% Women's Activewear Leggings & Shorts - Zero Men's Options */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#1A1A1A] text-white flex items-center gap-1.5 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-[#FF751F] inline-block animate-pulse"></span>
                          <span>Women's Activewear Grading</span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          100% Women's Sizing
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8A847A] font-medium">
                        Squat-Proof Tolerances: &plusmn; 1.0 cm
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#E5DFD5] bg-white shadow-sm">
                      <table className="w-full text-left text-xs text-[#595856]">
                        <thead className="bg-[#FAF8F3] text-[11px] uppercase text-[#1A1A1A] border-b border-[#E5DFD5]">
                          <tr>
                            <th className="p-2.5 font-bold">Alpha Size</th>
                            <th className="p-2.5 font-bold">US Dress Size</th>
                            <th className="p-2.5 font-bold">Waist ({unit.toUpperCase()})</th>
                            <th className="p-2.5 font-bold">Hips ({unit.toUpperCase()})</th>
                            <th className="p-2.5 font-bold">Inseam ({unit.toUpperCase()})</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5DFD5]">
                          {womenLeggingsSizes.map((row, idx) => (
                            <tr key={idx} className="hover:bg-orange-50/40 transition-colors">
                              <td className="p-2.5 font-bold text-[#1A1A1A]">{row.size}</td>
                              <td className="p-2.5 font-semibold text-[#FF751F]">{row.usSize}</td>
                              <td className="p-2.5 font-mono">{unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn}"`}</td>
                              <td className="p-2.5 font-mono">{unit === 'cm' ? `${row.hipCm} cm` : `${row.hipIn}"`}</td>
                              <td className="p-2.5 font-mono">{unit === 'cm' ? `${row.inseamCm} cm` : `${row.inseamIn}"`}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-[10px] text-[#8A847A]">
                      * 100% Women's anatomical grading with zero roll-down high-waist bands. Custom inseam lengths (full length 28", 7/8 25", capri 21", or biker 6"/8") tailored to client tech pack.
                    </p>
                  </div>
                ) : (
                  /* Standard Unisex / Teamwear Multi-Gender Sizing */
                  <div>
                    {/* Size Category Tabs */}
                    <div className="flex items-center gap-2 mb-3">
                      {['men', 'women', 'youth'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveSizeTab(tab)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                            activeSizeTab === tab
                              ? 'bg-[#1A1A1A] text-white shadow-sm'
                              : 'bg-white text-[#595856] border border-[#E5DFD5] hover:text-[#1A1A1A]'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl border border-[#E5DFD5] bg-white shadow-sm">
                      <table className="w-full text-left text-xs text-[#595856]">
                        <thead className="bg-[#FAF8F3] text-[11px] uppercase text-[#1A1A1A] border-b border-[#E5DFD5]">
                          <tr>
                            <th className="p-2.5 font-bold">Size</th>
                            <th className="p-2.5 font-bold">1/2 Chest ({unit.toUpperCase()})</th>
                            <th className="p-2.5 font-bold">Body Length ({unit.toUpperCase()})</th>
                            <th className="p-2.5 font-bold">Waist ({unit.toUpperCase()})</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5DFD5]">
                          {sizeCharts[activeSizeTab]?.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/60">
                              <td className="p-2.5 font-bold text-[#1A1A1A]">{row.size}</td>
                              <td className="p-2.5">{unit === 'cm' ? row.chestCm : row.chestIn}</td>
                              <td className="p-2.5">{unit === 'cm' ? row.lengthCm : row.lengthIn}</td>
                              <td className="p-2.5">{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-[#8A847A] mt-2">
                      * Custom grading spec sheets accepted. Tolerances: &plusmn; 1.0 cm.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Button: Inquire / Request Quote Now */}
            <div className="pt-2">
              <Link
                to={`/contact?product=${encodeURIComponent(product.name)}&cat=${encodeURIComponent(product.category)}`}
                onClick={handleInquireNow}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white shadow-glow-orange transition-all active:scale-95 group"
              >
                <span>Inquire / Request Quote Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
