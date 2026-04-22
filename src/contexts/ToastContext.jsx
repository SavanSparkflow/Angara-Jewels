import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import Toast from "../component/Toast/toast";
import { setGlobalToast } from "../redux/services/axiosApi";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "error", duration = 3000) => {
    if (!message) return;
    
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => {
      const isDuplicate = prev.some(t => t.message === message && t.type === type);
      if (isDuplicate) return prev;
      
      const updated = [...prev, newToast];
      if (updated.length > 5) {
        return updated.slice(-5);
      }
      return updated;
    });
  }, []);

  const closeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  useEffect(() => {
    setGlobalToast(showToast);
    
    return () => {
      setGlobalToast(null);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      {/* Render multiple toasts stacked */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 z-[99999999999] flex flex-col items-center justify-center pointer-events-none gap-3 w-full px-4">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="pointer-events-auto max-w-md w-auto"
            style={{
              zIndex: 9999 - index
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => closeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};