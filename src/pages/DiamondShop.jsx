import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getDiamondTypes,
    getDiamondShapes,
    getDiamondColors,
    getDiamondClarities,
    getDiamondCuts,
    getDiamonds,
    getDiamondStats
} from '../redux/slices/diamondSlice';
import { useWishlist } from '../hooks/useWishlist';
import { Heart } from 'lucide-react';

const RangeSlider = ({ min, max, minValue, maxValue, step, onMinChange, onMaxChange, prefix = "" }) => {
    return (
        <div className="relative px-2 py-4">
            <div className="range-slider relative w-full h-8 flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={(e) => onMinChange(Math.min(Number(e.target.value), maxValue - step))}
                    className="range-slider-input absolute bottom-[11px] w-full z-20"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onChange={(e) => onMaxChange(Math.max(Number(e.target.value), minValue + step))}
                    className="range-slider-input absolute bottom-[11px] w-full z-20"
                />
                <div className="relative w-full h-1 bg-gray-200 rounded-full">
                    <div
                        className="absolute h-full bg-[#1F4E56] rounded-full"
                        style={{
                            left: `${((minValue - min) / (max - min)) * 100}%`,
                            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-between mt-2">
                <div className="border border-gray-200 px-4 py-2 rounded text-[13px] text-gray-600 w-28">{prefix} {minValue}</div>
                <div className="border border-gray-200 px-4 py-2 rounded text-[13px] text-gray-600 w-28">{prefix} {maxValue}</div>
            </div>
        </div>
    );
};

const DiamondShop = () => {
    const dispatch = useDispatch();
    const {
        types,
        shapes,
        colors,
        clarities,
        cuts,
        diamonds,
        stats,
        totalDiamonds,
        loading
    } = useSelector(state => state.diamond);
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [filters, setFilters] = useState({
        page: 1,
        limit: 12,
        search: "",
        shapes: [],
        colors: [],
        clarities: [],
        cuts: [],
        types: [],
        minPrice: 100,
        maxPrice: 50000,
        minCarat: 0.1,
        maxCarat: 20
    });

    const [activeDiamondType, setActiveDiamondType] = useState('NATURAL');

    useEffect(() => {
        dispatch(getDiamondTypes());
        dispatch(getDiamondShapes());
        dispatch(getDiamondColors());
        dispatch(getDiamondClarities());
        dispatch(getDiamondCuts());
        dispatch(getDiamondStats());
    }, [dispatch]);

    useEffect(() => {
        if (stats) {
            setFilters(prev => ({
                ...prev,
                minPrice: stats.priceRange.min,
                maxPrice: stats.priceRange.max,
                minCarat: stats.caratRange.min,
                maxCarat: stats.caratRange.max
            }));
        }
    }, [stats]);

    useEffect(() => {
        // Find the correct type ID based on activeDiamondType string
        let typeIds = [];
        if (activeDiamondType === 'NATURAL') {
            const naturalType = types.find(t => t.name.toLowerCase().includes('natural'));
            if (naturalType) typeIds = [naturalType._id];
        } else if (activeDiamondType === 'LAB') {
            const labType = types.find(t => t.name.toLowerCase().includes('lab'));
            if (labType) typeIds = [labType._id];
        }

        dispatch(getDiamonds({ ...filters, types: typeIds }));
    }, [dispatch, filters, activeDiamondType, types]);

    const handleFilterToggle = (category, id) => {
        setFilters(prev => {
            const current = prev[category];
            const isSelected = current.includes(id);
            const updated = isSelected
                ? current.filter(item => item !== id)
                : [...current, id];
            
            return { ...prev, [category]: updated, page: 1 };
        });
    };

    const handleReset = () => {
        setFilters({
            page: 1,
            limit: 12,
            search: "",
            shapes: [],
            colors: [],
            clarities: [],
            cuts: [],
            types: [],
            minPrice: stats?.priceRange?.min || 100,
            maxPrice: stats?.priceRange?.max || 50000,
            minCarat: stats?.caratRange?.min || 0.1,
            maxCarat: stats?.caratRange?.max || 20
        });
        setActiveDiamondType('NATURAL');
    };



    return (
        <div className="bg-white min-h-screen md:pt-10 pt-4">
            {/* ===================== FILTERS CONTAINER ===================== */}
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex mb-10 mt-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3 text-[12px] font-medium">
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li>Diamond Shop</li>
                    </ol>
                </nav>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">

                    {/* Left Column Filters */}
                    <div className="space-y-10">
                        {/* Shape Filter */}
                        <section>
                            <h4 className="text-[12px] font-bold tracking-[0.2em] mb-6 uppercase text-gray-500">Diamond Shape</h4>
                            <div className="flex justify-between flex-wrap gap-4">
                                {shapes.map((shape) => (
                                    <button
                                        key={shape._id}
                                        onClick={() => handleFilterToggle('shapes', shape._id)}
                                    >
                                        <div className={`flex flex-col items-center justify-center gap-2 text-[11px] font-medium transition-all ${filters.shapes.includes(shape._id) ? 'opacity-100' : 'opacity-50'}`}>
                                            <img
                                                src={shape.image?.url}
                                                alt={shape.name}
                                                className="w-8 h-8 object-contain"
                                            />
                                            {shape.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Clarity Filter */}
                        <section>
                            <h4 className="text-[12px] font-bold tracking-[0.2em] mb-6 uppercase text-gray-500">Diamond Clarity</h4>
                            <div className="flex justify-between flex-wrap gap-3">
                                {clarities.map((grade) => (
                                    <button
                                        key={grade._id}
                                        onClick={() => handleFilterToggle('clarities', grade._id)}
                                        className={`flex flex-col items-center justify-center gap-2 text-[11px] font-medium transition-all
                                            ${filters.clarities.includes(grade._id) ? 'opacity-100' : 'opacity-50'}`}
                                    >
                                        <img src={grade.image?.url || ""} alt={grade.name} className="w-8 h-8 object-contain" />
                                        {grade.name}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Price Slider */}
                        <section>
                            <h4 className="text-[12px] font-bold tracking-[0.2em] mb-6 uppercase text-gray-500">Price</h4>
                            <RangeSlider
                                min={stats?.priceRange?.min || 0}
                                max={stats?.priceRange?.max || 50000}
                                step={100}
                                minValue={filters.minPrice}
                                maxValue={filters.maxPrice}
                                onMinChange={(val) => setFilters(prev => ({ ...prev, minPrice: val, page: 1 }))}
                                onMaxChange={(val) => setFilters(prev => ({ ...prev, maxPrice: val, page: 1 }))}
                                prefix="$"
                            />
                        </section>
                    </div>

                    {/* Right Column Filters */}
                    <div className="space-y-10">
                        {/* Color Filter */}
                        <section>
                            <h4 className="text-[12px] font-bold tracking-[0.2em] mb-6 uppercase text-gray-500">Diamond Color</h4>
                            <div className="flex justify-between flex-wrap gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color._id}
                                        onClick={() => handleFilterToggle('colors', color._id)}
                                        className={`flex flex-col items-center justify-center gap-2 text-[11px] font-medium transition-all
                                            ${filters.colors.includes(color._id) ? 'opacity-100' : 'opacity-50'}`}
                                    >
                                        <img src={color.image?.url || ""} alt={color.name} className="w-8 h-8 object-contain" />
                                        {color.name}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Cut Filter */}
                        <section>
                            <h4 className="text-[12px] font-bold tracking-[0.2em] mb-6 uppercase text-gray-500">Diamond Cut</h4>
                            <div className="flex justify-between flex-wrap gap-3">
                                {cuts.map((cut) => (
                                    <button
                                        key={cut._id}
                                        onClick={() => handleFilterToggle('cuts', cut._id)}
                                        className={`flex flex-col items-center justify-center gap-2 text-[11px] font-medium transition-all
                                            ${filters.cuts.includes(cut._id) ? 'opacity-100' : 'opacity-50'}`}
                                    >
                                        <img src={cut.image?.url || ""} alt={cut.name} className="w-8 h-8 object-contain" />
                                        {cut.name}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Carat Slider */}
                        <section>
                            <h4 className="text-[12px] font-bold tracking-[0.2em] mb-6 uppercase text-gray-500">Carat Weight</h4>
                            <RangeSlider
                                min={stats?.caratRange?.min || 0.1}
                                max={stats?.caratRange?.max || 20}
                                step={0.1}
                                minValue={filters.minCarat}
                                maxValue={filters.maxCarat}
                                onMinChange={(val) => setFilters(prev => ({ ...prev, minCarat: val, page: 1 }))}
                                onMaxChange={(val) => setFilters(prev => ({ ...prev, maxCarat: val, page: 1 }))}
                            />
                        </section>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mt-12 mb-10">
                    <div className="inline-flex border border-gray-200 rounded p-1">
                        <button
                            onClick={() => { setActiveDiamondType('NATURAL'); setFilters(prev => ({ ...prev, page: 1 })) }}
                            className={`px-12 py-3 text-[12px] font-bold  transition-all ${activeDiamondType === 'NATURAL' ? 'bg-[#1F4E56] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            NATURAL DIAMONDS
                        </button>
                        <button
                            onClick={() => { setActiveDiamondType('LAB'); setFilters(prev => ({ ...prev, page: 1 })) }}
                            className={`px-12 py-3 text-[12px] font-bold  transition-all ${activeDiamondType === 'LAB' ? 'bg-[#1F4E56] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            LAB DIAMONDS
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleReset}
                    className={`px-12 py-3 text-[12px] font-bold  transition-all border border-[#1F4E56]/50 text-[#2B5C6B]`}
                >
                    Reset Filters
                </button>
            </div>



            {/* ===================== PRODUCT GRID ===================== */}
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 min-h-[400px]">
                        {loading && diamonds.length === 0 ? (
                            <div className="col-span-full flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F4E56]"></div>
                            </div>
                        ) : diamonds.length > 0 ? (
                            diamonds.map((diamond) => (
                                <div key={diamond._id} className="group bg-white border border-gray-100 flex flex-col items-center p-6 hover:shadow-xl transition-all duration-500 rounded-sm">
                                    <div className="relative aspect-square w-full flex items-center justify-center mb-6 overflow-hidden">
                                        <img
                                            src={diamond?.images?.[0]?.url || ""}
                                            alt="Loose Diamond"
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <button 
                                            className={`absolute top-0 left-0 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors bg-white shadow-sm border border-gray-100 hover:bg-gray-50`}
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(diamond, { type: 'diamond' }); }}
                                        >
                                            <Heart size={14} fill={isInWishlist(diamond._id, `${diamond.carat} CT ${diamond?.color?.name} ${diamond?.clarity?.name} ${diamond?.shape?.name}`) ? 'black' : 'none'} className={isInWishlist(diamond._id, `${diamond.carat} CT ${diamond?.color?.name} ${diamond?.clarity?.name} ${diamond?.shape?.name}`) ? 'text-black' : 'text-gray-400'} />
                                        </button>
                                        <div className="absolute top-0 right-0 bg-gray-600 text-white text-[9px] px-2 py-1 rounded-bl-md opacity-80 uppercase tracking-tighter">GIA Cert</div>
                                    </div>

                                    <div className="text-center w-full">
                                        <div className="text-[16px] font-semibold text-[#1F4E56] mb-1">$ {diamond.price?.toLocaleString()}</div>
                                        <div className="text-[11px] text-gray-500 uppercase  mb-6">{diamond.carat} CT {diamond?.color?.name} {diamond?.clarity?.name} {diamond?.shape?.name}</div>

                                        <Link to={`/diamond-shop/detail/${diamond._id}`} className="w-full">
                                            <button className="w-full bg-[#1F4E56] text-white text-[10px] font-bold tracking-[0.2em] uppercase py-3.5 hover:bg-[#153439] transition-colors rounded-sm shadow-sm">
                                                View Diamond
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No diamonds found matching your filters.
                            </div>
                        )}
                    </div>

                    {totalDiamonds > diamonds.length && (
                        <div className="mt-16 flex justify-center">
                            <button 
                                onClick={() => setFilters(prev => ({ ...prev, limit: prev.limit + 12 }))}
                                disabled={loading}
                                className="px-16 py-4 border border-black text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiamondShop;
