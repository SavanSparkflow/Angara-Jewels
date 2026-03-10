import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { Heart, X, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleMoveToCart = (product) => {
        addToCart(product, 1);
        removeFromWishlist(product.id);
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-20 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest mb-8">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-semibold">Wishlist</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-poppins text-gray-900 mb-2">My Wishlist</h1>
                        <p className="text-[13px] text-gray-500">You have {wishlistItems.length} items in your wishlist.</p>
                    </div>
                    {wishlistItems.length > 0 && (
                        <button className="text-[11px] font-bold uppercase tracking-widest text-[#2b5c6b] hover:text-[#1b3a4f] transition-colors underline underline-offset-4">
                            Move All To Bag
                        </button>
                    )}
                </div>

                {wishlistItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-32 text-center flex flex-col items-center bg-[#fcfcfc] border border-dashed border-gray-200 rounded-sm"
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-100">
                            <Heart size={32} className="text-gray-200" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl font-poppins text-gray-800 mb-4">Your wishlist is empty</h2>
                        <p className="text-[13px] text-gray-500 mb-10 max-w-sm leading-relaxed">
                            Looks like you haven't added any of your favorite pieces yet. Start exploring our collections to find something you love.
                        </p>
                        <Link to="/shop" className="bg-black text-white px-12 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-all rounded-sm shadow-lg shadow-black/5">
                            Shop Collections
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {wishlistItems.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group flex flex-col bg-white border border-gray-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500"
                                >
                                    {/* Product Image Area */}
                                    <div className="relative aspect-square bg-[#fcfcfc] overflow-hidden flex items-center justify-center p-8">
                                        <Link to={`/product/${product.id}`} className="block w-full h-full">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </Link>

                                        {/* Remove Action */}
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="absolute top-4 right-4 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all shadow-sm z-10"
                                            title="Remove"
                                        >
                                            <X size={14} />
                                        </button>

                                        {/* Arrives By Chip */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-white/90 backdrop-blur-sm border border-gray-100 px-3 py-1.5 flex flex-col items-center shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                                <span className="text-[8px] uppercase tracking-widest text-[#a67c00] font-bold">Estimated Delivery</span>
                                                <span className="text-[10px] text-gray-800 font-medium">Sat, Mar 14</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details Area */}
                                    <div className="p-5 flex flex-col flex-grow bg-white">
                                        <div className="flex-grow mb-4">
                                            <Link to={`/product/${product.id}`} className="block">
                                                <h3 className="text-[11px] text-gray-500 leading-snug mb-2 uppercase tracking-wide group-hover:text-black transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[15px] font-bold text-gray-900">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <span className="text-[11px] text-gray-400 line-through">
                                                    {formatPrice(product.price * 1.15)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleMoveToCart(product)}
                                                className="flex-1 bg-black text-white h-10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm"
                                            >
                                                <ShoppingBag size={14} />
                                                Add To Bag
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Why Shop with us badges in Wishlist Footer */}
                <div className="mt-20 py-12 border-t border-gray-100 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: '📦', title: 'Free Returns', desc: '15-day return policy' },
                        { icon: '✨', title: 'LifeTime Exchange', desc: 'Secure your future' },
                        { icon: '🛡️', title: 'Rare Jewels Certified', desc: 'Authenticity guaranteed' },
                        { icon: '💎', title: 'Conflict Free', desc: 'Ethically sourced' }
                    ].map((badge, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <span className="text-2xl mb-2">{badge.icon}</span>
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-800 mb-1">{badge.title}</h4>
                            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{badge.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
