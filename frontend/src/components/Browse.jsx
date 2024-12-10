import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// Main Component
const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(''));
        };
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-green-50 min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Section */}
            <div className="max-w-7xl mx-auto my-10 px-6">
                <h1 className="font-extrabold text-2xl my-6 text-blue-700 animate-bounce text-center">
                    Search Results ({allJobs.length})
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-200"
                        >
                            <Job job={job} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
