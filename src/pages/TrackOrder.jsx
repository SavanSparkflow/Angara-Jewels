import React from 'react';

const TrackOrder = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <h1 className="text-3xl font-bold text-center mb-12 text-[#1a1a1a]">Track your order</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Sequel Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col items-center shadow-sm">
                    <div className="h-16 flex items-center justify-center mb-8">
                        <div className="flex items-center text-[#c23632] font-bold text-xl tracking-wider">
                            <div className="w-4 h-4 bg-[#c23632] mr-2 flex justify-center items-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            SEQUEL
                        </div>
                    </div>
                    <div className="w-full relative mb-4">
                        <input
                            type="text"
                            placeholder="Paste your tracking number"
                            className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors text-sm"
                        />
                    </div>
                    <button className="w-full bg-[#20202d] hover:bg-[#1a1a24] text-white text-xs tracking-widest font-semibold py-4 rounded-md transition-colors">
                        TRACK ORDER
                    </button>
                </div>

                {/* Blue Dart Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col items-center shadow-sm">
                    <div className="h-16 flex items-center justify-center mb-8">
                        <div className="flex items-center font-bold text-xl italic tracking-wider">
                            <span className="text-[#0052a3]">BLUE</span>
                            <span className="text-[#00b050] ml-1">DART</span>
                            <svg className="w-5 h-5 text-[#00b050] ml-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5 3l14 9-14 9V3z" />
                            </svg>
                        </div>
                    </div>
                    <div className="w-full relative mb-4">
                        <input
                            type="text"
                            placeholder="Paste your tracking number"
                            className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors text-sm"
                        />
                    </div>
                    <button className="w-full bg-[#20202d] hover:bg-[#1a1a24] text-white text-xs tracking-widest font-semibold py-4 rounded-md transition-colors">
                        TRACK ORDER
                    </button>
                </div>

                {/* BVC Logistics Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col items-center shadow-sm">
                    <div className="h-16 flex flex-col items-center justify-center mb-8">
                        <div className="text-[#132d56] font-bold text-3xl font-poppins">
                            BVC<span className="text-xs absolute -mt-1">&reg;</span>
                        </div>
                        <div className="text-[#132d56] text-[10px] tracking-widest font-semibold mt-1">
                            LOGISTICS
                        </div>
                    </div>
                    <div className="w-full relative mb-4">
                        <input
                            type="text"
                            placeholder="Paste your tracking number"
                            className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-700 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors text-sm"
                        />
                    </div>
                    <button className="w-full bg-[#20202d] hover:bg-[#1a1a24] text-white text-xs tracking-widest font-semibold py-4 rounded-md transition-colors">
                        TRACK ORDER
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TrackOrder;
