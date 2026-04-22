import { useDispatch, useSelector } from 'react-redux';
import { getFooter } from '../redux/slices/footerSlice';
import { getCategories } from '../redux/slices/categorySlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, MapPin, Facebook, Youtube, Instagram, ChevronRight } from 'lucide-react';

const Footer = () => {
    const dispatch = useDispatch();
    const { footerData, loading } = useSelector(state => state.footer);

    useEffect(() => {
        dispatch(getFooter());
        dispatch(getCategories());
    }, [dispatch]);

    const { categories: categoriesFromSlice } = useSelector(state => state.category);

    const assistance = footerData?.assistance || {};

    const copyright = footerData?.copyright || "";
    const shopItems = footerData?.shop || [];
    const categories = shopItems.filter(item => item.itemType === 'category');
    const menuItems = shopItems.filter(item => item.itemType === 'menuitem');

    return (
        <footer className="w-full">
            <div className="bg-white py-10 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h3 className="text-2xl font-light mb-4">Get Additional <span className="text-[#C8923C] font-bold">5% off</span> On Your First Order</h3>
                    <div className="flex flex-col sm:flex-row border border-gray-200 bg-white shadow-sm overflow-hidden rounded-sm mx-auto max-w-lg">
                        <div className="flex flex-1 border-b sm:border-b-0 sm:border-r border-gray-100">
                            <div className="flex items-center px-3 sm:px-4 text-[11px] sm:text-[12px] text-gray-400 whitespace-nowrap bg-gray-50/50 sm:bg-transparent">
                                🇮🇳 +91
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your mobile number*"
                                className="flex-1 px-4 py-3 sm:py-4 text-[13px] outline-none w-full min-w-0"
                            />
                        </div>
                        <button className="bg-black text-white px-6 sm:px-10 py-3 sm:py-4 text-[11px] sm:text-[12px] font-bold uppercase  hover:bg-gray-800 transition-colors whitespace-nowrap">
                            Sign Up
                        </button>
                    </div>
                    <p className="rare-footer-privacy mt-4 text-[11px] text-gray-400">
                        Your privacy matters. For details, see our <Link to="/privacy-policy" className="text-gray-900 underline hover:text-black">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
            {/* ===================== TOP SECTION (BROWN) ===================== */}
            <div className="bg-[#94785C] text-white pt-10 pb-8 px-4 relative overflow-hidden">
                {/* Background decorative logo watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
                    <img src="/images/logo.svg" alt="" className="w-[600px] h-[600px] grayscale brightness-0 invert" />
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                        {/* Col 1: RARE JEWELS */}
                        <div>
                            <h4 className="text-[14px] font-bold tracking-[0.1em] mb-8 uppercase">RARE JEWELS</h4>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Our Story', path: '/our-story' },
                                    { name: 'Rare Jewels Blog', path: '/blog' },
                                    { name: 'Reviews', path: '/reviews' },
                                    { name: "FAQ's", path: '/faq' },
                                    { name: '15-Day Return Policy', path: '/15-day-returns' },
                                    { name: 'Shipping Policy', path: '/shipping-policy' },
                                    { name: 'Return/Exchange Policy', path: '/exchange-buyback' },
                                    { name: 'Terms Of Service', path: '/terms-conditions' },
                                    { name: 'Privacy Policy', path: '/privacy-policy' },
                                    { name: 'Contact Us', path: '/contact' },
                                ].map((item) => (
                                    <li key={item.name}><Link to={item.path} className="text-[12px] opacity-80 hover:opacity-100 hover:underline transition-all">{item.name}</Link></li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 2: Category */}
                        <div>
                            <h4 className="text-[14px] font-bold tracking-[0.1em] mb-8 uppercase">Category</h4>
                            <ul className="space-y-3">
                                {categories.length > 0 ? categories.map((item) => (
                                    <li key={item.itemId}>
                                        <Link 
                                            to={`/shop?category=${item.title.toLowerCase().replace(/\s+/g, '-')}`} 
                                            className="text-[12px] opacity-80 hover:opacity-100 hover:underline transition-all"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                )) : (
                                    <li className="text-[11px] opacity-50 italic">No categories</li>
                                )}
                            </ul>
                        </div>

                        {/* Col 3: Menu Item */}
                        <div>
                            <h4 className="text-[14px] font-bold tracking-[0.1em] mb-8 uppercase">Menu Item</h4>
                            <ul className="space-y-3">
                                {menuItems.length > 0 ? menuItems.map((item) => (
                                    <li key={item.itemId}>
                                        <Link 
                                            to={`/shop?menuitem=${item.title.toLowerCase().replace(/\s+/g, '-')}`} 
                                            className="text-[12px] opacity-80 hover:opacity-100 hover:underline transition-all"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                )) : (
                                    <li className="text-[11px] opacity-50 italic">No items</li>
                                )}
                            </ul>
                        </div>

                        {/* Col 4: CONTACT & FOLLOW */}
                        <div>
                            <div className="space-y-6">
                                <a href={`tel:${assistance.mobile}`} className="flex items-center gap-3 text-[13px] opacity-90 hover:opacity-100 group transition-all">
                                    <Phone size={18} fill="white" className="border border-white/20 p-1 rounded-sm group-hover:bg-white group-hover:text-[#94785C]" />
                                    <span>{assistance.mobile}</span>
                                </a>
                                <a href={`mailto:${assistance.email}`} className="flex items-center gap-3 text-[13px] opacity-90 hover:opacity-100 group transition-all underline">
                                    <Mail size={18} className="border border-white/20 p-1 rounded-sm group-hover:bg-white group-hover:text-[#94785C]" />
                                    <span>{assistance.email}</span>
                                </a>
                                <a href={`https://wa.me/${assistance.mobile?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] opacity-90 hover:opacity-100 group transition-all underline">
                                    <MessageCircle size={18} className="border border-white/20 p-1 rounded-sm group-hover:bg-white group-hover:text-[#94785C]" />
                                    <span>Chat on WhatsApp</span>
                                </a>
                                <div className="flex gap-3 text-[11px] opacity-80 leading-relaxed group">
                                    <MapPin size={18} className="shrink-0 border border-white/20 p-1 rounded-sm" />
                                    <div className="whitespace-pre-line">
                                        {assistance.address}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h4 className="text-[14px] font-bold tracking-[0.1em] mb-6 uppercase">FOLLOW US</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-[#94785C] transition-all"><Facebook size={18} /></a>
                                    <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-[#94785C] transition-all"><Youtube size={18} /></a>
                                    <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-[#94785C] transition-all"><Instagram size={18} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Link Row */}
                    <div className="flex flex-wrap justify-center gap-6 pb-12">
                        {[
                            { name: 'Resizing Policy', path: '/resizing-policy' },
                            { name: 'Track your order', path: '/track-order' },
                            { name: 'Payment Options', path: '/payment-options' },
                            { name: 'Corporate', path: '/corporate' },
                        ].map(item => (
                            <Link key={item.name} to={item.path} className="text-[11px] opacity-70 hover:opacity-100 underline">{item.name}</Link>
                        ))}
                    </div>

                    {/* Branding Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2">
                            <img src="/images/logo.svg" alt="Rare Jewels" className="h-12 brightness-0 invert opacity-90" />
                        </div>
                        <div className="text-[11px]">
                            {copyright}
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 md:h-6 bg-white px-2 py-1 rounded" alt="PayPal" />
                            <img src="/images/visa.svg" className="h-4 md:h-6 bg-white px-2 py-1 rounded" alt="Visa" />
                            <img src="/images/mastercard.svg" className="h-4 md:h-6 bg-white px-2 py-1 rounded" alt="Mastercard" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" className="h-4 md:h-6 bg-white px-2 py-1 rounded" alt="GPay" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" className="h-4 md:h-6 bg-white px-2 py-1 rounded" alt="ApplePay" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className='bg-[#E6E6E6] py-3 mb-10'>
                    <h2 className="text-[16px] font-bold text-center text-gray-800 tracking-widest uppercase">Popular Jewelry</h2>
                </div>
                <div className="container mx-auto px-4 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-6xl mx-auto">
                        {/* Left Column */}
                        <div className="space-y-10">
                            {categoriesFromSlice && categoriesFromSlice.slice(0, 3).map((cat) => (
                                <div key={cat._id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                                    <h4 className="text-[13px] font-bold text-gray-900 mb-4 uppercase tracking-wider">{cat.name}</h4>
                                    <div className="flex flex-wrap items-center text-[11px] leading-relaxed">
                                        {cat.sections?.flatMap(section => section.items).map((item, idx, arr) => (
                                            <React.Fragment key={item._id}>
                                                <Link 
                                                    to={`/shop?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}&product=${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                    className="text-gray-500 hover:text-[#94785C] transition-colors"
                                                >
                                                    {item.title}
                                                </Link>
                                                {idx < arr.length - 1 && <span className="text-gray-300 mx-2">|</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-10">
                            {categoriesFromSlice && categoriesFromSlice.slice(3, 6).map((cat) => (
                                <div key={cat._id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                                    <h4 className="text-[13px] font-bold text-gray-900 mb-4 uppercase tracking-wider">{cat.name}</h4>
                                    <div className="flex flex-wrap items-center text-[11px] leading-relaxed">
                                        {cat.sections?.flatMap(section => section.items).map((item, idx, arr) => (
                                            <React.Fragment key={item._id}>
                                                <Link 
                                                    to={`/shop?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}&product=${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                    className="text-gray-500 hover:text-[#94785C] transition-colors"
                                                >
                                                    {item.title}
                                                </Link>
                                                {idx < arr.length - 1 && <span className="text-gray-300 mx-2">|</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {(!categoriesFromSlice || categoriesFromSlice.length === 0) && (
                            <div className="col-span-full text-center py-10 text-gray-400 text-sm italic">
                                Loading popular collections...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
