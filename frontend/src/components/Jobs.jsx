import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Section with light background */}
      <div className="bg-gray-50 min-h-screen pb-8">
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex gap-5">
            {/* Filter Section */}
            <div className="w-[20%] bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter Jobs</h2>
              <FilterCard />
            </div>

            {/* Jobs Section */}
            {filterJobs.length <= 0 ? (
              <div className="flex items-center justify-center flex-1 text-gray-600 font-semibold text-lg">
                No Jobs Found
              </div>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5 bg-white rounded-lg shadow-md">
                {/* Animated Job Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-15 p-11">
                  {filterJobs.map((job, index) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, y: 10 }} // Initial animation state
                      animate={{ opacity: 1, y: 0 }} // Final animation state
                      exit={{ opacity: 0, y: -10 }} // Exit animation state
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05, // Staggered animations for each card
                      }}
                      className="transition-transform transform hover:scale-105 bg-blue-50 p-4 rounded-lg border border-gray-200 shadow-md cursor-pointer"
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
