import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:py-8 py-2 mt-1">
                <nav className="flex text-[12px] font-medium text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                        <li>/</li>
                        <li className="text-black">Privacy Policy</li>
                    </ol>
                </nav>
            </div>

            {/* Header Content */}
            <div className="pb-10 bg-white text-center px-4">
                <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-black mb-4">Privacy Policy</h1>
            </div>

            {/* Main Content */}
            <section className="max-w-6xl mx-auto px-4 pb-24 text-[13px] text-gray-700 leading-[2] space-y-12 text-justify">
                <div className="space-y-6">
                    <h2 className="text-[16px] font-bold text-black uppercase  border-b border-gray-100 pb-2">SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h2>
                    <p>When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.</p>
                    <p>When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.</p>
                    <p>Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.</p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-[16px] font-bold text-black uppercase  border-b border-gray-100 pb-2">SECTION 2 - CONSENT</h2>
                    <p className="font-bold underline italic">How do you get my consent?</p>
                    <p>When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.</p>
                    <p>If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-[16px] font-bold text-black uppercase  border-b border-gray-100 pb-2">SECTION 3 - DISCLOSURE</h2>
                    <p>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.</p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-[16px] font-bold text-black uppercase  border-b border-gray-100 pb-2">SECTION 4 - PAYMENT</h2>
                    <p>We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.</p>
                    <p>Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.</p>
                    <p>PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.</p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-[16px] font-bold text-black uppercase  border-b border-gray-100 pb-2">SECTION 5 - THIRD-PARTY SERVICES</h2>
                    <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
                    <p>However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
                    <p>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
                    <p>In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.</p>
                    <p>Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.</p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-[16px] font-bold text-black uppercase  border-b border-gray-100 pb-2">SECTION 6 - SECURITY</h2>
                    <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-[16px] font-bold text-black uppercase  border-b border-gray-100 pb-2">QUESTIONS AND CONTACT INFORMATION</h2>
                    <p>
                        If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at [hello@rarejewels.com] or by mail at [207, Sanjay Hub, Ambatalaoji, Katargam, Surat, Gujarat 395004].
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
