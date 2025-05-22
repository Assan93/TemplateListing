'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-yellow-600">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-yellow-600">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link href="/browse" className="text-yellow-500 hover:text-yellow-400 underline">
            Return to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-yellow-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
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
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-medium text-gray-900">{order._id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium text-gray-900">${order.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium text-gray-900">{order.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Confirmed
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/browse"
            className="block w-full text-center bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            href="/dashboard"
            className="block w-full text-center border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;