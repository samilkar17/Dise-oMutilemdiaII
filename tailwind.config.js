module.exports = {
  node: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      body: ["RocknRoll One"],
    },
  },
  variants: {
    scrollbar: ["rounded"],
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
};
