import React from 'react';
import { Link } from 'react-router-dom';

const PaymentOptions = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:py-8 py-2 mt-1">
                <nav className="flex text-[12px] font-medium text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                        <li>/</li>
                        <li className="text-black">Payment Options</li>
                    </ol>
                </nav>
            </div>

            {/* Header Content */}
            <div className="pb-10 bg-white text-center px-4">
                <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-black mb-2">Payment Options</h1>
                <p className="text-[14px] text-[#000815] max-w-2xl mx-auto leading-relaxed italic">
                    Secure and flexible payment options for your convenience.
                </p>
            </div>

            {/* Main Content */}
            <section className="max-w-5xl mx-auto px-4 pb-14 text-[14px] text-[#000815] leading-relaxed space-y-12">
                <p className="border-b border-gray-50 pb-8 text-center text-gray-500 italic">
                    At Rare Jewels, we ensure that your purchasing experience is seamless and secure. We offer a variety of payment methods to accommodate our customers in India.
                </p>

                <div className="space-y-6">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">Accepted Payment Methods</h2>
                    <ul className="list-none space-y-4">
                        <li className="flex gap-3">
                            <span className="text-gray-400 font-bold">•</span>
                            <span><strong className="text-black">Credit Cards and Debit Cards:</strong> We accept Visa, MasterCard, and RuPay cards.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-gray-400 font-bold">•</span>
                            <span><strong className="text-black">Net Banking:</strong> Direct bank transfers are available from all major Indian banks.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-gray-400 font-bold">•</span>
                            <span><strong className="text-black">UPI:</strong> Use your preferred UPI app like Google Pay, PhonePe, Paytm, or BHIM.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-gray-400 font-bold">•</span>
                            <span><strong className="text-black">Wallets:</strong> Popular e-wallets such as Paytm, MobiKwik, and Amazon Pay are accepted.</span>
                        </li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">Payment Security</h2>
                    <p>
                        All payment transactions on our website are conducted over a secure, encrypted connection to protect your financial information. We use industry-leading payment gateways that are PCI DSS compliant, ensuring your details are handled with the highest level of security.
                    </p>
                    <p className="font-medium">
                        Rare Jewels does not store any of your credit/debit card details on our servers.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-[18px] font-bold text-black border-b border-gray-100 pb-2">EMI and financing</h2>
                    <p>
                        For higher value purchases, we offer No Cost EMI options through major credit cards. You can view the available EMI plans on the product page or during checkout.
                    </p>
                    <div className="mt-10 p-6 bg-[#F9F7F5] border border-gray-100 rounded-sm">
                        <p className="text-[13px] text-gray-600 leading-relaxed italic text-center">
                            We use advanced security protocols to ensure that your shopping experience is completely safe. For more information, please visit our <Link to="/privacy-policy" className="text-black font-bold underline">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PaymentOptions;
