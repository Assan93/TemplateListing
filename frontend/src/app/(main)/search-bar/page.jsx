'use client';

import React, { useState } from 'react';



const SearchBar = ({ templates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(templates || []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = templates.filter((template) =>
      template.name.toLowerCase().includes(term) ||
      template.category.toLowerCase().includes(term) ||
      template.description.toLowerCase().includes(term)
    );

    setFilteredTemplates(filtered);
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={template.image || 'https://via.placeholder.com/300x200'}
                  alt={template.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {template.category}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {template.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No templates found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;