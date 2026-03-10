import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const PaymentOptions = () => {
    return (
        <PolicyLayout>
            <h1 className="text-3xl font-poppins text-[#132d56] mb-8 font-bold">Payment Options</h1>
            <div className="prose max-w-none text-gray-700 space-y-6">
                <p>
                    At Rare Jewels, we ensure that your purchasing experience is seamless and secure. We offer a variety of payment methods to accommodate our customers in India.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Accepted Payment Methods</h2>

                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Credit Cards and Debit Cards:</strong> We accept Visa, MasterCard, and RuPay cards.</li>
                    <li><strong>Net Banking:</strong> Direct bank transfers are available from all major Indian banks.</li>
                    <li><strong>UPI:</strong> Use your preferred UPI app like Google Pay, PhonePe, Paytm, or BHIM.</li>
                    <li><strong>Wallets:</strong> Popular e-wallets such as Paytm, MobiKwik, and Amazon Pay are accepted.</li>
                </ul>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Payment Security</h2>
                <p>
                    All payment transactions on our website are conducted over a secure, encrypted connection to protect your financial information. We use industry-leading payment gateways that are PCI DSS compliant, ensuring your details are handled with the highest level of security.
                </p>
                <p>
                    Rare Jewels does not store any of your credit/debit card details on our servers.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">EMI and financing</h2>
                <p>
                    For higher value purchases, we offer No Cost EMI options through major credit cards. You can view the available EMI plans on the product page or during checkout.
                </p>
            </div>
        </PolicyLayout>
    );
};

export default PaymentOptions;
