import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { products } from '../data/products';
import { ChevronDown, ChevronUp, Search as SearchIcon, X, Info, Heart, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCurrency } from '../contexts/CurrencyContext';
const gem1 = "/images/gem-1.webp";
const gem2 = "/images/gem-2.webp";
const gem3 = "/images/gem-3.webp";
const gem4 = "/images/gem-4.webp";
const gem5 = "/images/gem-5.webp";
const gem6 = "/images/gem-6.webp";
const gem7 = "/images/gem-7.webp";
const gem8 = "/images/gem-8.webp";
const gem9 = "/images/gem-9.webp";
const gem10 = "/images/gem-10.webp";
const gem11 = "/images/gem-11.webp";
const gem12 = "/images/gem-12.webp";
const gem13 = "/images/gem-13.webp";
const gem14 = "/images/gem-14.webp";
const gem15 = "/images/gem-15.webp";
const gem16 = "/images/gem-16.webp";
const gem17 = "/images/gem-17.webp";
const gem18 = "/images/gem-18.webp";
const gem19 = "/images/gem-19.webp";
const gem20 = "/images/gem-20.webp";
const gem21 = "/images/gem-21.webp";
const gem22 = "/images/gem-22.webp";
const gem23 = "/images/gem-23.webp";
const gem24 = "/images/gem-24.webp";

import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getSimilarProducts } from '../redux/slices/productSlice';
import { getFilters } from '../redux/slices/filterSlice';

