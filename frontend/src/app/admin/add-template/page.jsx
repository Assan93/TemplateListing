'use client';

import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const TemplateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Too Short!')
    .required('Description is required'),
  category: Yup.string()
    .required('Category is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price cannot be negative'),
  image: Yup.string()
    .required('Image URL is required'),
  rating: Yup.number()
    .min(1, 'Minimum rating is 1')
    .max(5, 'Maximum rating is 5')
    .required('Rating is required'),
});

const TemplateAdd = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const templateForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      image: '',
      rating: ''
    },
    validationSchema: TemplateSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/template/add`,
          values
        );

        if (response.status === 200) {
          toast.success('Template added successfully!');
          resetForm();
          router.push('/browse');
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || 'Failed to add template');
      }
    },
  });

  const imageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Template');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dbqjxlvja/image/upload',
        formData
      );
      if (response.data.secure_url) {
        templateForm.setFieldValue('image', response.data.secure_url);
        toast.success('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-8"
      style={{
        background: 'linear-gradient(135deg, #181818 60%, #bfa14a 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto bg-white/90 p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Add New Template</h1>
        <form onSubmit={templateForm.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={templateForm.handleChange}
              onBlur={templateForm.handleBlur}
              value={templateForm.values.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {templateForm.touched.name && templateForm.errors.name && (
              <p className="text-red-500 text-xs mt-1">{templateForm.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows={4}
              onChange={templateForm.handleChange}
              onBlur={templateForm.handleBlur}
              value={templateForm.values.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {templateForm.touched.description && templateForm.errors.description && (
              <p className="text-red-500 text-xs mt-1">{templateForm.errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              onChange={templateForm.handleChange}
              onBlur={templateForm.handleBlur}
              value={templateForm.values.category}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="website">Website Template</option>
              <option value="landing">Landing Page</option>
              <option value="dashboard">Dashboard</option>
              <option value="ecommerce">E-commerce</option>
              <option value="personal">Personal Blog</option>
              <option value="ecommerce">E-commerce</option>
              <option value="protfolio">Creative Portfolio</option>
            </select>
            {templateForm.touched.category && templateForm.errors.category && (
              <p className="text-red-500 text-xs mt-1">{templateForm.errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              onChange={templateForm.handleChange}
              onBlur={templateForm.handleBlur}
              value={templateForm.values.price}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {templateForm.touched.price && templateForm.errors.price && (
              <p className="text-red-500 text-xs mt-1">{templateForm.errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              min={1}
              max={5}
              step={0.1}
              onChange={templateForm.handleChange}
              onBlur={templateForm.handleBlur}
              value={templateForm.values.rating}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {templateForm.touched.rating && templateForm.errors.rating && (
              <p className="text-red-500 text-xs mt-1">{templateForm.errors.rating}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={imageUpload}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {uploading && <p className="text-blue-500 text-sm mt-1">Uploading...</p>}
            {templateForm.values.image && (
              <img
                src={templateForm.values.image}
                alt="Uploaded"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Template
          </button>
        </form>
      </div>
    </div>
  );
};

export default TemplateAdd;
