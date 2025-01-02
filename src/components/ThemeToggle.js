// src/components/ThemeToggle.js
import { useTheme } from 'next-themes';
import { Sun, SunMoon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="m-2 flex items-center justify-center rounded bg-gray-200 p-2 transition hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? (
        <SunMoon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
