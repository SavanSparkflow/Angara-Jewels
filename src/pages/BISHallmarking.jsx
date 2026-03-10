import React from 'react';
import PolicyLayout from '../components/PolicyLayout';

const BISHallmarking = () => {
    return (
        <PolicyLayout>
            <h1 className="text-3xl font-poppins text-[#132d56] mb-8 font-bold">Your Trust is Our Treasure!</h1>

            <div className="prose max-w-none text-gray-700 space-y-6 text-[15px] leading-relaxed">
                <p>
                    At Rare Jewels, your satisfaction is our top priority, and we're committed to delivering an unparalleled jewellery experience. Every piece of jewellery is handcrafted by skilled artisans, is BIS hallmarked and comes with a brand's certificate of authenticity. Choose from three luxurious gold options - white, rose, or yellow - in 14k and 18k variants, carefully selected to complement your unique style.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Want to make sure your gold is pure gold?</h2>
                <p>
                    Look for the hallmark! It's like a tiny, official stamp of approval recognised by the Bureau of Indian Standards (BIS) to assure its fineness and purity.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">There are three main things to check:</h2>

                <p><strong>The BIS logo:</strong> This shows it's been certified by the Indian government (resembles the shape of a little triangle).</p>

                <p><strong>Purity / Fineness Grade</strong><br />
                    The second symbol lets you know the purity of gold jewellery. Gold in its purest form is too soft for jewellery making. That's why other metals are mixed in to give it strength and durability. This blend of gold and other metals determines the carat value.<br />
                    Presently, you'll get to see the purity and fineness in one of the following ways:</p>

                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>24K999:</strong> This means 24 parts out of 24 are pure gold, making it 99.9% pure.</li>
                    <li><strong>22K916:</strong> This means 22 parts out of 24 are pure gold, making it 91.6% pure.</li>
                    <li><strong>18K750:</strong> This indicates 18 parts gold out of 24, equaling 75% pure gold.</li>
                    <li><strong>14K585:</strong> This signifies 14 parts gold out of 24, resulting in 58.5% pure gold.</li>
                </ul>

                <p className="italic text-gray-600">
                    Remember: The higher the carat, the purer the gold. But higher carats also mean softer gold. So, choose wisely based on your lifestyle and preferences!
                </p>

                <p><strong>The HUID number</strong> is like an ID or fingerprint for your piece, and it's unique for every piece.</p>

                <p>
                    At Rare Jewels, your trust is our priority. That's why every piece of gold jewellery is proudly BIS Hallmarked. This ensures you're not just buying beautiful jewellery, but also investing in authenticity and purity.
                </p>

                <p>With us, you can wear your heart on your sleeve, literally!</p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">How to Check the Purity of Your Gold Jewellery?</h2>
                <p>
                    Visit a BIS-approved jeweler or a BIS recognised Assaying and Hallmarking Centre. They can test your gold for a small fee.
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Purpose of HUID:</h2>
                <p>
                    Remember, "All that glitters is not gold"? Well, that's why cross-checking the purity and authenticity of gold jewellery is so important. After all, the price highly depends on it!
                </p>
                <p>Plus it:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Ensures traceability and helps address concerns about gold purity.</li>
                    <li>Automates the jewellery registration. HUID-based hallmarking streamlines the process, eliminating potential human errors.</li>
                    <li>Aids transparency, trust, and accurate valuation of gold jewellery.</li>
                    <li>Obviates the chances of unnecessary inspections.</li>
                </ul>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Need Additional Help?</h2>
                <p>
                    Rare Jewels is always here for you! If you encounter any difficulties during the verification process, feel free to reach out to our friendly customer support team.
                </p>
                <p>
                    By choosing Rare Jewels, you're not just buying a gemstone; you're investing in peace of mind. Explore our collection and discover the perfect gem for you, backed with a brand certificate of authenticity and your chosen lab report!
                </p>

                <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">FAQs</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-[#1a1a1a] mb-2">1. How to get Hallmark on old gold jewellery?</h3>
                        <p>
                            You can have your old gold jewellery hallmarked through a BIS-registered jeweler. The jeweler can either take it to a BIS-recognised Assaying and Hallmarking Centre to get it hallmarked or can melt it down, create new pieces, and have them hallmarked before reselling.
                        </p>
                    </div>
                </div>
            </div>
        </PolicyLayout>
    );
};

export default BISHallmarking;
