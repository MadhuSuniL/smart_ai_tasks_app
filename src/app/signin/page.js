"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";
import { apiCall } from "../utils/Axios";
import { setData } from "../utils/localStorage";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
import { IoMdDoneAll } from "react-icons/io";

export default function Signin() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "auth/login";
    const method = "post";
    const body = formData;

    const onSuccess = (data) => {
      toast.success("Login successful!", {
        style: {
          background: "#ec4899",
          color: "#fff",
          fontWeight: "600",
          borderLeft: "4px solid #be185d",
        },
        icon: IoMdDoneAll,
      });
      setData("user", JSON.stringify(data.user));
      setData("access", data.token);
      window.location.href = "/";
    };

    const onError = (error) => {
      toast.error("Enterd wrong credentials !");
    };

    apiCall(url, body, method, setIsLoading, onSuccess, onError);
  };

  return (
    <div className="h-full mt-24 flex flex-col md:flex-row transition-all">
      {/* Left - Welcome Message */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">Welcome to Smart AI Tasks</h1>
        <ReactTyped
          strings={[
            "Turn your notes into smart tasks instantly.",
            "Organize your day with AI-driven task planning.",
            "Let AI convert ideas, chats & emails into action!",
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
          className="text-lg text-pink-400 text-center"
        />
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
          Experience intelligent productivity like never before. Get started now!
        </p>
      </div>

      {/* Right - Sign In Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-center text-pink-600 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit}>
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
            <div className="mb-6">
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md text-sm font-medium transition duration-200"
            >
              {isLoading ? <ImSpinner9 className="animate-spin text-lg" /> : "Sign In"}
            </button>
          </form>

          {/* Sign Up link */}
          <div className="text-center mt-4 text-sm">
            Don’t have an account?
            <a href="/signup" className="text-pink-500 font-semibold ml-1 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
