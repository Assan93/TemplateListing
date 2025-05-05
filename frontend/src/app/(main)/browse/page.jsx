'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Browse = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/template/getall`);
        setTemplates(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Helper to render stars
  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating * 2) / 2; // round to nearest 0.5
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300 inline" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className='bg-emerald-50 h-full'>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Templates</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Link 
              href={`/template-detail/${template._id}`}
              key={template._id}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={template.image || 'https://via.placeholder.com/300x200'}
                    alt={template.name}
                    className="object-cover w-full h-48"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-blue-600 font-bold">
                      ${template.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {template.category}
                    </span>
                  </div>
          
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {renderStars(template.rating || 0)}
                      <span className="ml-1 text-sm text-gray-600">
                        {typeof template.rating === 'number' ? template.rating.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      By {template.author}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;