import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

const PhoneInputField = ({ label, value, onChange, error }) => {
  const [phoneNumber, setPhoneNumber] = useState(value || '');
  const [countryCode, setCountryCode] = useState('us'); // Default to US

  const handleOnChange = (value, data) => {
    setPhoneNumber(value);
    setCountryCode(data.countryCode);
    
    // Validation using libphonenumber-js
    let isValid = false;
    try {
      // libphonenumber-js requires the plus sign
      const fullValue = value.startsWith('+') ? value : `+${value}`;
      isValid = isValidPhoneNumber(fullValue);
    } catch (e) {
      isValid = false;
    }

    if (onChange) {
      onChange({
        phoneNumber: value,
        isValid,
        country: data.countryCode,
        dialCode: data.dialCode
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="relative">
        <PhoneInput
          country={'us'}
          value={phoneNumber}
          onChange={handleOnChange}
          inputStyle={{
            width: '100%',
            height: '42px',
            fontSize: '16px',
            paddingLeft: '58px',
            borderRadius: '12px',
            border: error ? '1px solid #ef4444' : '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            transition: 'border 0.2s ease',
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '12px 0 0 12px',
            paddingLeft: '8px',
          }}
          dropdownStyle={{
            width: '300px',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
          }}
          containerClass="phone-input-container"
          enableSearch={true} // Allow searching for countries
        />
      </div>

      {error ? (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      ) : (
        phoneNumber && !isValidPhoneNumber(`+${phoneNumber}`) && (
          <span className="text-xs text-amber-500 font-medium">Invalid number for current country</span>
        )
      )}

      {/* Modern visual indicator */}
      {phoneNumber && isValidPhoneNumber(`+${phoneNumber}`) && (
        <div className="flex items-center gap-2 mt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider text-green-600 font-bold">Valid Format</span>
        </div>
      )}
      
      <style>{`
        .phone-input-container .selected-flag {
          width: 48px !important;
          background-color: transparent !important;
        }
        .phone-input-container .selected-flag:hover {
          background-color: #f8fafc !important;
        }
        .phone-input-container .form-control:focus {
           border-color: #6366f1 !important;
           box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default PhoneInputField;
