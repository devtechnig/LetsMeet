"use client";

import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useTheme } from "../app/ThemeContext"; // Adjust this import path if needed

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`flex items-center justify-center`}
    >
      {theme === "light" ? (
        <SunIcon className="w-8 h-8 text-lightAccentColor transition-all duration-100" />
      ) : (
        <MoonIcon className="w-8 h-8 text-darkAccentColor transition-all duration-100" />
      )}
    </button>
  );
};

export default ThemeToggle;
