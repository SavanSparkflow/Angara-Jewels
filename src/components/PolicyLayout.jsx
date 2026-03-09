import React from 'react';
import { NavLink } from 'react-router-dom';

const PolicyLayout = ({ children }) => {
    const links = [
        { name: 'About Angara', path: '#' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Lifetime Exchange & Buyback', path: '/exchange-buyback' },
        { name: '15-Day Returns', path: '/15-day-returns' },
        { name: 'Resize & Repair', path: '/resizing-policy' },
        { name: 'Cancellation Policy', path: '/cancellation-policy' },
        { name: 'Shipping Policy', path: '#' },
        { name: 'Track Your Order', path: '#' },
        { name: 'Privacy Policy', path: '#' },
        { name: 'Payment Options', path: '#' },
        { name: 'Terms & Conditions', path: '#' },
        { name: 'Corporate', path: '#' },
    ];

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0 bg-[#fbfbfb] p-6 h-fit border border-gray-100">
                    <ul className="flex flex-col gap-5 text-[13px] text-gray-600">
                        {links.map((link) => (
                            <li key={link.name}>
                                {link.path !== '#' ? (
                                    <NavLink 
                                        to={link.path} 
                                        className={({isActive}) => isActive ? "font-semibold text-gray-900" : "hover:text-black hover:font-medium transition-colors"}
                                    >
                                        {link.name}
                                    </NavLink>
                                ) : (
                                    <span className="cursor-not-allowed hover:text-black hover:font-medium transition-colors opacity-70">{link.name}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 policy-content max-w-4xl pt-4 md:pt-0">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default PolicyLayout;
