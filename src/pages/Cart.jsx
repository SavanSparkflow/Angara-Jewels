import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Phone, Mail, MessageCircle, ShieldCheck, Truck, RotateCcw, Award, Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();
    const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [giftMessage, setGiftMessage] = useState(false);
    const [giftWrapping, setGiftWrapping] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const discount = selectedCoupon ? 25000 : 0; // Mock discount
    const shipping = 0;
    const total = cartTotal - discount + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-20 text-center">
                <div className="max-w-[1400px] mx-auto px-6">
                    <h1 className="text-2xl font-serif mb-4">Your Shopping Bag is Empty</h1>
                    <p className="text-gray-500 mb-8 text-sm">Discover our finest masterpieces and start your collection.</p>
                    <Link to="/" className="inline-block bg-black text-white px-10 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                        Browse Jewelry
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#fcfcfc] min-h-screen pt-24 pb-12">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-8">
                
                {/* Header Step Counter */}
                <div className="absolute top-20 right-6 lg:right-12 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                    STEP 1/3
                </div>

                {/* LEFT: Items & Addons */}
                <div className="flex-grow space-y-4">
                    <div className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm relative">
                        <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-6">Item : {cartItems.length}</div>
                        
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-6 relative border-b border-gray-50 pb-8 last:border-0 last:pb-0">
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-0 right-0 text-gray-400 hover:text-black transition-colors"
                                    >
                                        <X size={16} strokeWidth={1.5} />
                                    </button>

                                    <div className="w-24 h-24 bg-[#f9f9f9] border border-gray-50 p-2 flex items-center justify-center rounded-sm">
                                        <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-[14px] text-gray-800 font-medium mb-2 tracking-tight uppercase">{item.name}</h3>
                                        <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4">
                                            <div className="text-[11px] text-gray-500 uppercase font-bold tracking-wider">
                                                Size : <span className="text-gray-900 ml-1">{item.customizations?.size || '8'}</span>
                                            </div>
                                            <div className="text-[11px] text-gray-500 uppercase font-bold tracking-wider flex items-center gap-2">
                                                Qty : 
                                                <div className="inline-flex items-center border border-gray-200 ml-1 bg-white">
                                                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-0.5 hover:bg-gray-50 border-r border-gray-200"><Minus size={10}/></button>
                                                    <span className="px-3 py-0.5 text-[10px] text-gray-900 font-bold">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-0.5 hover:bg-gray-50 border-l border-gray-200"><Plus size={10}/></button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <span className="text-[14px] font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                                            <span className="text-[11px] text-gray-400 line-through">{formatPrice(item.price * 1.05 * item.quantity)}</span>
                                        </div>

                                        <button className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5 hover:text-black transition-colors group">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-black transition-colors"></div> VIEW DETAILS
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Apply Coupons Section */}
                    <button 
                        onClick={() => setIsCouponDrawerOpen(true)}
                        className="w-full bg-white border border-gray-100 p-5 rounded-sm shadow-sm flex items-center justify-between group hover:bg-gray-50 transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-[#2ebd59] rounded-full flex items-center justify-center text-white">
                                <Tag size={12} fill="currentColor" />
                            </div>
                            <span className="text-[12px] font-bold text-gray-800 uppercase tracking-widest">Apply Coupons</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                    </button>

                    {/* Make it Special */}
                    <div className="bg-white border border-gray-100 rounded-sm shadow-sm">
                        <div className="p-5 border-b border-gray-50">
                            <h3 className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em]">Make it Special! (Add Ons)</h3>
                        </div>
                        
                        <div className="p-2 space-y-2">
                            {/* Gift Message */}
                            <div className="flex items-center justify-between p-4 hover:bg-[#fcfcfc] transition-colors group border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#fff7f0] rounded-sm flex items-center justify-center">
                                        <Mail size={20} className="text-[#a67c00]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">Personalised Gift Message</h4>
                                        <p className="text-[10px] text-gray-500">Gifts Speak Better With Handwritten Notes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-[11px] font-bold text-[#2ebd59] uppercase tracking-widest">Free</span>
                                    <button 
                                        onClick={() => setGiftMessage(!giftMessage)}
                                        className={`w-10 h-5 rounded-full relative transition-colors ${giftMessage ? 'bg-[#2ebd59]' : 'bg-gray-200'}`}
                                    >
                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${giftMessage ? 'left-6' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </div>

                            {/* Gift Wrapping */}
                            <div className="flex items-center justify-between p-4 hover:bg-[#fcfcfc] transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#fff7f0] rounded-sm flex items-center justify-center">
                                        <Award size={20} className="text-[#a67c00]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">Gift Wrapping Available</h4>
                                        <p className="text-[10px] text-gray-500">Add an Elegant Touch to Your Present</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">₹50</span>
                                    <button 
                                        onClick={() => setGiftWrapping(!giftWrapping)}
                                        className={`w-10 h-5 rounded-full relative transition-colors ${giftWrapping ? 'bg-[#2ebd59]' : 'bg-gray-200'}`}
                                    >
                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${giftWrapping ? 'left-6' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12 mb-6">
                        <Link to="/" className="text-[11px] font-bold uppercase tracking-widest text-[#2b5c6b] border-b border-[#2b5c6b]/30 pb-1 hover:text-black hover:border-black transition-all">Browse More Products</Link>
                    </div>
                </div>

                {/* RIGHT: Summary & Assurance */}
                <div className="lg:w-[420px] space-y-4">
                    <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                            <h2 className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Order Summary</h2>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-[12px]">
                                <span className="text-gray-500 uppercase tracking-widest font-medium">Subtotal (MRP)</span>
                                <span className="text-gray-900 font-bold leading-none">{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px]">
                                <span className="text-gray-500 uppercase tracking-widest font-medium">Product Discount</span>
                                <span className="text-[#2ebd59] font-bold leading-none">-{formatPrice(discount)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px]">
                                <span className="text-gray-500 uppercase tracking-widest font-medium">Shipping</span>
                                <span className="text-[#2ebd59] font-bold uppercase tracking-widest leading-none">Free</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-[13px] text-gray-900 font-bold uppercase tracking-[0.1em]">Order Total (including GST)</span>
                                <span className="text-[18px] text-gray-900 font-bold leading-none">{formatPrice(total)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 shadow-lg"
                        >
                            <ShieldCheck size={16} /> Secure Checkout <ChevronRight size={14} />
                        </button>

                        <div className="mt-8 bg-[#fff9f0] border border-[#f3e1c9] p-4 flex items-center justify-center gap-4">
                            <Truck size={20} className="text-[#a67c00]" />
                            <div className="text-center">
                                <p className="text-[12px] font-bold text-gray-900 leading-tight">Order within 18h : 19m : 06s</p>
                                <p className="text-[11px] text-gray-600">For Estimated Delivery by <span className="font-bold text-gray-900">Sat, 14th Mar</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Why Shop With Us Icons */}
                    <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm">
                        <h3 className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] text-center mb-10 pb-4 border-b border-gray-50">Why Shop With Us</h3>
                        <div className="grid grid-cols-5 gap-4">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 bg-[#f9f9f9] rounded-full flex items-center justify-center text-gray-800 mb-2 border border-gray-50 shadow-sm"><X size={16}/></div>
                                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter leading-tight">BIS Hallmark</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 bg-[#f9f9f9] rounded-full flex items-center justify-center text-gray-800 mb-2 border border-gray-50 shadow-sm"><RotateCcw size={16}/></div>
                                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter leading-tight">Exchange & Buyback</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 bg-[#f9f9f9] rounded-full flex items-center justify-center text-gray-800 mb-2 border border-gray-50 shadow-sm"><Truck size={16}/></div>
                                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter leading-tight">Free 15-Day Returns</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 bg-[#f9f9f9] rounded-full flex items-center justify-center text-gray-800 mb-2 border border-gray-50 shadow-sm"><ShieldCheck size={16}/></div>
                                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter leading-tight">Rare Jewels Certified</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 bg-[#f9f9f9] rounded-full flex items-center justify-center text-gray-800 mb-2 border border-gray-50 shadow-sm">
                                    <div className="text-[10px] font-black italic tracking-tighter">4.7/5</div>
                                </div>
                                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter leading-tight">Rated 4.7/5</span>
                            </div>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm mb-12">
                        <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.1em] text-center mb-8">Need help with your order? We're here</h3>
                        <div className="grid grid-cols-3 gap-2">
                             <div className="bg-[#fcfcfc] p-4 flex flex-col items-center justify-center group cursor-pointer hover:bg-white transition-all border border-transparent hover:border-gray-100">
                                <Phone size={18} className="text-gray-800 mb-2" />
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Call Us</span>
                             </div>
                             <div className="bg-[#fcfcfc] p-4 flex flex-col items-center justify-center group cursor-pointer hover:bg-white transition-all border border-transparent hover:border-gray-100">
                                <Mail size={18} className="text-gray-800 mb-2" />
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Email Us</span>
                             </div>
                             <div className="bg-[#fcfcfc] p-4 flex flex-col items-center justify-center group cursor-pointer hover:bg-white transition-all border border-transparent hover:border-gray-100">
                                <MessageCircle size={18} className="text-gray-800 mb-2" />
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Chat Now</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coupons Drawer */}
            <AnimatePresence>
                {isCouponDrawerOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCouponDrawerOpen(false)}
                            className="fixed inset-0 bg-black/40 z-[120] backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-white z-[130] shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center gap-4 p-6 border-b border-gray-100 bg-[#fcfcfc]">
                                <button onClick={() => setIsCouponDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black">
                                    <ChevronLeft size={20} />
                                </button>
                                <h2 className="text-[14px] font-bold uppercase tracking-widest">Coupons</h2>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                                <div className="flex gap-2 mb-10">
                                    <input 
                                        type="text" 
                                        placeholder="Enter coupon code" 
                                        className="flex-1 border border-gray-200 px-4 py-3 text-[12px] outline-none focus:border-black transition-colors rounded-sm uppercase tracking-widest"
                                    />
                                    <button className="bg-white border border-gray-200 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-black transition-colors rounded-sm">Apply</button>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-6 opacity-60">
                                        <MessageCircle size={14} className="text-gray-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live Offers</span>
                                    </div>

                                    {[
                                        { code: 'CELEBRATE', desc: 'Use this code for extra 5% off*' },
                                        { code: 'STONE12', desc: 'Get 12% off* on Diamond & Gemstone value above ₹1,00,000' },
                                        { code: 'WELCOME', desc: 'Login to unlock your first-order discount', type: 'login' },
                                        { code: 'MAKINGCHARGE20', desc: 'Get 20% off on making charges' }
                                    ].map((offer, idx) => (
                                        <div key={idx} className="border border-gray-100 rounded-sm overflow-hidden flex shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="w-12 bg-gradient-to-b from-[#d4af37] to-[#b8860b] flex items-center justify-center">
                                                <span className="text-white text-[10px] font-black uppercase tracking-widest rotate-[-90deg] whitespace-nowrap px-4">{offer.code}</span>
                                            </div>
                                            <div className="flex-1 p-5 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="text-[12px] font-black text-gray-800 mb-1 uppercase tracking-tight">{offer.code}</h4>
                                                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{offer.desc}</p>
                                                </div>
                                                <div className="mt-6 flex justify-end">
                                                    <button 
                                                        onClick={() => {
                                                            if(offer.type !== 'login') {
                                                                setSelectedCoupon(offer.code);
                                                                setIsCouponDrawerOpen(false);
                                                            }
                                                        }}
                                                        className="px-6 py-2 bg-[#fcfcfc] border border-gray-200 text-[9px] font-bold uppercase tracking-widest hover:border-black hover:bg-white transition-all rounded-sm"
                                                    >
                                                        {offer.type === 'login' ? 'Login' : 'Select'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-20 pt-12 border-t border-gray-100 text-center">
                <div className="flex flex-wrap justify-center gap-6 mb-8 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1024px-UPI-Logo-vector.svg.png" className="h-4" alt="UPI" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.svg/1024px-Rupay-Logo.svg.png" className="h-4" alt="RuPay" />
                </div>
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-4">© 2028 Rare Jewels Jewels Private Limited All Rights Reserved. | Accessibility | Privacy Policy | T&C | Corporate</p>
            </div>
        </div>
    );
};

const Tag = ({ size, className, fill }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill={fill || "none"} 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M7 7h.01M2 9l9.47 9.47a1.5 1.5 0 0 0 2.12 0L22 10V2H14L2 9z" />
    </svg>
);

export default Cart;
