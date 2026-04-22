import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { Search, User, Heart, ShoppingBag, Menu, X, Phone, ChevronDown, ChevronLeft, ChevronRight, RotateCcw, Calendar, Clock, Mail } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useLogin } from '../contexts/LoginContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from "../redux/slices/categorySlice"
import { getMostLikedProducts } from '../redux/slices/productSlice';
import { apiInstance } from '../redux/services/axiosApi';

// ============ MEGA MENU DATA ============

import { useCurrency } from '../contexts/CurrencyContext';

// ============ MEGA MENU COMPONENT ============
const MegaMenu = ({ data }) => {
    if (!data) return null;

    const sections = data.sections || [];
    const images = data.images || [];

    // Collections usually use a grid layout
    const isGrid = data?.name?.toLowerCase() === 'collection' || sections.length === 0;

    if (isGrid && images.length > 0) {
        return (
            <div className="rare-mega-menu">
                <div className="rare-mega-inner" style={{ padding: '28px 32px' }}>
                    <div className="rare-mega-grid-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', width: '100%' }}>
                        {images.map((promo, i) => (
                            <Link key={i} to={`/shop?category=${promo?._id || data?._id}&showcase=${promo?.title}`} className="rare-mega-promo-card">
                                <div className="rare-mega-promo-img" style={{ aspectRatio: '1' }}>
                                    <img src={promo?.url} alt={promo?.title} />
                                </div>
                                <div className="rare-mega-promo-label">
                                    <span>{promo?.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rare-mega-menu">
            <div className="rare-mega-inner">
                {/* LEFT CONTENT COLUMNS */}
                <div className="rare-mega-columns">
                    {sections.map((section, idx) => (
                        <div key={idx} className="rare-mega-col">
                            <h4 className="rare-mega-heading uppercase">{section.title}</h4>
                            <ul className="rare-mega-list">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <Link to={`/shop?menuItem=${item?._id}`} className="rare-mega-link">
                                            {item.icon?.url ? (
                                                <img src={item.icon.url} alt="" className="rare-mega-custom-icon w-4 h-4 object-contain mr-2 opacity-70" />
                                            ) : (
                                                <span className="rare-mega-icon">💎</span>
                                            )}
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link to={`/shop?category=${data?._id}&section=${section.title}`} className="rare-mega-explore">Explore All</Link>
                        </div>
                    ))}
                </div>

                {/* RIGHT PROMO IMAGES */}
                <div className="rare-mega-promos">
                    {images.map((promo, i) => (
                        <Link key={i} to={`/shop?category=${promo?._id || data?._id}&showcase=${promo?.title}`} className="rare-mega-promo-card">
                            <div className="rare-mega-promo-img">
                                <img src={promo?.url} alt={promo?.title} />
                            </div>
                            <div className="rare-mega-promo-label">
                                <span>{promo?.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ANNOUNCEMENTS = [
    "BIS Hallmarked & Certified Jewellery ✨",
    "Free Secure Shipping on All Orders 🚚",
    "Easy 30-Day Returns & Exchanges 🔄"
];

const POPULAR_CATEGORIES = [
    "Lab Grown Jewellery",
    "Natural Diamond Jewellery",
    "Gemstone Jewellery"
];

import VirtualAppointmentModal from './VirtualAppointmentModal';

// ============ HEADER COMPONENT ============
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVirtualModalOpen, setIsVirtualModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMega, setActiveMega] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const megaTimeoutRef = useRef(null);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const { selectedCurrency, setSelectedCurrency, CURRENCIES, formatPrice } = useCurrency();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const currencyRef = useRef(null);

    // Close currency dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (currencyRef.current && !currencyRef.current.contains(event.target)) {
                setIsCurrencyOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { cartItems, cartCount, setIsCartDrawerOpen } = useCart();
    const { wishlistItems } = useWishlist();
    const { openLogin } = useLogin();
    const { user, isAuthenticated: isLoggedIn } = useSelector(state => state.auth);
    const { categories: categoriesData, loading: isCategoriesLoading } = useSelector(state => state.category);
    const { mostLikedProducts, mostLikedLoading } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ products: [], diamonds: [] });
    const [searchLoading, setSearchLoading] = useState(false);
    const searchTimeoutRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!categoriesData || (Array.isArray(categoriesData) && categoriesData.length === 0)) {
            dispatch(getCategories());
        }
    }, [dispatch]);

    useEffect(() => {
        if (isSearchDrawerOpen && (!mostLikedProducts || mostLikedProducts.length === 0)) {
            dispatch(getMostLikedProducts());
        }
    }, [dispatch, isSearchDrawerOpen, mostLikedProducts]);

    // Since our thunk returns only the array, categoriesData is the array itself or null
    const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);
    
    const dynamicNavLinks = categories.map(cat => {
        const isDiamondLink = cat.name.toLowerCase().includes('diamond');
        return {
            name: cat.name,
            path: isDiamondLink ? '/diamond-shop' : `/shop?category=${cat._id}`,
            hasMega: !isDiamondLink,
            data: cat
        };
    });

    // Fallback if API not loaded yet or empty
    const finalNavLinks = dynamicNavLinks.length > 0 ? dynamicNavLinks : [];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    // Global Search Logic
    const performSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults({ products: [], diamonds: [] });
            return;
        }

        setSearchLoading(true);
        try {
            const response = await apiInstance.post('/api/user/search', { query });
            if (response.data.success) {
                setSearchResults(response.data.data);
            }
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults({ products: [], diamonds: [] });
        } finally {
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        
        if (searchQuery.trim()) {
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(searchQuery);
            }, 500);
        } else {
            setSearchResults({ products: [], diamonds: [] });
        }

        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        };
    }, [searchQuery]);

    const handleMegaEnter = (name) => {
        clearTimeout(megaTimeoutRef.current);
        setActiveMega(name);
    };

    const handleMegaLeave = () => {
        megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 150);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* ===== TOP ANNOUNCEMENT BAR ===== */}
            <div className="bg-[#1F4E56] text-white text-[11px] py-2">
                <div className="container mx-auto px-4 flex justify-between items-center font-light tracking-wide">
                    <button onClick={() => setIsVirtualModalOpen(true)} className="flex items-center gap-2 hover:text-[#C8923C] transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="12" rx="2" />
                            <path d="M7 20h10" />
                            <path d="M9 16v4" />
                            <path d="M15 16v4" />
                            <circle cx="12" cy="10" r="2" />
                        </svg>
                        <span>Virtual Appointment</span>
                    </button>
                    <div className="hidden md:flex items-center gap-2 relative justify-center min-w-[250px] overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentAnnouncementIndex}
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -15, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex items-center gap-2 whitespace-nowrap"
                            >
                                <RotateCcw size={12} className="opacity-70 animate-spin-slow" />
                                <span>{ANNOUNCEMENTS[currentAnnouncementIndex]}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <Link to={"tel:+919023930923"} className="flex items-center gap-2">
                        <Phone size={12} fill="white" />
                        <span>(+91) 90239-30923</span>
                    </Link>
                </div>
            </div>

            {/* ===== MAIN HEADER BAR ===== */}
            <div className={`bg-[#FDFBF7] py-4 border-b border-gray-100 ${isScrolled ? 'shadow-sm' : ''}`}>
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo Left */}
                    <Link to="/" className="flex-shrink-0">
                        <img src="/images/logo.svg" alt="Rare Jewels" className="h-10" />
                    </Link>

                    {/* Centered Search */}
                    <div className="hidden lg:flex flex-1 max-w-lg mx-8" onClick={() => setIsSearchDrawerOpen(true)}>
                        <div className="relative w-full cursor-text">
                            <input
                                type="text"
                                placeholder="Search jewellery, diamonds and more..."
                                readOnly
                                className="w-full bg-white border border-gray-100 rounded-full py-2.5 px-6 pl-12 text-sm focus:outline-none shadow-sm cursor-pointer"
                                value={searchQuery}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    {/* Right Icons & Currency */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 relative" ref={currencyRef}>
                            <div
                                className="flex items-center gap-2 cursor-pointer group py-1"
                                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                            >
                                <div className="border border-gray-200 rounded-sm overflow-hidden flex items-center shadow-sm">
                                    <ReactCountryFlag
                                        countryCode={selectedCurrency.countryCode}
                                        svg
                                        style={{ width: '22px', height: '16px' }}
                                    />
                                </div>
                                <span className="text-[13px] font-semibold text-[#000815]">{selectedCurrency.code} {selectedCurrency.symbol}</span>
                                <ChevronDown size={14} className={`text-gray-400 group-hover:text-[#000815] transition-all ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Currency Dropdown */}
                            <AnimatePresence>
                                {isCurrencyOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-2 w-[220px] bg-white border border-gray-100 shadow-xl rounded-lg z-[100] overflow-hidden flex flex-col"
                                    >
                                        <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase">Select Currency</span>
                                            <span className="text-[10px] text-gray-300">ISO 4217</span>
                                        </div>
                                        <div className="py-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                                            {CURRENCIES.map((cur) => (
                                                <div
                                                    key={cur.code}
                                                    className={`px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors ${selectedCurrency.code === cur.code ? 'bg-[#FDFBF7]' : ''}`}
                                                    onClick={() => {
                                                        setSelectedCurrency(cur);
                                                        setIsCurrencyOpen(false);
                                                    }}
                                                >
                                                    <div className="border border-gray-100 shadow-sm rounded-sm overflow-hidden flex items-center">
                                                        <ReactCountryFlag
                                                            countryCode={cur.countryCode}
                                                            svg
                                                            style={{ width: '20px', height: '14px' }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[13px] font-bold text-[#000815]">{cur.code}</span>
                                                            <span className="text-[12px] text-gray-400">({cur.symbol})</span>
                                                        </div>
                                                        <span className="text-[10px] text-gray-400 font-medium">{cur.name}</span>
                                                    </div>
                                                    {selectedCurrency.code === cur.code && (
                                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C8923C]" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-5">
                            <Link to="/wishlist" className="text-gray-700 hover:text-[#C8923C] transition-colors relative">
                                <Heart size={22} strokeWidth={1.5} />
                                {wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistItems.length}</span>}
                            </Link>
                            <button onClick={() => isLoggedIn ? navigate('/dashboard') : openLogin()} className="text-gray-700 hover:text-[#C8923C] transition-colors">
                                <User size={22} strokeWidth={1.5} />
                            </button>
                            <button
                                onClick={() => setIsCartDrawerOpen(true)}
                                className="text-gray-700 hover:text-[#C8923C] transition-colors relative"
                            >
                                <ShoppingBag size={22} strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {cartItems.length}
                                </span>
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button className="lg:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== NAVIGATION BAR ===== */}
            <nav
                className={`bg-[#FDFBF7] relative md:block hidden pb-2`}
                onMouseLeave={handleMegaLeave}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center gap-8 lg:gap-12">
                        {finalNavLinks.map((link) => (
                            <div
                                key={link.name}
                                className="group py-3"
                                onMouseEnter={() => link.hasMega ? handleMegaEnter(link.name) : setActiveMega(null)}
                            >
                                <Link
                                    to={link.path}
                                    className="relative text-[12px] font-medium tracking-[0.15em] text-gray-700 hover:text-[#C8923C] transition-colors uppercase whitespace-nowrap"
                                >
                                    {link.name}
                                    {/* Hover Underline Effect */}
                                    <div className={`absolute -bottom-1 left-0 h-[2px] bg-[#C8923C] transition-all duration-300 ${activeMega === link.name ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Full-Width Mega Menu Container */}
                <AnimatePresence>
                    {activeMega && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 z-50 bg-white shadow-2xl border-t border-gray-100"
                            onMouseEnter={() => handleMegaEnter(activeMega)}
                            onMouseLeave={handleMegaLeave}
                        >
                            {(() => {
                                const activeLink = finalNavLinks.find(l => l.name === activeMega);
                                return activeLink && activeLink.data ? (
                                    <MegaMenu data={activeLink.data} />
                                ) : null;
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ===== MOBILE MENU DRAWER ===== */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[400px] bg-white z-[70] flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <div className="rare-logo flex items-center">
                                    <img src="/images/logo.svg" alt="Rare Jewels" className="h-6" />
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {finalNavLinks.map((link) => (
                                    <div key={link.name} className="border-b border-gray-100">
                                        <div className="flex items-center justify-between px-6 py-4">
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-xs font-semibold uppercase  text-gray-800"
                                            >
                                                {link.name}
                                            </Link>
                                            {link.hasMega && (
                                                <button
                                                    onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                                                    className="p-1 text-gray-500"
                                                >
                                                    <ChevronDown
                                                        size={16}
                                                        className={`transform transition-transform ${mobileExpanded === link.name ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {/* Mobile Expanded Sub-menu */}
                                        {link.hasMega && mobileExpanded === link.name && link.data && (
                                            <div className="px-6 pb-4 bg-gray-50">
                                                {link.data.sections?.map((section, sIdx) => (
                                                    <div key={sIdx} className="mb-3">
                                                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-2">{section.title}</p>
                                                        {section.items?.map((item, i) => (
                                                            <Link
                                                                key={i}
                                                                to={`/shop?menuItem=${item._id}`}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className="flex items-center gap-2 py-1.5 text-xs text-gray-600"
                                                            >
                                                                {item.icon?.url && <img src={item.icon.url} className="w-3 h-3 object-contain" alt="" />}
                                                                {item.title}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ))}
                                                <Link
                                                    to={link.path}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="text-xs font-semibold text-[#2B5C6B] underline"
                                                >
                                                    View All
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-gray-50 text-center border-t border-gray-200">
                                <p className="text-xs text-gray-500 uppercase mb-1">Need Help?</p>
                                <p className="text-sm font-medium text-gray-800">+91 800 100 1313</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ===== SEARCH DRAWER OVERLAY ===== */}
            <AnimatePresence>
                {isSearchDrawerOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-0 shadow left-0 right-0 w-full h-auto bg-white z-50"
                    >
                        <div className="rare-search-drawer-header container flex items-center gap-4 py-6 border-b border-gray-100">
                            <button onClick={() => setIsSearchDrawerOpen(false)} className="rare-drawer-close-btn p-2">
                                <ChevronLeft size={24} strokeWidth={1.5} />
                            </button>
                            <div className="flex-1 relative flex items-center border border-gray-200 rounded px-4 py-2">
                                <input
                                    type="text"
                                    className="w-full text-sm outline-none bg-transparent h-8"
                                    placeholder="Search"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <div className="flex items-center gap-1 md:gap-4 ml-2">
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="text-[9px] md:text-[10px] font-semibold text-gray-400 uppercase  whitespace-nowrap hover:text-gray-600"
                                        >
                                            Clear All
                                        </button>
                                        <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                                <div 
                                    className="ml-4 bg-black p-2 rounded cursor-pointer hover:bg-gray-800 transition-colors"
                                    onClick={() => performSearch(searchQuery)}
                                >
                                    <Search size={18} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="container py-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {searchLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                    <div className="w-10 h-10 border-4 border-[#C8923C] border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">Searching our collection...</p>
                                </div>
                            ) : (() => {
                                const products = searchResults.products || [];
                                const diamonds = searchResults.diamonds || [];
                                const hasProducts = products.length > 0;
                                const hasDiamonds = diamonds.length > 0;
                                const hasResults = hasProducts || hasDiamonds;

                                // CASE 1: No search query yet - Show Popular Products (Default view)
                                if (!searchQuery) {
                                    return (
                                        <div className="flex flex-col lg:flex-row gap-16 py-4">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-3">
                                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Trending Now</h3>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                    {mostLikedLoading ? (
                                                        [1, 2, 3, 4].map(i => (
                                                            <div key={i} className="animate-pulse bg-gray-50 h-64 rounded-sm" />
                                                        ))
                                                    ) : (mostLikedProducts || []).slice(0, 4).map((prod) => (
                                                        <div key={prod._id} className="group cursor-pointer bg-white border border-gray-100 rounded-sm hover:shadow-xl hover:border-[#C8923C]/20 transition-all duration-300" onClick={() => setIsSearchDrawerOpen(false)}>
                                                            <Link to={`/product/${prod._id}`}>
                                                                <div className="aspect-square bg-gray-50/30 flex items-center justify-center p-6 relative overflow-hidden">
                                                                    <img src={prod.image?.url || prod.variants?.[0]?.images?.[0]?.url} alt={prod.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                                                                    <button 
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            toggleWishlist(prod);
                                                                        }}
                                                                        className="absolute top-3 right-3 text-gray-300 hover:text-black transition-colors"
                                                                    >
                                                                        <Heart size={16} fill={isInWishlist(prod._id) ? "black" : "none"} strokeWidth={1.5} />
                                                                    </button>
                                                                </div>
                                                                <div className="p-4">
                                                                    <h4 className="text-[11px] leading-relaxed text-gray-600 mb-2 line-clamp-2 h-8 group-hover:text-black transition-colors">{prod.title}</h4>
                                                                    <p className="text-[12px] font-bold text-gray-900 tracking-tight">{formatPrice(prod.minVariantPrice || prod.price)}</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-80">
                                                <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-3">
                                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Top Collections</h3>
                                                </div>
                                                <div className="space-y-1">
                                                    {POPULAR_CATEGORIES.map((cat, i) => (
                                                        <Link 
                                                            key={i} 
                                                            to="/shop" 
                                                            onClick={() => setIsSearchDrawerOpen(false)} 
                                                            className="flex items-center justify-between group p-3 rounded-sm hover:bg-gray-50 transition-colors"
                                                        >
                                                            <span className="text-[13px] text-gray-800 font-medium group-hover:text-[#C8923C] transition-colors">{cat}</span>
                                                            <ChevronRight size={14} className="text-gray-300 group-hover:text-[#C8923C] transform transition-all group-hover:translate-x-1" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                // CASE 2: Query entered but NO matches - Show "No results"
                                if (!hasResults && searchQuery.trim()) {
                                    return (
                                        <div className="text-center py-20">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Search size={32} className="text-gray-200" />
                                            </div>
                                            <p className="text-[15px] text-gray-800 font-light mb-2">We couldn't find any results for "<span className="font-semibold">{searchQuery}</span>"</p>
                                            <p className="text-xs text-gray-400">Try checking your spelling or use more general terms</p>
                                            <button 
                                                onClick={() => setSearchQuery('')}
                                                className="mt-8 text-[11px] font-bold uppercase tracking-widest text-[#C8923C] hover:underline"
                                            >
                                                Clear Search
                                            </button>
                                        </div>
                                    );
                                }

                                // CASE 3: Query entered and has matches
                                return (
                                    <div className="flex flex-col lg:flex-row gap-12 py-8 relative">
                                        {/* Products Slider Column */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[13px] font-semibold text-gray-800 mb-6 tracking-tight">Related Products</h3>
                                            <div className="relative group/slider">
                                                <div 
                                                    id="search-result-slider"
                                                    className="flex overflow-x-auto gap-6 pb-4 snap-x scroll-smooth custom-scrollbar-hide"
                                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                                >
                                                    {products.concat(diamonds.map(d => ({...d, isDiamond: true}))).map((item) => {
                                                        const isLiked = isInWishlist(item._id);
                                                        return (
                                                            <div 
                                                                key={item._id} 
                                                                className="min-w-[220px] max-w-[220px] snap-start flex flex-col"
                                                            >
                                                                <div className="relative aspect-square border border-gray-100 rounded-sm mb-4 group/card overflow-hidden bg-white">
                                                                    <Link to={item.isDiamond ? `/diamond/${item._id}` : `/product/${item._id}`} onClick={() => setIsSearchDrawerOpen(false)}>
                                                                        <img 
                                                                            src={item.image?.url || item.variants?.[0]?.images?.[0]?.url} 
                                                                            alt={item.title} 
                                                                            className="w-full h-full object-contain p-4 group-hover/card:scale-110 transition-transform duration-500" 
                                                                        />
                                                                    </Link>
                                                                    <button 
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            toggleWishlist(item);
                                                                        }}
                                                                        className="absolute top-3 right-3 text-gray-400 hover:text-black transition-colors bg-white/80 rounded-full p-1.5 shadow-sm"
                                                                    >
                                                                        <Heart size={16} fill={isLiked ? "#ef4444" : "none"} stroke={isLiked ? "#ef4444" : "currentColor"} />
                                                                    </button>
                                                                    {item.isDiamond && (
                                                                        <div className="absolute bottom-2 left-2 bg-black/5 rounded text-[8px] px-1 font-bold text-gray-500 uppercase tracking-widest">{item.carat} CT</div>
                                                                    )}
                                                                </div>
                                                                <Link to={item.isDiamond ? `/diamond/${item._id}` : `/product/${item._id}`} onClick={() => setIsSearchDrawerOpen(false)} className="flex flex-col flex-1">
                                                                    <h4 className="text-[11px] leading-relaxed text-gray-600 mb-2 line-clamp-2 h-8 hover:text-black transition-colors">{item.title}</h4>
                                                                    <div className="mt-auto">
                                                                        <p className="text-[12px] font-bold text-gray-900">
                                                                            {item.isDiamond ? formatPrice(item.price) : 
                                                                                (item.minPrice && item.maxPrice && item.minPrice !== item.maxPrice) ? 
                                                                                `${formatPrice(item.minPrice)} - ${formatPrice(item.maxPrice)}` : 
                                                                                formatPrice(item.minPrice || item.price || item.minVariantPrice || item.variants?.[0]?.price)
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                
                                                {/* Slider Arrows */}
                                                <button 
                                                    onClick={() => document.getElementById('search-result-slider').scrollBy({ left: -300, behavior: 'smooth' })}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black opacity-0 group-hover/slider:opacity-100 transition-opacity z-10"
                                                >
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <button 
                                                    onClick={() => document.getElementById('search-result-slider').scrollBy({ left: 300, behavior: 'smooth' })}
                                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black opacity-0 group-hover/slider:opacity-100 transition-opacity z-10"
                                                >
                                                    <ChevronRight size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Categories Column */}
                                        <div className="w-full lg:w-72 mt-8 lg:mt-0">
                                            <h3 className="text-[13px] font-semibold text-gray-800 mb-6 tracking-tight">Related Categories</h3>
                                            <div className="space-y-4">
                                                {searchResults.categories && searchResults.categories.length > 0 ? (
                                                    searchResults.categories.map((cat, i) => (
                                                        <Link 
                                                            key={i} 
                                                            to={`/shop?category=${cat._id || cat}`} 
                                                            onClick={() => setIsSearchDrawerOpen(false)}
                                                            className="block text-[12px] text-gray-500 hover:text-[#C8923C] transition-colors"
                                                        >
                                                            {cat.name || cat}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className="text-[12px] text-gray-400 italic">No categories found for "{searchQuery}"</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Virtual Appointment Modal */}
            <VirtualAppointmentModal
                isOpen={isVirtualModalOpen}
                onClose={() => setIsVirtualModalOpen(false)}
            />
        </header>
    );
};

export default Header;
