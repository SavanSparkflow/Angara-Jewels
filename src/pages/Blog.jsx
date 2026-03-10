import React from 'react';
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
            link: "#"
        },
        {
            category: "ENGAGEMENT",
            title: "Top 10 Proposal Ideas for Your Special Day",
            image: "/images/mega_aurora_1772788806767.png",
            link: "#"
        },
        {
            category: "TRENDS",
            title: "Exploring the Latest Fine Jewelry Trends",
            image: "/images/plp_top_promo_1772789597196.png",
            link: "#"
        }
    ];

    const categories = [
        "ALL BLOG POSTS", "ENGAGEMENT", "GIFT IDEAS", "GEMSTONE", "WEDDING BANDS", "TRENDS", "FINE JEWELRY", "ASTROLOGY & MORE"
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
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-poppins max-w-4xl leading-tight mb-8">
                                    {slide.title}
                                </h1>
                                <button className="border border-white text-white px-8 py-3 text-xs tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                                    READ MORE
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Categories Navigation */}
            <div className="w-full border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <ul className="flex flex-nowrap md:flex-wrap justify-start md:justify-center overflow-x-auto py-5 gap-6 md:gap-8 hide-scrollbar">
                        {categories.map((cat, idx) => (
                            <li key={idx} className="flex-shrink-0">
                                <a href="#" className={`text-[11px] tracking-widest uppercase font-semibold pb-1 ${idx === 0 ? 'text-[#000] border-b-2 border-black' : 'text-gray-500 hover:text-black transition-colors'}`}>
                                    {cat}
                                </a>
                            </li>
                        ))}
                    </ul>
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
