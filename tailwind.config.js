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
        browserimage: "1690px",
      },
      fontFamily: {
        medium: "Pretendard-Medium",
        semibold: "Pretendard-SemiBold",
        bold: "Pretendard-Bold",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
