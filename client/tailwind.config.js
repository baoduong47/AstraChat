/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        signupBackground: "#E0C0836",
        customGray: "#2A3139",
        lightGreen: "#BEC6A0",
        backGround: "#fdffe0",
        mainbackGround: "#edeeca",
        messageBackground: "#E1E5F2",
        sideBar: "#F2F2F4",
        textColor: "#B5B5B5",
        cardColor: "#EEEEEE",
        hoverColor: "#F04A02",
        highlightColor: "#A58351",
        buttonColor: "#895881",
        navColor: "#767676",
        foregroundColor: "#63636B",
        inputColor: "#F2F2F4",
        crystalColor: "#57A6A1",
      },
      keyframes: {
        fly: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fly: "fly 2s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Quicksand", "Fredoka"],
      },
    },
  },
  plugins: [],
};
