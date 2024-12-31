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
      style={{
        padding: '10px',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {theme === 'light' ? <SunMoon /> : <Sun />}
    </button>
  );
};

export default ThemeToggle;
