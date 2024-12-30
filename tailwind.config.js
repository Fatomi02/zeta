/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-green': '#082414',
        'dark-grey': '#333333',
        'light-grey': '#fafafa',
        'primary': '#2C81BA',
        'blue': '#386cf4',
        'deep-blue': '#34495E',
        'navy-blue': '#020C3A',
        'cyan': '#A6DDEF',
        'partial-white': '#F0F8FF',
        'white': '#fffcfc',
        'grey': '#E5E5E5'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

