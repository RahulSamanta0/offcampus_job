import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="relative text-center bg-gradient-to-br from-teal-100 via-white to-blue-100 py-20 overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-70"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col gap-6 text-gray-800 animate-fade-in-slow">
                {/* Badge */}
                <span className="mx-auto px-4 py-2 rounded-full bg-blue-200 text-blue-700 text-sm font-semibold animate-zoom-in">
                    Start Your Career Journey
                </span>

                {/* Main Heading */}
                <h1 className="text-4xl lg:text-5xl font-bold animate-slide-in">
                    Your <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">Dream Job</span> Awaits
                </h1>

                {/* Input Section */}
                <div className="flex w-[85%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-300 rounded-full items-center mx-auto bg-white/90 animate-pop-up relative">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-3 outline-none border-none rounded-l-full text-gray-700 placeholder-gray-400 bg-transparent"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="absolute right-0 h-full px-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold transition-all duration-200 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                    >
                        <div className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            <span>Search</span>
                        </div>
                    </Button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-16 w-16 h-16 bg-blue-200 rounded-full opacity-60 animate-float"></div>
                <div className="absolute bottom-20 right-12 w-20 h-20 bg-teal-300 rounded-full opacity-50 animate-float-delayed"></div>
                <div className="absolute bottom-8 left-12 w-14 h-14 bg-green-300 rounded-full opacity-70 animate-float-slow"></div>
            </div>
        </div>
    );
};

export default HeroSection;
