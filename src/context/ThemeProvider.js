// src/context/ThemeProvider.js
import { ThemeProvider } from 'next-themes';

const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default CustomThemeProvider;
