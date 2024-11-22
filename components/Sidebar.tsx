// components/Sidebar.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../app/ThemeContext'; // Import theme context
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const { theme } = useTheme(); // Access the theme from ThemeContext

  return (
    <section
      className={cn(
        'sticky left-0 top-0 flex h-screen w-fit flex-col bg-lightBgColor dark:bg-darkBgColor justify-between p-6 pt-6 max-sm:hidden lg:w-[264px]'
      )}
    >
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          const imgURL = theme === 'dark' ? item.darkImgURL : item.lightImgURL; // Dynamically set icon URL based on theme

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-lg justify-start text-darkBgColor dark:text-lightBgColor',
                {
                  'bg-lightActiveTabBg dark:bg-darkActiveTabBg border border-lightAccentColor dark:border-darkAccentColor': isActive,
                }
              )}
            >
              <Image
                src={imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
