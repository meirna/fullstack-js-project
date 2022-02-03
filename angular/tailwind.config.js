module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      minHeight: {
        full: "120px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
