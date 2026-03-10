import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Blog = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        appendDots: dots => (
            <div style={{ bottom: "20px" }}>
                <ul className="blog-slider-dots m-0 p-0 flex justify-center"> {dots} </ul>
            </div>
        ),
    };

    const sliderData = [
        {
            category: "WEDDING",
            title: "Best Lab-Grown Aquamarine Engagement Rings 2026",
            image: "/images/hero-banner.png",
            link: "/blog/category/gemstones"
        },
        {
            category: "ENGAGEMENT",
            title: "Top 10 Proposal Ideas for Your Special Day",
            image: "/images/mega_aurora_1772788806767.png",
            link: "/blog/category/diamond"
        },
        {
            category: "TRENDS",
            title: "Exploring the Latest Fine Jewelry Trends",
            image: "/images/plp_top_promo_1772789597196.png",
            link: "/blog/category/trends-style"
        }
    ];

    const categories = [
        { name: "ALL BLOG POSTS", slug: "all" },
        { name: "BUYING GUIDE", slug: "buying-guide" },
        { name: "DIAMOND", slug: "diamond" },
        { name: "EDUCATION", slug: "education" },
        { name: "GEMSTONES", slug: "gemstones" },
        { name: "GIFTING IDEAS", slug: "gifting_ideas" },
        { name: "NEWS & EVENTS", slug: "news-events" },
        { name: "TRENDS & STYLE", slug: "trends-style" }
    ];

    return (
        <div className="w-full bg-white">
            {/* Banner Slider */}
            <div className="w-full bg-[#111] overflow-hidden relative">
                <Slider {...sliderSettings}>
                    {sliderData.map((slide, index) => (
                        <div key={index} className="relative h-[400px] md:h-[500px] w-full focus:outline-none">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            ></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                                <span className="text-[10px] md:text-xs tracking-[0.2em] font-medium mb-4 uppercase text-gray-300">
                                    {slide.category}
                                </span>
                                <h1 className="text-2xl md:text-4xl lg:text-3xl font-poppins max-w-4xl leading-tight mb-8">
                                    {slide.title}
                                </h1>
                                <Link to={slide.link} className="border border-white text-white px-8 py-3 text-[10px] tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
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
                                    to={cat.slug === 'all' ? '/blog' : `/blog/category/${cat.slug}`}
                                    className={`text-[10px] tracking-widest uppercase font-semibold pb-1 transition-all ${idx === 0 ? 'text-[#000] border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Default Blog List (Placeholder for main page) */}
            <div className="container mx-auto px-4 max-w-5xl py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Placeholder for main blog page content */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="flex flex-col group">
                            <div className="h-[250px] overflow-hidden mb-6">
                                <img src={`/images/mega_aurora_1772788806767.png`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="post" />
                            </div>
                            <span className="text-[9px] tracking-[0.2em] font-medium mb-2 uppercase text-gray-400">CATEGORY</span>
                            <h3 className="text-lg font-serif mb-3 leading-tight group-hover:text-gray-600 transition-colors">Amazing Jewelry Design Trends for 2026</h3>
                            <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">Exploring the most beautiful and elegant jewelry designs that are set to take over the industry this year.</p>
                            <Link to="/blog/category/buying-guide" className="text-[10px] font-bold tracking-widest uppercase border-b border-black w-max pb-1">Read More</Link>
                        </div>
                    ))}
                </div>
            </div>


            <style>{`
                .blog-slider-dots li {
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                }
                .blog-slider-dots li button {
                    width: 8px;
                    height: 8px;
                    padding: 0;
                }
                .blog-slider-dots li button:before {
                    font-size: 8px;
                    color: rgba(255, 255, 255, 0.4);
                    opacity: 1;
                    line-height: 8px;
                    width: 8px;
                    height: 8px;
                }
                .blog-slider-dots li.slick-active button:before {
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

export default Blog;
