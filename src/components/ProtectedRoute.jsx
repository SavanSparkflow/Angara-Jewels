import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/slices/authSlice';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();

    const token = localStorage.getItem('token');
    const hasValidToken = token && token !== 'null' && token !== 'undefined' && token !== '';
    
    // Check both Redux state and localStorage for maximum reliability
    if (!isAuthenticated && !hasValidToken) {
        // Redirect to home if no valid token found
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
