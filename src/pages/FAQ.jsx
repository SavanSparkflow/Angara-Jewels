import React, { useState } from 'react';
import PolicyLayout from '../components/PolicyLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [openCategories, setOpenCategories] = useState({ 0: true }); // Open first category by default

    const toggleAccordion = (index) => {
        setOpenCategories(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const faqs = [
        {
            category: "General",
            items: [
                {
                    q: "Can I place my order over the phone?",
                    a: "Yes, you can absolutely place your order over the phone! Please call us at +91-8001001313 and it will be our pleasure to assist you."
                },
                {
                    q: "Do you have any store locations?",
                    a: "We only operate via our website and do not have any physical retail stores. Doing so allows us to cut overhead costs and we are able to pass on the savings to you, so you can enjoy high quality fine jewellery at the best prices."
                },
                {
                    q: "Can I upgrade my purchase to a better gemstone?",
                    a: "Yes, you can! Our gemstone experts can definitely help you upgrade your jewellery. Feel free to contact us via +91-8001001313 or india.support@Rare Jewels.com to find out more."
                },
                {
                    q: "How to know if a promotion code is going to be applied to a purchase?",
                    a: "All discounts, including promotions and coupon codes, are applied before checkout. Simply enter the promotion code by clicking on the 'Apply Coupon' link on the shopping cart."
                }
            ]
        },
        {
            category: "Ordering & Payment",
            items: [
                {
                    q: "How will my order be packaged?",
                    a: "All our jewellery pieces are safely packaged and presented to you in our branded burgundy box."
                },
                {
                    q: "Will I have to pay taxes on my purchase?",
                    a: "A 3% GST is applicable on all fine jewellery and it is included in the product prices shown on the website."
                },
                {
                    q: "Do you accept international credit cards?",
                    a: "We do not accept international credit cards. We accept all major Indian debit/credit cards (Visa, MasterCard, Amex etc.)."
                },
                {
                    q: "Can I receive my order over the weekend?",
                    a: "As of now, we do not have an option for weekend delivery."
                }
            ]
        },
        {
            category: "Shipping & Delivery",
            items: [
                {
                    q: "How do I add or remove items from my order?",
                    a: "Please call us at +91-8001001313 and we will be happy to assist you in adding or removing items from your order."
                },
                {
                    q: "How long does it take for my order to arrive?",
                    a: "We usually take 7-10 business days to deliver."
                },
                {
                    q: "Where do you ship your items?",
                    a: "We ship all around India. To order outside India, please visit our other country websites."
                }
            ]
        }
    ];

    return (
        <PolicyLayout>
            <h1 className="text-2xl font-poppins text-gray-900 mb-8 font-light">Frequently Asked Questions</h1>

            <div className="space-y-4">
                {faqs.map((category, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-sm overflow-hidden bg-white shadow-sm">
                        <button
                            className="w-full text-left px-6 py-5 bg-[#fcfcfc] hover:bg-gray-50 flex justify-between items-center transition-colors border-b border-transparent"
                            onClick={() => toggleAccordion(idx)}
                            style={{ borderBottomColor: openCategories[idx] ? '#f3f4f6' : 'transparent' }}
                        >
                            <span className="uppercase tracking-widest text-[13px] font-semibold text-gray-900">{category.category}</span>
                            {openCategories[idx] ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                        </button>

                        {openCategories[idx] && (
                            <div className="px-6 py-6 border-gray-100 space-y-6 animate-in slide-in-from-top-2 duration-300">
                                {category.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="border-b border-gray-50 last:border-b-0 pb-6 last:pb-0">
                                        <h4 className="text-[14px] font-medium text-gray-900 mb-3">{item.q}</h4>
                                        <p className="text-[14px] text-gray-600 leading-[1.8]">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-gray-50 p-6 md:p-8 rounded-sm">
                <h2 className="text-lg font-poppins text-gray-900 mb-2 font-medium">Still got queries?</h2>
                <p className="text-[14px] text-gray-600 leading-[1.8]">
                    Reach out to our customer service team by phone or WhatsApp chat on <a href="tel:+918001001313" className="font-medium hover:text-black hover:underline">+91-8001001313</a>, or email at <a href="mailto:india.support@rarejewels.com" className="font-medium hover:text-black hover:underline">india.support@rarejewels.com</a>.
                </p>
            </div>
        </PolicyLayout>
    );
};

export default FAQ;
