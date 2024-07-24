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
        backGround: "#fdffe0",
        mainbackGround: "#edeeca",
        messageBackground: "#4A6A8A",
        sideBar: "#2c4c3b",
        textColor: "#00ADB5",
        cardColor: "#EEEEEE",
        hoverColor: "#F04A02",
        highlightColor: "#536f50",
        buttonColor: "#536f50",
        navColor: "#767676",
      },
      fontFamily: {
        sans: ["Quicksand", "Fredoka"],
      },
    },
  },
  plugins: [],
};
