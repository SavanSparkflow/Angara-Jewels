import React, { useMemo } from 'react';
import { X, Minus, Plus, ShoppingBag, ChevronRight, RotateCcw, ShieldCheck, Award } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../contexts/CurrencyContext';

const CartDrawer = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartTotal,
        cartCount
    } = useCart();
    const navigate = useNavigate();

    const { formatPrice } = useCurrency();

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

    if (!isCartDrawerOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] overflow-hidden">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Drawer */}
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute right-0 top-0 h-full w-full max-w-[450px] bg-white shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-[18px] font-bold text-[#1F4E56]">Cart</h2>
                            <span className="text-[14px] text-gray-400 font-medium">{cartItems.length} items</span>
                        </div>
                        <button
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8 scrollbar-hide">
                        {/* Free Gift Banner */}
                        <div className="space-y-3">
                            <p className="text-[12px] font-bold text-[#1F4E56] tracking-tight text-center italic">
                                {cartTotal >= GIFT_THRESHOLD
                                    ? "Congratulations! You get a free gift!"
                                    : `${formatPrice(GIFT_THRESHOLD - cartTotal)} away from a FREE Gift!`}
                            </p>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-[#3BB0C1]"
                                />
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-6">
                            {cartItems.length > 0 ? cartItems.map((item, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="w-24 h-24 bg-gray-50 rounded-sm flex items-center justify-center overflow-hidden border border-gray-100">
                                        <img src={item.image} alt={item.name || item.title} className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-[13px] font-bold text-gray-800 leading-tight pr-4">{item.title || item.name}</h4>
                                        </div>
                                        {item.options && (
                                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3">
                                                {Object.entries(item.options).map(([key, val]) => (
                                                    (typeof val === 'string' || typeof val === 'number') && !key.startsWith('_') && (
                                                        <div key={key} className="text-[9px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-[2px] flex items-center justify-between border border-gray-100/50">
                                                            <span className="font-bold text-gray-500 uppercase tracking-tighter">{key}</span>
                                                            <span className="text-gray-700 truncate ml-1">{val}</span>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-baseline gap-2 mt-2">
                                            <span className="text-[13px] font-bold text-[#1F4E56]">{formatPrice(item.price)}</span>
                                            {item.originalPrice && (
                                                <span className="text-[11px] text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-5">
                                            <div className="flex items-center bg-[#fcfcfc] border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.options, item.quantity - 1)}
                                                    className="p-1 px-3 hover:bg-gray-100 text-gray-400 transition-colors"
                                                >
                                                    <Minus size={10} />
                                                </button>
                                                <span className="px-3 text-[11px] font-bold text-gray-800 min-w-[24px] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.options, item.quantity + 1)}
                                                    className="p-1 px-3 hover:bg-gray-100 text-gray-400 transition-colors"
                                                >
                                                    <Plus size={10} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.options)}
                                                className="text-[9px] text-gray-400 font-bold uppercase hover:text-red-600 transition-colors flex items-center gap-1 group/del"
                                            >
                                                <X size={10} className="group-hover/del:rotate-90 transition-transform" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10 space-y-4">
                                    <ShoppingBag size={48} className="mx-auto text-gray-100" />
                                    <p className="text-[14px] text-gray-400 font-medium">Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartDrawerOpen(false)}
                                        className="bg-[#1F4E56] text-white px-8 py-3 text-[12px] font-bold uppercase "
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Free Gifts Selection Section */}
                        {cartTotal >= 10000 && ( // Just an example, maybe any non-empty cart shows it
                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-[11px] font-bold text-gray-400 uppercase  mb-6">
                                    {cartTotal >= GIFT_THRESHOLD
                                        ? "Choose your free gift"
                                        : `You are eligible for Free Gift for spent over ${formatPrice(GIFT_THRESHOLD)}`}
                                </p>
                                <div className="space-y-4">
                                    {freeGifts.map((gift) => (
                                        <div key={gift.id} className={`flex gap-4 p-4 rounded-sm border transition-all ${cartTotal >= GIFT_THRESHOLD ? 'border-[#3BB0C1]/20 bg-[#3BB0C1]/5' : 'border-gray-50 opacity-60'}`}>
                                            <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center overflow-hidden">
                                                <img src={gift.image} alt={gift.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h5 className="text-[10px] font-bold text-gray-700 leading-normal">{gift.name}</h5>
                                                <div className="text-[11px] font-bold text-[#1F4E56]">
                                                    $0 | <span className="text-gray-400 line-through font-normal text-[10px]">{formatPrice(gift.price)}</span>
                                                </div>
                                                <button
                                                    disabled={cartTotal < GIFT_THRESHOLD}
                                                    className={`mt-2 px-6 py-2 text-[9px] font-bold uppercase  transition-all ${cartTotal >= GIFT_THRESHOLD ? 'bg-[#234E58] text-white' : 'bg-gray-100 text-gray-400'}`}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-2 pt-8 border-t border-gray-100">
                            {[
                                { icon: <RotateCcw size={14} />, label: "15 Days return policy" },
                                { icon: <ShieldCheck size={14} />, label: "100% Money back" },
                                { icon: <Award size={14} />, label: "Quality assured" }
                            ].map((badge, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-2 group">
                                    <div className="p-2 rounded-full border border-gray-100 group-hover:border-[#1F4E56]/30 transition-colors">
                                        {badge.icon}
                                    </div>
                                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tight leading-tight">{badge.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Policy Links */}
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[9px] font-bold uppercase  text-[#1F4E56]/60 pt-4 pb-8">
                            {['Refund Policy', 'Shipping Policy', 'Privacy Policy', 'Terms of Service'].map(p => (
                                <Link key={p} to="#" className="hover:text-[#1F4E56] transition-colors underline underline-offset-4">{p}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 bg-white space-y-4">
                        <div className="flex justify-between items-baseline">
                            <span className="text-[14px] font-bold text-gray-800 uppercase ">Subtotal</span>
                            <span className="text-[18px] font-bold text-[#1F4E56]">{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="space-y-3">
                            <button onClick={() => navigate("/checkout")} className="w-full bg-[#234E58] text-white py-4 text-[13px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#1a3b42] transition-all">
                                Checkout
                            </button>
                            <Link to="/cart" className="block text-center text-[10px] font-bold text-[#1F4E56] uppercase tracking-[0.2em] underline underline-offset-8 mt-4">
                                View Shopping Cart
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CartDrawer;
