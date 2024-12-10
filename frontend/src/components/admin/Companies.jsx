import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  // Inline animation and effects
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    transition: 'all 0.3s ease',
  };

  const inputStyle = {
    border: '2px solid #9ab',
    padding: '8px 12px',
    borderRadius: '5px',
    outline: 'none',
    transition: 'transform 0.2s ease',
  };

  const handleInputHover = (e) => {
    e.target.style.transform = 'scale(1.1)';
  };

  const handleInputLeave = (e) => {
    e.target.style.transform = 'scale(1)';
  };

  const buttonStyle = {
    background: '#4ea8ff',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  };

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-3px)';
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
  };

  const tableStyle = {
    border: '1px solid #d1d1d1',
    transition: 'all 0.3s ease',
    padding: '8px',
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        {/* Header with Input & Button */}
        <div style={headerStyle}>
          <div>
            <Input
              className="w-fit"
              placeholder="Filter by name"
              style={inputStyle}
              onChange={(e) => setInput(e.target.value)}
              onMouseEnter={handleInputHover}
              onMouseLeave={handleInputLeave}
            />
          </div>
          <Button
            className="new-company-btn"
            style={buttonStyle}
            onClick={() => navigate('/admin/companies/create')}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            New Company
          </Button>
        </div>

        {/* Animated Table */}
        <div style={tableStyle}>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
