import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useLogin } from '../contexts/LoginContext';
import { motion, AnimatePresence } from 'framer-motion';

// ============ GEMSTONE DOT COLORS ============
const gemColors = {
    diamond: '#E0E0E0', emerald: '#2E7D32', ruby: '#C62828', sapphire: '#1565C0',
    tanzanite: '#5C6BC0', aquamarine: '#4FC3F7', opal: '#B0BEC5', amethyst: '#7B1FA2',
    garnet: '#B71C1C', 'london blue topaz': '#0D47A1', pearl: '#F5F5F5',
    'coloured diamond': '#66BB6A', 'blue sapphire': '#1565C0', lab: '#78909C',
};

const GemDot = ({ gem, color: explicitColor }) => {
    const color = explicitColor || gemColors[gem?.toLowerCase()] || '#9E9E9E';
    return (
        <span
            className="rare-gem-dot"
            style={{ backgroundColor: color, border: color === '#E0E0E0' || color === '#F5F5F5' ? '1px solid #ccc' : 'none' }}
        />
    );
};

// ============ MEGA MENU DATA ============
const megaMenuData = {
    RINGS: {
        featured: [
            'Engagement Rings', 'Mens Rings', 'Solitaire Rings', 'Anniversary Rings',
            'Promise Rings', 'Bands', 'Traditional Rings', 'Cocktail Rings', 'Infinity Rings'
        ],
        naturalGemstone: {
            title: 'NATURAL GEMSTONE RINGS',
            items: [
                { name: 'Diamond Rings', gem: 'diamond' },
                { name: 'Emerald Rings', gem: 'emerald' },
                { name: 'Ruby Rings', gem: 'ruby' },
                { name: 'Sapphire Rings', gem: 'sapphire' },
                { name: 'Tanzanite Rings', gem: 'tanzanite' },
                { name: 'Aquamarine Rings', gem: 'aquamarine' },
                { name: 'Opal Rings', gem: 'opal' },
                { name: 'Amethyst Rings', gem: 'amethyst' },
                { name: 'Garnet Rings', gem: 'garnet' },
                { name: 'London Blue Topaz Rings', gem: 'london blue topaz' },
                { name: 'Pearl Rings', gem: 'pearl' },
            ]
        },
        labGrown: {
            title: 'LAB-GROWN RINGS',
            items: [
                { name: 'Lab Diamond Rings', gem: 'diamond' },
                { name: 'Lab Coloured Diamond Rings', gem: 'coloured diamond' },
                { name: 'Lab Emerald Rings', gem: 'emerald' },
                { name: 'Lab Blue Sapphire Rings', gem: 'blue sapphire' },
                { name: 'Lab Ruby Rings', gem: 'ruby' },
            ]
        },
        stoneShape: {
            title: 'RINGS BY STONE SHAPE',
            items: ['Round Rings', 'Oval Rings', 'Pear Rings', 'Heart Rings', 'Emerald-Cut Rings']
        },
        priceRange: {
            title: 'RINGS BY PRICE RANGE',
            items: ['₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,00,000', 'Above ₹2,00,000']
        },
        metalPurity: {
            title: 'RINGS BY METAL PURITY',
            items: [
                { name: '9 KT Gold', icon: '💛' },
                { name: '14 KT Gold', icon: '💛' },
                { name: '18 KT Gold', icon: '💛' },
                { name: '925 Silver', icon: '🤍' },
            ]
        },
        promoImages: [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400', label: 'Lab Diamond Ring' },
            { img: '/images/gardens-twilight.png', label: 'Gardens At Twilight' },
        ]
    },
    EARRINGS: {
        featured: [
            'Bridal Earrings', 'Classic Earrings', 'Solitaire Studs Earrings', 'Drop Earrings',
            'Hoops Earrings', 'Sui Dhaga Earrings', 'Mens Studs', 'Mangalsutra Earrings'
        ],
        naturalGemstone: {
            title: 'NATURAL GEMSTONE EARRINGS',
            items: [
                { name: 'Diamond Earrings', gem: 'diamond' },
                { name: 'Emerald Earrings', gem: 'emerald' },
                { name: 'Ruby Earrings', gem: 'ruby' },
                { name: 'Sapphire Earrings', gem: 'sapphire' },
                { name: 'Tanzanite Earrings', gem: 'tanzanite' },
                { name: 'Aquamarine Earrings', gem: 'aquamarine' },
                { name: 'Opal Earrings', gem: 'opal' },
                { name: 'Amethyst Earrings', gem: 'amethyst' },
                { name: 'Garnet Earrings', gem: 'garnet' },
                { name: 'London Blue Topaz Earrings', gem: 'london blue topaz' },
                { name: 'Pearl Earrings', gem: 'pearl' },
            ]
        },
        labGrown: {
            title: 'LAB-GROWN EARRINGS',
            items: [
                { name: 'Lab Diamond Earrings', gem: 'diamond' },
                { name: 'Lab Coloured Diamond Earrings', gem: 'coloured diamond' },
                { name: 'Lab Emerald Earrings', gem: 'emerald' },
                { name: 'Lab Blue Sapphire Earrings', gem: 'blue sapphire' },
                { name: 'Lab Ruby Earrings', gem: 'ruby' },
            ]
        },
        stoneShape: {
            title: 'EARRINGS BY STONE SHAPE',
            items: ['Round Earrings', 'Heart Earrings', 'Pear Earrings', 'Cushion Earrings', 'Princess-Cut Earrings']
        },
        priceRange: {
            title: 'EARRINGS BY PRICE RANGE',
            items: ['₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,00,000', 'Above ₹2,00,000']
        },
        metalPurity: {
            title: 'EARRINGS BY METAL PURITY',
            items: [
                { name: '9 KT Gold', icon: '💛' },
                { name: '14 KT Gold', icon: '💛' },
                { name: '18 KT Gold', icon: '💛' },
                { name: '925 Silver', icon: '🤍' },
            ]
        },
        promoImages: [
            { img: 'https://images.unsplash.com/photo-1635767790478-439001389814?auto=format&fit=crop&q=80&w=400', label: 'Lab Diamond Earrings' },
            { img: '/images/bridal-jewellery.png', label: 'Bridal Earrings' },
        ]
    },
    NECKLACES: {
        featured: [
            'Pendants', 'Bridal Sets', 'Mangalsutra', 'Solitaire Necklaces',
            'Tennis Necklaces', 'Initials Necklaces', 'Heart Necklaces', 'Cross Necklaces', 'Mens Pendants'
        ],
        naturalGemstone: {
            title: 'NATURAL GEMSTONE NECKLACES',
            items: [
                { name: 'Diamond Necklaces', gem: 'diamond' },
                { name: 'Emerald Necklaces', gem: 'emerald' },
                { name: 'Ruby Necklaces', gem: 'ruby' },
                { name: 'Sapphire Necklaces', gem: 'sapphire' },
                { name: 'Tanzanite Necklaces', gem: 'tanzanite' },
                { name: 'Aquamarine Necklaces', gem: 'aquamarine' },
                { name: 'Opal Necklaces', gem: 'opal' },
                { name: 'Amethyst Necklaces', gem: 'amethyst' },
                { name: 'Garnet Necklaces', gem: 'garnet' },
                { name: 'London Blue Topaz Necklaces', gem: 'london blue topaz' },
                { name: 'Pearl Necklaces', gem: 'pearl' },
            ]
        },
        labGrown: {
            title: 'LAB-GROWN NECKLACES',
            items: [
                { name: 'Lab Diamond Necklaces', gem: 'diamond' },
                { name: 'Lab Coloured Diamond Necklaces', gem: 'coloured diamond' },
                { name: 'Lab Emerald Necklaces', gem: 'emerald' },
                { name: 'Lab Blue Sapphire Necklaces', gem: 'blue sapphire' },
                { name: 'Lab Ruby Necklaces', gem: 'ruby' },
            ]
        },
        stoneShape: {
            title: 'NECKLACES BY LENGTH',
            items: ['16 Inches', '18 Inches', '22 Inches']
        },
        priceRange: {
            title: 'NECKLACES BY PRICE RANGE',
            items: ['₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,00,000', 'Above ₹2,00,000']
        },
        metalPurity: {
            title: 'NECKLACES BY METAL PURITY',
            items: [
                { name: '9 KT Gold', icon: '💛' },
                { name: '14 KT Gold', icon: '💛' },
                { name: '18 KT Gold', icon: '💛' },
                { name: '925 Silver', icon: '🤍' },
            ]
        },
        promoImages: [
            { img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400', label: 'Bridal Necklaces' },
            { img: '/images/engagement-ring.png', label: 'Lab Ruby Necklaces' },
        ]
    },
    'BANGLES & BRACELETS': {
        featured: [
            'Bangles', 'Cuff Bangles', 'Tennis Bracelets', 'Chain Bracelets',
            'Adjustable Bracelets', 'Tennis Bangles', 'Mangalsutra Bracelets', 'Initials Bracelets', 'Mens Bracelets'
        ],
        naturalGemstone: {
            title: 'NATURAL GEMSTONE BRACELETS',
            items: [
                { name: 'Diamond Bracelets', gem: 'diamond' },
                { name: 'Emerald Bracelets', gem: 'emerald' },
                { name: 'Sapphire Bracelets', gem: 'sapphire' },
                { name: 'Ruby Bracelets', gem: 'ruby' },
                { name: 'Garnet Bracelets', gem: 'garnet' },
            ]
        },
        naturalBangles: {
            title: 'NATURAL GEMSTONE BANGLES',
            items: [
                { name: 'Diamond Bangles', gem: 'diamond' },
                { name: 'Emerald Bangles', gem: 'emerald' },
                { name: 'Sapphire Bangles', gem: 'sapphire' },
                { name: 'Ruby Bangles', gem: 'ruby' },
                { name: 'Garnet Bangles', gem: 'garnet' },
            ]
        },
        labGrown: {
            title: 'LAB-GROWN BRACELETS',
            items: [
                { name: 'Lab Diamond Bracelets', gem: 'diamond' },
                { name: 'Lab Emerald Bracelets', gem: 'emerald' },
                { name: 'Lab Blue Sapphire Bracelets', gem: 'blue sapphire' },
                { name: 'Lab Ruby Bracelets', gem: 'ruby' },
            ]
        },
        labGrownBangles: {
            title: 'LAB-GROWN BANGLES',
            items: [
                { name: 'Lab Diamond Bangles', gem: 'diamond' },
            ]
        },
        priceRange: {
            title: 'BRACELETS BY PRICE RANGE',
            items: ['₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,00,000', 'Above ₹2,00,000']
        },
        metalPurity: {
            title: 'BRACELETS BY METAL PURITY',
            items: [
                { name: '9 KT Gold', icon: '💛' },
                { name: '14 KT Gold', icon: '💛' },
                { name: '18 KT Gold', icon: '💛' },
                { name: '925 Silver', icon: '🤍' },
            ]
        },
        promoImages: [
            { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400', label: 'Diamond Tennis Bracelets' },
            { img: '/images/gardens-twilight.png', label: 'Gemstone Bracelets' },
        ]
    },
    'ENGAGEMENT & WEDDING': {
        columns: [
            {
                title: 'ENGAGEMENT RINGS',
                items: [
                    { name: 'Diamond Engagement Rings', gem: 'diamond' },
                    { name: 'Ruby Engagement Rings', gem: 'ruby' },
                    { name: 'Emerald Engagement Rings', gem: 'emerald' },
                    { name: 'Sapphire Engagement Rings', gem: 'sapphire' },
                    { name: 'Morganite Engagement Rings', gem: 'morganite', color: '#F4C8C8' },
                    { name: 'Lab-Grown Engagement Rings', gem: 'lab' }
                ],
                explore: true,
                subSection: {
                    title: 'BRIDAL SETS',
                    items: [
                        { name: 'Bridal Earrings', icon: '💎' },
                        { name: 'Bridal Necklaces', icon: '💎' }
                    ],
                    explore: true
                }
            },
            {
                title: 'MANGALSUTRA',
                items: [
                    { name: 'Diamond Mangalsutra', gem: 'diamond' },
                    { name: 'Ruby Mangalsutra', gem: 'ruby' },
                    { name: 'Emerald Mangalsutra', gem: 'emerald' },
                    { name: 'Blue Sapphire Mangalsutra', gem: 'blue sapphire' },
                    { name: 'Lab-Grown Mangalsutra', gem: 'lab' }
                ],
                explore: true
            },
            {
                title: 'BANGLES',
                items: [
                    { name: 'Diamond Bangles', gem: 'diamond' },
                    { name: 'Ruby Bangles', gem: 'ruby' },
                    { name: 'Emerald Bangles', gem: 'emerald' },
                    { name: 'Sapphire Bangles', gem: 'sapphire' },
                    { name: 'Lab-Grown Bangles', gem: 'lab' }
                ],
                explore: true
            },
            {
                title: 'MENS JEWELLERY',
                items: [
                    { name: 'Mens Rings', icon: '💍' },
                    { name: 'Mens Earrings', icon: '✨' },
                    { name: 'Mens Necklaces', icon: '⛓️' },
                    { name: 'Mens Bracelets', icon: '⭕' },
                    { name: 'Brooches', icon: '📍' },
                    { name: 'Cufflinks', icon: '👔' }
                ],
                explore: true
            }
        ],
        promoImages: [
            { img: '/images/engagement-ring.png', label: 'Engagement Rings' },
            { img: '/images/bridal-jewellery.png', label: 'Bridal Necklaces' },
        ]
    },
    COLLECTIONS: {
        isGrid: true,
        promoImages: [
            { img: '/images/mens-jewellery.png', label: "Men's Jewellery" },
            { img: '/images/bridal-jewellery.png', label: 'Bridal Jewellery' },
            { img: '/images/mega_aurora.png', label: 'Aurora' },
            { img: '/images/gardens-twilight.png', label: 'Gardens At Twilight' },
            { img: '/images/mega_zodiac.png', label: 'Zodiac Jewellery' },
        ]
    },
    GIFTS: {
        columns: [
            {
                title: 'GIFTS BY OCCASION',
                items: [
                    { name: 'Anniversary', icon: '💍' },
                    { name: 'Engagement', icon: '💎' },
                    { name: 'Wedding', icon: '🕊️' },
                    { name: 'Valentine\'s Day', icon: '❤️' },
                    { name: 'Promise Rings', icon: '🤝' }
                ],
                explore: true
            },
            {
                title: 'GIFTS BY PRICE',
                items: [
                    { name: 'Below ₹10,000' },
                    { name: '₹10,000 - ₹25,000' },
                    { name: '₹25,000 - ₹50,000' },
                    { name: '₹50,000 - ₹1,00,000' },
                    { name: '₹1,00,000 - ₹2,00,000' },
                    { name: 'Above ₹2,00,000' }
                ],
                divider: true,
                subSection: {
                    title: 'GIFTS BY CATEGORY',
                    items: [
                        { name: 'Nose Pin', icon: '✨' },
                        { name: 'Brooches', icon: '📍' },
                        { name: 'Cufflinks', icon: '👔' },
                        { name: 'Smartwatch Charms', icon: '⌚' }
                    ]
                }
            },
            {
                title: 'POPULAR GIFTS',
                items: [
                    { name: 'Initials Jewellery', icon: 'A' },
                    { name: 'Religious Jewellery', icon: 'ॐ' },
                    { name: 'Bridal Necklaces', icon: '💎' },
                    { name: 'Navratna Jewellery', icon: '🌈' },
                    { name: 'Heart Jewellery', icon: '❤️' },
                    { name: 'Cocktail Rings', icon: '🍸' }
                ],
                divider: true,
                subSection: {
                    title: 'GIFTS BY METAL TYPE',
                    items: [
                        { name: '9 KT Gold', icon: '💛' },
                        { name: '14 KT Gold', icon: '💛' },
                        { name: '18 KT Gold', icon: '💛' },
                        { name: '925 Silver', icon: '🤍' }
                    ]
                }
            },
            {
                title: 'GIFTS BY BIRTHSTONE',
                items: [
                    { name: 'January-Born' },
                    { name: 'February-Born' },
                    { name: 'March-Born' },
                    { name: 'April-Born' },
                    { name: 'May-Born' },
                    { name: 'June-Born' },
                    { name: 'July-Born' },
                    { name: 'August-Born' },
                    { name: 'September-Born' },
                    { name: 'October-Born' },
                    { name: 'November-Born' },
                    { name: 'December-Born' }
                ],
                explore: true
            }
        ],
        promoImages: [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400', label: 'Aquamarine Rings' },
            { img: '/images/initials-jewellery.png', label: 'Initials Jewellery' },
        ]
    }
};

const navLinks = [
    { name: 'RINGS', path: '/shop?cat=rings', hasMega: true, type: 'standard' },
    { name: 'EARRINGS', path: '/shop?cat=earrings', hasMega: true, type: 'standard' },
    { name: 'NECKLACES', path: '/shop?cat=necklaces', hasMega: true, type: 'standard' },
    { name: 'BANGLES & BRACELETS', path: '/shop?cat=bracelets', hasMega: true, type: 'standard' },
    { name: 'ENGAGEMENT & WEDDING', path: '/shop?cat=engagement', hasMega: true, type: 'dynamic' },
    { name: 'COLLECTIONS', path: '/shop', hasMega: true, type: 'grid' },
    { name: 'GIFTS', path: '/gifts', hasMega: true, type: 'dynamic' },
];

// ============ MEGA MENU COMPONENT ============
const MegaMenu = ({ data, category, type }) => {
    if (!data) return null;

    // Grid Layout for Collections
    if (type === 'grid' || data.isGrid) {
        return (
            <div className="rare-mega-menu">
                <div className="rare-mega-inner" style={{ padding: '28px 32px' }}>
                    <div className="rare-mega-grid-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', width: '100%' }}>
                        {data.promoImages.map((promo, i) => (
                            <Link key={i} to="/shop" className="rare-mega-promo-card">
                                <div className="rare-mega-promo-img" style={{ aspectRatio: '1' }}>
                                    <img src={promo.img} alt={promo.label} />
                                </div>
                                <div className="rare-mega-promo-label">
                                    <span>{promo.label}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Dynamic Columns Layout (for Engagement & Gifts)
    if (type === 'dynamic' && data.columns) {
        return (
            <div className="rare-mega-menu">
                <div className="rare-mega-inner">
                    <div className="rare-mega-columns">
                        {data.columns.map((col, idx) => (
                            <div key={idx} className="rare-mega-col">
                                <h4 className="rare-mega-heading">{col.title}</h4>
                                <ul className="rare-mega-list">
                                    {col.items.map((item, i) => (
                                        <li key={i}>
                                            <Link to="/shop" className="rare-mega-link">
                                                {item.gem ? (
                                                    <GemDot gem={item.gem} color={item.color} />
                                                ) : item.icon ? (
                                                    <span className="rare-mega-metal-icon" style={{ opacity: item.icon === '💎' || item.icon === '🤍' ? 0.7 : 1 }}>{item.icon}</span>
                                                ) : null}
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                {col.explore && <Link to="/shop" className="rare-mega-explore">Explore All</Link>}

                                {col.divider && <div className="rare-mega-divider" />}

                                {col.subSection && (
                                    <>
                                        <h4 className="rare-mega-heading" style={{ marginTop: col.divider ? '0' : '20px' }}>{col.subSection.title}</h4>
                                        <ul className="rare-mega-list">
                                            {col.subSection.items.map((item, i) => (
                                                <li key={i}>
                                                    <Link to="/shop" className="rare-mega-link">
                                                        {item.icon && <span className="rare-mega-metal-icon">{item.icon}</span>}
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        {col.subSection.explore && <Link to="/shop" className="rare-mega-explore">Explore All</Link>}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="rare-mega-promos">
                        {data.promoImages.map((promo, i) => (
                            <Link key={i} to="/shop" className="rare-mega-promo-card">
                                <div className="rare-mega-promo-img">
                                    <img src={promo.img} alt={promo.label} />
                                </div>
                                <div className="rare-mega-promo-label">
                                    <span>{promo.label}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Standard Layout (for Rings, Earrings, Necklaces, Bracelets)
    const isBracelet = category === 'BANGLES & BRACELETS';

    return (
        <div className="rare-mega-menu">
            <div className="rare-mega-inner">
                {/* LEFT CONTENT COLUMNS */}
                <div className="rare-mega-columns">
                    {/* Column 1: Featured */}
                    <div className="rare-mega-col">
                        <h4 className="rare-mega-heading">FEATURED</h4>
                        <ul className="rare-mega-list">
                            {data.featured.map((item, i) => (
                                <li key={i}>
                                    <Link to="/shop" className="rare-mega-link">
                                        <span className="rare-mega-icon">💎</span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Natural Gemstone */}
                    <div className="rare-mega-col">
                        <h4 className="rare-mega-heading">{data.naturalGemstone.title}</h4>
                        <ul className="rare-mega-list">
                            {data.naturalGemstone.items.map((item, i) => (
                                <li key={i}>
                                    <Link to="/shop" className="rare-mega-link">
                                        <GemDot gem={item.gem} />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link to="/shop" className="rare-mega-explore">Explore All</Link>

                        {/* Bangles sub-section */}
                        {isBracelet && data.naturalBangles && (
                            <>
                                <h4 className="rare-mega-heading" style={{ marginTop: '16px' }}>{data.naturalBangles.title}</h4>
                                <ul className="rare-mega-list">
                                    {data.naturalBangles.items.map((item, i) => (
                                        <li key={i}>
                                            <Link to="/shop" className="rare-mega-link">
                                                <GemDot gem={item.gem} />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/shop" className="rare-mega-explore">Explore All</Link>
                            </>
                        )}
                    </div>

                    {/* Column 3: Lab-Grown + Stone Shape/Length */}
                    <div className="rare-mega-col">
                        <h4 className="rare-mega-heading">{data.labGrown.title}</h4>
                        <ul className="rare-mega-list">
                            {data.labGrown.items.map((item, i) => (
                                <li key={i}>
                                    <Link to="/shop" className="rare-mega-link">
                                        <GemDot gem={item.gem} />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link to="/shop" className="rare-mega-explore">Explore All</Link>

                        {isBracelet && data.labGrownBangles && (
                            <>
                                <h4 className="rare-mega-heading" style={{ marginTop: '16px' }}>{data.labGrownBangles.title}</h4>
                                <ul className="rare-mega-list">
                                    {data.labGrownBangles.items.map((item, i) => (
                                        <li key={i}>
                                            <Link to="/shop" className="rare-mega-link">
                                                <GemDot gem={item.gem} />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/shop" className="rare-mega-explore">Explore All</Link>
                            </>
                        )}

                        {data.stoneShape && (
                            <>
                                <h4 className="rare-mega-heading" style={{ marginTop: '20px' }}>{data.stoneShape.title}</h4>
                                <ul className="rare-mega-list">
                                    {data.stoneShape.items.map((item, i) => (
                                        <li key={i}>
                                            <Link to="/shop" className="rare-mega-link">
                                                <span className="rare-mega-icon-shape">◆</span>
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/shop" className="rare-mega-explore">Explore All</Link>
                            </>
                        )}
                    </div>

                    {/* Column 4: Price Range + Metal Purity */}
                    <div className="rare-mega-col">
                        <h4 className="rare-mega-heading">{data.priceRange.title}</h4>
                        <ul className="rare-mega-list rare-mega-price-list">
                            {data.priceRange.items.map((item, i) => (
                                <li key={i}>
                                    <Link to="/shop" className="rare-mega-link">{item}</Link>
                                </li>
                            ))}
                        </ul>

                        <div className="rare-mega-divider" />

                        <h4 className="rare-mega-heading">{data.metalPurity.title}</h4>
                        <ul className="rare-mega-list">
                            {data.metalPurity.items.map((item, i) => (
                                <li key={i}>
                                    <Link to="/shop" className="rare-mega-link">
                                        <span className="rare-mega-metal-icon">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* RIGHT PROMO IMAGES */}
                <div className="rare-mega-promos">
                    {data.promoImages.map((promo, i) => (
                        <Link key={i} to="/shop" className="rare-mega-promo-card">
                            <div className="rare-mega-promo-img">
                                <img src={promo.img} alt={promo.label} />
                            </div>
                            <div className="rare-mega-promo-label">
                                <span>{promo.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ANNOUNCEMENTS = [
    "BIS Hallmarked & Certified Jewellery ✨",
    "Free Secure Shipping on All Orders 🚚",
    "Easy 30-Day Returns & Exchanges 🔄"
];

// ============ HEADER COMPONENT ============
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMega, setActiveMega] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const megaTimeoutRef = useRef(null);
    const { cartCount } = useCart();
    const { wishlistItems } = useWishlist();
    const { openLogin, isLoggedIn } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const handleMegaEnter = (name) => {
        clearTimeout(megaTimeoutRef.current);
        setActiveMega(name);
    };

    const handleMegaLeave = () => {
        megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 150);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* ===== TOP ANNOUNCEMENT BAR ===== */}
            <div className="rare-announcement-bar relative overflow-hidden flex justify-center items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentAnnouncementIndex}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute w-full text-center"
                    >
                        <span>{ANNOUNCEMENTS[currentAnnouncementIndex]}</span>
                    </motion.div>
                </AnimatePresence>
                {/* Invisible spacer to explicitly hold height */}
                <span className="invisible">{ANNOUNCEMENTS[0]}</span>
            </div>

            {/* ===== MAIN HEADER BAR ===== */}
            <div className={`rare-header-main ${isScrolled ? 'rare-header-scrolled' : ''}`}>
                <div className="rare-header-container">
                    <div className="rare-header-left">
                        <button className="lg:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={22} />
                        </button>
                        <a href="tel:+918001001313" className="rare-phone-link hidden lg:flex">
                            <Phone size={14} />
                            <span>+91 800 100 1313</span>
                        </a>
                    </div>

                    <Link to="/" className="rare-logo flex items-center justify-center">
                        <img src="/images/Rare-Jewels-logo.svg" alt="Rare Jewels" className="h-6 md:h-12" />
                    </Link>

                    <div className="rare-header-right">
                        <div className="rare-search-box hidden lg:flex">
                            <Search size={16} className="rare-search-icon" />
                            <input type="text" placeholder="SEARCH" className="rare-search-input" />
                        </div>
                        <button onClick={() => isLoggedIn ? navigate('/dashboard') : openLogin()} className="rare-icon-btn hidden sm:block">
                            <User size={20} strokeWidth={1.5} />
                        </button>
                        <Link to="/wishlist" className="rare-icon-btn relative">
                            <Heart size={20} strokeWidth={1.5} />
                            {wishlistItems.length > 0 && (
                                <span className="rare-badge">{wishlistItems.length}</span>
                            )}
                        </Link>
                        <Link to="/cart" className="rare-icon-btn relative">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="rare-badge">{cartCount}</span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ===== NAVIGATION BAR WITH MEGA MENUS ===== */}
            <nav className={`rare-nav ${isScrolled ? 'rare-nav-scrolled' : ''}`}>
                <div className="rare-nav-inner">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="rare-nav-item"
                            onMouseEnter={() => link.hasMega && handleMegaEnter(link.name)}
                            onMouseLeave={handleMegaLeave}
                        >
                            <Link to={link.path} className={`rare-nav-link ${activeMega === link.name ? 'active' : ''}`}>
                                {link.name}
                            </Link>

                            {/* Mega Menu Dropdown */}
                            {link.hasMega && activeMega === link.name && (
                                <MegaMenu data={megaMenuData[link.name]} category={link.name} type={link.type} />
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* ===== MOBILE MENU DRAWER ===== */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[400px] bg-white z-[70] flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <div className="rare-logo flex items-center">
                                    <img src="/images/Rare-Jewels-logo.svg" alt="Rare Jewels" className="h-6" />
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="border-b border-gray-100">
                                        <div className="flex items-center justify-between px-6 py-4">
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-xs font-semibold uppercase tracking-widest text-gray-800"
                                            >
                                                {link.name}
                                            </Link>
                                            {link.hasMega && (
                                                <button
                                                    onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                                                    className="p-1 text-gray-500"
                                                >
                                                    <ChevronDown
                                                        size={16}
                                                        className={`transform transition-transform ${mobileExpanded === link.name ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {/* Mobile Expanded Sub-menu */}
                                        {link.hasMega && mobileExpanded === link.name && megaMenuData[link.name] && (
                                            <div className="px-6 pb-4 bg-gray-50">
                                                <div className="mb-3">
                                                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">Featured</p>
                                                    {megaMenuData[link.name].featured.slice(0, 5).map((item, i) => (
                                                        <Link
                                                            key={i}
                                                            to="/shop"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block py-1.5 text-xs text-gray-600"
                                                        >
                                                            {item}
                                                        </Link>
                                                    ))}
                                                </div>
                                                <Link
                                                    to="/shop"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="text-xs font-semibold text-[#2B5C6B] underline"
                                                >
                                                    View All
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-gray-50 text-center border-t border-gray-200">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Need Help?</p>
                                <p className="text-sm font-medium text-gray-800">+91 800 100 1313</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
