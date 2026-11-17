/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/Components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      brand: {
        gold: '#C59B24',
        'gold-hover': '#B0891E',
        'gold-light': '#FDF9EE',
        'gold-border': '#E2C876',
        navy: '#1D2A4C',
        'navy-dark': '#141E36',
        'navy-deep': '#0D1424',
        'navy-light': '#2A3C6A',
        silver: '#D7DCE0',
        'silver-light': '#F4F6F8',
        'silver-dark': '#9CA3AF',
        white: '#FFFFFF',
      }
    },
    fontFamily: {
      urbanist: ['Urbanist', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      mulish: ['Mulish", sans-serif'],
      jakarta: ['"Plus Jakarta Sans", sans-serif;'],
      inter: ['"Inter", sans-serif'],
      google: ['"Google Sans"', 'Roboto', 'Arial', 'sans-serif'], // Add this line
    },
  },
};
export const plugins = [];
