import React, { useEffect, useRef, useState } from "react";

// Add CSS keyframes for smooth animation
const animationStyles = `
  @keyframes slideInUp {
    from {
      transform: translateY(100%) scale(0.8);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateY(20px) scale(0.95);
      opacity: 0;
    }
  }
`;

const Toast = ({ message, onClose, type = "error", duration = 3000 }) => {
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500);
    }, duration);
  };

  useEffect(() => {
    const styleId = 'toast-animations';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.innerHTML = animationStyles;
      document.head.appendChild(styleElement);
    }

    setTimeout(() => setShow(true), 10);
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (!hovered) {
      startTimer();
    } else {
      clearTimeout(timerRef.current);
    }
  }, [hovered]);

  const typeStyles = {
    success: "bg-green text-white border-none shadow-[0_8px_30px_rgb(16,185,129,0.3)]",
    error: "bg-red text-white border-none shadow-[0_8px_30px_rgb(239,68,68,0.3)]",
    warning: "bg-[#f59e0b] text-white border-none shadow-[0_8px_30px_rgb(245,158,11,0.3)]",
    info: "bg-[#3b82f6] text-white border-none shadow-[0_8px_30px_rgb(59,130,246,0.3)]",
    default: "bg-[#1f2937] text-white border-none shadow-[0_8px_30px_rgb(31,41,55,0.3)]",
  };

  const iconMap = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    default: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div className="relative group">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
            min-w-[320px] max-w-md
            inline-flex items-center gap-4
            px-5 py-3.5 rounded-xl
            transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${typeStyles[type] || typeStyles.default}
            ${show
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-12 scale-90 blur-sm"
          }
          `}
      >
        {/* Icon */}
        <div className="flex-shrink-0 flex items-center justify-center bg-white/20 rounded-lg p-1.5 backdrop-blur-sm">
          {iconMap[type] || iconMap.default}
        </div>

        {/* Message */}
        <div className="flex-grow">
          <p className="text-[15px] font-semibold tracking-wide capitalize">
            {type}
          </p>
          <p className="text-sm font-medium opacity-90 leading-tight">
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
            onClick={() => {
              setShow(false);
              setTimeout(onClose, 500);
            }}
            className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
      </div>
    </div>
  );
};

export default Toast;
