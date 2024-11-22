'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
  }, []);

  const borderColor = theme === 'dark' ? 'border-darkAccentColor' : 'border-lightAccentColor';
  const shadowColor = theme === 'dark' ? 'shadow-darkAccentColor/50' : 'shadow-lightAccentColor/50';

  return (
    <section
      className={cn(
        `gradient-border px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] 
        rounded-[14px] cursor-pointer border ${borderColor} shadow-lg ${shadowColor} transition-all 
        duration-300 ease-in-out`,
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px] bg-gradient-to-r from-accentColor to-transparent">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>
      
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#DFE4E2' : '#181C1A' }}>
          {title}
        </h1>
        <p className="text-lg font-normal" style={{ color: theme === 'dark' ? '#f5f5f5' : '#151515' }}>
          {description}
        </p>
      </div>
    </section>
  );
};

export default HomeCard;
