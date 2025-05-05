"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const TemplateDetail = () => {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { id } = useParams();

  useEffect(() => {
    const fetchTemplateDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/template/getTemplatebyId/${id}`
        );
        console.log(response.data);

        setTemplate(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching template:", error);
        toast.error("Failed to load template details");
        setLoading(false);
      }
    };

    if (id) {
      fetchTemplateDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Template not found</p>
          <Link
            href="/browse"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-gray-500 text-sm">
            <li>
              <Link href="/browse" className="hover:text-blue-600">
                Browse
              </Link>
            </li>
            <li>/</li>
            <li>{template.category}</li>
            <li>/</li>
            <li className="text-gray-900">{template.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Template Header */}
          <div className="relative h-[400px]">
            <img
              src={template.image || "https://via.placeholder.com/1200x400"}
              alt={template.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white w-full">
                <h1 className="text-4xl font-bold mb-2">{template.name}</h1>
                <div className="flex items-center justify-between">
                  <p className="text-lg">By {template.author}</p>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                      {template.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {template.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {template.tags?.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ${template.price}
                  </span>
                </div>

                <button
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
                  onClick={() => toast.success("Purchase feature coming soon!")}
                >
                  Purchase Template
                </button>

                <Link
                  href={template.previewLink || "#"}
                  className="w-full block text-center border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition duration-200"
                  target="_blank"
                >
                  Live Preview
                </Link>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600">
                      Rating: {template.rating || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Created:{" "}
                      {new Date(template.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
