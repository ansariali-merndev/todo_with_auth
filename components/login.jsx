"use client";

import { useState } from "react";

export const Login = ({ setOpenLogin, setRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginForm = (e) => {
    e.preventDefault();
    console.log("Email: ", email, "Password: ", password);
    setEmail("");
    setPassword("");
  };

  const handleRegister = () => {
    setOpenLogin(false);
    setRegister(true);
  };

  return (
    <section className="absolute z-40 flex items-center justify-center inset-0">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm relative">
        <p
          onClick={() => setOpenLogin(false)}
          className="text-2xl absolute top-0 right-2 cursor-pointer text-purple-600"
        >
          &times;
        </p>
        <h2 className="text-2xl font-bold text-center text-purple-800">
          Sign In
        </h2>
        <p className="text-sky-600 text-center mb-6">
          Welcome back! Please login to your account.
        </p>
        <form onSubmit={handleLoginForm} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md font-semibold hover:bg-purple-800 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center mt-2">
          Don&apos;t have an Account?
          <span
            onClick={handleRegister}
            className="text-sky-600 cursor-pointer"
          >
            {" "}
            Sign up
          </span>
        </p>
      </div>
    </section>
  );
};
