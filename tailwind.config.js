/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-grey': '#333333',
        'light-grey': '#F5F5F5',
        'primary': '#2C81BA',
        'light-blue': '#3498DB',
        'deep-blue': '#34495E',
        'navy-blue': '#2C3E50',
        'cyan': '#A6DDEF',
        'partial-white': '#F0F8FF',
        'grey': '#6C757D'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

