import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = typeof window !== 'undefined' ? localStorage.getItem('rare-jewels-cart') : null;
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('rare-jewels-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, options = {}) => {
        setCartItems((prevItems) => {
            const itemKey = `${product.id}-${JSON.stringify(options)}`;
            const existingItemIndex = prevItems.findIndex(
                (item) => `${item.id}-${JSON.stringify(item.options)}` === itemKey
            );

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            }

            return [...prevItems, { ...product, quantity, options }];
        });
    };

    const removeFromCart = (id, options = {}) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.id === id && JSON.stringify(item.options) === JSON.stringify(options)))
        );
    };

    const updateQuantity = (id, options = {}, quantity) => {
        if (quantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                (item.id === id && JSON.stringify(item.options) === JSON.stringify(options))
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
