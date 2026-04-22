import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import VirtualAppointmentModal from '../components/VirtualAppointmentModal';

const Contact = () => {
    const [isVirtualModalOpen, setIsVirtualModalOpen] = useState(false);
    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:py-8 mt-2">
                <nav className="flex text-[12px] font-medium text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                        <li>/</li>
                        <li className="text-black">Contact Us</li>
                    </ol>
                </nav>
            </div>

            {/* Header Content */}
            <div className="pb-10 bg-white text-center px-4">
                <h1 className="unna-font text-[36px] md:text-[48px] font-normal text-black mb-4">Contact Us</h1>
                <p className="text-[14px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Select your desire Diamond and find out the perfect size of it..
                </p>
            </div>

            {/* Contact Form Section */}
            <section className="py-12 px-4 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold text-gray-700 uppercase">First Name *</label>
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            className="w-full px-4 py-3.5 border border-gray-100 bg-[#FBFBFB] rounded-sm outline-none focus:border-gray-300 transition-colors text-[14px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold text-gray-700 uppercase">Last Name *</label>
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            className="w-full px-4 py-3.5 border border-gray-100 bg-[#FBFBFB] rounded-sm outline-none focus:border-gray-300 transition-colors text-[14px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold text-gray-700 uppercase">Email *</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3.5 border border-gray-100 bg-[#FBFBFB] rounded-sm outline-none focus:border-gray-300 transition-colors text-[14px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-bold text-gray-700 uppercase">Phone number</label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3.5 border border-gray-100 bg-[#FBFBFB] rounded-sm outline-none focus:border-gray-300 transition-colors text-[14px]"
                        />
                    </div>
                </div>
                <div className="space-y-2 mb-10">
                    <label className="text-[12px] font-bold text-gray-700 uppercase">Message</label>
                    <textarea
                        rows="4"
                        placeholder="Enter your message"
                        className="w-full px-4 py-3.5 border border-gray-100 bg-[#FBFBFB] rounded-sm outline-none focus:border-gray-300 transition-colors text-[14px] resize-none"
                    />
                </div>
                <div className="text-center">
                    <button className="bg-black text-white px-12 py-4 text-[12px] font-bold uppercase  rounded-sm hover:bg-gray-800 transition-all shadow-md">
                        SEND
                    </button>
                </div>
            </section>

            {/* Contact Details Icon Row */}
            <section className="py-10 bg-[#F9F7F5]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-gray-700">
                    <div className="flex flex-col items-center gap-4">
                        <MapPin size={24} className="text-gray-400" />
                        <p className="text-[13px] leading-relaxed max-w-[200px]">
                            207, Sanjay Hub, Ambatalaoji,<br />
                            Katargam, Surat, Gujarat 395004<br />
                            India
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Mail size={24} className="text-gray-400" />
                        <a href="mailto:hello@rarejewels.com" className="text-[13px] hover:underline">hello@rarejewels.com</a>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Phone size={24} className="text-gray-400" />
                        <a href="tel:+919023930923" className="text-[13px] hover:underline">+91 90239-30923</a>
                    </div>
                </div>
            </section>

            {/* Virtual Appointment Section */}
            <section className="pb-10 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="relative min-h-[500px] flex items-center md:justify-start justify-center">
                        {/* High-res background with subtle overlay */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/images/virtual-consultation-v3.png"
                                alt="Professional Consultation"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Liquid-Design Floating Card */}
                        <div className="relative z-10 w-full max-w-[340px] md:max-w-xl lg:max-w-3xl bg-[#AD8868]/95 backdrop-blur-md p-8 md:ml-52 rounded-3xl text-white border border-white/20 shadow-2xl">
                            <h2 className="unna-font text-3xl md:text-4xl font-normal mb-2">
                                Book A Virtual Appointment
                            </h2>
                            <p className="text-sm md:text-md mb-10 font-normal text-white">
                                Book a personalized appointment to explore designs that match your
                                style. Let our experts guide you in finding or creating something truly special.
                            </p>
                            <button 
                                onClick={() => setIsVirtualModalOpen(true)}
                                className="w-full sm:w-auto bg-[#876548] text-white px-10 py-4 text-[13px] font-bold tracking-[0.2em] uppercase rounded shadow-xl hover:bg-black hover:transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <VirtualAppointmentModal 
                isOpen={isVirtualModalOpen} 
                onClose={() => setIsVirtualModalOpen(false)} 
            />
        </div>
    );
};

export default Contact;
