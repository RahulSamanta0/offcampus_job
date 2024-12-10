import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-2xl"
    >
      {/* Main Content Wrapper with colored background */}
      <div className="flex flex-col gap-3 bg-[#f9fafb] p-4 rounded-md shadow-md">
        {/* Company Name & Location */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg text-[#333]">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>

        {/* Job Title & Description */}
        <div>
          <h1 className="font-bold text-lg text-[#555] my-1">{job?.title}</h1>
          <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
        </div>

        {/* Badges with Soft Background Colors */}
        <div className="flex items-center gap-3 mt-3">
          <Badge
            className={'text-blue-700 bg-blue-100 px-2 py-1 rounded-md font-semibold'}
            variant="ghost"
          >
            {job?.position} Positions
          </Badge>
          <Badge
            className={'text-[#F83002] bg-[#FFE5E0] px-2 py-1 rounded-md font-semibold'}
            variant="ghost"
          >
            {job?.jobType}
          </Badge>
          <Badge
            className={'text-[#7209b7] bg-[#E2D6FF] px-2 py-1 rounded-md font-semibold'}
            variant="ghost"
          >
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
