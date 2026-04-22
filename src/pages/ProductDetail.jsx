import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useLogin } from '../contexts/LoginContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { cartService } from '../redux/services/cartService';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, Plus, Minus, X, Info, Tag, ShieldCheck, Truck, RotateCcw, Award, Maximize, Star, Box } from 'lucide-react';


import { useDispatch, useSelector } from 'react-redux';
import { getProductById, clearCurrentProduct, addReview, updateReview, getSimilarProducts, getMostLikedProducts } from '../redux/slices/productSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        currentProduct: product,
        loading,
        error,
        similarProducts,
        similarLoading,
        mostLikedProducts,
        mostLikedLoading
    } = useSelector(state => state.product);
    const user = useSelector(state => state.auth.user);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { openLogin, isLoggedIn } = useLogin();

    // UI States
    const [selectedMetal, setSelectedMetal] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedCut, setSelectedCut] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
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
    const [skinTone, setSkinTone] = useState(0); // 0 (Light) to 1 (Dark)
    const [reviewForm, setReviewForm] = useState({ id: null, score: 0, title: '', review: '' });
    const [uploadedImages, setUploadedImages] = useState([]); // [{ file: File, preview: string }]

    useEffect(() => {
        if (id) {
            dispatch(getProductById({ id }));
            dispatch(getMostLikedProducts());
            window.scrollTo(0, 0);
        }
        return () => dispatch(clearCurrentProduct());
    }, [dispatch, id]);

    const activeVariant = product?.variants?.find(v => {
        const vMetalId = v.metalType?._id || v.metal?._id;
        const vQualityId = v.diamondClarity?._id || v.quality?._id;
        const vWeight = v.caratWeight || v.weight?._id || v.weight;
        const vColorId = v.diamondColor?._id || v.color?._id;
        const vCutId = v.diamondCut?._id || v.cut?._id;

        return vMetalId === selectedMetal &&
            vQualityId === selectedQuality &&
            (vWeight === selectedWeight || vWeight?.toString() === selectedWeight?.toString()) &&
            (!selectedColor || vColorId === selectedColor) &&
            (!selectedCut || vCutId === selectedCut);
    }) || product?.defaultVariant || product?.variants?.[0] || null;

    useEffect(() => {
        if (product && id) {
            const payload = {
                id,
                selectedAttributes: {
                    metalType: selectedMetal,
                    diamondClarity: selectedQuality,
                    caratWeight: selectedWeight,
                    diamondColor: selectedColor,
                    diamondCut: selectedCut
                }
            };
            dispatch(getProductById(payload));
        }
    }, [id, selectedMetal, selectedQuality, selectedWeight, selectedColor, selectedCut, dispatch]);

    // Initialize selections from default variant if not already set
    useEffect(() => {
        if (product && !selectedMetal) {
            const defaultVariant = product.defaultVariant || product.variants?.[0];
            if (defaultVariant) {
                setSelectedMetal(defaultVariant.metalType?._id || defaultVariant.metal?._id);
                setSelectedQuality(defaultVariant.diamondClarity?._id || defaultVariant.quality?._id);
                setSelectedWeight(defaultVariant.caratWeight || defaultVariant.weight?._id || defaultVariant.weight);
                setSelectedColor(defaultVariant.diamondColor?._id || defaultVariant.color?._id);
                setSelectedCut(defaultVariant.diamondCut?._id || defaultVariant.cut?._id);
            }
            if (product.ringSize?.length > 0) {
                setSelectedSize(product.ringSize[0]._id);
            }
        }
    }, [product, selectedMetal]);


    const galleryImages = useMemo(() => {
        let images = activeVariant?.images?.map(img => img.url) || [];
        // If handViewImage exists and it's not in images, insert it at index 1
        if (activeVariant?.handViewImage?.url && !images.includes(activeVariant.handViewImage.url)) {
            images.splice(1, 0, activeVariant.handViewImage.url);
        }
        return images;
    }, [activeVariant]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        const availableSlots = 4 - uploadedImages.length;
        if (availableSlots <= 0) return;
        const newSelectedFiles = files.slice(0, availableSlots);
        const newImages = newSelectedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setUploadedImages(prev => [...prev, ...newImages]);
        e.target.value = '';
    };

    const handleReviewSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('productId', product._id);
            formData.append('rating', reviewForm.score);
            formData.append('comment', reviewForm.review);

            uploadedImages.forEach(img => {
                if (img.file) {
                    formData.append('images', img.file);
                }
            });

            if (reviewForm.id) {
                formData.append('id', reviewForm.id);
                await dispatch(updateReview(formData)).unwrap();
            } else {
                await dispatch(addReview(formData)).unwrap();
            }

            setIsReviewFormOpen(false);
            setReviewForm({ id: null, score: 0, title: '', review: '' });

            // Clean up object URLs
            uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
            setUploadedImages([]);

            dispatch(getProductById({
                id: product._id,
                selectedAttributes: {
                    metalType: selectedMetal,
                    diamondClarity: selectedQuality,
                    caratWeight: selectedWeight,
                    diamondColor: selectedColor,
                    diamondCut: selectedCut
                }
            }));
        } catch (err) {
            console.error("Failed to submit review:", err);
        }
    };

    const removeImage = (indexToRemove) => {
        const img = uploadedImages[indexToRemove];
        if (img && img.preview) {
            URL.revokeObjectURL(img.preview);
        }
        setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

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
    const [similarTabs, setSimilarTabs] = useState(['Recommended']);
    const sliderRef = React.useRef(null);

    useEffect(() => {
        if (product) {
            const cat = product.category?.name || "Jewellery";
            const gem = product.diamondType?.name || "Diamond";
            setSimilarTabs([
                'Recommended',
                `${gem} ${cat}`,
                `More ${cat}`
            ]);
        }
    }, [product]);

    useEffect(() => {
        if (product && isSimilarDrawerOpen) {
            const payload = {
                category: product.category?._id || product.category,
                excludeId: product._id,
                limit: 10
            };

            if (similarTab === 'Recommended') {
                payload.diamondType = product.diamondType?._id || product.diamondType;
            } else if (similarTab.toLowerCase().includes('more')) {
                // Keep default category check
            } else {
                // Specific gem + cat tab
                payload.diamondType = product.diamondType?._id || product.diamondType;
            }

            dispatch(getSimilarProducts(payload));
        }
    }, [product, similarTab, isSimilarDrawerOpen, dispatch]);

    const scrollSimilar = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 300;
            sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Helper formatting
    const { formatPrice } = useCurrency();

    if (loading && !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#C8923C]/20 border-t-[#C8923C] rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium animate-pulse">Fetching your jewel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-6">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <Link to="/shop" className="inline-block bg-[#1a1a1a] text-white px-8 py-3 rounded-sm font-bold uppercase text-[11px]">Return to Shop</Link>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const displayPrice = activeVariant?.price || 0;
    const originalPrice = product.discount > 0 ? displayPrice / (1 - (product.discount / 100)) : displayPrice;

    return (
        <div className="bg-white min-h-screen pt-10 pb-20">
            {/* Top Breadcrumb */}
            <div className="container px-4 mx-auto mb-6 mt-4">
                <nav className="flex items-center gap-2 text-[11px] text-gray-500 font-medium whitespace-nowrap overflow-hidden">
                    <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-gray-900 transition-colors">Jewellery</Link>
                    <span>/</span>
                    <Link to={`/shop?cat=${product.category?.name?.toLowerCase()}`} className="hover:text-gray-900 transition-colors">{product.category?.name}</Link>
                    <span>/</span>
                    <span className="text-gray-400 truncate">{product.title}</span>
                </nav>
            </div>

            <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-12">
                {/* LEFT: Image Grid (2x2 + extras) */}
                <div className="w-full lg:w-[60%] sticky top-28 self-start">
                    {/* SVG Filter for Skin Tone (Gamma correction preserves highlights/background) */}
                    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                        <filter id="skinToneFilter">
                            <feComponentTransfer>
                                <feFuncR type="gamma" amplitude="1" exponent={1 + skinTone * 2.8} />
                                <feFuncG type="gamma" amplitude="1" exponent={1 + skinTone * 4.8} />
                                <feFuncB type="gamma" amplitude="1" exponent={1 + skinTone * 2.8} />
                            </feComponentTransfer>
                            {/* Reduce saturation to prevent redness as it darkens */}
                            <feColorMatrix type="saturate" values={1 - skinTone * 0.7} />
                        </filter>
                    </svg>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Render first 4 images from active variant */}
                        {[0, 1, 2, 3].map((idx) => (
                            <div
                                key={idx}
                                onClick={() => galleryImages[idx] && openGallery(idx)}
                                className="bg-[#fcfcfc] aspect-square flex flex-col items-center justify-center p-8 border border-gray-100 relative group cursor-pointer overflow-hidden"
                            >
                                {galleryImages[idx] ? (
                                    <>
                                        <img
                                            src={galleryImages[idx]}
                                            alt={`Angle ${idx + 1}`}
                                            className={`w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110`}
                                            style={idx === 1 ? {
                                                filter: 'url(#skinToneFilter)',
                                                willChange: 'filter'
                                            } : {}}
                                        />
                                        {idx === 1 && activeVariant?.handViewImage?.url && (
                                            <div
                                                className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center z-30"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {/* Skin Tone Slider Container - Fully Custom Implementation */}
                                                <div className="w-[42px] h-[240px] bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col items-center py-6 relative select-none">
                                                    {/* The Gradient Track */}
                                                    <div
                                                        className="w-1.5 h-full rounded-full relative cursor-pointer"
                                                        style={{ background: 'linear-gradient(to bottom, #f3d4c1 0%, #d49c7a 50%, #2a1510 100%)' }}
                                                        onMouseDown={(e) => {
                                                            const rect = e.currentTarget.getBoundingClientRect();
                                                            const moveHandler = (moveEvt) => {
                                                                const y = moveEvt.clientY - rect.top;
                                                                const newValue = Math.max(0, Math.min(1, y / rect.height));
                                                                setSkinTone(newValue);
                                                            };
                                                            moveHandler(e);
                                                            window.addEventListener('mousemove', moveHandler);
                                                            window.addEventListener('mouseup', () => window.removeEventListener('mousemove', moveHandler), { once: true });
                                                        }}
                                                    >
                                                        {/* The Visual Thumb */}
                                                        <div
                                                            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-[#C8923C] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)] z-40 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                                                            style={{ top: `${skinTone * 100}%`, marginTop: '-12px' }}
                                                        >
                                                            <div className="w-1 h-1 bg-[#C8923C] rounded-full opacity-30"></div>
                                                        </div>
                                                    </div>

                                                    {/* Hidden input for accessibility */}
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.01"
                                                        value={skinTone}
                                                        onChange={(e) => setSkinTone(parseFloat(e.target.value))}
                                                        className="sr-only"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {idx === 0 && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsSimilarDrawerOpen(true);
                                                }}
                                                className="absolute bottom-12 left-4 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all rounded-sm z-30 shadow-sm"
                                            >
                                                <Maximize size={12} />
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 opacity-20">
                                        <Award size={24} />
                                        <span className="text-[10px]">RARE JEWELS</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Product Info Sticky Panel */}
                <div className="w-full lg:w-[40%]">
                    <div className="pl-0 lg:pl-6">
                        {/* Title & Price */}
                        <h1 className="text-2xl text-gray-900 mb-2 font-poppins font-medium leading-tight tracking-[0.02em]">
                            {product.title}
                        </h1>

                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-[22px] font-bold text-gray-900">{formatPrice(displayPrice)}</span>
                            <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
                            <span className="text-[10px] text-gray-500 font-medium">(MRP Incl. of all taxes)</span>
                        </div>

                        <div className="text-[12px] text-[#288a4e] font-medium mb-4 flex items-center gap-1">
                            Exclusive Offer: Flat {product.discount}% Off*
                        </div>

                        <div className="bg-[#fff9f0] p-3.5 flex items-center gap-3.5 mb-8 rounded-sm">
                            <div className="w-5 h-5 bg-[#1a1a1a] rounded-sm flex items-center justify-center text-white">
                                <Tag size={12} strokeWidth={2.5} />
                            </div>
                            <span className="text-[12px] text-gray-800 font-medium tracking-tight">Use code <span className="font-bold">CELEBRATE</span> for extra 5% off*</span>
                        </div>

                        {/* Gemstone, Shape & Clarity Visual Info */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            {product.diamondType && (
                                <div className="flex-1 min-w-[140px] bg-gray-50/50 p-3 rounded-md border border-gray-100 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-full border border-gray-200 p-1.5 overflow-hidden">
                                        <img src={product.diamondType.image?.url} alt={product.diamondType.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] text-gray-400 uppercase font-bold block">Gemstone</span>
                                        <span className="text-[11px] text-gray-900 font-bold">{product.diamondType.name}</span>
                                    </div>
                                </div>
                            )}
                            {product.diamondShape && (
                                <div className="flex-1 min-w-[140px] bg-gray-50/50 p-3 rounded-md border border-gray-100 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-full border border-gray-200 p-1.5 overflow-hidden">
                                        <img src={product.diamondShape.image?.url} alt={product.diamondShape.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] text-gray-400 uppercase font-bold block">Shape</span>
                                        <span className="text-[11px] text-gray-900 font-bold">{product.diamondShape.name}</span>
                                    </div>
                                </div>
                            )}
                            {activeVariant?.diamondClarity && (
                                <div className="flex-1 min-w-[140px] bg-gray-50/50 p-3 rounded-md border border-gray-100 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-full border border-gray-200 p-1.5 overflow-hidden">
                                        <img src={activeVariant.diamondClarity.image?.url} alt={activeVariant.diamondClarity.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] text-gray-400 uppercase font-bold block">Clarity</span>
                                        <span className="text-[11px] text-gray-900 font-bold">{activeVariant.diamondClarity.name}</span>
                                    </div>
                                </div>
                            )}
                            {activeVariant?.diamondColor && (
                                <div className="flex-1 min-w-[140px] bg-gray-50/50 p-3 rounded-md border border-gray-100 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#f8f8f8] rounded-full border border-gray-200 flex items-center justify-center font-bold text-gray-700 text-xs">
                                        {activeVariant.diamondColor.name?.[0] || 'C'}
                                    </div>
                                    <div>
                                        <span className="text-[9px] text-gray-400 uppercase font-bold block">Color</span>
                                        <span className="text-[11px] text-gray-900 font-bold">{activeVariant.diamondColor.name}</span>
                                    </div>
                                </div>
                            )}
                            {activeVariant?.diamondCut && (
                                <div className="flex-1 min-w-[140px] bg-gray-50/50 p-3 rounded-md border border-gray-100 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#f8f8f8] rounded-full border border-gray-200 flex items-center justify-center font-bold text-gray-700 text-xs text-center leading-tight">
                                        {activeVariant.diamondCut.name?.split(' ')?.[0]?.[0] || 'C'}
                                    </div>
                                    <div>
                                        <span className="text-[9px] text-gray-400 uppercase font-bold block">Cut</span>
                                        <span className="text-[11px] text-gray-900 font-bold">{activeVariant.diamondCut.name}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Customise This Product Section */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4 text-[#717171]">
                                <Box size={18} strokeWidth={1.5} />
                                <h3 className="text-[16px] font-medium tracking-tight">Customise This Product</h3>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6 space-y-3">
                                {/* Diamond Quality */}
                                {(product.dynamicOptions?.diamondClarities?.length > 0 || product.dynamicOptions?.diamondQualities?.length > 0) && (
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[14px] text-gray-800 font-medium">Diamond Quality</span>
                                            <button className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-black border-b border-gray-300 pb-0.5 transition-colors">
                                                <Info size={12} />
                                                Stone Guide
                                            </button>
                                        </div>
                                        <div className="relative group/scroll">
                                            <button
                                                onClick={(e) => {
                                                    const container = e.currentTarget.parentElement.querySelector('.scroll-container');
                                                    container.scrollBy({ left: -250, behavior: 'smooth' });
                                                }}
                                                className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center z-10 opacity-0 group-hover/scroll:opacity-100 transition-opacity border border-gray-100 cursor-pointer"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            <div className="scroll-container flex overflow-x-auto gap-4 pb-2 no-scrollbar scroll-smooth">
                                                {(product.dynamicOptions?.diamondClarities || product.dynamicOptions?.diamondQualities)?.map((quality, idx) => {
                                                    const id = quality._id || quality.clarityId;
                                                    const isSelected = selectedQuality === id;
                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setSelectedQuality(id)}
                                                            className={`flex-shrink-0 flex flex-col items-center justify-center w-24 h-28 rounded-md transition-all ${isSelected ? 'bg-[#f8f8f8] border border-gray-100 shadow-sm' : 'hover:bg-gray-50 border border-transparent'}`}
                                                        >
                                                            <div className="w-12 h-12 mb-2">
                                                                <img
                                                                    src={quality.image?.url || "https://res.cloudinary.com/dvopi73io/image/upload/v1773749960/Rare_Jewellers/admin/GemstoneQuality/n1vsmccrucf9dw4uvsac.webp"}
                                                                    alt={quality.name || quality.label}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                            <span className={`text-[11px] font-bold ${isSelected ? 'text-black' : 'text-gray-500'}`}>{quality.name || quality.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    const container = e.currentTarget.parentElement.querySelector('.scroll-container');
                                                    container.scrollBy({ left: 250, behavior: 'smooth' });
                                                }}
                                                className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center z-10 opacity-0 group-hover/scroll:opacity-100 transition-opacity border border-gray-100 cursor-pointer"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="h-[1px] bg-gray-100"></div>

                                {/* Total Weight / Carat Weight */}
                                {(product.dynamicOptions?.caratWeights?.length > 0 || product.dynamicOptions?.weights?.length > 0) && (
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[14px] text-gray-800 font-medium">Total Weight</span>
                                            <button className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-black border-b border-gray-300 pb-0.5 transition-colors">
                                                <Info size={12} />
                                                Weight Guide
                                            </button>
                                        </div>
                                        <div className="relative group/scroll">
                                            <button
                                                onClick={(e) => {
                                                    const container = e.currentTarget.parentElement.querySelector('.scroll-container');
                                                    container.scrollBy({ left: -250, behavior: 'smooth' });
                                                }}
                                                className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center z-10 opacity-0 group-hover/scroll:opacity-100 transition-opacity border border-gray-100 cursor-pointer"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            <div className="scroll-container flex overflow-x-auto gap-3 pb-2 no-scrollbar scroll-smooth">
                                                {(product.dynamicOptions?.caratWeights || product.dynamicOptions?.weights)?.map((weight, idx) => {
                                                    const id = weight._id || weight;
                                                    const label = weight.name || `${weight} ct`;
                                                    const isSelected = selectedWeight?.toString() === id?.toString();
                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setSelectedWeight(id)}
                                                            className={`flex-shrink-0 px-6 py-4 min-w-[90px] rounded-md transition-all text-sm font-medium border ${isSelected ? 'bg-[#f8f8f8] border-gray-100 shadow-sm text-black' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                                                        >
                                                            {label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    const container = e.currentTarget.parentElement.querySelector('.scroll-container');
                                                    container.scrollBy({ left: 250, behavior: 'smooth' });
                                                }}
                                                className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center z-10 opacity-0 group-hover/scroll:opacity-100 transition-opacity border border-gray-100 cursor-pointer"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="h-[1px] bg-gray-100"></div>

                                {/* Metal Selection */}
                                {product.dynamicOptions?.metalTypes?.length > 0 && (
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[14px] text-gray-800 font-medium">Metal</span>
                                            <button className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-black border-b border-gray-300 pb-0.5 transition-colors">
                                                <Info size={12} />
                                                Metal Guide
                                            </button>
                                        </div>
                                        <div className="relative group/scroll">
                                            <button
                                                onClick={(e) => {
                                                    const container = e.currentTarget.parentElement.querySelector('.scroll-container');
                                                    container.scrollBy({ left: -250, behavior: 'smooth' });
                                                }}
                                                className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center z-10 opacity-0 group-hover/scroll:opacity-100 transition-opacity border border-gray-100 cursor-pointer"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            <div className="scroll-container flex overflow-x-auto gap-3 pb-2 no-scrollbar scroll-smooth">
                                                {product.dynamicOptions?.metalTypes?.map((metal) => {
                                                    const isSelected = selectedMetal === metal._id;
                                                    return (
                                                        <button
                                                            key={metal._id}
                                                            onClick={() => setSelectedMetal(metal._id)}
                                                            className={`flex-shrink-0 flex flex-col items-center justify-center px-4 py-5 rounded-md transition-all min-w-[100px] border ${isSelected ? 'bg-[#f8f8f8] border-gray-100 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
                                                        >
                                                            <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border border-gray-100 p-0.5">
                                                                <img src={metal.image?.url} alt={metal.name} className="w-full h-full object-cover rounded-full" />
                                                            </div>
                                                            <span className={`text-[11px] font-bold text-center ${isSelected ? 'text-black' : 'text-gray-500'}`}>{metal.name}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    const container = e.currentTarget.parentElement.querySelector('.scroll-container');
                                                    container.scrollBy({ left: 250, behavior: 'smooth' });
                                                }}
                                                className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center z-10 opacity-0 group-hover/scroll:opacity-100 transition-opacity border border-gray-100 cursor-pointer"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="h-[1px] bg-gray-100"></div>

                                {/* Select Ring Size Selection */}
                                {product.ringSize?.length > 0 && (
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[14px] text-gray-800 font-medium">Select Ring Size</span>
                                            <button
                                                onClick={() => setIsSizeGuideOpen(true)}
                                                className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-black border-b border-gray-300 pb-0.5 transition-colors"
                                            >
                                                <Info size={12} />
                                                Find Your Perfect Size
                                            </button>
                                        </div>
                                        <div className="relative group/scroll px-2">
                                            <button
                                                onClick={(e) => {
                                                    const container = e.currentTarget.parentElement.querySelector('.scroll-container');
                                                    container.scrollBy({ left: -250, behavior: 'smooth' });
                                                }}
                                                className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-xl rounded-full flex items-center justify-center z-20 opacity-0 group-hover/scroll:opacity-100 transition-all border border-gray-100 cursor-pointer hover:scale-110 active:scale-95"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <div className="scroll-container flex overflow-x-auto gap-3 pb-2 no-scrollbar scroll-smooth">
                                                {product.ringSize?.map(size => (
                                                    <button
                                                        key={size._id}
                                                        onClick={() => setSelectedSize(size._id)}
                                                        className={`flex-shrink-0 w-16 h-12 flex items-center justify-center text-[13px] font-medium transition-all rounded-md border ${selectedSize === size._id ? 'bg-[#f8f8f8] border-gray-100 shadow-sm text-black' : 'bg-gray-50/50 border-transparent text-gray-500 hover:bg-gray-100'}`}
                                                    >
                                                        {size.name}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    const container = e.currentTarget.parentElement.querySelector('.scroll-container');
                                                    container.scrollBy({ left: 250, behavior: 'smooth' });
                                                }}
                                                className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-xl rounded-full flex items-center justify-center z-20 opacity-0 group-hover/scroll:opacity-100 transition-all border border-gray-100 cursor-pointer hover:scale-110 active:scale-95"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
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
                                        <span className="bg-[#1a1a1a] text-white text-[8px] font-bold px-2 py-0.5 rounded-[2px] tracking-wide relative top-[-6px]">FREE</span>
                                        <Plus size={16} className="text-gray-400 group-hover:text-[#1a1a1a]" />
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
                                    {isAddCertificateOpen ? <Minus size={16} className="text-gray-800" /> : <Plus size={16} className="text-gray-400 group-hover:text-[#1a1a1a]" />}
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
                                                        <span className="block text-[11px] font-medium text-gray-800">+₹ 1,000</span>
                                                        <span className="block text-[10px] text-gray-500">+2 days</span>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => setSelectedCertificate('IGI')}
                                                    className={`p-4 border bg-white flex flex-col sm:flex-row items-center justify-between text-left transition-all ${selectedCertificate === 'IGI' ? 'border-[#0f888f] ring-1 ring-[#0f888f]' : 'border-gray-200 hover:border-gray-300'}`}
                                                >
                                                    <span className="font-semibold text-gray-700 text-sm flex items-center gap-1"><ShieldCheck size={14} /> IGI</span>
                                                    <div className="text-right">
                                                        <span className="block text-[11px] font-medium text-gray-800">+₹ 1,000</span>
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
                                onClick={() => toggleWishlist(product, {
                                    type: 'product',
                                    selectedAttributes: {
                                        metalType: selectedMetal,
                                        diamondClarity: selectedQuality,
                                        caratWeight: selectedWeight,
                                        diamondColor: selectedColor,
                                        diamondCut: selectedCut,
                                        ringSize: selectedSize
                                    }
                                })}
                                className={`w-[60px] h-12 border flex items-center justify-center transition-colors flex-shrink-0 ${isInWishlist(product._id, product.title) ? 'border-[#1a1a1a] text-[#1a1a1a]' : 'border-gray-800 text-gray-800 hover:bg-gray-50'}`}
                            >
                                <Heart size={16} fill={isInWishlist(product._id, product.title) ? "#1a1a1a" : "none"} />
                            </button>
                            <button
                                onClick={async () => {
                                    if (!selectedSize) {
                                        setIsSizeGuideOpen(true);
                                        return;
                                    }

                                    const cartPayload = {
                                        productId: product._id,
                                        price: displayPrice,
                                        selectedAttributes: {
                                            metalType: selectedMetal,
                                            ringSize: selectedSize,
                                            diamondClarity: selectedQuality,
                                            caratWeight: selectedWeight,
                                            diamondColor: selectedColor,
                                            diamondCut: selectedCut,
                                            diamondType: product.diamondType?._id,
                                            diamondShape: product.diamondShape?._id
                                        }
                                    };

                                    if (isLoggedIn) {
                                        try {
                                            await cartService.add(cartPayload);
                                        } catch (err) {
                                            console.error("Error adding to cart API:", err);
                                        }
                                    }

                                    addToCart(product, 1, {
                                        variant: activeVariant?.combination,
                                        variantId: activeVariant?._id,
                                        Metal: product.dynamicOptions?.metalTypes?.find(m => m._id === selectedMetal)?.name,
                                        Quality: product.dynamicOptions?.qualities?.find(q => q._id === selectedQuality)?.name,
                                        Carat: product.dynamicOptions?.weights?.find(w => w._id === selectedWeight)?.name,
                                        Size: product.ringSize?.find(s => s._id === selectedSize)?.name,
                                        selectedAttributes: cartPayload.selectedAttributes,
                                        price: displayPrice
                                    });
                                    // navigate('/cart');
                                }}
                                className="flex-grow bg-[#1a1a1a] hover:bg-[#222222] text-white flex items-center justify-between px-6 h-12 transition-colors shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-bold tracking-wide text-lg">{formatPrice(displayPrice)}</span>
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="text-[10px] text-gray-400 line-through decoration-gray-500">{formatPrice(originalPrice)}</span>
                                        <span className="text-[9px] text-[#2ebd59] font-bold uppercase">SAVED {formatPrice(originalPrice - displayPrice)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck size={14} className="opacity-70" />
                                    <span className="font-bold text-[11px] uppercase tracking-wider">Add To Bag</span>
                                </div>
                            </button>
                        </div>

                        <div className="text-center text-[11px] text-gray-500 mb-10 pb-4 border-b border-gray-100 italic">
                            Order <span className="text-[#1a1a1a] font-bold not-italic">Now</span> for estimated delivery by <span className="text-[#1a1a1a] font-bold not-italic underline underline-offset-2 decoration-gray-200">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>

                        {/* The Rare Jewels Difference (Enhanced Why Shop With Us) */}
                        <div className="border border-gray-200 mb-8 rounded-sm overflow-hidden">
                            <div className="p-4 bg-[#fcfcfc] border-b border-gray-200">
                                <span className="text-[12px] font-semibold text-gray-800 uppercase">THE RARE JEWELS DIFFERENCE</span>
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
                                            <p className="text-[12px] text-gray-600 mb-6 leading-relaxed">
                                                {product.description}
                                            </p>
                                            <div className="space-y-4 mb-8">
                                                <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">SKU:</span> <span className="text-gray-900 font-medium">{product.sku}</span></div>
                                                <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">Metal Purity:</span> <span className="text-gray-900">{activeVariant?.metal?.name}</span></div>
                                                <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">Gross Weight:</span> <span className="text-gray-900">{product.grossWeight} gm</span></div>
                                                <div className="text-[11px]"><span className="text-gray-500 w-32 inline-block">Net Weight:</span> <span className="text-gray-900">{product.netWeight} gm</span></div>
                                                <div className="text-[11px] text-[#a67c00] underline underline-offset-4 cursor-pointer mt-2 block w-max"><Award size={12} className="inline mr-1" />Certificate of Authenticity</div>
                                            </div>

                                            {/* Gemstone Table */}
                                            {(product.diamondType || product.diamondShape) && (
                                                <div className="mb-6">
                                                    <div className="flex justify-between items-end mb-2 border-b border-gray-200 pb-2">
                                                        <span className="text-[10px] text-gray-500 uppercase font-semibold">{(product.diamondType?.name || 'GEMSTONE').toUpperCase()} INFORMATION</span>
                                                        <span className="text-[10px] text-gray-500 underline cursor-pointer">Know More</span>
                                                    </div>
                                                    <table className="w-full text-[11px] border-collapse">
                                                        <tbody>
                                                            {product.diamondType && (
                                                                <tr>
                                                                    <td className="py-2.5 border-b border-gray-100 text-gray-500 w-[55%] pl-2">Gemstone Type</td>
                                                                    <td className="py-2.5 border-b border-gray-100 text-gray-900 w-[45%] border-l pl-4">{product.diamondType?.name}</td>
                                                                </tr>
                                                            )}
                                                            {product.diamondShape && (
                                                                <tr>
                                                                    <td className="py-2.5 border-b border-gray-100 text-gray-500 w-[55%] pl-2">Shape</td>
                                                                    <td className="py-2.5 border-b border-gray-100 text-gray-900 w-[45%] border-l pl-4">{product.diamondShape?.name}</td>
                                                                </tr>
                                                            )}
                                                            {activeVariant?.quality && (
                                                                <tr>
                                                                    <td className="py-2.5 border-b border-gray-100 text-gray-500 pl-2">Quality</td>
                                                                    <td className="py-2.5 border-b border-gray-100 text-gray-900 border-l pl-4">{activeVariant.quality.name}</td>
                                                                </tr>
                                                            )}
                                                            {activeVariant?.weight && (
                                                                <tr>
                                                                    <td className="py-2.5 border-b border-gray-100 text-gray-500 pl-2">Total Carat Weight</td>
                                                                    <td className="py-2.5 border-b border-gray-100 text-gray-900 border-l pl-4">{activeVariant.weight.name}</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}

                                            {/* Metal Information */}
                                            <div className="mb-6">
                                                <div className="flex justify-between items-end mb-2 border-b border-gray-200 pb-2">
                                                    <span className="text-[10px] text-gray-500 uppercase  font-semibold">METAL INFORMATION</span>
                                                </div>
                                                <table className="w-full text-[11px] border-collapse">
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-500 w-[55%] pl-2">Metal</td>
                                                            <td className="py-2.5 border-b border-gray-100 text-gray-900 w-[45%] border-l pl-4">{activeVariant?.metal?.name}</td>
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
                                                        <th className="py-2 font-normal text-right">Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="py-3 text-gray-700">Labour Charge</td>
                                                        <td className="py-3 text-gray-900 font-medium text-right">{formatPrice(product.labourCharge)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-3 text-gray-700">Shipping Charge</td>
                                                        <td className="py-3 text-gray-900 font-medium text-right">{formatPrice(product.shippingCharge)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-3 text-gray-700">Base Price</td>
                                                        <td className="py-3 text-gray-900 font-medium text-right">{formatPrice(displayPrice - (product.labourCharge + product.shippingCharge))}</td>
                                                    </tr>
                                                    <tr className="border-t border-gray-100">
                                                        <td className="py-4 text-gray-900 font-bold">Total</td>
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
            <div className="container px-4 mx-auto my-10">
                <div className="relative h-[240px] md:h-[300px] rounded-sm overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Customize" />
                    <div className="absolute inset-0 bg-[#1a1a1a]/30 flex flex-col items-center justify-center text-center p-6">
                        <h2 className="text-2xl md:text-3xl font-poppins text-white mb-4 italic">Customize Any Design</h2>
                        <p className="text-white/90 text-sm mb-6 max-w-sm">From gemstones to metal types, make it uniquely yours.</p>
                        <button className="bg-white text-[#1a1a1a] px-8 py-3 text-[10px] font-bold  uppercase hover:bg-gray-100 transition-colors">Start Customizing</button>
                    </div>
                </div>
            </div>

            <div className="container px-4 mx-auto mb-16">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-xl text-[#222] font-medium mb-6">You May Also Like</h2>
                    <div className="flex items-center gap-4 bg-[#f8f8f8] p-1 rounded-sm border border-gray-100">
                        <button
                            onClick={() => setSimilarTab('Recommended')}
                            className={`px-6 py-2 text-[11px] font-bold uppercase transition-all ${similarTab === 'Recommended' ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Recommended
                        </button>
                        <button
                            onClick={() => setSimilarTab('More Rings')}
                            className={`px-6 py-2 text-[11px] font-bold uppercase transition-all ${similarTab === 'More Rings' ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            More Rings
                        </button>
                    </div>
                </div>

                <div className="relative group">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scrollSimilar('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all z-20 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => scrollSimilar('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all z-20 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronRight size={16} />
                    </button>

                    <div ref={sliderRef} className="flex gap-6 overflow-x-auto overflow-y-hidden no-scrollbar pb-6 scroll-smooth">
                        {mostLikedLoading ? (
                            [1, 2, 3, 4].map(i => (
                                <div key={i} className="w-[180px] md:w-[240px] flex-shrink-0 animate-pulse">
                                    <div className="aspect-square bg-gray-100 mb-4 rounded-sm"></div>
                                    <div className="h-3 bg-gray-100 mb-2 w-3/4 rounded"></div>
                                    <div className="h-3 bg-gray-100 w-1/2 rounded"></div>
                                </div>
                            ))
                        ) : mostLikedProducts && mostLikedProducts.length > 0 ? (
                            mostLikedProducts.map((item, idx) => {
                                const firstVariant = item.variants?.[0];
                                const price = item.minVariantPrice || firstVariant?.price || 0;
                                const image = firstVariant?.images?.[0]?.url || "";

                                return (
                                    <div key={idx} className="w-[180px] md:w-[240px] flex-shrink-0 group">
                                        <div className="aspect-square bg-[#fcfcfc] border border-gray-100 relative mb-4 overflow-hidden rounded-sm">
                                            <Link to={`/product/${item._id}`}>
                                                <img src={image} className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                                            </Link>
                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(item, { type: 'product' }); }}
                                                className="absolute top-4 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            >
                                                <Heart size={14} fill={isInWishlist(item._id, item.title) ? "#1a1a1a" : "none"} className={isInWishlist(item._id, item.title) ? "text-[#1a1a1a]" : "text-gray-400"} />
                                            </button>

                                            {/* Customize Button on Hover */}
                                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                                                <button
                                                    onClick={() => navigate(`/product/${item._id}`)}
                                                    className="w-full bg-[#1a1a1a] text-white py-2 text-[10px] font-bold uppercase transition-colors"
                                                >
                                                    Customize
                                                </button>
                                            </div>
                                        </div>
                                        <Link to={`/product/${item._id}`} className="block text-[11px] text-gray-600 leading-snug mb-3 hover:text-[#1a1a1a] transition-colors line-clamp-2 min-h-[32px]">
                                            {item.title}
                                        </Link>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[12px] font-bold text-gray-900">
                                                {formatPrice(price)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full text-center py-10 text-gray-400 italic text-[11px]">No recommendations found at the moment.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="container px-4 mx-auto mb-16 pt-6 bg-white">
                <div className="flex flex-col items-center mb-10">
                    <h3 className="text-[17px] md:text-[20px] font-poppins text-gray-900 mb-3 md:mb-4">Verified Customer Reviews</h3>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-gray-900 text-[14px]">
                            {"★".repeat(Math.round(product?.averageRating || 5))}
                            {"☆".repeat(5 - Math.round(product?.averageRating || 5))}
                        </div>
                        <span className="text-[12px] text-gray-500 font-medium tracking-wide">{(product?.reviews?.length || 0)} Reviews</span>
                    </div>
                    <button
                        onClick={() => isLoggedIn ? setIsReviewFormOpen(!isReviewFormOpen) : openLogin()}
                        className="border border-gray-100 px-16 py-3 text-[11px] uppercase font-bold text-gray-600 shadow-sm hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all"
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
                                <div className="py-8" id="review-form-section">
                                    <h4 className="text-[12px] font-medium text-gray-800 uppercase  mb-4">{reviewForm.id ? 'UPDATE YOUR REVIEW' : 'WRITE A REVIEW'}</h4>
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
                                                        className={reviewForm.score >= star ? "text-[#1a1a1a]" : "text-gray-300"}
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
                                                {uploadedImages.map((img, idx) => (
                                                    <div key={idx} className="relative w-16 h-16 border border-gray-200 rounded-sm">
                                                        <img src={img.preview} alt={`Uploaded preview ${idx + 1}`} className="w-full h-full object-cover rounded-sm" />
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                removeImage(idx);
                                                            }}
                                                            className="absolute -top-2 -right-2 w-5 h-5 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                                                        >
                                                            <X size={10} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleReviewSubmit}
                                        disabled={!reviewForm.review || reviewForm.score === 0}
                                        className="bg-[#1a1a1a] text-white px-16 py-3.5 text-[11px] font-bold  uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                        {(product?.reviews || []).length > 0 ? (product.reviews || []).map((review) => {
                            const isApiReview = !!review._id;
                            const isMyReview = isLoggedIn && user && (
                                (typeof review.user === 'string' && review.user === user._id) ||
                                (typeof review.user === 'object' && review.user?._id === user._id)
                            );

                            return (
                                <div key={review._id || review.id} className="flex flex-col md:flex-row gap-4 md:gap-6 py-8 border-b border-gray-100 last:border-b-0">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#161616] text-white rounded-full flex items-center justify-center text-[12px] md:text-[14px] font-medium">
                                            {review.initial || (typeof review.user === 'object' ? review.user?.name?.charAt(0) : 'U')}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[12px] md:text-[13px] font-bold text-gray-900">
                                                    {review.name || (typeof review.user === 'object' ? review.user?.name : 'User')}
                                                </span>
                                                {(review.verified || isApiReview) && <span className="text-[10px] md:text-[11px] text-gray-400 font-normal tracking-wide">Verified Buyer</span>}
                                            </div>
                                            {isMyReview && (
                                                <button
                                                    onClick={() => {
                                                        setReviewForm({
                                                            id: review._id,
                                                            score: review.rating,
                                                            review: review.comment || review.text,
                                                            title: review.title || ''
                                                        });
                                                        setIsReviewFormOpen(true);
                                                        // Scroll to form
                                                        document.getElementById('review-form-section')?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className="text-[11px] text-[#0f888f] font-bold uppercase hover:underline"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex text-gray-900 text-[10px] md:text-[11px] mb-2 ">
                                            {"★".repeat(review.rating)}
                                            {"☆".repeat(5 - review.rating)}
                                        </div>

                                        {review.title && <h4 className="text-[12px] md:text-[13px] font-bold text-gray-900 mb-2">{review.title}</h4>}

                                        <p className="text-[11px] md:text-[12px] text-gray-500 leading-[1.8] font-light mb-6 pr-4">
                                            {review.comment || review.text}
                                        </p>

                                        {/* Helpful? */}
                                        <div className="flex justify-end items-center gap-4 mt-auto">
                                            <span className="text-[10px] md:text-[11px] text-gray-400 pr-2">Was This Review Helpful?</span>
                                            <div className="flex items-center gap-3">
                                                <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-900 transition-colors">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M23 10a2 2 0 00-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2zM1 21h4V9H1v12z" />
                                                    </svg>
                                                    <span className="font-semibold text-gray-600">{review.helpful || 0}</span>
                                                </button>
                                                <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-900 transition-colors">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="transform rotate-180">
                                                        <path d="M23 10a2 2 0 00-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2zM1 21h4V9H1v12z" />
                                                    </svg>
                                                    <span className="font-semibold text-gray-600">{review.unhelpful || 0}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="py-20 text-center bg-gray-50/50 rounded-sm border border-dashed border-gray-200">
                                <p className="text-gray-400 text-[13px] italic">No reviews yet for this piece. Be the first to share your experience!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Most Liked Pieces Section (Replacing Recently Viewed) */}
            <div className="container px-4 mx-auto mb-16">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-800 mb-8 pb-4 border-b border-gray-100">Most Liked pieces</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {mostLikedLoading ? (
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="animate-pulse bg-gray-50 flex flex-col gap-3">
                                <div className="aspect-square bg-gray-100 rounded-sm" />
                                <div className="h-2 bg-gray-100 w-3/4 rounded" />
                            </div>
                        ))
                    ) : (mostLikedProducts || []).slice(0, 6).map((item, idx) => {
                        const price = item.minPrice || item.minVariantPrice || item.price || item.variants?.[0]?.price;
                        const image = item.image?.url || item.variants?.[0]?.images?.[0]?.url;

                        return (
                            <div key={idx} className="group cursor-pointer">
                                <Link to={`/product/${item._id}`}>
                                    <div className="aspect-square bg-[#fcfcfc] border border-gray-100 p-4 mb-3 relative overflow-hidden flex items-center justify-center rounded-sm">
                                        <img src={image} className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleWishlist(item);
                                            }}
                                            className="absolute top-3 right-3 hover:scale-110 transition-transform z-10"
                                        >
                                            <Heart size={16} fill={isInWishlist(item._id, item.title) ? "black" : "none"} className={isInWishlist(item._id, item.title) ? "text-[#1a1a1a]" : "text-gray-400"} strokeWidth={1.5} />
                                        </button>

                                        {/* Customize Button on Hover */}
                                        <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                            <div className="w-full bg-[#1a1a1a] text-white py-1.5 text-[9px] font-bold uppercase text-center hover:bg-gray-800 transition-colors">
                                                Customize
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-gray-500 uppercase font-medium tracking-wide line-clamp-1">{item.title}</span>
                                        <p className="text-[11px] font-bold text-gray-900">{formatPrice(price)}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
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
                            className="fixed inset-0 bg-[#1a1a1a]/40 z-[120] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-white z-[130] shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-[14px] font-bold uppercase ">Add Engraving</h2>
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
                                                className="w-full border border-gray-300 px-3 py-2 text-[12px] outline-none focus:border-[#1a1a1a] transition-colors"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">0/15</span>
                                        </div>
                                        <button className="w-10 border border-gray-300 flex items-center justify-center hover:border-[#1a1a1a] transition-colors text-gray-600">
                                            <span className="font-poppins italic text-[14px]">Aa</span>
                                        </button>
                                        <button className="w-10 border border-gray-300 flex items-center justify-center hover:border-[#1a1a1a] transition-colors text-gray-600">
                                            <span className="font-medium text-[12px]">Aa</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <p className="text-[9px] text-gray-500 leading-tight">*Engraved items are not eligible for exchange and returns.</p>
                                    <p className="text-[9px] text-gray-500 leading-tight">*An additional day will be added to the estimated delivery time for engraving.</p>
                                </div>

                                <button
                                    onClick={() => setIsEngravingOpen(false)}
                                    className="w-full bg-[#1a1a1a] text-white py-3.5 text-[11px] font-bold uppercase hover:bg-gray-800 transition-colors"
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
                            className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm z-[100]"
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

                                    <div className="inline-flex items-center px-4 py-2 bg-[#1a1a1a] text-white text-[11px] font-bold uppercase  rounded-full mb-8">
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
                            className="fixed inset-0 bg-[#1a1a1a]/30 z-[9998] backdrop-blur-sm"
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
                                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#1a1a1a] hover:bg-gray-200 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="px-6 flex gap-2 mt-4 pb-2 border-b border-gray-50 overflow-x-auto no-scrollbar">
                                {similarTabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setSimilarTab(tab)}
                                        className={`px-5 py-2 text-[11px] uppercase tracking-wide font-medium rounded-full transition-all whitespace-nowrap ${similarTab === tab ? 'bg-[#1a1a1a] text-white' : 'text-gray-500 hover:text-gray-900 bg-[#f4f4f4]'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* products list container */}
                            <div className="flex-1 p-6 overflow-x-auto overflow-y-hidden custom-scrollbar bg-white">
                                <div className="flex gap-4 h-full min-w-max">
                                    {similarLoading ? (
                                        <div className="flex gap-4">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="w-[180px] h-full bg-gray-50 animate-pulse rounded-sm"></div>
                                            ))}
                                        </div>
                                    ) : similarProducts && similarProducts.length > 0 ? (
                                        similarProducts.map((p, idx) => (
                                            <div key={idx} className="w-[180px] h-full flex-shrink-0 group cursor-pointer flex flex-col items-center p-4 bg-[#fcfcfc] border border-gray-100 hover:border-gray-200 transition-all rounded-sm shadow-sm" onClick={() => { navigate(`/product/${p._id}`); setIsSimilarDrawerOpen(false); }}>
                                                <div className="relative aspect-square w-full mb-4 flex items-center justify-center mix-blend-multiply overflow-hidden">
                                                    <img src={p.variants?.[0]?.images?.[0]?.url} className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-700" alt={p.title} />
                                                    <button
                                                        className="absolute top-0 right-0 p-2 z-10"
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p, { type: 'product' }); }}
                                                    >
                                                        <Heart
                                                            size={16}
                                                            fill={isInWishlist(p._id, p.title) ? "#1a1a1a" : "none"}
                                                            className={isInWishlist(p._id, p.title) ? "text-[#1a1a1a]" : "text-gray-400 hover:text-[#1a1a1a]"}
                                                        />
                                                    </button>

                                                    {/* Customize Button on Hover */}
                                                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/product/${p._id}`); setIsSimilarDrawerOpen(false); }}
                                                            className="w-full bg-[#1a1a1a] text-white py-2 text-[10px] font-bold uppercase  hover:bg-gray-800 transition-colors"
                                                        >
                                                            Customize
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <h4 className="text-[10px] text-gray-500 leading-snug mb-2 line-clamp-2 uppercase tracking-wide">{p.title}</h4>
                                                    <p className="text-[12px] text-gray-900 font-bold">{formatPrice(p.variants?.[0]?.price)}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full flex items-center justify-center py-20 text-gray-400 italic text-sm">
                                            No similar products found.
                                        </div>
                                    )}
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
                            className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm z-[150]"
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
                                <button onClick={() => setIsSizeGuideOpen(false)} className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                                    <X size={14} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                {/* Steps Navigation */}
                                <div className="mb-10 text-center">
                                    <h4 className="text-[11px] uppercase  text-gray-500 font-bold mb-4">Steps</h4>
                                    <div className="flex items-center justify-center gap-6">
                                        <button onClick={() => setSizeGuideStep(Math.max(1, sizeGuideStep - 1))} className="text-gray-400 hover:text-[#1a1a1a]">
                                            <ChevronLeft size={16} />
                                        </button>
                                        {[1, 2, 3].map(step => (
                                            <button
                                                key={step}
                                                onClick={() => setSizeGuideStep(step)}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${sizeGuideStep === step ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:text-[#1a1a1a]'}`}
                                            >
                                                {step}
                                            </button>
                                        ))}
                                        <button onClick={() => setSizeGuideStep(Math.min(3, sizeGuideStep + 1))} className="text-gray-400 hover:text-[#1a1a1a]">
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
                                        <button className="text-[12px] text-[#2b5c6b] font-bold underline underline-offset-4 hover:text-[#1a1a1a] transition-colors">
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
                                                <tr className="bg-[#1a1a1a] text-white uppercase font-bold">
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
                                                                className="w-3.5 h-3.5 accent-[#1a1a1a] cursor-pointer"
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
                                                <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[11px] border-l-[#1a1a1a] border-b-[7px] border-b-transparent ml-1"></div>
                                            </div>
                                            <h4 className="text-[14px] font-bold text-gray-900 mb-1 uppercase tracking-tight">How to Measure</h4>
                                            <p className="text-[11px] text-gray-500 uppercase">Your Ring Size at Home</p>
                                        </div>
                                        <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/5 transition-colors"></div>
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
                className="absolute top-6 right-6 w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white z-[210] hover:scale-110 transition-transform shadow-lg"
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
                            className={`w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 border transition-all p-1 rounded-sm relative group ${activeIndex === idx ? 'border-[#1a1a1a] ring-1 ring-[#1a1a1a]' : 'border-gray-100 hover:border-gray-400 opacity-60 hover:opacity-100'}`}
                        >
                            <img src={src} className="w-full h-full object-contain mix-blend-multiply" alt={`Thumb ${idx}`} />
                            {isVideo && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]/10">
                                    <div className="w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center">
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
                                            <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-12 text-center">
                                            <h4 className="text-[14px] font-bold text-gray-900 uppercase  mb-1">Product Video</h4>
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
                                        <p className="text-[12px] text-gray-400 uppercase ">Scroll to explore details</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                <div className="h-40 flex items-center justify-center bg-gray-50/30">
                    <p className="text-[11px] text-gray-400 uppercase  font-medium">End of Gallery</p>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
