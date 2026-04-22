import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses } from '../redux/slices/addressSlice';
import { ChevronRight, ChevronDown, Info, HelpCircle, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import { apiInstance } from '../redux/services/axiosApi';
import { VALIDATE_COUPON, CREATE_ORDER, VERIFY_PAYMENT } from '../api/constApi';
import visaIcon from '/images/visa.svg';
import mastercardIcon from '/images/mastercard.svg';
import rupayIcon from '/images/rupay.svg';
import upiIcon from '/images/upi-icon.svg';
import shopPayIcon from '/images/Shop_Pay.svg';
import googlePayIcon from '/images/GooglePay.svg';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { addresses } = useSelector(state => state.address);
    const defaultAddress = addresses?.find(addr => addr.isDefault === true);

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        country: 'India'
    });

    useEffect(() => {
        if (defaultAddress) {
            setFormData(prev => ({
                ...prev,
                firstName: defaultAddress.firstName || '',
                lastName: defaultAddress.lastName || '',
                address: defaultAddress.address || '',
                apartment: defaultAddress.apartment || '',
                city: defaultAddress.city || '',
                state: defaultAddress.state || '',
                pincode: defaultAddress.pincode || '',
                phone: defaultAddress.phone || '',
                country: defaultAddress.country || 'India'
            }));
        }
    }, [defaultAddress]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [tip, setTip] = useState(0);
    const [selectedTip, setSelectedTip] = useState('none');
    const [customTip, setCustomTip] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    const handleTipSelect = (type, percent) => {
        setSelectedTip(type);
        if (type === 'percent') {
            setTip(Math.round(cartTotal * (percent / 100)));
        } else if (type === 'none') {
            setTip(0);
        }
    };

    const { formatPrice, currency } = useCurrency();

    // Coupon logic
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponDescription, setCouponDescription] = useState('');

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setIsValidating(true);
        setCouponError('');
        try {
            const response = await apiInstance.post(VALIDATE_COUPON, {
                couponCode,
                cartTotal: cartTotal.toString()
            });
            if (response.data.success) {
                const { discountAmount, description } = response.data.data;
                setDiscount(discountAmount || 0);
                setCouponDescription(description || '');
                setAppliedCoupon(couponCode);
                setCouponCode('');
            } else {
                setCouponError(response.data.error || response.data.message || 'Invalid coupon code');
            }
        } catch (error) {
            setCouponError(error.response?.data?.error || error.response?.data?.message || 'Error validating coupon');
        } finally {
            setIsValidating(false);
        }
    };

    const handleRemoveCoupon = () => {
        setDiscount(0);
        setAppliedCoupon(null);
        setCouponDescription('');
        setCouponError('');
    };

    // Order creation logic
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const handlePayNow = async () => {
        if (!defaultAddress) {
            alert("Please provide a valid delivery address.");
            return;
        }

        setIsCreatingOrder(true);
        try {
            // STEP 1: Create Order on Backend (Initiate Razorpay Order)
            const res = await apiInstance.post(CREATE_ORDER, {
                addressId: defaultAddress._id,
                couponCode: appliedCoupon || ""
            });

            if (!res.data.success) {
                alert(res.data.message || "Failed to initiate order");
                setIsCreatingOrder(false);
                return;
            }

            const { razorpayOrderId, amount, currency } = res.data.data;

            // STEP 2: Configure Razorpay Checkout
            const options = {
                key: 'rzp_test_SVkYHZgMnWC1fP', // REPLACE THIS WITH YOUR ACTUAL RAZORPAY KEY ID
                amount: amount,
                currency: currency,
                name: "Rare Jewels",
                description: "Luxury Jewelry Purchase",
                image: "/images/Rare-Jewels-logo.svg",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    // STEP 3: Verify Payment and Create Final Order on Backend
                    try {
                        setIsCreatingOrder(true);
                        const verifyRes = await apiInstance.post(VERIFY_PAYMENT, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            addressId: defaultAddress._id,
                            couponCode: appliedCoupon || ""
                        });

                        if (verifyRes.data.success) {
                            alert("Payment successful! Order placed successfully.");
                            clearCart(); // Clear the local cart after successful purchase
                            navigate('/dashboard'); // Navigate to orders page or dashboard
                        } else {
                            alert(verifyRes.data.message || "Payment verification failed.");
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        alert("Error finalizing order. Please contact support.");
                    } finally {
                        setIsCreatingOrder(false);
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                notes: {
                    address: defaultAddress.address
                },
                theme: {
                    color: "#1F4E56"
                },
                modal: {
                    ondismiss: function() {
                        setIsCreatingOrder(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Order creation error:", error);
            alert(error.response?.data?.message || "Error creating order. Please try again.");
            setIsCreatingOrder(false);
        }
    };

    const finalTotal = cartTotal + tip - discount;

    return (
        <div className="bg-white min-h-screen md:pt-12 pb-18">
            <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* LEFT COLUMN: FORM */}
                <div className="lg:col-span-7 space-y-12">
                    {/* Brand Link */}
                    <Link to="/" className="inline-block mb-4">
                        <img src="/images/Rare-Jewels-logo.svg" alt="Rare Jewels" className="h-10" />
                    </Link>

                    {/* Express Checkout */}
                    <div className="space-y-4">
                        <div className="text-center">
                            <span className="text-[11px] text-gray-400 uppercase  font-medium">Express checkout</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="h-12 bg-[#5A31F4] rounded-sm flex items-center justify-center hover:opacity-90 transition-opacity">
                                <img src={shopPayIcon} className="h-5" alt="Shop Pay" />
                            </button>
                            <button className="h-12 bg-black rounded-sm flex items-center justify-center hover:opacity-90 transition-opacity">
                                <img src={googlePayIcon} className="h-4" alt="Google Pay" />
                            </button>
                        </div>
                        <div className="relative flex items-center justify-center py-4">
                            <div className="w-full border-t border-gray-100"></div>
                            <span className="absolute bg-white px-4 text-[10px] text-gray-400 uppercase  italic font-bold">OR</span>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-baseline">
                            <h2 className="text-[18px] font-bold text-gray-800">Contact</h2>
                            <Link to="#" className="text-[12px] text-gray-500 underline underline-offset-4 font-medium">Log in</Link>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm"
                            />
                            <div className="flex items-center gap-2 group cursor-pointer">
                                <input type="checkbox" id="news" className="w-4 h-4 bg-gray-50 border-gray-200 rounded-sm focus:ring-0 accent-[#1F4E56]" defaultChecked />
                                <label htmlFor="news" className="text-[12px] text-gray-600 font-medium tracking-tight">Email me with news and offers</label>
                            </div>
                        </div>
                    </div>

                    {/* Delivery */}
                    <div className="space-y-6">
                        <h2 className="text-[18px] font-bold text-gray-800">Delivery</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 relative">
                                <select 
                                    name="country" 
                                    value={formData.country} 
                                    onChange={handleInputChange} 
                                    className="w-full border border-gray-200 p-4 pt-6 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm appearance-none bg-white"
                                >
                                    <option value="India">India</option>
                                </select>
                                <span className="absolute top-2 left-4 text-[10px] text-gray-400 uppercase  font-bold">Country/Region</span>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" />
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" />
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="col-span-2 w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" />
                            <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} placeholder="Apartment, suite, etc. (optional)" className="col-span-2 w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" />
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" />
                            <div className="relative">
                                <select name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm appearance-none bg-white">
                                    <option value="">State</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            </div>
                            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="PIN code" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm" />
                            <div className="col-span-2 relative">
                                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone (optional)" className="w-full border border-gray-200 p-4 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm pr-10" />
                                <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                            </div>
                            <div className="col-span-2 flex items-center gap-2 group cursor-pointer pt-2">
                                <input type="checkbox" id="text-news" className="w-4 h-4 bg-gray-50 border-gray-200 rounded-sm focus:ring-0 accent-[#1F4E56]" />
                                <label htmlFor="text-news" className="text-[12px] text-gray-600 font-medium tracking-tight">Text me with news and offers</label>
                            </div>
                        </div>
                    </div>

                    {/* Add tip */}
                    <div className="space-y-4">
                        <h2 className="text-[18px] font-bold text-gray-800 leading-none">Add tip</h2>
                        <div className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm space-y-6">
                            <div className="flex items-start gap-4 cursor-pointer group">
                                <input type="checkbox" id="support" className="mt-1 w-4 h-4 bg-gray-50 border-gray-200 rounded-sm focus:ring-0 accent-[#1F4E56]" defaultChecked />
                                <label htmlFor="support" className="text-[13px] font-semibold text-gray-800 leading-snug">Show your support for the team at Rare Jewels</label>
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                {[5, 10, 15].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => handleTipSelect('percent', p)}
                                        className={`p-2 border text-center transition-all ${selectedTip === 'percent' && tip === Math.round(cartTotal * (p / 100)) ? 'border-[#1F4E56] bg-[#F9FBFC] ring-1 ring-[#1F4E56]' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <div className="text-[13px] font-bold text-gray-900">{p}%</div>
                                        <div className="text-[10px] text-gray-400 mt-1">{formatPrice(Math.round(cartTotal * (p / 100)))}</div>
                                    </button>
                                ))}
                                <button
                                    onClick={() => handleTipSelect('none')}
                                    className={`p-2 border text-center transition-all ${selectedTip === 'none' ? 'border-[#1F4E56] bg-[#F9FBFC] ring-1 ring-[#1F4E56]' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className="text-[13px] font-bold text-gray-900">None</div>
                                </button>
                            </div>

                            <div className="flex gap-4 items-center pt-2">
                                <div className="flex-1 relative flex items-center border border-gray-100 rounded-sm overflow-hidden">
                                    <span className="bg-[#f2f2f2] px-3 py-3 text-gray-400 text-[14px]">{formatPrice(0).substring(0, 1)}</span>
                                    <input
                                        type="text"
                                        placeholder="Custom Tip"
                                        value={customTip}
                                        onChange={(e) => setCustomTip(e.target.value)}
                                        className="flex-1 p-3 text-[13px] outline-none"
                                    />
                                    <div className="flex border-l border-gray-100 divide-x divide-gray-100">
                                        <button className="px-3 hover:bg-gray-50"><Minus size={14} /></button>
                                        <button className="px-3 hover:bg-gray-50"><Plus size={14} /></button>
                                    </div>
                                </div>
                                <button className="bg-[#E6E6E6] text-gray-600 px-6 py-3.5 text-[11px] font-bold uppercase  rounded-sm hover:bg-gray-200 transition-colors">Add tip</button>
                            </div>
                            <p className="text-[11px] text-gray-500 italic">Thank you, we appreciate it.</p>
                        </div>
                    </div>

                    {/* Remember me */}
                    <div className="space-y-4">
                        <h2 className="text-[18px] font-bold text-gray-800 leading-none">Remember me</h2>
                        <div className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm group cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <input type="checkbox" id="remember" className="w-4 h-4 border-gray-200 rounded-sm focus:ring-0 accent-[#1F4E56]" />
                                <label htmlFor="remember" className="text-[13px] font-semibold text-gray-800 cursor-pointer">Save my information for a faster checkout</label>
                            </div>
                        </div>
                    </div>

                    {/* Pay Button */}
                    <div className="pt-8">
                        <div className="text-[11px] text-gray-400 flex items-center gap-2 mb-6 uppercase  font-bold">
                            <ShieldCheck size={14} /> Secure and encrypted
                        </div>
                        <button 
                            onClick={handlePayNow}
                            disabled={isCreatingOrder}
                            className={`w-full bg-[#1F4E56] text-white py-3 text-[16px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#153439] transition-all rounded-sm flex items-center justify-center gap-2 group ${isCreatingOrder ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isCreatingOrder ? 'Processing...' : 'Pay now'}
                        </button>
                        {/* Footer Links */}
                        <div className="flex gap-4 pt-12 pb-24 text-[10px] text-gray-400 font-bold uppercase  justify-center">
                            {['15-day Returns', 'Resizing Policy', 'Lifetime Exchange & Buyback', 'Cancellation Policy'].map(p => (
                                <Link key={p} to="#" className="text-[#1F4E56]/60 underline underline-offset-4 hover:text-[#1F4E56] transition-colors whitespace-nowrap">{p}</Link>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: SUMMARY */}
                <div className="lg:col-span-5 bg-[#F9FBFC] border-l border-gray-100 -mr-12 px-8 pt-20 h-fit min-h-screen">
                    <div className="space-y-8">
                        {/* Cart Items */}
                        <div className="space-y-6">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-center relative">
                                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg p-2 flex items-center justify-center relative">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                                    </div>
                                    <div className="flex-1 space-y-0.5">
                                        <h4 className="text-[12px] font-bold text-gray-800 leading-tight uppercase tracking-tight">{item.title}</h4>
                                        <div className="inline-block px-1.5 py-0.5 bg-gray-200 text-gray-600 text-[8px] font-bold uppercase rounded-sm mb-1">Natural</div>
                                        <div className="text-[10px] text-gray-400 font-medium">
                                            {item.options ? Object.entries(item.options)
                                                .filter(([_, v]) => typeof v === 'string' || typeof v === 'number')
                                                .map(([k, v]) => `${k.toUpperCase()}: ${v}`).join(' | ') : ''}
                                        </div>
                                    </div>
                                    <div className="text-[13px] font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</div>
                                </div>
                            ))}
                        </div>

                        {/* Coupon */}
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Discount code or gift card"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="flex-1 bg-white border border-gray-200 p-3 text-[13px] outline-none focus:ring-1 focus:ring-gray-300 rounded-sm"
                                    disabled={appliedCoupon || isValidating}
                                />
                                {appliedCoupon ? (
                                    <button 
                                        onClick={handleRemoveCoupon}
                                        className="bg-red-50 text-red-600 px-4 py-3 text-[11px] font-bold uppercase rounded-sm hover:bg-red-100 transition-colors"
                                    >
                                        Remove
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleApplyCoupon}
                                        disabled={!couponCode || isValidating}
                                        className="bg-[#E6E6E6] text-gray-600 px-4 py-3 text-[11px] font-bold uppercase rounded-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
                                    >
                                        {isValidating ? '...' : 'Apply'}
                                    </button>
                                )}
                            </div>
                            {couponError && <p className="text-[11px] text-red-500 font-medium">{couponError}</p>}
                            {appliedCoupon && (
                                <div className="flex flex-col gap-1 bg-green-50 text-green-700 p-2 rounded-sm border border-green-100">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={14} />
                                        <span className="text-[11px] font-bold uppercase tracking-wider">Coupon "{appliedCoupon}" Applied! ({formatPrice(discount)} off)</span>
                                    </div>
                                    {couponDescription && <p className="text-[10px] italic ml-5 opacity-80">{couponDescription}</p>}
                                </div>
                            )}
                        </div>

                        {/* Breakdown */}
                        <div className="space-y-3 pt-6">
                            <div className="flex justify-between text-[13px] font-medium text-gray-600">
                                <span>Subtotal</span>
                                <span className="text-gray-900 font-bold">{formatPrice(cartTotal)}</span>
                            </div>
                             <div className="flex justify-between items-center text-[13px] font-medium text-gray-600">
                                <span className="flex items-center gap-2">Shipping <HelpCircle size={14} className="text-gray-300" /></span>
                                <span className="text-[12px] text-gray-400 italic">Free Shipping</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-[13px] font-medium text-green-600">
                                    <span>Discount ({appliedCoupon})</span>
                                    <span className="font-bold">-{formatPrice(discount)}</span>
                                </div>
                            )}
                            {tip > 0 && (
                                <div className="flex justify-between text-[13px] font-medium text-gray-600">
                                    <span>Support Tip</span>
                                    <span className="text-gray-900 font-bold">{formatPrice(tip)}</span>
                                </div>
                            )}
                        </div>

                        {/* Total */}
                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-baseline">
                                <span className="text-[18px] font-bold text-gray-800">Total</span>
                                <div className="text-right">
                                    <div className="text-[11px] text-gray-400 font-bold  uppercase mb-1">{currency}</div>
                                    <div className="text-[22px] font-bold text-gray-900 leading-none tracking-tight">{formatPrice(finalTotal)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const Plus = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const Minus = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export default Checkout;
