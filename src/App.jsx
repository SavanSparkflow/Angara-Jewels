import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Wishlist from './pages/Wishlist';
import ProductList from './pages/ProductList';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import CancellationPolicy from './pages/CancellationPolicy';
import ResizingPolicy from './pages/ResizingPolicy';
import ExchangeBuyback from './pages/ExchangeBuyback';
import ReturnsPolicy from './pages/ReturnsPolicy';
import FAQ from './pages/FAQ';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { LoginProvider } from './contexts/LoginContext';
import { CurrencyProvider } from './contexts/CurrencyContext';

import TrackOrder from './pages/TrackOrder';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PaymentOptions from './pages/PaymentOptions';
import TermsConditions from './pages/TermsConditions';
import Corporate from './pages/Corporate';
import ShippingPolicy from './pages/ShippingPolicy';
import Blog from './pages/Blog';
import BISHallmarking from './pages/BISHallmarking';
import IGICertificate from './pages/IGICertificate';
import SGLCertificate from './pages/SGLCertificate';
import RareJewelsDifference from './pages/RareJewelsDifference';
import GoldRate from './pages/GoldRate';
import BlogCategory from './pages/BlogCategory';
import BlogDetail from './pages/BlogDetail';
import DiamondShop from './pages/DiamondShop';
import DiamondDetail from './pages/DiamondDetail';
import CustomJewelry from './pages/CustomJewelry';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import ResetPassword from './pages/ResetPassword';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <CurrencyProvider>
            <LoginProvider>
                <CartProvider>
                    <WishlistProvider>
                        <Router>
                            <ScrollToTop />
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route path="our-story" element={<OurStory />} />
                                    <Route path="product/:id" element={<ProductDetail />} />
                                    <Route path="cart" element={<Cart />} />
                                    <Route path="checkout" element={<Checkout />} />
                                    <Route path="payment" element={<Payment />} />
                                    <Route path="wishlist" element={<Wishlist />} />
                                    <Route path="search" element={<ProductList />} />
                                    <Route path="shop" element={<ProductList />} />
                                    <Route path="gifts" element={<ProductList />} />
                                    <Route path="customize" element={<ProductList />} />
                                    <Route path="diamond-shop" element={<DiamondShop />} />
                                    <Route path="diamond-shop/detail/:id" element={<DiamondDetail />} />
                                    <Route path="custom" element={<CustomJewelry />} />
                                    <Route path="sale" element={<ProductList />} />
                                    <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                    <Route path="cancellation-policy" element={<CancellationPolicy />} />
                                    <Route path="resizing-policy" element={<ResizingPolicy />} />
                                    <Route path="exchange-buyback" element={<ExchangeBuyback />} />
                                    <Route path="15-day-returns" element={<ReturnsPolicy />} />
                                    <Route path="track-order" element={<TrackOrder />} />
                                    <Route path="faq" element={<FAQ />} />
                                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                                    <Route path="payment-options" element={<PaymentOptions />} />
                                    <Route path="terms-conditions" element={<TermsConditions />} />
                                    <Route path="corporate" element={<Corporate />} />
                                    <Route path="shipping-policy" element={<ShippingPolicy />} />
                                    <Route path="blog" element={<Blog />} />
                                    <Route path="bis-hallmarking" element={<BISHallmarking />} />
                                    <Route path="igi-certificate" element={<IGICertificate />} />
                                    <Route path="sgl-certificate" element={<SGLCertificate />} />
                                    <Route path="rare-jewels-difference" element={<RareJewelsDifference />} />
                                    <Route path="gold-rate" element={<GoldRate />} />
                                    <Route path="blog/category/:category" element={<BlogCategory />} />
                                    <Route path="blog/:slug" element={<BlogDetail />} />
                                    <Route path="reviews" element={<Reviews />} />
                                    <Route path="contact" element={<Contact />} />
                                    <Route path="reset-password" element={<ResetPassword />} />
                                </Route>
                            </Routes>
                        </Router>
                    </WishlistProvider>
                </CartProvider>
            </LoginProvider>
        </CurrencyProvider>
    );
}

export default App;
