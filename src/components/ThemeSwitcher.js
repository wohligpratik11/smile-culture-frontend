// components/ThemeSwitcher.js
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      style={{ padding: '10px', cursor: 'pointer' }}
    >
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}
