'use client';

import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const TemplateSchema = Yup.object().shape({
  title: Yup.string()
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
  previewLink: Yup.string()
    .url('Invalid URL')
    .required('Preview link is required'),
});

const TemplateAdd = () => {
  const templateForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      price: '',
      image: '',
      previewLink: '',
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
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || 'Failed to add template');
      }
    },
  });

  
  // State to manage the image upload progress//
  const imageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Template'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'dbqjxlvja'); // Replace with your Cloudinary cloud name
    
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Replace with your Cloudinary API endpoint
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Add New Template</h1>
        <form onSubmit={templateForm.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              onChange={templateForm.handleChange}
              onBlur={templateForm.handleBlur}
              value={templateForm.values.title}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {templateForm.touched.title && templateForm.errors.title && (
              <p className="text-red-500 text-xs mt-1">{templateForm.errors.title}</p>
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
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="image"
              onChange={templateForm.handleChange}
              onBlur={templateForm.handleBlur}
              value={templateForm.values.image}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {templateForm.touched.image && templateForm.errors.image && (
              <p className="text-red-500 text-xs mt-1">{templateForm.errors.image}</p>
            )}        
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preview Link</label>
            <input
              type="url"
              name="previewLink"
              onChange={templateForm.handleChange}
              onBlur={templateForm.handleBlur}
              value={templateForm.values.previewLink}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {templateForm.touched.previewLink && templateForm.errors.previewLink && (
              <p className="text-red-500 text-xs mt-1">{templateForm.errors.previewLink}</p>
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