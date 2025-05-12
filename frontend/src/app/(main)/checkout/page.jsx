'use client';

import React, { useEffect, useRef } from 'react';

const CheckoutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Add a class to trigger fade-in animation on mount
    if (containerRef.current) {
      containerRef.current.classList.add('opacity-100', 'translate-y-0');
    }
  }, []);

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
              background: linear-gradient(120deg, #FFD700 0%, #222 100%);
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
          className="checkout-animate-container bg-white/90 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row-reverse overflow-hidden"
          style={{
            marginTop: '40px',
            background: 'linear-gradient(120deg, #FFD700 0%, #222 100%)',
            minHeight: '75vh'
          }}
        >
          {/* Right: Checkout Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center checkout-slide-in-right"
            style={{
              background: '#fff'
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Purchase Template
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-black">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="py-3 px-4 block w-full rounded-lg border border-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Purchase
              </button>
            </form>
          </div>
          {/* Left: Template Details */}
          <div className="w-full md:w-1/2 bg-black/90 p-8 flex flex-col justify-center items-center text-white checkout-slide-in-left">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Template Name"
              className="rounded-xl mb-4 w-full max-w-xs object-cover shadow-lg checkout-fade-in-img"
            />
            <h3 className="text-2xl font-bold mb-2">Placeholder Template</h3>
            <p className="text-yellow-300 font-semibold mb-2 text-lg">$39</p>
            <p className="text-gray-200 mb-2 text-center">
              This is a placeholder description of the template. It is sleek, modern,
              and easy to customize.
            </p>
            <div className="text-sm text-gray-400 mb-1">Category: Portfolio</div>
            <div className="text-xs text-gray-500">By Example Author</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
