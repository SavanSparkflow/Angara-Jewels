import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const ShippingPolicy = () => {
    return (
        <PolicyLayout>
            <h1 className="text-3xl font-poppins text-[#132d56] mb-8 font-bold">Shipping Policy</h1>
            <div className="prose max-w-none text-gray-700 space-y-6">
                <p>
                    At Rare Jewels, we understand that your jewelry purchases are precious. We are committed to ensuring they reach you safely, securely, and in a timely manner.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Free Insured Shipping</h2>
                <p>
                    We offer <strong>Free Delivery</strong> on all orders within India. Every piece of jewelry is fully insured against theft and damage while in transit.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Delivery Timeframes</h2>
                <p>
                    Most orders are processed within 2-3 business days. Delivery times vary based on your location and the specific product.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Ready to Ship Products:</strong> Delivered within 3-5 business days.</li>
                    <li><strong>Custom or Made-to-Order Products:</strong> Delivered within 10-15 business days.</li>
                </ul>
                <p>
                    Once your order is shipped, we will provide you with a tracking number so you can monitor its progress.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Packaging</h2>
                <p>
                    Your jewelry will arrive in elegant, discreet packaging to maintain the surprise and ensure security. The package will include all necessary certificates and invoices.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Verification Upon Delivery</h2>
                <p>
                    For your security, we require an adult signature upon delivery. Please ensure that the recipient is present and has a valid government-issued ID (such as PAN card, Aadhar card, or Driving License) for verification. We cannot deliver to P.O. boxes.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">International Shipping</h2>
                <p>
                    Currently, we primarily ship within India. If you require international shipping, please contact our customer support team to discuss availability and potential additional charges.
                </p>
            </div>
        </PolicyLayout>
    );
};

export default ShippingPolicy;
