import Image from 'next/image';
import { useTheme } from "@/app/ThemeContext";

const Loader = () => {
  const { theme } = useTheme(); // Access the current theme

  // Dynamically set the loading icon based on the theme
  const dynamicLoadingIcon = theme === "light" ? "/icons/loading-circle.svg" : "/icons/loading-circle-dark.svg";

  return (
    <div className="flex-center h-screen w-full bg-lightBgColor dark:bg-darkBgColor">
      <Image
        src={dynamicLoadingIcon} // Set the dynamic icon here
        alt="Loading..."
        width={50}
        height={50}
        className="text-lightAccentColor dark:text-darkAccentColor" // Optional, if you want to apply the accent color to an SVG or similar
      />
    </div>
  );
};

export default Loader;
