// src/components/ThemeToggle.js
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ padding: '10px', margin: '10px' }}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
