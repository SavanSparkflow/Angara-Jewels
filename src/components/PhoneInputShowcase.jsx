import React, { useState } from 'react';
import PhoneInputField from './PhoneInputField';

const PhoneInputShowcase = () => {
  const [phoneData, setPhoneData] = useState({
    phoneNumber: '',
    isValid: false,
    country: 'us'
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Modern Phone Input</h2>
          <p className="text-slate-500 text-sm">Powered by react-phone-input-2 & libphonenumber-js</p>
        </div>

        <PhoneInputField
          label="Mobile Number"
          value={phoneData.phoneNumber}
          onChange={(data) => setPhoneData(data)}
        />

        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Debug Info</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Raw Value:</span>
              <span className="font-mono font-medium text-indigo-600">{phoneData.phoneNumber || 'none'}</span>
            </div>
            <div className="flex justify-between">
              <span>Is Valid:</span>
              <span className={`font-bold ${phoneData.isValid ? 'text-green-500' : 'text-red-500'}`}>
                {phoneData.isValid ? '✓ TRUE' : '✗ FALSE'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Country:</span>
              <span className="uppercase font-bold text-slate-700">{phoneData.country}</span>
            </div>
          </div>
        </div>

        <button 
          disabled={!phoneData.isValid}
          className={`w-full mt-6 py-3.5 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
            phoneData.isValid 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {phoneData.isValid ? 'Continue with Verification' : 'Enter Valid Number'}
        </button>
      </div>

      <div className="mt-12 max-w-2xl text-center text-slate-400 text-sm">
        <p>This implementation uses <span className="text-slate-600 font-medium">react-phone-input-2</span> for the UI (flags, masks, dropdowns) and <span className="text-slate-600 font-medium">libphonenumber-js</span> for deep validation against official Google metadata.</p>
      </div>
    </div>
  );
};

export default PhoneInputShowcase;
