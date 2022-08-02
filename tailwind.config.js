module.exports = {
  purge: {
    enable: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [],
  },
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme,
        'text-tool-yellow': '#ffe203',
        'text-tool-blue': '#62d4fd',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  extend: {}
};
