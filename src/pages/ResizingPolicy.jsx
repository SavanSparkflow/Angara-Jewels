import React from 'react';
import { Link } from 'react-router-dom';

const ResizingPolicy = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:py-8 py-2 mt-1">
                <nav className="flex text-[12px] font-medium text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                        <li>/</li>
                        <li className="text-black">Resizing Policy</li>
                    </ol>
                </nav>
            </div>

            {/* Header Content */}
            <div className="pb-10 bg-white text-center px-4">
                <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-black mb-2">Resizing Policy</h1>
                <p className="text-[14px] text-[#000815] max-w-2xl mx-auto leading-relaxed italic">
                    We want your jewellery to be cherished for years to come, so a perfect fit is essential.
                </p>
            </div>

            {/* Main Content */}
            <section className="max-w-4xl mx-auto px-4 pb-14 text-center">
                <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-4 mb-10 inline-block px-10">
                    Wristlet & Ring Resize Policy Details
                </h2>

                <div className="space-y-6 text-[14px] text-[#000815] leading-relaxed max-w-3xl mx-auto text-left list-none">
                    <div className="flex gap-4">
                        <span className="text-gray-400">•</span>
                        <p>One free resizing within 15 days of delivery with insured return shipping.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-gray-400">•</span>
                        <p>Resizing may alter metal weight; differences over ₹ 500 will be charged or refunded.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-gray-400">•</span>
                        <p>Some ring/bracelet/bangle designs may not be resizable due to structure.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-gray-400">•</span>
                        <p>Requests after 15 days require contacting customer service.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-gray-400">•</span>
                        <p>Products resized or altered by third parties are not accepted.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-gray-400">•</span>
                        <p>Once resizing is requested, the 15-day return policy no longer applies; the product is then covered under Lifetime Exchange & Buyback.</p>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-50">
                    <p className="font-bold text-black mb-4">Still got queries?</p>
                    <p className="text-[13px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Reach out to our customer service team by phone or WhatsApp chat on <a href="tel:+918001001313" className="text-black font-medium hover:underline">+91-8001001313</a>, or email at <a href="mailto:india.support@rarejewels.com" className="text-black font-medium hover:underline">india.support@rarejewels.com</a>.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ResizingPolicy;
