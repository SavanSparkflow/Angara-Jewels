import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { currencies, countries } from 'country-data-list';

const CurrencyContext = createContext();

// Generate CURRENCIES list from the package
const ALL_CURRENCIES = currencies.all
    .map(curr => {
        // Find the primary country for this currency to get a country code
        const country = countries.all.find(c => c.currencies.includes(curr.code));
        return {
            code: curr.code,
            symbol: curr.symbol || curr.code,
            name: curr.name,
            countryCode: country ? country.alpha2 : ''
        };
    })
    .filter(curr => curr.code && curr.name);

// Define popular currencies to show at the top or use for defaults
const POPULAR_CODES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'CAD', 'AUD', 'JPY', 'CNY'];
const CURRENCIES = [
    ...ALL_CURRENCIES.filter(c => POPULAR_CODES.includes(c.code)).sort((a, b) => POPULAR_CODES.indexOf(a.code) - POPULAR_CODES.indexOf(b.code)),
    ...ALL_CURRENCIES.filter(c => !POPULAR_CODES.includes(c.code)).sort((a, b) => a.name.localeCompare(b.name))
];

export const CurrencyProvider = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        const saved = localStorage.getItem('selectedCurrency');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved currency", e);
            }
        }
        // Default to INR
        return CURRENCIES.find(c => c.code === 'INR') || CURRENCIES[0];
    });
    const [exchangeRates, setExchangeRates] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
    }, [selectedCurrency]);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR'); // Base currency INR since original prices seem to be in INR
                const data = await response.json();
                setExchangeRates(data.rates);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    const convertPrice = (priceInINR) => {
        if (!priceInINR) return 0;
        
        // Remove commas and non-numeric characters except decimal point
        const numericPrice = typeof priceInINR === 'string' 
            ? parseFloat(priceInINR.replace(/[^0-9.]/g, ''))
            : priceInINR;

        if (isNaN(numericPrice)) return 0;

        if (!exchangeRates || selectedCurrency.code === 'INR') {
            return numericPrice;
        }

        const rate = exchangeRates[selectedCurrency.code];
        return numericPrice * (rate || 1);
    };

    const formatPrice = (price) => {
        const converted = convertPrice(price);
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: selectedCurrency.code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(converted);
    };

    // Helper for ranges like "₹8,044 - ₹10,36,969"
    const formatPriceRange = (rangeString) => {
        if (!rangeString || typeof rangeString !== 'string' || !rangeString.includes('-')) {
            return formatPrice(rangeString);
        }

        const parts = rangeString.split('-').map(p => p.trim());
        return parts.map(p => formatPrice(p)).join(' - ');
    };

    return (
        <CurrencyContext.Provider value={{ 
            selectedCurrency, 
            setSelectedCurrency, 
            CURRENCIES, 
            convertPrice, 
            formatPrice, 
            formatPriceRange,
            loading 
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
