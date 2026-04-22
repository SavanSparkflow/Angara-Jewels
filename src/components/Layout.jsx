import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/slices/authSlice';

const Layout = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [isVisible, setIsVisible] = useState(false);

    // Initial profile fetch if authenticated
    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(getProfile());
        }
    }, [isAuthenticated, user, dispatch]);

    // Show button when page is scrolled up to 300px
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <CartDrawer />
            {/* Header height: announcement(~30px) + main header(~56px) + nav(~44px) = ~130px */}
            <main className="flex-grow" style={{ paddingTop: '130px' }}>
                <Outlet />
            </main>
            <Footer />
            {/* ===================== WHATSAPP FLOATING BUTTON ===================== */}
            <a
                href="https://wa.me/918001001313"
                target="_blank"
                rel="noopener noreferrer"
                className="rare-whatsapp-btn"
                aria-label="Chat on WhatsApp"
            >
                <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.054 9.378L1.054 31.37l6.194-1.964C9.834 31.1 12.8 32 16.004 32 24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.342 22.616c-.39 1.1-1.932 2.014-3.16 2.282-.84.178-1.936.32-5.628-1.21-4.726-1.956-7.766-6.756-8.002-7.07-.226-.314-1.9-2.53-1.9-4.828 0-2.296 1.2-3.428 1.628-3.896.39-.428.922-.536 1.228-.536.15 0 .286.006.408.012.39.016.584.04.84.648.272.644 1.152 2.816 1.252 3.022.1.206.168.446.034.716-.126.276-.19.446-.378.684-.19.24-.398.534-.57.716-.19.19-.388.398-.168.784.222.386.984 1.624 2.114 2.632 1.452 1.296 2.676 1.698 3.054 1.886.39.19.616.16.842-.096.234-.264 1-.16 1.268-.534.27-.374.54-.314.9-.188.366.126 2.314 1.09 2.71 1.29.39.194.654.294.75.454.1.16.1.916-.286 2.018z" />
                </svg>
            </a>

            {/* ===================== BACK TO TOP BUTTON ===================== */}
            <button
                onClick={scrollToTop}
                className={`rare-back-to-top ${isVisible ? 'visible' : ''}`}
                aria-label="Back to top"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>
        </div>
    );
};

export default Layout;
