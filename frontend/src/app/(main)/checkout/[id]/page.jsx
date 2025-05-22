'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const containerRef = useRef(null);
  const { id } = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Animation
    if (containerRef.current) {
      containerRef.current.classList.add('opacity-100', 'translate-y-0');
    }
  }, []);

  useEffect(() => {
    // Fetch template by id
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/template/getTemplatebyId/${id}`
        );
        setTemplate(res.data);
      } catch (err) {
        setTemplate(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTemplate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate inputs
      if (!email || !template || !id) {
        toast.error('Missing required information');
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/order/add`,
        {
          template: id,
          price: template.price,
          email: email.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data._id) {
        toast.success('Order placed successfully!');
        router.push(`/order-success/${response.data._id}`);
      }
    } catch (error) {
      console.error('Order creation error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create order';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              background: linear-gradient(135deg, #FFD700 0%, #000 100%);
            }
            .checkout-animate-container {
              opacity: 0;
              transform: translateY(40px);
              transition: opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1);
              background: #fff;
            }
            .checkout-animate-container.opacity-100 {
              opacity: 1;
            }
            .checkout-animate-container.translate-y-0 {
              transform: translateY(0);
            }
            .checkout-slide-in-right {
              opacity: 0;
              transform: translateX(60px);
              animation: slide-in-right-key 0.9s ease-out forwards;
              animation-delay: 0.3s;
            }
            @keyframes slide-in-right-key {
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            .checkout-slide-in-left {
              opacity: 0;
              transform: translateX(-60px);
              animation: slide-in-left-key 0.9s ease-out forwards;
              animation-delay: 0.5s;
            }
            @keyframes slide-in-left-key {
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            .checkout-fade-in-img {
              opacity: 0;
              transform: scale(0.95);
              animation: fade-in-img-key 1s ease-out forwards;
              animation-delay: 1s;
            }
            @keyframes fade-in-img-key {
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `
        }}
      />
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #FFD700 0%, #000 100%)'
        }}
      >
        <div
          ref={containerRef}
          className="checkout-animate-container bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden"
          style={{
            marginTop: '20px',
            background: '#fff',
            minHeight: '60vh'
          }}
        >
          {/* Left: Order Summary */}
          <div className="w-full md:w-1/2 bg-gray-300 p-8 flex flex-col justify-center items-center checkout-slide-in-left">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
            {loading ? (
              <div className="text-gray-600">Loading...</div>
            ) : template ? (
              <>
                <img
                  src={template.image || "https://via.placeholder.com/240x160"}
                  alt={template.name || "Template Preview"}
                  className="rounded-xl mb-4 w-full max-w-xs object-cover shadow-lg checkout-fade-in-img"
                />
                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Template:</span>
                    <span className="text-gray-900">{template.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Category:</span>
                    <span className="text-gray-900">{template.category || "N/A"}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Author:</span>
                    <span className="text-gray-900">{template.createdBy || "N/A"}</span>
                  </div>
                  <div className="flex justify-between mt-4 border-t pt-4">
                    <span className="font-bold text-lg text-gray-800">Total:</span>
                    <span className="font-bold text-lg text-yellow-600">
                      ₹{template.price || "39"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-red-500">Template not found.</div>
            )}
          </div>
          {/* Right: Checkout Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center checkout-slide-in-right">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Checkout
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-3 px-4 block w-full rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
                  placeholder="Enter your email"
                  disabled={submitting}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  submitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? 'Processing...' : 'Purchase'}
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4 text-center">
              By completing your purchase, you agree to our <a href="#" className="underline">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
