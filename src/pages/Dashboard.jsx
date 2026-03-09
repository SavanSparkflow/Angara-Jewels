import React, { useState } from 'react';
import { User, Package, MapPin, ChevronRight } from 'lucide-react';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import AddAddressModal from '../components/AddAddressModal';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const { logout } = useLogin();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'address', label: 'Address Book', icon: MapPin },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pt-[160px] pb-20">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
                    <h1 className="text-2xl font-light text-gray-800">
                        {activeTab === 'profile' && 'My Dashboard'}
                        {activeTab === 'orders' && 'My Orders'}
                        {activeTab === 'address' && 'Address Book'}
                    </h1>
                    <button 
                        onClick={handleLogout}
                        className="bg-black text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Sidebar */}
                    <div className="w-full md:w-[280px] shrink-0">
                        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between p-5 border-b border-gray-100 last:border-b-0 transition-colors ${activeTab === tab.id ? 'bg-gray-50/80 border-l-4 border-l-black' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <tab.icon size={18} className={`${activeTab === tab.id ? 'text-black' : 'text-gray-500'}`} />
                                        <span className={`text-[14px] ${activeTab === tab.id ? 'font-medium text-black' : 'text-gray-600'}`}>
                                            {tab.label}
                                        </span>
                                    </div>
                                    <ChevronRight size={16} className={`${activeTab === tab.id ? 'text-black' : 'text-gray-400'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-fade-in-up">
                                
                                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                        <h2 className="text-[15px] font-medium text-gray-800">Account Information</h2>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 line-bottom">
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-800 mb-4">Contact Information</h3>
                                            <p className="text-[14px] text-gray-600 mb-4">9737531475</p>
                                            <button className="text-[13px] text-gray-500 hover:text-black hover:underline underline-offset-4">Edit</button>
                                        </div>
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-800 mb-4">Newsletters</h3>
                                            <p className="text-[14px] text-gray-600 mb-4">You didn't subscribe to our newsletter.</p>
                                            <button className="text-[13px] text-gray-500 hover:text-black hover:underline underline-offset-4">Edit</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                        <h2 className="text-[15px] font-medium text-gray-800">Address Book</h2>
                                        <button onClick={() => setActiveTab('address')} className="text-[13px] text-gray-500 hover:text-black hover:underline underline-offset-4">Manage Addresses</button>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-800 mb-4">Default Billing Address</h3>
                                            <p className="text-[14px] text-gray-500 italic">You have not set a default billing address.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-800 mb-4">Default Shipping Address</h3>
                                            <p className="text-[14px] text-gray-500 italic">You have not set a default shipping address.</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[13px] text-gray-500 px-2 mt-4">No orders found</p>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="animate-fade-in-up bg-white p-8 rounded-md shadow-sm border border-gray-100 min-h-[400px]">
                                <p className="text-[14px] text-gray-600">You have placed no order.</p>
                            </div>
                        )}

                        {/* Address Book Tab */}
                        {activeTab === 'address' && (
                            <div className="space-y-8 animate-fade-in-up">
                                
                                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                        <h2 className="text-[15px] font-medium text-gray-800">Default Addresses</h2>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-800 mb-4">Default Billing Address</h3>
                                            <p className="text-[14px] text-gray-500 italic">You have not set a default billing address.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-800 mb-4">Default Shipping Address</h3>
                                            <p className="text-[14px] text-gray-500 italic">You have not set a default shipping address.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                        <h2 className="text-[15px] font-medium text-gray-800">Additional Address Entries</h2>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-800 mb-4">Billing Address</h3>
                                        </div>
                                        <div>
                                            <h3 className="text-[13px] font-bold text-gray-800 mb-4">Shipping Address</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <button 
                                        onClick={() => setIsAddressModalOpen(true)}
                                        className="bg-[#1a1a1a] text-white px-6 py-3 rounded-sm text-[12px] font-medium tracking-wide hover:bg-black transition-colors"
                                    >
                                        Add New Address
                                    </button>
                                    <button onClick={() => navigate(-1)} className="text-[12px] font-medium text-gray-500 hover:text-black hover:underline underline-offset-4 tracking-wide uppercase">
                                        Back
                                    </button>
                                </div>

                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddAddressModal 
                isOpen={isAddressModalOpen} 
                onClose={() => setIsAddressModalOpen(false)} 
            />

        </div>
    );
};

export default Dashboard;
