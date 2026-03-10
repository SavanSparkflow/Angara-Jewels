import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const TermsConditions = () => {
    return (
        <PolicyLayout>
            <h1 className="text-3xl font-poppins text-[#132d56] mb-8 font-bold">Terms & Conditions</h1>
            <div className="prose max-w-none text-gray-700 space-y-6">
                <p>
                    These Terms and Conditions set forth the agreements between Rare Jewels ("Company", "We", "Our", or "Us") and you ("User", or "Customer") using our website and services.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Acceptance of Terms</h2>
                <p>
                    By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our website.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Pricing and Availability</h2>
                <p>
                    The prices and availability of products at Rare Jewels are subject to change without notice. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information at any time without prior notice.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Intellectual Property</h2>
                <p>
                    All content on this website, including but not limited to design, text, graphics, interfaces, and the selection and arrangements thereof, are our property, and are protected under Indian and international copyright laws. Any use of such materials without our written permission is strictly prohibited.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Governing Law</h2>
                <p>
                    These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of the use of our services or products will be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Contact Information</h2>
                <p>
                    If you have any queries about these Terms and Conditions, please reach out to us at:
                </p>
                <p className="mt-4">
                    Email: india.support@Rare Jewels.com
                </p>
            </div>
        </PolicyLayout>
    );
};

export default TermsConditions;
