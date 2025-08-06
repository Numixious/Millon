import React from 'react';
import { SunIcon, MoonIcon } from './common/Icons';

interface ThemeTogglerProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-900 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggler;
