"use client";

import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "lowercase letter is required")
    .matches(/[A-Z]/, "uppercase letter is required")
    .matches(/[0-9]/, "number is required")
    .matches(/\W/, "special character is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const signForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/add`,
          values
        );
        toast.success("User Registered Successfully!");
        router.push("/login");
        resetForm();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Registration failed");
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: SignupSchema,
  });

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("Please select a file to upload.");
    }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "Template");
    try {
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/dbqjxlvja/image/upload",
        fd
      );
      signForm.setFieldValue("avatar", result.data.secure_url);
      toast.success("File uploaded successfully!");
    } catch (err) {
      toast.error("File upload failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-700 to-yellow-400">
      <div className="w-full max-w-lg mx-auto bg-black/80 rounded-3xl shadow-2xl p-4 animate-fade-in-up relative">
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <div className="animate-bounce bg-gradient-to-tr from-yellow-400 to-yellow-700 rounded-full p-5 shadow-2xl">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-700 bg-clip-text text-transparent animate-gradient-x">
          Sign Up
        </h1>
        <form onSubmit={signForm.handleSubmit} className="space-y-4">
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block text-sm font-semibold mb-1">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={uploadFile}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            {signForm.values.avatar && (
              <img
                src={signForm.values.avatar}
                alt="Avatar"
                className="mt-2 w-16 h-16 rounded-full object-cover border-2 border-emerald-400 mx-auto"
              />
            )}
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block text-sm text-white font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={signForm.handleChange}
              value={signForm.values.name}
              className="py-3 px-4 block w-full rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your name"
            />
            {signForm.touched.name && signForm.errors.name && (
              <p className="text-xs text-red-400 mt-1">{signForm.errors.name}</p>
            )}
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block text-sm text-white font-semibold mb-1">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={signForm.handleChange}
              value={signForm.values.email}
              className="py-3 px-4 block w-full rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email"
            />
            {signForm.touched.email && signForm.errors.email && (
              <p className="text-xs text-red-400 mt-1">{signForm.errors.email}</p>
            )}
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block text-sm text-white font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={signForm.handleChange}
                value={signForm.values.password}
                className="py-3 px-4 block w-full rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675m1.562 2.675A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.336 3.236-.938 4.675m-1.562-2.675A9.956 9.956 0 0112 21c-2.21 0-4.267-.722-5.938-1.938" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a6 6 0 1112 0 6 6 0 01-12 0z" />
                  </svg>
                )}
              </button>
            </div>
            {signForm.touched.password && signForm.errors.password && (
              <p className="text-xs text-red-400 mt-1">{signForm.errors.password}</p>
            )}
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block text-sm text-white font-semibold mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={signForm.handleChange}
                value={signForm.values.confirmPassword}
                className="py-3 px-4 block w-full rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition pr-12"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675m1.562 2.675A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.336 3.236-.938 4.675m-1.562-2.675A9.956 9.956 0 0112 21c-2.21 0-4.267-.722-5.938-1.938" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a6 6 0 1112 0 6 6 0 01-12 0z" />
                  </svg>
                )}
              </button>
            </div>
            {signForm.touched.confirmPassword && signForm.errors.confirmPassword && (
              <p className="text-xs text-red-400 mt-1">{signForm.errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-400 hover:underline font-semibold"
          >
            Sign in
          </a>
        </p>
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
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
