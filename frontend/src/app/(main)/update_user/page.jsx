'use client';

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Validation schema
const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name too short')
    .max(50, 'Name too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const UpdateUser = () => {
  const router = useRouter();
  
  const updateForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: UpdateSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data) {
          toast.success('Profile updated successfully');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Update error:', error);
        toast.error(error.response?.data?.message || 'Failed to update profile');
      }
    },
  });

  return (
    <div className="min-h-screen py-8" style={{
      background: 'linear-gradient(135deg, #181818 60%, #bfa14a 100%)'
    }}>
      <div className="max-w-md mx-auto bg-white/10 border border-gray-500 rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Update Profile</h1>
        </div>

        <form onSubmit={updateForm.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={updateForm.handleChange}
              onBlur={updateForm.handleBlur}
              value={updateForm.values.name}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white"
            />
            {updateForm.touched.name && updateForm.errors.name && (
              <p className="text-red-500 text-xs mt-1">{updateForm.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={updateForm.handleChange}
              onBlur={updateForm.handleBlur}
              value={updateForm.values.email}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white"
            />
            {updateForm.touched.email && updateForm.errors.email && (
              <p className="text-red-500 text-xs mt-1">{updateForm.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-200 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={updateForm.handleChange}
              onBlur={updateForm.handleBlur}
              value={updateForm.values.password}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white"
            />
            {updateForm.touched.password && updateForm.errors.password && (
              <p className="text-red-500 text-xs mt-1">{updateForm.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;