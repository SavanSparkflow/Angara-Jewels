import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { X, Plus, Minus, ChevronRight, RotateCcw, ShieldCheck, Award } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    const GIFT_THRESHOLD = 85500;
    const progress = Math.min((cartTotal / GIFT_THRESHOLD) * 100, 100);

    const freeGifts = [
        {
            id: 'gift-1',
            name: '925 Silver Stud Earring Studded With 5 MM Round Cut Moissanite',
            price: 14600,
            image: '/images/free_gift_stud_earrings.png'
        },
        {
            id: 'gift-2',
            name: '925 Silver Round Cut Moissanite Pendant In Basket Setting',
            price: 14600,
            image: '/images/free_gift_moissanite_pendant.png'
        }
    ];

    const { formatPrice } = useCurrency();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white pt-40 pb-20 text-center">
                <div className="max-w-[800px] mx-auto px-6">
                    <ShoppingBag size={64} className="mx-auto text-gray-100 mb-6" />
                    <h1 className="text-2xl font-bold text-[#1F4E56] mb-4 uppercase ">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-8 text-sm">Discover our finest masterpieces and start your collection.</p>
                    <Link to="/diamond-shop" className="inline-block bg-[#1F4E56] text-white px-10 py-4 text-[12px] font-bold uppercase  hover:bg-[#153439] transition-all shadow-md">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen md:pt-24 pb-12">
            <div className="container px-4 mx-auto">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-[11px] text-gray-400 font-medium">
                    <ol className="inline-flex items-center space-x-2">
                        <li><Link to="/">Home</Link></li>
                        <li><ChevronRight size={10} /></li>
                        <li className="text-gray-600">Cart</li>
                    </ol>
                </nav>

                {/* Progress Bar Label */}
                <div className="mb-4">
                    <p className="text-[12px] md:text-[14px] font-bold text-gray-800 italic">
                        {cartTotal >= GIFT_THRESHOLD
                            ? "Congratulations! You get free gift!"
                            : `Spent over ${formatPrice(GIFT_THRESHOLD)} to get a FREE Gift!`}
                    </p>
                </div>

                {/* Main Progress Bar */}
                <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden mb-12">
                    <div
                        className="h-full bg-[#3BB0C1] transition-all duration-700"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Table Header - Hidden on Mobile */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase  text-center px-4">
                    <div className="col-span-6 text-left">Product</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Subtotal</div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-100 mb-16">
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-4 py-8 md:py-10 items-start md:items-center px-0 md:px-4 group relative border-b border-gray-50 md:border-b-0">
                            {/* Product Info & Remove Button */}
                            <div className="md:col-span-6 flex items-start md:items-center gap-4 md:gap-8 w-full relative">
                                <button
                                    onClick={() => removeFromCart(item.id, item.options)}
                                    className="md:absolute md:-left-8 text-black hover:text-red-500 transition-colors shrink-0 p-2 md:p-0"
                                >
                                    <X size={18} />
                                </button>
                                <div className="w-24 h-24 md:w-28 md:h-28 bg-[#F3F4F6] rounded-sm flex items-center justify-center overflow-hidden border border-gray-50 p-2 shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="space-y-1 flex-1 min-w-0">
                                    <div className="inline-block px-2 py-0.5 bg-[#FDF2F4] text-[#E56D83] text-[8px] font-bold uppercase rounded-sm mb-1">Lab Grown Diamond</div>
                                    <h4 className="text-[13px] md:text-[14px] font-bold text-gray-800 leading-tight pr-4 break-words">{item.title}</h4>
                                    {item.options && (
                                        <div className="grid grid-cols-1 gap-y-0.5 mt-2">
                                            {Object.entries(item.options).map(([key, val]) => (
                                                (typeof val === 'string' || typeof val === 'number') && (
                                                    <div key={key} className="text-[10px] md:text-[11px] text-gray-400">
                                                        <span className="font-bold text-gray-500 uppercase">{key}:</span> {val}
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}

                                    {/* Mobile Only: Price Display */}
                                    <div className="flex flex-col gap-1 mt-3 md:hidden">
                                        <div className="text-[12px] font-bold text-gray-800">
                                            Price: {formatPrice(item.price || 0)}
                                            {item.originalPrice && <span className="ml-2 text-[10px] text-gray-400 line-through font-normal">{formatPrice(item.originalPrice || 0)}</span>}
                                        </div>
                                        <div className="text-[12px] font-bold text-[#3BB0C1]">
                                            Subtotal: {formatPrice((item.price || 0) * item.quantity)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price - Desktop Only */}
                            <div className="hidden md:block md:col-span-2 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-[13px] font-bold text-gray-800 leading-none mb-1">{formatPrice(item.price || 0)}</span>
                                    {item.originalPrice && (
                                        <span className="text-[11px] text-gray-400 line-through">{formatPrice(item.originalPrice || 0)}</span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="md:col-span-2 flex justify-start md:justify-center w-full md:w-auto md:mt-0 pl-28 md:pl-0">
                                <div className="flex items-center bg-[#F3F4F6] rounded-sm p-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.options, item.quantity - 1)}
                                        className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center hover:bg-white rounded-sm text-gray-400 transition-colors"
                                    >
                                        <Minus size={12} />
                                    </button>
                                    <span className="px-4 md:px-3 text-[12px] font-bold text-gray-700 min-w-[24px] text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.options, item.quantity + 1)}
                                        className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center hover:bg-white rounded-sm text-gray-400 transition-colors"
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                            </div>

                            {/* Subtotal - Desktop Only */}
                            <div className="hidden md:block md:col-span-2 text-center">
                                <span className="text-[13px] font-bold text-gray-800">{formatPrice((item.price || 0) * item.quantity)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Actions */}
                <div className="flex justify-start mb-16">
                    <button 
                        onClick={clearCart}
                        className="text-[12px] font-bold text-[#1F4E56] uppercase underline underline-offset-4 hover:text-red-600 transition-colors"
                    >
                        Clear Shopping Cart
                    </button>
                </div>

                {/* Free Gifts Selection Section */}
                <div className="max-w-[500px] mx-auto mt-24 text-center">
                    <p className="text-[11px] font-bold text-gray-600 mb-6 font-poppins px-4">
                        {cartTotal >= GIFT_THRESHOLD
                            ? "Congratulations! You are eligible for a Free Gift."
                            : `You are eligible for Free Gift for spent over ${formatPrice(GIFT_THRESHOLD)}`}
                    </p>
                    <div className="border border-[#D1FAE5] rounded-sm overflow-hidden bg-[#F0FDF4]/30 mx-4 md:mx-0">
                        {freeGifts.map((gift, idx) => (
                            <div key={gift.id} className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 transition-all ${idx === 0 ? 'border-b border-[#D1FAE5]' : ''}`}>
                                <div className="w-20 h-20 bg-white rounded-sm flex items-center justify-center border border-gray-100 p-2 shrink-0">
                                    <img src={gift.image} alt={gift.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 text-center sm:text-left space-y-1">
                                    <h5 className="text-[11px] font-bold text-gray-800 leading-normal sm:pr-4">{gift.name}</h5>
                                    <div className="text-[12px] font-bold text-[#1F4E56]">
                                        ₹ 0 | <span className="text-gray-400 line-through font-normal text-[11px]">{formatPrice(gift.price)}</span>
                                    </div>
                                    <button
                                        disabled={cartTotal < GIFT_THRESHOLD}
                                        className={`mt-3 px-6 py-2 text-[10px] font-bold uppercase  transition-all w-full sm:w-auto ${cartTotal >= GIFT_THRESHOLD ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-400'}`}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Checkout Summary */}
                <div className="max-w-[500px] mx-auto mt-20 space-y-8 px-4 md:px-0">
                    <div className="flex justify-between items-baseline pt-8 border-t border-gray-100 md:border-t-0">
                        <span className="text-[14px] font-bold text-gray-800 uppercase ">Total</span>
                        <span className="text-[20px] font-bold text-gray-900">{formatPrice(cartTotal)}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 text-center font-medium italic">Shipping, taxes, & discounts calculated during checkout.</p>

                    <div className="space-y-3">
                        <button onClick={() => navigate("/checkout")} className="w-full bg-[#234E58] text-white py-2 text-[14px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#1a3b42] transition-all">
                            Checkout
                        </button>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-32 border-t border-gray-100 pt-16 px-4 md:px-0">
                    {[
                        { icon: '/images/policy_1.svg', label: "30 Days return policy" },
                        { icon: '/images/policy_2.svg', label: "100% Money back guarantee" },
                        { icon: '/images/policy_3.svg', label: "Quality assured" }
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-4 group justify-center sm:justify-start">
                            <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#1F4E56]/30 transition-colors bg-white">
                                <img src={badge.icon} alt={badge.label} className="w-8 h-8 object-contain" />
                            </div>
                            <span className="text-[11px] font-medium text-[#000815] uppercase  leading-tight">{badge.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ShoppingBag = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

export default Cart;
