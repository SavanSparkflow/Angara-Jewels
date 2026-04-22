import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, Clock, ChevronDown, Phone } from 'lucide-react';
import PhoneInputField from '../PhoneInputField';
import { appointmentService } from '../../redux/services/appointmentService';

const VirtualAppointmentModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        appointmentDate: '',
        preferredTime: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (data) => {
        setFormData(prev => ({ ...prev, phoneNumber: data.phoneNumber }));
        setIsPhoneValid(data.isValid);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        try {
            const response = await appointmentService.bookAppointment(formData);
            if (response.data.success) {
                setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '+91',
                    appointmentDate: '',
                    preferredTime: ''
                });
                onClose();
            } else {
                console.error(response.data.message || "Failed to book appointment");
            }
        } catch (error) {
            console.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                >
                    {/* Modal Header */}
                    <div className="bg-[#1F4E56] text-white p-3 text-center relative">
                        <h2 className="text-2xl font-semibold mb-1">Virtual Appointment</h2>
                        <p className="text-white/80 text-sm">Schedule your online consultation</p>
                    </div>

                    {/* Modal Content / Form */}
                    <form className="p-4 space-y-5" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-400 uppercase block px-1">Full Name *</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#C8923C]/50 focus:ring-4 focus:ring-[#C8923C]/5 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-400 uppercase block px-1">Email Address *</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#C8923C]/50 focus:ring-4 focus:ring-[#C8923C]/5 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5 custom-phone-input">
                            <label className="text-[11px] font-bold text-gray-400 uppercase block px-1">Phone Number *</label>
                            <PhoneInputField
                                value={formData.phoneNumber}
                                onChange={handlePhoneChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Date */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase block px-1">Appointment Date *</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input
                                        type="date"
                                        name="appointmentDate"
                                        value={formData.appointmentDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#C8923C]/50 focus:ring-4 focus:ring-[#C8923C]/5 transition-all outline-none appearance-none"
                                    />
                                </div>
                            </div>
                            {/* Time */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase block px-1">Preferred Time *</label>
                                <div className="relative">
                                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <select 
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-8 text-sm focus:outline-none focus:border-[#C8923C]/50 focus:ring-4 focus:ring-[#C8923C]/5 transition-all outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Time</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="02:00 PM">02:00 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="w-full border border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !isPhoneValid}
                                className="w-full bg-[#1F4E56] text-white font-semibold py-3.5 rounded-xl hover:bg-[#153a41] shadow-lg shadow-[#1F4E56]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        <span>Booking...</span>
                                    </>
                                ) : (
                                    "Schedule Appointment"
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default VirtualAppointmentModal;
