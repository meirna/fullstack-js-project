module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts,css}"],
  },
  darkMode: false, // or 'media' or 'class'
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
  plugins: [require("@tailwindcss/forms")],
};
