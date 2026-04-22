import React from 'react';
import { Link } from 'react-router-dom';

const ExchangeBuyback = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:py-8 mt-2">
                <nav className="flex text-[12px] font-medium text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                        <li>/</li>
                        <li className="text-black">Return/Exchange Policy</li>
                    </ol>
                </nav>
            </div>

            {/* Header Content */}
            <div className="pb-10 bg-white text-center px-4">
                <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-black mb-2">Return/Exchange Policy</h1>
            </div>

            {/* Main Content */}
            <section className="max-w-6xl mx-auto px-4 pb-14 text-[14px] text-[#000815] leading-relaxed space-y-12">
                <div className="space-y-4">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">Returns</h2>
                    <p>Returns and Refunds are hassle-free when you buy from rare jewels.com</p>
                    <p className="font-bold">Our policy lasts 30 days. You can ask for a refund within 21 days post-delivery. If 21 days have gone by since delivery, unfortunately we can’t offer you a refund or exchange.</p>
                    <p>* You have to email us at <a href="mailto:hello@rarejewels.com" className="text-black underline">hello@rarejewels.com</a> about a return for a refund within 21 days post delivery.</p>
                    <p>* Customized or Personalized order or Engraving on any jewelry done cannot be return or exchanged, as they are specially made on request for you on order basis.</p>
                    <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">Refunds (If Applicable)</h2>
                    <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item.</p>
                    <p>The refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a day or two.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">Late Or Missing Refunds (If Applicable)</h2>
                    <p>If you haven’t received a refund yet, first check your bank account again.</p>
                    <p>Then contact your credit card company, it may take some time before your refund is officially posted.</p>
                    <p>Next, contact your bank. There is often some processing time before a refund is posted.</p>
                    <p>If you’ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:hello@rarejewels.com" className="text-black underline">hello@rarejewels.com</a>.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">Exchanges (If Applicable)</h2>
                    <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:hello@rarejewels.com" className="text-black underline">hello@rarejewels.com</a> and send your item on the address that will be emailed to you.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">Gifts</h2>
                    <p>If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.</p>
                    <p>If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">Shipping</h2>
                    <p>To return your product, you should mail your product to the address provided by Rare Jewels [ please email at <a href="mailto:hello@rarejewels.com" className="text-black underline">hello@rarejewels.com</a>, before shipping back the jewelry or loose moissanite or any other gemstones ].</p>
                    <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                    <p>Depending on where you live, the time it may take for your exchanged product to reach you may vary.</p>
                    <p>If you are shipping an item over $100, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>
                </div>
            </section>
        </div>
    );
};

export default ExchangeBuyback;
