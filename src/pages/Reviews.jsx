import React from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        user: "Mark",
        verified: true,
        rating: 5,
        date: "02/08/24",
        title: "SHE LOVED THE RING!",
        content: "Buying it through Rare Jewels was easy. The representation of design and quality were fantastic! Thank you!!!",
        response: "Rare Jewels Reply: So great that! We always hope that individual jewelry pieces can speak for themselves. Glad it was so well received!",
        product: "Round Diamond Ring With Trio Scalloped Halo"
    },
    {
        id: 2,
        user: "Anne",
        verified: true,
        rating: 5,
        date: "25/07/24",
        title: "The BEST!",
        content: "We've searched for the right ring for years. This is it! Handcrafted look and feel that's so special and unique. We love it!",
        images: ["/images/review-ring-1.png"],
        product: "Petite Diamond Eternity Band In 14k White Gold"
    },
    {
        id: 3,
        user: "Lisa",
        verified: true,
        rating: 5,
        date: "12/07/24",
        title: "Love the sparkle!",
        content: "Unbelievable sparkle! My husband chose it for me and I couldn't be happier. It's so much more stunning in person than online. Best buy ever!",
        images: ["/images/review-ring-2.png"],
        product: "Cushion Cut Halo Scalloped Band Lab Grown Diamond"
    },
    {
        id: 4,
        user: "K.",
        verified: true,
        rating: 5,
        date: "05/07/24",
        title: "Perfect in every way",
        content: "The craftsmanship is attention to detail is amazing! This is my second purchase and surely not my last. Truly a gem company.",
        product: "Vintage Floral Lab Grown Diamond Ring"
    },
    {
        id: 5,
        user: "Rachael",
        verified: true,
        rating: 5,
        date: "01/07/24",
        title: "Stunning order! SO GLAD I DID",
        content: "I was hesitant to buy jewelry online, but the experience was so smooth and the ring is beyond my expectation. Thank you!",
        images: ["/images/review-ring-3.png"],
        product: "Minimalist Knife Edge Lab Grown Diamond Ring"
    },
    {
        id: 6,
        user: "Tom",
        verified: true,
        rating: 5,
        date: "20/06/24",
        title: "Amazing Quality!!",
        content: "The best customer service and support and the product is amazing and looks very nice. The box packing and jewelry set is very very good.",
        product: "Lab Grown Diamond Necklace With Halo Drop"
    }
];

const Reviews = () => {
    return (
        <div className="bg-white min-h-screen select-none">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:py-8">
                <nav className="flex text-[12px] font-medium text-gray-400 my-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><Link to="/" className="hover:text-black">Home</Link></li>
                        <li>/</li>
                        <li className="text-black">Customer Reviews</li>
                    </ol>
                </nav>

                {/* Header Title */}
                <div className="text-center mb-16 space-y-2">
                    <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-black">Customer Reviews</h1>
                    <div className="flex justify-center items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#D4AF37" stroke="none" />)}
                    </div>
                    <p className="text-[13px] text-[#000815] font-medium">3537 Reviews</p>
                </div>

                <div className="container px-4 mx-auto">
                    {/* Total Score Banner */}
                    <div className="border-y border-gray-100 py-10 mb-16 text-center">
                        <h2 className="unna-font text-[24px] font-normal text-[#000815] mb-2">3537 Reviews</h2>
                        <div className="flex justify-center items-center gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#D4AF37" stroke="none" />)}
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-20 pb-10">
                        {REVIEWS.map((review) => (
                            <div key={review.id} className="space-y-6 pb-20 border-b border-gray-100 last:border-b-0">
                                {/* User Info */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] font-bold text-black">{review.user}</span>
                                        {review.verified && (
                                            <div className="flex items-center gap-1 text-[11px] font-bold text-[#00A859] uppercase">
                                                <CheckCircle2 size={12} fill="#00A859" className="text-white" />
                                                Verified
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[12px] text-gray-400 font-medium lowercase italic">{review.date}</span>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="#D4AF37" stroke="none" />)}
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-[16px] font-bold text-black uppercase tracking-tight">{review.title}</h3>
                                    <p className="text-[14px] text-gray-700 leading-relaxed font-light">{review.content}</p>
                                </div>

                                {/* Response Box */}
                                {review.response && (
                                    <div className="bg-[#F9F9F9] p-6 rounded-sm border-l-2 border-gray-200 ml-4">
                                        <p className="text-[13px] text-gray-600 leading-relaxed italic">{review.response}</p>
                                    </div>
                                )}

                                {/* Images */}
                                {review.images && (
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        {review.images.map((img, idx) => (
                                            <div key={idx} className="w-32 h-32 rounded-sm overflow-hidden bg-gray-100 shadow-sm hover:scale-105 transition-transform duration-300">
                                                <img src={img} alt="User jewelry photo" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Product Mention */}
                                <div className="pt-4">
                                    <p className="text-[12px] text-gray-400 font-medium hover:text-black transition-colors cursor-pointer">
                                        Product: <span className="underline">{review.product}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-5 py-5 border-t border-gray-100">
                        <button className="text-gray-300 hover:text-black transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex items-center gap-5">
                            <span className="text-[14px] font-bold text-black border-b border-black">1</span>
                            <span className="text-[14px] font-bold text-gray-300 hover:text-black cursor-pointer">2</span>
                            <span className="text-[14px] font-bold text-gray-300 hover:text-black cursor-pointer">3</span>
                            <span className="text-[14px] font-bold text-gray-300 hover:text-black cursor-pointer">4</span>
                        </div>
                        <button className="text-gray-300 hover:text-black transition-colors">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
