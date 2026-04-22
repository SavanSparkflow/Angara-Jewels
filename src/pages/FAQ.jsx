import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [activeTab, setActiveTab] = useState(0); // 0: FAQ, 1: Shipping, 2: Returns
    const [openIndex, setOpenIndex] = useState(0);

    const tabs = [
        "Frequently Asked Questions",
        "Shipping Policy",
        "Returns And Exchanges"
    ];

    const faqData = [
        // Tab 0: Frequently Asked Questions
        [
            {
                q: "Do you have any store locations?",
                a: "We only operate via our website and do not have any physical retail stores. Doing so allows us to cut overhead costs and we are able to pass on the savings to you, so you can enjoy high quality fine jewellery at the best prices."
            },
            {
                q: "What is the processing or making time for orders?",
                a: "Each piece is handmade with care. Our standard production time is 7-10 business days plus shipping time."
            },
            {
                q: "Do you accept returns?",
                a: "Yes, we offer a 15-day return policy for standard items. Please see our Returns and Exchanges tab for full details."
            },
            {
                q: "How can I find my ring size at home?",
                a: "We have a detailed ring size guide available on our product pages. You can also contact our support for a complimentary ring sizer."
            }
        ],
        // Tab 1: Shipping Policy
        [
            {
                q: "Do you offer worldwide shipping?",
                a: "Yes, we ship to over 78 countries worldwide. Shipping within India is complimentary."
            },
            {
                q: "How will my order be delivered?",
                a: "All orders are shipped via secure, insured couriers like BlueDart or Sequel to ensure safe delivery."
            },
            {
                q: "Will I need to pay any customs duty?",
                a: "International orders may be subject to customs duties and taxes which are the responsibility of the customer."
            },
            {
                q: "How long does delivery take?",
                a: "Domestic orders typically take 3-5 days after production. International shipping takes 7-10 business days."
            }
        ],
        // Tab 2: Returns and Exchanges
        [
            {
                q: "Do you accept returns, exchanges, and cancellations?",
                a: "Yes, we have policies in place for returns, exchanges, and cancellations:",
                content: [
                    "Returns: We offer a 30-day return policy. Customers need to request a return within 21 days after delivery and must send the item back within 30 days from the date of delivery.",
                    "Exchanges: Exchanges are allowed within 30 days of delivery but are only applicable to pre-made jewelry or listed items. Custom orders are not eligible for returns or exchanges.",
                    "Cancellations: If you change your mind about an order, please message us within 48 hours of placing the order. For cancellations requested after 48 hours, a cancellation fee of 15% of the total order amount will be charged."
                ]
            },
            {
                q: "What items are not returnable?",
                a: "Custom orders, personalized items, and items showing signs of wear or damage are not eligible for return or exchange."
            }
        ]
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:py-6 py-2 mt-1">
                <nav className="flex text-[12px] font-medium text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><Link to="/" className="hover:text-black">Home</Link></li>
                        <li>/</li>
                        <li className="text-black">Frequently Asked Questions</li>
                    </ol>
                </nav>
            </div>

            {/* Header Content */}
            <div className="pb-12 bg-white text-center px-4">
                <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-black mb-4">Frequently Asked Questions</h1>
                <p className="text-[13px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Explore our FAQ for common queries. Can't find your answer? Contact us via email or chat for assistance!
                </p>
            </div>

            {/* Hero Banner */}
            <div className="w-full relative h-[400px] overflow-hidden bg-black">
                <img 
                    src="/images/faq-banner.png" 
                    alt="Diamonds" 
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            {/* Tabs Navigation */}
            <div className="container mx-auto px-4 mt-10">
                <div className="flex flex-wrap justify-center gap-4 border-b border-gray-100 pb-8">
                    {tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setActiveTab(idx);
                                setOpenIndex(0);
                            }}
                            className={`px-8 py-3.5 text-[14px] font-medium tracking-tight rounded-sm transition-all ${activeTab === idx ? 'bg-[#F5F0EE] text-black shadow-sm' : 'text-gray-400 hover:text-black'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-7xl mx-auto py-10 space-y-4">
                    {faqData[activeTab].map((item, idx) => (
                        <div key={idx} className="border-b border-gray-100 last:border-b-0 pb-4">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex justify-between items-center py-2 text-left group"
                            >
                                <span className={`text-[15px] font-bold transition-colors ${openIndex === idx ? 'text-[#000815]' : 'text-[#000815] group-hover:text-[#000815]'}`}>
                                    {item.q}
                                </span>
                                {openIndex === idx ? <ChevronUp size={18} className="text-[#000815]" /> : <ChevronDown size={18} className="text-gray-300" />}
                            </button>
                            
                            {openIndex === idx && (
                                <div className="pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="text-[14px] text-[#000815] leading-[1.8] font-normal">
                                        {item.a}
                                    </p>
                                    {item.content && (
                                        <ul className="space-y-4 ml-4">
                                            {item.content.map((bullet, bIdx) => (
                                                <li key={bIdx} className="text-[14px] text-[#000815] leading-[1.8] flex gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#000815] mt-2 shrink-0"></span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
