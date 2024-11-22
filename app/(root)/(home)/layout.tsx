"use client";

import { ReactNode, useState, useEffect } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const themeClasses = theme === 'dark' ? 'bg-darkBgColor text-darkTextColor' : 'bg-lightBgColor text-lightTextColor';

  return (
    <main className={`relative ${themeClasses}`}>
      <Navbar toggleTheme={(newTheme) => setTheme(newTheme)} />

      <div className="flex">
        <Sidebar className={themeClasses} />

        <section className={`flex bg-lightBgColor dark:bg-darkBgColor min-h-screen flex-1 flex-col px-6 pb-6 pt-6 max-md:pb-14 sm:px-14 ${themeClasses}`}>
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
