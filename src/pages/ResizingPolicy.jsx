import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const ResizingPolicy = () => {
    return (
        <PolicyLayout>
            <h1 className="text-2xl font-poppins text-gray-900 mb-8 font-light">Resizing Policy</h1>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-8">
                We want your jewellery to be cherished for years to come, so a perfect fit is essential.
            </p>

            <h2 className="text-lg font-poppins text-gray-900 mb-4 font-normal">Wristlet & Ring Resize Policy Details</h2>
            <ul className="list-disc pl-5 space-y-2 text-[14px] text-gray-700 leading-[1.8] mb-8 marker:text-gray-400">
                <li>One free resizing within 15 days of delivery with insured return shipping.</li>
                <li>Resizing may alter metal weight; differences over Rs. 500 will be charged or refunded.</li>
                <li>Some ring/bracelet/bangle designs may not be resizable due to structure.</li>
                <li>Requests after 15 days require contacting customer service.</li>
                <li>Products resized or altered by third parties are not accepted.</li>
                <li>Once resizing is requested, the 15-day return policy no longer applies; the product is then covered under Lifetime Exchange & Buyback.</li>
            </ul>

            <p className="text-[14px] text-gray-700 leading-[1.8] mb-1">
                <strong className="font-medium text-gray-900">Still got queries?</strong>
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.8]">
                Reach out to our customer service team by phone or WhatsApp chat on +91-8001001313, or email at india.support@Rare Jewels.com.
            </p>
        </PolicyLayout>
    );
};

export default ResizingPolicy;
