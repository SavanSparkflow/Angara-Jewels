import React from 'react';
import { HelpCircle, Star, Award, ShieldCheck, Globe, Clock, Gift, Users, Phone, Mail, MapPin, PhoneCall } from 'lucide-react';
import aboutImg1 from "/public/images/about_us_img-1.jpg"
import aboutImg2 from "/public/images/about_us_img-2.jpg"
import aboutImg3 from "/public/images/about_us_img-3.jpg"
import aboutImg4 from "/public/images/about_us_img-4.jpg"
import aboutImg5 from "/public/images/about_us_img-5.jpg"
import aboutImg6 from "/public/images/about_us_img-6.png"
import aboutImg7 from "/public/images/about_us_img-7.jpg"
import aboutImg8 from "/public/images/about_us_img-8.jpg"
import aboutImg9 from "/public/images/about_us_img-9.jpg"
import aboutImg10 from "/public/images/about_us_img-10.jpg"
import aboutImg11 from "/public/images/about_us_img-11.jpg"
import aboutImg12 from "/public/images/about_us_img-12.jpg"
import aboutImg13 from "/public/images/about_us_img-13.jpg"
import aboutImg14 from "/public/images/about_us_img-14.jpg"
import aboutImg15 from "/public/images/about_us_img-15.jpg"
import aboutImg16 from "/public/images/about_us_img-16.jpg"
import aboutImg17 from "/public/images/about_us_img-17.jpg"
import aboutImg18 from "/public/images/about_us_img-18.jpg"
import aboutImg19 from "/public/images/about_us_img-19.png"
import aboutImg20 from "/public/images/about_us_img-20.png"
import aboutImg21 from "/public/images/about_us_img-21.png"
import aboutImg22 from "/public/images/about_us_img-22.png"
import aboutImg23 from "/public/images/about_us_img-23.png"
import { Link } from 'react-router-dom';

