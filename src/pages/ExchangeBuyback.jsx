import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const ExchangeBuyback = () => {
    return (
        <PolicyLayout>
            <h1 className="text-2xl font-poppins text-gray-900 mb-8 font-light">Rare Jewels Lifetime Exchange & Buyback</h1>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-6">
                Our Lifetime Exchange & Buyback policy is designed to be as dazzling and delightful as our jewellery! To kickstart this sparkling transaction, simply have your original invoice handy or let us know the phone number linked to your purchase.
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.8] mb-4">
                To ensure a smooth and transparent experience, we've outlined the key terms and conditions below:
            </p>

            <ol className="list-decimal pl-5 space-y-2 text-[14px] text-gray-700 leading-[1.8] mb-8 marker:text-gray-400">
                <li>Products must be returned with original certification and documents, if applicable.</li>
                <li>Product valuation and quality check (QC) will take up to 15 business days. Once approved, customers have the option to purchase a new product of the same or higher value by paying the difference amount, if any. Shipping of the new product will follow the timeline mentioned on the website at the time of purchase.</li>
                <li>If customers decide not to proceed after valuation, they can reclaim the product by paying a processing fee.</li>
                <li>For buyback, Rare Jewels cash (up to Rs.5,00,000) will be credited to the customer's account, redeemable after 30 days from buyback confirmation. A 10% transaction charge applies on bank transfers.</li>
                <li>Market value appreciation is determined solely by the company.</li>
                <li>Returns after the free 15-day return period fall under Lifetime Exchange & Buyback.</li>
                <li>All custom and personalised jewellery orders are included.</li>
                <li>Natural gemstones include both precious and semi-precious stones bought from Rare Jewels.</li>
                <li>Exchange and buyback values exclude making charges and taxes.</li>
                <li>Products altered by third parties in any way are not eligible.</li>
                <li>Policy excludes loose natural diamonds, loose natural gemstones, loose lab-grown diamonds/gemstones and gold coins.</li>
            </ol>

            <p className="text-[14px] text-gray-700 leading-[1.8] mb-8">
                Below table illustrates the process to arrive at the estimated maximum value of your Rare Jewels jewellery during Lifetime Exchange and Lifetime Buyback. This is subject to valuation and approval.
            </p>

            <h2 className="text-lg font-poppins text-gray-900 mb-4 font-normal">Rare Jewels Lifetime Exchange</h2>
            <div className="overflow-x-auto mb-12">
                <table className="w-full text-center border-collapse border border-gray-200 text-[13px] text-gray-700 shadow-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 font-medium text-gray-900">
                            <th className="py-4 px-4 border-r border-gray-200 font-medium">Category</th>
                            <th className="py-4 px-4 border-r border-gray-200 font-medium">Metal</th>
                            <th className="py-4 px-4 border-r border-gray-200 font-medium">Diamond/Gemstones</th>
                            <th className="py-4 px-4 border-r border-gray-200 font-medium">Making Charges</th>
                            <th className="py-4 px-4 font-medium">Processing/Shipping Charges</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 border-r border-gray-200">Plain Gold Jewellery</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">NA</td>
                            <td className="py-4 px-4 border-r border-gray-200">Zero</td>
                            <td className="py-4 px-4">Zero</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 border-r border-gray-200">Natural Diamond Jewellery</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">Zero</td>
                            <td className="py-4 px-4">Zero</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 border-r border-gray-200">Natural Gemstone/Pearl Jewellery</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">Zero</td>
                            <td className="py-4 px-4">Zero</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 border-r border-gray-200">Lab Grown Diamond/Gemstone Jewellery</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">75% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">Zero</td>
                            <td className="py-4 px-4">Zero</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="text-lg font-poppins text-gray-900 mb-4 font-normal">Rare Jewels Lifetime Buyback</h2>
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-center border-collapse border border-gray-200 text-[13px] text-gray-700 shadow-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 font-medium text-gray-900">
                            <th className="py-4 px-4 border-r border-gray-200 font-medium">Category</th>
                            <th className="py-4 px-4 border-r border-gray-200 font-medium">Metal</th>
                            <th className="py-4 px-4 border-r border-gray-200 font-medium">Diamond/Gemstones</th>
                            <th className="py-4 px-4 border-r border-gray-200 font-medium">Making Charges</th>
                            <th className="py-4 px-4 font-medium">Processing/Transfer Charges</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                         <tr className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 border-r border-gray-200">Plain Gold Jewellery</td>
                            <td className="py-4 px-4 border-r border-gray-200">97% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">NA</td>
                            <td className="py-4 px-4 border-r border-gray-200">Zero</td>
                            <td className="py-4 px-4">10%</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 border-r border-gray-200">Natural Diamond Jewellery</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">90% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">Zero</td>
                            <td className="py-4 px-4">10%</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 border-r border-gray-200">Natural Gemstone/Pearl Jewellery</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">90% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">Zero</td>
                            <td className="py-4 px-4">10%</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 border-r border-gray-200">Lab Grown Diamond/Gemstone Jewellery</td>
                            <td className="py-4 px-4 border-r border-gray-200">100% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">50% of the Market Value</td>
                            <td className="py-4 px-4 border-r border-gray-200">Zero</td>
                            <td className="py-4 px-4">10%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <p className="text-[12px] italic text-gray-500 mb-6 leading-relaxed">
                *Market value of the Gold and gemstone/diamond is the value at which it is sold on Rare Jewels website at the time of requesting Rare Jewels Lifetime Exchange and Buyback.
            </p>

            <p className="text-[14px] text-gray-700 italic border-l-2 border-gray-300 pl-4 py-1">
                For requests, Call / WhatsApp our customer service team at +91-8001001313.
            </p>

        </PolicyLayout>
    );
};

export default ExchangeBuyback;
