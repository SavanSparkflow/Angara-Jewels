/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                rare: {
                    teal: "#2B5C6B",
                    gold: "#C8923C",
                    dark: "#1A1A1A",
                    text: "#333333",
                    gray: "#666666",
                    lightgray: "#999999",
                    border: "#E5E5E5",
                    bg: "#F7F7F7",
                    white: "#FFFFFF",
                    hero: "#E8DDD4",
                },
                // Keep legacy rare- colors for backward compat
                rare: {
                    primary: "#C8923C",
                    secondary: "#E39EA1",
                    dark: "#1A1A1A",
                    black: "#000000",
                    white: "#FFFFFF",
                    light: "#F9F9F9",
                    gray: "#666666",
                    lightgray: "#E5E5E5",
                    gold: "#C8923C",
                    green: "#2B5C6B",
                    offwhite: "#F7F7F7",
                }
            },
            fontFamily: {
                sans: ["'Poppins'", "sans-serif"],
                serif: ["'Poppins'", "sans-serif"],
            },
            fontSize: {
                'xxs': '0.65rem',
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
            },
            letterSpacing: {
                'luxury': '0.05em',
                'widest': '0.25em',
                'nav': '0.15em',
                'tightest': '-0.01em',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
