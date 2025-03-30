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
        xxxs: '320px', // Extra Extra Small screens (small phones)
        'iphone-5': '320px', // iPhone 5
        xxs: '320px', // Very Small screens
        'xxs-max': { max: '319px' }, // Max width for very small devices
        xs: '576px', // Extra Small screens
        'xs-max': { max: '575px' }, // Max width for xs devices
        sm: '576px', // Small screens
        'sm-max': { max: '767px' }, // Max width for sm devices
        tablet: { min: '768px', max: '1024px' }, // Tablet screens only
        md: '768px', // Medium screens and larger
        lg: '1024px', // Large screens
        'lg-max': { max: '1199px' }, // Max width for lg devices
        xl: '1200px', // Extra Large screens
        'xl-max': { max: '1320px' }, // Max width for xl devices
        '2xl': '1321px', // 2x Extra Large screens
        '2xl-max': { max: '1599px' }, // Max width for 2xl devices
        '3xl': '1600px', // 3x Extra Large screens
        '3xl-max': { max: '1849px' }, // Max width for 3xl devices
        '4xl': '1850px', // 4x Extra Large screens
        '4xl-max': { max: '2047px' }, // Max width for 4xl devices
        '5xl': { min: '2048px', max: '2559px' }, // Large laptops and smaller desktops
        '6xl': { min: '2560px', max: '3839px' }, // Bigger desktops and standard TVs
        '7xl': { min: '3840px' }, // Ultra-wide screens and large TVs
        hd: { min: '1366px', max: '1366px' }, // HD screens
        'full-hd': { min: '1920px', max: '1920px' }, // Full HD screens
        '2k': { min: '2560px', max: '2560px' }, // 2K screens
        '4k': { min: '3840px', max: '3840px' }, // 4K screens
        '8k': { min: '7680px', max: '7680px' }, // 8K screens
        'iphone-6': '375px', // For devices with 375px width (e.g., iPhone 6/7/8)
        'small-tablet': '425px', // For devices with 425px width (e.g., small tablets)
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
        shadeBlue: '#609cb0',
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
        softGray: '#f0f0f0ab',
        cloudbg: '#EAF7F5',
        deploymentLogBg: '#1E1D47',
        darkBackGround: '#101c44',
        OrangeRed: '#fef1e1',
        lightOrangeRed: '#fddbb5',
        darkOrangeRed: '#c13e1b',
        deepNavy: '#434E80',
        royalBlue: '#4469f3',
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
          cardCustomBlue: 'rgba(16, 23, 55, 0.7)',
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
