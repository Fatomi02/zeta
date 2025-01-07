/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-green': '#082414',
        'dark-grey': '#333333',
        'light-grey': '#fafafa',
        'primary': '#0b86f4',
        'blue': '#3f75b3',
        'deep-blue': '#34495E',
        'navy-blue': '#020C3A',
        'cyan': '#A6DDEF',
        'partial-white': '#F0F8FF',
        'white': '#fffcfc',
        'grey': '#E5E5E5',
        'error': '#e02424'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

