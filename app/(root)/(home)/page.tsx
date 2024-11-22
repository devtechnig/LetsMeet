"use client";

import MeetingTypeList from '@/components/MeetingTypeList';
import { useEffect, useState } from 'react';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  // State to manage theme
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
  }, []);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div
        className={`h-[303px] w-full border border-lightAccentColor dark:border-darkAccentColor rounded-[20px] bg-hero dark:bg-heroDark bg-cover border shadow-lg  p-6 transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2
            className={`glassmorphism max-w-[273px] text-black dark:text-white rounded py-2 text-center text-base font-normal border border border-lightAccentColor dark:border-darkAccentColor`}
          >
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold text-black dark:text-white lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-lightAccentColor dark:text-darkAccentColor lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
