'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get templateId from query params
  const templateId = searchParams.get("templateId");
  const [template, setTemplate] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  // Fetch template details
  useEffect(() => {
    if (templateId) {
      setLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/template/get/${templateId}`)
        .then((res) => setTemplate(res.data))
        .catch(() => setTemplate(null))
        .finally(() => setLoading(false));
    }
  }, [templateId]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");
    setOrderLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/add`, {
        user: email,
        template: templateId,
        price: template.price,
        paymentStatus: "paid",
      });
      alert("Order placed successfully!");
      router.push("/orders");
    } catch (err) {
      alert("Failed to place order.");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-700 to-yellow-400 py-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row-reverse overflow-hidden animate-fade-in-up">
        {/* Right: Checkout Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center animate-slide-in-right">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Purchase Template</h2>
          <form onSubmit={handleOrder} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="py-3 px-4 block w-full rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              disabled={orderLoading || loading || !template}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {orderLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Purchase"
              )}
            </button>
          </form>
        </div>
        {/* Left: Template Details */}
        <div className="w-full md:w-1/2 bg-black/90 p-8 flex flex-col justify-center items-center text-white animate-slide-in-left">
          {loading ? (
            <div className="text-center">Loading template...</div>
          ) : template ? (
            <>
              <img
                src={template.image || "https://via.placeholder.com/300x200"}
                alt={template.name}
                className="rounded-xl mb-4 w-full max-w-xs object-cover shadow-lg animate-fade-in-img"
              />
              <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
              <p className="text-yellow-300 font-semibold mb-2 text-lg">${template.price}</p>
              <p className="text-gray-200 mb-2">{template.description}</p>
              <div className="text-sm text-gray-400 mb-1">Category: {template.category}</div>
              <div className="text-xs text-gray-500">By {template.author}</div>
              {/* Add more template details here if needed */}
            </>
          ) : (
            <div className="text-center text-red-400">Template not found.</div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.9s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.9s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes fade-in-img {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-img {
          animation: fade-in-img 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </div>
  );
};

export default Checkout;