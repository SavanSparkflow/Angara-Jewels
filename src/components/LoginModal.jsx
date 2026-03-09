import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLogin } from '../contexts/LoginContext';

const rings = [
    { src: 'https://pngimg.com/uploads/ring/ring_PNG63.png', sizeClass: 'w-[140px]' },
    { src: 'https://pngimg.com/uploads/ring/ring_PNG66.png', sizeClass: 'w-[110px]' },
    { src: 'https://pngimg.com/uploads/ring/ring_PNG54.png', sizeClass: 'w-[90px]' },
    { src: 'https://pngimg.com/uploads/ring/ring_PNG35.png', sizeClass: 'w-[120px]' },
    { src: 'https://pngimg.com/uploads/ring/ring_PNG41.png', sizeClass: 'w-[150px]' }
];

const LoginModal = ({ isOpen, onClose }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const { login } = useLogin();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            >
                {/* Backdrop Click */}
                <div className="absolute inset-0" onClick={onClose}></div>

                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative w-full max-w-[1100px] bg-[#222222] rounded-md shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[480px]"
                >
                    {/* White Background Curve (Radius 500px) */}
                    <div 
                        className="hidden md:block absolute top-1/2 bg-white rounded-full z-0"
                        style={{ 
                            left: 'calc(45% + 500px)', 
                            width: '1000px', 
                            height: '1000px',
                            marginTop: '-500px',
                            marginLeft: '-500px',
                        }}
                    ></div>

                    {/* Solid White Rect for mobile - fallback */}
                    <div className="md:hidden absolute inset-0 bg-white z-0"></div>

                    {/* Rotating Rings */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="hidden md:block absolute top-1/2 z-10 pointer-events-none"
                        style={{ 
                            left: 'calc(45% + 500px)', 
                            width: '1000px', 
                            height: '1000px', 
                            marginTop: '-500px',
                            marginLeft: '-500px',
                        }}
                    >
                        {rings.map((ring, index) => {
                            const angle = (index * 360) / rings.length;
                            return (
                                <div 
                                    key={index}
                                    className="absolute"
                                    style={{ 
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(-500px) rotate(-${angle}deg)` 
                                    }}
                                >
                                    <motion.img 
                                        src={ring.src}
                                        alt="Jewelry"
                                        className={`object-contain drop-shadow-2xl ${ring.sizeClass}`}
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* RIGHT SIDE: Login Form Area */}
                    <div className="w-full md:w-[55%] ml-auto bg-transparent p-8 md:p-12 flex flex-col justify-center relative z-20">
                        {/* Close Button */}
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                        >
                            <X size={14} strokeWidth={2.5} />
                        </button>

                        <div className="flex flex-col items-center max-w-[340px] w-full mx-auto">
                            {/* Logo */}
                            <div className="mb-6 flex justify-center w-full">
                                <img src="/images/Rare-Jewels-logo.svg" alt="Rare Jewels" className="h-6 md:h-20" />
                            </div>

                            {/* Heading */}
                            <h2 className="text-[12px] font-bold text-gray-800 text-center mb-6 tracking-wide">
                                Get Additional 5% Off On Your First Order
                            </h2>

                            {/* Input Group */}
                            <div className="w-full flex border border-gray-200 rounded-sm overflow-hidden mb-4 bg-white focus-within:border-gray-500 transition-colors">
                                <span className="bg-transparent text-gray-600 px-3 py-3 border-r border-gray-100 flex items-center justify-center font-medium min-w-max text-[13px]">
                                    +91 &nbsp;|&nbsp;
                                </span>
                                <input 
                                    type="tel" 
                                    placeholder="Enter your mobile number*" 
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    className="w-full px-3 py-3 text-[13px] text-gray-900 outline-none flex-1 bg-transparent placeholder-gray-400"
                                />
                            </div>

                            {/* Continue Button */}
                            <button 
                                disabled={mobileNumber.length < 10}
                                onClick={login}
                                className={`w-full py-3.5 rounded-sm text-[12px] font-medium tracking-wide uppercase transition-colors mb-6 
                                    ${mobileNumber.length >= 10 
                                        ? 'bg-black text-white cursor-pointer hover:bg-gray-800' 
                                        : 'bg-[#f4f4f4] text-[#a1a1a1] cursor-not-allowed'}`}
                            >
                                Continue
                            </button>

                            {/* Footer Texts */}
                            <p className="text-[10px] text-gray-400 text-center mb-6 w-full max-w-[280px]">
                                By continuing, I agree to <a href="#" className="underline font-medium hover:text-gray-800">T&C</a> & <a href="#" className="underline font-medium hover:text-gray-800">Privacy Policy</a>
                            </p>

                            {/* Checkbox */}
                            <label className="flex items-center justify-center gap-2 cursor-pointer w-full group">
                                <div className="relative flex items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={subscribe}
                                        onChange={() => setSubscribe(!subscribe)}
                                        className="appearance-none w-4 h-4 border border-gray-300 rounded-sm bg-white checked:bg-black checked:border-black cursor-pointer transition-colors"
                                    />
                                    {subscribe && <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none left-[3px]" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 8 6 11 11 3"></polyline></svg>}
                                </div>
                                <span className="text-[10px] text-gray-500 group-hover:text-gray-800 transition-colors">Subscribe for exclusive offers from Rare Jewels</span>
                            </label>

                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginModal;
