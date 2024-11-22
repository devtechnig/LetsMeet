// Navbar.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/app/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function from ThemeContext

  return (
    <nav className="relative z-50 flex w-full items-center justify-between bg-lightBgColor dark:bg-darkBgColor px-6 py-4 lg:px-10">
      {/* Logo Link with Dynamic Icon */}
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={theme === "light" ? "/icons/logo-light.png" : "/icons/logo.png"}
          width={40}
          height={40}
          alt="LetsMeet logo"
          className="max-sm:w-8"
        />
        <p className="text-[20px] font-extrabold max-sm:hidden text-black dark:text-white">
          LetsMeet
        </p>
      </Link>

      {/* Theme Toggle and User Button */}
      <div className="flex items-center gap-5">
        {/* Theme Toggle Button */}
        <ThemeToggle toggleTheme={toggleTheme} /> {/* Updated to pass toggleTheme */}

        {/* Signed-In User Button */}
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
