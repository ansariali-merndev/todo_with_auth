"use client";

import { useState } from "react";

export const Register = ({ setOpenLogin, setRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Reset form (optional)
    setFormData({ name: "", email: "", password: "" });
  };

  const handleLogin = () => {
    setRegister(false);
    setOpenLogin(true);
  };

  return (
    <section className="absolute z-40 inset-0 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-96 space-y-6 relative">
        <p
          onClick={() => setRegister(false)}
          className="absolute text-2xl right-6 top-2 cursor-pointer"
        >
          &times;
        </p>
        <div>
          <h2 className="text-2xl font-bold text-center text-purple-800">
            Create Account
          </h2>
          <p className="text-center">
            Sign up to get started with your journey
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition-colors duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={handleLogin}
            className="text-purple-700 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </section>
  );
};
