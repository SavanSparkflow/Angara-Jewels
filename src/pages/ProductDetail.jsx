import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useLogin } from '../contexts/LoginContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, Plus, Minus, X, Info, Tag, ShieldCheck, Truck, RotateCcw, Award, Maximize, Star } from 'lucide-react';

const customerReviews = [
    {
        id: 1, initial: 'S', name: 'Susan C.', verified: true, rating: 5,
        title: 'Holy smokes', text: 'These earrings are incredible. First of all, they are huge. And they are beautiful!! It is really nice to have these earrings that are really gorgeous and also did not make me take out a second mortgage They are truly lovely and would be a great asset to any person\'s jewelry collection.',
        helpful: 1, unhelpful: 0
    },
    {
        id: 2, initial: 'J', name: 'Jon T.', verified: true, rating: 5,
        title: 'Great Earrings', text: 'Certified Diamond, High Quality, with plenty of Sparkle!!',
        helpful: 3, unhelpful: 0
    },
    {
        id: 3, initial: 'S', name: 'Sandra S.', verified: true, rating: 5,
        title: 'The beautiful Len gown earrings sparkling', text: 'The earrings are gorgeous they fit so comfortably they sparkly so gorgeous! 💕',
        helpful: 1, unhelpful: 0
    },
    {
        id: 4, initial: 'D', name: 'David B.', verified: true, rating: 5,
        title: 'Top marks all round', text: 'I\'ve now made two purchases and one exchange, and everything about the experience has been flawless. The quality of the end product is perfect. The gift packaging is the best I\'ve ever seen. The exchange process was quick and painless, and Sankit was very engaging and supportive. I highly recommend to anyone looking to purchase high-end jewelry!',
        helpful: 0, unhelpful: 0
    },
    {
        id: 5, initial: 'A', name: 'Andrew G.', verified: true, rating: 5,
        title: 'Beautiful earring, perfect gift for anniversary.', text: 'Absolutely beautiful earrings. My wife was over the moon. The box even lights up when you open. She has received tons of compliments over her first couple of days.',
        helpful: 1, unhelpful: 0
    },
    {
        id: 6, initial: 'M', name: 'Mark D.', verified: true, rating: 5,
        title: 'Beautiful!', text: 'I couldn\'t be happier with my new diamond stud earrings! The quality of the diamonds is absolutely stunning-they sparkle beautifully in every light. The craftsmanship of the setting is impeccable, and they feel secure yet lightweight, perfect for daily wear or special occasions. Shipping was quick, and the earrings came in a gorgeous box that made the unboxing feel extra special. These are timeless, elegant pieces that I\'ll cherish forever. Highly recommend to anyone looking for a classy and versatile accessory!',
        helpful: 1, unhelpful: 0
    },
    {
        id: 7, initial: 'J', name: 'Joyce G.', verified: true, rating: 5,
        title: 'Breathtaking!', text: 'Spectacular large diamond studs. Love them. Clasp holds them secure and short post keeps them from drooping downward.',
        helpful: 0, unhelpful: 0
    },
    {
        id: 8, initial: 'G', name: 'Gerard J.', verified: true, rating: 5,
        title: 'Outstanding Quality', text: 'Bought these as an anniversary present for my wife and she was thrilled with the Cut & Brilliance of the Diamond Studs. We will be purchasing more jewelry from Angara!',
        helpful: 6, unhelpful: 2
    },
    {
        id: 9, initial: 'C', name: 'Carrie Z.', verified: true, rating: 5,
        title: 'Earrings were beautiful', text: 'The ordering process was easy. The delivery was quick and seamless. Presentation of the product was top notch. The light in the jewel box was a nice surprise. Earrings are exactly what we were shopping for.',
        helpful: 2, unhelpful: 2
    }
];

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { openLogin, isLoggedIn } = useLogin();
    const navigate = useNavigate();

    // UI States
    const [selectedMetal, setSelectedMetal] = useState('14K White Gold');
    const [selectedSize, setSelectedSize] = useState('14');
    const [isEngravingOpen, setIsEngravingOpen] = useState(false);
    const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const [isSimilarDrawerOpen, setIsSimilarDrawerOpen] = useState(false);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [sizeGuideStep, setSizeGuideStep] = useState(1);

    // Review Form State
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [reviewForm, setReviewForm] = useState({ score: 0, title: '', review: '' });
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const availableSlots = 4 - uploadedImages.length;
        if (availableSlots <= 0) return;

        const newImages = files.slice(0, availableSlots).map(file => URL.createObjectURL(file));
        setUploadedImages(prev => [...prev, ...newImages]);
        e.target.value = ''; // Reset input
    };

    const removeImage = (indexToRemove) => {
        setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const galleryImages = [
        product?.image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
        product?.image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800", // Detail
        "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=800", // Lifestyle
        { type: 'video', thumb: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400" }, // Mock Video 1
        { type: 'video', thumb: "https://images.unsplash.com/photo-1588444837495-c6cfcb535390?auto=format&fit=crop&q=80&w=400" }, // Mock Video 2
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", // Box
    ];

    const openGallery = (index) => {
        setActiveGalleryIndex(index);
        setIsGalleryOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = () => {
        setIsGalleryOpen(false);
        document.body.style.overflow = 'unset';
    };

    // Accordion States
    const [detailsOpen, setDetailsOpen] = useState(true);
    const [priceBreakUpOpen, setPriceBreakUpOpen] = useState(false);
    const [originOpen, setOriginOpen] = useState(false);

    // Similar Products State
    const [similarTab, setSimilarTab] = useState('Recommended');
    const sliderRef = React.useRef(null);

    const scrollSimilar = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 300;
            sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Mock loading / matching product
    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else if (products.length > 0) {
            // Fallback to first if not found (for demo purposes)
            setProduct({
                ...products[0],
                id: parseInt(id) || 999, // Ensure it has a numerical ID even in fallback
                name: "Amaryllis Scalloped Shank Ring",
                price: 594657,
                originalPrice: 625955
            });
        }
    }, [id]);

    if (!product) return <div className="min-h-screen animate-pulse bg-gray-50" />;

    // Helper formatting
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const displayPrice = 594657;
    const originalPrice = 625955;

    return (
        <div className="bg-white min-h-screen pt-10 pb-20">
            {/* Top Breadcrumb */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-6">
                <nav className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                    <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-gray-900 transition-colors">Jewellery</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-gray-900 transition-colors">Rings</Link>
                    <span>/</span>
                    <span className="text-gray-400">Amaryllis Scalloped Shank Ring</span>
                </nav>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12">
                {/* LEFT: Image Grid (2x2 + extras) */}
                <div className="w-full lg:w-[60%]">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Image 1 */}
                        <div
                            onClick={() => openGallery(0)}
                            className="bg-[#fcfcfc] aspect-square flex flex-col items-center justify-center p-8 border border-gray-100 relative group cursor-pointer"
                        >
                            <img src={galleryImages[0]} alt="Angle 1" className="w-[85%] h-[85%] object-contain mix-blend-multiply" />

                            {/* Maximize Icon for Similar Products */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsSimilarDrawerOpen(true);
                                }}
                                className="absolute bottom-12 left-4 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-all rounded-sm z-30 shadow-sm"
                            >
                                <Maximize size={12} />
                            </button>

                            <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-gray-500 font-medium mt-4">
                                Selected : Best | 0.89 Ct.tw | 14K White Gold
                            </div>
                        </div>
                        {/* Image 2 */}
                        <div
                            onClick={() => openGallery(1)}
                            className="bg-[#fcfcfc] aspect-square flex items-center justify-center p-8 border border-gray-100 cursor-pointer"
                        >
                            <img src={galleryImages[1]} alt="Angle 2" className="w-[85%] h-[85%] object-contain mix-blend-multiply flex scale-x-[-1]" />
                        </div>
                        {/* Image 3 */}
                        <div
                            onClick={() => openGallery(2)}
                            className="bg-[#fcfcfc] aspect-square flex items-center justify-center p-8 border border-gray-100 cursor-pointer"
                        >
                            <img src={galleryImages[2]} alt="Angle 3" className="w-[85%] h-[85%] object-contain mix-blend-multiply rotate-180" />
                        </div>
                        {/* Image 4 (Hand/Model) */}
                        <div
                            onClick={() => openGallery(3)}
                            className="bg-[#fcfcfc] aspect-square flex items-center justify-center border border-gray-100 overflow-hidden cursor-pointer"
                        >
                            <img src={galleryImages[3]} alt="On Hand" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* RIGHT: Product Info Sticky Panel */}
                <div className="w-full lg:w-[40%]">
                    <div className="sticky top-28 pl-0 lg:pl-6">
                        {/* Title & Price */}
                        <h1 className="text-2xl text-gray-900 mb-2 font-poppins font-medium leading-tight tracking-[0.02em]">
                            Amaryllis Scalloped Shank Ring
                        </h1>

                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-[22px] font-bold text-gray-900">{formatPrice(displayPrice)}</span>
                            <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
                            <span className="text-[10px] text-gray-500 font-medium">(MRP Incl. of all taxes)</span>
                        </div>

                        <div className="text-[12px] text-[#2ebd59] font-medium mb-4">
                            Exclusive Offer: Flat 5% Off*
                        </div>

                        {/* Promo Banner */}
                        <div className="bg-[#fff9f0] p-3 flex items-center gap-3 mb-8">
                            <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">%</div>
                            <span className="text-[11px] text-gray-800 font-medium tracking-wide">Use code CELEBRATE for extra 5% off*</span>
                        </div>

                        {/* Metal Selection */}
                        <div className="mb-8 border-t border-gray-100 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[13px] text-gray-800">Metal Type: <span className="font-semibold">{selectedMetal}</span></span>
                                <button onClick={() => setIsCompareOpen(true)} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-800 transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                    Compare
                                </button>
                            </div>
                            <div className="flex gap-4">
                                {/* 14K Button */}
                                <button onClick={() => setSelectedMetal('14K White Gold')} className="flex flex-col items-center gap-1 group">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-medium transition-all ${selectedMetal === '14K White Gold' ? 'border-2 border-black text-black' : 'border border-gray-300 text-gray-500 hover:border-gray-500'}`}>
                                        14K
                                    </div>
                                    <span className={`text-[9px] ${selectedMetal === '14K White Gold' ? 'text-black font-semibold' : 'text-gray-500'} lowercase`}>white gold</span>
                                </button>
                                {/* 18K Button */}
                                <button onClick={() => setSelectedMetal('18K White Gold')} className="flex flex-col items-center gap-1 group">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-medium transition-all ${selectedMetal === '18K White Gold' ? 'border-2 border-black text-black' : 'border border-gray-300 text-gray-500 hover:border-gray-500'}`}>
                                        18K
                                    </div>
                                    <span className={`text-[9px] ${selectedMetal === '18K White Gold' ? 'text-black font-semibold' : 'text-gray-500'} lowercase`}>white gold</span>
                                </button>
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-8 border-t border-gray-100 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[13px] text-gray-800">Select Size</span>
                                <button
                                    onClick={() => setIsSizeGuideOpen(true)}
                                    className="text-[11px] text-gray-600 underline decoration-1 underline-offset-4 hover:text-black transition-colors"
                                >
                                    Size Guide
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button className="w-8 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors rounded-l-sm bg-gray-50/30">
                                    <ChevronLeft size={14} />
                                </button>
                                <div className="flex overflow-hidden flex-grow border-y border-gray-200">
                                    {['12', '13', '14', '15', '16', '17'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`flex-1 h-10 flex items-center justify-center text-[12px] transition-colors border-r border-gray-200 last:border-r-0 ${selectedSize === size ? 'bg-[#f4f4f4] text-black font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <button className="w-8 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors border-l-0 rounded-r-sm bg-gray-50/30">
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Add Ons */}
                        <div className="mb-6">
                            <span className="text-[13px] text-gray-800 block mb-3 font-medium">Add Ons:</span>

                            {/* Engraving Accordion */}
                            <div className="border border-gray-200 bg-[#fbfbfb] mb-3">
                                <button
                                    onClick={() => setIsEngravingOpen(true)}
                                    className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-gray-100 transition-colors group"
                                >
                                    <span className="text-[12px] text-gray-700">Add Engraving</span>
                                    <div className="flex items-center gap-3">
                                        <span className="bg-black text-white text-[8px] font-bold px-2 py-0.5 rounded-[2px] tracking-wide relative top-[-6px]">FREE</span>
                                        <Plus size={16} className="text-gray-400 group-hover:text-black" />
                                    </div>
                                </button>
                            </div>

                            {/* Certificate Accordion */}
                            <div className="border border-gray-200 bg-white">
                                <button
                                    onClick={() => setIsAddCertificateOpen(!isAddCertificateOpen)}
                                    className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-gray-50 transition-colors group"
                                >
                                    <span className="text-[12px] text-gray-700">Add Certificate</span>
                                    {isAddCertificateOpen ? <Minus size={16} className="text-gray-800" /> : <Plus size={16} className="text-gray-400 group-hover:text-black" />}
                                </button>

                                <AnimatePresence>
                                    {isAddCertificateOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden border-t border-gray-100"
                                        >
                                            <div className="p-4 grid grid-cols-2 gap-3 bg-gray-50/50">
                                                <button
                                                    onClick={() => setSelectedCertificate('SGL')}
                                                    className={`p-4 border bg-white flex flex-col sm:flex-row items-center justify-between text-left transition-all ${selectedCertificate === 'SGL' ? 'border-[#0f888f] ring-1 ring-[#0f888f]' : 'border-gray-200 hover:border-gray-300'}`}
                                                >
                                                    <span className="font-semibold text-[#0f888f] text-sm flex items-center gap-1"><ShieldCheck size={14} /> SGL</span>
                                                    <div className="text-right">
                                                        <span className="block text-[11px] font-medium text-gray-800">+₹1,000</span>
                                                        <span className="block text-[10px] text-gray-500">+2 days</span>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => setSelectedCertificate('IGI')}
                                                    className={`p-4 border bg-white flex flex-col sm:flex-row items-center justify-between text-left transition-all ${selectedCertificate === 'IGI' ? 'border-[#0f888f] ring-1 ring-[#0f888f]' : 'border-gray-200 hover:border-gray-300'}`}
                                                >
                                                    <span className="font-semibold text-gray-700 text-sm flex items-center gap-1"><ShieldCheck size={14} /> IGI</span>
                                                    <div className="text-right">
                                                        <span className="block text-[11px] font-medium text-gray-800">+₹1,000</span>
                                                        <span className="block text-[10px] text-gray-500">+4 days</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Action Row */}
                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`w-[60px] h-12 border flex items-center justify-center transition-colors flex-shrink-0 ${isInWishlist(product.id) ? 'border-black text-black' : 'border-gray-800 text-gray-800 hover:bg-gray-50'}`}
                            >
                                <Heart size={16} fill={isInWishlist(product.id) ? "black" : "none"} />
                            </button>
                            <button
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="flex-grow bg-black hover:bg-gray-800 text-white flex items-center justify-between px-6 h-12 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-bold tracking-wide">{formatPrice(displayPrice)}</span>
                                    <span className="text-[11px] text-gray-400 line-through decoration-gray-500">{formatPrice(originalPrice)}</span>
                                </div>
                                <span className="font-bold text-[11px] tracking-widest uppercase">Add To Bag</span>
                            </button>
                        </div>

                        <div className="text-center text-[11px] text-gray-500 mb-10 pb-4 border-b border-gray-100">
                            Order <span className="text-[#a67c00] font-semibold">Now</span> for estimated delivery by <span className="text-[#a67c00] font-semibold">Sat, 14th Mar</span>
                        </div>

                        {/* The Rare Jewels Difference (Enhanced Why Shop With Us) */}
                        <div className="border border-gray-200 mb-8 rounded-sm overflow-hidden">
                            <div className="p-4 bg-[#fcfcfc] border-b border-gray-200">
                                <span className="text-[12px] font-semibold text-gray-800 uppercase tracking-wider">THE RARE JEWELS DIFFERENCE</span>
                            </div>
                            <div className="p-6 flex flex-col md:flex-row gap-6 bg-white">
                                {/* Difference Icons */}
                                <div className="flex-1 grid grid-cols-3 gap-y-8 gap-x-2">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center bg-white border border-gray-100 text-[#1b3a4f] shadow-sm"><Award size={20} /></div>
                                        <span className="text-[9px] text-gray-600 font-medium leading-tight">Global Online Jeweller</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center bg-white border border-gray-100 text-[#1b3a4f] shadow-sm"><Info size={20} /></div>
                                        <span className="text-[9px] text-gray-600 font-medium leading-tight">BIS Hallmark</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center bg-white border border-gray-100 text-[#1b3a4f] shadow-sm">
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center gap-0.5"><span className="text-[10px] font-bold">4.7</span><span className="text-[8px]">★</span></div>
                                            </div>
                                        </div>
                                        <span className="text-[9px] text-gray-600 font-medium leading-tight">Rated 4.7/5 Globally</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center bg-white border border-gray-100 text-[#1b3a4f] shadow-sm"><ShieldCheck size={20} /></div>
                                        <span className="text-[9px] text-gray-600 font-medium leading-tight">Rare Jewels Certified</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center bg-white border border-gray-100 text-[#1b3a4f] shadow-sm"><Truck size={20} /></div>
                                        <span className="text-[9px] text-gray-600 font-medium leading-tight">Free Shipping & Returns</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center bg-white border border-gray-100 text-[#1b3a4f] shadow-sm"><RotateCcw size={20} /></div>
                                        <span className="text-[9px] text-gray-600 font-medium leading-tight">Lifetime Exchange & Buyback</span>
                                    </div>
                                </div>
                                {/* Certificate Visual */}
                                <div className="md:w-[140px] flex flex-col items-center border-l border-gray-100 pl-6 border-t md:border-t-0 pt-6 md:pt-0">
                                    <div className="relative w-full aspect-[4/5] bg-white border border-gray-200 shadow-sm p-1">
                                        <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale opacity-20" alt="cert" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                                            <div className="w-10 h-12 border border-gray-300 mb-1"></div>
                                            <span className="text-[7px] font-bold text-gray-800 uppercase leading-tight">Certificate of Authenticity</span>
                                        </div>
                                    </div>
                                    <button className="text-[10px] text-[#2b5c6b] font-semibold underline underline-offset-4 mt-3">View Sample</button>
                                </div>
                            </div>
                        </div>

                        {/* Product Details Accordion */}
                        <div className="border border-gray-200">
                            <button
                                onClick={() => setDetailsOpen(!detailsOpen)}
                                className="w-full p-4 bg-[#fcfcfc] flex items-center justify-between border-b border-gray-200 transition-colors"
                            >
                                <span className="text-[12px] font-medium text-gray-800">Product Details</span>
                                {detailsOpen ? <Minus size={14} className="text-gray-500" /> : <Plus size={14} className="text-gray-500" />}
                            </button>

                            <AnimatePresence>
                                {detailsOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-white"
                                    >
                                        <div className="p-6">
                                            <div className="space-y-4 mb-8">
                                                <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">SKU:</span> <span className="text-gray-900 font-medium">SR4874RHPTD</span></div>
                                                <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">Metal Purity:</span> <span className="text-gray-900">{selectedMetal}</span></div>
                                                <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">Metal Weight:</span> <span className="text-gray-900">6.5 gm</span></div>
                                                <div className="text-[11px] text-[#a67c00] underline underline-offset-4 cursor-pointer mt-2 block w-max"><Award size={12} className="inline mr-1" />Certificate of Authenticity</div>
                                            </div>

                                            {/* Natural Gemstone Table */}
                                            <div className="mb-6">
                                                <div className="flex justify-between items-end mb-2 border-b border-gray-200 pb-2">
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">NATURAL GEMSTONE INFORMATION</span>
                                                    <span className="text-[10px] text-gray-500 underline cursor-pointer">Know More</span>
                                                </div>
                                                <table className="w-full text-[11px] border-collapse">
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-500 w-[55%] pl-2">No. Of Round Rhodolite Garnet</td>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-900 w-[45%] border-l border-gray-100 pl-4">1</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-500 pl-2">Enhancement</td>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-900 border-l border-gray-100 pl-4">None</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-500 pl-2">Approximate Dimensions</td>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-900 border-l border-gray-100 pl-4">12mm</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-500 pl-2">Approximate Total Carat Weight</td>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-900 border-l border-gray-100 pl-4">7.50</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Metal Information */}
                                            <div className="mb-6">
                                                <div className="flex justify-between items-end mb-2 border-b border-gray-200 pb-2">
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">METAL INFORMATION</span>
                                                </div>
                                                <table className="w-full text-[11px] border-collapse">
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-500 w-[55%] pl-2">Metal</td>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-900 w-[45%] border-l border-gray-100 pl-4">{selectedMetal}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <p className="text-[10px] text-gray-400 leading-relaxed">*Product weight mentioned is on an approximate basis. Actual weight might vary by +/- 10%.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Price Break Up Accordion */}
                        <div className="border border-gray-200 mt-[-1px]">
                            <button
                                onClick={() => setPriceBreakUpOpen(!priceBreakUpOpen)}
                                className="w-full p-4 bg-[#fcfcfc] flex items-center justify-between border-b border-gray-200 transition-colors"
                            >
                                <span className="text-[12px] font-medium text-gray-800">Price Break Up</span>
                                {priceBreakUpOpen ? <Minus size={14} className="text-gray-500" /> : <Plus size={14} className="text-gray-500" />}
                            </button>
                            <AnimatePresence>
                                {priceBreakUpOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-white"
                                    >
                                        <div className="p-6">
                                            <table className="w-full text-[11px] border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-100 text-left text-gray-400 font-normal">
                                                        <th className="py-2 font-normal">Component</th>
                                                        <th className="py-2 font-normal">Weight</th>
                                                        <th className="py-2 font-normal">Rate</th>
                                                        <th className="py-2 font-normal text-right">Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="py-3 text-gray-700">Rhodolite Garnet</td>
                                                        <td className="py-3 text-gray-700">7.50 ct</td>
                                                        <td className="py-3 text-gray-700">₹62,118</td>
                                                        <td className="py-3 text-gray-900 font-medium text-right">₹4,65,885</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-3 text-gray-700">{selectedMetal}</td>
                                                        <td className="py-3 text-gray-700">6.50 gm</td>
                                                        <td className="py-3 text-gray-700">₹6,882</td>
                                                        <td className="py-3 text-gray-900 font-medium text-right">₹44,733</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-3 text-gray-700">Making Charges</td>
                                                        <td className="py-3 text-gray-700"></td>
                                                        <td className="py-3 text-gray-700"></td>
                                                        <td className="py-3 text-gray-900 font-medium text-right">₹1,15,337</td>
                                                    </tr>
                                                    <tr className="border-t border-gray-100">
                                                        <td colSpan="3" className="py-4 text-gray-900 font-bold">Total</td>
                                                        <td className="py-4 text-gray-900 font-bold text-right">{formatPrice(displayPrice)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Manufacturer & Origin Accordion */}
                        <div className="border border-gray-200 mt-[-1px]">
                            <button
                                onClick={() => setOriginOpen(!originOpen)}
                                className="w-full p-4 bg-[#fcfcfc] flex items-center justify-between border-b border-gray-200 transition-colors"
                            >
                                <span className="text-[12px] font-medium text-gray-800">Manufacturer & Origin</span>
                                {originOpen ? <Minus size={14} className="text-gray-500" /> : <Plus size={14} className="text-gray-500" />}
                            </button>
                            <AnimatePresence>
                                {originOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-white"
                                    >
                                        <div className="p-6 space-y-4">
                                            <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">Manufacturer:</span> <span className="text-gray-900 font-medium">Rare Jewels E-Retail India Pvt. Ltd.</span></div>
                                            <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">Country of Origin:</span> <span className="text-gray-900">India</span></div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customize Banner */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 my-10">
                <div className="relative h-[240px] md:h-[300px] rounded-sm overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Customize" />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6">
                        <h2 className="text-2xl md:text-3xl font-poppins text-white mb-4 italic">Customize Any Design</h2>
                        <p className="text-white/90 text-sm mb-6 max-w-sm">From gemstones to metal types, make it uniquely yours.</p>
                        <button className="bg-white text-black px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors">Start Customizing</button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-xl text-[#222] font-medium mb-6">You May Also Like</h2>
                    <div className="flex items-center gap-4 bg-[#f8f8f8] p-1 rounded-sm border border-gray-100">
                        <button
                            onClick={() => setSimilarTab('Recommended')}
                            className={`px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${similarTab === 'Recommended' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Recommended
                        </button>
                        <button
                            onClick={() => setSimilarTab('More Rings')}
                            className={`px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${similarTab === 'More Rings' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            More Rings
                        </button>
                    </div>
                </div>

                <div className="relative group">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scrollSimilar('left')}
                        className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all z-20 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => scrollSimilar('right')}
                        className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all z-20 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronRight size={16} />
                    </button>

                    <div ref={sliderRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth">
                        {products.slice(0, 8).map((item, idx) => (
                            <div key={idx} className="w-[180px] md:w-[240px] flex-shrink-0 group">
                                <div className="aspect-square bg-[#fcfcfc] border border-gray-100 relative mb-4 overflow-hidden rounded-sm">
                                    <Link to={`/product/${item.id}`}>
                                        <img src={item.image} className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" alt={item.name} />
                                    </Link>
                                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(item); }} className="absolute top-4 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Heart size={14} fill={isInWishlist(item.id) ? "black" : "none"} className={isInWishlist(item.id) ? "text-black" : "text-gray-400"} />
                                    </button>

                                    {/* Customize Button on Hover */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                                        <button className="w-full bg-black text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                            Customize
                                        </button>
                                    </div>
                                </div>
                                <Link to={`/product/${item.id}`} className="block text-[11px] text-gray-600 leading-snug mb-3 hover:text-gray-900 transition-colors line-clamp-2 min-h-[32px]">
                                    {item.name}
                                </Link>
                                <div className="flex items-center gap-2">
                                    <span className="text-[12px] font-bold text-gray-900">
                                        {formatPrice(item.price)} - {formatPrice(item.price * 12)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 pt-6 bg-white">
                <div className="flex flex-col items-center mb-10">
                    <h3 className="text-[17px] md:text-[20px] font-poppins text-gray-900 mb-3 md:mb-4">Verified Customer Reviews</h3>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-gray-900 text-[14px]">
                            ★★★★★
                        </div>
                        <span className="text-[12px] text-gray-500 font-medium tracking-wide">10 Reviews</span>
                    </div>
                    <button
                        onClick={() => isLoggedIn ? setIsReviewFormOpen(!isReviewFormOpen) : openLogin()}
                        className="border border-gray-100 px-16 py-3 text-[11px] uppercase tracking-widest font-normal text-gray-600 shadow-sm hover:border-gray-300 transition-colors"
                    >
                        Write A Review
                    </button>

                    <AnimatePresence>
                        {isReviewFormOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden w-full max-w-4xl mt-12 text-left"
                            >
                                <div className="py-8">
                                    <h4 className="text-[12px] font-medium text-gray-800 uppercase tracking-widest mb-4">WRITE A REVIEW</h4>
                                    <p className="text-[11px] text-[#e32c2b] mb-6">* Indicates a required field</p>

                                    <div className="flex items-center gap-2 mb-8">
                                        <span className="text-[12px] text-gray-700">Score:</span>
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    onClick={() => setReviewForm(prev => ({ ...prev, score: star }))}
                                                    className="focus:outline-none flex items-center justify-center hover:scale-110 transition-transform"
                                                >
                                                    <Star
                                                        size={16}
                                                        fill={reviewForm.score >= star ? "currentColor" : "none"}
                                                        className={reviewForm.score >= star ? "text-black" : "text-gray-300"}
                                                        strokeWidth={1.5}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-[12px] text-gray-700 mb-2"><span className="text-[#e32c2b]">*</span> Title:</label>
                                        <input
                                            type="text"
                                            value={reviewForm.title}
                                            onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors bg-[#fcfcfc]"
                                        />
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-[12px] text-gray-700 mb-2"><span className="text-[#e32c2b]">*</span> Review:</label>
                                        <textarea
                                            rows="5"
                                            value={reviewForm.review}
                                            onChange={(e) => setReviewForm(prev => ({ ...prev, review: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors resize-y bg-[#fcfcfc]"
                                        ></textarea>
                                    </div>

                                    <div className="mb-10">
                                        <label className="block text-[12px] text-gray-700 mb-2">Upload Images (optional, max 4):</label>

                                        <label className="w-full border-2 border-dashed border-gray-300 rounded-sm py-12 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors bg-[#fcfcfc] mb-4">
                                            <span className="text-[12px] text-gray-500 font-medium">{uploadedImages.length >= 4 ? 'Maximum 4 images reached' : 'Click to upload images'}</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={handleImageUpload}
                                                disabled={uploadedImages.length >= 4}
                                            />
                                        </label>

                                        {/* Uploaded Images Preview */}
                                        {uploadedImages.length > 0 && (
                                            <div className="flex flex-wrap gap-4 mt-4">
                                                {uploadedImages.map((imgUrl, idx) => (
                                                    <div key={idx} className="relative w-16 h-16 border border-gray-200 rounded-sm">
                                                        <img src={imgUrl} alt={`Uploaded preview ${idx + 1}`} className="w-full h-full object-cover rounded-sm" />
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                removeImage(idx);
                                                            }}
                                                            className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                                                        >
                                                            <X size={10} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        disabled={!reviewForm.title || !reviewForm.review || reviewForm.score === 0}
                                        className="bg-black text-white px-16 py-3.5 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Post
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Reviews Tab */}
                    <div className="border-b border-gray-200 mb-8">
                        <div className="inline-block border-b-2 border-gray-900 pb-3 px-2">
                            <span className="text-[13px] font-medium text-gray-900">Reviews</span>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="flex flex-col">
                        {customerReviews.map((review) => (
                            <div key={review.id} className="flex flex-col md:flex-row gap-4 md:gap-6 py-8 border-b border-gray-100 last:border-b-0">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#161616] text-white rounded-full flex items-center justify-center text-[12px] md:text-[14px] font-medium">
                                        {review.initial}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[12px] md:text-[13px] font-bold text-gray-900">{review.name}</span>
                                        {review.verified && <span className="text-[10px] md:text-[11px] text-gray-400 font-normal tracking-wide">Verified Buyer</span>}
                                    </div>

                                    <div className="flex text-gray-900 text-[10px] md:text-[11px] mb-2 tracking-widest">
                                        {"★".repeat(review.rating)}
                                    </div>

                                    <h4 className="text-[12px] md:text-[13px] font-bold text-gray-900 mb-2">{review.title}</h4>

                                    <p className="text-[11px] md:text-[12px] text-gray-500 leading-[1.8] font-light mb-6 pr-4">
                                        {review.text}
                                    </p>

                                    {/* Helpful? */}
                                    <div className="flex justify-end items-center gap-4 mt-auto">
                                        <span className="text-[10px] md:text-[11px] text-gray-400 pr-2">Was This Review Helpful?</span>
                                        <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-900 transition-colors">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M23 10a2 2 0 00-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2zM1 21h4V9H1v12z" />
                                                </svg>
                                                <span className="font-semibold text-gray-600">{review.helpful}</span>
                                            </button>
                                            <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-900 transition-colors">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="transform rotate-180">
                                                    <path d="M23 10a2 2 0 00-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2zM1 21h4V9H1v12z" />
                                                </svg>
                                                <span className="font-semibold text-gray-600">{review.unhelpful}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recently Viewed */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-800 mb-8 pb-4 border-b border-gray-100">Recently Viewed pieces</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {products.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="aspect-square bg-[#fcfcfc] border border-gray-100 p-4 mb-3 relative overflow-hidden flex items-center justify-center rounded-sm">
                                <img src={item.image} className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt={item.name} />
                                <button onClick={(e) => { e.preventDefault(); toggleWishlist(item); }} className="absolute top-3 right-3 hover:scale-110 transition-transform z-10">
                                    <Heart size={16} fill={isInWishlist(item.id) ? "black" : "none"} className={isInWishlist(item.id) ? "text-black" : "text-gray-400"} strokeWidth={1.5} />
                                </button>

                                {/* Customize Button on Hover */}
                                <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                    <button className="w-full bg-black text-white py-1.5 text-[9px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                        Customize
                                    </button>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase font-medium tracking-wide line-clamp-1">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Gallery Overlay */}
            <AnimatePresence>
                {isGalleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-white z-[200] flex flex-col md:flex-row overflow-hidden"
                    >
                        <GalleryContent
                            images={galleryImages}
                            activeIndex={activeGalleryIndex}
                            setActiveIndex={setActiveGalleryIndex}
                            onClose={closeGallery}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Engraving Drawer */}
            <AnimatePresence>
                {isEngravingOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEngravingOpen(false)}
                            className="fixed inset-0 bg-black/40 z-[120] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-white z-[130] shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-[14px] font-bold uppercase tracking-widest">Add Engraving</h2>
                                <button onClick={() => setIsEngravingOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="flex-1 p-8">
                                <div className="mb-8">
                                    <p className="text-[12px] text-gray-600 mb-6">Personalize your jewellery with a meaningful message, date or initials.</p>
                                    <div className="flex gap-2 mb-4">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                placeholder="Your Text Here"
                                                maxLength={15}
                                                className="w-full border border-gray-300 px-3 py-2 text-[12px] outline-none focus:border-black transition-colors"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">0/15</span>
                                        </div>
                                        <button className="w-10 border border-gray-300 flex items-center justify-center hover:border-black transition-colors text-gray-600">
                                            <span className="font-poppins italic text-[14px]">Aa</span>
                                        </button>
                                        <button className="w-10 border border-gray-300 flex items-center justify-center hover:border-black transition-colors text-gray-600">
                                            <span className="font-sans font-medium text-[12px]">Aa</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <p className="text-[9px] text-gray-500 leading-tight">*Engraved items are not eligible for exchange and returns.</p>
                                    <p className="text-[9px] text-gray-500 leading-tight">*An additional day will be added to the estimated delivery time for engraving.</p>
                                </div>

                                <button
                                    onClick={() => setIsEngravingOpen(false)}
                                    className="w-full bg-black text-white py-3.5 text-[11px] font-bold tracking-wider uppercase hover:bg-gray-800 transition-colors"
                                >
                                    Save Text
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Compare Drawer Overlay */}
            <AnimatePresence>
                {isCompareOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCompareOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-white z-[110] flex flex-col shadow-2xl"
                        >
                            {/* Drawer Content */}
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fcfcfc]">
                                <h2 className="text-lg font-poppins font-semibold text-gray-800 tracking-wide uppercase">Compare</h2>
                                <button onClick={() => setIsCompareOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto w-full">
                                <div className="bg-[#fff9f0] px-6 py-3 flex items-center justify-center gap-2 border-b border-[#f3e1c9]">
                                    <ShieldCheck size={14} className="text-[#a67c00]" />
                                    <span className="text-[11px] font-medium text-[#866600]">All gemstones are sustainably sourced</span>
                                </div>

                                <div className="p-8">
                                    <p className="text-[13px] text-gray-600 mb-8 leading-relaxed italic">
                                        Not sure what's right for you? Select the options you wish to compare.
                                    </p>

                                    <div className="inline-flex items-center px-4 py-2 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-full mb-8">
                                        Metal Type
                                    </div>

                                    <div className="px-0 pb-6 w-full">
                                        <table className="w-full text-left border-collapse border border-gray-100 table-fixed min-w-[500px]">
                                            <thead>
                                                <tr className="bg-[#111] text-white text-[10px] uppercase font-semibold">
                                                    <th className="w-12 border-r border-[#222] py-3 text-center">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline mx-auto"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                                    </th>
                                                    <th className="w-36 border-r border-[#222] py-3 px-3 text-center">Name</th>
                                                    <th className="w-28 border-r border-[#222] py-3 px-3 text-center">Visual</th>
                                                    <th className="py-3 px-3 pl-6">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-[11px]">
                                                <tr className="border-b border-gray-100 bg-[#fefcea]">
                                                    <td className="border-r border-gray-100 py-4 text-center align-middle">
                                                        <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-[#1c98e1] cursor-pointer" />
                                                    </td>
                                                    <td className="border-r border-gray-100 py-4 px-3 text-gray-800 align-middle text-center font-bold">14K White Gold</td>
                                                    <td className="border-r border-gray-100 py-4 px-3 align-middle text-center">
                                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 mx-auto flex items-center justify-center font-medium text-gray-800 border border-gray-300 shadow-inner">14K</div>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-500 align-middle leading-relaxed">
                                                        Rich and exuberant, this metal is perfect for anya... <button className="text-gray-900 ml-1 hover:underline">Read More</button>
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-gray-100 bg-[#fcfcfc]">
                                                    <td className="border-r border-gray-100 py-4 text-center align-middle">
                                                        <input type="checkbox" className="w-3.5 h-3.5 cursor-pointer rounded-sm" />
                                                    </td>
                                                    <td className="border-r border-gray-100 py-4 px-3 text-gray-600 align-middle text-center">18K White Gold</td>
                                                    <td className="border-r border-gray-100 py-4 px-3 align-middle text-center">
                                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 mx-auto flex items-center justify-center font-medium text-gray-800 border border-gray-300 shadow-inner opacity-80">18K</div>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-500 align-middle leading-relaxed">
                                                        The preferred metal for high jewellery, 18k white ... <button className="text-gray-900 ml-1 hover:underline">Read More</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* View Similar Products Bottom Drawer */}
            <AnimatePresence>
                {isSimilarDrawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSimilarDrawerOpen(false)}
                            className="fixed inset-0 bg-black/30 z-[9998] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="fixed inset-x-0 bottom-0 z-[9999] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col"
                            style={{ height: '55vh' }}
                        >
                            {/* Drawer Header */}
                            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                                <h3 className="text-[14px] text-gray-900 font-medium">View Similar Products</h3>
                                <button
                                    onClick={() => setIsSimilarDrawerOpen(false)}
                                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="px-6 flex gap-2 mt-4 pb-2 border-b border-gray-50 overflow-x-auto no-scrollbar">
                                {['Recommended', 'Diamond Earrings', 'Earrings Earrings', 'More Earrings'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setSimilarTab(tab)}
                                        className={`px-5 py-2 text-[11px] uppercase tracking-wide font-medium rounded-full transition-all whitespace-nowrap ${similarTab === tab ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-900 bg-[#f4f4f4]'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* products list container */}
                            <div className="flex-1 p-6 overflow-x-auto overflow-y-hidden custom-scrollbar bg-white">
                                <div className="flex gap-4 h-full min-w-max">
                                    {products.slice(2, 12).map((p, idx) => (
                                        <div key={idx} className="w-[180px] h-full flex-shrink-0 group cursor-pointer flex flex-col items-center p-4 bg-[#fcfcfc] border border-gray-100 hover:border-gray-200 transition-all rounded-sm shadow-sm" onClick={() => { setIsSimilarDrawerOpen(false); }}>
                                            <div className="relative aspect-square w-full mb-4 flex items-center justify-center mix-blend-multiply overflow-hidden">
                                                <img src={p.image} className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                                                <button className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                    <Heart size={14} className="text-gray-400 hover:text-black" />
                                                </button>

                                                {/* Customize Button on Hover */}
                                                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                                    <button className="w-full bg-black text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                                        Customize
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <h4 className="text-[10px] text-gray-500 leading-snug mb-2 line-clamp-2 uppercase tracking-wide">{p.name}</h4>
                                                <p className="text-[12px] text-gray-900 font-bold">{formatPrice(p.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Ring Size Guide Drawer */}
            <AnimatePresence>
                {isSizeGuideOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSizeGuideOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-white z-[160] flex flex-col shadow-2xl"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fcfcfc]">
                                <h2 className="text-[15px] font-medium text-gray-900">Ring Size Guide</h2>
                                <button onClick={() => setIsSizeGuideOpen(false)} className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                                    <X size={14} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                {/* Steps Navigation */}
                                <div className="mb-10 text-center">
                                    <h4 className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-4">Steps</h4>
                                    <div className="flex items-center justify-center gap-6">
                                        <button onClick={() => setSizeGuideStep(Math.max(1, sizeGuideStep - 1))} className="text-gray-400 hover:text-black">
                                            <ChevronLeft size={16} />
                                        </button>
                                        {[1, 2, 3].map(step => (
                                            <button
                                                key={step}
                                                onClick={() => setSizeGuideStep(step)}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${sizeGuideStep === step ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                                            >
                                                {step}
                                            </button>
                                        ))}
                                        <button onClick={() => setSizeGuideStep(Math.min(3, sizeGuideStep + 1))} className="text-gray-400 hover:text-black">
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Step Content Card */}
                                <div className="bg-[#fcfcfc] border border-gray-100 p-6 rounded-sm mb-10">
                                    <div className="flex items-center gap-8">
                                        <div className="w-32 h-32 flex-shrink-0 bg-white border border-gray-50 flex items-center justify-center p-4">
                                            <img
                                                src={sizeGuideStep === 1
                                                    ? "https://images.unsplash.com/photo-1610313130748-038753b6afc7?auto=format&fit=crop&q=80&w=300"
                                                    : sizeGuideStep === 2
                                                        ? "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=300"
                                                        : "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=300"
                                                }
                                                className="w-full h-full object-contain mix-blend-multiply"
                                                alt="size guide step"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-gray-600 leading-relaxed">
                                                {sizeGuideStep === 1
                                                    ? "Take a piece of string/tape and wrap it around your intended finger."
                                                    : sizeGuideStep === 2
                                                        ? "Mark the point where the string/tape overlaps."
                                                        : "Measure the length in millimeters and refer to the chart below."
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-8 text-center pt-6 border-t border-gray-100">
                                        <button className="text-[12px] text-[#2b5c6b] font-bold underline underline-offset-4 hover:text-black transition-colors">
                                            View & Download Complete guide
                                        </button>
                                    </div>
                                </div>

                                {/* Ring Size Chart Table */}
                                <div className="mb-10">
                                    <h3 className="text-[13px] font-semibold text-gray-900 mb-4">Ring Size Chart</h3>
                                    <div className="border border-gray-100 rounded-sm overflow-hidden">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-black text-white uppercase tracking-wider font-bold">
                                                    <th className="py-2.5 px-4 text-[10px]">Select</th>
                                                    <th className="py-2.5 px-4 text-[10px]">Ring Size</th>
                                                    <th className="py-2.5 px-4 text-[10px]">Diameter (mm)</th>
                                                    <th className="py-2.5 px-4 text-[10px]">Circumference (mm)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { size: 6, diameter: 14.6, circumference: 45.9 },
                                                    { size: 7, diameter: 15.0, circumference: 47.1 },
                                                    { size: 8, diameter: 15.3, circumference: 48.1 },
                                                    { size: 9, diameter: 15.6, circumference: 49.0 },
                                                    { size: 10, diameter: 15.9, circumference: 50.0 },
                                                    { size: 11, diameter: 16.2, circumference: 50.9 },
                                                    { size: 12, diameter: 16.5, circumference: 51.8 },
                                                    { size: 13, diameter: 16.8, circumference: 52.8 },
                                                    { size: 14, diameter: 17.2, circumference: 54.0 },
                                                    { size: 15, diameter: 17.5, circumference: 55.0 },
                                                    { size: 16, diameter: 17.8, circumference: 55.9 },
                                                    { size: 17, diameter: 18.1, circumference: 56.9 },
                                                    { size: 18, diameter: 18.4, circumference: 57.8 },
                                                    { size: 19, diameter: 18.8, circumference: 59.1 },
                                                    { size: 20, diameter: 19.1, circumference: 60 },
                                                    { size: 21, diameter: 19.4, circumference: 60.9 },
                                                    { size: 22, diameter: 19.7, circumference: 61.9 },
                                                    { size: 23, diameter: 20, circumference: 62.9 },
                                                    { size: 24, diameter: 20.3, circumference: 63.8 },
                                                    { size: 25, diameter: 20.6, circumference: 64.7 },
                                                ].map((item, idx) => (
                                                    <tr key={idx} className={`border-b border-gray-50 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                                                        <td className="py-3 px-4 text-center">
                                                            <input
                                                                type="radio"
                                                                name="ring-size-guide"
                                                                onChange={() => {
                                                                    const size = item.size.toString();
                                                                    setSelectedSize(size);
                                                                    setIsSizeGuideOpen(false);
                                                                    addToCart(product, 1, { metal: selectedMetal, size: size });
                                                                    navigate('/cart');
                                                                }}
                                                                checked={selectedSize === item.size.toString()}
                                                                className="w-3.5 h-3.5 accent-black cursor-pointer"
                                                            />
                                                        </td>
                                                        <td className="py-3 px-4 font-semibold text-gray-800 text-center">{item.size}</td>
                                                        <td className="py-3 px-4 text-gray-500 text-center">{item.diameter}</td>
                                                        <td className="py-3 px-4 text-gray-500 text-center">{item.circumference}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Video / Measuring Banner */}
                                <div className="mt-8 p-4 bg-white border border-gray-100 rounded-sm">
                                    <div className="relative group cursor-pointer overflow-hidden rounded-sm">
                                        <div className="aspect-video bg-[#f9f9f9] flex flex-col items-center justify-center p-6 text-center">
                                            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                                <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[11px] border-l-black border-b-[7px] border-b-transparent ml-1"></div>
                                            </div>
                                            <h4 className="text-[14px] font-bold text-gray-900 mb-1 uppercase tracking-tight">How to Measure</h4>
                                            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Your Ring Size at Home</p>
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const GalleryContent = ({ images, activeIndex, setActiveIndex, onClose }) => {
    useEffect(() => {
        const element = document.getElementById(`gallery-img-${activeIndex}`);
        if (element) {
            element.scrollIntoView({ block: 'center' });
        }
    }, []);

    return (
        <>
            <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white z-[210] hover:scale-110 transition-transform shadow-lg"
            >
                <X size={20} />
            </button>

            <div className="md:w-20 lg:w-24 border-r border-gray-100 h-full flex flex-col items-center py-8 gap-4 overflow-y-auto no-scrollbar bg-white">
                {images.map((img, idx) => {
                    const isVideo = typeof img === 'object' && img.type === 'video';
                    const src = isVideo ? img.thumb : img;
                    return (
                        <button
                            key={idx}
                            onClick={() => {
                                setActiveIndex(idx);
                                document.getElementById(`gallery-img-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className={`w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 border transition-all p-1 rounded-sm relative group ${activeIndex === idx ? 'border-black ring-1 ring-black' : 'border-gray-100 hover:border-gray-400 opacity-60 hover:opacity-100'}`}
                        >
                            <img src={src} className="w-full h-full object-contain mix-blend-multiply" alt={`Thumb ${idx}`} />
                            {isVideo && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div>
                                    </div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <div
                className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-white scroll-smooth"
                onScroll={(e) => {
                    const scrollTop = e.currentTarget.scrollTop;
                    const height = e.currentTarget.clientHeight;
                    const index = Math.round(scrollTop / height);
                    if (index !== activeIndex && index < images.length) {
                        setActiveIndex(index);
                    }
                }}
            >
                {images.map((img, idx) => {
                    const isVideo = typeof img === 'object' && img.type === 'video';
                    const src = isVideo ? img.thumb : img;
                    return (
                        <div
                            id={`gallery-img-${idx}`}
                            key={idx}
                            className="w-full h-full flex items-center justify-center snap-start snap-always p-12 lg:p-24"
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                {isVideo ? (
                                    <div className="relative w-full max-h-[70vh] aspect-video bg-gray-100/50 flex flex-col items-center justify-center">
                                        <img src={src} className="w-full h-full object-contain mix-blend-multiply opacity-50" alt="Video Placeholder" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-12 text-center">
                                            <h4 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest mb-1">Product Video</h4>
                                            <p className="text-[11px] text-gray-500 uppercase tracking-tight">Watch the brilliance in motion</p>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={src}
                                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                                        alt={`Gallery ${idx}`}
                                    />
                                )}
                                {idx === 0 && (
                                    <div className="absolute bottom-[-40px] text-center w-full">
                                        <p className="text-[12px] text-gray-400 uppercase tracking-widest">Scroll to explore details</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                <div className="h-40 flex items-center justify-center bg-gray-50/30">
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">End of Gallery</p>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
