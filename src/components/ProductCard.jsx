import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Plus } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const isFavourite = isInWishlist(product.id);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div
            className="group luxury-card relative flex flex-col h-full bg-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Wishlist Button - Top Right (Floating) */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                }}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-sm ${isFavourite ? 'text-rare-gold opacity-100' : 'text-rare-gray hover:text-rare-gold'}`}
            >
                <Heart size={16} fill={isFavourite ? "#D4AF37" : "none"} strokeWidth={1.5} />
            </button>

            {/* Badges - Top Left */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {product.isNew && (
                    <span className="bg-rare-primary text-white text-[9px] font-bold px-1.5 py-0.5 uppercase ">
                        New
                    </span>
                )}
                {product.isTrending && (
                    <span className="bg-rare-gold text-black text-[9px] font-bold px-1.5 py-0.5 uppercase ">
                        Trending
                    </span>
                )}
            </div>

            {/* Product Image Section */}
            <Link to={`/product/${product.id}`} className="relative block aspect-square bg-white group-hover:bg-rare-light transition-colors duration-500 p-8">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Quick Buy Overlay */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 p-4"
                        >
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(product);
                                }}
                                className="w-full bg-rare-primary text-white py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg hover:bg-rare-dark transition-all"
                            >
                                Quick Add
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Link>

            {/* Product Info */}
            <div className="p-6 flex flex-col items-center flex-grow text-center">
                <p className="text-[9px] text-rare-gold uppercase tracking-[0.25em] mb-2 font-bold opacity-80">
                    {product.gemstone} • {product.metal}
                </p>

                <Link to={`/product/${product.id}`} className="block mb-3">
                    <h3 className="text-rare-dark font-poppins font-medium text-sm leading-relaxed hover:text-rare-primary transition-colors tracking-wide max-w-[200px]">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex justify-center items-center gap-1.5 mb-3 opacity-60">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={10}
                                className={i < Math.floor(product.rating) ? "text-rare-gold fill-rare-gold" : "text-rare-lightgray"}
                            />
                        ))}
                    </div>
                </div>

                <p className="text-rare-primary font-bold text-base">
                    {formatPrice(product.price)}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
