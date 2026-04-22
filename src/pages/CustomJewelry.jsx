import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, Globe, Phone } from 'lucide-react';
import Award1Img from "/public/images/Free_Shipping_Worldwide.svg";
import Award2Img from "/public/images/7_Customer_Service.svg";
import Award3Img from "/public/images/100_Money_Back_Guarantee.svg";
import Award4Img from "/public/images/Lifetime_Time_Warranty.svg";
import Award5Img from "/public/images/sale_1_3179cacd-e4c7-4de8-b023-9612719a2815.svg";
import Award6Img from "/public/images/Eco_Friendly_Element.svg";
import CustomDesignImg from "/public/images/custome_design.png"
import { Link } from 'react-router-dom';

const CustomJewelry = () => {
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            q: "What is your return policy?",
            a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            q: "Who is this jewelry made for?",
            a: "Our custom jewelry is created for those who value uniqueness, craftsmanship, and a personal connection to their pieces. Each design is handcrafted to tell your specific story."
        },
        {
            q: "What all jewelry is included in your custom design?",
            a: "We can create anything from engagement rings and wedding bands to necklaces, earrings, and bracelets. If you can dream it, we can design it."
        },
        {
            q: "What materials do you use for custom jewelry?",
            a: "We only use high-grade precious metals (14k/18k Gold, Platinum) and conflict-free, certified diamonds and gemstones of the highest quality."
        },
        {
            q: "Do some jewels or earrings provide live demo video?",
            a: "Yes, for many our loose diamonds and custom settings, we provide high-definition 360-degree videos to help you make an informed decision."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 md:pt-8 mt-4">
                <nav className="flex mb-10 mt-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3 text-[12px] font-medium">
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li>Custom Jewelry</li>
                    </ol>
                </nav>
            </div>
            {/* HERO SECTION */}
            <section className="pb-20 text-center bg-[#FAFAFA]">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="unna-font text-[32px] md:text-[38px] font-normal text-[#000815] mb-4">Design Your Own Engagement Ring</h1>
                    <p className="text-[14px] text-[#000815] leading-relaxed font-medium opacity-80 max-w-3xl mx-auto">
                        Design your unique jewelry with Rare Jewels. Tailor every detail to your taste for a truly personal touch. Create the one-of-a-kind piece you've always dreamed of.
                    </p>
                </div>
            </section>

            {/* CUSTOM DESIGN FORM */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold text-gray-400 uppercase  block">Name*</label>
                            <input type="text" placeholder="Your full name" className="w-full border border-gray-100 bg-[#F9FBFC] p-4 text-[13px] outline-none focus:border-[#C8923C] transition-colors rounded-sm" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold text-gray-400 uppercase  block">Email*</label>
                            <input type="email" placeholder="Your email address" className="w-full border border-gray-100 bg-[#F9FBFC] p-4 text-[13px] outline-none focus:border-[#C8923C] transition-colors rounded-sm" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold text-gray-400 uppercase  block">Phone Number*</label>
                            <input type="text" placeholder="Your mobile number" className="w-full border border-gray-100 bg-[#F9FBFC] p-4 text-[13px] outline-none focus:border-[#C8923C] transition-colors rounded-sm" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold text-gray-400 uppercase  block">Metal Selection</label>
                            <div className="relative">
                                <select className="w-full border border-gray-100 bg-[#F9FBFC] p-4 text-[13px] outline-none focus:border-[#C8923C] transition-colors rounded-sm appearance-none cursor-pointer">
                                    <option>Select Metal (e.g., 18k Yellow Gold)</option>
                                    <option>18k White Gold</option>
                                    <option>18k Rose Gold</option>
                                    <option>Platinum</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 mb-12">
                        <label className="text-[11px] font-bold text-gray-400 uppercase  block">Setting Style (Select all that apply)</label>
                        <div className="flex flex-wrap gap-4 md:gap-8">
                            {['Solitaire', 'Halo', 'Three - Stone', 'Vintage', 'Pave-Set', 'Side-Stone'].map((style) => (
                                <label key={style} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 border-gray-200 rounded-sm accent-[#1F4E56]" />
                                    <span className="text-[13px] text-gray-600 font-medium group-hover:text-black transition-colors">{style}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold text-gray-400 uppercase  block">Shape Preference</label>
                            <div className="relative">
                                <select className="w-full border border-gray-100 bg-[#F9FBFC] p-4 text-[13px] outline-none focus:border-[#C8923C] transition-colors rounded-sm appearance-none cursor-pointer">
                                    <option>Select Diamond Shape</option>
                                    <option>Round</option>
                                    <option>Oval</option>
                                    <option>Emerald</option>
                                    <option>Pear</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold text-gray-400 uppercase  block">Estimated Budget</label>
                            <div className="relative">
                                <select className="w-full border border-gray-100 bg-[#F9FBFC] p-4 text-[13px] outline-none focus:border-[#C8923C] transition-colors rounded-sm appearance-none cursor-pointer">
                                    <option>Select Budget</option>
                                    <option>Under $2,000</option>
                                    <option>$2,000 - $5,000</option>
                                    <option>$5,000 - $10,000</option>
                                    <option>$10,000+</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-12">
                        <label className="text-[11px] font-bold text-gray-400 uppercase  block">Message/Description</label>
                        <textarea placeholder="Tell us more about your dream design..." rows={4} className="w-full border border-gray-100 bg-[#F9FBFC] p-4 text-[13px] outline-none focus:border-[#C8923C] transition-colors rounded-sm resize-none"></textarea>
                    </div>

                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-100 rounded-sm p-12 text-center mb-12 bg-[#F9FBFC] group hover:border-[#C8923C] transition-all cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                            <Globe size={32} className="text-gray-300 group-hover:text-[#C8923C] transition-colors mb-2" />
                            <p className="text-[13px] font-bold text-gray-500">Drag & drop files here</p>
                            <p className="text-[11px] text-gray-400 font-medium">Supporting JPG, PNG, PDF formats</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="bg-black text-white px-16 py-4 text-[13px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-gray-800 transition-all shadow-lg mx-auto block">Submit</button>
                    </div>
                </div>
            </section>

            {/* FIND YOUR PERFECT FIT BANNER */}
            <section className="py-12 px-4">
                <div className="container px-4 mx-auto bg-[#0C2A2D] text-white overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[320px] relative">
                    {/* Left Image */}
                    <div className="hidden md:block w-1/4 h-full">
                        <img src="/images/ring-sizer-tape.png" alt="Ring Sizer" className="w-full h-full object-contain p-8" />
                    </div>

                    {/* Center Content */}
                    <div className="flex-1 text-center py-10 px-6 space-y-6 z-10">
                        <div className="space-y-4">
                            <h2 className="unna-font text-[34px] md:text-[42px] font-serif text-white leading-tight">Find Your Perfect Fit</h2>
                            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white font-bold">ADD A FREE RING SIZER TO YOUR CART</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <button className="bg-[#5D6D71] text-white px-12 py-3.5 text-[11px] font-bold uppercase  rounded-sm hover:bg-[#4A575A] transition-all min-w-[160px]">PRINT</button>
                            <button className="border border-white/50 text-white px-12 py-3.5 text-[11px] font-bold uppercase  rounded-sm hover:bg-white/10 transition-all min-w-[160px]">FIND NOW</button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full md:w-[30%] h-[200px] md:h-full">
                        <img src="/images/hand-with-sizer.png" alt="Hand with Sizer" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* TALK WITH GEMOLOGIST BANNER */}
            <section className="pt-12 px-4">
                <div className="container px-4 mx-auto bg-[#0C2A2D] text-white overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[320px] relative">
                    {/* Left Content */}
                    <div className="flex-1 p-10 space-y-8 flex flex-col justify-center">
                        <div className="space-y-4">
                            <h2 className="unna-font text-[34px] md:text-[42px] font-serif text-white leading-tight">Talk with Gemologist</h2>
                            <p className="text-[14px] text-gray-300 font-light leading-relaxed max-w-sm">Do you have inquiries about diamonds and moissanite? Arrange a virtual meeting with a skilled gemologist to get your questions answered.</p>
                        </div>
                        <div className="space-y-6">
                            <button className="bg-[#5D6D71] text-white px-10 py-4 text-[11px] font-bold uppercase  rounded-sm hover:bg-[#4A575A] transition-all shadow-md">BOOK AN APPOINTMENT</button>
                            <div className="flex items-center gap-3 group cursor-pointer w-fit">
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
                                    <Phone size={14} className="text-white" />
                                </div>
                                <span className="text-[11px] font-bold uppercase  border-b border-white/30 pb-0.5 group-hover:border-white transition-all">CALL US</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full md:w-[30%] h-[200px] md:h-full">
                        <img src="/images/gemologist-with-loupe.png" alt="Gemologist" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* BRAND DISTINCTION ROW */}
            <section className="py-12">
                <div className="container px-4 mx-auto text-center">
                    <div className="mb-16">
                        <div className="niconne-font text-[30px] text-[#017BB3] font-normal mb-2">Rare Jewels Promise</div>
                        <h2 className="unna-font text-[28px] md:text-[44px] font-normal text-[#000815]">How We're Distinct From Others!</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-12">
                        {[
                            { icon: <img src={Award1Img} alt="Free Shipping Worldwide" />, label: "Free Shipping Worldwide" },
                            { icon: <img src={Award2Img} alt="24x7 Customer Service" />, label: "24x7 Customer Service" },
                            { icon: <img src={Award3Img} alt="100% Money Back Guarantee" />, label: "100% Money Back Guarantee" },
                            { icon: <img src={Award4Img} alt="Rare Jewels's Trust" />, label: "Rare Jewels's Trust" },
                            { icon: <img src={Award5Img} alt="Unbeatable Market Price" />, label: "Unbeatable Market Price" },
                            { icon: <img src={Award6Img} alt="Eco Friendly Element" />, label: "Eco Friendly Element" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 group">
                                <div className="w-14 h-14">
                                    {item.icon}
                                </div>
                                <span className="text-[11px] font-semibold text-[#000815] uppercase  leading-tight">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <button className="mt-10 bg-black text-white px-6 py-3.5 text-[11px] font-bold uppercase  rounded-sm hover:shadow-lg transition-all">get a quote</button>
                </div>
            </section>

            {/* FULL WIDTH SKETCH IMAGE */}
            <section className="relative w-full overflow-hidden">
                <img src={CustomDesignImg} className="w-full h-full object-cover" alt="Jeweler sketching" />
            </section>

            {/* FAQ SECTION */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <h2 className="font-unna text-[36px] md:text-[40px] text-[#000815] font-light">
                            Because It Means More When It's Made Just For You!
                        </h2>
                    </div>
                    <div className="text-center mb-10 mt-5">
                        <div className="inline-block px-4 py-1.5 bg-[#F5F0EE] text-[#0D0D0D] text-[10px] font-bold uppercase  rounded-full mb-6">Frequently Seen Questions</div>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-gray-100 rounded-sm overflow-hidden group">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-[14px] font-bold text-gray-700 tracking-tight">{faq.q}</span>
                                    {openFaq === idx ? <Minus size={16} className="text-gray-400" /> : <Plus size={16} className="text-gray-400" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6 text-[13px] text-gray-500 leading-relaxed border-t border-gray-50 pt-2 animate-fadeIn">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EXPERT GUIDANCE BANNER */}
            <section className="py-12 px-4">
                <div className="container px-4 mx-auto overflow-hidden relative">
                    <img src="/images/guidance_banner.png" className="w-full h-full object-cover" alt="Consultation background" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-3">
                        <h2 className="unna-font text-[28px] md:text-[34px] text-white font-normal">Looking for Expert Guidance?</h2>
                        <p className="text-[13px] text-gray-300 max-w-sm font-light">Whether you're starting from scratch or have an idea, our designers help you create the perfect piece.</p>
                        <button className="bg-white text-black border border-white px-10 py-4 text-[11px] font-bold uppercase  rounded-sm hover:bg-transparent hover:text-white transition-all">Book an Appointment</button>
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section className="py-12 bg-[#F9FBFC]">
                <div className="container px-4 mx-auto">
                    <div className="text-center">
                        <h2 className="unna-font text-[32px] font-normal text-gray-800 tracking-tight mb-3">Gallery</h2>
                    </div>
                    <div className="w-full overflow-hidden rounded-sm group">
                        <img
                            src="/images/engagement_rings_carousel_gallery.png"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            alt="Custom ring gallery grid"
                        />
                    </div>
                </div>
            </section>

            {/* SEO TEXT INFO SECTION */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="unna-font text-[28px] md:text-[34px] font-normal text-[#000815] mb-4">Why To Buy Custom Engagement Ring?</h2>
                    <div className="text-[13px] text-[#000815] leading-[2] text-justify space-y-6">
                        <p>
                            The custom engagement rings has more sentiments and attachments then the premade rings, which are specially made only for you, so it's like one of a kind. Rare Jewels allows users to get their dream engagement ring by allowing 100% customization and design your own engagement ring your way. Viewers can submit the details on the form above, including the reference or inspiration images, and we can make the same design for you. We can custom made engagement rings in any shape, size, and color of Lab grown diamond, moissanite, or other gemstones. For custom orders Rare Jewels specializes in lab grown diamond engagement rings, stud earrings, bracelets and many more. If you have questions or would like an expert opinion feel free to schedule a virtual appointment with us.
                        </p>
                        <p>
                            <h4 className='unna-font font-normal text-lg inline-block'>Customized Diamond Rings</h4> are specially made by experienced craftsmen, with perfection and high quality finishing. Design your own rings with Rare Jewels and get one of a kind ring which will be made by you for you and your loved ones. Rare Jewels not only makes custom engagement rings but we also make custom made moissanite rings, stud earrings, bracelets and many more.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomJewelry;
