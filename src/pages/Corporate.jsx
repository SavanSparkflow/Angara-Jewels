import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const Corporate = () => {
    return (
        <PolicyLayout>
            <h1 className="text-3xl font-poppins text-[#132d56] mb-8 font-bold">Corporate</h1>
            <div className="prose max-w-none text-gray-700 space-y-6">
                <p>
                    Welcome to the corporate portal for Rare Jewels. We are dedicated to providing the finest jewelry with unmatched craftsmanship and quality.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Our Vision & Mission</h2>
                <p>
                    Our vision is to become the leading luxury jewelry brand worldwide by continually innovating and setting new standards of excellence. Our mission is to produce exquisite pieces that bring joy, elegance, and beauty to every person who wears them. We prioritize craftsmanship, quality, and ethical sourcing.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Our History</h2>
                <p>
                    Rare Jewels was founded with a deep passion for fine jewelry and a vision for bringing high-quality, handcrafted pieces to the world. Over the years, we have built a reputation for our commitment to excellence, customer service, and unmatched elegance.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Careers</h2>
                <p>
                    At Rare Jewels, we believe that our people are our biggest asset. We offer dynamic career paths across various domains spanning jewelry design, marketing, technology, customer service, and more. If you are passionate and dedicated to excellence, we would love to have you on our team.
                </p>
                <p>
                    For career inquiries, please send your resume and cover letter to <a href="mailto:careers@raresjewels.com" className="text-blue-600 hover:underline">careers@raresjewels.com</a>.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Corporate Office</h2>
                <p className="mt-4">
                    Rare Jewels Jewels Pvt. Ltd.<br />
                    2nd Floor, A-28, Vidyadhara<br />
                    Marg, Tilak Nagar, Jaipur-302004<br />
                    India
                </p>
            </div>
        </PolicyLayout>
    );
};

export default Corporate;