const OurStory = () => {

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 md:pt-8 mt-4">
                <nav className="flex mb-10 mt-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3 text-[12px] font-medium">
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li>About Us</li>
                    </ol>
                </nav>
            </div>
            {/* ABOUT US HEADER */}
            <section className="pb-16 bg-[#FAFAFA]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-[#1A1A1A] mb-4">About Us</h1>
                    <p className="text-[14px] text-gray-500 leading-[1.8] font-light max-w-3xl mx-auto">
                        Life's precious moments should be celebrated with colour! At Rare Jewels, we believe that fine jewelry
                        should be as unique as the person wearing it. Our mission is to infuse every piece with vibrant
                        storytelling, exceptional craftsmanship, and the ancient energy of ethically sourced gemstones.
                    </p>
                </div>
            </section>

            {/* THREE COLUMNS: MISSION, VISION, PURPOSE */}
            <section className="py-12 px-4">
                <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-3 text-center group">
                        <div className="overflow-hidden rounded-sm bg-gray-100">
                            <img
                                src={aboutImg1}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Our Mission"
                            />
                        </div>
                        <h3 className="unna-font text-2xl text-[#000815] font-normal">Our Value</h3>
                        <p className="text-[13px] text-[#000815] leading-relaxed font-normal    ">
                            Integrity, transparency, accountability and credibility are
                            the values we cherish and adhere to in all aspects of
                            dealings with our employees, customers and associates.
                        </p>
                    </div>

                    <div className="space-y-3 text-center group">
                        <div className="overflow-hidden rounded-sm bg-gray-100">
                            <img
                                src={aboutImg2}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Our Vision"
                            />
                        </div>
                        <h3 className="unna-font text-2xl text-[#000815] font-normal">Our Vision</h3>
                        <p className="text-[13px] text-[#000815] leading-relaxed font-normal">
                            To strengthen our position as the world’s most trusted
                            supplier of premium, high quality, eco - friendly and
                            meticulously/perfectly manufactured lab grown
                            diamonds and moissanite jewelry.
                        </p>
                    </div>

                    <div className="space-y-3 text-center group">
                        <div className="overflow-hidden rounded-sm bg-gray-100">
                            <img
                                src={aboutImg3}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Our Purpose"
                            />
                        </div>
                        <h3 className="unna-font text-2xl text-[#000815] font-normal">Our Purpose</h3>
                        <p className="text-[13px] text-[#000815] leading-relaxed font-normal">
                            To commit wholeheartedly to the pursuit of excellence
                            while being mindful of the environmental and societal
                            impact of our business.
                        </p>
                    </div>
                </div>
            </section>

            {/* FULL WIDTH BANNER */}
            <section className="w-full overflow-hidden">
                <img src={aboutImg4} alt="Hands with Ring" className="w-full h-full object-cover" />
            </section>

            {/* OUR STORY CONTENT SECTION */}
            <section className="py-10 px-4 bg-[#F5F0EE]">
                <div className="container px-4 mx-auto text-center space-y-6">
                    <h2 className="unna-font text-[36px] md:text-[48px] font-normal text-[#1A1A1A]">Our Story</h2>
                    <div className="text-[12px] text-[#000815] leading-[2] text-justify md:text-center max-w-5xl mx-auto space-y-6">
                        <p>
                            Welcome to the Sparkling World of Rare Jewels! Hey there! I'm Ankit, the heart and soul behind Rare Jewels. Let me take you on a quick journey of how we bring you the best
                            Lab-Grown Diamonds and Jewelry.It all started in Surat, the diamond hub. I was deep into natural diamonds, creating and selling them locally. But guess what? The 2008 recession
                            hit, and I pivoted to what I loved most – designing jewelry. I began with sketches and soon moved to handmaking actual pieces that people in Surat adored.
                        </p>
                        <p>
                            Then came 2017, and I stumbled upon Etsy. What a game-changer! I launched my moissanite handmade jewelry store in 2018 and, wow, the response blew me away! We're
                            talking over 13000 sales and more than 4800 glowing reviews. You've got to check it out here. Fast forward to 2020, and my awesome customers, just like you, suggested I dive
                            into Lab Grown Diamonds. And I thought, why not? So, here we are, with Rare Jewels Lab Grown, dedicated to bringing you top-notch Lab Grown Diamonds and handmade
                            Jewelry. I'm super excited to have you visit our shop. You're going to love the designs which are designed by me– they're unique just for you. Custom orders are our thing, so let your
                            imagination run wild! I'm confident you'll back us up just like before. Your support means everything, and we promise to keep up with our top-tier customer service, communication,
                            and, of course, stunning jewelry.
                        </p>
                    </div>
                </div>
            </section>

            {/* WHY RARE JEWELS? */}
            <section className="py-24 bg-[#FAFAFA] text-center">
                <div className="container px-4 mx-auto px-4">
                    <div className="niconne-font text-[32px] text-[#017BB3] mb-2">Rare Jewels Promise</div>
                    <h2 className="unna-font text-[36px] md:text-[48px] font-normal text-[#1A1A1A] mb-10">Why Rare Jewels?</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 transform hover:scale-110 transition-transform">
                                <img src="/images/cartificate_1.svg" alt="" />
                            </div>
                            <span className="text-[11px] font-bold uppercase  text-gray-700">BIS Hallmark</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 transform hover:scale-110 transition-transform">
                                <img src="/images/cartificate_2.svg" alt="" />
                            </div>
                            <span className="text-[11px] font-bold uppercase  text-gray-700">Free 15-Day Returns</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 transform hover:scale-110 transition-transform">
                                <img src="/images/cartificate_3.svg" alt="" />
                            </div>
                            <span className="text-[11px] font-bold uppercase  text-gray-700">Rare Jewels Certified</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 transform hover:scale-110 transition-transform">
                                <img src="/images/cartificate_4.svg" alt="" />
                            </div>
                            <span className="text-[11px] font-bold uppercase  text-gray-700">Lifetime Exchange and Buyback</span>
                        </div>
                    </div>

                    <button className="bg-black text-white px-12 py-4 text-[11px] font-bold uppercase  rounded-sm hover:bg-gray-800 transition-all shadow-lg">design your own jewelry</button>
                    <div className="mt-4 text-[10px] text-gray-400 font-bold uppercase  flex items-center justify-center gap-2"><PhoneCall /> Call Us</div>
                </div>
            </section>

            {/* COLORFUL STATS CARDS GRID */}
            <section className="py-14 px-4 bg-white">
                <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    <div className='col-span-2'>
                        <img src={aboutImg5} alt="" />
                    </div>
                    <div className='col-span-2'>
                        <img src={aboutImg6} alt="" />
                    </div>
                    <div className='col-span-2'>
                        <img src={aboutImg7} alt="" />
                    </div>
                    <div>
                        <img src={aboutImg8} alt="" />
                    </div>
                    <div>
                        <img src={aboutImg9} alt="" />
                    </div>
                    <div>
                        <img src={aboutImg10} alt="" />
                    </div>
                    <div>
                        <img src={aboutImg11} alt="" />
                    </div>
                </div>
            </section>

            {/* HANDMADE JEWELRY SECTION */}
            <section className="py-12 pb-24 px-4 bg-white text-center">
                <div className="container px-4 mx-auto space-y-4">
                    <h2 className="unna-font text-[30px] md:text-[40px] font-normal text-[#1A1A1A]">Handmade Jewelry With Love at Rare Jewels</h2>
                    <div className="text-[13px] text-[#000815] leading-[2] max-w-4xl mx-auto space-y-6 font-normal">
                        <p>
                            Welcome to the heart of Rare Jewels, where love and craftsmanship blend to create extraordinary jewelry. As pioneers in lab-grown diamonds and moissanite jewelry, we are
                            committed to crafting pieces that not only dazzle but also tell a story of innovation and affection.
                        </p>
                        <p>
                            At Rare Jewels, every jewel is born from a blend of art and science. Our lab-grown diamonds and moissanite stones are not just eco-friendly alternatives; they are testaments to
                            human ingenuity and care for our planet. Meticulously crafted, each stone mirrors the quality and brilliance of mined diamonds, while embodying a spirit of sustainability.
                        </p>
                        <p>
                            Our artisans, with their skilled hands and passionate hearts, transform these ethically sourced stones into masterpieces. From timeless engagement rings to elegant necklaces,
                            every piece is handcrafted with precision and love. We believe in creating jewelry that resonates with your values and stories.
                        </p>
                        <p>
                            Choosing Rare Jewels means embracing a future where luxury and responsibility go hand in hand. It's not just about adorning yourself with beautiful jewelry; it's about making a
                            conscious choice for a better world.
                        </p>
                        <p>
                            Join us in this journey of love, innovation, and craftsmanship. Experience the unique allure of Rare Jewels – where every piece is a symbol of love for you and the environment.
                        </p>
                    </div>
                </div>
            </section>

            {/* VIRAL STYLES BANNER */}
            <section className="w-full py-12 relative overflow-hidden">
                <img src={aboutImg12} alt="" />
            </section>

            {/* GIVING BACK SECTION */}
            <section className="py-12 bg-white px-4 text-center">
                <div className="container px-4 mx-auto">
                    <div className="niconne-font text-[#017BB3] text-[12px] font-bold uppercase tracking-[0.3em] mb-2">Simplicity</div>
                    <h2 className="unna-font text-[36px] md:text-[48px] font-normal text-[#1A1A1A] mb-8">Going Back - Your Purchase Has Power</h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                        <div className="bg-gray-100 rounded-sm overflow-hidden col-span-1">
                            <img src={aboutImg13} className="w-full h-full object-cover" alt="Team" />
                        </div>
                        <div className="bg-gray-100 rounded-sm overflow-hidden col-span-1">
                            <img src={aboutImg14} className="w-full h-full object-cover" alt="Team" />
                        </div>
                        <div className="bg-gray-100 rounded-sm overflow-hidden col-span-1 lg:col-span-2">
                            <img src={aboutImg15} className="w-full h-full object-cover" alt="Workshop" />
                        </div>
                        <div className="bg-gray-100 rounded-sm overflow-hidden col-span-1 lg:col-span-2">
                            <img src={aboutImg16} className="w-full h-full object-cover" alt="Humanitarian" />
                        </div>
                        <div className="bg-gray-100 rounded-sm overflow-hidden col-span-1">
                            <img src={aboutImg17} className="w-full h-full object-cover" alt="Craft" />
                        </div>
                        <div className="bg-gray-100 rounded-sm overflow-hidden col-span-1">
                            <img src={aboutImg18} className="w-full h-full object-cover" alt="Lab" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CERTIFIED BY AREA */}
            <section className="py-12 bg-[#F5F0EE] border-y border-gray-100">
                <div className="container px-4 mx-auto px-4 text-center">
                    <h2 className="unna-font text-[28px] font-normal text-gray-800 mb-8">Certified By</h2>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                        {/* Certificates logos placeholders */}
                        <div>
                            <img src={aboutImg19} alt="" />
                        </div>
                        <div>
                            <img src={aboutImg20} alt="" />
                        </div>
                        <div>
                            <img src={aboutImg21} alt="" />
                        </div>
                        <div>
                            <img src={aboutImg22} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ASSOCIATED WITH */}
            <section className="py-12 text-center">
                <div className="container px-4 mx-auto">
                    <h2 className="unna-font text-[28px] font-normal text-gray-800 mb-5">Associated With</h2>
                    <img src={aboutImg23} alt="" className="mx-auto" />
                </div>
            </section>
        </div>
    );
};

export default OurStory;
