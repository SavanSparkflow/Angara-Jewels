import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogCategory = () => {
    const { category } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    const categories = [
        { name: "BUYING GUIDE", slug: "buying-guide" },
        { name: "DIAMOND", slug: "diamond" },
        { name: "EDUCATION", slug: "education" },
        { name: "GEMSTONES", slug: "gemstones" },
        { name: "GIFTING IDEAS", slug: "gifting_ideas" },
        { name: "NEWS & EVENTS", slug: "news-events" },
        { name: "TRENDS & STYLE", slug: "trends-style" }
    ];

    const blogPosts = {
        "buying-guide": [
            {
                title: "Do Lab-Grown Gemstones Hold Value In India? A 2026 Resale Guide",
                excerpt: "Lab-grown gemstones are everywhere right now. From engagement rings to everyday jewelry, more buyers are choosing them for their affordability, and ethical appeal. But there's one question people surely ask...",
                image: "/images/hero-banner.png",
                date: "Jan 15, 2026"
            },
            {
                title: "Diamond Prices in India Today: Complete Guide & Trends",
                excerpt: "Buying a diamond in India can be like entering a vibrant bazaar with too many good options. Everything looks dazzling; everyone has an opinion, and the prices are wing wildly. And it can take away all of the fun of the...",
                image: "/images/plp_top_promo_1772789597196.png",
                date: "Jan 10, 2026"
            },
            {
                title: "How Rare Jewels Helps You Personalise Jewellery With Meaningful Details",
                excerpt: "In India, the gift of jewelry usually lies at the heart of when someone reaches a milestone, celebrate their birth, or when a couple celebrates their first year. When a dream is achieved, when art meets to celebrate, and when we do...",
                image: "/images/mega_aurora_1772788806767.png",
                date: "Jan 05, 2026"
            }
        ],
        "diamond": [
            {
                title: "Do Lab-Grown Gemstones Hold Value In India? A 2026 Resale Guide",
                excerpt: "Lab-grown gemstones are everywhere right now. From engagement rings to everyday jewelry, more buyers are choosing them for their affordability, and ethical appeal. But there's one question people surely ask...",
                image: "/images/hero-banner.png",
                date: "Jan 15, 2026"
            },
            {
                title: "Diamond Prices in India Today: Complete Guide & Trends",
                excerpt: "Buying a diamond in India can be like entering a vibrant bazaar with too many good options. Everything looks dazzling; everyone has an opinion, and the prices are wing wildly. And it can take away all of the fun of the...",
                image: "/images/plp_top_promo_1772789597196.png",
                date: "Jan 10, 2026"
            },
            {
                title: "5 CT Lab grown Engagement Rings: Best Picks Under 5 Lakh in 2026",
                excerpt: "Big love deserves a bold ring, and in 2026, we are not just whispering 5 carats... we are saying it with 2 carats of brilliance. If you have been dreaming of a lab grown engagement ring that turns heads but doesn't empty your savings...",
                image: "/images/mega_aurora_1772788806767.png",
                date: "Jan 02, 2026"
            }
        ],
        "education": [
            {
                title: "What Are The Astrological Benefits Of Wearing Tanzanite Jewellery?",
                excerpt: "If you are already aware that gems each other with earlier in mind and you want to use your birthstone, you're getting yourself spiced level up! It can be a piece start for a time if it happens at the time. Find out what blue gem it is...",
                image: "/images/plp_top_promo_1772789597196.png",
                date: "Jan 12, 2026"
            },
            {
                title: "What's the Difference Between Lab-Grown and Natural Diamond Tennis Bracelets — and Which Is...",
                excerpt: "If there's a very particular piece of jewelry that a white dress doesn't make look less about, and that sparkle all stylish in your wrist that look as right with a run-and-done as with a cocktail evening. Let us library to our customers...",
                image: "/images/hero-banner.png",
                date: "Jan 08, 2026"
            },
            {
                title: "Custom vs Ready-Made Engagement Rings: Which One Tells Your Love Story Best?",
                excerpt: "You have found the one? The build after around the piece is ready, and now there is just one sneaky question still in the mind — what should I do? should you pop the question with a custom engagement ring that tells your story...",
                image: "/images/mega_aurora_1772788806767.png",
                date: "Jan 02, 2026"
            }
        ],
        "gemstones": [
            {
                title: "Best Lab-Grown Aquamarine Engagement Rings 2026",
                excerpt: "In 2026, more couples are stepping away from the predictable sparkle and choosing something that feels personal. Something that tells a story. And guess what? When searching for the perfect blue stone that reflects the sky above...",
                image: "/images/hero-banner.png",
                date: "Jan 01, 2026"
            },
            {
                title: "Are Lab Grown Emerald Bracelets & Natural Ones, Same?",
                excerpt: "Are you thinking of gorgeous emerald bracelet? Near slightly rising, velvet colors famous... but that carries the big question. When do we go natural or lab-grown? Let us solve it this together. No drama. No judgement. Just...",
                image: "/images/plp_top_promo_1772789597196.png",
                date: "Dec 28, 2025"
            },
            {
                title: "Yellow Sapphire Jewellery You'll Keep Reaching for in Your Collection",
                excerpt: "Fine jewelry should be more than just shiny... pearls in life, yet anything that builds our souls happens choosing new gems in that warm, golden glow. And perfectly everything feels light, brighter. Air and you. Select any fine jewellery...",
                image: "/images/mega_aurora_1772788806767.png",
                date: "Dec 20, 2025"
            }
        ],
        "gifting_ideas": [
            {
                title: "How Rare Jewels Helps You Personalise Jewellery With Meaningful Details",
                excerpt: "In India, the gift of jewelry usually lies at the heart of when someone reaches a milestone, celebrate their birth, or when a couple celebrates their first year. When a dream is achieved, when art meets to celebrate, and when we do...",
                image: "/images/mega_aurora_1772788806767.png",
                date: "Jan 05, 2026"
            },
            {
                title: "Top 7 Valentine's Day Gifts for Her That Are Actually Romantic",
                excerpt: "Seriously! It's almost here and you're possibly after that city feeling box being formed in red, chocolate that disappear in midnight, and 'safe' gifts. When's the last time you was want them to have it for Valentine's Day?",
                image: "/images/plp_top_promo_1772789597196.png",
                date: "Dec 15, 2025"
            },
            {
                title: "Why Lab-Grown Cluster Diamond Open Heart Stud Earrings are the Perfect Gift",
                excerpt: "We love a great tale and get us every time on what we do as builders and drapers... a sparkle, a random perfume, something 'cool' but our hearts, then make the best sentiment to reach out right when we think and provide that...",
                image: "/images/hero-banner.png",
                date: "Dec 10, 2025"
            }
        ]
    };

    const currentPosts = blogPosts[category] || blogPosts["buying-guide"];
    const currentCategoryName = categories.find(c => c.slug === category)?.name || "BUYING GUIDE";

    const bannerSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        appendDots: dots => (
            <div style={{ bottom: "30px" }}>
                <ul className="blog-banner-dots m-0 p-0 flex justify-center"> {dots} </ul>
            </div>
        ),
    };

    return (
        <div className="w-full bg-white">
            {/* Featured Banner Slider */}
            <div className="w-full bg-[#111] overflow-hidden relative">
                <Slider {...bannerSettings}>
                    {currentPosts.map((post, index) => (
                        <div key={index} className="relative h-[400px] md:h-[500px] w-full focus:outline-none">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                                style={{ backgroundImage: `url(${post.image})` }}
                            ></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                                <span className="text-[10px] md:text-xs tracking-[0.2em] font-medium mb-4 uppercase text-gray-300">
                                    {currentCategoryName}
                                </span>
                                <h1 className="text-2xl md:text-4xl lg:text-3xl font-poppins max-w-4xl leading-tight mb-8">
                                    {post.title}
                                </h1>
                                <Link to="/blog/best-lab-grown-aquamarine-engagement-rings-2026" className="border border-white text-white px-8 py-3 text-[10px] tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                                    READ MORE
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Categories Navigation */}
            <div className="w-full border-b border-gray-100 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <ul className="flex flex-nowrap md:flex-wrap justify-start md:justify-center overflow-x-auto py-5 gap-6 md:gap-8 hide-scrollbar">
                        {categories.map((cat, idx) => (
                            <li key={idx} className="flex-shrink-0">
                                <Link
                                    to={`/blog/category/${cat.slug}`}
                                    className={`text-[10px] tracking-widest uppercase font-semibold pb-1 transition-all ${category === cat.slug ? 'text-[#000] border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Blog Post List */}
            <div className="container mx-auto px-4 max-w-5xl py-16">
                <div className="space-y-20">
                    {currentPosts.map((post, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-8 items-center group">
                            <div className="w-full md:w-2/5 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="w-full md:w-3/5">
                                <span className="text-[10px] tracking-[0.2em] font-medium mb-3 uppercase text-gray-400 block">
                                    {currentCategoryName}
                                </span>
                                <Link to="/blog/best-lab-grown-aquamarine-engagement-rings-2026">
                                    <h2 className="text-xl md:text-2xl font-serif text-[#1e1e1e] mb-4 leading-tight group-hover:text-gray-600 transition-colors">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="border border-black text-black px-10 py-3 text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition-colors">
                        VIEW MORE
                    </button>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="container mx-auto px-4 max-w-5xl pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-[300px] overflow-hidden">
                        <img src="/images/buying-guide.png" className="w-full h-full object-cover" alt="grid" />
                    </div>
                    <div className="h-[300px] overflow-hidden">
                        <img src="/images/mega_aurora_1772788806767.png" className="w-full h-full object-cover" alt="grid" />
                    </div>
                    <div className="h-[300px] overflow-hidden">
                        <img src="/images/plp_top_promo_1772789597196.png" className="w-full h-full object-cover" alt="grid" />
                    </div>
                </div>
            </div>

            <style>{`
                .blog-banner-dots li {
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                }
                .blog-banner-dots li button {
                    width: 8px;
                    height: 8px;
                    padding: 0;
                }
                .blog-banner-dots li button:before {
                    font-size: 8px;
                    color: rgba(255, 255, 255, 0.4);
                    opacity: 1;
                    line-height: 8px;
                    width: 8px;
                    height: 8px;
                }
                .blog-banner-dots li.slick-active button:before {
                    color: white;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default BlogCategory;
