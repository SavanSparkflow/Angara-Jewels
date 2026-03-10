import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Wishlist from './pages/Wishlist';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import CancellationPolicy from './pages/CancellationPolicy';
import ResizingPolicy from './pages/ResizingPolicy';
import ExchangeBuyback from './pages/ExchangeBuyback';
import ReturnsPolicy from './pages/ReturnsPolicy';
import FAQ from './pages/FAQ';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { LoginProvider } from './contexts/LoginContext';

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

function App() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <LoginProvider>
            <CartProvider>
                <WishlistProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="our-story" element={<OurStory />} />
                                <Route path="product/:id" element={<ProductDetail />} />
                                <Route path="cart" element={<Cart />} />
                                <Route path="checkout" element={<Checkout />} />
                                <Route path="payment" element={<Payment />} />
                                <Route path="wishlist" element={<Wishlist />} />
                                <Route path="search" element={<Search />} />
                                <Route path="shop" element={<Search />} />
                                <Route path="gifts" element={<Search />} />
                                <Route path="customize" element={<Search />} />
                                <Route path="sale" element={<Search />} />
                                <Route path="dashboard" element={<Dashboard />} />
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
                            </Route>
                        </Routes>
                    </Router>
                </WishlistProvider>
            </CartProvider>
        </LoginProvider>
    );
}

export default App;
