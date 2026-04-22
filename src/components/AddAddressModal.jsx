import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import PhoneInputField from './PhoneInputField';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, updateAddress } from '../redux/slices/addressSlice';

const AddAddressModal = ({ isOpen, onClose, editData = null }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.address);

    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: 'India',
        address: '',
        apartment: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        isDefault: false
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                firstName: editData.firstName || '',
                lastName: editData.lastName || '',
                country: editData.country || 'India',
                address: editData.address || '',
                apartment: editData.apartment || '',
                city: editData.city || '',
                state: editData.state || '',
                pincode: editData.pincode || '',
                phone: editData.phone || '',
                isDefault: editData.isDefault || false
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                country: 'India',
                address: '',
                apartment: '',
                city: '',
                state: '',
                pincode: '',
                phone: '',
                isDefault: false
            });
        }
    }, [editData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();

                    if (data && data.address) {
                        setFormData(prev => ({
                            ...prev,
                            state: data.address.state || '',
                            city: data.address.city || data.address.town || data.address.village || '',
                            pincode: data.address.postcode || '',
                            address: data.display_name || ''
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching location:', error);
                    alert('Failed to get location details.');
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to retrieve your location');
                setIsLoadingLocation(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = { ...formData };
        if (editData) {
            payload.id = editData._id;
            const result = await dispatch(updateAddress(payload));
            if (updateAddress.fulfilled.match(result)) {
                onClose();
            }
        } else {
            const result = await dispatch(addAddress(payload));
            if (addAddress.fulfilled.match(result)) {
                onClose();
            }
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            >
                <div className="absolute inset-0" onClick={onClose}></div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    className="relative w-full max-w-[650px] bg-white rounded-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 relative">
                        <h2 className="text-[14px] font-bold text-gray-800 tracking-wide uppercase">
                            {editData ? 'Update Address' : 'Shipping Address'}
                        </h2>

                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={isLoadingLocation || loading}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full text-[11px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <MapPin size={12} />
                                {isLoadingLocation ? 'Getting...' : 'Get Location'}
                            </button>
                            <button
                                onClick={onClose}
                                className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                <X size={12} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 md:p-6 overflow-y-auto">

                        <div className="mb-6">
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Address*"
                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                name="apartment"
                                value={formData.apartment}
                                onChange={handleInputChange}
                                placeholder="Apartment/Suite/Building"
                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="relative border border-gray-200 rounded-sm px-4 py-2 focus-within:border-gray-500 transition-colors">
                                <label className="text-[10px] text-gray-400 block mb-0.5 pointer-events-none">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    readOnly
                                    className="w-full text-[13px] outline-none bg-transparent"
                                />
                            </div>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="State*"
                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="City*"
                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors"
                            />
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                placeholder="Pincode*"
                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>

                        <h3 className="text-[13px] font-bold text-gray-800 mb-4 tracking-wide uppercase">Contact Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name*"
                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name*"
                                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-[10px] text-gray-400 block mb-1.5 uppercase font-bold tracking-wider">Mobile Number*</label>
                            <PhoneInputField
                                value={formData.phone}
                                onChange={(data) => {
                                    setFormData(prev => ({ ...prev, phone: data.phoneNumber }));
                                    setIsPhoneValid(data.isValid);
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 mb-6">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={formData.isDefault}
                                        onChange={handleInputChange}
                                        className="appearance-none w-4 h-4 border border-gray-300 rounded-sm bg-white checked:bg-[#207cce] checked:border-[#207cce] cursor-pointer transition-colors"
                                    />
                                    {formData.isDefault && <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none left-[3px]" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="3 8 6 11 11 3"></polyline></svg>}
                                </div>
                                <span className="text-[11px] text-gray-600 group-hover:text-gray-900 transition-colors">Make this address default for billing/shipping</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !isPhoneValid}
                            className="w-full md:w-auto px-12 py-3.5 bg-[#161616] text-white rounded-sm text-[12px] font-bold  uppercase hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading && <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>}
                            {editData ? 'Update Address' : 'Submit'}
                        </button>

                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AddAddressModal;
