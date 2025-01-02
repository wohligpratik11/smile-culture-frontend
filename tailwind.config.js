/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderImage: {
        'custom-gradient':
          'conic-gradient(from 180deg at 51.95% 49.81%, rgba(0, 0, 0, 0.105455) -2.11deg, rgba(51, 66, 255, 0) 131.45deg, #37F4F4 175.58deg, rgba(51, 66, 255, 0) 252.32deg, rgba(0, 0, 0, 0.0885149) 310.85deg, rgba(0, 0, 0, 0.105455) 357.89deg, rgba(51, 66, 255, 0) 491.45deg), linear-gradient(0deg, #FF5733, #FF5733)',
      },
      spacing: {
        913: '913px',
        1004: '1004px',
      },
      colors: {
        customWhite: '#F5F5F5',
        buttonBorder: ' #56e5f6',
        vividSkyBlue: '#10A3E7',
        lavenderBlue: '##5E6DA7',
        slateBlue: '#5B6BAB',
        button: {},
        card: {
          cardCustomBlue: 'rgba(31,44,100,0.7)', // Define the transparent color
          DEFAULT: '#ffffff', // Light mode card color
          dark: '#1f2937', // Dark mode card color
        },
        'card-foreground': {
          DEFAULT: '#000000', // Light mode text color
          dark: '#ffffff', // Dark mode text color
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
