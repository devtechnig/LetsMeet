import React from 'react';

interface NavbarProps {
  toggleTheme: (newTheme: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    toggleTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  };

  return (
    <nav className="navbar">
      <button onClick={handleThemeToggle}>Toggle Theme</button>
    </nav>
  );
};

export default Navbar;
