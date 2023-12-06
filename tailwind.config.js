/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      screens: {
        xl: '1360px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
      boxShadow: {
        '3xl': '0px 4px 23px rgba(112, 112, 112, 0.1)',
      },
      colors: {
        error: '#CC3333',
        primary: '#073150',
      },
    },
  },
  plugins: [],
};
