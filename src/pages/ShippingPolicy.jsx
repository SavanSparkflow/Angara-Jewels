import React from 'react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:py-8 mt-2">
                <nav className="flex text-[12px] font-medium text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                        <li>/</li>
                        <li className="text-black">Shipping Information</li>
                    </ol>
                </nav>
            </div>

            {/* Header Content */}
            <div className="pb-10 bg-white text-center px-4">
                <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-black mb-2">Shipping Information</h1>
            </div>

            {/* Main Content */}
            <section className="max-w-6xl mx-auto px-4 pb-24 text-[14px] text-[#000815] leading-relaxed space-y-12">
                <p className="text-center max-w-7xl mx-auto mb-16">
                    All the items listed in store will be made to order for you, it will take us 10-12 business days to make any jewelry for you for more details shipping and processing time is mentioned on individual
                    product page. We do ship internationally to all addresses across the world. The client or buyer is responsible for any duties or taxes collected by your local government. Rare Jewels is not
                    responsible for any of these charges so please check the rates ahead of time. We provide 100% free shipping to <span className='font-bold'>USA, Canada, Europe, Thailand, Hong Kong, Malaysia, Singapore, Indonesia</span> . rest of the countries USD 15, will be charged on economy shipping and express shipping for all countries is USD 35. Note Express shipping do not reduce the time of processing,the time of processing remains the same, just the time of delivery reduces to 5-7 days, whereas economy shipping takes 17-19 days for delivery. Once the order is shipped, we will update you with
                    a tracking number. We fully insure each item for the final purchase price, from the time it is in transit until the time it arrives at its destination and the recipient’s signature is required at the time of
                    delivery. Please note Rare Jewels cannot be held accountable for delays on the shipper's part due to severe weather or other unexpected conditions. Please note that we cannot ship to PO boxes.
                </p>

                {/* Table Comparison */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-100 text-left">
                        <thead>
                            <tr className="bg-gray-50 uppercase text-[12px]  text-gray-900 border-b border-gray-100 font-bold">
                                <th className="p-6 border-r border-gray-100">Particulars</th>
                                <th className="p-6 border-r border-gray-100">Express Shipping</th>
                                <th className="p-6">Economy/Standard Shipping</th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px]">
                            <tr className="border-b border-gray-50">
                                <td className="p-6 border-r border-gray-100 font-bold">Price ( USD )</td>
                                <td className="p-6 border-r border-gray-100">35</td>
                                <td className="p-6">Free*</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                                <td className="p-6 border-r border-gray-100 font-bold">Delivery Time</td>
                                <td className="p-6 border-r border-gray-100">5-7 Days*</td>
                                <td className="p-6">17-19 Days*</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                                <td className="p-6 border-r border-gray-100 font-bold">Insurance</td>
                                <td className="p-6 border-r border-gray-100">Yes</td>
                                <td className="p-6">Yes</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                                <td className="p-6 border-r border-gray-100 font-bold">Tracking Number</td>
                                <td className="p-6 border-r border-gray-100">Yes</td>
                                <td className="p-6">Yes</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                                <td className="p-6 border-r border-gray-100 font-bold">Tracking History</td>
                                <td className="p-6 border-r border-gray-100">Yes</td>
                                <td className="p-6">No</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                                <td className="p-6 border-r border-gray-100 font-bold">Signature</td>
                                <td className="p-6 border-r border-gray-100">Required</td>
                                <td className="p-6">Not required</td>
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 font-bold">Carrier</td>
                                <td className="p-6 border-r border-gray-100">DHL / FedEx / UPS</td>
                                <td className="p-6">USPS / India Post</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Additional Info */}
                <div className="space-y-6 max-w-5xl mx-auto pt-10">
                    <p>* Free shipping is only available in countries like USA, Canada, Europe, Thailand, Hong Kong, Malaysia, Singapore, Indonesia. Other than these countries USD 15 will be charged.</p>
                    <p>* The 99% of parcel are delivered in 5-7 days, but it can be delayed due to weather conditions. Rare Jewels will not be responsible for it, as we Rare Jewels has no control over it.</p>
                    <p>* Economy/Standard Shipping takes 17-19 days for delivery, but if it is delayed due to customs or severe weather conditions Rare Jewels will not be responsible for it, as we Rare Jewels has no control over it.</p>
                </div>
            </section>
        </div>
    );
};

export default ShippingPolicy;
