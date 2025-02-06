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
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      screens: {
        xs: '576px',
        'xs-max': { max: '320px' },
        sm: '576px',
        'sm-max': { max: '576px' },
        md: '768px',
        'md-max': { max: '768px' },
        lg: '992px',
        'lg-max': { max: '992px' },
        xl: '1200px',
        'xl-max': { max: '1200px' },
        '2xl': '1320px',
        '2xl-max': { max: '1320px' },
        '3xl': '1600px',
        '3xl-max': { max: '1600px' },
        '4xl': '1850px',
        '4xl-max': { max: '1850px' },
      },
      borderImageLine: {
        gradient: 'linear-gradient(180deg, #13a6e3 0%, #3bc2ba 100%)',
      },
      borderImage: {
        'custom-gradient':
          'conic-gradient(from 180deg at 51.95% 49.81%, rgba(0, 0, 0, 0.105) -2.11deg, rgba(51, 66, 255, 0) 131.45deg, #37F4F4 175.58deg, rgba(51, 66, 255, 0) 252.32deg, rgba(0, 0, 0, 0.088) 310.85deg, rgba(0, 0, 0, 0.105) 357.89deg, rgba(51, 66, 255, 0) 491.45deg), linear-gradient(0deg, #FF5733, #FF5733)',
      },
      background: {
        'button-gradient':
          'linear-gradient(180deg, rgba(49, 58, 91, 0) -1.11%, rgba(49, 58, 91, 0.44) 23.83%, #313A5B 99.56%)',
      },
      spacing: {
        913: '913px',
        1004: '1004px',
      },
      colors: {
        lavender: '#F2EFFF',
        black: '#000000',
        lightBlack: '#264966',
        white: '#ffffff',
        darkBlue: ' #1B2559',
        wildBlueYonder: '#A3AED0',
        lightPrimary: '#F4F7FE',
        darkGray: '#313032',
        blueSecondary: '#4318FF',
        brandLinear: '#868CFF',
        dropdownBg: '#e4ecfd',
        cardBlur: 'rgba(0, 0, 0, 0.6)',
        fixaText: '#005BEC',
        disableGray: '#B0B0B0',
        normalGray: '#EEF0F1',
        cloudbg: '#EAF7F5',
        deploymentLogBg: '#1E1D47',
        darkBackGround: '#101c44',
        OrangeRed: '#fef1e1',
        lightOrangeRed: '#fddbb5',
        darkOrangeRed: '#c13e1b',
        deepNavy: '#434E80',
        blue: '#01bff2',
        gray: '#666666',
        customWhite: '#F5F5F5',
        buttonBorder: '#56e5f6',
        vividSkyBlue: '#10A3E7',
        lavenderBlue: '#5E6DA7',
        slateBlue: '#5B6BAB',
        blueYonder: '#495583',
        blueSecondary: '#4318FF',
        green: {
          50: '#05cd991a',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#17ad37',
          650: '#30c6b4',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        navy: {
          50: '#d0dcfb',
          100: '#aac0fe',
          200: '#a3b9f8',
          300: '#728fea',
          400: '#3652ba',
          500: '#1b3bbb',
          600: '#24388a',
          700: '#1B254B',
          800: '#111c44',
          900: '#0b1437',
        },
        red: {
          50: '#ee5d501a',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#f53939',
          600: '#ea0606',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        card: {
          DEFAULT: '#ffffff',
          dark: '#1f2937',
          cardCustomBlue: 'rgba(31,44,100,0.7)', // Transparent color
        },
        'card-foreground': {
          DEFAULT: '#000000',
          dark: '#ffffff',
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
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
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
