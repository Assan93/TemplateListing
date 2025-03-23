import React from 'react'

const Login = () => {
  return (
    <div className='lg:px-130 py-30 bg-blue-700'><>
    <title>Login Page</title>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
      rel="stylesheet"
    />
    {/* Container */}
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
      {/* Logo */}
      <img src="https://logodix.com/logo/1714036.gif" alt="Logo" className="w-24 mx-auto mb-4" />
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">Login to Your Account</h2>
      {/* Form */}
      <form action="dashboard.html" method="post" className="space-y-4">
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          required=""
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required=""
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Login
        </button>
      </form>
      {/* Footer Links */}
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?
        <a href="signup.html" className="text-green-500 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  </>
  </div>
    )
}

export default Login