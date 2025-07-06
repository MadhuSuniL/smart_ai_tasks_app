"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";
import { apiCall } from "../utils/Axios";
import { ImSpinner9 } from "react-icons/im";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const url = "auth/register";
    const method = "post";
    const body = formData;

    const onSuccess = () => {
      window.location.href = "/";
    };

    const onError = (error) => {
      console.error(error);
    };

    apiCall(url, body, method, setIsLoading, onSuccess, onError);
  };

  return (
    <div className="flex mt-10 flex-col md:flex-row ">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Welcome to Smart AI Tasks</h1>
        <ReactTyped
          strings={[
            "Create tasks from your chats and emails!",
            "Turn your context into smart actions.",
            "Sign up to explore AI-powered productivity.",
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
          className="text-lg text-pink-400 text-center"
        />
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
          Create your account and start organizing smarter with AI.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-center text-pink-600 mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            {/* First + Last Name */}
            <div className="flex space-x-2 mb-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                  className="w-full bg-transparent px-4 py-2 border border-pink-400 rounded-md text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                  className="w-full bg-transparent px-4 py-2 border border-pink-400 rounded-md text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-2 border border-pink-400 rounded-md text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full bg-transparent px-4 py-2 border border-pink-400 rounded-md text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="w-full bg-transparent px-4 py-2 border border-pink-400 rounded-md text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md text-sm font-medium transition duration-200"
            >
              {isLoading ? <ImSpinner9 className="animate-spin text-lg" /> : "Sign Up"}
            </button>
          </form>

          {/* Already have account */}
          <div className="text-center mt-4 text-sm">
            Already have an account?
            <a href="/signin" className="text-pink-500 font-semibold ml-1 hover:underline">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
