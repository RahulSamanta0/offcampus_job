import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { motion } from 'framer-motion'; // Import Framer Motion

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div
      style={{
        backgroundColor: '#f7fafc',
        minHeight: '100vh',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Navbar />
      <motion.div
        style={{
          maxWidth: '960px',
          margin: '2.5rem auto',
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
        }}
        initial={{ opacity: 0, transform: 'translateY(-20px)' }}
        animate={{ opacity: 1, transform: 'translateY(0)' }}
        exit={{ opacity: 0 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}
        >
          {/* Search bar */}
          <div
            style={{
              width: '50%',
              transition: 'all 0.3s ease',
              backgroundColor: '#e2e8f0',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              padding: '5px',
            }}
          >
            <Input
              style={{
                width: '100%',
                outline: 'none',
                backgroundColor: 'transparent',
              }}
              placeholder="Filter by name, role"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {/* Animated Button with Framer Motion */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            style={{
              marginLeft: '0.75rem',
            }}
          >
            <Button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#4299e1',
                color: '#ffffff',
                fontWeight: '600',
                borderRadius: '0.375rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate('/admin/jobs/create')}
            >
              New Job
            </Button>
          </motion.div>
        </div>
        {/* Table Section */}
        <div style={{ marginTop: '1rem' }}>
          <AdminJobsTable />
        </div>
      </motion.div>
    </div>
  );
};

export default AdminJobs;
