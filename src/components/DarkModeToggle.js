"use client";

import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDarkMode = () => {
    const nextTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      className="flex items-center justify-between w-16 h-8 px-1 bg-gray-300 dark:bg-gray-700 rounded-full relative transition-colors duration-300 focus:outline-none"
    >
      <div
        className={`absolute top-[2px] left-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      />
      <MdOutlineWbSunny className="text-yellow-500 text-sm z-10 ml-1" />
      <IoMoonSharp className="text-purple-400 text-sm z-10 mr-2" />
    </button>
  );
}
