import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, ChevronRight, Share2, Info } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiamondById } from '../redux/slices/diamondSlice';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { cartService } from '../redux/services/cartService';

const DiamondDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { addToCart } = useCart();
    
    const { selectedDiamond, loading, error } = useSelector(state => state.diamond);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (id) {
            dispatch(getDiamondById(id));
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F4E56]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    if (!selectedDiamond) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Diamond not found.
            </div>
        );
    }

    const diamond = {
        title: selectedDiamond.title,
        specs_short: `${selectedDiamond.color?.name || ''} - ${selectedDiamond.clarity?.name || ''} - ${selectedDiamond.cut?.name || ''}`,
        price_usd: selectedDiamond.price, // Assuming price is in USD or preferred currency
        price_inr: selectedDiamond.price * 83, // Assuming conversion if needed, or adjust based on API
        original_price_inr: (selectedDiamond.price * 83) * 1.2,
        delivery_date: "MAR 25TH 2026",
        images: selectedDiamond.images?.length > 0 ? selectedDiamond.images.map(img => img.url) : ["/images/pear_diamond_detail_1.png"],
        details: {
            "GIA": "VIEW CERTIFICATE",
            "SKU": selectedDiamond.sku,
            "SHAPE": selectedDiamond.shape?.name,
            "CARAT": selectedDiamond.carat,
            "COLOR": selectedDiamond.color?.name,
            "CLARITY": selectedDiamond.clarity?.name,
            "CUT": selectedDiamond.cut?.name,
            "TYPE": selectedDiamond.type?.name,
            "STOCK": selectedDiamond.stock,
            "FLUORESCENCE": "NON",
            "POLISH": "EX",
            "SYMMETRY": "VG",
            "TABLE": "61%",
            "DEPTH": "62.8%",
        }
    };

    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleAddToBag = async () => {
        const cartPayload = {
            type: "diamond",
            diamondId: selectedDiamond._id,
            price: selectedDiamond.price
        };

        if (isAuthenticated) {
            try {
                const response = await cartService.add(cartPayload);
                if (response.success) {
                    addToCart(selectedDiamond, 1, {
                        weight: diamond.details.CARAT + ' cts',
                        color: diamond.details.COLOR,
                        clarity: diamond.details.CLARITY,
                        cut: diamond.details.CUT || 'Excellent',
                        image: diamond.images[0],
                        price: selectedDiamond.price,
                        type: 'diamond'
                    });
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // Local cart logic
            addToCart(selectedDiamond, 1, {
                weight: diamond.details.CARAT + ' cts',
                color: diamond.details.COLOR,
                clarity: diamond.details.CLARITY,
                cut: diamond.details.CUT || 'Excellent',
                image: diamond.images[0],
                price: selectedDiamond.price,
                type: 'diamond'
            });
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 md:py-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-[11px] text-gray-400 font-medium">
                    <ol className="inline-flex items-center space-x-2">
                        <li><Link to="/">Home</Link></li>
                        <li><ChevronRight size={12} /></li>
                        <li><Link to="/diamond-shop">Jewellery</Link></li>
                        <li><ChevronRight size={12} /></li>
                        <li><Link to="/diamond-shop">Rings</Link></li>
                        <li><ChevronRight size={12} /></li>
                        <li className="text-gray-600">Amaryllis Scalloped Shank Ring</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left & Center: Diamond Images */}
                    <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {diamond.images.map((img, idx) => (
                            <div key={idx} className="bg-[#F3F4F6] aspect-square flex items-center justify-center overflow-hidden rounded-sm">
                                <img src={img} alt={`Diamond view ${idx + 1}`} className="w-full h-full object-contain hover:scale-110 transition-transform duration-700" />
                            </div>
                        ))}
                        {/* Certificate Large Icon Placeholder */}
                        <div className="md:col-span-2 flex justify-start mt-10">
                            <div className="w-32 h-32 opacity-10">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="9" cy="9" r="2" />
                                    <line x1="7" y1="14" x2="17" y2="14" />
                                    <line x1="7" y1="17" x2="12" y2="17" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-[22px] font-medium text-gray-900 tracking-tight">{diamond.title}</h1>
                            <div className="text-[14px] text-gray-500 tracking-[0.3em] font-light uppercase">{diamond.specs_short}</div>
                        </div>

                        <div className="flex items-baseline gap-4 mt-6">
                            <span className="text-[18px] font-semibold text-[#1F4E56]">${diamond.price_usd}</span>
                            <button className="text-[12px] text-[#1F4E56] underline flex items-center gap-1 font-medium">
                                Check With StoneAlgo
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <button 
                                onClick={() => toggleWishlist(selectedDiamond, { type: 'diamond' })}
                                className={`p-3 border rounded-sm transition-colors ${isInWishlist(selectedDiamond._id, selectedDiamond.title) ? 'border-[#234E58] bg-[#234E58]/5' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Heart size={20} className={isInWishlist(selectedDiamond._id, selectedDiamond.title) ? "text-[#234E58] fill-[#234E58]" : "text-gray-400"} />
                            </button>
                            <button
                                onClick={handleAddToBag}
                                className="flex-1 bg-[#234E58] text-white flex items-center justify-between px-8 py-4 rounded-sm hover:bg-[#1a3b42] transition-colors group shadow-md uppercase font-bold text-[13px]"
                            >
                                <div className="flex flex-col items-start leading-tight">
                                    <div className="flex items-center gap-2">
                                        <span>₹ {diamond.price_inr.toLocaleString()}</span>
                                        <span className="text-[11px] line-through opacity-40 font-normal">₹{diamond.original_price_inr.toLocaleString()}</span>
                                    </div>
                                </div>
                                <span className="group-hover:translate-x-1 transition-transform">ADD TO BAG</span>
                            </button>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
                                <span className="uppercase opacity-70">Date of Delivery</span>
                                <span className="font-bold text-gray-900">{diamond.delivery_date}</span>
                            </div>
                            <div className="flex gap-4 text-[10px] text-gray-400 font-bold uppercase ">
                                <Link to="#" className="hover:text-gray-900 transition-colors">Delivery</Link>
                                <span>|</span>
                                <Link to="#" className="hover:text-gray-900 transition-colors">Exchange</Link>
                                <span>|</span>
                                <Link to="#" className="hover:text-gray-900 transition-colors">Return Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIAMOND DETAILS TABLE */}
                <div className="mt-24 border border-gray-100 rounded-sm overflow-hidden">
                    <div className="bg-white px-8 py-6 border-b border-gray-100">
                        <h2 className="text-[15px] font-bold uppercase tracking-[0.1em] text-gray-900">Diamond Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 p-4">
                        {/* Column 1 */}
                        <div className="divide-y divide-gray-50">
                            {Object.entries(diamond.details).slice(0, 9).map(([key, value]) => (
                                <div key={key} className="flex items-center px-4 py-3.5 text-[11px]">
                                    <span className="w-1/3 font-bold uppercase text-gray-400 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                        {key.replace('_', ' ')}:
                                    </span>
                                    <span className={`w-2/3 ${value === 'VIEW CERTIFICATE' ? 'text-[#1F4E56] font-bold underline cursor-pointer hover:text-black' : 'text-gray-700 font-medium'}`}>
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* Column 2 */}
                        <div className="divide-y divide-gray-50 md:border-l border-gray-50">
                            {Object.entries(diamond.details).slice(9).map(([key, value]) => (
                                <div key={key} className="flex items-center px-4 py-3.5 text-[11px]">
                                    <span className="w-1/3 font-bold uppercase text-gray-400 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                        {key.replace('_', ' ')}:
                                    </span>
                                    <span className="w-2/3 text-gray-700 font-medium">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiamondDetail;
