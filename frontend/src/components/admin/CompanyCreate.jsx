import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Inline animation and effect styles
  const containerStyle = {
    background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
    minHeight: '100vh',
    padding: '20px 0',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
    maxWidth: '500px',
    margin: '20px auto',
  };

  const mainContentStyle = {
    paddingTop: '60px', // Adjust based on Navbar height
  };

  return (
    <div style={containerStyle}>
      {/* Fixed Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Navbar />
      </div>
      {/* Main content section with proper padding */}
      <div style={mainContentStyle}>
        <div style={formStyle}>
          {/* Heading Section */}
          <div className="my-4">
            <h1 className="font-bold text-2xl text-gray-800">Your Company Name</h1>
            <p className="text-gray-600">
              What would you like to give your company name? You can change this later.
            </p>
          </div>
          {/* Input Section */}
          <div>
            <Label style={{ fontSize: '16px', fontWeight: '600' }}>Company Name</Label>
            <Input
              type="text"
              style={{
                border: '2px solid #0288d1',
                padding: '10px 15px',
                borderRadius: '5px',
                outline: 'none',
                transition: 'transform 0.2s ease',
              }}
              placeholder="JobHunt, Microsoft etc."
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          {/* Buttons */}
          <div className="flex items-center justify-between gap-2 my-6">
            <Button
              style={{
                background: '#0288d1',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/admin/companies')}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: '#43a047',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
