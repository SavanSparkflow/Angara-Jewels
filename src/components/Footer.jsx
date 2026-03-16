import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="rare-footer">

            {/* ===== SIGN UP SECTION ===== */}
            <div className="rare-footer-signup">
                <h3>Get Additional <span>5% off</span> On Your First Order</h3>
                <div className="rare-signup-form">
                    <span className="rare-signup-prefix">🇮🇳 +91</span>
                    <input
                        type="text"
                        placeholder="Enter your mobile number*"
                        className="rare-signup-input"
                    />
                    <button className="rare-signup-btn">Sign Up</button>
                </div>
                <p className="rare-footer-privacy">
                    Your privacy matters. For details, see our <Link to="/privacy-policy">Privacy Policy</Link>.
                </p>
                <div className="rare-footer-socials">
                    <span>Follow Us</span>
                    {/* Social icons - X, YouTube, Pinterest, Instagram */}
                    <a href="#" className="rare-social-icon" aria-label="Twitter/X">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a href="#" className="rare-social-icon" aria-label="YouTube">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                    </a>
                    <a href="#" className="rare-social-icon" aria-label="Pinterest">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.373 23.178c-.07-.937-.134-2.376.028-3.401.147-.927.949-4.028.949-4.028s-.242-.485-.242-1.202c0-1.126.653-1.967 1.466-1.967.691 0 1.025.519 1.025 1.141 0 .695-.442 1.735-.671 2.7-.191.805.404 1.462 1.199 1.462 1.438 0 2.543-1.516 2.543-3.702 0-1.935-1.39-3.288-3.376-3.288-2.3 0-3.65 1.725-3.65 3.507 0 .695.268 1.44.602 1.844a.242.242 0 0 1 .056.232c-.061.256-.199.805-.226.917-.035.148-.116.18-.268.108-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.67 1.566-.997 2.097A12 12 0 1 0 12 0z" /></svg>
                    </a>
                    <a href="#" className="rare-social-icon" aria-label="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                    </a>
                </div>
            </div>

            {/* ===== LINKS SECTION ===== */}
            <div className="rare-footer-links">
                <div className="rare-footer-links-inner">
                    {/* ASSISTANCE */}
                    <div className="rare-footer-col">
                        <h4>ASSISTANCE</h4>
                        <ul>
                            <li><Link to="/15-day-returns">15-Day Returns</Link></li>
                            <li><Link to="/resizing-policy">Resizing Policy</Link></li>
                            <li><Link to="/exchange-buyback">Lifetime Exchange & Buyback</Link></li>
                            <li><Link to="/cancellation-policy">Cancellation Policy</Link></li>
                            <li><Link to="/track-order">Track Your Order</Link></li>
                        </ul>
                        <div className="footer-contact-info" style={{ marginTop: '16px' }}>
                            <p style={{ fontWeight: 600, marginBottom: '8px' }}><Link to="/faq" className="hover:underline">FAQs</Link></p>
                            <p>📞 +91-800-100-1313</p>
                            <p>📧 <a href="mailto:india.support@rarejewels.com">Email Us</a></p>
                            <p>💬 <a href="#">Chat on WhatsApp</a></p>
                            <p style={{ marginTop: '12px', fontSize: '11px', lineHeight: '1.6' }}>
                                📍 Rare Jewels Jewels Pvt. Ltd.<br />
                                2nd Floor, A-28, Vidyadhara<br />
                                Marg, Tilak Nagar, Jaipur-302004
                            </p>
                        </div>
                    </div>

                    {/* ABOUT US */}
                    <div className="rare-footer-col">
                        <h4>ABOUT US</h4>
                        <ul>
                            <li><Link to="/our-story">Our Story</Link></li>
                            <li><Link to="/corporate">Corporate</Link></li>
                            <li><Link to="/blog">Rare Jewels Blog</Link></li>
                        </ul>
                        <h4 style={{ marginTop: '24px' }}>CERTIFICATES</h4>
                        <ul>
                            <li><Link to="/bis-hallmarking">BIS Hallmarking</Link></li>
                            <li><Link to="/igi-certificate">IGI Certificate</Link></li>
                            <li><Link to="/sgl-certificate">SGL Certificate</Link></li>
                        </ul>
                    </div>

                    {/* EXPERIENCE RARE JEWELS */}
                    <div className="rare-footer-col">
                        <h4>EXPERIENCE RARE JEWELS</h4>
                        <ul>
                            <li><Link to="/rare-jewels-difference">The Rare Jewels Difference</Link></li>
                            <li><Link to="/shipping-policy">Free Shipping</Link></li>
                            <li><Link to="/payment-options">Payment Options</Link></li>
                            <li><Link to="/gold-rate">Gold Rate</Link></li>
                        </ul>
                    </div>

                    {/* SHOP */}
                    <div className="rare-footer-col">
                        <h4>SHOP</h4>
                        <ul>
                            <li><Link to="/shop">Diamond Rings</Link></li>
                            <li><Link to="/shop">Lab Grown Emerald Rings</Link></li>
                            <li><Link to="/shop">Lab Grown Blue Sapphire Rings</Link></li>
                            <li><Link to="/shop">Blue Sapphire Pendants</Link></li>
                            <li><Link to="/shop">Lab Grown Diamond Jewellery</Link></li>
                            <li><Link to="/shop">Amethyst Jewellery</Link></li>
                            <li><Link to="/shop">Aquamarine Jewellery</Link></li>
                            <li><Link to="/shop">Engagement Rings</Link></li>
                            <li><Link to="/shop">Initials Pendants</Link></li>
                            <li><Link to="/shop">Birthstone Jewellery</Link></li>
                            <li><Link to="/shop">Hoop Earrings</Link></li>
                            <li><Link to="/shop">Solitaire Rings</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ===== PAYMENT ICONS ===== */}
            <div className="rare-footer-payments">
                <div className="rare-payment-icons">
                    <img src="/images/visa.svg" alt="Visa" className='w-12 h-12 object-contain' />
                    <img src="/images/mastercard.svg" alt="Mastercard" className='w-12 h-12 object-contain' />
                    <img src="/images/rupay.svg" alt="RuPay" className='w-12 h-12 object-contain' />
                    <img src="/images/upi-icon.svg" alt="UPI" className='w-12 h-12 object-contain' />
                    <img src="/images/bhim-app-icon.svg" alt="BHIM" className='w-12 h-12 object-contain' />
                </div>
            </div>

            {/* ===== COPYRIGHT BAR ===== */}
            <div className="rare-footer-copyright">
                <div className="rare-footer-copyright-left">
                    <div className="rare-country-select">
                        <span>🇮🇳</span>
                        <span>India (INR)</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                </div>
                <p>
                    © 2026 Rare Jewels Jewels Private Limited. All Rights Reserved. |{' '}
                    <a href="#">Accessibility</a> | <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-conditions">T&C</Link> | <a href="#">Cookies</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
