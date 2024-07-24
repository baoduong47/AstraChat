/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        customBlue: "#606676",
        customGray: "#2A3139",
        lightGreen: "#BEC6A0",
        backGround: "#EBEBEB",
        sideBar: "#040218",
        textColor: "#00ADB5",
        cardColor: "#EEEEEE",
        hoverColor: "#F04A02",
      },
      fontFamily: {
        sans: ["Quicksand", "Fredoka"],
      },
    },
  },
  plugins: [],
};
