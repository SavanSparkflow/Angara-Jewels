import React, { createContext, useState, useContext } from 'react';
import LoginModal from '../components/LoginModal';

const LoginContext = createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);

    const login = () => {
        setIsLoggedIn(true);
        closeLogin();
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <LoginContext.Provider value={{ isLoginOpen, openLogin, closeLogin, isLoggedIn, login, logout }}>
            {children}
            <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
        </LoginContext.Provider>
    );
};
