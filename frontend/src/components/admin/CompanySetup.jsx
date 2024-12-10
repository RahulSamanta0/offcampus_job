import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { motion } from 'framer-motion';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
      minHeight: '100vh',
      padding: '0',
    }}>
      {/* Fixed Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Navbar />
      </div>

      {/* Main Content Area with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ paddingTop: '60px', maxWidth: '100%', margin: '0 auto' }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '700px',
            margin: '20px auto',
          }}
        >
          <form onSubmit={submitHandler}>
            {/* Heading Section with Animation */}
            <motion.div
              className="flex items-center gap-5 p-8"
              whileHover={{ scale: 1.05 }}
            >
              <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold"
                style={{
                  background: 'transparent',
                  border: '1px solid #0288d1',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                }}
              >
                <ArrowLeft />
                <span>Back</span>
              </Button>
              <h1 className='font-bold text-xl'>Company Setup</h1>
            </motion.div>

            {/* Form Fields Section */}
            <motion.div
              className="grid grid-cols-2 gap-4 p-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {[
                { name: "name", label: "Company Name" },
                { name: "description", label: "Description" },
                { name: "website", label: "Website" },
                { name: "location", label: "Location" },
              ].map((field, index) => (
                <div key={index}>
                  <Label>{field.label}</Label>
                  <Input
                    type="text"
                    name={field.name}
                    value={input[field.name]}
                    onChange={changeEventHandler}
                    style={{
                      border: '2px solid #0288d1',
                      padding: '8px 10px',
                      borderRadius: '4px',
                      outline: 'none',
                    }}
                  />
                </div>
              ))}
              <div>
                <Label>Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  style={{
                    border: '2px solid #0288d1',
                    padding: '8px 10px',
                    borderRadius: '4px',
                    outline: 'none',
                  }}
                />
              </div>
            </motion.div>

            {/* Buttons Section */}
            {loading
              ? (
                <motion.button
                  className="w-full my-4"
                  style={{
                    background: '#0288d1',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'wait',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </motion.button>
              )
              : (
                <motion.button
                  type="submit"
                  className="w-full my-4"
                  style={{
                    background: '#43a047',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  Update
                </motion.button>
              )
            }
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompanySetup;
