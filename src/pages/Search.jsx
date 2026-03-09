import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronDown, ChevronUp, Search as SearchIcon, X, Info, Heart, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

const Search = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('cat');
    const navigate = useNavigate();
    
    // Accordion State
    const [openFilters, setOpenFilters] = useState({
        'Jewellery Types': true,
        'Price Range': true, // Open Price Range by default
        'Metal Purity': true, // Open Metal Purity by default 
        'Gender': false,
        'Metal Weight': false,
        'Carat Weight': false,
        'Gemstone': true,
        'Gemstone Shape': false,
        'Jewellery Styles': false
    });

    const [activeFilters, setActiveFilters] = useState({
        'Jewellery Types': categoryParam ? [categoryParam] : [],
        'Price Range': [],
        'Metal Purity': [],
        'Gender': [],
        'Metal Weight': [],
        'Carat Weight': [],
        'Gemstone': [],
        'Gemstone Shape': [],
        'Jewellery Styles': []
    });

    const [sortBy, setSortBy] = useState('Best Seller');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortOptions = ['Best Seller', 'Arrives Earliest', 'Price Low To High', 'Price High To Low'];

    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [quickViewTab, setQuickViewTab] = useState('Recommended');
    const quickViewTabs = ['Recommended', 'Diamond Earrings', 'Earrings Earrings', 'More Earrings'];

    const { toggleWishlist, isInWishlist } = useWishlist();

    const sliderRef = useRef(null);

    const scrollSimilar = (direction) => {
        if(sliderRef.current) {
            const scrollAmount = 300;
            sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const toggleFilter = (filterName) => {
        setOpenFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    const toggleFilterValue = (sectionName, value) => {
        setActiveFilters(prev => {
            const current = prev[sectionName] || [];
            if (current.includes(value)) {
                return { ...prev, [sectionName]: current.filter(v => v !== value) };
            } else {
                return { ...prev, [sectionName]: [...current, value] };
            }
        });
    };

    const clearAllFilters = () => {
        setActiveFilters({
            'Jewellery Types': [],
            'Price Range': [],
            'Metal Purity': [],
            'Gender': [],
            'Metal Weight': [],
            'Carat Weight': [],
            'Gemstone': [],
            'Gemstone Shape': [],
            'Jewellery Styles': []
        });
    };

    // Advanced Filtering and Sorting Logic
    const displayedProducts = useMemo(() => {
        let result = [...products];

        // 1. Filtering
        if (activeFilters['Jewellery Types'].length > 0) {
            result = result.filter(p => activeFilters['Jewellery Types'].some(type => p.category.toLowerCase() === type.toLowerCase()));
        }
        if (activeFilters['Gemstone'].length > 0) {
            result = result.filter(p => activeFilters['Gemstone'].some(gem => p.gemstone.toLowerCase() === gem.toLowerCase()));
        }

        // 3. Price Range Filtering
        if (activeFilters['Price Range'].length > 0) {
            result = result.filter(product => {
                return activeFilters['Price Range'].some(range => {
                    if (range === 'Below ₹10,000' || range === 'Below ₹10,001') return product.price < 10000;
                    if (range === '₹10,001 - ₹25,000') return product.price >= 10000 && product.price <= 25000;
                    if (range === '₹25,001 - ₹50,000') return product.price >= 25001 && product.price <= 50000;
                    if (range === '₹50,001 - ₹1,00,000') return product.price >= 50001 && product.price <= 100000;
                    if (range === '₹1,00,001 - ₹2,00,000') return product.price >= 100001 && product.price <= 200000;
                    if (range === 'Above ₹2,00,001') return product.price > 200000;
                    return true;
                });
            });
        }
        
        // 2. Sorting
        switch(sortBy) {
            case 'Price Low To High':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'Price High To Low':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'Arrives Earliest':
                // simulated: sort by id reverse
                result.sort((a, b) => b.id - a.id);
                break;
            case 'Best Seller':
            default:
                // simulated: sort by rating & reviews
                result.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
                break;
        }

        return result;
    }, [products, activeFilters, sortBy]);


    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const filterData = {
        'Price Range': [
            { label: 'Below ₹10,000', count: 26 },
            { label: '₹10,001 - ₹25,000', count: 136 },
            { label: '₹25,001 - ₹50,000', count: 281 },
            { label: '₹50,001 - ₹1,00,000', count: 351 },
            { label: '₹1,00,001 - ₹2,00,000', count: 320 },
            { label: 'Above ₹2,00,001', count: 210 }
        ],
        'Metal Purity': [
            { label: '9k yellow gold', count: 422, icon: '9K', color: 'from-[#ddb56b] to-[#b3883a]', textColor: 'text-[#5a3f0e]' },
            { label: '14k yellow gold', count: 422, icon: '14K', color: 'from-[#e9cd83] to-[#d4b059]', textColor: 'text-[#664b18]' },
            { label: '14k white gold', count: 422, icon: '14K', color: 'from-[#e2e2e4] to-[#c2c2c4]', textColor: 'text-gray-600' },
            { label: '14k rose gold', count: 414, icon: '14K', color: 'from-[#eebb9f] to-[#d69672]', textColor: 'text-[#6b3519]' },
            { label: '18k yellow gold', count: 422, icon: '18K', color: 'from-[#eec874] to-[#ceaa55]', textColor: 'text-[#664917]' },
            { label: '18k white gold', count: 422, icon: '18K', color: 'from-[#e1e2e4] to-[#b3b3b3]', textColor: 'text-gray-600' },
            { label: '18k rose gold', count: 414, icon: '18K', color: 'from-[#ebaf90] to-[#d18e69]', textColor: 'text-[#66361a]' }
        ],
        'Gender': [
            { label: 'Men', count: 7 },
            { label: 'Women', count: 420 }
        ],
        'Metal Weight': [
            { label: 'Below 2 Grams', count: 126 },
            { label: '2 - 4 Grams', count: 345 },
            { label: '4 - 6 Grams', count: 240 },
            { label: '6 - 8 Grams', count: 123 },
            { label: '8 - 10 Grams', count: 57 },
            { label: '10 - 20 Grams', count: 33 },
            { label: 'Above 20 Grams', count: 1 }
        ],
        'Carat Weight': [
            { label: '0.01 - 0.50', count: 243 },
            { label: '0.51 - 1.00', count: 235 },
            { label: '1.01 - 1.50', count: 97 },
            { label: '1.51 - 3.00', count: 108 },
            { label: 'Over 3.01', count: 43 }
        ],
        'Gemstone': [
            { label: 'Amethyst', count: 116, circleColor: 'radial-gradient(circle at 30% 30%, #cd84fc, #7616b2)' },
            { label: 'Aquamarine', count: 105, circleColor: 'radial-gradient(circle at 30% 30%, #c4f3ff, #73cbec)' },
            { label: 'Black Onyx', count: 10, circleColor: 'radial-gradient(circle at 30% 30%, #555, #111)' },
            { label: 'Sapphire', count: 132, circleColor: 'radial-gradient(circle at 30% 30%, #4793f8, #0735a2)' },
            { label: 'Citrine', count: 82, circleColor: 'radial-gradient(circle at 30% 30%, #ffd061, #d66400)' },
            { label: 'Diamond', count: 427, circleColor: 'radial-gradient(circle at 30% 30%, #ffffff, #d8e2e9)' },
            { label: 'Emerald', count: 133, circleColor: 'radial-gradient(circle at 30% 30%, #30df61, #007a22)' },
            { label: 'Ruby', count: 133, circleColor: 'radial-gradient(circle at 30% 30%, #f7455d, #a3061a)' },
            { label: 'Pearl', count: 133, circleColor: 'radial-gradient(circle at 30% 30%, #fafafa, #e0e0e0)' }
        ],
        'Gemstone Shape': [
            { label: 'Asscher', count: 4, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><path d="M7 4h10l3 3v10l-3 3H7l-3-3V7l3-3z"/><path d="M9 8h6v8H9z"/></svg> },
            { label: 'Baguette', count: 7, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[20px] text-gray-700"><rect x="7" y="3" width="10" height="18" rx="1"/><path d="M10 5v14M14 5v14"/></svg> },
            { label: 'Cushion', count: 4, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 8l8 8M16 8l-8 8"/></svg> },
            { label: 'Cushion Rectangular', count: 2, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[18px] text-gray-700"><rect x="5" y="3" width="14" height="18" rx="4"/><path d="M9 7l6 10M15 7l-6 10"/></svg> },
            { label: 'Emerald Cut', count: 7, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[18px] text-gray-700"><path d="M8 3h8l3 3v12l-3 3H8l-3-3V6l-3-3z"/><path d="M10 6v12M14 6v12M7 8h10M7 16h10"/></svg> },
            { label: 'Heart', count: 1, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/><path d="M12 10l-4 4M12 10l4 4"/></svg> },
            { label: 'Marquise', count: 1, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[20px] text-gray-700"><path d="M12 2C6 8 6 16 12 22 18 16 18 8 12 2z"/><path d="M12 2v20M8 8l8 8M16 8l-8 8"/></svg> }
        ],
        'Jewellery Styles': [
            { label: 'Art deco', count: 3, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><path d="M12 3l3 4.5h4L16.5 12l2.5 4.5h-4L12 21l-3-4.5H5L7.5 12 5 7.5h4L12 3z"/></svg> },
            { label: 'Classic', count: 46, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg> },
            { label: 'Cross', count: 3, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><path d="M12 3v18M7 8h10M12 3a4 4 0 000 8"/></svg> },
            { label: 'Dangle', count: 35, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><circle cx="12" cy="6" r="2"/><circle cx="12" cy="16" r="5"/><path d="M12 8v3"/></svg> },
            { label: 'Drop', count: 75, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><path d="M12 21a6 6 0 006-6C18 10 12 3 12 3s-6 7-6 12a6 6 0 006 6z"/><path d="M12 13v4"/></svg> },
            { label: 'Fashion', count: 266, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><rect x="5" y="5" width="14" height="14" rx="2" transform="rotate(45 12 12)"/><path d="M12 8l4 4-4 4-4-4 4-4z"/></svg> },
            { label: 'Fashion studs', count: 125, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><rect x="4" y="8" width="8" height="8" rx="1" transform="rotate(45 8 12)"/><rect x="14" y="8" width="8" height="8" rx="1" transform="rotate(45 18 12)"/></svg> }
        ]
    };

    const filterSections = Object.keys(filterData);

    const jewelleryTypes = [
        { name: 'Rings', count: 858 },
        { name: 'Pendants', count: 697 },
        { name: 'Earrings', count: 427 },
        { name: 'Necklaces', count: 148 },
        { name: 'Bracelets', count: 169 }
    ];

    const currentType = (activeFilters['Jewellery Types'] && activeFilters['Jewellery Types'][0]) || 'Jewellery';
    const currentGems = activeFilters['Gemstone'].join(", ");
    
    return (
        <div className="bg-white min-h-screen font-sans relative">
            {/* 1. TOP PROMO BANNER */}
            <div className="w-full relative bg-[#f1cdc6] h-[220px] md:h-[260px] overflow-hidden flex items-center justify-between">
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
                    <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Rare. Radiant. Real." />
                </div>
                <div className="w-full h-full z-10 flex items-center justify-center bg-gradient-to-r from-[#e49b94]/90 via-[#f1cdc6]/60 to-transparent">
                    <div className="text-center drop-shadow-sm px-4">
                        <h1 className="text-4xl md:text-6xl font-poppins text-white tracking-widest mb-2 uppercase">
                            Rare. Radiant. Real.
                        </h1>
                        <p className="text-2xl md:text-4xl text-white italic">
                            to the women we admire
                        </p>
                    </div>
                </div>
            </div>

            {/* Dark Red Promo Bar */}
            <div className="bg-[#4d1416] text-white text-center py-2.5 text-[11px] font-bold tracking-[0.08em] uppercase w-full">
                FLAT 5% OFF WITH CODE ‘CELEBRATE’ | FREE 15-DAY RETURNS | LIFETIME EXCHANGE
            </div>

            {/* Container for rest of page */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                
                {/* 2. Breadcrumbs */}
                <div className="py-4 text-[10px] text-gray-500 tracking-wider uppercase">
                    <Link to="/" className="hover:text-black">Home</Link> <span className="mx-1">/</span>
                    <Link to="/shop" className="hover:text-black">Jewellery</Link> <span className="mx-1">/</span>
                    <span className="text-gray-400 cursor-default">{currentGems} {currentType}</span>
                </div>

                {/* 3. Title Section */}
                <div className="text-center py-6 mb-4">
                    <h1 className="text-2xl font-poppins text-gray-800 mb-2">{currentGems} {currentType}</h1>
                    <p className="text-[12px] text-gray-500 max-w-2xl mx-auto">
                        Rare Jewels's {currentGems.toLowerCase()} {currentType.toLowerCase()} for women are crafted to deliver timeless brilliance and everyday luxury...
                        <button className="text-gray-800 underline ml-1 font-medium hover:text-black">Read More</button>
                    </p>
                </div>

                <div className="border-t border-gray-200 w-full mb-6"></div>

                {/* 4. Filter Row / Top Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <div className="flex items-center gap-6 lg:w-1/4 xl:w-[22%]">
                        <span className="text-[13px] text-gray-800 font-medium">Filters</span>
                        <button onClick={clearAllFilters} className="text-[11px] text-gray-500 hover:text-gray-800 transition-colors uppercase tracking-widest">Clear All</button>
                    </div>

                    <div className="flex-1 flex justify-between items-center w-full">
                        <div className="flex items-center gap-1">
                            <h2 className="text-[13px] text-gray-800 font-medium">{displayedProducts.length} Results Found</h2>
                            <Info size={12} className="text-gray-400" />
                        </div>

                        <div className="flex items-center gap-2 relative">
                            <span className="text-[11px] text-gray-500 uppercase">Sort by:</span>
                            <div 
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={() => setIsSortOpen(!isSortOpen)}
                            >
                                <span className="text-[12px] font-medium text-gray-800 whitespace-nowrap">{sortBy}</span>
                                <ChevronDown size={14} className="text-gray-600" />
                            </div>
                            
                            {isSortOpen && (
                                <div className="absolute top-full right-0 mt-2 w-[180px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50">
                                    {sortOptions.map((option) => (
                                        <div 
                                            key={option}
                                            className={`px-4 py-2 text-[12px] cursor-pointer transition-colors ${sortBy === option ? 'text-gray-400 bg-gray-50/50 cursor-default' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => {
                                                if(sortBy !== option) {
                                                    setSortBy(option);
                                                    setIsSortOpen(false);
                                                }
                                            }}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 5. Main Layout: Sidebar + Grid */}
                <div className="flex flex-col lg:flex-row gap-8 pb-20">
                    
                    {/* ===== LEFT SIDEBAR (FILTERS) ===== */}
                    <aside className="w-full lg:w-1/4 xl:w-[22%] flex-shrink-0">
                        
                        {/* Filter Section: Jewellery Types */}
                        <div className="border-b border-gray-100 py-4">
                            <button 
                                onClick={() => toggleFilter('Jewellery Types')}
                                className="w-full flex justify-between items-center group mb-3"
                            >
                                <span className="text-[13px] text-gray-800 font-medium uppercase tracking-widest text-[10px]">Jewellery Types</span>
                                {openFilters['Jewellery Types'] ? <span className="text-gray-400">—</span> : <span className="text-gray-400">+</span>}
                            </button>
                            
                            {openFilters['Jewellery Types'] && (
                                <div className="animate-in slide-in-from-top-2 duration-300">
                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar mt-2">
                                        {jewelleryTypes.map((type, idx) => {
                                            const isActive = activeFilters['Jewellery Types'].includes(type.name);
                                            return (
                                                <label key={idx} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); toggleFilterValue('Jewellery Types', type.name); }}>
                                                    <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${isActive ? 'bg-black border-black text-white' : 'border-gray-300 group-hover:border-gray-400 bg-white'}`}>
                                                        {isActive && <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                                    </div>
                                                    <span className={`text-[12px] flex-1 ${isActive ? 'text-gray-800 font-semibold' : 'text-gray-600 group-hover:text-gray-800'}`}>
                                                        {type.name}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Other Filter Sections */}
                        {filterSections.map((sectionName, idx) => (
                            <div key={idx} className="border-b border-gray-100 py-4">
                                <button 
                                    onClick={() => toggleFilter(sectionName)}
                                    className="w-full flex justify-between items-center group mb-2"
                                >
                                    <span className="text-[13px] text-gray-800 font-medium uppercase tracking-widest text-[10px]">{sectionName}</span>
                                    {openFilters[sectionName] ? <span className="text-gray-400">—</span> : <span className="text-gray-400">+</span>}
                                </button>
                                
                                {openFilters[sectionName] && (
                                    <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                                        {['Metal Purity', 'Metal Weight', 'Gemstone', 'Gemstone Shape', 'Jewellery Styles'].includes(sectionName) && (
                                            <div className="relative mb-4">
                                                <input 
                                                    type="text" 
                                                    placeholder={`Search ${sectionName}`} 
                                                    className="w-full text-[12px] border-b border-gray-200 pb-2 bg-transparent outline-none placeholder:text-gray-400 focus:border-gray-400"
                                                />
                                                <SearchIcon size={12} className="absolute right-0 top-1 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {filterData[sectionName]?.map((item, itemIdx) => {
                                                const isActive = activeFilters[sectionName] && activeFilters[sectionName].includes(item.label);
                                                return (
                                                    <label key={itemIdx} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); toggleFilterValue(sectionName, item.label); }}>
                                                        <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${isActive ? 'bg-black border-black text-white' : 'border-gray-300 group-hover:border-gray-600 bg-white'}`}>
                                                            {isActive && <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                                        </div>
                                                        
                                                        {item.icon && (
                                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[7.5px] font-bold bg-gradient-to-br ${item.color} shadow-sm border border-white/50`}>
                                                                <span className={item.textColor}>{item.icon}</span>
                                                            </div>
                                                        )}

                                                        {item.circleColor && (
                                                            <div className="w-[18px] h-[18px] rounded-full shadow-sm border border-black/10" style={{ background: item.circleColor }}></div>
                                                        )}

                                                        {item.iconNode && (
                                                            <div className="w-[18px] h-[18px] flex items-center justify-center">
                                                                {item.iconNode}
                                                            </div>
                                                        )}
                                                        
                                                        <span className={`text-[12px] flex-1 ${isActive ? 'text-gray-800 font-semibold' : 'text-gray-600 group-hover:text-gray-800'}`}>
                                                            {item.label}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </aside>

                    {/* ===== RIGHT PRODUCT GRID ===== */}
                    <div className="flex-1 w-full relative">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
                            {displayedProducts.length > 0 ? displayedProducts.map((product, idx) => (
                                <div key={product.id} className="group cursor-pointer">
                                    <div className="relative aspect-square flex items-center justify-center bg-[#fcfcfc] mb-4 overflow-hidden group/img" onClick={() => navigate(`/product/${product.id}`)}>
                                        <img src={product.image} alt={product.name} className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                                        
                                        {/* Maximize Icon */}
                                        <div 
                                            className="absolute bottom-4 left-4 w-7 h-7 border-gray-200 border flex items-center justify-center rounded-sm bg-white hover:bg-black hover:text-white text-gray-500 hover:border-black transition-colors z-20 shadow-sm"
                                            onClick={(e) => { 
                                                e.preventDefault(); 
                                                e.stopPropagation(); 
                                                setQuickViewProduct(product); 
                                            }}
                                        >
                                            <Maximize size={12} />
                                        </div>
                                        
                                        {/* Wishlist Header */}
                                        <button 
                                            className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-colors z-20 bg-white shadow-sm border border-gray-100 hover:bg-gray-50`}
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                                        >
                                            <Heart size={14} fill={isInWishlist(product.id) ? 'black' : 'none'} className={isInWishlist(product.id) ? 'text-black' : 'text-gray-400'}/>
                                        </button>


                                    </div>
                                    <h3 className="text-[11px] text-gray-500 leading-snug mb-1">{product.name}</h3>
                                    <p className="text-[13px] text-gray-900 font-semibold">{formatPrice(product.price)}</p>
                                </div>
                            )) : (
                                <div className="col-span-3 py-20 text-center">
                                    <p className="text-gray-500 text-sm">No products found matching your filters.</p>
                                    <button onClick={clearAllFilters} className="mt-4 px-6 py-2 bg-black text-white text-[11px] font-bold uppercase tracking-widest">Clear Filters</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICK VIEW / SIMILAR PRODUCTS DRAWER */}
            {/* The root container for drawer, using fixed overlay to ensure it works beautifully anywhere */}
            {quickViewProduct && (
                <>
                    {/* Dark Overlay */}
                    <div 
                        className="fixed inset-0 bg-black/30 z-[9998] backdrop-blur-sm"
                        onClick={() => setQuickViewProduct(null)}
                    ></div>
                    
                    {/* Bottom Drawer */}
                    <div className="fixed inset-x-0 bottom-0 z-[9999] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 transform translate-y-0" style={{ height: '50vh' }}>
                        {/* Drawer Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                            <h3 className="text-[14px] text-gray-900 font-medium">View Similar Products</h3>
                            <button 
                                onClick={() => setQuickViewProduct(null)}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="px-6 flex gap-2 mt-4 pb-2 border-b border-gray-50 flex-wrap">
                            {quickViewTabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setQuickViewTab(tab)}
                                    className={`px-5 py-2 text-[11px] uppercase tracking-wide font-medium rounded-full transition-all ${quickViewTab === tab ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-900 bg-[#f4f4f4]'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* products list container */}
                        <div className="p-6 relative h-[calc(100%-140px)] flex items-center bg-white group/slider">
                            
                            {/* Navigation Arrows */}
                            <button 
                                onClick={() => scrollSimilar('left')} 
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-black z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity"
                            >
                                <ChevronLeft size={16}/>
                            </button>
                            <button 
                                onClick={() => scrollSimilar('right')} 
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-black z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity"
                            >
                                <ChevronRight size={16}/>
                            </button>

                            <div ref={sliderRef} className="flex gap-4 px-2 py-2 min-w-max overflow-x-auto no-scrollbar scroll-smooth w-full">
                                {/* Similar Items mapped from displayed products */}
                                {displayedProducts.slice(0, 10).map((product, idx) => (
                                    <div key={idx} className="w-[180px] flex-shrink-0 group cursor-pointer flex flex-col items-center p-4 bg-[#fcfcfc] border border-gray-100 hover:-translate-y-1 transition-transform duration-300" onClick={() => navigate(`/product/${product.id}`)}>
                                        <div className="relative aspect-square w-[130px] mb-4 flex items-center justify-center mix-blend-multiply">
                                            <img src={product.image} className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-500`} alt={product.name} />
                                        </div>
                                        <h4 className="text-[10px] text-gray-500 leading-snug mb-2 line-clamp-2 w-full text-left">{product.name}</h4>
                                        <p className="text-[12px] text-gray-900 font-semibold w-full text-left">{formatPrice(product.price)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
