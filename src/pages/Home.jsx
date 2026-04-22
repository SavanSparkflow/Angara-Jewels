import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import { Heart, Star, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../hooks/useWishlist';
import { useCurrency } from '../contexts/CurrencyContext';
import VirtualAppointmentModal from '../components/VirtualAppointmentModal';
const Cartificate1 = "/images/cartificate_1.svg";
const Cartificate2 = "/images/cartificate_2.svg";
const Cartificate3 = "/images/cartificate_3.svg";
const Cartificate4 = "/images/cartificate_4.svg";
const BannerImg1 = "/images/banner_01.png";
const BannerImg2 = "/images/banner_02.png";
const BannerImg3 = "/images/banner_03.png";
const BannerImg4 = "/images/banner_04.png";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../redux/slices/bannerSlice';
import { getCollections } from '../redux/slices/collectionSlice';
import { getDiamondShapes } from '../redux/slices/diamondShapeSlice';
import { getProducts, getTrendingProducts } from '../redux/slices/productSlice';
import { getDiamondTypes } from '../redux/slices/diamondTypeSlice';
import { getBirthstones } from '../redux/slices/birthstoneSlice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { banners: apiBanners, loading: isBannersLoading } = useSelector(state => state.banner);
    const { celebrate: apiCelebrate, gifts: apiGifts, loading: isCollectionsLoading } = useSelector(state => state.collection);
    const { shapes: apiShapes, loading: isShapesLoading } = useSelector(state => state.diamondShape);
    const { products: apiProducts, trendingProducts: apiTrendingProducts, loading: isProductsLoading, trendingLoading: isTrendingLoading } = useSelector(state => state.product);
    const { diamondTypes: apiDiamondTypes, loading: isDiamondTypesLoading } = useSelector(state => state.diamondType);
    const { birthstones: apiBirthstones, loading: isBirthstonesLoading } = useSelector(state => state.birthstone);
    const { toggleWishlist, isInWishlist } = useWishlist();

    // Map API data to the banner structure or use empty array
    const heroBanners = apiBanners && apiBanners.length > 0 
        ? apiBanners.map(b => ({
            title: b.title || "",
            subtitle: b.subtitle || "",
            img: b.image?.url || "",
            link: b.linkCategory ? `/shop?cat=${b.linkCategory.toLowerCase()}` : ""
        })) 
        : [];

    const [trendingFilter, setTrendingFilter] = useState(''); // Store selected diamondType ID
    const [heroIndex, setHeroIndex] = useState(0);
    const [isVirtualModalOpen, setIsVirtualModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getBanners());
        dispatch(getCollections({ placement: 'celebrate' }));
        dispatch(getCollections({ placement: 'gifts' }));
        dispatch(getDiamondShapes());
        dispatch(getProducts({})); // Fetch products without payload
        dispatch(getDiamondTypes()); // Fetch diamond types for trending section
        dispatch(getBirthstones());
    }, [dispatch]);

    // Initial trending filter setup
    useEffect(() => {
        if (apiDiamondTypes?.length > 0 && !trendingFilter) {
            setTrendingFilter(apiDiamondTypes[0]._id);
        }
    }, [apiDiamondTypes, trendingFilter]);

    // Fetch trending products when filter changes
    useEffect(() => {
        if (trendingFilter) {
            dispatch(getTrendingProducts({ diamondType: [trendingFilter] }));
        }
    }, [dispatch, trendingFilter]);

    const handleCollectionClick = (id) => {
        navigate(`/shop?featuredId=${id}`);
    };

    useEffect(() => {
        if (heroBanners.length > 0) {
            const interval = setInterval(() => {
                setHeroIndex((prev) => (prev + 1) % heroBanners.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [heroBanners.length]);

    const diamondShapes = apiShapes && apiShapes.length > 0
        ? apiShapes.map(s => ({
            name: s.name,
            shape: s.image?.url,
            id: s._id
        }))
        : [];

    const celebrateCategories = apiCelebrate && apiCelebrate.length > 0
        ? apiCelebrate.map(c => ({
            name: c.name,
            img: c.image?.url || "",
            id: c._id
        }))
        : [];

    const giftsCategories = apiGifts && apiGifts.length > 0
        ? apiGifts.map(c => ({
            name: c.name,
            img: c.image?.url || "",
            id: c._id
        }))
        : [];

    const trendingFilters = apiDiamondTypes || [];

    const birthstones = apiBirthstones && apiBirthstones.length > 0
        ? apiBirthstones.map(b => ({
            month: b.month,
            stone: b.stoneName,
            image: b.image?.url
        }))
        : [];

    const customerReviews = [
        {
            rating: 4,
            text: "My experience with Rare Jewels has been incredible! Responses to my queries have been prompt, quality is top-notch.",
            name: "Monica Paul",
            image: "/images/review_1.png"
        },
        {
            rating: 5,
            text: "Right from the day of enquiry to the days after the delivery, the team was in constant touch for suggestions.",
            name: "Sudarshan Sridharan",
            image: "/images/review_2.png"
        },
        {
            rating: 5,
            text: "My fiancé and I recently bought an engagement ring online from Rare Jewels and had an amazing experience.",
            name: "Aroonabha Ghose",
            image: "/images/review_3.png"
        },
        {
            rating: 4,
            text: "It was a great shopping experience with Rare Jewels. The Product was up to the mark with regards quality.",
            name: "Anandita Gupta",
            image: "/images/review_4.png"
        },
    ];

    // Use API products for 'Trending Now' section
    const trendingProducts = apiTrendingProducts && apiTrendingProducts.length > 0
        ? apiTrendingProducts.map(p => ({
            id: p?._id,
            name: p?.title,
            price: p?.variants?.[0]?.price || 0,
            image: p?.variants?.[0]?.images?.[0]?.url || "",
            originalData: p
        }))
        : [];

    // Use API products for 'Most Loved' section
    const mostLovedProducts = apiProducts && apiProducts.length > 0
        ? apiProducts.map(p => ({
            id: p?._id,
            name: p?.title,
            price: p?.variants?.[0]?.price || 0,
            image: p?.variants?.[0]?.images?.[0]?.url || "",
            originalData: p
        }))
        : [];

    const { formatPrice, formatPriceRange: contextFormatPriceRange } = useCurrency();

    const formatPriceRange = (price) => {
        const low = price;
        const high = Math.round(price * 1.5);
        return contextFormatPriceRange(`${low} - ${high}`);
    };

    return (
        <div className="rare-home-v2">

            {/* ===================== PREMIUM HERO BANNER ===================== */}
            <section className="relative h-[650px] w-full bg-black overflow-hidden group">
                {heroBanners.length > 0 ? (
                    <div className="relative h-full w-full">
                        <AnimatePresence>
                            <motion.div
                                key={heroIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                {/* Full Background Image with Better Contrast Overlay */}
                                <div className="absolute inset-0 w-full h-full overflow-hidden">
                                    <motion.img 
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 10, ease: "linear" }}
                                        src={heroBanners[heroIndex].img} 
                                        alt={heroBanners[heroIndex].title} 
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Dual-layered overlay for depth and readability */}
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className="relative h-full container flex items-center justify-center text-center">
                                    <div className="max-w-3xl px-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.8 }}
                                        >
                                            <span className="text-white/80 text-[10px] sm:text-[11px] font-bold tracking-[0.5em] uppercase mb-4 block drop-shadow-md">
                                                Rare Jewels Collection
                                            </span>
                                        </motion.div>
                                        
                                        <motion.h1 
                                            initial={{ opacity: 0, y: 25 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6, duration: 0.8 }}
                                            className="unna-font text-white text-4xl sm:text-5xl md:text-7xl font-normal leading-tight mb-6 drop-shadow-lg"
                                        >
                                            {heroBanners[heroIndex].title}
                                        </motion.h1>

                                        <motion.p 
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8, duration: 0.8 }}
                                            className="text-white/90 text-lg sm:text-xl font-light italic mb-10 unna-font tracking-wide drop-shadow-md"
                                        >
                                            {heroBanners[heroIndex].subtitle}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1, duration: 0.5 }}
                                        >
                                            <Link 
                                                to={heroBanners[heroIndex].link || "/shop"} 
                                                className="inline-block bg-white text-black px-12 py-4 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-500 shadow-2xl"
                                            >
                                                Explore Collection
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Aesthetic Navigation Dots */}
                        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-20">
                            {heroBanners.map((_, i) => (
                                <button
                                    key={i}
                                    className={`group h-[2px] transition-all duration-500 relative ${heroIndex === i ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/50'}`}
                                    onClick={() => setHeroIndex(i)}
                                >
                                    <span className="absolute -top-4 left-0 w-full h-8 cursor-pointer"></span>
                                </button>
                            ))}
                        </div>

                        {/* Side Arrows - Visible on Hover */}
                        <button 
                            onClick={() => setHeroIndex((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
                            className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20 hidden md:block"
                        >
                            <span className="text-3xl font-light">←</span>
                        </button>
                        <button 
                            onClick={() => setHeroIndex((prev) => (prev + 1) % heroBanners.length)}
                            className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20 hidden md:block"
                        >
                            <span className="text-3xl font-light">→</span>
                        </button>
                    </div>
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-[#fdfaf7]">
                        <div className="w-16 h-[1px] bg-[#C8923C] mb-4"></div>
                        <span className="unna-font text-[#AD8868] text-2xl italic">No Banner Found</span>
                        <div className="w-16 h-[1px] bg-[#C8923C] mt-4"></div>
                    </div>
                )}
            </section>

            {/* ===================== SHOP BY DIAMOND (NEW) ===================== */}
            <section className="py-16">
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-2xl mb-12">Shop By Diamond Shape</h2>
                    {diamondShapes.length > 0 ? (
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            {diamondShapes.map((item, i) => (
                                <Link key={i} to={`/shop?shapeId=${item.id}`} className="group flex flex-col items-center gap-4">
                                    <img src={item.shape} alt={item.name} className="w-12 h-12" />
                                    <span className="text-sm font-medium text-[#475569]">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-[1px] bg-[#C8923C] mb-3"></div>
                            <span className="unna-font text-[#AD8868] text-xl italic">No Shape Found</span>
                            <div className="w-12 h-[1px] bg-[#C8923C] mt-3"></div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===================== CELEBRATE WITH RARE JEWELS ===================== */}
            <section className="pt-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl text-gray-900 leading-tight">Celebrate With Rare Jewels</h2>
                    </div>
                    {isCollectionsLoading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-8 h-8 border-2 border-[#AD8868] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : celebrateCategories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {celebrateCategories.map((cat, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleCollectionClick(cat.id)}
                                    className="group relative overflow-hidden block aspect-[4/5] cursor-pointer rounded-sm shadow-sm"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                                    </div>
                                    
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 text-center text-white">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="unna-font text-2xl mb-4 italic leading-tight">{cat.name}</h3>
                                            <div className="h-[1px] w-0 group-hover:w-full bg-white/60 mx-auto transition-all duration-700"></div>
                                            <button className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center gap-2 mx-auto text-[10px] uppercase tracking-[0.2em] font-bold">
                                                Explore Now <span className="text-lg">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-[1px] bg-[#C8923C] mb-3"></div>
                            <span className="unna-font text-[#AD8868] text-xl italic">No Collection Found</span>
                            <div className="w-12 h-[1px] bg-[#C8923C] mt-3"></div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===================== MOST LOVED ON RARE JEWELS (SWIPER) ===================== */}
            <section className="pt-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl text-gray-900 leading-tight">Most Loved on Rare Jewels</h2>
                    </div>
                    {isProductsLoading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-8 h-8 border-2 border-[#AD8868] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : mostLovedProducts.length > 0 ? (
                        <>
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                slidesPerView={1}
                                spaceBetween={20}
                                autoplay={{ delay: 4000 }}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 4 },
                                }}
                                className="product-slider relative pb-16"
                            >
                                {mostLovedProducts.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <div 
                                            className="group transition-all h-full bg-white relative rounded-xl overflow-hidden cursor-pointer shadow-md"
                                            onClick={() => navigate(`/product/${product.id}`)}
                                        >
                                                <button 
                                                    className={`absolute top-4 right-4 z-10 shadow-sm p-1.5 rounded-full transition-colors ${isInWishlist(product.id, product.name) ? 'bg-black text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
                                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.originalData || product, { type: 'product' }); }}
                                                >
                                                    <Heart size={16} fill={isInWishlist(product.id, product.name) ? "white" : "none"} />
                                                </button>
                                            <div className="relative aspect-square overflow-hidden mb-4 bg-[#F5F5F3]">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                            </div>
                                            <div className="text-center pb-4 px-2">
                                                <h3 className="text-[13px] font-medium mb-2 h-10 overflow-hidden line-clamp-2 text-gray-800">{product.name}</h3>
                                                <p className="text-[12px] text-gray-900 font-bold">{formatPriceRange(product.price)}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="flex justify-center mt-4">
                                <Link to="/shop" className="px-12 py-2.5 border border-gray-800 rounded text-[13px]  uppercase hover:bg-black hover:text-white transition-all">
                                    Discover
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-[1px] bg-[#C8923C] mb-3"></div>
                            <span className="unna-font text-[#AD8868] text-xl italic">No Products Found</span>
                            <div className="w-12 h-[1px] bg-[#C8923C] mt-3"></div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===================== PROPER BANNER (MINIMAL YET MEANINGFUL) ===================== */}
            <section className="pt-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* LEFT GRID OF 3 */}
                        <div className="grid grid-cols-2 gap-4">
                            <img src={BannerImg1} alt="Eternal Shine" className="w-full h-full object-contain" />
                            <img src={BannerImg2} alt="Pure Luxury" className="w-full h-full object-contain" />
                            <img src={BannerImg3} alt="Pure Brilliance" className="w-full col-span-2 object-contain" />
                        </div>
                        {/* RIGHT CONTENT SECTION */}
                        <img src={BannerImg4} alt="Pure Brilliance" className="w-full object-contain" />
                    </div>
                </div>
            </section>

            {/* ===================== POLICY FEATURED ICONS ===================== */}
            <section className="pt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
                        <div className="flex items-center flex-col gap-4 group">
                            <img src={Cartificate1} alt="BIS Hallmark" className="w-12 h-12" />
                            <span className="text-xs font-medium uppercase  text-[#475569]">BIS Hallmark</span>
                        </div>
                        <div className="flex items-center flex-col gap-4 group">
                            <img src={Cartificate2} alt="Free 15-Day Returns" className="w-12 h-12" />
                            <span className="text-xs font-medium uppercase  text-[#475569]">Free 15-Day Returns</span>
                        </div>
                        <div className="flex items-center flex-col gap-4 group">
                            <img src={Cartificate3} alt="Rare Certified" className="w-12 h-12" />
                            <span className="text-xs font-medium uppercase  text-[#475569]">Rare Jewels Certified</span>
                        </div>
                        <div className="flex items-center flex-col gap-4 group">
                            <img src={Cartificate4} alt="Lifetime Exchange" className="w-12 h-12" />
                            <span className="text-xs font-medium uppercase  text-[#475569]">Lifetime Exchange and Buyback</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== BOOK A VIRTUAL APPOINTMENT ===================== */}
            <section className="pt-16 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="relative min-h-[500px] flex items-center md:justify-start justify-center">
                        {/* High-res background with subtle overlay */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/images/virtual-consultation-v3.png"
                                alt="Professional Consultation"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Liquid-Design Floating Card */}
                        <div className="relative z-10 w-full max-w-[340px] md:max-w-xl lg:max-w-3xl bg-[#AD8868]/95 backdrop-blur-md p-8 md:ml-52 rounded-3xl text-white border border-white/20 shadow-2xl">
                            <h2 className="unna-font text-3xl md:text-4xl font-normal mb-2">
                                Book A Virtual Appointment
                            </h2>
                            <p className="text-sm md:text-md mb-10 font-normal text-white">
                                Book a personalized appointment to explore designs that match your
                                style. Let our experts guide you in finding or creating something truly special.
                            </p>
                            <button 
                                onClick={() => setIsVirtualModalOpen(true)}
                                className="w-full sm:w-auto bg-[#876548] text-white px-10 py-4 text-[13px] font-bold tracking-[0.2em] uppercase rounded shadow-xl hover:bg-black hover:transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== GIFTS THAT SAY IT ALL ===================== */}
            <section className="pt-16">
                <div className='container mx-auto px-4'>
                    <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl text-gray-900 leading-tight">Gifts That Say It All</h2>
                    </div>
                    {isCollectionsLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-[#AD8868] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : giftsCategories.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
                            {giftsCategories.map((cat, i) => (
                                <div key={i} onClick={() => handleCollectionClick(cat.id)} className="group flex flex-col items-center cursor-pointer">
                                    <div className="relative w-full aspect-square rounded-full overflow-hidden mb-6 p-2 border border-gray-100 group-hover:border-[#C8923C] transition-colors duration-500">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-[#F9F9F9]">
                                            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg text-gray-800 mb-1">{cat.name}</h3>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#AD8868] font-bold border-b border-transparent group-hover:border-[#AD8868] transition-all">Shop Gift</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-[1px] bg-[#C8923C] mb-3"></div>
                            <span className="unna-font text-[#AD8868] text-xl italic">No Collection Found</span>
                            <div className="w-12 h-[1px] bg-[#C8923C] mt-3"></div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===================== TRENDING NOW ===================== */}
            <section className="pt-20">
                <div className="container mx-auto px-4">
                   <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl text-gray-900 leading-tight">Trending Now</h2>
                    </div>

                    {/* Centered Tabs */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 min-h-[40px]">
                        {trendingFilters.map((filter) => (
                            <button
                                key={filter._id}
                                className={`pb-2 text-[11px] uppercase tracking-[0.2em] font-bold transition-all relative ${trendingFilter === filter._id ? 'text-black' : 'text-[#94a3b8] hover:text-black'}`}
                                onClick={() => setTrendingFilter(filter._id)}
                            >
                                {filter.name}
                                {trendingFilter === filter._id && (
                                    <motion.div
                                        layoutId="trending-tab-underline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CFAE8B]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={trendingFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative px-12"
                        >
                            {isTrendingLoading ? (
                                <div className="flex justify-center py-20">
                                    <div className="w-8 h-8 border-2 border-[#AD8868] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : trendingProducts.length > 0 ? (
                                <Swiper
                                    modules={[Autoplay]}
                                    slidesPerView={1}
                                    spaceBetween={20}
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    breakpoints={{
                                        640: { slidesPerView: 2 },
                                        1024: { slidesPerView: 4 },
                                    }}
                                    className="trending-swiper"
                                >
                                    {trendingProducts.map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <div 
                                                className="group border border-gray-100 flex flex-col h-full bg-white overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                                onClick={() => navigate(`/product/${product.id}`)}
                                            >
                                                <div className="relative aspect-square overflow-hidden bg-[#f8f9fb]">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                    <button 
                                                        className={`absolute top-3 right-3 z-10 shadow-sm p-1.5 rounded-full transition-colors ${isInWishlist(product.id, product.name) ? 'bg-black text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
                                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.originalData || product, { type: 'product' }); }}
                                                    >
                                                        <Heart size={14} fill={isInWishlist(product.id, product.name) ? "white" : "none"} />
                                                    </button>
                                                </div>
                                                <div className="p-4 text-center">
                                                    <h3 className="text-[13px] font-medium mb-2 h-10 overflow-hidden line-clamp-2 text-gray-800 tracking-wide">{product.name}</h3>
                                                    <p className="text-[12px] text-gray-400 font-medium">{formatPriceRange(product.price)}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-6">
                                    <div className="w-12 h-[1px] bg-[#C8923C] mb-3"></div>
                                    <span className="unna-font text-[#AD8868] text-xl italic">No Products Found</span>
                                    <div className="w-12 h-[1px] bg-[#C8923C] mt-3"></div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ===================== MAKE BIRTHDAYS MORE COLOURFUL ===================== */}
            <section className="pt-20">
                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl text-gray-900 leading-tight">Make Birthdays More Colourful</h2>
                    </div>

                    <div className="relative px-16 group">
                        <Swiper
                            modules={[Autoplay, FreeMode, Navigation, Pagination]}
                            slidesPerView={2}
                            spaceBetween={20}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            navigation={{
                                prevEl: '.birth-prev',
                                nextEl: '.birth-next',
                            }}
                            pagination={{
                                el: '.birth-pagination',
                                clickable: true,
                            }}
                            breakpoints={{
                                640: { slidesPerView: 4 },
                                1024: { slidesPerView: 7 },
                            }}
                            className="birthstone-swiper pb-16"
                        >
                            {isBirthstonesLoading ? (
                                <div className="flex justify-center items-center py-20 w-full col-span-full">
                                    <div className="w-8 h-8 border-2 border-[#AD8868] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : birthstones.length > 0 ? (
                                birthstones.map((stone, i) => (
                                    <SwiperSlide key={i}>
                                        <Link to={`/shop?month=${stone.month}`} className="group flex flex-col items-center">
                                            <div className="mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                                <img src={stone.image} alt={stone.stone} className="w-28 md:w-32 h-28 md:h-32 object-contain" />
                                            </div>
                                            <p className="text-[12px] font-medium text-[#1A1A1A] mb-1">{stone.month}</p>
                                            <p className="text-[11px] italic font-medium text-[#999999] opacity-80">{stone.stone}</p>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10 text-gray-500 italic">
                                    No birthstones found.
                                </div>
                            )}
                        </Swiper>

                        {/* Custom Navigation */}
                        <button className="birth-prev absolute left-0 top-[35%] -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors z-20 shadow-sm border border-gray-100">
                            <ChevronRight className="rotate-180" size={18} />
                        </button>
                        <button className="birth-next absolute right-0 top-[35%] -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors z-20 shadow-sm border border-gray-100">
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    {/* Custom Pagination Container */}
                    <div className="birth-pagination flex justify-center gap-2 mb-10 mt-5"></div>

                    {/* View All Button */}
                    <div className="flex justify-center pt-2">
                        <Link to="/shop" className="px-14 py-3 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-black hover:text-white transition-all duration-300">
                            View All
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===================== WHAT CUSTOMERS ARE SAYING ===================== */}
            <section className="pt-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl text-gray-900 leading-tight">What Customers are Saying</h2>
                    </div>
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={1}
                        spaceBetween={20}
                        autoplay={{ delay: 5000 }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="customer-reviews-swiper"
                    >
                        {customerReviews.map((review, i) => (
                            <SwiperSlide key={i}>
                                <div className="flex flex-col h-full bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-[260px] relative overflow-hidden">
                                        <img src={review.image} alt="Customer Wear" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6 flex flex-col items-center">
                                        <div className="flex justify-center gap-1 mb-4">
                                            {[...Array(5)].map((_, starI) => (
                                                <Star
                                                    key={starI}
                                                    size={14}
                                                    fill={starI < review.rating ? "#C8923C" : "none"}
                                                    color={starI < review.rating ? "#C8923C" : "#E5E7EB"}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-[13px] text-gray-500 mb-6 leading-relaxed line-clamp-3">
                                            {review.text} <span className="text-[#1a1a1a] font-bold underline cursor-pointer ml-1">Read more</span>
                                        </p>
                                        <h4 className="text-[13px] font-bold text-gray-900 mt-auto">{review.name}</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* ===================== SOCIAL MEDIA ===================== */}
            <section className="pt-20">
                <div className="rare-social-header">
                    <p className="rare-social-subtitle">Follow our journey <span>@RareJewelsIndia</span> as we</p>
                    <h2 className="rare-social-title">#CELEBRATEWITHCOLOUR</h2>
                </div>
                <div className="rare-social-grid">
                    <div className="rare-social-item">
                        <img src="/images/social-post-1.png" alt="Social Post 1" />
                    </div>
                    <div className="rare-social-item">
                        <img src="/images/social-post-2.png" alt="Social Post 2" />
                    </div>
                    <div className="rare-social-item">
                        <img src="/images/social-post-3.png" alt="Social Post 3" />
                    </div>
                </div>
            </section>

            <VirtualAppointmentModal 
                isOpen={isVirtualModalOpen} 
                onClose={() => setIsVirtualModalOpen(false)} 
            />

        </div>
    );
};

export default Home;
