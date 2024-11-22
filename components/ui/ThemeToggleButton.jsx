// components/ThemeToggle.js
'use client';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';


const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
        bg-accentColor text-lightBackground dark:text-darkBackground shadow-lg hover:shadow-xl"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-blue-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
