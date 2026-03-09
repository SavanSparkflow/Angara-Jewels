import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => {
        const localData = typeof window !== 'undefined' ? localStorage.getItem('rare-jewels-wishlist') : null;
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('rare-jewels-wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems((prevItems) => {
            if (prevItems.find((item) => item.id === product.id)) return prevItems;
            return [...prevItems, product];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const isInWishlist = (id) => {
        return !!wishlistItems.find((item) => item.id === id);
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
