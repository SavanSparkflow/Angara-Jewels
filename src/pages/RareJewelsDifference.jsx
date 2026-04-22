import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RareJewelsDifference = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const reviewSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } }
        ]
    };

    const reviews = [
        {
            title: "I have tears in my eye",
            text: "This process of getting my upgrade was easier than my original ring hunt!!",
            author: "Anonymous",
            rating: 5
        },
        {
            title: "Over the moon as",
            text: "I am VERY happy and impressed with my purchase!! Everything was as expected",
            author: "Anonymous",
            rating: 5
        },
        {
            title: "The ring is stunning just like in",
            text: "the images.",
            author: "Anonymous",
            rating: 5
        }
    ];

    return (
        <div className="w-full bg-white">
            {/* Hero / Top Banner */}
            <div className="w-full h-[250px] md:h-[350px] bg-[#111] overflow-hidden relative">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url(/images/hero-banner.png)` }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-poppins max-w-4xl leading-tight text-white font-bold">
                        The Rare Jewels Difference
                    </h1>
                </div>
            </div>

            <div className="container px-4 mx-auto py-12 md:py-20 text-center">
                <p className="text-[#132d56] text-xl md:text-2xl font-poppins max-w-4xl mx-auto leading-relaxed">
                    What starts as a family's passion spanning generations, has now become a tradition of crafting pieces that tell your unique story.
                </p>
            </div>

            {/* Section 1: Making Generations of Dreamers */}
            <div className="flex flex-col md:flex-row container px-4 mx-auto gap-8 items-center py-10">
                <div className="w-full md:w-1/2">
                    <img src="/images/craftsmanship.png" alt="Generations" className="w-full h-auto object-cover" />
                </div>
                <div className="w-full md:w-1/2 md:pl-12 lg:pl-20 text-center md:text-left">
                    <h2 className="text-[#132d56] text-2xl md:text-3xl font-poppins mb-4">Making Generations of Dreamers</h2>
                    <p className="text-gray-600 leading-relaxed max-w-lg mb-6 mx-auto md:mx-0">
                        Since our founding, Rare Jewels has been dedicated to crafting fine jewelry that inspires and delights. Our deep roots in gemstone sourcing mean we have access to the finest stones, allowing us to deliver unparalleled quality and beauty direct to you.
                    </p>
                </div>
            </div>

            {/* Section 2: Your Choice, Our Craft */}
            <div className="flex flex-col md:flex-row container px-4 mx-auto gap-8 items-center py-10 md:py-20 bg-gray-50">
                <div className="w-full md:w-1/3 text-center md:text-left md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-[#132d56] text-2xl md:text-3xl font-poppins mb-4">Your Choice, Our Craft</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        From hand-selecting each stone to offering multiple metal and quality options, our robust customization gives you the freedom to match your jewelry to your budget and personal style. It's a true collaborative process resulting in your perfect piece.
                    </p>
                </div>
                <div className="w-full md:w-2/3 flex gap-4">
                    <img src="/images/edit-gemstone.png" alt="Crafting 1" className="w-1/2 object-cover" />
                    <img src="/images/edit-sapphire.png" alt="Crafting 2" className="w-1/2 object-cover" />
                </div>
            </div>

            {/* Section 3: It Will Always Sparkle */}
            <div className="flex flex-col md:flex-row-reverse container px-4 mx-auto gap-8 items-center py-10 md:py-20">
                <div className="w-full md:w-1/2">
                    <img src="/images/edit-diamond.png" alt="Sparkle" className="w-full h-[300px] md:h-[400px] object-cover" />
                </div>
                <div className="w-full md:w-1/2 md:pr-12 lg:pr-20 text-center md:text-right">
                    <h2 className="text-[#132d56] text-2xl md:text-3xl font-poppins mb-4">It will always sparkle</h2>
                    <p className="text-gray-600 leading-relaxed max-w-lg ml-auto mb-6">
                        Our pieces are designed for a lifetime of brilliance. We use only the finest natural and lab-grown diamonds and gemstones. Our skilled jewelers meticulously set each stone to ensure maximum light performance and long-lasting security.
                    </p>
                </div>
            </div>

            {/* Timeless Jewellery Banner */}
            <div className="bg-[#fcf8f0] py-16 px-4 my-10 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-[#132d56] text-2xl md:text-3xl font-poppins mb-4">Timeless Jewellery. Change, Upgrade, Cherish - For Life</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Our 15-day return policy and lifetime warranty ensure that you can shop with confidence. We stand by our products and are committed to your utmost satisfaction from the day of purchase and forever after.
                    </p>
                    <Link to="/exchange-buyback" className="text-blue-600 hover:underline font-medium">Explore Lifetime Exchange and Upgrade Policies</Link>
                </div>
            </div>

            {/* Features (Icons) */}
            <div className="container px-4 mx-auto py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-b border-gray-200">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#132d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    </div>
                    <h3 className="font-bold text-[#132d56] mb-2">BIS Hallmark and Certified</h3>
                    <p className="text-sm text-gray-600">Every piece is certified to guarantee authenticity and purity.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#132d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    </div>
                    <h3 className="font-bold text-[#132d56] mb-2">Free Express Shipping</h3>
                    <p className="text-sm text-gray-600">Fully insured and fast delivery directly to your door.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#132d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>
                    </div>
                    <h3 className="font-bold text-[#132d56] mb-2">Free 15-day Returns & Exchange</h3>
                    <p className="text-sm text-gray-600">Not completely satisfied? Return it within 15 days hassle-free.</p>
                </div>
            </div>

            {/* Testimonials */}
            <div className="container px-4 mx-auto py-16">
                <h2 className="text-[#132d56] text-2xl md:text-3xl font-poppins mb-10 text-center">Your Words, Not Ours</h2>
                <div className="px-4">
                    <Slider {...reviewSettings}>
                        {reviews.map((rev, idx) => (
                            <div key={idx} className="p-4">
                                <div className="bg-[#fcf8f0] p-8 text-center rounded flex flex-col items-center justify-center h-[200px]">
                                    <div className="text-xs  text-[#132d56] uppercase mb-2 font-semibold">
                                        "{rev.title}"
                                    </div>
                                    <div className="flex justify-center mb-3">
                                        {[...Array(rev.rating)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm italic">
                                        {rev.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="text-center mt-6">
                    <a href="#" className="text-blue-600 hover:underline">Read All Reviews</a>
                </div>
            </div>

            {/* Shop by Category Footer Menu Links */}
            <div className="container px-4 mx-auto py-16 text-center">
                <h2 className="text-[#132d56] text-xl font-poppins mb-8">Shop By Category</h2>
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    <Link to="/search" className="text-gray-600 hover:text-[#132d56] hover:underline">Necklaces</Link>
                    <Link to="/search" className="text-gray-600 hover:text-[#132d56] hover:underline">Earrings</Link>
                    <Link to="/search" className="text-gray-600 hover:text-[#132d56] hover:underline">Rings</Link>
                    <Link to="/search" className="text-gray-600 hover:text-[#132d56] hover:underline">Bracelets</Link>
                    <Link to="/search" className="text-gray-600 hover:text-[#132d56] hover:underline">Engagement Rings</Link>
                    <Link to="/search" className="text-gray-600 hover:text-[#132d56] hover:underline">Wedding Bands</Link>
                </div>
            </div>

            <style>{`
                .slick-dots li button:before {
                    font-size: 8px;
                    color: #132d56;
                }
            `}</style>
        </div>
    );
};

export default RareJewelsDifference;
