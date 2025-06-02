import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Kolkata"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "AI || ML"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="w-full bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
    >
      
      <hr className="mb-6 border-gray-300" />

      {/* Filter Sections */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <motion.div
            key={data.filterType}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-6"
          >
            {/* Enhanced Section Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-3 shadow-md px-4 py-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-lg">
              {data.filterType}
            </h2>

            {/* Filter Options */}
            <div className="space-y-3">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <motion.div
                    key={item}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#e0f2ff",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                    className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg transition-colors"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label
                      htmlFor={itemId}
                      className="text-gray-700 font-medium hover:text-blue-600"
                    >
                      {item}
                    </Label>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterCard;
