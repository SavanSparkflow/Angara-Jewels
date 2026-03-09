import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [trendingFilter, setTrendingFilter] = useState('Lab Grown Diamond');
    const [mostLovedPage, setMostLovedPage] = useState(0);
    const [trendingPage, setTrendingPage] = useState(0);
    const [heroIndex, setHeroIndex] = useState(0);
    const [birthstonePage, setBirthstonePage] = useState(0);
    const [editPage, setEditPage] = useState(0);

    const heroBanners = [
        {
            title: "ARTISTRY IN EVERY FACET",
            subtitle: "Expertly designed lab-grown jewellery.",
            img: "/images/hero-banner.png"
        },
        {
            title: "RADIANT EXCELLENCE",
            subtitle: "Discover the brilliance of rare diamonds.",
            img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
        },
        {
            title: "COLOURS OF LOVE",
            subtitle: "Vibrant gemstones that tell your story.",
            img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    // ==================== DATA ====================

    const celebrateCategories = [
        { name: "Engagement Rings", img: "/images/engagement-ring.png" },
        { name: "Men's Jewellery", img: "/images/mens-jewellery.png" },
        { name: "Gardens at Twilight", img: "/images/gardens-twilight.png" },
        { name: "Bridal Jewellery", img: "/images/bridal-jewellery.png" },
    ];

    const giftsCategories = [
        { name: "Solitaire Jewellery", img: "/images/solitaire-jewellery.png" },
        { name: "Initials Jewellery", img: "/images/initials-jewellery.png" },
        { name: "Heart Jewellery", img: "/images/heart-jewellery.png" },
        { name: "Smart Watch Charm", img: "/images/smartwatch-charm.png" },
    ];

    const trendingFilters = [
        'Lab Grown Diamond', 'Aquamarine', 'Natural Diamond', 'Blue Sapphire', 'London Blue Topaz'
    ];

    const birthstones = [
        { month: "December", stone: "Tanzanite", color: "#6B5BD2", gradient: "linear-gradient(135deg, #6B5BD2 0%, #9B8FE8 50%, #4A3AB0 100%)" },
        { month: "January", stone: "Garnet", color: "#8B1A1A", gradient: "linear-gradient(135deg, #C62828 0%, #8B1A1A 50%, #E53935 100%)" },
        { month: "February", stone: "Amethyst", color: "#7B1FA2", gradient: "linear-gradient(135deg, #9C27B0 0%, #7B1FA2 50%, #BA68C8 100%)" },
        { month: "March", stone: "Aquamarine", color: "#4FC3F7", gradient: "linear-gradient(135deg, #4FC3F7 0%, #81D4FA 50%, #29B6F6 100%)" },
        { month: "April", stone: "Diamond", color: "#E0E0E0", gradient: "linear-gradient(135deg, #FAFAFA 0%, #E0E0E0 30%, #FFFFFF 50%, #BDBDBD 100%)" },
        { month: "May", stone: "Emerald", color: "#2E7D32", gradient: "linear-gradient(135deg, #43A047 0%, #2E7D32 50%, #66BB6A 100%)" },
        { month: "June", stone: "Pearl", color: "#F5F5F5", gradient: "linear-gradient(135deg, #FAFAFA 0%, #E8E8E8 30%, #FFFFFF 60%, #F0E6D8 100%)" },
    ];

    const editorials = [
        {
            img: "/images/edit-sapphire.png",
            title: "How Rare Jewels Helps You Personalise Jewellery With Meaningful Details",
            link: "Read & Shop"
        },
        {
            img: "/images/edit-diamond.png",
            title: "1 Carat Diamond Price in India 2026: Latest Trends and Buying Advice",
            link: "Read & Shop"
        },
        {
            img: "/images/edit-gemstone.png",
            title: "CVD vs HPHT Lab-Grown Diamonds: Which One is Better?",
            link: "Read & Shop"
        },
        {
            img: "/images/edit-sapphire.png",
            title: "The Ultimate Guide to Choosing Your Engagement Ring",
            link: "Read & Shop"
        },
        {
            img: "/images/edit-diamond.png",
            title: "Why Color Stones are the New Trend in Bridal Jewelry",
            link: "Read & Shop"
        },
        {
            img: "/images/edit-gemstone.png",
            title: "The Legacy of Fine Jewelry Craftsmanship in India",
            link: "Read & Shop"
        }
    ];

    const customerReviews = [
        {
            img: "/images/review-1.png",
            rating: 4,
            text: "My experience with Rare Jewels has been incredible! Responses to my queries have been prompt, cust...",
            name: "Monica Paul"
        },
        {
            img: "/images/review-2.png",
            rating: 5,
            text: "Right from the day of enquiry to the days after the delivery, the team was in constant touch for sugge...",
            name: "Sudarshan Sridharan"
        },
        {
            img: "/images/review-3.png",
            rating: 5,
            text: "My fiancé and I recently bought an engagement ring online from Rare Jewels and had an amazing ex...",
            name: "Aroonabha Ghose"
        },
        {
            img: "/images/review-4.png",
            rating: 5,
            text: "It was a great shopping experience with Rare Jewels. The Product was upto the mark with regards quality, weig...",
            name: "Anandita Gupta"
        },
    ];

    const trendingProducts = products.filter(p => p.isTrending).slice(0, 8);
    const mostLovedProducts = products.filter(p => p.isTrending || p.isNew).slice(0, 8);
    const totalMostLovedPages = Math.ceil(mostLovedProducts.length / 4);
    const totalTrendingPages = Math.ceil(trendingProducts.length / 4);
    const totalBirthstonePages = Math.ceil(birthstones.length / 4);
    const totalEditPages = Math.ceil(editorials.length / 3);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroBanners.length);
            setMostLovedPage((prev) => (prev + 1) % totalMostLovedPages);
            setTrendingPage((prev) => (prev + 1) % totalTrendingPages);
            setBirthstonePage((prev) => (prev + 1) % totalBirthstonePages);
            setEditPage((prev) => (prev + 1) % totalEditPages);
        }, 5000); // 5 seconds interval for all auto sliders
        return () => clearInterval(interval);
    }, [totalMostLovedPages, totalTrendingPages, totalBirthstonePages, totalEditPages]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatPriceRange = (price) => {
        const low = formatPrice(price);
        const high = formatPrice(Math.round(price * 1.5));
        return `${low} - ${high}`;
    };

    // Render star rating
    const renderStars = (rating) => {
        return (
            <div className="rare-stars">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < rating ? 'star-filled' : 'star-empty'}
                        fill={i < rating ? '#C8923C' : 'none'}
                        stroke={i < rating ? '#C8923C' : '#ccc'}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="rare-home">

            {/* ===================== HERO BANNER ===================== */}
            <section className="rare-hero relative min-h-[600px] overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={heroIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full h-full absolute inset-0"
                    >
                        <div className="rare-hero-inner h-full flex flex-col md:flex-row mx-auto px-6 relative">
                            <div className="rare-hero-content w-full md:w-1/2 flex flex-col justify-center h-full z-10 pt-20 pb-10">
                                <h1 className="rare-hero-title">
                                    {heroBanners[heroIndex].title}
                                </h1>
                                <p className="rare-hero-subtitle">
                                    {heroBanners[heroIndex].subtitle}
                                </p>
                                <Link to="/shop" className="rare-hero-btn">
                                    SHOP NOW
                                </Link>
                            </div>
                            <div className="rare-hero-image w-full md:w-1/2 flex items-center justify-center p-8">
                                <img src={heroBanners[heroIndex].img} alt={heroBanners[heroIndex].title} className="object-cover" />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
                    {heroBanners.map((_, i) => (
                        <button
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${heroIndex === i ? 'bg-black w-6' : 'bg-gray-400 w-2'}`}
                            onClick={() => setHeroIndex(i)}
                        />
                    ))}
                </div>
            </section>

            {/* ===================== PROMO BANNER ===================== */}
            <section className="rare-promo-bar">
                <p>FLAT 5% OFF WITH CODE 'CELEBRATE' | FREE 15-DAY RETURNS | LIFETIME EXCHANGE</p>
            </section>

            {/* ===================== TRUST BADGES ===================== */}
            <section className="rare-trust-badges">
                <div className="rare-trust-inner">
                    <div className="rare-trust-item">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        <span>BIS Hallmark</span>
                    </div>
                    <div className="rare-trust-item">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
                        <span>Free 15-Day Returns</span>
                    </div>
                    <div className="rare-trust-item">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" /></svg>
                        <span>Rare Jewels Certified</span>
                    </div>
                    <div className="rare-trust-item">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        <span>Lifetime Exchange and Buyback</span>
                    </div>
                </div>
            </section>

            {/* ===================== CELEBRATE WITH RARE JEWELS ===================== */}
            <section className="rare-section">
                <h2 className="rare-section-title">Celebrate With Rare Jewels</h2>
                <div className="rare-category-grid">
                    {celebrateCategories.map((cat, i) => (
                        <Link key={i} to="/shop" className="rare-category-card">
                            <div className="rare-category-image">
                                <img src={cat.img} alt={cat.name} />
                            </div>
                            <div className="rare-category-label">
                                <span>{cat.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===================== MOST LOVED ON RARE JEWELS ===================== */}
            <section className="rare-section">
                <h2 className="rare-section-title">Most Loved on Rare Jewels</h2>
                <div className="rare-products-carousel overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={mostLovedPage}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="rare-products-grid"
                        >
                            {mostLovedProducts.slice(mostLovedPage * 4, mostLovedPage * 4 + 4).map((product) => (
                            <div key={product.id} className="rare-product-item">
                                <div className="rare-product-image-wrap group overflow-hidden">
                                    <button className="rare-wishlist-btn z-10">
                                        <Heart size={18} strokeWidth={1.5} />
                                    </button>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.image} alt={product.name} className="rare-product-img transition-transform duration-700 group-hover:scale-105" />
                                    </Link>

                                    {/* Customize Button on Hover */}
                                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                        <button className="w-full bg-black text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg">
                                            Customize
                                        </button>
                                    </div>
                                </div>
                                <div className="rare-product-info">
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="rare-product-name">{product.name}</h3>
                                    </Link>
                                    <p className="rare-product-price">{formatPriceRange(product.price)}</p>
                                </div>
                            </div>
                        ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="rare-carousel-dots">
                    {Array.from({ length: totalMostLovedPages }).map((_, i) => (
                        <button
                            key={i}
                            className={`rare-dot ${mostLovedPage === i ? 'active' : ''}`}
                            onClick={() => setMostLovedPage(i)}
                        />
                    ))}
                </div>
                <div className="rare-discover-btn-wrap">
                    <Link to="/shop" className="rare-discover-btn">Discover</Link>
                </div>
            </section>

            {/* ===================== CRAFTSMANSHIP SECTION ===================== */}
            <section className="rare-craftsmanship">
                <div className="rare-craft-inner">
                    <div className="rare-craft-image">
                        <img src="/images/craftsmanship.png" alt="Master Indian Artisans" />
                    </div>
                    <div className="rare-craft-content">
                        <h2 className="rare-craft-title">
                            Exceptional Craftsmanship, Handcrafted with Heart & Heritage
                        </h2>
                        <p className="rare-craft-byline">by Master Indian Artisans</p>
                        <p className="rare-craft-text">
                            Your vision inspires our craft — from sketch to sparkle, every jewel is crafted with precision to bring dreams alive!
                        </p>
                    </div>
                </div>
            </section>

            {/* ===================== GIFTS THAT SAY IT ALL ===================== */}
            <section className="rare-section">
                <h2 className="rare-section-title">Gifts That Say It All</h2>
                <div className="rare-category-grid">
                    {giftsCategories.map((cat, i) => (
                        <Link key={i} to="/shop" className="rare-category-card">
                            <div className="rare-category-image">
                                <img src={cat.img} alt={cat.name} />
                            </div>
                            <div className="rare-category-label">
                                <span>{cat.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===================== TRENDING NOW ===================== */}
            <section className="rare-section">
                <h2 className="rare-section-title">Trending Now</h2>
                <div className="rare-filter-tabs">
                    {trendingFilters.map((filter) => (
                        <button
                            key={filter}
                            className={`rare-filter-tab ${trendingFilter === filter ? 'active' : ''}`}
                            onClick={() => { setTrendingFilter(filter); setTrendingPage(0); }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="rare-products-carousel overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={trendingPage}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="rare-products-grid"
                        >
                            {trendingProducts.slice(trendingPage * 4, trendingPage * 4 + 4).map((product) => (
                            <div key={product.id} className="rare-product-item">
                                <div className="rare-product-image-wrap group overflow-hidden">
                                    <button className="rare-wishlist-btn z-10">
                                        <Heart size={18} strokeWidth={1.5} />
                                    </button>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.image} alt={product.name} className="rare-product-img transition-transform duration-700 group-hover:scale-105" />
                                    </Link>

                                    {/* Customize Button on Hover */}
                                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                        <button className="w-full bg-black text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg">
                                            Customize
                                        </button>
                                    </div>
                                </div>
                                <div className="rare-product-info">
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="rare-product-name">{product.name}</h3>
                                    </Link>
                                    <p className="rare-product-price">{formatPriceRange(product.price)}</p>
                                </div>
                            </div>
                        ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="rare-carousel-dots">
                    {Array.from({ length: totalTrendingPages }).map((_, i) => (
                        <button
                            key={i}
                            className={`rare-dot ${trendingPage === i ? 'active' : ''}`}
                            onClick={() => setTrendingPage(i)}
                        />
                    ))}
                </div>
            </section>

            {/* ===================== MAKE BIRTHDAYS MORE COLOURFUL ===================== */}
            <section className="rare-section rare-birthstone-section overflow-hidden">
                <h2 className="rare-section-title">Make Birthdays More Colourful</h2>
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={birthstonePage}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="rare-birthstone-grid p-2"
                    >
                        {birthstones.slice(birthstonePage * 4, birthstonePage * 4 + 4).map((stone, i) => (
                            <Link key={i} to="/shop" className="rare-birthstone-item">
                                <div className="rare-birthstone-circle" style={{ background: stone.gradient }}>
                                    <div className="rare-birthstone-shine"></div>
                                </div>
                                <p className="rare-birthstone-month">{stone.month}</p>
                                <p className="rare-birthstone-name">{stone.stone}</p>
                            </Link>
                        ))}
                    </motion.div>
                </AnimatePresence>
                <div className="rare-carousel-dots mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalBirthstonePages }).map((_, i) => (
                        <button
                            key={i}
                            className={`rounded-full transition-all duration-300 ${birthstonePage === i ? 'bg-[#c8923c] w-6 h-2' : 'bg-gray-300 w-2 h-2'}`}
                            onClick={() => setBirthstonePage(i)}
                        />
                    ))}
                </div>
                <div className="rare-discover-btn-wrap mt-6">
                    <Link to="/shop" className="rare-discover-btn">View All</Link>
                </div>
            </section>

            {/* ===================== THE EDIT ===================== */}
            <section className="rare-section overflow-hidden">
                <h2 className="rare-section-title">The Edit</h2>
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={editPage}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="rare-edit-grid"
                    >
                        {editorials.slice(editPage * 3, editPage * 3 + 3).map((item, i) => (
                            <Link key={i} to="/shop" className="rare-edit-card block">
                                <div className="rare-edit-image overflow-hidden">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                                </div>
                                <div className="rare-edit-info mt-4">
                                    <h3 className="rare-edit-title text-[14px] leading-relaxed mb-3">{item.title}</h3>
                                    <span className="rare-edit-link text-[11px] font-bold uppercase tracking-widest text-black flex items-center gap-1">
                                        {item.link}
                                        <ChevronRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </AnimatePresence>
                <div className="rare-carousel-dots mt-10 flex justify-center gap-2">
                    {Array.from({ length: totalEditPages }).map((_, i) => (
                        <button
                            key={i}
                            className={`rounded-full transition-all duration-300 ${editPage === i ? 'bg-black w-6 h-2' : 'bg-gray-300 w-2 h-2'}`}
                            onClick={() => setEditPage(i)}
                        />
                    ))}
                </div>
                <div className="rare-discover-btn-wrap mt-6">
                    <Link to="/shop" className="rare-discover-btn">Explore</Link>
                </div>
            </section>

            {/* ===================== WHAT CUSTOMERS ARE SAYING ===================== */}
            <section className="rare-section">
                <h2 className="rare-section-title">What Customers are Saying</h2>
                <div className="rare-reviews-grid">
                    {customerReviews.map((review, i) => (
                        <div key={i} className="rare-review-card">
                            <div className="rare-review-image">
                                <img src={review.img} alt={`Review by ${review.name}`} />
                            </div>
                            <div className="rare-review-content">
                                {renderStars(review.rating)}
                                <p className="rare-review-text">
                                    {review.text} <button className="rare-readmore">Read more</button>
                                </p>
                                <p className="rare-review-name">{review.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
