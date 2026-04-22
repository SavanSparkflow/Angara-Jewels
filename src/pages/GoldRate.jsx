import React, { useState, useEffect } from 'react';

const GoldRate = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const locationData = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
        "Assam": ["Guwahati", "Dibrugarh", "Silchar"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
        "Delhi": ["New Delhi"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jamnagar"],
        "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Rohtak"],
        "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Gulbarga"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Amravati"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Noida"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee"],
        "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur"]
    };

    const states = Object.keys(locationData).sort();

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setSelectedCity('');
        if (state) {
            setCities(locationData[state].sort());
        } else {
            setCities([]);
        }
    };

    // Simulated rate calculation based on state/city selection to make it dynamic
    const defaultRate = 14700;
    const [currentRate, setCurrentRate] = useState(defaultRate);

    useEffect(() => {
        if (selectedState && selectedCity) {
            // Add a small random variation based on city string length for demo purposes
            const variation = (selectedCity.length * 10) - 50;
            setCurrentRate(defaultRate + variation);
        } else {
            setCurrentRate(defaultRate);
        }
    }, [selectedState, selectedCity]);

    const popularCitiesList = [
        "Mumbai", "Chennai", "Coimbatore", "Jaipur", "Ahmedabad", "Ludhiana", "Noida", "Gulbarga",
        "Mysore", "Aurangabad", "Hyderabad", "Visakhapatnam", "Bangalore", "Howrah", "Dhanbad",
        "Amravati", "Bhavnagar", "Durgapur", "Jamnagar", "Agartala", "Udaipur", "Patiala", "Kolkata", "Mangalore", "Panchkula", "Gandhinagar"
    ];

    return (
        <div className="w-full bg-white pb-20">
            <div className="container px-4 mx-auto py-8">
                <h1 className="text-3xl font-bold text-[#1a1a1a] mb-8 font-poppins">Gold Rate Today</h1>

                {/* Rate Calculator Banner */}
                <div className="bg-[#4d4d4d] rounded-md p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 mb-12 shadow-sm text-white">
                    <div className="w-full md:w-1/4">
                        <label className="block text-xs uppercase mb-2 font-medium">Select State</label>
                        <select
                            className="w-full bg-white text-gray-800 text-sm py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedState}
                            onChange={handleStateChange}
                        >
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full md:w-1/4">
                        <label className="block text-xs uppercase mb-2 font-medium">Select City</label>
                        <select
                            className="w-full bg-white text-gray-800 text-sm py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-500"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedState}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full md:w-auto mt-4 md:mt-0 pt-2 md:pt-6">
                        <div className="text-2xl md:text-3xl font-bold flex items-baseline">
                            <span className="mr-1">₹</span> {currentRate.toLocaleString('en-IN')} <span className="text-lg md:text-xl font-normal ml-2">24K Rate / Gram</span>
                        </div>
                        <div className="text-xs text-gray-300 mt-1 italic">*Prices may vary locally</div>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column - Articles */}
                    <div className="w-full lg:w-2/3 prose max-w-none text-gray-700 text-sm leading-relaxed">
                        <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Determining Gold Rates</h2>
                        <p>
                            The gold rates in India are directly linked to the prices in the international market, which means there are constant price fluctuations. Hence, checking today's gold rate is crucial before you invest in gold, jewelry or coins.
                        </p>
                        <p>
                            Whether it's a festival or a special occasion, gold is inextricably tied to the essential part of Indian culture and tradition. India stands as one of the largest consumers of gold globally. Generally 22K and 24K gold is the most popular variant in India as much of the gold's consuming purpose goes to ornamentation and jewelry.
                        </p>
                        <p>
                            Today gold rate in India fluctuates everyday based on mainly demand, supply, and prevailing market conditions. So, whether you're planning to invest in a piece of stunning gold jewellery, coins or bars, staying updated about the gold rate is a must.
                        </p>

                        <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">Factors that influence the Gold Rate in India:</h2>
                        <ul className="list-disc pl-5 space-y-4">
                            <li><strong>Inflation:</strong> Inflation is a critical determinant of gold prices. During long periods of inflation, people turn to gold as an ideal investment alternative. Since gold acts as a hedging tool against price rises, in such times, the gold price goes up, making it a safe investment haven.</li>
                            <li><strong>Consumption:</strong> The rise in consumption is another factor that plays a role in the gold price. There is a direct relation between the per capita income and the demand for gold. Every 1% increase in per capita income pushes up its demand by 1%. During festivals and weddings, the gold demand surges as more people invest in gold in the form of jewellery, coins and bars.</li>
                            <li><strong>Rupee-Dollar Equation:</strong> This is a major issue in buying out the rupee-dollar equation affects the gold prices in India. It is a well known truth that as an import- India imports gold from around the world. If there is a fall in the value of the Indian rupee against the dollar, the prices of the import rises. However, the demand for gold decreases.</li>
                            <li><strong>Market Volatility:</strong> It is common for many Indian households to consider forms making out assets. For gold is safeguard themselves against price movements and market risks. The demand for gold is constant, and hence, it is regarded as a reliable investment choice.</li>
                        </ul>
                        <p className="mt-4">
                            Every piece of jewellery at Rare Jewels undergoes a rigorous quality measurement to comply with industry standards. We assure you that our strictly quality jewellery makes its way to your heart and doorstep.
                        </p>
                        <p>
                            The varying gold rates across cities are due to transportation costs and location. However, we provide you with the best of the live stocks in terms of price and quality despite the gold rate fluctuations.
                        </p>
                        <p>
                            Given that gold is deeply connected with Indian culture, auspicious occasions like Diwali, Akshaya Tritiya, Dhanteras and Dussehra are considered the best days for purchase. This is also the time to take advantage of the deals and offers on making charges.
                        </p>
                        <p>
                            Whether you consider gold as heirloom jewellery that can be passed down to generations or find it as the top investment option, gold has been special to us in more ways than one. Before you visit the store/website to buy a treasure value in any form, be daily sure about the 22K/24K gold rate today. And this returns bill goes into viewing the gold rate this week in making an informed purchase decision.
                        </p>

                        <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-4">FAQs</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-[#1a1a1a] mb-2">1. How is the gold rate determined in India?</h3>
                                <p>The gold rate in India is influenced by a myriad of factors, including global market trends, currency fluctuations, the USD and on a day-to-day basis to reflect global and domestic market conditions.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a] mb-2">2. Why does the gold rate in India vary from city to city?</h3>
                                <p>The change in gold price in offices across the nation is due to supply, demand constraints and market conditions of a specific place or external arriving. However, the gold rate in India is affected by several external factors as well.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a] mb-2">3. How is 22-karat different from 24-karat gold?</h3>
                                <p>Karat is a term that defines the purity of gold. 24-karat gold is considered pure, i.e. it contains 99.9% gold. However, 22-karat gold is composed of other metals, including gold, making it comparatively more affordable than 24-karat gold.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a] mb-2">4. Is the price of regular and hallmarked gold different?</h3>
                                <p>The prices of regular and hallmarked gold are no different. However, hallmarked gold ensures quality and purity without any additional charges. Rare Jewels offers products that undergo even strict BIS hallmarking processes to provide you with jewellery and gold coins that are authentic and competitively priced.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - City Links */}
                    <div className="w-full lg:w-1/3">
                        <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Determining Gold Rates</h2>
                        <div className="flex flex-col gap-2">
                            {popularCitiesList.map((city, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="p-4 bg-gray-50 hover:bg-gray-100 rounded border border-gray-100 flex justify-between items-center transition-colors group"
                                >
                                    <span className="text-sm font-semibold text-gray-800">Gold Rate Today in {city}</span>
                                    <span className="text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition-all">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoldRate;
