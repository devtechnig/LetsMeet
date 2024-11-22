import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Use only 'class' for dark mode
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Theme colors for light and dark modes
        lightAccentColor: '#2AB673',
        lightBgColor: '#F7F7F5',
        lightActiveTabBg: '#E2F1E8',
        lightHeadingColor: '#181C1A',
        lightTextColor: '#4A4F4D',

        darkAccentColor: '#8D6ECE',
        darkBgColor: '#0C0C10',
        darkActiveTabBg: '#1D1928',
        darkHeadingColor: '#DFE4E2',
        darkTextColor: '#939796',

        accentColor: '#319197',

         // Light Mode Card Backgrounds
        lightCardBg1: '#A2D7B4',
        lightCardBg2: '#1C8C56',
        lightCardBg3: '#73C99F',
        lightCardBg4: '#2F9E6C',

        // Dark Mode Card Backgrounds
        darkCardBg1: '#D0A9FF',
        darkCardBg2: '#6C4ED7',
        darkCardBg3: '#8E6DFF',
        darkCardBg4: '#9B4FFF',

        // Additional colors
        dark: {
          1: '#1C1F2E',
          2: '#161925',
          3: '#252A41',
          4: '#1E2757',
        },
        blue: {
          1: '#0E78F9',
        },
        sky: {
          1: '#C9DDFF',
          2: '#ECF0FF',
          3: '#F5FCFF',
        },
        orange: {
          1: '#FF742E',
        },
        purple: {
          1: '#830EF9',
        },
        yellow: {
          1: '#F9A90E',
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
      backgroundImage: {
        heroDark: "url('/images/hero-background-dark.png')",
        hero: "url('/images/hero-background.jpg')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
