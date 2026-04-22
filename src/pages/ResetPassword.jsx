import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { authService } from '../redux/services/authService';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            const response = await authService.resetPassword({
                token,
                newPassword: formData.password
            });

            if (response.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setError(response.message || "Failed to reset password.");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 pt-32 pb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[450px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100"
            >
                <div className="p-8 md:p-12">
                    <div className="flex justify-center mb-8">
                        <img src="/images/logo.svg" alt="Rare Jewels" className="h-12" />
                    </div>

                    <h2 className="text-[14px] font-bold text-gray-900 text-center mb-4 uppercase tracking-widest">
                        Set New Password
                    </h2>
                    <p className="text-center text-[12px] text-gray-500 mb-8 leading-relaxed">
                        Please enter your new password below to regain access to your account.
                    </p>

                    {success ? (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-green-50 border border-green-100 p-6 rounded-sm text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <CheckCircle2 className="text-green-500" size={48} />
                            </div>
                            <h3 className="text-green-800 font-bold text-[14px] mb-2 uppercase">Success!</h3>
                            <p className="text-green-600 text-[12px] mb-4">
                                Your password has been successfully reset.
                            </p>
                            <p className="text-gray-400 text-[10px]">
                                Redirecting you to home page...
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={16} />
                                </div>
                                <input 
                                    name="password"
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="New Password" 
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

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={16} />
                                </div>
                                <input 
                                    name="confirmPassword"
                                    type="password" 
                                    placeholder="Confirm New Password" 
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 text-[13px] border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                                    required
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-[11px] text-center mt-2">
                                    {error}
                                </p>
                            )}

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-black text-white rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-4"
                            >
                                {loading ? (
                                     <span className="flex items-center justify-center gap-2">
                                         <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                         Updating...
                                     </span>
                                 ) : (
                                     'Reset Password'
                                 )}
                            </button>

                            <button 
                                type="button"
                                onClick={() => navigate('/')}
                                className="w-full text-center text-[10px] font-bold text-gray-400 hover:text-black mt-4 uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
                
                <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                    <p className="text-[10px] text-gray-400">
                        &copy; {new Date().getFullYear()} Rare Jewels. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
