import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { cartService } from '../redux/services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const fetchCart = useCallback(async () => {
        if (!isAuthenticated) return;
        try {
            const response = await cartService.get();
            if (response.success && response.data.items) {
                const mappedItems = response.data.items.map(item => {
                    const isDiamond = item.type === 'diamond' || !!item.diamond;
                    if (isDiamond) {
                        return {
                            id: item.diamond?._id,
                            itemId: item._id,
                            type: 'diamond',
                            title: item.diamond?.title || 'Diamond',
                            price: item.price,
                            quantity: item.quantity,
                            image: item.diamond?.images?.[0]?.url,
                            options: {
                                Shape: item.diamond?.shape?.name,
                                Carat: item.diamond?.carat,
                                Color: item.diamond?.color?.name,
                                Clarity: item.diamond?.clarity?.name,
                                Cut: item.diamond?.cut?.name,
                            }
                        };
                    }
                    return {
                        id: item.product?._id || item.product,
                        itemId: item._id,
                        type: 'product',
                        title: item.product?.title || 'Product',
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                        options: {
                            Metal: item.selectedAttributes?.metalType?.name,
                            Clarity: item.selectedAttributes?.diamondClarity?.name || item.selectedAttributes?.gemstoneQuality?.name,
                            Color: item.selectedAttributes?.diamondColor?.name,
                            Cut: item.selectedAttributes?.diamondCut?.name,
                            Carat: item.selectedAttributes?.caratWeight?.name || item.selectedAttributes?.caratWeight,
                            Size: item.selectedAttributes?.ringSize?.name || item.selectedAttributes?.ringSize,
                            _selectedAttributes: item.selectedAttributes
                        }
                    };
                });
                setCartItems(mappedItems);
            }
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            const localData = localStorage.getItem('rare-jewels-cart');
            if (localData) {
                setCartItems(JSON.parse(localData));
            }
        }
    }, [isAuthenticated, fetchCart]);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('rare-jewels-cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isAuthenticated]);

    const addToCart = useCallback((product, quantity = 1, options = {}) => {
        // Ensure the item added locally matches the shape expected by the UI (same as fetchCart)
        const newItem = {
            id: product._id || product.id,
            itemId: options.itemId || Date.now().toString(), // Temporary itemId until sync
            title: product.title || options.title || 'Product',
            price: options.price || product.price || 0,
            quantity: quantity,
            image: options.image || (product.images?.[0]?.url) || (product.variants?.[0]?.images?.[0]?.url),
            type: options.type || (product.sku?.includes('DIAMOND') ? 'diamond' : 'product'),
            options: options
        };

        setCartItems((prevItems) => {
            const itemKey = `${newItem.id}-${JSON.stringify(options)}`;
            const existingItemIndex = prevItems.findIndex(
                (item) => `${item.id}-${JSON.stringify(item.options)}` === itemKey
            );

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            }

            return [...prevItems, newItem];
        });

        setIsCartDrawerOpen(true);

        // If authenticated, sync with server to get accurate data and server-generated itemIds
        if (isAuthenticated) {
            // We use a small delay to ensure the server-side 'add' call (if triggered externally) has completed
            setTimeout(() => {
                fetchCart();
            }, 800);
        }
    }, [isAuthenticated, fetchCart]);

    const removeFromCart = useCallback(async (id, options = {}) => {
        const itemToRemove = cartItems.find((item) => item.id === id && JSON.stringify(item.options) === JSON.stringify(options));
        if (!itemToRemove) return;

        // Optimistic UI update
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.id === id && JSON.stringify(item.options) === JSON.stringify(options)))
        );

        // If authenticated, we should also call the server
        if (isAuthenticated && itemToRemove.itemId) {
            try {
                await cartService.remove({ itemId: itemToRemove.itemId, type: itemToRemove.type });
                fetchCart(); // Refresh to ensure sync
            } catch (error) {
                console.error("Failed to remove from cart:", error);
                fetchCart(); // Revert/sync on error
            }
        }
    }, [isAuthenticated, fetchCart, cartItems]);

    const updateQuantity = useCallback(async (id, options = {}, quantity) => {
        if (quantity < 1) return;
        
        const itemToUpdate = cartItems.find((item) => item.id === id && JSON.stringify(item.options) === JSON.stringify(options));
        if (!itemToUpdate) return;

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                (item.id === id && JSON.stringify(item.options) === JSON.stringify(options))
                    ? { ...item, quantity }
                    : item
            )
        );

        if (isAuthenticated && itemToUpdate.itemId) {
            try {
                await cartService.updateQuantity({ itemId: itemToUpdate.itemId, quantity, type: itemToUpdate.type });
                fetchCart(); // Refresh to ensure sync
            } catch (error) {
                console.error("Failed to update quantity:", error);
                fetchCart(); // Revert/sync on error
            }
        }
    }, [isAuthenticated, fetchCart, cartItems]);

    const clearCart = useCallback(async () => {
        setCartItems([]);
        if (isAuthenticated) {
            try {
                await cartService.clear();
                fetchCart();
            } catch (error) {
                console.error("Failed to clear cart:", error);
                fetchCart();
            }
        }
    }, [isAuthenticated, fetchCart]);

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0);
    }, [cartItems]);

    const cartCount = useMemo(() => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            cartTotal, 
            cartCount,
            isCartDrawerOpen,
            setIsCartDrawerOpen,
            refreshCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
