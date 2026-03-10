import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const PrivacyPolicy = () => {
    return (
        <PolicyLayout>
            <h1 className="text-3xl font-poppins text-[#132d56] mb-8 font-bold">Privacy Policy</h1>
            <div className="prose max-w-none text-gray-700 space-y-6">
                <p>
                    Effective Date: March 10, 2026
                </p>
                <p>
                    Welcome to Rare Jewels. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website (the "Site").
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Personal Information We Collect</h2>
                <p>
                    When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">How We Use Your Personal Information</h2>
                <p>
                    We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Contact Us</h2>
                <p>
                    For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at india.support@angara.com or by mail using the details provided below:
                </p>
                <p className="mt-4">
                    Rare Jewels Jewels Pvt. Ltd.<br />
                    2nd Floor, A-28, Vidyadhara<br />
                    Marg, Tilak Nagar, Jaipur-302004
                </p>
            </div>
        </PolicyLayout>
    );
};

export default PrivacyPolicy;
