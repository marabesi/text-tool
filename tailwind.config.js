module.exports = {
  purge: {
    enable: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [],
  },
  darkMode: 'class',
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [],
  extend: {}
};
