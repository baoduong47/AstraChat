/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // backgroundImage: {
      //   "hero-pattern": "url('/images/image.jpg')", // Correct path
      // },
      colors: {
        customBlue: "#606676",
        customGray: "#2A3139",
        lightGreen: "#BEC6A0",
        backGround: "#fdffe0",
        mainbackGround: "#edeeca",
        messageBackground: "#E1E5F2",
        sideBar: "#F2F2F4",
        textColor: "#00ADB5",
        cardColor: "#EEEEEE",
        hoverColor: "#F04A02",
        highlightColor: "#536f50",
        buttonColor: "#CB7857",
        navColor: "#767676",
        foregroundColor: "#63636B",
        inputColor: "#F2F2F4",
        crystalColor: "#57A6A1",
      },
      fontFamily: {
        sans: ["Quicksand", "Fredoka"],
      },
    },
  },
  plugins: [],
};
