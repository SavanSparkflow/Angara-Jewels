import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logInAdmin, registerAdmin, clearError } from '../redux/slices/authSlice';
import { authService } from '../redux/services/authService';

const rings = [
    { src: 'https://pngimg.com/uploads/ring/ring_PNG63.png', sizeClass: 'w-[140px]' },
    { src: 'https://pngimg.com/uploads/ring/ring_PNG66.png', sizeClass: 'w-[110px]' },
    { src: 'https://pngimg.com/uploads/ring/ring_PNG54.png', sizeClass: 'w-[90px]' },
    { src: 'https://pngimg.com/uploads/ring/ring_PNG35.png', sizeClass: 'w-[120px]' },
    { src: 'https://pngimg.com/uploads/ring/ring_PNG41.png', sizeClass: 'w-[150px]' }
];

const LoginModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { loading: authLoading, error: authError } = useSelector(state => state.auth);
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [localError, setLocalError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        setSuccessMessage(null);

        if (isForgotPassword) {
            setIsSubmitting(true);
            try {
                const response = await authService.forgotPassword({ email: formData.email });
                if (response.success) {
                    setSuccessMessage("Password reset link has been sent to your email.");
                } else {
                    setLocalError(response.message || "Failed to send reset link.");
                }
            } catch (err) {
                setLocalError(err.response?.data?.message || err.message || "Something went wrong.");
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        try {
            if (isLogin) {
                const result = await dispatch(logInAdmin({
                    email: formData.email,
                    password: formData.password
                })).unwrap();
                
                if (result) onClose();
            } else {
                const result = await dispatch(registerAdmin({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })).unwrap();

                if (result) onClose();
            }
        } catch (err) {
            setLocalError(err.message || 'Something went wrong. Please try again.');
        }
    };

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
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative w-full max-w-[1100px] bg-[#222222] rounded-md shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[520px]"
                >
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

                    <div className="md:hidden absolute inset-0 bg-white z-0"></div>

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

                    <div className="w-full md:w-[55%] ml-auto bg-transparent p-8 md:p-12 flex flex-col justify-center relative z-20">
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>

                        <div className="flex flex-col items-center max-w-[360px] w-full mx-auto">
                            <div className="mb-8 flex justify-center w-full">
                                <img src="/images/logo.svg" alt="Rare Jewels" className="h-12 md:h-16" />
                            </div>

                            <h2 className="text-[14px] font-bold text-gray-900 text-center mb-8 uppercase tracking-widest">
                                {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Create Account')}
                            </h2>

                            {isForgotPassword && successMessage ? (
                                <div className="w-full text-center space-y-6">
                                    <div className="bg-green-50 text-green-600 p-4 rounded-sm text-[12px] font-medium border border-green-100">
                                        {successMessage}
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setIsForgotPassword(false);
                                            setSuccessMessage(null);
                                        }}
                                        className="text-[12px] font-bold text-black border-b border-black hover:pb-1 transition-all"
                                    >
                                        RETURN TO LOGIN
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="w-full space-y-4">
                                    {!isLogin && !isForgotPassword && (
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <User size={16} />
                                            </div>
                                            <input 
                                                name="name"
                                                type="text" 
                                                placeholder="Full Name" 
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 text-[13px] border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                                                required={!isLogin}
                                            />
                                        </div>
                                    )}

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Mail size={16} />
                                        </div>
                                        <input 
                                            name="email"
                                            type="email" 
                                            placeholder="Email Address" 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 text-[13px] border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                                            required
                                        />
                                    </div>

                                    {!isForgotPassword && (
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <Lock size={16} />
                                            </div>
                                            <input 
                                                name="password"
                                                type={showPassword ? "text" : "password"} 
                                                placeholder="Password" 
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-10 py-3 text-[13px] border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                                                required
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    )}

                                    {isLogin && !isForgotPassword && (
                                        <div className="flex justify-end">
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    setIsForgotPassword(true);
                                                    setLocalError(null);
                                                }}
                                                className="text-[11px] text-gray-400 hover:text-black transition-colors"
                                            >
                                                Forgot Password?
                                            </button>
                                        </div>
                                    )}

                                    {(localError || authError) && (
                                        <p className="text-red-500 text-[11px] text-center mt-2">
                                            {localError || (typeof authError === 'string' ? authError : authError?.message || 'Something went wrong')}
                                        </p>
                                    )}

                                    <button 
                                        type="submit"
                                        disabled={authLoading || isSubmitting}
                                        className="w-full py-4 bg-black text-white rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-4"
                                    >
                                        {(authLoading || isSubmitting) ? (
                                             <span className="flex items-center justify-center gap-2">
                                                 <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                 Processing...
                                             </span>
                                         ) : (
                                             isForgotPassword ? 'Send Reset Link' : (isLogin ? 'Sign In' : 'Sign Up')
                                         )}
                                    </button>

                                    {isForgotPassword && (
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                setIsForgotPassword(false);
                                                setLocalError(null);
                                            }}
                                            className="w-full text-center text-[11px] font-bold text-gray-400 hover:text-black mt-4 uppercase tracking-widest"
                                        >
                                            Back to Login
                                        </button>
                                    )}
                                </form>
                            )}

                            {!isForgotPassword && (
                                <div className="mt-8 text-center">
                                    <p className="text-[12px] text-gray-500">
                                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                                        <button 
                                            onClick={() => {
                                                setIsLogin(!isLogin);
                                                setLocalError(null);
                                                dispatch(clearError());
                                            }}
                                            className="ml-2 font-bold text-black border-b border-black/0 hover:border-black transition-all"
                                        >
                                            {isLogin ? 'CREATE ONE' : 'SIGN IN'}
                                        </button>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginModal;
