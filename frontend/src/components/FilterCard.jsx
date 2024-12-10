import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
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
  }, [selectedValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="w-full bg-white p-4 rounded-lg shadow-md"
    >
      {/* Section Title */}
      <h1 className="font-bold text-lg mb-3 text-gray-700"></h1>
      <hr className="mt-1 mb-4 border-gray-200" />

      {/* Radio Group */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <motion.div
            key={data.filterType}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mt-4"
          >
            <h2 className="text-gray-700 font-semibold text-md mb-2">{data.filterType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2 my-2 cursor-pointer transition-all duration-200 ease-in-out"
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <Label
                    htmlFor={itemId}
                    className="text-gray-600 font-medium hover:text-blue-600"
                  >
                    {item}
                  </Label>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterCard;
