import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#fef3c7',
          DEFAULT: '#c5a059',
          radiant: '#d4af37',
          deep: '#996515',
          dark: '#775a19',
        },
        civara: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#fd9f65',
          700: '#934b17',
          DEFAULT: '#7a3803',
          dark: '#5c2b02',
        },
        midnight: {
          light: '#2f3c50',
          DEFAULT: '#0b192c',
          dark: '#1b1c1a',
        },
        ivory: {
          light: '#ffffff',
          DEFAULT: '#faf8f5',
          cream: '#fffdf9',
          dim: '#eae8e5',
        },
        monastic: {
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
        royal: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f472b6',
          400: '#e11d48',
          500: '#be123c',
          600: '#9f1239',
          700: '#881337',
          800: '#4c0519',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif"', '"Noto Serif Thai"', 'Sarabun', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', '"Bai Jamjuree"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