const ProductList = () => {
    // Custom Slider Component for Product Cards
    const ProductImageSlider = ({ product, navigate }) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const images = product.images || (product.image ? [{ url: product.image }] : []);

        const handlePrev = (e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        };

        const handleNext = (e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        };

        if (images.length === 0) return <div className="w-full h-full bg-gray-50 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105" />;

        return (
            <div className="relative w-full h-full flex items-center justify-center p-4">
                {/* Main Image */}
                <img
                    src={images[currentIndex]?.url}
                    alt={product.name}
                    className="max-w-[90%] max-h-[90%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    onClick={() => navigate(`/product/${product.id}`)}
                />

                {/* Left/Right Arrows - only visible on hover */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-10 bg-white/70 border border-gray-200 flex items-center justify-center rounded-sm opacity-0 group-hover/img:opacity-100 transition-all duration-300 hover:bg-white z-10"
                        >
                            <ChevronLeft size={16} strokeWidth={1.5} className="text-gray-500" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-10 bg-white/70 border border-gray-200 flex items-center justify-center rounded-sm opacity-0 group-hover/img:opacity-100 transition-all duration-300 hover:bg-white z-10"
                        >
                            <ChevronRight size={16} strokeWidth={1.5} className="text-gray-500" />
                        </button>

                        {/* Optional pagination dots */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity">
                            {images.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 h-1 rounded-full ${i === currentIndex ? 'bg-black' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    };

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const menuItemParam = searchParams.get('menuItem');
    const shapeIdParam = searchParams.get('shapeId');
    const featuredIdParam = searchParams.get('featuredId');
    const navigate = useNavigate();

    const { products: apiProducts, loading: apiProductsLoading, count: totalCount, similarProducts, similarLoading } = useSelector(state => state.product);
    const { filters: apiFilters, loading: filtersLoading } = useSelector(state => state.filter);

    useEffect(() => {
        dispatch(getFilters());
    }, [dispatch]);

    const [activeFilters, setActiveFilters] = useState({
        'Jewellery Types': [],
        'menuItem': [],
        'Price Range': [],
        'Metal Purity': [],
        'Gender': [],
        'Metal Weight': [],
        'Carat Weight': [],
        'Gemstone': [],
        'Gemstone Shape': [],
        'Jewellery Styles': [],
        'Collections': [],
        'Gemstone Quality': []
    });

    // Effect to handle URL params and set active filters
    useEffect(() => {
        if (!apiFilters) return;

        setActiveFilters(prev => {
            const newActiveFilters = { ...prev };

            // Handle Category
            if (categoryParam) {
                const cat = apiFilters.categories?.find(c => c._id === categoryParam || c.name === categoryParam);
                newActiveFilters['Jewellery Types'] = cat ? [cat.name] : [categoryParam];
            } else {
                newActiveFilters['Jewellery Types'] = [];
            }

            // Handle MenuItem
            if (menuItemParam) {
                newActiveFilters['menuItem'] = [menuItemParam];
            } else {
                newActiveFilters['menuItem'] = [];
            }

            // Handle Shape
            if (shapeIdParam) {
                const shape = apiFilters.diamondShapes?.find(s => s._id === shapeIdParam || s.name === shapeIdParam);
                if (shape) newActiveFilters['Gemstone Shape'] = [shape.name];
            } else {
                newActiveFilters['Gemstone Shape'] = [];
            }

            // Handle Featured/Collection
            if (featuredIdParam) {
                const featured = apiFilters.featureds?.find(f => f._id === featuredIdParam || f.name === featuredIdParam);
                if (featured) newActiveFilters['Collections'] = [featured.name];
            } else {
                newActiveFilters['Collections'] = [];
            }

            return newActiveFilters;
        });
    }, [categoryParam, menuItemParam, shapeIdParam, featuredIdParam, apiFilters]);

    const [openFilters, setOpenFilters] = useState({
        'Jewellery Types': true,
        'Price Range': true,
        'Metal Purity': true,
        'Gender': false,
        'Metal Weight': false,
        'Carat Weight': false,
        'Gemstone': true,
        'Gemstone Shape': false,
        'Jewellery Styles': false
    });

    const [sortBy, setSortBy] = useState('Arrives Earliest');

    useEffect(() => {
        if (!apiFilters) return;

        // Parse price range from activeFilters
        let minPrice = undefined;
        let maxPrice = undefined;
        if (activeFilters['Price Range']?.length > 0) {
            const range = activeFilters['Price Range'][0]; // Use first selected range
            if (range.includes('Below')) {
                minPrice = 0;
                maxPrice = 10000;
            } else if (range.includes('Above')) {
                minPrice = 200001;
            } else if (range.includes('-')) {
                const parts = range.replace(/₹|,/g, '').split('-').map(p => parseInt(p.trim()));
                minPrice = parts[0];
                maxPrice = parts[1];
            }
        }

        const sortMap = {
            'Best Seller': 'best-seller',
            'Arrives Earliest': 'newest',
            'Price Low To High': 'low-to-high',
            'Price High To Low': 'high-to-low'
        };

        const payload = {
            category: activeFilters['Jewellery Types']?.map(label => {
                const cat = apiFilters.categories?.find(c => c.name === label || c._id === label);
                return cat ? cat._id : label; // Use ID if found, otherwise assume label is already an ID
            }).filter(Boolean) || [],
            menuItem: activeFilters['menuItem'] || [],
            diamondType: activeFilters['Gemstone']?.map(label => apiFilters.diamondTypes?.find(g => g.name === label)?._id).filter(Boolean) || [],
            diamondShape: activeFilters['Gemstone Shape']?.map(label => apiFilters.diamondShapes?.find(s => s.name === label)?._id).filter(Boolean) || [],
            featured: activeFilters['Collections']?.map(label => apiFilters.featureds?.find(f => f.name === label)?._id).filter(Boolean) || [],
            metalType: activeFilters['Metal Purity']?.map(label => apiFilters.metalTypes?.find(m => m.name === label)?._id).filter(Boolean) || [],
            caratWeight: activeFilters['Carat Weight']?.map(label => apiFilters.caratWeights?.find(cw => cw.name === label)?._id).filter(Boolean) || [],
            gemstoneQuality: activeFilters['Gemstone Quality']?.map(label => apiFilters.gemstoneQualities?.find(g => g.name === label)?._id).filter(Boolean) || [],
            minPrice,
            maxPrice,
            sort: sortMap[sortBy] || 'newest',
            page: 1,
            limit: 20
        };

        // Handle initial URL params
        if (shapeIdParam && !payload.diamondShape.includes(shapeIdParam)) {
            payload.diamondShape.push(shapeIdParam);
        }
        if (featuredIdParam && !payload.featured.includes(featuredIdParam)) {
            payload.featured.push(featuredIdParam);
        }

        // Clean payload: remove empty arrays
        const filteredPayload = Object.fromEntries(
            Object.entries(payload).filter(([key, value]) => {
                if (Array.isArray(value)) return value.length > 0;
                return value !== undefined;
            })
        );

        dispatch(getProducts(filteredPayload));
    }, [dispatch, activeFilters, apiFilters, categoryParam, menuItemParam, shapeIdParam, featuredIdParam, sortBy]);

    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortOptions = ['Best Seller', 'Arrives Earliest', 'Price Low To High', 'Price High To Low'];

    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [quickViewTab, setQuickViewTab] = useState('RECOMMENDED');
    const [quickViewTabs, setQuickViewTabs] = useState(['RECOMMENDED']);

    useEffect(() => {
        if (quickViewProduct) {
            const cat = quickViewProduct.category;
            const gem = quickViewProduct.gemstone;
            setQuickViewTabs([
                'RECOMMENDED',
                `${gem} ${cat}`.toUpperCase(),
                `MORE ${cat}`.toUpperCase()
            ]);
            setQuickViewTab('RECOMMENDED');
        }
    }, [quickViewProduct]);

    useEffect(() => {
        if (quickViewProduct && quickViewTab && apiFilters) {
            const p = quickViewProduct.originalData;

            // Base payload as per user requirement
            const payload = {
                category: p?.category?._id || p?.category,
                excludeId: p?._id,
                limit: 10
            };

            // Custom additions for specific tabs if needed, 
            // but following the requested structure
            if (quickViewTab === 'RECOMMENDED') {
                payload.diamondType = p?.diamondType?._id || p?.diamondType;
            }

            dispatch(getSimilarProducts(payload));
        }
    }, [quickViewProduct, quickViewTab, dispatch, apiFilters]);

    const { toggleWishlist, isInWishlist } = useWishlist();

    const sliderRef = useRef(null);

    const scrollSimilar = (direction) => {
        if (sliderRef.current) {
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
            'menuItem': [],
            'Price Range': [],
            'Metal Purity': [],
            'Gender': [],
            'Metal Weight': [],
            'Carat Weight': [],
            'Gemstone': [],
            'Gemstone Shape': [],
            'Jewellery Styles': [],
            'Collections': [],
            'Gemstone Quality': []
        });
    };

    // Advanced Filtering and Sorting Logic
    const displayedProducts = useMemo(() => {
        if (!apiProducts || !Array.isArray(apiProducts)) return [];

        let items = apiProducts.map(p => ({
            id: p?._id,
            name: p?.title,
            price: p?.variants?.[0]?.price || 0,
            image: p?.variants?.[0]?.images?.[0]?.url || "",
            images: p?.variants?.[0]?.images || [],
            category: p?.category?.name || p?.category || "Jewellery",
            gemstone: p?.diamondType?.name || "Diamond",
            isApi: true,
            originalData: p
        }));

        // Client-side sorting as a fallback/reinforcement
        if (sortBy === 'Price Low To High') {
            return [...items].sort((a, b) => a.price - b.price);
        }
        if (sortBy === 'Price High To Low') {
            return [...items].sort((a, b) => b.price - a.price);
        }

        return items;
    }, [apiProducts, sortBy]);

    const { formatPrice } = useCurrency();

    const jewelleryTypes = useMemo(() => {
        if (!apiFilters?.categories) return [
            { name: 'Rings', count: 858 },
            { name: 'Pendants', count: 697 },
            { name: 'Earrings', count: 427 },
            { name: 'Necklaces', count: 148 },
            { name: 'Bracelets', count: 169 }
        ];
        return apiFilters.categories.map(cat => ({ name: cat.name, count: 0, id: cat._id }));
    }, [apiFilters]);

    const filterData = useMemo(() => {
        const baseFilterData = {
            'Price Range': [
                { label: `Below ${formatPrice(10000)}`, count: 26 },
                { label: `${formatPrice(10001)} - ${formatPrice(25000)}`, count: 136 },
                { label: `${formatPrice(25001)} - ${formatPrice(50000)}`, count: 281 },
                { label: `${formatPrice(50001)} - ${formatPrice(100000)}`, count: 351 },
                { label: `${formatPrice(100001)} - ${formatPrice(200000)}`, count: 320 },
                { label: `Above ${formatPrice(200001)}`, count: 210 }
            ],
            'Metal Purity': apiFilters?.metalTypes?.map(m => ({
                label: m.name,
                count: 0,
                icon: m.name.includes('14K') ? '14K' : m.name.includes('18K') ? '18K' : '9K',
                color: m.name.toLowerCase().includes('white') ? 'from-[#e2e2e4] to-[#c2c2c4]' : m.name.toLowerCase().includes('rose') ? 'from-[#eebb9f] to-[#d69672]' : 'from-[#eec874] to-[#ceaa55]',
                textColor: m.name.toLowerCase().includes('white') ? 'text-gray-600' : m.name.toLowerCase().includes('rose') ? 'text-[#6b3519]' : 'text-[#664917]'
            })) || [
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
            'Carat Weight': apiFilters?.caratWeights?.map(c => ({ label: c.name, count: 0 })) || [
                { label: '0.01 - 0.50', count: 243 },
                { label: '0.51 - 1.00', count: 235 },
                { label: '1.01 - 1.50', count: 97 },
                { label: '1.51 - 3.00', count: 108 },
                { label: 'Over 3.01', count: 43 }
            ],
            'Gemstone': apiFilters?.diamondTypes?.map(g => ({ label: g.name, count: 0 })) || [
                { label: 'Amethyst', count: 116, image: gem1 },
                { label: 'Aquamarine', count: 105, image: gem2 },
                { label: 'Black Onyx', count: 10, image: gem3 },
                { label: 'Blue Sapphire', count: 132, image: gem4 },
                { label: 'Citrine', count: 82, image: gem5 },
                { label: 'Diamond', count: 427, image: gem6 },
                { label: 'Emerald', count: 133, image: gem7 },
                { label: 'Enhanced Black Diamond', count: 10, image: gem8 },
                { label: 'Freshwater Cultured Pearl', count: 30, image: gem9 },
                { label: 'Garnet', count: 20, image: gem10 },
                { label: 'Lab Grown Blue Sapphire', count: 48, image: gem11 },
                { label: 'Lab Grown Diamond', count: 5, image: gem12 },
                { label: 'Lab Grown Emerald', count: 32, image: gem13 },
                { label: 'Lab Grown Ruby', count: 65, image: gem14 },
                { label: 'London Blue Topaz', count: 14, image: gem15 },
                { label: 'Opal', count: 21, image: gem16 },
                { label: 'Peridot', count: 54, image: gem17 },
                { label: 'Ruby', count: 56, image: gem18 },
                { label: 'Tanzanite', count: 27, image: gem19 },
                { label: 'Turquoise', count: 78, image: gem20 },
                { label: 'Natural Diamond', count: 25, image: gem21 },
                { label: 'Lapis Lazuli', count: 89, image: gem22 },
                { label: 'Tiger Eye', count: 97, image: gem23 },
                { label: 'Malachite', count: 91, image: gem24 },
            ],
            'Gemstone Shape': apiFilters?.diamondShapes?.map(s => ({
                label: s.name,
                count: 0,
                image: s.image?.url
            })) || [
                    { label: 'Asscher', count: 4, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><path d="M7 4h10l3 3v10l-3 3H7l-3-3V7l3-3z" /><path d="M9 8h6v8H9z" /></svg> },
                    { label: 'Baguette', count: 7, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[20px] text-gray-700"><rect x="7" y="3" width="10" height="18" rx="1" /><path d="M10 5v14M14 5v14" /></svg> },
                    { label: 'Cushion', count: 4, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 8l8 8M16 8l-8 8" /></svg> },
                    { label: 'Cushion Rectangular', count: 2, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[18px] text-gray-700"><rect x="5" y="3" width="14" height="18" rx="4" /><path d="M9 7l6 10M15 7l-6 10" /></svg> },
                    { label: 'Emerald Cut', count: 7, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[18px] text-gray-700"><path d="M8 3h8l3 3v12l-3 3H8l-3-3V6l-3-3z" /><path d="M10 6v12M14 6v12M7 8h10M7 16h10" /></svg> },
                    { label: 'Heart', count: 1, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px] text-gray-700"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /><path d="M12 10l-4 4M12 10l4 4" /></svg> },
                    { label: 'Marquise', count: 1, iconNode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[20px] text-gray-700"><path d="M12 2C6 8 6 16 12 22 18 16 18 8 12 2z" /><path d="M12 2v20M8 8l8 8M16 8l-8 8" /></svg> }
                ],
            'Collections': apiFilters?.featureds?.map(f => ({ label: f.name, count: 0, id: f._id })) || [],
            'Gemstone Quality': apiFilters?.gemstoneQualities?.map(g => ({ label: g.name, count: 0 })) || []
        };

        // Remove empty sections
        return baseFilterData;
    }, [apiFilters]);

    const filterSections = useMemo(() => Object.keys(filterData), [filterData]);


    const currentType = (activeFilters['Jewellery Types'] && activeFilters['Jewellery Types'][0]) || (activeFilters['menuItem'] && activeFilters['menuItem'][0]) || menuItemParam || 'Jewellery';
    const currentGems = activeFilters['Gemstone'].join(", ");
    const [isReadMore, setIsReadMore] = useState(false);

    const displayTitle = useMemo(() => {
        let title = currentType;
        if (currentType === 'Bracelets' || currentType === 'Bangles') title = 'Bangles & Bracelets';
        return currentGems ? `${currentGems} ${title}` : title;
    }, [currentGems, currentType]);

    const description = useMemo(() => {
        const type = activeFilters['Jewellery Types']?.[0] || '';
        const menuItem = activeFilters['menuItem']?.[0] || menuItemParam || '';

        if (type === 'Rings') {
            return `Drape a piece of luxury around your finger with handcrafted rings from Angara. Whether you’re a fan of dazzling diamonds or pretty pearls, you’re sure to find your new treasured possession in our collection. From vibrant designs embellished with coloured gemstones - rubies, emeralds, sapphires and beyond to bold statement pieces, we’ve got something for every style and personality. Plus, you can also personalise your favourite designs by choosing the gem quality, carat weight and metal. What’s more? You enjoy free insured shipping on every order.So, go ahead, cart your favourites now!`;
        }
        if (type === 'Earrings') {
            return `Rare Jewels earrings collection features a fascinating variety of designs and styles. From pretty studs to whimsical drops and bold hoops to exquisite danglers, we’ve got everything you need to elevate your ear game. And it’s not just the sparkling diamonds, we also have pieces embellished with lustrous pearls and colourful gemstones. Explore our marvellous selection now and treat yourself or your dearest ones to a stunning pair of earrings!`;
        }
        if (type === 'Necklaces' || type === 'Pendants') {
            return `Rare Jewels’s wide collection of exquisite necklaces is every jewellery lover’s dream come true. You’ll find elegant pearl strands and sparkly diamond necklaces that’ll steal your heart at the very first glance. That’s not all! We also have stunning coloured gemstone necklaces that have the power to boost your look (and mood). And for a personal touch, you can easily customise the necklace you like in just a few simple steps. So, why wait? Start shopping now!`;
        }
        if (type === 'Bracelets' || type === 'Bangles') {
            return `Discover the perfect blend of tradition and modernity with Angara’s Bangles and Bracelets collection. Handcrafted with precision, BIS hallmarked, and fully customisable, these pieces add elegance, charm, and sparkle to any ensemble.`;
        }
        if (menuItem === 'Gifts') {
            return `Looking for a match to celebrate something that deserves more than just a Facebook post? We've got your back! From birthdays, milestones, anniversaries and beyond, expect to find a piece to revive those butterflies in your stomach and let their hearts flutter in joy! So go, spoil them a'lil with extra sparkle— they deserve it!`;
        }
        if (menuItem === 'Collection' || menuItem === 'Explore') {
            return `From ear to finger, and everything in between – find your perfect match for every occasion, outfit, and mood right here! Rest assured, every piece of Angara jewellery is BIS Hallmarked, fully customisable, and authentic. Plus, enjoy a 15-day return policy and free shipping on every order.`;
        }

        return `Rare Jewels's ${currentGems ? currentGems.toLowerCase() : ''} ${currentType.toLowerCase()} for women are crafted to deliver timeless brilliance and everyday luxury. Each piece is meticulously designed to celebrate life's moments with elegance and style. Whether you're looking for diamonds, gemstones, or fine metals, our collection offers unparalleled quality and craftsmanship that lasts a lifetime.`;
    }, [activeFilters, currentGems, currentType, menuItemParam]);

    return (
        <div className="bg-white min-h-screen relative">
            {/* 1. TOP PROMO BANNER */}
            <div className="w-full relative bg-[#f1cdc6] h-[220px] md:h-[260px] overflow-hidden flex items-center justify-between">
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
                    <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Rare. Radiant. Real." />
                </div>
                <div className="w-full h-full z-10 flex items-center justify-center bg-gradient-to-r from-[#e49b94]/90 via-[#f1cdc6]/60 to-transparent">
                    <div className="text-center drop-shadow-sm px-4">
                        <h1 className="text-4xl md:text-6xl font-poppins text-white  mb-2 uppercase">
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
            <div className="container px-4 mx-auto">

                {/* 2. Breadcrumbs */}
                <div className="py-4 text-[10px] text-gray-500 uppercase">
                    <Link to="/" className="hover:text-black">Home</Link> <span className="mx-1">/</span>
                    <Link to="/shop" className="hover:text-black">Jewellery</Link> <span className="mx-1">/</span>
                    <span className="text-gray-400 cursor-default">{displayTitle}</span>
                </div>

                {/* 3. Title Section */}
                <div className="text-center py-6 mb-4">
                    <h1 className="text-2xl font-poppins text-gray-800 mb-2">{displayTitle}</h1>
                    <p className="text-[12px] text-gray-500 max-w-2xl mx-auto transition-all duration-300">
                        {isReadMore ? description : description.slice(0, 120) + '...'}
                        <button
                            onClick={() => setIsReadMore(!isReadMore)}
                            className="text-gray-800 underline ml-1 font-medium hover:text-black focus:outline-none"
                        >
                            {isReadMore ? 'Read Less' : 'Read More'}
                        </button>
                    </p>
                </div>

                <div className="border-t border-gray-200 w-full mb-6"></div>

                {/* 4. Filter Row / Top Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <div className="flex items-center gap-6 lg:w-1/4 xl:w-[22%]">
                        <span className="text-[13px] text-gray-800 font-medium">Filters</span>
                        <button onClick={clearAllFilters} className="text-[11px] text-gray-500 hover:text-gray-800 transition-colors uppercase ">Clear All</button>
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
                                                if (sortBy !== option) {
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
                                <span className="text-[13px] text-gray-800 font-medium uppercase">Jewellery Types</span>
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
                                    <span className="text-[13px] text-gray-800 font-medium uppercase">{sectionName}</span>
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

                                                        {item.image && (
                                                            <div className="w-[18px] h-[18px] rounded-full shadow-sm border border-black/10" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
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
                        {apiProductsLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-10 h-10 border-4 border-[#C8923C]/20 border-t-[#C8923C] rounded-full animate-spin"></div>
                                <p className="mt-4 text-sm text-gray-400">Loading exquisite shapes...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
                                {displayedProducts.length > 0 ? displayedProducts.map((product, idx) => (
                                    <div key={product.id} className="group cursor-pointer">
                                        <div className="relative aspect-square flex items-center justify-center bg-[#fcfcfc] mb-4 overflow-hidden group/img">
                                            <ProductImageSlider product={product} navigate={navigate} />

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
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.originalData || product, { type: 'product' }); }}
                                            >
                                                <Heart size={14} fill={isInWishlist(product.id, product.name) ? 'black' : 'none'} className={isInWishlist(product.id, product.name) ? 'text-black' : 'text-gray-400'} />
                                            </button>
                                        </div>
                                        <h3 className="text-[11px] text-gray-500 leading-snug mb-1 h-8 line-clamp-2">{product.name}</h3>
                                        <p className="text-[13px] text-gray-900 font-semibold">{formatPrice(product.price)}</p>
                                    </div>
                                )) : (
                                    <div className="col-span-3 py-20 text-center">
                                        <p className="text-gray-500 text-sm">No products found matching your filters.</p>
                                        <button onClick={clearAllFilters} className="mt-4 px-6 py-2 bg-black text-white text-[11px] font-bold uppercase ">Clear Filters</button>
                                    </div>
                                )}
                            </div>
                        )}
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
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => scrollSimilar('right')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-black z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity"
                            >
                                <ChevronRight size={16} />
                            </button>

                            <div ref={sliderRef} className="flex gap-4 px-2 py-2 min-w-max overflow-x-auto no-scrollbar scroll-smooth w-full">
                                {similarLoading ? (
                                    <div className="flex gap-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-[180px] h-[240px] bg-gray-50 animate-pulse rounded-sm"></div>
                                        ))}
                                    </div>
                                ) : similarProducts && similarProducts.length > 0 ? (
                                    similarProducts.map((p, idx) => (
                                        <div key={idx} className="w-[180px] flex-shrink-0 group cursor-pointer flex flex-col items-center p-4 bg-[#fcfcfc] border border-gray-100 hover:-translate-y-1 transition-transform duration-300" onClick={() => navigate(`/product/${p._id}`)}>
                                            <div className="relative aspect-square w-[130px] mb-4 flex items-center justify-center mix-blend-multiply overflow-hidden">
                                                <img src={p.variants?.[0]?.images?.[0]?.url} className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-500`} alt={p.title} />
                                                <button
                                                    className={`absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors z-20 bg-white shadow-sm border border-gray-100 hover:bg-gray-50`}
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p, { type: 'product' }); }}
                                                >
                                                    <Heart size={12} fill={isInWishlist(p._id, p.title) ? 'black' : 'none'} className={isInWishlist(p._id, p.title) ? 'text-black' : 'text-gray-400'} />
                                                </button>

                                                <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/product/${p._id}`); }}
                                                        className="w-full bg-[#1a1a1a] text-white py-1.5 text-[9px] font-bold uppercase hover:bg-gray-800 transition-colors"
                                                    >
                                                        Customize
                                                    </button>
                                                </div>
                                            </div>
                                            <h4 className="text-[10px] text-gray-500 leading-snug mb-2 line-clamp-2 w-full text-left">{p.title}</h4>
                                            <p className="text-[12px] text-gray-900 font-semibold w-full text-left">{formatPrice(p.variants?.[0]?.price)}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center w-full text-gray-400 text-sm italic">
                                        No similar products found in this category.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
