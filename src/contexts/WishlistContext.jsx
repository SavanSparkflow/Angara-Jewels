import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { wishlistService } from '../redux/services/wishlistService';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const fetchWishlist = useCallback(async () => {
        if (!isAuthenticated) return;
        try {
            const response = await wishlistService.get();
            if (response.success && response.data) {
                const mappedItems = response.data.map(item => {
                    const isDiamond = item.itemType === 'diamond';
                    const target = isDiamond ? item.diamond : item.product;
                    
                    // CRITICAL FIX: Your backend is missing 'productId'.
                    // We will prioritize the correct IDs, but if the backend is broken (flat response),
                    // we will use a fallback to ensure the UI stays updated.
                    const realId = item.productId || item.diamondId || target?._id || item._id;

                    return {
                        id: String(realId),
                        productName: item.productName || item.diamondName || target?.title, // Store name for fallback matching
                        wishlistItemId: item._id,
                        title: item.productName || item.diamondName || target?.title || (isDiamond ? 'Loose Diamond' : 'Exquisite Jewellery'),
                        price: (item.price && typeof item.price === 'object')
                            ? (item.price.min || item.price.amount || 0)
                            : (item.price || target?.price || 0),
                        priceRange: (item.price && typeof item.price === 'object') ? item.price : null,
                        image: item.image || (target && target.images ? target.images[0]?.url : ""),
                        type: item.itemType,
                        originalData: target || item
                    };
                });
                setWishlistItems(mappedItems);
            }
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchWishlist();
        } else {
            const localData = localStorage.getItem('rare-jewels-wishlist');
            if (localData) {
                setWishlistItems(JSON.parse(localData));
            }
        }
    }, [isAuthenticated, fetchWishlist]);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('rare-jewels-wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, isAuthenticated]);

    const addToWishlist = useCallback((product, options = {}) => {
        const type = options.type || 'product';
        const newItem = {
            id: String(product._id || product.id),
            title: product.title || product.name,
            price: product.price,
            image: options.image || (product.images?.[0]?.url),
            type: type,
        };

        setWishlistItems((prevItems) => {
            if (prevItems.find((item) => String(item.id) === String(newItem.id))) return prevItems;
            return [...prevItems, newItem];
        });
    }, []);

    const removeFromWishlist = useCallback((id) => {
        setWishlistItems((prevItems) => prevItems.filter((item) => String(item.id) !== String(id)));
    }, []);

    const isInWishlist = useCallback((id, name) => {
        if (!id) return false;
        // Search by ID first
        let found = wishlistItems.find((item) => String(item.id) === String(id));
        
        // Secondary fallback by Name (use ONLY if ID matching fails due to backend returning entry ID)
        if (!found && name) {
            found = wishlistItems.find((item) => item.productName === name);
        }
        
        return !!found;
    }, [wishlistItems]);

    const toggleWishlist = async (product, options = {}) => {
        const id = product._id || product.id;
        const type = options.type || 'product';
        const isCurrentlyInWishlist = isInWishlist(id);

        // Optimistic UI update
        if (isCurrentlyInWishlist) {
            removeFromWishlist(id);
        } else {
            addToWishlist(product, options);
        }

        if (isAuthenticated) {
            try {
                if (isCurrentlyInWishlist) {
                    const existingItem = wishlistItems.find(item => item.id === id);
                    if (existingItem?.wishlistItemId) {
                        await wishlistService.remove({ itemId: existingItem.wishlistItemId });
                    } else {
                        // Fallback if wishlistItemId is missing (e.g., just added optimistically)
                        await wishlistService.remove({
                            [type === 'diamond' ? 'diamondId' : 'productId']: id,
                            itemType: type
                        });
                    }
                } else {
                    const payload = type === 'diamond'
                        ? { diamondId: id, itemType: 'diamond' }
                        : {
                            productId: id,
                            itemType: 'product',
                            // selectedAttributes: options.selectedAttributes || {}
                        };
                    await wishlistService.add(payload);
                }
                fetchWishlist(); // Refresh to ensure sync
            } catch (error) {
                console.error("Wishlist sync failed:", error);
                fetchWishlist(); // Revert/sync on error
            }
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, refreshWishlist: fetchWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
