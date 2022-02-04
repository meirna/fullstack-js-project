module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      minHeight: {
        full: "120px",
      },
      backgroundImage: (theme) => ({
        check: "url('/assets/check.svg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [],
};
