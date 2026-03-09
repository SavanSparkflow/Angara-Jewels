import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ShieldCheck, Truck, ChevronRight, ChevronLeft, MapPin, X, RotateCcw, Award, Phone, Mail, MessageCircle } from 'lucide-react';

const Checkout = () => {
    const { cartItems, cartTotal } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        address: '',
        apartment: '',
        landmark: '',
        state: '',
        city: '',
        pincode: '',
        pan: ''
    });
    const [useGstInvoice, setUseGstInvoice] = useState(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const handleGetLocation = () => {
        if ("geolocation" in navigator) {
            setIsLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Simulating a reverse geocoding API response
                    setTimeout(() => {
                        setFormData(prev => ({
                            ...prev,
                            address: 'Hari ichha Industrial Estate, 73, Karanj (Navagam), Karanj, Varachha',
                            city: 'Surat',
                            state: 'Gujarat',
                            pincode: '395006',
                            firstName: 'savan',
                            lastName: 'asodariya',
                            mobile: '9737531475'
                        }));
                        setIsLoadingLocation(false);
                    }, 600);
                },
                (error) => {
                    console.error("Error obtaining location", error);
                    setIsLoadingLocation(false);
                    alert("Please allow location access so we can automatically fill your address.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
        }
    };


    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const discount = 25000;
    const total = cartTotal - discount;

    return (
        <div className="bg-[#fcfcfc] min-h-screen pt-24 pb-12">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/cart" className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-400 hover:text-black transition-colors tracking-widest">
                        <ChevronLeft size={16} /> Add Address
                    </Link>
                    <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                        STEP 2/3
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT: Shipping Form */}
                    <div className="flex-grow space-y-6">
                        <div className="bg-white border border-gray-100 p-4 rounded-sm shadow-sm">
                            <div className="flex justify-between items-center mb-10">
                                <h1 className="text-[13px] font-bold text-gray-600 tracking-wide">Shipping Address</h1>
                                <button 
                                    onClick={handleGetLocation}
                                    disabled={isLoadingLocation}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-black transition-all disabled:opacity-50"
                                >
                                    <MapPin size={14} /> {isLoadingLocation ? 'Getting...' : 'Get Location'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Address*</label>
                                    <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="e.g. Flat 5A, Green Heights, MG Road" className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Flat No/Building</label>
                                    <input type="text" value={formData.apartment} onChange={(e) => setFormData({...formData, apartment: e.target.value})} className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Landmark</label>
                                    <input type="text" value={formData.landmark} onChange={(e) => setFormData({...formData, landmark: e.target.value})} className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Country</label>
                                    <input type="text" value="India" readOnly className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] text-gray-400 outline-none rounded-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">State*</label>
                                    <select value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm appearance-none cursor-pointer">
                                        <option value="">Select State</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Delhi">Gujarat</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">City*</label>
                                    <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Pincode*</label>
                                    <input type="text" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                </div>

                                <div className="md:col-span-2 mt-4 mb-2">
                                    <h2 className="text-[13px] font-bold text-gray-600 tracking-wide">Contact Details</h2>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">First Name*</label>
                                    <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Last Name*</label>
                                    <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Mobile Number*</label>
                                    <div className="flex">
                                        <div className="px-4 py-3 border border-r-0 border-gray-100 bg-[#fcfcfc] text-[12px] text-gray-500 font-bold">+91</div>
                                        <input type="text" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} placeholder="Enter 10-digit mobile number" className="flex-1 border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Enter your email address" className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm" />
                                </div>
                            </div>

                            <div className="space-y-6 pt-10 border-t border-gray-50">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 accent-black" />
                                    <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-black transition-colors">Keep my Shipping and Billing Addresses same</span>
                                </label>
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 accent-black" />
                                    <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-black transition-colors">Sign up for offers and updates from Rare Jewels.</span>
                                </label>
                            </div>
                        </div>

                        {/* PAN Alert Box */}
                        <div className="bg-[#fff1f1] p-6 rounded-sm border border-[#ffcfcf] flex items-start gap-4">
                            <Info size={18} className="text-[#d8000c] mt-0.5" />
                            <p className="text-[11px] font-medium text-[#d8000c] leading-relaxed italic">Please provide your PAN details.</p>
                        </div>

                        <div className="bg-white border border-gray-100 p-10 rounded-sm shadow-sm">
                            <div className="mb-6 flex items-center gap-2">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">PAN Verification</span>
                                <Info size={12} className="text-gray-300" />
                            </div>
                            <div className="max-w-xs mb-10">
                                <input type="text" placeholder="PAN" className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm uppercase tracking-widest" />
                            </div>
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    checked={useGstInvoice}
                                    onChange={(e) => setUseGstInvoice(e.target.checked)}
                                    className="mt-1 w-4 h-4 accent-black" 
                                />
                                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-black transition-colors">Use GST Invoice</span>
                            </label>

                            {useGstInvoice && (
                                <div className="mt-6 max-w-xs">
                                    <input 
                                        type="text" 
                                        placeholder="GSTIN" 
                                        className="w-full border border-gray-100 bg-[#fcfcfc] px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm uppercase tracking-widest" 
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center mt-20 mb-8 overflow-hidden transform group cursor-pointer hover:opacity-80 transition-all">
                             <img src="https://images.unsplash.com/photo-1512336332152-cb4db696f5b9?auto=format&fit=crop&q=80&w=600" className="h-24 w-full object-cover grayscale opacity-10 hover:grayscale-0 hover:opacity-100 transition-all duration-700" alt="banner" />
                        </div>
                    </div>

                    {/* RIGHT: Sidebar Summary */}
                    <div className="lg:w-[420px] space-y-4">
                        <div className="bg-white border border-gray-100 p-3 rounded-sm shadow-sm sticky top-28">
                            <div className="mb-8 pb-4 border-b border-gray-50">
                                <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Order Summary</h3>
                            </div>

                            <div className="space-y-6 mb-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-14 h-14 p-1 bg-[#f9f9f9] border border-gray-50 flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight">{item.name}</h4>
                                            <div className="flex gap-4 text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                                <span>Qty: {item.quantity}</span>
                                                <span>Size: {item.customizations?.size || '9'}</span>
                                            </div>
                                            <div className="text-[11px] font-bold text-gray-900 mt-1">{formatPrice(item.price * item.quantity)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 py-8 border-y border-gray-50">
                                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold">
                                    <span className="text-gray-400">Subtotal (MRP)</span>
                                    <span className="text-gray-900">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-[#2ebd59]">
                                    <span>Product Discount</span>
                                    <span>-{formatPrice(discount)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold">
                                    <span className="text-gray-400">Shipping</span>
                                    <span className="text-[#2ebd59]">Free</span>
                                </div>
                            </div>

                            <div className="my-8 flex justify-between items-center">
                                <span className="text-[12px] font-bold uppercase tracking-widest text-gray-900">Order Total (including GST)</span>
                                <span className="text-[18px] font-bold text-gray-900 leading-none">{formatPrice(total)}</span>
                            </div>

                            <button onClick={() => navigate('/payment')} className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 shadow-lg mb-8">
                                <ShieldCheck size={16} /> Proceed to Payment <ChevronRight size={14} />
                            </button>

                            <div className="bg-[#fff9f0] border border-[#f3e1c9] p-4 flex items-center justify-center gap-4 mb-10">
                                <Truck size={20} className="text-[#a67c00]" />
                                <div className="text-center">
                                    <p className="text-[12px] font-bold text-gray-900 leading-tight">Order within 18h : 17m : 34s</p>
                                    <p className="text-[11px] text-gray-600">For Estimated Delivery by <span className="font-bold text-gray-900">Sat, 14th Mar</span></p>
                                </div>
                            </div>

                            {/* Why Shop Icons Reused */}
                            <div className="grid grid-cols-5 gap-2 border-t border-gray-50 pt-10">
                                 {[
                                     { icon: X, label: 'BIS Hallmark' },
                                     { icon: RotateCcw, label: 'Exchange & Buyback' },
                                     { icon: Truck, label: 'Free Returns' },
                                     { icon: ShieldCheck, label: 'Rare Jewels Certified' },
                                     { label: '4.7/5', text: 'Rated 4.7/5' }
                                 ].map((item, idx) => (
                                     <div key={idx} className="flex flex-col items-center text-center">
                                         <div className="w-8 h-8 md:w-10 md:h-10 bg-[#f9f9f9] rounded-full flex items-center justify-center border border-gray-50 mb-1">
                                             {item.icon ? <item.icon size={14}/> : <span className="text-[9px] font-bold italic">{item.label}</span>}
                                         </div>
                                         <span className="text-[7px] text-gray-500 font-bold uppercase tracking-tighter leading-tight">{item.text || item.label}</span>
                                     </div>
                                 ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Payment Icons Footer Reused */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-20 pt-12 border-t border-gray-100 text-center pb-12">
                <div className="flex flex-wrap justify-center gap-12 mb-8 opacity-40 grayscale group hover:opacity-100 transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1024px-UPI-Logo-vector.svg.png" className="h-4" alt="UPI" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.svg/1024px-Rupay-Logo.svg.png" className="h-4" alt="RuPay" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/BHIM_Logo.svg/1024px-BHIM_Logo.svg.png" className="h-4" alt="BHIM" />
                </div>
                <div className="flex flex-wrap justify-center gap-12 items-center opacity-60 mb-10 overflow-hidden">
                     <span className="text-[12px] font-serif font-bold tracking-tight">THE ECONOMIC TIMES</span>
                     <span className="text-[12px] font-sans font-black tracking-tight border-b-2 border-red-600">INDIA TODAY</span>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/CNBC_TV18_logo.png" className="h-6" alt="cnbc" />
                </div>
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">© 2028 Rare Jewels Jewels Private Limited All Rights Reserved. | Accessibility | Privacy Policy | T&C | Corporate</p>
            </div>
        </div>
    );
};

const Info = ({ size, className }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);

export default Checkout;
