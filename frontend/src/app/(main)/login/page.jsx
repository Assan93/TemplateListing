'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`,
          values
        );
        toast.success('Login successful!');
        localStorage.setItem('token', response.data.token);
        router.push('/'); // Redirect to home page after successful login
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Login failed!');
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-emerald-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8 animate-bg-fade">
      <div className="max-w-md w-full space-y-8 bg-white/90 p-8 rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex flex-col items-center">
          <div className="animate-bounce mb-2">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent animate-gradient-x">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginForm.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="transition-all duration-300 hover:scale-105">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              {loginForm.touched.email && loginForm.errors.email && (
                <p className="text-red-500 text-xs mt-1">{loginForm.errors.email}</p>
              )}
            </div>
            <div className="mt-4 transition-all duration-300 hover:scale-105">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              {loginForm.touched.password && loginForm.errors.password && (
                <p className="text-red-500 text-xs mt-1">{loginForm.errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center mt-4 animate-fade-in-delay">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
              Sign up
            </a>
          </p>
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
        @keyframes gradient-x {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease-in-out infinite;
        }
        @keyframes bg-fade {
          0% { background-color: #e0f2fe; }
          100% { background-color: #fef9c3; }
        }
        .animate-bg-fade {
          animation: bg-fade 2s ease-in;
        }
        @keyframes fade-in-delay {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in-delay {
          animation: fade-in-delay 1.5s 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default Login;