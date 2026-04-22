import React, { createContext, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, logout as logoutAction } from '../redux/slices/authSlice';

const LoginContext = createContext();

export const useLogin = () => {
    const context = useContext(LoginContext);
    return context || {};
};

import LoginModal from '../components/LoginModal';

export const LoginProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const isLoggedIn = useSelector(selectIsAuthenticated);

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);

    const login = () => {
        // Redux will handle this via setCredentials in LoginModal
        closeLogin();
    };

    const logout = () => {
        dispatch(logoutAction());
    };

    return (
        <LoginContext.Provider value={{ isLoginOpen, openLogin, closeLogin, isLoggedIn, login, logout }}>
            {children}
            <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
        </LoginContext.Provider>
    );
};
