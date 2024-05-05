/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gongbang: "#E7B98E",
      },
      screens: {
        mobile: "800px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
