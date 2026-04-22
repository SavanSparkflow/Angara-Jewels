import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, ChevronRight, Camera, Phone, MapPin as MapPinIcon, Info, Calendar, CreditCard, X, Upload, RotateCcw } from 'lucide-react';
import PhoneInputField from '../components/PhoneInputField';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import AddAddressModal from '../components/AddAddressModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses, deleteAddress } from '../redux/slices/addressSlice';
import { updateProfile } from '../redux/slices/authSlice';
import { getMyOrders, getMyReturns } from '../redux/slices/orderSlice';
import { apiInstance } from '../redux/services/axiosApi';
import { motion } from 'framer-motion';
import { useCurrency } from '../contexts/CurrencyContext';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editAddressData, setEditAddressData] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true); // Default to true if already exists
    
    // Return Request States
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [selectedOrderForReturn, setSelectedOrderForReturn] = useState(null);
    const [selectedItemForReturn, setSelectedItemForReturn] = useState(null);
    const [returnLoading, setReturnLoading] = useState(false);
    
    const { logout } = useLogin();
    const { user, loading: isAuthLoading } = useSelector(state => state.auth);
    const { addresses, loading: isAddressLoading } = useSelector(state => state.address);
    const { orders, returns, loading: isOrdersLoading } = useSelector(state => state.orderHistory);
    const { formatPrice } = useCurrency();

    const [profileForm, setProfileForm] = useState({
        name: '',
        phone: '',
        bio: '',
        location: '',
        avatar: null
    });

    useEffect(() => {
        if (user) {
            setProfileForm({
                name: user.name || '',
                phone: user.phone || '',
                bio: user.bio || '',
                location: user.location || '',
                avatar: null
            });
        }
    }, [user]);

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (activeTab === 'orders') {
            dispatch(getMyOrders());
        } else if (activeTab === 'returns') {
            dispatch(getMyReturns());
        }
    }, [activeTab, dispatch]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEditAddress = (addr) => {
        setEditAddressData(addr);
        setIsAddressModalOpen(true);
    };

    const handleDeleteAddress = async (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            await dispatch(deleteAddress({ id }));
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', profileForm.name);
        formData.append('phone', profileForm.phone);
        formData.append('bio', profileForm.bio);
        formData.append('location', profileForm.location);
        if (profileForm.avatar) {
            formData.append('avatar', profileForm.avatar);
        }

        const result = await dispatch(updateProfile(formData));
        if (updateProfile.fulfilled.match(result)) {
            setIsEditingProfile(false);
        }
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileForm({ ...profileForm, avatar: e.target.files[0] });
        }
    };
    
    // Return Request Handler
    const handleReturnClick = (order, item) => {
        setSelectedOrderForReturn(order);
        setSelectedItemForReturn(item);
        setIsReturnModalOpen(true);
    };

    const handleReturnSubmit = async (formData) => {
        setReturnLoading(true);
        try {
            const response = await apiInstance.post('/api/user/return/request', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success || response.data.IsSuccess) {
                setIsReturnModalOpen(false);
                dispatch(getMyOrders()); // Refresh orders
            }
        } catch (error) {
            console.error('Return request failed:', error);
        } finally {
            setReturnLoading(false);
        }
    };

    const defaultAddress = addresses?.find(addr => addr.isDefault === true);
    const otherAddresses = addresses?.filter(addr => addr.isDefault !== true) || [];

    const AddressCard = ({ address }) => {
        if (!address) return null;
        return (
            <div className="text-[14px] text-gray-600 space-y-1">
                <p className="font-medium text-gray-800">{address.firstName} {address.lastName}</p>
                <p>{address.apartment ? `${address.apartment}, ` : ''}{address.address}</p>
                <p>{address.city}, {address.state} {address.pincode}</p>
                <p className="pt-2">{address.phone}</p>
            </div>
        );
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'returns', label: 'Returns', icon: RotateCcw },
        { id: 'address', label: 'Address Book', icon: MapPin },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="container px-4 mx-auto">

                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
                    <h1 className="text-2xl font-light text-gray-800">
                        {activeTab === 'profile' && 'My Dashboard'}
                        {activeTab === 'orders' && 'My Orders'}
                        {activeTab === 'returns' && 'My Returns'}
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
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                        <h2 className="text-[15px] font-medium text-gray-800">Profile Information</h2>
                                        {!isEditingProfile && (
                                            <button 
                                                onClick={() => setIsEditingProfile(true)}
                                                className="text-[13px] text-gray-500 hover:text-black hover:underline"
                                            >
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        {isEditingProfile ? (
                                            <form onSubmit={handleProfileSubmit} className="space-y-6">
                                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                                    {/* Avatar Edit */}
                                                    <div className="relative group mx-auto md:mx-0">
                                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-100 group-hover:border-black transition-colors">
                                                            {profileForm.avatar ? (
                                                                <img src={URL.createObjectURL(profileForm.avatar)} className="w-full h-full object-cover" alt="New Avatar" />
                                                            ) : user?.avatar?.url ? (
                                                                <img src={user.avatar.url} className="w-full h-full object-cover" alt="Avatar" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                    <User size={40} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <label className="absolute bottom-0 right-0 p-1.5 bg-black text-white rounded-full cursor-pointer hover:scale-110 transition-transform">
                                                            <Camera size={14} />
                                                            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                                        </label>
                                                    </div>

                                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                                        <div className="space-y-1">
                                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                                            <input 
                                                                type="text" 
                                                                value={profileForm.name} 
                                                                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                                                                className="w-full border-b border-gray-200 py-2 text-[14px] focus:border-black outline-none transition-colors"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email (Read Only)</label>
                                                            <input 
                                                                type="text" 
                                                                value={user?.email || ''} 
                                                                disabled
                                                                className="w-full border-b border-gray-100 py-2 text-[14px] text-gray-400 cursor-not-allowed outline-none"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                                            <PhoneInputField 
                                                                value={profileForm.phone} 
                                                                onChange={(data) => {
                                                                    setProfileForm({...profileForm, phone: data.phoneNumber});
                                                                    setIsPhoneValid(data.isValid);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Location</label>
                                                            <input 
                                                                type="text" 
                                                                value={profileForm.location} 
                                                                onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                                                                className="w-full border-b border-gray-200 py-2 text-[14px] focus:border-black outline-none transition-colors"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-2 space-y-1">
                                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Bio</label>
                                                            <textarea 
                                                                value={profileForm.bio} 
                                                                onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                                                                rows="3"
                                                                className="w-full border border-gray-200 p-3 rounded-sm text-[14px] focus:border-black outline-none transition-colors resize-none"
                                                                placeholder="Tell us about yourself..."
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 pt-4 border-t border-gray-50">
                                                    <button 
                                                        type="submit"
                                                        disabled={isAuthLoading || !isPhoneValid}
                                                        className="bg-black text-white px-8 py-2.5 rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 transition-all"
                                                    >
                                                        {isAuthLoading ? 'Saving...' : 'Save Changes'}
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => setIsEditingProfile(false)}
                                                        className="text-gray-400 hover:text-black text-[12px] font-bold uppercase tracking-widest transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                                                {/* Profile Display View */}
                                                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-50 border border-gray-100 shrink-0 shadow-sm">
                                                    {user?.avatar?.url ? (
                                                        <img src={user.avatar.url} className="w-full h-full object-cover" alt={user.name} />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <User size={48} strokeWidth={1} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 space-y-6">
                                                    <div className="space-y-1">
                                                        <h3 className="text-xl font-light text-gray-900">{user?.name}</h3>
                                                        <p className="text-[14px] text-gray-500">{user?.email}</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                                                <Phone size={14} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Phone</p>
                                                                <p className="text-[14px] text-gray-700">{user?.phone || 'Not added'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                                                <MapPinIcon size={14} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Location</p>
                                                                <p className="text-[14px] text-gray-700">{user?.location || 'Not added'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="md:col-span-2 flex items-start gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0 mt-0.5">
                                                                <Info size={14} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Bio</p>
                                                                <p className="text-[14px] text-gray-700 leading-relaxed max-w-2xl">{user?.bio || 'No bio available'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                        <h2 className="text-[15px] font-medium text-gray-800">Address Book</h2>
                                        <button onClick={() => setActiveTab('address')} className="text-[13px] text-gray-500 hover:text-black hover:underline underline-offset-4">Manage Addresses</button>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">Default Billing Address</h3>
                                                {defaultAddress && (
                                                    <button 
                                                        className="text-[11px] text-gray-400 hover:text-black hover:underline"
                                                        onClick={() => handleEditAddress(defaultAddress)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                            {defaultAddress ? (
                                                <AddressCard address={defaultAddress} />
                                            ) : (
                                                <p className="text-[13px] text-gray-500 italic">You have not set a default billing address.</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">Default Shipping Address</h3>
                                                {defaultAddress && (
                                                    <button 
                                                        className="text-[11px] text-gray-400 hover:text-black hover:underline"
                                                        onClick={() => handleEditAddress(defaultAddress)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                            {defaultAddress ? (
                                                <AddressCard address={defaultAddress} />
                                            ) : (
                                                <p className="text-[13px] text-gray-500 italic">You have not set a default shipping address.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[13px] text-gray-500 px-2 mt-4">No orders found</p>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="space-y-6 animate-fade-in-up">
                                {isOrdersLoading ? (
                                    <div className="bg-white p-20 rounded-md border border-gray-100 flex flex-col items-center justify-center space-y-4">
                                        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-[13px] text-gray-500 font-medium">Loading your orders...</p>
                                    </div>
                                ) : orders && orders.length > 0 ? (
                                    orders.map((order) => (
                                        <div key={order._id} className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
                                            {/* Order Header */}
                                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Order Placed</p>
                                                        <p className="text-[13px] text-gray-800 font-medium">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Total Amount</p>
                                                        <p className="text-[13px] text-gray-800 font-bold">₹ {order.totalPrice?.toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Ship To</p>
                                                        <p className="text-[13px] text-gray-800 font-medium">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 text-right">Order # {order._id.slice(-8).toUpperCase()}</p>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                        order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                                        order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {order.orderStatus}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="p-6 divide-y divide-gray-50">
                                                {order.orderItems.map((item, idx) => (
                                                    <div key={idx} className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-6">
                                                        <div className="w-24 h-24 bg-gray-50 rounded-sm border border-gray-100 p-2 shrink-0 flex items-center justify-center">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                                        </div>
                                                        <div className="flex-1 space-y-4">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h4 className="text-[14px] font-bold text-gray-800 mb-1">{item.name}</h4>
                                                                    <p className="text-[11px] text-gray-400 font-medium">SKU: {item.sku}</p>
                                                                </div>
                                                                <p className="text-[14px] font-bold text-gray-900">₹ {item.price?.toLocaleString()}</p>
                                                            </div>
                                                            
                                                            {/* Item Attributes */}
                                                            {item.selectedAttributes && (
                                                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                                    {Object.entries(item.selectedAttributes).map(([key, attr]) => (
                                                                        attr && attr.name && (
                                                                            <div key={key} className="flex gap-2 text-[11px]">
                                                                                <span className="text-gray-400 font-bold uppercase tracking-tighter">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                                                                <span className="text-gray-600 font-medium">{attr.name}</span>
                                                                            </div>
                                                                        )
                                                                    ))}
                                                                    <div className="flex gap-2 text-[11px]">
                                                                        <span className="text-gray-400 font-bold uppercase tracking-tighter">Qty:</span>
                                                                        <span className="text-gray-600 font-medium">{item.quantity}</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            
                                                            <div className="flex gap-4 pt-2">
                                                                <button onClick={() => navigate(`/product/${item.product?._id || item.product}`)} className="text-[11px] font-bold text-black uppercase tracking-widest border-b border-black hover:pb-0.5 transition-all">Buy Again</button>
                                                                <button className="text-[11px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Write Review</button>
                                                                {order.orderStatus === 'Delivered' && (
                                                                    <button 
                                                                        onClick={() => handleReturnClick(order, item)}
                                                                        className="text-[11px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors"
                                                                    >
                                                                        Return
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Order Footer - Payment Info */}
                                            {order.paymentInfo && (
                                                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 text-gray-400">
                                                            <CreditCard size={14} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Payment Status</p>
                                                            <p className="text-[12px] text-gray-600 font-medium capitalize">{order.paymentInfo.status}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 text-gray-400">
                                                            <Calendar size={14} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Estimated Delivery</p>
                                                            <p className="text-[12px] text-gray-600 font-medium">7-10 Business Days</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white p-20 rounded-md border border-gray-100 flex flex-col items-center justify-center space-y-6 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                                            <Package size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-bold text-gray-800 mb-2">No orders found</h3>
                                            <p className="text-[13px] text-gray-500 max-w-[280px]">You haven't placed any orders yet. Explore our collections to find something beautiful.</p>
                                        </div>
                                        <button onClick={() => navigate('/shop')} className="bg-black text-white px-8 py-3 rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">Start Shopping</button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Returns Tab */}
                        {activeTab === 'returns' && (
                            <div className="space-y-6 animate-fade-in-up">
                                {isOrdersLoading ? (
                                    <div className="bg-white p-20 rounded-md border border-gray-100 flex flex-col items-center justify-center space-y-4">
                                        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-[13px] text-gray-500 font-medium">Loading your returns...</p>
                                    </div>
                                ) : returns && returns.length > 0 ? (
                                    returns.map((ret) => (
                                        <div key={ret._id} className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
                                            {/* Return Header */}
                                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Request Date</p>
                                                        <p className="text-[13px] text-gray-800 font-medium">{new Date(ret.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Estimated Refund</p>
                                                        <p className="text-[13px] text-gray-800 font-bold">{formatPrice(ret.refundAmount || 0)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Type</p>
                                                        <p className="text-[13px] text-gray-800 font-medium">{ret.type}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 text-right">Order # {ret.orderNumber || ret.orderId?.slice(-8).toUpperCase()}</p>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                        ret.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                                        ret.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                                                        ret.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {ret.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Return Information */}
                                            <div className="p-6 border-b border-gray-50 bg-white">
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <div className="flex-1 space-y-4">
                                                        <div>
                                                            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Reason for Return</h4>
                                                            <p className="text-[14px] text-gray-800 font-medium">{ret.reason}</p>
                                                            {ret.description && <p className="text-[13px] text-gray-500 mt-1 italic">"{ret.description}"</p>}
                                                        </div>

                                                        {ret.images && ret.images.length > 0 && (
                                                            <div>
                                                                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Evidence Images</h4>
                                                                <div className="flex gap-2 flex-wrap">
                                                                    {ret.images.map((img, i) => (
                                                                        <div key={i} className="w-12 h-12 rounded-sm border border-gray-100 overflow-hidden cursor-pointer hover:border-black transition-colors">
                                                                            <img src={img} alt="" className="w-full h-full object-cover" onClick={() => window.open(img, '_blank')} />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Items in this return */}
                                            <div className="px-6 py-2 bg-gray-50/30">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pt-2">Items in this request</p>
                                                {ret.items.map((item, idx) => (
                                                    <div key={idx} className="py-4 border-t border-gray-50 first:border-t-0 flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-white rounded-sm border border-gray-100 p-1 shrink-0 flex items-center justify-center">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h5 className="text-[13px] font-medium text-gray-800 truncate">{item.name}</h5>
                                                            <div className="flex gap-3 text-[11px] text-gray-500 mt-0.5">
                                                                <span>SKU: {item.sku}</span>
                                                                <span>Qty: {item.quantity}</span>
                                                                <span className="font-bold text-gray-700">{formatPrice(item.price)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white p-20 rounded-md border border-gray-100 flex flex-col items-center justify-center space-y-6 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                                            <RotateCcw size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-bold text-gray-800 mb-2">No return requests</h3>
                                            <p className="text-[13px] text-gray-500 max-w-[280px]">You haven't initiated any return requests yet.</p>
                                        </div>
                                        <button onClick={() => setActiveTab('orders')} className="bg-black text-white px-8 py-3 rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">View All Orders</button>
                                    </div>
                                )}
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
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">Default Billing Address</h3>
                                                {defaultAddress && (
                                                    <button 
                                                        className="text-[11px] text-gray-400 hover:text-black hover:underline"
                                                        onClick={() => handleEditAddress(defaultAddress)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                            {defaultAddress ? (
                                                <AddressCard address={defaultAddress} />
                                            ) : (
                                                <p className="text-[13px] text-gray-500 italic">You have not set a default billing address.</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">Default Shipping Address</h3>
                                                {defaultAddress && (
                                                    <button 
                                                        className="text-[11px] text-gray-400 hover:text-black hover:underline"
                                                        onClick={() => handleEditAddress(defaultAddress)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                            {defaultAddress ? (
                                                <AddressCard address={defaultAddress} />
                                            ) : (
                                                <p className="text-[13px] text-gray-500 italic">You have not set a default shipping address.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                        <h2 className="text-[15px] font-medium text-gray-800">Additional Address Entries</h2>
                                    </div>
                                    <div className="p-6">
                                        {otherAddresses.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {otherAddresses.map((addr, idx) => (
                                                    <div key={addr._id} className="border border-gray-100 p-4 rounded-sm relative group hover:border-gray-200 transition-colors">
                                                        <h3 className="text-[12px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Address {idx + 1}</h3>
                                                        <AddressCard address={addr} />
                                                        <div className="mt-4 flex gap-4 border-t border-gray-50 pt-3">
                                                            <button 
                                                                className="text-[12px] text-gray-500 hover:text-black underline-offset-2 hover:underline"
                                                                onClick={() => handleEditAddress(addr)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button 
                                                                className="text-[12px] text-gray-500 hover:text-red-600 underline-offset-2 hover:underline"
                                                                onClick={() => handleDeleteAddress(addr._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-[13px] text-gray-500 italic">No additional addresses found.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <button
                                        onClick={() => {
                                            setEditAddressData(null);
                                            setIsAddressModalOpen(true);
                                        }}
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
                editData={editAddressData}
                onClose={() => {
                    setIsAddressModalOpen(false);
                    setEditAddressData(null);
                }}
            />

            <ReturnRequestModal
                isOpen={isReturnModalOpen}
                onClose={() => setIsReturnModalOpen(false)}
                order={selectedOrderForReturn}
                item={selectedItemForReturn}
                onSubmit={handleReturnSubmit}
                loading={returnLoading}
            />

        </div>
    );
};

const ReturnRequestModal = ({ isOpen, onClose, order, item, onSubmit, loading }) => {
    const [reason, setReason] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (item) {
            setQuantity(item.quantity);
        }
        if (!isOpen) {
            setReason('');
            setImages([]);
            setPreviews([]);
        }
    }, [item, isOpen]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('orderId', order._id);
        formData.append('type', 'Return');
        formData.append('reason', reason);
        
        // Items must be stringified according to the payload image
        const itemsPayload = JSON.stringify([{
            orderItemId: item._id,
            quantity: quantity
        }]);
        formData.append('items', itemsPayload);

        images.forEach(image => {
            formData.append('images', image);
        });

        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-[18px] font-light text-gray-800">Return Request</h2>
                        <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-1">Order # {order?._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-black">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form id="return-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Item Summary */}
                        <div className="flex gap-4 p-4 bg-gray-50 rounded-sm">
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-sm p-1 shrink-0">
                                <img src={item?.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-gray-800 line-clamp-1">{item?.name}</h4>
                                <p className="text-[11px] text-gray-500 mt-1">SKU: {item?.sku}</p>
                                <p className="text-[12px] font-bold text-gray-900 mt-1">₹ {item?.price?.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Return Quantity</label>
                            <input
                                type="number"
                                min="1"
                                max={item?.quantity}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="w-full border border-gray-200 p-3 rounded-sm text-[14px] focus:border-black outline-none transition-colors"
                                required
                            />
                            <p className="text-[10px] text-gray-400 italic">Total purchased: {item?.quantity}</p>
                        </div>

                        {/* Reason */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Reason for Return</label>
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full border border-gray-200 p-3 rounded-sm text-[14px] focus:border-black outline-none transition-colors bg-transparent appearance-none"
                                required
                            >
                                <option value="">Select a reason</option>
                                <option value="Size didn't fit">Size didn't fit</option>
                                <option value="Quality not as expected">Quality not as expected</option>
                                <option value="Wrong item delivered">Wrong item delivered</option>
                                <option value="Damaged product">Damaged product</option>
                                <option value="Changed my mind">Changed my mind</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Images Upload */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Evidence Images (Required)</label>
                            <div className="grid grid-cols-4 gap-3">
                                {previews.map((preview, idx) => (
                                    <div key={idx} className="relative aspect-square border border-gray-100 rounded-sm overflow-hidden group">
                                        <img src={preview} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                                {previews.length < 4 && (
                                    <label className="aspect-square border-2 border-dashed border-gray-200 hover:border-black rounded-sm flex flex-col items-center justify-center cursor-pointer transition-colors group">
                                        <Upload size={20} className="text-gray-300 group-hover:text-black font-light transition-colors" strokeWidth={1.5} />
                                        <span className="text-[10px] text-gray-400 group-hover:text-black mt-2 font-medium">Upload</span>
                                        <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
                                    </label>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-400 italic">Please upload up to 4 images showing any defects or issues.</p>
                        </div>
                    </form>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4">
                    <button
                        form="return-form"
                        type="submit"
                        disabled={loading || !reason || images.length === 0}
                        className="flex-1 bg-black text-white py-4 rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-300 transition-all shadow-lg shadow-black/10"
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
