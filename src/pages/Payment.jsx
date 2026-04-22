import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ShieldCheck, Truck, ChevronRight, ChevronLeft, MapPin, X, RotateCcw, Award, Phone, Mail, MessageCircle, Lock, PhoneCall, Star, CreditCard } from 'lucide-react';

const Payment = () => {
    const { cartItems, cartTotal } = useCart();
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('payu');

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price || 0);
    };

    const discount = 25000;
    const total = cartTotal > 0 ? cartTotal - discount : 0;

    return (
        <div className="bg-[#fcfcfc] min-h-screen pt-24 pb-12">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/checkout" className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-400 hover:text-black transition-colors ">
                        <ChevronLeft size={16} /> Payment
                    </Link>
                    <div className="text-[10px] text-gray-400 font-bold  uppercase">
                        STEP 3/3
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT: Payment Methods */}
                    <div className="flex-grow space-y-6">

                        {/* Payment Method Section */}
                        <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm relative">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard size={18} className="text-gray-400" />
                                <h2 className="text-[13px] font-bold text-gray-900 uppercase">Payment Method</h2>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium mb-6 uppercase  border-b border-gray-50 pb-4">All transactions are secure and encrypted</p>

                            <div className="space-y-4">
                                {/* PayU */}
                                <label className={`flex items-center justify-between p-5 border rounded-sm cursor-pointer transition-all ${selectedPayment === 'payu' ? 'border-black bg-[#fafafa] shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-10 bg-white border border-gray-100 rounded-sm flex items-center justify-center p-2 shadow-sm">
                                            <span className="text-[#a1be43] font-black text-xl italic tracking-tighter">PayU</span>
                                        </div>
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-900 tracking-wide mb-1">PayU</h3>
                                            <p className="text-[11px] text-gray-500 tracking-wide">UPI, Cards, Net Banking, Wallets</p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="payu"
                                        checked={selectedPayment === 'payu'}
                                        onChange={() => setSelectedPayment('payu')}
                                        className="w-4 h-4 accent-black"
                                    />
                                </label>

                                {/* Razorpay */}
                                <label className={`flex items-center justify-between p-5 border rounded-sm cursor-pointer transition-all ${selectedPayment === 'razorpay' ? 'border-black bg-[#fafafa] shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-10 bg-white border border-gray-100 rounded-sm flex items-center justify-center p-2 shadow-sm">
                                            <div className="transform -skew-x-12 bg-blue-600 text-white px-2 py-0.5 font-bold italic">R</div>
                                        </div>
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-900 tracking-wide mb-1">Razorpay</h3>
                                            <p className="text-[11px] text-gray-500 tracking-wide">UPI, Cards, Net Banking, Wallets</p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="razorpay"
                                        checked={selectedPayment === 'razorpay'}
                                        onChange={() => setSelectedPayment('razorpay')}
                                        className="w-4 h-4 accent-black"
                                    />
                                </label>

                                {/* Cash On Delivery */}
                                <label className={`flex items-center justify-between p-5 border rounded-sm cursor-pointer transition-all ${selectedPayment === 'cod' ? 'border-black bg-[#fafafa] shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-10 bg-white border border-gray-100 rounded-sm flex items-center justify-center p-1 shadow-sm">
                                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135698.png" className="w-6 h-6 object-contain opacity-70" alt="COD" />
                                        </div>
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-900 tracking-wide mb-1">Cash On Delivery</h3>
                                            <p className="text-[11px] text-gray-500 tracking-wide">On Orders Below ₹ 49,000</p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cod"
                                        checked={selectedPayment === 'cod'}
                                        onChange={() => setSelectedPayment('cod')}
                                        className="w-4 h-4 accent-black"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Estimated Delivery Section */}
                        <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <Truck size={16} className="text-gray-400" />
                                <h2 className="text-[11px] font-bold text-gray-500  uppercase">Estimated Delivery</h2>
                            </div>
                            <p className="text-[13px] font-bold text-gray-900 tracking-wide ml-7">Sat, 14th Mar</p>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm space-y-2">
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-50 pb-4">
                                <MapPin size={16} className="text-gray-400" />
                                <h2 className="text-[11px] font-bold text-gray-500  uppercase">Shipping Address</h2>
                            </div>
                            <div className="ml-7 space-y-3 text-[12px] text-gray-600 tracking-wide leading-relaxed">
                                <p><span className="font-semibold text-gray-600 mr-2">Name:</span> <span className="font-bold text-gray-900">savan asodariya</span></p>
                                <p><span className="font-semibold text-gray-600 mr-2">Address:</span> Hari ichha Industrial Estate, 73, Karanj (Navagam), Karanj, Varachha, Surat, Gujarat 395006</p>
                                <p><span className="font-semibold text-gray-600 mr-2">Mobile Number:</span> 9737531475</p>
                            </div>
                        </div>

                        {/* Billing Address */}
                        <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm space-y-2">
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-50 pb-4">
                                <MapPin size={16} className="text-gray-400" />
                                <h2 className="text-[11px] font-bold text-gray-500  uppercase">Billing Address</h2>
                            </div>
                            <div className="ml-7 space-y-3 text-[12px] text-gray-600 tracking-wide leading-relaxed">
                                <p><span className="font-semibold text-gray-600 mr-2">Name:</span> <span className="font-bold text-gray-900">savan asodariya</span></p>
                                <p><span className="font-semibold text-gray-600 mr-2">Address:</span> Hari ichha Industrial Estate, 73, Karanj (Navagam), Karanj, Varachha, Surat, Gujarat 395006</p>
                                <p><span className="font-semibold text-gray-600 mr-2">Mobile Number:</span> 9737531475</p>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT: Sidebar Summary */}
                    <div className="lg:w-[420px] space-y-6">
                        <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm sticky top-28">
                            <div className="mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
                                <Award size={14} className="text-gray-400" />
                                <h3 className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em]">Order Summary</h3>
                            </div>

                            <div className="bg-white border border-gray-100 p-4 mb-6 rounded-sm">
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-16 bg-[#f9f9f9] border border-gray-50 flex-shrink-0 p-1">
                                                <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight">{item.name}</h4>
                                                <div className="flex gap-4 text-[10px] text-gray-500 font-bold  mt-1">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span>Size: {item.customizations?.size || '9'}</span>
                                                </div>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-[12px] font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                                                    <span className="text-[10px] text-gray-400 line-through decoration-gray-300">{formatPrice((item.price * item.quantity) + 62596)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {cartItems.length === 0 && (
                                        <div className="text-center py-4">
                                            <p className="text-[11px] text-gray-400 uppercase ">Your cart is empty</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-5 py-6 border-t border-gray-100">
                                <div className="flex justify-between text-[11px]  font-bold">
                                    <span className="text-gray-600">Subtotal (MRP)</span>
                                    <span className="text-gray-900">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-[11px]  font-bold text-[#2ebd59]">
                                    <span>Product Discount</span>
                                    <span>-{formatPrice(discount)}</span>
                                </div>
                                <div className="flex justify-between text-[11px]  font-bold">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-[#555]">Free</span>
                                </div>
                            </div>

                            <div className="py-6 border-y border-gray-100 flex justify-between items-center mb-6">
                                <span className="text-[13px] font-bold tracking-wide text-gray-900">Order Total <span className="text-[10px] text-gray-500 font-normal ml-1">(including GST)</span></span>
                                <span className="text-[18px] font-black text-gray-900 leading-none">{formatPrice(total)}</span>
                            </div>

                            <div className="mb-6">
                                <button className="w-full bg-black text-white py-4 text-[14px] font-bold hover:bg-gray-800 transition-colors flex items-center justify-between px-6 shadow-xl rounded-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[16px] leading-none">{formatPrice(total)}</span>
                                        <span className="text-[10px] text-gray-400 line-through leading-none decoration-gray-500">{formatPrice(total + 62596)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[12px] uppercase">
                                        <ShieldCheck size={16} /> Pay Now <ChevronRight size={14} />
                                    </div>
                                </button>
                            </div>

                            <div className="bg-[#fef9f2] border border-[#fae5c7] p-4 flex items-center justify-center gap-4 rounded-sm shadow-sm">
                                <Truck size={24} className="text-[#c19551]" />
                                <div className="text-left">
                                    <p className="text-[11px] text-gray-600 mb-0.5">Order within <span className="text-[#c19551] font-bold ml-1 ">02h : 31m : 23s</span></p>
                                    <p className="text-[10px] text-gray-500">For Estimated Delivery by <span className="font-bold text-gray-900">Sat, 14th Mar</span></p>
                                </div>
                            </div>

                        </div>

                        {/* Why Shop With Us Section matching image closely */}
                        <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm pb-8">
                            <h3 className="text-[11px] text-gray-500 font-bold uppercase  mb-6">Why Shop With Us</h3>
                            <div className="grid grid-cols-5 gap-2 border-t border-gray-50 pt-6">
                                {[
                                    { icon: Award, label: 'Hallmark' },
                                    { icon: RotateCcw, label: 'Exchange & Buyback' },
                                    { icon: Truck, label: 'Free 15-Day Returns' },
                                    { icon: ShieldCheck, label: 'Rare Jewels Certified' },
                                    { icon: Star, label: 'Rated 4.7/5' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center">
                                        <div className="w-9 h-9 bg-[#fbfbfb] rounded-full flex items-center justify-center mb-2 border border-gray-100">
                                            <item.icon size={14} className="text-gray-600" />
                                        </div>
                                        <span className="text-[8px] text-gray-600 font-bold uppercase tracking-tight leading-tight px-1">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Need help with your order? */}
                        <div className="text-center pt-2">
                            <h3 className="text-[11px] text-gray-500 font-medium tracking-wide mb-4">Need help with your order? We're here</h3>
                            <div className="flex justify-center gap-3">
                                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors bg-gray-50 py-3 px-6 rounded-sm flex-1 justify-center border border-gray-100">
                                    <PhoneCall size={14} className="text-gray-800" />
                                    <span className="text-[10px] font-bold text-gray-700">Call Us</span>
                                </div>
                                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors bg-gray-50 py-3 px-6 rounded-sm flex-1 justify-center border border-gray-100">
                                    <Mail size={14} className="text-gray-800" />
                                    <span className="text-[10px] font-bold text-gray-700">Email Us</span>
                                </div>
                                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors bg-gray-50 py-3 px-6 rounded-sm flex-1 justify-center border border-gray-100">
                                    <MessageCircle size={14} className="text-gray-800" />
                                    <span className="text-[10px] font-bold text-gray-700">Chat Now</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container px-4 mx-auto mt-20 pt-12 border-t border-gray-100 text-center pb-12">
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">© 2028 Rare Jewels Jewels Private Limited All Rights Reserved. | Accessibility | Privacy Policy | T&C | Corporate</p>
            </div>
        </div>
    );
};

export default Payment;
