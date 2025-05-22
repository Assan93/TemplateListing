'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/order/user-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" 
           style={{ background: 'linear-gradient(135deg, #181818 60%, #bfa14a 100%)' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" 
         style={{ background: 'linear-gradient(135deg, #181818 60%, #bfa14a 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No orders found</p>
              <Link
                href="/browse"
                className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Browse Templates
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-md transition duration-200"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order._id}
                      </h3>
                      <p className="text-gray-600">
                        Purchased on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {order.paymentStatus}
                      </span>
                      <span className="font-bold text-yellow-600">
                        ${order.price}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Template Details
                        </h4>
                        <p className="text-gray-600">{order.template?.name}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/template-detail/${order.template?._id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Template
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link
                          href={`/order-success/${order._id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Order Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;